<script>

export default {
	props: [
		"url",
		"role",
		"kyc"
	]
};

</script>

<template>
	<div class="icon-wrap">
		<img 
			v-if="this.$props.url" 
			:src="this.$props.url" 
			class="icon-img"
		>
		<img 
			v-else 
			src="@/assets/images/avatar.svg" 
			class="icon-img"
		>

		<img 
			v-if="this.$props.role == 'admin'"
			src="@/assets/images/admin-badge.png" 
			class="icon-badge"
		>
		<img 
			v-else-if="this.$props.role == 'sub-admin'"
			src="@/assets/images/moderator-badge.png" 
			class="icon-badge"
		>
		<img 
			v-else-if="
				this.$props.kyc == 'approved' &&
				(
					this.$props.role == 'user' || 
					this.$props.role == 'test-user'
				)
			"
			src="@/assets/images/verified-badge.png" 
			class="icon-badge"
		>
	</div>
</template>

<style scoped>

.icon-wrap {
	width: 100%;
	position: relative;
}

.icon-img {
	width: 90px;
	height: 90px;
	border-radius: 10px;
}

.icon-badge {
	position: absolute;
	left: -3px;
	top: -5px;
	width: 20px;
	height: auto;
}

</style>