import { Request, Response, NextFunction } from "express";

export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }

        next();
    };
};