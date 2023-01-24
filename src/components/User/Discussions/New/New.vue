<script>

import App from '../../../../App.vue';
import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';

export default {
	components: {
		Popper,
		ClipLoader
	},

	data() {
		return {
			uri_category:     this.$route.params.category,
			existing_ballots: [],
			draft_id:         parseInt(this.$route.query.draft_id | 0)
		}
	},

	created() {
		this.getExistingBallots();
	},

	mounted() {
		let that = this;

		if (this.draft_id > 0) {
			this.pickupDraft();
		}
	},

	watch: {
		'$route' (to, from) {
			this.uri_category = this.$route.params.category;
			this.draft_id     = parseInt(this.$route.query.draft_id | 0);
		}
	},

	methods: {
		async postDiscussion() {
			let draft_id          = this.draft_id;
			let title             = this.$refs["title"].value;
			let description       = this.$refs["description"].value;
			let for_upgrade       = this.$refs["for_upgrade"].checked;
			let associated_ballot = this.$refs["associated_ballot"].value;

			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/post-discussion',
				{
					"draft_id":          this.draft_id,
					"title":             title,
					"description":       description,
					"for_upgrade":       for_upgrade,
					"associated_ballot": associated_ballot
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.$root.routeTo('/u/discussions/all');

				this.$root.toast(
					'', 
					response.message, 
					'success'
				);
			} else {
				this.$root.toast(
					'', 
					response.message, 
					'error'
				);
			}
		},

		async saveDraft() {
			let title             = this.$refs["title"].value;
			let description       = this.$refs["description"].value;
			let for_upgrade       = this.$refs["for_upgrade"].checked;
			let associated_ballot = this.$refs["associated_ballot"].value;

			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/save-draft-discussion',
				{
					"draft_id":          this.draft_id,
					"title":             title,
					"description":       description,
					"for_upgrade":       for_upgrade,
					"associated_ballot": associated_ballot
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.draft_id = response.detail.draft_id;
				this.$root.routeTo(`/u/discussions/new?draft_id=${this.draft_id}`);

				this.$root.toast(
					'', 
					response.detail.message, 
					'success'
				);
			} else {
				this.$root.toast(
					'', 
					response.message, 
					'error'
				);
			}
		},

		async pickupDraft() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-draft-discussion',
				{
					"draft_id": this.draft_id,
				},
				fetch_bearer_token
			);
			// console.log(response);

			if (response.status == 200) {
				let wait = await this.$refs["title"];

				if (wait) {
					this.$refs["title"].value             = response.detail.title;
					this.$refs["description"].value       = response.detail.description;
					this.$refs["for_upgrade"].checked     = Boolean(parseInt(response.detail.for_upgrade));
					this.$refs["associated_ballot"].value = parseInt(response.detail.associated_ballot);
				}
			} else {
				this.$root.toast(
					'', 
					response.message, 
					'error'
				);
			}
		},

		async getExistingBallots() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-active-ballots',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.existing_ballots = response.detail;
			}
		}
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="go-back" @click="this.$router.back()">
					<i class="fa fa-arrow-left"></i>
					Cancel
				</div>
				<div class="card mt20">
					<div class="card-title">
						Create a Discussion&ensp;
						<span v-if="draft_id > 0" class="op6 fs15">
							- Editing draft #{{ draft_id }}
						</span>
					</div>
					<div class="card-body">
						<small>
							Posting as:
							<span class="text-red pointer" @click="this.$parent.gotoProfile(this.$root.pseudonym)"> {{ this.$root.pseudonym }}</span>
						</small>

						<form @submit.prevent>
							<div class="form-group mt20">
								<input id="for_upgrade" type="checkbox" ref="for_upgrade" class="form-check-input pointer mt5">
								<label class="fs12 pointer" for="for_upgrade">&ensp;Is this discussion about a future protocol upgrade?&ensp;</label>
							</div>

							<div class="form-group mt20">
								<p class="fs12 bold">
									Relate this discussion to an existing ballot
								</p>
								<select class="form-select max-width-400" ref="associated_ballot">
									<option selected value="">Optional</option>
									<option v-for="(value, index) in this.existing_ballots" :value="value.id">
										{{ this.$root.formatString(value.title, 36) }}
									</option>
								</select>
							</div>

							<div class="form-group mt20">
								<input class="form-control" type="text" name="" placeholder="Title" ref="title">

								<p class="mt20 fs12 op5">(MCE editor coming soon)</p>

								<textarea class="form-control fs14 height-200" placeholder="Write your content here" ref="description"></textarea>
							</div>

							<div class="form-group mt20">
								<button class="btn btn-success float-right width-150 ml10" @click="postDiscussion()">
									Post
								</button>
								<button class="btn float-right width-150 ml10" @click="saveDraft">
									Save Draft
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
