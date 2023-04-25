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
			votes: [],

			column_defs: [
				{
					field: 'title',
					headerName: 'Title',
					sortable: true,
				},
				{
					field: 'direction',
					headerName: 'My Vote',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';

						if (params.value == 'for') {
							return `<span class="text-blue bold">For</span>`;
						}

						if (params.value == 'against') {
							return `<span class="text-red bold">Aainst</span>`;
						}
					},
				},
				{
					field: 'updated_at',
					headerName: 'Date Placed',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<i class="fa fa-calendar fs12"></i>${params.value}`
					}
				},
				{
					field: 'total_votes',
					headerName: 'Total Votes',
					sortable: true
				},
				{
					field: 'for_against',
					headerName: 'For/Against',
					sortable: true,
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
		this.getMyVotes();
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
		async getMyVotes() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-my-votes',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.votes = response.detail;
			}
		},

		onGridReady(params) {
			this.gridApi = params.api;
			this.gridApi.showLoadingOverlay();
		},

		rowClicked(event) {
			let selected_ballot_id = event.data.ballot_id;

			if (selected_ballot_id) {
				this.$root.routeTo(`/u/ballot/${selected_ballot_id}`);
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
							:rowData="votes"
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
