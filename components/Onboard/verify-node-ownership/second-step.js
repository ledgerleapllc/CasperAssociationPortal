import { useState } from 'react';

const VerifyNodeOwnershipSecondStep = ({ isUploaded, onUpload }) => {
  const [publicAddress, setPublicAddress] = useState('');

  return (
    <div className="pt-8">
      <p className="text-2.5xl">Thanks</p>
      <p className="text-sm mt-2 text-dark1 whitespace-pre-line">
        {`Thanks! Now we need to verify this node address is owned or controlled by you. Please follow\nthe steps below:`}
      </p>
      <div className="md:relative mt-12 mr-8">
        <div className="flex items-end">
          <p className="text-2xl">1.</p>
          <p className="text-sm flex-grow ml-8 pb-1">
            Download this message file for signing.
          </p>
          <button
            type="button"
            className="bg-primary rounded-full text-white w-32 h-8 shadow-md focus:outline-none"
          >
            Download
          </button>
        </div>
        <div className="flex items-end my-8">
          <p className="text-2xl">2.</p>
          <p className="text-sm flex-grow ml-8 pb-1">
            Sign the message with your node. See guide for more details.
          </p>
          <button
            type="button"
            className="bg-primary rounded-full text-white w-32 h-8 shadow-md focus:outline-none"
          >
            View Guide
          </button>
        </div>
        <div className="flex items-end my-8">
          <p className="text-2xl">3.</p>
          <p className="text-sm flex-grow ml-8 pb-1">
            Upload the signed file for the system to check.
          </p>
          <button
            type="button"
            className="bg-primary rounded-full text-white w-32 h-8 shadow-md focus:outline-none"
            onClick={onUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyNodeOwnershipSecondStep;
