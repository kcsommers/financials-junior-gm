import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { Button } from '../../components/Button';
import CheckIcon from '../../components/svg/check-circle-solid.svg';
import ExclamationIcon from '../../components/svg/circle-exclamation-solid.svg';
import { ApiHelper } from '../../api/api-helper';

type CoreForgotPasswordPageProps = {
  apiBaseUrl: string;
  logo: ReactElement;
};

export const CoreForgotPasswordPage = ({
  apiBaseUrl,
  logo,
}: CoreForgotPasswordPageProps) => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSuccessMsg, setEmailSuccessMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const resetPassword = () => {
    setIsLoading(true);
    ApiHelper.resetTeacherPassword(apiBaseUrl, { email })
      .then((res) => {
        setIsLoading(false);
        if (res.success) {
          setEmailSuccessMsg(res.message);
          setEmailErrorMsg('');
        } else {
          setEmailErrorMsg(res.message);
          setEmailSuccessMsg('');
        }
      })
      .catch(() => {
        setIsLoading(false);
        setErrorMsg('Unexpected error sending email. Please try again');
      });
  };

  const validate = () => {
    if (!email) {
      setErrorMsg('Email Required');
      return;
    }
    resetPassword();
  };

  if (emailSuccessMsg) {
    return (
      <div>
        <div className="m-auto flex justify-center py-4">{logo}</div>
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="icon-wrap">
            {/* @ts-ignore */}
            <CheckIcon className="fill-primary" width={50} />
          </div>
          <p className="text-center text-lg my-2">{emailSuccessMsg}</p>
        </div>
      </div>
    );
  }

  if (emailErrorMsg) {
    return (
      <div>
        <div className="m-auto flex justify-center py-4">{logo}</div>
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="icon-wrap">
            {/* @ts-ignore */}
            <ExclamationIcon className="fill-red-700" width={50} />
          </div>
          <p className="text-center text-lg my-2">{emailErrorMsg}</p>
          <div className="try-again-wrap">
            <button
              className="text-primary"
              onClick={() => {
                setEmailErrorMsg('');
                setEmailSuccessMsg('');
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="m-auto flex justify-center py-4">{logo}</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="bg-neutral-200 w-1/2 mx-auto rounded-lg relative">
          <p className="text-primary text-lg text-center mb-8 p-12 pb-0">
            Enter your email address to reset your password
          </p>
          <div className="mb-4 p-16 pt-0">
            <p className="text-center mb-1 text-2xl">Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="rounded-md focus:outline focus:outline-2 outline-primary h-[48px] bg-white w-full px-4"
              type="email"
              placeholder="Email address"
              name="email"
            />
          </div>
          {!!errorMsg && (
            <p className="text-base text-red-700 text-center absolute left-1/2 bottom-8 -translate-x-1/2">
              *{errorMsg}
            </p>
          )}
        </div>

        <div className="text-center mt-12">
          <div className="my-4">
            <Button onClick={validate} isLoading={isLoading} text="Submit" />
          </div>
          <Link href="/" className="text-lg text-primary">
            Back To Dashboard
          </Link>
        </div>
      </form>
    </div>
  );
};
