import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetShippingZonesUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    return this.client.get("/shipping/zones", {
      ...params.filters,
    });
  }
}
