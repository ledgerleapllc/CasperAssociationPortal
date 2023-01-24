<script>

export default {
	data: () => ({
		//
	})
};

</script>
<template>
	<div id="sidebar">
		<div class="container-fluid">
			<div class="row">
				<div class="col-12 pl25 pt10">
					<a :href="this.$root.frontend_url" class="nostyle">
						<h5 class="pt5 pointer-none m0 bold" style="letter-spacing: 2px;">
							<img alt="Casper Association Portal" class="sidebar-logo" src="@/assets/images/nav-logo.png">
						</h5>
					</a>
				</div>
			</div>

			<div class="row" style="position: relative;">
				<div class="retract-sidebar" @click="this.$root.retractSidebar()">&lt;</div>

				<div class="mt20"></div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/a/dashboard') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/dashboard')">
						<i class="fa fa-home fs18 width-22"></i>
						<span class="fs15 bold">Dashboard</span>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.nodes == true"
					v-bind:class="
						this.$root.route.startsWith('/a/nodes') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/nodes')">
						<i class="fa fa-connectdevelop fs18 width-22"></i>
						<span class="fs15 bold">Nodes</span>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.discussions == true"
					v-bind:class="
						this.$root.route.startsWith('/a/discussion') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/discussions')">
						<i class="fa fa-wechat fs18 width-22"></i>
						<span class="fs15 bold">Discussions</span>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.ballots == true"
					v-bind:class="
						this.$root.route.startsWith('/a/ballot') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/ballots/active')">
						<i class="fa fa-check-square fs18 width-22"></i>
						<span class="fs15 bold">Votes</span>
					</h6>
				</div>

				<hr style="margin-bottom: 0; margin-top: 10px;">

				<div
					v-if="this.$root.permissions.intake == true" 
					v-bind:class="
						this.$root.route.startsWith('/a/intake') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/intake')">
						<i class="fa fa-sign-in fs18 width-22"></i>
						<span class="fs15 bold">Intake</span>
					</h6>
				</div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/a/reinstatement') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/reinstatement')">
						<i class="fa fa-refresh fs18 width-22"></i>
						<span class="fs15 bold">Reinstatement</span>
					</h6>
				</div>

				<div
					v-if="this.$root.permissions.users == true" 
					v-bind:class="
						this.$root.route.startsWith('/a/user') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/users')">
						<i class="fa fa-users fs18 width-22"></i>
						<span class="fs15 bold">Users</span>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.perks == true" 
					v-bind:class="
						this.$root.route.startsWith('/a/perk') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/perks')">
						<i class="fa fa-plus fs18 width-22"></i>
						<span class="fs15 bold">Perks</span>
					</h6>
				</div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/a/upgrades') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/upgrades')">
						<i class="fa fa-cloud-upload fs18 width-22"></i>
						<span class="fs15 bold">Upgrades</span>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.eras == true"
					v-bind:class="
						this.$root.route.startsWith('/a/eras') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/eras')">
						<i class="fa fa-list fs18 width-22"></i>
						<span class="fs15 bold">All Eras</span>
					</h6>
				</div>

				<div
					v-if="this.$root.permissions.teams == true"
					v-bind:class="
						this.$root.route.startsWith('/a/teams') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/teams')">
						<i class="fa fa-user-plus fs18 width-22"></i>
						<span class="fs15 bold">Teams</span>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.global_settings == true"
					v-bind:class="
						this.$root.route.startsWith('/a/settings') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/a/settings/global')">
						<i class="fa fa-cog fs18 width-22"></i>
						<span class="fs15 bold">Global Settings</span>
					</h6>
				</div>

				<hr style="margin-bottom: 0; margin-top: 10px;">

				<div class="col-12 sidebar-row">
					<h6 class="p7 pl20 m0" @click="this.$root.gotoBackOffice">
						<img src="@/assets/images/shufti-backoffice.png" class="backoffice-logo mr10">
						<span class="fs15 bold">Backoffice</span>
					</h6>
				</div>
			</div>
		</div>
	</div>
</template>