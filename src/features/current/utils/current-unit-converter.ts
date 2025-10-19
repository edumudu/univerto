import { createPreciseConverter } from '~/features/core/utils/create-precise-converter';
import { currentScale } from '~/features/current/constants/current-scale';

export const CurrentUnitConverter = createPreciseConverter(currentScale);

