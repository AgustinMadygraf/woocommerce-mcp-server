import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class GetPostsUseCase {
  constructor(private client: WordPressClient) {}

  async execute(params: any) {
    return this.client.get("/posts", {
      per_page: params.perPage || 10,
      page: params.page || 1,
      ...params.filters,
    });
  }
}
