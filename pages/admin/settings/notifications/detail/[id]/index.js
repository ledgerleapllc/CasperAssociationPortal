import React, { useState, useEffect, useContext } from 'react';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import { LoadingScreen } from '../../../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../../../components/layouts/layout-dashboard';
import { Card, BackButton } from '../../../../../../components/partials';
import { AppContext } from '../../../../../_app';
import { NotificationForm } from '../../../../../../components/admin/notifications/components/notification-form';
import { NotificationPreview } from '../../../../../../components/admin/notifications/components/notification-preview';
import { getNotificationDetail } from '../../../../../../shared/redux-saga/admin/actions';

const EditNotification = () => {
  const [value, setValue] = useState();
  const [editing, setEditing] = useState();
  const [currentNotification, setCurrentNotification] = useState();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);

  const getValue = React.useCallback(val => {
    setValue(val);
  }, []);

  const handleEditing = React.useCallback(val => {
    setEditing(val);
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getNotificationDetail(
        { id },
        res => {
          setLoading(false);
          setCurrentNotification(res);
        },
        () => {
          setLoading(false);
        }
      )
    );
  }, [id]);

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-card lg:h-70px">
            <BackButton
              href="/admin/settings/notifications"
              text="Back"
              force
            />
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
              {editing
                ? `Editing Alert ${currentNotification?.id}`
                : `View Alert ${currentNotification?.id}`}
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pt-5 pb-28 overflow-y-auto lg:h-100%-70px -ml-5 pl-5">
            <div className="lg:pr-card">
              <NotificationForm
                onChangeValue={getValue}
                value={currentNotification}
                editMode
                onEditing={handleEditing}
              />
              {editing && (
                <div className="pt-10">
                  <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                    Notification Preview
                  </h3>
                  <div className="border-primary border-b-2" />
                  <div className="mt-4 w-full lg:w-9/12">
                    <NotificationPreview notification={value} preview />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(EditNotification, 'final-all');
