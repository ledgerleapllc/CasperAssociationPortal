import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import Switch from 'react-switch';
import { AppContext } from '../../../pages/_app';
import { updateLockPageRules } from '../../../shared/redux-saga/admin/actions';

const SettingLockPage = ({ rules, fetchRules }) => {
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);

  const doUpdateRules = (id, isLocked) => {
    setLoading(true);
    dispatch(
      updateLockPageRules(
        { id, data: { is_lock: isLocked } },
        () => {
          setLoading(false);
          fetchRules();
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <div className="w-full lg:w-7/12">
      <div className="w-full hidden lg:flex">
        <div className="w-full lg:w-5/12" />
        <div className="w-full lg:w-6/12 flex">
          <p className="w-3/12">Nodes</p>
          <p className="w-3/12">Discussions</p>
          <p className="w-3/12">Votes</p>
          <p className="w-3/12">Perks</p>
        </div>
      </div>
      <div className="w-full lg:flex mt-5">
        <div className="w-full lg:w-5/12">
          Lock pages if user is not KYC verified
        </div>
        <div className="w-full flex lg:hidden my-2">
          <p className="w-2/12">Nodes</p>
          <p className="w-2/12">Discussions</p>
          <p className="w-2/12">Votes</p>
          <p className="w-2/12">Perks</p>
        </div>
        <div className="w-full lg:w-6/12 flex">
          <div className="w-2/12 lg:w-3/12">
            <Switch
              id="status"
              checked={!!rules?.kyc_not_verify?.nodes?.is_lock}
              onChange={() =>
                doUpdateRules(
                  rules?.kyc_not_verify?.nodes?.id,
                  !rules?.kyc_not_verify?.nodes?.is_lock
                )
              }
              checkedIcon={null}
              uncheckedIcon={null}
              offColor="#bbb"
              onColor="#ff474e"
              height={18}
              width={40}
            />
          </div>
          <div className="w-2/12 lg:w-3/12">
            <Switch
              id="status"
              checked={!!rules?.kyc_not_verify?.discussions?.is_lock}
              onChange={() =>
                doUpdateRules(
                  rules?.kyc_not_verify?.discussions?.id,
                  !rules?.kyc_not_verify?.discussions?.is_lock
                )
              }
              checkedIcon={null}
              uncheckedIcon={null}
              offColor="#bbb"
              onColor="#ff474e"
              height={18}
              width={40}
            />
          </div>
          <div className="w-2/12 lg:w-3/12">
            <Switch
              id="status"
              checked={!!rules?.kyc_not_verify?.votes?.is_lock}
              onChange={() =>
                doUpdateRules(
                  rules?.kyc_not_verify?.votes?.id,
                  !rules?.kyc_not_verify?.votes?.is_lock
                )
              }
              checkedIcon={null}
              uncheckedIcon={null}
              offColor="#bbb"
              onColor="#ff474e"
              height={18}
              width={40}
            />
          </div>
          <div className="w-2/12 lg:w-3/12">
            <Switch
              id="status"
              checked={!!rules?.kyc_not_verify?.perks?.is_lock}
              onChange={() =>
                doUpdateRules(
                  rules?.kyc_not_verify?.perks?.id,
                  !rules?.kyc_not_verify?.perks?.is_lock
                )
              }
              checkedIcon={null}
              uncheckedIcon={null}
              offColor="#bbb"
              onColor="#ff474e"
              height={18}
              width={40}
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:flex mt-5">
        <div className="w-full lg:w-5/12">
          Lock pages if user node status is poor
        </div>
        <div className="w-full flex lg:hidden my-2">
          <p className="w-2/12">Nodes</p>
          <p className="w-2/12">Discussions</p>
          <p className="w-2/12">Votes</p>
          <p className="w-2/12">Perks</p>
        </div>
        <div className="w-full lg:w-6/12 flex">
          <div className="w-2/12 lg:w-3/12">
            <Switch
              id="status"
              checked={!!rules?.status_is_poor?.nodes?.is_lock}
              onChange={() =>
                doUpdateRules(
                  rules?.status_is_poor?.nodes?.id,
                  !rules?.status_is_poor?.nodes?.is_lock
                )
              }
              checkedIcon={null}
              uncheckedIcon={null}
              offColor="#bbb"
              onColor="#ff474e"
              height={18}
              width={40}
            />
          </div>
          <div className="w-2/12 lg:w-3/12">
            <Switch
              id="status"
              checked={!!rules?.status_is_poor?.discussions?.is_lock}
              onChange={() =>
                doUpdateRules(
                  rules?.status_is_poor?.discussions?.id,
                  !rules?.status_is_poor?.discussions?.is_lock
                )
              }
              checkedIcon={null}
              uncheckedIcon={null}
              offColor="#bbb"
              onColor="#ff474e"
              height={18}
              width={40}
            />
          </div>
          <div className="w-2/12 lg:w-3/12">
            <Switch
              id="status"
              checked={!!rules?.status_is_poor?.votes?.is_lock}
              onChange={() =>
                doUpdateRules(
                  rules?.status_is_poor?.votes?.id,
                  !rules?.status_is_poor?.votes?.is_lock
                )
              }
              checkedIcon={null}
              uncheckedIcon={null}
              offColor="#bbb"
              onColor="#ff474e"
              height={18}
              width={40}
            />
          </div>
          <div className="w-2/12 lg:w-3/12">
            <Switch
              id="status"
              checked={!!rules?.status_is_poor?.perks?.is_lock}
              onChange={() =>
                doUpdateRules(
                  rules?.status_is_poor?.perks?.id,
                  !rules?.status_is_poor?.perks?.is_lock
                )
              }
              checkedIcon={null}
              uncheckedIcon={null}
              offColor="#bbb"
              onColor="#ff474e"
              height={18}
              width={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingLockPage;
