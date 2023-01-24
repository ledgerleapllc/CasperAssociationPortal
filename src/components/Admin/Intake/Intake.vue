<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import DefaultAvatarUrl from '@/assets/images/avatar.svg';
import moment from 'moment';
import Popper from 'vue3-popper';
import { AgGridVue } from "ag-grid-vue3";
import { Modal } from 'vue-neat-modal';

import 'vue-neat-modal/dist/vue-neat-modal.css';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../ag-theme-custom.css";

export default {
	components: {
		Popper,
		AgGridVue,
		ClipLoader,
		DefaultAvatarUrl,
		Modal
	},

	data() {
		return {
			avatar_url: DefaultAvatarUrl,
			letterModalOpen: false,
			removeModalOpen: false,
			selected_guid: null,

			general_intake: [],
			general_intake_column_defs: [
				{
					field: 'registration_date',
					headerName: 'Registration Date',
					sortable: true,
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

						if (guid) {
							this.$root.routeTo(`/a/profile/${guid}`);
						}
					}
				},
				{
					field: 'esigned',
					headerName: 'E-signature',
					sortable: true,
					width: 50,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						if (params.value == '') return '';
						return `<i class="fa fa-check text-green fs12"></i>`
					},
				},
				{
					field: 'node_verified',
					headerName: 'Node Verification',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						if (params.value == '') return '';
						return `<i class="fa fa-check text-green fs12"></i>`
					},
				},
				{
					field: 'letter',
					headerName: 'Letter of Motivation',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						if (params.value == '') return '';
						return `<i class="fa fa-check text-green fs12"></i>`
					},
				},
				{
					headerName: 'Ready for Review',
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						let btn = '';

						if (
							params.data.guid                &&
							params.data.esigned             &&
							params.data.esigned       != '' &&
							params.data.node_verified       &&
							params.data.node_verified != '' &&
							params.data.letter              &&
							params.data.letter        != ''
						) {
							btn = `<button class="btn btn-success btn-sm fs12">Review</button>`;
						} else {
							btn = `<button class="btn btn-success btn-sm fs12 div-disabled">Review</button>`;
						}

						return `${btn}`;
					},
					onCellClicked: (event) => {
						if (
							event.data.guid                &&
							event.data.esigned             &&
							event.data.esigned       != '' &&
							event.data.node_verified       &&
							event.data.node_verified != '' &&
							event.data.letter              &&
							event.data.letter        != ''
						) {
							this.reviewIntake(event.data.guid);
						}
					}
				},
				{
					headerName: 'Action',
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						return `<i class="fa fa-trash pointer fs22 mt5"></i>`;
					},
					onCellClicked: (event) => {
						let guid = event.data.guid;

						if (guid) {
							this.removeIntake(guid);
						}
					}
				}
			],

			general_intake_quickFilterText:     "",
			general_intake_quickFilterCategory: "",
			general_intake_gridApi:             null,

			id_verification: [],
			id_verification_column_defs: [
				{
					field: 'registration_date',
					headerName: 'Registration Date',
					sortable: true,
				},
				{
					field: 'email',
					headerName: 'Email',
					sortable: true,
					onCellClicked: (event) => {
						let guid = event.data.guid;

						if (guid) {
							this.$root.routeTo(`/a/profile/${guid}`);
						}
					}
				},
				{
					field: 'account_type',
					headerName: 'Type',
					sortable: true
				},
				{
					field: 'kyc_status',
					headerName: 'KYC API Response',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';

						if (params.value == 'denied') {
							return `<i class="fa fa-times red fs12"></i>Denied`
						}

						else if (params.value == 'pending') {
							return `<i class="fa fa-clock-o op7 fs12"></i>Pending`
						}

						else if (params.value == 'approved') {
							return `<i class="fa fa-check green fs12"></i>Approved`
						}

						else {
							return 'Not completed';
						}
					},
				},
				{
					headerName: 'Action',
					cellRenderer: (params) => {
						if (!params) return '';
						return '<button class="btn btn-success btn-sm p5">Review</button>';
					},
					onCellClicked: (event) => {
						let guid = event.data.guid;

						if (guid) {
							this.$root.routeTo(`/a/user/${guid}`);
						}
					}
				}
			],

			id_verification_quickFilterText:     "",
			id_verification_quickFilterCategory: "",
			id_verification_gridApi:             null,

			defaultColDef: {
				flex:      1,
				minWidth:  100,
				resizable: true,
			}
		}
	},

	watch: {
		general_intake_quickFilterCategory: "general_intake_quickFilterCategorySelect",
		id_verification_quickFilterCategory: "id_verification_quickFilterCategorySelect"
	},

	created() {
		this.getIntake();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async getIntake() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-intake',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.general_intake  = response.detail.general_intake;
				this.id_verification = response.detail.id_verification;
			}
		},

		id_verification_onGridReady(params) {
			this.id_verification_gridApi = params.api;
		},

		general_intake_onGridReady(params) {
			this.general_intake_gridApi = params.api;
		},

		id_verification_quickFilterCategorySelect(filter) {
			this.id_verification_gridApi.setFilterModel({
				source: {
					filterType: 'text',
					type:       'contains',
					filter:     filter
				}
			});
		},

		general_intake_quickFilterCategorySelect(filter) {
			this.general_intake_gridApi.setFilterModel({
				source: {
					filterType: 'text',
					type:       'contains',
					filter:     filter
				}
			});
		},

		removeIntake(guid) {
			this.selected_guid   = guid;
			this.removeModalOpen = true;
		},

		reviewIntake(guid) {
			this.selected_guid   = guid;
			this.letterModalOpen = true;
		},

		async downloadLetter() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/download-letter',
				{
					guid: this.selected_guid
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				window.open(
					response.detail.letter,
					"_blank"
				);
			}
		},

		async approveUser() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/approve-user',
				{
					guid: this.selected_guid
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.letterModalOpen = false;
				this.getIntake();
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

		async denyUser() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/deny-user',
				{
					guid: this.selected_guid
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.letterModalOpen = false;
				this.getIntake();
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

		async banUser() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/ban-user',
				{
					guid: this.selected_guid
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.letterModalOpen = false;
				this.getIntake();
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

		async removeUser() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/remove-user',
				{
					guid: this.selected_guid
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.removeModalOpen = false;
				this.getIntake();
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
		}
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="table-header">
						<span>
							<i class="fa fa-sign-in green"></i>
							<b>General Intake</b>
						</span>
					</div>
					<div class="table-header">
						<p class="fs12 op7">New members needing approval</p>
						<span>
							<input v-model="general_intake_quickFilterText" type="text" class="form-control form-control-sm width-200" placeholder="Search">
						</span>
					</div>
					<div class="table-card">
						<ag-grid-vue
							style="width: 100%; height: 100%;"
							class="ag-theme-alpine"
							:columnDefs="general_intake_column_defs"
							@grid-ready="general_intake_onGridReady"
							:suppressExcelExport="true"
							:rowData="general_intake"
							:quickFilterText="general_intake_quickFilterText"
							:defaultColDef="defaultColDef"
							pagination="true"
						>
						</ag-grid-vue>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="table-header">
						<span>
							<i class="fa fa-credit-card-alt green"></i>
							<b>ID Verification</b>
						</span>
					</div>
					<div class="table-header">
						<p class="fs12 op7">Members wanting to get verified</p>
						<span>
							<input v-model="id_verification_quickFilterText" type="text" class="form-control form-control-sm width-200" placeholder="Search">
						</span>
					</div>
					<div class="table-card">
						<ag-grid-vue
							style="width: 100%; height: 100%;"
							class="ag-theme-alpine"
							:columnDefs="id_verification_column_defs"
							@grid-ready="id_verification_onGridReady"
							:suppressExcelExport="true"
							:rowData="id_verification"
							:quickFilterText="id_verification_quickFilterText"
							:defaultColDef="defaultColDef"
							pagination="true"
						>
						</ag-grid-vue>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Modal
		v-model="letterModalOpen"
		max-width="400px"
		:click-out="true"
	>
		<div class="modal-container">
			<h5 class="pb15">Review Letter</h5>

			<p class="pb20">
				Please download and review the letter using the options below.
			</p>

			<div class="text-center">
				<button class="btn btn-success form-control" @click="downloadLetter()">
					Download Letter
				</button>

				<button class="btn btn-success form-control mt10" @click="approveUser()">
					Approve User
				</button>

				<button class="btn btn-success form-control mt10 mb15" @click="denyUser()">
					Deny & Reset
				</button>

				<span class="mt20 fs14 text-red underline pointer" @click="banUser()">
					Deny & Ban User
				</span>
			</div>
		</div>
	</Modal>

	<Modal
		v-model="removeModalOpen"
		max-width="400px"
		:click-out="true"
	>
		<div class="modal-container">
			<h5 class="pb15">Remove Applicant Member</h5>

			<p class="pb20">
				Deny this applicant and reset the user to onboarding?
			</p>

			<div class="text-center">
				<button class="btn btn-success form-control mt10" @click="removeUser()">
					Yes
				</button>

				<button class="btn btn-success form-control mt10 mb15" @click="removeModalOpen = false">
					Cancel
				</button>
			</div>
		</div>
	</Modal>
</template>
