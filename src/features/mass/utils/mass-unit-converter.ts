import { createConverter } from '~/features/core/utils/create-converter';
import { massScale } from '../constants/mass-scale';

export const MassUnitConverter = createConverter(massScale);
