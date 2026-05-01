# Arquitectura del Servidor MCP de WooCommerce

Este proyecto sigue los principios de **Arquitectura Limpia (Clean Architecture)**, **SOLID** y **Domain-Driven Design (DDD)** para garantizar mantenibilidad, testeabilidad y escalabilidad.

## Capas de la Aplicación

### 1. Capa de Dominio (`src/core`)
Es el corazón de la aplicación. Contiene las reglas de negocio, entidades y tipos fundamentales. No depende de ninguna otra capa.
- **Entities**: Objetos con identidad propia (Product, Order, Customer).
- **Value Objects**: Objetos definidos por sus atributos (Address, Money).
- **Domain Errors**: Excepciones específicas del negocio.

### 2. Capa de Aplicación (`src/application`)
Contiene la lógica específica de la aplicación y los casos de uso. Orquesta el flujo de datos desde y hacia las entidades de dominio.
- **Use Cases**: Acciones que el usuario puede realizar (GetProducts, CreateOrder).
- **Interfaces**: Definiciones de contratos para repositorios y servicios externos.

### 3. Capa de Adaptadores de Interfaz (`src/interfaces`)
Convierte los datos en el formato más conveniente para las capas externas (MCP/JSON-RPC) o para los casos de uso.
- **Controllers**: Manejan las peticiones MCP y delegan a los casos de uso.
- **Presenters**: Formatean la respuesta para el cliente.

### 4. Capa de Infraestructura (`src/infrastructure`)
Contiene los detalles de implementación técnica: persistencia, clientes de APIs externas y configuración.
- **API Clients**: Implementaciones de Axios para WordPress y WooCommerce.
- **Config**: Gestión de variables de entorno.

## Principios Aplicados

- **S.O.L.I.D.**: Cada clase tiene una única responsabilidad (SRP), el sistema es extensible sin modificar código existente (OCP), y las dependencias se inyectan mediante interfaces (DIP).
- **Inversión de Dependencias**: Las capas internas definen interfaces que las capas externas implementan.
- **Separación de Intereses**: El protocolo de comunicación (JSON-RPC) está totalmente desacoplado de la lógica de negocio de WooCommerce.
