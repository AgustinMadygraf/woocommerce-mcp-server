import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class CreateTaxClassUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.taxClassData) {
      throw new Error("Tax class data is required");
    }
    return this.client.post("/taxes/classes", params.taxClassData);
  }
}
