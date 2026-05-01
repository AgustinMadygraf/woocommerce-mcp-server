import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class UpdateCouponUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.couponId) {
      throw new Error("Coupon ID is required");
    }
    if (!params.couponData) {
      throw new Error("Coupon data is required");
    }
    return this.client.put(`/coupons/${params.couponId}`, params.couponData);
  }
}
