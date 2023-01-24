<script>

export default {
	data: () => ({
		//
	})
};

</script>
<template>
	<div id="sidebar" :class="this.$root.suspension ? 'div-disabled' : ''">
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
						this.$root.route.startsWith('/u/dashboard') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/u/dashboard')">
						<i class="fa fa-home fs20"></i>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.membership == true"
					v-bind:class="
						this.$root.route.startsWith('/u/membership') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/u/membership')">
						<i class="fa fa-users fs20"></i>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.nodes == true"
					v-bind:class="
						this.$root.route.startsWith('/u/nodes') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/u/nodes')">
						<i class="fa fa-connectdevelop fs20"></i>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.eras == true"
					v-bind:class="
						this.$root.route.startsWith('/u/eras') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/u/eras')">
						<i class="fa fa-list fs20"></i>
					</h6>
				</div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/u/upgrade') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/u/upgrades')">
						<i class="fa fa-cloud-upload fs20"></i>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.discussions == true"
					v-bind:class="
						this.$root.route.startsWith('/u/discussion') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
					class="div-disabled"
					style="position: relative;" 
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/u/discussions')">
						<i class="fa fa-wechat fs20"></i>
						<i class="fa fa-exclamation fs14 op7" style="position: absolute; left: 7px; top: 5px;"></i>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.ballots == true"
					v-bind:class="
						this.$root.route.startsWith('/u/ballot') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/u/ballots/active')">
						<i class="fa fa-check-square fs20"></i>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.perks == true"
					v-bind:class="
						this.$root.route.startsWith('/u/perk') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/u/perks')">
						<i class="fa fa-plus fs20"></i>
					</h6>
				</div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/u/account') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 m0 pl2" @click="this.$root.routeTo('/u/account/detail')">
						<i class="fa fa-cog fs20"></i>
					</h6>
				</div>

				<div class="col-12 sidebar-row">
					<h6 
						class="p7 m0 pl2" 
						@click="this.$root.openLink(this.$root.frontend_url+'/?section=contact')"
					>
						<i class="fa fa-question-circle fs20"></i>
					</h6>
				</div>
			</div>
		</div>
	</div>
</template>