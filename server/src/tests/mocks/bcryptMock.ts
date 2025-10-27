export const genSalt = jest.fn().mockResolvedValue("fake-salt");
export const hash = jest.fn().mockResolvedValue("hashedPassword");
export const compare = jest.fn().mockResolvedValue(true);

export default { genSalt, hash, compare };
