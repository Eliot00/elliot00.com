export const APIRoot: string = (process.env.NODE_ENV === "production")
  ? "https://47.102.223.4/api/"
  : "http://localhost/api/"
