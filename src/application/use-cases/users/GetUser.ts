import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class GetUserUseCase {
  constructor(private client: WordPressClient) {}

  async execute(userId: number) {
    if (!userId) {
      throw new Error("User ID is required");
    }
    return this.client.get(`/users/${userId}`);
  }
}
