import { logger } from '$lib/server/logger/loggerWinston';
import type { User } from '$lib/types/auth';
import { databaseConnectionPool } from '$lib/server/storage/mysql2';

export async function getUserByEmail(email: string): Promise<User | null> {
  const [rows] = await databaseConnectionPool.execute(
    'SELECT id, email, hashed_password, access_level FROM auth_user WHERE email = ? LIMIT 1',
    [email.toLowerCase()],
  );
  const user = (rows as User[])[0];
  logger.debug({ action: 'getUserByEmail.', rows: rows });
  return user;
}
