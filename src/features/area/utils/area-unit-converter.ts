import { areaScale } from '../constants/area-scale';
import { createPreciseConverter } from '~/features/core/utils/create-precise-converter';

export const AreaUnitConverter = createPreciseConverter(areaScale);
