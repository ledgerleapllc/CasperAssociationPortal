<script>

import { api } from '../api.js';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

export default {
	components: {
		ClipLoader
	},

	methods: {
		async requestReactivation() {
			this.$parent.sus_loading = true;

			const response = await api(
				'POST',
				'user/request-reactivation',
				{
					letter: this.$refs['reactivation_letter'].value
				},
				this.$parent.bearer_token
			);

			this.$parent.catch401(response);

			if (response.status == 200) {
				this.$parent.getMe();
				this.$parent.sus_loading = false;
			} else {
				this.$parent.sus_loading = false;
				this.$parent.toast(
					'',
					response.message,
					'error'
				);
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
						Your membership is suspended
					</div>
					<div class="card-body">
						<p>
							Your membership has been suspended for 
							<b>{{ this.$parent.suspension_reason }}</b>.
						</p>

						<p class="mt20">
							You may be eligible to reactivate your membership if your uptime rises above <b>{{ this.$parent.settings.uptime_probation }}%</b> over the last <b>{{ this.$parent.settings.uptime_calc_size }}</b> eras and you have no more than <b>{{ this.$parent.settings.redmark_revoke }}</b> redmarks in the last <b>{{ this.$parent.settings.redmark_calc_size }}</b> eras.
						</p>

						<ClipLoader 
							v-if="this.$parent.sus_loading" 
							class="clip-loader-inline mt30" 
							size="25px" 
							color="#ff2d2e"
						></ClipLoader>

						<button 
							v-else 
							class="btn btn-success mt20"
							@click="this.$parent.checkSuspensionStatus"
						>
							Check if I can reactivate
						</button>

						<div v-if="this.$parent.sus_decision == 'No'">
							<p class="mt20">
								Your account cannot be reactivated at this time. 
								<span v-if="this.$parent.reinstatement_contact">
									If you need support, you can contact us at <a :href="'mailto:'+this.$parent.reinstatement_contact">this.$parent.reinstatement_contact</a>
								</span>
							</p>
						</div>

						<div 
							v-if="
								this.$parent.sus_stat &&
								this.$parent.sus_decision != 'No'
							"
						>
							<p class="mt20 fs18">
								{{ this.$parent.sus_stat }}
							</p>

							<table class="table mt10 max-width-400">
								<tr>
									<td class="bold">
										Uptime:
									</td>
									<td v-if="this.$parent.stats_uptime < this.$parent.settings.uptime_probation" class="text-red">
										{{ this.$parent.stats_uptime }}%
									</td>
									<td v-else class="text-green">
										{{ this.$parent.stats_uptime }}%
									</td>
									<td>
										<span class="op7 fs13"> (minimum: {{ this.$parent.settings.uptime_probation }}%)</span>
									</td>
								</tr>
								<tr class="width-200">
									<td class="bold">
										Redmarks:
									</td>
									<td v-if="this.$parent.stats_redmarks > this.$parent.settings.redmark_revoke" class="text-red">
										{{ this.$parent.stats_redmarks }}
									</td>
									<td v-else class="text-green">
										{{ this.$parent.stats_redmarks }}
									</td>
									<td>
										<span class="op7 fs13"> (maximum: {{ this.$parent.settings.redmark_revoke }})</span>
									</td>
								</tr>
							</table>
						</div>

						<div 
							v-if="
								this.$parent.sus_stat == 'You can request reactivation!' &&
								this.$parent.sus_decision != 'No'
							"
						>
							<div v-if="this.$parent.sus_letter">
								<p class="mt20 fs18">
									Thanks!
								</p>

								<p class="mt20">
									Reactivation application awaiting admin review. Please check back in 72 hours to allow the adminstrators time to review your account.
								</p>

								<p class="mt20">
									Your letter:
								</p>

								<p class="op7 fs14">
									{{ this.$parent.sus_letter }}
								</p>
							</div>

							<div v-else>
								<p class="mt20">
									Please share the reason you believe that reactivation should be granted in the box below.
								</p>

								<textarea class="form-control height-200" placeholder="Limit 500 words" ref="reactivation_letter"></textarea>

								<ClipLoader 
									v-if="this.$parent.sus_loading" 
									class="clip-loader-inline mt30" 
									size="25px" 
									color="#ff2d2e"
								></ClipLoader>

								<button v-else class="btn btn-success mt10" @click="requestReactivation">
									Request Reactivation
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>



</style>