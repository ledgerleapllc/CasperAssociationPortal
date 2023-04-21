<script>

import moment from 'moment';

export default {
	data() {
		return {
			time: '',
			perc: 0,

			start_time: 0,
			end_time:   0
		}
	},

	created() {
	},

	mounted() {
		let params = this.$props?.params;

		if (params?.data?.status == 'pending') {
			return '<span class="op7">Voting not yet started</span>';
		}

		this.time = params?.value;
		this.perc = params?.data?.time_remaining_perc;

		this.start_time = params?.data?.start_time;
		this.end_time   = params?.data?.end_time;

		if (this.perc > 0) {
			this.startCountdown();
		}
	},

	methods: {
		startCountdown() {
			let that = this;
			setInterval(function() {
				that.countdownTick();
			}, 1000);
		},

		countdownTick() {
			if (this.time == "00:00:00:00") {
				return;
			}

			let split  = this.time.split(':');
			let day    = parseInt(split[0] ?? 0);
			let hour   = parseInt(split[1] ?? 0);
			let minute = parseInt(split[2] ?? 0);
			let second = parseInt(split[3] ?? 0);

			if (second > 0) {
				second -= 1;
			} else {
				second = 59;

				if (minute > 0) {
					minute -= 1;
				} else {
					minute = 59;

					if (hour > 0) {
						hour -= 1;
					} else {
						hour = 23;

						if (day > 0) {
							day -= 1;
						}
					}
				}
			}

			day = (
				day.toString().length == 1 ? 
				`0${day}` : 
				`${day}`
			);

			hour = (
				hour.toString().length == 1 ? 
				`0${hour}` : 
				`${hour}`
			);

			minute = (
				minute.toString().length == 1 ? 
				`0${minute}` : 
				`${minute}`
			);

			second = (
				second.toString().length == 1 ? 
				`0${second}` : 
				`${second}`
			);

			this.time = `${day}:${hour}:${minute}:${second}`;

			let numerator = (
				moment.utc(this.end_time).unix() - 
				moment().unix()
			);

			let denominator = (
				moment.utc(this.end_time).unix() - 
				moment.utc(this.start_time).unix()
			);

			numerator   = numerator   <= 0 ? 1 : numerator;
			denominator = denominator <= 0 ? 1 : denominator;

			this.perc = (
				numerator / 
				denominator *
				100
			).toFixed(4);

			if (this.perc < 0) {
				this.perc = 0;
			}
		},
	}
};

</script>
<template>
	<div class="progress-bar-wrap">
		<p>
			{{ time }}
		</p>

		<div 
			class="progress-bar" 
			:style="'width:'+perc+'%'"
		>
		</div>
	</div>
</template>