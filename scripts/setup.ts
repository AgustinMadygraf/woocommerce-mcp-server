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

  console.log('📝 Por favor, introduce las 3 variables principales para conectar con WooCommerce:\n');

  // 1. URL del Sitio
  if (!config.siteUrl) {
    config.siteUrl = await question('🌐 1. URL de tu tienda WooCommerce (ej: https://tusitio.com): ');
  } else {
    const changeUrl = await question(`🌐 URL detectada: ${config.siteUrl}. ¿Deseas cambiarla? (s/n): `);
    if (changeUrl.toLowerCase() === 's') {
      config.siteUrl = await question('   Nueva URL: ');
    }
  }

  // Limpiar URL
  if (config.siteUrl && config.siteUrl.endsWith('/')) {
    config.siteUrl = config.siteUrl.slice(0, -1);
  }

  // 2. Credenciales WooCommerce
  if (!config.consumerKey) {
    console.log('\n🔑 2. Credenciales de la API REST (WooCommerce -> Ajustes -> Avanzado -> REST API)');
    config.consumerKey = await question('   Consumer Key (ck_...): ');
    config.consumerSecret = await question('   Consumer Secret (cs_...): ');
  } else {
    const changeKeys = await question(`🔑 Keys detectadas (${config.consumerKey.substring(0, 8)}...). ¿Deseas cambiarlas? (s/n): `);
    if (changeKeys.toLowerCase() === 's') {
      config.consumerKey = await question('   Nueva Consumer Key: ');
      config.consumerSecret = await question('   Nuevo Consumer Secret: ');
    }
  }

  // 3. Credenciales WordPress (Opcional)
  if (!config.username) {
    const setupWP = await question('\n📝 ¿Deseas configurar acceso extra a WordPress (opcional para entradas/posts)? (s/n): ');
    if (setupWP.toLowerCase() === 's') {
      config.username = await question('   Usuario WordPress: ');
      config.password = await question('   Password / Application Password: ');
    }
  }

  console.log('\n💾 Guardando configuración en .env y clientes MCP...');
  
  const saved = await discovery.saveConfig(config);
  
  if (saved) {
    console.log('\n✅ ¡Configuración completada exitosamente!');
    console.log('Se ha creado/actualizado el archivo .env con tus credenciales.');
    console.log('Ahora puedes iniciar el servidor con "npm run start" o reiniciar tu cliente MCP.');
  } else {
    console.log('\n❌ No se pudo guardar la configuración automáticamente.');
    console.log('Por favor, crea un archivo .env manualmente con:');
    console.log(`
WOOCOMMERCE_URL=${config.siteUrl}
WOOCOMMERCE_CONSUMER_KEY=${config.consumerKey}
WOOCOMMERCE_CONSUMER_SECRET=${config.consumerSecret}
    `);
  }

  rl.close();
}

runSetup().catch(err => {
  console.error('\n💥 Error durante la configuración:', err);
  rl.close();
  process.exit(1);
});
