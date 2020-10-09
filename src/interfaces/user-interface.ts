export interface User {
  id?: string,
  name?: string,
  roles?: Array<string>,
  token?: string,
  username?: string,
  password?: string,
  roleToShow?: string
}