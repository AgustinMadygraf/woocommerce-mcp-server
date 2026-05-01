import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class GetProductCategoryUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.categoryId) {
      throw new Error("Category ID is required");
    }
    return this.client.get(`/products/categories/${params.categoryId}`);
  }
}
