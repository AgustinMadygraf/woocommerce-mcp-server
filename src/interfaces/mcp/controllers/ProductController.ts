import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetProductsUseCase } from "../../../application/use-cases/products/GetProducts";
import { GetProductUseCase } from "../../../application/use-cases/products/GetProduct";
import { CreateProductUseCase } from "../../../application/use-cases/products/CreateProduct";
import { UpdateProductUseCase } from "../../../application/use-cases/products/UpdateProduct";
import { DeleteProductUseCase } from "../../../application/use-cases/products/DeleteProduct";

export class ProductController {
  private getProductsUseCase: GetProductsUseCase;
  private getProductUseCase: GetProductUseCase;
  private createProductUseCase: CreateProductUseCase;
  private updateProductUseCase: UpdateProductUseCase;
  private deleteProductUseCase: DeleteProductUseCase;

  constructor(private client: WooCommerceClient) {
    this.getProductsUseCase = new GetProductsUseCase(client);
    this.getProductUseCase = new GetProductUseCase(client);
    this.createProductUseCase = new CreateProductUseCase(client);
    this.updateProductUseCase = new UpdateProductUseCase(client);
    this.deleteProductUseCase = new DeleteProductUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_products":
        return this.getProductsUseCase.execute({
          perPage: params.perPage,
          page: params.page,
          filters: params.filters,
        });
      case "get_product":
        return this.getProductUseCase.execute(params.productId);
      case "create_product":
        return this.createProductUseCase.execute(params.productData);
      case "update_product":
        return this.updateProductUseCase.execute(params.productId, params.productData);
      case "delete_product":
        return this.deleteProductUseCase.execute(params.productId, params.force);
      default:
        throw new Error(`Method ${method} not handled by ProductController`);
    }
  }
}
