import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class GetProductAttributeUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.attributeId) {
      throw new Error("Attribute ID is required");
    }
    return this.client.get(`/products/attributes/${params.attributeId}`);
  }
}
