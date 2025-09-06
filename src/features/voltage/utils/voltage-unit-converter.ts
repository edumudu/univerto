import { createConverter } from '~/features/core/utils/create-converter';
import { voltageScale } from '../constants/voltage-scale';

export const VoltageUnitConverter = createConverter(voltageScale);
