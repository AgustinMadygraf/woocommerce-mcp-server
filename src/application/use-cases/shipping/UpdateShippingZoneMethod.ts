import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class UpdateShippingZoneMethodUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.zoneId) {
      throw new Error("Zone ID is required");
    }
    if (!params.instanceId) {
      throw new Error("Instance ID is required");
    }
    if (!params.methodData) {
      throw new Error("Method data is required");
    }
    return this.client.put(`/shipping/zones/${params.zoneId}/methods/${params.instanceId}`, params.methodData);
  }
}
