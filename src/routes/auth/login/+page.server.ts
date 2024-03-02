import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { userAuthSchema } from '$lib/schema/userAuthSchema';
import { getUserByEmail } from '$lib/server/storage/service/auth/getUserByEmail';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/server/auth/lucia3';
import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes/auth/register/$types';

export const load: PageServerLoad = async (event) => {
  // Auth.
  if (event.locals.user) {
    // User is already logged in.
    redirect(302, '/auth');
  }

  return {
    form: await superValidate(zod(userAuthSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(userAuthSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    try {
      // Auth: login user
      const user = await getUserByEmail(form.data.email);

      /*
      if (!existingUser) {
        // NOTE:
        // Returning immediately allows malicious actors to figure out valid emails from response times,
        // allowing them to only focus on guessing passwords in brute-force attacks.
        // As a preventive measure, you may want to hash passwords even for invalid emails.
        // However, valid emails can be already be revealed with the signup page among other methods.
        // It will also be much more resource intensive.
        // Since protecting against this is none-trivial,
        // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
        // If emails are public, you may outright tell the user that the email is invalid.
        return fail(400, {
          message: "Incorrect email or password"
        });
      }
      */
      const validation = user
        ? await new Argon2id().verify(user.hashed_password, form.data.password)
        : // User not found
          false;

      if (!user || !validation) {
        return setError(form, '', 'Incorrect login data.');
      }

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes,
      });

      // Redirect to profile page.
      redirect(302, '/auth');
    } catch (exception) {
      // Exception already logged in external functionality.

      // Return a general error message, avoid displaying sensitive data to the user.
      return setError(form, '', 'Unspecified error.', { status: 500 });
    }
  },
};
