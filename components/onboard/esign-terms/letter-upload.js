/* eslint-disable no-use-before-define */
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Button } from '../../partials/button';

const LetterUpload = ({ selectedDocument, onDocumentSelect }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);

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

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });

  return (
    <>
      <div className="pt-8">
        <p className="text-2.5xl">
          First, please upload a letter explaining why you would like to join.
        </p>
        <p className="text-sm mt-2 md:mb-14 mb-14 text-dark1">
          Each member in the portal must upload a “letter of motivation”
          summarizing why they are requesting to become a member. This letter
          should explain, in a short paragraph or two, why you would like to
          become a member of the Casper Association and include the signature of
          the node operator or person in a management role within your
          organization.
        </p>
        <div className="md:flex-column md:space-x-5 md:justify-start animate__animated animate__fadeInUp animate__delay-2s">
          <Button
            type="submit"
            title="Upload letter"
            className="text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
            onClick={() => handleUpload('open')}
          />
          {selectedDocument && (
            <div className="flex mt-5 items-center">
              <button
                className="pr-3 w-7"
                onClick={() => onDocumentSelect(null)}
                type="button"
              >
                <img className="w-full" src="/images/ic_x.svg" alt="icon x" />
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
            <div className="w-full max-w-2xl shadow-2xl mx-4 relative bg-white">
              <div {...getRootProps()}>
                <div className="py-36 flex flex-col items-center justify-between border-2 border-dashed border-gray">
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
                    <span className="hidden md:block">Or Drap File Here</span>
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
