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
		this.$parent.getAllDiscussions();
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
		//
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
						<Popper v-if="discussion.pinned_by_me == true" hover arrow placement="right" class="fs11" content="Unpin this discussion">
							<img src="@/assets/images/pinned.png" class="pointer" @click="this.$parent.unpinDiscussion(discussion.id)">
						</Popper>

						<Popper v-else hover arrow placement="right" class="fs11" content="Pin this discussion">
							<img src="@/assets/images/pin.png" class="pointer" @click="this.$parent.pinDiscussion(discussion.id)">
						</Popper>

						<div v-if="discussion.locked == 1">
							&ensp;
							<Popper hover arrow placement="right" class="fs11" content="This discussion is partially locked">
								<i class="fs12 op7 fa fa-unlock-alt"></i>
							</Popper>
						</div>

						<div v-else-if="discussion.locked == 2">
							&ensp;
							<Popper hover arrow placement="right" class="fs11" content="This discussion is locked">
								<i class="fs12 op7 fa fa-lock"></i>
							</Popper>
						</div>
					</div>
					<div class="discussion-row-content">
						<p class="fs14 bold pointer" @click="this.$parent.gotoDiscussion(discussion.id)">
							{{ discussion.title }}
						</p>
						<p class="fs13 pointer no-wrap" @click="this.$parent.gotoDiscussion(discussion.id)">
							{{ this.$root.formatString(discussion.description, 100) }}
						</p>
						<p class="fs12 mt7">
							<span class="op6">Posted by:</span>&ensp;
							<span class="text-red pointer" @click="this.$parent.gotoProfile(discussion.pseudonym)">{{ discussion.pseudonym }}</span>
						</p>

						<div>
							<span class="op7 fs11">{{ discussion.updated_at }} UTC</span>

							<div class="float-right">
								<i class="fs16 fa fa-wechat pointer" @click="this.$parent.gotoDiscussion(discussion.id)"></i>
								<span class="fs13">{{ discussion.comments }}</span>

								&emsp;&emsp;

								<Popper v-if="discussion.pinned_by_me == true" hover arrow placement="top" class="fs11" content="Unpin this discussion">
									<img src="@/assets/images/pinned.png" class="tiny-img2 pointer" @click="this.$parent.unpinDiscussion(discussion.id)">
								</Popper>

								<Popper v-else hover arrow placement="top" class="fs11" content="Pin this discussion">
									<img src="@/assets/images/pin.png" class="tiny-img2 pointer" @click="this.$parent.pinDiscussion(discussion.id)">
								</Popper>

								<span class="fs13">{{ discussion.pins }}</span>

								&emsp;&emsp;

								<Popper v-if="discussion.liked_by_me == true" hover arrow placement="top" class="fs11" content="Unlike this discussion">
									<img src="@/assets/images/thumbs-up-like.png" class="pointer" @click="this.$parent.unlikeDiscussion(discussion.id)">
								</Popper>

								<Popper v-else hover arrow placement="top" class="fs11" content="Like this discussion">
									<img src="@/assets/images/thumbs-up.png" class=" pointer" @click="this.$parent.likeDiscussion(discussion.id)">
								</Popper>

								<span class="fs13 ml5">{{ discussion.likes }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
