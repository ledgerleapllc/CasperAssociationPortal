<script>

import { api } from '../api.js';
import $ from 'jquery';
import iziToast from 'izitoast';
import OuterNav from '../OuterNav.vue';
import OuterFooter from '../OuterFooter.vue';

export default {
	data() {
		return {
		}
	},

	components: {
		OuterNav,
		OuterFooter
	},

	created() {
	},

	mounted() {
		let that = this;
	},

	methods: {
	}
};

</script>

<template>
	<div class="landing-container">
		<OuterNav></OuterNav>

		<div class="container max-1200 white pt50">
			<div class="row">
				<div class="col-md-12 mt100">
					<h1 class="fs40 text-center" :class="this.$root.isMobile ? '' : 'mt100'">
						Frequently Asked Questions (FAQ)
					</h1>
				</div>
			</div>
		</div>

		<div class="container-fuid bg-white mt100 pl25 pr25">
			<div class="container max-1200 bg-white box-shadow nmt50">
				<div class="row">
					<div class="col-md-12 p20">
						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								What is Casper Association Membersip Portal?
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								This is Casper Association’s official portal that offers Casper network Validators to become trusted members by verifying their node, submitting a letter of intent, and completing KYC. Once inside the portal, members can access tools to allow them to enhance the management and operation of their node. They will be able to participate in forums and access exclusive rewards programs that come with the Membership. Over time members will contribute to the growth in decentralization of the Casper network and governance of the Casper Association.
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								I am not a Validator on Casper Blockchain, however can I become a member? 
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								Currently, the membership portal only accepts membership from active validator node operators on Casper Blockchain. Node operators can apply for membership by registering <a href="/signup">here</a>.
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								What are the qualifications to be a voting member in this portal? 
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								This portal is open to registration applications from Casper blockchain validators with nodes that maintain the following criteria:

								<ul class="mt20">
									<li class="bold fs15 black mt10">
										Uptime of at least 97% as calculated from the last 180 ERAs. Uptime is defined in another FAQ question below.
									</li>
									<li class="bold fs15 black mt10">
										Be active for a minimum of 360 ERAs, with a maximum of 1 ERA since your last redmark. Redmarks are defined in another FAQ question below.
									</li>
									<li class="bold fs15 black mt10">
										Less than 48 total Redmarks in the last 360 ERAs.
									</li>
									<li class="bold fs15 black mt10">
										Registered users must pass KYC. If the user is an entity, documents for the entity should be uploaded to reflect the KYC user.
									</li>
								</ul>
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								How do I become a member?
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								You complete the registration process by first submitting your information on the registration page. Next, the onboarding process will walk you through the process of verifying your node, uploading a letter of reasoning explaining why you would like to become a member, and signing a form verifying you agree with the terms and conditions of portal access. Membership is subject to the Association's approval. A decision approving or denying your membership will be made within 72 hours after you complete the onboarding process. If you are approved, you will then be able to log in to the portal. 
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								I have more than one node. Which node address should I give at the time of registration? 
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								Please enter your first validator node address during registration. This must be an unclaimed node not verified by another member. If you have more than one, you can add these later after registration. Also, please note that you will be required to prove that you are the node operator of the address you are entering. Otherwise, the registration will be unsuccessful. 
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								How can I become a KYC verified user?
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								When you log in to your portal you will find various prompts to submit KYC in order to activate all features. This process can also be found on the KYC tab. If registered as an individual, you will simply provide an identification document and related information during the KYC process. If you registered as a business, there will be an extra step prior to submitting your ID. You must provide business documents for your company indicating that you are the individual authorized to act on behalf of the company.

								<p class="mt15">
									Completing the KYC submission leads to two possible outcomes:
								</p>

								<p class="mt20 bold fs14 black">
									Normal flow
									<p class="mt5 fs14 black">
										Auto-approval by the automated KYC verification system that runs in the backend.
									</p>
								</p>

								<p class="mt20 bold fs14 black">
									Exception flow
									<p class="mt5 fs14 black">
										Should there be any challenge in the backend, the system will refer the case to manual review. Association's KYC experts will review the case manually and will take necessary actions. Exemptions lead to two possible actions, manual override approval or further requirements to submit additional documents as defined by the Association. The Association will coordinate with you via email if you fall into the exception flow.
									</p>
								</p>
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								I have submitted the KYC documents, however I received a message stating that it will take 72 hrs to process. 
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								Yes, sometimes KYC verification will take the exception route where manual review by KYC experts are required. Therefore it may take upto 72 hours to complete the process. 
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								What are the requirements to vote in the portal?
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								Voting will be reserved for members operating nodes in good standing. Members must complete KYC, have their node active for a substantial number of ERAs, and have no Redmarks for a substantial number of ERAs prior to the vote. The number of ERAs required for a node to be active and have no Redmarks can be found on the voting page in the portal.
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								What is a redmark?
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								Redmarks are ERAs during which your bid was high enough to be in the validator pool but your node failed to participate in the validor pool. This is typically due a failure of the node itself. Redmarks should be noticed and cured quickly by inspecting your node logs - as too many can lead to the revocation of your membership. 
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								I see the uptime metric displayed in many places. How do you calculate the uptime of nodes? 
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								In your portal, you will see many references to your node's Uptime. Uptime is a percentage calculated from the number of ERAs you were active in the validation pool, multiplied by the rewards offered per era, minus any eras you missed while your bid was high enough to participate in the validator pool. You will notice that your Uptime is known for ERAs prior to you joining as a member. This is because the membership system tracks all validator node performance in the pool. 

								<p class="mt20">
									Below is some pseudo code representing how the system calculates uptime, or "historical performance", given a validator ID over a span of eras, referred to as the "calculation window", set by the Association.
								</p>

								<pre>
									<code>
for each era within the calculation window:
  if (
    validator_is_not_in_current_era  OR
    validator_bid_is_inactive        AND
    validator_total_stake            >= minimum_bid_amount
  ):
    validator is marked "missed" this era in the calculation window

historical_performance = raw_uptime * (window - missed) / window
									</code>
								</pre>
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								What happens if my uptime drops too low?
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								Membership requires properly maintaining all nodes you operate. Should your Uptime drop too low, the system will issue a warning, followed by placing your account on probation for a period of time. During this time, you should work quickly to fix your node and bring your uptime number back above the minimum threshold indicated in the portal. If you do not restore your node by the end of the probation period, your membership will be revoked and you will lose access to the portal features. Revoked members can reapply for membership by increasing their Uptime and providing a written explanation of the issues leading to their revocation for the Association to consider when deciding whether or not to restore a revoked membership. 
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								What happens if I get too many redmarks?
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								Too many redmarks will lead to the revocation of your membership which will deactivate the features of your portal. Revoked members can reapply for membership by increasing their uptime and providing a written explanation of the issues leading to their revocation for the Association to consider when deciding whether or not to restore a revoked membership. 
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								I operate more than one node. So, do I get more than 1 vote?
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								No, irrespective of the number of nodes that you operate, you will get only 1 vote. However, keep in mind that you are responsible for all nodes your register and must maintain good uptime for all nodes you claim. 
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								What are the key considerations in calculating the voting weightage? 
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								Every member gets 1 vote. There will be no weighted voting.
							</div>
						</div>

						<hr>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								What is a warning level?
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								Any node that is below the uptime threshold set by the Association will receive a warning and window to take corrective actions to bring their node(s) to a healthy operating level. 
							</div>
						</div>

						<br>

						<div class="question">
							<div class="left">
								Q.
							</div>
							<div class="right">
								What is a probation level?
							</div>
						</div>
						<div class="answer">
							<div class="left">
								A.
							</div>
							<div class="right">
								When a validator does not take necessary corrective actions within the specified window, their node(s) will slip to the probation level. At this level, node opertors will not be able to take part in the Association governance untl they bring their node(s) back to the acceptable level 
							</div>
						</div>

						<hr>
					</div>
				</div>
			</div>
		</div>

		<OuterFooter></OuterFooter>
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

.box-shadow {
	box-shadow: 0px 2px 6px rgba(0,0,0,0.29);
}

.nmt50 {
	transform: translateY(-50px);
	-o-transform: translateY(-50px);
	-ms-transform: translateY(-50px);
	-moz-transform: translateY(-50px);
	-webkit-transform: translateY(-50px);
}

.nav1-inner {
	display: flex;
	flex-direction: row;
	text-align: center;
	justify-content: center;
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

.landing-container {
	background-image: url('@/assets/images/bg2.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: auto;
	min-height: 100vh;
	background-attachment: fixed;
}

.flex-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.laptop {
	width: 100%;
}

.red-bar {
	background-color: #8b0e0e;
}

.max-300 {
	max-width: 500px;
}

.max-1200 {
	max-width: 1200px;
}

.divider {
	width: 100px;
	margin: 0 auto;
	border: 2px solid #ff2d2e;
}

.tick-mark {
	position: relative;
	display: flex;
	flex-direction: row;
}

.tick {
	width: 18px;
	border-top: 3px solid #ff2d2e;
	margin-top: 12px;
	margin-right: 15px;
}

.landing-input {
	background-color: #771d1d;
	border: 2px solid #ff473d;
	color: white;
}

.landing-input::placeholder {
	color: white;
	font-size: 18px;
}

.height-300 {
	height: 300px;
}

.question {
	position: relative;
	display: flex;
	flex-direction: row;
	background-color: #f9f9f9;
}

.question .left {
	border-left: 4px solid #ff473d;
	height: 60px;
	width: 110px;
	font-size: 40px;
	font-weight: bold;
	color: #ff473d;
	display: flex;
	align-items: center;
	padding-left: 15px;
}

.question .right {
	height: 60px;
	font-size: 18px;
	font-weight: bold;
	display: flex;
	align-items: center;
	width: calc(100% - 110px);
}

.answer {
	position: relative;
	display: flex;
	flex-direction: row;
	background-color: #fff;
}

.answer .left {
	border-left: 4px solid #9f9f9f;
	height: 60px;
	width: 110px;
	font-size: 40px;
	font-weight: bold;
	color: #9f9f9f;
	display: flex;
	align-items: center;
	padding-left: 15px;
}

.answer .right {
	height: auto;
	min-height: 60px;
	font-size: 18px;
	width: calc(100% - 110px);
	padding-top: 15px;
	color: #777;
}

pre {
	margin-top: 20px;
	background-color: #f5f5f5;
	color: #353535;
	padding: 0 25px;
	font-size: 14px;
	padding-top: 25px;
}

hr {
	border-color: #9f9f9f;
	margin-top: 30px;
	margin-bottom: 20px;
}

@media all and (max-width: 767px) {
	.question .left {
		font-size: 30px;
		height: 120px;
		width: 70px;
	}

	.question .right {
		font-size: 16px;
		width: calc(100% - 70px);
		height: 120px;
	}

	.answer .left {
		font-size: 30px;
		height: 120px;
		width: 70px;
	}

	.answer .right {
		font-size: 16px;
		width: calc(100% - 70px);
	}
}

</style>