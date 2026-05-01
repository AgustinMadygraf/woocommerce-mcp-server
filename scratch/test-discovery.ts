import { DiscoveryService } from '../src/infrastructure/config/DiscoveryService';

async function test() {
  const discovery = new DiscoveryService();
  console.log('Buscando configuraciones...');
  const config = await discovery.discover();
  console.log('Configuración detectada:', JSON.stringify(config, null, 2));
}

test();
