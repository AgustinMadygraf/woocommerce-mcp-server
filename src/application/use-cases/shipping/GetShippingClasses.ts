import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetShippingClassesUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/products/shipping_classes");
  }
}
