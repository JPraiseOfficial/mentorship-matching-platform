import { Request, Response } from "express";

export const mockRequest = (data: Partial<Request> = {}) => {
  return {
    body: {},
    params: {},
    query: {},
    cookies: {},
    ...data,
  };
};

export const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res;
};
