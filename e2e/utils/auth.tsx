import { faker } from "@faker-js/faker";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export const auth = {
  generateTestUsername: () => faker.internet.username().toLowerCase(),
  createTestUser: async (email: string) => {
    const { id } = await clerkClient.users.createUser({
      emailAddress: [email],
      password: process.env.E2E_USER_PASSWORD!,
      skipPasswordChecks: true,
    });
    return id;
  },
};
