import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetSystemStatusUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/system_status");
  }
}
