/* eslint-disable no-unused-vars */
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useContext, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Button, Card } from '../../components/partials';
import { submitContactMessage } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { AppContext } from '../_app';
import { EMAIL_PATTERN } from '../../helpers/form-validation';
import { useSnackBar } from '../../components/partials/snack-bar';

const ContactUs = () => {
  const { setLoading } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState();
  const dispatch = useDispatch();
  const { openSnack } = useSnackBar();

  const { formState, register, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = data => {
    setLoading(true);
    setIsSubmitting(true);
    dispatch(
      submitContactMessage(
        data,
        () => {
          setLoading(false);
          setIsSubmitting(false);
          openSnack('primary', 'Sent Message!');
          reset();
        },
        () => {
          setLoading(false);
          setIsSubmitting(false);
        }
      )
    );
  };

  return (
    <LayoutDashboard>
      <Card className="h-full px-card py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col">
            <h2 className="text-dark2 text-xxl font-medium mb-2 flex items-end">
              How can we help?
            </h2>
            <p className="py-2">
              We're here to help and answer any questions you may have. We look
              forward to hearing from you!
            </p>
          </div>
          <div className="flex flex-col flex-1 min-h-0 w-full lg:w-1/2">
            <div className="flex-1 min-h-0 flex">
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                  <input
                    type="text"
                    className="border border-gray1 w-full mt-4 flex-1 h-14 px-7 shadow-md focus:outline-none"
                    placeholder="Name"
                    name="name"
                    {...register('name', {
                      required: 'Name is required',
                    })}
                  />
                  {formState.errors?.name && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.name?.message}
                    </p>
                  )}
                  <input
                    type="text"
                    className="border border-gray1 w-full mt-4 flex-1 h-14 px-7 shadow-md focus:outline-none"
                    placeholder="Email"
                    name="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        message: 'Email is invalid',
                        value: EMAIL_PATTERN,
                      },
                    })}
                  />
                  {formState.errors?.email && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.email?.message}
                    </p>
                  )}
                  <textarea
                    type="text"
                    className="border border-gray1 w-full mt-4 flex-1 p-7 py-5 shadow-md focus:outline-none"
                    placeholder="Message"
                    rows="6"
                    name="message"
                    {...register('message', {
                      required: 'Message is required',
                    })}
                  />
                  {formState.errors?.message && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.message?.message}
                    </p>
                  )}
                  <div className="flex flex-col-reverse lg:flex-wrap lg:flex-row pt-4 justify-start">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                      sizeSpinner={20}
                      primary
                      className="my-1 text-lg"
                    >
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(ContactUs, 'final-all');
