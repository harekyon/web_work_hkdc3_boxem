import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "harepoko",
  apiKey: process.env.API_KEY,
});
