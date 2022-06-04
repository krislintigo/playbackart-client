import { Time } from '@/interfaces/time'

export interface UpdateItem {
  name?: string;
  image?: string;
  rating?: number;
  status?: string;
  type?: string;
  restriction?: string;
  genres?: string[];
  time?: Time;
  year?: string;
  developers?: string[];
  franchise?: string;
}
