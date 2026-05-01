import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class UpdateProductVariationUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.productId) {
      throw new Error("Product ID is required");
    }
    if (!params.variationId) {
      throw new Error("Variation ID is required");
    }
    if (!params.variationData) {
      throw new Error("Variation data is required");
    }
    return this.client.put(`/products/${params.productId}/variations/${params.variationId}`, params.variationData);
  }
}
