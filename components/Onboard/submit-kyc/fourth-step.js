import { useState } from 'react';

const SubmitKYCFourthStep = ({ onChange }) => {
  const [data, setData] = useState({});

  return (
    <div className="pt-8">
      <p className="text-2.5xl">
        Now, we will need some information about all individuals or
        entities/organizations who own 25% of more of the total CSPR token in
        your node.
      </p>
      <br />
      <br />
      <div>
        <label className="inline-flex items-center mb-6">
          <input
            type="radio"
            className="text-primary"
            value="1"
            name="totalCsrpToken"
            onChange={e => {
              setData({ ...data, totalCsrpToken: e.target.value });
              onChange(data);
            }}
          />
          <span className="text-sm text-dark1">
            No other person, entity,{' '}
            <strong>
              <i>other than myself</i>
            </strong>
            , owns 25% or more of the CSPR in my node.
          </span>
        </label>
        <label className="inline-flex items-center mb-6">
          <input
            type="radio"
            className="text-primary"
            value="2"
            name="totalCsrpToken"
            onChange={e => {
              setData({ ...data, totalCsrpToken: e.target.value });
              onChange(data);
            }}
          />
          <span className="text-sm text-dark1">
            Others own 25% of more of the CSPR in my node (KYC details must be
            provided)
          </span>
        </label>
      </div>
    </div>
  );
};

export default SubmitKYCFourthStep;
