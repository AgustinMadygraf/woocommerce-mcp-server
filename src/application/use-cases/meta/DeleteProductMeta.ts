import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { WooMetaData } from "../../../core/types/woo.types";

export class DeleteProductMetaUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.productId) {
      throw new Error("Product ID is required");
    }
    if (!params.metaKey) {
      throw new Error("Meta key is required");
    }

    const response = await this.client.get<any>(`/products/${params.productId}`);
    let metaData: WooMetaData[] = response.meta_data || [];

    const filteredMeta = metaData.filter((meta: WooMetaData) => meta.key !== params.metaKey);

    const updateResponse = await this.client.put<any>(`/products/${params.productId}`, {
      meta_data: filteredMeta,
    });

    return updateResponse.meta_data;
  }
}
