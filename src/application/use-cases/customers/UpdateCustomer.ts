import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class UpdateCustomerUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(customerId: string | number, customerData: any) {
    if (!customerId) {
      throw new Error("Customer ID is required for updating a customer");
    }
    if (!customerData) {
      throw new Error("Customer data is required for updating a customer");
    }
    return this.client.put(`/customers/${customerId}`, customerData);
  }
}
