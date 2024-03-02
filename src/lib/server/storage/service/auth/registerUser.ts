import { databaseConnectionPool, getDatabaseError } from '$lib/server/storage/mysql2';

/**
 * Register user.
 *
 * Returns user id.
 */
export async function registerUser(email: string, password: string): Promise<string> {

}