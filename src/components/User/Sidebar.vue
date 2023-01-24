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
				<div class="col-12 pl25 pt10">
					<a :href="this.$root.frontend_url" class="nostyle">
						<h5 class="pt5 pointer-none m0 bold">
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
						this.$root.route.startsWith('/u/dashboard') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/u/dashboard')">
						<i class="fa fa-home fs18 width-22"></i>
						<span class="fs15 bold">Dashboard</span>
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
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/u/membership')">
						<i class="fa fa-users fs18 width-22"></i>
						<span class="fs15 bold">Membership</span>
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
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/u/nodes')">
						<i class="fa fa-connectdevelop fs18 width-22"></i>
						<span class="fs15 bold">Nodes</span>
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
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/u/eras')">
						<i class="fa fa-list fs18 width-22"></i>
						<span class="fs15 bold">My Eras</span>
					</h6>
				</div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/u/upgrade') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/u/upgrades')">
						<i class="fa fa-cloud-upload fs18 width-22"></i>
						<span class="fs15 bold">Upgrades</span>
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
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/u/discussions')">
						<i class="fa fa-wechat fs18 width-22"></i>
						<span class="fs15 bold">Discussions</span>
						<p class="fs10 ml30">Coming soon!</p>
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
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/u/ballots/active')">
						<i class="fa fa-check-square fs18 width-22"></i>
						<span class="fs15 bold">Votes</span>
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
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/u/perks')">
						<i class="fa fa-plus fs18 width-22"></i>
						<span class="fs15 bold">Perks</span>
					</h6>
				</div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/u/account') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 class="p7 pl20 m0" @click="this.$root.routeTo('/u/account/detail')">
						<i class="fa fa-cog fs18 width-22"></i>
						<span class="fs15 bold">Account</span>
					</h6>
				</div>

				<div class="col-12 sidebar-row">
					<h6 
						class="p7 pl20 m0" 
						@click="this.$root.openLink(this.$root.frontend_url+'/?section=contact')"
					>
						<i class="fa fa-question-circle fs18 width-22"></i>
						<span class="fs15 bold">Get Support</span>
					</h6>
				</div>
			</div>
		</div>
	</div>
</template>