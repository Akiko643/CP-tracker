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
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  numTodoProblems: number;
  numSolvingProblems: number;
  numSolvedProblems: number;
  numSkippedProblems: number;
}
