import { Head, useForm } from '@inertiajs/react';
import { useCleanup } from '../../Hooks/UseCleanup/UseCleanup';
import { GuestLayout } from '../../Layouts/GuestLayout/GuestLayout';
import { TextInput } from '../../Components/TextInput/TextInput';
import { InputError } from '../../Components/InputError/InputError';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';

export const ConfirmPassword = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  useCleanup(() => reset('password'));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('password.confirm'));
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <form
        onSubmit={submit}
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-2xl pb-10">
          This is a secure area of the application. Please confirm your password
          before continuing.
        </div>

        <div className="pb-10">
          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex justify-center w-full">
          <PrimaryButton disabled={processing}>Confirm</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};
