import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class UpdateTaxRateUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.rateId) {
      throw new Error("Tax rate ID is required");
    }
    if (!params.taxRateData) {
      throw new Error("Tax rate data is required");
    }
    return this.client.put(`/taxes/${params.rateId}`, params.taxRateData);
  }
}
