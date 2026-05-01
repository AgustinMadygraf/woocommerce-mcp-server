import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class CreateOrderNoteUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.orderId) {
      throw new Error("Order ID is required");
    }
    if (!params.noteData) {
      throw new Error("Note data is required");
    }
    return this.client.post(`/orders/${params.orderId}/notes`, params.noteData);
  }
}
