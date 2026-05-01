import { WordPressClient } from "../../../../infrastructure/api/WordPressClient";

export class UpdatePostMetaUseCase {
  constructor(private client: WordPressClient) {}

  async execute(params: any) {
    if (!params.postId) {
      throw new Error("Post ID is required");
    }
    if (!params.metaId) {
      throw new Error("Meta ID is required");
    }
    if (params.metaValue === undefined) {
      throw new Error("Meta value is required");
    }
    return this.client.put(`/posts/${params.postId}/meta/${params.metaId}`, {
      value: params.metaValue,
    });
  }
}
