import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class DeleteTaxClassUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.slug) {
      throw new Error("Tax class slug is required");
    }
    return this.client.delete(`/taxes/classes/${params.slug}`, {
      force: params.force || true,
    });
  }
}
