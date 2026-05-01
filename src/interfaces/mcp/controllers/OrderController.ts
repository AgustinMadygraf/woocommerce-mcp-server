import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetOrdersUseCase } from "../../../application/use-cases/orders/GetOrders";
import { GetOrderUseCase } from "../../../application/use-cases/orders/GetOrder";
import { CreateOrderUseCase } from "../../../application/use-cases/orders/CreateOrder";
import { UpdateOrderUseCase } from "../../../application/use-cases/orders/UpdateOrder";
import { DeleteOrderUseCase } from "../../../application/use-cases/orders/DeleteOrder";
import { GetOrderNotesUseCase } from "../../../application/use-cases/orders/notes/GetOrderNotes";
import { GetOrderNoteUseCase } from "../../../application/use-cases/orders/notes/GetOrderNote";
import { CreateOrderNoteUseCase } from "../../../application/use-cases/orders/notes/CreateOrderNote";
import { DeleteOrderNoteUseCase } from "../../../application/use-cases/orders/notes/DeleteOrderNote";
import { GetOrderRefundsUseCase } from "../../../application/use-cases/orders/refunds/GetOrderRefunds";
import { GetOrderRefundUseCase } from "../../../application/use-cases/orders/refunds/GetOrderRefund";
import { CreateOrderRefundUseCase } from "../../../application/use-cases/orders/refunds/CreateOrderRefund";
import { DeleteOrderRefundUseCase } from "../../../application/use-cases/orders/refunds/DeleteOrderRefund";

export class OrderController {
  private getOrdersUseCase: GetOrdersUseCase;
  private getOrderUseCase: GetOrderUseCase;
  private createOrderUseCase: CreateOrderUseCase;
  private updateOrderUseCase: UpdateOrderUseCase;
  private deleteOrderUseCase: DeleteOrderUseCase;
  private getOrderNotesUseCase: GetOrderNotesUseCase;
  private getOrderNoteUseCase: GetOrderNoteUseCase;
  private createOrderNoteUseCase: CreateOrderNoteUseCase;
  private deleteOrderNoteUseCase: DeleteOrderNoteUseCase;
  private getOrderRefundsUseCase: GetOrderRefundsUseCase;
  private getOrderRefundUseCase: GetOrderRefundUseCase;
  private createOrderRefundUseCase: CreateOrderRefundUseCase;
  private deleteOrderRefundUseCase: DeleteOrderRefundUseCase;

  constructor(private client: WooCommerceClient) {
    this.getOrdersUseCase = new GetOrdersUseCase(client);
    this.getOrderUseCase = new GetOrderUseCase(client);
    this.createOrderUseCase = new CreateOrderUseCase(client);
    this.updateOrderUseCase = new UpdateOrderUseCase(client);
    this.deleteOrderUseCase = new DeleteOrderUseCase(client);
    this.getOrderNotesUseCase = new GetOrderNotesUseCase(client);
    this.getOrderNoteUseCase = new GetOrderNoteUseCase(client);
    this.createOrderNoteUseCase = new CreateOrderNoteUseCase(client);
    this.deleteOrderNoteUseCase = new DeleteOrderNoteUseCase(client);
    this.getOrderRefundsUseCase = new GetOrderRefundsUseCase(client);
    this.getOrderRefundUseCase = new GetOrderRefundUseCase(client);
    this.createOrderRefundUseCase = new CreateOrderRefundUseCase(client);
    this.deleteOrderRefundUseCase = new DeleteOrderRefundUseCase(client);
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
      
      // Notes
      case "get_order_notes":
        return this.getOrderNotesUseCase.execute(params);
      case "get_order_note":
        return this.getOrderNoteUseCase.execute(params);
      case "create_order_note":
        return this.createOrderNoteUseCase.execute(params);
      case "delete_order_note":
        return this.deleteOrderNoteUseCase.execute(params);
      
      // Refunds
      case "get_order_refunds":
        return this.getOrderRefundsUseCase.execute(params);
      case "get_order_refund":
        return this.getOrderRefundUseCase.execute(params);
      case "create_order_refund":
        return this.createOrderRefundUseCase.execute(params);
      case "delete_order_refund":
        return this.deleteOrderRefundUseCase.execute(params);

      default:
        throw new Error(`Method ${method} not handled by OrderController`);
    }
  }
}
