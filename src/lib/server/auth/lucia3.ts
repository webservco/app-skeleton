import { Lucia } from 'lucia';
import { Mysql2Adapter } from '@lucia-auth/adapter-mysql';
import { dev } from '$app/environment';

import type { DatabaseUserAttributes } from '$lib/types/database';
import { databaseConnectionPool } from '$lib/server/storage/mysql2';

const adapter = new Mysql2Adapter(databaseConnectionPool, {
  user: 'auth_user',
  session: 'auth_user_session',
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      email: attributes.email,
      access_level: attributes.access_level,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
