<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import CircleProgress from "vue3-circle-progress";

export default {
	components: {
		Popper,
		ClipLoader,
		CircleProgress
	},

	data() {
		return {
			node_status:        null,
			node_status_detail: '',
			kyc_status:         null,
			kyc_status_detail:  '',
			uptime:             null,
			updates:            null,
			updates_detail:     '',
			total_eras:         null,
			eras_since_redmark: null,
			total_redmarks:     null,
		}
	},

	created() {
		this.getMembership();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async getMembership() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-membership',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.node_status        = response.detail.node_status;
				this.kyc_status         = response.detail.kyc_status;
				this.uptime             = response.detail.uptime;
				this.updates            = response.detail.updates;
				this.total_eras         = response.detail.total_eras;
				this.eras_since_redmark = response.detail.eras_since_redmark;
				this.total_redmarks     = response.detail.total_redmarks;

				if (this.node_status == 'Online') {
					this.node_status_detail = 'Nice work!';
				} else if (this.node_status == 'Offline') {
					this.node_status_detail = 'Your validator is offline';
				} else {
					this.node_status_detail = 'There may be a problem with one or more of your nodes';
				}

				if (this.kyc_status == 'Approved') {
					this.kyc_status_detail = 'Great work being verified. Now just keep that node running strong to maintain access.';
				} else {
					this.kyc_status_detail = 'Your KYC has not yet been completed or has an issue.';
				}

				if (this.updates == 100) {
					this.updates_detail = 'On time.';
				} else {
					this.updates_detail = 'You have room to improve protocol upgrade responsiveness.';
				}
			}
		},
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="card-title">
						Membership
					</div>
					<div class="card-body">
						<p class="pb20">
							All members of the Casper portal need to maintain minimum node metrics to have access to all parts of the portal including Node Uptime, and Update Responsiveness. If your node falls short of the minimum criteria, you will be notified through email and given a grace period to fix your statistics. If you do not fix it in time, some areas of your portal access will be blocked until your average is restored.
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-6 col-sm mt20">
				<div class="card">
					<div class="card-title">
						Node Status
					</div>
					<div class="card-body">
						<div v-if="node_status === null">
							<ClipLoader size="25px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else>
							<p class="fs16 bold text-red">
								{{ node_status }}
							</p>
							<p class="fs15 op7">
								{{ node_status_detail }}
							</p>
						</div>
					</div>
				</div>

				<div class="card mt20" style="min-height: 233px;">
					<div class="card-title">
						Identify Verification Status
					</div>
					<div class="card-body">
						<div v-if="kyc_status === null">
							<ClipLoader size="25px" color="#ff2d2e"></ClipLoader>
						</div>
						<div v-else>
							<p v-if="kyc_status != 'Denied'" class="fs16 bold text-red">
								{{ kyc_status }}
							</p>
							<p v-else class="fs16 bold text-red">
								Under review
							</p>

							<p class="fs15 op7">
								{{ kyc_status_detail }}
							</p>

							<button
								v-if="
									!kyc_status ||
									kyc_status == 'Not Verified' || 
									kyc_status == 'Pending'
								" 
								class="btn btn-sm btn-warning fs13 bold mt10"
								@click="this.$root.routeTo('/u/get-verified')"
							>
								Get Verified
								<i class="fa fa-check-square-o ml5"></i>
							</button>

							<button
								v-else-if="kyc_status == 'Denied'" 
								class="btn btn-sm btn-warning fs13 bold mt10"
								@click="this.$root.routeTo('/u/get-verified')"
							>
								Check Verification
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-6 mt20">
				<div class="card min-height-400">
					<div class="card-title">
						Uptime
						<Popper hover arrow placement="right" class="fs11" content="Uptime is calculated from the percentage of eras you have joined multiplied by the rewards offered per era minus any eras you missed while your bid was high enough to participate in the validator pool.">
							<i class="fa fa-info-circle pointer ml5 fs16"></i>
						</Popper>
						<p class="fs13 op7 float-right">
							Average:&ensp;
							<span v-if="uptime === null">
								<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
							</span>
							<span class="fs13" v-else>
								{{ uptime }}%
							</span>
						</p>
					</div>
					<div class="card-body">
						<div class="uptime-subblock">
							<div class="uptime-subblock-left">
								<p class="fs14 bold">
									Total Eras:&ensp;
									<span v-if="total_eras === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</span>
									<span class="fs13" v-else>
										{{ total_eras }}
									</span>
								</p>
								<p class="fs14 bold mt10">
									Eras since redmark:&ensp;
									<span v-if="eras_since_redmark === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</span>
									<span class="fs13" v-else>
										{{ eras_since_redmark }}
									</span>
								</p>
								<p class="fs14 bold mt10">
									Total redmarks:&ensp;
									<span v-if="total_redmarks === null">
										<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
									</span>
									<span class="fs13" v-else>
										{{ total_redmarks }}
									</span>
								</p>
							</div>
							<div class="uptime-subblock-right">
								<circle-progress 
									:percent="uptime" 
									fill-color="#ff2d2e"
									:transition="400"
									:size="200" 
								/>
								<div class="circle-center">
									<span>
										{{ uptime }}%
									</span>
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

.uptime-subblock {
	display: flex;
	flex-direction: row;
	position: relative;
}

.uptime-subblock-left {
	width: 50%;
}

.uptime-subblock-right {
	position: relative;
	width: 50%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.circle-center {
	position: absolute;
	right: 0;
	top: 0;
	width: 200px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
}

@media all and (max-width: 991px) {
	.uptime-subblock {
		flex-direction: column;
	}

	.uptime-subblock-left {
		width: 100%;
	}

	.uptime-subblock-right {
		margin-top: 20px;
		width: 100%;
	}
}

@media all and (max-width: 767px) {

}

</style>