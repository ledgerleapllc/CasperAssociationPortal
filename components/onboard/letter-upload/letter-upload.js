/* eslint-disable no-use-before-define */
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import IconX from '../../../public/images/ic_x.svg';
import { LoadingButton } from '../../partials';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#9A9A9A',
  borderStyle: 'dashed',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const acceptStyle = {
  borderColor: '#2DDB33',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const LetterUpload = ({ status, selectedDocument, onDocumentSelect }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const uploadFileRef = useRef(null);

  useEffect(() => {
    // Close upload dialog when click outside
    document.addEventListener('click', doClickOutside, true);
    return () => {
      document.removeEventListener('click', doClickOutside, true);
    };
  }, []);

  const handleUpload = action => {
    if (action === 'open') {
      const content = document.getElementById('custom-content');
      content.classList.add('remove-animation');
      setShowUploadModal(true);
    } else if (action === 'close') {
      setShowUploadModal(false);
    }
  };

  const onDrop = useCallback(acceptedFiles => {
    const fileConvert = acceptedFiles[0];

    if (!fileConvert) {
      return;
    }

    const fileName = fileConvert.name;
    const optionNewFile = {
      lastModified: fileConvert.lastModified,
      lastModifiedDate: fileConvert.lastModifiedDate,
      type: fileConvert.type,
    };
    const newFile = new File([fileConvert], fileName, optionNewFile);
    handleUpload('close');
    onDocumentSelect({ name: fileName, file: newFile });
  }, []);

  const {
    getRootProps,
    getInputProps,
    // fileRejections,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    multiple: false,
    onDrop,
    accept:
      'image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain, text/rtf',
    maxSize: 2097152,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragReject, isDragAccept]
  );

  const doClickOutside = e => {
    const { target } = e;
    if (!uploadFileRef?.current?.contains(target)) {
      handleUpload('close');
    }
  };

  return (
    <>
      <div className="pt-8">
        {status === 'rejected' ? (
          <>
            <p className="text-2.5xl">Thank you for your uploading.</p>
            <p className="text-sm mt-2 lg:mb-14 mb-14 text-dark1">
              Unfortunately at this time we are unable to accept you letter of
              motivation. You can resubmit your letter and try again.
            </p>
          </>
        ) : (
          <>
            <p className="text-2.5xl">
              First, please upload a letter explaining why you would like to
              join.
            </p>
            <p className="text-sm mt-2 lg:mb-14 mb-14 text-dark1">
              Each member in the portal must upload a “letter of motivation”
              summarizing why they are requesting to become a member. This
              letter should explain, in a short paragraph or two, why you would
              like to become a member of the Casper Association and include the
              signature of the node operator or person in a management role
              within your organization.
            </p>
          </>
        )}
        <div className="lg:flex-column lg:space-x-5 lg:justify-start animate__animated animate__fadeInUp animate__delay-2s">
          <LoadingButton
            type="submit"
            title="Upload letter"
            className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-lg"
            onClick={() => handleUpload('open')}
          />
          {selectedDocument && (
            <div className="flex mt-5 items-center">
              <button
                className="pr-3 w-7"
                onClick={() => onDocumentSelect(null)}
                type="button"
              >
                <IconX className="text-primary" />
              </button>
              <span className="text-sm text-primary">
                {selectedDocument.name}
              </span>
            </div>
          )}
        </div>
      </div>
      {showUploadModal && (
        <>
          <div className="backdrop-filter backdrop-blur-sm justify-center items-center flex fixed inset-0 z-50">
            <div
              className="w-full max-w-2xl shadow-2xl mx-4 relative bg-white"
              ref={uploadFileRef}
            >
              <div {...getRootProps({ style })}>
                <div className="py-36 flex flex-col items-center justify-between">
                  <div className="flex flex-col items-center justify-between">
                    <input {...getInputProps()} />
                    <img
                      src="/images/ic_upload.svg"
                      alt="upload"
                      className="align-middle mb-6"
                    />
                    <button
                      type="button"
                      className="mb-2.5 text-lg text-white w-full px-14 py-5 shadow-lg rounded-full bg-primary hover:opacity-40 focus:outline-none"
                    >
                      Upload Letter of Motivation
                    </button>
                    <span className="hidden lg:block">Or Drop File Here</span>
                    {/* (isDragReject || !!fileRejections.length) && (
                      <span className="hidden lg:block text-primary">
                        Accept jpeg, png, pdf, txt - Max File Size: 2MB
                      </span>
                    ) */}
                    <span className="hidden lg:block text-primary">
                      Accept jpeg, png, pdf, txt - Max File Size: 2MB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      )}
    </>
  );
};

export default LetterUpload;
