const InfoRight = () => (
  <div className="flex flex-col w-64 p-8 bg-white shadow-2xl rounded-3xl min-content-height">
    <div className="flex flex-col pb-9 border-b-2 border-gray">
      <div className="flex">
        <img
          className="pr-2"
          src="/images/ic_awesome_user_circle.svg"
          alt="User"
        />
        <span className="text-2.5xl">Jason Stone</span>
      </div>
      <span className="text-xs text-primary underline">Logout</span>
    </div>
    <div className="flex flex-col pt-9">
      <span className="text-2.5xl">Node Info</span>
      <div className="flex flex-col py-3">
        <div className="flex flex-row">
          <span className="text-lg">Node Rank </span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-base text-gray">8</span>
      </div>
      <div className="flex flex-col py-3">
        <div className="flex flex-row">
          <span className="text-lg">Stake Amount</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-base text-gray">2,502,815</span>
      </div>
      <div className="flex flex-col py-3">
        <div className="flex flex-row">
          <span className="text-lg">Delegators</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <span className="text-base text-gray">8</span>
      </div>
      <div className="flex flex-col py-3">
        <div className="flex flex-row">
          <span className="text-lg">Uptime</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <div className="overflow-hidden h-3 mt-2 text-xs flex rounded bg-gray bg-opacity-50">
          <div className="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary">
            75%
          </div>
        </div>
      </div>
      <div className="flex flex-col py-3">
        <div className="flex flex-row">
          <span className="text-lg">Peers</span>
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
        </div>
        <div className="overflow-hidden h-3 mt-2 text-xs flex rounded bg-gray bg-opacity-50">
          <div className="w-1/2 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary">
            49/88
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default InfoRight;
