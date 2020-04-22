export const APIRoot: string = (process.env.NODE_ENV === "production")
  ? "http://elliot00.com/api/"
  : "http://proxy/api/"