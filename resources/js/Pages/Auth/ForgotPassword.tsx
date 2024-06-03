import { Head, useForm } from '@inertiajs/react';
import { GuestLayout } from '../../Layouts/GuestLayout/GuestLayout';
import { TextInput } from '../../Components/TextInput/TextInput';
import { InputError } from '../../Components/InputError/InputError';
import { TextInputOption } from '../../Components/TextInputOption/TextInputOption';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';
import { useTranslate } from '../../Hooks/Translate/Translate';

type Props = {
  status?: string;
};

export const ForgotPassword = ({ status }: Props) => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const { Translate, t } = useTranslate("auth-layout");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <GuestLayout status={status}>
      <Head title={t("reset password title")} />

      <form
        onSubmit={submit}
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-3xl pb-10">
          <Translate>reset password title</Translate>
        </div>

        <div className="pb-10">
          <TextInput
            type="email"
            name="email"
            label={t('email')}
            autoComplete="username"
            value={data.email}
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />

          <TextInputOption
            left={t(`Do you remember your password?`)}
            linkText={`${t('Click')}${'\u00A0'}${t('here')}`}
            right={`${t('to')}${'\u00A0'}${t('to log in.')}`}
            href={route('login')}
          />
        </div>

        <div className="flex justify-center w-full">
          <PrimaryButton disabled={processing}>
            <Translate>send</Translate>
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};
