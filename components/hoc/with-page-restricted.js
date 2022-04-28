import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLockPageConditions } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { useDialog } from '../partials/dialog';
import IconCheck from '../../public/images/ic-feather-check.svg';
import IconX from '../../public/images/ic_x.svg';

export const withPageRestricted = (Wrapper, page) => props => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.authReducer.userInfo);

  const [conditions, setConditions] = useState(null);
  const [alertCondition, setAlertCondition] = useState({});

  const { setDialog, onClosed } = useDialog();

  const getRestrictedPageAlert = condition => {
    if (condition) {
      if (condition.kyc_not_verify_lock && condition.node_poor_lock) {
        if (!condition.kyc_not_verify && !condition.node_poor) {
          return null;
        }

        return (
          <>
            <p className="mb-9">
              Sorry, but to access this page you must be a KYC Verified member
              and have all nodes in good standing. Please solve any problems
              below to view and interact with this part of the platform.
            </p>
            <div className="flex justify-center w-full">
              <div>
                <div className="flex items-center">
                  {condition.kyc_not_verify ? (
                    <>
                      <IconX className="text-primary" />
                      <span className="text-primary pl-3">KYC Verified</span>
                    </>
                  ) : (
                    <>
                      <IconCheck /> <span className="pl-3">KYC Verified</span>
                    </>
                  )}
                </div>
                <div className="flex items-center mt-3">
                  {condition.node_poor ? (
                    <>
                      <IconX className="text-primary" />
                      <span className="text-primary pl-3">
                        Node in good standing
                      </span>
                    </>
                  ) : (
                    <>
                      <IconCheck />
                      <span className="pl-3">Node in good standing</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {condition.kyc_not_verify && condition.node_poor && (
              <>
                <div className="my-9">
                  Looks like a couple actions are needed to unlock your portal.
                  Let's get them done! <br />
                  <br /> First, you need to go through the KYC process to unlock
                  all of the features in your portal. Click the button below to
                  start. <br />
                  <br /> After that, your node needs some help. Please see your
                  "Membership" tab for more information on getting your node in
                  tip-tip shape.
                </div>
                <a
                  href="/dashboard/verification"
                  className="lg:mr-5 py-2 text-lg w-8/12 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  style={{ textAlign: 'center' }}
                >
                  Get Verified
                </a>
              </>
            )}
            {condition.kyc_not_verify && !condition.node_poor && (
              <>
                <p className="my-9">
                  Easy fix! It looks like you just need to go through the KYC
                  process to unlock all of the features in your portal. Click
                  the button below to start.
                </p>
                <a
                  href="/dashboard/verification"
                  className="lg:mr-5 py-2 text-lg w-8/12 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  style={{ textAlign: 'center' }}
                >
                  Get Verified
                </a>
              </>
            )}
            {!condition.kyc_not_verify && condition.node_poor && (
              <>
                <p className="my-9">
                  Uh oh! Your node needs some help. Please see your "Membership"
                  tab for more information on getting your node in tip-tip
                  shape.
                </p>
                <a
                  href="/dashboard/membership"
                  className="text-center lg:mr-5 py-2 text-lg w-8/12 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  Go to Membership page
                </a>
              </>
            )}
          </>
        );
      }

      if (condition.kyc_not_verify_lock) {
        if (!condition.kyc_not_verify) {
          return null;
        }

        return (
          <>
            <p className="mb-9">
              Sorry, but to access this page you must be a KYC Verified member.
              Please solve any problems below to view and interact with this
              part of the platform.
            </p>
            <div className="flex text-primary items-center justify-center w-full">
              <IconX /> <span className="pl-3">KYC Verified</span>
            </div>
            <p className="my-9">
              Easy fix! It looks like you just need to go through the KYC
              process to unlock all of the features in your portal. Click the
              button below to start.
            </p>
            <a
              href="/dashboard/verification"
              className="lg:mr-5 py-2 text-lg w-8/12 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
              style={{ textAlign: 'center' }}
            >
              Get Verified
            </a>
          </>
        );
      }

      if (condition.node_poor_lock) {
        if (!condition.node_poor) {
          return null;
        }

        return (
          <>
            <p className="mb-9">
              Sorry, but to access this page you have all nodes in good
              standing. Please solve any problems below to view and interact
              with this part of the platform.
            </p>
            <div className="flex items-center text-primary justify-center w-full">
              <IconX /> <span className="pl-3">Node in good standing</span>
            </div>
            <p className="my-9">
              Uh oh! Your node needs some help. Please see your "Membership" tab
              for more information on getting your node in tip-tip shape.
            </p>
            <a
              href="/dashboard/membership"
              className="text-center lg:mr-5 py-2 text-lg w-8/12 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
            >
              Go to Membership page
            </a>
          </>
        );
      }
    }
    return null;
  };

  useEffect(() => {
    if (!['admin', 'sub-admin'].includes(userInfo.role)) {
      dispatch(
        getLockPageConditions(
          res => {
            setConditions(res);
          },
          () => {}
        )
      );
    }
  }, [userInfo]);

  useEffect(() => {
    if (conditions) {
      const _condition = {};
      if (conditions.kyc_not_verify.includes(page)) {
        _condition.kyc_not_verify_lock = true;
      }

      if (userInfo && userInfo.status === 'approved') {
        _condition.kyc_not_verify = false;
      } else {
        _condition.kyc_not_verify = true;
      }

      if (conditions.status_is_poor?.includes(page)) {
        _condition.node_poor_lock = true;
      }

      if (
        userInfo &&
        userInfo.status === 'approved' &&
        userInfo.fullInfo &&
        userInfo.fullInfo.profile &&
        userInfo.fullInfo.profile.extra_status !== 'Suspended'
      ) {
        _condition.node_poor = false;
      } else {
        _condition.node_poor = true;
      }

      setAlertCondition(pre => ({ ...pre, ..._condition }));
    }
  }, [userInfo, conditions]);

  useEffect(() => {
    if (getRestrictedPageAlert(alertCondition)) {
      setDialog({
        type: 'DialogCustom',
        data: {
          content: (
            <div className="p-16" style={{ backgroundColor: 'white' }}>
              <p className="text-2xl text-center text-primary mb-5">
                This Page is Restricted
              </p>
              <div className="h-full w-full flex flex-col items-center justify-between border-gray">
                {getRestrictedPageAlert(alertCondition)}
              </div>
            </div>
          ),
        },
        settings: {
          noClose: true,
          zIndex: 100,
        },
      });
    }
    return () => {
      onClosed();
    };
  }, [alertCondition]);

  return <Wrapper {...props} />;
};
