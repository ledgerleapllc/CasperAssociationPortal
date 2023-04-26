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
					field: 'pseudonym',
					headerName: 'User',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';

						return `<span class="bold pointer">${params.value}</span>`;
					},
					onCellClicked: (event) => {
						if (!event) return '';
						if (!event.value) return '';

						let user_pseudonym = event.value;

						if (user_pseudonym) {
							this.$root.routeTo(`/a/profile/${user_pseudonym}`);
						}
					}
				},
				{
					field: 'title',
					headerName: 'Ballot',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';
						if (!params.value) return '';

						return `<span class="bold pointer">#${params.data.ballot_id} - ${params.value}</span>`;
					},
					onCellClicked: (event) => {
						if (!event) return '';
						if (!event.data) return '';

						let selected_ballot_id = event.data.ballot_id;

						if (selected_ballot_id) {
							this.$root.routeTo(`/a/ballot/${selected_ballot_id}`);
						}
					}
				},
				{
					field: 'direction',
					headerName: 'Vote',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';

						if (params.value == 'for') {
							return `<span class="bold">For</span>`;
						}

						if (params.value == 'against') {
							return `<span class="bold">Aainst</span>`;
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
		this.getAllVotes();
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
		async getAllVotes() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-all-votes',
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
						>
						</ag-grid-vue>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
