import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { AuditLogger } from "../../../infrastructure/logging/AuditLogger";

export class UpdateCustomerUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(customerId: string | number, customerData: any) {
    if (!customerId) {
      throw new Error("Customer ID is required for updating a customer");
    }
    if (!customerData) {
      throw new Error("Customer data is required for updating a customer");
    }

    AuditLogger.logAction("UPDATE_CUSTOMER", { customerId, email: customerData.email });

    return this.client.put(`/customers/${customerId}`, customerData);
  }
}
