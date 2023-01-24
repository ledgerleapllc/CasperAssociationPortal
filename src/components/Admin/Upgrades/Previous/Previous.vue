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
			uri_page:         this.$route.params.page,
			selected_version: '',
			users_modal:      false,

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
							this.$root.routeTo(`/a/user/${guid}`);
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
		this.$parent.getUpgrades();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async loadTable(version) {
			this.$parent.getUpgradedUsers(version);
			this.selected_version = version;
			this.users_modal      = true;
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
				<p class="bold mt20 fs16">
					Past Protocol Upgrades
				</p>
				<p class="pb30">
					Below are details about protocol upgrades that have already passed the activation point.
				</p>

				<div v-if="this.$parent.upgrades.length == 0" class="op5 fs14">
					Nothing to show here
				</div>

				<div v-for="(up, index) in this.$parent.upgrades" class="card mt20">
					<div class="card-title">
						<i class="fa fa-arrow-up green"></i>
						Protocol Upgrade&ensp;{{ up.version }}
					</div>
					<div class="card-body">
						<p v-if="up.visible == 1" class="fs14 op7 text-red">
							Visible
						</p>
						<p v-else class="fs14 op7 text-blue">
							Not visible for members
						</p>

						<table class="table mt20 mb5">
							<tr>
								<td class="fs18 bold pb10">
									Version:
								</td>
								<td class="fs18 pb10">
									{{ up.version }}
								</td>
							</tr>
							<tr>
								<td class="bold">
									Activation Era:
								</td>
								<td>
									{{ up.activate_era }}
								</td>
							</tr>
							<tr>
								<td class="bold">
									Approximate Activation:
								</td>
								<td>
									{{ up.activate_at }} UTC
								</td>
							</tr>
							<tr>
								<td class="bold">
									Software Link:
								</td>
								<td>
									<a :href="this.$parent.upgrade.link" target="_blank" style="padding: 0;">
										{{ up.link }}
									</a>
								</td>
							</tr>
							<tr>
								<td class="bold pt20">
									Release Notes:
								</td>
							</tr>
						</table>

						<p v-if="up.notes && up.notes != ''" class="fs14" style="white-space: pre-line;">
							{{ this.$parent.upgrade.notes }}
						</p>
						<p v-else class="fs14 op7">
							None
						</p>

						<p class="mt40 bold">
							Upgraded Members
						</p>

						<button class="btn btn-success mt10" @click="loadTable(up.version)">
							Load Table
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Modal
		v-model="users_modal"
		max-width="800px"
		:click-out="false"
	>
		<div class="modal-container" style="max-width: 800px; height: 640px; overflow-y: scroll;">
			<h5 class="pb15">
				Protocol Upgrade {{ selected_version }}
			</h5>

			<p class="mt20 bold">
				Upgraded Users
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
			</div>

			<button class="btn btn-success form-control btn-inline mt20 mb10" @click="users_modal = false">
				Ok
			</button>
		</div>
	</Modal>
</template>

<style>


</style>