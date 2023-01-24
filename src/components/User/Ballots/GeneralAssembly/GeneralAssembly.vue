<script>

import App from '../../../../App.vue';
import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { AgGridVue } from "ag-grid-vue3";
import { Modal } from 'vue-neat-modal';
import Datepicker from '@vuepic/vue-datepicker';

import 'vue-neat-modal/dist/vue-neat-modal.css';

import '@vuepic/vue-datepicker/dist/main.css'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../../ag-theme-custom.css";

export default {
	components: {
		Popper,
		ClipLoader,
		AgGridVue,
		Modal,
		Datepicker
	},

	data() {
		return {
			uri_category: this.$route.params.category,
			call_general_assembly: false,
			edit_general_assembly: false,
			assemblies:            [],
			proposed_times:        [],

			assembly:     {
				id:            0,
				topic:         '',
				description:   '',
				proposed_time: null
			},

			column_defs:  [
				{
					field: 'conducted_at',
					headerName: 'Date Of Assembly',
					sortable: true,
					sort: 'desc',
					cellRenderer: (params) => {
						if (!params) return '';

						if (!params.value) {
							return 'Pending';
						}

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
					field: 'pseudonym',
					headerName: 'Creator',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<span class="bold pointer">${params.value}</span>`
					},
					onCellClicked: (event) => {
						let creator = event.data.creator;

						if (creator) {
							this.$root.routeTo(`/u/profile/${creator}`);
						}
					}
				},
				{
					field: 'topic',
					headerName: 'Topic',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<i class="fa fa-info-circel fs12"></i>${params.value}`
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
							params.data.finished == 0 &&
							params.data.creator == this.$root.guid
						) {
							return `<button class="btn btn-success btn-sm">Edit</button>`;
						} else {
							return '';
						}
					},
					onCellClicked: (event) => {
						let id          = event.data.id;
						let topic       = event.data.topic;
						let description = event.data.description;

						if (
							id &&
							topic &&
							description
						) {
							this.assembly.id           = id;
							this.assembly.topic        = topic;
							this.assembly.description  = description;
							this.edit_general_assembly = true;
							this.getProposedTimes();
						}
					}
				},
			],

			proposed_times_columns: [
				{
					field: 'pseudonym',
					headerName: 'Member',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<span class="bold pointer">${params.value}</span>`
					},
					onCellClicked: (event) => {
						this.$root.routeTo(`/u/profile/${event.value}`);
					}
				},
				{
					field: 'proposed_time',
					headerName: 'Proposed Time',
					sortable: true,
					sort: 'asc',
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<i class="fa fa-calendar fs12"></i>${params.value}`
					}
				}
			],

			quickFilterText: "",
			gridApi:         null,
			gridApiProposedTimes: null,

			defaultColDef: {
				flex:      1,
				minWidth:  100,
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
				'user/get-general-assemblies',
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

		onGridReadyProposedTimes(params) {
			this.gridApiProposedTimes = params.api;
			this.gridApiProposedTimes.showLoadingOverlay();
		},

		newBtn() {
			this.assembly = {
				id:            0,
				topic:         '',
				description:   '',
				proposed_time: null
			};
			this.call_general_assembly = true;
		},

		async callGeneralAssembly(event) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			// re-format datepicker timestamps
			if (!this.assembly.proposed_time) {
				this.assembly.proposed_time = '';
			} else if (typeof this.assembly.proposed_time.toISOString == 'function') {
				this.assembly.proposed_time = this.$root.formatDateWithZone(this.assembly.proposed_time)
			} else if (this.assembly.proposed_time.includes("Z")) {
				this.assembly.proposed_time = this.$root.formatZDate(this.assembly.proposed_time)
			}

			const response = await api(
				'POST',
				'user/create-general-assembly',
				{
					topic:         this.assembly.topic,
					description:   this.assembly.description,
					proposed_time: this.assembly.proposed_time
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.getGeneralAssemblies();
				this.$root.toast(
					'',
					response.message,
					'success'
				);
				this.call_general_assembly = false;
				this.assembly = {
					id:            0,
					topic:         '',
					description:   '',
					proposed_time: null
				};
			} else {
				this.$root.toast(
					'',
					response.message,
					'error'
				);
			}
		},

		async editGeneralAssembly() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'PUT',
				'user/edit-general-assembly',
				{
					id:            this.assembly.id,
					topic:         this.assembly.topic,
					description:   this.assembly.description,
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.getGeneralAssemblies();
				this.$root.toast(
					'',
					response.message,
					'success'
				);
				this.edit_general_assembly = false;
				this.assembly = {
					id:            0,
					topic:         '',
					description:   '',
					proposed_time: null
				};
			} else {
				this.$root.toast(
					'',
					response.message,
					'error'
				);
			}
		},

		async getProposedTimes() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-general-assembly-proposed-times',
				{
					id: this.assembly.id
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.proposed_times = response.detail;
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
					<div class="card-title">
						Call for General Assembly
					</div>
					<div class="card-body">
						<p class="mb20">There is no general assembly scheduled at this time.</p>
						<button class="btn btn-success" @click="newBtn">
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
						<p class="bold">Assemblies</p>
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
						>
						</ag-grid-vue>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Modal
		v-model="call_general_assembly"
		max-width="800px"
		:click-out="false"
	>
		<div class="modal-container" style="max-width: 800px; height: 600px; overflow-y: scroll;">
			<h5 class="pb15">
				Call General Assembly
				<button @click="call_general_assembly = false" class="btn btn-success btn-sm fs13 float-right">
					Cancel
				</button>
			</h5>

			<p class="mt20">
				This general assembly must be seconded by another verified association member and activated before a date/time for the call will be found. The system will attempt to find the best call slot based on each member's availability.
			</p>

			<p class="mt20 bold">
				Topic
				<input type="text" class="form-control mt10" v-model="assembly.topic">
			</p>

			<p class="mt20 bold">
				Description
				<br/>
				<textarea v-model="assembly.description" class="form-control height-200 p15 mt10"></textarea>
			</p>

			<p class="mt20 bold">
				Pick a proposed date/time for a call slot
			</p>

			<div class="form-group inline width-200 mt10 mr10">
				<p class="op7 fs13">
					Start Time
				</p>
				<Datepicker 
					v-model="assembly.proposed_time" 
					class="width-200 inline"
					:format="'yyyy/MM/dd HH:mm'"
					:preview-format="'yyyy/MM/dd HH:mm'"
					utc
				></Datepicker>
			</div>

			<div class="form-group mt20">
				<button class="btn btn-success form-control btn-inline ml0 mt20 mb10" @click="callGeneralAssembly">
					<i class="fa fa-clock-o bold"></i>
					Begin
				</button>

				<button class="btn btn-success form-control btn-inline mt20 mb10" @click="call_general_assembly = false">
					Cancel
				</button>
			</div>
		</div>
	</Modal>
	<Modal
		v-model="edit_general_assembly"
		max-width="800px"
		:click-out="false"
	>
		<div class="modal-container" style="max-width: 800px; height: 600px; overflow-y: scroll;">
			<h5 class="pb15">
				Edit General Assembly
				<button @click="edit_general_assembly = false" class="btn btn-success btn-sm fs13 float-right">
					Cancel
				</button>
			</h5>

			<p class="mt20">
				Once this assembly has been activated, you will no longer be able to modify it.
			</p>

			<p class="mt20 bold">
				Topic
				<input type="text" class="form-control mt10" v-model="assembly.topic">
			</p>

			<p class="mt20 bold">
				Description
				<br/>
				<textarea v-model="assembly.description" class="form-control height-200 p15 mt10"></textarea>
			</p>

			<p class="mt20 bold">
				Proposed call slots
			</p>

			<div class="table-card mt20">
				<ag-grid-vue
					style="width: 100%; height: 100%;"
					class="ag-theme-alpine"
					:columnDefs="proposed_times_columns"
					@grid-ready="onGridReadyProposedTimes"
					:suppressExcelExport="true"
					:rowData="proposed_times"
					:defaultColDef="defaultColDef"
					pagination="true"
				>
				</ag-grid-vue>
			</div>

			<div class="form-group mt20">
				<button class="btn btn-success form-control btn-inline ml0 mt20 mb10" @click="editGeneralAssembly">
					<i class="fa fa-check bold"></i>
					Save
				</button>

				<button class="btn btn-success form-control btn-inline mt20 mb10" @click="edit_general_assembly = false">
					Cancel
				</button>
			</div>
		</div>
	</Modal>
</template>
