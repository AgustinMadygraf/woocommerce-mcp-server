import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetProductUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(productId: string | number) {
    if (!productId) {
      throw new Error("Product ID is required");
    }
    return this.client.get(`/products/${productId}`);
  }
}
