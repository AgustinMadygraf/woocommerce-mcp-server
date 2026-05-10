import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetCouponsUseCase } from "../../../application/use-cases/coupons/GetCoupons";

export class CouponController {
  private getCouponsUseCase: GetCouponsUseCase;

  constructor(client: WooCommerceClient) {
    this.getCouponsUseCase = new GetCouponsUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_coupons":
        return this.getCouponsUseCase.execute(params);
      default:
        throw new Error(`Method ${method} not handled by CouponController`);
    }
  }
}
