import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetReportUseCase, GetReportParams } from "../../../application/use-cases/reports/GetReport";

export class ReportController {
  private getReportUseCase: GetReportUseCase;

  constructor(client: WooCommerceClient) {
    this.getReportUseCase = new GetReportUseCase(client);
  }

  async handle(method: string, params: any) {
    let reportType = method.replace("get_", "").replace("_report", "");
    
    // Map specific report types to sub-paths if needed
    if (reportType.endsWith("_totals")) {
      reportType = reportType.replace("_totals", "/totals");
    }
    
    const useCaseParams: GetReportParams = {
      type: reportType,
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
