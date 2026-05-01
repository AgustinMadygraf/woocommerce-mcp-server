import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class GetOrderRefundUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.orderId) {
      throw new Error("Order ID is required");
    }
    if (!params.refundId) {
      throw new Error("Refund ID is required");
    }
    return this.client.get(`/orders/${params.orderId}/refunds/${params.refundId}`);
  }
}
