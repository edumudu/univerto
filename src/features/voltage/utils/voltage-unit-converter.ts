import { createPreciseConverter } from '~/features/core/utils/create-precise-converter';
import { voltageScale } from '~/features/voltage/constants/voltage-scale';

export const VoltageUnitConverter = createPreciseConverter(voltageScale);
