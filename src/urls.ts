export const frontendUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.thehaulagehub.com";

export const backendUrl =
  process.env.NODE_ENV === "development"
    ? "https://localhost:5001/api/v1"
    : "https://analytics-api.thehaulagehub.com/api/v1";

export const thhOrgId = process.env.NODE_ENV === "development" ? 1 : 4;
