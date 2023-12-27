import { getServerSession } from "next-auth";
import axios from "axios";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";

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
  if (!session) {
    // TODO: show error message
    return [];
  }
  const { accessToken } = session;
  const token = "Bearer " + accessToken;
  const ret = await instance.get("/problems", {
    headers: {
      Authorization: token,
    },
  });
  if (ret.status === 401) { // TODO: use constant variable for 401
    signOut();
    // TODO: show error message
    return [];
  }
  const { data } = ret;
  return data;
};

export const getProblem = async () => {};

export const postProblem = async () => {};

export const deleteProblem = async () => {};

export const updateProblem = async () => {};
