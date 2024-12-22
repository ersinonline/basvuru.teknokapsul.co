import { internetProviders } from './categories/internet';
import { deviceRepair } from './categories/devices';
import { securitySystems } from './categories/security';
import { services } from './categories/services';
import { digitalServices } from './categories/digital';
import { telecomServices } from './categories/telecom';
import { tvServices } from './categories/tv';
import { chargingStations } from './categories/charging';

export const brands = {
  ...internetProviders,
  ...deviceRepair,
  ...securitySystems,
  ...services,
  ...digitalServices,
  ...telecomServices,
  ...tvServices,
  ...chargingStations,
} as const;

export type BrandKey = keyof typeof brands;