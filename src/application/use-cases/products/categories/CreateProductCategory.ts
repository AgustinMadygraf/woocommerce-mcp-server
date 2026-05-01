import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class CreateProductCategoryUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.categoryData) {
      throw new Error("Category data is required");
    }
    return this.client.post("/products/categories", params.categoryData);
  }
}
