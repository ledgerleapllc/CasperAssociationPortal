import ReactLoading from 'react-loading';

const AppLoading = () => (
  <div className="fixed inset-0 flex items-center justify-center z-40 z-111">
    <div className="fixed inset-0 bg-white opacity-40" />
    <ReactLoading
      className="z-50 z-111"
      type="spinningBubbles"
      color="#FF473E"
      width={100}
      height={100}
    />
  </div>
);

export default AppLoading;
