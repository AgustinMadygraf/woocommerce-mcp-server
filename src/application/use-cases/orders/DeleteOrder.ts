import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class DeleteOrderUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(orderId: string | number, force: boolean = false) {
    if (!orderId) {
      throw new Error("Order ID is required for deleting an order");
    }
    return this.client.delete(`/orders/${orderId}`, { force });
  }
}
