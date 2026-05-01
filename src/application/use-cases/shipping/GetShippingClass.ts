import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetShippingClassUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(classId: number) {
    return this.client.get(`/products/shipping_classes/${classId}`);
  }
}
