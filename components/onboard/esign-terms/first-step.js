import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Document from '../../../public/images/ic_document.svg';
import { getMembershipFileForUser } from '../../../shared/redux-saga/onboard/actions';

const EsignTermsFirstStep = ({ selectedDocument, onDocumentSelect }) => {
  const [agreements, setAgreements] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getMembershipFileForUser(
        {},
        res => {
          console.log(res);
          setAgreements([res]);
        },
        () => {}
      )
    );
  }, []);

  return (
    <div className="pt-8">
      <p className="text-2.5xl">Now, you must sign the Membership Agreement</p>
      <p className="text-sm mt-2 text-dark1">
        Clicking the icons below will open them up on a new tab for viewing
        before you sign. On the next screen, you will electronically sign these
        documents. Please click next to proceed after your are done reviewing.
      </p>
      <div className="mt-10 flex flex-wrap space-x-10">
        {agreements.map((document, index) => (
          <button
            key={index}
            type="button"
            className="text-center focus:outline-none"
            onClick={() => onDocumentSelect(document)}
          >
            <Document
              width={38}
              height={50}
              className={
                document === selectedDocument ? 'text-primary' : 'text-dark-3'
              }
              style={
                document === selectedDocument
                  ? { fontSize: '2px' }
                  : { fontSize: '1px' }
              }
            />
            <p className="text-dark3 mt-1 text-xs">{document?.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EsignTermsFirstStep;
