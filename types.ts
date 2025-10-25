
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeofenceArea {
  id: string;
  name: string;
  center: Coordinates;
  radius: number; // in simulated units
}

export interface Client {
  id: string;
  name:string;
  address: string;
  areaId: string;
}
