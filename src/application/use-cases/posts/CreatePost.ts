import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class CreatePostUseCase {
  constructor(private client: WordPressClient) {}

  async execute(params: any) {
    if (!params.title || !params.content) {
      throw new Error("Title and content are required for creating a post");
    }
    return this.client.post("/posts", {
      title: params.title,
      content: params.content,
      status: params.status || "draft",
    });
  }
}
