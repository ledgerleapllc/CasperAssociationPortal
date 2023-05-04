<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import DefaultAvatarUrl from '@/assets/images/avatar.svg';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';

import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal
	},

	data() {
		return {
			user_guid:  this.$route.params.user_guid,

			email:               null,
			account_type:        null,
			first_name:          null,
			last_name:           null,
			pseudonym:           null,
			telegram:            null,
			letter:              null,

			nodes:               [],
			selected_validator:  null,
			node_status:         null,
			total_stake:         null,
			validator_fee:       null,
			uptime:              null,
			eras_active:         null,
			eras_since_redmark:  null,
			total_redmarks:      null,

			membership_status:   null,
			kyc_status:          null,
			declined_reason:     null,
			dob:                 null,
			country_citizenship: null,
			reference_id:        null,
			id_check:            null,
			address_check:       null,
			background_check:    null,
			manual_review:       null,
			reviewed_at:         null,
			reviewed_by:         null,
			review_modal:        false,
			review_modal_i:      false,
			names_match_checkbox:false,
			cmp_checked:         null,
			flip_cmp_modal:      false,

			entity_name:         null,
			entity_type:         null,
			entity_reg_number:   null,
			entity_country:      null,
			entity_tax_id:       null,
			document_url:        null,
			document_page:       null,

			block_nodes:         null,
			block_discussions:   null,
			block_votes:         null,
			block_perks:         null,

			enable_block:        false,
			backoffice_modal:    false,
			manual_kyc_modal:    false,
			manual_action:       ''
		}
	},

	created() {
		if (
			!this.user_guid ||
			this.user_guid == ''
		) {
			this.$root.routeTo('/a/users');
		}

		this.getUser();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async getUser() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-user',
				{
					guid: this.user_guid
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);

				// personal
				this.email         = response.detail.email;
				this.first_name    = response.detail.pii_data.first_name ?? '';
				this.last_name     = response.detail.pii_data.last_name ?? '';
				this.account_type  = response.detail.account_type ?? '';
				this.pseudonym     = response.detail.pseudonym ?? '';
				this.telegram      = response.detail.telegram ?? '';
				this.letter        = response.detail.letter ?? '';
				this.nodes         = response.detail.nodes;

				this.membership_status   = response.detail.membership_status ?? 'Not Verified';

				// kyc
				this.kyc_status          = response.detail.kyc.kyc_status ?? 'Not Verified';
				this.declined_reason     = response.detail.kyc.declined_reason ?? '';
				this.reference_id        = response.detail.kyc.reference_id ?? '';
				this.dob                 = response.detail.pii_data.dob ?? '';
				this.country_citizenship = response.detail.pii_data.country_citizenship ?? '';
				this.manual_review       = parseInt(response.detail.kyc.manual_review) ?? 0;
				this.reviewed_at         = response.detail.kyc.reviewed_at ?? '';
				this.reviewed_by         = response.detail.kyc.reviewed_by ?? '';
				this.cmp_checked         = parseInt(response.detail.kyc.cmp_checked) ?? 0;
				this.id_check            = parseInt(response.detail.kyc.id_check) ?? 0;
				this.address_check       = parseInt(response.detail.kyc.address_check) ?? 0;
				this.background_check    = parseInt(response.detail.kyc.background_check) ?? 0;

				// entity
				this.entity_name       = response.detail.entity.entity_name ?? '';
				this.entity_type       = response.detail.entity.entity_type ?? '';
				this.entity_reg_number = response.detail.entity.registration_number ?? '';
				this.entity_country    = response.detail.entity.registration_country ?? '';
				this.entity_tax_id     = response.detail.entity.tax_id ?? '';
				this.document_url      = response.detail.entity.document_url ?? '';
				this.document_page     = response.detail.entity.document_page ?? '';

				if (this.id_check) {
					this.id_check = 'Approved';
				} else {
					this.id_check = 'Not verified';
				}

				if (this.address_check) {
					this.address_check = 'Approved';
				} else {
					this.address_check = 'Not verified';
				}

				if (this.background_check) {
					this.background_check = 'Approved';
				} else {
					this.background_check = 'Not verified';
				}

				if (this.nodes) {
					this.selected_validator = this.nodes[0];
				} else {
					this.selected_validator = '';
				}

				// get permissions
				const response2 = await api(
					'GET',
					'admin/get-permissions',
					{
						guid: this.user_guid
					},
					fetch_bearer_token
				);

				this.$root.catch401(response2);

				if (response2.status == 200) {
					this.block_nodes       = !Boolean(parseInt(response2.detail.nodes));
					this.block_discussions = !Boolean(parseInt(response2.detail.discussions));
					this.block_votes       = !Boolean(parseInt(response2.detail.ballots));
					this.block_perks       = !Boolean(parseInt(response2.detail.perks));

					let that = this;

					setTimeout(function() {
						that.enable_block = true;
					},250);
				}
			}
		},

		manuallyUpdateUserKyc(action) {
			this.manual_action    = action;
			this.manual_kyc_modal = true;
		},

		async _manuallyUpdateUserKyc() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');
			this.manual_kyc_modal  = false;

			const response = await api(
				'PUT',
				'admin/manually-update-user-kyc',
				{
					guid:            this.user_guid,
					status:          this.manual_action,
					declined_reason: this.declined_reason
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.membership_status = null;
				this.kyc_status        = null;
				this.id_check          = null;
				this.address_check     = null;
				this.background_check  = null;
				this.manual_review     = null;
				this.reviewed_at       = null;
				this.reviewed_by       = null;
				this.cmp_checked       = null;
				this.getUser();
			} else {
				this.$root.toast(
					'',
					response.message,
					'error'
				);
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
				this.node_status        = response.detail.node_status;
				this.validator_fee      = response.detail.fee;
				this.total_stake        = response.detail.stake_amount;
				this.uptime             = response.detail.uptime;
				this.eras_active        = response.detail.total_eras;
				this.total_redmarks     = response.detail.total_redmarks;
				this.eras_since_redmark = response.detail.eras_since_redmark;
			} else {
				this.node_status        = 'Offline';
				this.validator_fee      = 0;
				this.total_stake        = 0;
				this.uptime             = 0;
				this.eras_active        = 0;
				this.total_redmarks     = 0;
				this.eras_since_redmark = 0;
			}
		},

		async updatePermission(
			name,
			value
		) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'PUT',
				'admin/put-permission',
				{
					guid:       this.user_guid,
					permission: name,
					value:      value
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				console.log(response);
			}
		},

		flipCmpCheck(event) {
			if (event.target.checked == false) {
				let that = this;
				setTimeout(function() {
					that.cmp_checked    = true; 
					that.flip_cmp_modal = true;
				},100);
			} else {
				this.cmp_checked = event.target.checked;
				this._flipCmpCheck();
			}
		},

		async _flipCmpCheck() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'PUT',
				'admin/cmp-check',
				{
					guid:  this.user_guid,
					value: this.cmp_checked
				},
				fetch_bearer_token
			);

			this.flip_cmp_modal = false;
		},

		beginReview() {
			if (this.account_type == 'individual') {
				this.review_modal_i = true;
			} else {
				this.review_modal = true;
			}
		},

		gotoKycHash() {
			let url = `${import.meta.env.VITE_API_URL}/public/ca-kyc-hash/${this.profile_kyc_hash}`;
			window.open(url);
		},

		copyValidatorId(e) {
			let that = this;
			let vid  = this.$refs.selected_validator.value;
			copyText(vid, undefined, function(e) {
				that.$root.toast("Public key copied to clipboard", "", "info");
			});
		},

		copyReferenceId(e) {
			let that   = this;
			let ref_id = this.reference_id;
			copyText(ref_id, undefined, function(e) {
				that.$root.toast("Reference ID copied to clipboard", "", "info");
			});
		},

		gotoBackoffice() {
			this.backoffice_modal = false;
			this.$root.openLink('https://backoffice.shuftipro.com/reports');
		}
	},

	watch: {
		'$route' (to, from) {
			this.user_guid = this.$route.params.user_guid;
		},

		selected_validator: function(e) {
			this.node_status        = null;
			this.uptime             = null;
			this.validator_fee      = null;
			this.total_stake        = null;
			this.eras_active        = null;
			this.total_redmarks     = null;
			this.eras_since_redmark = null;

			if (this.selected_validator) {
				this.getNodeData();
			}

			if (this.selected_validator === '') {
				this.node_status        = 'Offline';
				this.validator_fee      = 0;
				this.total_stake        = 0;
				this.uptime             = 0;
				this.eras_active        = 0;
				this.total_redmarks     = 0;
				this.eras_since_redmark = 0;
			}
		},

		block_nodes: function(e) {
			if (this.enable_block) {
				this.updatePermission(
					'nodes',
					!this.block_nodes
				);
			}
		},

		block_discussions: function(e) {
			if (this.enable_block) {
				this.updatePermission(
					'discussions',
					!this.block_discussions
				);
			}
		},

		block_votes: function(e) {
			if (this.enable_block) {
				this.updatePermission(
					'ballots',
					!this.block_votes
				);
			}
		},

		block_perks: function(e) {
			if (this.enable_block) {
				this.updatePermission(
					'perks',
					!this.block_perks
				);
			}
		}
	}
};

</script>

<template>
	<div class="container-fluid" style="z-index: 0;">
		<div class="row">
			<div class="col-12 mt20">
				<div class="go-back" @click="this.$router.back()">
					<i class="fa fa-arrow-left"></i>
					Back
				</div>
				<div class="card mt20">
					<div class="card-title mb0">
						User details - 
						<span v-if="email === null">
							<ClipLoader class="clip-loader-inline" size="20px" color="#ff2d2e"></ClipLoader>
						</span>
						<span v-else>
							{{ this.$root.formatString(email, 25) }}
						</span>
					</div>
					<div class="card-body">
						<p class="fs13 op7">
							User details are displayed below with admin functions for user management.
						</p>

						<p class="fs16 text-red mt20 mb10">
							Block Access
						</p>

						<div v-if="block_nodes === null">
							<ClipLoader class="clip-loader-inline" size="20px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else>
							<input type="checkbox" id="block-nodes" class="form-check-input pointer mt5" v-model="block_nodes">
							<label class="fs14 pointer" for="block-nodes">&ensp;Nodes&emsp;&ensp;</label>

							<input type="checkbox" id="block-discussions" class="form-check-input pointer mt5" v-model="block_discussions">
							<label class="fs14 pointer" for="block-discussions">&ensp;Discussions&emsp;&ensp;</label>

							<input type="checkbox" id="block-votes" class="form-check-input pointer mt5" v-model="block_votes">
							<label class="fs14 pointer" for="block-votes">&ensp;Votes&emsp;&ensp;</label>

							<input type="checkbox" id="block-perks" class="form-check-input pointer mt5" v-model="block_perks">
							<label class="fs14 pointer" for="block-perks">&ensp;Perks&emsp;&ensp;</label>
						</div>

						<hr>

						<p class="bold mt20 fs16">
							Membership Status:&ensp;
							<span v-if="membership_status === null">
								<ClipLoader class="clip-loader-inline" size="20px" color="#ff2d2e"></ClipLoader>
							</span>
							<span v-else>
								{{ this.$root.ucfirst(membership_status) }}
							</span>
						</p>

						<p class="bold fs16">
							Node Status:&ensp;
							<span v-if="node_status === null">
								<ClipLoader class="clip-loader-inline" size="20px" color="#ff2d2e"></ClipLoader>
							</span>
							<span v-else>
								{{ this.$root.ucfirst(node_status) }}
							</span>
						</p>

						<hr>

						<p class="fs18 mt20">
							User Info
						</p>

						<table class="table profile-table mt20">
							<tr>
								<td class="bold td-left">
									Email:
								</td>
								<td class="td-right">
									<div v-if="email === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ email }}
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									GUID:
								</td>
								<td class="td-right">
									<div v-if="user_guid === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										<span class="bold underline pointer" @click="this.$root.routeTo(`/a/profile/${user_guid}`)">
											{{ user_guid }}
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Account Type:
								</td>
								<td class="td-right">
									<div v-if="account_type === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ this.$root.ucfirst(account_type) }}
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									First Name:
								</td>
								<td class="td-right">
									<div v-if="first_name === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ first_name }}
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Last name:
								</td>
								<td class="td-right">
									<div v-if="last_name === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ last_name }}
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Pseudonym:
								</td>
								<td class="td-right">
									<div v-if="pseudonym === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ pseudonym }}
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Telegram:
								</td>
								<td class="td-right">
									<div v-if="telegram === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ telegram }}
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Letter of Motivation:
								</td>
								<td class="td-right">
									<div v-if="letter === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										<a :href="letter" target="_blank">
											{{ letter }}
										</a>
									</div>
								</td>
							</tr>
						</table>

						<hr>

						<p class="mt20 mb20 fs18">
							Node Info
						</p>

						<div v-if="selected_validator === null">
							<ClipLoader class="clip-loader-inline" size="25px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else>
							<select class="form-select select-with-copy inline" ref="selected_validator" v-model="selected_validator">
								<option v-for="(public_key, index) in this.nodes" :value="public_key" :selected="index == 0">{{ public_key }}</option>
							</select>
							<i class="fa fa-clipboard fs16 pointer inline ml10" @click="copyValidatorId"></i>
						</div>

						<table class="table profile-table mt20">
							<tr>
								<td class="bold td-left">
									Member Stake:
								</td>
								<td class="td-right">
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
								<td class="bold td-left">
									Uptime:
								</td>
								<td class="td-right">
									<div v-if="uptime === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ uptime }}%
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Eras Active:
								</td>
								<td class="td-right">
									<div v-if="eras_active === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ eras_active }}
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Eras Since Redmark:
								</td>
								<td class="td-right">
									<div v-if="eras_since_redmark === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ eras_since_redmark }}
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Total Redmarks:
								</td>
								<td class="td-right">
									<div v-if="total_redmarks === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ total_redmarks }}
									</div>
								</td>
							</tr>
						</table>

						<hr>

						<p class="mt20 mb20 fs18">
							KYC Info
						</p>

						<table class="table profile-table mt20">
							<tr>
								<td class="bold td-left">
									KYC/AML Status:
								</td>
								<td class="td-right">
									<div v-if="kyc_status === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										<span 
											v-if="kyc_status == 'denied'" 
											class="text-red"
										>
											{{ this.$root.ucfirst(kyc_status) }}
										</span>
										<span 
											v-else-if="kyc_status == 'approved'" 
											class="text-green"
										>
											{{ this.$root.ucfirst(kyc_status) }}
										</span>
										<span 
											v-else-if="kyc_status == 'pending'" 
											class="op7"
										>
											{{ this.$root.ucfirst(kyc_status) }}
										</span>
										<span v-else>
											{{ this.$root.ucfirst(kyc_status) }}
										</span>
									</div>
								</td>
							</tr>
							<tr v-if="kyc_status == 'denied'">
								<td class="bold td-left">
									Denial Reason:
								</td>
								<td class="td-right fs13 op7">
									{{ declined_reason }}
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									DOB:
								</td>
								<td class="td-right">
									<div v-if="dob === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ dob ? dob : 'Unknown' }}
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Country of Citizenship:
								</td>
								<td class="td-right">
									<div v-if="country_citizenship === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ country_citizenship ? country_citizenship : 'Unknown' }}
									</div>
								</td>
							</tr>
						</table>

						<hr>

						<table class="table profile-table mt20">
							<tr>
								<td class="bold td-left">
									CMP Checked:
								</td>
								<td class="td-right">
									<div v-if="cmp_checked === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										<input type="checkbox" v-model="cmp_checked" class="form-check-input pointer" @click="flipCmpCheck">
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Reference Number:
								</td>
								<td class="td-right">
									<div v-if="reference_id === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ reference_id }}&ensp;
										<i class="fa fa-clipboard fs16 pointer" @click="copyReferenceId"></i>
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									ID Check:
								</td>
								<td class="td-right">
									<div v-if="id_check === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ id_check }}
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Address Check:
								</td>
								<td class="td-right">
									<div v-if="address_check === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ address_check }}
									</div>
								</td>
							</tr>
							<tr>
								<td class="bold td-left">
									Background Check:
								</td>
								<td class="td-right">
									<div v-if="background_check === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ background_check }}
									</div>
								</td>
							</tr>
							<tr v-if="manual_review">
								<td>&ensp;</td>
							</tr>
							<tr v-if="manual_review">
								<td class="bold td-left">
									Reviewed By:
								</td>
								<td class="td-right">
									<div v-if="reviewed_by === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</div>
									<div v-else>
										{{ reviewed_by }}<br/>
										{{ reviewed_at }}
									</div>
								</td>
							</tr>
						</table>

						<div v-if="account_type == 'entity'">
							<hr>

							<p class="mt20 mb20 fs18">
								Entity Review
							</p>

							<table class="table profile-table mt20">
								<tr>
									<td class="bold td-left">
										Entity Name:
									</td>
									<td class="td-right">
										<div v-if="entity_name === null">
											<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
										</div>
										<div v-else>
											{{ entity_name ? entity_name : 'Unknown' }}
										</div>
									</td>
								</tr>
								<tr>
									<td class="bold td-left">
										Entity Type:
									</td>
									<td class="td-right">
										<div v-if="entity_type === null">
											<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
										</div>
										<div v-else>
											{{ entity_type ? entity_type : 'Unknown' }}
										</div>
									</td>
								</tr>
								<tr>
									<td class="bold td-left">
										Entity Registration Number
									</td>
									<td class="td-right">
										<div v-if="entity_reg_number === null">
											<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
										</div>
										<div v-else>
											{{ entity_reg_number ? entity_reg_number : 'Unknown' }}
										</div>
									</td>
								</tr>
								<tr>
									<td class="bold td-left">
										Entity Registration Country:
									</td>
									<td class="td-right">
										<div v-if="entity_country === null">
											<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
										</div>
										<div v-else>
											{{ entity_country ? entity_country : 'Unknown' }}
										</div>
									</td>
								</tr>
								<tr>
									<td class="bold td-left">
										Entity VAT Number:
									</td>
									<td class="td-right">
										<div v-if="entity_tax_id === null">
											<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
										</div>
										<div v-else>
											{{ entity_tax_id ? entity_tax_id : 'Unknown' }}
										</div>
									</td>
								</tr>
								<tr>
									<td class="bold td-left">
										Document URL:
									</td>
									<td class="td-right">
										<div v-if="document_url === null">
											<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
										</div>
										<div v-else>
											<a :href="document_url" target="_blank">
												{{ document_url }}
											</a>
											<span v-if="document_page">
												 - page #{{ document_page }}
											</span>
										</div>
									</td>
								</tr>
							</table>
						</div>

						<p class="bold mt20">
							Review
						</p>

						<div v-if="kyc_status == 'approved'">
							<button class="btn btn-success btn-sm mt10 mr10" @click="manuallyUpdateUserKyc('reset')">
								Reset KYC
							</button>
						</div>

						<div v-if="kyc_status == 'denied'">
							<button 
								class="btn btn-success btn-sm mt10 mr10" 
								@click="beginReview"
							>
								Manually Review
							</button>

							<button 
								class="btn btn-success btn-sm mt10 mr10" 
								@click="manuallyUpdateUserKyc('reset')"
							>
								Reset KYC
							</button>
						</div>

						<div 
							v-if="
								kyc_status != 'approved' &&
								kyc_status != 'denied'
							"
						>
							<button class="btn btn-success btn-sm mt10 mr10" @click="manuallyUpdateUserKyc('approved')">
								Manually Approve
							</button>

							<button class="btn btn-success btn-sm mt10 mr10" @click="manuallyUpdateUserKyc('reset')">
								Reset KYC
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Modal
		v-model="flip_cmp_modal"
		max-width="400px"
		:click-out="true"
	>
		<div class="modal-container">
			<h5>
				Un-check CMP Validation
			</h5>

			<p class="mt20">
				Are you sure you want to uncheck this user's CMP validation?
			</p>

			<button class="btn btn-success form-control btn-inline ml0 mt20 mb10" @click="this.cmp_checked = false; _flipCmpCheck()">
				<i class="fa fa-check bold"></i>
				Yes
			</button>

			<button class="btn btn-success form-control btn-inline mt20 mb10" @click="flip_cmp_modal = false">
				Cancel
			</button>
		</div>
	</Modal>

	<Modal
		v-model="manual_kyc_modal"
		max-width="400px"
		:click-out="false"
	>
		<div class="modal-container">
			<h5>
				Manual KYC Update
			</h5>

			<p class="mt20">
				Are you sure you want to have this user manually {{ manual_action }}?
			</p>

			<div v-if="manual_action != 'approved'">
				<p class="mt20 op7">
					Add a reason:
				</p>

				<textarea class="form-control" v-model="declined_reason"></textarea>
			</div>

			<button class="btn btn-success form-control btn-inline ml0 mt20 mb10" @click="_manuallyUpdateUserKyc()">
				<i class="fa fa-check bold"></i>
				Proceed
			</button>

			<button class="btn btn-success form-control btn-inline mt20 mb10" @click="manual_kyc_modal = false; review_modal = true;">
				Cancel
			</button>
		</div>
	</Modal>

	<Modal
		v-model="review_modal"
		max-width="400px"
		:click-out="false"
	>
		<div class="modal-container">
			<h5>
				Manual Review
				<span class="float-right fs13 op7">
					Step 1
				</span>
			</h5>

			<p class="mt20">
				Please review the uploaded document. The user has indicated that the name can be found on page <b>{{ document_page }}</b>. If the names match, you can continue to the next step.
			</p>

			<p class="mt20">
				<a :href="document_url" target="_blank">
					<u>document1</u>
				</a>
			</p>

			<p class="mt20">
				<label>
					<input 
						type="checkbox"
						v-model="names_match_checkbox"
					>
					The name was found in the document
				</label>
			</p>

			<p class="mt20">
				If the names do not match, you will need to reset the user's KYC so that they can resubmit documents again. 
				<span 
					class="text-red underline" 
					@click="review_modal = false; manuallyUpdateUserKyc('reset')"
				>
					Reset KYC
				</span>
			</p>

			<button 
				class="btn btn-success form-control width-200 ml0 mt20"
				:disabled="!names_match_checkbox"
				:class="names_match_checkbox ? '' : 'div-disabled'" 
				@click="review_modal = false; backoffice_modal = true;"
			>
				Next
			</button>

			<br/>

			<p class="pointer underline text-red ml0 mt30" @click="review_modal = false">
				Cancel
			</p>
		</div>
	</Modal>

	<Modal
		v-model="backoffice_modal"
		max-width="400px"
		:click-out="false"
	>
		<div class="modal-container">
			<h5>
				Manual Review
				<span class="float-right fs13 op7">
					Step 2
				</span>
			</h5>

			<p class="mt20">
				To finish the review, copy the reference number and verify the user in Shufti Backoffice.
			</p>

			<p class="mt20 fs13">
				<span class="op7">
					{{ reference_id }}
				</span>
				&ensp;
				<i class="fa fa-clipboard fs16 pointer" @click="copyReferenceId"></i>
			</p>

			<button class="btn btn-success form-control width-200 ml0 mt20" @click="gotoBackoffice">
				Go to Backoffice
			</button>

			<br/>

			<p class="pointer underline text-red ml0 mt30" @click="backoffice_modal = false; review_modal = true">
				Back
			</p>
		</div>
	</Modal>

	<Modal
		v-model="review_modal_i"
		max-width="400px"
		:click-out="false"
	>
		<div class="modal-container">
			<h5>
				Manual Review
			</h5>

			<p class="mt20">
				To finish the review, copy the reference number and verify the user in Shufti Backoffice.
			</p>

			<p class="mt20 fs13">
				<span class="op7">
					{{ reference_id }}
				</span>
				&ensp;
				<i class="fa fa-clipboard fs16 pointer" @click="copyReferenceId"></i>
			</p>

			<button class="btn btn-success form-control width-200 ml0 mt20" @click="gotoBackoffice">
				Go to Backoffice
			</button>

			<br/>

			<p class="pointer underline text-red ml0 mt20" @click="review_modal_i = false">
				Cancel
			</p>
		</div>
	</Modal>
</template>

<style scoped>

td div {
	padding: 0;
}

td {
	padding-top: 5px;
}

.td-left {
	width: 280px;
}

.td-right {
	width: calc(100% 280px);
}

</style>