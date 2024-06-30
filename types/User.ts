import type { BaseModel } from './Term';

export interface User extends BaseModel {
  displayName: string;
  email: string;
  defaultRole: string;
}
