import { useState } from 'react';

const SubmitKYCFourthStep = ({ onNext, onChange }) => {
  const [data, setData] = useState({});

  return (
    <div className="pt-8">
      <p className="text-2.5xl animate__animated animate__fadeInLeft animate__delay-2s">
        Now, we will need some information about all individuals or
        entities/organizations who own 25% of more of the total CSPR token in
        your node.
      </p>
      <br />
      <br />
      <div>
        <label className="relative pl-8 inline-flex items-center mb-6 animate__animated animate__fadeInUp animate__delay-4s">
          <input
            type="radio"
            className="text-primary"
            value="1"
            name="type"
            onChange={e => {
              const temp = { ...data, type: +e.target.value };
              setData(temp);
              onChange(temp);
            }}
          />
          <span className="text-sm text-dark1">
            No other person, entity, or organization{' '}
            <strong>
              <i>other than myself</i>
            </strong>
            , owns 25% or more of the CSPR in my node.
          </span>
        </label>
        <label className="relative pl-8 flex mb-6 animate__animated animate__fadeInUp animate__delay-6s">
          <input
            type="radio"
            className="text-primary"
            value="2"
            name="type"
            onChange={e => {
              const temp = { ...data, type: +e.target.value };
              setData(temp);
              onChange(temp);
            }}
          />
          <span className="text-sm text-dark1">
            Others own 25% of more of the CSPR in my node (KYC details must be
            provided)
          </span>
        </label>
        {data.type && (
          <p className="text-xs text-primary">
            On the next screen, you will provide the details of any individual,
            entity, or organization that owns 25% or more of the CSPR in the
            node.
          </p>
        )}
      </div>
      <button
        type="button"
        className="md:hidden my-5 text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
        onClick={onNext}
      >
        Continue
      </button>
    </div>
  );
};

export default SubmitKYCFourthStep;
