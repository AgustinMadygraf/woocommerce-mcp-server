import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class GetMediaUseCase {
  constructor(private client: WordPressClient) {}

  async execute(params: any) {
    return this.client.get("/media", params);
  }
}
