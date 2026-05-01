import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class RunSystemStatusToolUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.toolId) {
      throw new Error("Tool ID is required");
    }
    return this.client.put(`/system_status/tools/${params.toolId}`, {});
  }
}
