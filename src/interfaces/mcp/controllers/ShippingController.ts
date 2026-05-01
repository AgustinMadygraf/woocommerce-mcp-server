import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { GetShippingZonesUseCase } from "../../../application/use-cases/shipping/GetShippingZones";
import { GetShippingZoneUseCase } from "../../../application/use-cases/shipping/GetShippingZone";
import { CreateShippingZoneUseCase } from "../../../application/use-cases/shipping/CreateShippingZone";
import { UpdateShippingZoneUseCase } from "../../../application/use-cases/shipping/UpdateShippingZone";
import { DeleteShippingZoneUseCase } from "../../../application/use-cases/shipping/DeleteShippingZone";
import { GetShippingMethodsUseCase } from "../../../application/use-cases/shipping/GetShippingMethods";
import { GetShippingZoneMethodsUseCase } from "../../../application/use-cases/shipping/GetShippingZoneMethods";
import { CreateShippingZoneMethodUseCase } from "../../../application/use-cases/shipping/CreateShippingZoneMethod";
import { UpdateShippingZoneMethodUseCase } from "../../../application/use-cases/shipping/UpdateShippingZoneMethod";
import { DeleteShippingZoneMethodUseCase } from "../../../application/use-cases/shipping/DeleteShippingZoneMethod";
import { GetShippingZoneLocationsUseCase } from "../../../application/use-cases/shipping/GetShippingZoneLocations";
import { UpdateShippingZoneLocationsUseCase } from "../../../application/use-cases/shipping/UpdateShippingZoneLocations";
import { GetShippingClassesUseCase } from "../../../application/use-cases/shipping/GetShippingClasses";
import { GetShippingClassUseCase } from "../../../application/use-cases/shipping/GetShippingClass";

export class ShippingController {
  private getShippingZonesUseCase: GetShippingZonesUseCase;
  private getShippingZoneUseCase: GetShippingZoneUseCase;
  private createShippingZoneUseCase: CreateShippingZoneUseCase;
  private updateShippingZoneUseCase: UpdateShippingZoneUseCase;
  private deleteShippingZoneUseCase: DeleteShippingZoneUseCase;
  private getShippingMethodsUseCase: GetShippingMethodsUseCase;
  private getShippingZoneMethodsUseCase: GetShippingZoneMethodsUseCase;
  private createShippingZoneMethodUseCase: CreateShippingZoneMethodUseCase;
  private updateShippingZoneMethodUseCase: UpdateShippingZoneMethodUseCase;
  private deleteShippingZoneMethodUseCase: DeleteShippingZoneMethodUseCase;
  private getShippingZoneLocationsUseCase: GetShippingZoneLocationsUseCase;
  private updateShippingZoneLocationsUseCase: UpdateShippingZoneLocationsUseCase;
  private getShippingClassesUseCase: GetShippingClassesUseCase;
  private getShippingClassUseCase: GetShippingClassUseCase;

  constructor(client: WooCommerceClient) {
    this.getShippingZonesUseCase = new GetShippingZonesUseCase(client);
    this.getShippingZoneUseCase = new GetShippingZoneUseCase(client);
    this.createShippingZoneUseCase = new CreateShippingZoneUseCase(client);
    this.updateShippingZoneUseCase = new UpdateShippingZoneUseCase(client);
    this.deleteShippingZoneUseCase = new DeleteShippingZoneUseCase(client);
    this.getShippingMethodsUseCase = new GetShippingMethodsUseCase(client);
    this.getShippingZoneMethodsUseCase = new GetShippingZoneMethodsUseCase(client);
    this.createShippingZoneMethodUseCase = new CreateShippingZoneMethodUseCase(client);
    this.updateShippingZoneMethodUseCase = new UpdateShippingZoneMethodUseCase(client);
    this.deleteShippingZoneMethodUseCase = new DeleteShippingZoneMethodUseCase(client);
    this.getShippingZoneLocationsUseCase = new GetShippingZoneLocationsUseCase(client);
    this.updateShippingZoneLocationsUseCase = new UpdateShippingZoneLocationsUseCase(client);
    this.getShippingClassesUseCase = new GetShippingClassesUseCase(client);
    this.getShippingClassUseCase = new GetShippingClassUseCase(client);
  }

  async handle(method: string, params: any) {
    switch (method) {
      case "get_shipping_zones":
        return this.getShippingZonesUseCase.execute(params);
      case "get_shipping_zone":
        return this.getShippingZoneUseCase.execute(params);
      case "create_shipping_zone":
        return this.createShippingZoneUseCase.execute(params);
      case "update_shipping_zone":
        return this.updateShippingZoneUseCase.execute(params);
      case "delete_shipping_zone":
        return this.deleteShippingZoneUseCase.execute(params);
      case "get_shipping_methods":
        return this.getShippingMethodsUseCase.execute();
      case "get_shipping_zone_methods":
        return this.getShippingZoneMethodsUseCase.execute(params);
      case "create_shipping_zone_method":
        return this.createShippingZoneMethodUseCase.execute(params);
      case "update_shipping_zone_method":
        return this.updateShippingZoneMethodUseCase.execute(params);
      case "delete_shipping_zone_method":
        return this.deleteShippingZoneMethodUseCase.execute(params);
      case "get_shipping_zone_locations":
        return this.getShippingZoneLocationsUseCase.execute(params);
      case "update_shipping_zone_locations":
        return this.updateShippingZoneLocationsUseCase.execute(params);
      case "get_shipping_classes":
        return this.getShippingClassesUseCase.execute();
      case "get_shipping_class":
        return this.getShippingClassUseCase.execute(params.classId);
      default:
        throw new Error(`Method ${method} not handled by ShippingController`);
    }
  }
}
