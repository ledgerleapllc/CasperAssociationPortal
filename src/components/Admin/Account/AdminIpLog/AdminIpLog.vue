<script>

import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import moment from 'moment';
import { AgGridVue } from "ag-grid-vue3";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../../ag-theme-custom.css";

export default {
	data() {
		return {
			uri_category: this.$route.params.category,

			email: '',
			iplog: [],
			columnDefs: [
				{
					field: 'logged_in_at',
					headerName: 'Login Date/Time',
					sortable: true,
					sort: 'desc'
				},
				{
					field: 'ip',
					headerName: 'Ip Address',
					sortable: true
				},
				{
					field: 'detail',
					headerName: 'Details',
					sortable: true
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
		AgGridVue
	},

	mounted() {
		let that = this;
		this.getIplogs();
	},

	methods: {
		async getIplogs() {
			const response = await api(
				'GET', 
				'admin/get-iplog', 
				{
					guid: this.$root.guid
				},
				this.$root.bearer_token
			);

			if (response.hasOwnProperty('status')) {
				let status = response.status;

				if (status == 200) {
					this.email = response.detail.email;
					this.iplog = response.detail.iplog;
				}
			}
		},

		onGridReady(params) {
			this.gridApi = params.api;
		},

		downloadCsv() {
			this.gridApi.exportDataAsCsv({
				fileName: `iplog-${moment().format('YYYY-MM-DD')}-${this.uri_guid}`
			});
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
							{{
								this.email.length > 25
									? this.email.substring(0, 23) + '..'
									: this.email
							}}
						</b>
					</div>
					<div class="card-body">
						<div class="table-header" style="border-top: none; padding: 0;">
							<span>
								<input v-model="quickFilterText" type="text" class="form-control form-control-sm width-200" placeholder="Search">
							</span>
							<span>
								<button v-on:click="downloadCsv()" class="btn btn-success btn-sm float-right z2">Download CSV</button>
							</span>
						</div>
						<div class="table-card">
							<ag-grid-vue
								style="width: 100%; height: 100%;"
								class="ag-theme-alpine"
								:columnDefs="columnDefs"
								@grid-ready="onGridReady"
								:suppressExcelExport="true"
								:rowData="iplog"
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
</template>