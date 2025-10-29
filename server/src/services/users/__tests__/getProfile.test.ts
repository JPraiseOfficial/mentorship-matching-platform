import { makeUser, fakeProfile } from "../../../tests/fixtures/users.js";
import prismaMock from "../../../tests/mocks/prismaMock.js";

jest.mock("../../../config/prisma", () => ({
  prisma: prismaMock,
}));

import * as services from "../users.js";

const apiResponse = { ...fakeProfile, user: makeUser() };

// getProfile Test Suites
describe("getProfile service", () => {
  // Check if User has a profile
  it("should throw error if user profile is not found", async () => {
    prismaMock.profile.findUnique.mockResolvedValue(null);

    await expect(services.getProfile(999)).rejects.toThrow(
      "User has no profile!"
    );
  });

  it("should return user profile", async () => {
    prismaMock.profile.findUnique.mockResolvedValue(apiResponse);

    const result = await services.getProfile(fakeProfile.userId);

    expect(prismaMock.profile.findUnique).toHaveBeenCalledWith({
      where: { userId: fakeProfile.userId },
      include: { user: true },
    });

    expect(result).toEqual({
      id: apiResponse.id,
      name: apiResponse.name,
      bio: apiResponse.bio,
      skills: apiResponse.skills,
      goals: apiResponse.goals,
      role: apiResponse.user.role,
      userId: apiResponse.userId,
    });
  });
});
