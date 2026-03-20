import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "../../generated/prisma/client.js";
import bcrypt from "bcryptjs";
import { env } from "../env.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });
async function main() {
  const users = {
    admin: {
      email: env.ADMIN_EMAIL || "admin@email.com", 
      password: env.ADMIN_PASSWORD || "admin123", 
      role: Role.Admin
    },
    mentor: {
      email: env.MENTOR_EMAIL || "mentor@email.com", 
      password: env.MENTOR_PASSWORD || "mentor123", 
      role: Role.Mentor
    },
    mentee: {
      email: env.MENTEE_EMAIL || "mentee@email.com", 
      password: env.MENTEE_PASSWORD || "mentee123", 
      role: Role.Mentee
    }
  }

  const admin = await prisma.user.upsert({
    where: { email: users.admin.email },
    update: { 
      password: await bcrypt.hash(users.admin.password, env.BCRYPT_SALT_ROUNDS || 10) 
    },
    create: {
      ...users.admin,
      profile: {
        create: {
          name: "Admin",
          bio: "I am the Admin",
          skills: ["Administration", "Product Management", "Teamwork"],
          goals: "I am the administrator"
        },
      },
    },
  });
  const mentor = await prisma.user.upsert({
    where: { email: users.mentor.email },
    update: { 
      password: await bcrypt.hash(users.mentor.password, env.BCRYPT_SALT_ROUNDS || 10) 
    },
    create: {
      ...users.mentor,
      profile: {
        create: {
          name: "Mentor 1",
          bio: "I am the first mentor on this platform",
          skills: ["TypeScript", "JavaScript", "Node.js"],
          goals: "I'm here to teach. I believe in the fact that teaching is the way to mastery"
        },
      },
    },
  });
  const mentee = await prisma.user.upsert({
    where: { email: users.mentee.email },
    update: { 
      password: await bcrypt.hash(users.mentee.password, env.BCRYPT_SALT_ROUNDS || 10) 
    },
    create: {
      ...users.mentee,
      profile: {
        create: {
          name: "Mentee 1",
          bio: "I am the first Mentee on this platform",
          skills: ["TypeScript", "JavaScript", "Node.js"],
          goals: "I'm here to learn. I believe continuous learning is the key to becoming a better version of yourself"
        },
      },
    },
  });

  console.log({ admin, mentor, mentee });
}
main()
  .then(async () => {
    console.log("Database seeding is successful!")
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });