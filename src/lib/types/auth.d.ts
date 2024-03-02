/**
 * Auth
 */
export interface User {
  id: string;
  email: string;
  hashed_password: string;
  access_level: number;
}
