<script>

import App from '../../../App.vue';
import { api, upload } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import FaviconWhite from '@/assets/images/logo-white-2.png';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';
import DropZone from 'dropzone-vue';
import UserDropDownMenu from '../../User/DropDownMenu.vue';
import HelloSign from 'hellosign-embedded';

import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal,
		UserDropDownMenu,
		DropZone,
		HelloSign
	},

	data() {
		return {
			favicon_white:      FaviconWhite,
			hellosign_client:   null,
			sign_url:           null,
			thinking:           false,
			api_url:            import.meta.env.VITE_API_URL,
			action:             '', // terms, node, letter
			progressWidth:      'calc(33% - 12px)',
			esign_doc_url:      null,
			esign_doc_name:     '',
			clicked_doc:        false,
			verified_node:      false,
			verified_signature: false,
			message_downloaded: false,
			github_clicked:     false,
			letter_uploaded:    false
		}
	},

	created() {
		if (this.$root.admin_approved) {
			this.$root.routeTo('/u/dashboard');
		}
	},

	mounted() {
		let that = this;

		setInterval(function() {
			if (that.$root.esigned) {
				that.progressWidth = '66%';
			}

			if (!that.$root.unverified_node) {
				that.progressWidth = 'calc(100% - 1px)';
			}

			if (that.$root.letter) {
				that.progressWidth   = '100%';
				that.letter_uploaded = true;
			}
		},1000);

		this.getEsignDoc();
	},

	watch: {
	},

	methods: {
		async getEsignDoc() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-esign-doc',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.esign_doc_url  = response.detail.url;
				this.esign_doc_name = response.detail.name;
			}
		},

		open_document() {
			this.clicked_doc = true;
			window.open(this.esign_doc_url);
		},

		async begin_hello_sign() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');
			this.thinking = true;

			const response = await api(
				'POST',
				'user/post-hellosign',
				{},
				fetch_bearer_token
			);

			if (response.status == 200) {
				let that = this;
				// console.log(response);
				this.thinking         = false;
				this.sign_url         = response.detail.sign_url;
				this.hellosign_client = new HelloSign();

				// for dev testing
				if (this.sign_url == 'dev-pass') {
					this.$root.getMe();
					return;
				}

				this.hellosign_client.open(
					this.sign_url,
					{
						clientId: import.meta.env.VITE_HELLOSIGN_CLIENT_ID,
						// skipDomainVerification: true
					}
				);

				this.hellosign_client.on(
					'sign',
					(sig_data) => {
						console.log('HELLOSIGN SIGNED');
						console.log(sig_data);

						that.$root.esigned = true;
						that.hellosign_client.close();

						setTimeout(function() {
							that.$root.getMe();
						},2000);

						setTimeout(function() {
							that.$root.getMe();
						},4000);
					}
				);

				this.hellosign_client.on(
					'cancel',
					() => {
						console.log('HELLOSIGN CANCELLED');
						that.hellosign_client.close();
						that.thinking = true;

						setTimeout(function() {
							that.$root.getMe();
							that.thinking = false;
						},2000);
					}
				);

				this.hellosign_client.on(
					'decline',
					() => {
						console.log('HELLOSIGN DECLINED');
						that.hellosign_client.close();
						that.thinking = true;

						setTimeout(function() {
							that.$root.getMe();
							that.thinking = false;
						},2000);
					}
				);

				this.hellosign_client.on(
					'closed',
					() => {
						console.log('HELLOSIGN IFRAME CLOSED');
						that.hellosign_client.close();
						that.thinking = true;

						setTimeout(function() {
							that.$root.getMe();
							that.thinking = false;
						},2000);
					}
				);

				this.hellosign_client.on(
					'error',
					(err) => {
						console.log('HELLOSIGN ERROR');
						that.hellosign_client.close();

						that.$root.toast(
							'',
							`An error has occurred with Hellosign - Error code: ${err.code}. Please try again or contact your administrator`
						);

						setTimeout(function() {
							that.$root.getMe();
						},2000);
					}
				);
			} else {
				this.thinking = false;

				this.$root.toast(
					'',
					response.message,
					'error'
				);
			}
		},

		async verify_node() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');
			this.thinking = true;

			const response = await api(
				'POST',
				'user/verify-node',
				{
					address: this.$root.unverified_node
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.verified_node = true;
				this.thinking      = false;
			}

			if (
				response.status == 400 ||
				response.status == 403
			) {
				this.thinking      = false;
				this.verified_node = false;
				this.$root.toast(
					'',
					response.message,
					'error'
				);
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

		async uploaded_sig(event) {
			// console.log(event);
			this.verified_signature = false;
			let fetch_bearer_token  = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'user/verify-node',
				{
					address: this.$root.unverified_node
				},
				fetch_bearer_token
			);

			if (
				response.status == 200 &&
				response.message == 'You own this node'
			) {
				this.verified_signature = true;
				this.$root.getMe();
			} else {
				this.$root.toast(
					'',
					'Your signature failed to verify. Please check your upload and try again',
					'error'
				);
			}
		},

		onErrorUploadSig(event) {
			// console.log(event);
			this.$root.toast(
				'',
				'Your signature failed to verify. Please check your upload and try again',
				'error'
			);
		},

		async uploaded_letter(event) {
			// console.log(event);
			this.letter_uploaded = true;
			this.$root.getMe();
		},

		onErrorUploadLetter(event) {
			// console.log(event);
			this.$root.toast(
				'',
				'Failed to upload your letter to the server. Please check your connection and try again',
				'error'
			);
		},
	},
};

</script>

<template>
	<div 
		class="checker-top" 
		style="position: fixed;"
	></div>

	<div 
		class="checker-bottom" 
		style="position: fixed;"
	></div>

	<div class="signup-container">
		<img 
			:src="favicon_white" 
			class="nav-icon"
			@click="this.$root.routeTo('/')"
		>

		<button 
			class="btn btn-lime bold onboard-logout-btn"  
			@click="this.$root.logout()"
		>
			Logout
		</button>

		<div 
			v-if="action == ''" 
			class="container"
		>
			<div class="crown">
				<div
					class="crown-progress"
					:style="{ '--progressWidth': progressWidth }"
				>
				</div>
			</div>

			<div 
				class="row mt30" 
				:class="this.$root.isMobile ? 'mt80' : 'mt30'"
			>
				<div class="col-md-4 mt20">
					<div class="card">
						<div class="card-image"> 
							<img src="@/assets/images/esign-terms.png">
						</div>
						<div class="card-title">
							E-Sign Terms
							<span v-if="this.$root.esigned">
								<i class="fa fa-check text-green float-right mt5"></i>
							</span>
						</div>
						<div class="card-body float-vertical height-170">
							<p class="mb20">
								You must agree to the terms of service before you can access your portal.
							</p>

							<p 
								v-if="this.$root.esigned" 
								class="text-red fs16 bold"
							>
								Complete
							</p>

							<button 
								v-else 
								class="btn btn-lime" 
								@click="this.action = 'terms'"
							>
								Start
							</button>
						</div>
					</div>
				</div>
				<div class="col-md-4 mt20">
					<div 
						class="card" 
						:class="!this.$root.esigned ? 'div-disabled2' : ''"
					>
						<div class="card-image">
							<img src="@/assets/images/node-ownership.png">
						</div>
						<div class="card-title">
							Verify Node Ownership
							<span v-if="!this.$root.unverified_node">
								<i class="fa fa-check text-green float-right mt5"></i>
							</span>
						</div>
						<div class="card-body float-vertical height-170">
							<p class="mb20">
								If you are a node operator, you must verify the ownership of your node.
							</p>

							<p 
								v-if="!this.$root.unverified_node" 
								class="text-red fs16 bold"
							>
								Complete
							</p>

							<button 
								v-else 
								class="btn btn-lime" 
								@click="this.action = 'node'"
							>
								Start
							</button>
						</div>
					</div>
				</div>
				<div 
					class="col-md-4 mt20" 
					:class="this.$root.isMobile ? 'mb40' : ''"
				>
					<div 
						class="card" 
						:class="this.$root.unverified_node ? 'div-disabled2' : ''"
					>
						<div class="card-image">
							<img src="@/assets/images/letter-of-motivation.png">
						</div>
						<div class="card-title">
							Letter of Motivation
							<span v-if="this.$root.letter">
								<i class="fa fa-check text-green float-right mt5"></i>
							</span>
						</div>
						<div class="card-body float-vertical height-170">
							<p class="mb20">
								Write and upload a short letter of motivation outlining why you would like to sign up.
								&emsp;
								<span>
									////
								</span>
							</p>

							<p 
								v-if="this.$root.letter" 
								class="text-red fs16 bold"
							>
								Complete
							</p>

							<button 
								v-else 
								class="btn btn-lime" 
								@click="this.action = 'letter'"
							>
								Start
							</button>
						</div>
					</div>
				</div>
			</div>

			<div 
				class="row" 
				v-if="progressWidth == '100%'"
			>
				<div class="col-md-12">
					<p 
						class="mt30 text-white fs18 bold mb60" 
						style="position: relative;"
					>
						Finished! We sent you a follow up email. Please wait for an admin to review your account. This could take 24 hours.
					</p>
				</div>
			</div>
		</div>

		<div 
			v-else-if="action == 'terms'" 
			class="container onboard-max-width"
		>
			<div class="row">
				<div class="col-md-12 mt20">
					<div class="card">
						<div class="card-title">
							E-Sign Terms
						</div>
						<div class="card-body">
							<p class="fs20">
								Now, you must sign the Membership Agreement
							</p>
							<p class="mt20">
								Clicking the icons below will open them up on a new tab for viewing before you sign. On the next screen, you will electronically sign these documents. Please click next to proceed after your are done reviewing.
							</p>

							<div 
								class="mt40 pointer inline" 
								@click="open_document"
							>
								<img 
									class="doc-img" 
									src="@/assets/images/letter.png"
								>

								<p>
									{{ this.$root.formatHash(esign_doc_name, 16) }}
								</p>
							</div>

							<div 
								v-if="this.$root.esigned" 
								class="pt50"
							>
								<button 
									class="btn btn-lime float-right" 
									@click="this.action = ''"
								>
									<i class="fa fa-check fs18 mr5"></i>
									Complete
								</button>
							</div>

							<div v-else class="pt50">
								<button 
									class="btn btn-lime" 
									@click="this.action = ''"
								>
									Back
								</button>

								<div class="float-right">
									<ClipLoader 
										v-if="this.thinking" 
										size="25px" 
										color="#ff2d2e" 
										class="clip-loader-inline"
									></ClipLoader>

									<button 
										v-else 
										class="btn btn-lime" 
										:class="clicked_doc ? '' : 'div-disabled'" 
										@click="begin_hello_sign"
									>
										<i 
											v-if="clicked_doc" 
											class="fa fa-pencil fs18 mr5"
										></i>
										Go to E-Sign
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div 
			v-else-if="action == 'node'" 
			class="container onboard-max-width"
		>
			<div class="row">
				<div class="col-md-12 mt20">
					<div class="card">
						<div class="card-title">
							Verify Node Ownership
						</div>
						<div class="card-body">
							<p class="fs20">
								Please enter the public address of your validator node and press verify
							</p>

							<div class="form-group pt40">
								<form @submit.prevent>
									<input 
										class="form-control mb5" 
										type="text" 
										placeholder="Validator Public Key" 
										:value="this.$root.unverified_node"
									>
									<button 
										@click="verify_node" 
										class="btn btn-lime mt10"
									>
										Verify
									</button>

									<i 
										v-if="verified_node" 
										class="fa fa-check fs18 text-green ml10"
									></i>
									<ClipLoader 
										v-if="this.thinking" 
										size="25px" 
										color="#ff2d2e" 
										class="clip-loader-inline"
									></ClipLoader>
								</form>
							</div>

							<div v-if="verified_node">
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
											<button 
												class="btn btn-sm width-150 fs12 btn-lime bold" 
												@click="downloadMessage()"
											>
												Download
											</button>
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
											<button 
												class="btn btn-sm width-150 fs12 btn-lime bold" 
												@click="gotoGithub()"
											>
												Go to Github
											</button>
										</td>
									</tr>
									<tr 
										v-else 
										class="div-disabled"
									>
										<td class="bold">
											2.
										</td>
										<td>
											Sign the message with your node key
										</td>
										<td>
											<button 
												class="btn btn-sm fs12 btn-lime bold"
												@click="gotoGithub()"
											>
												Go to Github
											</button>
										</td>
									</tr>

									<tr v-if="github_clicked">
										<td class="bold">
											3.
										</td>
										<td>
											Upload the signed file for the system to check
										</td>
										<td>
											<DropZone 
												:url="`${api_url}/user/upload-signature`"
												:uploadOnDrop="true"
												:multipleUpload="false"
												:headers='{"Authorization": "Bearer " + this.$root.bearer_token}'
												:maxFileSize="256"
												@uploaded="uploaded_sig"
												@errorUpload="onErrorUploadSig"
												dropzoneClassName="dropzone-wrap"
												ondragover="this.style.border='3px dashed #ff2d2e';"
												ondragleave="this.style.border='3px dotted #ff2d2e';"
												@errorAdd="this.$root.dropzone_error"
											></DropZone>
										</td>
									</tr>
									<tr 
										v-else 
										class="div-disabled"
									>
										<td class="bold">
											3.
										</td>
										<td>
											Upload the signed file for the system to check
										</td>
										<td>
											<DropZone 
												:url="`${api_url}/user/upload-signature`"
												:uploadOnDrop="true"
												:multipleUpload="false"
												:headers='{"Authorization": "Bearer " + this.$root.bearer_token}'
												:maxFileSize="256"
												@uploaded="uploaded_sig"
												@errorUpload="onErrorUploadSig"
												dropzoneClassName="dropzone-wrap"
											></DropZone>
										</td>
									</tr>
								</table>
							</div>

							<div class="mt50">
								<button 
									class="btn btn-lime" 
									@click="this.action = ''"
								>
									Back
								</button>
								<button 
									class="btn btn-lime float-right" 
									:class="verified_signature ? '' : 'div-disabled'" 
									@click="this.action = ''"
								>
									<i 
										v-if="verified_signature" 
										class="fa fa-check fs18 mr5"
									></i>
									Complete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div 
			v-else-if="action == 'letter'" 
			class="container onboard-max-width"
		>
			<div class="row">
				<div class="col-md-12 mt20">
					<div class="card">
						<div class="card-title">
							Upload Letter of Motivation
						</div>
						<div class="card-body">
							<p class="fs16 mt10">
								Write and upload a short letter of motivation outlining why you would like to sign up.
							</p>

							<p class="fs16 mt20">
								Drag and drop a file below. Accepts *.txt, *.rtf, *.doc, *.pdf
							</p>

							<div style="margin-top: 20px;">
								<DropZone 
									:url="`${api_url}/user/upload-letter`"
									:uploadOnDrop="true"
									:multipleUpload="false"
									:headers='{"Authorization": "Bearer " + this.$root.bearer_token}'
									:maxFileSize="2000000"
									@uploaded="uploaded_letter"
									@errorUpload="onErrorUploadLetter"
									dropzoneClassName="dropzone-wrap"
									:acceptedFiles="['txt', 'rtf', 'doc', 'docx', 'pdf']"
									ondragover="this.style.border='3px dashed #ff2d2e';"
									ondragleave="this.style.border='3px dotted #ff2d2e';"
									@errorAdd="this.$root.dropzone_error"
								></DropZone>
							</div>

							<div class="mt50">
								<button 
									class="btn btn-lime" 
									@click="this.action = ''"
								>
									Back
								</button>
								<button 
									class="btn btn-lime float-right" 
									:class="letter_uploaded ? '' : 'div-disabled'" 
									@click="this.action = ''"
								>
									<i 
										v-if="letter_uploaded" 
										class="fa fa-check fs18 mr5"
									></i>
									Complete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.div-disabled2 {
	opacity: 0.25;
	pointer-events: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.card {
	border: none;
	position: relative;
	background: transparent;
}

.crown {
	width: 100%;
	height: 8px;
	background: rgba(207, 207, 207, 0.4);
	margin-bottom: 30px;
	position: relative;
}

.crown-progress {
	position: absolute;
	top: 0;
	left: 0;
	/*width: calc(33% - 12px);*/
	width: var(--progressWidth);
	height: 8px;
	background-color: #BCFC07;
	margin-bottom: 30px;
	transition: 0.7s ease-in-out;
}

.doc-img {
	width: 60px;
}

.card-title {
	font-size: 18px;
	padding-left: 25px;
	padding-right: 25px;
	background-color: #fff;
	margin-bottom: 0;
}

.card-body {
	padding: 25px 30px;
	background-color: #fff;
}

.height-170 {
	height: 170px;
}

.onboard-max-width {
	max-width: 991px;
}

.card-image {
	width: 100%;
	height: 200px;
	background-color: #fff;
	display: flex;
	align-items: center;
}

.card-image img {
	height: 68%;
	/*width: 70%;*/
	margin-left: 25px;
}

.onboard-logout-btn {
	position: absolute;
	right: 30px;
	top: 30px;
}

.nav-icon {
	width: auto;
	height: 44px;
	position: absolute;
	left: 25px;
	top: 30px;
	cursor: pointer;
}

.onboard-section {
	display: flex;
	flex-direction: row;
	height: 450px;
	overflow-y: scroll;
}

.onboard-section-left {
	width: 270px;
	height: 450px;
	background-size: cover;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 15px;
}

.onboard-section-right {
	width: calc(100% - 270px);
	padding: 15px;
}

.onboard-progress-wrap {
	position: absolute;
	z-index: 2; 
	height: 4px; 
	width: 100%; 
	background-color: #cacbcc;
}

.onboard-progress {
	position: absolute; 
	top: 0; 
	left: 0; 
	height: 100%; 
	width: var(--progressWidth);
	background-color: #BCFC07;
	transition: 0.7s ease-in-out;
}

tr {
	height: 47px;
}

table .btn {
	background-color: #ff2d2e;
	color: #fff;
}

.check-circle {
	position: absolute;
	top: 30px;
	left: 30px;
}

.check-circle img {
	width: 30px;
	height: 30px;
	filter: brightness(255);
	-o-filter: brightness(255);
	-ms-filter: brightness(255);
	-moz-filter: brightness(255);
	-webkit-filter: brightness(255);
}

.dropzone-wrap {
	border: 3px dotted #ff2d2e; 
	cursor: pointer; 
	padding: 15px;
	margin-top: 10px; 
	overflow: hidden;
}

@media all and (max-width: 991px) {
	.height-170 {
		height: 220px;
	}
}

@media all and (max-width: 767px) {
	.onboard-section {
		height: auto;
		max-height: calc(100vh - 300px);
		flex-direction: column;
	}

	.onboard-section-left {
		width: 100%;
		height: auto;
		max-height: calc(100vh - 300px);
	}

	.onboard-section-right {
		width: 100%;
	}

	.onboard-logout-btn {
		right: 12px;
	}
}

</style>