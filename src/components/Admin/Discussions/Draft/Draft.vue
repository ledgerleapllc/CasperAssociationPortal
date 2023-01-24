<script>

import App from '../../../../App.vue';
import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import AvatarBadgeDiscussion from '../../../AvatarBadgeDiscussion.vue';

export default {
	components: {
		Popper,
		ClipLoader,
		AvatarBadgeDiscussion
	},

	data() {
		return {
			uri_category: this.$route.params.category
		}
	},

	created() {
		this.$parent.getDraftDiscussions();
	},

	mounted() {
		let that = this;
	},

	watch: {
		'$route' (to, from) {
			this.uri_category = this.$route.params.category;
		}
	},

	methods: {
		pickupDraft(draft_id) {
			this.$root.routeTo(`/u/discussions/new?draft_id=${draft_id}`);
		}
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div 
					v-for="(discussion, index) in this.$parent.discussions"
					class="discussion-row" 
					:class="discussion.for_upgrade == 1 ? 'discussion-row-gold' : ''"
				>
					<div class="discussion-row-icon pointer">
						<AvatarBadgeDiscussion
							:url="discussion.avatar_url" 
							:role="discussion.role" 
							:kyc="discussion.kyc_status"
							@click="this.$parent.gotoProfile(discussion.pseudonym)"
						>
						</AvatarBadgeDiscussion>
					</div>
					<div class="discussion-row-pin">
						<Popper hover arrow placement="right" class="fs11" content="This is a draft">
							<i class="fs16 fa fa-pencil"></i>
						</Popper>

						<br/>

						<Popper hover arrow placement="right" class="fs11" content="Discard this draft">
							<i class="fs16 fa fa-trash pointer" @click="this.$parent.discardDraft(discussion.id)"></i>
						</Popper>
					</div>
					<div class="discussion-row-content">
						<p class="fs14 bold pointer" @click="this.pickupDraft(discussion.id)">
							{{ discussion.title }}
						</p>
						<p class="fs13 pointer no-wrap" @click="this.pickupDraft(discussion.id)">
							{{ this.$root.formatString(discussion.description, 100) }}
						</p>

						<div>
							<span class="op7 fs11">
								Updated:
								{{ discussion.updated_at }} UTC
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
