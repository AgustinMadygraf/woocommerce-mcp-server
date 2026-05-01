import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class UpdateProductCategoryUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.categoryId) {
      throw new Error("Category ID is required");
    }
    if (!params.categoryData) {
      throw new Error("Category data is required");
    }
    return this.client.put(`/products/categories/${params.categoryId}`, params.categoryData);
  }
}
