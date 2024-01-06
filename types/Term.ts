export interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type Variable = {
  where: any;
  limit?: number;
  offset?: number;
  orderBy?: any;
  [key: string]: any;
};

export interface TermMeta extends BaseModel {
  key: string;
  value: string;
}

export interface Term extends BaseModel {
  name: string;
  parentId?: string;
  groupId?: number;
  termMeta: TermMeta[];
}

export type TermInput = Omit<
  Term,
  'id' | 'createdAt' | 'updatedAt' | 'termMeta'
> & {
  termMeta?: TermMeta[];
};

export type TermObject = {
  id: string;
  termId: string;
  objectId: string;
  term?: Term;
};

export type TermObjectInput = Pick<TermObject, 'objectId' | 'termId'>;
