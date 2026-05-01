import { WordPressClient } from "../../../../infrastructure/api/WordPressClient";

export class CreatePostMetaUseCase {
  constructor(private client: WordPressClient) {}

  async execute(params: any) {
    if (!params.postId) {
      throw new Error("Post ID is required");
    }
    if (!params.metaKey) {
      throw new Error("Meta key is required");
    }
    if (params.metaValue === undefined) {
      throw new Error("Meta value is required");
    }
    return this.client.post(`/posts/${params.postId}/meta`, {
      key: params.metaKey,
      value: params.metaValue,
    });
  }
}
