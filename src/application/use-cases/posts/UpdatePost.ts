import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class UpdatePostUseCase {
  constructor(private client: WordPressClient) {}

  async execute(params: any) {
    if (!params.postId) {
      throw new Error("Post ID is required for updating a post");
    }
    const updateData: Record<string, any> = {};
    if (params.title) updateData.title = params.title;
    if (params.content) updateData.content = params.content;
    if (params.status) updateData.status = params.status;

    return this.client.post(`/posts/${params.postId}`, updateData);
  }
}
