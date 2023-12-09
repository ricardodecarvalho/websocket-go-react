/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WS_URL: string;
  readonly VITE_CREATE_UUID_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
