<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import DefaultAvatarUrl from '@/assets/images/avatar.svg';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';
import LoginFooter from '../../Login/LoginFooter.vue';

import '../../Login/login.css';
import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal,
		LoginFooter
	},

	data() {
		return {
			loading:    true,
			hash:       this.$route.params.hash ?? '',
			email:      this.$route.query.email ?? '',
			existing:   false,
			password:   '',
			password2:  '',
			pseudonym:  '',
			telegram:   '',
			first_name: '',
			last_name:  '',

			password_hidden:  true,
			password2_hidden: true,
			min8chars:        false,
			onenumber:        false,
			specialchar:      false
		}
	},

	created() {
		this.checkHash();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async checkHash() {
			const response = await api(
				'GET',
				'admin/team-invite-check-hash',
				{
					hash: this.hash
				}
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				if (response.message == 'existing') {
					this.existing = true;
				}

				this.loading = false;
			} else {
				this.$root.routeTo('/');
			}
		},

		async submit() {
			if (!this.existing) {
				if (this.password != this.password2) {
					this.$root.toast(
						'',
						'Passwords do not match',
						'warning'
					);
					return;
				}

				if (
					!this.min8chars ||
					!this.onenumber ||
					!this.specialchar
				) {
					this.$root.toast(
						'',
						'Password do not meet minimum complexity requirements',
						'warning'
					);
					return;
				}
			}

			this.password_hidden  = true;
			this.password2_hidden = true;
			this.loading          = true;

			const response = await api(
				'POST',
				'admin/accept-team-invite',
				{
					hash:       this.hash,
					password:   this.password,
					pseudonym:  this.pseudonym,
					telegram:   this.telegram,
					first_name: this.first_name,
					last_name:  this.last_name
				}
			);

			if (response.status == 200) {
				// console.log(response);
				// this.loading = false;
				this.$root.bearer_token = response.message;
				this.$cookies.set('bearer_token', this.$root.bearer_token);
				window.location.href = '/a/dashboard';
			} else {
				this.loading = false;
				this.$root.toast(
					'',
					response.message,
					'error'
				);
			}
		},

		checkPassword() {
			if (this.password.length >= 8) {
				this.min8chars = true;
			} else {
				this.min8chars = false;
			}

			let number_pattern = /([0-9])+/g;

			if (number_pattern.test(this.password)) {
				this.onenumber = true;
			} else {
				this.onenumber = false;
			}

			let special_pattern = /\W|_/g;

			if (special_pattern.test(this.password)) {
				this.specialchar = true;
			} else {
				this.specialchar = false;
			}
		},

		checkTelegram() {
			if (this.telegram.length > 0) {
				if (this.telegram.charAt(0) != '@') {
					this.telegram = '@' + this.telegram;
				}
			}
		},
	},

	watch: {
		password: 'checkPassword',
		telegram: 'checkTelegram'
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
					<label>Welcome to the Casper Association Portal</label>
					<p>You have been invited to join as an administrative team member.</p>

					<div class="form-group pt10 login-form">
						<form @submit.prevent v-if="existing">
							<div class="row">
								<div class="col-sm-12">
									<label class="fs16 op6 ml10 mb10">
										{{ email }}
									</label>
								</div>
								<div class="col-sm-12">
									<button class="btn btn-success mt20" @click="submit">
										Accept Invitation
									</button>
								</div>
							</div>
						</form>
						<form @submit.prevent v-else>
							<div class="row">
								<div class="col-sm-12">
									<label class="fs16 op6 ml10 mb10">
										{{ email }}
									</label>
								</div>
								<div class="col-sm-6">
									<input v-model="first_name" class="form-control mt20" type="text" placeholder="First Name *">
								</div>
								<div class="col-sm-6">
									<input v-model="last_name" class="form-control mt20" type="text" placeholder="Last Name *">
								</div>
								<div class="col-sm-6">
									<input v-model="pseudonym" class="form-control mt20" type="text" placeholder="Pseudonym *">
								</div>
								<div class="col-sm-6">
									<input v-model="telegram" class="form-control mt20" type="text" placeholder="Telegram">
								</div>

								<div class="col-sm-12">
									<div v-if="password_hidden" class="mt20">
										<input v-model="password" class="form-control short-icon-end" type="password" placeholder="Password *">
										<img src="@/assets/images/eyeclosed.png" class="tiny-img pointer" @click="password_hidden = false">
									</div>
									<div v-else class="mt20">
										<input v-model="password" class="form-control short-icon-end" type="text" placeholder="Password *">
										<img src="@/assets/images/eye.png" class="tiny-img pointer" @click="password_hidden = true">
									</div>

									<div v-if="password2_hidden" class="mt20">
										<input v-model="password2" class="form-control short-icon-end" type="password" placeholder="Confirm Password *">
										<img src="@/assets/images/eyeclosed.png" class="tiny-img pointer" @click="password2_hidden = false">
									</div>
									<div v-else class="mt20">
										<input v-model="password2" class="form-control short-icon-end" type="text" placeholder="Confirm Password *">
										<img src="@/assets/images/eye.png" class="tiny-img pointer" @click="password2_hidden = true">
									</div>

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

									<button class="btn btn-success mt20" @click="submit">
										Accept Invitation
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<LoginFooter></LoginFooter>
	</div>
</template>

<style scoped>



</style>