import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../authMiddleware";
import { getEnvVar } from "../../infrastructure/config";

// Mocking dependencies
jest.mock("jsonwebtoken");
jest.mock("../../infrastructure/config");

describe("authMiddleware tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      header: jest.fn(),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 401 if no token is provided", () => {
    (req.header as jest.Mock).mockReturnValue(null);

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "No token, authorization denied",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    (req.header as jest.Mock).mockReturnValue("Bearer invalidToken");
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });
    (getEnvVar as jest.Mock).mockReturnValue("secret");

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Token is not valid",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if token is valid", () => {
    (req.header as jest.Mock).mockReturnValue("Bearer validToken");
    (jwt.verify as jest.Mock).mockReturnValue({ id: "userId" });
    (getEnvVar as jest.Mock).mockReturnValue("secret");

    authMiddleware(req as Request, res as Response, next);

    // Type assertion to bypass TypeScript error
    const reqWithUser = req as Request & { user: string };

    expect(reqWithUser.user).toBe("userId");
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
