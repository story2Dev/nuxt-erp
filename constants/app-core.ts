export const TOKEN_KEY = 'ne-token';
export const SESSION_KEY = 'ne-session';
export const USER_KEY = 'ne-user';

export enum TermGroupID {
  category = 1,
  tag = 2,
  invoiceStatus = 3,
  quoteStatus = 4,
  paymentStatus = 5,
  paymentMethod = 6,
  projectStatus = 7,
  productType = 8,
  productUnit = 9,
}

export enum SORT_MODE {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortMode = Lowercase<keyof typeof SORT_MODE> | string;
