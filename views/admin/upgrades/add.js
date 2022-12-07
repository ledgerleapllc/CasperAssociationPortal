import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, BackButton, Button } from '../../../components/partials';
import { submitUpgrade } from '../../../shared/redux-saga/admin/actions';
import { formatDate } from '../../../shared/core/utils';

const upgradeSchema = yup.object().shape({
  version: yup
    .string()
    .required('Version No is required')
    .max(70, 'Maximum characters of Version No is 70'),
  activation_era: yup
    .number()
    .typeError('Activation ERA is invalid')
    .required('Activation ERA is required')
    .min(1, 'Activation ERA should be greater than 1'),
  link: yup
    .string()
    .required('Link to Software Page is required')
    .max(255, 'Maximum characters of Link to Software Page is 255'),
  notes: yup.string().required('Notes about Upgrade is required'),
});

const AdminAddUpgrade = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [activationDate, setActivationDate] = useState(null);
  const dispatch = useDispatch();
  const router = useHistory();

  const handleActivationDateChange = date => {
    setActivationDate(date);
  };

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(upgradeSchema),
  });

  const onSubmit = data => {
    if (!activationDate) {
      return;
    }
    const activation_date = formatDate(
      activationDate.toISOString(),
      'yyyy-MM-dd'
    );
    const params = {
      ...data,
      activation_date,
    };
    setIsSubmit(true);
    dispatch(
      submitUpgrade(
        params,
        () => {
          setIsSubmit(false);
          router.push('/admin/upgrades');
        },
        () => {
          setIsSubmit(false);
        }
      )
    );
  };

  return (
    <>
      <Head>
        <title>New Upgrade - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
          <div className="flex flex-col w-full h-full">
            <div className="card-header lg:mr-card border-primary border-b-2">
              <div className="h-11 mt-4 mb-3">
                <BackButton href="/admin/upgrades" text="Cancel" force />
                <h3 className="text-dark2 text-lg font-medium">
                  Add New Upgrade
                </h3>
              </div>
            </div>
            <div className="card-body pt-8 overflow-y-auto flex-1 min-h-0 -ml-5 pl-5 pr-5">
              <div className="lg:pr-card">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="pb-7 relative">
                    <div className="max-w-xl pb-8 relative">
                      <label htmlFor="version">Version No*</label>
                      <input
                        id="version"
                        type="text"
                        className="mt-1 border border-gray1 w-full px-3 py-2 shadow-md focus:outline-none"
                        {...register('version')}
                      />
                      {formState.errors?.version && (
                        <p className="absolute bottom-3 text-primary text-xs">
                          {formState.errors.version?.message}
                        </p>
                      )}
                    </div>
                    <div className="max-w-xl pb-8 relative">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          label="Activation Date"
                          value={activationDate}
                          onChange={handleActivationDateChange}
                          required
                          style={{ width: '100%' }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                    <div className="max-w-xl pb-8 relative">
                      <label htmlFor="activation_era">Activation ERA*</label>
                      <input
                        id="activation_era"
                        type="number"
                        className="mt-1 border border-gray1 w-full px-3 py-2 shadow-md focus:outline-none"
                        {...register('activation_era')}
                      />
                      {formState.errors?.activation_era && (
                        <p className="absolute bottom-3 text-primary text-xs">
                          {formState.errors.activation_era?.message}
                        </p>
                      )}
                    </div>
                    <div className="max-w-xl pb-8 relative">
                      <label htmlFor="link">Link to Software Page*</label>
                      <input
                        id="link"
                        type="text"
                        className="mt-1 border border-gray1 w-full px-3 py-2 shadow-md focus:outline-none"
                        {...register('link')}
                      />
                      {formState.errors?.link && (
                        <p className="absolute bottom-3 text-primary text-xs">
                          {formState.errors.link?.message}
                        </p>
                      )}
                    </div>
                    <div className="max-w-xl pb-8 relative">
                      <label htmlFor="notes">Notes about Upgrade*</label>
                      <textarea
                        id="notes"
                        type="text"
                        rows="5"
                        className="mt-1 border border-gray1 w-full px-3 py-2 shadow-md focus:outline-none"
                        {...register('notes')}
                      />
                      {formState.errors?.notes && (
                        <p className="absolute bottom-3 text-primary text-xs">
                          {formState.errors.notes?.message}
                        </p>
                      )}
                    </div>
                    <Button
                      primary
                      disabled={isSubmit}
                      isLoading={isSubmit}
                      type="submit"
                      sizeSpinner={20}
                    >
                      Add Upgrade
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Card>
      </LayoutDashboard>
    </>
  );
};

export default LoadingScreen(AdminAddUpgrade, 'final-all', 'upgrades');
