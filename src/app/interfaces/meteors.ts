export interface Meteor {
  fall: string;
  geolocation: Geolocation;
  id: string;
  mass: string;
  name: string;
  nametype: string;
  recclass: string;
  reclat: string;
  reclong: string;
  year: string;
}

interface Geolocation {
  type: string;
  coordinates: number[];
}
