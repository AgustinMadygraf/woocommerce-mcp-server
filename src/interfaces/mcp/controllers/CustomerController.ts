import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetCustomerUseCase } from "../../../application/use-cases/customers/GetCustomer";
import { UpdateCustomerUseCase } from "../../../application/use-cases/customers/UpdateCustomer";

export class CustomerController {
  private getCustomerUseCase: GetCustomerUseCase;
  private updateCustomerUseCase: UpdateCustomerUseCase;

  constructor(private client: WooCommerceClient) {
    this.getCustomerUseCase = new GetCustomerUseCase(client);
    this.updateCustomerUseCase = new UpdateCustomerUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_customer":
        return this.getCustomerUseCase.execute(params.customerId);
      case "update_customer":
        return this.updateCustomerUseCase.execute(params.customerId, params.customerData);
      default:
        throw new Error(`Method ${method} not handled by CustomerController`);
    }
  }
}
