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
import DropZone from 'dropzone-vue';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../../ag-theme-custom.css";

import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		Popper,
		Modal,
		ClipLoader,
		AgGridVue,
		DropZone
	},

	data() {
		return {
			// Contact recipients
			add_contact_modal_open: false,
			new_contact_recipient:  '',
			contact_recipients:     [],
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
					headerName: 'Admin Action',
					sortable: false,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';
						return `<button class="btn btn-success btn-sm fs12 mt5">Remove</span>`
					},
					onCellClicked: (event) => {
						let email = event.data.email;

						if (email) {
							this.deleteContactRecipient(email);
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

			upload_terms_url: `${this.$root.api_url}/admin/upload-terms`
		}
	},

	created() {
		this.getContactRecipients();
	},

	mounted() {
		let that = this;
	},

	watch: {
	},

	methods: {
		async getContactRecipients() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-contact-recipients',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.contact_recipients = response.detail;
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

		async addContactRecipient() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			if (
				!this.new_contact_recipient ||
				this.new_contact_recipient == ''
			) {
				return false;
			}

			const response = await api(
				'POST',
				'admin/add-contact-recipient',
				{
					email: this.new_contact_recipient
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.add_contact_modal_open = false;
				this.new_contact_recipient = '';
				this.getContactRecipients();
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

		async deleteContactRecipient(email) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/delete-contact-recipient',
				{
					email: email
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.getContactRecipients();
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

		uploaded(event) {
			console.log(event);
			this.$parent.getGlobalSettings();
			this.$root.toast(
				'',
				'Successfully uploaded new terms of service document',
				'success'
			);
		},

		onErrorUpload(event) {
			console.log(event);
			this.$root.toast(
				'',
				'There was a problem upload terms of service document',
				'error'
			);
		}
	},
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card min-card-height">
					<div class="card-title">
						<i class="fa fa-cog green"></i>
						Global Settings
					</div>
					<div class="card-body">
						<p class="bold mt10">
							Status Page Lock Rules
							<Popper hover arrow placement="right" class="fs11" content="Locks users out of specified areas of the dashboard on probation/suspension">
								<i class="fa fa-info-circle pointer ml5 fs16"></i>
							</Popper>
						</p>

						<div class="toggle-row">
							<div class="toggle-cell-1">
								<p class="fs12">
									&ensp;
								</p>
							</div>
							<div class="toggle-cell fs12">
								Nodes
							</div>
							<div class="toggle-cell fs12">
								Discussions
							</div>
							<div class="toggle-cell fs12">
								Votes
							</div>
							<div class="toggle-cell fs12">
								Perks
							</div>
						</div>

						<div class="toggle-row">
							<div class="toggle-cell-1">
								<p class="fs12">
									Lock pages if user is not KYC verified
								</p>
							</div>
							<div class="toggle-cell">
								<input type="checkbox" class="form-check-input pointer" v-model="this.$parent.kyc_lock_nodes">
							</div>
							<div class="toggle-cell">
								<input type="checkbox" class="form-check-input pointer" v-model="this.$parent.kyc_lock_discs">
							</div>
							<div class="toggle-cell">
								<input type="checkbox" class="form-check-input pointer" v-model="this.$parent.kyc_lock_votes">
							</div>
							<div class="toggle-cell">
								<input type="checkbox" class="form-check-input pointer" v-model="this.$parent.kyc_lock_perks">
							</div>
						</div>

						<div class="toggle-row">
							<div class="toggle-cell-1">
								<p class="fs12">
									Lock pages if user is in probation
								</p>
							</div>
							<div class="toggle-cell">
								<input type="checkbox" class="form-check-input pointer" v-model="this.$parent.prob_lock_nodes">
							</div>
							<div class="toggle-cell">
								<input type="checkbox" class="form-check-input pointer" v-model="this.$parent.prob_lock_discs">
							</div>
							<div class="toggle-cell">
								<input type="checkbox" class="form-check-input pointer" v-model="this.$parent.prob_lock_votes">
							</div>
							<div class="toggle-cell">
								<input type="checkbox" class="form-check-input pointer" v-model="this.$parent.prob_lock_perks">
							</div>
						</div>

						<p class="bold mt40 mb20">
							Contact Form Recipients
							<Popper hover arrow placement="right" class="fs11" content="Add new recipient">
								<i class="fa fa-plus pointer ml5 fs18 add-plus" @click="add_contact_modal_open = true"></i>
							</Popper>
						</p>

						<div class="table-card">
							<ag-grid-vue
								style="width: 100%; height: 100%;"
								class="ag-theme-alpine"
								:columnDefs="column_defs"
								@grid-ready="onGridReady"
								:suppressExcelExport="true"
								:rowData="contact_recipients"
								:quickFilterText="quickFilterText"
								:defaultColDef="defaultColDef"
								pagination="true"
							>
							</ag-grid-vue>
						</div>


						<p class="bold mt40 mb20">
							Terms of Use
							<Popper hover arrow placement="right" class="fs11" content="Upload terms of use document.">
								<i class="fa fa-info-circle pointer ml5 fs16"></i>
							</Popper>
						</p>

						<input type="text" disabled class="form-input p5" :value="this.$parent.esign_doc">

						<p class="mt10 op7 fs13">
							Drag & drop a file or click below to upload a new Terms of Use document.
						</p>

						<DropZone 
							:url="upload_terms_url"
							:uploadOnDrop="true"
							:multipleUpload="false"
							:headers='{"Authorization": "Bearer " + this.$root.bearer_token}'
							:maxFileSize="10000000"
							@uploaded="uploaded"
							@errorUpload="onErrorUpload"
							dropzoneClassName="dropzone-wrap"
							ondragover="this.style.border='3px dashed #ff2d2e';"
							ondragleave="this.style.border='3px dotted #ff2d2e';"
							@errorAdd="this.$root.dropzone_error"
						></DropZone>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Modal
		v-model="add_contact_modal_open"
		max-width="400px"
		:click-out="true"
	>
		<div class="modal-container">
			<h5 class="pb15">Add Contact Recipient</h5>

			<p class="mt20 pb20">
				Add a new contact form recipient by entering their email address below.
			</p>

			<input type="email" class="form-control" v-model="new_contact_recipient" placeholder="Enter email">

			<button class="btn btn-success form-control btn-inline ml0 mt20 mb10" @click="add_contact_modal_open = false">
				Cancel
			</button>

			<button class="btn btn-success form-control btn-inline mt20 mb10" @click="addContactRecipient()">
				<i class="fa fa-plus bold"></i>
				Add
			</button>
		</div>
	</Modal>
</template>

<style scoped>

.toggle-row {
	position: relative;
	width: 540px;
	display: flex;
	height: 40px;
	flex-direction: row;
	border-bottom: 1px solid #e0e0e0;
}

.toggle-cell-1 {
	display: flex;
	width: 220px;
	height: 40px;
	align-items: center;
}

.toggle-cell {
	display: flex;
	width: 80px;
	height: 40px;
	justify-content: center;
	align-items: center;
}

.add-plus {
	color: white;
	background-color: #ff2d2e;
	padding: 3px 5px;
	border-radius: 5px;
}

.dropzone-wrap {
	border: 3px dotted #ff2d2e;
	cursor: pointer;
	padding: 15px;
	margin-top: 10px;
	overflow: hidden;
	width: 100%;
	max-width: 400px;
}

</style>