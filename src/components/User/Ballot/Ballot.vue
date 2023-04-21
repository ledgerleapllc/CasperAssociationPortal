<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';
import moment from 'moment';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal
	},

	data() {
		return {
			ballot_id: parseInt(this.$route.params.ballot_id),
			title:               null,
			time_remaining:      null,
			time_remaining_perc: null,
			description:         null,
			files_attached:      null,
			votes_for:           null,
			votes_against:       null,
			status:              null,
			my_vote:             null,
			anti_my_vote:        null,
			end_time:            null,

			flipVoteModalIsOpen: false,
			isClickOut: false,
		}
	},

	created() {
		this.getBallot();
	},

	mounted() {
		let that = this;

		if (
			!this.ballot_id ||
			this.ballot_id == 0 ||
			isNaN(parseInt(this.ballot_id))
		) {
			this.$root.routeTo(`/u/ballots/active`);
		}
	},

	watch: {
		'$route' (to, from) {
			this.ballot_id = parseInt(this.$route.params.ballot_id);
		}
	},

	methods: {
		async getBallot() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-ballot',
				{
					ballot_id: this.ballot_id
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.status              = response.detail?.status;
				this.title               = response.detail?.title;
				this.time_remaining      = response.detail?.time_remaining;
				this.time_remaining_perc = response.detail?.time_remaining_perc;
				this.description         = response.detail?.description;
				this.files_attached      = response.detail?.files_attached;
				this.votes_for           = response.detail?.votes_for;
				this.votes_against       = response.detail?.votes_against;
				this.my_vote             = response.detail?.my_vote;
				this.end_time            = response.detail?.end_time;
				this.start_time          = response.detail?.start_time;

				if (this.my_vote == 'for') {
					this.anti_my_vote = 'against';
				} else {
					this.anti_my_vote = 'for';
				}

				if (this.time_remaining_perc > 0) {
					this.startCountdown();
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

		startCountdown() {
			let that = this;
			setInterval(function() {
				that.countdownTick();
			}, 1000);
		},

		countdownTick() {
			if (this.time_remaining == "00:00:00:00") {
				return;
			}

			let split  = this.time_remaining.split(':');
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

			this.time_remaining = `${day}:${hour}:${minute}:${second}`;

			let numerator = (
				moment.utc(this.end_time).unix() - 
				moment().unix()
			);

			let denominator = (
				moment.utc(this.end_time).unix() - 
				moment.utc(this.start_time).unix()
			);

			numerator   = numerator   <= 0 ? 1 : numerator;
			denominator = denominator <= 0 ? 1 : denominator;

			this.time_remaining_perc = (
				numerator / 
				denominator *
				100
			).toFixed(4);

			if (this.time_remaining_perc < 0) {
				this.time_remaining_perc = 0;
			}
		},

		gotoProfile(pseudonym) {
			this.$root.routeTo(`/u/profile/${pseudonym}`);
		},

		flipVote() {
			this.flipVoteModalIsOpen = true;
		},

		cancelflipVote() {
			this.flipVoteModalIsOpen = false;
		},

		async _flipVote() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/vote',
				{
					"ballot_id": this.ballot_id,
					"direction": "flip"
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.flipVoteModalIsOpen = false;
				this.getBallot();
				this.$root.toast(
					'', 
					response.message, 
					'success'
				);
			}
		},

		async voteFor() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/vote',
				{
					"ballot_id": this.ballot_id,
					"direction": "for"
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.getBallot();
				this.$root.toast(
					'', 
					response.message, 
					'success'
				);
			}
		},

		async voteAgainst() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/vote',
				{
					"ballot_id": this.ballot_id,
					"direction": "against"
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.getBallot();
				this.$root.toast(
					'', 
					response.message, 
					'success'
				);
			}
		}
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="go-back" @click="this.$router.back()">
					<i class="fa fa-arrow-left"></i>
					Votes
				</div>
				<div class="card mt20">
					<div class="card-body">
						<div class="b-result-row">
							<div class="b-result-row-left fs16">
								Result:
							</div>
							<div v-if="this.votes_for === null" class="b-result-row-right">
								<ClipLoader class="clip-loader-inline" size="25px" color="#ff2d2e"></ClipLoader>
							</div>
							<div v-else class="b-result-row-right">
								<p class="fs16">
									For
									<Popper hover arrow placement="top" class="fs11" content="Amount of votes 'for' this ballot">
										<i class="fa fa-info-circle text-red fs14"></i>
									</Popper>
								</p>
								<div class="progress-bar-wrap max-width-400">
									<p>{{ votes_for }}%</p>
									<div class="progress-bar" :style="`width:${votes_for}%`"></div>
								</div>

								<p class="fs16 pt10">
									Against
									<Popper hover arrow placement="top" class="fs11" content="Amount of votes 'against' this ballot">
										<i class="fa fa-info-circle text-red fs14"></i>
									</Popper>
								</p>
								<div class="progress-bar-wrap max-width-400">
									<p>{{ votes_against }}%</p>
									<div class="progress-bar" :style="`width:${votes_against}%`"></div>
								</div>
							</div>
						</div>

						<div class="b-result-row mt30">
							<div class="b-result-row-left fs16">
								Ballot Title:
							</div>
							<div v-if="this.title === null" class="b-result-row-right">
								<ClipLoader class="clip-loader-inline" size="25px" color="#ff2d2e"></ClipLoader>
							</div>
							<div v-else class="b-result-row-right">
								<p class="fs16">
									{{ title }}
								</p>
							</div>
						</div>

						<div class="b-result-row mt30">
							<div class="b-result-row-left fs16">
								Time Remaining:
							</div>
							<div v-if="this.time_remaining === null" class="b-result-row-right">
								<ClipLoader class="clip-loader-inline" size="25px" color="#ff2d2e"></ClipLoader>
							</div>
							<div v-else class="b-result-row-right">
								<div v-if="status == 'active'">
									<div class="progress-bar-wrap max-width-400">
										<p>{{ time_remaining }}</p>
										<div class="progress-bar" :style="`width:${time_remaining_perc}%`"></div>
									</div>

									<div class="mt20" v-if="my_vote != ''">
										You voted <b>{{ my_vote }}</b> this ballot
										<div v-if="status == 'active'">
											<p class="fs12 op7 mt10">
												You still have time to change your mind and flip your vote.
											</p>
											<button class="btn btn-sm btn-success fs12 mt5" @click="flipVote()">
												Flip My Vote
											</button>
										</div>
									</div>

									<div v-else>
										<form @submit.prevent>
											<div class="form-group mt20">
												<button class="btn btn-success width-150 mr5" @click="voteFor()">
													Vote For
												</button>
												<button class="btn btn-black width-150" @click="voteAgainst()">
													Vote Against
												</button>
											</div>
										</form>
									</div>
								</div>

								<div v-else-if="status == 'pending'" class="fs16">
									Voting not yet started
								</div>

								<div v-else-if="status == 'done'" class="fs16">
									<span v-if="votes_for > votes_against" class="fs16 text-green">
										Passed
									</span>
									<span v-if="votes_for < votes_against" class="fs16 text-red">
										Failed
									</span>
									<span v-if="votes_for == votes_against" class="fs16 text-yellow">
										Tied
									</span>

									<span class="fs14">
										&ensp;{{ end_time }} UTC
									</span>
								</div>
							</div>
						</div>

						<p class="fs16 mt30 bold">
							Description:
						</p>

						<p class="fs16 mt10">
							<div v-if="this.description === null" class="b-result-row-right">
								<ClipLoader class="clip-loader-inline" size="25px" color="#ff2d2e"></ClipLoader>
							</div>
							<div v-else>
								{{ description }}
							</div>
						</p>

						<p class="fs16 mt30 bold">
							Files Attached:
						</p>

						<p class="fs16 mt10">
							<div v-if="this.files_attached === null" class="b-result-row-right">
								<ClipLoader class="clip-loader-inline" size="25px" color="#ff2d2e"></ClipLoader>
							</div>
							<div v-else>
								{{ files_attached }}
							</div>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Modal
		v-model="flipVoteModalIsOpen" 
		max-width="400px"
		:click-out="isClickOut"
		:clickOut="true"
	>
		<div class="modal-container">
			<p class="pb15 bold fs17 border-bottom">Flip Vote</p>

			<p class="pt15 pb15">You are currently voting <b>{{ my_vote }}</b> this ballot. Flip your decision to <b>{{ anti_my_vote }}</b>?</p>

			<button class="btn btn-success btn-sm mt15" @click="_flipVote()">
				Flip My Vote
			</button>
			<button class="btn btn-black btn-sm mt15 ml5" @click="cancelflipVote">
				Cancel
			</button>
		</div>
	</Modal>
</template>

<style scoped>

.b-result-row {
	display: flex;
	flex-direction: row;
}

.b-result-row-left {
	width: 200px;
	font-weight: bold;
}

.b-result-row-right {
	width: calc(100% - 200px);
}

</style>