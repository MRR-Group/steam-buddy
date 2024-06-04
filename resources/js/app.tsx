/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import './bootstrap';
import '../css/app.css';
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';
import axios from 'axios';

const appName = import.meta.env.VITE_APP_NAME || 'Steam Buddy';
const locale = localStorage.getItem('lang') ?? "en";
axios.post(route('lang.set', { locale }));

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: async (name) => {
    return (
      await resolvePageComponent<any[]>(
        `./Pages/${name}.tsx`,
        import.meta.glob('./Pages/**/*.tsx') as any,
      )
    )[name.split('/').at(-1) as any];
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <LaravelReactI18nProvider
        locale={locale}
        fallbackLocale="en"
        files={import.meta.glob('/lang/php_*.json')}
      >
        <App {...props} />
      </LaravelReactI18nProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
