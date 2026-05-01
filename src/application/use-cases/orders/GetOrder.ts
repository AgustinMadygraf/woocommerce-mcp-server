import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetOrderUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(orderId: string | number) {
    if (!orderId) {
      throw new Error("Order ID is required");
    }
    return this.client.get(`/orders/${orderId}`);
  }
}
