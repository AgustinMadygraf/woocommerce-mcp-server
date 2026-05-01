import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetSettingsGroupsUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/settings");
  }
}
