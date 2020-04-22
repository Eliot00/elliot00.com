export const APIRoot: string = (process.env.NODE_ENV === "production")
  ? "https://www.elliot00.com/api/"
  : "http://proxy/api/"