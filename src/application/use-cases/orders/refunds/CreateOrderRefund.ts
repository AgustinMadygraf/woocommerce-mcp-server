import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class CreateOrderRefundUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.orderId) {
      throw new Error("Order ID is required");
    }
    if (!params.refundData) {
      throw new Error("Refund data is required");
    }
    return this.client.post(`/orders/${params.orderId}/refunds`, params.refundData);
  }
}
