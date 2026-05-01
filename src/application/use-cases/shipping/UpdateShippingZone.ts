import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class UpdateShippingZoneUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.zoneId) {
      throw new Error("Zone ID is required");
    }
    if (!params.zoneData) {
      throw new Error("Zone data is required");
    }
    return this.client.put(`/shipping/zones/${params.zoneId}`, params.zoneData);
  }
}
