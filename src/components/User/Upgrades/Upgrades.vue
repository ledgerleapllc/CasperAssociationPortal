<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import Available from './Available/Available.vue';
import Previous from './Previous/Previous.vue';
import moment from 'moment';

export default {
	components: {
		Popper,
		ClipLoader,
		Available,
		Previous
	},

	data() {
		return {
			uri_page: this.$route.params.page,
			loaded:   false,
			upgrades: [],
			upgrade:  {
				id:                  null,
				version:             null,
				created_at:          null,
				updated_at:          null,
				visible:             null,
				activate_at:         null,
				activate_era:        null,
				link:                null,
				notes:               null,
				time_remaining:      null,
				time_remaining_perc: null
			},
			users:    [],

			upgrade_complete: false,
		}
	},

	created() {
	},

	mounted() {
		let that = this;

		if (
			this.uri_page != 'available' &&
			this.uri_page != 'previous'
		) {
			this.uri_page = 'available';
			this.$root.routeTo(`/u/upgrades/available`);
		}
	},

	methods: {
		async getAvailableUpgrade() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			this.loaded  = false;
			this.upgrade = {};

			const response = await api(
				'GET',
				'user/get-available-upgrade',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.upgrade = response.detail;
				this.loaded  = true;

				if (this.upgrade?.version) {
					this.getUpgradedUsers(this.upgrade.version);
				}

				if (this.upgrade?.time_remaining_perc > 0) {
					this.startCountdown();
				}
			}
		},

		async getUpgrades() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			this.loaded   = false;
			this.upgrades = [];

			const response = await api(
				'GET',
				'user/get-upgrades',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.upgrades = response.detail;
				this.loaded   = true;
			}
		},

		async getUpgradedUsers(version) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			this.users = [];

			const response = await api(
				'GET',
				'user/get-upgraded-users',
				{
					version: version
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.users = response.detail;
				let that   = this;

				Object.values(this.users).forEach(function(node) {
					let guid           = node.guid;
					let upgrade_status = node.upgrade_status;

					if (
						guid == that.$root.guid &&
						upgrade_status == 'complete'
					) {
						that.upgrade_complete = true;
					}
				});
			}
		},

		startCountdown() {
			let that = this;
			setInterval(function() {
				that.countdownTick();
			}, 1000);
		},

		countdownTick() {
			if (this.upgrade?.time_remaining == "00:00:00:00") {
				return;
			}

			let split  = this.upgrade?.time_remaining.split(':');
			let day    = parseInt(split[0] ?? 0);
			let hour   = parseInt(split[1] ?? 0);
			let minute = parseInt(split[2] ?? 0);
			let second = parseInt(split[3] ?? 0);

			if (second > 0) {
				second -= 1;
			} else {
				second = 59;

				if (minute > 0) {
					minute -= 1;
				} else {
					minute = 59;

					if (hour > 0) {
						hour -= 1;
					} else {
						hour = 23;

						if (day > 0) {
							day -= 1;
						}
					}
				}
			}

			day = (
				day.toString().length == 1 ? 
				`0${day}` : 
				`${day}`
			);

			hour = (
				hour.toString().length == 1 ? 
				`0${hour}` : 
				`${hour}`
			);

			minute = (
				minute.toString().length == 1 ? 
				`0${minute}` : 
				`${minute}`
			);

			second = (
				second.toString().length == 1 ? 
				`0${second}` : 
				`${second}`
			);

			this.upgrade.time_remaining = `${day}:${hour}:${minute}:${second}`;

			let numerator = (
				moment.utc(this.upgrade?.activate_at).unix() - 
				moment().unix()
			);

			let denominator = (
				moment.utc(this.upgrade?.activate_at).unix() - 
				moment.utc(this.upgrade?.created_at).unix()
			);

			numerator   = numerator   <= 0 ? 1 : numerator;
			denominator = denominator <= 0 ? 1 : denominator;

			this.upgrade.time_remaining_perc = (
				numerator / 
				denominator *
				100
			).toFixed(4);

			if (this.upgrade?.time_remaining_perc < 0) {
				this.upgrade.time_remaining_perc = 0;
			}
		},
	},

	watch: {
		'$route' (to, from) {
			this.uri_page = this.$route.params.page;
		}
	}
};

</script>

<template>
	<div class="top-banner mt20">
		<div
			@click="
				this.$root.routeTo(`/u/upgrades/available`);
				this.uri_page = 'available';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_page == 'available' ? 'spa-tab-active' : '')
			"
		>
			Available
		</div>

		<div
			@click="
				this.$root.routeTo(`/u/upgrades/previous`);
				this.uri_page = 'previous';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_page == 'previous' ? 'spa-tab-active' : '')
			"
		>
			Past Upgrades
		</div>

	</div>

	<Available v-if="this.uri_page == 'available'"></Available>
	<Previous v-else-if="this.uri_page == 'previous'"></Previous>
</template>

<style>


</style>