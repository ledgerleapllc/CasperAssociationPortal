<script>

import { api } from '../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import Popper from 'vue3-popper';
import { AgGridVue } from "ag-grid-vue3";
import Icon from '@/assets/images/favicon.png';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "../ag-theme-custom.css";

export default {
	data() {
		return {
			loading:           false,

			weight_uptime:     0,
			weight_fee:        0,
			weight_delegators: 0,
			weight_stake:      0,
			weight_total:      0,

			request_timer:     0,

			validators:        [],
			column_defs:       [
				{
					field: 'pseudonym',
					headerName: 'Name',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<span class="pointer bold">${params.value}</span>`
					},
				},
				{
					field: 'registered_at',
					headerName: 'Registration Date',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<i class="fa fa-calendar fs12"></i>${params.value} UTC`
					},
				},
				{
					field: 'kyc_status',
					headerName: 'Verified',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';

						if (params.value == 'approved') {
							return '<span class="text-green">Approved</span>';
						} else if (params.value == 'denied') {
							return '<span class="text-red">Not Approved</span>';
						} else {
							return '<span>Not Verified</span>';
						}
					},
				},
				{
					field: 'fee',
					headerName: 'Rate',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `${params.value}%`
					},
				},
				{
					field: 'delegators',
					headerName: 'Delegators',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return parseInt(params.value).toLocaleString('en-US')
					},
				},
				{
					field: 'stake',
					headerName: 'Total Stake',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `<img src="${Icon}" class="tiny-img mr5">${parseInt(params.value).toLocaleString('en-US')}`
					},
				},
				{
					field: 'uptime',
					headerName: 'Uptime',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return `${parseFloat(params.value).toFixed(2)}%`
					},
				},
				{
					field: 'rank',
					headerName: 'Rank',
					sortable: true,
					sort: 'asc'
				}
			],

			quickFilterText:     "",
			quickFilterCategory: "",
			gridApi:             null,

			defaultColDef:       {
				flex:      1,
				minWidth:  100,
				resizable: true,
			}
		}
	},

	components: {
		Popper,
		AgGridVue,
		Icon
	},

	created() {
	},

	mounted() {
		let that = this;

		for (let e of document.querySelectorAll('.form-range')) {
			e.style.setProperty('--value', e.value);
			e.style.setProperty('--min', e.min == '' ? '0' : e.min);
			e.style.setProperty('--max', e.max == '' ? '100' : e.max);
			e.addEventListener('input', () => e.style.setProperty('--value', e.value));
		}

		setInterval(function() {
			that.request_timer += 1;

			if (that.request_timer == 10) {
				that.getValidators();
			}
		},100);
	},

	methods: {
		async getValidators() {
			this.validators = [];

			const response = await api(
				'GET',
				'public/get-validators',
				{
					uptime:     this.weight_uptime,
					fee:        this.weight_fee,
					delegators: this.weight_delegators,
					stake:      this.weight_stake
				}
			);

			if (response.status == 200) {
				// console.log(response.detail);
				this.validators = response.detail;
			}
		},

		refreshSliders() {
			this.validators        = [];
			// this.weight_uptime     = 0;
			// this.weight_fee        = 0;
			// this.weight_delegators = 0;
			// this.weight_stake      = 0;
			// this.weight_total      = 0;
			// this.request_timer     = 9;
			this.$router.go();
		},

		rowClicked(event) {
			if (event.data.pseudonym) {
				this.$root.routeTo(`/validator/${event.data.pseudonym}?v=${event.data.public_key}`);
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
		},

		changeUptime(event) {
			let weight_uptime = parseInt(event.target.value);

			if (
				weight_uptime          +
				this.weight_fee        +
				this.weight_delegators +
				this.weight_stake      >= 100
			) {
				this.weight_uptime = (
					100 - (
						this.weight_fee        +
						this.weight_delegators +
						this.weight_stake
					)
				);
			} else {
				this.weight_uptime = weight_uptime;
			}

			this.weight_total = (
				this.weight_delegators +
				this.weight_uptime     +
				this.weight_fee        +
				this.weight_stake
			);

			this.request_timer = 0;
		},

		changeFee(event) {
			let weight_fee = parseInt(event.target.value);

			if (
				weight_fee             +
				this.weight_uptime     +
				this.weight_delegators +
				this.weight_stake      >= 100
			) {
				this.weight_fee = (
					100 - (
						this.weight_uptime     +
						this.weight_delegators +
						this.weight_stake
					)
				);
			} else {
				this.weight_fee = weight_fee;
			}

			this.weight_total = (
				this.weight_delegators +
				this.weight_uptime     +
				this.weight_fee        +
				this.weight_stake
			);

			this.request_timer = 0;
		},

		changeDelegators(event) {
			let weight_delegators = parseInt(event.target.value);

			if (
				weight_delegators      +
				this.weight_uptime     +
				this.weight_fee        +
				this.weight_stake      >= 100
			) {
				this.weight_delegators = (
					100 - (
						this.weight_uptime +
						this.weight_fee    +
						this.weight_stake
					)
				);
			} else {
				this.weight_delegators = weight_delegators;
			}

			this.weight_total = (
				this.weight_delegators +
				this.weight_uptime     +
				this.weight_fee        +
				this.weight_stake
			);

			this.request_timer = 0;
		},

		changeStake(event) {
			let weight_stake = parseInt(event.target.value);

			if (
				weight_stake           +
				this.weight_uptime     +
				this.weight_fee        +
				this.weight_delegators >= 100
			) {
				this.weight_stake = (
					100 - (
						this.weight_uptime     +
						this.weight_fee        +
						this.weight_delegators
					)
				);
			} else {
				this.weight_stake = weight_stake;
			}

			this.weight_total = (
				this.weight_delegators +
				this.weight_uptime     +
				this.weight_fee        +
				this.weight_stake
			);

			this.request_timer = 0;
		}
	},

	watch: {
		quickFilterCategory: "quickFilterCategorySelect"
	},
};

</script>

<template>
	<div class="container-fluid bg-white">
		<div class="row">
			<div class="col-md-12">
				<div class="slider-wrap">
					<div class="slider-box mt30 mb40">
						<div class="slider-group">
							<div class="slider-element-1 fs16">
								Uptime
								<Popper hover arrow placement="right" class="fs11" content="30 day rolling uptime percentage of a validator">
									<i class="fa fa-info-circle pointer ml5 fs16"></i>
								</Popper>
							</div>
							<div class="slider-element-2">
								{{ weight_uptime }}
							</div>
							<div class="slider-element-3">
								<input type="range" class="form-range" v-model="weight_uptime" @input="changeUptime" ref="ref_uptime">
							</div>
						</div>

						<div class="slider-group">
							<div class="slider-element-1 fs16">
								Validator Fee
								<Popper hover arrow placement="right" class="fs11" content="The percentage a particular validator takes from the rewards pool of its delegators">
									<i class="fa fa-info-circle pointer ml5 fs16"></i>
								</Popper>
							</div>
							<div class="slider-element-2">
								{{ weight_fee }}
							</div>
							<div class="slider-element-3">
								<input type="range" class="form-range" v-model="weight_fee" @input="changeFee" ref="ref_fee">
							</div>
						</div>

						<div class="slider-group">
							<div class="slider-element-1 fs16">
								Delegators
								<Popper hover arrow placement="right" class="fs11" content="Total count of delegators to a particular validator">
									<i class="fa fa-info-circle pointer ml5 fs16"></i>
								</Popper>
							</div>
							<div class="slider-element-2">
								{{ weight_delegators }}
							</div>
							<div class="slider-element-3">
								<input type="range" class="form-range" v-model="weight_delegators" @input="changeDelegators" ref="ref_delegators">
							</div>
						</div>

						<div class="slider-group">
							<div class="slider-element-1 fs16">
								Stake Amount
								<Popper hover arrow placement="right" class="fs11" content="Total CSPR staked to a particular validator. Self stake + third party stake">
									<i class="fa fa-info-circle pointer ml5 fs16"></i>
								</Popper>
							</div>
							<div class="slider-element-2">
								{{ weight_stake }}
							</div>
							<div class="slider-element-3">
								<input type="range" class="form-range" v-model="weight_stake" @input="changeStake" ref="ref_stake">
							</div>
						</div>

						<button class="btn btn-success mt40" @click="refreshSliders">
							<i class="fa fa-refresh"></i>
							Refresh
						</button>
					</div>
					<div class="slider-weight mt20 mb20">
						<p class="bold fs14">
							Remaining Weight
						</p>

						<p class="mt20 bold fs24 ml5">
							{{ weight_total }} / 100
						</p>

						<p class="mt20 fs12 op6">
							Drag the sliders to customize the facets that are most important to you in selecting a validator. As you assign points, the validators in the Casper network will be ranked according to the weights you give to each.
						</p>

						<p v-if="weight_total == 100" class="mt10 fs12 text-red">
							All weight has been allocated!
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<p class="mt20 bold fs16">
					Member nodes ranked by your criteria
				</p>
				<p class="m0 op6 fs13">
					Click on a user to see more details
				</p>

				<div class="table-header">
					<span>
						<input v-model="quickFilterText" type="text" class="form-control form-control-sm width-200" placeholder="Search">
					</span>
				</div>

				<div class="table-card mb15">
					<ag-grid-vue
						style="width: 100%; height: 100%;"
						class="ag-theme-alpine ag-theme-balham"
						:columnDefs="column_defs"
						@grid-ready="onGridReady"
						:suppressExcelExport="true"
						:rowData="validators"
						:quickFilterText="quickFilterText"
						:defaultColDef="defaultColDef"
						pagination="true"
						@rowClicked="rowClicked"
					>
					</ag-grid-vue>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.form-range {
  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--value) - var(--min)) / var(--range));
  --sx: calc(0.5 * 2em + var(--ratio) * (100% - 2em));
}

/* moz */
.form-range::-moz-range-thumb,
.form-range::-moz-range-thumb:hover,
.form-range::-moz-range-thumb:active {
	cursor: pointer;
	height: 18px;
	width: 18px;
	border: 1px solid #771d1d;
	background: #ff473d;
}

.form-range::-moz-range-track {
	background: linear-gradient(#ff473d,#ff473d) 0/var(--sx) 100% no-repeat, #efefef;
}

/* ms */
.form-range::-ms-thumb,
.form-range::-ms-thumb:hover,
.form-range::-ms-thumb:active {
	cursor: pointer;
	height: 18px;
	width: 18px;
	border: 1px solid #771d1d;
	background: #ff473d;
}

/* webkit */
.form-range::-webkit-slider-thumb,
.form-range::-webkit-slider-thumb:hover,
.form-range::-webkit-slider-thumb:active {
	cursor: pointer;
	height: 18px;
	width: 18px;
	border: 1px solid #771d1d;
	background: #ff473d;
}


.slider-wrap {
	position: relative;
	display: flex;
	flex-direction: row;
}

.slider-box {
	width: calc(100% - 300px);
	padding: 20px;
}

.slider-group {
	margin-top: 15px;
	width: 100%;
	display: flex;
	flex-direction: row;
}

.slider-element-1 {
	width: 200px;
	height: 30px;
	display: flex;
	align-items: center;
}

.slider-element-2 {
	width: 50px;
	height: 30px;
	display: flex;
	align-items: center;
}

.slider-element-3 {
	width: calc(100% - 200px - 50px);
	height: 30px;
	display: flex;
	align-items: center;
}

.slider-weight {
	border-left: 2px solid #9f9f9f;
	width: 300px;
	padding: 20px;
}

@media all and (max-width: 767px) {
	.slider-wrap {
		flex-direction: column;
	}

	.slider-box {
		width: 100%;
		padding-left: 0;
		padding-right: 0;
	}

	.slider-weight {
		width: 100%;
	}

	.slider-element-1 {
		width: 120px;
	}

	.slider-element-2 {
		width: 30px;
	}

	.slider-element-3 {
		width: calc(100% - 150px);
	}

	.fs16 {
		font-size: 14px;
	}
}

.box-shadow {
	box-shadow: 0px 2px 6px rgba(0,0,0,0.29);
}

.nmt50 {
	transform: translateY(-50px);
	-o-transform: translateY(-50px);
	-ms-transform: translateY(-50px);
	-moz-transform: translateY(-50px);
	-webkit-transform: translateY(-50px);
}

.landing-container {
	background-image: url('@/assets/images/bg2.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: auto;
	min-height: 100vh;
	background-attachment: fixed;
}

.flex-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.laptop {
	width: 100%;
}

.red-bar {
	background-color: #8b0e0e;
}

.max-300 {
	max-width: 500px;
}

.max-1200 {
	max-width: 1200px;
}

.divider {
	width: 100px;
	margin: 0 auto;
	border: 2px solid #ff2d2e;
}

.tick-mark {
	position: relative;
	display: flex;
	flex-direction: row;
}

.tick {
	width: 18px;
	border-top: 3px solid #ff2d2e;
	margin-top: 12px;
	margin-right: 15px;
}

.landing-input {
	background-color: #771d1d;
	border: 2px solid #ff473d;
	color: white;
}

.landing-input::placeholder {
	color: white;
	font-size: 18px;
}

.height-300 {
	height: 300px;
}

.question {
	position: relative;
	display: flex;
	flex-direction: row;
	background-color: #f9f9f9;
}

.question .left {
	border-left: 4px solid #ff473d;
	height: 60px;
	width: 110px;
	font-size: 40px;
	font-weight: bold;
	color: #ff473d;
	display: flex;
	align-items: center;
	padding-left: 15px;
}

.question .right {
	height: 60px;
	font-size: 18px;
	font-weight: bold;
	display: flex;
	align-items: center;
	width: calc(100% - 110px);
}

.answer {
	position: relative;
	display: flex;
	flex-direction: row;
	background-color: #fff;
}

.answer .left {
	border-left: 4px solid #9f9f9f;
	height: 60px;
	width: 110px;
	font-size: 40px;
	font-weight: bold;
	color: #9f9f9f;
	display: flex;
	align-items: center;
	padding-left: 15px;
}

.answer .right {
	height: auto;
	min-height: 60px;
	font-size: 18px;
	width: calc(100% - 110px);
	padding-top: 15px;
	color: #777;
}

pre {
	margin-top: 20px;
	background-color: #f5f5f5;
	color: #353535;
	padding: 20px;
	font-size: 14px;
}

hr {
	border-color: #9f9f9f;
	margin-top: 30px;
	margin-bottom: 20px;
}

</style>