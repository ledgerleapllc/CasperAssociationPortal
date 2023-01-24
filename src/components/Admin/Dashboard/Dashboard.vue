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
			pinned_discussions: null,
			key_intake:         null,
			key_id_reviews:     null,
			perks_viewed:       null,
			new_comments:       null,
			new_theads:         null,
			total_users:        null,
			total_stake:        null,
			total_delegators:   null,
			average_uptime:     null,
			average_response:   null,

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
				'admin/get-dashboard',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.pinned_discussions   = response.detail.pinned_discussions;
				this.key_intake           = response.detail.key_intake;
				this.key_id_reviews       = response.detail.key_id_reviews;
				this.perks_viewed         = response.detail.perks_viewed;
				this.new_comments         = response.detail.new_comments;
				this.new_theads           = response.detail.new_theads;
				this.total_users          = response.detail.total_users;
				this.total_stake          = response.detail.total_stake;
				this.total_delegators     = response.detail.total_delegators;
				this.average_uptime       = response.detail.average_uptime;
				this.average_response     = response.detail.average_response;
				this.trending_discussions = response.detail.trending_discussions;
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
				this.$root.routeTo(`/a/discussion/${selected_discussion_id}`);
			}
		},

		association_members_rowClicked(event) {
			let member_id = event.data.guid;

			if (member_id) {
				this.$root.routeTo(`/a/profile/${member_id}`);
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
					<div class="col-md-6 mt20">
						<div class="card">
							<div class="card-title">
								Intake
							</div>
							<div class="card-body">
								<div v-if="this.key_intake === null">
									New users ready: 
									<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
								</div>
								<div v-else>
									New users ready: {{ key_intake }}
								</div>
								<div v-if="this.key_id_reviews === null">
									ID Verification to Review: 
									<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
								</div>
								<div v-else>
									ID Verification to Review: {{ key_id_reviews }}
								</div>

								<button v-if="this.$root.permissions.intake == true" class="btn btn-sm btn-success mt10" @click="this.$root.routeTo('/a/intake')">
									Review
								</button>
							</div>
						</div>
					</div>
					<div class="col-md-6 mt20">
						<div class="card" style="height: 100%;">
							<div class="card-title">
								Perks Viewed
							</div>
							<div class="card-body">
								<div v-if="this.perks_viewed === null">
									<ClipLoader size="25px" color="#ff2d2e"></ClipLoader>
								</div>
								<div v-else>
									{{ perks_viewed }}
									<br>
									<span class="fs12">
										( Last 24 hours )
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-6 mt20">
						<div class="card">
							<div class="card-title">
								New Comments
							</div>
							<div class="card-body">
								<div v-if="this.new_comments === null">
									<ClipLoader size="25px" color="#ff2d2e"></ClipLoader>
								</div>
								<div v-else>
									{{ new_comments }}
									<br>
									<span class="fs12">
										( Last 24 hours )
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-6 mt20">
						<div class="card">
							<div class="card-title">
								New Threads
							</div>
							<div class="card-body">
								<div v-if="this.new_theads === null">
									<ClipLoader size="25px" color="#ff2d2e"></ClipLoader>
								</div>
								<div v-else>
									{{ new_theads }}
									<br>
									<span class="fs12">
										( Last 24 hours )
									</span>
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
					<div class="col-12 mt20">
						<div class="card">
							<div class="card-title">
								Metrics
							</div>
							<div class="card-body">
								<p class="fs16">
									Total Users
									<Popper hover arrow placement="right" class="fs11" content="Total number of users on the platform">
										<i class="fa fa-info-circle pointer ml5 fs16"></i>
									</Popper>
								</p>
								<div class="fs13 op7 mt5">
									<span v-if="this.total_users === null">
										<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
									</span>
									<span v-else>
										{{ total_users }}
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
										{{ total_stake.toLocaleString('en-US') }}
									</span>
								</div>

								<p class="fs16 pt20">
									Total Delegators
								</p>
								<div class="fs13 op7 mt5">
									<span v-if="this.total_delegators === null">
										<ClipLoader style="text-align: left; display: inline-block;" size="15px" color="#ff2d2e"></ClipLoader>
									</span>
									<span v-else>
										{{ total_delegators.toLocaleString('en-US') }}
									</span>
								</div>

								<p class="fs16 pt20">
									Average Uptime
									<Popper hover arrow placement="right" class="fs11" content="Uptime is calculated from the percentage of eras one has joined multiplied by the rewards offered per era minus any eras one missed while their bid was high enough to participate in the validator pool.">
										<i class="fa fa-info-circle pointer ml5 fs16"></i>
									</Popper>
								</p>
								<div class="fs13 mt5">
									{{ average_uptime }}%
								</div>

								<p class="fs16 pt20">
									Average Responsiveness
									<Popper hover arrow placement="right" class="fs11" content="">
										<i class="fa fa-info-circle pointer ml5 fs16"></i>
									</Popper>
								</p>
								<div class="fs13 mt5">
									{{ average_response }}%
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