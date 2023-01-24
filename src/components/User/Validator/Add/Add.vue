<script>

import App from '../../../../App.vue';
import { api, upload } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';
import DropZone from 'dropzone-vue';

import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal,
		DropZone
	},

	data() {
		return {
			thinking:            true,
			affiliated_nodes:    [],
			nodes_plural:        "this node",
			nodes_plural3:       "one",
			manually_adding:     false,
			finding_node:        false,
			node_verified:       false,
			message_downloaded:  false,
			github_clicked:      false,
			selected_validator:  '',
			signature_verified:  false,
		}
	},

	created() {
		this.findAffiliatedNodes();
	},

	mounted() {
		let that = this;

		if (this.$route.query.v) {
			this.thinking        = false;
			this.manually_adding = true;
			this.selected_validator = this.$route.query.v;
			this.verifyNode();
		}
	},

	methods: {
		startFlow() {
			this.manually_adding    = true;
			this.finding_node       = false;
			this.node_verified      = false;
			this.message_downloaded = false;
			this.signature_verified = false;
			this.selected_validator = '';
		},

		async findAffiliatedNodes() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/find-affiliated-nodes',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.affiliated_nodes = response.detail;
				this.thinking         = false;

				if (this.affiliated_nodes.length > 1) {
					this.nodes_plural  = "these nodes";
					this.nodes_plural3 = "some";
				}
			}
		},

		async autoAddNode(address) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');
			this.thinking = true;

			const response = await api(
				'POST',
				'user/add-affiliated-node',
				{
					address: address
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.$root.toast(
					'',
					`Successfully added ${this.$root.formatHash(address, 16)} to your account`,
					'success'
				);

				this.findAffiliatedNodes()
			}
		},

		async verifyNode() {
			if (
				this.selected_validator && 
				this.selected_validator != ''
			) {
				this.node_verified = false;
				this.finding_node  = true;

				let fetch_bearer_token = this.$cookies.get('bearer_token');

				const response = await api(
					'POST',
					'user/verify-node',
					{
						address: this.selected_validator
					},
					fetch_bearer_token
				);

				if (response.status == 200) {
					this.finding_node  = false;
					this.node_verified = true;
				}

				if (
					response.status == 400 ||
					response.status == 403
				) {
					this.finding_node = false;
					this.$root.toast(
						'',
						response.message,
						'error'
					);
				}
			}
		},

		saveTextFile(content) {
			let blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.setAttribute('download', 'message.txt');
			document.body.appendChild(link);
			link.click();
		},

		async downloadMessage() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/download-message',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.message_downloaded = true;

				if (response.message) {
					this.saveTextFile(response.message);
				}
			}
		},

		gotoGithub() {
			this.github_clicked = true;
			window.open('https://github.com/ledgerleapllc/caspersignerverifier');
		},

		async uploaded(event) {
			// console.log(event);
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/verify-node',
				{
					address: this.selected_validator
				},
				fetch_bearer_token
			);

			if (
				response.status == 200 &&
				response.message == 'You own this node'
			) {
				this.signature_verified = true;
				this.finding_node       = false;
				this.node_verified      = false;
				this.message_downloaded = false;
				this.manually_adding    = false;
			} else {
				this.$root.toast(
					'',
					'Your signature failed to verify. Please check your upload and try again',
					'error'
				);
			}
		},

		onErrorUpload(event) {
			console.log(event);
			this.$root.toast(
				'',
				'Your signature failed to verify. Please check your upload and try again',
				'error'
			);
		}
	},
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="card-title">
						Add a Validator Node
					</div>
					<div v-if="this.thinking" class="card-body">
						<ClipLoader size="25px" color="#ff2d2e"></ClipLoader>
					</div>
					<div v-else class="card-body">
						<div class="mb20" v-if="affiliated_nodes.length > 0">
							<p class="fs16 mb20">
								Hey! We found {{ nodes_plural3 }} of your affiliated nodes in the account info contract:
							</p>

							<code v-for="node in affiliated_nodes">
								{{ node }}&ensp;
								<i class="fa fa-check text-green"></i>
								<span class="bold text-green">Verified</span>
								<button class="fs12 btn btn-sm btn-success m5 bold" @click="autoAddNode(node)">
									<i class="fa fa-plus"></i>Add Node
								</button>
								<br>
							</code>

							<p class="fs16 mt20 mb20">
								Click above if you want to add {{ nodes_plural }} to your account.
							</p>
							<hr>
							<p>
								Or,
							</p>
						</div>

						<button v-if="!manually_adding" class="btn btn-success" @click="startFlow">
							Manually Add a Node
						</button>

						<form @submit.prevent v-if="manually_adding">
							<div class="form-group mt20">
								<p class="mb10">
									Add your validator below
								</p>

								<input class="form-control mb10 short-icon-end" type="text" name="" v-model="selected_validator">
								<i v-if="node_verified" class="fa fa-check text-green"></i>

								<button v-if="!finding_node" class="btn btn-success width-150 mr5" @click="verifyNode()">
									Verify My Node
								</button>
								<ClipLoader v-else size="15px" color="#ff2d2e" class="clip-loader-inline"></ClipLoader>

								<div v-if="node_verified">
									<p class="pt20">
										Thanks! Now you need to verify this node address is owned or controlled by you. Please follow the steps below:
									</p>

									<table class="table mt20">
										<tr>
											<td class="bold">
												1.
											</td>
											<td>
												Download this message file for signing
											</td>
											<td>
												<button class="btn btn-sm fs12 btn-success bold" @click="downloadMessage()">Download</button>
											</td>
										</tr>

										<tr v-if="message_downloaded">
											<td class="bold">
												2.
											</td>
											<td>
												Sign the message with your node key
											</td>
											<td>
												<button class="btn btn-sm fs12 btn-success bold" @click="gotoGithub()">Go to Github</button>
											</td>
										</tr>
										<tr v-else class="div-disabled">
											<td class="bold">
												2.
											</td>
											<td>
												Sign the message with your node key
											</td>
											<td>
												<button class="btn btn-sm fs12 btn-success bold">Go to Github</button>
											</td>
										</tr>

										<tr v-if="github_clicked">
											<td class="bold">
												3.
											</td>
											<td>
												Upload the signed file for the system to check
											</td>
											<td style="border: 3px dotted #ff2d2e; cursor: pointer;">
												<DropZone 
													:url="`${this.$root.api_url}/user/upload-signature`"
													:uploadOnDrop="true"
													:multipleUpload="false"
													:headers='{"Authorization": "Bearer " + this.$root.bearer_token}'
													:maxFileSize="256"
													@uploaded="uploaded"
													@errorUpload="onErrorUpload"
													ondragover="this.style.border='3px dashed #ff2d2e';"
													ondragleave="this.style.border='3px dotted #ff2d2e';"
													@errorAdd="this.$root.dropzone_error"
												></DropZone>
											</td>
										</tr>
										<tr v-else class="div-disabled">
											<td class="bold">
												3.
											</td>
											<td>
												Upload the signed file for the system to check
											</td>
											<td style="border: 3px dotted #ff2d2e; cursor: pointer;">
												<DropZone 
													url="http://api.camp.localhost/user/upload-signature"
													:uploadOnDrop="true"
													:multipleUpload="false"
													:headers='{"Authorization": "Bearer " + this.$root.bearer_token}'
													:maxFileSize="256"
													@uploaded="uploaded"
													@errorUpload="onErrorUpload"
												></DropZone>
											</td>
										</tr>
									</table>
								</div>
							</div>
						</form>

						<p v-if="signature_verified" class="mt20 fs18 text-green">
							<span class="fs12">{{ selected_validator }}</span>
							<br>
							Verified
							<i class="fa fa-check"></i>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

tr {
	height: 47px;
}

table .btn {
	background-color: #ff2d2e;
	color: #fff;
}

</style>