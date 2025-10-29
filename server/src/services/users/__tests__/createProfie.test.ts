import prismaMock from "../../../tests/mocks/prismaMock.js";

jest.mock("../../../config/prisma", () => ({
  prisma: prismaMock,
}));

import * as services from "../users.js";
import { mockProfile, newFakeProfile } from "../../../tests/fixtures/users.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const fakeProfile = mockProfile;
const createFakeProfile = newFakeProfile;

// createProfile Test Suites
describe("createProfile service", () => {
  // Check if User already has a profile
  it("should throw error if user already has a profile", async () => {
    prismaMock.profile.findUnique.mockResolvedValue(fakeProfile);

    await expect(
      services.createProfile(fakeProfile.userId, createFakeProfile)
    ).rejects.toThrow("User already has a Profile");
  });

  //   Create a new profile if user has no profile
  it("should create user profile if user has no profile", async () => {
    prismaMock.profile.findUnique.mockResolvedValue(null);
    prismaMock.profile.create.mockResolvedValue(fakeProfile);

    const result = await services.createProfile(
      fakeProfile.userId,
      createFakeProfile
    );

    expect(prismaMock.profile.create).toHaveBeenCalledWith({
      data: {
        ...createFakeProfile,
        user: { connect: { id: fakeProfile.userId } },
      },
    });
    expect(result).toEqual({
      id: 1,
      name: "Test User",
      bio: "Test Bio",
      skills: ["JavaScript", "TypeScript"],
      goals: "Test goals",
      userId: 1,
    });
  });
});
