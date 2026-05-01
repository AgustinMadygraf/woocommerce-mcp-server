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
      "get_shipping_classes", "get_shipping_class", "get_customer_downloads"
    ];
  };

  it.each(getTools())('should dispatch GET method: %s', async (method) => {
    const params = method.includes('meta') || method.includes('by_id') || method.includes('single') || method === 'get_product' || method === 'get_order' || method === 'get_customer' || method === 'get_webhook' || method === 'get_customer_downloads' || method === 'get_shipping_class'
      ? { productId: 1, orderId: 1, customerId: 1, webhookId: 1, classId: 1 } 
      : {};
    
    const result = await dispatcher.dispatch(method, params);
    expect(result).toBeDefined();
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  it('should handle update_settings_option (check naming consistency)', async () => {
    await dispatcher.dispatch('update_settings_option', { groupId: 'general', optionId: 'test', optionData: { value: 'value' } });
    expect(mockedAxios.put).toHaveBeenCalled();
  });
});
