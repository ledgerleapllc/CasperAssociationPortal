import React from 'react';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LandingHeader from '../../components/layouts/landing-header';
import LandingFooter from '../../components/layouts/landing-footer';

const FAQ = () => {
  const UPTIME_CODE = `
for each era within the calculation window:
  if (
    validator_is_not_in_current_era  OR
    validator_bid_is_inactive        AND
    validator_total_stake            >= minimum_bid_amount
  ):
    validator is marked "missed" this era in the calculation window

historical_performance = raw_uptime * (window - missed) / window
  `;

  /*
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>
                  Onboarding video
                </p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p></p>
                  <div className="c-video-wrap mt-5 mb-5">
                    <div className="c-video">
                      <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/2WB6RcY0MPc?controls=0&showinfo=0"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <p className="mb-5">What about a code snippet?</p>
                  <pre>
                    <code>{CODE}</code>
                  </pre>
                  <p className="mt-5">
                    Vulputate mi sit amet mauris commodo. Nulla aliquet
                    porttitor lacus luctus accumsan tortor. Leo vel fringilla
                    est ullamcorper eget nulla facilisi etiam. Quam id leo in
                    vitae turpis massa. Leo a diam sollicitudin tempor id eu.
                    Erat imperdiet sed euismod nisi porta. In est ante in nibh.
                    Semper viverra nam libero justo laoreet sit amet.
                  </p>
                </div>
              </div>
              <hr />
            </div>
  */

  return (
    <div
      id="landing-page__faq"
      className="text-white min-h-screen overflow-x-hidden landing-page"
    >
      <LandingHeader />
      <section id="landing-page__faqTitle" className="text-center">
        <h1 className="font-medium">Frequently Asked Questions (FAQ)</h1>
      </section>
      <section id="landing-page__faqBody" className="bg-white">
        <div className="custom-container text-black">
          <div id="landing-page__faqGhost" />
          <div id="landing-page__faqContent">
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>What is Casper Association Membersip Portal?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>
                    {`This is Casper Association's official portal that offers Casper network Validators to become trusted members by verifying their node, submitting a letter of intent, and completing KYC. Once inside the portal, members participate in the Casper Association Governance by partaking in votes and strengthening the Association governance. They will be able to participate in forums and access exclusive perks programs that come with the Membership`}
                  </p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>{`
                  I am not a Validator on Casper Blockchain, however can I become a member?
                `}</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    Currently, the membership portal only accepts membership from active validator node operators on Casper Blockchain. Node operators can apply for membership by registering here [link].
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>{`
                  What are the qualifications to be a voting member in this portal?
                `}</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    This portal is open to registration applications from Casper blockchain validators with nodes that maintain the following criteria:
                  `}</p>
                  <ul style={{ listStyleType: 'disc', marginLeft: '0.5em' }}>
                    <li className="mt-5">
                      Uptime of at least 97% as calculated from the last 180
                      ERAs. Uptime is defined in another FAQ question below.
                    </li>
                    <li className="mt-5">
                      Be active for a minimum of 360 ERAs, with a maximum of 1
                      ERA since your last redmark. Redmarks are defined in
                      another FAQ question below.
                    </li>
                    <li className="mt-5">
                      Less than 48 total Redmarks in the last 360 ERAs.
                    </li>
                    <li className="mt-5">
                      Registered users must pass KYC. If the user is an entity,
                      documents for the entity should be uploaded to reflect the
                      KYC user.
                    </li>
                  </ul>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>How do I become a member?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    You complete the registration process by first submitting your information on the registration page. Next, the onboarding process will walk you through the process of verifying your node, uploading a letter of reasoning explaining why you would like to become a member, and signing a form verifying you agree with the terms and conditions of portal access. Membership is subject to the Association's approval. A decision approving or denying your membership will be made within 72 hours after you complete the onboarding process. If you are approved, you will then be able to log in to the portal.
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>{`
                  I have more than one node. Which node address should I give at the time of registration?
                `}</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    Please enter your first validator node address during registration. This must be an unclaimed node not verified by another member. If you have more than one, you can add these later after registration. Also, please note that you will be required to prove that you are the node operator of the address you are entering. Otherwise, the registration will be unsuccessful.
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>How can I become a KYC verified user?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    When you log in to your portal you will find various prompts to submit KYC in order to activate all features. This process can also be found on the KYC tab. If registered as an individual, you will simply provide an identification document and related information during the KYC process. If you registered as a business, there will be an extra step prior to submitting your ID. You must provide business documents for your company indicating that you are the individual authorized to act on behalf of the company.
                  `}</p>
                  <p>{`
                    Completing the KYC submission leads to two possible outcomes:
                  `}</p>
                  <ol>
                    <li className="mt-5">
                      Normal flow -{' '}
                      <span className="c-faq-itemAnswer">
                        Auto-approval by the automated KYC verification system
                        that runs in the backend
                      </span>
                    </li>
                    <li className="mt-5">
                      Exception flow -{' '}
                      <span className="c-faq-itemAnswer">
                        Should there be any challenge in the backend, the system
                        will refer the case to manual review. Association's KYC
                        experts will review the case manually and will take
                        necessary actions. Exemptions lead to two possible
                        actions, manual override approval or further
                        requirements to submit additional documents as defined
                        by the Association. The Association will coordinate with
                        you via email if you fall into the exception flow.
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>{`
                  I have submitted the KYC documents, however I received a message stating that it will take 72 hrs to process.
                `}</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    Yes, sometimes KYC verification will take the exception route where manual review by KYC experts are required. Therefore it may take upto 72 hours to complete the process. 
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>What are the requirements to vote in the portal?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    Voting is reserved for members operating nodes in good standing. Members must complete KYC, have their node active for a substantial number of ERAs, and have no Redmarks for a substantial number of ERAs prior to the vote. The number of ERAs required for a node to be active and have no Redmarks can be found on the voting page in the portal.
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>What is a redmark?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    Redmarks are ERAs during which your bid was high enough to be in the validator pool but your node failed to participate in the validor pool. This is typically due a failure of the node itself. Redmarks should be noticed and cured quickly by inspecting your node logs - as too many can lead to the revocation of your membership.
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>{`
                  I see the uptime metric displayed in many places. How do you calculate the uptime of nodes?
                `}</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    In your portal, you will see many references to your node's Uptime. Uptime is a percentage calculated from the number of ERAs you were active in the validation pool, multiplied by the rewards offered per era, minus any eras you missed while your bid was high enough to participate in the validator pool. You will notice that your Uptime is known for ERAs prior to you joining as a member. This is because the membership system tracks all validator node performance in the pool.
                  `}</p>
                  <p className="mt-5 mb-5">{`Below is some pseudo code representing how the system calculates uptime, or "historical performance", given a validator ID over a span of eras, referred to as the "calculation window", set by the Association.`}</p>
                  <pre>
                    <code>{UPTIME_CODE}</code>
                  </pre>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>What happens if my uptime drops too low?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    Membership requires properly maintaining all nodes you operate. Should your Uptime drop too low, the system will issue a warning, followed by placing your account on probation for a period of time. During this time, you should work quickly to fix your node and bring your uptime number back above the minimum threshold indicated in the portal. If you do not restore your node by the end of the probation period, your membership will be revoked and you will lose access to the portal features. Revoked members can reapply for membership by increasing their Uptime and providing a written explanation of the issues leading to their revocation for the Association to consider when deciding whether or not to restore a revoked membership.
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>What happens if I get too many redmarks?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    Too many redmarks will lead to the revocation of your membership which will deactivate the features of your portal. Revoked members can reapply for membership by increasing their uptime and providing a written explanation of the issues leading to their revocation for the Association to consider when deciding whether or not to restore a revoked membership.
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>
                  I operate more than one node. So, do I get more than 1 vote?
                </p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    No, irrespective of the number of nodes that you operate, you will get only 1 vote. However, keep in mind that you are responsible for all nodes your register and must maintain good uptime for all nodes you claim.
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>{`
                  What are the key considerations in calculating the voting weightage?
                `}</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    Every member gets 1 vote. There is no wieghted voting at this time.
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>What is a warning level?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    Any node that is below the uptime threshold set by the Association will receive a warning and window to take corrective actions to bring their node(s) to a healthy operating level.
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>What is a probation level?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>{`
                    When a validator does not take necessary corrective actions within the specified window, their node(s) will slip to the probation level. At this level, node opertors will not be able to take part in the Association governance untl they bring their node(s) back to the acceptable level
                  `}</p>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </section>
      <LandingFooter />
    </div>
  );
};

export default LoadingScreen(FAQ, 'public');
