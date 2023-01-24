<script>

import App from '../../App.vue';
import { api } from '../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';
import VueAvatarUpload from 'vue-avatar-upload';
import AvatarBadgeProfile from '../AvatarBadgeProfile.vue';
import OuterNav from '../OuterNav.vue';
import OuterFooter from '../OuterFooter.vue';

import 'vue-avatar-upload/lib/style.css';
import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		AvatarBadgeProfile,
		Popper,
		ClipLoader,
		Modal,
		VueAvatarUpload,
		OuterNav,
		OuterFooter
	},

	data() {
		return {
			loading:           false,

			pseudonym:          this.$route.params.pseudonym,
			arg_validator:      this.$route.query.v,

			profile_type:       null,
			registered_at:      null,
			avatar_url:         null,
			role:               null,
			kyc_status:         null,
			kyc_hash:           null,
			verified_at:        null,
			blockchain_name:    null,
			blockchain_desc:    null,
			blockchain_logo:    null,
			nodes:              [],
			selected_validator: null,

			validator_fee:      null,
			total_stake:        null,
			self_stake:         null,
			uptime:             null,

			progressBarWidth:    0 + '%'
		}
	},

	created() {
		if (
			!this.pseudonym ||
			this.pseudonym == ''
		) {
			this.$root.routeTo('/validator-selection-tool');
		}

		this.getPublicProfile();
	},

	mounted() {
		let that = this;
	},

	watch: {
		'$route' (to, from) {
			this.pseudonym = this.$route.params.pseudonym;
		},

		selected_validator: function(e) {
			this.uptime        = null;
			this.validator_fee = null;
			this.total_stake   = null;
			this.self_stake    = null;

			this.progressBarWidth  = 0 + '%';

			if (this.selected_validator) {
				this.getNodeData();
			}

			if (this.selected_validator === '') {
				this.validator_fee = 0;
				this.total_stake   = 0;
				this.self_stake    = 0;
				this.uptime        = 0;
			}
		}
	},

	methods: {
		async getPublicProfile() {
			const response = await api(
				'GET',
				'public/get-profile',
				{
					pseudonym: this.pseudonym
				}
			);

			if (response.status == 200) {
				// console.log(response);
				this.profile_type    = response.detail.account_type;
				this.registered_at   = response.detail.registered_at;
				this.avatar_url      = response.detail.avatar_url;
				this.role            = response.detail.role;
				this.kyc_status      = response.detail.kyc_status;
				this.kyc_hash        = response.detail.kyc_hash;
				this.verified_at     = response.detail.verified_at;
				this.blockchain_name = response.detail.blockchain_name;
				this.blockchain_desc = response.detail.blockchain_desc;
				this.blockchain_logo = response.detail.blockchain_logo;
				this.nodes           = response.detail.nodes;

				if (
					this.nodes &&
					this.nodes.length > 0
				) {
					if (this.arg_validator) {
						this.selected_validator = this.arg_validator;
					} else {
						this.selected_validator = this.nodes[0].public_key;
					}
				} else {
					this.selected_validator = '';
				}
			} else {
				this.$root.routeTo('/validator-selection-tool');
			}
		},

		async getNodeData() {
			const response = await api(
				'GET',
				'public/get-node-data',
				{
					public_key: this.selected_validator
				}
			);

			if (response.status == 200) {
				// console.log(response);
				this.validator_fee = response.detail.fee;
				this.total_stake   = response.detail.stake_amount;
				this.self_stake    = response.detail.self_stake;
				this.uptime        = response.detail.uptime;

				this.progressBarWidth  = `${parseInt(this.uptime)}%`;
			} else {
				this.validator_fee = 0;
				this.total_stake   = 0;
				this.self_stake    = 0;
				this.uptime        = 0;
			}
		},

		gotoKycHash() {
			let url = `${import.meta.env.VITE_API_URL}/public/ca-kyc-hash/${this.kyc_hash}`;
			window.open(url);
		},

		copyValidatorId(e) {
			let that = this;
			let vid = this.$refs.selected_validator.value;
			copyText(vid, undefined, function(e) {
				that.$root.toast("Public key copied to clipboard", "", "info");
			});
		}
	},
};

</script>

<template>
	<div class="landing-container">
		<OuterNav></OuterNav>

		<div class="container max-1200 white pt50">
			<div class="row">
				<div class="col-md-12 pt50">
					<p class="mt40 fs22 text-center">
						Validator Tools / Profile
					</p>
				</div>
			</div>
		</div>

		<div class="container max-1200 pt20 min-calc">
			<div class="row">
				<div class="col-12 mt20">
					<div class="go-back2 mb10" @click="this.$router.back()">
						<i class="fa fa-arrow-left"></i>
						Back
					</div>

					<div class="card">
						<div class="card-title">
							Validator Profile
						</div>
						<div class="card-body">
							<div class="profile-row border-bottom">
								<div class="profile-icon">
									<AvatarBadgeProfile 
										:url="avatar_url" 
										:role="role" 
										:kyc="kyc_status"
									></AvatarBadgeProfile>
								</div>

								<table class="table profile-table mt10">
									<tr>
										<td class="bold tr-left">
											Name:
										</td>
										<td class="tr-right">
											<div v-if="pseudonym === null">
												<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
											</div>
											<div v-else>
												{{
													pseudonym + (
														blockchain_name ?
														`, ${blockchain_name}` :
														''
													)
												}}
											</div>
										</td>
									</tr>
									<tr>
										<td class="tr-left">
											&ensp;
										</td>
										<td class="tr-right">
											<div v-if="blockchain_desc === null">
												<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
											</div>
											<div v-else>
												{{ blockchain_desc }}
											</div>
										</td>
									</tr>
									<tr>
										<td class="bold tr-left">
											Registered:
										</td>
										<td class="tr-right">
											<div v-if="registered_at === null">
												<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
											</div>
											<div v-else>
												{{ registered_at }}
											</div>
										</td>
									</tr>
									<tr>
										<td class="bold tr-left">
											Member Type:
										</td>
										<td class="tr-right">
											<div v-if="profile_type === null">
												<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
											</div>
											<div v-else>
												{{ profile_type }}
											</div>
										</td>
									</tr>
									<tr>
										<td class="bold tr-left">
											Membership Status:
										</td>
										<td class="tr-right">
											<div v-if="kyc_status === null">
												<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
											</div>
											<div v-else>
												<span v-if="kyc_status == 'approved'" class="text-green bold">
													Verified
												</span>
												<span class="text-red bold" v-else-if="kyc_status == 'denied'">
													Under review
												</span>
												<span v-else class="op5 bold">
													Pending
												</span>

												<span v-if="kyc_hash" class="op5 pointer fs12" @click="gotoKycHash">
													&ensp;
													<u>{{ this.$root.formatHash(kyc_hash, 15) }}</u>
												</span>
											</div>
										</td>
									</tr>
									<tr>
										<td class="bold tr-left">
											Verified Since:
										</td>
										<td class="tr-right">
											<div v-if="verified_at === null">
												<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
											</div>
											<div v-else>
												<div v-if="!verified_at">
													Not Verified
												</div>
												<div v-else>
													{{ verified_at }}
												</div>
											</div>
										</td>
									</tr>
								</table>
							</div>

							<div v-if="role == 'admin'" class="profile-row mt20">
								Admin: {{ pseudonym }}
							</div>

							<div v-else-if="role == 'sub-admin'" class="profile-row mt20">
								Moderator: {{ pseudonym }}
							</div>

							<div v-else class="profile-row">
								<table class="table profile-table mt20">
									<tr>
										<td class="bold tr-left">
											Node Address:
										</td>
										<td>
											<div v-if="selected_validator === null">
												<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
											</div>
											<div v-else>
												<select class="form-select select-with-copy inline" ref="selected_validator" v-model="selected_validator">
													<option v-for="(value, index) in nodes" :value="value.public_key" :selected="index == 0">{{ value.public_key }}</option>
												</select>
												<i class="fa fa-clipboard fs16 inline pointer ml10" @click="copyValidatorId"></i>
											</div>
										</td>
									</tr>
									<tr>
										<td class="bold tr-left">
											Validator Fee:
										</td>
										<td>
											<div v-if="validator_fee === null">
												<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
											</div>
											<div v-else>
												{{ validator_fee }}%
											</div>
										</td>
									</tr>
									<tr>
										<td class="bold tr-left">
											Total Stake:
										</td>
										<td>
											<div v-if="total_stake === null">
												<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
											</div>
											<div v-else>
												{{ total_stake.toLocaleString('en-US') }}
												<img src="@/assets/images/favicon.png" class="tiny-img">
											</div>
										</td>
									</tr>
									<tr>
										<td class="bold tr-left">
											Self Stake:
										</td>
										<td>
											<div v-if="self_stake === null">
												<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
											</div>
											<div v-else>
												{{ self_stake.toLocaleString('en-US') }}
												<img src="@/assets/images/favicon.png" class="tiny-img">
											</div>
										</td>
									</tr>
								</table>
							</div>

							<div v-if="role != 'admin' && role != 'sub-admin'">
								<p class="bold">
									Uptime
								</p>
								<div v-if="uptime === null">
									<ClipLoader class="clip-loader-inline" size="25px" color="#ff2d2e"></ClipLoader>
								</div>
								<div v-else class="progress-bar-wrap">
									<div class="progress-bar" :style="{ '--progressBarWidth': progressBarWidth }"></div>
									<span class="progress-bar-center">
										{{ uptime }}%
									</span>
								</div>
							</div>

							<p class="mt20"></p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<OuterFooter></OuterFooter>
	</div>
</template>

<style scoped>

.tr-left {
	width: 220px;
	padding-top: 5px;
}

.tr-right {
	width: calc(100% - 220px);
	padding-top: 5px;
}

.min-calc {
	min-height: calc(100vh - 80px);
}

.max-1200 {
	max-width: 1200px;
}

.box-shadow {
	box-shadow: 0px 2px 6px rgba(0,0,0,0.29);
}

.nmt50 {
	transform: translateY(-50px);
	-o-transform: translateY(-50px);
	-ms-transform: translateY(-50px);
	-moz-transform: translateY(-50px);
	-webkit-transform: translateY(-50px);
}

.landing-container {
	background-image: url('@/assets/images/bg2.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: auto;
	min-height: 100vh;
	background-attachment: fixed;
}

.profile-row {
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 175px;
	height: auto;
	position: relative;
	padding-bottom: 15px;
}

.profile-icon {
	width: 160px;
	padding-top: 15px;
	padding-bottom: 15px;
	padding-right: 10px;
}

.profile-icon img {
	width: 90px;
	height: 90px;
	border-radius: 10px;
}

.profile-table {
	width: calc(100% - 160px);
	height: 100%;
	padding-top: 10px;
	padding-left: 10px;
	font-size: 14px;
}

td div {
	padding: 0;
}

td {
	padding-top: 5px;
}

.progress-bar-wrap {
	margin-bottom: 4px;
	height: 23px;
	width: 400px;
	border-radius: 8px;
	background-color: #cacbcc;
	position: relative;
	display: block;
}

.progress-bar {
	background-color: #ff2d2e;
	border-radius: 8px;
	width: var(--progressBarWidth);
	height: 100%;
}

.progress-bar-center {
	position: absolute;
	top: 1px;
	left: calc(50% - 50px);
	font-weight: bold;
	font-size: 13px;
	color: #fff;
	text-align: center;
	width: 100px;
}

@media all and (max-width: 767px) {
	.progress-bar-wrap {
		width: 100%;
	}

	.tr-left {
		width: 150px;
		font-size: 13px;
	}

	.tr-right {
		width: calc(100% - 150px);
		font-size: 13px;
	}

	.select-with-copy {
		width: calc(100% - 35px);
	}
}

</style>