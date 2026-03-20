import "dotenv/config";

function getEnvVar(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing required env variable: ${key}`);
  }
  return value!;
}

export const env = {
  PORT: Number(getEnvVar("PORT")),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  NODE_ENV: getEnvVar("NODE_ENV", false) || "production",
  FRONTEND_URL: getEnvVar("FRONTEND_URL"),
  BCRYPT_SALT_ROUNDS: Number(getEnvVar("BCRYPT_SALT_ROUNDS")),

  // User Credentials
  ADMIN_EMAIL: getEnvVar("ADMIN_EMAIL", false),
  ADMIN_PASSWORD: getEnvVar("ADMIN_PASSWORD", false),
  MENTOR_EMAIL: getEnvVar("MENTOR_EMAIL", false),
  MENTOR_PASSWORD: getEnvVar("MENTOR_PASSWORD", false),
  MENTEE_EMAIL: getEnvVar("MENTEE_EMAIL", false),
  MENTEE_PASSWORD: getEnvVar("MENTEE_PASSWORD", false),
};
