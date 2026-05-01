import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetOrdersUseCase } from "../../../application/use-cases/orders/GetOrders";
import { GetOrderUseCase } from "../../../application/use-cases/orders/GetOrder";
import { CreateOrderUseCase } from "../../../application/use-cases/orders/CreateOrder";
import { UpdateOrderUseCase } from "../../../application/use-cases/orders/UpdateOrder";
import { DeleteOrderUseCase } from "../../../application/use-cases/orders/DeleteOrder";

export class OrderController {
  private getOrdersUseCase: GetOrdersUseCase;
  private getOrderUseCase: GetOrderUseCase;
  private createOrderUseCase: CreateOrderUseCase;
  private updateOrderUseCase: UpdateOrderUseCase;
  private deleteOrderUseCase: DeleteOrderUseCase;

  constructor(private client: WooCommerceClient) {
    this.getOrdersUseCase = new GetOrdersUseCase(client);
    this.getOrderUseCase = new GetOrderUseCase(client);
    this.createOrderUseCase = new CreateOrderUseCase(client);
    this.updateOrderUseCase = new UpdateOrderUseCase(client);
    this.deleteOrderUseCase = new DeleteOrderUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_orders":
        return this.getOrdersUseCase.execute(params);
      case "get_order":
        return this.getOrderUseCase.execute(params.orderId);
      case "create_order":
        return this.createOrderUseCase.execute(params.orderData);
      case "update_order":
        return this.updateOrderUseCase.execute(params.orderId, params.orderData);
      case "delete_order":
        return this.deleteOrderUseCase.execute(params.orderId, params.force);
      default:
        throw new Error(`Method ${method} not handled by OrderController`);
    }
  }
}
