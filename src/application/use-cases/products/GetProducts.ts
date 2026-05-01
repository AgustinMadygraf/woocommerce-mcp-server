import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export interface GetProductsParams {
  perPage?: number;
  page?: number;
  filters?: Record<string, any>;
}

export class GetProductsUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: GetProductsParams) {
    return this.client.get("/products", {
      per_page: params.perPage || 10,
      page: params.page || 1,
      ...params.filters,
    });
  }
}
