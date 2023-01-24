<script>

import './login.css';
import { api } from '../api.js';

export default {
	data() {
		return {}
	},

	mounted() {
		this.getYear();
	},

	methods: {
		async getYear() {
			const response = await api(
				'GET', 
				'public/get-year', 
				{}
			);

			if (response.status == 200) {
				if (this.$refs['year']) {
					this.$refs['year'].innerText = response.message;
				}
			}
		}
	}
};

</script>

<template>
	<p class="text-white mt10 fs14">
		&copy; <span ref="year"></span> Casper Association
	</p>
</template>