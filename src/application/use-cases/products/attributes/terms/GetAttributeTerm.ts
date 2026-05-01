import { WooCommerceClient } from "../../../../../infrastructure/api/WooCommerceClient";

export class GetAttributeTermUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.attributeId) {
      throw new Error("Attribute ID is required");
    }
    if (!params.termId) {
      throw new Error("Term ID is required");
    }
    return this.client.get(`/products/attributes/${params.attributeId}/terms/${params.termId}`);
  }
}
