import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetPaymentGatewaysUseCase } from "../../../application/use-cases/system/GetPaymentGateways";
import { GetPaymentGatewayUseCase } from "../../../application/use-cases/system/GetPaymentGateway";
import { UpdatePaymentGatewayUseCase } from "../../../application/use-cases/system/UpdatePaymentGateway";
import { GetSettingsGroupsUseCase } from "../../../application/use-cases/system/GetSettingsGroups";
import { GetSettingsGroupUseCase } from "../../../application/use-cases/system/GetSettingsGroup";
import { UpdateSettingsOptionUseCase } from "../../../application/use-cases/system/UpdateSettingsOption";
import { GetSystemStatusUseCase } from "../../../application/use-cases/system/GetSystemStatus";
import { GetSystemStatusToolsUseCase } from "../../../application/use-cases/system/GetSystemStatusTools";
import { RunSystemStatusToolUseCase } from "../../../application/use-cases/system/RunSystemStatusTool";
import { GetDataIndicesUseCase } from "../../../application/use-cases/system/GetDataIndices";
import { GetContinentsUseCase } from "../../../application/use-cases/system/GetContinents";
import { GetCountriesUseCase } from "../../../application/use-cases/system/GetCountries";
import { GetCurrenciesUseCase } from "../../../application/use-cases/system/GetCurrencies";
import { GetCurrentCurrencyUseCase } from "../../../application/use-cases/system/GetCurrentCurrency";
import { GetDataIndexUseCase } from "../../../application/use-cases/system/GetDataIndex";

export class SystemController {
  private getPaymentGatewaysUseCase: GetPaymentGatewaysUseCase;
  private getPaymentGatewayUseCase: GetPaymentGatewayUseCase;
  private updatePaymentGatewayUseCase: UpdatePaymentGatewayUseCase;
  private getSettingsGroupsUseCase: GetSettingsGroupsUseCase;
  private getSettingsGroupUseCase: GetSettingsGroupUseCase;
  private updateSettingsOptionUseCase: UpdateSettingsOptionUseCase;
  private getSystemStatusUseCase: GetSystemStatusUseCase;
  private getSystemStatusToolsUseCase: GetSystemStatusToolsUseCase;
  private runSystemStatusToolUseCase: RunSystemStatusToolUseCase;
  private getDataIndicesUseCase: GetDataIndicesUseCase;
  private getDataIndexUseCase: GetDataIndexUseCase;
  private getContinentsUseCase: GetContinentsUseCase;
  private getCountriesUseCase: GetCountriesUseCase;
  private getCurrenciesUseCase: GetCurrenciesUseCase;
  private getCurrentCurrencyUseCase: GetCurrentCurrencyUseCase;

  constructor(client: WooCommerceClient) {
    this.getPaymentGatewaysUseCase = new GetPaymentGatewaysUseCase(client);
    this.getPaymentGatewayUseCase = new GetPaymentGatewayUseCase(client);
    this.updatePaymentGatewayUseCase = new UpdatePaymentGatewayUseCase(client);
    this.getSettingsGroupsUseCase = new GetSettingsGroupsUseCase(client);
    this.getSettingsGroupUseCase = new GetSettingsGroupUseCase(client);
    this.updateSettingsOptionUseCase = new UpdateSettingsOptionUseCase(client);
    this.getSystemStatusUseCase = new GetSystemStatusUseCase(client);
    this.getSystemStatusToolsUseCase = new GetSystemStatusToolsUseCase(client);
    this.runSystemStatusToolUseCase = new RunSystemStatusToolUseCase(client);
    this.getDataIndicesUseCase = new GetDataIndicesUseCase(client);
    this.getDataIndexUseCase = new GetDataIndexUseCase(client);
    this.getContinentsUseCase = new GetContinentsUseCase(client);
    this.getCountriesUseCase = new GetCountriesUseCase(client);
    this.getCurrenciesUseCase = new GetCurrenciesUseCase(client);
    this.getCurrentCurrencyUseCase = new GetCurrentCurrencyUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_payment_gateways":
        return this.getPaymentGatewaysUseCase.execute();
      case "get_payment_gateway":
        return this.getPaymentGatewayUseCase.execute(params);
      case "update_payment_gateway":
        return this.updatePaymentGatewayUseCase.execute(params);
      case "get_settings":
        return this.getSettingsGroupsUseCase.execute();
      case "get_setting_options":
        return this.getSettingsGroupUseCase.execute(params);
      case "update_settings_option":
        return this.updateSettingsOptionUseCase.execute(params);
      case "get_system_status":
        return this.getSystemStatusUseCase.execute();
      case "get_system_status_tools":
        return this.getSystemStatusToolsUseCase.execute();
      case "run_system_status_tool":
        return this.runSystemStatusToolUseCase.execute(params);
      case "get_data":
        return this.getDataIndicesUseCase.execute();
      case "get_data_index":
        return this.getDataIndexUseCase.execute(params);
      case "get_continents":
        return this.getContinentsUseCase.execute();
      case "get_countries":
        return this.getCountriesUseCase.execute();
      case "get_currencies":
        return this.getCurrenciesUseCase.execute();
      case "get_current_currency":
        return this.getCurrentCurrencyUseCase.execute();
      default:
        throw new Error(`Method ${method} not handled by SystemController`);
    }
  }
}
