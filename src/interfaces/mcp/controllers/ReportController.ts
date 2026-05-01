import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetReportUseCase, GetReportParams } from "../../../application/use-cases/reports/GetReport";

export class ReportController {
  private getReportUseCase: GetReportUseCase;

  constructor(client: WooCommerceClient) {
    this.getReportUseCase = new GetReportUseCase(client);
  }

  async handle(method: string, params: any) {
    const reportType = method.replace("get_", "").replace("_report", "");
    
    const useCaseParams: GetReportParams = {
      type: reportType === "sales" ? "sales" : reportType, // 'sales' report is special in path but here it works
      period: params.period,
      dateMin: params.dateMin,
      dateMax: params.dateMax,
      perPage: params.perPage,
      page: params.page,
      filters: params.filters
    };

    return this.getReportUseCase.execute(useCaseParams);
  }
}
