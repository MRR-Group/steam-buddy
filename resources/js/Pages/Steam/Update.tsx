import { Head, useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { GuestLayout } from '../../Layouts/GuestLayout/GuestLayout';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';

type Props = {
  batch?: string;
  status?: string;
};

type Progress = {
  done: number;
  all: number;
};

export const Update = ({  batch, status = '' }: Props) => {
  const { post, processing } = useForm();
  const [progress, setProgress] = useState(0);


  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('steam.update'));
  };

  useEffect(() => {
    if (!batch) {
      return;
    }

    const update_progress = async () => {
      const json = await fetch(route('steam.update.progress', { batch }), {
        method: 'get',
      }).then<Progress>((data) => data.json());

      setProgress((json.done / json.all) * 100);

      if (json.done === json.all) {
        router.visit(route('library'), { method: 'get' });

        return;
      }

      setTimeout(update_progress, 1000);
    };

    update_progress();
  }, [batch, setProgress]);

  return (
    <GuestLayout status={status}>
      <Head title="Updating Steam" />

      <div
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-xl pb-10">
          We are downloading all your new achievements and games. It may take a
          while.
        </div>

        <div>
          {!batch ? (
            <form onSubmit={submit}>
              <PrimaryButton disabled={processing}>Update</PrimaryButton>
            </form>
          ) : (
            <div>Processing: {Math.floor(progress)}%</div>
          )}
        </div>
      </div>
    </GuestLayout>
  );
};
