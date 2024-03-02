import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { userRegisterSchema } from '$lib/schema/userRegisterSchema';
import { getDatabaseError } from '$lib/server/storage/mysql2';
import { lucia } from '$lib/server/auth/lucia3';
import { registerUser } from '$lib/server/storage/service/auth/registerUser';

export const load: PageServerLoad = async (event) => {
  // Auth.
  if (event.locals.user) {
    // User is already logged in.
    redirect(302, '/auth');
  }

  return {
    form: await superValidate(zod(userRegisterSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(userRegisterSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    try {
      // Auth: register user.
      const user_id = await registerUser(form.data.email, form.data.password);

      // Auth: log in user.
      const session = await lucia.createSession(user_id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes,
      });
    } catch (exception) {
      // Exception alreaady logged in external functionality.

      // Check if error was because email is already existing.
      const databaseError = getDatabaseError(exception);
      if (databaseError.code === 'ER_DUP_ENTRY') {
        return setError(form, 'email', 'Email already registered.');
      }

      // Return a general error message, avoid displaying sensitive data to the user.
      return setError(form, '', 'Unspecified error.', { status: 500 });
    }

    // Redirect to profile page.
    redirect(302, '/auth');

    /*
    return {
      form,
    };
    */
  },
};
