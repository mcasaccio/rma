export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public uid?: string
  ) {}
}
export class Client {
  constructor(
    public role: string,
    public google: boolean,
    public name: string,
    public email: string,
    public uid: string
  ) {}
}
