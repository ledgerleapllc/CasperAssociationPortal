<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import Active from './Active/Active.vue';
import Finished from './Finished/Finished.vue';
import My from './My/My.vue';
import GeneralAssembly from './GeneralAssembly/GeneralAssembly.vue';

export default {
	components: {
		Popper,
		ClipLoader,
		Active,
		Finished,
		My,
		GeneralAssembly
	},

	data() {
		return {
			uri_category:     this.$route.params.category,
			eras_of_history:  null,
			history_required: null,
			redmarks:         null,
			redmarks_window:  null,
			can_vote:         null,
			plural_history1:  'eras',
			plural_redmarks1: 'redmarks',
			plural_redmarks2: 'eras'
		}
	},

	created() {
		this.getVoteEligibility();
	},

	mounted() {
		let that = this;

		if (
			this.uri_category != 'active' &&
			this.uri_category != 'finished' &&
			this.uri_category != 'my' &&
			this.uri_category != 'general-assembly'
		) {
			this.uri_category = 'active';
			this.$root.routeTo(`/u/ballots/active`);
		}
	},

	watch: {
		'$route' (to, from) {
			this.uri_category = this.$route.params.category;
		}
	},

	methods: {
		async getVoteEligibility() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-vote-eligibility',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.history_required = response.detail.history_required;
				this.eras_of_history  = response.detail.eras_of_history;
				this.redmarks         = response.detail.redmarks;
				this.redmarks_window  = response.detail.redmarks_window;
				this.can_vote         = response.detail.can_vote;

				if (parseInt(this.eras_of_history) == 1) {
					this.plural_history1 = 'era';
				}

				if (parseInt(this.redmarks) == 1) {
					this.plural_redmarks1 = 'redmark';
				}

				if (parseInt(this.redmarks_window) == 1) {
					this.plural_redmarks2 = 'era';
				}
			}

			if (response.status == 403) {
				if (response.message == 'kyc-lock') {
					this.$root.routeTo('/u/membership');
					this.$root.toast(
						'Page Locked',
						'Votes page is locked at this time because your KYC is not approved',
						'warning'
					);
				}

				if (response.message == 'prob-lock') {
					this.$root.routeTo('/u/membership');
					this.$root.toast(
						'Page Locked',
						'Votes page is locked at this time due to probation of one of your nodes',
						'warning'
					);
				}
			}
		},

		gotoProfile(pseudonym) {
			this.$root.routeTo(`/u/profile/${pseudonym}`);
		},
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="card-body">
						<p>
							Your account has been in good standing for 
							<span v-if="eras_of_history === null">
								<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
							</span>
							<span v-else>{{ eras_of_history }}</span>
							{{ plural_history1 }} out of 
							<span v-if="history_required === null">
								<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
							</span>
							<span v-else>{{ history_required }}</span>
							required. 
						</p>
						<p>
							<span v-if="redmarks === null">
								<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
							</span>
							<span v-else>
								Detected {{ redmarks }} {{ plural_redmarks1 }} in the last {{ redmarks_window }} {{ plural_redmarks2 }}.
							</span>
						</p>

						<p class="pt5">
							<span v-if="can_vote === null">
								<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
							</span>
							<span v-else>
								<span v-if="can_vote" class="text-green bold">
									Good work! You are eligible to vote.
								</span>
								<span v-else class="text-red bold">
									You are not eligible to vote at this time.
								</span>
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="top-banner mt20">
		<div
			@click="
				this.$root.routeTo(`/u/ballots/active`);
				this.uri_category = 'active';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'active' ? 'spa-tab-active' : '')
			"
		>
			Active Ballots
		</div>

		<div
			@click="
				this.$root.routeTo(`/u/ballots/finished`);
				this.uri_category = 'finished';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'finished' ? 'spa-tab-active' : '')
			"
		>
			Finished Ballots
		</div>

		<div
			@click="
				this.$root.routeTo(`/u/ballots/my`);
				this.uri_category = 'my';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'my' ? 'spa-tab-active' : '')
			"
		>
			My Votes
		</div>


	</div>

	<Active v-if="this.uri_category == 'active'"></Active>
	<Finished v-else-if="this.uri_category == 'finished'"></Finished>
	<My v-else-if="this.uri_category == 'my'"></My>
	<GeneralAssembly v-else-if="this.uri_category == 'general-assembly'"></GeneralAssembly>


</template>

<style>

.ballots-row {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 120px;
	position: relative;
	border-bottom: 1px solid #d0d0d0;
}

.ballots-row-icon {
	height: 120px;
	width: 100px;
	padding-top: 15px;
	padding-bottom: 15px;
	padding-right: 10px;
}

.ballots-row-icon img {
	width: 90px;
	height: 90px;
	border-radius: 10px;
}

.ballots-row-pin {
	padding-top: 20px;
	width: 50px;
	height: 100%;
}

.ballots-row-pin img {
	width: 29px;
	height: 29px;
}

.ballots-row-content {
	width: calc(100% - 50px - 120px);
	height: 100%;
	padding-top: 10px;
}

</style>