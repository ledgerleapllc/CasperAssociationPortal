/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import ReactLoading from 'react-loading';
import AppHeader from '../components/layouts/app-header';
import AppFooter from '../components/layouts/app-footer';
import Countries from '../public/json/country.json';
import {
  // NAME_PATTERN,
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  FORUM_PATTERN,
  TELEGRAM_PATTERN,
  ENTITY_PATTERN,
  DIGITIZED_PATTERN,
  SPECIAL_CHARACTER_PATTERN,
} from '../helpers/form-validation';
import { LoadingButton } from '../components/partials';
import { registerEntity } from '../shared/redux-saga/auth/actions';
import { checkValidatorAddress } from '../shared/redux-saga/onboard/actions';
import { LoadingScreen } from '../components/hoc/loading-screen';
import IconCheck from '../public/images/ic-feather-check.svg';

const entityTypeList = [
  {
    code: 'LLC',
    name: 'LLC',
  },
  {
    code: 'Corporation',
    name: 'Corporation',
  },
  {
    code: 'Trust',
    name: 'Trust',
  },
  {
    code: 'Foundation',
    name: 'Foundation',
  },
  {
    code: 'Association',
    name: 'Association',
  },
  {
    code: 'Sole Proprietorship',
    name: 'Sole Proprietorship',
  },
  {
    code: 'Other',
    name: 'Other',
  },
];

const RegisterEntity = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [validatorAddressMessage, setValidatorAddressMessage] = useState('');
  const [validatorAddressVerified, setValidatorAddressVerified] =
    useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [understandChecked, setUnderstandChecked] = useState(false);
  const [newsletterChecked, setNewsletterChecked] = useState(false);
  const router = useHistory();
  const {
    control,
    formState,
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    setError,
    watch,
  } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkVAddress = validatorAddress =>
    new Promise(resolve => {
      setValidatorAddressMessage('');
      setValidatorAddressVerified(false);
      setIsVerifying(true);
      dispatch(
        checkValidatorAddress(
          {
            validatorAddress,
          },
          res => {
            setIsVerifying(false);
            if (res) {
              if (res.message) {
                setValidatorAddressMessage(res.message);
                setValidatorAddressVerified(false);
                resolve(false);
              } else {
                setValidatorAddressVerified(true);
                resolve(true);
              }
            } else {
              setValidatorAddressVerified(false);
              resolve(false);
            }
          }
        )
      );
    });

  const onSubmit = async data => {
    const params = {
      ...data,
    };
    if (params.telegram === '@') {
      delete params.telegram;
    }
    let validatorAddress = data.validatorAddress || '';
    validatorAddress = validatorAddress.toLowerCase();
    setIsSubmitting(true);
    const verifyResponse = await checkVAddress(validatorAddress);
    setIsSubmitting(false);
    if (verifyResponse) {
      setIsSubmitting(true);
      dispatch(
        registerEntity(
          params,
          userData => {
            localStorage.setItem(
              `TEMP_VALIDATOR_ADDRESS_${userData.id}`,
              validatorAddress
            );
            router.push('/verify-email');
          },
          () => {
            setIsSubmitting(false);
          }
        )
      );
    }
  };

  const watchRegisterCountry = watch('entityRegisterCountry');
  const watchEntityType = watch('entityType');

  const validateFields = () => {
    if (!agreeChecked || !understandChecked) {
      return false;
    }
    return true;
  };

  const focusTelegram = e => {
    if (!e.target.value || e.target.value === '') {
      setValue('telegram', '@');
    }
  };

  const blurTelegram = e => {
    if (e.target.value === '@') {
      setValue('telegram', '');
    }
  };

  const onChangeTelegram = e => {
    if (e.target.value === '' || !/^@/.test(e.target.value)) {
      setValue('telegram', '@');
      e.target.value = '@';
    } else {
      setValue('telegram', e.target.value);
    }
  };

  const onClickTerms = e => {
    e.preventDefault();
    window.open('/terms-of-service.pdf', '_blank').focus();
  };

  return (
    <>
      <Head>
        <title>Entity Registration - Casper Association Portal</title>
      </Head>
      <div className="flex justify-center min-h-screen">
        <div
          className="
            flex flex-col w-full
            p-4
            lg:max-w-380 lg:p-9
            xl:max-w-screen-xl xl:p-9
            2xl:max-w-screen-2xl"
        >
          <AppHeader theme="dark" />
          <form
            className="flex-grow flex items-center justify-center mt-16 lg:mt-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full lg:w-9/12">
              <p className="text-2xl animate__animated animate__fadeInLeft">
                New Entity User
              </p>
              <p className="text-sm text-dark mt-2 animate__animated animate__fadeInLeft">
                LLC/Corp/Trust/Etc. Please fill out the form to register.
              </p>
              <div className="text-sm text-dark mt-2 animate__animated animate__fadeInUp animate__delay-0-5s">
                <div className="lg:flex mt-5 lg:space-x-5">
                  <div className="flex-1 flex-col">
                    <input
                      type="text"
                      className="w-full mt-2 lg:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                      placeholder="Entity Name *"
                      name="entityName"
                      {...register('entityName', {
                        required: 'Entity name is required',
                        /*
                        pattern: {
                          message: 'Entity name is invalid',
                          value: ENTITY_PATTERN,
                        },
                        */
                      })}
                    />
                    {formState.errors?.entityName && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.entityName?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 flex-col">
                    <div className="w-full lg:flex-1 flex items-center justify-between px-7 mt-2 lg:mt-0 h-14 rounded-full shadow-md">
                      <select
                        className={`w-full h-full cursor-pointer focus:outline-none ${
                          watchEntityType?.length > 0
                            ? 'text-black1'
                            : 'text-gray'
                        }`}
                        name="entityType"
                        {...register('entityType', {
                          required: 'Entity type is require',
                        })}
                        defaultValue=""
                      >
                        <option className="text-gray" value="" disabled>
                          Select Entity Type *
                        </option>
                        {entityTypeList.map((type, index) => (
                          <option key={index} value={type.code}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                      <img src="/images/ic_arrow_down.svg" alt="down" />
                    </div>
                    {formState.errors?.entityType && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.entityType?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="lg:flex mt-5 lg:space-x-5">
                  <div className="flex-1 flex-col">
                    <input
                      type="text"
                      className="w-full mt-2 lg:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                      placeholder="Entity Registration Number *"
                      name="entityRegisterNumber"
                      {...register('entityRegisterNumber', {
                        required: 'Entity registration number is required',
                        pattern: {
                          message: 'Entity registration number is invalid',
                          value: ENTITY_PATTERN,
                        },
                      })}
                    />
                    {formState.errors?.entityRegisterNumber && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.entityRegisterNumber?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 flex-col">
                    <div className="w-full lg:flex-1 flex items-center justify-between px-7 mt-2 lg:mt-0 h-14 rounded-full shadow-md">
                      <select
                        className={`w-full h-full cursor-pointer focus:outline-none ${
                          watchRegisterCountry?.length > 0
                            ? 'text-black1'
                            : 'text-gray'
                        }`}
                        name="entityRegisterCountry"
                        {...register('entityRegisterCountry', {
                          required: 'Entity Registration Country is require',
                        })}
                        defaultValue=""
                      >
                        <option className="text-gray" value="" disabled>
                          Entity Registration Country *
                        </option>
                        {Countries.map((country, index) => (
                          <option key={index} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      <img src="/images/ic_arrow_down.svg" alt="down" />
                    </div>
                    {formState.errors?.entityRegisterCountry && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.entityRegisterCountry?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 flex-col">
                    <input
                      type="text"
                      className="w-full mt-2 lg:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                      placeholder="Entity Tax ID/VAT Number"
                      name="entityTax"
                      {...register('entityTax', {
                        pattern: {
                          message: 'Entity Tax ID/VAT Number is invalid',
                          value: ENTITY_PATTERN,
                        },
                      })}
                    />
                    {formState.errors?.entityTax && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.entityTax?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="lg:flex mt-5 lg:space-x-5">
                  <div className="flex-1 flex-col">
                    <input
                      type="text"
                      className="w-full mt-2 lg:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                      placeholder="First Name of Entity Representative *"
                      name="firstName"
                      {...register('firstName', {
                        required: 'First name is required',
                        /*
                        pattern: {
                          message: 'First name is invalid',
                          value: NAME_PATTERN,
                        },
                        */
                      })}
                    />
                    {formState.errors?.firstName && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.firstName?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 flex-col">
                    <input
                      type="text"
                      className="w-full mt-2 lg:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                      placeholder="Last Name of Entity Representative *"
                      name="lastName"
                      {...register('lastName', {
                        required: 'Last name is required',
                        /*
                        pattern: {
                          message: 'Last name is invalid',
                          value: NAME_PATTERN,
                        },
                        */
                      })}
                    />
                    {formState.errors?.lastName && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.lastName?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="lg:flex mt-5 lg:space-x-5">
                  <div className="flex-1 flex-col">
                    <input
                      type="text"
                      className="w-full h-14 px-7 rounded-full shadow-md focus:outline-none"
                      placeholder="Email *"
                      name="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          message: 'Email is invalid',
                          value: EMAIL_PATTERN,
                        },
                        validate: value =>
                          value === getValues().confirmEmail ||
                          !formState.touchedFields.confirmEmail ||
                          'Email not match',
                      })}
                    />
                    {formState.errors?.email && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 flex-col">
                    <input
                      type="text"
                      className="w-full mt-2 lg:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                      placeholder="Confirm Email *"
                      name="confirmEmail"
                      {...register('confirmEmail', {
                        required: 'Email Confirm is required',
                        pattern: {
                          message: 'Email Confirm is invalid',
                          value: EMAIL_PATTERN,
                        },
                        validate: value =>
                          value === getValues().email
                            ? clearErrors('email')
                            : setError('email', {
                                message: 'Email not match',
                              }),
                      })}
                    />
                    {formState.errors?.confirmEmail && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.confirmEmail?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="lg:flex mt-5 lg:space-x-5">
                  <div className="flex-1 flex-col">
                    <input
                      type="password"
                      className="w-full h-14 px-7 rounded-full shadow-md focus:outline-none"
                      placeholder="Password *"
                      name="password"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          message: 'Min 8 character',
                          value: 8,
                        },
                        validate: value => {
                          if (value === value.toLowerCase())
                            return 'Must contain at least one uppercase letter';
                          if (!DIGITIZED_PATTERN.test(value))
                            return 'Must contain at least one number';
                          if (!SPECIAL_CHARACTER_PATTERN.test(value))
                            return 'Must contain at lease one special character';
                          if (value !== getValues().confirmPassword)
                            return 'Password not match';
                          return true;
                        },
                      })}
                    />
                    {formState.errors?.password && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.password?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 flex-col">
                    <input
                      type="password"
                      className="w-full mt-2 lg:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                      placeholder="Confirm Password *"
                      name="confirmPassword"
                      {...register('confirmPassword', {
                        required: 'Confirm password is required',
                        minLength: {
                          message: 'Min 8 character',
                          value: 8,
                        },
                        pattern: {
                          message: 'Confirm password is invalid',
                          value: PASSWORD_PATTERN,
                        },
                        validate: value =>
                          value === getValues().password
                            ? clearErrors('password')
                            : setError('password', {
                                message: 'Password not match',
                              }),
                      })}
                    />
                    {formState.errors?.confirmPassword && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.confirmPassword?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="lg:flex mt-5 lg:space-x-5">
                  <div className="flex-1 flex-col">
                    <input
                      type="text"
                      className="w-full h-14 px-7 rounded-full shadow-md focus:outline-none"
                      placeholder="Forum Name / Pseudonym *"
                      name="pseudonym"
                      {...register('pseudonym', {
                        required: 'Forum name is required',
                        pattern: {
                          message: 'Forum name is invalid',
                          value: FORUM_PATTERN,
                        },
                      })}
                    />
                    {formState.errors?.pseudonym && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.pseudonym?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 flex-col">
                    <Controller
                      name="telegram"
                      control={control}
                      rules={{
                        pattern: {
                          message: 'The Telegram user name format is invalid',
                          value: TELEGRAM_PATTERN,
                        },
                      }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <input
                          type="text"
                          className="w-full mt-2 lg:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                          placeholder="Telegram User Name"
                          name="telegram"
                          value={value || ''}
                          onChange={e => {
                            onChangeTelegram(e);
                            onChange(e);
                          }}
                          onBlur={e => {
                            blurTelegram(e);
                            onBlur(e);
                          }}
                          onFocus={e => focusTelegram(e)}
                        />
                      )}
                    />
                    {formState.errors?.telegram && (
                      <p className="pl-7 mt-2 text-primary">
                        {formState.errors.telegram?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-10">
                  <p>
                    At this time, the portal is only accepting membership from
                    active validator node operators. Please enter your first
                    validator node address. If you have more than one, you can
                    add these later after registration.
                  </p>
                  <div className="mt-3 flex items-center">
                    <div className="w-full lg:w-6/12">
                      <input
                        type="text"
                        className="w-full mt-2 lg:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                        placeholder="Enter validator node address *"
                        name="validatorAddress"
                        {...register('validatorAddress', {
                          required: 'Validator address is required',
                        })}
                        disabled={isVerifying}
                        onChange={() => {
                          setValidatorAddressMessage('');
                          setValidatorAddressVerified(false);
                        }}
                      />
                    </div>
                    {isVerifying ? (
                      <ReactLoading
                        className="ml-3"
                        type="spinningBubbles"
                        color="#FF473E"
                        width={30}
                        height={30}
                      />
                    ) : validatorAddressVerified ? (
                      <div className="ml-3">
                        <IconCheck className="text-primary" />
                      </div>
                    ) : null}
                  </div>
                  {formState.errors?.validatorAddress ||
                  validatorAddressMessage ? (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors?.validatorAddress?.message ||
                        validatorAddressMessage}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex mt-10 animate__animated animate__fadeInUp animate__delay-1s">
                <button
                  type="button"
                  className="flex items-baseline focus:outline-none"
                  onClick={() => setAgreeChecked(!agreeChecked)}
                >
                  <img
                    src={`/images/${
                      agreeChecked ? 'ic_check.svg' : 'ic_uncheck.svg'
                    }`}
                    alt="agree checkbox"
                    width={18}
                    height={18}
                  />
                </button>
                <p className="flex-1 text-dark1 text-sm ml-4">
                  I agree the{' '}
                  <span
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={e => onClickTerms(e)}
                  >
                    Terms and Conditions
                  </span>
                  , cookie policy, and privacy policy.
                </p>
              </div>
              <div className="flex mt-5 animate__animated animate__fadeInUp animate__delay-1-5s">
                <button
                  type="button"
                  className="flex items-baseline focus:outline-none"
                  onClick={() => setUnderstandChecked(!understandChecked)}
                >
                  <img
                    src={`/images/${
                      understandChecked ? 'ic_check.svg' : 'ic_uncheck.svg'
                    }`}
                    alt="understand checkbox"
                    width={18}
                    height={18}
                  />
                </button>
                <p className="flex-1 text-dark1 text-sm ml-4 break-words">
                  I understand that this portal is only for Casper blockchain{' '}
                  node operators and affirm that I do operate a node and{' '}
                  understand that I will be required to prove I am a node{' '}
                  operator.
                </p>
              </div>
              <div className="flex mt-5 animate__animated animate__fadeInUp animate__delay-1-5s">
                <button
                  type="button"
                  className="flex items-baseline focus:outline-none"
                  onClick={() => setNewsletterChecked(!newsletterChecked)}
                >
                  <img
                    src={`/images/${
                      newsletterChecked ? 'ic_check.svg' : 'ic_uncheck.svg'
                    }`}
                    alt="understand checkbox"
                    width={18}
                    height={18}
                  />
                </button>
                <div className="flex-1 text-dark1 ml-4">
                  <p className="break-words text-sm">
                    I want to sign up to the newsletter for the latest
                    information and Casper insights.
                  </p>
                  <p className="break-words text-xs mt-3">
                    Disclaimer: You can withdraw your consent at any time by
                    unsubscribing or sending an e-mail to{' '}
                    <a className="underline" href="mailto:info@casper.network">
                      info@casper.network
                    </a>
                    . For further information see the Data Privacy Policy{' '}
                    <a
                      className="underline"
                      href="https://casper.meta.ditoy.com/en-us/privacy-policy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://casper.meta.ditoy.com/en-us/privacy-policy
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="lg:flex lg:flex-row-reverse mt-10">
                <div className="animate__animated animate__fadeInLeft animate__delay-1-5s">
                  <LoadingButton
                    type="submit"
                    isDisabled={!validateFields() || isSubmitting}
                    isLoading={isSubmitting}
                    title="Submit"
                    className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  />
                </div>
              </div>
            </div>
          </form>
          <AppFooter theme="dark" />
        </div>
      </div>
    </>
  );
};

export default LoadingScreen(RegisterEntity, 'auth');
