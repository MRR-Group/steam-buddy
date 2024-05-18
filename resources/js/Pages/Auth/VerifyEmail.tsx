import { Head, useForm } from '@inertiajs/react';
import { GuestLayout } from '../../Layouts/GuestLayout/GuestLayout';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';
import { TextInputOption } from '../../Components/TextInputOption/TextInputOption';

type Props = {
  status?: string;
};

export const VerifyEmail = ({ status }: Props) => {
  const { post, processing } = useForm({});

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('verification.send'));
  };

  return (
    <GuestLayout
      status={
        status === 'verification-link-sent'
          ? 'A new verification link has been sent to the email address you provided during registration.'
          : status
      }
    >
      <Head title="Email Verification" />

      <form
        onSubmit={submit}
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-xl pb-10">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn't receive the email, we will gladly send you another.
        </div>

        <div>
          <PrimaryButton disabled={processing}>
            Resend Verification Email
          </PrimaryButton>

          <TextInputOption
            left="You don't want to do it right now?"
            linkText={`Click${'\u00A0'}here`}
            right={`to${'\u00A0'}Log${'\u00A0'}out.`}
            href={route('logout')}
            method="post"
          />
        </div>
      </form>
    </GuestLayout>
  );
};
