/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL of the optional Hardware Mentor proxy (see server/mentor-proxy.mjs). Never an API key. */
  readonly VITE_MENTOR_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
