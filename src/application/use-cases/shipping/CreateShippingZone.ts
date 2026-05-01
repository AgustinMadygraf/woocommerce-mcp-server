import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class CreateShippingZoneUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.zoneData) {
      throw new Error("Zone data is required");
    }
    return this.client.post("/shipping/zones", params.zoneData);
  }
}
