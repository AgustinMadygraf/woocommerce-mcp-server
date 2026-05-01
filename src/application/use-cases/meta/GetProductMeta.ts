import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { WooMetaData } from "../../../core/types/woo.types";

export class GetProductMetaUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.productId) {
      throw new Error("Product ID is required");
    }

    const response = await this.client.get<any>(`/products/${params.productId}`);
    const metaData = response.meta_data || [];

    if (params.metaKey) {
      return metaData.filter((meta: WooMetaData) => meta.key === params.metaKey);
    }

    return metaData;
  }
}
