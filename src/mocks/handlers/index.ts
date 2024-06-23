import { facilityHandler } from './facility';
import { pathHandler } from './path';

const handlers = [...facilityHandler, ...pathHandler];

export default handlers;
