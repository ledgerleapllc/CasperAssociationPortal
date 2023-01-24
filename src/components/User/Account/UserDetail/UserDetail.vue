<script>

import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import iziModal from 'izimodal/js/iziModal';
import QrcodeVue from 'qrcode.vue';
import { Modal } from 'vue-neat-modal';
import VueAvatarUpload from 'vue-avatar-upload';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import { copyText } from 'vue3-clipboard';

import 'vue-avatar-upload/lib/style.css';
import 'vue-neat-modal/dist/vue-neat-modal.css';

$.fn.iziModal = iziModal;

export default {
	data() {
		return {
			uri_category: this.$route.params.category,

			old_pw:      '',
			new_pw:      '',
			new_pw2:     '',
			min8chars:   false,
			onenumber:   false,
			specialchar: false,

			new_email:   '',

			totp_enable: this.$root.totp == 1 ? true : false,
			totp_provisioning_uri: '',
			totp_secret:           '',
			qrModalIsOpen:         false,
			qrModalIsOpen2:        false,
			askDisableTotp:        false,
			avatarModalOpen:       false,
			isClickOut:            false,
			qrsize:                370,
			totpHash:              '',

			pii: {
				first_name:  this.$root.pii.first_name,
				middle_name: this.$root.pii.middle_name,
				last_name:   this.$root.pii.last_name,
				dob:         this.$root.pii.dob,
				phone:       this.$root.pii.phone
			},

			entity_pii: {
				entity_name:          null,
				entity_type:          null,
				registration_number:  null,
				registration_country: null,
				tax_id:               null,
				document_url:         null,
				document_page:        0
			},

			saving_pii: false,

			api_url: import.meta.env.VITE_API_URL
		}
	},

	components: {
		iziModal,
		QrcodeVue,
		Modal,
		VueAvatarUpload,
		ClipLoader
	},

	mounted() {
		let that = this;

		if (this.$root.account_type == 'entity') {
			this.fetchEntityPii();
		}
	},

	watch: {},

	methods: {
		async fetchEntityPii() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-entity-pii',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response.detail);
				this.entity_pii = response.detail;
			}
		},

		copyDocumentUrl(e) {
			let that    = this;
			let doc_url = this.$refs.doc_url.value;
			copyText(doc_url, undefined, function(e) {
				that.$root.toast(
					"Document URL copied to clipboard", 
					"", 
					"info"
				);
			});
		},

		async savePii() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');
			this.saving_pii        = true;

			const response = await api(
				'PUT',
				'user/save-pii',
				{
					first_name:  this.pii.first_name,
					middle_name: this.pii.middle_name,
					last_name:   this.pii.last_name,
					phone:       this.pii.phone
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.saving_pii = false;
				let meLoaded    = await this.$root.getMe();

				if (meLoaded) {
					this.pii = {
						first_name:  this.$root.pii.first_name,
						middle_name: this.$root.pii.middle_name,
						last_name:   this.$root.pii.last_name,
						dob:         this.$root.pii.dob,
						phone:       this.$root.pii.phone
					}
				}

				this.$root.toast(
					'',
					response.message,
					'success'
				);
			} else {
				this.saving_pii = false;
				this.$root.toast(
					'',
					response.message,
					'error'
				);
			}
		},

		popupModal(
			modal_name, 
			easy_close = true,
			reset_data = false
		) {
			let that = this;
			let modal_id = `#${modal_name}Modal`;
			let submit_btn_id = `#button-${modal_name}Modal`;
			let submit_func = `${modal_name}ModalSubmit`;

			$(modal_id).iziModal('destroy')
			$("body").off('click', submit_btn_id)

			let modal = $(modal_id).iziModal({
				appendTo: false,
				theme: 'light',
				closeOnEscape: easy_close,
				closeButton: easy_close,
				overlayClose: easy_close,
				onClosing: (event) => {
					if (reset_data) {
						that.totp_enable = !that.totp_enable;
					}
				}
			})

			this.$root.global_izimodal = modal;

			$(modal_id).iziModal('open')

			$("body").on('click', submit_btn_id, function() {
				that[submit_func](modal, modal_id);
			})
		},

		async handleModalAjaxResponse(response, modal_id) {
			$(modal_id).iziModal('stopLoading');
			let msg = response.message;

			if (!response.message) {
				if (response.detail.hasOwnProperty('message')) {
					msg = response.detail.message;
				}

				if (response.detail.hasOwnProperty('instructions')) {
					msg = response.detail.instructions;
				}
			}

			if (response.status == 200) {
				$(modal_id).iziModal('close');
				this.$root.toast('Success', msg, 'success');
				this.$root.getMe();
			}

			if (response.status >= 400 && response.status < 500) {
				this.$root.toast('Error', msg, 'error');
			}

			if (response.status == 500) {
				this.$root.toast('Error', 'An unknown error has occurred. Please check your internet connection', 'error');
			}
		},

		async updateEmailModalSubmit(modal, modal_id) {
			this.new_email = $(modal).find('#input-updateEmailModal').val();

			if (this.new_email) {
				$(modal_id).iziModal('startLoading')

				const mfa_response = await api(
					'POST', 
					'user/send-mfa', 
					{},
					this.$root.bearer_token
				);

				if (mfa_response) {
					this.handleModalAjaxResponse(mfa_response, modal_id);
				}

				if (mfa_response.status == 200) {
					this.popupModal('updateEmailMfa');
				}
			}
		},

		async updateEmailMfaModalSubmit(modal, modal_id) {
			let mfa_code = $(modal).find('#input-updateEmailMfaModal').val();

			if (mfa_code) {
				$(modal_id).iziModal('startLoading')

				const confirm_response = await api(
					'POST', 
					'user/confirm-mfa', 
					{
						mfa_code: mfa_code
					},
					this.$root.bearer_token
				);

				if (confirm_response) {
					if (confirm_response.status == 200) {
						$(modal_id).iziModal('close');
					}

					if (confirm_response.status >= 400 && confirm_response.status < 500) {
						this.$root.toast('Error', confirm_response.message, 'error');
						return;
					}

					if (confirm_response.status == 500) {
						this.$root.toast('Error', 'An unknown error has occurred. Please check your internet connection', 'error');
						return;
					}
				}

				if (confirm_response.status == 200) {
					const update_response = await api(
						'PUT', 
						'user/update-email', 
						{
							new_email: this.new_email
						},
						this.$root.bearer_token
					);

					if (update_response) {
						this.handleModalAjaxResponse(update_response, modal_id);
						this.popupModal('updateEmailConfirm');
					}
				}
			}
		},

		async updateEmailConfirmModalSubmit(modal, modal_id) {
			let confirm_code = $(modal).find('#input-updateEmailConfirmModal').val();

			if (confirm_code) {
				$(modal_id).iziModal('startLoading')

				const update_response = await api(
					'POST', 
					'user/confirm-update-email', 
					{
						mfa_code: confirm_code
					},
					this.$root.bearer_token
				);

				if (update_response) {
					this.handleModalAjaxResponse(update_response, modal_id);
				}
			}
		},

		async updatePasswordModalSubmit(modal, modal_id) {
			this.old_pw  = $(modal).find('#input1-updatePasswordModal').val();
			this.new_pw  = $(modal).find('#input2-updatePasswordModal').val();
			this.new_pw2 = $(modal).find('#input3-updatePasswordModal').val();

			if (
				this.old_pw && this.old_pw != '' &&
				this.new_pw && this.new_pw != '' &&
				this.new_pw2 && this.new_pw2 != ''
			) {
				if(this.old_pw == this.new_pw) {
					this.$root.toast('Oops', "New password can't be the same as your old password", 'warning');
					return;
				}

				if(this.new_pw != this.new_pw2) {
					this.$root.toast('Oops', "Passwords do not match", 'warning');
					return;
				}

				this.checkNewPassword();

				if (!this.min8chars || !this.onenumber || !this.specialchar) {
					this.$root.toast('Password', 'New password does not meet complexity requirements', 'warning');
					return;
				}

				$(modal_id).iziModal('startLoading')

				const mfa_response = await api(
					'POST', 
					'user/send-mfa', 
					{},
					this.$root.bearer_token
				);

				if (mfa_response) {
					this.handleModalAjaxResponse(mfa_response, modal_id);
				}

				if (mfa_response.status == 200) {
					this.popupModal('updatePasswordMfa');
				}
			}
		},

		async updatePasswordMfaModalSubmit(modal, modal_id) {
			let mfa_code = $(modal).find('#input-updatePasswordMfaModal').val();

			if (mfa_code) {
				$(modal_id).iziModal('startLoading')

				const confirm_response = await api(
					'POST', 
					'user/confirm-mfa', 
					{
						mfa_code: mfa_code
					},
					this.$root.bearer_token
				);

				if (confirm_response) {
					if (confirm_response.status >= 400 && confirm_response.status < 500) {
						this.$root.toast('Error', confirm_response.message, 'error');
						return;
					}

					if (confirm_response.status == 500) {
						this.$root.toast('Error', 'An unknown error has occurred. Please check your internet connection', 'error');
						return;
					}
				}

				if (confirm_response.status == 200) {
					const update_response = await api(
						'PUT', 
						'user/update-password', 
						{
							new_password: this.new_pw
						},
						this.$root.bearer_token
					);

					if (update_response) {
						this.handleModalAjaxResponse(update_response, modal_id);
					}
				}
			}
		},

		checkNewPassword() {
			if (this.new_pw.length >= 8) {
				this.min8chars = true;
			} else {
				this.min8chars = false;
			}

			let number_pattern = /([0-9])+/g;

			if (number_pattern.test(this.new_pw)) {
				this.onenumber = true;
			} else {
				this.onenumber = false;
			}

			let special_pattern = /\W|_/g;

			if (special_pattern.test(this.new_pw)) {
				this.specialchar = true;
			} else {
				this.specialchar = false;
			}
		},

		async enableMfaModalSubmit(modal, modal_id) {
			$(modal_id).iziModal('startLoading')

			const mfa_response = await api(
				'POST', 
				'user/send-mfa', 
				{},
				this.$root.bearer_token
			);

			if (mfa_response) {
				this.handleModalAjaxResponse(mfa_response, modal_id);
			}

			if (mfa_response.status == 200) {
				this.popupModal('enableMfaMfa');
			}
		},

		async enableMfaMfaModalSubmit(modal, modal_id) {
			let mfa_code = $(modal).find('#input-enableMfaMfaModal').val();

			if (mfa_code) {
				$(modal_id).iziModal('startLoading')

				const confirm_response = await api(
					'POST', 
					'user/confirm-mfa', 
					{
						mfa_code: mfa_code
					},
					this.$root.bearer_token
				);

				if (confirm_response) {
					if (confirm_response.status >= 400 && confirm_response.status < 500) {
						this.$root.toast('Error', confirm_response.message, 'error');
						return;
					}

					if (confirm_response.status == 500) {
						this.$root.toast('Error', 'An unknown error has occurred. Please check your internet connection', 'error');
						return;
					}
				}

				if (confirm_response.status == 200) {
					const update_response = await api(
						'PUT', 
						'user/update-mfa', 
						{
							active: 1
						},
						this.$root.bearer_token
					);

					if (update_response) {
						this.handleModalAjaxResponse(update_response, modal_id);
					}
				}
			}
		},

		async disableMfaModalSubmit(modal, modal_id) {
			$(modal_id).iziModal('startLoading')

			const mfa_response = await api(
				'POST', 
				'user/send-mfa', 
				{},
				this.$root.bearer_token
			);

			if (mfa_response) {
				this.handleModalAjaxResponse(mfa_response, modal_id);
			}

			if (mfa_response.status == 200) {
				this.popupModal('disableMfaMfa');
			}
		},

		async disableMfaMfaModalSubmit(modal, modal_id) {
			let mfa_code = $(modal).find('#input-disableMfaMfaModal').val();

			if (mfa_code) {
				$(modal_id).iziModal('startLoading')

				const confirm_response = await api(
					'POST', 
					'user/confirm-mfa', 
					{
						mfa_code: mfa_code
					},
					this.$root.bearer_token
				);

				if (confirm_response) {
					if (confirm_response.status >= 400 && confirm_response.status < 500) {
						this.$root.toast('Error', confirm_response.message, 'error');
						return;
					}

					if (confirm_response.status == 500) {
						this.$root.toast('Error', 'An unknown error has occurred. Please check your internet connection', 'error');
						return;
					}
				}

				if (confirm_response.status == 200) {
					const update_response = await api(
						'PUT', 
						'user/update-mfa', 
						{
							active: 0
						},
						this.$root.bearer_token
					);

					if (update_response) {
						this.handleModalAjaxResponse(update_response, modal_id);
					}
				}
			}
		},

		askTotp(event) {
			if (this.$root.totp == 0) {
				this.enableTotp()
			} else {
				this.askDisableTotp = true;
			}
		},

		cancelTotp() {
			this.qrModalIsOpen = false;
			this.qrModalIsOpen2 = false;
			this.totp_enable = false;
		},

		cancelAskDisableTotp() {
			this.askDisableTotp = false;
			this.totp_enable = true;
		},

		async enableTotp() {
			const response = await api(
				'PUT', 
				'user/update-totp', 
				{
					active: 1
				},
				this.$root.bearer_token
			);

			if (response) {
				if (response.status >= 400 && response.status < 500) {
					this.$root.toast('Error', response.message, 'error');
					return;
				}

				if (response.status == 500) {
					this.$root.toast('Error', 'An unknown error has occurred. Please check your internet connection', 'error');
					return;
				}

				if (response.status == 200) {
					if (response.detail.hasOwnProperty('provisioning_uri')) {
						this.totp_provisioning_uri = response.detail.provisioning_uri;
						let split = this.totp_provisioning_uri.split('&issuer')[0];
						split = split.split('?secret=');
						this.totp_secret = split.length > 1 ? split[1] : '';
						this.qrModalIsOpen = true;
					} else {
						let message = response.detail.message;
						this.totpHash = response.detail.hash;
						this.qrModalIsOpen2 = true;
					}
				}
			}
		},

		async submitTotpCode() {
			let totp_code = $("#input-totpCode").val();

			if (totp_code) {
				const confirm_response = await api(
					'POST', 
					'user/confirm-totp', 
					{
						totp_code: totp_code
					},
					this.$root.bearer_token
				);

				if (confirm_response) {
					if (confirm_response.status >= 400 && confirm_response.status < 500) {
						this.$root.toast('Oops', confirm_response.message, 'error');
						return;
					}

					if (confirm_response.status == 500) {
						this.$root.toast('Error', 'An unknown error has occurred. Please check your internet connection', 'error');
						return;
					}

					if (confirm_response.status == 200) {
						this.$root.toast('Success', confirm_response.message, 'success');
						this.$root.getMe();
						this.totp_provisioning_uri = '';
						this.totp_secret = '';
						this.qrModalIsOpen = false;
						this.totp_enable = true;
					}
				}
			}
		},

		async reSubmitTotpCode() {
			let totp_code = $("#input-totpCode2").val();

			if (totp_code) {
				const confirm_response = await api(
					'POST', 
					'user/confirm-totp', 
					{
						totp_code: totp_code
					},
					this.$root.bearer_token
				);

				if (confirm_response) {
					if (confirm_response.status >= 400 && confirm_response.status < 500) {
						this.$root.toast('Oops', confirm_response.message, 'error');
						return;
					}

					if (confirm_response.status == 500) {
						this.$root.toast('Error', 'An unknown error has occurred. Please check your internet connection', 'error');
						return;
					}

					if (confirm_response.status == 200) {
						this.$root.toast('Success', confirm_response.message, 'success');
						this.$root.getMe();
						this.qrModalIsOpen2 = false;
						this.totp_enable = true;
					}
				}
			}
		},

		async disableTotp() {
			const response = await api(
				'PUT', 
				'user/update-totp', 
				{
					active: 0
				},
				this.$root.bearer_token
			);

			if (response) {
				this.handleModalAjaxResponse(response, '')
			}

			if (response.status == 200) {
				this.totp_enable = false;
				this.askDisableTotp = false;
			}
		},

		async generateNewTotpModalSubmit(modal, modal_id) {
			const response = await api(
				'POST', 
				'user/new-totp', 
				{},
				this.$root.bearer_token
			);

			if (response) {
				this.handleModalAjaxResponse(response, modal_id)
			}

			if (response.status == 200) {
				this.totp_provisioning_uri = response.detail.provisioning_uri;
				let split = this.totp_provisioning_uri.split('&issuer')[0];
				split = split.split('?secret=');
				this.totp_secret = split.length > 1 ? split[1] : '';
				this.qrModalIsOpen = true;
			}
		},

		avatarSuccess(msg) {
			this.avatarModalOpen = false;
			this.$root.toast(
				'Success',
				'Avatar image updated!',
				'success'
			);
			this.$root.getMe();
		},

		avatarError(err) {
			let code = err.message;
			let msg = 'There was a problem updating your avatar at this time. Please try again later';

			if (code == 'Too Many Requests') {
				msg = 'You are trying to change your avatar too often.';
			} else if (code == 'Unsupported Media Type') {
				msg = '';
			}  else if (code == 'Request Entity Too Large') {
				msg = 'Avatar image too large. Cannot exceed 1 MB';
			}

			this.$root.toast(
				'Oops',
				msg,
				'error'
			);
		},
	}
};

</script>

<template>
	<div class="container-lg pt15">
		<div class="row pt30">
			<div class="col-12 plr20">
				<div class="avatar-block">
					<div class="avatar-block-img">
						<img :src="this.$root.avatar_url" @click="avatarModalOpen = true">
					</div>
					<div class="avatar-block-content">
						<h6 class="bold">
							<i class="fa fa-cog"></i>
							Account Settings
						</h6>
					</div>
				</div>
			</div>
		</div>

		<div class="row pt20">
			<div class="col-12">
				<hr>
			</div>
			<div class="col-6 pt15">
				<h6 class="bold">Email Address</h6>
				<p>{{ this.$root.email }}</p>
			</div>

			<div class="col-6 plr20 align-right">
				<button class="btn btn-success btn-sm" @click="popupModal('updateEmail')">Update Email</button>
			</div>
		</div>

		<div class="row pt20">
			<div class="col-12">
				<hr>
			</div>
			<div class="col-6 pt15">
				<h6 class="bold">Password</h6>
				<p>************</p>
			</div>

			<div class="col-6 plr20 align-right">
				<button class="btn btn-success btn-sm" @click="popupModal('updatePassword')">Reset Password</button>
			</div>
		</div>

		<div class="row pt20">
			<div class="col-12">
				<hr>
			</div>
			<div class="col-6 pt15">
				<h6 class="bold">Multi-Factor Authentication</h6>
				<p>{{ this.$root.twofa == 1 ? 'Enabled' : 'Disabled' }}</p>
			</div>

			<div class="col-6 plr20 align-right">
				<button v-if="this.$root.twofa == 1" class="btn btn-black btn-sm" @click="popupModal('disableMfa')">Disable MFA</button>
				<button v-else class="btn btn-success btn-sm" @click="popupModal('enableMfa')">Enable MFA</button>
			</div>

			<div v-if="this.$root.twofa == 1" class="col-12 pt15">
				<div class="form-check form-switch">
					<input 
						class="form-check-input pointer" 
						name="checkbox1" 
						id="checkbox1-2" 
						type="checkbox"
						v-model="totp_enable"
						@change="askTotp"
					>
					<label class="form-check-label pointer" for="checkbox1-2">
						Authenticator based (TOTP) MFA
					</label>
				</div>

				<p class="op7 fs14">
					Authenticator key set. 
					<span class="pointer green underline" @click="popupModal('generateNewTotp')">
						<u>Generate New Key</u>
					</span>
				</p>
			</div>
		</div>

		<div class="row pt20">
			<div class="col-12">
				<hr>
			</div>
			<div class="col-sm-6 pt15">
				<h6 class="bold">
					Personal Information
					<span 
						v-if="this.$root.kyc_status == 'approved'"
						class="op6 fs12"
					>
						&ensp;(Locked to KYC approval)
					</span>
				</h6>

				<div class="form-group">
					<p class="mt20 op7">
						First Name
					</p>
					<input
						class="form-control" 
						:class="this.$root.kyc_status == 'approved' ? 'div-disabled' : ''"
						v-model="pii.first_name"
						autocomplete="off"
					>

					<p class="mt10 op7">
						Middle Name (initial)
					</p>
					<input 
						class="form-control" 
						:class="this.$root.kyc_status == 'approved' ? 'div-disabled' : ''"
						v-model="pii.middle_name"
						autocomplete="off"
					>

					<p class="mt10 op7">
						Last Name
					</p>
					<input 
						class="form-control" 
						:class="this.$root.kyc_status == 'approved' ? 'div-disabled' : ''"
						v-model="pii.last_name"
						autocomplete="off"
					>

					<p class="mt20 op7">
						Date of Birth
					</p>
					<input 
						class="form-control div-disabled" 
						v-model="pii.dob"
						autocomplete="off"
					>

					<p class="mt10 op7">
						Phone Number
					</p>
					<input 
						class="form-control" 
						v-model="pii.phone"
						autocomplete="off"
					>

					<div class="mt20">
						<div v-if="saving_pii">
							<ClipLoader class="clip-loader-inline" size="25px" color="#ff2d2e"></ClipLoader>
						</div>
						<button v-else class="btn btn-success" @click="savePii()">
							Save My Information
						</button>
					</div>
				</div>
			</div>

			<div v-if="this.$root.account_type == 'entity'" class="col-12 mt20">
				<hr>
			</div>

			<div v-if="this.$root.account_type == 'entity'" class="col-sm-6 pt20">
				<h6 class="bold">
					Entity Information
				</h6>

				<p class="mt20 op7">
					Entity Name
				</p>
				<input 
					class="form-control div-disabled" 
					v-model="entity_pii.entity_name"
				>

				<p class="mt10 op7">
					Entity Type
				</p>
				<input 
					class="form-control div-disabled" 
					v-model="entity_pii.entity_type"
				>

				<p class="mt10 op7">
					Registration Number
				</p>
				<input 
					class="form-control div-disabled" 
					v-model="entity_pii.registration_number"
					autocomplete="off"
				>

				<p class="mt10 op7">
					VAT Number (Tax ID)
				</p>
				<input 
					class="form-control div-disabled" 
					v-model="entity_pii.tax_id"
					autocomplete="off"
				>
			</div>
		</div>
	</div>

	<div id="updatePasswordModal">
		<div class="izi-padding">
			<p class="op7">
				<i class="fa fa-key"></i>
				<span> Update Password</span>
				<span class="float-right x-close">&times;</span>
			</p>
			<hr>
			<div class="form-group pt10">
				<p>Use the form below to update your password.</p>

				<p class="pt15 check-circle check-circle-active">
					<img src="@/assets/images/check-circle-green.svg">
					Min 8 characters
				</p>
				<p class="check-circle check-circle-active">
					<img src="@/assets/images/check-circle-green.svg">
					1 Number
				</p>
				<p class="pb15 check-circle check-circle-active">
					<img src="@/assets/images/check-circle-green.svg">
					1 Special character
				</p>

				<label>Old Password</label>
				<input id="input1-updatePasswordModal" type="password" class="form-control form-control-sm">
				<label>New Password</label>
				<input id="input2-updatePasswordModal" type="password" class="form-control form-control-sm">
				<label>New Password</label>
				<input id="input3-updatePasswordModal" type="password" class="form-control form-control-sm">
				<button id="button-updatePasswordModal" class="btn btn-success btn-sm mt10 text-light">Confirm Password Change</button>
			</div>
		</div>
	</div>

	<div id="enableMfaModal">
		<div class="izi-padding">
			<p class="op7">
				<i class="fa fa-key"></i>
				<span> Enable MFA</span>
				<span class="float-right x-close">&times;</span>
			</p>
			<hr>
			<div class="form-group pt10">
				<p>Enable multi-factor authentication on your account. You can choose between email based and authenticator style.</p>
				<button id="button-enableMfaModal" class="btn btn-success btn-sm mt10 text-light">Enable MFA</button>
			</div>
		</div>
	</div>

	<div id="enableMfaMfaModal">
		<div class="izi-padding">
			<p class="op6">
				<i class="fa fa-user"></i>
				<span> Multi-factor Authentication Requested</span>
			</p>
			<hr>
			<p>Please verify you are able to authenticate using the MFA code we sent to your email.</p>
			<div class="form-group pt10">
				<label for="usr">Code</label>
				<input id="input-enableMfaMfaModal" type="text" class="form-control form-control-sm transform-uppercase">
				<button id="button-enableMfaMfaModal" class="btn btn-success btn-sm mt10 text-light">Submit</button>
			</div>
		</div>
	</div>

	<div id="disableMfaModal">
		<div class="izi-padding">
			<p class="op7">
				<i class="fa fa-key"></i>
				<span> Disable MFA</span>
				<span class="float-right x-close">&times;</span>
			</p>
			<hr>
			<div class="form-group pt10">
				<p>Are you sure you want to disable MFA protection on your account?</p>
				<button id="button-disableMfaModal" class="btn btn-black btn-sm mt10 text-light">Disable MFA</button>
			</div>
		</div>
	</div>

	<div id="generateNewTotpModal">
		<div class="izi-padding">
			<p class="op7">
				<i class="fa fa-key"></i>
				<span> New Authenticator Secret</span>
				<span class="float-right x-close">&times;</span>
			</p>
			<hr>
			<div class="form-group pt10">
				<p>Create a new TOTP authenticator secret and QR code to scan?</p>
				<button id="button-generateNewTotpModal" class="btn btn-success btn-sm mt10 text-light">Generate New QR Code</button>
			</div>
		</div>
	</div>

	<Modal
		v-model="askDisableTotp"
		max-width="400px"
		:click-out="isClickOut"
	>
		<div class="modal-container">
			<p class="op7">
				<i class="fa fa-key"></i>
				<span> Disable Authenticator</span>
			</p>
			<hr>
			<div class="form-group pt10">
				<p>Disable authenticator based MFA on your account? Will revert back to standard email based MFA.</p>
				<button class="btn btn-success btn-sm mt10 text-light" @click="disableTotp">
					Disable Authenticator
				</button>
				<button class="btn btn-black btn-sm mt15 ml5" @click="cancelAskDisableTotp">
					Cancel
				</button>
			</div>
		</div>
	</Modal>

	<Modal
		v-model="qrModalIsOpen" 
		max-width="400px"
		:click-out="isClickOut"
	>
		<div class="modal-container">
			<h5 class="pb15">Authenticator Key</h5>

			<div class="qr-container">
				<qrcode-vue 
					:value="totp_provisioning_uri" 
					:size="qrsize" 
					foreground="#ff2d2e" 
					level="H" 
				></qrcode-vue>
			</div>

			<code>{{ totp_secret }}</code>

			<p class="pt15 pb15">Import this key into your authenticator app (Like Google Authenticator), and provide your 6 digit code to enable TOTP authentication on your account.</p>

			<label>Enter 6 digit code</label>
			<input id="input-totpCode" class="form-control form-control-sm" type="text">
			<button class="btn btn-success btn-sm mt15" @click="submitTotpCode">
				Submit
			</button>
			<button class="btn btn-black btn-sm mt15 ml5" @click="cancelTotp">
				Cancel
			</button>
		</div>
	</Modal>

	<Modal
		v-model="qrModalIsOpen2" 
		max-width="400px"
		:click-out="isClickOut"
	>
		<div class="modal-container">
			<h5 class="pb15">Authenticator Code</h5>

			<span class="op7 fs12">Sha256:&ensp;</span>
			<code :title="totpHash">{{ this.$root.formatHash(totpHash, 10) }}</code>

			<p class="pt15 pb15">Provide your 6 digit code to enable TOTP authentication on your account.</p>

			<label>Enter 6 digit code</label>
			<input id="input-totpCode2" class="form-control form-control-sm" type="text">
			<button class="btn btn-success btn-sm mt15" @click="reSubmitTotpCode">
				Submit
			</button>
			<button class="btn btn-black btn-sm mt15 ml5" @click="cancelTotp">
				Cancel
			</button>
		</div>
	</Modal>

	<Modal
		v-model="avatarModalOpen"
		max-width="400px"
		:click-out="isClickOut"
	>
		<div class="modal-container">
			<h5 class="pb15">Update Avatar</h5>

			<VueAvatarUpload
				lang="en"
				:avatar="this.$root.avatar_url"
				:url="this.api_url+'/user/update-avatar'"
				field="avatar"
				method="POST"
				:headers="{
					'Authorization': 'Bearer '+this.$root.bearer_token
				}"
				@error="this.avatarError"
				@close="this.avatarModalOpen = false"
				@success="this.avatarSuccess"
			>
			</VueAvatarUpload>
		</div>
	</Modal>
</template>

<style scoped>

#generateNewTotpModal,
#askDisableTotpModal,
#enableTotpModal,
#enableMfaMfaModal,
#disableMfaModal,
#enableMfaModal,
#updatePasswordModal {
	display: none;
}

.check-circle img {
	width: 13px;
	height: 13px;
	margin-right: 5px;
}

.check-circle-active {
	color: #009C34;
}

.modal-container {
	width: 100%;
	max-width: 400px;
	height: auto;
	border-radius: 5px;
	padding: 15px;
	background-color: #fff;
	box-shadow: 0px 2px 6px rgba(0,0,0,0.29);
}

.qr-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	position: relative;
	min-height: 200px;
	margin-bottom: 5px;
}

</style>