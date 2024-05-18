import { Head, useForm } from '@inertiajs/react';
import { GuestLayout } from '../../Layouts/GuestLayout/GuestLayout';
import { TextInput } from '../../Components/TextInput/TextInput';
import { InputError } from '../../Components/InputError/InputError';
import { TextInputOption } from '../../Components/TextInputOption/TextInputOption';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';

type Props = {
  status?: string;
};

export const ForgotPassword = ({ status }: Props) => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <GuestLayout status={status}>
      <Head title="Forgot Password" />

      <form
        onSubmit={submit}
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-3xl pb-10">
          Reset password
        </div>

        <div className="pb-10">
          <TextInput
            type="email"
            name="email"
            label="Email"
            autoComplete="username"
            value={data.email}
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />

          <TextInputOption
            left="Do you remember your password?"
            linkText={`Click${'\u00A0'}here`}
            right={`to${'\u00A0'}log in.`}
            href={route('login')}
          />
        </div>

        <div className="flex justify-center w-full">
          <PrimaryButton disabled={processing}>Send</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};
