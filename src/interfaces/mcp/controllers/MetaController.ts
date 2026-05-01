import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetProductMetaUseCase } from "../../../application/use-cases/meta/GetProductMeta";
import { UpdateProductMetaUseCase } from "../../../application/use-cases/meta/UpdateProductMeta";
import { DeleteProductMetaUseCase } from "../../../application/use-cases/meta/DeleteProductMeta";
import { GetOrderMetaUseCase } from "../../../application/use-cases/meta/GetOrderMeta";
import { UpdateOrderMetaUseCase } from "../../../application/use-cases/meta/UpdateOrderMeta";
import { DeleteOrderMetaUseCase } from "../../../application/use-cases/meta/DeleteOrderMeta";
import { GetCustomerMetaUseCase } from "../../../application/use-cases/meta/GetCustomerMeta";
import { UpdateCustomerMetaUseCase } from "../../../application/use-cases/meta/UpdateCustomerMeta";
import { DeleteCustomerMetaUseCase } from "../../../application/use-cases/meta/DeleteCustomerMeta";

export class MetaController {
  private getProductMetaUseCase: GetProductMetaUseCase;
  private updateProductMetaUseCase: UpdateProductMetaUseCase;
  private deleteProductMetaUseCase: DeleteProductMetaUseCase;
  private getOrderMetaUseCase: GetOrderMetaUseCase;
  private updateOrderMetaUseCase: UpdateOrderMetaUseCase;
  private deleteOrderMetaUseCase: DeleteOrderMetaUseCase;
  private getCustomerMetaUseCase: GetCustomerMetaUseCase;
  private updateCustomerMetaUseCase: UpdateCustomerMetaUseCase;
  private deleteCustomerMetaUseCase: DeleteCustomerMetaUseCase;

  constructor(client: WooCommerceClient) {
    this.getProductMetaUseCase = new GetProductMetaUseCase(client);
    this.updateProductMetaUseCase = new UpdateProductMetaUseCase(client);
    this.deleteProductMetaUseCase = new DeleteProductMetaUseCase(client);
    this.getOrderMetaUseCase = new GetOrderMetaUseCase(client);
    this.updateOrderMetaUseCase = new UpdateOrderMetaUseCase(client);
    this.deleteOrderMetaUseCase = new DeleteOrderMetaUseCase(client);
    this.getCustomerMetaUseCase = new GetCustomerMetaUseCase(client);
    this.updateCustomerMetaUseCase = new UpdateCustomerMetaUseCase(client);
    this.deleteCustomerMetaUseCase = new DeleteCustomerMetaUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      // Product Meta
      case "get_product_meta":
        return this.getProductMetaUseCase.execute(params);
      case "create_product_meta":
      case "update_product_meta":
        return this.updateProductMetaUseCase.execute(params);
      case "delete_product_meta":
        return this.deleteProductMetaUseCase.execute(params);

      // Order Meta
      case "get_order_meta":
        return this.getOrderMetaUseCase.execute(params);
      case "create_order_meta":
      case "update_order_meta":
        return this.updateOrderMetaUseCase.execute(params);
      case "delete_order_meta":
        return this.deleteOrderMetaUseCase.execute(params);

      // Customer Meta
      case "get_customer_meta":
        return this.getCustomerMetaUseCase.execute(params);
      case "create_customer_meta":
      case "update_customer_meta":
        return this.updateCustomerMetaUseCase.execute(params);
      case "delete_customer_meta":
        return this.deleteCustomerMetaUseCase.execute(params);

      default:
        throw new Error(`Method ${method} not handled by MetaController`);
    }
  }
}
