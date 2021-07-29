import React, { useState } from 'react';
import { LoadingScreen } from '../../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card, BackButton } from '../../../../components/partials';
import { NotificationPreview } from '../../../../components/admin/notifications/components/notification-preview';
import { NotificationForm } from '../../../../components/admin/notifications/components/notification-form';

const AddNotification = () => {
  const [value, setValue] = useState();

  const getValue = React.useCallback(val => {
    setValue(val);
  }, []);

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:mr-24 lg:h-70px">
            <BackButton
              href="/admin/settings/notifications"
              text="Back"
              force
            />
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
              Create New Notification
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body pt-5 pb-28 overflow-y-auto lg:h-100%-70px -ml-5 pl-5">
            <div className="lg:pr-24">
              <NotificationForm onChangeValue={getValue} />
              {value?.type && (
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

export default LoadingScreen(AddNotification, 'final-all');
