import { useState } from 'react';

const VerifyNodeOwnershipFirstStep = ({ isVerified, onSubmit }) => {
  const [publicAddress, setPublicAddress] = useState('');

  return (
    <div className="pt-8">
      <p className="text-2.5xl whitespace-pre-line animate__animated animate__fadeInLeft animate__delay-2s">
        {`Please enter the public address of your validator node and\npress submit`}
      </p>
      <p className="text-sm mt-2 text-dark1 animate__animated animate__fadeInLeft animate__delay-4s">
        Clicking below will open up the hellosign document for capturing your
        electronic signature
      </p>
      <div className="md:relative mt-12 animate__animated animate__fadeInUp animate__delay-6s">
        <input
          type="text"
          className="w-full h-16 text-xl px-7 md:pr-72 rounded-full shadow-md focus:outline-none"
          value={publicAddress}
          onChange={e => setPublicAddress(e.target.value)}
        />
        <button
          type="button"
          className="md:absolute right-0 text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary focus:outline-none mt-2 md:mt-0 disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={publicAddress?.length === 0}
          onClick={() => onSubmit(publicAddress)}
        >
          Verify
        </button>
        {isVerified && (
          <img
            src="/images/ic_check_circle.svg"
            alt="submit success"
            className="absolute bottom-4 -right-20 hidden md:block"
          />
        )}
      </div>
    </div>
  );
};

export default VerifyNodeOwnershipFirstStep;
