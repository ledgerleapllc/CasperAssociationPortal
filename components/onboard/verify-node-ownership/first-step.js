import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconCheckCircle from '../../../public/images/ic_check_circle.svg';
import { LoadingButton } from '../../partials';
import { submitPublicAddress } from '../../../shared/redux-saga/onboard/actions';

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const VerifyNodeOwnershipFirstStep = ({
  isVerified,
  setPublicAddressVerified,
}) => {
  const dispatch = useDispatch();
  const { formState, register, handleSubmit, watch } = useForm();
  const [isVerifying, setIsVerifying] = useState(false);
  const regex_ed22519 = /^01[0-9a-fA-F]{64}$/;
  const regex_secp256k1 = /^02[0-9a-fA-F]{66}$/;

  const check_validator_public_key_regex = pub_key => {
    if (regex_ed22519.test(pub_key)) {
      return 'valid_ed25519';
    }
    if (regex_secp256k1.test(pub_key)) {
      return 'valid_secp256k1';
    }
    return false;
  };

  const watchAddress = watch('publicAddress');

  useEffect(() => {
    if (check_validator_public_key_regex(watchAddress) === false)
      setPublicAddressVerified(false);
  }, [watchAddress]);

  const onSubmit = data => {
    const pubAddress = data.publicAddress;
    setIsVerifying(true);
    dispatch(
      submitPublicAddress(
        {
          pubAddress,
        },
        () => {
          setPublicAddressVerified(true);
        },
        () => {
          setIsVerifying(false);
        }
      )
    );
  };

  return (
    <form className="pt-8" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-2.5xl whitespace-pre-line animate__animated animate__fadeInLeft animate__delay-2s">
        Please enter the public address
        <HtmlTooltip
          title={
            <div>
              <Typography color="inherit">
                The public address is your Public Key
              </Typography>
            </div>
          }
        >
          <InfoIcon
            style={{ cursor: 'pointer' }}
            color="secondary"
            fontSize="small"
          />
        </HtmlTooltip>{' '}
        of your validator node and press submit
      </p>
      <div className="lg:relative mt-12 animate__animated animate__fadeInUp animate__delay-6s">
        <input
          type="text"
          readOnly={isVerified}
          className="w-full h-16 text-xl px-7 lg:pr-72 rounded-full shadow-md focus:outline-none"
          name="publicAddress"
          {...register('publicAddress', {
            validate: value =>
              check_validator_public_key_regex(value) !== false ||
              'This is not a valid address',
          })}
        />
        <span className="lg:absolute right-0">
          <LoadingButton
            type="submit"
            isDisabled={isVerifying || !watchAddress}
            isLoading={isVerifying}
            title="Verify"
            className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary focus:outline-none mt-2 lg:mt-0 disabled:opacity-30 disabled:cursor-not-allowed"
          />
        </span>
        {isVerified && (
          <IconCheckCircle className="absolute bottom-4 -right-20 hidden lg:block text-primary text-3xl" />
        )}
      </div>
      {formState.errors?.publicAddress && (
        <p className="pl-7 mt-2 text-primary">
          {formState.errors.publicAddress?.message}
        </p>
      )}
    </form>
  );
};

export default VerifyNodeOwnershipFirstStep;
