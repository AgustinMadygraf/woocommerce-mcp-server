import { WooCommerceClient } from "../../../../../infrastructure/api/WooCommerceClient";

export class UpdateAttributeTermUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.attributeId) {
      throw new Error("Attribute ID is required");
    }
    if (!params.termId) {
      throw new Error("Term ID is required");
    }
    if (!params.termData) {
      throw new Error("Term data is required");
    }
    return this.client.put(`/products/attributes/${params.attributeId}/terms/${params.termId}`, params.termData);
  }
}
