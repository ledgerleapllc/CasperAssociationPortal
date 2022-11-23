import React, { Suspense, lazy } from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import { LoadingScreen } from '../components/hoc/loading-screen';

const LandingView = lazy(() => import('../views/landing'));
const FAQView = lazy(() => import('../views/faq'));
const PrivacyPolicyView = lazy(() => import('../views/privacy-policy'));
const HomeView = lazy(() => import('../views/home'));
const LoginView = lazy(() => import('../views/login'));
const RegisterTypeView = lazy(() => import('../views/register-type'));
const ResetPasswordView = lazy(() => import('../views/reset-password'));
const WelcomeView = lazy(() => import('../views/welcome'));
const RegisterIndividualView = lazy(() =>
  import('../views/register-individual')
);
const RegisterEntityView = lazy(() => import('../views/register-entity'));
const VerifyEmailView = lazy(() => import('../views/verify-email'));
const UpdateEmailView = lazy(() => import('../views/update-email'));
const UpdatePasswordView = lazy(() => import('../views/update-password'));
const RegisterSubAdminView = lazy(() => import('../views/register-sub-admin'));
const OnboardView = lazy(() => import('../views/onboard/index'));
const OnboardEsignTermsView = lazy(() =>
  import('../views/onboard/esign-terms')
);
const OnboardVerifyNodeView = lazy(() =>
  import('../views/onboard/verify-node-ownership')
);
const OnboardUploadLetterView = lazy(() =>
  import('../views/onboard/upload-letter')
);
const NodeExplorerView = lazy(() =>
  import('../views/validator-selection-tool/index')
);
const NodeExplorerDetailView = lazy(() =>
  import('../views/validator-selection-tool/[id]')
);
const DonateView = lazy(() => import('../views/donate/index'));
const AdminDashboardView = lazy(() => import('../views/admin/dashboard'));
const AdminTeamsView = lazy(() => import('../views/admin/teams'));
const AdminIntakeView = lazy(() => import('../views/admin/intake/index'));
const AdminReinstatementView = lazy(() =>
  import('../views/admin/reinstatement')
);
const AdminIntakeVerificationDetailView = lazy(() =>
  import('../views/admin/intake/verification/[id]/index')
);
const AdminUpgradesView = lazy(() => import('../views/admin/upgrades/index'));
const AdminUpgradesAddView = lazy(() => import('../views/admin/upgrades/add'));
const AdminUsersView = lazy(() => import('../views/admin/users/index'));
const AdminUsersDetailView = lazy(() =>
  import('../views/admin/users/[id]/index')
);
const AdminUsersDetailKYCView = lazy(() =>
  import('../views/admin/users/[id]/kyc')
);
const AdminBallotsView = lazy(() => import('../views/admin/ballots/index'));
const AdminBallotsAddView = lazy(() => import('../views/admin/ballots/add'));
const AdminBallotsEditView = lazy(() =>
  import('../views/admin/ballots/edit/[id]')
);
const AdminBallotsDetailView = lazy(() =>
  import('../views/admin/ballots/detail/[id]/index')
);
const AdminBallotsDetailCurrentVotesView = lazy(() =>
  import('../views/admin/ballots/detail/[id]/current-votes')
);
const AdminPerksView = lazy(() => import('../views/admin/perks/index'));
const AdminAddPerksView = lazy(() => import('../views/admin/perks/add'));
const AdminPerksDetailView = lazy(() =>
  import('../views/admin/perks/detail/[id]/index')
);
const AdminAllERAsView = lazy(() => import('../views/admin/all-eras'));
const AdminSettingsView = lazy(() => import('../views/admin/settings/index'));
const AdminSettingsEmailerView = lazy(() =>
  import('../views/admin/settings/emailer')
);
const AdminSettingsNotificationsView = lazy(() =>
  import('../views/admin/settings/notifications/index')
);
const AdminSettingsNotificationsAddView = lazy(() =>
  import('../views/admin/settings/notifications/add')
);
const AdminSettingsNotificationsDetailView = lazy(() =>
  import('../views/admin/settings/notifications/detail/[id]/index')
);
const DashboardView = lazy(() => import('../views/dashboard/index'));
const DashboardPerksView = lazy(() => import('../views/dashboard/perks/index'));
const DashboardPerksDetailView = lazy(() =>
  import('../views/dashboard/perks/[id]')
);
const DashboardVerificationView = lazy(() =>
  import('../views/dashboard/verification/index')
);
const DashboardMembershipView = lazy(() =>
  import('../views/dashboard/membership/index')
);
const DashboardNodesView = lazy(() => import('../views/dashboard/nodes'));
const DashboardNodesNewView = lazy(() =>
  import('../views/dashboard/nodes/new')
);
const DashboardMyERAsView = lazy(() => import('../views/dashboard/my-eras'));
const DashboardDiscussionView = lazy(() =>
  import('../views/dashboard/discussion/index')
);
const DashboardAddDiscussionView = lazy(() =>
  import('../views/dashboard/discussion/add')
);
const DashboardDiscussionDetailView = lazy(() =>
  import('../views/dashboard/discussion/[_id]')
);
const DashboardDiscussionEditView = lazy(() =>
  import('../views/dashboard/discussion/edit/[id]')
);
const DashboardUpgradesView = lazy(() => import('../views/dashboard/upgrades'));
const DashboardContactUsView = lazy(() =>
  import('../views/dashboard/contact-us')
);
const DashboardVotesView = lazy(() => import('../views/dashboard/votes/index'));
const DashboardVotesDetailView = lazy(() =>
  import('../views/dashboard/votes/[id]')
);
const DashboardSettingsView = lazy(() => import('../views/dashboard/settings'));
const DashboardProfileView = lazy(() =>
  import('../views/dashboard/profile/index')
);
const DashboardProfileDetailView = lazy(() =>
  import('../views/dashboard/profile/[id]')
);
const ChangeEmailCancelView = lazy(() =>
  import('../views/change-email/cancel-changes')
);
const ChangeEmailConfirmView = lazy(() =>
  import('../views/change-email/confirm')
);

const LandingPage = () => (
  <Router>
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" exact component={LandingView} />
        <Route path="/faq" exact component={FAQView} />
        <Route path="/privacy-policy" exact component={PrivacyPolicyView} />
        <Route
          path="/change-email/cancel-changes"
          exact
          component={ChangeEmailCancelView}
        />
        <Route
          path="/change-email/confirm"
          exact
          component={ChangeEmailConfirmView}
        />
        <Route path="/donate" exact component={DonateView} />
        <Route
          path="/validator-selection-tool"
          exact
          component={NodeExplorerView}
        />
        <Route
          path="/validator-selection-tool/:id"
          exact
          component={NodeExplorerDetailView}
        />
        <Route path="/home" exact component={HomeView} />
        <Route path="/login" exact component={LoginView} />
        <Route path="/register-type" exact component={RegisterTypeView} />
        <Route
          path="/register-individual"
          exact
          component={RegisterIndividualView}
        />
        <Route path="/register-entity" exact component={RegisterEntityView} />
        <Route path="/reset-password" exact component={ResetPasswordView} />
        <Route path="/verify-email" exact component={VerifyEmailView} />
        <Route path="/update-email" exact component={UpdateEmailView} />
        <Route path="/update-password" exact component={UpdatePasswordView} />
        <Route
          path="/register-sub-admin"
          exact
          component={RegisterSubAdminView}
        />
        <Route path="/welcome" exact component={WelcomeView} />
        <Route path="/onboard" exact component={OnboardView} />
        <Route
          path="/onboard/esign-terms"
          exact
          component={OnboardEsignTermsView}
        />
        <Route
          path="/onboard/verify-node-ownership"
          exact
          component={OnboardVerifyNodeView}
        />
        <Route
          path="/onboard/upload-letter"
          exact
          component={OnboardUploadLetterView}
        />
        <Route path="/admin" exact>
          <Redirect to="/admin/dashboard" />
        </Route>
        <Route path="/admin/dashboard" exact component={AdminDashboardView} />
        <Route path="/admin/teams" exact component={AdminTeamsView} />
        <Route path="/admin/intake" exact component={AdminIntakeView} />
        <Route
          path="/admin/reinstatement"
          exact
          component={AdminReinstatementView}
        />
        <Route
          path="/admin/intake/verification/:id"
          exact
          component={AdminIntakeVerificationDetailView}
        />
        <Route path="/admin/upgrades" exact component={AdminUpgradesView} />
        <Route
          path="/admin/upgrades/add"
          exact
          component={AdminUpgradesAddView}
        />
        <Route path="/admin/users" exact component={AdminUsersView} />
        <Route path="/admin/users/:id" exact component={AdminUsersDetailView} />
        <Route
          path="/admin/users/:id/kyc"
          exact
          component={AdminUsersDetailKYCView}
        />
        <Route path="/admin/ballots" exact component={AdminBallotsView} />
        <Route
          path="/admin/ballots/add"
          exact
          component={AdminBallotsAddView}
        />
        <Route
          path="/admin/ballots/edit/:id"
          exact
          component={AdminBallotsEditView}
        />
        <Route
          path="/admin/ballots/detail/:id"
          exact
          component={AdminBallotsDetailView}
        />
        <Route
          path="/admin/ballots/detail/:id/current-votes"
          exact
          component={AdminBallotsDetailCurrentVotesView}
        />
        <Route path="/admin/all-eras" exact component={AdminAllERAsView} />
        <Route path="/admin/perks" exact component={AdminPerksView} />
        <Route path="/admin/perks/add" exact component={AdminAddPerksView} />
        <Route
          path="/admin/perks/detail/:id"
          exact
          component={AdminPerksDetailView}
        />
        <Route path="/admin/settings" exact component={AdminSettingsView} />
        <Route
          path="/admin/settings/emailer"
          exact
          component={AdminSettingsEmailerView}
        />
        <Route
          path="/admin/settings/notifications"
          exact
          component={AdminSettingsNotificationsView}
        />
        <Route
          path="/admin/settings/notifications/add"
          exact
          component={AdminSettingsNotificationsAddView}
        />
        <Route
          path="/admin/settings/notifications/detail/:id"
          exact
          component={AdminSettingsNotificationsDetailView}
        />
        <Route path="/dashboard" exact component={DashboardView} />
        <Route path="/dashboard/perks" exact component={DashboardPerksView} />
        <Route
          path="/dashboard/perks/:id"
          exact
          component={DashboardPerksDetailView}
        />
        <Route
          path="/dashboard/verification"
          exact
          component={DashboardVerificationView}
        />
        <Route
          path="/dashboard/membership"
          exact
          component={DashboardMembershipView}
        />
        <Route
          path="/dashboard/nodes/new"
          exact
          component={DashboardNodesNewView}
        />
        <Route path="/dashboard/nodes" exact component={DashboardNodesView} />
        <Route
          path="/dashboard/my-eras"
          exact
          component={DashboardMyERAsView}
        />
        <Route
          path="/dashboard/discussion"
          exact
          component={DashboardDiscussionView}
        />
        <Route
          path="/dashboard/discussion/add"
          exact
          component={DashboardAddDiscussionView}
        />
        <Route
          path="/dashboard/discussion/:id"
          exact
          component={DashboardDiscussionDetailView}
        />
        <Route
          path="/dashboard/discussion/edit/:id"
          exact
          component={DashboardDiscussionEditView}
        />
        <Route
          path="/dashboard/upgrades"
          exact
          component={DashboardUpgradesView}
        />
        <Route
          path="/dashboard/contact-us"
          exact
          component={DashboardContactUsView}
        />
        <Route path="/dashboard/votes" exact component={DashboardVotesView} />
        <Route
          path="/dashboard/votes/:id"
          exact
          component={DashboardVotesDetailView}
        />
        <Route
          path="/dashboard/settings"
          exact
          component={DashboardSettingsView}
        />
        <Route
          path="/dashboard/profile"
          exact
          component={DashboardProfileView}
        />
        <Route
          path="/dashboard/profile/:id"
          exact
          component={DashboardProfileDetailView}
        />
      </Switch>
    </Suspense>
  </Router>
);

export default LoadingScreen(LandingPage, 'public');
