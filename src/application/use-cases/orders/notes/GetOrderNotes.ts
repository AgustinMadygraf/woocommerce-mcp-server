import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class GetOrderNotesUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.orderId) {
      throw new Error("Order ID is required");
    }
    return this.client.get(`/orders/${params.orderId}/notes`, {
      per_page: params.perPage || 10,
      page: params.page || 1,
      ...params.filters,
    });
  }
}
