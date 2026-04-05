import polls from './polls'
import votes from './votes'
import achievementTypes from './achievement-types'
import pollCategories from './poll-categories'
import comments from './comments'
const api = {
    polls: Object.assign(polls, polls),
votes: Object.assign(votes, votes),
achievementTypes: Object.assign(achievementTypes, achievementTypes),
pollCategories: Object.assign(pollCategories, pollCategories),
comments: Object.assign(comments, comments),
}

export default api