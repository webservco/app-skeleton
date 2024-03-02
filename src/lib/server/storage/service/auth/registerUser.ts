import { databaseConnectionPool } from '$lib/server/storage/mysql2';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { logger } from '$lib/server/logger/loggerWinston';

/**
 * Register user.
 *
 * Returns user id.
 */
export async function registerUser(email: string, password: string): Promise<string> {
  const user_id = generateId(15);
  const hashed_password = await new Argon2id().hash(password);

  try {
    const [result] = await databaseConnectionPool.execute(
      'INSERT INTO auth_user (id, email, hashed_password) VALUES (?, ?, ?)',
      [user_id, email, hashed_password],
    );
    logger.debug({ action: 'Register user.', result: result });

    return user_id;
  } catch (exception) {
    // Log error.
    logger.error(exception);
    // Throw
    throw exception;
  }
}
