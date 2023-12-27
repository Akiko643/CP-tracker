import { getServerSession } from "next-auth";
import axios from "axios";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
});

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await instance.post("/login", { username, password });
  return response;
};

export const signUp = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await instance.post("/singup", { username, password });
  return response;
};

export const getProblems = async () => {
  const session = await getServerSession(OPTIONS);
  const { accessToken } = session;
  const token = "Bearer " + accessToken;
  const { data } = await instance.get("/problems", {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const getProblem = async () => {};

export const postProblem = async () => {};

export const deleteProblem = async () => {};

export const updateProblem = async () => {};
