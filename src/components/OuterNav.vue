<script>

import FaviconWhite from '@/assets/images/favicon-white.png';

export default {
	data() {
		return {
			loading:       false,
			nav_class:     'top',
			favicon_white: FaviconWhite,

			mobile_open:   false,
			bear:          false
		}
	},

	components: {
	},

	created() {
		this.bear = this.$cookies.get('bearer_token');

		window.addEventListener(
			'scroll', 
			this.updateNav
		);

		window.addEventListener(
			'click',
			(event) => {
				if (
					event.target.id == 'outer-mobile-trigger' ||
					event.target.id == 'outer-mobile-trigger-wrap'
				) {
					this.mobile_open = true;
				} else {
					this.mobile_open = false;
				}
			}
		);

		if (window.scrollY > 150) {
			this.nav_class = 'nottop';
		} else {
			this.nav_class = 'top';
		}
	},

	methods: {
		updateNav(event) {
			if (window.scrollY > 150) {
				this.nav_class = 'nottop';
			} else {
				this.nav_class = 'top';
			}
		},

		toggleMobileNav() {
			if (this.mobile_open) {
				this.mobile_open = false;
			} else {
				this.mobile_open = true;
			}
		}
	}
};
</script>

<template>
	<div
		id="nav1" 
		:class="'nav-'+nav_class"
	>
		<img 
			:src="favicon_white" 
			class="nav-icon"
			:class="'nav-icon-'+nav_class"
			@click="this.$root.routeTo('/')"
		>

		<div v-if="!this.$root.isMobile" class="nav1-inner">
			<div class="nav-item" @click="this.$root.routeTo('/')">
				About
			</div>

			<div class="nav-item" @click="this.$root.routeTo('/validator-selection-tool')">
				Validator Tools
			</div>

			<div class="nav-item" @click="this.$root.routeTo('/faq')">
				FAQ
			</div>

			<div
				v-if="!bear || bear == 'undefined'"
				class="nav-item" 
				@click="this.$root.routeTo('/login')"
			>
				Login/Register
			</div>

			<div
				v-else
				class="nav-item" 
				@click="this.$root.routeTo('/login')"
			>
				<i class="fa fa-home mr5"></i>
				My Portal
			</div>
		</div>

		<div
			v-if="this.$root.isMobile"
			class="hamburger"
			:class="'hamburger-'+nav_class"
			id="outer-mobile-trigger-wrap"
		>
			<i v-if="mobile_open" class="fa fa-times fs26"></i>
			<i v-else class="fa fa-bars fs26" id="outer-mobile-trigger"></i>
		</div>

		<div 
			v-if="this.$root.isMobile"
			class="mobile-menu"
			:class="
				'mobile-menu-'+nav_class+
				' mobile-menu-'+(mobile_open ? 'open' : 'closed')
			"
		>
			<div @click="this.$root.routeTo('/')">
				About
			</div>

			<div @click="this.$root.routeTo('/validator-selection-tool')">
				Validator Tools
			</div>

			<div @click="this.$root.routeTo('/faq')">
				FAQ
			</div>

			<div 
				v-if="!bear || bear == 'undefined'"
				@click="this.$root.routeTo('/login')"
			>
				Login/Register
			</div>

			<div 
				v-else
				@click="this.$root.routeTo('/login')"
			>
				<i class="fa fa-home mr5"></i>
				My Portal
			</div>
		</div>
	</div>
</template>

<style scoped>

#nav1 {
	width: 100%;
	color: white;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
	transition: .2s ease;
}

.nav-icon {
	width: 37px;
	height: 37px;
	position: absolute;
	left: 25px;
	cursor: pointer;
	transition: .2s ease;
}

.nav-icon-top {
	top: 32px;
}

.nav-icon-nottop {
	top: 22px;
}

.nav-top {
	height: 100px;
	background: rgba(139,14,14,0.4);
	transition: .2s ease;
}

.nav-nottop {
	height: 80px;
	background: rgba(139,14,14,1);
	box-shadow: 0px 2px 6px rgba(0,0,0,0.29);
	transition: .2s ease;
}

.nav1-inner {
	display: flex;
	flex-direction: row;
	text-align: center;
	justify-content: center;
	position: relative;
}

.nav-item {
	margin-left: 5px;
	margin-right: 5px;
	cursor: pointer;
	font-size: 18px;
	padding: 20px;
	border-bottom: 2px solid transparent;
	transition: .2s ease;
}

.nav-item:hover,
.nav-item:active {
	border-bottom: 2px solid rgba(255,255,255,0.3);
	transition: .2s ease;
}

.hamburger {
	position: absolute;
	right: 0;
	top: 0;
	cursor: pointer;
	transition: .2s ease;
	display: flex;
	justify-content: center;
	align-items: center;
}

.hamburger-top {
	height: 100px;
	width: 80px;
}

.hamburger-nottop {
	height: 80px;
	width: 80px;
}

.mobile-menu {
	position: fixed;
	right: 0;
	width: 280px;
	height: auto;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0px 2px 6px rgba(0,0,0,0.29);
	transition: .2s ease;
	transform-origin: top;
}

.mobile-menu-top {
	top: 100px;
}

.mobile-menu-nottop {
	top: 80px;
}

.mobile-menu-open {
	opacity: 1;
	transform: scaleY(1);
	pointer-events: all;
}

.mobile-menu-closed {
	opacity: 0;
	transform: scaleY(0);
	pointer-events: none;
}

.mobile-menu div {
	padding: 13px 20px;
	cursor: pointer;
	font-size: 18px;
	font-weight: bold;
	transition: .1s ease;
	color: #555;
}

.mobile-menu div:hover {
	background-color: #f3f6f9;
	transition: .1s ease;
}

</style>