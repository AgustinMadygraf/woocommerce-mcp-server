import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetSettingOptionUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.groupId || !params.optionId) {
      throw new Error("Group ID and Option ID are required");
    }
    return this.client.get(`/settings/${params.groupId}/${params.optionId}`);
  }
}
