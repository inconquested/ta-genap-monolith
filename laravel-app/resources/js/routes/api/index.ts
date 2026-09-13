import dashboard from './dashboard'
import reports from './reports'
import userAchievements from './user-achievements'
import analytics from './analytics'
import polls from './polls'
import achievementTypes from './achievement-types'
import pollCategories from './poll-categories'
import comments from './comments'
const api = {
    dashboard: Object.assign(dashboard, dashboard),
reports: Object.assign(reports, reports),
userAchievements: Object.assign(userAchievements, userAchievements),
analytics: Object.assign(analytics, analytics),
polls: Object.assign(polls, polls),
achievementTypes: Object.assign(achievementTypes, achievementTypes),
pollCategories: Object.assign(pollCategories, pollCategories),
comments: Object.assign(comments, comments),
}

export default api