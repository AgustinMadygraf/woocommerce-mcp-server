import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class GetUsersUseCase {
  constructor(private client: WordPressClient) {}

  async execute(params: any) {
    return this.client.get("/users", params);
  }
}
