import { Head } from '@inertiajs/react';
import { GuestLayout } from '../../Layouts/GuestLayout/GuestLayout';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';
import { TextInputOption } from '../../Components/TextInputOption/TextInputOption';

export const Connect = () => {
  return (
    <GuestLayout>
      <Head title="Connect Steam" />

      <div
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-2xl pb-10">
          Connect your steam account
        </div>

        <div>
          <a href={route('steam.redirect')}>
            <PrimaryButton>Connect</PrimaryButton>
          </a>

          <TextInputOption
            left="You don't want to do it right now?"
            linkText={`Click${'\u00A0'}here`}
            right={`to${'\u00A0'}Log${'\u00A0'}out.`}
            href={route('logout')}
            method="post"
          />
        </div>
      </div>
    </GuestLayout>
  );
};
