<script>

import App from '../../../../App.vue';
import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';

import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal
	},

	data() {
		return {
			isClickOut: false
		}
	},

	created() {
	},

	mounted() {
		let that = this;
	},

	methods: {
		//

		copyValidatorId(e) {
			let that = this;
			let vid = this.$refs.selected_validator.value;
			copyText(vid, undefined, function(e) {
				that.$root.toast("Public key copied to clipboard", "", "info");
			});
		}
	},
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="card-title">
						Verify Your Node
					</div>
					<div class="card-body">
						//
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>



</style>