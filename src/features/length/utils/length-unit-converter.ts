import { lengthScale } from '../constants/length-scale';
import { createPreciseConverter } from '~/features/core/utils/create-precise-converter';

export const LengthUnitConverter = createPreciseConverter(lengthScale);
