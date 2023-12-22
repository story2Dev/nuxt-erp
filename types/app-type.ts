import type { SORT_MODE } from '~/constants';

export interface KeyValue {
  [key: string]: string | number | boolean;
}

export interface SortKey {
  key: string;
  mode: SORT_MODE;
}
