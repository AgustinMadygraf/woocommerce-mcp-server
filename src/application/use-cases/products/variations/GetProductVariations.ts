import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class GetProductVariationsUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.productId) {
      throw new Error("Product ID is required");
    }
    return this.client.get(`/products/${params.productId}/variations`, {
      per_page: params.perPage || 10,
      page: params.page || 1,
      ...params.filters,
    });
  }
}
