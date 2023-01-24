<script>

import App from '../../../../App.vue';
import { api } from '../../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { AgGridVue } from "ag-grid-vue3";
import { Modal } from 'vue-neat-modal';
import Datepicker from '@vuepic/vue-datepicker';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../../ag-theme-custom.css";

import 'vue-neat-modal/dist/vue-neat-modal.css';

import '@vuepic/vue-datepicker/dist/main.css'

export default {
	components: {
		Popper,
		ClipLoader,
		AgGridVue,
		Modal,
		Datepicker
	},

	data() {
		return {
			notifications: [],
			column_defs: [
				{
					field: 'type',
					headerName: 'Type',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.value) return '';

						if (params.value == 'error') {
							return `<i class="fa fa-times-circle fs16 text-red"></i>Error`;
						} else if (params.value == 'warning') {
							return `<i class="fa fa-warning fs16 text-yellow"></i>Warning`;
						} else if (params.value == 'info') {
							return `<i class="fa fa-info fs16 text-blue"></i>Info`;
						} else if (params.value == 'question') {
							return `<i class="fa fa-question fs16 text-green"></i>Question`;
						}
					},
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
					field: 'title',
					headerName: 'Title',
					sortable: true,
				},
				{
					field: 'created_at',
					headerName: 'Created',
					sortable: true,
					sort: 'desc'
				},
				{
					field: 'activate_at',
					headerName: 'Auto Start',
					sortable: true
				},
				{
					field: 'deactivate_at',
					headerName: 'Auto Stop',
					sortable: true
				},
				{
					field: '',
					headerName: '',
					sortable: true,
					cellRenderer: (params) => {
						if (!params) return '';
						if (!params.data) return '';
						return `<button class="btn btn-success btn-sm fs12">Edit</button>`;
					},
					onCellClicked: async (event) => {
						let notification_id = event.data.id;
						let title           = event.data.title;
						let message         = event.data.message;
						let type            = event.data.type;
						let dismissable     = Boolean(parseInt(event.data.dismissable));
						let priority        = Boolean(parseInt(event.data.priority));
						let visible         = Boolean(parseInt(event.data.visible));
						let created_at      = event.data.created_at;
						let activate_at     = event.data.activate_at;
						let deactivate_at   = event.data.deactivate_at;
						let cta             = event.data.cta;

						if (notification_id) {
							this.selected_notification = {
								id:            notification_id,
								title:         title,
								message:       message,
								type:          type,
								dismissable:   dismissable,
								priority:      priority,
								visible:       visible,
								created_at:    created_at,
								activate_at:   activate_at,
								deactivate_at: deactivate_at,
								cta:           cta,
							};

							// get broadcast by notification
							await this.getNotificationUsers(notification_id);
							this.notification_modal = true;
						}
					}
				},
			],

			quickFilterText:     "",
			quickFilterCategory: "",
			gridApi:             null,

			defaultColDef: {
				flex:      1,
				minWidth:  100,
				resizable: true,
			},

			default_notification: {
				id:            0,
				title:         '',
				message:       '',
				type:          'info',
				dismissable:   true,
				priority:      1,
				visible:       true,
				created_at:    '',
				activate_at:   null,
				deactivate_at: null,
				cta:           ''
			},

			selected_notification: {
				id:            null,
				title:         null,
				message:       null,
				type:          null,
				dismissable:   null,
				priority:      null,
				visible:       null,
				created_at:    null,
				activate_at:   null,
				deactivate_at: null,
				cta:           null
			},

			notification_modal: false,
			delete_modal:       false,

			// Broadcast
			all_users:                [],
			broadcast:                [],
			select_all_admins:        false,
			select_all_users:         false,
			column_defs_broadcast:    [
				{
					field: 'email',
					headerName: 'Email',
					sortable: true,
				},
				{
					field: 'role',
					headerName: 'Role',
					sortable: true,
				},
				{
					field: 'notification_id',
					headerName: 'Tagged',
					sortable: false,
					cellRenderer: (params) => {
						if (!params) return '';

						if (Boolean(params.value) == true) {
							return `<input type="checkbox" class="form-check-input mt10" checked>`;
						} else {
							return `<input type="checkbox" class="form-check-input mt10">`;
						}
					},
					onCellClicked: (event) => {
						Object.values(this.broadcast).forEach(function(item, index) {
							let this_guid = item.guid;

							if (this_guid == event.data.guid) {
								item.notification_id = !Boolean(event.value);
							}
						});

						this.gridApiBroadcast.refreshCells();
						// console.log(this.broadcast);
					}
				},
			],

			quickFilterTextBroadcast: "",
			gridApiBroadcast:         null,
		}
	},

	created() {
		this.getNotifications();
	},

	mounted() {
		let that = this;
	},

	watch: {
		'select_all_admins': function(b) {
			Object.values(this.broadcast).forEach(function(item, index) {
				let role = item.role;

				if (role == 'admin' || role == 'sub-admin') {
					item.notification_id = b;
				}
			});

			this.gridApiBroadcast.refreshCells();
		},
		'select_all_users': function(b) {
			Object.values(this.broadcast).forEach(function(item, index) {
				let role = item.role;

				if (role == 'user') {
					item.notification_id = b;
				}
			});

			this.gridApiBroadcast.refreshCells();
		},
	},

	methods: {
		async getNotifications() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-notifications',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.notifications = response.detail;
			}
		},

		async getNotificationUsers(notification_id) {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'admin/get-notification-users',
				{
					notification_id: notification_id
				},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.broadcast = response.detail;
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

		async saveNotification() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			// re-format datepicker timestamps
			if (!this.selected_notification.activate_at) {
				this.selected_notification.activate_at = '';
			} else if (typeof this.selected_notification.activate_at.toISOString == 'function') {
				this.selected_notification.activate_at = this.$root.formatDateWithZone(this.selected_notification.activate_at)
			} else if (this.selected_notification.activate_at.includes("Z")) {
				this.selected_notification.activate_at = this.$root.formatZDate(this.selected_notification.activate_at)
			}

			if (!this.selected_notification.deactivate_at) {
				this.selected_notification.deactivate_at = '';
			} else if (typeof this.selected_notification.deactivate_at.toISOString == 'function') {
				this.selected_notification.deactivate_at = this.$root.formatDateWithZone(this.selected_notification.deactivate_at)
			} else if (this.selected_notification.deactivate_at.includes("Z")) {
				this.selected_notification.deactivate_at = this.$root.formatZDate(this.selected_notification.deactivate_at)
			}

			const response = await api(
				'POST',
				'admin/save-notification',
				{
					notification: this.selected_notification,
					broadcast:    this.broadcast,
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.$root.toast(
					'',
					response.message,
					'success'
				);
				this.notification_modal = false;
				this.getNotifications();
			}
		},

		async newNotification() {
			await this.getNotificationUsers(0);

			this.selected_notification = this.default_notification;
			this.select_all_admins     = false;
			this.select_all_users      = false;
			this.notification_modal    = true;
		},

		onGridReadyBroadcast(params) {
			this.gridApiBroadcast = params.api;
		},

		deleteNotification() {
			if (
				this.selected_notification.id &&
				this.selected_notification.id != 0
			) {
				this.notification_modal = false;
				this.delete_modal       = true;
			}
		},

		async _deleteNotification() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'POST',
				'admin/delete-notification',
				{
					notification_id: this.selected_notification.id,
				},
				fetch_bearer_token
			);

			if (response.status == 200) {
				// console.log(response);
				this.$root.toast(
					'',
					response.message,
					'success'
				);
				this.delete_modal = false;
				this.getNotifications();
			} else {
				this.$root.toast(
					'',
					response.message,
					'error'
				);
			}
		}
	},
};

</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 mt20">
				<div class="card min-card-height">
					<div class="card-title">
						<i class="fa fa-bell green"></i>
						Notification Settings
						<Popper hover arrow placement="right" class="fs11" content="Adjust settings for the notifications to all platform members">
							<i class="fa fa-info-circle pointer ml5 fs16"></i>
						</Popper>
					</div>
					<div class="card-body">
						<p class="bold mb20">
							Notifications
							<button class="btn btn-success btn-sm fs14 float-right" @click="newNotification">
								<i class="fa fa-plus"></i>
								New Notification
							</button>
						</p>

						<div class="table-card">
							<ag-grid-vue
								style="width: 100%; height: 100%;"
								class="ag-theme-alpine"
								:columnDefs="column_defs"
								@grid-ready="onGridReady"
								:suppressExcelExport="true"
								:rowData="notifications"
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
	</div>

	<Modal
		v-model="notification_modal"
		max-width="800px"
		:click-out="true"
	>
		<div class="modal-container" style="max-width: 800px; height: 600px; overflow-y: scroll;">
			<h5 v-if="selected_notification.id && selected_notification.id != 0" class="pb15">
				Edit Notification
			</h5>
			<h5 v-else class="pb15">
				New Notification
			</h5>

			<p class="mt20">
				Define platform notification below.
			</p>

			<p class="mt20">
				Type
				<select class="form-select pointer short-icon-end mt10" v-model="selected_notification.type">
					<option value="info">Info</option>
					<option value="warning">Warning</option>
					<option value="error">Danger (error)</option>
					<option value="question">Question</option>
				</select>
				<i class="fa fa-info text-blue fs16"></i>
			</p>

			<p class="mt20">
				Priority Level
				<select class="form-select pointer mt10">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
			</p>

			<p class="mt20">
				<input id="dismissable" type="checkbox" class="form-check-input pointer" v-model="selected_notification.dismissable">
				<label class="fs14 pointer" for="dismissable">
					&ensp;Allow user to dismiss
				</label>
			</p>

			<p class="mt20">
				Title
				<input type="text" class="form-control mt10" v-model="selected_notification.title">
			</p>

			<p class="mt20">
				Message
				<br/>
				<textarea v-model="selected_notification.message" class="form-control height-200 p15 mt10">{{ selected_notification.message }}</textarea>
			</p>

			<p class="mt20">
				Call to Action URL. Leave blank for no CTA.
				<input type="text" class="form-control mt10" v-model="selected_notification.cta">
			</p>

			<p class="mt20">
				Timeframe
			</p>

			<div class="form-group inline width-200 mr10">
				<p class="op7 fs13">
					Start Time
				</p>
				<Datepicker 
					v-model="selected_notification.activate_at" 
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
					v-model="selected_notification.deactivate_at" 
					class="width-200 inline"
					:format="'yyyy/MM/dd HH:mm'"
					:preview-format="'yyyy/MM/dd HH:mm'"
					utc
				></Datepicker>
			</div>

			<br/>

			<p class="mt20">
				Visible
			</p>

			<p class="fs13">
				<input id="visible" type="checkbox" class="form-check-input pointer" v-model="selected_notification.visible">
				<label class="fs14 pointer" for="visible">Should this notification be ON now. Please note if the start time and end time fields are complete, then notifications in ON status will only show visibly if they have passed the start time and not yet passed the end time above.</label>
			</p>

			<p class="mt30">
				Who will get this notification?
			</p>

			<div class="form-group inline width-200 mt10">
				<input id="select_all_users" type="checkbox" class="form-check-input inline" v-model="select_all_users">
				<label for="select_all_users" class="op7 fs13">
					&ensp;Users
				</label>

				<input id="select_all_admins" type="checkbox" class="form-check-input inline ml20" v-model="select_all_admins">
				<label for="select_all_admins" class="op7 fs13">
					&ensp;Admins
				</label>
			</div>

			<ag-grid-vue
				style="width: 100%; height: 300px;"
				class="ag-theme-alpine mt10"
				:columnDefs="column_defs_broadcast"
				@grid-ready="onGridReadyBroadcast"
				:suppressExcelExport="true"
				:rowData="broadcast"
				:quickFilterText="quickFilterTextBroadcast"
				:defaultColDef="defaultColDef"
				pagination="true"
			>
			</ag-grid-vue>

			<button class="btn btn-success form-control btn-inline ml0 mt20 mb10" @click="saveNotification()">
				<i class="fa fa-check bold"></i>
				Save
			</button>

			<button class="btn btn-success form-control btn-inline mt20 mb10" @click="notification_modal = false">
				Cancel
			</button>

			<button v-if="selected_notification.id && selected_notification.id != 0" class="btn btn-black form-control btn-inline ml10 mt20 mb10" @click="deleteNotification()">
				Delete
			</button>
		</div>
	</Modal>

	<Modal
		v-model="delete_modal"
		max-width="400px"
		:click-out="true"
	>
		<div class="modal-container">
			<h5 class="pb15">
				Delete Notification
			</h5>

			<p class="mt20">
				Are you sure you want to completely remove this notification from the platform?
			</p>

			<p class="mt20 bold fs13">
				"{{ selected_notification.title }}"
			</p>

			<button class="btn btn-success form-control btn-inline ml0 mt20 mb10" @click="_deleteNotification()">
				Delete
			</button>

			<button class="btn btn-success form-control btn-inline mt20 mb10" @click="delete_modal = false; notification_modal = true">
				Cancel
			</button>
		</div>
	</Modal>
</template>

<style scoped>



</style>