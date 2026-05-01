import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Logger } from '../logging/Logger';

export interface McpConfig {
  siteUrl?: string;
  username?: string;
  password?: string;
  consumerKey?: string;
  consumerSecret?: string;
}

export class DiscoveryService {
  private homeDir = os.homedir();

  /**
   * Intenta descubrir configuraciones de diversos clientes MCP
   */
  async discover(): Promise<McpConfig> {
    // 1. Intentar cargar desde .env (si existe)
    const envConfig = this.discoverEnv();
    if (envConfig && envConfig.siteUrl && envConfig.consumerKey) {
      Logger.info('Configuración cargada desde .env');
      return envConfig;
    }

    // 2. Intentar cargar desde Gemini
    const geminiConfig = this.discoverGemini();
    if (geminiConfig) {
      Logger.info('Entorno Gemini CLI detectado');
      return geminiConfig;
    }

    return {};
  }

  /**
   * Estrategia para archivo .env local
   */
  private discoverEnv(): McpConfig | null {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf-8');
        const config: McpConfig = {};
        
        content.split('\n').forEach(line => {
          const [key, value] = line.split('=').map(s => s.trim());
          if (key === 'WOOCOMMERCE_URL' || key === 'WORDPRESS_SITE_URL') config.siteUrl = value;
          if (key === 'WOOCOMMERCE_CONSUMER_KEY') config.consumerKey = value;
          if (key === 'WOOCOMMERCE_CONSUMER_SECRET') config.consumerSecret = value;
          if (key === 'WORDPRESS_USERNAME') config.username = value;
          if (key === 'WORDPRESS_PASSWORD') config.password = value;
        });

        return config;
      } catch (e) {
        Logger.error('Error leyendo archivo .env', e);
      }
    }
    return null;
  }

  /**
   * Estrategia para Gemini CLI
   */
  private discoverGemini(): McpConfig | null {
    const configPath = path.join(this.homeDir, '.gemini', 'settings.json');
    if (fs.existsSync(configPath)) {
      try {
        const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        const woo = content.mcpServers?.woocommerce?.env;
        if (woo) {
          return {
            siteUrl: woo.WOOCOMMERCE_URL || woo.WORDPRESS_SITE_URL,
            username: woo.WORDPRESS_USERNAME,
            password: woo.WORDPRESS_PASSWORD,
            consumerKey: woo.WOOCOMMERCE_CONSUMER_KEY,
            consumerSecret: woo.WOOCOMMERCE_CONSUMER_SECRET,
          };
        }
      } catch (e) {
        Logger.error('Error leyendo configuración de Gemini', e);
      }
    }
    return null;
  }

  /**
   * Guarda la configuración en el cliente detectado
   */
  async saveConfig(config: McpConfig): Promise<boolean> {
    const results = await Promise.all([
      this.saveToEnv(config),
      this.saveToGeminiIfPossible(config)
    ]);
    
    return results.some(r => r === true);
  }

  private async saveToEnv(config: McpConfig): Promise<boolean> {
    try {
      const envPath = path.join(process.cwd(), '.env');
      const lines = [
        `# WooCommerce MCP Configuration`,
        `WOOCOMMERCE_URL=${config.siteUrl || ''}`,
        `WOOCOMMERCE_CONSUMER_KEY=${config.consumerKey || ''}`,
        `WOOCOMMERCE_CONSUMER_SECRET=${config.consumerSecret || ''}`,
      ];

      if (config.username) lines.push(`WORDPRESS_USERNAME=${config.username}`);
      if (config.password) lines.push(`WORDPRESS_PASSWORD=${config.password}`);

      fs.writeFileSync(envPath, lines.join('\n'));
      Logger.info(`Configuración guardada en ${envPath}`);
      return true;
    } catch (e) {
      Logger.error('Error guardando archivo .env', e);
      return false;
    }
  }

  private async saveToGeminiIfPossible(config: McpConfig): Promise<boolean> {
    const geminiDir = path.join(this.homeDir, '.gemini');
    if (fs.existsSync(geminiDir)) {
      return this.saveToGemini(config);
    }
    return false;
  }

  private saveToGemini(config: McpConfig): boolean {
    const configPath = path.join(this.homeDir, '.gemini', 'settings.json');
    try {
      let content: any = {};
      if (fs.existsSync(configPath)) {
        content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      }

      if (!content.mcpServers) content.mcpServers = {};
      
      content.mcpServers.woocommerce = {
        command: "node",
        args: [path.join(process.cwd(), "build", "index.js")],
        env: {
          WOOCOMMERCE_URL: config.siteUrl,
          WOOCOMMERCE_CONSUMER_KEY: config.consumerKey,
          WOOCOMMERCE_CONSUMER_SECRET: config.consumerSecret,
          WORDPRESS_USERNAME: config.username,
          WORDPRESS_PASSWORD: config.password,
          LOG_LEVEL: "INFO"
        }
      };

      fs.writeFileSync(configPath, JSON.stringify(content, null, 2));
      Logger.info(`Configuración guardada en ${configPath}`);
      return true;
    } catch (e) {
      Logger.error('Error guardando configuración en Gemini', e);
      return false;
    }
  }
}

