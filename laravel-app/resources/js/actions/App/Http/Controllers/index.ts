import UserAchievementController from './UserAchievementController'
import PollController from './PollController'
import VoteController from './VoteController'
import AchievementTypeController from './AchievementTypeController'
import PollCategoryController from './PollCategoryController'
import Settings from './Settings'
const Controllers = {
    UserAchievementController: Object.assign(UserAchievementController, UserAchievementController),
PollController: Object.assign(PollController, PollController),
VoteController: Object.assign(VoteController, VoteController),
AchievementTypeController: Object.assign(AchievementTypeController, AchievementTypeController),
PollCategoryController: Object.assign(PollCategoryController, PollCategoryController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers