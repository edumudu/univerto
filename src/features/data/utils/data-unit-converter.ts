import { createConverter } from '~/features/core/utils/create-converter';
import { dataScale } from '../constants/data-scale';

export const DataUnitConverter = createConverter(dataScale);
