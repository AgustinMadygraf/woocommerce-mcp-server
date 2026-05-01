import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class UpdateProductAttributeUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.attributeId) {
      throw new Error("Attribute ID is required");
    }
    if (!params.attributeData) {
      throw new Error("Attribute data is required");
    }
    return this.client.put(`/products/attributes/${params.attributeId}`, params.attributeData);
  }
}
