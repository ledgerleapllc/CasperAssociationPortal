<script>

import App from '../../App.vue';
import { api } from '../api.js';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import SignupFooter from '../Login/SignupFooter.vue';
import '../Login/login.css';

export default {
	data() {
		return {
			dev_mode: false,
			loading:  false,
			frontend_url: import.meta.env.VITE_FRONTEND_URL,
			account_type_selection: null,

			form_data: {
				first_name: '',
				last_name: '',
				pseudonym: '',
				email: '',
				email2: '',
				public_key: '',
				agree1: false,
				agree2: false,
				agree3: false,
				phpunittesttoken: ''
			},

			entity_data: {
				entity_name: '',
				entity_type: '',
				registration_number: '',
				registration_country: '',
				tax_id: ''
			},

			countries: [],
			entity_types: [
				'LLC',
				'Corporation',
				'Trust',
				'Foundation',
				'Association',
				'Sole Proprietorship',
				'Other'
			],

			telegram: '',

			password: '',
			password2: '',
			password_hidden: true,
			password2_hidden: true,
			min8chars: false,
			onenumber: false,
			specialchar: false
		}
	},

	mounted() {
		this.getISOCountries();
		this.getDevMode();
	},

	components: {
		ClipLoader,
		SignupFooter
	},

	methods: {
		async getDevMode() {
			const response = await api(
				'GET',
				'public/get-dev-mode',
				{}
			);

			if (response.status == 200) {
				this.dev_mode = response.detail.dev_mode;
			}
		},

		async getISOCountries() {
			this.loading = true;

			const response = await api(
				'GET',
				'public/get-countries',
				{}
			);

			if (response.status == 200) {
				this.loading   = false;
				this.countries = response.detail;
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

		quickFill() {
			let rhash = this.$root.randomHash(8);
			this.form_data.first_name = 'sam';
			this.form_data.last_name  = 'test';
			this.form_data.email      = `sam+${rhash}@ledgerleap.com`;
			this.form_data.email2     = `sam+${rhash}@ledgerleap.com`;
			this.password             = 'Welcome123!';
			this.password2            = 'Welcome123!';
			this.password_hidden      = false;
			this.password2_hidden     = false;
			this.form_data.pseudonym  = `sam_${rhash}`;
			this.telegram             = `sam_${rhash}`;
			this.form_data.agree1     = true;
			this.form_data.agree2     = true;
			this.form_data.agree3     = true;

			this.entity_data.entity_name          = 'pool company';
			this.entity_data.registration_number  = '123abc-000fff';
			this.entity_data.tax_id               = 'T-1234567890';

			// this.form_data.phpunittesttoken = 'phpunittesttoken';

			if (this.$refs['entity_type']) {
				this.$refs['entity_type'].value = 'LLC';
			}

			if (this.$refs['entity_country']) {
				this.$refs['entity_country'].value = 'United States';
			}
		},

		backToTypeSelection() {
			this.entity_data = {
				entity_name: '',
				entity_type: '',
				registration_number: '',
				registration_country: '',
				tax_id: ''
			};

			this.account_type_selection = null;
		},

		async submitForm(event) {
			// console.log(event);
			// console.log(this.form_data);
			let pw  = this.password;
			let pw2 = this.password2;

			if (pw != pw2) {
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

			this.password_hidden  = true;
			this.password2_hidden = true;
			this.loading          = true;

			let obj = {
				account_type: this.account_type_selection,
				first_name:   this.form_data.first_name,
				last_name:    this.form_data.last_name,
				email:        this.form_data.email,
				password:     this.password,
				pseudonym:    this.form_data.pseudonym,
				telegram:     this.telegram,
				validator_id: this.form_data.public_key,
				agree1:       this.form_data.agree1,
				agree2:       this.form_data.agree2,
				subscribe:    this.form_data.agree3,

				// phpunittesttoken: this.form_data.phpunittesttoken
			};

			if (obj.account_type == 'entity') {
				obj.entity_name          = this.entity_data.entity_name;
				obj.entity_type          = this.$refs['entity_type'].value;
				obj.registration_number  = this.entity_data.registration_number;
				obj.registration_country = this.$refs['entity_country'].value;
				obj.tax_id               = this.entity_data.tax_id;
			}

			const response = await api(
				'POST',
				'user/register',
				obj
			);

			if (response.status == 200) {
				// console.log(response.message);
				this.loading              = false;
				this.$root.bearer_token   = response.detail.bearer;
				this.$root.session_cookie = response.detail.cookie;

				this.$cookies.set('bearer_token', this.$root.bearer_token);
				this.$cookies.set('session_cookie', this.$root.session_cookie);

				window.location.reload()
			}

			if (response.status >= 400) {
				this.$root.toast(
					'',
					response.message,
					'error'
				);
				this.loading = false;
			}
		},

		gotoLink(link) {
			window.location.href = `${this.$root.frontend_url}/${link}`;
		}
	},

	watch: {
		password: 'checkPassword',
		telegram: 'checkTelegram'
	}
};

</script>

<template>
	<div class="signup-container">
		<div class="signup-box-wrap">
			<div v-if="loading" class="ajax-box">
				<ClipLoader size="45px" color="#ff2d2e"></ClipLoader>
			</div>

			<div class="login-box">
				<a :href="frontend_url" class="nostyle">
					<img src="@/assets/images/logo2.png" class="login-img">
				</a>

				<div v-if="account_type_selection === null" class="login-form-wrap text-center">
					<label>What type of account are you registering?</label>

					<div class="form-group login-form text-center">
						<form @submit.prevent>
							<button @click="this.account_type_selection = 'individual'" class="btn btn-success mt10 width-200 ml5 mr5 bold">Individual</button>
							<button @click="this.account_type_selection = 'entity'" class="btn btn-success mt10 width-200 ml5 mr5 bold">Entity</button>
						</form>
					</div>
				</div>

				<div v-else-if="account_type_selection === 'individual'" class="login-form-wrap">
					<p class="mb20">
						<span class="pointer" @click="backToTypeSelection">
							<i class="fa fa-arrow-left pointer"></i>
							Back
						</span>
					</p>

					<label>New Individual User</label>
					<p>Fill the form to register</p>

					<div class="form-group mt20">
						<form @submit.prevent>
							<div class="row">
								<div class="col-sm-6">
									<input v-model="form_data.first_name" class="form-control" type="text" placeholder="First Name *">
								</div>
								<div class="col-sm-6">
									<input v-model="form_data.last_name" class="form-control" type="text" placeholder="Last Name *">
								</div>
							</div>

							<div class="row">
								<div class="col-sm-6 mt20">
									<input v-model="form_data.email" class="form-control" type="email" placeholder="Email *">
								</div>
								<div class="col-sm-6 mt20">
									<input v-model="form_data.email2" class="form-control" type="email" placeholder="Confirm Email *">
								</div>
							</div>

							<div class="row">
								<div class="col-sm-6 mt20" v-if="password_hidden">
									<input v-model="password" class="form-control short-icon-end" type="password" placeholder="Password *">
									<img src="@/assets/images/eyeclosed.png" class="tiny-img pointer" @click="password_hidden = false">
								</div>
								<div class="col-sm-6 mt20" v-else>
									<input v-model="password" class="form-control short-icon-end" type="text" placeholder="Password *">
									<img src="@/assets/images/eye.png" class="tiny-img pointer" @click="password_hidden = true">
								</div>

								<div class="col-sm-6 mt20" v-if="password2_hidden">
									<input v-model="password2" class="form-control short-icon-end" type="password" placeholder="Confirm Password *">
									<img src="@/assets/images/eyeclosed.png" class="tiny-img pointer" @click="password2_hidden = false">
								</div>
								<div class="col-sm-6 mt20" v-else>
									<input v-model="password2" class="form-control short-icon-end" type="text" placeholder="Confirm Password *">
									<img src="@/assets/images/eye.png" class="tiny-img pointer" @click="password2_hidden = true">
								</div>
							</div>

							<div class="row">
								<div class="col-sm-12">
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
								</div>
							</div>

							<div class="row">
								<div class="col-sm-6 mt20">
									<input v-model="form_data.pseudonym" class="form-control" type="text" placeholder="Pseudonym *">
								</div>
								<div class="col-sm-6 mt20">
									<input v-model="telegram" class="form-control" type="text" placeholder="Telegram Name">
								</div>
							</div>

							<div class="row">
								<div class="col-sm-12">
									<p class="mt30">
										At this time, the portal is only accepting membership from active validator node operators. Please enter your first validator node address (your main node). If you have more than one, you can add these later after registration.
									</p>
								</div>
							</div>

							<div class="row">
								<div class="col-sm-8 mt10">
									<input v-model="form_data.public_key" class="form-control" type="text" placeholder="Validator Node Address *">
								</div>
							</div>

							<div class="row">
								<div class="col-sm-12">
									<p class="mt30 op6 fs12">
										* Indicates a required field
									</p>
								</div>

								<div class="col-sm-12 mt10">
									<table class="table">
										<tr>
											<td class="tr-left">
												<input type="checkbox" id="agree1" v-model="form_data.agree1" class="pointer">
											</td>
											<td class="tr-right">
												<label class="fs13" for="agree1">
													I agree to the <a href="/terms-of-service" target="_blank">Terms and Conditions</a> and privacy policy.
												</label>
											</td>
										</tr>
										<tr>
											<td class="tr-left">
												<input type="checkbox" id="agree2" v-model="form_data.agree2" class="pointer">
											</td>
											<td class="tr-right">
												<label class="fs13" for="agree2">
													I understand that this portal is only for Casper blockchain node operators and affirm that I do operate a node and understand that I will be required to prove I am a node operator.
												</label>
											</td>
										</tr>
										<tr>
											<td class="tr-left">
												<input type="checkbox" id="agree3" v-model="form_data.agree3" class="pointer">
											</td>
											<td class="tr-right">
												<label class="fs13" for="agree3">
													I want to sign up to the newsletter for the latest information and Casper insights.
												</label>
											</td>
										</tr>
									</table>
								</div>

								<div 
									class="col-sm-12 mt30" 
									:class="
										(
											form_data.first_name &&
											form_data.last_name &&
											form_data.email &&
											form_data.email2 &&
											password &&
											password2 &&
											form_data.pseudonym &&
											form_data.public_key &&
											form_data.agree1 &&
											form_data.agree2
										) ? '' : 'div-disabled'
									"
								>
									<button class="btn btn-success btn-lg float-right width-200" @click="submitForm">
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>

				<div v-else-if="account_type_selection === 'entity'" class="login-form-wrap">
					<p class="mb20">
						<span class="pointer" @click="backToTypeSelection">
							<i class="fa fa-arrow-left pointer"></i>
							Back
						</span>
					</p>

					<label>New Entity User</label>
					<p>LLC/Corp/Trust/Etc. Please fill the form to register.</p>

					<div class="form-group">
						<form @submit.prevent>
							<div class="row">
								<div class="col-sm-6 mt20">
									<input v-model="entity_data.entity_name" class="form-control" type="text" placeholder="Entity Name *">
								</div>
								<div class="col-sm-6 mt20">
									<select class="form-select pointer" ref="entity_type">
										<option value="" selected>
											Select Entity Type
										</option>
										<option v-for="entity_type in entity_types" :value="entity_type">
											{{ entity_type }}
										</option>
									</select>
								</div>
							</div>

							<div class="row">
								<div class="col-sm-4 mt20">
									<input v-model="entity_data.registration_number" class="form-control" type="text" placeholder="Registration Number *">
								</div>
								<div class="col-sm-4 mt20">
									<select class="form-select" ref="entity_country">
										<option value="" selected>
											Select Registration Country
										</option>
										<option v-for="(val, key, index) in countries" :value="val">
											{{ val }}
										</option>
									</select>
								</div>
								<div class="col-sm-4 mt20">
									<input v-model="entity_data.tax_id" class="form-control" type="text" placeholder="Entity Tax ID/VAT #">
								</div>
							</div>

							<div class="row">
								<div class="col-sm-6 mt20">
									<input v-model="form_data.first_name" class="form-control" type="text" placeholder="First Name *">
								</div>
								<div class="col-sm-6 mt20">
									<input v-model="form_data.last_name" class="form-control" type="text" placeholder="Last Name *">
								</div>
							</div>

							<div class="row">
								<div class="col-sm-6 mt20">
									<input v-model="form_data.email" class="form-control" type="email" placeholder="Email *">
								</div>
								<div class="col-sm-6 mt20">
									<input v-model="form_data.email2" class="form-control" type="email" placeholder="Confirm Email *">
								</div>
							</div>

							<div class="row">
								<div class="col-sm-6 mt20" v-if="password_hidden">
									<input v-model="password" class="form-control short-icon-end" type="password" placeholder="Password *">
									<img src="@/assets/images/eyeclosed.png" class="tiny-img pointer" @click="password_hidden = false">
								</div>
								<div class="col-sm-6 mt20" v-else>
									<input v-model="password" class="form-control short-icon-end" type="text" placeholder="Password *">
									<img src="@/assets/images/eye.png" class="tiny-img pointer" @click="password_hidden = true">
								</div>

								<div class="col-sm-6 mt20" v-if="password2_hidden">
									<input v-model="password2" class="form-control short-icon-end" type="password" placeholder="Confirm Password *">
									<img src="@/assets/images/eyeclosed.png" class="tiny-img pointer" @click="password2_hidden = false">
								</div>
								<div class="col-sm-6 mt20" v-else>
									<input v-model="password2" class="form-control short-icon-end" type="text" placeholder="Confirm Password *">
									<img src="@/assets/images/eye.png" class="tiny-img pointer" @click="password2_hidden = true">
								</div>
							</div>

							<div class="row">
								<div class="col-sm-12">
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
								</div>
							</div>

							<div class="row">
								<div class="col-sm-6 mt20">
									<input v-model="form_data.pseudonym" class="form-control" type="text" placeholder="Pseudonym *">
								</div>
								<div class="col-sm-6 mt20">
									<input v-model="telegram" class="form-control" type="text" placeholder="Telegram Name">
								</div>
							</div>

							<div class="row">
								<div class="col-sm-12">
									<p class="mt30">
										At this time, the portal is only accepting membership from active validator node operators. Please enter your first validator node address (your main node). If you have more than one, you can add these later after registration.
									</p>
								</div>
							</div>

							<div class="row">
								<div class="col-sm-8 mt10">
									<input v-model="form_data.public_key" class="form-control" type="text" placeholder="Validator Node Address *">
								</div>
							</div>

							<div class="row">
								<div class="col-sm-12">
									<p class="mt30 op6 fs12">
										* Indicates a required field
									</p>
								</div>

								<table class="table">
									<tr>
										<td class="tr-left">
											<input type="checkbox" id="agree1" v-model="form_data.agree1" class="pointer">
										</td>
										<td class="tr-right">
											<label class="fs13" for="agree1">
												I agree to the <a href="/terms-of-service" target="_blank">Terms and Conditions</a> and privacy policy.
											</label>
										</td>
									</tr>
									<tr>
										<td class="tr-left">
											<input type="checkbox" id="agree2" v-model="form_data.agree2" class="pointer">
										</td>
										<td class="tr-right">
											<label class="fs13" for="agree2">
												I understand that this portal is only for Casper blockchain node operators and affirm that I do operate a node and understand that I will be required to prove I am a node operator.
											</label>
										</td>
									</tr>
									<tr>
										<td class="tr-left">
											<input type="checkbox" id="agree3" v-model="form_data.agree3" class="pointer">
										</td>
										<td class="tr-right">
											<label class="fs13" for="agree3">
												I want to sign up to the newsletter for the latest information and Casper insights.
											</label>
										</td>
									</tr>
								</table>

								<div 
									class="col-sm-12 mt30" 
									:class="
										(
											entity_data.entity_name &&
											entity_data.registration_number &&
											this.$refs['entity_type'].value &&
											this.$refs['entity_country'].value &&
											form_data.first_name &&
											form_data.last_name &&
											form_data.email &&
											form_data.email2 &&
											password &&
											password2 &&
											form_data.pseudonym &&
											form_data.public_key &&
											form_data.agree1 &&
											form_data.agree2
										) ? '' : 'div-disabled'
									"
								>
									<button class="btn btn-success btn-lg float-right width-200" @click="submitForm">
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>

				<p class="mt30 fs14">
					Already have an account?
					<span class="text-red pointer" @click="this.$root.routeTo('/login')">
						Sign In
					</span>
				</p>
			</div>
		</div>

		<div class="signup-footer pt10 mb60">
			<span @click="gotoLink('privacy-policy')">Privacy Policy</span>
			|
			<span @click="gotoLink('terms-of-service')">Terms & Conditions</span>
			|
			<span @click="gotoLink('?section=contact')">Contact</span>
		</div>

		<div class="signup-footer-wrap">
			<SignupFooter></SignupFooter>
		</div>
	</div>
</template>

<style scoped>

.signup-footer-wrap {
	position: absolute;
	bottom: 10px;
	text-align: center;
}

.tr-left {
	height: auto;
	vertical-align: top;
	width: 20px;
	padding-top: 2px;
}

.tr-right {
	height: auto;
	vertical-align: top;
	width: calc(100% - 17px);
}

.tr-right label {
	font-weight: normal;
	padding: 4px;
	cursor: pointer;
}

</style>