import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class CreateOrderUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(orderData: any) {
    if (!orderData) {
      throw new Error("Order data is required for creating an order");
    }
    return this.client.post("/orders", orderData);
  }
}
