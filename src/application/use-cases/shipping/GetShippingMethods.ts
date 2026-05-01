import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetShippingMethodsUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/shipping_methods");
  }
}
