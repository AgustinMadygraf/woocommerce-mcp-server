import { WordPressClient } from "../../../infrastructure/api/WordPressClient";
import { GetPostsUseCase } from "../../../application/use-cases/posts/GetPosts";
import { CreatePostUseCase } from "../../../application/use-cases/posts/CreatePost";
import { UpdatePostUseCase } from "../../../application/use-cases/posts/UpdatePost";
import { GetPostMetaUseCase } from "../../../application/use-cases/posts/meta/GetPostMeta";
import { CreatePostMetaUseCase } from "../../../application/use-cases/posts/meta/CreatePostMeta";
import { UpdatePostMetaUseCase } from "../../../application/use-cases/posts/meta/UpdatePostMeta";
import { DeletePostMetaUseCase } from "../../../application/use-cases/posts/meta/DeletePostMeta";

export class PostController {
  private getPostsUseCase: GetPostsUseCase;
  private createPostUseCase: CreatePostUseCase;
  private updatePostUseCase: UpdatePostUseCase;
  private getPostMetaUseCase: GetPostMetaUseCase;
  private createPostMetaUseCase: CreatePostMetaUseCase;
  private updatePostMetaUseCase: UpdatePostMetaUseCase;
  private deletePostMetaUseCase: DeletePostMetaUseCase;

  constructor(client: WordPressClient) {
    this.getPostsUseCase = new GetPostsUseCase(client);
    this.createPostUseCase = new CreatePostUseCase(client);
    this.updatePostUseCase = new UpdatePostUseCase(client);
    this.getPostMetaUseCase = new GetPostMetaUseCase(client);
    this.createPostMetaUseCase = new CreatePostMetaUseCase(client);
    this.updatePostMetaUseCase = new UpdatePostMetaUseCase(client);
    this.deletePostMetaUseCase = new DeletePostMetaUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_posts":
        return this.getPostsUseCase.execute(params);
      case "create_post":
        return this.createPostUseCase.execute(params);
      case "update_post":
        return this.updatePostUseCase.execute(params);
      case "get_post_meta":
        return this.getPostMetaUseCase.execute(params);
      case "create_post_meta":
        return this.createPostMetaUseCase.execute(params);
      case "update_post_meta":
        return this.updatePostMetaUseCase.execute(params);
      case "delete_post_meta":
        return this.deletePostMetaUseCase.execute(params);
      default:
        throw new Error(`Method ${method} not handled by PostController`);
    }
  }
}
