import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { userRegisterSchema } from '$lib/schema/userRegisterSchema';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { databaseConnectionPool } from '$lib/server/storage/mysql2';
import { lucia } from '$lib/server/auth/lucia3';

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

    const user_id = generateId(15);
    const hashed_password = await new Argon2id().hash(form.data.password);
    const [result, fields] = await databaseConnectionPool.execute(
      'INSERT INTO auth_user (id, email, hashed_password) VALUES (?, ?, ?)',
      [user_id, form.data.email, hashed_password],
      [user_id, form.data.email, hashed_password],
    );
    /** @todo check if already logged in */
    /** @todo add try/catch, use getDatabaseError */
    /** @todo check if email is already registered */
    /** @todo separate function for inserting data (generate id, insert data, return id) */
    /** @todo implement winston logger */
    console.log('result', result);
    console.log('fields', fields);

    const session = await lucia.createSession(user_id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    });

    redirect(302, '/');

    /*
    return {
      form,
    };
    */
  },
};
