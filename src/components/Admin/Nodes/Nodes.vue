<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';

export default {
	components: {
		Popper,
		ClipLoader
	},

	data() {
		return {
			public_keys:        [],
			price_data:         [{
				name: "Price",
				data: []
			}],
			ranking:            [],
			inner_width:        window.innerWidth,
			selected_validator: null,
			stake_amount:       null,
			delegators:         null,
			uptime:             null,
			total_eras:         null,
			eras_since_redmark: null,
			total_redmarks:     null,
			updates:            null,
			daily_earning:      null,
			mbs:                null,
			rewards_data:       [{
				name: "Self Stake",
				data: []
			}],

			progressBarWidth:   0 + '%',
			progressBarWidth2:  0 + '%',

			apex_data_options: {
				xaxis: {
					type: 'datetime',
					tickAmount: 1,
				},
				tooltip: {
					x: {
						format: 'dd MMM yyyy',
					},
					y: {
						formatter: (v) => {
							return v.toLocaleString('en-US')
						}
					}
				},
				colors: ['#ff2d2e', '#ff2d2e', '#ff2d2e'],
				fill: {
					type: 'gradient',
					colors: ['#ff2d2e', '#ff2d2e'],
					gradient: {
						opacityFrom: 0.6,
						opacityTo: 0.1,
					},
				},
				stroke: {
					width: 4,
					curve: 'smooth',
				},
				dataLabels: {
					enabled: false,
				},
				markers: {
					size: 0,
					colors: undefined,
					strokeColors: '#ff2d2e',
					strokeWidth: 4,
					strokeOpacity: 0.6,
					strokeDashArray: 0,
					fillOpacity: 1,
					discrete: [],
					shape: 'circle',
					radius: 4,
					offsetX: 0,
					offsetY: 0,
					onClick: undefined,
					onDblClick: undefined,
					showNullDataPoints: true,
					hover: {
						size: undefined,
						sizeOffset: 2,
					},
				}
			}
		}
	},

	created() {
		this.getNodes();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async getNodes() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-nodes',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.public_keys        = response.detail.public_keys;
				this.ranking            = response.detail.ranking;
				this.selected_validator = this.public_keys[0];
				this.mbs                = response.detail.mbs;
				this.price_data         = [{
					name: "Price",
					data: response.detail.price_data
				}];
			}
		},

		async getNodeData() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');
			let s = this.selected_validator;

			const response = await api(
				'GET',
				'admin/get-node-data',
				{
					public_key: s
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.stake_amount       = response.detail.stake_amount;
				this.delegators         = response.detail.delegators;
				this.uptime             = response.detail.uptime;
				this.progressBarWidth   = `${parseInt(this.uptime)}%`;
				this.total_eras         = response.detail.total_eras;
				this.eras_since_redmark = response.detail.eras_since_redmark;
				this.total_redmarks     = response.detail.total_redmarks;
				this.updates            = response.detail.updates;
				this.progressBarWidth2  = this.updates + '%';
				this.daily_earning      = response.detail.daily_earning;
				this.rewards_data       = [{
					name: "Self Stake",
					data: response.detail.rewards_data
				}];
			}
		},

		copyValidatorId(e) {
			let that = this;
			let vid = this.$refs.selected_validator.value;
			copyText(vid, undefined, function(e) {
				that.$root.toast("Public key copied to clipboard", "", "info");
			});
		}
	},

	watch: {
		selected_validator: function(e) {
			this.stake_amount       = null;
			this.delegators         = null;
			this.uptime             = null;
			this.total_eras         = null;
			this.eras_since_redmark = null;
			this.total_redmarks     = null;
			this.updates            = null;
			this.daily_earning      = null;
			this.getNodeData();
		}
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-6 mt20">
				<div class="card min-card-height">
					<div class="card-title">
						Public Key
						<Popper hover arrow placement="right" class="fs11" content="Displays the selected node address">
							<i class="fa fa-info-circle pointer ml5 fs16"></i>
						</Popper>

						<i class="fa fa-clipboard float-right fs16 pointer" @click="copyValidatorId"></i>
					</div>
					<div class="card-body">
						<div v-if="this.selected_validator === null">
							<ClipLoader size="25px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else>
							<select class="form-select" ref="selected_validator" v-model="selected_validator">
								<option v-for="(value, index) in this.public_keys" :value="value" :selected="index == 0">{{ value }}</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-md-6 mt20">
				<div class="card min-card-height">
					<div class="card-title">
						Stake Amount
						<Popper hover arrow placement="right" class="fs11" content="Amount staked to the selected node">
							<i class="fa fa-info-circle pointer ml5 fs16"></i>
						</Popper>
					</div>
					<div class="card-body">
						<div v-if="this.stake_amount === null">
							<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else>
							{{ stake_amount.toLocaleString('en-US') }}&ensp;
							<img src="@/assets/images/favicon.png" class="tiny-img">
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-md-6 mt20">
				<div class="card min-card-height">
					<div class="card-title">
						Delegators
						<Popper hover arrow placement="right" class="fs11" content="Number of delegators to the selected node">
							<i class="fa fa-info-circle pointer ml5 fs16"></i>
						</Popper>
					</div>
					<div class="card-body">
						<div v-if="this.delegators === null">
							<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else>
							{{ delegators.toLocaleString('en-US') }}&ensp;
							<i class="fa fa-users fs13"></i>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-12 mt20">
				<div class="card min-card-height-rewards">
					<div class="card-title">
						Validator Rewards
					</div>
					<div class="card-body">
						<apexchart
							width="100%"
							height="300"
							type="area"
							:options="apex_data_options"
							:series="rewards_data"
							style="z-index: 0; position: relative"
						></apexchart>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-7 col-sm-12 mt20">
				<div class="card min-card-height-price">
					<div class="card-title">
						Price
					</div>
					<div class="card-body">
						<apexchart
							width="100%"
							height="290"
							type="area"
							:options="apex_data_options"
							:series="price_data"
							style="z-index: 0; position: relative"
						></apexchart>
					</div>
				</div>
			</div>

			<div class="col-lg-5 col-md-12 mt20">
				<div class="card">
					<div class="card-title">
						Node Metrics
					</div>
					<div class="card-body">
						<p>
							Uptime
							<Popper hover arrow placement="right" class="fs11" content="Uptime is calculated from the percentage of eras you have joined multiplied by the rewards offered per era minus any eras you missed while your bid was high enough to participate in the validator pool.">
								<i class="fa fa-info-circle pointer ml5 fs16"></i>
							</Popper>
						</p>

						<div class="progress-bar-wrap">
							<div class="progress-bar" :style="{ '--progressBarWidth': progressBarWidth }"></div>
							<span class="progress-bar-center">
								{{ uptime }}%
							</span>
						</div>

						<div class="node-metrics-uptime-wrap">
							<div style="width: 33%;">
								<span v-if="this.total_eras === null">
									<ClipLoader class="clip-loader-inline" size="11px" color="#ff2d2e"></ClipLoader>
								</span>
								<span v-else class="fs10 bold">
									Total Eras: {{ total_eras.toLocaleString('en-US') }}
								</span>
							</div>

							<div style="width: 33%; text-align: center;">
								<span v-if="this.eras_since_redmark === null">
									<ClipLoader class="clip-loader-inline" size="11px" color="#ff2d2e"></ClipLoader>
								</span>
								<span v-else class="fs10 bold">
									Eras Since Redmark: {{ eras_since_redmark.toLocaleString('en-US') }}
								</span>
							</div>

							<div style="width: 33%; text-align: right">
								<span v-if="this.total_redmarks === null">
									<ClipLoader class="clip-loader-inline" size="11px" color="#ff2d2e"></ClipLoader>
								</span>
								<span v-else class="fs10 bold">
									Total Redmarks: {{ total_redmarks.toLocaleString('en-US') }}
								</span>
							</div>
						</div>

						<p class="mt20">
							Update Responsiveness
							<Popper hover arrow placement="right" class="fs11" content="Update responsiveness for the selected node.">
								<i class="fa fa-info-circle pointer ml5 fs16"></i>
							</Popper>
						</p>

						<div class="progress-bar-wrap">
							<div class="progress-bar2" :style="{ '--progressBarWidth2': progressBarWidth2 }"></div>
							<span class="progress-bar-center">
								{{ updates }}%
							</span>
						</div>

						<div class="node-metrics-uptime-wrap">
							<p class="fs10 op5">Needs Improvement</p>
							<p class="fs10 op5">Great</p>
						</div>
					</div>
				</div>

				<div class="card mt20">
					<div class="card-title mb0">
						Daily Earnings
						<Popper hover arrow placement="right" class="fs11" content="Displays today's earnings for the selected node.">
							<i class="fa fa-info-circle pointer ml5 fs16"></i>
						</Popper>

						<span class="float-right bold">
							Min Bid Slot
							<Popper hover arrow placement="right" class="fs11" content="Displays the minimum bidding amount required to win a slot in the validator pool.">
								<i class="fa fa-info-circle pointer ml5 fs16"></i>
							</Popper>
						</span>
					</div>
					<div class="card-body">
						<div class="split-card-left">
							<span v-if="this.daily_earning === null">
								<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
							</span>
							<span v-else class="fs14 bold">
								{{ daily_earning.toLocaleString('en-US') }}&ensp;
								<img src="@/assets/images/favicon.png" class="tiny-img">
							</span>
						</div>

						<div class="split-card-right">
							<span v-if="this.mbs === null">
								<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
							</span>
							<span v-else class="fs14 bold">
								{{ mbs.toLocaleString('en-US') }}&ensp;
								<img src="@/assets/images/favicon.png" class="tiny-img">
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-12 mt20">
				<div class="card min-card-height">
					<div class="card-title">
						Registered Node Rankings
						<Popper hover arrow placement="right" class="fs11" content="Ranks all nodes in the system - based on uptime, fee, delegator count, stake amount, all sharing equally weighted importance. Registered node ranking: ">
							<i class="fa fa-info-circle pointer ml5 fs16"></i>
						</Popper>
					</div>
					<div class="card-body scroll-400">
						<div 
							v-for="(index, vid) in ranking" 
							:class="
								vid == selected_validator ? 
								'ranking-row ranking-row-highlighted' : 
								'ranking-row'
							"
						>
							<div class="ranking-cell-left">
								{{ index }}
							</div>
							<div class="ranking-cell-right">
								{{
									this.$root.formatHash(vid, parseInt(inner_width / 100 * 5))
								}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.ranking-row {
	padding-left: 12px;
	padding-right: 10px;
	width: 100%;
	height: 40px;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 10px;
}

.ranking-row-highlighted {
	background-color: #ff2d2e;
	color: #fff;
}

.ranking-cell-left {
	width: 50px;
}

.ranking-cell-right {
	width: calc(100% - 50px);
}

.progress-bar-wrap {
	margin-top: 8px;
	margin-bottom: 4px;
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

.progress-bar2 {
	background-color: #ff2d2e;
	border-radius: 8px;
	width: var(--progressBarWidth2);
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

.node-metrics-uptime-wrap {
	display: flex; 
	flex-direction: row; 
	justify-content: space-between;
}

.split-card-left {
	width: 50%;
	border-right: solid 2px #d0d0d0;
	display: inline-block;
}

.split-card-right {
	width: 50%;
	display: inline-block;
	text-align: right;
}

.min-card-height-price {
	min-height: 400px;
}

.min-card-height-rewards {
	min-height: 300px;
}

</style>