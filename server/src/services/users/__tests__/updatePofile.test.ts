import {
  createUpdatedFakeProfile,
  fakeProfile,
  updatedFakeProfile,
} from "../../../tests/fixtures/users.js";
import prismaMock from "../../../tests/mocks/prismaMock.js";

jest.mock("../../../config/prisma", () => ({
  prisma: prismaMock,
}));

import * as services from "../users.js";

describe("updateProfile service", () => {
  // Check if User has a profile
  it("should throw error if user profile is not found", async () => {
    prismaMock.profile.findUnique.mockResolvedValue(null);

    await expect(
      services.updateProfile(999, createUpdatedFakeProfile)
    ).rejects.toThrow("User has no profile!");
  });

  it("should update user's profile", async () => {
    prismaMock.profile.findUnique.mockResolvedValue(fakeProfile);
    prismaMock.profile.update.mockResolvedValue(updatedFakeProfile);

    const result = await services.updateProfile(
      fakeProfile.userId,
      createUpdatedFakeProfile
    );

    expect(prismaMock.profile.update).toHaveBeenCalledWith({
      where: { userId: fakeProfile.userId },
      data: { ...createUpdatedFakeProfile },
    });
    expect(result).toEqual({
      id: updatedFakeProfile.id,
      name: updatedFakeProfile.name,
      bio: updatedFakeProfile.bio,
      skills: updatedFakeProfile.skills,
      goals: updatedFakeProfile.goals,
      userId: updatedFakeProfile.userId,
    });
  });
});
