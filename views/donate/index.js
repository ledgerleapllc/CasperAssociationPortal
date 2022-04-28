import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PublicHeader from '../../components/layouts/public-header';
import { Button, Checkbox } from '../../components/partials';
import { useSnackBar } from '../../components/partials/snack-bar';
import { EMAIL_PATTERN } from '../../helpers/form-validation';
import { donate, checkSessionId } from '../../shared/redux-saga/auth/actions';
import { AppContext } from '../../pages/_app';

const DonatePage = () => {
  const { formState, register, watch, handleSubmit, reset, setValue } = useForm(
    {
      mode: 'onChange',
    }
  );
  const { openSnack } = useSnackBar();
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
  const watchDonate = watch('donate');

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  const query = useQuery();

  useEffect(() => {
    const sessionId = query.get('session_id');
    if (sessionId) {
      setLoading(true);
      dispatch(
        checkSessionId(
          { sessionId },
          res => {
            if (res && res.success) {
              openSnack('primary', 'Submit donation successfully!');
              setTimeout(() => {
                window.location.href = '/donate';
              }, 2000);
            } else {
              window.location.href = '/donate';
            }
          },
          () => {
            window.location.href = '/donate';
          }
        )
      );
    }
  }, []);

  const onSubmit = data => {
    setLoading(true);
    const temp = data;
    if (data.donate !== 'Other') {
      temp.amount = data.donate;
    }
    dispatch(
      donate(
        data,
        res => {
          if (res && res.url) {
            window.location.href = res.url;
          } else {
            setLoading(false);
            openSnack('primary', 'Submit donation successfully!');
            reset();
          }
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const handleDonate = (val, key) => {
    if (val) {
      setValue('donate', key, { shouldValidate: true });
      setTimeout(() => setValue('amount', null, { shouldValidate: true }));
    } else {
      setValue('donate', null);
    }
  };

  return (
    <div className="flex flex-col">
      <PublicHeader />
      <div
        className="flex flex-col pt-14 mx-auto w-container bg-transparent"
        style={{ maxWidth: '100%' }}
      >
        <h2 className="text-2xl font-normal mb-2.5">Make a donation</h2>
        <span>
          If you like what we’re doing and want to see more, help support us
          with a small donation.
        </span>
        <div className="max-w-800px pb-20">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 content">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    className="rounded-full border border-gray1 w-full mt-4 flex-1 h-14 px-7 shadow-md focus:outline-none"
                    placeholder="First Name *"
                    name="first_name"
                    {...register('first_name', {
                      required: 'First Name is required',
                    })}
                  />
                  {formState.errors?.first_name && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.first_name?.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    className="rounded-full border border-gray1 w-full mt-4 flex-1 h-14 px-7 shadow-md focus:outline-none"
                    placeholder="Last Name *"
                    name="last_name"
                    {...register('last_name', {
                      required: 'Last name is required',
                    })}
                  />
                  {formState.errors?.last_name && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.last_name?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  className="rounded-full border border-gray1 w-full flex-1 h-14 px-7 shadow-md focus:outline-none"
                  placeholder="Email *"
                  name="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      message: 'Email is invalid',
                      value: EMAIL_PATTERN,
                    },
                  })}
                />
                {formState.errors?.email && (
                  <p className="pl-7 mt-2 text-primary">
                    {formState.errors.email?.message}
                  </p>
                )}
              </div>
              <div>
                <p className="pt-4 pb-6">How much do you want to donate?</p>
                <ul className="flex flex-col gap-6">
                  <li>
                    <Checkbox
                      value={watchDonate === '5'}
                      onChange={val => handleDonate(val, '5')}
                      labelText="$5"
                    />
                  </li>
                  <li>
                    <Checkbox
                      labelText="$10"
                      value={watchDonate === '10'}
                      onChange={val => handleDonate(val, '10')}
                    />
                  </li>
                  <li>
                    <Checkbox
                      labelText="$25"
                      value={watchDonate === '25'}
                      onChange={val => handleDonate(val, '25')}
                    />
                  </li>
                  <li>
                    <Checkbox
                      labelText="$50"
                      value={watchDonate === '50'}
                      onChange={val => handleDonate(val, '50')}
                    />
                  </li>
                  <li>
                    <Checkbox
                      labelText="Other"
                      value={watchDonate === 'Other'}
                      onChange={val => handleDonate(val, 'Other')}
                    />
                    <div className="mt-4">
                      <input
                        disabled={watchDonate !== 'Other'}
                        type="number"
                        className="rounded-full border border-gray1 w-full flex-1 h-14 px-7 shadow-md focus:outline-none"
                        placeholder="Enter amount"
                        name="amount"
                        {...register('amount', {
                          validate: value => {
                            if (watchDonate === 'Other' && !value) {
                              return 'Amount is required';
                            }
                            if (watchDonate === 'Other' && +value < 1) {
                              return 'Amount should greater than or equal 1';
                            }
                            return null;
                          },
                        })}
                      />
                      {formState.errors?.amount && (
                        <p className="pl-7 mt-2 text-primary">
                          {formState.errors.amount?.message}
                        </p>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <textarea
                  type="text"
                  className="rounded-3xl border border-gray1 w-full mt-4 flex-1 p-7 py-5 shadow-md focus:outline-none"
                  placeholder="Comment/Message"
                  rows="6"
                  name="message"
                  {...register('message', {
                    required: 'Message is required',
                  })}
                />
                {formState.errors?.message && (
                  <p className="pl-7 mt-2 text-primary">
                    {formState.errors.message?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row pt-4 justify-start">
                <Button
                  type="submit"
                  disabled={!formState.isValid}
                  sizeSpinner={20}
                  primary
                  className="my-1 text-lg"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <footer className="pb-2 flex justify-center text-xs">
        ©{new Date().getFullYear()} Casper Association
      </footer>
    </div>
  );
};

export default DonatePage;
