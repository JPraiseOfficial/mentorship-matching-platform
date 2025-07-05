/*
  Warnings:

  - You are about to drop the column `date` on the `MentorshipRequest` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `MentorshipRequest` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MentorshipRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mentorId" INTEGER NOT NULL,
    "menteeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MentorshipRequest_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MentorshipRequest_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MentorshipRequest" ("createdAt", "id", "menteeId", "mentorId", "status") SELECT "createdAt", "id", "menteeId", "mentorId", "status" FROM "MentorshipRequest";
DROP TABLE "MentorshipRequest";
ALTER TABLE "new_MentorshipRequest" RENAME TO "MentorshipRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
