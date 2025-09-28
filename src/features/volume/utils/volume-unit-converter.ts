import { volumeScale } from '../constants/volume-scale';
import { createPreciseConverter } from '~/features/core/utils/create-precise-converter';

export const VolumeUnitConverter = createPreciseConverter(volumeScale);
