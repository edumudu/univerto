import { createConverter } from '~/features/core/utils/create-converter';
import { areaScale } from '../constants/area-scale';

export const AreaUnitConverter = createConverter(areaScale);
