import PollController from './PollController'
import VoteController from './VoteController'
import AchievementTypeController from './AchievementTypeController'
import Settings from './Settings'
const Controllers = {
    PollController: Object.assign(PollController, PollController),
VoteController: Object.assign(VoteController, VoteController),
AchievementTypeController: Object.assign(AchievementTypeController, AchievementTypeController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers