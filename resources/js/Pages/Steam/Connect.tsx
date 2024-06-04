import { Head } from '@inertiajs/react';
import { GuestLayout } from '../../Layouts/GuestLayout/GuestLayout';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';
import { TextInputOption } from '../../Components/TextInputOption/TextInputOption';
import { useTranslate } from '../../Hooks/Translate/Translate';

export const Connect = () => {
  const { Translate, t } = useTranslate("auth-layout");

  return (
    <GuestLayout>
      <Head title={t("connect steam title")} />

      <div
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-2xl pb-10">
          <Translate>
            Connect your steam account
          </Translate>
        </div>

        <div>
          <a href={route('steam.redirect')}>
            <PrimaryButton>
              <Translate>connect</Translate>
            </PrimaryButton>
          </a>

          <TextInputOption
            left={t("You don't want to do it right now?")}
            linkText={`${t('Click')}${'\u00A0'}${t('here')}`}
            right={`${t('to')}${'\u00A0'}${t('to log out.')}`}
            href={route('logout')}
            method="post"
          />
        </div>
      </div>
    </GuestLayout>
  );
};
