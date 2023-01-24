<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';
import Global from './Global/Global.vue';
import Monitoring from './Monitoring/Monitoring.vue';
import Mailer from './Mailer/Mailer.vue';
import Notifications from './Notifications/Notifications.vue';

import 'vue-avatar-upload/lib/style.css';
import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal,
		Global,
		Monitoring,
		Mailer,
		Notifications
	},

	data() {
		return {
			uri_category:       this.$route.params.category,
			loading:            false,

			// global
			lock_ready:         false,
			kyc_lock_nodes:     false,
			kyc_lock_discs:     false,
			kyc_lock_votes:     false,
			kyc_lock_perks:     false,
			prob_lock_nodes:    false,
			prob_lock_discs:    false,
			prob_lock_votes:    false,
			prob_lock_perks:    false,

			// monitoring
			uptime_calc_size:   0,
			uptime_warning:     0,
			uptime_probation:   0,
			minimum_eras:       0,
			eras_since_redmark: 0,
			redmark_revoke:     0,
			redmark_calc_size:  0,

			uptime_correction_units:  0,
			uptime_correction_metric: '',

			// terms
			esign_doc: ''
		}
	},

	created() {
		this.getGlobalSettings();
	},

	mounted() {
		let that = this;

		if (
			this.uri_category != 'global' &&
			this.uri_category != 'monitoring' &&
			this.uri_category != 'mailer' &&
			this.uri_category != 'notifications'
		) {
			this.uri_category = 'global';
			this.$root.routeTo(`/a/settings/global`);
		}
	},

	watch: {
		'$route' (to, from) {
			this.uri_category = this.$route.params.category;
		},

		'kyc_lock_nodes' () {
			if (this.lock_ready) {
				this.saveSetting(
					"kyc_lock_nodes", 
					Boolean(this.kyc_lock_nodes)
				);
			}
		},

		'kyc_lock_discs' () {
			if (this.lock_ready) {
				this.saveSetting(
					"kyc_lock_discs", 
					Boolean(this.kyc_lock_discs)
				);
			}
		},

		'kyc_lock_votes' () {
			if (this.lock_ready) {
				this.saveSetting(
					"kyc_lock_votes", 
					Boolean(this.kyc_lock_votes)
				);
			}
		},

		'kyc_lock_perks' () {
			if (this.lock_ready) {
				this.saveSetting(
					"kyc_lock_perks", 
					Boolean(this.kyc_lock_perks)
				);
			}
		},

		'prob_lock_nodes' () {
			if (this.lock_ready) {
				this.saveSetting(
					"prob_lock_nodes", 
					Boolean(this.prob_lock_nodes)
				);
			}
		},

		'prob_lock_discs' () {
			if (this.lock_ready) {
				this.saveSetting(
					"prob_lock_discs", 
					Boolean(this.prob_lock_discs)
				);
			}
		},

		'prob_lock_votes' () {
			if (this.lock_ready) {
				this.saveSetting(
					"prob_lock_votes", 
					Boolean(this.prob_lock_votes)
				);
			}
		},

		'prob_lock_perks' () {
			if (this.lock_ready) {
				this.saveSetting(
					"prob_lock_perks", 
					Boolean(this.prob_lock_perks)
				);
			}
		}
	},

	methods: {
		async getGlobalSettings() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-global-settings',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.uptime_calc_size   = response.detail.uptime_calc_size;
				this.uptime_warning     = response.detail.uptime_warning;
				this.uptime_probation   = response.detail.uptime_probation;
				this.minimum_eras       = response.detail.minimum_eras;
				this.eras_since_redmark = response.detail.eras_since_redmark;
				this.redmark_revoke     = response.detail.redmark_revoke;
				this.redmark_calc_size  = response.detail.redmark_calc_size;

				this.uptime_correction_units  = response.detail.uptime_correction_units;
				this.uptime_correction_metric = response.detail.uptime_correction_metric;

				this.kyc_lock_nodes  = Boolean(response.detail.kyc_lock_nodes);
				this.kyc_lock_discs  = Boolean(response.detail.kyc_lock_discs);
				this.kyc_lock_votes  = Boolean(response.detail.kyc_lock_votes);
				this.kyc_lock_perks  = Boolean(response.detail.kyc_lock_perks);
				this.prob_lock_nodes = Boolean(response.detail.prob_lock_nodes);
				this.prob_lock_discs = Boolean(response.detail.prob_lock_discs);
				this.prob_lock_votes = Boolean(response.detail.prob_lock_votes);
				this.prob_lock_perks = Boolean(response.detail.prob_lock_perks);

				this.esign_doc       = response.detail.esign_doc;

				let that = this;
				setTimeout(function() {
					that.lock_ready  = true;
				},1000);
			}
		},

		async saveSetting(name, value) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'PUT',
				'admin/update-setting',
				{
					setting_name:  name,
					setting_value: value
				},
				fetch_bearer_token
			);

			if (response.status != 200) {
				this.$root.toast(
					'', 
					response.message, 
					'error'
				);

				return false;
			} else {
				return true;
			}
		},

		async saveVotingLock() {
			this.loading = true;

			let result1 = await this.saveSetting(
				"minimum_eras", 
				this.minimum_eras
			);

			let result2 = await this.saveSetting(
				"eras_since_redmark", 
				this.eras_since_redmark
			);

			this.loading = false;

			if (
				result1 &&
				result2
			) {
				this.$root.toast(
					'', 
					'Updated Voting Lock rules', 
					'success'
				);
			}
		},

		async saveUptimeRules() {
			this.loading = true;

			let result1 = await this.saveSetting(
				"uptime_calc_size", 
				this.uptime_calc_size
			);

			let result2 = await this.saveSetting(
				"uptime_warning", 
				this.uptime_warning
			);

			let result3 = await this.saveSetting(
				"uptime_probation", 
				this.uptime_probation
			);

			let result4 = await this.saveSetting(
				"uptime_correction_metric", 
				this.uptime_correction_metric
			);

			let result5 = await this.saveSetting(
				"uptime_correction_units", 
				this.uptime_correction_units
			);

			this.loading = false;

			if (
				result1 &&
				result2 &&
				result3 &&
				result4 &&
				result5
			) {
				this.$root.toast(
					'', 
					'Updated Uptime rules', 
					'success'
				);
			}
		},

		async saveRedmarkRules() {
			this.loading = true;

			let result1 = await this.saveSetting(
				"redmark_revoke", 
				this.redmark_revoke
			);

			let result2 = await this.saveSetting(
				"redmark_calc_size", 
				this.redmark_calc_size
			);

			this.loading = false;

			if (
				result1 &&
				result2
			) {
				this.$root.toast(
					'', 
					'Updated Redmark rules', 
					'success'
				);
			}
		},
	},
};

</script>

<template>
	<div v-if="loading" class="ajax-box">
		<ClipLoader size="45px" color="#ff2d2e"></ClipLoader>
	</div>
	<div class="top-banner">
		<div
			@click="
				this.$root.routeTo(`/a/settings/global`);
				this.uri_category = 'global';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'global' ? 'spa-tab-active' : '')
			"
		>
			Global
		</div>

		<div
			@click="
				this.$root.routeTo(`/a/settings/monitoring`);
				this.uri_category = 'monitoring';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'monitoring' ? 'spa-tab-active' : '')
			"
		>
			Monitoring
		</div>

		<div
			@click="
				this.$root.routeTo(`/a/settings/mailer`);
				this.uri_category = 'mailer';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'mailer' ? 'spa-tab-active' : '')
			"
		>
			Mailer
		</div>
		<div
			@click="
				this.$root.routeTo(`/a/settings/notifications`);
				this.uri_category = 'notifications';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'notifications' ? 'spa-tab-active' : '')
			"
		>
			Notifications
		</div>
	</div>

	<Global v-if="this.uri_category == 'global'"></Global>
	<Monitoring v-else-if="this.uri_category == 'monitoring'"></Monitoring>
	<Mailer v-else-if="this.uri_category == 'mailer'"></Mailer>
	<Notifications v-else-if="this.uri_category == 'notifications'"></Notifications>
</template>

<style scoped>

</style>