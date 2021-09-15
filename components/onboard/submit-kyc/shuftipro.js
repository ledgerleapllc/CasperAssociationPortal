/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { sha256 } from 'js-sha256';
import { SHUFTI_CONST, SHUFTI_API_URL } from '../../../shared/core/constants';
import { Button, Checkbox } from '../../partials';
import {
  saveShuftiproTemp,
  updateShuftiproTemp,
} from '../../../shared/redux-saga/onboard/actions';
import { useDialog } from '../../partials/dialog';

const { clientId, clientSecret } = SHUFTI_CONST[process.env.NODE_ENV];

export const Shuftipro = () => {
  const token = btoa(`${clientId}:${clientSecret}`);
  console.log(token);
  const [referenceId, setReferenceId] = useState();
  const [finalKYC, setFinalKYC] = useState(false);
  const [shuftiError, setShuftiError] = useState('');
  const [url, setUrl] = useState();
  const [loading, setLoading] = useState(true);
  const authUser = useSelector(state => state.authReducer.userInfo);
  const dispatch = useDispatch();
  const { dialog, onClosed } = useDialog();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatesignature = (data, signature, SK) => {
    let dataTemp = JSON.stringify(data);
    dataTemp = dataTemp.replace(/\//g, '\\/');
    dataTemp = `${dataTemp}${SK}`;

    sha256(dataTemp);
    const hash = sha256.create();
    hash.update(dataTemp);
    return hash.hex() == signature;
  };

  useEffect(() => {
    if (!authUser || !authUser.id || !authUser.fullInfo) return;

    const referenceIdTemp = `SP_REQUEST_${authUser.id}_${Math.random()}`;

    setReferenceId(referenceIdTemp);

    const payload = {
      reference: referenceIdTemp,
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

    payload.address = {
      name: {
        first_name: authUser.fullInfo.first_name || '',
        last_name: authUser.fullInfo.last_name || '',
        fuzzy_match: 1,
      },
      full_address: `${authUser.fullInfo.address}, ${authUser.fullInfo.city}`,
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

  const clickContinue = () => {
    if (!referenceId) {
      return;
    }

    setIsSubmitting(true);

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
        let isValid = false;
        if (response && response) {
          const { data } = response;

          const { event, proofs } = data;

          if (event && proofs && proofs.address && proofs.document)
            isValid = true;
        }

        if (isValid) {
          dispatch(
            updateShuftiproTemp(
              {
                reference_id: referenceId,
                user_id: authUser.id,
              },
              () => {
                setIsSubmitting(false);
                onClosed();
                dialog.afterClosed('verified');
              },
              () => {
                setIsSubmitting(false);
              }
            )
          );
        } else {
          setIsSubmitting(false);
          throw new Error();
        }
      })
      .catch(() => {
        setIsSubmitting(false);
        onClosed();
        dialog.afterClosed('');
      });
  };

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
              style={{ height: '500px' }}
              src={url}
              id="shuftipro-iframe"
              frameBorder="0"
            />
          </div>
          <div className="pt-10">
            <div className="text-center c-checkbox-itemSymbol">
              <Checkbox
                onChange={val => setFinalKYC(val)}
                labelText="I have reached the final step of the above KYC process"
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <Button
              primary
              disabled={!finalKYC || isSubmitting}
              isLoading={isSubmitting}
              className="w-1/2 lg:w-1/2 h-16 text-lg"
              onClick={() => clickContinue()}
            >
              Continue
            </Button>
          </div>
        </>
      )}
      {shuftiError && <p>{shuftiError}</p>}
    </div>
  );
};
