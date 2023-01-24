<script>

import App from '../../../../App.vue';
import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { AgGridVue } from "ag-grid-vue3";
import { Modal } from 'vue-neat-modal';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../../ag-theme-custom.css";

import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal,
		AgGridVue
	},

	data() {
		return {
			// Emailer admins
			lock_ready:             false,
			add_emailer_modal_open: false,
			new_emailer_admin:      '',
			emailer_admins:         [],
			column_defs: [
				{
					field: 'created_at',
					headerName: 'Added',
					sortable: true,
					sort: 'desc'
				},
				{
					field: 'email',
					headerName: 'Email',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<span class="bold pointer">${params.value}</span>`
					},
					onCellClicked: (event) => {
						let guid = event.data.guid;

						if (guid && guid != '') {
							this.$root.routeTo(`/a/profile/${guid}`);
						}
					}
				},
				{
					field: '',
					headerName: 'Action',
					sortable: false,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';
						return `<button class="btn btn-success btn-sm fs12">Remove</span>`
					},
					onCellClicked: (event) => {
						let email = event.data.email;

						if (email) {
							this.deleteEmailerAdmin(email);
						}
					}
				},
			],

			quickFilterText:     "",
			quickFilterCategory: "",
			gridApi:             null,

			defaultColDef: {
				flex:      1,
				minWidth:  100,
				resizable: true,
			},

			reinstatement_contact:    '',

			email_letter_uploaded:    '',
			email_kyc_needs_review:   '',
			email_welcome:            '',
			email_node_verified:      '',
			email_letter_received:    '',
			email_letter_approved:    '',
			email_letter_denied:      '',
			email_new_perk:           '',
			email_vote_started:       '',
			email_vote_reminder:      '',
			email_probation:          '',
			email_revoked:            '',

			enabled_letter_uploaded:  false,
			enabled_kyc_needs_review: false,
			enabled_welcome:          false,
			enabled_node_verified:    false,
			enabled_letter_received:  false,
			enabled_letter_approved:  false,
			enabled_letter_denied:    false,
			enabled_new_perk:         false,
			enabled_vote_started:     false,
			enabled_vote_reminder:    false,
			enabled_probation:        false,
			enabled_revoked:          false,

			loading: {
				email_letter_uploaded:    false,
				email_kyc_needs_review:   false,
				email_welcome:            false,
				email_node_verified:      false,
				email_letter_received:    false,
				email_letter_approved:    false,
				email_letter_denied:      false,
				email_new_perk:           false,
				email_vote_started:       false,
				email_vote_reminder:      false,
				email_probation:          false,
				email_revoked:            false
			}
		}
	},

	created() {
		this.getEmailerAdmins();
		this.getEmailerTriggers();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async getEmailerAdmins() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-emailer-admins',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.emailer_admins = response.detail;
			}
		},

		async getEmailerTriggers() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-emailer-triggers',
				{},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.email_letter_uploaded    = response.detail.email_letter_uploaded;
				this.email_kyc_needs_review   = response.detail.email_kyc_needs_review;
				this.email_welcome            = response.detail.email_welcome;
				this.email_node_verified      = response.detail.email_node_verified;
				this.email_letter_received    = response.detail.email_letter_received;
				this.email_letter_approved    = response.detail.email_letter_approved;
				this.email_letter_denied      = response.detail.email_letter_denied;
				this.email_new_perk           = response.detail.email_new_perk;
				this.email_vote_started       = response.detail.email_vote_started;
				this.email_vote_reminder      = response.detail.email_vote_reminder;
				this.email_probation          = response.detail.email_probation;
				this.email_revoked            = response.detail.email_revoked;

				this.enabled_letter_uploaded  = Boolean(response.detail.enabled_letter_uploaded);
				this.enabled_kyc_needs_review = Boolean(response.detail.enabled_kyc_needs_review);
				this.enabled_welcome          = Boolean(response.detail.enabled_welcome);
				this.enabled_node_verified    = Boolean(response.detail.enabled_node_verified);
				this.enabled_letter_received  = Boolean(response.detail.enabled_letter_received);
				this.enabled_letter_approved  = Boolean(response.detail.enabled_letter_approved);
				this.enabled_letter_denied    = Boolean(response.detail.enabled_letter_denied);
				this.enabled_new_perk         = Boolean(response.detail.enabled_new_perk);
				this.enabled_vote_started     = Boolean(response.detail.enabled_vote_started);
				this.enabled_vote_reminder    = Boolean(response.detail.enabled_vote_reminder);
				this.enabled_probation        = Boolean(response.detail.enabled_probation);
				this.enabled_revoked          = Boolean(response.detail.enabled_revoked);

				this.reinstatement_contact    = response.detail.reinstatement_contact ?? '';

				let that = this;
				setTimeout(function() {
					that.lock_ready  = true;
				},1000);
			}
		},

		onGridReady(params) {
			this.gridApi = params.api;
		},

		quickFilterCategorySelect(filter) {
			this.gridApi.setFilterModel({
				source: {
					filterType: 'text',
					type:       'contains',
					filter:     filter
				}
			});
		},

		async addEmailerAdmin() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			if (
				!this.new_emailer_admin ||
				this.new_emailer_admin == ''
			) {
				return false;
			}

			const response = await api(
				'POST',
				'admin/add-emailer-admin',
				{
					email: this.new_emailer_admin
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.add_emailer_modal_open = false;
				this.new_emailer_admin = '';
				this.getEmailerAdmins();
				this.$root.toast(
					'', 
					response.message, 
					'success'
				);
			} else {
				this.$root.toast(
					'', 
					response.message, 
					'error'
				);
			}
		},

		async deleteEmailerAdmin(email) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/delete-emailer-admin',
				{
					email: email
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.getEmailerAdmins();
				this.$root.toast(
					'', 
					response.message, 
					'success'
				);
			} else {
				this.$root.toast(
					'', 
					response.message, 
					'error'
				);
			}
		},

		async saveEmailContent(element, content) {
			this.loading[element] = true;
			this.lock_ready       = false;

			content = content.replace('\\', '');

			let result = await this.$parent.saveSetting(
				element, 
				content
			);

			if (result) {
				this.$root.toast(
					'', 
					'Updated emailer content',
					'success'
				);

				this.lock_ready = true;
				this.getEmailerTriggers();
			}

			this.loading[element] = false;
		},

		async saveReinstatementContact() {
			let result = await this.$parent.saveSetting(
				'reinstatement_contact', 
				this.reinstatement_contact
			);

			if (result) {
				this.$root.toast(
					'', 
					'Updated reinstatement contact email',
					'success'
				);

				this.lock_ready = true;
				this.getEmailerTriggers();
			}
		}
	},

	watch: {
		'enabled_letter_uploaded' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_letter_uploaded", 
					Boolean(this.enabled_letter_uploaded)
				);
			}
		},

		'enabled_kyc_needs_review' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_kyc_needs_review", 
					Boolean(this.enabled_kyc_needs_review)
				);
			}
		},

		'enabled_welcome' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_welcome", 
					Boolean(this.enabled_welcome)
				);
			}
		},

		'enabled_node_verified' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_node_verified", 
					Boolean(this.enabled_node_verified)
				);
			}
		},

		'enabled_letter_received' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_letter_received", 
					Boolean(this.enabled_letter_received)
				);
			}
		},

		'enabled_letter_approved' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_letter_approved", 
					Boolean(this.enabled_letter_approved)
				);
			}
		},

		'enabled_letter_denied' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_letter_denied", 
					Boolean(this.enabled_letter_denied)
				);
			}
		},

		'enabled_new_perk' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_new_perk", 
					Boolean(this.enabled_new_perk)
				);
			}
		},

		'enabled_vote_started' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_vote_started", 
					Boolean(this.enabled_vote_started)
				);
			}
		},

		'enabled_vote_reminder' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_vote_reminder", 
					Boolean(this.enabled_vote_reminder)
				);
			}
		},

		'enabled_probation' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_probation", 
					Boolean(this.enabled_probation)
				);
			}
		},

		'enabled_revoked' () {
			if (this.lock_ready) {
				this.$parent.saveSetting(
					"enabled_revoked", 
					Boolean(this.enabled_revoked)
				);
			}
		},
	},
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card min-card-height">
					<div class="card-title">
						<i class="fa fa-envelope green"></i>
						Mailer Settings
						<Popper hover arrow placement="right" class="fs11" content="Adjust settings for the automatic email system">
							<i class="fa fa-info-circle pointer ml5 fs16"></i>
						</Popper>
					</div>
					<div class="card-body">
						<p class="bold mb20">
							Emailer Admins
							<Popper hover arrow placement="right" class="fs11" content="Add new recipient">
								<i class="fa fa-plus pointer ml5 fs18 add-plus" @click="add_emailer_modal_open = true"></i>
							</Popper>
						</p>

						<div class="table-card">
							<ag-grid-vue
								style="width: 100%; height: 100%;"
								class="ag-theme-alpine"
								:columnDefs="column_defs"
								@grid-ready="onGridReady"
								:suppressExcelExport="true"
								:rowData="emailer_admins"
								:quickFilterText="quickFilterText"
								:defaultColDef="defaultColDef"
								pagination="true"
							>
							</ag-grid-vue>
						</div>

						<p class="bold mt40">
							Reinstatement Contact Admin
						</p>

						<input type="email" class="form-control max-width-400 mt20" placeholder="Email" v-model="reinstatement_contact">
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveReinstatementContact">
								Save
							</button>
						</div>

						<p class="bold mt40 mb20">
							Admin Email Triggers
						</p>

						<input id="letter-uploaded" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_letter_uploaded">
						<label for="letter-uploaded" class="ml5 pointer fs14 op8">User uploads a letter</label>
						<textarea :disabled="loading.email_letter_uploaded" v-model="email_letter_uploaded" class="form-control height-200 p15 mt10">{{ email_letter_uploaded }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_letter_uploaded', email_letter_uploaded)">
								Save
							</button>
							<ClipLoader v-if="loading.email_letter_uploaded" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>

						<input id="kyc-needs-review" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_kyc_needs_review">
						<label for="kyc-needs-review" class="ml5 pointer fs14 op8">KYC or AML needs review</label>
						<textarea :disabled="loading.email_kyc_needs_review" v-model="email_kyc_needs_review" class="form-control height-200 p15 mt10">{{ email_kyc_needs_review }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_kyc_needs_review', email_kyc_needs_review)">
								Save
							</button>
							<ClipLoader v-if="loading.email_kyc_needs_review" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>

						<p class="bold mt40 mb20">
							User Email Triggers
						</p>

						<input id="welcome" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_welcome">
						<label for="welcome" class="ml5 pointer fs14 op8">Welcome to the Casper Association portal</label>
						<textarea :disabled="loading.email_welcome" v-model="email_welcome" class="form-control height-200 p15 mt10">{{ email_welcome }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_welcome', email_welcome)">
								Save
							</button>
							<ClipLoader v-if="loading.email_welcome" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>

						<input id="node-is-verified" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_node_verified">
						<label for="node-is-verified" class="ml5 pointer fs14 op8">Your Node is Verified</label>
						<textarea :disabled="loading.email_node_verified" v-model="email_node_verified" class="form-control height-200 p15 mt10">{{ email_node_verified }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_node_verified', email_node_verified)">
								Save
							</button>
							<ClipLoader v-if="loading.email_node_verified" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>

						<input id="letter-received" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_letter_received">
						<label for="letter-received" class="ml5 pointer fs14 op8">Your letter of motivation is received</label>
						<textarea :disabled="loading.email_letter_received" v-model="email_letter_received" class="form-control height-200 p15 mt10">{{ email_letter_received }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_letter_received', email_letter_received)">
								Save
							</button>
							<ClipLoader v-if="loading.email_letter_received" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>

						<input id="letter-approved" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_letter_approved">
						<label for="letter-approved" class="ml5 pointer fs14 op8">Your letter of motivation is APPROVED</label>
						<textarea :disabled="loading.email_letter_approved" v-model="email_letter_approved" class="form-control height-200 p15 mt10">{{ email_letter_approved }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_letter_approved', email_letter_approved)">
								Save
							</button>
							<ClipLoader v-if="loading.email_letter_approved" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>

						<input id="letter-denied" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_letter_denied">
						<label for="letter-denied" class="ml5 pointer fs14 op8">Your letter of motivation is denied</label>
						<textarea :disabled="loading.email_letter_denied" v-model="email_letter_denied" class="form-control height-200 p15 mt10">{{ email_letter_denied }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_letter_denied', email_letter_denied)">
								Save
							</button>
							<ClipLoader v-if="loading.email_letter_denied" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>

						<input id="new-perk" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_new_perk">
						<label for="new-perk" class="ml5 pointer fs14 op8">New perk created</label>
						<textarea :disabled="loading.email_new_perk" v-model="email_new_perk" class="form-control height-200 p15 mt10">{{ email_new_perk }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_new_perk', email_new_perk)">
								Save
							</button>
							<ClipLoader v-if="loading.email_new_perk" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>

						<input id="vote-started" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_vote_started">
						<label for="vote-started" class="ml5 pointer fs14 op8">New vote started</label>
						<textarea :disabled="loading.email_vote_started" v-model="email_vote_started" class="form-control height-200 p15 mt10">{{ email_vote_started }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_vote_started', email_vote_started)">
								Save
							</button>
							<ClipLoader v-if="loading.email_vote_started" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>

						<input id="vote-reminder" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_vote_reminder">
						<label for="vote-reminder" class="ml5 pointer fs14 op8">24hr Vote reminder</label>
						<textarea :disabled="loading.email_vote_reminder" v-model="email_vote_reminder" class="form-control height-200 p15 mt10">{{ email_vote_reminder }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_vote_reminder', email_vote_reminder)">
								Save
							</button>
							<ClipLoader v-if="loading.email_vote_reminder" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>

						<input id="probation" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_probation">
						<label for="probation" class="ml5 pointer fs14 op8">User goes on probation</label>
						<textarea :disabled="loading.probation" v-model="email_probation" class="form-control height-200 p15 mt10">{{ email_probation }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_probation', email_probation)">
								Save
							</button>
							<ClipLoader v-if="loading.probation" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>

						<input id="revoked" type="checkbox" class="form-check-input pointer mt5" v-model="enabled_revoked">
						<label for="revoked" class="ml5 pointer fs14 op8">User membership gets revoked</label>
						<textarea :disabled="loading.email_revoked" v-model="email_revoked" class="form-control height-200 p15 mt10">{{ email_revoked }}</textarea>
						<div class="form-group mt10 mb40">
							<button class="btn btn-success" @click="saveEmailContent('email_revoked', email_revoked)">
								Save
							</button>
							<ClipLoader v-if="loading.email_revoked" size="25px" color="#ff2d2e" class="clip-loader-inline ml10"></ClipLoader>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Modal
		v-model="add_emailer_modal_open"
		max-width="400px"
		:click-out="true"
	>
		<div class="modal-container">
			<h5 class="pb15">Add Emailer Admin</h5>

			<p class="mt20 pb20">
				Add a new recipient for admin email alerts.
			</p>

			<input type="email" class="form-control" v-model="new_emailer_admin" placeholder="Enter email">

			<button class="btn btn-success form-control btn-inline ml0 mt20 mb10" @click="add_emailer_modal_open = false">
				Cancel
			</button>

			<button class="btn btn-success form-control btn-inline mt20 mb10" @click="addEmailerAdmin()">
				<i class="fa fa-plus bold"></i>
				Add
			</button>
		</div>
	</Modal>
</template>

<style scoped>

.add-plus {
	color: white;
	background-color: #ff2d2e;
	padding: 3px 5px;
	border-radius: 5px;
}

</style>