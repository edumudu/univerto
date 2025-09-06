import { createConverter } from '~/features/core/utils/create-converter';
import { timeScale } from '../constants/time-scale';

export const TimeUnitConverter = createConverter(timeScale);

