<script>

import { api } from '../api.js';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

export default {
	data() {
		return {
			inputNewPassword1: '',
			inputNewPassword2: '',
			token:             '',
			loading:           false,
			min8chars:         false,
			onenumber:         false,
			specialchar:       false,
			hash_valid:        false
		}
	},

	components: {
		ClipLoader
	},

	created() {
	},

	mounted() {
		let that   = this;
		this.token = this.$route.query.token;

		if (this.token) {
			this.loading = true;
			this.verifyToken();
		}
	},

	methods: {
		gotoLogin() {
			this.$root.routeTo('/login');
		},

		checkNewPassword() {
			if (this.inputNewPassword1.length >= 8) {
				this.min8chars = true;
			} else {
				this.min8chars = false;
			}

			let number_pattern = /([0-9])+/g;

			if (number_pattern.test(this.inputNewPassword1)) {
				this.onenumber = true;
			} else {
				this.onenumber = false;
			}

			let special_pattern = /\W|_/g;

			if (special_pattern.test(this.inputNewPassword1)) {
				this.specialchar = true;
			} else {
				this.specialchar = false;
			}
		},

		async verifyToken() {
			const response = await api(
				'POST',
				'user/verify-set-password',
				{
					hash: this.token
				},
				this.bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.hash_valid = true;
				this.loading    = false;
			} else {
				this.$root.routeTo('/login');
			}
		},

		async submitReset() {
			if (
				!this.inputNewPassword1 ||
				this.inputNewPassword1 == ''
			) {
				this.$root.toast('Password', 'Please enter a new password', 'info');
				return;
			}

			if (this.inputNewPassword1 != this.inputNewPassword2) {
				this.$root.toast('Password', 'Passwords do not match', 'warning');
				return;
			}

			if (!this.min8chars || !this.onenumber || !this.specialchar) {
				this.$root.toast('Password', 'New password does not meet complexity requirements', 'warning');
				return;
			}

			this.loading = true;

			const response = await api(
				'POST',
				'user/set-password',
				{
					hash:         this.token,
					new_password: this.inputNewPassword1
				},
				this.bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				// console.log('ROUTE TO DASH');this.loading = false;

				this.$root.bearer_token   = response.detail.bearer;
				this.$root.session_cookie = response.detail.cookie;

				this.$cookies.set('bearer_token', this.$root.bearer_token);
				this.$cookies.set('session_cookie', this.$root.session_cookie);

				this.$root.routeTo('/u/dashboard');
				window.location.reload()
			} else {
				this.loading = false;
				this.$root.toast(
					'',
					response.message,
					'error'
				);
			}
		}
	},

	watch: {
		inputNewPassword1: 'checkNewPassword'
	}
};

</script>

<template>
	<div class="signup-container">
		<div class="checker-top"></div>
		<div class="checker-bottom"></div>

		<div class="signup-box-wrap">
			<div v-if="loading" class="ajax-box">
				<ClipLoader size="45px" color="#ff2d2e"></ClipLoader>
			</div>

			<div v-if="hash_valid" class="login-box">
				<a :href="this.$root.frontend_url" class="nostyle">
					<img src="@/assets/images/logo2.png" class="login-img">
				</a>

				<div class="login-form-wrap">
					<label>Set Your Password</label>
					<p class="pt15 check-circle" :class="{ 'check-circle-active': min8chars }">
						<img v-if="min8chars == true" src="@/assets/images/check-circle-green.svg">
						<img v-else src="@/assets/images/check-circle.svg">
						Min 8 characters
					</p>
					<p class="check-circle" :class="{ 'check-circle-active': onenumber }">
						<img v-if="onenumber == true" src="@/assets/images/check-circle-green.svg">
						<img v-else src="@/assets/images/check-circle.svg">
						1 Number
					</p>
					<p class="check-circle" :class="{ 'check-circle-active': specialchar }">
						<img v-if="specialchar == true" src="@/assets/images/check-circle-green.svg">
						<img v-else src="@/assets/images/check-circle.svg">
						1 Special character
					</p>
					<div class="form-group pt10 login-form">
						<form @submit.prevent>
							<input class="form-control mb5" v-model="inputNewPassword1" type="password" placeholder="New Password" autofocus>
							<input class="form-control mb5 mt20" v-model="inputNewPassword2" type="password" placeholder="Confirm Password">
							<button @click="this.submitReset()" class="btn btn-lime mt10 full-width bold">Set New Password</button>
						</form>
					</div>
				</div>
			</div>

			<div v-else class="container">
				<div class="row">
					<div class="col-sm-12 pt30 plr50 pb30">
						<p class="fs20 bold text-center">
							Activate your account
						</p>

						<p class="mt30">
							Dear Casper Blockchain Validator,
						</p>

						<p class="mt20">
							Our new platform requires members to reset their passwords upon first login to the new system. We emailed you an activation link.
						</p>

						<p class="pt20">
							Thank you for bearing with us, and welcome to the Casper Association Portal.
						</p>

						<div class="login-form-wrap text-center">
							<div class="form-group login-form text-center">
								<form @submit.prevent>
									<button @click="gotoLogin" class="btn btn-lime mt10 width-200 ml5 mr5 bold">Back to login</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

td {
	border-bottom-width: 0;
}

</style>