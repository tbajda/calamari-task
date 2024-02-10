export type Specialist = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  specialization: string;
  votes: number[];
  userVote: number;
  isFavorite: boolean;
};

export type Filters = {
  search?: string;
  page?: number;
};

export type ListResponse<T> = {
  page: number;
  total: number;
  totalPages: number;
  response: T[];
};
