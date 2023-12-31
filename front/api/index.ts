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
  const response = await fetch("http://localhost:5000/signup", {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  // const response = await instance.post("/signup", { username, password });
  return response;
};

export const getProblems = async () => {
  try {
    const session = await getServerSession(OPTIONS);
    const { accessToken } = session as any;

    if (!accessToken) return [];

    const token = "Bearer " + accessToken;
    const { data } = await instance.get("/problems", {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return {
        status: 401,
      };
    }

    // write other error specific code.
    return [];
  }
};

export const getProblem = async (_id: string) => {
  try {
    const session = await getServerSession(OPTIONS);
    const { accessToken } = session as any;

    if (!accessToken) return [];

    const token = "Bearer " + accessToken;
    const { data } = await instance.get(`/problems/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return {
        status: 401,
      };
    }

    // write other error specific code.
    return [];
  }
};

export const postProblem = async () => {};

export const deleteProblem = async () => {};

export const updateProblem = async () => {};
