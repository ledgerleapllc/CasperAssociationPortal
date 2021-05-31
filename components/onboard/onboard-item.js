import { useState } from 'react';

const OnboardItem = ({
  className,
  imageUrl,
  blurImageUrl,
  title,
  doneStep,
  description,
  onClick,
}) => {
  const [onHover, setOnHover] = useState(false);

  return (
    <div
      className={className}
      role="button"
      tabIndex="0"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <div className="relative">
        <img src={imageUrl} alt="esign terms" className="object-cover" />
        <div
          className={`transition duration-300 ease-in-out absolute left-0 right-0 top-0 bottom-0 ${
            onHover ? 'opacity-100' : 'opacity-0'
          } bg-white`}
          style={{ backgroundImage: `url(${blurImageUrl})` }}
        >
          <div className={`transition duration-300 ease-in-out transform absolute bottom-0 mx-5 my-10 ${onHover ? 'translate-y-0' : 'translate-y-full'}`}>
            <p className="text-2xl">
              {title}
              {doneStep && (
                <img
                  src="/images/ic_check_circle_small.svg"
                  alt="upload success"
                  className="inline ml-2"
                />
              )}
            </p>
            <p className="text-sm text-dark1 mt-2">{description}</p>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`transition transform duration-600 ease-in-out absolute ml-4 -mt-6 focus:outline-none ${
          onHover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <img src="/images/ic_next_circle_gradient_large.svg" alt="next" />
      </button>
      <div className={`md:mx-4 md:my-6 transition transform duration-300 ease-in-out ${onHover ? 'opacity-0 -translate-y-20' : 'opacity-100'}`}>
        <p className="text-2xl">
          {title}
          {doneStep && (
            <img
              src="/images/ic_check_circle_small.svg"
              alt="upload success"
              className="inline ml-2"
            />
          )}
        </p>
        <p className="text-sm text-dark1 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default OnboardItem;
