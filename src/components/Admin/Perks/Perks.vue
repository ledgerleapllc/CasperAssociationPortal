<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { AgGridVue } from "ag-grid-vue3";
import { Modal } from 'vue-neat-modal';
import DropZone from 'dropzone-vue';
import Datepicker from '@vuepic/vue-datepicker';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../ag-theme-custom.css";

import 'vue-neat-modal/dist/vue-neat-modal.css';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
	components: {
		Popper,
		ClipLoader,
		AgGridVue,
		Modal,
		DropZone,
		Datepicker
	},

	data() {
		return {
			perks:       [],
			column_defs: [
				{
					field: 'id',
					headerName: '#',
					sortable: true,
					sort: 'desc'
				},
				{
					field: 'created_at',
					headerName: 'Created',
					sortable: true
				},
				{
					field: 'title',
					headerName: 'Title',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';
						return this.$root.formatString(params.value, 32);
					}
				},
				{
					field: 'start_time',
					headerName: 'Start',
					sortable: true
				},
				{
					field: 'end_time',
					headerName: 'Auto End',
					sortable: true
				},
				{
					field: 'status',
					headerName: 'Status',
					sortable: true
				},
				{
					field: 'visible',
					headerName: 'Visible',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';

						if (parseInt(params.value) == 0) {
							return '<span class="text-blue">Not Visible</span>'
						} else {
							return '<span class="text-red">Visible</span>'
						}
					}
				},
				{
					field: '',
					headerName: '',
					sortable: false,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';
						return `<button class="btn btn-success btn-sm fs12">Edit</span>`
					},
					onCellClicked: (event) => {
						let perk_id    = event.data.id;
						let title      = event.data.title;
						let content    = event.data.content;
						let cta        = event.data.cta;
						let image      = event.data.image;
						let created_at = event.data.created_at;
						let start_time = event.data.start_time;
						let end_time   = event.data.end_time;
						let visible    = Boolean(parseInt(event.data.visible));
						let setting    = Boolean(parseInt(event.data.setting));

						if (perk_id) {
							this.selected_perk = {
								id:            perk_id,
								title:         title,
								content:       content,
								cta:           cta,
								image:         image,
								created_at:    created_at,
								start_time:    start_time,
								end_time:      end_time,
								visible:       visible,
								setting:       setting
							};

							this.show_dropzone = true
							this.perk_modal    = true;
						}
					}
				},
				{
					field: '',
					headerName: '',
					sortable: false,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';
						return `<button class="btn btn-success btn-sm fs12">Delete</span>`
					},
					onCellClicked: (event) => {
						let perk_id    = event.data.id;
						let title      = event.data.title;
						let content    = event.data.content;
						let cta        = event.data.cta;
						let image      = event.data.image;
						let created_at = event.data.created_at;
						let start_time = event.data.start_time;
						let end_time   = event.data.end_time;
						let visible    = Boolean(parseInt(event.data.visible));
						let setting    = Boolean(parseInt(event.data.setting));

						if (perk_id) {
							this.selected_perk = {
								id:            perk_id,
								title:         title,
								content:       content,
								cta:           cta,
								image:         image,
								created_at:    created_at,
								start_time:    start_time,
								end_time:      end_time,
								visible:       visible,
								setting:       setting
							};

							this.del_perk_modal   = true;
						}
					}
				}
			],

			quickFilterText:     "",
			quickFilterCategory: "",
			gridApi:             null,

			defaultColDef: {
				flex:      1,
				minWidth:  100,
				resizable: true,
			},

			default_perk:  {
				id:          0,
				title:       "",
				content:     "",
				cta:         "",
				image:       "",
				created_at:  "",
				start_time:  new Date(),
				end_time:    new Date(),
				status:      "pending",
				visible:     1,
				setting:     0
			},

			selected_perk: {
				id:          null,
				title:       null,
				content:     null,
				cta:         null,
				image:       null,
				created_at:  null,
				start_time:  new Date(),
				end_time:    new Date(),
				status:      null,
				visible:     null,
				setting:     null
			},
			del_perk_modal:  false,
			perk_modal:      false,
			show_dropzone:   false
		}
	},

	created() {
		this.getPerks();
	},

	mounted() {
		let that = this;
	},

	methods: {
		async getPerks() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-perks',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				this.perks = response.detail;
			}
		},

		onGridReady(params) {
			this.gridApi = params.api;
		},

		quickFilterCategorySelect(filter) {
			this.gridApi.setFilterModel({
				source: {
					filterType: 'text',
					type:       'contains',
					filter:     filter
				}
			});
		},

		newPerk() {
			this.selected_perk = this.default_perk;
			this.show_dropzone = true;
			this.perk_modal    = true;
		},

		async deletePerk() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/delete-perk',
				{
					perk_id: this.selected_perk.id
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.$root.toast(
					'',
					response.message,
					'success'
				);
				this.del_perk_modal = false;
				this.getPerks();
			} else {
				this.$root.toast(
					'',
					response.message,
					'error'
				);
			}
		},

		async savePerk() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			// re-format datepicker timestamps
			if (!this.selected_perk.start_time) {
				this.selected_perk.start_time = '';
			} else if (typeof this.selected_perk.start_time.toISOString == 'function') {
				this.selected_perk.start_time = this.$root.formatDateWithZone(this.selected_perk.start_time)
			} else if (this.selected_perk.start_time.includes("Z")) {
				this.selected_perk.start_time = this.$root.formatZDate(this.selected_perk.start_time)
			}

			if (!this.selected_perk.end_time) {
				this.selected_perk.end_time = '';
			} else if (typeof this.selected_perk.end_time.toISOString == 'function') {
				this.selected_perk.end_time = this.$root.formatDateWithZone(this.selected_perk.end_time)
			} else if (this.selected_perk.end_time.includes("Z")) {
				this.selected_perk.end_time = this.$root.formatZDate(this.selected_perk.end_time)
			}

			const response = await api(
				'POST',
				'admin/save-perk',
				{
					id:         this.selected_perk.id,
					title:      this.selected_perk.title,
					content:    this.selected_perk.content,
					cta:        this.selected_perk.cta,
					image:      this.selected_perk.image,
					start_time: this.selected_perk.start_time,
					end_time:   this.selected_perk.end_time,
					status:     this.selected_perk.status,
					visible:    this.selected_perk.visible,
					setting:    this.selected_perk.setting,
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				this.$root.toast(
					'',
					response.message,
					'success'
				);
				this.perk_modal    = false;
				this.show_dropzone = false;
				this.getPerks();
			} else {
				this.$root.toast(
					'',
					response.message,
					'error'
				);
			}
		},

		async perkImageUploaded(event, req) {
			let that = this;

			new Promise((resolve, reject) => {
				let i = 0;

				let f = setInterval(function() {
					if (req.response) {
						let j = JSON.parse(req.response);
						// console.log(j);

						if (j.detail) {
							if (j.status == 200) {
								that.selected_perk.image = j.detail;
							}

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

		perkImageUploadError(event) {
			console.log(event);
			this.$root.toast(
				'Oops',
				'There was a problem uploading perk image. Please check the file type and size',
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
					<div class="table-header">
						<span>
							<i class="fa fa-plus green"></i>
							<b>Perks</b>
						</span>
					</div>
					<div class="table-header">
						<button class="btn btn-success btn-sm fs14 float-right" @click="newPerk">
							<i class="fa fa-plus"></i>
							New Perk
						</button>
						<span>
							<input v-model="quickFilterText" type="text" class="form-control form-control-sm width-200" placeholder="Search">
						</span>
					</div>
					<div class="table-card">
						<ag-grid-vue
							style="width: 100%; height: 100%;"
							class="ag-theme-alpine"
							:columnDefs="column_defs"
							@grid-ready="onGridReady"
							:suppressExcelExport="true"
							:rowData="perks"
							:quickFilterText="quickFilterText"
							:defaultColDef="defaultColDef"
							pagination="true"
						>
						</ag-grid-vue>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Modal
		v-model="perk_modal"
		max-width="800px"
		:click-out="false"
	>
		<div class="modal-container" style="max-width: 800px; height: 600px; overflow-y: scroll;">
			<h5 v-if="!selected_perk || selected_perk.id == 0" class="pb15">
				Add New Perk
				<button @click="perk_modal = false; show_dropzone = false" class="btn btn-success btn-sm fs13 float-right">
					Cancel
				</button>
			</h5>
			<h5 v-else class="pb15">
				Edit Perk
				<button @click="perk_modal = false; show_dropzone = false" class="btn btn-success btn-sm fs13 float-right">
					Cancel
				</button>
			</h5>

			<p class="mt20 bold">
				Title of Perk (Limit 128 characters)
				<input type="text" class="form-control mt10" v-model="selected_perk.title">
			</p>

			<p class="mt20 bold">
				Content to describe perks
				<br/>
				<textarea v-model="selected_perk.content" class="form-control height-200 p15 mt10">{{ selected_perk.content }}</textarea>
			</p>

			<p class="mt20 bold">
				Call to Action link URL. Leave blank for no CTA.
				<input type="text" class="form-control mt10" v-model="selected_perk.cta">
			</p>

			<p class="mt20 bold">
				Upload Image
			</p>

			<DropZone 
				v-if="show_dropzone"
				:url="`${this.$root.api_url}/admin/upload-perk-image`"
				:uploadOnDrop="true"
				:multipleUpload="false"
				:headers='{"Authorization": "Bearer " + this.$root.bearer_token}'
				:maxFileSize="2097152"
				@sending="perkImageUploaded"
				@errorUpload="perkImageUploadError"
				dropzoneClassName="dropzone-wrap"
				:acceptedFiles="['png', 'jpg', 'jpeg', 'gif']"
				ondragover="this.style.border='3px dashed #ff2d2e';"
				ondragleave="this.style.border='3px dotted #ff2d2e';"
				@errorAdd="this.$root.dropzone_error"
			></DropZone>

			<p class="mt10">
				Uploaded image should be a square, and no more than 400px by 400px. Max file size: 2MB. Accepted file types: 'png', 'jpg', 'jpeg', 'gif'
			</p>

			<p class="mt20 bold">
				Timeframe
			</p>

			<div class="form-group inline width-200 mr10">
				<p class="op7 fs13">
					Start Time
				</p>
				<Datepicker 
					v-model="selected_perk.start_time" 
					class="width-200 inline"
					:format="'yyyy/MM/dd HH:mm'"
					:preview-format="'yyyy/MM/dd HH:mm'"
					utc
				></Datepicker>
			</div>
			<div class="form-group inline width-200 mt10">
				<p class="op7 fs13">
					End Time
				</p>
				<Datepicker 
					v-model="selected_perk.end_time" 
					class="width-200 inline"
					:format="'yyyy/MM/dd HH:mm'"
					:preview-format="'yyyy/MM/dd HH:mm'"
					utc
				></Datepicker>
			</div>

			<br/>

			<p class="mt20 bold">
				Visible
			</p>

			<p class="fs13">
				<input id="visible" type="checkbox" class="form-check-input pointer" v-model="selected_perk.visible">
				<label class="fs14 pointer" for="visible">Choose perk status. (Note: If the start time and the end time fields are complete and perk is set to "ON", members will see the perk during the selected time period above)</label>
			</p>

			<p class="mt20 bold">
				Preview
			</p>

			<hr class="mt10">

			<div class="perk-card">
				<div class="perk-card-image">
					<img v-if="selected_perk.image" :src="selected_perk.image">
				</div>
				<div class="perk-card-body">
					<p class="bold black fs15 mt5 mb5">
						{{ this.$root.formatString(selected_perk.title, 30) }}
					</p>
					{{ this.$root.formatString(selected_perk.content, 130) }}
				</div>
			</div>

			<button class="btn btn-success form-control btn-inline ml0 mt20 mb10" @click="savePerk()">
				<i class="fa fa-check bold"></i>
				Save
			</button>

			<button class="btn btn-success form-control btn-inline mt20 mb10" @click="perk_modal = false; show_dropzone = false">
				Cancel
			</button>
		</div>
	</Modal>

	<Modal
		v-model="del_perk_modal"
		max-width="400px"
		:click-out="true"
	>
		<div class="modal-container" style="max-width: 400px;">
			<h5 class="pb15">
				Delete Perk
			</h5>

			<p class="mt20">
				Are you sure you want to completely delete this perk?
			</p>

			<button class="btn btn-success form-control btn-inline ml0 mt20 mb10" @click="deletePerk">
				<i class="fa fa-check bold"></i>
				Delete
			</button>

			<button class="btn btn-success form-control btn-inline mt20 mb10" @click="del_perk_modal = false">
				Cancel
			</button>
		</div>
	</Modal>
</template>

<style scoped>

.dropzone-wrap {
	border: 3px dotted #ff2d2e; 
	cursor: pointer; 
	padding: 15px;
	margin-top: 10px; 
	overflow: hidden;
}

</style>