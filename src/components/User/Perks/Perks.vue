<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';

export default {
	components: {
		Popper,
		ClipLoader,
	},

	data() {
		return {
			perks:        [],
			perks_loaded: false
		}
	},

	created() {
		this.getPerks();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async getPerks() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-perks',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.perks        = response.detail;
				this.perks_loaded = true;
			}

			if (response.status == 403) {
				if (response.message == 'kyc-lock') {
					this.$root.routeTo('/u/membership');
					this.$root.toast(
						'Page Locked',
						'Perks page is locked at this time because your KYC is not approved',
						'warning'
					);
				}

				if (response.message == 'prob-lock') {
					this.$root.routeTo('/u/membership');
					this.$root.toast(
						'Page Locked',
						'Perks page is locked at this time due to probation of one of your nodes',
						'warning'
					);
				}
			}
		},

		gotoPerk(perk_id) {
			this.$root.routeTo(`/u/perk/${perk_id}`);
		}
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="card-title">
						Member Perks
					</div>
					<div class="card-body">
						<p class="pb30">
							Welcome Casper Association member. The following perks are available to you. Click any to learn more. Thanks for being a member in good standing with the association.
						</p>

						<div v-if="this.perks_loaded === false">
							<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else>
							<div v-if="this.perks.length == 0" class="op5 fs14">
								No perks found
							</div>
						</div>
					</div>
				</div>

				<div v-for="perk in perks" class="perk-card mt20" @click="gotoPerk(perk.id)">
					<div class="perk-card-image">
						<img v-if="perk.image" :src="perk.image">
					</div>
					<div class="perk-card-body">
						<p class="bold black fs15 mt5 mb5">
							{{ this.$root.formatString(perk.title, 30) }}
						</p>
						{{ this.$root.formatString(perk.content, 130) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>


</style>