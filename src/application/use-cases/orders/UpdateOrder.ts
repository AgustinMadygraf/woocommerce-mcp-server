import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { AuditLogger } from "../../../infrastructure/logging/AuditLogger";

export class UpdateOrderUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(orderId: string | number, orderData: any) {
    if (!orderId) {
      throw new Error("Order ID is required for updating an order");
    }
    if (!orderData) {
      throw new Error("Order data is required for updating an order");
    }

    AuditLogger.logAction("UPDATE_ORDER", { orderId, status: orderData.status });

    return this.client.put(`/orders/${orderId}`, orderData);
  }
}
