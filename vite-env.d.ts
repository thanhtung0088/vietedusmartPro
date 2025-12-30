/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  // thêm các env khác nếu cần
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}