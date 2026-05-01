import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RequestDispatcher } from '../src/interfaces/mcp/RequestDispatcher';
import { WooCommerceClient } from '../src/infrastructure/api/WooCommerceClient';
import { WordPressClient } from '../src/infrastructure/api/WordPressClient';
import axios from 'axios';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('WooCommerce MCP Tools Integration', () => {
  let dispatcher: RequestDispatcher;
  let wooClient: WooCommerceClient;
  let wpClient: WordPressClient;

  beforeEach(() => {
    vi.clearAllMocks();
    mockedAxios.create.mockReturnValue(mockedAxios as any);
    
    wooClient = new WooCommerceClient('https://test-store.com');
    wpClient = new WordPressClient('https://test-store.com');
    dispatcher = new RequestDispatcher(wooClient, wpClient);
    
    // Default success response
    mockedAxios.get.mockResolvedValue({ data: { id: 1, meta_data: [] } });
    mockedAxios.post.mockResolvedValue({ data: { id: 1, meta_data: [] } });
    mockedAxios.put.mockResolvedValue({ data: { id: 1, meta_data: [] } });
    mockedAxios.delete.mockResolvedValue({ data: { deleted: true } });
  });

  const getTools = () => {
    return [
      "get_products", "get_product", "create_product", "update_product", "delete_product",
      "get_orders", "get_order", "create_order", "update_order", "delete_order",
      "get_customers", "get_customer", "create_customer", "update_customer", "delete_customer",
      "get_coupons", "get_coupon", "create_coupon", "update_coupon", "delete_coupon",
      "get_tax_rates", "get_tax_rate", "create_tax_rate", "update_tax_rate", "delete_tax_rate",
      "get_shipping_zones", "get_shipping_zone", "create_shipping_zone", "update_shipping_zone", "delete_shipping_zone",
      "get_sales_report", "get_top_sellers_report",
      "get_system_status", "get_webhooks", "get_order_statuses",
      "get_shipping_classes", "get_shipping_class", "get_customer_downloads",
      "create_webhook", "update_webhook", "delete_webhook",
      "get_post", "delete_post", "get_setting_option",
      "get_users", "get_user", "create_user", "update_user", "delete_user",
      "get_media", "get_medium", "batch_products", "batch_orders",
      "get_plugins", "get_themes", "get_orders_totals_report", "get_products_totals_report",
      "get_product_categories", "get_product_category", "create_product_category", "update_product_category", "delete_product_category",
      "get_product_tags", "get_product_tag", "create_product_tag", "update_product_tag", "delete_product_tag",
      "get_product_reviews", "get_product_review", "create_product_review", "update_product_review", "delete_product_review",
      "get_product_attributes", "get_product_attribute", "create_product_attribute", "update_product_attribute", "delete_product_attribute",
      "get_attribute_terms", "get_attribute_term", "create_attribute_term", "update_attribute_term", "delete_attribute_term",
      "get_product_meta", "update_product_meta", "create_product_meta", "delete_product_meta",
      "get_order_meta", "update_order_meta", "create_order_meta", "delete_order_meta",
      "get_customer_meta", "update_customer_meta", "create_customer_meta", "delete_customer_meta"
    ];
  };

  it.each(getTools())('should dispatch method: %s', async (method) => {
    const params: any = { 
      productId: 1, orderId: 1, customerId: 1, webhookId: 1, classId: 1, 
      postId: 1, userId: 1, mediaId: 1,
      groupId: 'general', optionId: 'test' 
    };
    
    if (method === 'create_webhook') {
      params.webhookData = { name: 'Test', topic: 'order.created', delivery_url: 'https://test.com' };
    }
    if (method === 'update_webhook') {
      params.webhookData = { status: 'active' };
    }
    if (method === 'create_user') {
      params.userData = { username: 'test', email: 'test@test.com', password: '123' };
    }
    if (method === 'update_user') {
      params.userData = { nickname: 'tester' };
    }
    if (method.startsWith('batch')) {
      params.batchData = { create: [{ name: 'Test' }] };
    }
    if (method.includes('product') || method.includes('attribute') || method.includes('category') || method.includes('tag')) {
      params.productData = { name: 'Test' };
      params.categoryData = { name: 'Test' };
      params.tagData = { name: 'Test' };
      params.attributeData = { name: 'Test' };
      params.termData = { name: 'Test' };
      params.reviewData = { review: 'Test', rating: 5, reviewer: 'Test', reviewer_email: 'test@test.com' };
      params.attributeId = 1;
      params.termId = 1;
      params.categoryId = 1;
      params.tagId = 1;
      params.reviewId = 1;
    }
    if (method.includes('order')) {
      params.orderData = { customer_id: 1 };
      params.noteData = { note: 'Test' };
      params.refundData = { amount: '10.00' };
      params.noteId = 1;
      params.refundId = 1;
    }
    if (method.includes('customer')) {
      params.customerData = { email: 'test@test.com' };
    }
    if (method.includes('coupon')) {
      params.couponData = { code: 'test' };
      params.couponId = 1;
    }
    if (method.includes('tax')) {
      params.taxRateData = { name: 'Test' };
      params.taxClassData = { name: 'Test' };
      params.taxRateId = 1; // Used in DeleteTaxRate?
      params.rateId = 1;    // Used in GetTaxRate/UpdateTaxRate
      params.taxClassId = 'standard';
    }
    if (method.includes('shipping')) {
      params.zoneData = { name: 'Test' };
      params.shippingMethodData = { method_id: 'flat_rate' };
      params.locationData = [{ code: 'US', type: 'country' }];
      params.zoneId = 1;
      params.instanceId = 1;
    }
    if (method.includes('meta')) {
      params.metaKey = 'test';
      params.metaValue = 'test';
    }
    
    const result = await dispatcher.dispatch(method, params);
    expect(result).toBeDefined();
    
    if (method.startsWith('get')) {
      expect(mockedAxios.get).toHaveBeenCalled();
    } else if (method.startsWith('create')) {
      if (method.includes('meta')) {
        expect(mockedAxios.put).toHaveBeenCalled();
      } else {
        expect(mockedAxios.post).toHaveBeenCalled();
      }
    } else if (method.startsWith('update')) {
      expect(mockedAxios.put).toHaveBeenCalled();
    } else if (method.startsWith('delete')) {
      if (method.includes('meta')) {
        expect(mockedAxios.put).toHaveBeenCalled();
      } else {
        expect(mockedAxios.delete).toHaveBeenCalled();
      }
    }
  });

  it('should handle update_settings_option (check naming consistency)', async () => {
    await dispatcher.dispatch('update_settings_option', { groupId: 'general', optionId: 'test', optionData: { value: 'value' } });
    expect(mockedAxios.put).toHaveBeenCalled();
  });

  it('should throw error for unknown method', async () => {
    await expect(dispatcher.dispatch('unknown_method', {})).rejects.toThrow('Unknown method: unknown_method');
  });
});
