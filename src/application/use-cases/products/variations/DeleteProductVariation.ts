import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class DeleteProductVariationUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.productId) {
      throw new Error("Product ID is required");
    }
    if (!params.variationId) {
      throw new Error("Variation ID is required");
    }
    return this.client.delete(`/products/${params.productId}/variations/${params.variationId}`, {
      force: params.force || true,
    });
  }
}
