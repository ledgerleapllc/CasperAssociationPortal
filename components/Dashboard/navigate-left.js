const NavigateLeft = () => (
  <div className="flex flex-col w-24 px-5 bg-white shadow-2xl rounded-3xl min-content-height">
    <img
      className="py-6 border-b-2 border-primary align-center"
      src="/images/ic_logo_home.svg"
      alt="Casper"
    />
    <ul className="flex flex-col items-center">
      <li className="pb-4 pt-14">
        <a className="inline-block rounded-2xl hover:shadow-lg">
          <img className="p-3" src="/images/ic_home.svg" alt="Home" />
        </a>
      </li>
      <li className="py-4">
        <a className="inline-block rounded-2xl hover:shadow-lg">
          <img
            className="p-3"
            src="/images/ic_infor.svg"
            alt="Validator Info"
          />
        </a>
      </li>
      <li className="py-4">
        <a className="inline-block rounded-2xl hover:shadow-lg">
          <img
            className="p-3"
            src="/images/ic_material_chat.svg"
            alt="Material Chat"
          />
        </a>
      </li>
      <li className="py-4">
        <a className="inline-block rounded-2xl hover:shadow-lg">
          <img className="p-3" src="/images/ic_awesome_vote.svg" alt="Vote" />
        </a>
      </li>
      <li className="py-4">
        <a className="inline-block rounded-2xl hover:shadow-lg">
          <img
            className="p-3"
            src="/images/ic_feather_user_plus.svg"
            alt="User Add"
          />
        </a>
      </li>
      <li className="pt-4">
        <a className="inline-block rounded-2xl hover:shadow-lg">
          <img
            className="p-3"
            src="/images/ic_feather_settings.svg"
            alt="Setting"
          />
        </a>
      </li>
    </ul>
  </div>
);

export default NavigateLeft;
