import { v4 as uuidv4 } from 'uuid';

export const uniqueId = ():string => {
  return uuidv4();
};
