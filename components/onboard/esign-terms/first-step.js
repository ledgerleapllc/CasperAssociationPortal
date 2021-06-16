import Document from '../../../public/images/ic_document.svg';

const EsignTermsFirstStep = ({
  documents,
  selectedDocument,
  onDocumentSelect,
}) => (
  <div className="pt-8">
    <p className="text-2.5xl">Members must sign the Membership Agreement</p>
    <p className="text-sm mt-2 text-dark1">
      Clicking below will open up the hellosign document for capturing your
      electronic signature
    </p>
    <div className="mt-10 flex flex-wrap space-x-10">
      {documents.map((document, index) => (
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
          <p className="text-dark3 mt-1 text-xs">{document}</p>
        </button>
      ))}
    </div>
  </div>
);

export default EsignTermsFirstStep;
