import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class UpdateOrderUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(orderId: string | number, orderData: any) {
    if (!orderId) {
      throw new Error("Order ID is required for updating an order");
    }
    if (!orderData) {
      throw new Error("Order data is required for updating an order");
    }
    return this.client.put(`/orders/${orderId}`, orderData);
  }
}
