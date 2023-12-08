export interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TermMeta extends BaseModel {
  key: string;
  value: string;
}

export interface Term extends BaseModel {
  name: string;
  parentId: string;
  groupId: string;
  termId: string;
  termMeta: TermMeta[];
}

export type TermInput = Omit<
  Term,
  'id' | 'createdAt' | 'updatedAt' | 'termMeta'
> & {
  termMeta?: TermMeta[];
};
