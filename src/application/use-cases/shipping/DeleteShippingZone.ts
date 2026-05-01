import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class DeleteShippingZoneUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.zoneId) {
      throw new Error("Zone ID is required");
    }
    return this.client.delete(`/shipping/zones/${params.zoneId}`, {
      force: params.force || true,
    });
  }
}
