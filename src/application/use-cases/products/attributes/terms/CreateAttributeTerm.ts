import { WooCommerceClient } from "../../../../../infrastructure/api/WooCommerceClient";

export class CreateAttributeTermUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.attributeId) {
      throw new Error("Attribute ID is required");
    }
    if (!params.termData) {
      throw new Error("Term data is required");
    }
    return this.client.post(`/products/attributes/${params.attributeId}/terms`, params.termData);
  }
}
