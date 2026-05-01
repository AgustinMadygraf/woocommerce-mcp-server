import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetShippingZoneLocationsUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.zoneId) {
      throw new Error("Zone ID is required");
    }
    return this.client.get(`/shipping/zones/${params.zoneId}/locations`);
  }
}
