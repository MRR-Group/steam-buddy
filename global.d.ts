/// <reference types="vite/client" />
/// <reference path="global.d.ts" />

import { AxiosStatic } from "axios";

declare global {
    function route(...args: any[]): string;
    const axios: AxiosStatic;
}