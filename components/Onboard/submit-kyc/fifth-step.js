import { useForm } from 'react-hook-form';
import FieldArrayFormCSPR from './field-array-form-cspr';

const defaultValues = {
  form: [
    {
      csrp: '',
      email: '',
      typeCSRP: null,
    },
  ],
};

const SubmitKYCFifthStep = ({onHandleNext}) => {
  const { control, register, handleSubmit, watch } = useForm({
    defaultValues,
    mode: 'onSubmit',
  });

  const checkKeyDown = e => {
    if (e.code === 'Enter') e.preventDefault();
  };
  const onSubmit = data => console.log('data', data);

  return (
    <div className="pt-8">
      <p className="text-2.5xl">
        Please enter details about each owner of 25% or more of the CSPR token
        in the node.
      </p>
      <p className="text-sm text-dark1 mt-1">
        These users will receive an email link to submit their own KYC details.
      </p>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={e => checkKeyDown(e)}>
        <FieldArrayFormCSPR {...{ control, onHandleNext, register, watch }} />
      </form>
    </div>
  );
};

export default SubmitKYCFifthStep;
