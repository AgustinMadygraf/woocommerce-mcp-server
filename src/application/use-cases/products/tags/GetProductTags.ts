import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class GetProductTagsUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    return this.client.get("/products/tags", {
      per_page: params.perPage || 10,
      page: params.page || 1,
      ...params.filters,
    });
  }
}
