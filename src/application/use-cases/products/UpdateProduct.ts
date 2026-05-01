import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class UpdateProductUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(productId: string | number, productData: any) {
    if (!productId) {
      throw new Error("Product ID is required for updating a product");
    }
    if (!productData) {
      throw new Error("Product data is required for updating a product");
    }
    return this.client.put(`/products/${productId}`, productData);
  }
}
