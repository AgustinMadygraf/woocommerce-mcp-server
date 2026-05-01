import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class DeleteCustomerUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(customerId: string | number, force: boolean = false) {
    if (!customerId) {
      throw new Error("Customer ID is required for deleting a customer");
    }
    return this.client.delete(`/customers/${customerId}`, { force });
  }
}
