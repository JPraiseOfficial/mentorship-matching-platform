export class JsonWebTokenError extends Error {}

export const sign = jest.fn().mockReturnValue("fake-jwt-token");

export const verify = jest.fn();
export default { sign, verify, JsonWebTokenError };
