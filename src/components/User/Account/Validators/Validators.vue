<script>

import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import moment from 'moment';
import { AgGridVue } from "ag-grid-vue3";
import { Modal } from 'vue-neat-modal';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../../ag-theme-custom.css";

export default {
	data() {
		return {
			uri_category:          this.$route.params.category,
			removeNodeModalActive: false,
			selected_validator:    '',

			email: '',
			validators: [],
			columnDefs: [
				{
					field: 'validator_id',
					headerName: 'Validator ID',
					sortable: true
				},
				{
					field: 'created_at',
					headerName: 'Added',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<i class="fa fa-calendar fs12"></i>${params.value} UTC`
					},
				},
				{
					field: 'verified_at',
					headerName: 'Verified',
					sortable: true,
					sort: 'desc',
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) {
							return `<button class="btn btn-sm btn-success mt5">Verify Node</button>`;
						}

						return `<i class="fa fa-calendar fs12"></i>${params.value} UTC`
					},
					onCellClicked: (event) => {
						if (
							!event.data.verified_at ||
							event.data.verified_at == undefined ||
							event.data.verified_at == ''
						) {
							this.verifyNode(event.data.validator_id)
						}
					}
				},
				{
					field: 'action',
					headerName: '',
					sortable: false,
					cellRenderer: (params) => {
						return `<button class="btn btn-sm btn-success mt5">Remove</button>`
					},
					onCellClicked: (event) => {
						this.selected_validator = event.data.validator_id;
						this.removeNode();
					}
				}
			],
			quickFilterText: "",
			gridApi: null,
			defaultColDef: {
				flex: 1,
				minWidth: 100,
				resizable: true,
			}
		}
	},

	components: {
		AgGridVue,
		Modal
	},

	mounted() {
		let that = this;
		this.getAccountValidators();
	},

	methods: {
		async getAccountValidators() {
			const response = await api(
				'GET', 
				'user/get-account-validators', 
				{},
				this.$root.bearer_token
			);

			if (response.hasOwnProperty('status')) {
				let status = response.status;

				if (status == 200) {
					// console.log(response.detail);
					this.validators = response.detail;
				}
			}
		},

		onGridReady(params) {
			this.gridApi = params.api;
		},

		downloadCsv() {
			this.gridApi.exportDataAsCsv({
				fileName: `validators-${moment().format('YYYY-MM-DD')}-${this.uri_guid}`
			});
		},

		async verifyNode(vid) {
			this.$root.routeTo(`/u/validator/add?v=${vid}`);
		},

		async createNode() {
			this.$root.routeTo('/u/validator/add');
		},

		removeNode() {
			this.removeNodeModalActive = true;
		},

		async _removeNode() {
			const response = await api(
				'POST', 
				'user/remove-node', 
				{
					public_key: this.selected_validator
				},
				this.$root.bearer_token
			);

			if (response.hasOwnProperty('status')) {
				this.removeNodeModalActive = false;

				if (response.status == 200) {
					this.getAccountValidators();
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
	}
};

</script>

<template>
	<div class="container-fluid pt15">
		<div class="row">
			<div class="col-12 plr20">
				<div class="card">
					<div class="card-title mb0">
						<i class="fa fa-cog green"></i>
						<b>
							Account Validators
						</b>
					</div>
					<div class="card-body">
						<div class="table-header" style="border-top: none; padding: 0;">
							<span>
								<input v-model="quickFilterText" type="text" class="form-control form-control-sm width-200" placeholder="Search">
							</span>
							<span>
								<button v-on:click="createNode()" class="btn btn-success btn-sm float-right z2">Add Node</button>
							</span>
						</div>
						<div class="table-card">
							<ag-grid-vue
								style="width: 100%; height: 100%;"
								class="ag-theme-alpine"
								:columnDefs="columnDefs"
								@grid-ready="onGridReady"
								:suppressExcelExport="true"
								:rowData="validators"
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
	</div>

	<Modal
		v-model="removeNodeModalActive" 
		max-width="400px"
		:click-out="true"
		:clickOut="true"
		style="z-index: 99"
	>
		<div class="modal-container">
			<p class="pb15 bold fs17 border-bottom">
				Remove Validator
			</p>

			<p class="pt15 pb15">
				Are you sure you want to disassociate this validator from your account and remove it from your dashboard?
			</p>

			<button class="btn btn-success btn-sm mt15" @click="_removeNode()">
				Remove Validator
			</button>
			<button class="btn btn-black btn-sm mt15 ml5" @click="removeNodeModalActive = false">
				Cancel
			</button>
		</div>
	</Modal>
</template>