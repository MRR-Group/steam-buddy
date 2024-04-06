import PropTypes from 'prop-types';
import { GuestLayout } from '@/Layouts/GuestLayout/GuestLayout';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export const VerifyEmail = ({ status }) => {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();

    post(route('verification.send'));
  };

  return (
    <GuestLayout>
      <Head title="Email Verification" />

      {status === 'verification-link-sent' && (
        <div className="mb-4 font-medium text-sm text-green-600">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}

      <form onSubmit={submit}>
        <div className="text-center text-text text-2xl pb-10">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn't receive the email, we will gladly send you another.
        </div>

        <div>
          <PrimaryButton disabled={processing}>
            Resend Verification Email
          </PrimaryButton>

          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="underline text-sm text-text hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log Out
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
};

VerifyEmail.propTypes = {
  status: PropTypes.string,
};
