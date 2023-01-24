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
		AgGridVue
	},

	data() {
		return {
			users: [],

			column_defs: [
				{
					field: 'guid',
					headerName: '',
					sortable: false,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';

						return ``;
					},
					hide: true
				},
				{
					field: 'pseudonym',
					headerName: 'Pseudonym',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';

						return `<span class="bold pointer">${params.value}</span>`;
					},
					onCellClicked: (event) => {
						let guid = event.value;

						if (guid) {
							this.$root.routeTo(`/a/profile/${guid}`);
						}
					}
				},
				{
					field: 'membership_status',
					headerName: 'Membership Status',
					sortable: true,
				},
				{
					field: 'email',
					headerName: 'Email',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<span class="bold pointer underline">${params.value}</span>`
					},
					onCellClicked: (event) => {
						let guid = event.data.guid;

						if (guid) {
							this.$root.routeTo(`/a/user/${guid}`);
						}
					}
				},
				{
					field: 'entity.entity_name',
					headerName: 'Entity Name',
					sortable: true,
				},
				{
					field: 'total_stake',
					headerName: 'CSPR Delegated',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';

						return params.value.toLocaleString('en-US');
					},
				},
				{
					field: 'registration_date',
					headerName: 'Registration Date',
					sortable: true,
				}
			],

			quickFilterText:     "",
			quickFilterCategory: "",
			gridApi:             null,

			defaultColDef: {
				flex:      1,
				minWidth:  100,
				resizable: true,
			}
		}
	},

	created() {
		this.getUsers();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async getUsers() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-users',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.users = response.detail;
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
							<i class="fa fa-users green"></i>
							<b>Users List</b>
						</span>
					</div>
					<div class="table-header">
						<p class="fs12 op7">Click any user for more details</p>
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
</template>

<style scoped>



</style>