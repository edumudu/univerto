import { massScale } from '../constants/mass-scale';
import { createPreciseConverter } from '~/features/core/utils/create-precise-converter';

export const MassUnitConverter = createPreciseConverter(massScale);
