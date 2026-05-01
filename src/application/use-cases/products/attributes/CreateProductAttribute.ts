import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class CreateProductAttributeUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.attributeData) {
      throw new Error("Attribute data is required");
    }
    return this.client.post("/products/attributes", params.attributeData);
  }
}
