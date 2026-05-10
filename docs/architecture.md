# Arquitectura del Servidor MCP de WooCommerce

Este servidor está diseñado bajo el paradigma de **Arquitectura Limpia** para servir como el componente transaccional de un ecosistema de **CEO Virtual**.

## Contexto del Ecosistema
El servidor no opera de forma aislada; está diseñado para que sus datos sean consumidos y cruzados por un agente de IA que también tiene acceso a:
- **Google Analytics / Clarity**: Tráfico y comportamiento vs. Conversión (WooCommerce).
- **Xubio**: Ventas reales vs. Facturación contable.
- **Chatwoot**: Consultas de soporte vs. Historial de compras (`get_customer`).

## Estrategia de Reducción de Herramientas
Para garantizar que el "CEO Virtual" no se abrume con detalles técnicos irrelevantes, la interfaz MCP se limita a 10 herramientas de alto nivel.
- **Consolidación**: No existen herramientas específicas para "meta-data"; toda la información extendida debe ser manejada dentro de los objetos principales (Product, Order, Customer).
- **Enfoque en Reportes**: Se priorizan los endpoints de `/reports` para permitir análisis de tendencias sin procesar miles de registros individuales.

- `src/core/`: Tipos y entidades de dominio.
- `src/application/use-cases/`: Lógica de negocio (casos de uso).
- `src/infrastructure/`: Clientes de API, logging y configuración.
- `src/interfaces/mcp/controllers/`: Controladores que orquestan los casos de uso.
- `src/interfaces/mcp/RequestDispatcher.ts`: Enrutador central de peticiones.

## Decisiones de Diseño Estratégicas

### 1. Interoperabilidad (Mapeo de Identidades)
Para que el CEO Virtual pueda correlacionar datos entre múltiples plataformas:
- **Email como Ancla Universal**: Se utiliza el correo electrónico para vincular clientes de WooCommerce con contactos en **Chatwoot** y sesiones en **Clarity**.
- **Acción**: El servidor debe garantizar que el email esté presente en las respuestas de `get_customer` y `get_orders` para facilitar este cruce.

### 2. Seguridad en Operaciones Masivas
- **Protocolo de Confirmación**: El agente de IA debe solicitar autorización humana explícita antes de ejecutar `batch_products` si la operación afecta a más del 10% del catálogo o altera precios/stock de forma significativa.
- **Dry-run**: Se recomienda que el agente describa primero el impacto de la operación antes de solicitar la ejecución.

## Guía de Desarrollo y Extensión

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

## Estándares de Código y Calidad

- **SOLID**: Mantén las clases pequeñas y con una sola responsabilidad.
- **Inversión de Dependencias**: Las capas internas definen interfaces que las capas externas implementan.
- **stderr para Logs**: Todos los logs deben enviarse a `stderr` usando la clase `Logger` para no corromper el flujo JSON-RPC en `stdout`.
- **Tipado Fuerte**: Usa las interfaces definidas en `src/core/types` y evita el uso de `any` siempre que sea posible.

## Comandos Útiles

- `npm run build`: Compila el proyecto usando `tsc`.
- `npm test`: Ejecuta la suite de pruebas con Vitest.

