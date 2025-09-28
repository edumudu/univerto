import { timeScale } from '../constants/time-scale';
import { createPreciseConverter } from '~/features/core/utils/create-precise-converter';

export const TimeUnitConverter = createPreciseConverter(timeScale);
