import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SHUFTI_API_URL, SHUFTI_CONST } from '../../../shared/core/constants';
import { AppContext } from '../../../pages/_app';
import { deleteShuftiproTemp } from '../../../shared/redux-saga/onboard/actions';

const { clientId, clientSecret } = SHUFTI_CONST[process.env.NODE_ENV];

export const VerificationPending = ({ goNext, goBack }) => {
  const { setLoading } = useContext(AppContext);
  const user = useSelector(state => state.authReducer.userInfo);
  const dispatch = useDispatch();

  const doAction = referenceId => {
    dispatch(
      deleteShuftiproTemp(
        {
          reference_id: referenceId,
          user_id: user.id,
        },
        () => {
          window.location.reload();
        },
        () => {
          window.location.reload();
        }
      )
    );
  };

  const cancelRequest = e => {
    e.preventDefault();
    if (user?.fullInfo?.shuftipro && user?.fullInfo?.shuftipro.id) {
      return;
    }

    setLoading(true);
    const token = btoa(`${clientId}:${clientSecret}`);
    const referenceId = user?.fullInfo?.shuftipro_temp.reference_id;

    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      data: JSON.stringify({
        reference: referenceId,
        comment: 'Delete Request',
      }),
      url: `${SHUFTI_API_URL}/delete`,
    })
      .then(() => {
        doAction(referenceId);
      })
      .catch(() => {
        doAction(referenceId);
      });
  };

  const checkShuftiPro = () => {
    const token = btoa(`${clientId}:${clientSecret}`);
    const referenceId = user?.fullInfo?.shuftipro_temp.reference_id;
    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      data: JSON.stringify({
        reference: referenceId,
      }),
      url: `${SHUFTI_API_URL}/status`,
    })
      .then(response => {
        if (response && response.data) {
          const { data } = response;
          if (data.event) {
            switch (data.event) {
              case 'request.pending':
                break;
              case 'request.invalid':
              case 'request.timeout':
              case 'request.unauthorised':
              case 'verification.cancelled':
                goBack();
                break;
              default:
                goNext();
                break;
            }
          } else {
            goBack();
          }
        } else {
          goBack();
        }
      })
      .catch(() => {
        goBack();
      });
  };

  useEffect(() => {
    if (
      user?.fullInfo?.shuftipro_temp &&
      user?.fullInfo?.shuftipro_temp.reference_id
    ) {
      checkShuftiPro();
    } else {
      goBack();
    }
  }, []);
  return (
    <div className="animate__animated animate__delay-3s">
      <div>
        <p className="text-dark1">
          We are validating your verification request. Just wait for 1-2
          minutes.
        </p>
        <button
          type="button"
          className="px-5 py-2 mt-3 text-sm text-white rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          onClick={cancelRequest}
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};
