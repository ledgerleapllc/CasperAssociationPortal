<script>

import { api } from '../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import OuterNav from '../OuterNav.vue';
import OuterFooter from '../OuterFooter.vue';

export default {
	data() {
		return {
			loading: false,
			section: this.$route.query.section
		}
	},

	components: {
		ClipLoader,
		OuterNav,
		OuterFooter
	},

	created() {
	},

	mounted() {
		let that = this;

		if (that.section && that.section != '') {
			setTimeout(function() {
				document.getElementById(that.section).scrollIntoView();
			},750);
		}
	},

	methods: {
		gotoNotify() {
			document.getElementById('notify-me').scrollIntoView();
		},

		async notifyMe() {
			let notify_email   = this.$refs['notify_email'].value   ?? '';

			if (notify_email != '') {
				this.loading = true;

				const response = await api(
					'POST',
					'public/subscribe',
					{
						email: notify_email
					}
				);

				if (response.status == 200) {
					this.loading = false;
					// console.log(response);
					this.$refs['notify_email'].value = '';

					this.$root.toast(
						'',
						response.message,
						'success'
					);
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

		async contactUs() {
			let contact_name    = this.$refs['contact_name'].value    ?? '';
			let contact_email   = this.$refs['contact_email'].value   ?? '';
			let contact_message = this.$refs['contact_message'].value ?? '';

			if (
				contact_name    != '' &&
				contact_email   != '' &&
				contact_message != ''
			) {
				this.loading = true;

				const response = await api(
					'POST',
					'public/contact-us',
					{
						name:    contact_name,
						email:   contact_email,
						message: contact_message
					}
				);

				if (response.status == 200) {
					this.loading = false;
					// console.log(response);
					this.$refs['contact_name'].value = '';
					this.$refs['contact_email'].value = '';
					this.$refs['contact_message'].value = '';

					this.$root.toast(
						'',
						response.message,
						'success'
					);
				} else {
					this.loading = false;
					this.$root.toast(
						'',
						response.message,
						'error'
					);
				}
			}
		}
	}
};

</script>

<template>
	<OuterNav></OuterNav>

	<div class="landing-container">
		<div class="container hero-container max-1250 white pl30 pr30">
			<div class="row">
				<div class="col-md-6">
					<p class="fs60 squashed">
						<span class="black">Welcome to the</span> Casper Association Portal
					</p>
					<p class="mt20 fs20">
						Keep track of the status of your validator node(s) in one place. See rewards, uptime, stake amount, delegator count and much more. Available to all node operators.
					</p>

					<button class="btn btn-lg btn-lime fs20 p15 pl40 pr40 mt30" @click="gotoNotify">
						Get Started
					</button>

				</div>

				<div class="col-md-6">
					<img src="@/assets/images/laptop.png" class="laptop">
				</div>
			</div>
		</div>
	</div>

	<div class="container-fluid bg-black flex-container" style="height: 540px" id="notify-me">
		<div class="container white max-780">
			<p class="fs60 text-center">
				Never miss another upgrade
			</p>

			<p class="fs22 text-center">
				Sign up and get notified when new upgrades for your node are available.
			</p>

			<div class="form-group mt30">
				<input class="form-control p15 landing-input" type="email" placeholder="Email Address" ref="notify_email">
				<ClipLoader v-if="loading" class="clip-loader-inline" size="35px" color="#FF2D2E" style="position: absolute; top: -2px; right: 0; padding: 14px 30px;"></ClipLoader>
				<button v-else class="btn btn-lg btn-lime fs18" style="position: absolute; top: 1px; right: 0; padding: 14px 30px;" @click="notifyMe">
					Notify Me
				</button>
			</div>
		</div>
	</div>

	<div class="container-fluid bg-white flex-container" style="height: 650px">
		<div class="container hero-container max-1250 pl30 pr30">
			<div class="row">
				<div class="col-md-6">
					<p class="fs40" style="line-height: 56px;">
						Any validator on the Casper Network can become a Member of the Casper Association.
					</p>

					<p class="mt20 fs20">
						Keep track of the status of your validator node(s) in one place. See rewards, uptime, stake amount, delegator count and much more. Available to all node operators.
					</p>

					<button class="btn btn-lg btn-lime fs20 p15 pl40 pr40 mt30" @click="this.$root.routeTo('/signup')">
						Register Now
					</button>
				</div>
				<div class="col-md-6">
					<img src="@/assets/images/hero2.png" class="laptop">
				</div>
			</div>
		</div>
	</div>

	<div class="container-fluid bg-black white flex-container" style="height: 650px">
		<div class="container hero-container max-1250 pl30 pr30">
			<div class="row">
				<div class="col-md-6">
					<img src="@/assets/images/hero3.png" class="laptop">
				</div>
				<div class="col-md-6">
					<p class="mt20 fs40" style="line-height: 56px;">
						Monitor your node status
					</p>

					<p class="mt20 fs20">
						For node operators, the Casper Association Portal is the premier tool for gathering insights and visualizing the performance of your node. Add all of the nodes you operate, and see where you rank against other operators. Closely monitor important metrics like uptime and historical performance.
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="container-fluid bg-white flex-container" style="height: 650px">
		<div class="container hero-container max-1250 pl30 pr30">
			<div class="row">
				<div class="col-md-6">
					<p class="mt20 fs40" style="line-height: 56px;">
						Trusted members receive special perks
					</p>

					<p class="mt20 fs20">
						By verifying your information, you help make the Casper Network more transparent and trustworthy. Getting verified unlocks access to an assortment of different privileges and rewards. Get more tools to better manage your node and track earnings. Participate in votes and unlock perks that only verified members can get.
					</p>
				</div>
				<div class="col-md-6">
					<img src="@/assets/images/hero4.png" class="laptop">
				</div>
			</div>
		</div>
	</div>

	<div class="container-fluid bg-lime flex-container" style="height: 650px">
		<div class="container hero-container max-1250 pl30 pr30">
			<div class="row">
				<div class="col-md-6">
					<img src="@/assets/images/hero5.png" class="laptop">
				</div>
				<div class="col-md-6">
					<p class="mt20 fs40" style="line-height: 56px;">
						Create interesting discussions
					</p>

					<p class="mt20 fs20">
						Have something to say? Connect with other node operators by starting a forum discussion thread. Discussions are public and viewable by all members. Get verified to gain access and read through hundreds of different discussions created by node operators like yourself.
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="landing-container" id="contact">
		<div class="container hero-container max-1250 white pl30 pr30">
			<div class="row">
				<div class="col-md-12">
					<p class="fs60 squashed black">
						Let's Talk
					</p>
				</div>

				<div class="col-sm-6 mt15">
					<input class="form-control p15 landing-input" type="text" placeholder="Name" ref="contact_name">
				</div>
				<div class="col-sm-6 mt15">
					<input class="form-control p15 landing-input" type="text" placeholder="Email Address" ref="contact_email">
				</div>

				<div class="col-sm-12 mt15">
					<textarea class="form-control p15 landing-input height-250" placeholder="Message" ref="contact_message"></textarea>
				</div>

				<div class="col-sm-12 mt30 text-center">
					<ClipLoader v-if="loading" class="clip-loader-inline" size="35px" color="#000"></ClipLoader>
					<button v-else class="btn btn-lg btn-lime fs20 p15 pl40 pr40" @click="contactUs">
						Contact Us
					</button>
				</div>
			</div>
		</div>
	</div>

	<OuterFooter></OuterFooter>
</template>

<style scoped>

.landing-container {
	width: 100%;
	height: auto;
	height: 85vh;
	min-height: 800px;
	background-color: #FF2D2E;
	position: relative;
}

.flex-container {
	display: flex;
	align-items: center;

}

.hero-container {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
}

.flex-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.laptop {
	width: 100%;
}

.fs60 {
	font-size: 60px;
}

.squashed {
	line-height: 73px;
}

.btn-lime {
	background-color: #BCFC07;
}

.btn-lime:hover,
.btn-lime:focus {
	color: #111;
	border: 1px solid #BCFC07;
	background-color: #BCFC07;
}

.bg-lime {
	background-color: #3EDC64;
}

.red-bar {
	background-color: #8b0e0e;
}

.max-300 {
	max-width: 500px;
}

.max-1250 {
	max-width: 1250px;
}

.max-780 {
	max-width: 780px;
}

.divider {
	width: 100px;
	margin: 0 auto;
	border: 2px solid #ff2d2e;
}

.tick-mark {
	position: relative;
	display: flex;
	flex-direction: row;
}

.tick {
	width: 18px;
	border-top: 3px solid #ff2d2e;
	margin-top: 12px;
	margin-right: 15px;
}

.landing-input {
	background-color: #f1f1f1;
	border: 2px solid #bcbcbc;
	color: #111;
}

.landing-input::placeholder {
	color: #777;
	font-size: 18px;
}

.height-250 {
	height: 250px;
}

</style>