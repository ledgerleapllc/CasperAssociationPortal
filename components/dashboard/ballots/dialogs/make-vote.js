import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AppContext } from '../../../../pages/_app';
import { recordVote } from '../../../../shared/redux-saga/dashboard/dashboard-actions';
import { useDialog } from '../../../partials/dialog';

export const MakeVote = ({ id }) => {
  const { setLoading } = useContext(AppContext);
  const dispatch = useDispatch();
  const { onClosed } = useDialog();

  const doRecordVote = vote => {
    setLoading(true);
    dispatch(
      recordVote(
        { id, vote },
        () => {
          setLoading(false);
          onClosed();
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <div className="text-center mx-auto py-20" style={{ maxWidth: '26rem' }}>
      <h3 className="text-xl text-center mb-2.5">
        Which direction would you like to vote?
      </h3>
      <p className="text-xs text-gray">
        Consider your choice wisely. You cannot change your vote later.
      </p>
      <div className="mt-8 flex justify-center gap-5 items-center">
        <button
          type="button"
          className="outline-none rounded-full h-24 w-24 font-normal border-transparent hover:opacity-40 text-white bg-primary"
          onClick={() => doRecordVote('for')}
        >
          Vote For
        </button>
        <button
          type="button"
          className="px-5 outline-none rounded-full h-24 w-24 font-normal bg-transparent hover:opacity-40 text-primary border border-primary"
          onClick={() => doRecordVote('against')}
        >
          Vote Against
        </button>
      </div>
    </div>
  );
};
