import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSuccessResponse, createErrorResponse } from '../src/interfaces/mcp/JsonRpc';
import { Logger, LogLevel } from '../src/infrastructure/logging/Logger';
import { DiscoveryService } from '../src/infrastructure/config/DiscoveryService';
import { validateConfig, config as envConfig } from '../src/infrastructure/config/env';
import * as fs from 'fs';
import * as os from 'os';

vi.mock('fs');
vi.mock('os');

describe('Unit Tests - Infrastructure', () => {

  describe('JsonRpc Helpers', () => {
    it('should create success response', () => {
      const response = createSuccessResponse('1', { data: 'ok' });
      expect(response).toEqual({
        jsonrpc: '2.0',
        id: '1',
        result: { data: 'ok' }
      });
    });

    it('should create error response', () => {
      const response = createErrorResponse('1', -32600, 'Invalid Request', { detail: 'error' });
      expect(response).toEqual({
        jsonrpc: '2.0',
        id: '1',
        error: {
          code: -32600,
          message: 'Invalid Request',
          data: { detail: 'error' }
        }
      });
    });
  });

  describe('Logger', () => {
    it('should log messages with different levels to stderr', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => { });

      Logger.setLevel(LogLevel.DEBUG);
      Logger.debug('debug');
      Logger.info('info');
      Logger.warn('warn');
      Logger.error('error', new Error('test'));

      expect(spy).toHaveBeenCalledTimes(4);

      spy.mockRestore();
    });
  });

  describe('DiscoveryService', () => {
    let service: DiscoveryService;

    beforeEach(() => {
      vi.resetAllMocks();
      vi.mocked(os.homedir).mockReturnValue('/home/test');
      service = new DiscoveryService();
    });

    it('should discover config from .env', async () => {
      vi.mocked(fs.existsSync).mockImplementation((p: any) => p.toString().includes('.env'));
      vi.mocked(fs.readFileSync).mockReturnValue('WOOCOMMERCE_URL=https://test.com\nWOOCOMMERCE_CONSUMER_KEY=ck_123');

      const config = await service.discover();
      expect(config.siteUrl).toBe('https://test.com');
      expect(config.consumerKey).toBe('ck_123');
    });

    it('should discover config from Gemini settings', async () => {
      vi.mocked(fs.existsSync).mockImplementation((p: any) => p.toString().includes('.gemini'));
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
        mcpServers: {
          woocommerce: {
            env: { WOOCOMMERCE_URL: 'https://gemini.com' }
          }
        }
      }));

      const config = await service.discover();
      expect(config.siteUrl).toBe('https://gemini.com');
    });

    it('should save config to .env and Gemini', async () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      const writeSpy = vi.mocked(fs.writeFileSync);

      const success = await service.saveConfig({ siteUrl: 'https://new.com' });
      expect(success).toBe(true);
      expect(writeSpy).toHaveBeenCalled();
    });

    it('should return false if saving fails', async () => {
      vi.mocked(fs.writeFileSync).mockImplementation(() => { throw new Error('fail'); });
      const success = await service.saveConfig({ siteUrl: 'https://new.com' });
      expect(success).toBe(false);
    });
  });

  describe('Environment Config', () => {
    it('should validate config', () => {
      envConfig.wordpress.siteUrl = 'https://test.com';
      expect(() => validateConfig()).not.toThrow();

      envConfig.wordpress.siteUrl = '';
      expect(() => validateConfig()).toThrow('WORDPRESS_SITE_URL is not defined');
    });
  });
});
