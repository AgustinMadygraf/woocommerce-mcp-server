import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetProductsUseCase } from "../../../application/use-cases/products/GetProducts";
import { BatchProductsUseCase } from "../../../application/use-cases/products/BatchProducts";

export class ProductController {
  private getProductsUseCase: GetProductsUseCase;
  private batchProductsUseCase: BatchProductsUseCase;

  constructor(private client: WooCommerceClient) {
    this.getProductsUseCase = new GetProductsUseCase(client);
    this.batchProductsUseCase = new BatchProductsUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_products":
        return this.getProductsUseCase.execute(params);
      case "batch_products":
        return this.batchProductsUseCase.execute(params.batchData);
      default:
        throw new Error(`Method ${method} not handled by ProductController`);
    }
  }
}
