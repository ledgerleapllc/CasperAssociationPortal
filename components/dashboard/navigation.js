import { useSelector } from 'react-redux';
import { ActiveLink, Card } from '../partials';
import AppHeader from '../layouts/app-header';

const Navigation = () => {
  const userAdmin = useSelector(state => state.authReducer.fetchUserInfo.data);

  console.log('aaaa', userAdmin)
  return (
    <>
      <Card className="flex-col w-24 px-5 hidden lg:flex h-full overflow-y-scroll">
        <img
          className="py-6 border-b-2 border-primary align-center"
          src="/images/ic_logo_home.svg"
          alt="Casper"
        />
        <ul className="mb-4 flex flex-col items-center border-b-2 border-primary">
          <li className="pb-4 pt-14">
            <ActiveLink activeClassName="shadow-activeLink" href="/dashboard">
              <a className="rounded-lg inline-block">
                <img className="p-3" src="/images/ic_home.svg" alt="Home" />
              </a>
            </ActiveLink>
          </li>
          <li className="py-2">
            <ActiveLink
              activeClassName="shadow-activeLink"
              href="/dashboard/nodes"
            >
              <a className="inline-block rounded-2xl hover:shadow-lg">
                <img
                  className="p-3"
                  src="/images/ic_infor.svg"
                  alt="Validator Info"
                />
              </a>
            </ActiveLink>
          </li>
          <li className="py-2">
            <ActiveLink
              activeClassName="shadow-activeLink"
              href="/dashboard/discussion"
            >
              <a className="rounded-lg inline-block">
                <img
                  className="p-3"
                  src="/images/ic_material_chat.svg"
                  alt="Material Chat"
                />
              </a>
            </ActiveLink>
          </li>
          <li className="py-2">
            <ActiveLink
              activeClassName="shadow-activeLink"
              href="/dashboard/votes"
            >
              <a className="inline-block rounded-2xl hover:shadow-lg">
                <img
                  className="p-3"
                  src="/images/ic_awesome_vote.svg"
                  alt="Vote"
                />
              </a>
            </ActiveLink>
          </li>
          <li className="py-2">
            <ActiveLink
              activeClassName="shadow-activeLink"
              href="/dashboard/member-perks"
            >
              <a className="inline-block rounded-2xl hover:shadow-lg">
                <img
                  className="p-3"
                  src="/images/ic_feather_user_plus.svg"
                  alt="User Add"
                />
              </a>
            </ActiveLink>
          </li>
          <li className="pt-2">
            <ActiveLink
              activeClassName="shadow-activeLink"
              href="/dashboard/settings"
            >
              <a className="inline-block rounded-2xl hover:shadow-lg">
                <img
                  className="p-3"
                  src="/images/ic_feather_settings.svg"
                  alt="Setting"
                />
              </a>
            </ActiveLink>
          </li>
        </ul>
        {userAdmin?.role === 'admin' && (
          <ul className="flex flex-col pb-4">
            <li className="py-1.5 cursor-pointer">
              <ActiveLink
                activeClassName="text-primary"
                href="/admin/dashboard"
              >
                <p>Admin</p>
              </ActiveLink>
            </li>
            <li className="py-1.5 cursor-pointer">
              <ActiveLink activeClassName="text-primary" href="/admin/intake">
                <p>Instake</p>
              </ActiveLink>
            </li>
            <li className="py-1.5 cursor-pointer">
              <ActiveLink activeClassName="text-primary" href="/admin/users">
                <p>Users</p>
              </ActiveLink>
            </li>
            <li className="py-1.5 cursor-pointer">
              <ActiveLink activeClassName="text-primary" href="/admin/ballots">
                <p>Ballots</p>
              </ActiveLink>
            </li>
            <li className="py-1.5 cursor-pointer">
              <ActiveLink activeClassName="text-primary" href="/admin/perks">
                <p>Perks</p>
              </ActiveLink>
            </li>
            <li className="py-1.5 cursor-pointer">
              <ActiveLink activeClassName="text-primary" href="/admin/settings">
                <p>Settings</p>
              </ActiveLink>
            </li>
          </ul>
        )}
      </Card>
      <AppHeader className="py-4 lg:hidden" theme="dark" />
    </>
  );
};

export default Navigation;
