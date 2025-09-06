import { createConverter } from '~/features/core/utils/create-converter';
import { volumeScale } from '../constants/volume-scale';

export const VolumeUnitConverter = createConverter(volumeScale);
