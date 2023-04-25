<script>

import Popper from 'vue3-popper';

export default {
	data: () => ({
		//
	}),

	components: {
		Popper
	},
};

</script>
<template>
	<div 
		id="sidebar" 
		:class="this.$root.suspension ? 'div-disabled' : ''"
	>
		<div class="container-fluid">
			<div class="row">
				<div class="col-12 pl25 pt10">
					<a 
						:href="this.$root.frontend_url" 
						class="nostyle"
					>
						<h5 class="pt5 pointer-none m0 bold">
							<img 
								alt="Casper Association Portal" 
								class="sidebar-logo" 
								src="@/assets/images/nav-logo.png"
							>
						</h5>
					</a>
				</div>
			</div>

			<div 
				class="row" 
				style="position: relative;"
			>
				<div 
					class="retract-sidebar" 
					@click="this.$root.retractSidebar()"
				>
					<i class="fa fa-caret-left ml0 mr2 fs20"></i>
				</div>

				<div class="mt20"></div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/u/dashboard') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 
						class="p7 pl20 m0" 
						@click="this.$root.routeTo('/u/dashboard')"
					>
						<i class="fa fa-home fs18 width-22"></i>
						<span class="fs15 bold">
							Dashboard
						</span>
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
					<h6 
						class="p7 pl20 m0" 
						@click="this.$root.routeTo('/u/membership')"
					>
						<i class="fa fa-users fs18 width-22"></i>
						<span class="fs15 bold">
							Membership
						</span>
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
					<Popper 
						v-if="this.$root.page_locks.nodes"
						hover 
						placement="bottom" 
						class="fs11" 
						:content="
							this.$root.page_locks.nodes == 'kyc-lock' ? 
							'Discussions page is locked at this time because your KYC is not approved' :
							'Discussions page is locked at this time due to probation of one of your nodes'
						"
					>
						<h6 
							class="p7 pl20 m0" 
							style="position: relative"
						>
							<i class="fa fa-connectdevelop fs18 width-22"></i>
							<span class="fs15 bold">
								Nodes
								<i 
									class="fa fa-lock text-red fs11 op7 ml5" 
									style="position: absolute; top: 7px;"
								></i>
							</span>
						</h6>
					</Popper>
					<h6 
						v-else
						class="p7 pl20 m0" 
						@click="this.$root.routeTo('/u/nodes')"
					>
						<i class="fa fa-connectdevelop fs18 width-22"></i>
						<span class="fs15 bold">
							Nodes
						</span>
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
					<h6 
						class="p7 pl20 m0" 
						@click="this.$root.routeTo('/u/eras')"
					>
						<i class="fa fa-list fs18 width-22"></i>
						<span class="fs15 bold">
							My Eras
						</span>
					</h6>
				</div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/u/upgrade') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 
						class="p7 pl20 m0" 
						@click="this.$root.routeTo('/u/upgrades')"
					>
						<i class="fa fa-cloud-upload fs18 width-22"></i>
						<span class="fs15 bold">
							Upgrades
						</span>
					</h6>
				</div>

				<div 
					v-if="this.$root.permissions.discussions == true"
					v-bind:class="
						this.$root.route.startsWith('/u/discussion') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<Popper 
						v-if="this.$root.page_locks.discs"
						hover 
						placement="bottom" 
						class="fs11" 
						:content="
							this.$root.page_locks.discs == 'kyc-lock' ? 
							'Discussions page is locked at this time because your KYC is not approved' :
							'Discussions page is locked at this time due to probation of one of your nodes'
						"
					>
						<h6 
							class="p7 pl20 m0" 
							style="position: relative"
						>
							<i class="fa fa-wechat fs18 width-22"></i>
							<span class="fs15 bold">
								Discussions
								<i 
									class="fa fa-lock text-red fs11 op7 ml5" 
									style="position: absolute; top: 7px;"
								></i>
							</span>
						</h6>
					</Popper>
					<h6 
						v-else
						class="p7 pl20 m0" 
						@click="this.$root.routeTo('/u/discussions')"
					>
						<i class="fa fa-wechat fs18 width-22"></i>
						<span class="fs15 bold">
							Discussions
						</span>
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
					<Popper 
						v-if="this.$root.page_locks.votes"
						hover 
						placement="bottom" 
						class="fs11" 
						:content="
							this.$root.page_locks.votes == 'kyc-lock' ? 
							'Votes page is locked at this time because your KYC is not approved' :
							'Votes page is locked at this time due to probation of one of your nodes'
						"
					>
						<h6 
							class="p7 pl20 m0" 
							style="position: relative"
						>
							<i class="fa fa-check-square fs18 width-22"></i>
							<span class="fs15 bold">
								Votes
								<i 
									class="fa fa-lock text-red fs11 op7 ml5" 
									style="position: absolute; top: 7px;"
								></i>
							</span>
						</h6>
					</Popper>
					<h6 
						v-else
						class="p7 pl20 m0" 
						@click="this.$root.routeTo('/u/ballots/active')"
					>
						<i class="fa fa-check-square fs18 width-22"></i>
						<span class="fs15 bold">
							Votes
						</span>
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
					<Popper 
						v-if="this.$root.page_locks.perks"
						hover 
						placement="bottom" 
						class="fs11" 
						:content="
							this.$root.page_locks.votes == 'kyc-lock' ? 
							'Perks page is locked at this time because your KYC is not approved' :
							'Perks page is locked at this time due to probation of one of your nodes'
						"
					>
						<h6 
							v-if="this.$root.page_locks.perks"
							class="p7 pl20 m0" 
							style="position: relative"
						>
							<i class="fa fa-plus fs18 width-22"></i>
							<span class="fs15 bold">
								Perks
								<i 
									class="fa fa-lock text-red fs11 op7 ml5" 
									style="position: absolute; top: 7px;"
								></i>
							</span>
						</h6>
					</Popper>
					<h6 
						v-else
						class="p7 pl20 m0"
						@click="this.$root.routeTo('/u/perks')" 
					>
						<i class="fa fa-plus fs18 width-22"></i>
						<span class="fs15 bold">
							Perks
						</span>
					</h6>
				</div>

				<div 
					v-bind:class="
						this.$root.route.startsWith('/u/account') ?
						'col-12 sidebar-row selected-nav' : 
						'col-12 sidebar-row'
					"
				>
					<h6 
						class="p7 pl20 m0" 
						@click="this.$root.routeTo('/u/account/detail')"
					>
						<i class="fa fa-cog fs18 width-22"></i>
						<span class="fs15 bold">
							Account
						</span>
					</h6>
				</div>

				<div class="col-12 sidebar-row">
					<h6 
						class="p7 pl20 m0" 
						@click="this.$root.openLink(this.$root.frontend_url+'/?section=contact')"
					>
						<i class="fa fa-question-circle fs18 width-22"></i>
						<span class="fs15 bold">
							Get Support
						</span>
					</h6>
				</div>

				<div 
					v-if="this.$root.kyc_status != 'approved'"
					class="col-12 pointer mt10"
				>
					<h6 
						class="p7 pl20 m0" 
						@click="this.$root.routeTo('/u/get-verified')"
					>
						<span class="fs12 bold text-red">
							<span class="underline bold">Submit KYC</span> to unlock
							<i class="fa fa-lock text-red fs11 op7 ml2"></i>
						</span>
					</h6>
				</div>
			</div>
		</div>
	</div>
</template>