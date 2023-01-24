<script>

import App from '../../../../App.vue';
import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { AgGridVue } from "ag-grid-vue3";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../../ag-theme-custom.css";

export default {
	components: {
		Popper,
		ClipLoader,
		AgGridVue
	},

	data() {
		return {
			uri_category: this.$route.params.category,
			assemblies: [],

			column_defs: [
				{
					field: 'conducted_at',
					headerName: 'Date Of Assembly',
					sortable: true,
					sort: 'desc',
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<i class="fa fa-calendar fs12"></i>${params.value}`
					}
				},
				{
					field: 'created_at',
					headerName: 'Created',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<i class="fa fa-calendar fs12"></i>${params.value}`
					}
				},
				{
					field: 'creator',
					headerName: 'Creator',
					sortable: true,
				},
				{
					field: 'topic',
					headerName: 'Topic',
					sortable: true
				},
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

	created() {
		this.getGeneralAssemblies();
	},

	mounted() {
		let that = this;
	},

	watch: {
		'$route' (to, from) {
			this.uri_category = this.$route.params.category;
		}
	},

	methods: {
		async getGeneralAssemblies() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-general-assemblies',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				console.log(response);
				this.assemblies = response.detail;
			}
		},

		onGridReady(params) {
			this.gridApi = params.api;
			this.gridApi.showLoadingOverlay();
		},

		rowClicked(event) {
			let selected_ballot_id = event.data.ballot_id;

			if (selected_ballot_id) {
				this.$root.routeTo(`/a/ballot/${selected_ballot_id}`);
			}
		},

		async callGeneralAssembly(event) {
			console.log('begin create general assembly flow');
		}
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="card-title">
						Call for General Assembly
					</div>
					<div class="card-body">
						<p class="mb20">There is no general assembly scheduled at this time.</p>
						<button class="btn btn-success" @click="callGeneralAssembly()">
							Call a General Assembly
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="table-header">
						<p class="bold">Past Assemblies</p>
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
							:rowData="assemblies"
							:quickFilterText="quickFilterText"
							:defaultColDef="defaultColDef"
							pagination="true"
							@rowClicked=rowClicked
						>
						</ag-grid-vue>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
