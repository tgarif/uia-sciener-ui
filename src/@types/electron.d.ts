import { Preload } from '@interfaces/preload.interface';

declare global {
  interface Window {
    electronAPI: Preload;
  }
}
