import ApiAuthController from './ApiAuthController'
import UserAchievementController from './UserAchievementController'
import DashboardController from './DashboardController'
import ReportController from './ReportController'
import PollController from './PollController'
import AchievementTypeController from './AchievementTypeController'
import PollCategoryController from './PollCategoryController'
import CommentController from './CommentController'
import VoteController from './VoteController'
import Settings from './Settings'
const Controllers = {
    ApiAuthController: Object.assign(ApiAuthController, ApiAuthController),
UserAchievementController: Object.assign(UserAchievementController, UserAchievementController),
DashboardController: Object.assign(DashboardController, DashboardController),
ReportController: Object.assign(ReportController, ReportController),
PollController: Object.assign(PollController, PollController),
AchievementTypeController: Object.assign(AchievementTypeController, AchievementTypeController),
PollCategoryController: Object.assign(PollCategoryController, PollCategoryController),
CommentController: Object.assign(CommentController, CommentController),
VoteController: Object.assign(VoteController, VoteController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers