import { useState } from 'react';

const VerifyNodeOwnershipThirdStep = ({ isUploaded, onUpload }) => {
  const [publicAddress, setPublicAddress] = useState('');

  return (
    <div className="pt-8">
      <p className="text-2.5xl">Thank you</p>
      <p className="text-sm mt-2 text-dark1 whitespace-pre-line">
        We are checking your message file. Do not exit this screen.
      </p>
      <div className="md:relative mt-12">
        
      </div>
    </div>
  );
};

export default VerifyNodeOwnershipThirdStep;
