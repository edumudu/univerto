import { dataScale } from '../constants/data-scale';
import { createPreciseConverter } from '~/features/core/utils/create-precise-converter';

export const DataUnitConverter = createPreciseConverter(dataScale);
