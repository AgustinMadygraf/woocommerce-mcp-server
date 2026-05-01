import { WordPressClient } from "../../../../infrastructure/api/WordPressClient";

export class GetPostMetaUseCase {
  constructor(private client: WordPressClient) {}

  async execute(params: any) {
    if (!params.postId) {
      throw new Error("Post ID is required");
    }
    return this.client.get(`/posts/${params.postId}/meta`);
  }
}
