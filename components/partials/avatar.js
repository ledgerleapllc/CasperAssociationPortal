const Avatar = ({ info }) =>
  info && info.avatar_url ? (
    <img src={info.avatar_url} alt="avatar" />
  ) : (
    <div className="flex justify-center items-center text-white bg-primary border rounded-full h-8 w-8">
      {info?.last_name[0]}
    </div>
  );

export default Avatar;
