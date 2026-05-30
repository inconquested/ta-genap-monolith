import ApiAuthController from './ApiAuthController'
import UserAchievementController from './UserAchievementController'
import DashboardController from './DashboardController'
import ReportController from './ReportController'
import PollController from './PollController'
import AchievementTypeController from './AchievementTypeController'
import PollCategoryController from './PollCategoryController'
import CommentController from './CommentController'
import LeaderboardController from './LeaderboardController'
import VoteController from './VoteController'
import NotificationController from './NotificationController'
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
LeaderboardController: Object.assign(LeaderboardController, LeaderboardController),
VoteController: Object.assign(VoteController, VoteController),
NotificationController: Object.assign(NotificationController, NotificationController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers