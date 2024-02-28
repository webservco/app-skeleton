/**
 * Database error interface
 */
export interface DatabaseError {
  code: string | null;
  errno: string | null;
  fatal: boolean | null;
  message: string;
  sqlMessage: string | null;
  sqlState: string | null;
}

/**
 * Auth
 */
export interface DatabaseUserAttributes {
  id: string;
  email: string;
  hashed_password: string;
  access_level: number;
}
