import React, { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import EmptyFormCspr from './empty-form-cspr';

export default function FieldArrayFormCSPR({
  control,
  onHandleNext,
  register,
  watch,
}) {
  const { fields, append } = useFieldArray({
    control,
    name: 'form',
  });
  const [currentForm, setCurrentForm] = useState(fields?.length);
  const [isCreatedOwner, setIsCreatedOwner] = useState(false);
  const watchFormDefault = watch('form');
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

  const conditionClickAddOwner = formDefault =>
    formDefault[0].email !== '' &&
    formDefault[0].csrp !== '' &&
    formDefault[0].typeCSRP !== null;

  const appendForm = () => {
    append();
    setCurrentForm(prev => prev + 1);
    setIsCreatedOwner(true);
  };

  return (
    <>
      <ul className="grid grid-flow-row md:grid-cols-2 md:grid-rows-2">
        {fields?.map((item, index) => (
          <li key={item.id} className="md:m-2">
            <div className="md:shadow-lg my-5 md:my-0 md:p-4">
              <div className="flex md:justify-between">
                <p className="font-bold text-dark1 text-sm">
                  {handleShowTitleForm(index + 1)}
                </p>
                <button
                  className="hidden md:block underline text-primary text-xs"
                  type="submit"
                >
                  Add
                </button>
              </div>
              <input
                className="w-full h-14 md:h-4 px-7 md:p-0 shadow-md md:shadow-none rounded-full md:rounded-none mt-4 md:text-xs md:border-gray md:border-b focus:outline-none placeholder-gray-50"
                placeholder="Email Address *"
                {...register(`form.${index}.email`)}
              />
              <div className="flex md:block items-center">
                <input
                  className="w-full md:w-max h-14 md:h-4 px-7 md:p-0 shadow-md md:shadow-none rounded-full md:rounded-none mt-3 md:text-xs md:border-gray md:border-b focus:outline-none placeholder-gray-50"
                  placeholder="% of CSPR"
                  {...register(`form.${index}.csrp`)}
                />
                <div className="flex items-center mt-3 ml-4 md:ml-0">
                  <label className="relative pl-8 inline-flex items-center mr-6">
                    <input
                      type="radio"
                      className="text-primary"
                      value="individual"
                      {...register(`form.${index}.typeCSRP`)}
                    />
                    <span className="text-sm text-dark1">Individual</span>
                  </label>
                  <label className="relative pl-8 flex">
                    <input
                      type="radio"
                      className="text-primary"
                      value="entity"
                      {...register(`form.${index}.typeCSRP`)}
                    />
                    <span className="text-sm text-dark1">Entity</span>
                  </label>
                </div>
              </div>
            </div>
          </li>
        ))}
        <li
          className={`hidden m-2 items-center align-center justify-center border border-gray border-dashed ${
            currentForm >= 2 ? '' : 'md:flex'
          }`}
        >
          {currentForm + 1 === 2 ? (
            <EmptyFormCspr isDisplayButton appendForm={appendForm} />
          ) : (
            <EmptyFormCspr isDisplayButton={false} appendForm={appendForm} />
          )}
        </li>
        <li
          className={`hidden m-2 items-center align-center justify-center border border-gray border-dashed ${
            currentForm >= 3 ? '' : 'md:flex'
          }`}
        >
          {currentForm + 1 === 3 ? (
            <EmptyFormCspr isDisplayButton appendForm={appendForm} />
          ) : (
            <EmptyFormCspr isDisplayButton={false} appendForm={appendForm} />
          )}
        </li>
        <li
          className={`hidden m-2 items-center align-center justify-center border border-gray border-dashed ${
            currentForm >= 4 ? '' : 'md:flex'
          }`}
        >
          {currentForm + 1 === 4 ? (
            <EmptyFormCspr isDisplayButton appendForm={appendForm} />
          ) : (
            <EmptyFormCspr isDisplayButton={false} appendForm={appendForm} />
          )}
        </li>
      </ul>
      {currentForm < 4 && (
        <button
          type="button"
          disabled={!conditionClickAddOwner(watchFormDefault)}
          className={`${
            isCreatedOwner
              ? 'bg-white border-2 border-primary hover:bg-primary hover:bg-opacity-40 hover:text-white text-primary'
              : 'bg-primary text-white hover:opacity-40'
          } md:hidden disabled:opacity-25 text-lg w-full h-16 rounded-full shadow-md focus:outline-none`}
          onClick={() => appendForm()}
        >
          + Add Owner
        </button>
      )}
      {isCreatedOwner && (
        <button
          type="button"
          className="md:hidden my-5 text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          onClick={onHandleNext}
        >
          Finished
        </button>
      )}
    </>
  );
}
