<script>

import App from '../../App.vue';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import LoginFooter from './LoginFooter.vue';
import './login.css';

export default {
	data() {
		return {
			inputNewPassword1: '',
			inputNewPassword2: '',
			email:             '',
			hash:              '',
			loading:           false,
			min8chars:         false,
			onenumber:         false,
			specialchar:       false,
		}
	},

	mounted() {
		this.hash  = this.$route.params.hash;
		this.email = decodeURIComponent(this.$route.query.email);

		if (
			!this.hash || 
			this.hash == '' ||
			!this.email ||
			this.email == '' || (
				this.$root.bearer_token &&
				this.$root.bearer_token != ''
			)
		) {
			console.log('invalid params - reroute to login');
			this.$root.routeTo('login');
		}
	},

	components: {
		ClipLoader,
		LoginFooter
	},

	methods: {
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
			const result = await this.$root.resetPassword(
				this.email, 
				this.hash, 
				this.inputNewPassword1
			);

			if (result) {
				this.loading = false;

				if (result.status == 400) {
					return;
				}

				this.$root.routeTo('/login');
			}
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
		}
	},

	watch: {
		inputNewPassword1: 'checkNewPassword'
	}
};

</script>

<template>
	<div class="login-container">
		<div class="reset-box-wrap">
			<div v-if="loading" class="ajax-box">
				<ClipLoader size="45px" color="#ff2d2e"></ClipLoader>
			</div>

			<div class="login-box">
				<a :href="this.$root.frontend_url" class="nostyle">
					<img src="@/assets/images/logo2.png" class="login-img">
				</a>

				<div class="login-form-wrap">
					<label>Set New Password</label>
					<p>For {{ this.email }}</p>
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
							<button @click="this.submitReset()" class="btn btn-success mt10 full-width bold">Set New Password</button>
						</form>
					</div>
				</div>
			</div>
		</div>

		<LoginFooter></LoginFooter>
	</div>
</template>
