export enum TestUser {
  basic = "basic",
  update = "update",
}

export const auth = {
  getTestUserEmail: (testUser: TestUser) =>
    process.env.E2E_BASIC_USER_TEMPLATE!.replace("<<user>>", testUser),
};
