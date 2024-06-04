import { Head, useForm } from '@inertiajs/react';
import { GuestLayout } from '../../Layouts/GuestLayout/GuestLayout';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';
import { TextInputOption } from '../../Components/TextInputOption/TextInputOption';
import { useTranslate } from '../../Hooks/Translate/Translate';

type Props = {
  status?: string;
};

export const VerifyEmail = ({ status }: Props) => {
  const { post, processing } = useForm({});
  const { Translate, t } = useTranslate("auth-layout");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('verification.send'));
  };

  return (
    <GuestLayout
      status={
        status === 'verification-link-sent'
          ? t('verification-link-sent')
          : status
      }
    >
      <Head title="email verification title" />

      <form
        onSubmit={submit}
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-xl pb-10">
          <Translate>email verification message</Translate>
        </div>

        <div>
          <PrimaryButton disabled={processing}>
            <Translate>resend verification email</Translate>
          </PrimaryButton>

          <TextInputOption
            left={t("You don't want to do it right now?")}
            linkText={`${t('Click')}${'\u00A0'}${t('here')}`}
            right={`${t('to')}${'\u00A0'}${t('to log out.')}`}
            href={route('logout')}
            method="post"
          />
        </div>
      </form>
    </GuestLayout>
  );
};
