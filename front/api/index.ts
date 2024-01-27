"use server";
import { Session, getServerSession } from "next-auth";
import axios, { AxiosError } from "axios";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import { Problem } from "@/types/types";
import { useSearchParams } from "next/navigation";
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
  const response = await instance.post("/signup", { username, password });
  return response;
};

export const getProblems = async ({ status }: { status: string }) => {
  try {
    const session: Session | null = await getServerSession(OPTIONS);
    const { accessToken } = session as any;
    if (!accessToken) return []; // TODO: redirect to signin page

    const token = "Bearer " + accessToken;
    const { data } = await instance.get(`/problems?status=${status}`, {
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

export const postProblem = async ({ problemUrl }: { problemUrl: string }) => {
  try {
    const session = await getServerSession(OPTIONS);
    const { accessToken } = session as any;

    if (!accessToken) return [];

    const token = "Bearer " + accessToken;
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

export const deleteProblem = async () => {};

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

export const createGroup = async ({ groupName }: { groupName: string }) => {
  try {
    const session = await getServerSession(OPTIONS);
    const { accessToken } = session as any;
    if (!accessToken) {
      // TODO: redirect to signin page with error message
      return;
    }
    const token = "Bearer " + accessToken;
    const { data } = await instance.post(
      "/groups",
      {
        groupName,
      },
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
    return;
  }
};

export const getGroups = async () => {
  try {
    const session = await getServerSession(OPTIONS);
    const { accessToken } = session as any;
    if (!accessToken) {
      // TODO: redirect to signin page with error message
      return [];
    }
    const token = "Bearer " + accessToken;
    const { data } = await instance.get("/groups", {
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

export const updateGroup = async () => {};
export const deleteGroup = async () => {};

export const createProblemToGroup = async () => {};
export const deleteProblemFromGroup = async () => {};

export const shareGroup = async () => {}; // skip for now
// CRUD -> CREATE / READ / UPDATE / DELETE
