"use server";
import { Session, getServerSession } from "next-auth";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import { Problem } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
});

const getToken = async () => {
  const session = await getServerSession(OPTIONS);
  const { accessToken } = session as any;

  if (!accessToken) return [];

  const token = "Bearer " + accessToken;
  return token;
};

const handleAxiosError = (err: any) => {
  if (axios.isAxiosError(err)) {
    return { error: err.response?.data.message };
  }
  return { error: "Something went wrong :(" };
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await instance.post("/login", { username, password });
    return response;
  } catch (err) {
    return handleAxiosError(err);
  }
};

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

export const signUp = action(schema, async ({ username, password }) => {
  try {
    const response = await instance.post("/signup", { username, password });
    return response;
  } catch (err) {
    return handleAxiosError(err);
  }
});

export const getProblems = async ({
  status,
  minRating,
  maxRating,
}: {
  status: string;
  minRating: string;
  maxRating: string;
}) => {
  // return Error("Gg");
  try {
    const token = await getToken();
    const { data } = await instance.get(
      `/problems?status=${status}&minRating=${minRating}&maxRating=${maxRating}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data;
  } catch (err) {
    return handleAxiosError(err);
  }
};

export const getProblem = async (_id: string) => {
  try {
    const token = await getToken();
    const { data } = await instance.get(`/problems/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (err) {
    return handleAxiosError(err);
  }
};

export const postProblem = async ({ problemUrl }: { problemUrl: string }) => {
  try {
    const token = await getToken();
    const { data } = await instance.post(
      `/problems/add`,
      {
        url: problemUrl,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data;
  } catch (err) {
    return handleAxiosError(err);
  }
};

export const deleteProblem = async ({ problemId }: { problemId: string }) => {
  try {
    const token = await getToken();
    const { data } = await instance.delete(`/problems/${problemId}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (err) {
    return handleAxiosError(err);
  }
};

export const updateProblem = async (problem: Problem) => {
  try {
    const session = await getServerSession(OPTIONS);
    const { accessToken } = session as any;

    if (!accessToken) return [];
    const token = "Bearer " + accessToken;
    const { data } = await instance.patch(`/problems/${problem._id}`, problem, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (err) {
    return handleAxiosError(err);
  }
};

// CRUD -> CREATE / READ / UPDATE / DELETE
