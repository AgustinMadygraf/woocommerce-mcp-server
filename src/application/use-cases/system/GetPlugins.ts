import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class GetPluginsUseCase {
  constructor(private client: WordPressClient) {}

  async execute() {
    return this.client.get("/plugins");
  }
}
