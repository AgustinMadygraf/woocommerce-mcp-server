import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class GetProductTagUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.tagId) {
      throw new Error("Tag ID is required");
    }
    return this.client.get(`/products/tags/${params.tagId}`);
  }
}
