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
		ClipLoader,
	},

	data() {
		return {
			perk_id: this.$route.params.perk_id,
			perk:    {
				id:          null,
				title:       null,
				content:     null,
				cta:         null,
				image:       null,
				created_at:  null,
				start_time:  null,
				end_time:    null,
				status:      null,
				visible:     null,
				setting:     null
			},
		}
	},

	created() {
		this.getPerk();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async getPerk() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-perk',
				{
					perk_id: this.perk_id
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.perk = response.detail;
			}
		},

		ctaClick(url) {
			window.open(url, '_blank');
		}
	},

	watch: {
		'$route' (to, from) {
			this.perk_id = this.$route.params.perk_id;
		},
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="go-back mb20" @click="this.$router.back()">
					<i class="fa fa-arrow-left"></i>
					Perks
				</div>
				<div class="card">
					<div class="card-title">
						<div v-if="perk.title === null">
							<ClipLoader class="clip-loader-inline" size="25px" color="#ff2d2e"></ClipLoader>
						</div>
						<div class="bold" v-else>
							Perk # {{ perk_id }}
						</div>
					</div>
					<div class="card-body">
						<p class="pb20 bold">
							{{ perk.title }}
						</p>
						<p v-if="perk.content === null" class="pb30">
							<ClipLoader class="clip-loader-inline" size="15px" color="#ff2d2e"></ClipLoader>
						</p>
						<p v-else class="pb20">
							<img :src="perk.image" class="perk-image-lg" align="left">
							{{ perk.content }}

							<div v-if="perk.cta" class="mt20">
								<button class="btn btn-success" @click="ctaClick(perk.cta)">
									Get Started
								</button>
							</div>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.perk-image-lg {
	width: 38.2%;
	height: auto;
	margin-right: 20px;
	margin-bottom: 15px;
	border-radius: 10px;
	box-shadow: 0px 2px 6px rgba(0,0,0,0.29);
}

</style>