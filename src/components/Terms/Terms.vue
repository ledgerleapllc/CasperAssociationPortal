<script>

import { api, external_api } from '../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import OuterNav from '../OuterNav.vue';
import OuterFooter from '../OuterFooter.vue';
import VuePdfEmbed from 'vue-pdf-embed';

export default {
	data() {
		return {
			pdf_source: null,
			pdf_name:   '',
			pdf_ext:    '',
			pdf_text:   ''
		}
	},

	components: {
		OuterNav,
		OuterFooter,
		VuePdfEmbed
	},

	created() {
	},

	mounted() {
		this.getPdfSource();
	},

	methods: {
		async getPdfSource() {
			const response = await api(
				'GET', 
				'public/get-esign-doc', 
				{}
			);

			// console.log(response);

			if (response.status == 200) {
				let that        = this;
				this.pdf_name   = response.detail.name;
				this.pdf_ext    = response.detail.ext;
				this.pdf_source = `${this.$root.api_url}/documents/terms-of-service.${this.pdf_ext}?v=${Math.random().toString().split('.')[1]}`;
				// this.pdf_source = response.detail.url;

				if (this.pdf_ext == 'txt') {
					fetch(this.pdf_source).then(function(resp) {
						resp.text().then(function(text) {
							that.pdf_text = text;
						});
					});
				}
			}
		}
	}
};

</script>

<template>
	<div class="landing-container">
		<OuterNav></OuterNav>

		<div class="container max-1200 white pt50">
			<div class="row">
				<div class="col-md-12 mt100">
					<h1 class="fs40 text-center" :class="this.$root.isMobile ? '' : 'mt100'">
						Terms of Service
					</h1>
				</div>
			</div>
		</div>

		<div class="container-fuid bg-white mt100 pl25 pr25 min-height-100vh">
			<div class="container max-1200 bg-white box-shadow nmt50">
				<div class="row">
					<div class="col-md-12 p20">
						<p class="bold fs16">
							{{ pdf_name }}
						</p>
						<hr>
					</div>

					<div v-if="pdf_ext == 'pdf'" class="col-md-12 p0">
						<vue-pdf-embed
							:source="pdf_source"
						></vue-pdf-embed>
					</div>

					<div 
						v-else-if="
							pdf_ext == 'png' ||
							pdf_ext == 'jpg' ||
							pdf_ext == 'jpeg' ||
							pdf_ext == 'gif'
						" 
						class="col-md-12 p0"
					>
						<img :src="pdf_source" style="width: 100%; height: auto;">
					</div>

					<div v-else class="col-md-12 p20">
						{{ pdf_text }}
					</div>
				</div>
			</div>
		</div>

		<OuterFooter></OuterFooter>
	</div>
</template>

<style scoped>

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

.max-1200 {
	max-width: 1200px;
}

.min-height-100vh {
	min-height: 100vh;
}

</style>