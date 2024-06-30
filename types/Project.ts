import type { BaseModel } from './Term';

export interface ProjectMeta extends BaseModel {
  key: string;
  value: string;
  projectId: string;
}

export interface Project extends BaseModel {
  name: string;
  description: string;
  email: string;
  startDate: string;
  endDate: string;
  statusId: string;
  userId: string;
  projectMeta: ProjectMeta[];
}
