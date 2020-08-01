export class User {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public surname?: string,
    public avatar?: string,
    public _id?: string
  ){}
}
