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
    const geminiConfig = this.discoverGemini();
    if (geminiConfig) {
      Logger.info('Entorno Gemini CLI detectado');
      return geminiConfig;
    }

    // Aquí se pueden añadir más estrategias (Claude, etc.)
    return {};
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
            siteUrl: woo.WORDPRESS_SITE_URL,
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
    // Por ahora priorizamos guardar en Gemini si existe el directorio
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
          WORDPRESS_SITE_URL: config.siteUrl,
          WORDPRESS_USERNAME: config.username,
          WORDPRESS_PASSWORD: config.password,
          WOOCOMMERCE_CONSUMER_KEY: config.consumerKey,
          WOOCOMMERCE_CONSUMER_SECRET: config.consumerSecret,
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
