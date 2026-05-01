import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class CreateProductTagUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.tagData) {
      throw new Error("Tag data is required");
    }
    return this.client.post("/products/tags", params.tagData);
  }
}
