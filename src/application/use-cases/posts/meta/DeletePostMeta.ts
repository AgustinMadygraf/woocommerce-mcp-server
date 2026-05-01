import { WordPressClient } from "../../../../infrastructure/api/WordPressClient";

export class DeletePostMetaUseCase {
  constructor(private client: WordPressClient) {}

  async execute(params: any) {
    if (!params.postId) {
      throw new Error("Post ID is required");
    }
    if (!params.metaId) {
      throw new Error("Meta ID is required");
    }
    return this.client.delete(`/posts/${params.postId}/meta/${params.metaId}`, {
      force: params.force || true,
    });
  }
}
