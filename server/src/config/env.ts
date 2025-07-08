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
  NODE_ENV: getEnvVar("NODE_ENV", false) || "production"
};