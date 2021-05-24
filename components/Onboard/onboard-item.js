import { useState } from 'react';

const OnboardItem = ({
  className,
  imageUrl,
  blurImageUrl,
  title,
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
          className={`absolute left-0 right-0 top-0 bottom-0 ${
            onHover ? 'opacity-100' : 'opacity-0'
          } bg-white`}
          style={{ backgroundImage: `url(${blurImageUrl})` }}
        >
          <div className="absolute bottom-0 mx-5 my-10">
            <p className="text-2xl">{title}</p>
            <p className="text-sm text-dark1 mt-2">{description}</p>
          </div>
        </div>
      </div>
      {onHover && (
        <button
          type="button"
          className="absolute ml-4 -mt-6 focus:outline-none"
        >
          <img src="/images/ic_next_circle_gradient_large.svg" alt="next" />
        </button>
      )}
      <div className={`md:mx-4 md:my-6 ${onHover ? 'invisible' : 'visible'}`}>
        <p className="text-2xl">{title}</p>
        <p className="text-sm text-dark1 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default OnboardItem;
