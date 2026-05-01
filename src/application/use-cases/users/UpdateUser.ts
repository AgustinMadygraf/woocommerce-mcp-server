import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class UpdateUserUseCase {
  constructor(private client: WordPressClient) {}

  async execute(userId: number, userData: any) {
    if (!userId) {
      throw new Error("User ID is required");
    }
    return this.client.put(`/users/${userId}`, userData);
  }
}
