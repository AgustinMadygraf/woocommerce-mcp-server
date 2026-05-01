import * as readline from 'readline';
import { DiscoveryService, McpConfig } from '../src/infrastructure/config/DiscoveryService';
import { Logger } from '../src/infrastructure/logging/Logger';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function runSetup() {
  console.log('\n🚀 WooCommerce MCP - Asistente de Configuración Inteligente\n');

  const discovery = new DiscoveryService();
  const existingConfig = await discovery.discover();

  const config: McpConfig = { ...existingConfig };

  // 1. URL del Sitio
  if (!config.siteUrl) {
    config.siteUrl = await question('🌐 URL de tu sitio WordPress (ej: https://tusitio.com): ');
  } else {
    const changeUrl = await question(`🌐 URL detectada: ${config.siteUrl}. ¿Deseas cambiarla? (s/n): `);
    if (changeUrl.toLowerCase() === 's') {
      config.siteUrl = await question('Nueva URL: ');
    }
  }

  // Limpiar URL
  if (config.siteUrl && config.siteUrl.endsWith('/')) {
    config.siteUrl = config.siteUrl.slice(0, -1);
  }

  // 2. Credenciales WooCommerce
  if (!config.consumerKey) {
    console.log('\n🔑 Configuración de WooCommerce (requerido para productos, pedidos, etc.)');
    config.consumerKey = await question('Consumer Key (ck_...): ');
    config.consumerSecret = await question('Consumer Secret (cs_...): ');
  }

  // 3. Credenciales WordPress (Opcional)
  if (!config.username) {
    const setupWP = await question('\n📝 ¿Deseas configurar acceso a WordPress (para gestionar entradas/posts)? (s/n): ');
    if (setupWP.toLowerCase() === 's') {
      config.username = await question('Usuario WordPress: ');
      config.password = await question('Password (o Application Password): ');
    }
  }

  console.log('\n💾 Guardando configuración...');
  
  const saved = await discovery.saveConfig(config);
  
  if (saved) {
    console.log('\n✅ ¡Configuración completada exitosamente!');
    console.log('Ahora puedes reiniciar tu cliente MCP (Gemini CLI, etc.) para aplicar los cambios.');
  } else {
    console.log('\n❌ No se pudo guardar la configuración automáticamente.');
    console.log('Por favor, copia estas variables de entorno manualmente en tu configuración:');
    console.log(JSON.stringify({
      WORDPRESS_SITE_URL: config.siteUrl,
      WOOCOMMERCE_CONSUMER_KEY: config.consumerKey,
      WOOCOMMERCE_CONSUMER_SECRET: config.consumerSecret,
      WORDPRESS_USERNAME: config.username,
      WORDPRESS_PASSWORD: config.password
    }, null, 2));
  }

  rl.close();
}

runSetup().catch(err => {
  console.error('\n💥 Error durante la configuración:', err);
  rl.close();
  process.exit(1);
});
