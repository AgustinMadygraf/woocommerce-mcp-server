import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetCouponsUseCase } from "../../../application/use-cases/coupons/GetCoupons";
import { GetCouponUseCase } from "../../../application/use-cases/coupons/GetCoupon";
import { CreateCouponUseCase } from "../../../application/use-cases/coupons/CreateCoupon";
import { UpdateCouponUseCase } from "../../../application/use-cases/coupons/UpdateCoupon";
import { DeleteCouponUseCase } from "../../../application/use-cases/coupons/DeleteCoupon";

export class CouponController {
  private getCouponsUseCase: GetCouponsUseCase;
  private getCouponUseCase: GetCouponUseCase;
  private createCouponUseCase: CreateCouponUseCase;
  private updateCouponUseCase: UpdateCouponUseCase;
  private deleteCouponUseCase: DeleteCouponUseCase;

  constructor(client: WooCommerceClient) {
    this.getCouponsUseCase = new GetCouponsUseCase(client);
    this.getCouponUseCase = new GetCouponUseCase(client);
    this.createCouponUseCase = new CreateCouponUseCase(client);
    this.updateCouponUseCase = new UpdateCouponUseCase(client);
    this.deleteCouponUseCase = new DeleteCouponUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_coupons":
        return this.getCouponsUseCase.execute(params);
      case "get_coupon":
        return this.getCouponUseCase.execute(params);
      case "create_coupon":
        return this.createCouponUseCase.execute(params);
      case "update_coupon":
        return this.updateCouponUseCase.execute(params);
      case "delete_coupon":
        return this.deleteCouponUseCase.execute(params);
      default:
        throw new Error(`Method ${method} not handled by CouponController`);
    }
  }
}
