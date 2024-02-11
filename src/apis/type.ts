export interface FacilityDto {
  id: number;
  name: string;
  type: 'artGallery' | 'museum' | 'exhibition';
  contact: string;
  address: string;
  opening_time: string;
  closing_time: string;
  latitude: string;
  longitude: string;
  imageSrc: string;
}

export interface PathDto {
  path_id: number;
  departure: {
    name: string;
    latitude: string;
    longitude: string;
  };
  arrival: {
    name: string;
    latitude: string;
    longitude: string;
  };
  routes: {
    id: number;
    latitude: string;
    longitude: string;
    path_id: number;
  }[];
}

export interface UserDto {
  nickname: string;
  access_token: string;
  refresh_token: string;
}

export interface ReviewDto {
  id: number;
  departure: string;
  arrival: string;
  writer: string;
  rating: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  path_id: number;
}
