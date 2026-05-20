import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const MONGODB_DB = process.env.MONGODB_DB || "skillsphere";
const secret = process.env.BETTERAUTH_SECRET || process.env.BETTER_AUTH_SECRET || process.env.NEXTAUTH_SECRET || "dev-better-auth-secret";
const googleClientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const getMongoClient = async () => {
  if (!globalThis.__BETTER_AUTH_MONGO_CLIENT__) {
    globalThis.__BETTER_AUTH_MONGO_CLIENT__ = new MongoClient(MONGODB_URI, {
      appName: "BetterAuthMongo",
      maxPoolSize: 10
    });
    globalThis.__BETTER_AUTH_MONGO_CLIENT_PROMISE__ = globalThis.__BETTER_AUTH_MONGO_CLIENT__.connect();
  }

  await globalThis.__BETTER_AUTH_MONGO_CLIENT_PROMISE__;
  return globalThis.__BETTER_AUTH_MONGO_CLIENT__;
};

const getAuthInstance = async () => {
  if (globalThis.__BETTER_AUTH_INSTANCE__) return globalThis.__BETTER_AUTH_INSTANCE__;

  const client = await getMongoClient();
  const db = client.db(MONGODB_DB);

  const socialProviders = {};
  if (googleClientId && googleClientSecret) {
    socialProviders.google = {
      clientId: googleClientId,
      clientSecret: googleClientSecret
    };
  } else if (googleClientId || googleClientSecret) {
    console.warn("Google social login is partially configured. Set both GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.");
  }

  globalThis.__BETTER_AUTH_INSTANCE__ = betterAuth({
    secret,
    database: mongodbAdapter(db, { debugLogs: false }),
    emailAndPassword: {
      enabled: true
    },
    socialProviders: Object.keys(socialProviders).length ? socialProviders : undefined,
    session: {
      cookieCache: {
        enabled: false
      }
    }
  });

  return globalThis.__BETTER_AUTH_INSTANCE__;
};

export default getAuthInstance;
