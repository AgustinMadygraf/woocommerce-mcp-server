import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetCustomerUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(customerId: string | number) {
    if (!customerId) {
      throw new Error("Customer ID is required");
    }
    return this.client.get(`/customers/${customerId}`);
  }
}
