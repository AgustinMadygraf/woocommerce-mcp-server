import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetReportUseCase, GetReportParams } from "../../../application/use-cases/reports/GetReport";

export class ReportController {
  private getReportUseCase: GetReportUseCase;

  constructor(client: WooCommerceClient) {
    this.getReportUseCase = new GetReportUseCase(client);
  }

  async handle(method: string, params: any) {
    let reportType = method.replace("get_", "").replace("_report", "");
    
    // Virtual CEO Specific Mappings
    const mappings: Record<string, string> = {
      "sales": "sales",
      "products": "products/totals",
      "customers": "customers/totals",
      "orders": "orders/totals",
      "stock": "products/totals" // Defaulting to products totals for stock overview
    };

    const finalType = mappings[reportType] || reportType;
    
    const useCaseParams: GetReportParams = {
      type: finalType,
      period: params.period || "month",
      dateMin: params.dateMin,
      dateMax: params.dateMax,
      perPage: params.perPage,
      page: params.page,
      filters: params.filters
    };

    return this.getReportUseCase.execute(useCaseParams);
  }
}
