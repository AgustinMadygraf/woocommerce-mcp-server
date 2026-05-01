import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class CreateTaxRateUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.taxRateData) {
      throw new Error("Tax rate data is required");
    }
    return this.client.post("/taxes", params.taxRateData);
  }
}
