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

    const data = await this.client.get(endpoint, queryParams);

    // Add strategic context for the Virtual CEO
    return {
      ...data as any,
      _ceo_context: {
        source: "WooCommerce Real-Time Transactions",
        sync_warning: "Los datos externos (Analytics/Clarity) pueden tener un retraso de hasta 24hs respecto a este reporte transaccional.",
        identity_anchor: "Email"
      }
    };
  }
}
