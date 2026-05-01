import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetCustomersUseCase } from "../../../application/use-cases/customers/GetCustomers";
import { GetCustomerUseCase } from "../../../application/use-cases/customers/GetCustomer";
import { CreateCustomerUseCase } from "../../../application/use-cases/customers/CreateCustomer";
import { UpdateCustomerUseCase } from "../../../application/use-cases/customers/UpdateCustomer";
import { DeleteCustomerUseCase } from "../../../application/use-cases/customers/DeleteCustomer";
import { GetCustomerDownloadsUseCase } from "../../../application/use-cases/customers/GetCustomerDownloads";

export class CustomerController {
  private getCustomersUseCase: GetCustomersUseCase;
  private getCustomerUseCase: GetCustomerUseCase;
  private createCustomerUseCase: CreateCustomerUseCase;
  private updateCustomerUseCase: UpdateCustomerUseCase;
  private deleteCustomerUseCase: DeleteCustomerUseCase;
  private getCustomerDownloadsUseCase: GetCustomerDownloadsUseCase;

  constructor(private client: WooCommerceClient) {
    this.getCustomersUseCase = new GetCustomersUseCase(client);
    this.getCustomerUseCase = new GetCustomerUseCase(client);
    this.createCustomerUseCase = new CreateCustomerUseCase(client);
    this.updateCustomerUseCase = new UpdateCustomerUseCase(client);
    this.deleteCustomerUseCase = new DeleteCustomerUseCase(client);
    this.getCustomerDownloadsUseCase = new GetCustomerDownloadsUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_customers":
        return this.getCustomersUseCase.execute(params);
      case "get_customer":
        return this.getCustomerUseCase.execute(params.customerId);
      case "create_customer":
        return this.createCustomerUseCase.execute(params.customerData);
      case "update_customer":
        return this.updateCustomerUseCase.execute(params.customerId, params.customerData);
      case "delete_customer":
        return this.deleteCustomerUseCase.execute(params.customerId, params.force);
      case "get_customer_downloads":
        return this.getCustomerDownloadsUseCase.execute(params.customerId);
      default:
        throw new Error(`Method ${method} not handled by CustomerController`);
    }
  }
}
