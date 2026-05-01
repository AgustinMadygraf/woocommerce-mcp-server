import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { WooMetaData } from "../../../core/types/woo.types";

export class UpdateProductMetaUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.productId) {
      throw new Error("Product ID is required");
    }
    if (!params.metaKey) {
      throw new Error("Meta key is required");
    }
    if (params.metaValue === undefined) {
      throw new Error("Meta value is required");
    }

    const response = await this.client.get<any>(`/products/${params.productId}`);
    let metaData: WooMetaData[] = response.meta_data || [];

    const index = metaData.findIndex((meta: WooMetaData) => meta.key === params.metaKey);

    if (index >= 0) {
      metaData[index].value = params.metaValue;
    } else {
      metaData.push({
        key: params.metaKey,
        value: params.metaValue,
      });
    }

    const updateResponse = await this.client.put<any>(`/products/${params.productId}`, {
      meta_data: metaData,
    });

    return updateResponse.meta_data;
  }
}
