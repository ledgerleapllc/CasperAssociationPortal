<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import Active from './Active/Active.vue';
import Finished from './Finished/Finished.vue';
import All from './All/All.vue';
import New from './New/New.vue';
import GeneralAssembly from './GeneralAssembly/GeneralAssembly.vue';

export default {
	components: {
		Popper,
		ClipLoader,
		Active,
		Finished,
		All,
		New,
		GeneralAssembly
	},

	data() {
		return {
			uri_category: this.$route.params.category
		}
	},

	created() {
		//
	},

	mounted() {
		let that = this;

		if (
			this.uri_category != 'active' &&
			this.uri_category != 'finished' &&
			this.uri_category != 'all' &&
			this.uri_category != 'new' &&
			this.uri_category != 'general-assembly'
		) {
			this.uri_category = 'active';
			this.$root.routeTo(`/a/ballots/active`);
		}
	},

	watch: {
		'$route' (to, from) {
			this.uri_category = this.$route.params.category;
		}
	},

	methods: {
		gotoProfile(pseudonym) {
			this.$root.routeTo(`/a/profile/${pseudonym}`);
		},
	}
};

</script>

<template>
	<button 
		class="btn btn-success btn float-right mt10 ml5" 
		@click="
			this.$root.routeTo('/a/ballots/new');
			this.uri_category = 'new';
		"
	>
		<b>&plus;</b>&ensp;New Ballot
	</button>

	<div class="top-banner mt20">
		<div
			@click="
				this.$root.routeTo(`/a/ballots/active`);
				this.uri_category = 'active';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'active' ? 'spa-tab-active' : '')
			"
		>
			Active & Upcoming
		</div>

		<div
			@click="
				this.$root.routeTo(`/a/ballots/finished`);
				this.uri_category = 'finished';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'finished' ? 'spa-tab-active' : '')
			"
		>
			Finished Ballots
		</div>

		<div
			@click="
				this.$root.routeTo(`/a/ballots/all`);
				this.uri_category = 'all';
			"
			v-bind:class="
				'spa-tab ' +
				(this.uri_category == 'all' ? 'spa-tab-active' : '')
			"
		>
			All Votes
		</div>


	</div>

	<Active v-if="this.uri_category == 'active'"></Active>
	<Finished v-else-if="this.uri_category == 'finished'"></Finished>
	<All v-else-if="this.uri_category == 'all'"></All>
	<New v-else-if="this.uri_category == 'new'"></New>
	<GeneralAssembly v-else-if="this.uri_category == 'general-assembly'"></GeneralAssembly>


</template>

<style>

.ballots-row {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 120px;
	position: relative;
	border-bottom: 1px solid #d0d0d0;
}

.ballots-row-icon {
	height: 120px;
	width: 100px;
	padding-top: 15px;
	padding-bottom: 15px;
	padding-right: 10px;
}

.ballots-row-icon img {
	width: 90px;
	height: 90px;
	border-radius: 10px;
}

.ballots-row-pin {
	padding-top: 20px;
	width: 50px;
	height: 100%;
}

.ballots-row-pin img {
	width: 29px;
	height: 29px;
}

.ballots-row-content {
	width: calc(100% - 50px - 120px);
	height: 100%;
	padding-top: 10px;
}

</style>