export class RegisterDTO
{
  constructor(
    public UserName:string,
    public Email:string,
    public Password:string,
    public PasswordConfirm:string
  ) {
  }
}
