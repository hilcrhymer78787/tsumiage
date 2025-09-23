export type Work = {
  id: number;
  state: WorkState;
};

const workState = [0, 1, 2] as const;
export type WorkState = (typeof workState)[number];
