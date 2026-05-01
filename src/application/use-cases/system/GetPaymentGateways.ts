import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetPaymentGatewaysUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/payment_gateways");
  }
}
