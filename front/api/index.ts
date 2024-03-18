"use server";
import { Session, getServerSession } from "next-auth";
import axios, { AxiosError } from "axios";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import { Problem } from "@/types/types";
import { signOut } from "next-auth/react";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
});

const getToken = async () => {
  const session = await getServerSession(OPTIONS);
  const { accessToken } = session as any;

  // return error
  if (!accessToken) return [];

  const token = "Bearer " + accessToken;
  return token;
};

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
  try {
    const response = await instance.post("/signup", { username, password });
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return null;
  }
};

export const getProblems = async ({
  status,
  minRating,
  maxRating,
}: {
  status: string;
  minRating: string;
  maxRating: string;
}) => {
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
    const token = await getToken();
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
    // TODO: maybe return err??
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return {
        status: 401,
      };
    }
    return [];
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
    // TODO: maybe return err??
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return {
        status: 401,
      };
    }
    return [];
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
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return {
        status: 401,
      };
    }

    // write other error specific code.
    return [];
  }
};

// CRUD -> CREATE / READ / UPDATE / DELETE
