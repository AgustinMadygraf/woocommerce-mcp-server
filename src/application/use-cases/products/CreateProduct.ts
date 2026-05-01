import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class CreateProductUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(productData: any) {
    if (!productData) {
      throw new Error("Product data is required for creating a product");
    }
    return this.client.post("/products", productData);
  }
}
