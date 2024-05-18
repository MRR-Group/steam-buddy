import { AxiosStatic } from "axios";

declare global {
  function route(...args: any[]): string;
  const axios: AxiosStatic;
}

declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGElement>>
    export default content
  }