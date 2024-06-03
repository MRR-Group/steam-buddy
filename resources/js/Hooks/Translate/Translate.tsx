import { useLaravelReactI18n } from "laravel-react-i18n";
import ReplacementsInterface from "laravel-react-i18n/dist/interfaces/replacements";

type Props = {
  children: string,
  file: string,
  [arg:string]: string,
};

export const Translate = ({ children, file, ...translation }: Props) => {
  const { t } = useLaravelReactI18n();

  console.log(translation)

  return (
    <>{t(`${file}.${children}`, translation)}</>
  );
};

type PropsWithTranslate = {
  children: string,
  [arg:string]: string,
}

const withTranslate = (file: string) => {
  // eslint-disable-next-line react/display-name
  return {
    Translate: ({ children, ...translation }: PropsWithTranslate) => (
      <Translate file={file} {...translation}>
        {children}
      </Translate>
    ),
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTranslate = (file: string) => {
  const { t } = useLaravelReactI18n();

  return {
    t: (text: string, replacements?: ReplacementsInterface) => t(`${file}.${text}`, replacements),
    Translate: withTranslate(file).Translate,
  };
}