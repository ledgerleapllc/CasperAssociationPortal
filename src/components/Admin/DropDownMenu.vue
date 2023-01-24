<script>

</script>

<template>
	<div class="menu-wrap">
		<div class="menu-item" @click="$root.routeTo(`/a/profile/${this.$root.guid}`)">
			<i class="fa fa-user"></i>&ensp;
			My Profile
		</div>

		<div class="menu-item" @click="$root.routeTo('/a/notifications');">
			<i class="fa fa-exclamation-circle"></i>&ensp;
			Notifications
			<i v-if="this.$root.alert_notification" class="fa fa-bell fs12 text-red"></i>
		</div>

		<div class="menu-item" @click="$root.routeTo('/a/account/detail')">
			<i class="fa fa-cog"></i>&ensp;
			Account Settings
		</div>

		<hr class="short-margins">

		<div class="menu-item" @click="$root.logout()">
			<i class="fa fa-sign-out"></i>&ensp;
			Log Out
		</div>
	</div>
</template>

<style scoped>

.menu-wrap {
	position: absolute;
	background-color: #f5f7f8;
	width: 270px;
	min-height: 100px;
	border: 1px solid #e0e0e0;
	border-radius: 10px;
	top: 40px;
	right: 0px;
	padding-top: 12px;
	padding-bottom: 12px;
	box-shadow: 0px 2px 6px rgba(0,0,0,0.29);
}

.menu-item {
	position: relative;
	display: block;
	cursor: pointer;
	width: 100%;
	font-weight: bold;
	font-size: 14px;
	padding: 12px;
}

.menu-item:hover {
	background-color: #f0f2f3;
}

.short-margins {
	margin-top: 10px;
	margin-bottom: 10px;
}

</style>