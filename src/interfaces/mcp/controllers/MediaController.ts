import { WordPressClient } from "../../../infrastructure/api/WordPressClient";
import { GetMediaUseCase } from "../../../application/use-cases/media/GetMedia";
import { GetMediumUseCase } from "../../../application/use-cases/media/GetMedium";

export class MediaController {
  private getMediaUseCase: GetMediaUseCase;
  private getMediumUseCase: GetMediumUseCase;

  constructor(client: WordPressClient) {
    this.getMediaUseCase = new GetMediaUseCase(client);
    this.getMediumUseCase = new GetMediumUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_media":
        return this.getMediaUseCase.execute(params);
      case "get_medium":
        return this.getMediumUseCase.execute(params.mediaId);
      default:
        throw new Error(`Method ${method} not handled by MediaController`);
    }
  }
}
