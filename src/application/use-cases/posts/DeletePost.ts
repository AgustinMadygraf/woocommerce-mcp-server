import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class DeletePostUseCase {
  constructor(private client: WordPressClient) {}

  async execute(postId: number, force: boolean = false) {
    if (!postId) {
      throw new Error("Post ID is required");
    }
    return this.client.delete(`/posts/${postId}`, { force });
  }
}
