import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class GetProductAttributesUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/products/attributes");
  }
}
