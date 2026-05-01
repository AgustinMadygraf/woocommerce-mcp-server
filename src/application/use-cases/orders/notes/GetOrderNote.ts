import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class GetOrderNoteUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.orderId) {
      throw new Error("Order ID is required");
    }
    if (!params.noteId) {
      throw new Error("Note ID is required");
    }
    return this.client.get(`/orders/${params.orderId}/notes/${params.noteId}`);
  }
}
