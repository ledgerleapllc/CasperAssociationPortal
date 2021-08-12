import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

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

      if (!userInfo.kyc_verified_at) {
        _condition.kyc_not_verify = true;
      }

      if (conditions.status_is_poor?.includes(page)) {
        _condition.node_poor_lock = true;
      }

      if (conditions.block_height?.node_status !== 'Ok') {
        _condition.node_poor = true;
      }
      setAlertCondition(pre => ({ ...pre, ..._condition }));
    }
  }, [userInfo, conditions]);

  useEffect(() => {
    if (getRestrictedPageAlert(alertCondition)) {
      setDialog({
        type: 'Dialog',
        data: {
          title: 'This page is restricted',
          content: getRestrictedPageAlert(alertCondition),
        },
        settings: {
          hideButton: true,
          noClose: true,
          titleClass: 'text-primary',
        },
      });
    }
    return () => {
      onClosed();
    };
  }, [alertCondition]);

  const getRestrictedPageAlert = condition => {
    if (condition) {
      if (condition.kyc_not_verify_lock && condition.node_poor_lock) {
        if (!condition.kyc_not_verify && !condition.node_poor) {
          return null;
        }

        return (
          <>
            <p className="mb-5">
              Sorry, but to access this page you must be a KYC Verified member
              and have all nodes in good standing. Please solve any problems
              below to view and interact with this part of the platform.
            </p>

            <div className="flex items-center justify-center w-full">
              {condition.kyc_not_verify ? (
                <>
                  <IconX className="text-primary" />
                  <span className="text-primary pl-1">KYC Verified</span>
                </>
              ) : (
                <>
                  <IconCheck /> <span className="pl-1">KYC Verified</span>
                </>
              )}
            </div>
            <div className="flex items-center justify-center w-full mt-3">
              {condition.node_poor ? (
                <>
                  <IconX className="text-primary" />
                  <span className="text-primary pl-1">
                    Node in good standing
                  </span>
                </>
              ) : (
                <>
                  <IconCheck />
                  <span className="pl-1">Node in good standing</span>
                </>
              )}
            </div>

            {condition.kyc_not_verify && condition.node_poor && (
              <>
                <div className="mt-5 mb-16">
                  Looks like a couple actions are needed to unlock your portal.
                  Let's get them done! <br />
                  <br /> First, you need to go through the KYC process to unlock
                  all of the features in your portal. Click the button below to
                  start. <br />
                  <br /> After that, your node needs some help. Please see your
                  "Membership" tab for more information on getting your node in
                  tip-tip shape.
                </div>
                <Link href="/dashboard/verification">
                  <button
                    type="button"
                    className="lg:mr-5 h-16 lg:h-11 text-lg px-7 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  >
                    Go to KYC page
                  </button>
                </Link>
              </>
            )}
            {condition.kyc_not_verify && !condition.node_poor && (
              <>
                <p className="mt-5 mb-16">
                  Easy fix! It looks like you just need to go through the KYC
                  process to unlock all of the features in your portal. Click
                  the button below to start.
                </p>
                <Link href="/dashboard/verification">
                  <button
                    type="button"
                    className="lg:mr-5 h-16 lg:h-11 text-lg px-7 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  >
                    Go to KYC page
                  </button>
                </Link>
              </>
            )}
            {!condition.kyc_not_verify && condition.node_poor && (
              <>
                <p className="mt-5 mb-16">
                  Uh oh! Your node needs some help. Please see your "Membership"
                  tab for more information on getting your node in tip-tip
                  shape.
                </p>
                <Link href="/dashboard/membership">
                  <button
                    type="button"
                    className="lg:mr-5 h-16 lg:h-11 text-lg px-7 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  >
                    Go to Membership page
                  </button>
                </Link>
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
            <p className="mb-5">
              Sorry, but to access this page you must be a KYC Verified member.
              Please solve any problems below to view and interact with this
              part of the platform.
            </p>
            <div className="flex text-primary items-center justify-center w-full">
              <IconX /> <span className="pl-1">KYC Verified</span>
            </div>
            <p className="mt-5 mb-16">
              Easy fix! It looks like you just need to go through the KYC
              process to unlock all of the features in your portal. Click the
              button below to start.
            </p>
            <Link href="/dashboard/verification">
              <button
                type="button"
                className="lg:mr-5 h-16 lg:h-11 text-lg px-7 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
              >
                Go to KYC page
              </button>
            </Link>
          </>
        );
      }

      if (condition.node_poor_lock) {
        if (!condition.node_poor) {
          return null;
        }

        return (
          <>
            <p className="mb-5">
              Sorry, but to access this page you have all nodes in good
              standing. Please solve any problems below to view and interact
              with this part of the platform.
            </p>
            <div className="flex items-center text-primary justify-center w-full">
              <IconX /> <span className="pl-1">Node in good standing</span>
            </div>
            <p className="mt-5 mb-16">
              Uh oh! Your node needs some help. Please see your "Membership" tab
              for more information on getting your node in tip-tip shape.
            </p>
            <Link href="/dashboard/membership">
              <button
                type="button"
                className="lg:mr-5 h-16 lg:h-11 text-lg px-7 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
              >
                Go to Membership page
              </button>
            </Link>
          </>
        );
      }
    }
    return null;
  };

  return <Wrapper {...props} />;
};
