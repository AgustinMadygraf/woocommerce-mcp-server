import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { WooMetaData } from "../../../core/types/woo.types";

export class UpdateCustomerMetaUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.customerId) {
      throw new Error("Customer ID is required");
    }
    if (!params.metaKey) {
      throw new Error("Meta key is required");
    }
    if (params.metaValue === undefined) {
      throw new Error("Meta value is required");
    }

    const response = await this.client.get<any>(`/customers/${params.customerId}`);
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

    const updateResponse = await this.client.put<any>(`/customers/${params.customerId}`, {
      meta_data: metaData,
    });

    return updateResponse.meta_data;
  }
}
