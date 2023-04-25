<script>

import App from '../../../../App.vue';
import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { AgGridVue } from "ag-grid-vue3";
import CountDownWidget from './CountDownWidget.vue';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../../ag-theme-custom.css";

export default {
	components: {
		Popper,
		ClipLoader,
		AgGridVue,
		CountDownWidget
	},

	data() {
		return {
			uri_category: this.$route.params.category,
			ballots: [],

			column_defs: [
				{
					field: 'title',
					headerName: 'Title',
					sortable: true,
				},
				{
					field: 'status',
					headerName: 'Status',
					sortable: true,
					cellRenderer: (params) => {
						if (params?.value == 'pending') {
							return `<span class="op7">Upcoming vote</span>`;
						}

						else {
							return `<span class="text-red bold pointer">Voting LIVE</span>`;
						}
					},
				},
				{
					field: 'total_votes',
					headerName: 'Total Votes',
					sortable: true,
				},
				{
					field: 'time_remaining',
					headerName: 'Time Remaining',
					sortable: true,
					cellRenderer: 'CountDownWidget',
					/*
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						if (!params.data) return '';
						if (!params.data.time_remaining_perc) return '';

						if (params.data.status == 'pending') {
							return '<span class="op7">Voting not yet started</span>';
						}

						let time = params.value;
						let perc = params.data.time_remaining_perc;

						let bar = `<div class="progress-bar-wrap"><p>${time}</p><div class="progress-bar" style="width:${perc}%;"></div></div>`;

						return bar;
					},
					*/
				},
				{
					field: 'start_time',
					headerName: 'Start Time',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<i class="fa fa-calendar fs12"></i>${params.value} UTC`
					},
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

	created() {
		this.getActiveBallots();
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
		async getActiveBallots() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-active-ballots',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.ballots = response.detail;
			}
		},

		onGridReady(params) {
			this.gridApi = params.api;
			this.gridApi.showLoadingOverlay();
		},

		rowClicked(event) {
			let selected_ballot_id = event?.data?.id;

			if (selected_ballot_id) {
				this.$root.routeTo(`/a/ballot/${selected_ballot_id}`);
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
							:rowData="ballots"
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
