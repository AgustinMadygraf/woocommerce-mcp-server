import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetSettingsGroupUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.groupId) {
      throw new Error("Group ID is required");
    }
    return this.client.get(`/settings/${params.groupId}`);
  }
}
