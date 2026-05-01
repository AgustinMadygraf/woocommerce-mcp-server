import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { WooMetaData } from "../../../core/types/woo.types";

export class UpdateOrderMetaUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.orderId) {
      throw new Error("Order ID is required");
    }
    if (!params.metaKey) {
      throw new Error("Meta key is required");
    }
    if (params.metaValue === undefined) {
      throw new Error("Meta value is required");
    }

    const response = await this.client.get<any>(`/orders/${params.orderId}`);
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

    const updateResponse = await this.client.put<any>(`/orders/${params.orderId}`, {
      meta_data: metaData,
    });

    return updateResponse.meta_data;
  }
}
