import { useLaravelReactI18n } from "laravel-react-i18n";

type Props = {
  children: string,
  file: string,
}

export const Translate = ({ children, file }: Props) => {
  const { t } = useLaravelReactI18n();

  return (
    <>{t(`${file}.${children}`)}</>
  );
};

type PropsWithTranslate = {
  children: string,
}

const withTranslate = (file: string) => {
  // eslint-disable-next-line react/display-name
  return {
    Translate: ({ children }: PropsWithTranslate) => (
      <Translate file={file}>
        {children}
      </Translate>
    ),
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTranslate = (file: string) => {
  const { t } = useLaravelReactI18n();

  return {
    t: (text: string) => t(`${file}.${text}`),
    Translate: withTranslate(file).Translate,
  };
}