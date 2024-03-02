import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth/lucia3';

export const load: PageServerLoad = async (event) => {
  // Auth.
  if (!event.locals.user) {
    // User is already logged in.
    redirect(302, '/auth/register');
  }

  return {
    email: event.locals.user.email,
  };
};

export const actions: Actions = {
  default: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    });
    redirect(302, 'auth/login');
  },
};
