import { createConverter } from '~/features/core/utils/create-converter';
import { lengthScale } from '../constants/length-scale';

export const LengthUnitConverter = createConverter(lengthScale);
