import { WooCommerceClient } from "../../infrastructure/api/WooCommerceClient";
import { WordPressClient } from "../../infrastructure/api/WordPressClient";
import { ProductController } from "./controllers/ProductController";
import { OrderController } from "./controllers/OrderController";
import { CustomerController } from "./controllers/CustomerController";
import { ReportController } from "./controllers/ReportController";
import { PostController } from "./controllers/PostController";
import { CouponController } from "./controllers/CouponController";
import { TaxController } from "./controllers/TaxController";
import { ShippingController } from "./controllers/ShippingController";
import { MetaController } from "./controllers/MetaController";
import { SystemController } from "./controllers/SystemController";

export class RequestDispatcher {
  private productController: ProductController;
  private orderController: OrderController;
  private customerController: CustomerController;
  private reportController: ReportController;
  private postController: PostController;
  private couponController: CouponController;
  private taxController: TaxController;
  private shippingController: ShippingController;
  private metaController: MetaController;
  private systemController: SystemController;

  constructor(wooClient: WooCommerceClient, wpClient: WordPressClient) {
    this.productController = new ProductController(wooClient);
    this.orderController = new OrderController(wooClient);
    this.customerController = new CustomerController(wooClient);
    this.reportController = new ReportController(wooClient);
    this.postController = new PostController(wpClient);
    this.couponController = new CouponController(wooClient);
    this.taxController = new TaxController(wooClient);
    this.shippingController = new ShippingController(wooClient);
    this.metaController = new MetaController(wooClient);
    this.systemController = new SystemController(wooClient);
  }

  async dispatch(method: string, params: any) {
    const productMethods = [
      "get_products", "get_product", "create_product", "update_product", "delete_product",
      "get_product_variations", "get_product_variation", "create_product_variation", "update_product_variation", "delete_product_variation",
      "get_product_attributes", "get_product_attribute", "create_product_attribute", "update_product_attribute", "delete_product_attribute",
      "get_attribute_terms", "get_attribute_term", "create_attribute_term", "update_attribute_term", "delete_attribute_term",
      "get_product_categories", "get_product_category", "create_product_category", "update_product_category", "delete_product_category",
      "get_product_tags", "get_product_tag", "create_product_tag", "update_product_tag", "delete_product_tag",
      "get_product_reviews", "get_product_review", "create_product_review", "update_product_review", "delete_product_review"
    ];

    const orderMethods = [
      "get_orders", "get_order", "create_order", "update_order", "delete_order",
      "get_order_notes", "get_order_note", "create_order_note", "delete_order_note",
      "get_order_refunds", "get_order_refund", "create_order_refund", "delete_order_refund"
    ];

    const customerMethods = [
      "get_customers", "get_customer", "create_customer", "update_customer", "delete_customer"
    ];

    const reportMethods = [
      "get_sales_report", "get_products_report", "get_orders_report", 
      "get_categories_report", "get_customers_report", "get_stock_report", 
      "get_coupons_report", "get_taxes_report"
    ];

    const postMethods = [
      "get_posts", "create_post", "update_post",
      "get_post_meta", "create_post_meta", "update_post_meta", "delete_post_meta"
    ];

    const couponMethods = ["get_coupons", "get_coupon", "create_coupon", "update_coupon", "delete_coupon"];

    const taxMethods = [
      "get_tax_rates", "get_tax_rate", "create_tax_rate", "update_tax_rate", "delete_tax_rate",
      "get_tax_classes", "create_tax_class", "delete_tax_class"
    ];

    const shippingMethods = [
      "get_shipping_zones", "get_shipping_zone", "create_shipping_zone", "update_shipping_zone", "delete_shipping_zone",
      "get_shipping_methods", "get_shipping_zone_methods", "create_shipping_zone_method", "update_shipping_zone_method", "delete_shipping_zone_method",
      "get_shipping_zone_locations", "update_shipping_zone_locations"
    ];

    const metaMethods = [
      "get_product_meta", "update_product_meta", "create_product_meta", "delete_product_meta",
      "get_order_meta", "update_order_meta", "create_order_meta", "delete_order_meta",
      "get_customer_meta", "update_customer_meta", "create_customer_meta", "delete_customer_meta"
    ];

    const systemMethods = [
      "get_payment_gateways", "get_payment_gateway", "update_payment_gateway",
      "get_settings", "get_setting_options", "update_settings_option",
      "get_system_status", "get_system_status_tools", "run_system_status_tool",
      "get_data", "get_data_index", "get_continents", "get_countries", "get_currencies", "get_current_currency"
    ];

    if (productMethods.includes(method)) return this.productController.handle(method, params);
    if (orderMethods.includes(method)) return this.orderController.handle(method, params);
    if (customerMethods.includes(method)) return this.customerController.handle(method, params);
    if (reportMethods.includes(method)) return this.reportController.handle(method, params);
    if (postMethods.includes(method)) return this.postController.handle(method, params);
    if (couponMethods.includes(method)) return this.couponController.handle(method, params);
    if (taxMethods.includes(method)) return this.taxController.handle(method, params);
    if (shippingMethods.includes(method)) return this.shippingController.handle(method, params);
    if (metaMethods.includes(method)) return this.metaController.handle(method, params);
    if (systemMethods.includes(method)) return this.systemController.handle(method, params);
    
    return null; 
  }
}
