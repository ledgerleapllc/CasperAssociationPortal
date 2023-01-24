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
	<div class="mobile-avatar-wrap">
		<img 
			class="mobile-avatar" 
			:src="this.$props.url"
		>

		<img 
			v-if="this.$props.role == 'admin'"
			class="mobile-avatar-badge" 
			src="@/assets/images/admin-badge.png"
		>
		<img 
			v-else-if="this.$props.role == 'sub-admin'"
			class="mobile-avatar-badge" 
			src="@/assets/images/moderator-badge.png"
		>
		<img 
			v-else-if="
				this.$props.kyc == 'approved' &&
				(
					this.$props.role == 'user' || 
					this.$props.role == 'test-user'
				)
			"
			class="mobile-avatar-badge" 
			src="@/assets/images/verified-badge.png"
		>
	</div>
</template>

<style scoped>

.mobile-avatar-wrap {
	position: relative;
	display: inline-block;
	pointer-events: none;
}

.mobile-avatar {
	width: 22px;
	height: auto;
	margin-right: 4px;
	margin-bottom: 2px;
	border-radius: 10px;
	box-shadow: 0px 2px 6px rgba(0,0,0,0.29);
	border: 2px solid #e0e0e0;
}

.mobile-avatar-badge {
	position: absolute;
	top: -3px;
	left: -1px;
	width: 10px;
	height: auto;
}

</style>