import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { WordPressClient } from "../../../infrastructure/api/WordPressClient";
import { GetSystemStatusUseCase } from "../../../application/use-cases/system/GetSystemStatus";

export class SystemController {
  private getSystemStatusUseCase: GetSystemStatusUseCase;

  constructor(client: WooCommerceClient, wpClient: WordPressClient) {
    this.getSystemStatusUseCase = new GetSystemStatusUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_system_status":
        return this.getSystemStatusUseCase.execute();
      default:
        throw new Error(`Method ${method} not handled by SystemController`);
    }
  }
}
