<script>

import App from '../../../../App.vue';
import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';
import { AgGridVue } from "ag-grid-vue3";

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
			letter_modal:      false,
			selected_guid:     '',
			selected_letter:   '',
			selected_decision: '',
			users:             [],

			column_defs: [
				{
					field: 'suspended_at',
					headerName: 'Suspended',
					sortable: true
				},
				{
					field: 'reason',
					headerName: 'Reason',
					sortable: true
				},
				{
					field: 'updated_at',
					headerName: 'Reinstatement Requested',
					sortable: true,
					sort: 'desc'
				},
				{
					field: 'email',
					headerName: 'Email',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						return `<span class="bold pointer">${params.value}</span>`
					},
					onCellClicked: (event) => {
						let guid = event.data.guid;

						if (guid) {
							this.$root.routeTo(`/a/user/${guid}`);
						}
					}
				},
				{
					field: 'reinstated_at',
					headerName: 'Decision Date',
					sortable: true,
				},
				{
					field: 'decision',
					headerName: 'Decision',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						return `<span class="bold pointer underline">${params.value}</span>`
					},
					onCellClicked: (event) => {
						let letter   = event.data.letter;

						if (letter) {
							this.selected_letter   = letter;
							this.selected_decision = event.value;
							this.selected_guid     = event.data.guid;
							this.letter_modal      = true;
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
		}
	},

	created() {
		this.getHistoricRevokedUsers();
	},

	mounted() {
		let that = this;
	},

	watch: {
	},

	methods: {
		async getHistoricRevokedUsers() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-historic-revoked-users',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.users = response.detail;
			}
		},

		async reinstateUser() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'PUT',
				'admin/reinstate-user',
				{
					guid: this.selected_guid
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.getHistoricRevokedUsers();
				this.letter_modal = false;
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
	},
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="table-header">
						<span>
							<i class="fa fa-user green"></i>
							<b>Reinstatement Request History</b>
						</span>
					</div>
					<div class="table-header">
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
		v-model="letter_modal"
		max-width="800px"
		:click-out="true"
	>
		<div class="modal-container" style="max-width: 800px;">
			<h5>
				Decision for reinstatement: {{ selected_decision }}
			</h5>

			<p class="mt20">
				Find the user's reinstatement letter below.
			</p>

			<hr>

			<p class="mt20 op7 fs13">
				"
				{{ selected_letter }}
				"
			</p>

			<button 
				v-if="selected_decision == 'No'" 
				class="btn btn-success form-control btn-inline mt20 mb10" 
				@click="reinstateUser"
			>
				Reactivate
			</button>

			<button class="btn btn-success form-control btn-inline mt20 mb10" @click="letter_modal = false">
				Close
			</button>
		</div>
	</Modal>
</template>

<style scoped>

</style>