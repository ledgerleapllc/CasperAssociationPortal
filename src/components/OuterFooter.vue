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
		<div class="container footer-flex">
			<div>
				&copy; <span ref="year"></span> 
				Casper Association
			</div>

			<div>
				<span class="ml30 pointer" @click="this.$root.routeTo('/privacy-policy')">
					Privacy Policy
				</span>

				<span class="ml30 pointer" @click="this.$root.routeTo('/terms-of-use')">
					Terms of Use
				</span>

				<span class="ml30 pointer" @click="this.$root.routeTo('/?section=contact')">
					Contact
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped>

.footer {
	width: 100%;
	color: #fff;
	height: 115px;
	background: #000;
	display: flex;
	align-items: center;
}

.footer-flex {
	display: flex;
	justify-content: space-between;
}

</style>