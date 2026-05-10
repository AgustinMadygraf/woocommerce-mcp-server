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
      "get_sales_report",
      "get_products_report",
      "get_stock_report",
      "get_orders",
      "update_order",
      "get_customers_report",
      "get_customer",
      "update_customer",
      "get_products",
      "batch_products",
      "get_coupons",
      "get_system_status"
    ];
  };

  it.each(getTools())('should dispatch method: %s', async (method) => {
    const params: any = { 
      productId: 1, orderId: 1, customerId: 1
    };
    
    if (method.startsWith('batch')) {
      params.batchData = { create: [{ name: 'Test' }] };
    }
    if (method.includes('order')) {
      params.orderData = { status: 'completed' };
    }
    if (method.includes('customer')) {
      params.customerData = { email: 'test@test.com' };
    }
    
    const result = await dispatcher.dispatch(method, params);
    expect(result).toBeDefined();
    
    if (method.startsWith('get')) {
      expect(mockedAxios.get).toHaveBeenCalled();
    } else if (method.startsWith('batch')) {
        expect(mockedAxios.post).toHaveBeenCalled();
    } else if (method.startsWith('update')) {
      expect(mockedAxios.put).toHaveBeenCalled();
    }
  });

  it('should throw error for unknown method', async () => {
    await expect(dispatcher.dispatch('unknown_method', {})).rejects.toThrow('Method unknown_method is not available in this Virtual CEO edition.');
  });
});
