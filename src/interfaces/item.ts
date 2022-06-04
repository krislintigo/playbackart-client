interface Time {
  count: number;
  duration: number;
}

export interface Item {
  id?: string;
  name: string;
  image: string;
  rating: number;
  status: string;
  type: string;
  restriction: string;
  genres: string[];
  time: Time;
  year: string;
  developers: string[];
  franchise: string;
}
