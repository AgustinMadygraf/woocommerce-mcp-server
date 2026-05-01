import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class UpdatePaymentGatewayUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.gatewayId) {
      throw new Error("Gateway ID is required");
    }
    if (!params.gatewayData) {
      throw new Error("Gateway data is required");
    }
    return this.client.put(`/payment_gateways/${params.gatewayId}`, params.gatewayData);
  }
}
