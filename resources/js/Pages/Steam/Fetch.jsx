import PropTypes from 'prop-types';
import { GuestLayout } from '@/Layouts/GuestLayout/GuestLayout';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';
import { Head, useForm, router } from '@inertiajs/react';
import { TextInputOption } from '@/Components/TextInputOption/TextInputOption';
import { useEffect, useState } from 'react';

export const Fetch = ({ name = '', batch, status = '' }) => {
  name = name.replace(/ /g, '\u00A0');

  const { post, processing } = useForm();
  const [progress, setProgress] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    post(route('steam.fetch'));
  };

  useEffect(() => {
    if (!batch) {
      return;
    }

    const update_progress = async () => {
      const json = await fetch(route('steam.fetch.progress', { batch }), {
        method: 'get',
      }).then((data) => data.json());

      setProgress((json.done / json.all) * 100);
      console.log(json);

      if (json.done == json.all) {
        router.visit(route('library'), { method: 'get' });

        return;
      }

      setTimeout(update_progress, 1000);
    };

    update_progress();
  }, [batch, setProgress]);

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
          {!batch ? (
            <form onSubmit={submit}>
              <PrimaryButton disabled={processing}>Fetch</PrimaryButton>
            </form>
          ) : (
            <div>Processing: {progress}%</div>
          )}

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
  batch: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
};
