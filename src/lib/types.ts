export type WorkerSkill = 'Plumber' | 'Electrician' | 'Carpenter' | 'Painter' | 'Mason' | 'General Labor';

export type Worker = {
  id: string;
  name: string;
  skill: WorkerSkill;
  rate: number;
  avatar: string;
  description: string;
  rating: number;
  jobsCompleted: number;
};
