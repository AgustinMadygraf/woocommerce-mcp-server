import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class DeleteTaxRateUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.rateId) {
      throw new Error("Tax rate ID is required");
    }
    return this.client.delete(`/taxes/${params.rateId}`, {
      force: params.force || true,
    });
  }
}
