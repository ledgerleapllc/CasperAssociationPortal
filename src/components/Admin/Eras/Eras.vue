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
			users:              [],
			public_keys:        [],
			eras:               [],
			selected_guid:      null,
			selected_validator: null,
			uptime:             null,
			total_eras:         null,
			eras_since_redmark: null,
			total_redmarks:     null,
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
				// console.log(response.detail);
				this.users         = response.detail;
				let first_user     = this.users[0];

				if (first_user) {
					this.selected_guid = first_user.guid;
				}
			}
		},

		async getUserEras() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-user-eras',
				{
					guid: this.selected_guid
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.public_keys        = response.detail.public_keys;
				this.eras               = response.detail.eras;
				this.selected_validator = this.public_keys[0];
			}
		},

		async getNodeData() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');
			let s = this.selected_validator;

			const response = await api(
				'GET',
				'user/get-node-data',
				{
					public_key: s
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.uptime             = response.detail.uptime;
				this.total_eras         = response.detail.total_eras;
				this.eras_since_redmark = response.detail.eras_since_redmark;
				this.total_redmarks     = response.detail.total_redmarks;
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
		selected_guid: function(e) {
			this.selected_validator = null;
			this.public_keys        = [];
			this.eras               = [];
			this.getUserEras();
		},

		selected_validator: function(e) {
			this.uptime             = null;
			this.total_eras         = null;
			this.eras_since_redmark = null;
			this.total_redmarks     = null;
			this.getNodeData();
		}
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-6 mt20">
				<div class="card min-card-height">
					<div class="card-title">
						User
						<Popper hover arrow placement="right" class="fs11" content="Displays users for filtering eras by associated nodes">
							<i class="fa fa-info-circle pointer ml5 fs16"></i>
						</Popper>
					</div>
					<div class="card-body">
						<div v-if="this.selected_guid === null">
							<ClipLoader size="25px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else>
							<select class="form-select" ref="selected_guid" v-model="selected_guid">
								<option v-for="(value, index) in users" :value="value.guid" :selected="index == 0">{{ value.email }}</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6 mt20">
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
								<option v-for="(value, index) in public_keys" :value="value" :selected="index == 0">{{ value }}</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-3 col-md-6 mt20">
				<div class="card" style="height: 100%;">
					<div class="card-title">
						Uptime
					</div>
					<div class="card-body">
						<div v-if="this.uptime === null">
							<ClipLoader size="15px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else class="text-center">
							{{ this.uptime }}%
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-md-6 mt20">
				<div class="card" style="height: 100%;">
					<div class="card-title">
						Total Eras
					</div>
					<div class="card-body">
						<div v-if="this.total_eras === null">
							<ClipLoader size="15px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else class="text-center">
							{{ this.total_eras }}
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-3 col-md-6 mt20">
				<div class="card" style="height: 100%;">
					<div class="card-title">
						Eras Since Redmark
					</div>
					<div class="card-body">
						<div v-if="this.eras_since_redmark === null">
							<ClipLoader size="15px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else class="text-center">
							{{ this.eras_since_redmark }}
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-md-6 mt20">
				<div class="card" style="height: 100%;">
					<div class="card-title">
						Total Redmarks
					</div>
					<div class="card-body">
						<div v-if="this.total_redmarks === null">
							<ClipLoader size="15px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else class="text-center">
							{{ this.total_redmarks }}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-12 mt20">
				<div class="card min-card-height scroll-h">
					<div class="card-title" style="min-width: 100%;" :style="{ 'width': ((public_keys.length + 1) * 170) + 'px' }">
						<div class="eras-row">
							<div class="eras-cell-left bold fs13">
								Era Start Time
							</div>
							<div v-for="public_key in public_keys" class="eras-cell-right bold fs13">
								{{ this.$root.formatHash(public_key, 12) }}
							</div>
						</div>
					</div>
					<div class="card-body scroll-400" style="min-width: 100%;" :style="{ 'width': ((public_keys.length + 1) * 170) + 'px' }">
						<div 
							v-for="(era, index) in eras" 
							class="eras-row mt20 pb30 border-bottom"
						>
							<div class="eras-cell-left fs11">
								<p class="fs12"><b>{{ index }}</b></p>
								<p>
									{{ era.era_start_time1 }}
									&nbsp;
									{{ era.era_start_time2 }}
									&nbsp;
									<small>UTC</small>
								</p>
							</div>
							<div v-for="(address, key) in era.addresses" class="eras-cell-right">
								<p class="fs11">
									{{ address.in_pool ? 'In Pool' : 'Absent From Pool' }}
								</p>
								<p class="fs11">
									{{ address.rewards }}% Rewards
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.eras-row {
	padding-left: 12px;
	padding-right: 10px;
	width: 100%;
	height: 40px;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 10px;
}

.eras-cell-left {
	width: 180px;
}

.eras-cell-right {
	width: 170px;
}

.progress-bar-wrap {
	margin-top: 8px;
	margin-bottom: 4px;
	height: 20px;
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
	font-size: 12px;
	color: #000;
	text-align: center;
	width: 100px;
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