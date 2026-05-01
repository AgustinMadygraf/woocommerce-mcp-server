import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class CreateShippingZoneMethodUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.zoneId) {
      throw new Error("Zone ID is required");
    }
    if (!params.methodData) {
      throw new Error("Method data is required");
    }
    return this.client.post(`/shipping/zones/${params.zoneId}/methods`, params.methodData);
  }
}
