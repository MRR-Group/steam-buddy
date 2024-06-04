import { Head, useForm } from '@inertiajs/react';
import { useCleanup } from '../../Hooks/UseCleanup/UseCleanup';
import { GuestLayout } from '../../Layouts/GuestLayout/GuestLayout';
import { TextInput } from '../../Components/TextInput/TextInput';
import { InputError } from '../../Components/InputError/InputError';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';
import { useTranslate } from '../../Hooks/Translate/Translate';

type Props = {
  token: string;
  email: string;
};

export const ResetPassword = ({ token, email }: Props) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  useCleanup(() => reset('password', 'password_confirmation'));
  const { Translate, t } = useTranslate("auth-layout");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('password.store'));
  };

  return (
    <GuestLayout>
      <Head title={t("reset password title")} />

      <form
        onSubmit={submit}
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-3xl pb-6">
          <Translate>
            reset password title
          </Translate>
        </div>

        <div className="pb-10">
          <TextInput
            type="password"
            name="password"
            label={t("password")}
            value={data.password}
            autoComplete="new-password"
            isFocused={true}
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="pb-10">
          <TextInput
            type="password"
            name="password_confirmation"
            label={t("confirm password")}
            value={data.password_confirmation}
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex justify-center w-full">
          <PrimaryButton disabled={processing}>
            <Translate>reset password</Translate>
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};
