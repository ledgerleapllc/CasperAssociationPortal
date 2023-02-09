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
	<div class="landing-container">
		<OuterNav></OuterNav>

		<div class="container max-1200 white pt50">
			<div class="row">
				<div class="col-md-12 mt100">
					<h1 class="fs40 text-center" :class="this.$root.isMobile ? '' : 'mt100'">
						The Casper Association Portal
					</h1>
					<p class="mt40 text-center fs18">
						Trusted members of the Association will be able to participate in rewards as a part of their Association Membership. By verifying your information, you help make the Casper Network more transparent and trustworthy. Get more tools to better manage and track your node. Once a member, validators can participate in the path towards decentralization of the Casper Network.
					</p>

					<div class="flex-row mt30">
						<button class="btn btn-success btn-lg m10 width-200" @click="this.$root.routeTo('/faq')">
							Learn More
						</button>
						<button class="btn btn-success btn-lg m10 width-200" @click="this.$root.routeTo('/validator-selection-tool')">
							Validator Tools
						</button>
					</div>

					<img src="@/assets/images/laptop.png" class="laptop mt60">
				</div>
			</div>
		</div>

		<div class="container-fluid white">
			<div class="row mt100 red-bar">
				<div class="col-md-12">
					<h2 class="mt60 text-center">
						Never miss another upgrade
					</h2>
					<p class="mt20 fs18 text-center mb40">
						Sign up and get notified when new upgrades for your node are available.
					</p>

					<div class="flex-row m60">
						<input type="email" class="form-control max-300" placeholder="Email Address">
						<button class="btn btn-success btn-lg">
							Notify Me
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="container max-1200 white mt50">
			<div class="row">
				<div class="col-md-12">
					<h2 class="mt100 mb30 text-center">
						Any validator on the Casper Network can become a Member of the Casper Association.
					</h2>
					<hr class="divider">
					<p class="mt30 mb100 text-center fs18">
						The Casper Association is a Swiss association based in Zug, responsible for the development of the Casper Ecosystem and the open source development of the Casper Network.
					</p>
				</div>
			</div>
		</div>

		<div class="container max-1200 white mt100">
			<div class="row">
				<div class="col-md-6">
					<img src="@/assets/images/monitor-node-status.svg" class="laptop">
				</div>
				<div class="col-md-6">
					<h2 class="mt100 mb30">
						Monitor your node status
					</h2>
					<p class="mt30 mb100 fs18">
						For node operators, the Casper Association Portal is the premier tool for gathering insights and visualizing the performance of your node. Add all of the nodes you operate, and see where you rank against other operators. Closely monitor important metrics like:
					</p>
					<div class="tick-mark">
						<div class="tick"></div>
						<span>Uptime</span>
					</div>
					<div class="tick-mark">
						<div class="tick"></div>
						<span>Historical Performance</span>
					</div>
				</div>
			</div>
		</div>

		<div class="container max-1200 white mt100">
			<div class="row">
				<div class="col-md-6">
					<h2 class="mt100 mb30">
						Trusted members receive special rewards
					</h2>
					<p class="mt30 mb100 fs18">
						By verifying your information, you help make the Casper Network more transparent and trustworthy. Getting verified unlocks access to an assortment of different rewards. Get more tools to better manage your node and track earnings. Participate in votes and unlock rewards that only verified members can get.
					</p>
				</div>
				<div class="col-md-6">
					<img src="@/assets/images/special-perks.svg" class="laptop">
				</div>
			</div>
		</div>

		<div class="container max-1200 white mt100">
			<div class="row">
				<div class="col-md-6">
					<img src="@/assets/images/interesting-discussions.svg" class="laptop">
				</div>
				<div class="col-md-6">
					<h2 class="mt100 mb30">
						Create interesting discussions
					</h2>
					<p class="mt30 mb100 fs18">
						Have something to say? Connect with other node operators by starting a forum discussion thread. Discussions are public and viewable by all members. Get verified to gain access and read through different discussions created by node operators like yourself.
					</p>
				</div>
			</div>
		</div>

		<div class="container max-1200 white mt100 pb100" id="contact">
			<div class="row">
				<div class="col-md-12">
					<h2 class="mt50 mb50 text-center">
						Let's Talk
					</h2>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-6 mt15">
					<input class="form-control p15 landing-input" type="text" placeholder="Name" ref="contact_name">
				</div>
				<div class="col-sm-6 mt15">
					<input class="form-control p15 landing-input" type="text" placeholder="Email Address" ref="contact_email">
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 mt15">
					<textarea class="form-control p15 landing-input height-300" placeholder="Message" ref="contact_message"></textarea>
				</div>

				<div class="col-sm-12 mt30 text-center">
					<ClipLoader v-if="loading" class="clip-loader-inline" size="35px" color="#ff2d2e"></ClipLoader>
					<button v-else class="btn btn-success btn-lg" @click="contactUs">
						Contact Us
					</button>
				</div>
			</div>
		</div>

		<OuterFooter></OuterFooter>
	</div>
</template>

<style scoped>

.landing-container {
	background-image: url('@/assets/images/bg2.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: auto;
	min-height: 100vh;
	background-attachment: fixed;
}

.flex-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.laptop {
	width: 100%;
}

.red-bar {
	background-color: #8b0e0e;
}

.max-300 {
	max-width: 500px;
}

.max-1200 {
	max-width: 1200px;
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

.height-300 {
	height: 300px;
}

</style>