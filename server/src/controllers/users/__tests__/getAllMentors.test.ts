import { getAllMentors } from "../users.js";
import * as services from "../../../services/users/users.js";
import { mockRequest, mockResponse } from "../../../tests/mocks/expressMock.js";
import { Request, Response } from "express";

jest.mock("../../../services/users/users.js");

describe("getAllMentors Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it("should return all mentors successfully", async () => {
    const mentors = [
      { mentorId: 1, name: "Mentor 1", bio: "Bio 1", skills: ["JS"] },
      { mentorId: 2, name: "Mentor 2", bio: "Bio 2", skills: ["TS"] },
    ];
    (services.getAllMentors as jest.Mock).mockResolvedValue(mentors);

    await getAllMentors(req as Request, res as Response);

    expect(services.getAllMentors).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mentors);
  });

  it("should handle unexpected errors and log to console", async () => {
    const error = new Error("DB error");
    (services.getAllMentors as jest.Mock).mockRejectedValue(error);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await getAllMentors(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error fetching all mentors. Please, try again later.",
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch all mentors",
      error
    );

    consoleSpy.mockRestore();
  });
});
