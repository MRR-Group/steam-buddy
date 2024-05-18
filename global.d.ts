import { AxiosStatic } from "axios";

declare global {
    function route(...args: any[]): string;
    const axios: AxiosStatic;
}