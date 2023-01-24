<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import DefaultAvatarUrl from '@/assets/images/avatar.svg';
import moment from 'moment';
import Popper from 'vue3-popper';
import { AgGridVue } from "ag-grid-vue3";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../ag-theme-custom.css";

export default {
	components: {
		Popper,
		AgGridVue,
		ClipLoader,
		DefaultAvatarUrl
	},

	data() {
		return {
			avatar_url:         DefaultAvatarUrl,
			inner_width:        window.innerWidth,
			pinned_discussions: null,
			new_discussions:    null,
			rank:               null,
			rank_total:         null,
			total_stake:        null,
			self_stake:         null,
			delegators:         null,
			uptime:             null,
			eras_active:        null,
			eras_since_redmark: null,
			total_redmarks:     null,
			total_members:      null,
			verified_members:   null,
			progressBarWidth:   0 + '%',

			association_members: [],
			association_members_column_defs: [
				{
					field: 'public_key',
					headerName: 'Validator',
					sortable: true,
				},
				{
					field: 'pseudonym',
					headerName: 'Pseudonym',
					sortable: true
				},
				{
					field: 'node_status',
					headerName: 'Status',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						let color = 'text-green';

						if (params.value == 'suspended') {
							color = 'text-red';
						} else if (params.value == 'probation') {
							color = 'text-yellow';
						}

						return `<span class="${color}">${this.$root.ucfirst(params.value)}</span>`
					}
				},
			],

			association_members_quickFilterText:     "",
			association_members_quickFilterCategory: "",
			association_members_gridApi:             null,

			trending_discussions: [],
			trending_discussions_column_defs: [
				{
					field: 'title',
					headerName: 'Title',
					sortable: true,
				},
				{
					field: 'comments',
					headerName: 'Comments',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<i class="fa fa-wechat fs12"></i>${params.value}`
					},
				},
				{
					field: 'pins',
					headerName: 'Pinned',
					sortable: true
				},
				{
					field: 'updated_at',
					headerName: 'Date',
					sortable: true,
					onCellClicked: (event) => {
						let selected_discussion_id = event.data.discussion_id;

						if (selected_discussion_id) {
							this.$root.routeTo(`/u/discussion/${selected_discussion_id}`);
						}
					}
				},
			],

			trending_discussions_quickFilterText:     "",
			trending_discussions_quickFilterCategory: "",
			trending_discussions_gridApi:             null,

			defaultColDef: {
				flex:      1,
				minWidth:  100,
				resizable: true,
			}
		}
	},

	watch: {
		association_members_quickFilterCategory: "association_members_quickFilterCategorySelect",
		trending_discussions_quickFilterCategory: "trending_discussions_quickFilterCategorySelect"
	},

	created() {
		this.getDashboard();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async getDashboard() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-dashboard',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.pinned_discussions   = response.detail.pinned_discussions;
				this.new_discussions      = response.detail.new_discussions;
				this.rank                 = response.detail.rank;
				this.rank_total           = response.detail.rank_total;
				this.total_stake          = response.detail.total_stake;
				this.self_stake           = response.detail.self_stake;
				this.delegators           = response.detail.delegators;
				this.uptime               = response.detail.uptime;
				this.eras_active          = response.detail.eras_active;
				this.eras_since_redmark   = response.detail.eras_since_redmark;
				this.total_redmarks       = response.detail.total_redmarks;
				this.total_members        = response.detail.total_members;
				this.verified_members     = response.detail.verified_members;
				this.association_members  = response.detail.association_members;
				this.trending_discussions = response.detail.trending_discussions;
				this.progressBarWidth     = `${parseInt(this.uptime)}%`;
			}
		},

		association_members_onGridReady(params) {
			this.association_members_gridApi = params.api;
		},

		trending_discussions_onGridReady(params) {
			this.trending_discussions_gridApi = params.api;
		},

		association_members_quickFilterCategorySelect(filter) {
			this.association_members_gridApi.setFilterModel({
				source: {
					filterType: 'text',
					type:       'contains',
					filter:     filter
				}
			});
		},

		trending_discussions_quickFilterCategorySelect(filter) {
			this.trending_discussions_gridApi.setFilterModel({
				source: {
					filterType: 'text',
					type:       'contains',
					filter:     filter
				}
			});
		},

		trending_discussions_rowClicked(event) {
			let selected_discussion_id = event.data.id;

			if (selected_discussion_id) {
				this.$root.routeTo(`/u/discussion/${selected_discussion_id}`);
			}
		},

		association_members_rowClicked(event) {
			let member_id = event.data.guid;

			if (member_id) {
				this.$root.routeTo(`/u/profile/${member_id}`);
			}
		}
	}
};

</script>

<template>
	<div class="main-dashboard-content-flexwrap">
		<div class="main-dashboard-content">
			<div class="container-fluid">
				<div class="row">
					<div class="col-6 mt20">
						<div class="card">
							<div class="card-title">
								Pinned Discussions
							</div>
							<div class="card-body">
								<div v-if="this.pinned_discussions === null">
									<ClipLoader size="25px" color="#ff2d2e"></ClipLoader>
								</div>
								<div v-else>
									{{ this.pinned_discussions }}
								</div>
							</div>
						</div>
					</div>
					<div class="col-6 mt20">
						<div class="card">
							<div class="card-title">
								New Discussions
							</div>
							<div class="card-body">
								<div v-if="this.new_discussions === null">
									<ClipLoader size="25px" color="#ff2d2e"></ClipLoader>
								</div>
								<div v-else>
									{{ this.new_discussions }}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-12 mt20">
						<div class="card">
							<div class="table-header">
								<span>
									<i class="fa fa-user green"></i>
									<b>Association Members</b>
								</span>

								<div v-if="inner_width > 600" class="float-right">
									<div class="fs12">
										Total Members:&ensp;
										<span v-if="this.total_members === null">
											<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
										</span>
										<span v-else>
											{{ this.total_members }}
										</span>

										&ensp;
										<img src="@/assets/images/favicon.png" class="tiny-img">
										Verified Members:&ensp;
										<span v-if="this.verified_members === null">
											<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
										</span>
										<span v-else>
											{{ this.verified_members }}
										</span>
									</div>
								</div>
							</div>
							<div v-if="inner_width <= 600" class="table-header">
								<div class="fs12">
									Total Members:&ensp;
									<span v-if="this.total_members === null">
										<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
									</span>
									<span v-else>
										{{ this.total_members }}
									</span>

									&ensp;
									<img src="@/assets/images/favicon.png" class="tiny-img">
									Verified Members:&ensp;
									<span v-if="this.verified_members === null">
										<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
									</span>
									<span v-else>
										{{ this.verified_members }}
									</span>
								</div>
							</div>
							<div class="table-header">
								<span>
									<input v-model="association_members_quickFilterText" type="text" class="form-control form-control-sm width-200" placeholder="Search">
								</span>
							</div>
							<div class="table-card">
								<ag-grid-vue
									style="width: 100%; height: 100%;"
									class="ag-theme-alpine"
									:columnDefs="association_members_column_defs"
									@grid-ready="association_members_onGridReady"
									:suppressExcelExport="true"
									:rowData="association_members"
									:quickFilterText="association_members_quickFilterText"
									:defaultColDef="defaultColDef"
									pagination="true"
									@rowClicked="association_members_rowClicked"
								>
								</ag-grid-vue>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-12 mt20">
						<div class="card">
							<div class="table-header">
								<span>
									<i class="fa fa-wechat green"></i>
									<b>Trending Discussions</b>
								</span>
							</div>
							<div class="table-header">
								<span>
									<input v-model="trending_discussions_quickFilterText" type="text" class="form-control form-control-sm width-200" placeholder="Search">
								</span>
							</div>
							<div class="table-card">
								<ag-grid-vue
									style="width: 100%; height: 100%;"
									class="ag-theme-alpine"
									:columnDefs="trending_discussions_column_defs"
									@grid-ready="trending_discussions_onGridReady"
									:suppressExcelExport="true"
									:rowData="trending_discussions"
									:quickFilterText="trending_discussions_quickFilterText"
									:defaultColDef="defaultColDef"
									pagination="true"
									@rowClicked="trending_discussions_rowClicked"
								>
								</ag-grid-vue>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="right-dashboard-content">
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-12 mt20">
						<div class="card">
							<div class="card-title">
								Node Info
							</div>
							<div class="card-body">
								<p class="fs16">
									Registered Node Rankings
									<Popper hover arrow placement="right" class="fs11" content="Ranks all nodes on the platform - based on uptime, fee, delegator count, and stake amount, all sharing equally weighted importance.">
										<i class="fa fa-info-circle pointer ml5 fs16"></i>
									</Popper>
								</p>
								<div class="fs13 op7 mt5">
									<span v-if="this.rank === null || this.rank_total === null">
										<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
									</span>
									<span v-else>
										{{ this.rank }} out of {{ this.rank_total }}
									</span>
								</div>

								<p class="fs16 pt20">
									Total Stake
								</p>
								<div class="fs13 op7 mt5">
									<span v-if="this.total_stake === null">
										<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
									</span>
									<span v-else>
										{{ this.total_stake.toLocaleString('en-US') }}
									</span>
								</div>

								<p class="fs16 pt20">
									Self Stake
								</p>
								<div class="fs13 op7 mt5">
									<span v-if="this.self_stake === null">
										<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
									</span>
									<span v-else>
										{{ this.self_stake.toLocaleString('en-US') }}
									</span>
								</div>

								<p class="fs16 pt20">
									Delegators
								</p>
								<div class="fs13 op7 mt5">
									<span v-if="this.delegators === null">
										<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
									</span>
									<span v-else>
										{{ this.delegators }}
									</span>
								</div>

								<p class="fs16 pt20">
									Uptime
									<Popper hover arrow placement="right" class="fs11" content="Uptime is calculated from the percentage of eras you have joined multiplied by the rewards offered per era minus any eras you missed while your bid was high enough to participate in the validator pool.">
										<i class="fa fa-info-circle pointer ml5 fs16"></i>
									</Popper>
								</p>
								<div class="fs13 mt5">
									<p class="fs12">
										Average:
									</p>
									<div 
										v-if="this.uptime === null" 
										class="progress-bar-wrap"
									>
										<div 
											class="progress-bar" 
											:style="{ '--progressBarWidth': progressBarWidth }"
										></div>
										<span class="progress-bar-center">
											<ClipLoader style="text-align: left; display: inline-block;" size="20px" color="#ff2d2e"></ClipLoader>
										</span>
									</div>
									<div 
										v-else 
										class="progress-bar-wrap"
									>
										<div 
											class="progress-bar" 
											:style="{ '--progressBarWidth': progressBarWidth }"
										></div>
										<span class="progress-bar-center">
											{{ uptime }}%
										</span>
									</div>

									<p class="fs12 mt10">
										Eras Active:&ensp;
										<span v-if="this.eras_active === null">
											<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
										</span>
										<span v-else>
											{{ this.eras_active }}
										</span>
									</p>

									<p class="fs12">
										Eras Since Redmark:&ensp;
										<span v-if="this.eras_since_redmark === null">
											<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
										</span>
										<span v-else>
											{{ this.eras_since_redmark }}
										</span>
									</p>

									<p class="fs12">
										Total Redmarks:&ensp;
										<span v-if="this.eras_since_redmark === null">
											<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
										</span>
										<span v-else>
											{{ this.eras_since_redmark }}
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.progress-bar-wrap {
	margin-top: 8px;
	height: 23px;
	width: 100%;
	border-radius: 8px;
	background-color: #cacbcc;
	position: relative;
	display: block;
}

.progress-bar {
	background-color: #ff2d2e;
	border-radius: 8px;
	width: var(--progressBarWidth);
	height: 100%;
}

.progress-bar-center {
	position: absolute;
	top: 1px;
	left: calc(50% - 50px);
	font-weight: bold;
	font-size: 13px;
	color: #fff;
	text-align: center;
	width: 100px;
	letter-spacing: 1px;
}

@media all and (max-width: 991px) {
	.main-dashboard-content-flexwrap {
		flex-direction: column-reverse;
	}

	.main-dashboard-content {
		width: 100%;
	}

	.right-dashboard-content {
		width: 100%;
	}
}

</style>