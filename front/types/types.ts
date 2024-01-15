export interface Problem {
  _id: string;
  url: string;
  userId: string;
  title: string;
  difficulty: string;
  source: string;
  status: string;
  tags: string[];
  spentTime: number;
  startDate?: Date;
  solvedDate?: Date;
  metaCognition?: string;
  takeaways?: string;
  analysis?: string;
  [index: string]: string | number | Date | number | string[] | undefined;
}

export interface Group {
  _id: string;
  groupName: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  solvedProblems: string[];
  skippedProblems: string[];
  solvingProblems: string[];
  todoProblems: string[];
}
