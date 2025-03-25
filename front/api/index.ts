"use server";
import axios from "axios";
import { Problem } from "@/types/types";
import { auth } from "@/auth";
import { SignJWT } from "jose";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
});

const getToken = async () => {
  const session = await auth();
  const email = session?.user.email;
  if (!email) {
    throw new Error("Unauthorized user");
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const alg = "HS256";
  const newToken = await new SignJWT({
    email,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("10mins")
    .sign(secret);

  return newToken;
};

export const login = async ({ email }: { email: string }) => {
  const response = await instance.post("/login", { email });
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
    const accessToken = await getToken();
    const token = "Bearer " + accessToken;
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
    const accessToken = await getToken();
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
    const accessToken = await getToken();
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

export const deleteProblem = async ({ problemId }: { problemId: string }) => {
  try {
    const accessToken = await getToken();
    const token = "Bearer " + accessToken;
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
    const accessToken = await getToken();
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

export const getAnalyticsTimeBar = async (type: string) => {
  try {
    const accessToken = await getToken();
    const token = "Bearer " + accessToken;
    const { data } = await instance.get(`/analytics/timebar?timespan=${type}`, {
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

export const recommendProblem = async ({
  tags,
  rating,
}: {
  tags: string;
  rating: string;
}) => {
  try {
    const accessToken = await getToken();
    const token = "Bearer " + accessToken;

    const { data } = await instance.get(
      `/recommender?tags=${tags}&rating=${rating}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 400) {
      return {
        error: err.response?.data.message,
      };
    }

    // write other error specific code.
    return {
      error: err,
    };
  }
};
