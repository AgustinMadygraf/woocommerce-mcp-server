import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class DeleteProductUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(productId: string | number, force: boolean = false) {
    if (!productId) {
      throw new Error("Product ID is required for deleting a product");
    }
    return this.client.delete(`/products/${productId}`, { force });
  }
}
