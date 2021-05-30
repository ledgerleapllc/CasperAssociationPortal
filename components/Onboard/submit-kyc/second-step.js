import { useState } from 'react';
import Countries from '../../../public/json/country.json';

const SubmitKYCSecondStep = ({ onNext, onChange }) => {
  const [data, setData] = useState({});
  const [citizenship, setCitizenship] = useState(null);
  const [residence, setResidence] = useState(null);

  return (
    <div className="pt-8">
      <div className="md:flex md:space-x-5">
        <input
          type="text"
          className="w-full md:flex-1 h-14 px-7 rounded-full shadow-md focus:outline-none"
          placeholder="First Name *"
          onChange={e => {
            setData({ ...data, firstName: e.target.value });
            onChange(data);
          }}
        />
        <input
          type="text"
          className="w-full md:flex-1 mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
          placeholder="Last Name *"
          onChange={e => {
            setData({ ...data, lastName: e.target.value });
            onChange(data);
          }}
        />
      </div>
      <div className="md:flex space-x-5 mt-2">
        <input
          type="text"
          className="w-full md:flex-1 md:auto h-14 px-7 rounded-full shadow-md focus:outline-none"
          placeholder="DOB (mm/dd/yyyy) *"
          onChange={e => {
            setData({ ...data, dob: e.target.value });
            onChange(data);
          }}
        />
        <div className="md:flex-1 px-7" />
      </div>
      <input
        type="text"
        className="w-full h-14 px-7 mt-2 rounded-full shadow-md focus:outline-none"
        placeholder="Address *"
        onChange={e => {
          setData({ ...data, address: e.target.value });
          onChange(data);
        }}
      />
      <div className="md:flex md:space-x-5 mt-2">
        <input
          type="text"
          className="w-full md:flex-1 h-14 px-7 rounded-full shadow-md focus:outline-none"
          placeholder="City *"
          onChange={e => {
            setData({ ...data, city: e.target.value });
            onChange(data);
          }}
        />
        <input
          type="text"
          className="w-full md:flex-1 mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
          placeholder="Postal Code or Zip *"
          onChange={e => {
            setData({ ...data, zipcode: e.target.value });
            onChange(data);
          }}
        />
      </div>
      <div className="md:flex md:space-x-5 mt-2">
        <div className="w-full md:flex-1 flex items-center justify-between px-7 mt-2 md:mt-0 h-14 rounded-full shadow-md">
          <select
            className={`max-w-60 cursor-pointer focus:outline-none ${
              citizenship ? 'text-black' : 'text-gray'
            }`}
            onChange={e => {
              setCitizenship(e.target.value);
              setData({ ...data, citizenship });
            }}
          >
            <option className="text-gray" value="" disabled selected>
              Country of Citizenship *
            </option>
            {Countries.map(country => (
              <option value={country.code}>{country.name}</option>
            ))}
          </select>
          <img src="/images/ic_arrow_down.svg" alt="down" />
        </div>
        <div className="w-full md:flex-1 flex items-center justify-between px-7 mt-2 md:mt-0 h-14 rounded-full shadow-md">
          <select
            className={`max-w-60 cursor-pointer focus:outline-none ${
              residence ? 'text-black' : 'text-gray'
            }`}
            onChange={e => {
              setResidence(e.target.value);
              setData({ ...data, residence });
            }}
          >
            <option className="text-gray" value="" disabled selected>
              Country of Residence *
            </option>
            {Countries.map(country => (
              <option value={country.code}>{country.name}</option>
            ))}
          </select>
          <img src="/images/ic_arrow_down.svg" alt="down" />
        </div>
      </div>
      <p className="text-sm text-dark1 mt-8">
        By clicking continue, you are confirming that the above information is
        correct and that you can provide a document to prove your personal
        information, such as a passport, and another document to prove you
        reside at the above address, such as a utility/phone bill or bank
        statement.
      </p>
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

export default SubmitKYCSecondStep;
