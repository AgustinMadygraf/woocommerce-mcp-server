import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetPaymentGatewayUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.gatewayId) {
      throw new Error("Gateway ID is required");
    }
    return this.client.get(`/payment_gateways/${params.gatewayId}`);
  }
}
