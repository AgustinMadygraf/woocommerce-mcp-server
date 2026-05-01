import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class UpdateSettingsOptionUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.groupId) {
      throw new Error("Group ID is required");
    }
    if (!params.optionId) {
      throw new Error("Option ID is required");
    }
    if (!params.optionData) {
      throw new Error("Option data is required");
    }
    return this.client.put(`/settings/${params.groupId}/${params.optionId}`, params.optionData);
  }
}
