import dashboard from './dashboard'
import polls from './polls'
import achievementTypes from './achievement-types'
import pollCategories from './poll-categories'
import comments from './comments'
const api = {
    dashboard: Object.assign(dashboard, dashboard),
polls: Object.assign(polls, polls),
achievementTypes: Object.assign(achievementTypes, achievementTypes),
pollCategories: Object.assign(pollCategories, pollCategories),
comments: Object.assign(comments, comments),
}

export default api