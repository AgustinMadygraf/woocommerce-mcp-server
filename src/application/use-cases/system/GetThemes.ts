import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class GetThemesUseCase {
  constructor(private client: WordPressClient) {}

  async execute() {
    return this.client.get("/themes");
  }
}
