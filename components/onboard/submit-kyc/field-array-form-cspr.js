import React, { useState, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import EmptyFormCspr from './empty-form-cspr';

export default function FieldArrayFormCSPR({
  control,
  formState,
  getValues,
  onNext,
  register,
  setValue,
  watch,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'form',
  });
  const [currentForm, setCurrentForm] = useState(fields?.length);
  const [isCreatedOwner, setIsCreatedOwner] = useState(false);
  const watchFormDefault = watch('form');
  useEffect(() => {
    if (
      currentForm !== 0 &&
      watchFormDefault[watchFormDefault.length - 1].percent > 100
    ) {
      setValue(
        `form[${currentForm - 1}].percent`,
        watchFormDefault[watchFormDefault.length - 1].percent.substring(
          0,
          watchFormDefault[watchFormDefault.length - 1].percent.length - 1
        )
      );
    }
  }, [watchFormDefault[watchFormDefault.length - 1]]);

  useEffect(() => {
    if (currentForm === 1) {
      setIsCreatedOwner(false);
    }
    if (currentForm === 0) {
      append([
        {
          percent: null,
          email: '',
          isAdded: false,
          type: null,
        },
      ]);
      setCurrentForm(prev => prev + 1);
    }
  }, [currentForm]);

  const handleShowTitleForm = form => {
    switch (form) {
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

  const conditionClickAddOwner = formDefault => {
    if (currentForm !== 0) {
      return (
        formDefault[formDefault.length - 1].email !== '' &&
        formDefault[formDefault.length - 1].percent !== null &&
        formDefault[formDefault.length - 1].type !== null
      );
    }
  };

  const onSubmitData = () => {
    if (formState.isValid) {
      setValue(`form[${currentForm - 1}].isAdded`, true);
      // Call API
      const buttonSubmit = document.getElementById('form-action');
      buttonSubmit.click();
      // Display button finish
      setIsCreatedOwner(true);
    }
  };
  const appendForm = () => {
    if (
      formState.isValid &&
      currentForm < 4 &&
      getValues(`form[${watchFormDefault.length - 1}].isAdded`) === true
    ) {
      append();
      setCurrentForm(prev => prev + 1);
    }
  };

  const removeForm = i => {
    remove(i);
    setCurrentForm(fields.length - 1);
  };

  return (
    <>
      <ul className="grid grid-flow-row md:grid-cols-2 md:grid-rows-2 max-w-xl">
        {fields?.map((item, index) => (
          <li key={item.id} className="md:m-2 animate__animated animate__fadeIn animate__delay-3s">
            <div className="md:shadow-lg my-5 md:my-0 md:p-4">
              <div className="flex justify-between">
                <p className="font-bold text-dark1 text-sm">
                  {handleShowTitleForm(index + 1)}
                </p>
                {getValues(`form[${index}].isAdded`) === true ? (
                  <button
                    className="underline text-primary text-xs focus:outline-none"
                    type="button"
                    onClick={() => removeForm(index)}
                  >
                    Remove Owner
                  </button>
                ) : (
                  <button
                    disabled={!conditionClickAddOwner(watchFormDefault)}
                    className="hidden md:block disabled:opacity-25 underline text-primary text-xs focus:outline-none"
                    type="button"
                    onClick={() => onSubmitData()}
                  >
                    Add
                  </button>
                )}
              </div>
              <input
                type="text"
                className={`w-full h-14 md:h-4 px-7 md:p-0 shadow-md md:shadow-none rounded-full md:rounded-none mt-4 md:text-xs md:border-gray ${
                  getValues(`form[${index}].isAdded`) === true
                    ? 'md:border-0'
                    : 'md:border-b'
                } focus:outline-none placeholder-gray-50`}
                placeholder="Email Address *"
                {...register(`form.${index}.email`, {
                  pattern:
                    /^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-+]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z‌​]{2,})$/,
                })}
                hidden={getValues(`form[${index}].isAdded`)}
              />
              {getValues(`form[${index}].isAdded`) && <p className="h-14 md:h-4 px-7 md:p-0 mt-4 md:text-xs">{getValues(`form[${index}].email`)}</p>}
              <div className="flex md:block items-center">
                {getValues(`form[${index}].isAdded`) === true ? (
                  <span
                    className={`flex justify-start items-center w-full md:w-max h-14 md:h-4 px-7 md:p-0 shadow-md md:shadow-none rounded-full md:rounded-none mt-3 md:text-xs md:border-0
                    focus:outline-none placeholder-gray-50`}
                  >
                    {`${getValues(`form[${index}].percent`)}%`}
                  </span>
                ) : (
                  <div className="flex flex-col items-baseline">
                    <input
                      type="number"
                      className={`w-full md:w-max h-14 md:h-4 px-7 md:p-0 shadow-md md:shadow-none rounded-full md:rounded-none mt-3 md:text-xs md:border-b
                      focus:outline-none placeholder-gray-50`}
                      placeholder="% of CSPR"
                      {...register(`form.${index}.percent`, {
                        required: true,
                        min: {
                          value: 25,
                          message: 'The owner should hold atleast 25% or more',
                        },
                      })}
                    />
                    {formState.errors.form &&
                      formState.errors.form[index].percent && (
                        <p className="ml-7 md:ml-0 mt-2 text-primary md:text-xs">
                          {formState.errors.form[index].percent.message}
                        </p>
                      )}
                  </div>
                )}
                <div className="flex items-center mt-3 ml-4 md:ml-0">
                  <label className="relative pl-8 inline-flex items-center mr-6">
                    <input
                      disabled={getValues(`form[${index}].isAdded`) === true}
                      type="radio"
                      className="text-primary"
                      value="individual"
                      {...register(`form.${index}.type`)}
                    />
                    <span className="text-sm text-dark1">Individual</span>
                  </label>
                  <label className="relative pl-8 flex">
                    <input
                      disabled={getValues(`form[${index}].isAdded`) === true}
                      type="radio"
                      className="text-primary"
                      value="entity"
                      {...register(`form.${index}.type`)}
                    />
                    <span className="text-sm text-dark1">Entity</span>
                  </label>
                </div>
              </div>
              <input
                hidden
                type="radio"
                className="is Added"
                {...register(`form.${index}.isAdded`)}
              />
            </div>
          </li>
        ))}
        <li
          className={`hidden m-2 items-center align-center justify-center border-2 border-gray border-dashed ${
            fields.length >= 2 ? '' : 'md:flex'
          }`}
        >
          <button
            disabled={!conditionClickAddOwner(watchFormDefault)}
            className="inline-block w-full h-full focus:outline-none"
            type="button"
            onClick={appendForm}
          >
            {fields.length + 1 === 2 && <EmptyFormCspr />}
          </button>
        </li>
        <li
          className={`hidden m-2 items-center align-center justify-center border-2 border-gray border-dashed ${
            fields.length >= 3 ? '' : 'md:flex'
          }`}
        >
          <button
            disabled={!conditionClickAddOwner(watchFormDefault)}
            className="inline-block w-full h-full focus:outline-none"
            type="button"
            onClick={appendForm}
          >
            {fields.length + 1 === 3 && <EmptyFormCspr />}
          </button>
        </li>
        <li
          className={`hidden m-2 items-center align-center justify-center border-2 border-gray border-dashed ${
            fields.length >= 4 ? '' : 'md:flex'
          }`}
        >
          <button
            disabled={!conditionClickAddOwner(watchFormDefault)}
            className="inline-block w-full h-full focus:outline-none"
            type="button"
            onClick={appendForm}
          >
            {fields.length + 1 === 4 && <EmptyFormCspr />}
          </button>
        </li>
      </ul>
      <input hidden id="form-action" type="submit" name="submit" />
      {currentForm <= 4 && (
        <button
          type="button"
          disabled={
            (getValues(`form[${watchFormDefault.length - 1}].isAdded`) ===
              true &&
              currentForm === 4) ||
            !conditionClickAddOwner(watchFormDefault)
          }
          className={`${
            isCreatedOwner
              ? 'bg-white border-2 border-primary hover:bg-primary hover:bg-opacity-40 hover:text-white text-primary'
              : 'bg-primary text-white hover:opacity-40'
          } md:hidden disabled:opacity-25 text-lg w-full h-16 rounded-full shadow-md focus:outline-none`}
          onClick={() => {
            onSubmitData();
            appendForm();
          }}
        >
          + Add Owner
        </button>
      )}
      {isCreatedOwner && (
        <button
          type="button"
          className="md:hidden my-5 text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          onClick={onNext}
        >
          Finished
        </button>
      )}
    </>
  );
}
