import { APIEventHandler } from './handlers/APIEventHandler';
import { DisplayHandler } from './handlers/DisplayHandler';
import { APIWrapper } from './scorplib/api';

const api = new APIWrapper();
export const apiEventHandler = new APIEventHandler();
api.setEventHandler((events) => apiEventHandler.addEventArray(events));
DisplayHandler();