import ApiAuthController from './ApiAuthController'
import UserAchievementController from './UserAchievementController'
import ReportController from './ReportController'
import PollController from './PollController'
import VoteController from './VoteController'
import AchievementTypeController from './AchievementTypeController'
import PollCategoryController from './PollCategoryController'
import CommentController from './CommentController'
import Settings from './Settings'
const Controllers = {
    ApiAuthController: Object.assign(ApiAuthController, ApiAuthController),
UserAchievementController: Object.assign(UserAchievementController, UserAchievementController),
ReportController: Object.assign(ReportController, ReportController),
PollController: Object.assign(PollController, PollController),
VoteController: Object.assign(VoteController, VoteController),
AchievementTypeController: Object.assign(AchievementTypeController, AchievementTypeController),
PollCategoryController: Object.assign(PollCategoryController, PollCategoryController),
CommentController: Object.assign(CommentController, CommentController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers