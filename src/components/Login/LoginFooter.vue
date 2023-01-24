<script>

import './login.css';

export default {
	data() {
		return {}
	},

	methods: {
		gotoLink(link) {
			window.location.href = `${this.$root.frontend_url}/${link}`;
		}
	}
};

</script>

<template>
	<div class="login-footer">
		<span @click="this.gotoLink('privacy-policy')">Privacy Policy</span>
		|
		<span @click="this.gotoLink('terms-of-service')">Terms & Conditions</span>
		|
		<span @click="this.gotoLink('?section=contact')">Contact</span>
	</div>
</template>