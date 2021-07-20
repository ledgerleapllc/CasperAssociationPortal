import React, { useRef } from 'react';
import { useFieldArray } from 'react-hook-form';
import EmptyFormCspr from './empty-form-cspr';

const MAX_OWNER_NODES = 4;

export const defaultNode = {
  percent: '',
  email: '',
  isAdded: false,
  type: null,
};

export default function FieldArrayFormCSPR({
  control,
  formState,
  getValues,
  onNext,
  register,
  setValue,
  watch,
}) {
  const { errors, isDirty, isValid } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'form',
  });
  const watchFormDefault = watch('form');
  const $submitOwnerNodes = useRef(null);

  const handleShowTitleForm = index => {
    switch (index) {
      case 1:
        return 'First Owner';
      case 2:
        return 'Second Owner';
      case 3:
        return 'Third Owner';
      case 4:
        return 'Fourth Owner';
      default:
        return '';
    }
  };

  const submitNode = index => {
    setValue(`form[${index}].isAdded`, true);
    $submitOwnerNodes.current.click();
  };

  const insertNode = () => {
    if (watchFormDefault[fields.length - 1].isAdded) {
      append({ ...defaultNode });
    }
  };

  const removeNode = index => {
    setValue(`form[${index}]`, { ...defaultNode });
    remove(index);
    $submitOwnerNodes.current.click();
  };

  return (
    <>
      <ul className="grid grid-flow-row lg:grid-cols-2 lg:grid-rows-2 max-w-xl">
        {new Array(MAX_OWNER_NODES).fill(1).map((item, index) => (
          <li
            key={`node-${index}`}
            className={`h-50 lg:h-40 lg:m-2 ${
              index >= fields.length ? 'hidden lg:block' : ''
            }`}
          >
            {index < fields.length && (
              <div className="h-full lg:shadow-lg my-5 lg:my-0 lg:p-4 animate__animated animate__fadeIn animate__delay-3s">
                <div className="flex justify-between">
                  <p className="font-bold text-dark1 text-sm">
                    {handleShowTitleForm(index + 1)}
                  </p>
                  {getValues(`form[${index}].isAdded`) === true ? (
                    <button
                      className="underline text-primary text-xs focus:outline-none"
                      type="button"
                      // disabled={fields.length === 1}
                      onClick={() => removeNode(index)}
                    >
                      Remove Owner
                    </button>
                  ) : (
                    <button
                      disabled={!isDirty || !isValid}
                      className="hidden lg:block disabled:opacity-25 underline text-primary text-xs focus:outline-none"
                      type="button"
                      onClick={() => submitNode(index)}
                    >
                      Add
                    </button>
                  )}
                </div>
                <div className="pt-2 pb-7 lg:pb-4 relative">
                  <input
                    type="text"
                    className="w-full h-14 lg:h-4 px-7 lg:p-0 shadow-md lg:shadow-none rounded-full lg:rounded-none lg:text-xs lg:border-gray lg:border-b focus:outline-none placeholder-gray-50"
                    placeholder="Email Address *"
                    {...register(`form.${index}.email`)}
                    hidden={watchFormDefault[index].isAdded}
                  />
                  {watchFormDefault[index].isAdded && (
                    <span className="pt-6 block lg:inline h-14 lg:h-4 px-7 lg:p-0 lg:text-xs">
                      {watchFormDefault[index].email}
                    </span>
                  )}
                  {errors.form && errors.form[index]?.email && (
                    <p className="absolute bottom-0 ml-7 lg:ml-0 text-primary lg:text-xxs pt-1">
                      {errors.form[index].email.message}
                    </p>
                  )}
                </div>
                <div className="flex lg:flex-col">
                  <div className="w-28 lg:w-auto pb-7 lg:pb-4 relative">
                    <input
                      type="number"
                      className={`w-full lg:w-max h-14 lg:h-4 px-7 lg:p-0 shadow-md lg:shadow-none rounded-full lg:rounded-none lg:text-xs lg:border-b
                      focus:outline-none placeholder-gray-50`}
                      placeholder="% of CSPR"
                      {...register(`form.${index}.percent`)}
                      hidden={watchFormDefault[index].isAdded}
                    />
                    {watchFormDefault[index].isAdded && (
                      <span className="w-28 lg:w-auto h-14 lg:h-4 px-7 lg:p-0 lg:text-xs">
                        {watchFormDefault[index].percent}%
                      </span>
                    )}
                    {errors.form && errors.form[index]?.percent && (
                      <p className="w-screen lg:w-full absolute bottom-0 ml-7 lg:ml-0 mt-2 text-primary lg:text-xxs">
                        {errors.form[index].percent.message}
                      </p>
                    )}
                  </div>
                  <fieldset
                    className="pt-1 pb-7 lg:pb-4 inline-flex"
                    disabled={watchFormDefault[index].isAdded}
                  >
                    <div className="flex items-center ml-4 lg:ml-0">
                      <label className="relative pl-8 inline-flex items-center mr-6">
                        <input
                          type="radio"
                          className="text-primary"
                          value="individual"
                          checked={
                            watchFormDefault[index].type === 'individual'
                          }
                          {...register(`form.${index}.type`)}
                        />
                        <span className="text-sm text-dark1">Individual</span>
                      </label>
                      <label className="relative pl-8 flex">
                        <input
                          type="radio"
                          className="text-primary"
                          value="entity"
                          checked={watchFormDefault[index].type === 'entity'}
                          {...register(`form.${index}.type`)}
                        />
                        <span className="text-sm text-dark1">Entity</span>
                      </label>
                    </div>
                  </fieldset>
                </div>
                <input
                  hidden
                  type="radio"
                  className="is Added"
                  {...register(`form.${index}.isAdded`)}
                />
              </div>
            )}
            {index >= fields.length && (
              <>
                <button
                  className="border-2 border-gray border-dashed inline-block w-full h-full focus:outline-none animate__animated animate__fadeIn animate__delay-3s"
                  type="button"
                  onClick={insertNode}
                >
                  {index === fields.length && <EmptyFormCspr />}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={!isDirty || !isValid || fields.length > 4}
        className={`${
          fields.length > 1
            ? 'bg-white border-2 border-primary hover:bg-primary hover:bg-opacity-40 hover:text-white text-primary'
            : 'bg-primary text-white hover:opacity-40'
        } lg:hidden disabled:opacity-25 text-lg w-full h-16 rounded-full shadow-md focus:outline-none`}
        onClick={() => {
          submitNode(fields.length - 1);
          if (fields.length < 4) {
            insertNode();
          }
        }}
      >
        + Add Owner
      </button>
      {fields.length > 1 && (
        <button
          type="button"
          className="lg:hidden my-5 text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          onClick={onNext}
        >
          Finished
        </button>
      )}
      <input
        ref={$submitOwnerNodes}
        hidden
        id="form-action"
        type="submit"
        name="submit"
      />
    </>
  );
}
