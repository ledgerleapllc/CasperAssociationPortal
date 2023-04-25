<script>

import { api } from './components/api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import iziModal from 'izimodal/js/iziModal';
import DefaultAvatarUrl from '@/assets/images/avatar.svg';

import UserSidebar from './components/User/Sidebar.vue';
import UserSidebarMini from './components/User/SidebarMini.vue';
import UserDropDownMenu from './components/User/DropDownMenu.vue';

import AdminSidebar from './components/Admin/Sidebar.vue';
import AdminSidebarMini from './components/Admin/SidebarMini.vue';
import AdminDropDownMenu from './components/Admin/DropDownMenu.vue';

import Suspended from './components/Suspended/Suspended.vue';
import AvatarBadge from './components/AvatarBadge.vue';
import Popper from 'vue3-popper';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import { Modal } from 'vue-neat-modal';

import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	// set root state
	data: () => ({
		inner_width:         window.innerWidth,
		guid:                '',
		email:               '',
		bearer_token:        '',
		session_cookie:      '',
		role:                '',
		pseudonym:           '',
		telegram:            '',
		account_type:        '',
		created_at:          '',
		verified:            0,
		admin_approved:      0,
		twofa:               0,
		totp:                0,
		badge_partner_link:  0,
		avatar_url:          DefaultAvatarUrl,
		esigned:             false,
		letter:              '',
		unverified_node:     true,
		pii: {
			first_name:      '',
			middle_name:     '',
			last_name:       '',
			dob:             '',
			registration_ip: '',
			phone:           '',
			country_of_citizenship: ''
		},
		route:               window.location.pathname,
		inputEmail:          '',

		global_izimodal:     null,
		sidebar_cookie:      '',
		sidebarWidth:        250 + 'px',
		isMobile:            false,
		notifications:       [],
		alert_notification:  false,
		menu_open:           false,
		cookie_cookie:       false,

		// permissions
		permissions: {
			membership:      true,
			nodes:           true,
			eras:            true,
			discussions:     true,
			intake:          false,
			users:           false,
			ballots:         false,
			perks:           false,
			teams:           false,
			global_settings: false
		},

		// page locks
		page_locks: {
			nodes: false,
			votes: false,
			discs: false,
			perks: false
		},

		kyc_status:          '',
		kyc_denied_reason:   '',
		warning:             null,
		suspension:          false,
		sus_loading:         false,
		reinstatable:        false,
		suspension_reason:   '',
		sus_stat:            '',
		sus_letter:          '',
		sus_decision:        '',
		settings: {
			uptime_probation:  0,
			uptime_calc_size:  0,
			redmark_revoke:    0,
			redmark_calc_size: 0
		},
		stats_uptime:        0,
		stats_redmarks:      0,
		api_url:             import.meta.env.VITE_API_URL,
		frontend_url:        import.meta.env.VITE_FRONTEND_URL
	}),

	components: {
		DefaultAvatarUrl,
		AvatarBadge,
		UserSidebar,
		UserSidebarMini,
		UserDropDownMenu,
		AdminSidebar,
		AdminSidebarMini,
		AdminDropDownMenu,
		Popper,
		Modal,
		ClipLoader,
		Suspended
	},

	computed: {
		//
	},

	created() {
		if (
			this.$isMobile() ||
			window.innerWidth < 768
		) {
			this.isMobile = true;
		}

		window.addEventListener(
			'resize', 
			() => {
				if (
					this.$isMobile() ||
					window.innerWidth < 768
				) {
					this.isMobile = true;
				} else {
					this.isMobile = false;
				}
			}
		);

		if (!this.in_outer_zone()) {
			let that = this;

			that.getMe();

			setInterval(function() {
				that.getMe();
			},60000);
		}
	},

	mounted() {
		let that = this;

		$("body").on('click', '.x-close', function() {
			that.global_izimodal.iziModal('close');
		});

		// sidebar cookie logic
		let sidebar_cookie = this.$cookies.get('sidebar_cookie');

		if (
			!sidebar_cookie ||
			sidebar_cookie == 'undefined'
		) {
			this.$cookies.set('sidebar_cookie', 'out');
		}

		this.sidebar_cookie = sidebar_cookie;

		if (this.isMobile) {
			this.sidebar_cookie = 'in';
		}

		if (this.sidebar_cookie == 'in') {
			this.sidebarWidth = 61 + 'px';
		}

		// cookie disclosure banner
		setTimeout(function() {
			let cookie_cookie = that.$cookies.get('cookie_cookie');

			if (
				!cookie_cookie ||
				cookie_cookie == 'undefined'
			) {
				that.cookie_cookie = true;
			}
		},2000);
	},

	watch: {
		'$route' (to, from) {
			document.title = to.meta.title || 'Casper Association Portal';
			if (to.path == '/login') {
				this.getMe();
			}
		}
	},

	methods: {
		triggerMenu(e) {
			if (e.target.id == 'user-menu-trigger') {
				this.menu_open = !this.menu_open;
			} else {
				this.menu_open = false;
			}
		},

		expandSidebar() {
			this.$cookies.set('sidebar_cookie', 'out');
			this.sidebar_cookie = this.$cookies.get('sidebar_cookie');
			this.sidebarWidth = 250 + 'px';
		},

		retractSidebar() {
			this.$cookies.set('sidebar_cookie', 'in');
			this.sidebar_cookie = this.$cookies.get('sidebar_cookie');
			this.sidebarWidth = 61 + 'px';
		},

		acceptCookie() {
			this.$cookies.set('cookie_cookie', 'dismissed');
			this.cookie_cookie = false;
		},

		in_outer_zone() {
			if (
				window.location.pathname == '/' ||
				window.location.pathname.startsWith('/faq') ||
				window.location.pathname.startsWith('/validator') ||
				window.location.pathname.startsWith('/terms-of-use') ||
				window.location.pathname.startsWith('/privacy-policy')
			) {
				return true;
			}

			return false;
		},

		in_common_zone() {
			if (
				window.location.pathname.startsWith('/signup') ||
				window.location.pathname.startsWith('/login') ||
				window.location.pathname.startsWith('/forgot-password') ||
				window.location.pathname.startsWith('/reset-password') ||
				window.location.pathname.startsWith('/set-password') ||
				window.location.pathname.startsWith('/confirm-account') ||
				window.location.pathname.startsWith('/accept-team-invite')
			) {
				return true;
			}

			return false;
		},

		async getMe() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			if (
				!fetch_bearer_token || 
				fetch_bearer_token == 'undefined'
			) {
				console.log('No Bearer token - Route to login - 1');

				if (!this.in_common_zone()) {
					this.routeTo('/login');
					this.clearSession();
				}

				return;
			} else {
				this.bearer_token = fetch_bearer_token
			}

			const response = await api(
				'GET',
				'user/me',
				{},
				this.bearer_token
			);

			this.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.guid               = response.detail.guid;
				this.email              = response.detail.email;
				this.role               = response.detail.role;
				this.pseudonym          = response.detail.pseudonym;
				this.telegram           = response.detail.telegram;
				this.account_type       = response.detail.account_type;
				this.created_at         = response.detail.created_at;
				this.verified           = response.detail.verified;
				this.admin_approved     = parseInt(response.detail.admin_approved);
				this.twofa              = response.detail.twofa;
				this.totp               = response.detail.totp;
				this.badge_partner_link = response.detail.badge_partner_link;
				this.unverified_node    = response.detail.unverified_node;
				this.letter             = response.detail.letter;
				this.esigned            = parseInt(response.detail.esigned);
				this.permissions        = response.detail.permissions;
				this.page_locks         = response.detail.page_locks;
				this.kyc_status         = response.detail.kyc_status;
				this.kyc_denied_reason  = response.detail.kyc_denied_reason;
				this.warning            = response.detail.warning;
				this.suspension         = response.detail.suspension ?? false;
				this.reinstatable       = response.detail.reinstatable ?? false;
				this.suspension_reason  = response.detail.suspension_reason ?? '';
				this.settings           = response.detail.settings ?? this.settings;
				this.sus_letter         = response.detail.sus_letter ?? '';
				this.sus_decision       = response.detail.sus_decision ?? '';

				let pre_route = '/u';

				if (
					this.role == 'admin' ||
					this.role == 'sub-admin'
				) {
					pre_route = '/a';
				}

				if (
					response.detail.avatar_url &&
					response.detail.avatar_url != ''
				) {
					this.avatar_url = response.detail.avatar_url;
				}

				let pii_data = response.detail.pii_data;

				if (pii_data) {
					this.pii.first_name      = pii_data.first_name;
					this.pii.middle_name     = pii_data.middle_name;
					this.pii.last_name       = pii_data.last_name;
					this.pii.dob             = pii_data.dob;
					this.pii.registration_ip = pii_data.registration_ip;
					this.pii.phone           = pii_data.phone;

					this.pii.country_of_citizenship = pii_data.country_of_citizenship;
				}

				if (!this.in_outer_zone()) {
					if (
						!this.verified || 
						this.verified == 0
					) {
						this.routeTo('/confirm-account');
						return;
					}

					if (!this.admin_approved) {
						this.routeTo(`${pre_route}/onboard`);
						return;
					}
				}

				let path_split = window.location.pathname.split('/');
				let path0 = path_split[0];

				if (this.in_common_zone()) {
					this.routeTo(`${pre_route}/dashboard`);
				}

				if (pre_route.charAt(0) != `/${path0}`) {
					this.routeTo(`${pre_route}/dashboard`);
				}

				// notifications banner
				this.alert_notification = false;
				this.notifications      = [];

				if (
					response.detail.notifications &&
					response.detail.notifications.length > 0
				) {
					this.notifications = response.detail.notifications;
					let that = this;

					Object.values(this.notifications).forEach(function(item) {
						if (parseInt(item.dismissable) == 1) {
							that.alert_notification = true;
						}
					});
				}

				// refresh bearer_token cookie
				this.$cookies.set('bearer_token', this.bearer_token);
			}
		},

		clearSession() {
			this.guid               = '';
			this.email              = '';
			this.bearer_token       = '';
			this.session_cookie     = '';
			this.role               = '';
			this.pseudonym          = '';
			this.telegram           = '';
			this.account_type       = '';
			this.created_at         = '';
			this.verified           = 0;
			this.admin_approved     = 0;
			this.twofa              = 0;
			this.totp               = 0;
			this.badge_partner_link = 0;
			this.avatar_url         = DefaultAvatarUrl;
			this.pii                = {};
			this.$cookies.remove('bearer_token');
		},

		routeToLogin() { 
			this.$router.replace('/login')
		},

		routeTo(path) {
			this.route = path;
			this.$router.push(path)
		},

		openLink(link) {
			window.open(link);
		},

		async login(email, password) {
			const response = await api(
				'POST', 
				'user/login', 
				{
					email:    email,
					password: password
				}
			);

			if (
				response.detail.hasOwnProperty('twofa') ||
				response.detail.hasOwnProperty('totp')
			) {
				this.guid = response.detail.guid;

				if (
					response.detail.twofa === false &&
					response.detail.totp === false
				) {
					// No 2fa enabled for this account, but the device is not recognized.
					this.popupModal('newdevice', false);
				} else {
					this.popupModal('mfa', false);
				}

				return true;
			}

			if (response.status >= 400) {
				if (!response.message) {
					response.message = "Could not complete request. Check your internet connection";
				}

				this.toast('Oops', response.message, 'error');
			}

			if (
				response.detail.hasOwnProperty('redirect') &&
				response.detail.redirect == 'set-password'
			) {
				this.routeTo('/set-password');

				return true;
			}

			if (response.status == 200) {
				this.bearer_token   = response.detail.bearer;
				this.session_cookie = response.detail.cookie;

				this.$cookies.set('bearer_token', this.bearer_token);
				this.$cookies.set('session_cookie', this.session_cookie);

				// this.getMe();
				window.location.reload()
			}

			return true;
		},

		async logout() {
			const response = await api(
				'GET',
				'user/logout',
				{},
				this.bearer_token
			);

			if (response.status == 200) {
				this.bearer_token = '';
				this.$cookies.remove('bearer_token');
				this.toast('Logout', response.message, 'success');
				this.routeToLogin()
			}
		},

		async forgotPassword(email) {
			const response = await api(
				'POST',
				'user/forgot-password',
				{
					email: email
				}
			);

			return response;
		},

		async resetPassword(email, hash, new_password) {
			const response = await api(
				'POST',
				'user/reset-password',
				{
					email:        email,
					hash:         hash,
					new_password: new_password
				}
			);

			if (response.status == 200) {
				this.toast('Password Reset', response.message, 'success');
				// this.routeToLogin()
			} else {
				this.toast('Password Reset', response.message, 'error');
			}

			return response;
		},

		async dismiss_notification(notification_id) {
			const response = await api(
				'POST',
				'user/dismiss-notification',
				{
					notification_id: notification_id
				},
				this.bearer_token
			);

			this.catch401(response);

			if (response.status == 200) {
				this.getMe();
			}
		},

		popupModal(
			modal_name, 
			easy_close = true
		) {
			let that = this;
			let modal_id = `#${modal_name}Modal`;
			let submit_btn_id = `#button-${modal_name}Modal`;
			let submit_func = `${modal_name}ModalSubmit`;

			$(modal_id).iziModal('destroy')
			$("body").off('click', submit_btn_id)

			let modal = $(modal_id).iziModal({
				appendTo: false,
				theme: 'light',
				closeOnEscape: easy_close,
				closeButton: easy_close,
				overlayClose: easy_close
			})

			this.global_izimodal = modal;

			$(modal_id).iziModal('open')

			$("body").on('click', submit_btn_id, function() {
				that[submit_func](modal, modal_id);
			})
		},

		async mfaModalSubmit(modal, modal_id) {
			let mfa_code = $(modal).find("#input-mfaModal").val();

			if (mfa_code) {
				$(modal_id).iziModal('startLoading')

				const response = await api(
					'POST', 
					'user/login-mfa', 
					{
						guid: this.guid,
						mfa_code: mfa_code,
						cookie: ''
					}
				);

				$(modal_id).iziModal('stopLoading');

				if (response.status == 200) {
					this.bearer_token = response.detail.bearer;
					this.session_cookie = response.detail.cookie;

					this.$cookies.set('bearer_token', this.bearer_token);
					this.$cookies.set('session_cookie', this.session_cookie);

					// this.getMe();
					$(modal_id).iziModal('close')
					window.location.reload()
				}

				if (response.status >= 400) {
					if (!response.message) {
						response.message = "Could not complete request. Check your internet connection";
					}

					this.toast('Oops', response.message, 'warning');
				}
			}
		},

		async newdeviceModalSubmit(modal, modal_id) {
			let mfa_code = $(modal).find("#input-newdeviceModal").val();

			if (mfa_code) {
				$(modal_id).iziModal('startLoading')

				const response = await api(
					'POST', 
					'user/login-mfa', 
					{
						guid: this.guid,
						mfa_code: mfa_code,
						cookie: ''
					}
				);

				$(modal_id).iziModal('stopLoading');

				if (response.status == 200) {
					this.bearer_token = response.detail.bearer;
					this.session_cookie = response.detail.cookie;

					this.$cookies.set('bearer_token', this.bearer_token);
					this.$cookies.set('session_cookie', this.session_cookie);

					// this.getMe();
					$(modal_id).iziModal('close')
					window.location.reload()
				}

				if (response.status >= 400) {
					if (!response.message) {
						response.message = "Could not complete request. Check your internet connection";
					}

					this.toast('Oops', response.message, 'warning');
				}
			}
		},

		async checkSuspensionStatus() {
			this.sus_loading = true;

			const response = await api(
				'GET',
				'user/get-suspension-status',
				{},
				this.bearer_token
			);

			this.catch401(response);

			if (response.status == 200) {
				this.getMe();
				this.sus_loading   = false;

				this.stats_uptime   = response.detail.uptime   ?? 0;
				this.stats_redmarks = response.detail.redmarks ?? 0;

				if (this.stats_uptime < this.settings.uptime_probation) {
					this.sus_stat = 'Your uptime is still too low to be re-instated';
				}

				if (this.stats_redmarks > this.settings.redmark_revoke) {
					this.sus_stat = 'Your node has too many redmarks to be re-instated';
				}

				if (
					this.stats_uptime   >= this.settings.uptime_probation &&
					this.stats_redmarks <  this.settings.redmark_revoke
				) {
					this.sus_stat = 'You can request reactivation!';
				}
			} else {
				this.toast(
					'',
					response.message,
					'error'
				);

				this.sus_loading = false;
			}
		},

		catch401(response) {
			if (response) {
				if (response.status == 401) {
					console.log('401 DEAUTH');
					this.clearSession();
					this.routeTo('/login');
					window.location.reload();
				}
			}
		},

		toast(
			title, 
			message, 
			style = 'show'
			/*
			info, success, warning, error, question
			*/
		) {
			iziToast[style]({
				title: title,
				message: message,
				timeout: 10000,
				resetOnHover: true
			});
		},

		dropzone_error(event) {
			console.log(event);
			let error = event.error ?? '';

			if (error == 'MAX_FILE_SIZE') {
				this.toast(
					'Upload Error',
					`File size too large`,
					'error'
				);
			}

			if (error == 'INVALID_TYPE') {
				this.toast(
					'Upload Error',
					`Invalid file type`,
					'error'
				);
			}
		},

		in_array(needle, haystack) {
			let length = haystack.length;

			for (let i = 0; i < length; i++) {
				if (haystack[i] == needle) return true;
			}

			return false;
		},

		gettype(obj) {
			return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
		},

		formatDateWithZone(date) {
			let s = date.toLocaleString('en-GB');
			let a = s.split(/\D/);
			return a[2] + '-' + a[1] + '-' + a[0] + ' ' + a[4] + ':' + a[5] + ':' + a[6];
		},

		formatZDate(date) {
			date  = date.replace('T', ' ');
			let s = date.split('.');
			return s[0];
		},

		formatHash(hash, l = 8) {
			if (typeof hash != 'string') {
				return '';
			}

			if (hash.length <= l) {
				return hash;
			}

			let b = 1;
			let dots = '...';

			if (l % 2 == 0) {
				b = 0;
				dots = '..';
			}

			let split = ((l - b) / 2) - 1;
			let first = hash.slice(0, split);
			let last  = hash.slice(hash.length - split);

			return `${first}${dots}${last}`;
		},

		formatString(s, l = 50) {
			if (typeof s != 'string') {
				return '';
			}

			if (s.length <= l) {
				return s;
			}

			let split = s.slice(0, l - 3);

			return `${split}...`;
		},

		formatComment(comment) {
			if (typeof comment != 'string') {
				return '';
			}

			let breaks = (comment.match(/\n/g) || []).length;

			if (breaks > 50) {
				return `${comment.slice(0, 50)}...`;
			}

			return comment;
		},

		randomHash(l = 10) {
			let chars    = '0123456789abcdefABCDEF';
			let char_len = chars.length;
			let ret      = '';

			for (let i = 0; i < l; i++) {
				let rand = Math.floor(Math.random() * char_len);
				ret = ret + chars[rand];
			}

			return ret;
		},

		ucfirst(s) {
			return `${s[0].toUpperCase()}${s.substring(1)}`;
		},

		inputIsNumberFormat(value) {
			if (this.gettype(value) == 'string') {
				let int = parseInt(value);
				let str = int.toString();

				if (value === str) {
					return true;
				}
			} else

			if (this.gettype(value) == 'number') {
				let str = value.toString();
				let int = parseInt(str);

				if (value === int) {
					return true;
				}
			}

			return false;
		},

		inputIsDateFormat(element) {
			let key    = element.key ?? '';
			let target = element.target ?? '';
			let value  = target.value ?? '';
			let newval = value + key;

			if (
				key == 'Backspace' ||
				key == 'Delete'    ||
				key == 'Tab'
			) {
				return true;
			}

			if (!/^[0-9]+$/.test(key)) {
				return false;
			}

			if (newval.length == 4) {
				let year = parseInt(newval.slice(0, 4));

				if (year > 2100) {
					element.target.value = '2100/';
				} else {
					element.target.value = newval + '/';
				}

				return false;
			}

			if (value.length == 4) {
				let year = parseInt(value.slice(0, 4));

				if (year > 2100) {
					element.target.value = '2100/' + key;
				} else {
					element.target.value = value + '/' + key;
				}

				return false;
			}

			if (
				newval.length == 6 &&
				parseInt(key) > 1
			) {
				element.target.value = value + '0' + key + '/';
				return false;
			}

			if (newval.length == 7) {
				let month = parseInt(newval.slice(5, 7));

				if (month > 12) {
					element.target.value = value.slice(0, 5) + '12/';
				} else {
					element.target.value = newval + '/';
				}

				return false;
			}

			if (value.length == 7) {
				element.target.value = value + '/' + key;
				return false;
			}

			if (newval.length == 10) {
				let day = parseInt(newval.slice(8, 10));

				if (day > 31) {
					element.target.value = value.slice(0, 8) + '31';
					return false;
				}
			}

			if (newval.length > 10) {
				return false;
			}
		},

		inputIsDateFormatHyphens(element) {
			let key    = element.key ?? '';
			let target = element.target ?? '';
			let value  = target.value ?? '';
			let newval = value + key;

			if (
				key == 'Backspace' ||
				key == 'Delete'    ||
				key == 'Tab'
			) {
				return true;
			}

			if (!/^[0-9]+$/.test(key)) {
				return false;
			}

			if (newval.length == 4) {
				let year = parseInt(newval.slice(0, 4));

				if (year > 2100) {
					element.target.value = '2100-';
				} else {
					element.target.value = newval + '-';
				}

				return false;
			}

			if (value.length == 4) {
				let year = parseInt(value.slice(0, 4));

				if (year > 2100) {
					element.target.value = '2100-' + key;
				} else {
					element.target.value = value + '-' + key;
				}

				return false;
			}

			if (
				newval.length == 6 &&
				parseInt(key) > 1
			) {
				element.target.value = value + '0' + key + '-';
				return false;
			}

			if (newval.length == 7) {
				let month = parseInt(newval.slice(5, 7));

				if (month > 12) {
					element.target.value = value.slice(0, 5) + '12-';
				} else {
					element.target.value = newval + '-';
				}

				return false;
			}

			if (value.length == 7) {
				element.target.value = value + '-' + key;
				return false;
			}

			if (newval.length == 10) {
				let day = parseInt(newval.slice(8, 10));

				if (day > 31) {
					element.target.value = value.slice(0, 8) + '31';
					return false;
				}
			}

			if (newval.length > 10) {
				return false;
			}
		},

		gotoBackOffice() {
			window.open('https://backoffice.shuftipro.com/reports');
		}
	}
};

</script>

<template>
	<Transition name="slide-fade">
		<div v-if="cookie_cookie" id="cookie_banner">
			<p class="fs20 bold">
				We value your privacy
			</p>

			<p class="mt10 fs16 max-width-lg">
				This site uses cookies for essential functionality and core features needed to support website navigation. Clicking "Accept" indicates that you agree to the use of these technologies on your device. Please close this website if your do not agree.
			</p>

			<button class="btn btn-sm btn-success width-150 mt20" @click="acceptCookie">
				Accept All
			</button>
		</div>
	</Transition>

	<div
		v-if="
			this.$root.bearer_token && 
			this.verified == 1 &&
			this.admin_approved == 1
		"
		:style="{ '--sidebarWidth': sidebarWidth }"
		@click="triggerMenu"
	>
		<div 
			v-if="
				this.role == 'user' || 
				this.role == 'test-user'
			" 
			class="dashboard-container"
		>
			<UserSidebar v-if="this.sidebar_cookie != 'in'" ></UserSidebar>
			<UserSidebarMini v-else></UserSidebarMini>

			<div class="sidebar-buffer"></div>

			<div id="right-side">
				<div id="header">
					<div></div>
					<div class="float-right">
						<div class="form-group">
							<Transition name="slide-fade">
								<div v-if="this.menu_open">
									<UserDropDownMenu></UserDropDownMenu>
								</div>
							</Transition>

							<h6 class="m0" id="user-menu-trigger">
								<AvatarBadge
									:url="avatar_url" 
									:role="role" 
									:kyc="kyc_status"
								>
								</AvatarBadge>
								{{ 
									this.pii.first_name != '' 
										? (
											this.pii.first_name.length > 25
												? this.pii.first_name.substring(0, 23) + '..'
												: this.pii.first_name
										)
										: (
											this.email.length > 25
												? this.email.substring(0, 23) + '..'
												: this.email
										)
								}}
								<i v-if="alert_notification" class="fa fa-bell fs13 text-red alert-notification pointer-none"></i>
								<i class="fa fa-chevron-down ml5 pointer-none"></i>
							</h6>
						</div>
					</div>
				</div>

				<div class="header-buffer"></div>

				<div 
					v-if="
						warning &&
						!this.$route.name.includes('Warnings')
					"
				>
					<div id="warning-banner" class="pointer" @click="routeTo('/u/warnings')">
						<div class="warning-banner-inner">
							<div class="warning-banner-icon">
								<i v-if="warning.type == 'warning'" class="fa fa-warning fs20"></i>
								<i v-else-if="warning.type == 'probation'" class="fa fa-times-circle fs20"></i>
								<img v-else-if="warning.type == 'suspension'" class="skull" src="@/assets/images/skull-crossbones-solid.svg">
							</div>
							<div class="warning-banner-content">
								<span>
									{{
										this.$root.formatString(
											warning.message, 
											parseInt(inner_width / 100 * 9)
										)
									}}
								</span>
							</div>
						</div>
					</div>

					<div class="warning-banner-buffer"></div>
				</div>

				<div
					v-if="
						!this.$route.name.includes('Notifications') &&
						!suspension
					"
					v-for="notification in notifications"
				>
					<div class="notification-banner">
						<div
							class="notification-banner-inner"
							:class="
								'notification-banner-'+notification.type
							"
						>
							<div class="notification-banner-icon">
								<Popper hover arrow placement="right" class="fs11" :content="notification.title">
									<i v-if="notification.type == 'error'" class="fa fa-times-circle fs20"></i>
									<i v-else-if="notification.type == 'warning'" class="fa fa-warning fs20"></i>
									<i v-else-if="notification.type == 'question'" class="fa fa-question-circle fs20"></i>
									<i v-else-if="notification.type == 'info'" class="fa fa-info fs20"></i>
								</Popper>
							</div>
							<div class="notification-banner-content">
								<span>
									{{
										this.$root.formatString(
											notification.message, 
											parseInt(inner_width / 100 * 9)
										)
									}}
									&ensp;
									<span
										v-if="notification.cta != ''"
										class="underline bold pointer fs11"
										@click="openLink(notification.cta)"
									>
										Learn More
									</span>
								</span>
							</div>
							<div
								v-if="notification.dismissable == 1" 
								class="notification-banner-btn"
							>
								<button 
									class="btn-sm fs11 m0"
									@click="dismiss_notification(notification.notification_id)" 
								>
									Dismiss
								</button>
							</div>
						</div>
					</div>

					<div class="notification-banner-buffer"></div>
				</div>

				<div 
					v-if="
						suspension && 
						!this.$route.name.includes('Account')
					" 
					class="router-view-wrap"
				>
					<Suspended></Suspended>
				</div>

				<div v-else class="router-view-wrap">
					<router-view></router-view>
				</div>
			</div>
		</div>

		<div 
			v-else-if="
				this.role == 'admin' ||
				this.role == 'sub-admin'
			" 
			class="dashboard-container"
		>
			<AdminSidebar v-if="this.sidebar_cookie != 'in'" ></AdminSidebar>
			<AdminSidebarMini v-else></AdminSidebarMini>

			<div class="sidebar-buffer"></div>

			<div id="right-side">
				<div id="header">
					<div></div>
					<div class="float-right">
						<div class="form-group">
							<Transition name="slide-fade">
								<div v-if="this.menu_open">
									<AdminDropDownMenu></AdminDropDownMenu>
								</div>
							</Transition>

							<h6 class="m0" id="user-menu-trigger">
								<AvatarBadge
									:url="avatar_url" 
									:role="role" 
									:kyc="kyc_status"
								>
								</AvatarBadge>
								{{ 
									this.pii.first_name != '' 
										? (
											this.pii.first_name.length > 25
												? this.pii.first_name.substring(0, 23) + '..'
												: this.pii.first_name
										)
										: (
											this.email.length > 25
												? this.email.substring(0, 23) + '..'
												: this.email
										)
								}}
								<i v-if="alert_notification" class="fa fa-bell fs13 text-red alert-notification pointer-none"></i>
								<i class="fa fa-chevron-down ml5 pointer-none"></i>
							</h6>
						</div>
					</div>
				</div>

				<div class="header-buffer"></div>

				<div
					v-if="!this.$route.name.includes('Notifications')"
					v-for="notification in notifications"
				>
					<div class="notification-banner">
						<div
							class="notification-banner-inner"
							:class="
								'notification-banner-'+notification.type
							"
						>
							<div class="notification-banner-icon">
								<Popper hover arrow placement="right" class="fs11" :content="notification.title">
									<i v-if="notification.type == 'error'" class="fa fa-times-circle fs20"></i>
									<i v-else-if="notification.type == 'warning'" class="fa fa-warning fs20"></i>
									<i v-else-if="notification.type == 'question'" class="fa fa-question-circle fs20"></i>
									<i v-else-if="notification.type == 'info'" class="fa fa-info fs20"></i>
								</Popper>
							</div>
							<div class="notification-banner-content">
								<span>
									{{
										this.$root.formatString(
											notification.message, 
											parseInt(inner_width / 100 * 9)
										)
									}}
									&ensp;
									<span
										v-if="notification.cta != ''"
										class="underline bold pointer fs11"
										@click="openLink(notification.cta)"
									>
										Learn More
									</span>
								</span>
							</div>
							<div
								v-if="notification.dismissable == 1" 
								class="notification-banner-btn"
							>
								<button 
									class="btn-sm fs11 m0"
									@click="dismiss_notification(notification.notification_id)" 
								>
									Dismiss
								</button>
							</div>
						</div>
					</div>

					<div class="notification-banner-buffer"></div>
				</div>

				<div class="router-view-wrap">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>

	<div v-else>
		<router-view></router-view>
	</div>

	<div id="mfaModal">
		<div class="izi-padding">
			<p class="op6">
				<i class="fa fa-user"></i>
				<span> Multi-factor Authentication Requested</span>
			</p>
			<hr>
			<h5>Enter Your MFA Code</h5>
			<p class="op7 fs14">
				This code may occasionally take 1 to 2 minutes to arrive.
			</p>
			<div class="form-group pt10">
				<label for="usr">Code</label>
				<input id="input-mfaModal" type="text" class="form-control form-control-sm transform-uppercase">
				<button id="button-mfaModal" class="btn btn-success btn-sm mt10 text-light">Login</button>
			</div>
		</div>
	</div>

	<div id="newdeviceModal">
		<div class="izi-padding">
			<p class="op6">
				<i class="fa fa-user"></i>
				<span> Device not recognized. Multi-factor Authentication Requested</span>
			</p>
			<hr>
			<h6>
				An authentication code has been sent to your email address. Please enter it here.
			</h6>
			<p class="op7 fs14">
				This code may occasionally take 1 to 2 minutes to arrive.
			</p>
			<div class="form-group pt10">
				<label for="">Code</label>
				<input id="input-newdeviceModal" type="text" class="form-control form-control-sm transform-uppercase">
				<button id="button-newdeviceModal" class="btn btn-success btn-sm mt10 text-light">Login</button>
			</div>
		</div>
	</div>

</template>

<style>

router-link {
	border: 1px solid #b4b4b4;
	background-color: white;
	padding: 10px;
}

h1,h2,h3,h4,h5,h6,p {
	margin: 0;
	letter-spacing: 0.03em;
}

i {
	margin-right: 7px;
}

#cookie_banner {
	z-index: 11;
	position: fixed;
	width: 100%;
	height: 200px; 
	left: 0; 
	bottom: 0; 
	display: flex; 
	flex-direction: column; 
	justify-content: center; 
	background-color: #191919; 
	color: #f0f0f0; 
	padding: 25px 45px;
	transition: .3s ease;
}

.clip-loader-inline {
	text-align: left;
	display: inline-block;
}

.btn-inline {
	display: inline-block;
	width: 140px;
	margin-left: 10px;
}

.btn-sm,
.btn {
	font-weight: bold;
	letter-spacing: 0.03em;
	padding-left: 15px;
	padding-right: 15px;
}

.letter-spacing-03 {
	letter-spacing: 0.03em;
}

.inline {
	display: inline-block;
}

.width-minus-150 {
	width: calc(100% - 150px);
	display: inline-block;
}

.nostyle:hover,
.nostyle:focus,
.nostyle:visited,
.nostyle {
	color: inherit;
	text-decoration: none;
	font-size: inherit;
	font-weight: inherit;
}

.z2 { z-index: 2; }
.z3 { z-index: 3; position: relative; }

.bold { font-weight: bold; }

.underline {
	text-decoration: underline;
	text-underline-position: under;
}

.emphasize {
	font-style: italic;
	font-weight: 200 !important;
	text-decoration: underline;
}

.dashboard-container {
	display: flex;
	flex-direction: row;
	background-color: #fff;
}

.main-dashboard-content-flexwrap {
	display: flex;
	flex-direction: row;
}

.main-dashboard-content {
	width: calc(100% - 250px);
	position: relative;
}

.right-dashboard-content {
	width: 250px;
	position: relative;
}

.pointer { cursor: pointer; }

.pointer-none { pointer-events: none; }

#sidebar {
	z-index: 3;
	position: fixed;
	display: block;
	height: 100vh;
	background-color: #fff;
	width: var(--sidebarWidth);
	margin: 0;
	transition: .2s ease;
	box-shadow: 2px 3px 6px rgba(0,0,0,0.1);
}

#sidebar h4,
#sidebar h6 {
	white-space: nowrap;
}

.sidebar-buffer {
	position: relative;
	display: block;
	height: 100vh;
	width: var(--sidebarWidth);
	transition: .2s ease;
	z-index: -1;
}

.sidebar-row {
	color: #272727;
	margin-top: 10px;
	border-left: .25rem transparent solid;
}

.sidebar-row:hover {
	color: #fff;
	cursor: pointer;
	background-color: #ff2d2e;
}

.backoffice-logo {
	width: 18px;
	height: 18px;
}

.sidebar-row:hover .backoffice-logo {
	filter: brightness(255);
}

.sidebar-logo {
	height: 40px;
	width: auto;
	margin-left: 13px;
	margin-right: 2px;
	margin-top: 0;
	transition: .2s ease;
}

.sidebar-logo-mini {
	height: 30px;
	width: 30px;
	margin-left: 7px;
	transition: .2s ease;
}

#right-side {
	display: block;
	position: relative;
	margin: 0; padding: 0;
	max-width: calc(100% - var(--sidebarWidth));
	width: 100%;
	transition: .2s ease;
}

#header {
	position: fixed;
	height: 60px;
	width: calc(100vw - var(--sidebarWidth));
	border-bottom: 1px solid #e1e3e6;
	margin: 0;
	padding-left: 20px;
	padding-right: 20px;
	background-color: #fff;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	transition: .2s ease;
	box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
	z-index: 2;
}

.expand-sidebar {
	position: absolute;
	width: 28px;
	height: 28px;
	border-radius: 15px;
	border: 2px solid #ff2d2e;
	background-color: #fff;
	color: #272727;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	font-size: 18px;
	z-index: 12;
	left: 40px;
	top: 23px;
	cursor: pointer;
	transition: .2s ease;
}

.retract-sidebar {
	position: absolute;
	width: 28px;
	height: 28px;
	border-radius: 15px;
	border: 2px solid #ff2d2e;
	background-color: #fff;
	color: #272727;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	font-size: 18px;
	z-index: 12;
	left: 230px;
	top: 23px;
	cursor: pointer;
	transition: .2s ease;
}

.retract-sidebar:hover,
.expand-sidebar:hover {
	color: #ff2d2e;
	transition: .2s ease;
}

.header-buffer {
	display: block;
	width: 100%;
	height: 60px;
}

.form-group {
	position: relative;
}

#user-menu-trigger {
	font-weight: bold;
	cursor: pointer;
	font-size: 14px;
	position: relative;
}

#warning-banner {
	position: fixed;
	width: calc(100% - var(--sidebarWidth));
	height: 65px;
	right: 0;
	z-index: 1;
	border-bottom: 3px solid #ff2d2e;
	background: #ffdfe0;
}

.warning-banner-inner {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
}

.warning-banner-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 85px;
}

.warning-banner-content {
	padding-right: 10px;
	color: #000;
	font-weight: bold;
	font-size: 14px;
	line-height: 17px;
	height: 100%;
	width: calc(100% - 85px);
	display: flex;
	align-items: center;
	overflow: hidden;
}

.warning-banner-buffer {
	display: block;
	width: 100%;
	height: 65px;
}

.skull {
	fill: #fff;
	width: 25px;
	height: 25px;
}

.notification-banner {
	position: fixed;
	width: calc(100% - var(--sidebarWidth));
	height: 65px;
	right: 0;
	background-color: #fff;
	z-index: 1;
}

.notification-banner-inner {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
}

.notification-banner-error {
	border-bottom: 3px solid #ff2d2e;
	background: #ffdfe0;
}

.notification-banner-warning {
	border-bottom: 3px solid #ffc107;
	background: #fff6da;
}

.notification-banner-info {
	border-bottom: 3px solid #3347f0;
	background: #e0e3fd;
}

.notification-banner-question {
	border-bottom: 3px solid #3edc64;
	background: #d5f6de;
}

.notification-banner-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 85px;
}

.notification-banner-content {
	padding-right: 10px;
	color: #000;
	font-size: 14px;
	line-height: 17px;
	height: 100%;
	width: calc(100% - 85px - 65px);
	display: flex;
	align-items: center;
	overflow: hidden;
}

.notification-banner-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 65px;
	padding-right: 20px;
}

.notification-banner-info button {
	background-color: #3347f0;
	color: #fff;
	padding: 4px 9px;
	border: none;
	border-radius: 3px;
	transition: .2s ease
}

.notification-banner-info button:hover {
	transition: .2s ease;
	filter: brightness(1.1);
}

.notification-banner-warning button {
	background-color: #ffc107;
	color: #111;
	padding: 4px 9px;
	border: none;
	border-radius: 3px;
	transition: .2s ease
}

.notification-banner-warning button:hover {
	transition: .2s ease;
	filter: brightness(1.1);
}

.notification-banner-error button {
	background-color: #ff2d2e;
	color: #fff;
	padding: 4px 9px;
	border: none;
	border-radius: 3px;
	transition: .2s ease
}

.notification-banner-error button:hover {
	transition: .2s ease;
	filter: brightness(1.1);
}

.notification-banner-question button {
	background-color: #3edc64;
	color: #000;
	padding: 4px 9px;
	border: none;
	border-radius: 3px;
	transition: .2s ease
}

.notification-banner-question button:hover {
	transition: .2s ease;
	filter: brightness(1.1);
}

.notification-banner-buffer {
	display: block;
	width: 100%;
	height: 65px;
}

.alert-notification {
	position: absolute;
	left: -15px; top: -3px;
}

.line-height-45 {
	line-height: 45px;
}

.top-banner {
	height: 55px;
	/*border-bottom: 1px solid #e1e3e6;*/
	font-size: 16px;
	padding-left: 20px;
	display: flex;
	align-items: center;
}

.router-view-wrap {
	position: relative;
	padding-bottom: 100px;
	padding-left: 10px;
	padding-right: 10px;
}

.float-right {
	float: right;
}

.form-control,
.btn {
	border-radius: 3px;
}

.btn-neutral {
	border: 1px solid #b4b4b4;
	background-color: white;
	margin: 3px;
}

.div-disabled {
	opacity: 0.35;
	pointer-events: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.btn-black {
	border: 1px solid #b4b4b4;
	/*margin: 3px;*/
	color: #f1f3f6;
	background-color: #333;
}

.btn-black:hover,
.btn-black:focus,
.btn-black:active {
	color: #fff;
	background-color: #000;
}

#mfaModal,
#newdeviceModal {
	display: none;
}

.spa-tab {
	height: 100%;
	border-bottom: 3px solid transparent;
	display: flex; align-items: flex-end;
	font-weight: bold;
	padding-bottom: 5px;
	margin-right: 30px;
}

.spa-tab-active {
	border-bottom: 3px solid #ff2d2e;
}

.spa-tab:hover {
	cursor: pointer;
	border-bottom: 3px solid #ff2d2e;
	color: #000;
}


.fs10 { font-size: 10px; }
.fs11 { font-size: 11px; }
.fs12 { font-size: 12px; }
.fs13 { font-size: 13px; }
.fs14 { font-size: 14px; }
.fs15 { font-size: 15px; }
.fs16 { font-size: 16px; }
.fs17 { font-size: 17px; }
.fs18 { font-size: 18px; }
.fs19 { font-size: 19px; }
.fs20 { font-size: 20px; }
.fs22 { font-size: 22px; }
.fs24 { font-size: 24px; }
.fs26 { font-size: 26px; }
.fs30 { font-size: 30px; }
.fs40 { font-size: 40px; }

.plr20 { padding-left: 20px; padding-right: 20px; }
.plr30 { padding-left: 30px; padding-right: 30px; }
.plr50 { padding-left: 50px; padding-right: 50px; }

.p0 { padding: 0; }
.p5 { padding: 5px; }
.p7 { padding: 7px; }
.p10 { padding: 10px; }
.p15 { padding: 15px; }
.p20 { padding: 20px; }
.p25 { padding: 25px; }
.p30 { padding: 30px; }
.p40 { padding: 40px; }
.p50 { padding: 50px; }
.p60 { padding: 60px; }
.p80 { padding: 80px; }
.p100 { padding: 100px; }

.pt0 { padding-top: 0; }
.pt5 { padding-top: 5px; }
.pt10 { padding-top: 10px; }
.pt15 { padding-top: 15px; }
.pt20 { padding-top: 20px; }
.pt25 { padding-top: 25px; }
.pt30 { padding-top: 30px; }
.pt40 { padding-top: 40px; }
.pt50 { padding-top: 50px; }
.pt60 { padding-top: 60px; }
.pt80 { padding-top: 80px; }
.pt100 { padding-top: 100px; }
.pt200 { padding-top: 200px; }

.pb0 { padding-bottom: 0; }
.pb5 { padding-bottom: 5px; }
.pb10 { padding-bottom: 10px; }
.pb15 { padding-bottom: 15px; }
.pb20 { padding-bottom: 20px; }
.pb25 { padding-bottom: 25px; }
.pb30 { padding-bottom: 30px; }
.pb40 { padding-bottom: 40px; }
.pb50 { padding-bottom: 50px; }
.pb60 { padding-bottom: 60px; }
.pb80 { padding-bottom: 80px; }
.pb100 { padding-bottom: 100px; }

.pl0 { padding-left: 0; }
.pl2 { padding-left: 2px; }
.pl5 { padding-left: 5px; }
.pl8 { padding-left: 8px; }
.pl10 { padding-left: 10px; }
.pl15 { padding-left: 15px; }
.pl20 { padding-left: 20px; }
.pl25 { padding-left: 25px; }
.pl30 { padding-left: 30px; }
.pl40 { padding-left: 40px; }
.pl50 { padding-left: 50px; }
.pl60 { padding-left: 60px; }
.pl80 { padding-left: 80px; }
.pl100 { padding-left: 100px; }

.pr0 { padding-right: 0; }
.pr5 { padding-right: 5px; }
.pr10 { padding-right: 10px; }
.pr15 { padding-right: 15px; }
.pr20 { padding-right: 20px; }
.pr25 { padding-right: 25px; }
.pr30 { padding-right: 30px; }
.pr40 { padding-right: 40px; }
.pr50 { padding-right: 50px; }
.pr60 { padding-right: 60px; }
.pr80 { padding-right: 80px; }
.pr100 { padding-right: 100px; }

.m0 { margin: 0; }
.m5 { margin: 5px; }
.m10 { margin: 10px; }
.m15 { margin: 15px; }
.m20 { margin: 20px; }
.m25 { margin: 25px; }
.m30 { margin: 30px; }
.m40 { margin: 40px; }
.m50 { margin: 50px; }
.m60 { margin: 60px; }
.m80 { margin: 80px; }
.m100 { margin: 100px; }

.mt0 { margin-top: 0; }
.mt4 { margin-top: 4px; }
.mt5 { margin-top: 5px; }
.mt6 { margin-top: 6px; }
.mt7 { margin-top: 7px; }
.mt8 { margin-top: 8px; }
.mt10 { margin-top: 10px; }
.mt15 { margin-top: 15px; }
.mt20 { margin-top: 20px; }
.mt25 { margin-top: 25px; }
.mt30 { margin-top: 30px; }
.mt40 { margin-top: 40px; }
.mt50 { margin-top: 50px; }
.mt60 { margin-top: 60px; }
.mt80 { margin-top: 80px; }
.mt100 { margin-top: 100px; }

.mb0 { margin-bottom: 0; }
.mb5 { margin-bottom: 5px; }
.mb10 { margin-bottom: 10px; }
.mb15 { margin-bottom: 15px; }
.mb20 { margin-bottom: 20px; }
.mb25 { margin-bottom: 25px; }
.mb30 { margin-bottom: 30px; }
.mb40 { margin-bottom: 40px; }
.mb50 { margin-bottom: 50px; }
.mb60 { margin-bottom: 60px; }
.mb80 { margin-bottom: 80px; }
.mb100 { margin-bottom: 100px; }

.ml0 { margin-left: 0; }
.ml2 { margin-left: 2px; }
.ml5 { margin-left: 5px; }
.ml10 { margin-left: 10px; }
.ml15 { margin-left: 15px; }
.ml20 { margin-left: 20px; }
.ml25 { margin-left: 25px; }
.ml30 { margin-left: 30px; }
.ml40 { margin-left: 40px; }
.ml50 { margin-left: 50px; }
.ml60 { margin-left: 60px; }
.ml80 { margin-left: 80px; }
.ml100 { margin-left: 100px; }

.mr0 { margin-right: 0; }
.mr2 { margin-right: 2px; }
.mr5 { margin-right: 5px; }
.mr10 { margin-right: 10px; }
.mr15 { margin-right: 15px; }
.mr20 { margin-right: 20px; }
.mr25 { margin-right: 25px; }
.mr30 { margin-right: 30px; }
.mr40 { margin-right: 40px; }
.mr50 { margin-right: 50px; }
.mr60 { margin-right: 60px; }
.mr80 { margin-right: 80px; }
.mr100 { margin-right: 100px; }

.op1 { opacity: 0.1; }
.op2 { opacity: 0.2; }
.op3 { opacity: 0.3; }
.op4 { opacity: 0.4; }
.op5 { opacity: 0.5; }
.op6 { opacity: 0.6; }
.op7 { opacity: 0.7; }
.op8 { opacity: 0.8; }
.op9 { opacity: 0.9; }
.op10 { opacity: 1; }

.white { color: white; }
.black { color: #272727; }

.x-close {
	font-size: 30px;
	line-height: 13px;
	cursor: pointer;
}

.bg-blue { background-color: #ff2d2e; }
.bg-green { background-color: #ff2d2e; }

.text-green { color: #3edc64; }
.text-yellow { color: #ffc107; }
.text-red { color: #ff2d2e; }
.text-blue { color: #3347f0; }

input,
select {
	letter-spacing: 0.03em;
}

.selected-nav {
	color: #ff2d2e;
	border-left: .25rem #ff2d2e solid;
}

.select-with-copy {
	width: calc(100% - 50px);
}

.card {
	border-radius: 1px;
	border: solid 1px #e0e0e0;
	padding: 0;
	box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
}

.card-title {
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 15px;
	padding-bottom: 15px;
	border-bottom: 1px solid #eaebec;
	font-weight: bold;
}

.card-body {
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 15px;
	padding-bottom: 15px;
}

.perk-card {
	position: relative;
	height: 168px;
	width: 440px;
	padding: 10px;
	border-radius: 1px;
	border: solid 1px #e0e0e0;
	box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
	display: flex; flex-direction: row;
	overflow: hidden;
	cursor: pointer;
	transition: .2s ease;
}

.perk-card:hover {
	transition: .2s ease;
	box-shadow: 0px 3px 12px rgba(0,0,0,0.1);
}

.perk-card-image {
	width: 148px;
	height: 148px;
	background-color: #D3D3D3;
	position: relative;
}

.perk-card-image img {
	width: 100%;
	height: 100%;
	border-radius: 5px;
}

.perk-card-body {
	width: calc(100% - 148px);
	padding-left: 10px;
	padding-right: 10px;
	color: #789;
	font-size: 14px;
}

.scroll-400 {
	height: 400px;
	overflow-y: scroll;
}

.scroll-300 {
	height: 300px;
	overflow-y: scroll;
}

.scroll-200 {
	height: 200px;
	overflow-y: scroll;
}

.scroll-h {
	overflow-x: scroll;
}

.float-vertical {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.min-height-400 {
	height: 400px;
}

.min-height-200 {
	min-height: 200px;
}

.height-200 {
	height: 200px;
	/*min-height: 200px;*/
}

.height-100 {
	height: 100px;
}

.min-card-height {
	min-height: 140px;
}

.dataTables_filter {
	float: right;
}

.table {
	width: 100% !important;
}

.table-header {
	border-bottom: solid 1px #eaebec;
	padding: 0;
	height: 55px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding-left: 15px;
	padding-right: 15px;
}

.ag-root-wrapper {
	border: none !important;
}

.table-card {
	height: 450px;
}

.width-22 {
	width: 22px;
}

.width-200 {
	width: 200px;
}

.max-width-200 {
	max-width: 200px;
}

.max-width-300 {
	max-width: 300px;
}

.max-width-400 {
	max-width: 400px;
}

.max-width-500 {
	max-width: 550px;
}

.max-width-700 {
	max-width: 700px;
}

.max-width-lg {
	max-width: 1140px;
}

.width-150 {
	width: 150px;
}

.inline-span {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.transform-uppercase {
	text-transform: uppercase;
}

.go-back {
	font-weight: bold;
	display: inline-block;
	cursor: pointer;
	padding-top: 5px;
	padding-right: 7px;
	padding-bottom: 5px;
}

.go-back:hover {
	color: #000;
}

.go-back2 {
	color: white;
	font-weight: bold;
	display: inline-block;
	cursor: pointer;
	padding-top: 5px;
	padding-right: 7px;
	padding-bottom: 5px;
}

.go-back2:hover {
	color: #e0e0e0;
}

.avatar-block {
	position: relative;
	height: 60px;
	display: flex;
	flex-direction: row;
}

.avatar-block-img {
	width: 60px;
	height: 60px;
}

.avatar-block-img img {
	height: 100%;
	width: auto;
	border-radius: 5px;
	box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
	cursor: pointer;
}

.tiny-img {
	width: 15px;
	height: 15px;
}

.tiny-img2 {
	width: 21px;
	height: 21px;
}

.avatar-block-content {
	padding-left: 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.mobile-avatar {
	width: 22px;
	height: auto;
	margin-right: 4px;
	margin-bottom: 2px;
	border-radius: 10px;
	box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
	border: 2px solid #e0e0e0;
}

.align-right {
	text-align: right;
}

.short-icon-end {
	width: calc(100% - 35px);
	display: inline-block;
	margin-right: 10px;
}

.flex-center {
	display: flex;
	justify-content: center;
}

.slide-fade-enter-active {
	transition: all 0.17s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.17s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateY(-12px);
	opacity: 0;
}

#removeTagModal,
#addCodeModal,
#removeAllCodesModal,
#banUserModal,
#resetPasswordModal {
	display: none;
}

.izi-padding {
	padding: 25px 30px;
}

.modal-container {
	position: relative;
	z-index: 1000;
	width: 100%;
	max-width: 400px;
	height: auto;
	border-radius: 5px;
	padding: 25px 30px;
	background-color: #fff;
	box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
}

.vue-neat-modal-backdrop {
	z-index: 3;
}

.vue-neat-modal-wrapper {
	z-index: 4;
}

.modal-container h5 {
	border-bottom: 1px solid #ddd;
	font-size: 18px;
	font-weight: bold;
}

.progress-bar-wrap {
	width: 100%;
	height: 23px;
	background-color: #cacbcc;
	border-radius: 8px;
	margin-top: 3px;
	position: relative;
	display: flex;
	align-items: center;
}

.progress-bar-wrap p {
	position: absolute;
	font-size: 13px;
	font-weight: bold;
	z-index: 2;
	margin: 0;
	padding: 0;
	text-align: center;
	width: 100%;
	color: #fff;
}

.progress-bar {
	width: 0;
	height: 23px;
	background-color: #ff2d2e;
	border-radius: 8px;
}

@media all and (max-width: 991px) {
	.top-banner {
		width: 100%;
		overflow-x: scroll;
		padding-bottom: 10px;
	}

	.top-banner div {
		white-space: nowrap;
	}
}

@media all and (max-width: 767px) {
	.fs40 {
		font-size: 30px;
	}

	#cookie_banner {
		height: 300px;
		padding: 25px 25px;
	}
}

</style>