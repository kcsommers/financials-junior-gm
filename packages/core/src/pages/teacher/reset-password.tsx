import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { Button } from '../../components/Button';
import CheckIcon from '../../components/svg/check-circle-solid.svg';
import ExclamationIcon from '../../components/svg/circle-exclamation-solid.svg';
import { ApiHelper } from '../../api/api-helper';

type CoreResetPasswordPageProps = {
  apiBaseUrl: string;
  logo: ReactElement;
};

export const CoreResetPasswordPage = ({
  logo,
  apiBaseUrl,
}: CoreResetPasswordPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');
  const [resetErrorMsg, setResetErrorMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const resetPassword = () => {
    setIsLoading(true);
    ApiHelper.updateTeacherPassword(apiBaseUrl, {
      email,
      password,
      resetToken: router.query.resetPasswordToken,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.success) {
          setResetSuccessMsg(res.message);
          setResetErrorMsg('');
        } else {
          setResetErrorMsg(res.message);
          setResetSuccessMsg('');
        }
      })
      .catch(() => {
        setIsLoading(false);
        setErrorMsg('Unexpected error resetting password. Please try again');
      });
  };

  const validateForm = () => {
    if (!email || !password || !passwordVerify) {
      setErrorMsg('Please enter email and new password');
      return;
    }
    if (password !== passwordVerify) {
      setErrorMsg('Passwords do not match');
      return;
    }
    resetPassword();
  };

  if (resetSuccessMsg) {
    return (
      <div>
        <div className="m-auto flex justify-center py-4">{logo}</div>
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="icon-wrap">
            {/* @ts-ignore */}
            <CheckIcon className="fill-primary" width={50} />
          </div>
          <p className="text-center text-lg my-2">{resetSuccessMsg}</p>
          <div>
            <Link href="/teacher/login" className="text-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (resetErrorMsg) {
    return (
      <div>
        <div className="m-auto flex justify-center py-4">{logo}</div>
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="icon-wrap">
            {/* @ts-ignore */}
            <ExclamationIcon className="fill-danger" width={50} />
          </div>
          <p className="text-center text-lg my-2">{resetErrorMsg}</p>
          <div className="try-again-wrap">
            <button
              className="text-primary"
              onClick={() => {
                setResetErrorMsg('');
                setResetSuccessMsg('');
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
        <div className="bg-neutral-200 p-8 w-1/2 mx-auto rounded-lg relative">
          <p className="text-primary text-lg text-center mb-8 pb-0">
            Please enter your new password
          </p>
          <div className="mb-4 pt-0">
            <input
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="rounded-md focus:outline focus:outline-2 outline-primary h-[48px] bg-white w-full px-4"
              type="text"
              placeholder="Email address"
              name="username"
              maxLength={100}
            />
          </div>
          <div className="mb-4 pt-0">
            <input
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="rounded-md focus:outline focus:outline-2 outline-primary h-[48px] bg-white w-full px-4"
              type="password"
              placeholder="Password"
              name="password"
              maxLength={100}
            />
          </div>
          <div className="mb-4 pt-0">
            <input
              onChange={(e) => setPasswordVerify(e.target.value)}
              autoComplete="off"
              className="rounded-md focus:outline focus:outline-2 outline-primary h-[48px] bg-white w-full px-4"
              type="password"
              placeholder="Verify password"
              name="password"
              maxLength={100}
            />
          </div>
          {!!errorMsg && (
            <p className="text-base text-danger text-center">*{errorMsg}</p>
          )}
        </div>

        <div className="text-center mt-8">
          <div className="my-4">
            <Button
              onClick={validateForm}
              isLoading={isLoading}
              text="Submit"
            />
          </div>
          <Link href="/" className="text-lg text-primary">
            Back To Dashboard
          </Link>
        </div>
      </form>
    </div>
  );
};
