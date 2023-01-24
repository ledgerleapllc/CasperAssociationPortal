<script>

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
	},

	methods: {
		gotoLink(link) {
			window.open(`${this.$root.frontend_url}/${link}`);
		}
	}
};

</script>

<template>
	<div class="footer">
		<p class="text-white fs14 text-center">
			&copy; <span ref="year"></span> Casper Association
		</p>
		<div class="signup-footer">
			<span @click="this.$root.routeTo('/privacy-policy')">Privacy Policy</span>
			|
			<span @click="this.$root.routeTo('/terms-of-service')">Terms & Conditions</span>
			|
			<span @click="this.$root.routeTo('/?section=contact')">Contact</span>
		</div>
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