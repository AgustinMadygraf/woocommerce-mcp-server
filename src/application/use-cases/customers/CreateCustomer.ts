import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class CreateCustomerUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(customerData: any) {
    if (!customerData) {
      throw new Error("Customer data is required for creating a customer");
    }
    return this.client.post("/customers", customerData);
  }
}
