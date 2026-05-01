import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetTaxRatesUseCase } from "../../../application/use-cases/taxes/GetTaxRates";
import { GetTaxRateUseCase } from "../../../application/use-cases/taxes/GetTaxRate";
import { CreateTaxRateUseCase } from "../../../application/use-cases/taxes/CreateTaxRate";
import { UpdateTaxRateUseCase } from "../../../application/use-cases/taxes/UpdateTaxRate";
import { DeleteTaxRateUseCase } from "../../../application/use-cases/taxes/DeleteTaxRate";
import { GetTaxClassesUseCase } from "../../../application/use-cases/taxes/GetTaxClasses";
import { CreateTaxClassUseCase } from "../../../application/use-cases/taxes/CreateTaxClass";
import { DeleteTaxClassUseCase } from "../../../application/use-cases/taxes/DeleteTaxClass";

export class TaxController {
  private getTaxRatesUseCase: GetTaxRatesUseCase;
  private getTaxRateUseCase: GetTaxRateUseCase;
  private createTaxRateUseCase: CreateTaxRateUseCase;
  private updateTaxRateUseCase: UpdateTaxRateUseCase;
  private deleteTaxRateUseCase: DeleteTaxRateUseCase;
  private getTaxClassesUseCase: GetTaxClassesUseCase;
  private createTaxClassUseCase: CreateTaxClassUseCase;
  private deleteTaxClassUseCase: DeleteTaxClassUseCase;

  constructor(client: WooCommerceClient) {
    this.getTaxRatesUseCase = new GetTaxRatesUseCase(client);
    this.getTaxRateUseCase = new GetTaxRateUseCase(client);
    this.createTaxRateUseCase = new CreateTaxRateUseCase(client);
    this.updateTaxRateUseCase = new UpdateTaxRateUseCase(client);
    this.deleteTaxRateUseCase = new DeleteTaxRateUseCase(client);
    this.getTaxClassesUseCase = new GetTaxClassesUseCase(client);
    this.createTaxClassUseCase = new CreateTaxClassUseCase(client);
    this.deleteTaxClassUseCase = new DeleteTaxClassUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_tax_rates":
        return this.getTaxRatesUseCase.execute(params);
      case "get_tax_rate":
        return this.getTaxRateUseCase.execute(params);
      case "create_tax_rate":
        return this.createTaxRateUseCase.execute(params);
      case "update_tax_rate":
        return this.updateTaxRateUseCase.execute(params);
      case "delete_tax_rate":
        return this.deleteTaxRateUseCase.execute(params);
      case "get_tax_classes":
        return this.getTaxClassesUseCase.execute();
      case "create_tax_class":
        return this.createTaxClassUseCase.execute(params);
      case "delete_tax_class":
        return this.deleteTaxClassUseCase.execute(params);
      default:
        throw new Error(`Method ${method} not handled by TaxController`);
    }
  }
}
