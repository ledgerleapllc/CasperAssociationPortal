/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import InfoIcon from '@material-ui/icons/Info';
import { ENTITY_PATTERN } from '../../../helpers/form-validation';
import { LoadingButton, Tooltips } from '../../partials';
import Countries from '../../../public/json/country.json';
import ArrowIcon from '../../../public/images/ic_arrow_down.svg';
import { submitNode } from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { updateUser } from '../../../shared/redux-saga/auth/actions';
import { UserType } from '../../../shared/constants/user-type';

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

export const SwitchUserType = ({ goNext }) => {
  const [userType, setUserType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector(state => state.authReducer.userInfo);
  const dispatch = useDispatch();

  const { formState, register, handleSubmit, watch, setValue } = useForm({
    mode: 'onChange',
  });
  const watchEntityType = watch('entity_type');
  const watchRegisterCountry = watch('entity_registration_country');

  useEffect(() => {
    setUserType(user?.type);
    if (user.type === UserType.entity) {
      setValue('entity_name', user?.fullInfo?.entity_name, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('entity_type', user?.fullInfo?.entity_type, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue(
        'entity_registration_number',
        user?.fullInfo?.entity_register_number,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue(
        'entity_registration_country',
        user?.fullInfo?.entity_register_country,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue('vat_number', user?.fullInfo?.profile?.vat_number, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [user]);

  const submitIndividual = () => {
    setIsSubmitting(true);
    dispatch(
      submitNode(
        { type: 'individual' },
        () => {
          dispatch(updateUser({ type: UserType.individual }));
          setIsSubmitting(false);
          goNext();
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
  };

  const onSubmit = data => {
    setIsSubmitting(true);
    const params = {
      ...data,
      type: 'entity',
    };
    dispatch(
      submitNode(
        params,
        () => {
          dispatch(updateUser({ type: UserType.entity }));
          setIsSubmitting(false);
          goNext();
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
  };

  return (
    <div className="animate__animated animate__fadeInLeft animate__delay-8s">
      <p className="text-lg mt-2 text-dark1">
        Before we begin, do you represent an entity such as a company, trust,{' '}
        LLC, non-profit, or another type of organization that controls your{' '}
        node?
      </p>
      <div className="form-group my-10">
        <label className="relative pl-8 flex items-center">
          <input
            name="user_type"
            type="radio"
            className="text-primary"
            value="individual"
            checked={userType === UserType.individual}
            onChange={() => setUserType(UserType.individual)}
          />
          <span className="text-sm text-dark1">NO</span>
        </label>
        <label className="relative pl-8 mt-6 flex items-center">
          <input
            name="user_type"
            type="radio"
            className="text-primary"
            value="entity"
            checked={userType === UserType.entity}
            onChange={() => setUserType(UserType.entity)}
          />
          <span className="text-sm text-dark1">YES</span>
        </label>
      </div>
      {userType === UserType.entity ? (
        <div className="animate__animated animate__fadeInUp animate__delay-1s mb-10">
          <p className="text-lg text-dark1">
            If your node is operated by this entity, you will need to verify the{' '}
            entity. Please enter the following info to begin the verification
            process.
          </p>
          <form
            className="w-full mt-16 lg:mt-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full lg:flex mt-5 lg:space-x-5">
              <div className="w-full lg:w-4/12">
                <label>Entity Name</label>
                <input
                  type="text"
                  className="w-full mt-2 h-14 px-7 rounded-full shadow-md focus:outline-none"
                  name="entity_name"
                  {...register('entity_name', {
                    required: 'Entity name is required',
                    pattern: {
                      message: 'Entity name is invalid',
                      value: ENTITY_PATTERN,
                    },
                  })}
                />
                {formState.errors?.entity_name && (
                  <p className="mt-2 text-primary">
                    {formState.errors.entity_name?.message}
                  </p>
                )}
              </div>
              <div className="w-full lg:w-4/12">
                <label>Entity Type</label>
                <div className="relative w-full lg:flex-1 flex items-center justify-between px-7 mt-2 h-14 rounded-full shadow-md">
                  <select
                    className={`w-full h-full cursor-pointer focus:outline-none ${
                      watchEntityType?.length > 0 ? 'text-black1' : 'text-gray'
                    }`}
                    name="entity_type"
                    {...register('entity_type', {
                      required: 'Entity type is require',
                    })}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {entityTypeList.map((type, index) => (
                      <option key={index} value={type.code}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <ArrowIcon className="absolute right-7" />
                </div>
                {formState.errors?.entity_type && (
                  <p className="mt-2 text-primary">
                    {formState.errors.entity_type?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full lg:flex mt-10 lg:space-x-5">
              <div className="w-full lg:w-4/12">
                <label>Entity Registration Number</label>
                <input
                  type="text"
                  className="w-full mt-2 h-14 px-7 rounded-full shadow-md focus:outline-none"
                  name="entity_registration_number"
                  {...register('entity_registration_number', {
                    required: 'Entity registration number is required',
                    pattern: {
                      message: 'Entity registration number is invalid',
                      value: ENTITY_PATTERN,
                    },
                  })}
                />
                {formState.errors?.entity_registration_number && (
                  <p className="mt-2 text-primary">
                    {formState.errors.entity_registration_number?.message}
                  </p>
                )}
              </div>
              <div className="w-full lg:w-4/12">
                <label>Entity Registration Country</label>
                <div className="relative w-full lg:flex-1 flex items-center justify-between px-7 mt-2 h-14 rounded-full shadow-md">
                  <select
                    className={`w-full h-full cursor-pointer focus:outline-none ${
                      watchRegisterCountry?.length > 0
                        ? 'text-black1'
                        : 'text-gray'
                    }`}
                    name="entity_registration_country"
                    {...register('entity_registration_country', {
                      required: 'Entity Registration Country is require',
                    })}
                    defaultValue=""
                  >
                    <option className="text-gray" value="" disabled>
                      Select...
                    </option>
                    {Countries.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <ArrowIcon className="absolute right-7" />
                </div>
                {formState.errors?.entity_registration_country && (
                  <p className="mt-2 text-primary">
                    {formState.errors.entity_registration_country?.message}
                  </p>
                )}
              </div>
              <div className="w-full lg:w-2/12">
                <div className="flex align-center items-center">
                  <label className="mr-2">Enter VAT Number</label>
                  <Tooltips
                    placement="top"
                    title="VAT Number: A Value Added Tax Identification Number or VAT Identification Number (VATIN) is an identifier used in many countries for value added tax purposes. You will be asked to upload proof of your VAT Number in the next step of the verification process."
                    arrow
                  >
                    <InfoIcon style={{ color: 'black', fontSize: '16px' }} />
                  </Tooltips>
                </div>
                <input
                  type="text"
                  className="w-full mt-2 h-14 px-7 rounded-full shadow-md focus:outline-none"
                  name="vat_number"
                  {...register('vat_number', {
                    pattern: {
                      message: 'Entity VAT Number is invalid',
                      value: ENTITY_PATTERN,
                    },
                  })}
                />
                {formState.errors?.vat_number && (
                  <p className="mt-2 text-primary">
                    {formState.errors.vat_number?.message}
                  </p>
                )}
              </div>
            </div>
            <LoadingButton
              type="submit"
              isDisabled={!formState.isValid || isSubmitting}
              isLoading={isSubmitting}
              title="Continue"
              className="mt-10 text-lg text-white w-full lg:w-64 h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
            />
          </form>
        </div>
      ) : (
        <LoadingButton
          type="button"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          title="Continue"
          className="text-lg text-white w-full lg:w-64 h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
          onClick={submitIndividual}
        />
      )}
    </div>
  );
};
