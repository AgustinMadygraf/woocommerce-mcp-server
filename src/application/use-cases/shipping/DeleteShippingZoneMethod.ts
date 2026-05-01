import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class DeleteShippingZoneMethodUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.zoneId) {
      throw new Error("Zone ID is required");
    }
    if (!params.instanceId) {
      throw new Error("Instance ID is required");
    }
    return this.client.delete(`/shipping/zones/${params.zoneId}/methods/${params.instanceId}`, {
      force: params.force || true,
    });
  }
}
