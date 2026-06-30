import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);


import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin} from "better-auth/plugins";


const client = new MongoClient(process.env.MONGO_DB_URI);
export const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: {
        defaultValue: "client",
        input: true,
      },
      skills: {
        type: "string[]",
        defaultValue: [],
        input: true,
      },
      bio: {
        type: "string",
        defaultValue: "",
        input: true,
      },
    },
  },
  session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 7 * 24 * 60 * 60 
        }
    },
  //  plugins: [ admin()],
 
});
