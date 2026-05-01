import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class UpdateProductTagUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.tagId) {
      throw new Error("Tag ID is required");
    }
    if (!params.tagData) {
      throw new Error("Tag data is required");
    }
    return this.client.put(`/products/tags/${params.tagId}`, params.tagData);
  }
}
