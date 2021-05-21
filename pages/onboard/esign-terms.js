import { useRouter } from 'next/router';
import useMobileDetect from 'use-mobile-detect-hook';
import AppFooter from '../../components/Layouts/app-footer';
import AppHeader from '../../components/Layouts/app-header';

const EsignTerms = () => {
  const router = useRouter();
  const detectMobile = useMobileDetect();

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <div className="flex-grow flex items-center justify-center mt-16 md:mt-0">
          {detectMobile.isMobile() ? (
            <div className="w-full flex justify-between">
              <button type="button" className="flex items-center">
                <img
                  src="/images/ic_prev_circle.svg"
                  alt="prev"
                  width="18"
                  height="18"
                  className="mr-2"
                />
                Back
              </button>
              <button type="button" className="flex items-center">
                Next
                <img
                  src="/images/ic_next_circle.svg"
                  alt="next"
                  width="18"
                  height="18"
                  className="ml-2"
                />
              </button>
            </div>
          ) : (
            <div className="w-full md:w-9/12">
              <p className="border-b border-gray pb-1 font-bold text-dark2">
                Esign Terms
              </p>
              <div className="w-1/2 border-b border-primary border-2" />
              <div className="mt-2 flex">
                <img
                  src="/images/img_signature_blur.png"
                  alt="signature"
                  className="bg-white"
                />
              </div>
            </div>
          )}
        </div>
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default EsignTerms;
