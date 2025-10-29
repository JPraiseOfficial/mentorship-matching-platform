import {
  mockMentorResponse,
  mockMentors,
} from "../../../tests/fixtures/users.js";
import prismaMock from "../../../tests/mocks/prismaMock.js";

jest.mock("../../../config/prisma", () => ({
  prisma: prismaMock,
}));

import * as services from "../users.js";

describe("getAllMentors service tests", () => {
  it("should return a list of all mentors", async () => {
    prismaMock.user.findMany.mockResolvedValue(mockMentors);

    const result = await services.getAllMentors();

    expect(result).toEqual(mockMentorResponse);
  });
});
