export class User {
  constructor(
    private id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private password: string,
    private description: string,
    private type: string,
    private approved: boolean
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getDescription(): string{
      return this.description;
  }

  public getType(): string {
    return this.type;
  }

  public getApproved(): boolean{
      return this.approved;
  }

}
