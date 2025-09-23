import { Work } from "./work";

export type Task = {
  id: number;
  name: string;
  createdAt: string;
  work: Work;
};
