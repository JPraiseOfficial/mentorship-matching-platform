import { Request, Response, NextFunction } from "express";

export const mockRequest = (data: Partial<Request> = {}) => {
  return {
    body: {},
    params: {},
    query: {},
    cookies: {},
    user: { id: 1, role: "Admin" }, // Default mock user
    ...data,
  };
};

const { user, ...otherRequestDetails } = mockRequest();

export const mockRequestWithoutUser: Partial<Request> = otherRequestDetails;

export const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext = () => jest.fn();
