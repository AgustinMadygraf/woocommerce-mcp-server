import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class UpdateShippingZoneLocationsUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.zoneId) {
      throw new Error("Zone ID is required");
    }
    if (!params.locationsData) {
      throw new Error("Locations data is required");
    }
    return this.client.put(`/shipping/zones/${params.zoneId}/locations`, params.locationsData);
  }
}
