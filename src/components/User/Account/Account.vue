<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import UserDetail from './UserDetail/UserDetail.vue';
import UserIpLog from './UserIpLog/UserIpLog.vue';
import Validators from './Validators/Validators.vue';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import DefaultAvatarUrl from '@/assets/images/avatar.svg';

export default {
	data() {
		return {
			uri_category: this.$route.params.category,

			avatar_url: DefaultAvatarUrl,
			clipLoading: false
		}
	},

	components: {
		UserDetail,
		UserIpLog,
		Validators,
		ClipLoader,
		DefaultAvatarUrl
	},

	created() {
		//
	},

	mounted() {
		let that = this;

		if (
			this.uri_category != 'detail' &&
			this.uri_category != 'iplog' &&
			this.uri_category != 'validators'
		) {
			this.uri_category = 'detail';
			this.$root.routeTo(`/u/account/detail`);
		}
	},

	watch: {
		'$route' (to, from) {
			this.uri_category = this.$route.params.category;
		}
	},

	methods: {}
};

</script>

<template>
	<div v-if="clipLoading" class="ajax-box">
		<ClipLoader size="45px" color="#ff2d2e"></ClipLoader>
	</div>
	<div class="top-banner">
		<div
			@click="
				this.$root.routeTo(`/u/account/detail`);
				this.uri_category = 'detail';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'detail' ? 'spa-tab-active' : '')
			"
		>
			User Details
		</div>

		<div
			@click="
				this.$root.routeTo(`/u/account/iplog`);
				this.uri_category = 'iplog';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'iplog' ? 'spa-tab-active' : '')
			"
		>
			IP Log
		</div>

		<div
			@click="
				this.$root.routeTo(`/u/account/validators`);
				this.uri_category = 'validators';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'validators' ? 'spa-tab-active' : '')
			"
		>
			Validators
		</div>
	</div>

	<UserDetail v-if="this.uri_category == 'detail'"></UserDetail>
	<UserIpLog v-else-if="this.uri_category == 'iplog'"></UserIpLog>
	<Validators v-else-if="this.uri_category == 'validators'"></Validators>

	<div id="updateEmailModal">
		<div class="izi-padding">
			<p class="op7">
				<i class="fa fa-envelope"></i>
				<span> Update Email</span>
				<span class="float-right x-close">&times;</span>
			</p>
			<hr>
			<div class="form-group pt10">
				<p>You will need to verify your new email address before updating it.</p>
				<label>New Email</label>
				<input id="input-updateEmailModal" type="text" class="form-control form-control-sm">
				<button id="button-updateEmailModal" class="btn btn-success btn-sm mt10 text-light">Send Email Confirmation</button>
			</div>
		</div>
	</div>

	<div id="updateEmailMfaModal">
		<div class="izi-padding">
			<p class="op6">
				<i class="fa fa-user"></i>
				<span> Multi-factor Authentication Requested</span>
			</p>
			<hr>
			<p>Please verify your identity to change your email address.</p>
			<div class="form-group pt10">
				<label for="usr">Code</label>
				<input id="input-updateEmailMfaModal" type="text" class="form-control form-control-sm transform-uppercase">
				<button id="button-updateEmailMfaModal" class="btn btn-success btn-sm mt10 text-light">Submit</button>
			</div>
		</div>
	</div>

	<div id="updateEmailConfirmModal">
		<div class="izi-padding">
			<p class="op6">
				<i class="fa fa-user"></i>
				<span> Confirm Email Change</span>
			</p>
			<hr>
			<p>We sent a confirmation code to your new email address. To finish your email change, please enter it below.</p>
			<div class="form-group pt10">
				<label for="usr">Code</label>
				<input id="input-updateEmailConfirmModal" type="text" class="form-control form-control-sm transform-uppercase">
				<button id="button-updateEmailConfirmModal" class="btn btn-success btn-sm mt10 text-light">Submit</button>
			</div>
		</div>
	</div>

	<div id="updatePasswordMfaModal">
		<div class="izi-padding">
			<p class="op6">
				<i class="fa fa-user"></i>
				<span> Multi-factor Authentication Requested</span>
			</p>
			<hr>
			<p>Please verify your identity to change your password.</p>
			<div class="form-group pt10">
				<label for="usr">Code</label>
				<input id="input-updatePasswordMfaModal" type="text" class="form-control form-control-sm transform-uppercase">
				<button id="button-updatePasswordMfaModal" class="btn btn-success btn-sm mt10 text-light">Submit</button>
			</div>
		</div>
	</div>

</template>

<style scoped>

#updatePasswordMfaModal,
#updateEmailConfirmModal,
#updateEmailModal,
#updateEmailMfaModal {
	display: none;
}

</style>