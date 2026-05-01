import { WordPressClient } from "../../../infrastructure/api/WordPressClient";

export class GetMediumUseCase {
  constructor(private client: WordPressClient) {}

  async execute(mediaId: number) {
    if (!mediaId) {
      throw new Error("Media ID is required");
    }
    return this.client.get(`/media/${mediaId}`);
  }
}
