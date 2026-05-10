# SRS - WooCommerce MCP Server

## 1. Propósito
El propósito de este servidor MCP es actuar como el brazo transaccional y operativo de un **CEO Virtual**. Proporciona una interfaz estandarizada para que agentes de IA orquesten operaciones en WooCommerce y WordPress, integrando estos datos con otras fuentes (Google Analytics, Clarity, Xubio, Chatwoot) para la toma de decisiones estratégicas.

## 2. Alcance
El servidor se optimiza para ofrecer un conjunto de 10 herramientas críticas que permiten al CEO Virtual supervisar la rentabilidad, gestionar el inventario estratégico y profundizar en la relación con el cliente.

### 2.1 Herramientas Core (Prioridad CEO)
Para maximizar la eficiencia y reducir el overhead, se seleccionan las siguientes herramientas clave (optimizadas para ~10-12 endpoints):
1.  **get_sales_report**: Análisis de ingresos y salud financiera.
2.  **get_products_report**: Identificación de productos de alto/bajo rendimiento.
3.  **get_stock_report**: Supervisión de niveles de inventario estratégicos.
4.  **get_orders**: Seguimiento de flujo transaccional.
5.  **update_order**: Gestión de excepciones y cambios de estado críticos.
6.  **get_customers_report**: Análisis de LTV y fidelidad.
7.  **get_customer**: Vista 360 del cliente (email para cruce con Chatwoot/Clarity).
8.  **update_customer**: Segmentación y gestión de perfiles VIP.
9.  **get_products**: Consulta y filtrado de catálogo.
10. **batch_products**: Ajustes masivos (requiere confirmación si afecta >10% stock/precio).
11. **get_coupons**: Evaluación de impacto de promociones.
12. **get_system_status**: Verificación de integridad técnica.

### 2.2 Eliminación de Herramientas Excedentes
Se han eliminado físicamente del código fuente ~120 herramientas (metadatos granulares, configuraciones de envío/impuestos, gestión de posts/usuarios no comerciales) para garantizar un servidor ligero y un contexto de IA limpio y enfocado exclusivamente en la toma de decisiones estratégicas.

## 3. Requerimientos Técnicos
- **Lenguaje**: TypeScript.
- **Arquitectura**: Clean Architecture + DDD.
- **Protocolo**: JSON-RPC 2.0 (MCP).
- **Comunicación**: Stdin/Stdout para compatibilidad con clientes MCP.
- **Seguridad**: Autenticación vía Consumer Key/Secret para WooCommerce y Basic Auth para WordPress.

## 4. Requerimientos de Calidad
- **Eficiencia de Herramientas**: Selección del 50% de herramientas con mayor valor operativo para reducir el overhead del protocolo.
- **Paridad de Entidades**: Cobertura completa de las entidades principales (Products, Orders, Customers) aunque se reduzcan los endpoints de metadatos específicos.
- **Testeabilidad**: Cobertura de tests de integración para todas las herramientas marcadas como Core.
- **Documentación**: README actualizado identificando claramente las herramientas Core vs. Inactivas.
