import { useForm } from 'react-hook-form';
import { EMAIL_PATTERN } from '../../../../helpers/form-validation';

export const AddRecipientDialog = ({ onAdd, onBack }) => {
  const { formState, register, handleSubmit } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = data => {
    onAdd(data);
  };

  return (
    <div className="text-center mx-auto py-28" style={{ maxWidth: '26rem' }}>
      <h3 className="text-xl text-center mb-2.5">
        Add a new contact form recipient by entering their email address below
      </h3>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="border border-gray1 w-full mt-4 flex-1 h-14 px-7 shadow-md focus:outline-none"
          placeholder="Email"
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
        <div className="w-100 flex gap-2.5 items-center mx-auto mt-8">
          <button
            type="button"
            className="w-full text-lg text-primary h-16 rounded-full bg-white border-2 border-primary shadow-md focus:outline-none hover:bg-primary hover:bg-opacity-40 hover:text-white"
            onClick={onBack}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full text-lg text-white h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          >
            + Add
          </button>
        </div>
      </form>
    </div>
  );
};
