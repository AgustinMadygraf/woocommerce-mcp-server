import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetCouponUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.couponId) {
      throw new Error("Coupon ID is required");
    }
    return this.client.get(`/coupons/${params.couponId}`);
  }
}
