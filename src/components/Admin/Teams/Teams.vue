<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import DefaultAvatarUrl from '@/assets/images/avatar.svg';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { AgGridVue } from "ag-grid-vue3";
import { Modal } from 'vue-neat-modal';

import 'vue-neat-modal/dist/vue-neat-modal.css';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../ag-theme-custom.css";

export default {
	components: {
		Popper,
		ClipLoader,
		AgGridVue,
		Modal
	},

	data() {
		return {
			users:                     [],
			new_admin_modal_open:      false,
			new_admin_email:           '',

			column_defs: [
				{
					field: 'created_at',
					headerName: 'Added',
					sortable: true
				},
				{
					field: 'admin_approved',
					headerName: 'Status',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						if (params.data.pending == 'Pending') {
							return '<span class="op6">Pending</span>';
						}

						if (parseInt(params.value) == 1) {
							return 'Active';
						} else {
							return 'Revoked';
						}
					}
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

						if (guid && !event.data.pending) {
							this.$root.routeTo(`/a/profile/${guid}`);
						}
					}
				},
				{
					field: 'last_login',
					headerName: 'Last Login',
					sortable: true,
					sort: 'desc'
				},
				{
					field: 'ip',
					headerName: 'IP',
					sortable: true
				},
				{
					field: 'intake',
					headerName: 'Intake',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						if (params.data.role == 'admin') {
							return `<i class="fa fa-${params.value == 1 ? "check" : ""} fs13 op5"></i>`;
						}

						return `<input class="form-check-input mt5 pointer" type="checkbox" ${params.value == 1 ? "checked" : ""}>`
					},
					onCellClicked: (event) => {
						let guid  = event.data.guid;
						let value = event.value;
						let role  = event.data.role;

						if (value && role != 'admin') {
							this.toggleIntake(guid, value);
						}
					}
				},
				{
					field: 'users',
					headerName: 'Users',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						if (params.data.role == 'admin') {
							return `<i class="fa fa-${params.value == 1 ? "check" : ""} fs13 op5"></i>`;
						}

						return `<input class="form-check-input mt5 pointer" type="checkbox" ${params.value == 1 ? "checked" : ""}>`
					},
					onCellClicked: (event) => {
						let guid  = event.data.guid;
						let value = event.value;
						let role  = event.data.role;

						if (value && role != 'admin') {
							this.toggleUsers(guid, value);
						}
					}
				},
				{
					field: 'ballots',
					headerName: 'Ballots',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						if (params.data.role == 'admin') {
							return `<i class="fa fa-${params.value == 1 ? "check" : ""} fs13 op5"></i>`;
						}

						return `<input class="form-check-input mt5 pointer" type="checkbox" ${params.value == 1 ? "checked" : ""}>`
					},
					onCellClicked: (event) => {
						let guid  = event.data.guid;
						let value = event.value;
						let role  = event.data.role;

						if (value && role != 'admin') {
							this.toggleBallots(guid, value);
						}
					}
				},
				{
					field: 'perks',
					headerName: 'Perks',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						if (params.data.role == 'admin') {
							return `<i class="fa fa-${params.value == 1 ? "check" : ""} fs13 op5"></i>`;
						}

						return `<input class="form-check-input mt5 pointer" type="checkbox" ${params.value == 1 ? "checked" : ""}>`
					},
					onCellClicked: (event) => {
						let guid  = event.data.guid;
						let value = event.value;
						let role  = event.data.role;

						if (value && role != 'admin') {
							this.togglePerks(guid, value);
						}
					}
				},
				{
					field: 'teams',
					headerName: 'Teams',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						if (params.data.role == 'admin') {
							return `<i class="fa fa-${params.value == 1 ? "check" : ""} fs13 op5"></i>`;
						}

						return `<input class="form-check-input mt5 pointer" type="checkbox" ${params.value == 1 ? "checked" : ""}>`
					},
					onCellClicked: (event) => {
						let guid  = event.data.guid;
						let value = event.value;
						let role  = event.data.role;

						if (value && role != 'admin') {
							this.toggleTeams(guid, value);
						}
					}
				},
				{
					field: 'global_settings',
					headerName: 'Global Settings',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						if (params.data.role == 'admin') {
							return `<i class="fa fa-${params.value == 1 ? "check" : ""} fs13 op5"></i>`;
						}

						return `<input class="form-check-input mt5 pointer" type="checkbox" ${params.value == 1 ? "checked" : ""}>`
					},
					onCellClicked: (event) => {
						let guid  = event.data.guid;
						let value = event.value;
						let role  = event.data.role;

						if (value && role != 'admin') {
							this.toggleGlobalSettings(guid, value);
						}
					}
				},
				{
					field: '',
					headerName: '',
					sortable: false,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						if (params.data.pending == 'Pending') {
							return '<button class="btn btn-success btn-sm fs11">Cancel</button>';
						}

						return `<button class="btn btn-success btn-sm fs11">Reset Password</button>`
					},
					onCellClicked: (event) => {
						let guid = event.data.guid;

						if (guid && !event.data.pending) {
							this.resetPassword(guid);
						}

						if (event.data.pending == 'Pending') {
							this.cancelInvite(event.data.email);
						}
					}
				},
				{
					field: '',
					headerName: '',
					sortable: false,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						if (
							params.data.role == 'admin' ||
							params.data.pending == 'Pending'
						) {
							return '';
						}

						return `<button class="btn btn-success btn-sm fs11">Revoke</button>`
					},
					onCellClicked: (event) => {
						let guid = event.data.guid;
						let role = event.data.role;

						if (guid && role != 'admin') {
							this.revoke(guid);
						}
					}
				},
			],

			quickFilterText:     "",
			quickFilterCategory: "",
			gridApi:             null,
			columnApi:           null,

			defaultColDef: {
				flex:      1,
				minWidth:  100,
				resizable: true,
			}
		}
	},

	created() {
		this.getTeams();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async getTeams() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-teams',
				{},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.users = response.detail;
			}
		},

		onGridReady(params) {
			this.gridApi   = params.api;
			this.columnApi = params.columnApi;
			// this.columnApi.autoSizeAllColumns();
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

		async inviteAdmin() {
			if (this.new_admin_email) {
				let fetch_bearer_token = this.$cookies.get('bearer_token');

				const response = await api(
					'POST',
					'admin/invite-sub-admin',
					{
						email: this.new_admin_email
					},
					fetch_bearer_token
				);

				if (response.status == 200) {
					this.getTeams();
					this.new_admin_modal_open = false;	
					this.$root.toast(
						'',
						response.message,
						'success'
					);
				} else {
					this.$root.toast(
						'',
						response.message,
						'warning'
					);
				}
			}
		},

		async togglePermission(perm, guid, value) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');
			let new_value = 0;

			if (parseInt(value) == 0) {
				new_value = 1;
			}

			const response = await api(
				'PUT',
				'admin/put-permission',
				{
					"guid":       guid,
					"permission": perm,
					"value":      new_value,
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.getTeams();
			}
		},

		toggleIntake(guid, value) {
			this.togglePermission("intake", guid, value);
		},

		toggleUsers(guid, value) {
			this.togglePermission("users", guid, value);
		},

		toggleBallots(guid, value) {
			this.togglePermission("ballots", guid, value);
		},

		togglePerks(guid, value) {
			this.togglePermission("perks", guid, value);
		},

		toggleTeams(guid, value) {
			this.togglePermission("teams", guid, value);
		},

		toggleGlobalSettings(guid, value) {
			this.togglePermission("global_settings", guid, value);
		},

		async resetPassword(guid) {
			console.log(guid);
		},

		async revoke(guid) {
			console.log(guid);
		},

		async cancelInvite(email) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/cancel-team-invite',
				{
					email: email
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.getTeams();
				this.$root.toast(
					'',
					response.message,
					'success'
				);
			}
		}
	},

	watch: {
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
							<i class="fa fa-user-plus green"></i>
							<b>Team Management</b>
						</span>
					</div>
					<div class="table-header">
						<span>
							<button class="btn btn-success btn-sm" @click="new_admin_modal_open = true">
								<i class="fa fa-plus"></i>
								New Admin
							</button>
						</span>
						<span>
							<input v-model="quickFilterText" type="text" class="form-control form-control-sm width-200" placeholder="Search">
						</span>
					</div>
					<div class="table-card">
						<ag-grid-vue
							style="width: 100%; height: 100%;"
							class="ag-theme-alpine"
							:columnDefs="column_defs"
							@grid-ready="onGridReady"
							:suppressExcelExport="true"
							:rowData="users"
							:quickFilterText="quickFilterText"
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
		v-model="new_admin_modal_open"
		max-width="400px"
		:click-out="true"
	>
		<div class="modal-container">
			<h5 class="pb15">New Admin</h5>

			<p class="mt20 mb20">
				Enter the email address of the person you want to invite to become an administrative team member.
			</p>

			<input type="email" v-model="new_admin_email" class="form-control">

			<button class="btn btn-success mt20" @click="inviteAdmin">
				Invite
			</button>

			<button class="btn btn-success mt20 ml10" @click="new_admin_modal_open = false">
				Cancel
			</button>
		</div>
	</Modal>
</template>

<style scoped>



</style>