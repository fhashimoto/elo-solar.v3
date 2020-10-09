import { TariffModality } from '@/enums/address-enum';

export interface ConsumerUnit {
  id?: string,
  address?: {
    city?: string,
    state?: string,
    zipCode?: string,
    streetAddress?: string
  },
  clientId?: string,
  unitNumber?: string,
  connectionType?: string,
  tariffModality?: string,
  electricUtility?: string,
  averageConsumption?: number
}