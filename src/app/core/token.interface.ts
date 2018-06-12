/**
 * Api Token
 */
export interface Token {
  authenticated: Boolean,
  created: string,
  expiration: string,
  accessToken: string,
  message: string,
  name: string,
  email: string,
  photo: string,
  role: number,
}
