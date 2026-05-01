# Guía de Desarrollo y Extensión

Este documento describe cómo extender las funcionalidades del servidor WooCommerce MCP siguiendo la arquitectura establecida.

## Estructura de Carpetas

- `src/core/`: Tipos y entidades de dominio.
- `src/application/use-cases/`: Lógica de negocio (casos de uso).
- `src/infrastructure/`: Clientes de API, logging y configuración.
- `src/interfaces/mcp/controllers/`: Controladores que orquestan los casos de uso.
- `src/interfaces/mcp/RequestDispatcher.ts`: Enrutador central de peticiones.

## Cómo agregar una nueva herramienta (Tool)

Para agregar una nueva funcionalidad de la API de WooCommerce o WordPress, sigue estos pasos:

### 1. Crear el Caso de Uso
Crea un archivo en `src/application/use-cases/[dominio]/[NombreAccion].ts`.

```typescript
import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class MiNuevaAccionUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    // Validar parámetros
    // Llamar a la API
    return this.client.get("/endpoint", params);
  }
}
```

### 2. Registrar en el Controlador
Si el dominio ya existe, añade el caso de uso al controlador correspondiente en `src/interfaces/mcp/controllers/`. Si es un dominio nuevo, crea un nuevo controlador.

```typescript
// En el controlador...
case "mi_nueva_herramienta":
  return this.miNuevaAccionUseCase.execute(params);
```

### 3. Registrar en el Dispatcher
Añade el nombre del método al array correspondiente en `src/interfaces/mcp/RequestDispatcher.ts`.

### 4. Exponer en `index.ts`
Añade el nombre de la herramienta a la lista `tools` dentro de `src/index.ts` para que sea visible para el protocolo MCP.

## Estilo de Código y Patrones

- **SOLID**: Mantén las clases pequeñas y con una sola responsabilidad.
- **stderr para Logs**: Todos los logs deben enviarse a `stderr` usando la clase `Logger` para no corromper el flujo JSON-RPC en `stdout`.
- **Tipado Fuerte**: Usa las interfaces definidas en `src/core/types` y evita el uso de `any` siempre que sea posible (castea las respuestas de la API si es necesario).

## Comandos Útiles

- `npm run build`: Compila el proyecto usando `tsc`.
- `npm run dev`: (Si está configurado) Ejecuta en modo desarrollo.
