export interface IReview {
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
