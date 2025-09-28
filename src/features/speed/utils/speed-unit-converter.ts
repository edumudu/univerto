import { speedScale } from '../constants/speed-scale';
import { createPreciseConverter } from '~/features/core/utils/create-precise-converter';

export const SpeedUnitConverter = createPreciseConverter(speedScale);
