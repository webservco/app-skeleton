/**
 * Database error interface
 */
export interface DatabaseError {
  code: string | null;
  errno: int | null;
  fatal: boolean | null;
  message: string;
  sql: string | null;
  sqlMessage: string | null;
  sqlState: string | null;
}
