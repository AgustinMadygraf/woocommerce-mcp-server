import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class DeleteProductTagUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.tagId) {
      throw new Error("Tag ID is required");
    }
    return this.client.delete(`/products/tags/${params.tagId}`, {
      force: params.force || true,
    });
  }
}
