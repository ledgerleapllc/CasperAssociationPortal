<script>

import { api } from '../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';

export default {
	data() {
		return {
			loading: false
		}
	},

	components: {
	},

	created() {
	},

	mounted() {
		let that = this;
	},

	methods: {
		gotoOnboard() {
			window.location.href = '/u/onboard';
		}
	}
};

</script>

<template>
	<div class="signup-container">
		<div class="checker-top"></div>
		<div class="checker-bottom"></div>

		<div class="signup-box-wrap">
			<div class="container">
				<div class="row">
					<div class="col-sm-12 pt30 plr50 pb30">
						<p class="fs20 bold text-center">
							Welcome to the Casper Association Portal
						</p>

						<p class="mt30">
							Dear Casper Blockchain Validator,
						</p>

						<p class="mt20">
							The Board of the Casper Association welcomes you to the membership portal. On this site, you can follow the process and become a member of the Casper Association. Once you completed the identification and application process, you will be able to vote in the Association business and its governance. We are looking forward to welcoming you as a member of the Casper Association. Any validator can become a member. Validators wishing to become members of the Association must:
						</p>

						<table class="table mt20">
							<tr>
								<td>
									<img src="@/assets/images/signature.svg" class="tiny-img">
								</td>
								<td>
									Electronically sign the membership agreement.
								</td>
							</tr>
							<tr>
								<td>
									<img src="@/assets/images/ownership.svg" class="tiny-img">
								</td>
								<td>
									Register your node and prove ownership.
								</td>
							</tr>
							<tr>
								<td>
									<img src="@/assets/images/letter.png" class="tiny-img">
								</td>
								<td>
									Upload a letter of motivation.
								</td>
							</tr>
							<tr>
								<td>
									<img src="@/assets/images/user-check.svg" class="tiny-img">
								</td>
								<td>
									Submit KYC details for your node.
								</td>
							</tr>
						</table>

						<p class="pt20">
							Once a validator becomes a member, they can participate in Association business (e.g. voting, or submitting proposals). Member’s validator nodes must maintain certain technical requirements in order to participate in association business.
						</p>

						<div class="login-form-wrap text-center">
							<div class="form-group login-form text-center">
								<form @submit.prevent>
									<button @click="gotoOnboard" class="btn btn-lime mt10 width-200 ml5 mr5 bold">Begin</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

td {
	border-bottom-width: 0;
}

</style>