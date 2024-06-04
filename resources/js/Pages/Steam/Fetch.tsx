import { Head, useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { GuestLayout } from '../../Layouts/GuestLayout/GuestLayout';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';
import { TextInputOption } from '../../Components/TextInputOption/TextInputOption';
import { useTranslate } from '../../Hooks/Translate/Translate';

type Props = {
  name?: string;
  batch?: string;
  status?: string;
};

type Progress = {
  done: number;
  all: number;
};

export const Fetch = ({ name = '', batch }: Props) => {
  const { Translate, t } = useTranslate("auth-layout");
  name = name.replace(/ /g, '\u00A0');

  const { post, processing } = useForm();
  const [progress, setProgress] = useState(0);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <GuestLayout>
      <Head title={t("connect steam")} />

      <div
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-xl pb-10">
          <Translate>this is the last step</Translate> {name}.<br/>
          <Translate>fetch message</Translate>
        </div>

        <div>
          {!batch ? (
            <form onSubmit={submit}>
              <PrimaryButton disabled={processing}>
                <Translate>fetch</Translate>
              </PrimaryButton>
            </form>
          ) : (
            <div><Translate>processing</Translate>: {Math.floor(progress)}%</div>
          )}

          <TextInputOption
            left={t("You don't want to do it right now?")}
            linkText={`${t('Click')}${'\u00A0'}${t('here')}`}
            right={`${t('to')}${'\u00A0'}${t('to log out.')}`}
            href={route('logout')}
            method="post"
          />
        </div>
      </div>
    </GuestLayout>
  );
};
