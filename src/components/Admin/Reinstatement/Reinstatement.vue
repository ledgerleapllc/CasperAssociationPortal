<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';
import Active from './Active/Active.vue';
import History from './History/History.vue';

import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal,
		Active,
		History
	},

	data() {
		return {
			uri_category: this.$route.params.category
		}
	},

	created() {
	},

	mounted() {
		let that = this;

		if (
			this.uri_category != 'active' &&
			this.uri_category != 'history'
		) {
			this.uri_category = 'active';
			this.$root.routeTo(`/a/reinstatement/active`);
		}
	},

	watch: {
		'$route' (to, from) {
			this.uri_category = this.$route.params.category;
		}
	},

	methods: {
	},
};

</script>

<template>
	<div class="top-banner mt20">
		<div
			@click="
				this.$root.routeTo(`/a/reinstatement/active`);
				this.uri_category = 'active';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'active' ? 'spa-tab-active' : '')
			"
		>
			Active Requests
		</div>

		<div
			@click="
				this.$root.routeTo(`/a/reinstatement/history`);
				this.uri_category = 'history';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'history' ? 'spa-tab-active' : '')
			"
		>
			Requests History
		</div>
	</div>

	<Active v-if="this.uri_category == 'active'"></Active>
	<History v-else-if="this.uri_category == 'history'"></History>
</template>

<style scoped>

</style>