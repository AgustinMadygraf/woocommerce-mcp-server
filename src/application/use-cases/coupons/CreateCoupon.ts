import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class CreateCouponUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.couponData) {
      throw new Error("Coupon data is required");
    }
    return this.client.post("/coupons", params.couponData);
  }
}
