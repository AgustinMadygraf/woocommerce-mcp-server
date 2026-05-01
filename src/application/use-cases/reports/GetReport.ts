import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export interface GetReportParams {
  type: string;
  period?: string;
  dateMin?: string;
  dateMax?: string;
  perPage?: number;
  page?: number;
  filters?: Record<string, any>;
}

export class GetReportUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: GetReportParams) {
    const endpoint = `/reports/${params.type}`;
    
    const queryParams: any = {
      period: params.period || "month",
      date_min: params.dateMin || "",
      date_max: params.dateMax || "",
      ...params.filters
    };

    if (params.perPage) queryParams.per_page = params.perPage;
    if (params.page) queryParams.page = params.page;

    return this.client.get(endpoint, queryParams);
  }
}
