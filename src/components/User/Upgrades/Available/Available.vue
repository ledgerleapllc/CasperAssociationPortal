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
			uri_page: this.$route.params.page,

			column_defs: [
				{
					field: 'upgrade_status',
					headerName: 'Node Status',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';

						if (params.value == 'complete') {
							return `<i class="fa fa-check text-green fs16 bold"></i>${this.$root.formatHash(params.data.public_key, 16)}`;
						} else {
							return `<i class="fa fa-times text-red fs16 bold"></i>${this.$root.formatHash(params.data.public_key, 16)}`;
						}
					}
				},
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
						let guid = event.data.guid;

						if (guid) {
							this.$root.routeTo(`/u/profile/${guid}`);
						}
					}
				},
				{
					field: 'upgraded_at',
					headerName: 'Upgraded At',
					sortable: true
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
		this.$parent.getAvailableUpgrade();
	},

	mounted() {
		let that = this;
	},

	methods: {
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

		async markComplete(version) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/complete-upgrade',
				{
					version: version
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.$parent.getAvailableUpgrade();
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
	},

	watch: {
		'$route' (to, from) {
			this.uri_page = this.$route.params.page;
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
						Available Protocol Upgrade
					</div>
					<div class="card-body">
						<div v-if="this.$parent.loaded === false">
							<ClipLoader 
								class="clip-loader-inline" 
								size="15px" 
								color="#ff2d2e"
							></ClipLoader>
						</div>
						<div v-else>
							<div 
								v-if="this.$parent.upgrade.version == null" 
								class="op5 fs14"
							>
								There is no available protocol upgrade at this time.
							</div>

							<div v-else>
								<p class="mb10">
									Approximate time remaining before activation:
								</p>
								<div class="progress-bar-wrap mb30 max-width-400">
									<p class="">
										{{ this.$parent.upgrade?.time_remaining }}
									</p>
									<div 
										class="progress-bar" 
										:style="'width:'+this.$parent.upgrade.time_remaining_perc+'%;'"
									></div>
								</div>

								<p 
									v-if="this.$parent.upgrade_complete" 
									class="fs14 text-green"
								>
									<i class="fa fa-check textgreen"></i>
									Upgrade marked as complete
								</p>
								<p v-else class="text-red">
									You have not yet marked this protocol upgrade as completed.
									<br/>
									<button 
										class="btn btn-success mt10" 
										@click="markComplete(this.$parent.upgrade.version)"
									>
										Mark as Complete
									</button>
								</p>

								<table class="table mt30 mb5">
									<tr>
										<td class="fs18 bold pb10">
											Version:
										</td>
										<td class="fs18 pb10">
											{{ this.$parent.upgrade.version }}
										</td>
									</tr>
									<tr>
										<td class="bold">
											Activation Era:
										</td>
										<td>
											{{ this.$parent.upgrade.activate_era }}
										</td>
									</tr>
									<tr>
										<td class="bold">
											Approximate Activation:
										</td>
										<td>
											{{ this.$parent.upgrade.activate_at }} UTC
										</td>
									</tr>
									<tr>
										<td class="bold">
											Software Link:
										</td>
										<td>
											<a 
												:href="this.$parent.upgrade.link" 
												target="_blank" 
												style="padding: 0;"
											>
												{{ this.$parent.upgrade.link }}
											</a>
										</td>
									</tr>
									<tr>
										<td class="bold pt20">
											Release Notes:
										</td>
									</tr>
								</table>

								<p 
									v-if="
										this.$parent.upgrade.notes && 
										this.$parent.upgrade.notes != ''
									" 
									class="fs14" 
									style="white-space: pre-line;"
								>
									{{ this.$parent.upgrade.notes }}
								</p>
								<p v-else class="fs14 op7">
									None
								</p>

								<!-- <p class="mt40 bold">
									Upgraded Members
								</p>

								<div class="table-card mt10">
									<ag-grid-vue
										style="width: 100%; height: 100%;"
										class="ag-theme-alpine"
										:columnDefs="column_defs"
										@grid-ready="onGridReady"
										:suppressExcelExport="true"
										:rowData="this.$parent.users"
										:quickFilterText="quickFilterText"
										:defaultColDef="defaultColDef"
										pagination="true"
									>
									</ag-grid-vue>
								</div> -->
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<style>


</style>