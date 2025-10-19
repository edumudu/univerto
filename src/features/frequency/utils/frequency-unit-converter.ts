import { createPreciseConverter } from '~/features/core/utils/create-precise-converter';
import { frequencyScale } from '~/features/frequency/constants/frequency-scale';

export const FrequencyUnitConverter = createPreciseConverter(frequencyScale);

