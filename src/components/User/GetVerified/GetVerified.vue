<script>

import App from '../../../App.vue';
import { api, external_api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import Datepicker from '@vuepic/vue-datepicker';
import { Modal } from 'vue-neat-modal';
import DropZone from 'dropzone-vue';

import '@vuepic/vue-datepicker/dist/main.css'
import 'vue-neat-modal/dist/vue-neat-modal.css';

export default {
	components: {
		Popper,
		ClipLoader,
		Datepicker,
		Modal,
		DropZone
	},

	data() {
		return {
			step:           0,
			pii:            JSON.parse(JSON.stringify(this.$root.pii)),
			account_type:   this.$root.account_type,
			affirm:         false,
			loading:        false,
			countries:      [],
			shufti_modal:   false,
			shufti_token:   '',

			shufti_payload: {
				reference:    '',
				callback_url: `${this.$root.api_url}/public/shufti-status`,
				email:        this.$root.email,
				country:      this.$root.pii.country_of_citizenship,

				verification_mode:      'image_only',
				allow_offline:          1,
				allow_online:           0,
				show_privacy_policy:    1,
				show_results:           0,
				show_feedback_form:     0,
				show_consent:           1,
				decline_on_single_step: 0,
				allow_retry:            1,

				document: {
					name: {
						first_name:  this.$root.pii.first_name,
						last_name:   this.$root.pii.last_name,
						fuzzy_match: 1,
					},
					dob: this.$root.pii.dob,
					fetch_enhanced_data: '1',
					supported_types:     [
						'id_card', 
						'passport', 
						'driving_license'
					]
				},

				address: {
					name: {
						first_name: this.$root.pii.first_name,
						last_name:  this.$root.pii.last_name,
						fuzzy_match: 1,
					},
					full_address:        '',
					address_fuzzy_match: '1',
					supported_types: [
						'utility_bill', 
						'bank_statement'
					],
					verification_instructions: {
						allow_paper_based: '1',
						allow_photocopy:   '1',
						allow_laminated:   '1',
					}
				},

				background_checks: {
					name: {
						first_name: this.$root.pii.first_name,
						last_name:  this.$root.pii.last_name,
					},
					dob: this.$root.pii.dob,
				}
			},
			verification_url: '',

			entity_types: [
				'LLC',
				'Corporation',
				'Trust',
				'Foundation',
				'Association',
				'Sole Proprietorship',
				'Other'
			],

			entity_docs: []
		}
	},

	created() {
		this.getISOCountries();
		this.fetchEntityDocs();
	},

	mounted() {
		let that = this;

		if (this.$root.kyc_status == 'approved') {
			this.$root.routeTo('/u/dashboard');
		}
	},

	methods: {
		async getISOCountries() {
			this.loading = true;

			const response = await api(
				'GET',
				'public/get-countries',
				{}
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.loading   = false;
				this.countries = response.detail;
			}
		},

		async fetchEntityDocs() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-entity-docs',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.entity_docs = response.detail;
			}
		},

		async beginShufti() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			this.loading = true;

			// required by both account types
			if (!this.pii.first_name) {
				this.$root.toast(
					'',
					'Please enter first name',
					'error'
				);
				this.loading = false;
				return false;
			}

			if (!this.pii.last_name) {
				this.$root.toast(
					'',
					'Please enter last name',
					'error'
				);
				this.loading = false;
				return false;
			}

			// re-format datepicker timestamps
			if (!this.pii.dob) {
				this.pii.dob = '';
				this.$root.toast(
					'',
					'Invalid date of birth',
					'error'
				);
				this.loading = false;
				return false;
			}

			else if (typeof this.pii.dob.toISOString == 'function') {
				this.pii.dob = this.$root.formatDateWithZone(this.pii.dob)
			}

			else if (this.pii.dob.includes("Z")) {
				this.pii.dob = this.$root.formatZDate(this.pii.dob)
			}

			else {
				this.pii.dob = this.pii.dob.replace('/', '-');
			}

			let temp     = this.pii.dob.split(' ');
			this.pii.dob = temp[0];

			// check country
			if (!this.pii.country) {
				this.$root.toast(
					'',
					'Please select country',
					'error'
				);
				this.loading = false;
				return false;
			}

			// additional entity requirements
			if (this.account_type == 'entity') {
				if (!this.pii.entity_name) {
					this.$root.toast(
						'',
						'Please enter entity name',
						'error'
					);
					this.loading = false;
					return false;
				}

				if (!this.pii.entity_type) {
					this.$root.toast(
						'',
						'Please select entity type',
						'error'
					);
					this.loading = false;
					return false;
				}

				if (!this.pii.entity_document_name) {
					this.$root.toast(
						'',
						'Please upload and select the entity document where the representative is listed',
						'error'
					);
					this.loading = false;
					return false;
				}

				if (!this.pii.entity_document_page) {
					this.$root.toast(
						'',
						'Please enter the page number in the document where the representative is listed',
						'error'
					);
					this.loading = false;
					return false;
				}

				if (
					!this.pii.entity_reg_number &&
					!this.pii.entity_vat_number
				) {
					this.$root.toast(
						'',
						'You must include one of the following: entity registration number, VAT number',
						'error'
					);
					this.loading = false;
					return false;
				}
			}

			const response1 = await api(
				'GET',
				'user/get-shufti-token',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response1);

			if (response1.status == 200) {
				// console.log(response1.message);
				this.shufti_token             = response1.message;
				this.shufti_payload.reference = `SHUFTI_${this.$root.guid}${Math.random()}`

				this.shufti_payload.document.name.first_name = this.pii.first_name;
				this.shufti_payload.document.name.last_name  = this.pii.last_name;
				this.shufti_payload.document.dob             = this.pii.dob;
				this.shufti_payload.address.name.first_name  = this.pii.first_name;
				this.shufti_payload.address.name.last_name   = this.pii.last_name;
				this.shufti_payload.country                  = this.pii.country;

				this.shufti_payload.background_checks.name.first_name = this.pii.first_name;
				this.shufti_payload.background_checks.name.last_name  = this.pii.last_name;
				this.shufti_payload.background_checks.dob             = this.pii.dob;

				const response2 = await external_api(
					'POST',
					'https://api.shuftipro.com',
					this.shufti_payload,
					{
						'Content-Type':  'application/json',
						'Authorization': `Basic ${this.shufti_token}`,
					}
				);

				this.shufti_modal = true;
				console.log(response2);

				let body             = response2.body ?? {};
				let signature        = response2.signature ?? '';
				let verification_url = body.verification_url ?? '';
				let error            = body.error ?? '';

				if (error && error.hasOwnProperty('message')) {
					let message = error.message;

					this.$root.toast(
						'Oops',
						message,
						'error'
					);

					this.shufti_modal = false;
					this.loading      = false;
					return false;
				}

				const response3 = await api(
					'POST',
					'user/validate-shufti-signature',
					{
						signature: signature,
						response:  JSON.stringify(body)
					},
					fetch_bearer_token
				);

				// console.log(response3);

				if (response3.status == 200) {
					this.verification_url = verification_url;
				}

				const response4 = await api(
					'POST',
					'user/save-shufti-ref',
					{
						reference_id: this.shufti_payload.reference,
						first_name:   this.pii.first_name,
						middle_name:  this.pii.middle_name,
						last_name:    this.pii.last_name,
						dob:          this.pii.dob,
						country:      this.pii.country,
						account_type: this.account_type,

						entity_name:       this.pii.entity_name,
						entity_type:       this.pii.entity_type,
						entity_reg_number: this.pii.entity_reg_number,
						entity_vat_number: this.pii.entity_vat_number,

						entity_document_name: this.pii.entity_document_name,
						entity_document_page: this.pii.entity_document_page
					},
					fetch_bearer_token
				);

				// console.log(response4);
				this.$root.catch401(response4);

				if (response4.status == 200) {
					await this.$root.getMe();
					console.log('reset forms');
					this.pii = JSON.parse(JSON.stringify(this.$root.pii));
				} else {
					this.$root.toast(
						'Oops',
						response4.message,
						'error'
					);
				}

				this.loading = false;
			} else {
				this.loading = false;
			}
		},

		async entityFileUploaded(event, req) {
			let that = this;

			new Promise((resolve, reject) => {
				let i = 0;

				let f = setInterval(function() {
					if (req.response) {
						let j = JSON.parse(req.response);

						if (j.detail) {
							console.log(j.detail);
							that.fetchEntityDocs();
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

		entityFileUploadError(event) {
			console.log(event);
			this.$root.toast(
				'Oops',
				'There was a problem uploading entity document at this time',
				'error'
			);
		}
	}
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card">
					<div class="card-title">
						Get Verified
					</div>
					<div class="card-body">
						<p class="pb20">
							All members of the Casper Association need to complete KYC/AML to participate. You are currently
							<div 
								v-if="this.$root.kyc_status === null" 
								class="inline"
							>
								<ClipLoader 
									class="clip-loader-inline" 
									size="15px" 
									color="#ff2d2e"
								></ClipLoader>
							</div>

							<div v-else class="inline"> 
								<span 
									v-if="this.$root.kyc_status == 'approved'" 
									class="text-green bold"
								>
									approved.
								</span> 
								<span 
									v-else-if="this.$root.kyc_status == 'pending'" 
									class="op6 bold"
								>
									pending.
								</span> 
								<span 
									v-else-if="this.$root.kyc_status == 'denied'" 
									class="text-red bold"
								>
									under review.
								</span> 
								<span 
									v-else class="text-yellow bold"
								>
									not verified.
								</span>
							</div>
						</p>

						<p class="pb5">
							Adding the identity of on owner or node operator increases trust on the network. Verifying with Casper gives you access to:
						</p>

						<ul>
							<li>A Casper Verified checkmark indicating your status live.</li>
							<li>Your profile page showing your metrics, rank, and more.</li>
							<li>Access to programs for trusted members.</li>
							<li>Increased rewards (trusted nodes gain more delegations)</li>
						</ul>

						<hr>

						<div v-if="step == 0">
							<div v-if="this.$root.kyc_status == 'pending'">
								<p>
									Your KYC is pending. Please don't restart KYC unless your KYC has remained pending for more than 72 hours.
								</p>

								<p class="mt10">
									<span 
										class="text-red bold pointer underline fs14"
										@click="step = 1"
									>
										Restart Verification
									</span>
								</p>
							</div>

							<p v-else-if="this.$root.kyc_status == 'approved'">
								Your KYC is already approved
							</p>

							<p v-else-if="this.$root.kyc_status == 'denied'">
								Your KYC is under review
							</p>

							<div v-else>
								<p v-if="this.$root.kyc_denied_reason">
									{{ this.$root.kyc_denied_reason }}
								</p>

								<button 
									class="btn btn-success mt20" 
									@click="step = 1"
								>
									Begin Verification
								</button>
							</div>
						</div>

						<div v-else-if="step == 1">
							<p class="fs16">
								<b>Before we begin</b> - Do you represent an entity, such as a company, trust, LLC, non-profit, or another type of organization that controls your node?
							</p>

							<ul 
								class="mt10" 
								style="list-style-type: none;"
							>
								<li>
									<input 
										v-model="this.account_type"
										name="radio-type" 
										type="radio" 
										class="mr5 pointer" 
										id="radio-individual"
										:checked="this.account_type == 'individual'" 
										value="individual"
									>
									<label 
										class="fs14 pointer" 
										for="radio-individual"
									>
										<span>No, I am an individual</span>
									</label>
								</li>
								<li>
									<input 
										v-model="this.account_type"
										name="radio-type" 
										type="radio" 
										class="mr5 pointer" 
										id="radio-entity"
										:checked="this.account_type == 'entity'" 
										value="entity"
									>
									<label 
										class="fs14 pointer" 
										for="radio-entity"
									>
										<span>Yes, I represent an entity</span>
									</label>
								</li>
							</ul>

							<p class="mt10 fs16">
								You registered as an <b>{{ this.$root.account_type }}</b>. 
								{{
									this.$root.account_type != this.account_type ? 'You are changing to '+this.account_type+'.' : ''
								}}
							</p>

							<div v-if="this.account_type == 'individual'">
								<p class="mt20">
									As the node operator, please enter your details. In the next step you must upload an identity document (such as a passport) to verify your identity.
								</p>

								<div class="form-group max-width-400">
									<p class="mt20 op7">
										First Name
									</p>
									<input
										class="form-control" 
										v-model="pii.first_name"
									>

									<p class="mt20 op7">
										Middle Name (initial)
									</p>
									<input
										class="form-control" 
										v-model="pii.middle_name"
									>

									<p class="mt20 op7">
										Last Name
									</p>
									<input
										class="form-control" 
										v-model="pii.last_name"
									>

									<p class="mt20 op7">
										Date of Birth
									</p>
									<!-- <Datepicker
										v-model="pii.dob"
										:format="'yyyy/MM/dd'"
										:preview-format="'yyyy/MM/dd'"
										text-input
										utc
										placeholder="yyyy/mm/dd"
										:onkeydown="this.$root.inputIsDateFormat"
									></Datepicker> -->
									<input 
										type="text"
										class="form-control" 
										v-model="pii.dob"
										placeholder="yyyy/mm/dd"
										:onkeydown="this.$root.inputIsDateFormat"
									>

									<p class="mt20 op7">
										Country of Citizenship
									</p>
									<select
										class="form-select pointer" 
										v-model="pii.country"
									>
										<option value="">Select Country</option>
										<option 
											v-for="(val, key, index) in countries" 
											:value="key"
										>
											{{ val }}
										</option>
									</select>
								</div>
							</div>

							<div v-else>
								<div class="form-group max-width-400">
									<p class="mt20 op7">
										Entity Name
									</p>
									<input
										class="form-control" 
										v-model="pii.entity_name"
									>

									<p class="mt20 op7">
										Entity Type
									</p>
									<select 
										class="form-select pointer" 
										v-model="pii.entity_type"
									>
										<option 
											value="" 
											selected
										>
											Select Entity Type
										</option>

										<option 
											v-for="entity_type in entity_types" 
											:value="entity_type"
										>
											{{ entity_type }}
										</option>
									</select>

									<p class="mt20 op7">
										Entity Registration Number
									</p>
									<input
										class="form-control" 
										v-model="pii.entity_reg_number"
									>

									<p class="mt20 op7">
										VAT Number (optional)
									</p>
									<input
										class="form-control" 
										v-model="pii.entity_vat_number"
									>
								</div>

								<hr>

								<p class="fs16 bold">
									Document Upload
								</p>

								<DropZone 
									:url="`${this.$root.api_url}/user/upload-entity-doc`"
									:uploadOnDrop="true"
									:multipleUpload="false"
									:headers='{"Authorization": "Bearer " + this.$root.bearer_token}'
									:maxFileSize="4194304"
									@sending="entityFileUploaded"
									@errorUpload="entityFileUploadError"
									dropzoneClassName="dropzone-wrap"
									:acceptedFiles="['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx']"
									ondragover="this.style.border='3px dashed #ff2d2e';"
									ondragleave="this.style.border='3px dotted #ff2d2e';"
									@errorAdd="this.$root.dropzone_error"
								></DropZone>

								<p class="mt20">
									Please upload the entity's operating documents. Examples of operating documents include:
								</p>
								<ul class="mt10">
									<li>Certification of incorporation</li>
									<li>Business license</li>
									<li>Government issued business registration document</li>
								</ul>
								<p class="mt20">
									<b>NOTE:</b>&ensp;The document you upload must contain the name of one of the owners, executives or directors of the company. In the next step, you'll be required to upload this person's government issued photo ID (such as a passport) to complete the verification process. You can upload multiple documents if necessary.
								</p>

								<p class="mt20">
									Enter the name and information for the person verifying their ID in the next step. This person must be listed in the document(s) above.
								</p>

								<div class="form-group max-width-400">
									<p class="mt20 op7">
										On what Document is the representative listed?
									</p>
									<select 
										class="form-select pointer" 
										v-model="pii.entity_document_name"
									>
										<option 
											value="" 
											selected
										>
											Select
										</option>
										<option 
											v-for="doc in entity_docs" 
											:value="doc.file_url"
										>
											{{ doc.file_name }}
										</option>
									</select>

									<p class="mt20 op7">
										On what page is the representative listed?
									</p>
									<input
										class="form-control" 
										v-model="pii.entity_document_page"
									>

									<p class="mt20 op7">
										First Name of Entity Representative
									</p>
									<input
										class="form-control" 
										v-model="pii.first_name"
									>

									<p class="mt20 op7">
										Last Name of Entity Representative
									</p>
									<input
										class="form-control" 
										v-model="pii.last_name"
									>

									<p class="mt20 op7">
										Entity Registration Country
									</p>
									<select
										class="form-select pointer" 
										v-model="pii.country"
									>
										<option value="">Select Country</option>
										<option 
											v-for="(val, key, index) in countries" 
											:value="key"
										>
											{{ val }}
										</option>
									</select>

									<p class="mt20 op7">
										Representative Date of Birth
									</p>
									<!-- <Datepicker
										v-model="pii.dob"
										:format="'yyyy/MM/dd'"
										:preview-format="'yyyy/MM/dd'"
										text-input
										utc
										placeholder="yyyy/mm/dd"
										:onkeydown="this.$root.inputIsDateFormat"
									></Datepicker> -->
									<input 
										type="text"
										class="form-control" 
										v-model="pii.dob"
										placeholder="yyyy/mm/dd"
										:onkeydown="this.$root.inputIsDateFormat"
									>
								</div>
							</div>

							<div class="form-group max-width-400 mt20">
								<label 
									class="fs13 pointer" 
									style="font-weight: normal;" 
									for="affirm_checkbox"
								>
									<input 
										type="checkbox" 
										id="affirm_checkbox" 
										v-model="affirm"
									>
									&ensp;I affirm the above information is correct.
								</label>
							</div>

							<div 
								v-if="loading" 
								class="inline mt30"
							>
								<ClipLoader 
									class="clip-loader-inline" 
									size="25px" 
									color="#ff2d2e"
								></ClipLoader>
							</div>
							<button 
								v-else
								class="btn btn-success mt20" 
								:class="affirm ? '' : 'div-disabled'"
								@click="beginShufti"
							>
								Continue to ID Verification
								<i class="fa fa-credit-card ml5"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Modal
		v-model="shufti_modal"
		width="90vw"
		max-width="90vw"
		height="90vh"
		:click-out="false"
	>
		<div class="modal-container shufti-iframe-wrap">
			<h5 class="pb15">
				Shuftipro Verification
			</h5>

			<iframe 
				ref="iframe" 
				:src="verification_url"
				title="Shuftipro Verification"
			></iframe>

			<button 
				class="btn btn-success form-control btn-inline mt20 mb10" 
				@click="shufti_modal = false; step = 0"
			>
				Close
			</button>
		</div>
	</Modal>
</template>

<style scoped>

.shufti-iframe-wrap {
	width: 90vw;
	max-width: 90vw;
	height: 90vh;
	overflow-y: scroll;
	position: relative;
}

iframe {
	height: calc(100% - 170px);
	width: 100%;
	margin-top: 50px;
}

.dropzone-wrap {
	border: 3px dotted #ff2d2e; 
	cursor: pointer; 
	padding: 15px;
	margin-top: 10px; 
	overflow: hidden;
}

</style>