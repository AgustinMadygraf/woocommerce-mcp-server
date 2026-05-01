import { WordPressClient } from "../../../infrastructure/api/WordPressClient";
import { GetPostsUseCase } from "../../../application/use-cases/posts/GetPosts";
import { CreatePostUseCase } from "../../../application/use-cases/posts/CreatePost";
import { UpdatePostUseCase } from "../../../application/use-cases/posts/UpdatePost";

export class PostController {
  private getPostsUseCase: GetPostsUseCase;
  private createPostUseCase: CreatePostUseCase;
  private updatePostUseCase: UpdatePostUseCase;

  constructor(client: WordPressClient) {
    this.getPostsUseCase = new GetPostsUseCase(client);
    this.createPostUseCase = new CreatePostUseCase(client);
    this.updatePostUseCase = new UpdatePostUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_posts":
        return this.getPostsUseCase.execute(params);
      case "create_post":
        return this.createPostUseCase.execute(params);
      case "update_post":
        return this.updatePostUseCase.execute(params);
      default:
        throw new Error(`Method ${method} not handled by PostController`);
    }
  }
}
