/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { SHUFTI_CONST, SHUFTI_API_URL } from '../../../shared/core/constants';
import { saveShuftiproTemp } from '../../../shared/redux-saga/onboard/actions';

const { clientId, clientSecret } = SHUFTI_CONST[process.env.NODE_ENV];

export const Shuftipro = () => {
  const token = btoa(`${clientId}:${clientSecret}`);
  const [, setReferenceId] = useState();
  const [shuftiError, setShuftiError] = useState('');
  const [url, setUrl] = useState();
  const [loading, setLoading] = useState(true);
  const authUser = useSelector(state => state.authReducer.userInfo);
  const dispatch = useDispatch();

  const validatesignature = (data, signature, SK) => {
    let dataTemp = JSON.stringify(data);
    dataTemp = dataTemp.replace(/\//g, '\\/');
    dataTemp = `${dataTemp}${SK}`;

    sha256(dataTemp);
    const hash = sha256.create();
    hash.update(dataTemp);
    return hash.hex() === signature;
  };

  useEffect(() => {
    if (!authUser || !authUser.id || !authUser.fullInfo) return;

    const referenceIdTemp = `SP_REQUEST_${authUser.id}_${Math.random()}`;

    setReferenceId(referenceIdTemp);

    const payload = {
      reference: referenceIdTemp,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/shuftipro-status`,
      email: authUser.fullInfo.email,
      country: '',
      verification_mode: 'image_only',
      allow_offline: 1,
      allow_online: 0,
      show_privacy_policy: 1,
      show_results: 0,
      show_feedback_form: 0,
      show_consent: 1,
      decline_on_single_step: 0,
      allow_retry: 1,
    };

    payload.document = {
      name: {
        first_name: authUser.fullInfo.first_name || '',
        last_name: authUser.fullInfo.last_name || '',
        fuzzy_match: 1,
      },
      dob: authUser.fullInfo.dob || '',
      fetch_enhanced_data: '1',
      supported_types: ['id_card', 'passport', 'driving_license'],
    };

    let address = '';
    if (authUser.fullInfo.address) {
      address = authUser.fullInfo.address;
    }
    if (authUser.fullInfo.city) {
      if (address) {
        address += `, ${authUser.fullInfo.city}`;
      } else {
        address = authUser.fullInfo.city;
      }
    }

    payload.address = {
      name: {
        first_name: authUser.fullInfo.first_name || '',
        last_name: authUser.fullInfo.last_name || '',
        fuzzy_match: 1,
      },
      // full_address: address,
      full_address: '',
      address_fuzzy_match: '1',
      supported_types: ['utility_bill', 'bank_statement'],
      verification_instructions: {
        allow_paper_based: '1',
        allow_photocopy: '1',
        allow_laminated: '1',
      },
    };

    payload.background_checks = {
      name: {
        first_name: authUser.fullInfo.first_name || '',
        last_name: authUser.fullInfo.last_name || '',
      },
      dob: authUser.fullInfo.dob || '',
    };

    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      data: JSON.stringify(payload),
      url: SHUFTI_API_URL,
    })
      .then(response => {
        setLoading(false);
        const responsesignature = response.headers.signature;
        const { data } = response;

        if (validatesignature(data, responsesignature, clientSecret)) {
          // Valid
          setUrl(data.verification_url);
          dispatch(
            saveShuftiproTemp({
              reference_id: referenceIdTemp,
              user_id: authUser.id,
            })
          );
        } else {
          // Invalid
          throw new Error();
        }
      })
      .catch(() => {
        // Invalid
        setShuftiError("We can't start Shufti Pro. Please try again later!");
      });
  }, [authUser]);

  if (loading) {
    return (
      <div className="shuftipro-loading text-center">
        <p>Shuftipro Loading...</p>
      </div>
    );
  }

  return (
    <div id="shuftipro-wrap" className="w-full h-full">
      {url && (
        <>
          <div className="shuftipro-iframe-wrap h-full">
            <iframe
              className="w-full"
              style={{ height: '600px' }}
              src={url}
              id="shuftipro-iframe"
              frameBorder="0"
            />
          </div>
        </>
      )}
      {shuftiError && <p>{shuftiError}</p>}
    </div>
  );
};
