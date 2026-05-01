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
    mockedAxios.get.mockResolvedValue({ data: [] });
    mockedAxios.post.mockResolvedValue({ data: {} });
    mockedAxios.put.mockResolvedValue({ data: {} });
    mockedAxios.delete.mockResolvedValue({ data: { deleted: true } });
  });

  const getTools = () => {
    // This is a bit of a hack to get the list of tools from RequestDispatcher
    // In a real scenario, we might want to expose this more cleanly
    return [
      "get_products", "get_orders", "get_customers", "get_coupons", 
      "get_tax_rates", "get_shipping_zones", "get_sales_report",
      "get_system_status", "get_webhooks", "get_order_statuses",
      "get_shipping_classes", "get_shipping_class", "get_customer_downloads",
      "create_webhook", "update_webhook", "delete_webhook",
      "get_post", "delete_post", "get_setting_option",
      "get_users", "get_user", "create_user", "update_user", "delete_user",
      "get_media", "get_medium", "batch_products", "batch_orders",
      "get_plugins", "get_themes", "get_top_sellers_report",
      "get_orders_totals_report", "get_products_totals_report"
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
    } else if (method === 'update_webhook') {
      params.webhookData = { status: 'active' };
    } else if (method === 'create_user') {
      params.userData = { username: 'test', email: 'test@test.com', password: '123' };
    } else if (method === 'update_user') {
      params.userData = { nickname: 'tester' };
    } else if (method.startsWith('batch')) {
      params.batchData = { create: [{ name: 'Test' }] };
    }
    
    const result = await dispatcher.dispatch(method, params);
    expect(result).toBeDefined();
    
    if (method.startsWith('get')) {
      expect(mockedAxios.get).toHaveBeenCalled();
    } else if (method.startsWith('create')) {
      expect(mockedAxios.post).toHaveBeenCalled();
    } else if (method.startsWith('update')) {
      expect(mockedAxios.put).toHaveBeenCalled();
    } else if (method.startsWith('delete')) {
      expect(mockedAxios.delete).toHaveBeenCalled();
    }
  });

  it('should handle update_settings_option (check naming consistency)', async () => {
    await dispatcher.dispatch('update_settings_option', { groupId: 'general', optionId: 'test', optionData: { value: 'value' } });
    expect(mockedAxios.put).toHaveBeenCalled();
  });
});
