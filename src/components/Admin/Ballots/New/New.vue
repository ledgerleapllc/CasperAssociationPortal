<script>

import App from '../../../../App.vue';
import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import Datepicker from '@vuepic/vue-datepicker';
import DropZone from 'dropzone-vue';

import '@vuepic/vue-datepicker/dist/main.css'

export default {
	components: {
		Popper,
		ClipLoader,
		Datepicker,
		DropZone
	},

	data() {
		return {
			uri_category:  this.$route.params.category,
			start_time:    null,
			end_time:      null,
			show_dropzone: true,
			file_url:      '',
			file_name:     ''
		}
	},

	created() {
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
		async createBallot() {
			let title          = this.$refs["title"].value;
			let description    = this.$refs["description"].value;

			let formatted_start_time = '';
			let formatted_end_time   = '';

			if (!this.start_time) {
				formatted_start_time = false;
			} else if (typeof this.start_time.toISOString == 'function') {
				formatted_start_time = this.$root.formatDateWithZone(this.start_time)
			} else if (this.start_time.includes("Z")) {
				formatted_start_time = this.$root.formatZDate(this.start_time)
			} else {
				formatted_start_time = this.start_time;
			}

			if (!this.end_time) {
				formatted_end_time = false;
			} else if (typeof this.end_time.toISOString == 'function') {
				formatted_end_time = this.$root.formatDateWithZone(this.end_time)
			} else if (this.end_time.includes("Z")) {
				formatted_end_time = this.$root.formatZDate(this.end_time)
			} else {
				formatted_end_time = this.end_time;
			}

			if (
				!formatted_start_time ||
				formatted_start_time == ''
			) {
				this.$root.toast(
					'', 
					'Start time required', 
					'error'
				);
				return;
			}

			if (
				!formatted_end_time ||
				formatted_end_time == ''
			) {
				this.$root.toast(
					'', 
					'End time required', 
					'error'
				);
				return;
			}

			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/create-ballot',
				{
					"title":       title,
					"description": description,
					"start_time":  formatted_start_time,
					"end_time":    formatted_end_time,
					"file_url":    this.file_url,
					"file_name":   this.file_name
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.$root.routeTo('/a/ballots/active');

				this.$root.toast(
					'', 
					response.message, 
					'success'
				);
			} else {
				this.$root.toast(
					'Oops', 
					response.message, 
					'error'
				);
			}
		},

		async ballotFileUploaded(event, req) {
			let that = this;

			new Promise((resolve, reject) => {
				let i = 0;

				let f = setInterval(function() {
					if (req.response) {
						let j = JSON.parse(req.response);

						if (j.detail) {
							console.log(j.detail);
							that.file_url  = j.detail.file_url;
							that.file_name = j.detail.file_name;
							clearInterval(f);
							resolve(j.detail);
						}
					}

					i += 1;

					if (i >= 50) {
						clearInterval(f);
						reject('');
					}
				}, 100);
			});
		},

		ballotFileUploadError(event) {
			console.log(event);
			this.$root.toast(
				'Oops',
				'There was a problem uploading ballot file at this time',
				'error'
			);
		}
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12 mt20">
				<div 
					class="go-back" 
					@click="this.$router.back()"
				>
					<i class="fa fa-arrow-left"></i>
					Cancel
				</div>
				<div class="card mt20">
					<div class="card-title">
						Create a Ballot
					</div>
					<div class="card-body">
						<form @submit.prevent>
							<div class="form-group mt20">
								<input 
									class="form-control" 
									type="text" 
									placeholder="Title" 
									ref="title"
								>

								<p class="mt20 fs12 op5">
									(MCE editor coming soon)
								</p>

								<textarea 
									class="form-control fs14 height-200" 
									placeholder="Write your content here" 
									ref="description"
								></textarea>
							</div>

							<div class="max-width-300">
								<p class="mt20">
									Start Time
								</p>
								<Datepicker 
									v-model="start_time" 
									class="mt10"
									:format="'yyyy/MM/dd HH:mm'"
									:preview-format="'yyyy/MM/dd HH:mm'"
									utc
								></Datepicker>
							</div>

							<div class="max-width-300">
								<p class="mt20">
									End Time
								</p>
								<Datepicker 
									v-model="end_time" 
									class="mt10"
									:format="'yyyy/MM/dd HH:mm'"
									:preview-format="'yyyy/MM/dd HH:mm'"
									utc
								></Datepicker>
							</div>

							<p class="mt20">
								Attach File
							</p>

							<DropZone 
								v-if="show_dropzone"
								:url="`${this.$root.api_url}/admin/upload-ballot-file`"
								:uploadOnDrop="true"
								:multipleUpload="false"
								:headers='{"Authorization": "Bearer " + this.$root.bearer_token}'
								:maxFileSize="4194304"
								@sending="ballotFileUploaded"
								@errorUpload="ballotFileUploadError"
								dropzoneClassName="dropzone-wrap"
								:acceptedFiles="['pdf', 'png', 'jpg', 'jpeg']"
								ondragover="this.style.border='3px dashed #ff2d2e';"
								ondragleave="this.style.border='3px dotted #ff2d2e';"
								@errorAdd="this.$root.dropzone_error"
							></DropZone>

							<div class="form-group mt20">
								<button 
									class="btn btn-success float-right width-150 ml10" 
									@click="createBallot()"
								>
									Create Ballot
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.dropzone-wrap {
	border: 3px dotted #ff2d2e; 
	cursor: pointer; 
	padding: 15px;
	margin-top: 10px; 
	overflow: hidden;
}

textarea {
	white-space: pre;
}

</style>