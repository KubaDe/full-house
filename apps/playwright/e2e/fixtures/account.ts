import { type Page, expect, type Browser } from "@playwright/test";
import {
  clerk,
  clerkSetup,
  setupClerkTestingToken,
} from "@clerk/testing/playwright";
import { faker } from "@faker-js/faker";
import { createClerkClient } from "@clerk/backend";
import { db } from "@/app/server/db/prisma";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const getStorageStatePath = (username: string) => {
  return process.env.E2E_AUTH_FILE_PATH_TEMPLATE!.replace("<<user>>", username);
};

const getTestUserEmail = (username: string) => {
  return process.env.E2E_BASIC_USER_TEMPLATE!.replace("<<user>>", username);
};

class StateHelpers {
  static readonly DEFAULTS = {
    username: "Basic test user",
    avatar: {
      accessory: "GlassAviator",
      body: "BlazerBlackTee",
      face: "Cheeky",
      facialHair: "None",
      hair: "GrayMedium",
    },
  };
  private _userId?: string;

  constructor(private username: string) {}

  get userId() {
    if (!this._userId) {
      throw new Error("User ID is required to create an account");
    }
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get testUserEmail() {
    return getTestUserEmail(this.username);
  }

  async createAccount() {
    await clerkClient.users.createUser({
      emailAddress: [this.testUserEmail],
      password: process.env.E2E_USER_PASSWORD!,
      skipPasswordChecks: true,
    });
  }

  async clearAccount() {
    const user = await db.user.findFirstOrThrow({
      where: { email: this.testUserEmail },
    });
    await clerkClient.users.deleteUser(user.clerkId);
  }

  async fillProfile() {
    await db.user.update({
      where: { id: this.userId },
      data: {
        profile: {
          create: {
            name: StateHelpers.DEFAULTS.username,
            avatar: {
              create: StateHelpers.DEFAULTS.avatar,
            },
          },
        },
      },
    });
  }
}

export class Account {
  public username: string;
  public stateHelpers: StateHelpers;
  private _page?: Page;

  constructor() {
    this.username = faker.internet.username().toLowerCase();
    this.stateHelpers = new StateHelpers(this.username);
  }

  get storageStatePath() {
    return getStorageStatePath(this.username);
  }

  get testUserEmail() {
    return getTestUserEmail(this.username);
  }

  get page() {
    if (!this._page) {
      throw new Error("Page is required to create an account");
    }
    return this._page;
  }

  async init(
    { browser }: { browser: Browser },
    { skipProfile = false }: { skipProfile?: boolean } = {},
  ) {
    const context = await browser.newContext({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });
    this._page = await context.newPage();
    await this.stateHelpers.createAccount();
    await this.login();
    const { id } = await db.user.findFirstOrThrow({
      where: { email: this.testUserEmail },
    });
    this.stateHelpers.userId = id;

    if (!skipProfile) {
      await this.stateHelpers.fillProfile();
    }
  }

  async cleanup() {
    await this.stateHelpers.clearAccount();
  }

  async login() {
    await this.page.goto("/");
    await clerkSetup();
    await setupClerkTestingToken({ page: this.page });
    await clerk.signIn({
      page: this.page,
      signInParams: {
        strategy: "password",
        identifier: this.testUserEmail,
        password: process.env.E2E_USER_PASSWORD!,
      },
    });
    await this.page.goto("/");
    await clerk.loaded({ page: this.page });
    await expect(this.page.title()).resolves.toBe("Dashboard");
    await this.page.context().storageState({ path: this.storageStatePath });
  }
}
