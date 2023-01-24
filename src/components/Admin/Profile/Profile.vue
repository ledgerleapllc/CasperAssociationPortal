<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';
import VueAvatarUpload from 'vue-avatar-upload';
import AvatarBadgeProfile from '../../AvatarBadgeProfile.vue';

import 'vue-avatar-upload/lib/style.css';
import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		AvatarBadgeProfile,
		Popper,
		ClipLoader,
		Modal,
		VueAvatarUpload
	},

	data() {
		return {
			identifier: this.$route.params.identifier,

			profile_guid:        null,
			profile_type:        null,
			role:                null,
			profile_pseudonym:   null,
			profile_created_at:  null,
			profile_avatar_url:  null,
			profile_kyc_status:  null,
			profile_verified_at: null,
			profile_kyc_hash:    null,
			blockchain_name:     null,
			blockchain_desc:     null,
			blockchain_logo:     null,
			profile_nodes:       [],
			selected_validator:  null,

			validator_fee:       null,
			total_stake:         null,
			self_stake:          null,
			uptime:              null,
			updates:             null,

			progressBarWidth:    0 + '%',
			progressBarWidth2:   0 + '%',

			avatarModalOpen:     false,
			isClickOut:          false,
			api_url:             import.meta.env.VITE_API_URL
		}
	},

	created() {
		if (
			!this.identifier ||
			this.identifier == ''
		) {
			this.$root.routeTo('/a/dashboard');
		}

		this.getProfile();
	},

	mounted() {
		let that = this;
	},

	watch: {
		'$route' (to, from) {
			this.identifier = this.$route.params.identifier;
		},

		selected_validator: function(e) {
			this.uptime        = null;
			this.updates       = null;
			this.validator_fee = null;
			this.total_stake   = null;
			this.self_stake    = null;

			this.progressBarWidth  = 0 + '%';
			this.progressBarWidth2 = 0 + '%';

			if (this.selected_validator) {
				this.getNodeData();
			}

			if (this.selected_validator === '') {
				this.validator_fee = 0;
				this.total_stake   = 0;
				this.self_stake    = 0;
				this.uptime        = 0;
				this.updates       = 0;
			}
		}
	},

	methods: {
		async getProfile() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-profile',
				{
					identifier: this.identifier
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.profile_guid        = response.detail.guid;
				this.profile_type        = response.detail.account_type;
				this.role                = response.detail.role;
				this.profile_pseudonym   = response.detail.pseudonym;
				this.profile_created_at  = response.detail.created_at;
				this.profile_avatar_url  = response.detail.avatar_url;
				this.profile_kyc_status  = response.detail.kyc_status;
				this.profile_kyc_hash    = response.detail.kyc_hash;
				this.profile_verified_at = response.detail.verified_at;
				this.profile_nodes       = response.detail.nodes;
				this.blockchain_name     = response.detail.blockchain_name;
				this.blockchain_desc     = response.detail.blockchain_desc;
				this.blockchain_logo     = response.detail.blockchain_logo;

				if (this.role == 'admin') {
					this.profile_type = 'Admin';
				}

				if (this.role == 'sub-admin') {
					this.profile_type = 'Moderator';
				}

				if (
					this.profile_nodes &&
					this.profile_nodes.length > 0
				) {
					this.selected_validator = this.profile_nodes[0].public_key;
				} else {
					this.selected_validator = '';
				}
			} else {
				this.$root.routeTo('/a/dashboard');
			}
		},

		async getNodeData() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-node-data',
				{
					public_key: this.selected_validator
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.validator_fee = response.detail.fee;
				this.total_stake   = response.detail.stake_amount;
				this.self_stake    = response.detail.self_stake;
				this.uptime        = response.detail.uptime;
				this.updates       = response.detail.updates;

				this.progressBarWidth  = `${parseInt(this.uptime)}%`;
				this.progressBarWidth2 = `${parseInt(this.updates)}%`;
			} else {
				this.validator_fee = 0;
				this.total_stake   = 0;
				this.self_stake    = 0;
				this.uptime        = 0;
				this.updates       = 0;
			}
		},

		gotoKycHash() {
			let url = `${import.meta.env.VITE_API_URL}/public/ca-kyc-hash/${this.profile_kyc_hash}`;
			window.open(url);
		},

		avatarSuccess(msg) {
			this.avatarModalOpen = false;
			this.$root.toast(
				'Success',
				'Avatar image updated!',
				'success'
			);
			this.getProfile();
			this.$root.getMe();
		},

		avatarError(err) {
			let code = err.message;
			let msg = 'There was a problem updating your avatar at this time. Please try again later';

			if (code == 'Too Many Requests') {
				msg = 'You are trying to change your avatar too often.';
			} else if (code == 'Unsupported Media Type') {
				msg = '';
			}  else if (code == 'Request Entity Too Large') {
				msg = 'Avatar image too large. Cannot exceed 1 MB';
			}

			this.$root.toast(
				'Oops',
				msg,
				'error'
			);
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
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="card-title">
						User Profile
					</div>
					<div class="card-body">
						<div class="profile-row border-bottom">
							<div v-if="this.identifier == this.$root.guid || this.identifier == this.$root.pseudonym" class="profile-icon">
								<AvatarBadgeProfile 
									class="pointer" 
									@click="avatarModalOpen = true" 
									:url="profile_avatar_url" 
									:role="role" 
									:kyc="profile_kyc_status">
								</AvatarBadgeProfile>
							</div>
							<div v-else class="profile-icon">
								<AvatarBadgeProfile 
									:url="profile_avatar_url" 
									:role="role" 
									:kyc="profile_kyc_status"
								></AvatarBadgeProfile>
							</div>

							<table class="table profile-table mt10">
								<tr>
									<td class="bold tr-left">
										Name:
									</td>
									<td class="tr-right">
										<div v-if="profile_pseudonym === null">
											<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
										</div>
										<div v-else>
											{{
												profile_pseudonym + (
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
										<div v-if="profile_created_at === null">
											<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
										</div>
										<div v-else>
											{{ profile_created_at }}
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
										<div v-if="profile_kyc_status === null">
											<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
										</div>
										<div v-else>
											<span v-if="profile_kyc_status == 'pending'" class="op5 bold">
												Pending
											</span>
											<span v-else-if="profile_kyc_status == 'approved'" class="text-green bold">
												Verified
											</span>
											<span v-else-if="profile_kyc_status == 'denied'" class="text-red bold">
												Under Review
											</span>
											<span v-else>
												Not Verified
											</span>

											<span v-if="profile_kyc_hash" class="op5 pointer fs12" @click="gotoKycHash">
												&ensp;
												<u>{{ this.$root.formatHash(profile_kyc_hash, 15) }}</u>
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td class="bold tr-left">
										Verified Since:
									</td>
									<td class="tr-right">
										<div v-if="profile_kyc_status === null">
											<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
										</div>
										<div v-else>
											{{
												profile_verified_at ?
												profile_verified_at :
												'Not Verified'
											}}
										</div>
									</td>
								</tr>
							</table>
						</div>

						<div v-if="role == 'admin'" class="profile-row mt20">
							Admin: {{ profile_guid }}
						</div>

						<div v-else-if="role == 'sub-admin'" class="profile-row mt20">
							Moderator: {{ profile_guid }}
						</div>

						<div v-else class="profile-row">
							<table class="table profile-table mt20">
								<tr>
									<td class="bold tr-left">
										Node Address:
									</td>
									<td class="tr-right">
										<div v-if="selected_validator === null">
											<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
										</div>
										<div v-else>
											<select class="form-select select-with-copy max-width-700 inline" ref="selected_validator" v-model="selected_validator">
												<option v-for="(value, index) in this.profile_nodes" :value="value.public_key" :selected="index == 0">{{ value.public_key }}</option>
											</select>
											<i class="fa fa-clipboard fs16 pointer inline ml10" @click="copyValidatorId"></i>
										</div>
									</td>
								</tr>
								<tr>
									<td class="bold tr-left">
										Validator Fee:
									</td>
									<td class="tr-right">
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
									<td class="tr-right">
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
									<td class="tr-right">
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

							<p class="bold mt20">
								Update Responsiveness
							</p>
							<div v-if="updates === null">
								<ClipLoader class="clip-loader-inline" size="25px" color="#ff2d2e"></ClipLoader>
							</div>
							<div v-else class="progress-bar-wrap">
								<div class="progress-bar2" :style="{ '--progressBarWidth2': progressBarWidth2 }"></div>
								<span class="progress-bar-center">
									{{ updates }}%
								</span>
							</div>
						</div>

						<p class="mt20"></p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Modal
		v-model="avatarModalOpen"
		max-width="400px"
		:click-out="isClickOut"
	>
		<div class="modal-container">
			<h5 class="pb15">Update Avatar</h5>

			<VueAvatarUpload
				lang="en"
				:avatar="this.$root.avatar_url"
				:url="this.api_url+'/admin/update-avatar'"
				field="avatar"
				method="POST"
				:headers="{
					'Authorization': 'Bearer '+this.$root.bearer_token
				}"
				@error="this.avatarError"
				@close="this.avatarModalOpen = false"
				@success="this.avatarSuccess"
			>
			</VueAvatarUpload>
		</div>
	</Modal>
</template>

<style scoped>

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

.tr-left {
	width: 220px;
	padding-top: 5px;
}

.tr-right {
	width: calc(100% - 220px);
	padding-top: 5px;
}

.progress-bar-wrap {
	margin-bottom: 4px;
	height: 23px;
	width: 50%;
	max-width: 450px;
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

.progress-bar2 {
	background-color: #ff2d2e;
	border-radius: 8px;
	width: var(--progressBarWidth2);
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
	letter-spacing: 1px;
}

@media all and (max-width: 991px) {
	.progress-bar-wrap {
		width: 100%;
	}
}

@media all and (max-width: 767px) {
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