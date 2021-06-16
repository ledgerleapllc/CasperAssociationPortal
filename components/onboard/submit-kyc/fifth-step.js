import { useForm } from 'react-hook-form';
import FieldArrayFormCSPR from './field-array-form-cspr';

const defaultValues = {
  form: [
    {
      cspr: null,
      email: '',
      isAdded: false,
      typeCSPR: null,
    },
  ],
};

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
    defaultValues,
    mode: 'onChange',
  });

  const checkKeyDown = e => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const onSubmit = data => {
    if (data?.form?.length > 0) {
      onHasOwner();
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
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={e => checkKeyDown(e)}>
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
