declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        VITE_API_BASE_URL: string;
        VITE_API_DEV_URL: string;
      }
    }
  }
}
