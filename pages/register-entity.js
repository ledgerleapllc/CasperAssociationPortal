import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';
import Countries from '../public/json/country.json';
import {
  NAME_PATTERN,
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  FORUM_PATTERN,
  TELEGRAM_PATTERN,
  ENTITY_PATTERN,
} from '../helpers/form-validation';
import RegisterService from '../services/register.service';

const entityTypeList = [
  {
    code: 'LLC',
    name: 'LLC',
  },
  {
    code: 'Coporation',
    name: 'Coporation',
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
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [understandChecked, setUnderstandChecked] = useState(false);
  const registerService = new RegisterService();
  const router = useRouter();
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
  const onSubmit = data => {
    registerService.registerEntity(data).then(res => {
      if (res.data) {
        localStorage.setItem('ACCESS-TOKEN', res.data.access_token);
        localStorage.setItem('USER_ID', res.data.user_id);
        router.push('/verify-email');
      }
    });
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

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <form
          className="flex-grow flex items-center justify-center mt-16 md:mt-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full md:w-9/12">
            <p className="text-2xl animate__animated animate__fadeInLeft">
              New Entity User
            </p>
            <p className="text-sm text-dark mt-2 animate__animated animate__fadeInLeft animate__delay-2s">
              LLC/Corp/Trust/Etc. Please fill out the form to register.
            </p>
            <div className="text-sm text-dark mt-2 animate__animated animate__fadeInUp animate__delay-4s">
              <div className="md:flex mt-5 md:space-x-5">
                <div className="flex-1 flex-col">
                  <input
                    type="text"
                    className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                    placeholder="Entity Name *"
                    name="entityName"
                    {...register('entityName', {
                      required: 'Entity name is required',
                      pattern: {
                        message: 'Entity name is invalid',
                        value: ENTITY_PATTERN,
                      },
                    })}
                  />
                  {formState.errors?.entityName && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.entityName?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 flex-col">
                  <div className="w-full md:flex-1 flex items-center justify-between px-7 mt-2 md:mt-0 h-14 rounded-full shadow-md">
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
                    >
                      <option className="text-gray" value="" disabled selected>
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
              <div className="md:flex mt-5 md:space-x-5">
                <div className="flex-1 flex-col">
                  <input
                    type="text"
                    className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
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
                  <div className="w-full md:flex-1 flex items-center justify-between px-7 mt-2 md:mt-0 h-14 rounded-full shadow-md">
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
                    >
                      <option className="text-gray" value="" disabled selected>
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
                    className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
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
              <div className="md:flex mt-5 md:space-x-5">
                <div className="flex-1 flex-col">
                  <input
                    type="text"
                    className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                    placeholder="First Name of Entity Representative *"
                    name="firstName"
                    {...register('firstName', {
                      required: 'First name is required',
                      pattern: {
                        message: 'First name is invalid',
                        value: NAME_PATTERN,
                      },
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
                    className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                    placeholder="Last Name of Entity Representative *"
                    name="lastName"
                    {...register('lastName', {
                      required: 'Last name is required',
                      pattern: {
                        message: 'Last name is invalid',
                        value: NAME_PATTERN,
                      },
                    })}
                  />
                  {formState.errors?.lastName && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.lastName?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex mt-5 md:space-x-5">
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
                        value === getValues().confirmEmail || 'Email not match',
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
                    className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
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
              <div className="md:flex mt-5 md:space-x-5">
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
                      pattern: {
                        message: 'Password is invalid',
                        value: PASSWORD_PATTERN,
                      },
                      validate: value =>
                        value === getValues().confirmPassword ||
                        'Password not match',
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
                    className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
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
              <div className="md:flex mt-5 md:space-x-5">
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
                        message: 'Telegram is invalid',
                        value: TELEGRAM_PATTERN,
                      },
                    }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <input
                        type="text"
                        className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                        placeholder="Telegram"
                        name="telegram"
                        value={value}
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
            </div>
            <div className="flex mt-10 animate__animated animate__fadeInUp animate__delay-6s">
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
                I agree the Terms and Conditions, cookie policy, and privacy
                policy.
              </p>
            </div>
            <div className="flex mt-5 animate__animated animate__fadeInUp animate__delay-7s">
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
                I understand that this portal is only for Casper blockchain node
                operators and affirm that I do operate a node and understand
                that I will be required to prove I am a node operator.
              </p>
            </div>
            <div className="md:flex md:flex-row-reverse mt-10">
              <div className="animate__animated animate__fadeInLeft animate__delay-8s">
                <button
                  type="submit"
                  className="text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  disabled={!validateFields()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default RegisterEntity;
