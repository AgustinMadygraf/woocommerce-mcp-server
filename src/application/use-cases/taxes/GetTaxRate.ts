import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetTaxRateUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.rateId) {
      throw new Error("Tax rate ID is required");
    }
    return this.client.get(`/taxes/${params.rateId}`);
  }
}
