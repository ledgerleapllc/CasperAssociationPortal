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
				<div class="col-12 pl8 pt10 white">
					<a :href="this.$root.frontend_url" class="nostyle">
						<h4 class="pt5 pointer-none m0">
							<img alt="Casper Association Portal" class="sidebar-logo-mini" src="@/assets/images/favicon.png">
						</h4>
					</a>
				</div>
			</div>

			<div class="row" style="position: relative;">
				<div v-if="!this.$root.isMobile" class="expand-sidebar" @click="this.$root.expandSidebar()">&gt;</div>

				<div class="mt20"></div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/a/dashboard') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/dashboard')">
						<i class="fa fa-home fs20"></i>
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
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/nodes')">
						<i class="fa fa-connectdevelop fs20"></i>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.discussions == true"
					v-bind:class="
						this.$root.route.startsWith('/a/discussions') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/discussions')">
						<i class="fa fa-wechat fs20"></i>
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
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/ballots/active')">
						<i class="fa fa-check-square fs20"></i>
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
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/intake')">
						<i class="fa fa-sign-in fs20"></i>
					</h6>
				</div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/a/reinstatement') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/reinstatement')">
						<i class="fa fa-refresh fs20"></i>
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
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/users')">
						<i class="fa fa-users fs20"></i>
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
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/perks')">
						<i class="fa fa-plus fs20"></i>
					</h6>
				</div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/a/upgrades') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/upgrades')">
						<i class="fa fa-cloud-upload fs20"></i>
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
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/eras')">
						<i class="fa fa-list fs20"></i>
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
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/teams')">
						<i class="fa fa-user-plus fs20"></i>
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
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/a/settings/global')">
						<i class="fa fa-cog fs20"></i>
					</h6>
				</div>

				<hr style="margin-bottom: 0; margin-top: 10px;">

				<div class="col-12 sidebar-row">
					<h6 class="p7 m0 pl2" @click="this.$root.gotoBackOffice">
						<img src="@/assets/images/shufti-backoffice.png" class="backoffice-logo mr5">
					</h6>
				</div>
			</div>
		</div>
	</div>
</template>