import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { WooMetaData } from "../../../core/types/woo.types";

export class GetCustomerMetaUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.customerId) {
      throw new Error("Customer ID is required");
    }

    const response = await this.client.get<any>(`/customers/${params.customerId}`);
    const metaData = response.meta_data || [];

    if (params.metaKey) {
      return metaData.filter((meta: WooMetaData) => meta.key === params.metaKey);
    }

    return metaData;
  }
}
