import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class DeleteProductCategoryUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.categoryId) {
      throw new Error("Category ID is required");
    }
    return this.client.delete(`/products/categories/${params.categoryId}`, {
      force: params.force || true,
    });
  }
}
