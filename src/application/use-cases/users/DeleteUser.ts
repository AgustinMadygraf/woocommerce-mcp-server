import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class DeleteUserUseCase {
  constructor(private client: WordPressClient) {}

  async execute(userId: number, force: boolean = false, reassign?: number) {
    if (!userId) {
      throw new Error("User ID is required");
    }
    return this.client.delete(`/users/${userId}`, { force, reassign });
  }
}
