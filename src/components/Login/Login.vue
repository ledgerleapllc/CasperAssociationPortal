<script>

import App from '../../App.vue';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import LoginFooter from './LoginFooter.vue';
import './login.css';

export default {
	data() {
		return {
			inputPassword: "",
			inputMfa: "",
			step: 1,
			mfa_message: "We sent a 2FA verification code to your inbox.",
			loading: false
		}
	},

	mounted() {
		//
	},

	components: {
		ClipLoader,
		LoginFooter
	},

	methods: {
		gotoStep2() {
			let self = this;

			if (
				!this.$root.inputEmail ||
				this.$root.inputEmail == ""
			) {
				this.$root.toast('Email', 'Please enter your email address to login', 'info');
				this.$refs["email_ref"].focus();
				return;
			}

			this.step = 2;
			setTimeout(function() {
				self.$refs["password_ref"].focus();
			},100)
		},
		async do_login() {
			let self = this;

			if (
				!self.inputPassword ||
				self.inputPassword == ""
			) {
				self.$root.toast('Password', 'Please enter your password to login', 'info');
				self.$refs["password_ref"].focus();
				return;
			}

			this.loading = true;
			const login_result = await this.$root.login(this.$root.inputEmail, this.inputPassword);

			if (login_result) {
				this.loading = false;
			}

			// not used
			/*
			self.step = 3;
			setTimeout(function() {
				self.$refs["mfa_ref"].focus();
			},100)
			*/
		},
		goback() {
			let self = this;

			if (self.step == 1) return;

			self.step = self.step - 1;

			setTimeout(function() {
				self.$refs["email_ref"].focus();
			},100)
		}
	},
};

</script>

<template>
	<div class="login-container">
		<div class="checker-top"></div>
		<div class="checker-bottom"></div>

		<div class="login-box-wrap">
			<div v-if="loading" class="ajax-box">
				<ClipLoader size="45px" color="#ff2d2e"></ClipLoader>
			</div>

			<div class="login-box">
				<a :href="this.$root.frontend_url" class="nostyle">
					<img src="@/assets/images/logo2.png" class="login-img">
				</a>

				<p class="mt20 fs12">
					Don't have an account yet?
					<a href="/signup">
						Register
					</a>
				</p>

				<div v-show="step == 1" class="login-form-wrap">
					<label>Log in</label>
					<div class="form-group pt10 login-form">
						<form @submit.prevent>
							<input class="form-control mb5" v-model="this.$root.inputEmail" type="email" placeholder="Email Address" ref="email_ref" autofocus autosave="" autocomplete="">
							<button @click="this.gotoStep2" class="btn btn-lime mt10 full-width bold">Next</button>
						</form>
					</div>
				</div>

				<div v-show="step == 2" class="login-form-wrap">
					<label>Hello there</label>
					<div class="form-group pt10 login-form">
						<form @submit.prevent>
							<input class="form-control mb5" v-model="inputPassword" type="password" placeholder="Password" ref="password_ref">
							<button class="btn btn-lime mt10 full-width bold" @click="this.do_login">Login</button>
						</form>
					</div>
					<div class="pt15">
						<span @click="goback()" class="pointer green">Back</span>
						<p class="float-right">
							<span @click="this.$root.routeTo('forgot-password')" class="pointer green">Forgot Password?</span>
						</p>
					</div>
				</div>

				<!-- not used -->
				<div v-show="step == 3" class="login-form-wrap">
					<label>Second Step Verification</label>
					<p>You're trying to log in. To make sure your account stays secure, we must verify your identity. {{ mfa_message }}</p>
					<div class="form-group pt10 login-form">
						<form @submit.prevent>
							<input class="form-control mb5" :value="inputMfa.toUpperCase()" @input="inputMfa = $event.target.value.toUpperCase()" type="text" placeholder="Enter Verification Code" ref="mfa_ref">
							<button class="btn btn-lime mt10 full-width bold">Verify</button>
						</form>
					</div>
					<div class="pt15">
						<p class="float-right">
							<span class="pointer green">Resend Code</span>
						</p>
					</div>
				</div>
			</div>
		</div>

		<LoginFooter></LoginFooter>
	</div>
</template>
