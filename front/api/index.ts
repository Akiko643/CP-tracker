import { getServerSession } from "next-auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
  // headers: { "X-Custom-Header": "foobar" },
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

export const singUp = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await instance.post("/singup", { username, password });
  return response;
};

export const getProblems = async () => {};

export const getProblem = async () => {};

export const postProblem = async () => {};

export const deleteProblem = async () => {};

export const updateProblem = async () => {};
