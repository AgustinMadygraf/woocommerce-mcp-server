import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetSystemStatusToolsUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/system_status/tools");
  }
}
