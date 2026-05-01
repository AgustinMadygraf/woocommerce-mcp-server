import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class GetProductVariationUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.productId) {
      throw new Error("Product ID is required");
    }
    if (!params.variationId) {
      throw new Error("Variation ID is required");
    }
    return this.client.get(`/products/${params.productId}/variations/${params.variationId}`);
  }
}
