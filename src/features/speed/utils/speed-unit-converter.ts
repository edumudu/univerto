import { createConverter } from '~/features/core/utils/create-converter';
import { speedScale } from '../constants/speed-scale';

export const SpeedUnitConverter = createConverter(speedScale);
