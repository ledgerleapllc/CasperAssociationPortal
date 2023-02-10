import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import cookie from 'vue-cookies';
import VueMobileDetection from "vue-mobile-detection";
import VueApexCharts from 'vue3-apexcharts';

/* common routes */
import Landing from '@/components/Landing/Landing.vue';
import Faq from '@/components/Faq/Faq.vue';
import ValidatorSelectionFrame from '@/components/ValidatorSelectionFrame/ValidatorSelectionFrame.vue';
import ValidatorSelectionTool from '@/components/ValidatorSelectionTool/ValidatorSelectionTool.vue';
import Validator from '@/components/Validator/Validator.vue';
import Signup from '@/components/Signup/Signup.vue';
import Login from '@/components/Login/Login.vue';
import ForgotPassword from '@/components/Login/ForgotPassword.vue';
import ResetPassword from '@/components/Login/ResetPassword.vue';
import SetPassword from '@/components/Login/SetPassword.vue';
import ConfirmAccount from '@/components/ConfirmAccount/ConfirmAccount.vue';
import Welcome from '@/components/Welcome/Welcome.vue';
import Terms from '@/components/Terms/Terms.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy/PrivacyPolicy.vue';
import NotFound from '@/components/NotFound/NotFound.vue';

/* user routes */
import UserOnboard from '@/components/User/Onboard/Onboard.vue';
import UserAccount from '@/components/User/Account/Account.vue';
import UserDashboard from '@/components/User/Dashboard/Dashboard.vue';
import UserMembership from '@/components/User/Membership/Membership.vue';
import UserGetVerified from '@/components/User/GetVerified/GetVerified.vue';
import UserNodes from '@/components/User/Nodes/Nodes.vue';
import UserMyEras from '@/components/User/MyEras/MyEras.vue';
import UserDiscussions from '@/components/User/Discussions/Discussions.vue';
import UserDiscussion from '@/components/User/Discussion/Discussion.vue';
import UserBallots from '@/components/User/Ballots/Ballots.vue';
import UserBallot from '@/components/User/Ballot/Ballot.vue';
import UserPerks from '@/components/User/Perks/Perks.vue';
import UserPerk from '@/components/User/Perk/Perk.vue';
import UserProfile from '@/components/User/Profile/Profile.vue';
import UserValidator from '@/components/User/Validator/Validator.vue';
import UserNotifications from '@/components/User/Notifications/Notifications.vue';
import UserWarnings from '@/components/User/Notifications/Warnings.vue';
import UserUpgrades from '@/components/User/Upgrades/Upgrades.vue';

/* admin routes */
import AdminAccount from '@/components/Admin/Account/Account.vue';
import AdminDashboard from '@/components/Admin/Dashboard/Dashboard.vue';
import AdminNodes from '@/components/Admin/Nodes/Nodes.vue';
import AdminProfile from '@/components/Admin/Profile/Profile.vue';
import AdminDiscussions from '@/components/Admin/Discussions/Discussions.vue';
import AdminDiscussion from '@/components/Admin/Discussion/Discussion.vue';
import AdminBallots from '@/components/Admin/Ballots/Ballots.vue';
import AdminBallot from '@/components/Admin/Ballot/Ballot.vue';
import AdminIntake from '@/components/Admin/Intake/Intake.vue';
import AdminUsers from '@/components/Admin/Users/Users.vue';
import AdminUser from '@/components/Admin/User/User.vue';
import AdminTeams from '@/components/Admin/Teams/Teams.vue';
import AdminAcceptTeamInvite from '@/components/Admin/Teams/AcceptTeamInvite.vue';
import AdminSettings from '@/components/Admin/Settings/Settings.vue';
import AdminEras from '@/components/Admin/Eras/Eras.vue';
import AdminNotifications from '@/components/Admin/Notifications/Notifications.vue';
import AdminPerks from '@/components/Admin/Perks/Perks.vue';
import AdminPerk from '@/components/Admin/Perk/Perk.vue';
import AdminUpgrades from '@/components/Admin/Upgrades/Upgrades.vue';
import AdminReinstatement from '@/components/Admin/Reinstatement/Reinstatement.vue';

import './assets/css/main.css'

const app_name = 'Casper Association Portal';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		/* Common endpoints */
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: NotFound,
			meta: {
				title: `${app_name} - Not Found`,
				display_name: 'Not Found'
			}
		},
		{
			path: '/',
			name: 'Landing',
			component: Landing,
			meta: {
				title: `${app_name}`,
				display_name: ''
			}
		},
		{
			path: '/faq',
			name: 'Faq',
			component: Faq,
			meta: {
				title: `${app_name} - FAQ`,
				display_name: 'FAQ'
			}
		},
		{
			path: '/terms-of-use',
			name: 'Terms',
			component: Terms,
			meta: {
				title: `${app_name} - Terms of Use`,
				display_name: 'Terms of Use'
			}
		},
		{
			path: '/privacy-policy',
			name: 'PrivacyPolicy',
			component: PrivacyPolicy,
			meta: {
				title: `${app_name} - Privacy Policy`,
				display_name: 'Privacy Policy'
			}
		},
		{
			path: '/validator-selection-tool',
			name: 'ValidatorSelectionTool',
			component: ValidatorSelectionTool,
			meta: {
				title: `${app_name} - Validator Selection Tool`,
				display_name: 'Validator Selection Tool'
			}
		},
		{
			path: '/validator-selection-frame',
			name: 'ValidatorSelectionFrame',
			component: ValidatorSelectionFrame,
			meta: {
				title: `${app_name} - Validator Selection Tool`,
				display_name: 'Validator Selection Tool'
			}
		},
		{
			path: '/validator/:pseudonym?',
			name: 'Validator',
			component: Validator,
			meta: {
				title: `${app_name} - Public Validator View`,
				display_name: 'Public Validator View',
				protected: true
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: `${app_name} - Login`,
				display_name: 'Login'
			}
		},
		{
			path: '/u/',
			redirect: to => {
				return {
					name: 'Login'
				}
			},
			meta: {
				protected: false
			}
		},
		{
			path: '/a/',
			redirect: to => {
				return {
					name: 'Login'
				}
			},
			meta: {
				protected: false
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: `${app_name} - Login`,
				display_name: 'Login'
			}
		},
		{
			path: '/forgot-password',
			name: 'ForgotPassword',
			component: ForgotPassword,
			meta: {
				title: `${app_name} - Forgot Password`,
				display_name: 'Forgot Password'
			}
		},
		{
			path: '/reset-password/:hash?',
			name: 'ResetPassword',
			component: ResetPassword,
			meta: {
				title: `${app_name} - Reset Password`,
				display_name: 'Reset Password'
			}
		},
		{
			path: '/set-password/:hash?',
			name: 'SetPassword',
			component: SetPassword,
			meta: {
				title: `${app_name} - Set New Password`,
				display_name: 'Set New Password'
			}
		},
		{
			path: '/confirm-account',
			name: 'ConfirmAccount',
			component: ConfirmAccount,
			meta: {
				title: `${app_name} - Confirm Account`,
				display_name: 'Confirm Account',
				protected: true
			}
		},
		{
			path: '/signup',
			name: 'Signup',
			component: Signup,
			meta: {
				title: `${app_name} - Signup`,
				display_name: 'Signup'
			}
		},
		{
			path: '/welcome',
			name: 'Welcome',
			component: Welcome,
			meta: {
				title: `${app_name} - Welcome`,
				display_name: 'Welcome'
			}
		},

		/* User endpoints */
		{
			path: '/u/onboard',
			name: 'UserOnboard',
			component: UserOnboard,
			meta: {
				title: `${app_name} - Onboarding`,
				display_name: 'Onboarding',
				protected: true
			}
		},
		{
			path: '/u/dashboard',
			name: 'UserDashboard',
			component: UserDashboard,
			meta: {
				title: `${app_name} - Dashboard`,
				display_name: 'Dashboard',
				protected: true
			}
		},
		{
			path: '/u/membership',
			name: 'UserMembership',
			component: UserMembership,
			meta: {
				title: `${app_name} - Membership`,
				display_name: 'Membership',
				protected: true
			}
		},
		{
			path: '/u/get-verified',
			name: 'UserGetVerified',
			component: UserGetVerified,
			meta: {
				title: `${app_name} - Get Verified`,
				display_name: 'Get Verified',
				protected: true
			}
		},
		{
			path: '/u/nodes',
			name: 'UserNodes',
			component: UserNodes,
			meta: {
				title: `${app_name} - Nodes`,
				display_name: 'Nodes',
				protected: true
			}
		},
		{
			path: '/u/eras',
			name: 'UserMyEras',
			component: UserMyEras,
			meta: {
				title: `${app_name} - My Eras`,
				display_name: 'My Eras',
				protected: true
			}
		},
		{
			path: '/u/discussions/',
			redirect: to => {
				return {
					path: '/u/discussions/all'
				}
			},
			meta: {
				protected: true
			}
		},
		{
			path: '/u/discussions/:category?',
			name: 'UserDiscussions',
			component: UserDiscussions,
			meta: {
				title: `${app_name} - Discussions`,
				display_name: 'Discussions',
				protected: true
			}
		},
		{
			path: '/u/discussion/:discussion_id?',
			name: 'UserDiscussion',
			component: UserDiscussion,
			meta: {
				title: `${app_name} - Discussion`,
				display_name: 'Discussion',
				protected: true
			}
		},
		{
			path: '/u/ballots/:category?',
			name: 'UserBallots',
			component: UserBallots,
			meta: {
				title: `${app_name} - Ballots`,
				display_name: 'Ballots',
				protected: true
			}
		},
		{
			path: '/u/ballot/:ballot_id?',
			name: 'UserBallot',
			component: UserBallot,
			meta: {
				title: `${app_name} - Ballot`,
				display_name: 'Ballot',
				protected: true
			}
		},
		{
			path: '/u/perks',
			name: 'UserPerks',
			component: UserPerks,
			meta: {
				title: `${app_name} - Perks`,
				display_name: 'Perks',
				protected: true
			}
		},
		{
			path: '/u/perk',
			redirect: to => {
				return {
					path: '/u/perks'
				}
			},
			meta: {
				protected: true
			}
		},
		{
			path: '/u/perk/:perk_id?',
			name: 'UserPerk',
			component: UserPerk,
			meta: {
				title: `${app_name} - Perk`,
				display_name: 'Perk',
				protected: true
			}
		},
		{
			path: '/u/notifications',
			name: 'UserNotifications',
			component: UserNotifications,
			meta: {
				title: `${app_name} - Notifications`,
				display_name: 'Notifications',
				protected: true
			}
		},
		{
			path: '/u/warnings',
			name: 'UserWarnings',
			component: UserWarnings,
			meta: {
				title: `${app_name} - Warnings`,
				display_name: 'Warnings',
				protected: true
			}
		},
		{
			path: '/u/account',
			redirect: to => {
				return {
					path: '/u/account/detail'
				}
			},
			meta: {
				protected: true
			}
		},
		{
			path: '/u/account/:category?',
			name: 'UserAccount',
			component: UserAccount,
			meta: {
				title: `${app_name} - Account Settings`,
				display_name: 'Account Settings',
				protected: true
			}
		},
		{
			path: '/u/profile/:identifier?',
			name: 'UserProfile',
			component: UserProfile,
			meta: {
				title: `${app_name} - Profile`,
				display_name: 'Profile',
				protected: true
			}
		},
		{
			path: '/u/validator/:action?',
			name: 'UserValidator',
			component: UserValidator,
			meta: {
				title: `${app_name} - Validator`,
				display_name: 'Validator',
				protected: true
			}
		},
		{
			path: '/u/upgrades',
			redirect: to => {
				return {
					path: '/u/upgrades/available-upgrades'
				}
			},
			meta: {
				protected: true
			}
		},
		{
			path: '/u/upgrades/:page?',
			name: 'UserUpgrades',
			component: UserUpgrades,
			meta: {
				title: `${app_name} - Upgrades`,
				display_name: 'Upgrades',
				protected: true
			}
		},

		/* Admin endpoints */
		{
			path: '/a/dashboard',
			name: 'AdminDashboard',
			component: AdminDashboard,
			meta: {
				title: `${app_name} - Dashboard`,
				display_name: 'Dashboard',
				protected: true
			}
		},
		{
			path: '/a/account',
			redirect: to => {
				return {
					path: '/a/account/detail'
				}
			},
			meta: {
				protected: true
			}
		},
		{
			path: '/a/account/:category?',
			name: 'AdminAccount',
			component: AdminAccount,
			meta: {
				title: `${app_name} - Account Settings`,
				display_name: 'Account Settings',
				protected: true
			}
		},
		{
			path: '/a/nodes',
			name: 'AdminNodes',
			component: AdminNodes,
			meta: {
				title: `${app_name} - Nodes`,
				display_name: 'Nodes',
				protected: true
			}
		},
		{
			path: '/a/profile/:identifier?',
			name: 'AdminProfile',
			component: AdminProfile,
			meta: {
				title: `${app_name} - Profile`,
				display_name: 'Profile',
				protected: true
			}
		},
		{
			path: '/a/discussions/',
			redirect: to => {
				return {
					path: '/a/discussions/all'
				}
			},
			meta: {
				protected: true
			}
		},
		{
			path: '/a/discussions/:category?',
			name: 'AdminDiscussions',
			component: AdminDiscussions,
			meta: {
				title: `${app_name} - Discussions`,
				display_name: 'Discussions',
				protected: true
			}
		},
		{
			path: '/a/discussion/:discussion_id?',
			name: 'AdminDiscussion',
			component: AdminDiscussion,
			meta: {
				title: `${app_name} - Discussion`,
				display_name: 'Discussion',
				protected: true
			}
		},
		{
			path: '/a/ballots/:category?',
			name: 'AdminBallots',
			component: AdminBallots,
			meta: {
				title: `${app_name} - Ballots`,
				display_name: 'Ballots',
				protected: true
			}
		},
		{
			path: '/a/ballot/:ballot_id?',
			name: 'AdminBallot',
			component: AdminBallot,
			meta: {
				title: `${app_name} - Ballot`,
				display_name: 'Ballot',
				protected: true
			}
		},
		{
			path: '/a/intake',
			name: 'AdminIntake',
			component: AdminIntake,
			meta: {
				title: `${app_name} - Intake`,
				display_name: 'Intake',
				protected: true
			}
		},
		{
			path: '/a/users',
			name: 'AdminUsers',
			component: AdminUsers,
			meta: {
				title: `${app_name} - Users`,
				display_name: 'Users',
				protected: true
			}
		},
		{
			path: '/a/user/:user_guid?',
			name: 'AdminUser',
			component: AdminUser,
			meta: {
				title: `${app_name} - User`,
				display_name: 'User',
				protected: true
			}
		},
		{
			path: '/a/teams',
			name: 'AdminTeams',
			component: AdminTeams,
			meta: {
				title: `${app_name} - Teams`,
				display_name: 'Teams',
				protected: true
			}
		},
		{
			path: '/accept-team-invite/:hash?',
			name: 'AdminAcceptTeamInvite',
			component: AdminAcceptTeamInvite,
			meta: {
				title: `${app_name} - AcceptTeamInvite`,
				display_name: 'AcceptTeamInvite'
			}
		},
		{
			path: '/a/settings',
			redirect: to => {
				return {
					path: '/a/settings/global'
				}
			},
			meta: {
				protected: true
			}
		},
		{
			path: '/a/settings/:category?',
			name: 'AdminSettings',
			component: AdminSettings,
			meta: {
				title: `${app_name} - Global Settings`,
				display_name: 'Global Settings',
				protected: true
			}
		},
		{
			path: '/a/eras',
			name: 'AdminEras',
			component: AdminEras,
			meta: {
				title: `${app_name} - Eras`,
				display_name: 'Eras',
				protected: true
			}
		},
		{
			path: '/a/notifications',
			name: 'AdminNotifications',
			component: AdminNotifications,
			meta: {
				title: `${app_name} - Notifications`,
				display_name: 'Notifications',
				protected: true
			}
		},
		{
			path: '/a/perks',
			name: 'AdminPerks',
			component: AdminPerks,
			meta: {
				title: `${app_name} - Perks`,
				display_name: 'Perks',
				protected: true
			}
		},
		{
			path: '/a/perk',
			redirect: to => {
				return {
					path: '/a/perks'
				}
			},
			meta: {
				protected: true
			}
		},
		{
			path: '/a/perk/:perk_id?',
			name: 'AdminPerk',
			component: AdminPerk,
			meta: {
				title: `${app_name} - Perk`,
				display_name: 'Perk',
				protected: true
			}
		},
		{
			path: '/a/upgrades',
			redirect: to => {
				return {
					path: '/a/upgrades/available-upgrade'
				}
			},
			meta: {
				protected: true
			}
		},
		{
			path: '/a/upgrades/:page?',
			name: 'AdminUpgrades',
			component: AdminUpgrades,
			meta: {
				title: `${app_name} - Upgrades`,
				display_name: 'Upgrades',
				protected: true
			}
		},
		{
			path: '/a/reinstatement/:category?',
			name: 'AdminReinstatement',
			component: AdminReinstatement,
			meta: {
				title: `${app_name} - Reinstatement`,
				display_name: 'Reinstatement',
				protected: true
			}
		}
	]
})

router.beforeEach(async (to, from) => {
	let fetch_bearer_token = cookie.get('bearer_token');

	if (
		to.meta.protected && (
			!fetch_bearer_token || 
			fetch_bearer_token == 'undefined'
		)
	) {
		console.log('No Bearer token - Route to login - 2');
		return { name: 'Login' }
	}
})

const app = createApp(App)
app.use(router)
app.use(VueMobileDetection)
app.use(VueApexCharts)

let cookie_config = {
	path: '/'
}

if (window.location.protocol == 'https:') {
	cookie_config = {
		path: '/',
		secure: true,
		sameSite: 'Strict'
	}
}

app.use(cookie, cookie_config)
app.mount('#app')
