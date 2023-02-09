<script>

import { api } from './api.js';

export default {
	data() {
		return {
		}
	},

	components: {
	},

	created() {
	},

	mounted() {
		let that = this;
		this.getYear();
	},

	methods: {
		gotoLink(link) {
			window.open(`${this.$root.frontend_url}/${link}`);
		},

		async getYear() {
			const response = await api(
				'GET',
				'public/get-year',
				{}
			);

			if (response.status == 200) {
				this.$refs['year'].innerHTML = response.message;
			}
		}
	}
};

</script>

<template>
	<div class="footer">
		<div class="signup-footer">
			<span @click="this.$root.routeTo('/privacy-policy')">Privacy Policy</span>
			|
			<span @click="this.$root.routeTo('/terms-of-service')">Terms & Conditions</span>
			|
			<span @click="this.$root.routeTo('/?section=contact')">Contact</span>
		</div>
		<p class="text-white fs14 text-center mt10">
			&copy; <span ref="year"></span> Casper Association
		</p>
	</div>
</template>

<style scoped>

.footer {
	width: 100%;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 90px;
	background: rgba(139,14,14,0.4);
}

</style>