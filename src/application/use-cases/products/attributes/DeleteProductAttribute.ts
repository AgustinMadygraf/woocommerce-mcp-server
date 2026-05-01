import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class DeleteProductAttributeUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.attributeId) {
      throw new Error("Attribute ID is required");
    }
    return this.client.delete(`/products/attributes/${params.attributeId}`, {
      force: params.force || true,
    });
  }
}
