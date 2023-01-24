<script>

import App from '../../../App.vue';
import { api } from '../../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import Popper from 'vue3-popper';
import { copyText } from 'vue3-clipboard';
import { Modal } from 'vue-neat-modal';

export default {
	components: {
		Popper,
		ClipLoader,
		Modal
	},

	data() {
		return {
			notifications: [],
		}
	},

	created() {
		this.getNotifications();
	},

	mounted() {
		let that = this;
	},

	watch: {
	},

	methods: {
		async getNotifications() {
			let fetch_bearer_token = this.$cookies.get('bearer_token');

			const response = await api(
				'GET',
				'user/get-notifications',
				{},
				fetch_bearer_token
			);

			this.$root.catch401(response);

			if (response.status == 200) {
				// console.log(response);
				this.notifications = response.detail;
			}
		},

		async dismiss_notification(notification_id) {
			await this.$root.dismiss_notification(notification_id);
			await this.getNotifications();
			await this.$root.getMe();
		},

		openLink(url) {
			window.open(url);
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
						Notifications
					</div>
					<div
						v-for="notification in notifications"
						class="notification-row"
						:class="'notification-banner-'+notification.type"
					>
						<div class="notification-icon">
							<i v-if="notification.type == 'error'" class="fa fa-times-circle fs20"></i>
							<i v-else-if="notification.type == 'warning'" class="fa fa-warning fs20"></i>
							<i v-else-if="notification.type == 'question'" class="fa fa-question-circle fs20"></i>
							<i v-else-if="notification.type == 'info'" class="fa fa-info fs20"></i>
						</div>
						<div class="notification-banner-content">
							<span>
								<span class="fs12 op6">
									{{ notification.created_at }} UTC
								</span>
								<br/>
								<br/>
								{{ notification.message }}
								&ensp;
								<span
									v-if="notification.cta != ''"
									class="underline bold pointer fs11"
									@click="openLink(notification.cta)"
								>
									Learn More
								</span>
								<br/>
								<button 
									v-if="
										parseInt(notification.dismissable) == 1 &&
										!notification.dismissed_at
									"
									class="btn btn-secondary btn-sm fs11 mt10"
									@click="dismiss_notification(notification.notification_id)" 
								>
									Dismiss
								</button>
							</span>
						</div>
					</div>

					<div v-if="notifications.length == 0" class="notification-row">
						<div class="notification-banner-content pl20">
							<p>Nothing here</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.notification-row {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: auto;
	min-height: 58px;
	padding-top: 15px;
	padding-bottom: 15px;
	position: relative;
}

.notification-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 85px;
}

.notification-banner-content {
	color: #000;
	font-size: 14px;
	width: calc(100% - 85px);
	height: 100%;
}

</style>