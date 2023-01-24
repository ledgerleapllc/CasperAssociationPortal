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
			upgrade:  {},
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

				if (this.upgrade.version) {
					this.getUpgradedUsers(this.upgrade.version)
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
				console.log(response.detail);
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