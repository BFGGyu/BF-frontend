export interface IPlace {
  id: string;
  address: string;
  name: string;
  opening_time: string;
  type: FacilityType;
  closing_time?: string;
  contact?: string;
  latitude?: string;
  longitude?: string;
}

export type FacilityType = 'museum' | 'artGallery' | 'exhibition';
