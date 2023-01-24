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
	<div class="profile-icon">
		<img 
			v-if="this.$props.url" 
			:src="this.$props.url" 
			class="profile-icon-img"
		>
		<img 
			v-else 
			src="@/assets/images/avatar.svg" 
			class="profile-icon-img"
		>

		<img 
			v-if="this.$props.role == 'admin'"
			src="@/assets/images/admin-badge.png" 
			class="profile-icon-badge"
		>
		<img 
			v-else-if="this.$props.role == 'sub-admin'"
			src="@/assets/images/moderator-badge.png" 
			class="profile-icon-badge"
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
			class="profile-icon-badge"
		>
	</div>
</template>

<style scoped>

.profile-icon {
	width: 160px;
	padding-top: 15px;
	padding-bottom: 15px;
	padding-right: 10px;
	position: relative;
}

.profile-icon-img {
	width: 90px;
	height: 90px;
	border-radius: 10px;
}

.profile-icon-badge {
	position: absolute;
	left: -3px;
	top: 10px;
	width: 20px;
	height: auto;
}

</style>