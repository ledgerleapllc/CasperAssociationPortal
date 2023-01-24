<script>

import { api } from '../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import moment from 'moment';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import LoginFooter from '../Login/LoginFooter.vue';
import '../Login/login.css';

export default {
	data() {
		return {
			loading: false,
			confirmation_code: '',
			able_to_resend: 0,
			delay: 30
		}
	},

	components: {
		ClipLoader,
		LoginFooter
	},

	created() {
	},

	mounted() {
		let that = this;

		setInterval(function() {
			that.able_to_resend += 1;
		},1000);
	},

	methods: {
		async confirmAccount() {
			this.loading = true;

			const response = await api(
				'POST',
				'user/confirm-registration',
				{
					confirmation_code: this.confirmation_code
				},
				this.$root.bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.$root.routeTo('/welcome');
			} else {
				this.$root.toast(
					'Oops',
					'Incorrect confirmation code',
					'error'
				);
				this.loading = false;
			}
		},

		async resendCode() {
			this.loading        = true;
			this.able_to_resend = 0;
			this.$refs['main_input'].focus();

			const response = await api(
				'POST',
				'user/resend-code',
				{},
				this.$root.bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.$root.toast(
					'',
					response.message,
					'success'
				);
				this.loading = false;
			} else {
				this.$root.toast(
					'',
					response.message,
					'warning'
				);
				this.loading = false;
			}
		}
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
				<img src="@/assets/images/logo2.png" class="login-img">

				<div class="login-form-wrap">
					<label>Welcome to Casper Association's Member Portal</label>
					<p>Please enter the confirmation code from your email to verify your account.</p>

					<div class="form-group pt10 login-form">
						<form @submit.prevent>
							<input ref="main_input" class="form-control mb5 width-minus-150" v-model="confirmation_code" type="text" placeholder="Enter verification code" autofocus>
							<button @click="this.resendCode()" class="btn btn-success btn-inline bold" :class="able_to_resend < delay ? 'div-disabled' : ''">
								{{ able_to_resend >= delay ? 'Resend Code' : delay - able_to_resend }}
							</button>

							<button @click="this.confirmAccount()" class="btn btn-success mt10 full-width bold">Confirm and Continue</button>
							<button @click="this.$root.logout()" class="btn btn-success mt10 full-width bold">Logout</button>
						</form>
					</div>
				</div>
			</div>
		</div>

		<LoginFooter></LoginFooter>
	</div>
</template>
