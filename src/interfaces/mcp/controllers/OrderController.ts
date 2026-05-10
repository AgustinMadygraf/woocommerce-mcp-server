import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetOrdersUseCase } from "../../../application/use-cases/orders/GetOrders";
import { UpdateOrderUseCase } from "../../../application/use-cases/orders/UpdateOrder";

export class OrderController {
  private getOrdersUseCase: GetOrdersUseCase;
  private updateOrderUseCase: UpdateOrderUseCase;

  constructor(private client: WooCommerceClient) {
    this.getOrdersUseCase = new GetOrdersUseCase(client);
    this.updateOrderUseCase = new UpdateOrderUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_orders":
        return this.getOrdersUseCase.execute(params);
      case "update_order":
        return this.updateOrderUseCase.execute(params.orderId, params.orderData);
      default:
        throw new Error(`Method ${method} not handled by OrderController`);
    }
  }
}
