import PropTypes from 'prop-types';
import { GuestLayout } from '@/Layouts/GuestLayout/GuestLayout';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';
import { Head } from '@inertiajs/react';
import { TextInputOption } from '@/Components/TextInputOption/TextInputOption';

export const Fetch = ({ name = '', status = '' }) => {
  name = name.replace(/ /g, '\u00A0');

  return (
    <GuestLayout status={status}>
      <Head title="Connect Steam" />

      <div
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-xl pb-10">
          This is the last step {name}. Now we need to download from steam
          information about all your achievements and games. It may take a
          while.
        </div>

        <div>
          <a href={route('steam.redirect')}>
            <PrimaryButton>Fetch</PrimaryButton>
          </a>

          <TextInputOption
            left="You don't want to do it right now?"
            linkText={`Click${'\u00A0'}here`}
            right={`to${'\u00A0'}Log${'\u00A0'}out.`}
            href={route('logout')}
            method="post"
          >
            Log Out
          </TextInputOption>
        </div>
      </div>
    </GuestLayout>
  );
};

Fetch.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
};
