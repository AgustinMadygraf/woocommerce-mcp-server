import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class CreateUserUseCase {
  constructor(private client: WordPressClient) {}

  async execute(userData: any) {
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error("Missing required fields: username, email, password");
    }
    return this.client.post("/users", userData);
  }
}
