import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class GetPostUseCase {
  constructor(private client: WordPressClient) {}

  async execute(postId: number) {
    if (!postId) {
      throw new Error("Post ID is required");
    }
    return this.client.get(`/posts/${postId}`);
  }
}
