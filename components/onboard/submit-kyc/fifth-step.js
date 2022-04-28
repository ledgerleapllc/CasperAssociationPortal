/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint no-irregular-whitespace: ["error", { "skipRegExps": true }] */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FieldArrayFormCSPR, { defaultNode } from './field-array-form-cspr';

const nodesFormSchema = yup.object().shape({
  form: yup.array().of(
    yup.object().shape({
      email: yup
        .string()
        .required('Email is required')
        .matches(
          /^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-+]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z‌​]{2,})$/,
          'Email is not right format'
        ),
      percent: yup
        .number()
        .typeError('The owner should hold at least 25% or more')
        .required('The owner should hold at least 25% or more')
        .min(25, 'The owner should hold at least 25% or more')
        .max(100, 'Percentage should below 100%'),
      type: yup.string().required('Type is required'),
    })
  ),
});

const SubmitKYCFifthStep = ({ onNext, onHasOwner }) => {
  const {
    control,
    formState,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      form: [defaultNode],
    },
    resolver: yupResolver(nodesFormSchema),
  });

  const checkKeyDown = e => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const onSubmit = data => {
    if (data?.form?.length > 0) {
      onHasOwner(data);
    }
  };

  return (
    <div className="pt-8">
      <p className="text-2.5xl animate__animated animate__fadeInLeft animate__delay-2s">
        Please enter details about each owner of 25% or more of the CSPR token
        in the node.
      </p>
      <p className="text-sm text-dark1 mt-1 animate__animated animate__fadeInLeft animate__delay-4s">
        These users will receive an email link to submit their own KYC details.
      </p>
      <br />
      <div className="animate__animated animate__fadeIn animate__delay-6s">
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={e => checkKeyDown(e)}
        >
          <FieldArrayFormCSPR
            {...{
              control,
              formState,
              getValues,
              onNext,
              register,
              setValue,
              watch,
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default SubmitKYCFifthStep;
