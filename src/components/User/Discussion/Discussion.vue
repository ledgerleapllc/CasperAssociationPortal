<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';
import AvatarBadgeDiscussion from '../../AvatarBadgeDiscussion.vue';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal,
		AvatarBadgeDiscussion
	},

	data() {
		return {
			discussion_id: this.$route.params.discussion_id,
			discussion: {
				id:                null,
				creator_guid:      null,
				avatar_url:        null,
				title:             null,
				description:       null,
				is_read:           null,
				created_at:        null,
				updated_at:        null,
				associated_ballot: null,
				for_upgrade:       null,
				pseudonym:         null,
				role:              null,
				pinned_by_me:      null,
				liked_by_me:       null,
				likes:             null,
				locked:            null,
				pins:              null,
				ballot_status:     null,
				ballot_title:      null,
				kyc_status:        null,
				comments:          []
			},

			editingDiscussion:           false,
			lockDiscussionModalIsOpen:   false,
			deleteDiscussionModalIsOpen: false,
			deleteCommentModalIsOpen:    false,
			isClickOut:                  false,

			editCommentModalIsOpen:      false,
			editCommentContent:          '',
			editCommentId:               0,
			selected_comment_id:         0
		}
	},

	created() {
	},

	mounted() {
		let that = this;
		this.getDiscussion();
	},

	watch: {
		'$route' (to, from) {
			this.discussion_id = this.$route.params.discussion_id;
		}
	},

	methods: {
		async getDiscussion() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-discussion',
				{
					discussion_id: this.discussion_id
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.discussion = response.detail;
				// console.log(this.discussion);
			}
		},

		gotoProfile(pseudonym) {
			this.$root.routeTo(`/u/profile/${pseudonym}`);
		},

		gotoDiscussion(id) {
			this.$root.routeTo(`/u/discussion/${id}`);
		},

		async pinDiscussion() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/pin-discussion',
				{
					"discussion_id": this.discussion_id,
					"pin": true
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.getDiscussion();

				this.$root.toast(
					'', 
					response.message, 
					'success'
				);
			}
		},

		async unpinDiscussion() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/pin-discussion',
				{
					"discussion_id": this.discussion_id,
					"pin": false
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.getDiscussion();

				this.$root.toast(
					'', 
					response.message, 
					'success'
				);
			}
		},

		async likeDiscussion() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/like-discussion',
				{
					"discussion_id": this.discussion_id,
					"like": true
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.getDiscussion();
			}
		},

		async unlikeDiscussion() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/like-discussion',
				{
					"discussion_id": this.discussion_id,
					"like": false
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.getDiscussion();
			}
		},

		lockDiscussion() {
			this.lockDiscussionModalIsOpen = true;
		},

		async _lockDiscussion() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/lock-discussion',
				{
					"discussion_id": this.discussion_id
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.lockDiscussionModalIsOpen = false;
				this.getDiscussion();
				this.$root.toast(
					'',
					response.message,
					'success'
				);
			}
		},

		cancelLockDiscussion() {
			this.lockDiscussionModalIsOpen = false;
		},

		deleteDiscussion() {
			this.deleteDiscussionModalIsOpen = true;
		},

		async _deleteDiscussion() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/delete-discussion',
				{
					"discussion_id": this.discussion_id
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.deleteDiscussionModalIsOpen = false;
				this.$root.routeTo('/u/discussions');
				this.$root.toast(
					'',
					response.message,
					'success'
				);
			}
		},

		cancelDeleteDiscussion() {
			this.deleteDiscussionModalIsOpen = false;
		},

		editDiscussion() {
			let that = this;
			this.editingDiscussion = true;

			setTimeout(function() {
				that.$refs['discussion_description'].focus();
			},300);
		},

		async submitEditDiscussion() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');
			let new_text           = this.$refs['discussion_description'];

			if (new_text && new_text != '') {
				new_text = new_text.value;
			} else {
				return;
			}

			this.editingDiscussion = false;

			const response = await api(
				'PUT',
				'user/edit-discussion',
				{
					"discussion_id": this.discussion_id,
					"description":   new_text
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.getDiscussion();
			}
		},

		cancelEditDiscussion() {
			this.$refs['discussion_description'].textContent = this.discussion.description;
			this.editingDiscussion = false;
		},

		async postComment() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');
			let comment_text       = this.$refs["comment_text"].value;

			if (
				!comment_text ||
				comment_text == ''
			) {
				this.$refs["comment_text"].focus();
				return;
			}

			const response = await api(
				'POST',
				'user/post-comment',
				{
					"discussion_id": this.discussion_id,
					"content": comment_text
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.getDiscussion();
				this.$refs["comment_text"].value = "";
				this.$root.toast(
					'',
					response.message,
					'success'
				);
			}
		},

		deleteComment(comment_id) {
			this.selected_comment_id      = comment_id;
			this.deleteCommentModalIsOpen = true;
		},

		cancelDeleteComment() {
			this.selected_comment_id      = 0;
			this.deleteCommentModalIsOpen = false;
		},

		async _deleteComment() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/delete-comment',
				{
					"comment_id": this.selected_comment_id
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.deleteCommentModalIsOpen = false;
				this.selected_comment_id      = 0;
				this.getDiscussion();
			}
		},

		uncensorComment(event) {
			let parent = event.target.parentElement;
			parent.classList.add('uncensored-comment');
		},

		editComment(
			comment_id, 
			comment_content
		) {
			this.editCommentId          = comment_id;
			this.editCommentContent     = comment_content;
			this.editCommentModalIsOpen = true;
		},

		async _editComment() {
			let fetch_bearer_token  = this.$cookies.get('bearer_token');
			let new_comment_content = this.$refs['new_comment_content'].value;

			if (
				!this.editCommentId ||
				this.editCommentId == 0 ||
				!new_comment_content ||
				new_comment_content == ''
			) {
				return;
			}

			this.editCommentModalIsOpen = false;

			const response = await api(
				'PUT',
				'user/edit-comment',
				{
					"comment_id": this.editCommentId,
					"content":    new_comment_content
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.getDiscussion();
				this.editCommentId      = 0;
				this.editCommentContent = '';
			}
		},

		cancelEditComment() {
			this.editCommentModalIsOpen = false;
			this.editCommentId          = 0;
			this.editCommentContent     = '';
		}
	}
};

</script>

<template>
	<div class="container-fluid" style="z-index: 0;">
		<div class="row">
			<div class="col-12 mt20">
				<div 
					class="go-back" 
					@click="this.$router.back()"
				>
					<i class="fa fa-arrow-left"></i>
					Discussions
				</div>
				<div class="card mt20">
					<div class="card-title mb0">
						<div v-if="discussion.title === null">
							<ClipLoader 
								class="clip-loader-inline" 
								size="20px" 
								color="#ff2d2e"
							></ClipLoader>
						</div>
						<div v-else>
							<span 
								v-if="discussion.for_upgrade == 1" 
								class="bold"
							>
								{{ this.$root.formatString(discussion.title, 256) }}
								<span class="text-red">(Protocol Upgrade)</span>
							</span>
							<span v-else>
								{{ this.$root.formatString(discussion.title, 256) }}
							</span>

							<div class="float-right">
								<i 
									class="fs16 fa fa-wechat" 
									@click="this.gotoDiscussion(discussion_id)"
								></i>
								<span class="fs13">{{ discussion.comments.length }}</span>

								&emsp;&ensp;

								<Popper 
									v-if="parseInt(discussion.pinned_by_me) > 0" 
									hover 
									arrow 
									placement="top" 
									class="fs11" 
									content="Unpin this discussion"
								>
									<img 
										src="@/assets/images/pinned.png" 
										class="tiny-img2 pointer" 
										@click="this.unpinDiscussion(this.discussion_id)"
									>
								</Popper>

								<Popper 
									v-else 
									hover 
									arrow 
									placement="top" 
									class="fs11" 
									content="Pin this discussion"
								>
									<img 
										src="@/assets/images/pin.png" 
										class="tiny-img2 pointer" 
										@click="this.pinDiscussion(this.discussion_id)"
									>
								</Popper>

								<span class="fs13">{{ discussion.pins }}</span>

								&emsp;&ensp;

								<Popper 
									v-if="parseInt(discussion.liked_by_me) > 0" 
									hover 
									arrow 
									placement="top" 
									class="fs11" 
									content="Unlike this discussion"
								>
									<img 
										src="@/assets/images/thumbs-up-like.png" 
										class="pointer" 
										@click="this.unlikeDiscussion(this.discussion_id)"
									>
								</Popper>

								<Popper 
									v-else 
									hover 
									arrow 
									placement="top" 
									class="fs11" 
									content="Like this discussion"
								>
									<img 
										src="@/assets/images/thumbs-up.png" 
										class="pointer" 
										@click="this.likeDiscussion(this.discussion_id)"
									>
								</Popper>

								<span class="fs13 ml5">{{ discussion.likes }}</span>
							</div>
						</div>
					</div>
					<div class="card-body">
						<div class="discussion-row no-border">
							<div class="discussion-row-icon">
								<AvatarBadgeDiscussion
									:url="discussion.avatar_url" 
									:role="discussion.role" 
									:kyc="discussion.kyc_status"
									@click="this.gotoProfile(discussion.pseudonym)"
								>
								</AvatarBadgeDiscussion>

								<div v-if="this.discussion.title === null">
									<ClipLoader 
										class="clip-loader-inline" 
										size="12px" 
										color="#ff2d2e"
									></ClipLoader>
								</div>
								<div v-else>
									<p 
										class="fs11 mt5 bold pointer" 
										@click="this.gotoProfile(discussion.pseudonym)"
									>
										{{ this.$root.formatString(discussion.pseudonym, 16) }}
									</p>
									<p class="fs11 mt5">
										{{ discussion.created_at }} UTC
									</p>
									<p 
										v-if="
											discussion.updated_at != discussion.created_at
										"
										class="fs10 op7"
									>
										Edited: {{ discussion.updated_at }}
									</p>
								</div>
							</div>

							<div 
								v-if="this.discussion.description === null" 
								class="discussion-row-content"
							>
								<ClipLoader 
									size="25px" 
									color="#ff2d2e"
								></ClipLoader>
							</div>
							<div 
								v-else 
								class="discussion-row-content"
							>
								<textarea 
									v-if="editingDiscussion" 
									class="form-control fs14 height-200" 
									ref="discussion_description"
								>{{ discussion.description }}</textarea>
								<div v-else>
									{{ discussion.description }}
								</div>
							</div>
						</div>

						<div 
							v-if="
								discussion.creator_guid == this.$root.guid &&
								discussion.locked == 0
							" 
							class="form-group"
						>
							<div v-if="editingDiscussion">
								<button 
									class="btn btn-sm btn-success fs11 bold mr5" 
									@click="submitEditDiscussion()"
								>
									Save Edits
								</button>
								<button 
									class="btn btn-sm btn-success fs11 bold mr5" 
									@click="cancelEditDiscussion()"
								>
									Cancel Edits
								</button>
							</div>
							<div v-else>
								<button 
									class="btn btn-sm btn-success fs11 bold mr5" 
									@click="editDiscussion()"
								>
									Edit Discussion
								</button>
								<button 
									class="btn btn-sm btn-black fs11 bold mr5" 
									@click="deleteDiscussion()"
								>
									Delete Discussion
								</button>
								<button 
									class="btn btn-sm btn-black fs11 bold" 
									@click="lockDiscussion()"
								>
									Lock Discussion
								</button>
							</div>
						</div>

						<div
							v-if="
								discussion.ballot_title &&
								discussion.ballot_status
							"
							class="form-group mb30"
						>
							<p class="mt20 fs17">
								This discussion covers ballot <b>#{{ discussion.associated_ballot }}</b>
							</p>
							<p class="mt5">
								<span 
									class="bold fs18 pointer underline" 
									@click="this.$root.routeTo(`/u/ballot/${discussion.associated_ballot}`)"
								>
									{{ discussion.ballot_title }}
								</span>
							</p>
						</div>

						<div 
							v-else-if="
								discussion.creator_guid == this.$root.guid &&
								discussion.locked == 1
							"
						>
							<Popper 
								hover 
								arrow 
								placement="right" 
								class="fs11" 
								content="This discussion is partially locked"
							>
								<i class="fa fa-unlock-alt"></i>
							</Popper>
						</div>

						<div 
							v-else-if="
								discussion.creator_guid == this.$root.guid &&
								discussion.locked == 2
							"
						>
							<Popper 
								hover 
								arrow 
								placement="right" 
								class="fs11" 
								content="This discussion is locked and archived"
							>
								<i class="fa fa-lock"></i>
							</Popper>
						</div>

						<form 
							v-if="discussion.locked < 2" 
							@submit.prevent
						>
							<div class="form-group mt20">
								<p class="fs12 op5">
									(MCE editor coming soon)
								</p>

								<textarea 
									class="form-control fs14 height-100" 
									placeholder="Write your comment here" 
									ref="comment_text"
								></textarea>
							</div>

							<div class="form-group mt20">
								<button 
									class="btn btn-success float-right width-150 ml10" 
									@click="this.postComment()"
								>
									Comment
								</button>
							</div>
						</form>

						<div v-else>
							<p class="mt20 fs16">
								This discussion has been locked/archived.
							</p>
						</div>

						<div class="comments-scoll-section mt80">
							<div 
								class="discussion-row" 
								v-for="(comment, index) in this.discussion.comments"
							>
								<div class="discussion-row-icon">
									<AvatarBadgeDiscussion
										:url="comment.avatar_url" 
										:role="comment.role" 
										:kyc="comment.kyc_status"
										@click="this.gotoProfile(comment.guid)"
									>
									</AvatarBadgeDiscussion>

									<Popper 
										v-if="
											comment.guid    == this.$root.guid &&
											comment.deleted == 0
										" 
										hover 
										arrow 
										placement="bottom" 
										class="fs11" 
										content="Delete my comment"
									>
										<i 
											class="fa fa-trash text-red fs16 ml5 pointer" 
											@click="deleteComment(comment.id)"
										></i>
									</Popper>

									<Popper 
										v-if="
											comment.guid    == this.$root.guid &&
											comment.deleted == 0
										" 
										hover 
										arrow 
										placement="bottom" 
										class="fs11" 
										content="Edit my comment"
									>
										<i 
											class="fa fa-pencil text-red fs16 pointer" 
											@click="editComment(comment.id, comment.content)"
										></i>
									</Popper>

									<p 
										class="fs11 mt5 bold pointer" 
										@click="this.gotoProfile(comment.guid)"
									>
										{{ this.$root.formatString(comment.pseudonym, 16) }}
									</p>
									<p class="fs11 mt5">
										{{ comment.updated_at }} UTC 
										<i 
											v-if="comment.updated_at > comment.created_at" 
											class="fs11 fa fa-pencil op5"
										></i>
									</p>
								</div>

								<div 
									v-if="comment.flagged == 1" 
									class="censored-comment"
								>
									<p class="fs13 mt10">
										This comment has been flagged by an admin as inappropriate.
									</p>
									<button 
										class="btn btn-sm btn-uncensor" 
										@click="uncensorComment"
									>
										Show Comment
									</button>
								</div>

								<div 
									v-if="comment.deleted == 1" 
									class="deleted-comment"
								>
									<p class="fs13 mt10">
										This comment has been deleted by an admin.
									</p>
								</div>

								<div class="discussion-row-content">
									{{ this.$root.formatComment(comment.content) }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Modal
		v-model="lockDiscussionModalIsOpen" 
		max-width="400px"
		:click-out="isClickOut"
		:clickOut="true"
	>
		<div class="modal-container">
			<p class="pb15 bold fs17 border-bottom">
				Lock Discussion
			</p>

			<p class="pt15 pb15">
				Lock this discussion? The discussion will no longer be able to be modified or deleted once this action is done. People will still be able to comment/like/pin the post.
			</p>

			<button 
				class="btn btn-success btn-sm mt15" 
				@click="_lockDiscussion()"
			>
				Lock Discussion
			</button>
			<button 
				class="btn btn-black btn-sm mt15 ml5" 
				@click="cancelLockDiscussion"
			>
				Cancel
			</button>
		</div>
	</Modal>

	<Modal
		v-model="deleteDiscussionModalIsOpen" 
		max-width="400px"
		:click-out="isClickOut"
		:clickOut="true"
	>
		<div class="modal-container">
			<p class="pb15 bold fs17 border-bottom">
				Delete Discussion
			</p>

			<p class="pt15 pb15">
				Delete this discussion? Once this action is done, it cannot be undone.
			</p>

			<button 
				class="btn btn-success btn-sm mt15" 
				@click="_deleteDiscussion()"
			>
				Delete Discussion
			</button>
			<button 
				class="btn btn-black btn-sm mt15 ml5" 
				@click="cancelDeleteDiscussion"
			>
				Cancel
			</button>
		</div>
	</Modal>

	<Modal
		v-model="editCommentModalIsOpen" 
		max-width="400px"
		:click-out="isClickOut"
		:clickOut="true"
	>
		<div class="modal-container">
			<p class="pb15 bold fs17 border-bottom">
				Edit Comment
			</p>

			<textarea 
				class="form-control height-200 mt20" 
				ref="new_comment_content"
			>{{ editCommentContent }}</textarea>

			<button 
				class="btn btn-success btn-sm mt15" 
				@click="_editComment()"
			>
				Commit Edit
			</button>
			<button 
				class="btn btn-black btn-sm mt15 ml5" 
				@click="cancelEditComment"
			>
				Cancel
			</button>
		</div>
	</Modal>

	<Modal
		v-model="deleteCommentModalIsOpen" 
		max-width="400px"
		:click-out="isClickOut"
		:clickOut="true"
	>
		<div class="modal-container">
			<p class="pb15 bold fs17 border-bottom">
				Delete Comment?
			</p>

			<button 
				class="btn btn-success btn-sm mt15" 
				@click="_deleteComment()"
			>
				Delete Comment
			</button>
			<button 
				class="btn btn-black btn-sm mt15 ml5" 
				@click="cancelDeleteComment"
			>
				Cancel
			</button>
		</div>
	</Modal>
</template>

<style scoped>

.discussion-row {
	display: flex;
	flex-direction: row;
	width: 100%;
	min-height: 175px;
	height: auto;
	position: relative;
	border-bottom: 1px solid #d0d0d0;
	padding-bottom: 15px;
	padding-left: 5px;
}

.discussion-row-icon {
	width: 170px;
	padding-top: 15px;
	padding-bottom: 15px;
	padding-right: 10px;
}

.discussion-row-icon span {
	white-space: nowrap;
	font-size: 12px;
	font-weight: bold;
}

.discussion-row-icon img {
	width: 90px;
	height: 90px;
	border-radius: 10px;
}

.discussion-row-content {
	width: calc(100% - 170px);
	height: 100%;
	padding-top: 10px;
	padding-left: 10px;
	font-size: 14px;
	white-space: pre-line;
}

.comments-scoll-section {
	border-top: 1px solid #d0d0d0;
	width: 100%;
	height: 600px;
	overflow-y: scroll;
}

.no-border {
	border: none;
}

.censored-comment {
	position: absolute;
	top: 0;
	left: 160px;
	width: calc(100% - 160px);
	height: 100%;
	background-color: #e1e3e6;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.uncensored-comment {
	background-color: #f4f6f7;
	z-index: -1;
}

.uncensored-comment p {
	display: none;
}

.uncensored-comment button {
	display: none;
}

.deleted-comment {
	position: absolute;
	top: 0;
	left: 160px;
	width: calc(100% - 160px);
	height: 100%;
	background-color: #e1e3e6;
	z-index: 2;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.btn-uncensor {
	margin-top: 10px;
	border-radius: 15px;
	font-weight: bold;
	font-size: 11px;
	background-color: #d9d9d9;
	border: 2px solid #777;
}

.btn-uncensor:hover,
.btn-uncensor:focus,
.btn-uncensor:active {
	background-color: #e1e3e6;
}

@media all and (max-width: 767px) {
	.discussion-row {
		flex-direction: column;
	}

	.discussion-row-content {
		margin-top: 80px;
		width: 100%;
		padding-left: 0;
	}
}

</style>