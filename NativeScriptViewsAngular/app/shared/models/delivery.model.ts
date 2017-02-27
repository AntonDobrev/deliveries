import { ItemModel } from './item.model';
import * as shared from '../enums';

export class Delivery extends ItemModel {
    DeliveryAddressCity: string;
    DeliveryAddressLine1: string;
    DeliveryAddressLine2: string
    DeliveryAddressPostcode: string;
    DeliveryItemType: string;
    DeliveryName: string;
    DeliveryItem: string;
    Status: number;
}