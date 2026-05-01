import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class CreateProductVariationUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.productId) {
      throw new Error("Product ID is required");
    }
    if (!params.variationData) {
      throw new Error("Variation data is required");
    }
    return this.client.post(`/products/${params.productId}/variations`, params.variationData);
  }
}
