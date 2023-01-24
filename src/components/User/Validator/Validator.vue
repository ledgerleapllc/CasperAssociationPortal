<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';
import Add from './Add/Add.vue';
import Verify from './Verify/Verify.vue';

import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal,
		Add,
		Verify
	},

	data() {
		return {
			action: this.$route.params.action
		}
	},

	created() {
		if (
			!this.action &&
			this.action != 'add' &&
			this.action != 'verify'
		) {
			this.$root.routeTo('/u/validator/add');
		}
	},

	mounted() {
		let that = this;
	},

	watch: {
		'$route' (to, from) {
			this.action = this.$route.params.action;
		},
	},

	methods: {
	},
};

</script>

<template>
	<Add v-if="this.action == 'add'"></Add>
	<Verify v-else-if="this.action == 'verify'"></Verify>
</template>

<style scoped>



</style>