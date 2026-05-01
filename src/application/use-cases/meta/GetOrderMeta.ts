import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { WooMetaData } from "../../../core/types/woo.types";

export class GetOrderMetaUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.orderId) {
      throw new Error("Order ID is required");
    }

    const response = await this.client.get<any>(`/orders/${params.orderId}`);
    const metaData = response.meta_data || [];

    if (params.metaKey) {
      return metaData.filter((meta: WooMetaData) => meta.key === params.metaKey);
    }

    return metaData;
  }
}
