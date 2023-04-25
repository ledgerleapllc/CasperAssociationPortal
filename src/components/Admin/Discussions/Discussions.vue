<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import All from './All/All.vue';
import My from './My/My.vue';
import Pinned from './Pinned/Pinned.vue';
import Draft from './Draft/Draft.vue';
import New from './New/New.vue';

export default {
	components: {
		Popper,
		ClipLoader,
		All,
		My,
		Draft,
		Pinned,
		New
	},

	data() {
		return {
			uri_category: this.$route.params.category,
			discussions:  []
		}
	},

	created() {
	},

	mounted() {
		let that = this;

		if (
			this.uri_category != 'all' &&
			this.uri_category != 'my' &&
			this.uri_category != 'pinned' &&
			this.uri_category != 'draft' &&
			this.uri_category != 'new'
		) {
			this.uri_category = 'all';
			this.$root.routeTo(`/a/discussions/all`);
		}
	},

	watch: {
		'$route' (to, from) {
			this.uri_category = this.$route.params.category;
		}
	},

	methods: {
		async getAllDiscussions() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-all-discussions',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.discussions = response.detail;
			}
		},

		async getMyDiscussions() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-my-discussions',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.discussions = response.detail;
			}
		},

		async getPinnedDiscussions() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-pinned-discussions',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.discussions = response.detail;
			}
		},

		async getDraftDiscussions() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-draft-discussions',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.discussions = response.detail;
			}
		},

		async discardDraft(draft_id) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/discard-draft',
				{
					draft_id: draft_id
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.$root.toast(
					'', 
					response.message, 
					'success'
				);

				this.getDraftDiscussions();
			}
		},

		gotoProfile(pseudonym) {
			this.$root.routeTo(`/a/profile/${pseudonym}`);
		},

		gotoDiscussion(id) {
			this.$root.routeTo(`/a/discussion/${id}`);
		},

		async pinDiscussion(id) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/pin-discussion',
				{
					"discussion_id": id,
					"pin": true
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				if (this.uri_category == 'all') {
					this.getAllDiscussions();
				} else if(this.uri_category == 'my') {
					this.getMyDiscussions();
				} else if(this.uri_category == 'pinned') {
					this.getPinnedDiscussions();
				} else if(this.uri_category == 'draft') {
					this.getDraftDiscussions();
				}

				this.$root.toast(
					'', 
					response.message, 
					'success'
				);
			}
		},

		async unpinDiscussion(id) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/pin-discussion',
				{
					"discussion_id": id,
					"pin": false
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				if (this.uri_category == 'all') {
					this.getAllDiscussions();
				} else if(this.uri_category == 'my') {
					this.getMyDiscussions();
				} else if(this.uri_category == 'pinned') {
					this.getPinnedDiscussions();
				} else if(this.uri_category == 'draft') {
					this.getDraftDiscussions();
				}

				this.$root.toast(
					'', 
					response.message, 
					'success'
				);
			}
		},

		async likeDiscussion(id) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/like-discussion',
				{
					"discussion_id": id,
					"like": true
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				if (this.uri_category == 'all') {
					this.getAllDiscussions();
				} else if(this.uri_category == 'my') {
					this.getMyDiscussions();
				} else if(this.uri_category == 'pinned') {
					this.getPinnedDiscussions();
				} else if(this.uri_category == 'draft') {
					this.getDraftDiscussions();
				}

				// this.$root.toast(
				// 	'', 
				// 	response.message, 
				// 	'success'
				// );
			}
		},

		async unlikeDiscussion(id) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/like-discussion',
				{
					"discussion_id": id,
					"like": false
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				if (this.uri_category == 'all') {
					this.getAllDiscussions();
				} else if(this.uri_category == 'my') {
					this.getMyDiscussions();
				} else if(this.uri_category == 'pinned') {
					this.getPinnedDiscussions();
				} else if(this.uri_category == 'draft') {
					this.getDraftDiscussions();
				}

				// this.$root.toast(
				// 	'', 
				// 	response.message, 
				// 	'success'
				// );
			}
		}
	}
};

</script>

<template>
	<button 
		v-if="uri_category != 'new'"
		class="btn btn-success btn float-right mt10 ml5" 
		@click="
			this.$root.routeTo('/a/discussions/new');
			uri_category = 'new';
		"
	>
		<b>&plus;</b>&ensp;New Discussion
	</button>

	<div 
		v-if="uri_category != 'new'"
		class="top-banner mt20"
	>
		<div
			@click="
				this.$root.routeTo(`/a/discussions/all`);
				uri_category = 'all';
			"
			v-bind:class="
				'spa-tab ' +
				(uri_category == 'all' ? 'spa-tab-active' : '')
			"
		>
			All Discussions
		</div>

		<div
			@click="
				this.$root.routeTo(`/a/discussions/my`);
				uri_category = 'my';
			"
			v-bind:class="
				'spa-tab ' +
				(uri_category == 'my' ? 'spa-tab-active' : '')
			"
		>
			My Discussions
		</div>

		<div
			@click="
				this.$root.routeTo(`/a/discussions/pinned`);
				uri_category = 'pinned';
			"
			v-bind:class="
				'spa-tab ' +
				(uri_category == 'pinned' ? 'spa-tab-active' : '')
			"
		>
			Pinned Discussions
		</div>

		<div
			@click="
				this.$root.routeTo(`/a/discussions/draft`);
				uri_category = 'draft';
			"
			v-bind:class="
				'spa-tab ' +
				(uri_category == 'draft' ? 'spa-tab-active' : '')
			"
		>
			Draft
		</div>

	</div>

	<All v-if="uri_category == 'all'"></All>
	<My v-else-if="uri_category == 'my'"></My>
	<Pinned v-else-if="uri_category == 'pinned'"></Pinned>
	<Draft v-else-if="uri_category == 'draft'"></Draft>
	<New v-else-if="uri_category == 'new'"></New>


</template>

<style>

.discussion-row {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 120px;
	position: relative;
	border-bottom: 1px solid #d0d0d0;
}

.discussion-row-gold {
	border-right: 3px solid gold;
	border-top: 3px solid gold;
	border-bottom: 3px solid gold;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
	margin-top: 3px;
	margin-bottom: 3px;
}

.discussion-row-icon {
	height: 120px;
	width: 100px;
	padding-top: 15px;
	padding-bottom: 15px;
	padding-right: 10px;
}

.discussion-row-icon img {
	width: 90px;
	height: 90px;
	border-radius: 10px;
}

.discussion-row-pin {
	padding-top: 20px;
	width: 50px;
	height: 100%;
}

.discussion-row-pin img {
	width: 29px;
	height: 29px;
}

.discussion-row-content {
	width: calc(100% - 50px - 120px);
	height: 100%;
	padding-top: 10px;
}

.no-wrap {
	white-space: nowrap;
	overflow-x: hidden;
}

@media all and (max-width: 767px) {
	.discussion-row-icon,
	.discussion-row {
		height: 145px;
	}
}

</style>