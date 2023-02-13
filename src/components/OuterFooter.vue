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
				if (this.$refs['year1']) {
					this.$refs['year1'].innerHTML = response.message;
				}

				if (this.$refs['year2']) {
					this.$refs['year2'].innerHTML = response.message;
				}
			}
		}
	}
};

</script>

<template>
	<div class="footer">
		<div class="container footer-flex" id="f-regular">
			<div>
				&copy; <span ref="year1"></span> 
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

		<div class="ml30" id="f-mobile">
			&copy; <span ref="year2"></span> 
			Casper Association
			<br>
			<span class="pointer" @click="this.$root.routeTo('/privacy-policy')">
				Privacy Policy
			</span>

			<span class="ml20 pointer" @click="this.$root.routeTo('/terms-of-use')">
				Terms of Use
			</span>

			<span class="ml20 pointer" @click="this.$root.routeTo('/?section=contact')">
				Contact
			</span>
		</div>
	</div>
</template>

<style scoped>

#f-mobile {
	display: none;
}

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

@media all and (max-width: 767px) {
	#f-regular {
		display: none;
	}

	#f-mobile {
		display: block;
	}
}

</style>