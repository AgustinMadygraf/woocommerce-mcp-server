import { WooCommerceClient } from "../../../../../infrastructure/api/WooCommerceClient";

export class DeleteAttributeTermUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.attributeId) {
      throw new Error("Attribute ID is required");
    }
    if (!params.termId) {
      throw new Error("Term ID is required");
    }
    return this.client.delete(`/products/attributes/${params.attributeId}/terms/${params.termId}`, {
      force: params.force || true,
    });
  }
}
