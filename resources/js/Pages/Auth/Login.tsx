import { Head, useForm } from '@inertiajs/react';
import { useCleanup } from '../../Hooks/UseCleanup/UseCleanup';
import { GuestLayout } from '../../Layouts/GuestLayout/GuestLayout';
import { TextInput } from '../../Components/TextInput/TextInput';
import { InputError } from '../../Components/InputError/InputError';
import { TextInputOption } from '../../Components/TextInputOption/TextInputOption';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';
import { useTranslate } from '../../Hooks/Translate/Translate';

type Props = {
  status?: string;
};

export const Login = ({ status }: Props) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useCleanup(() => () => reset('password'));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('login'));
  };

  const { Translate, t } = useTranslate("auth-layout");

  return (
    <GuestLayout status={status}>
      <Head title={t("log in title")} />

      <form
        onSubmit={submit}
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-3xl pb-6">
          <Translate>log in title</Translate>
        </div>

        <div className="pb-6">
          <TextInput
            type="email"
            name="email"
            label={t('email')}
            value={data.email}
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />

          <TextInputOption
            left={t(`You don't have an account?`)}
            linkText={`${t('Click')}${'\u00A0'}${t('here')}`}
            right={`${t('to')}${'\u00A0'}${t('to register')}`}
            href={route('register')}
          />
        </div>

        <div className="pb-6">
          <TextInput
            type="password"
            name="password"
            label={t('password')}
            value={data.password}
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />

          <TextInputOption
            left={t(`You don't remember?`)}
            linkText={`${t('Click')}${'\u00A0'}${t('here')}`}
            right={`${t('to')}${'\u00A0'}${t('to reset it.')}`}
            href={route('password.request')}
          />
        </div>

        <div className="flex justify-center w-full">
          <PrimaryButton disabled={processing}>
            <Translate>log in</Translate>
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};
