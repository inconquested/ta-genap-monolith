import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\UserAchievementController::revoke
 * @see app/Http/Controllers/UserAchievementController.php:22
 * @route '/api/user-achievements/{userAchievement}/revoke'
 */
export const revoke = (args: { userAchievement: string | { id: string } } | [userAchievement: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

revoke.definition = {
    methods: ["post"],
    url: '/api/user-achievements/{userAchievement}/revoke',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserAchievementController::revoke
 * @see app/Http/Controllers/UserAchievementController.php:22
 * @route '/api/user-achievements/{userAchievement}/revoke'
 */
revoke.url = (args: { userAchievement: string | { id: string } } | [userAchievement: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userAchievement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { userAchievement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    userAchievement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        userAchievement: typeof args.userAchievement === 'object'
                ? args.userAchievement.id
                : args.userAchievement,
                }

    return revoke.definition.url
            .replace('{userAchievement}', parsedArgs.userAchievement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserAchievementController::revoke
 * @see app/Http/Controllers/UserAchievementController.php:22
 * @route '/api/user-achievements/{userAchievement}/revoke'
 */
revoke.post = (args: { userAchievement: string | { id: string } } | [userAchievement: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserAchievementController::revoke
 * @see app/Http/Controllers/UserAchievementController.php:22
 * @route '/api/user-achievements/{userAchievement}/revoke'
 */
    const revokeForm = (args: { userAchievement: string | { id: string } } | [userAchievement: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: revoke.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserAchievementController::revoke
 * @see app/Http/Controllers/UserAchievementController.php:22
 * @route '/api/user-achievements/{userAchievement}/revoke'
 */
        revokeForm.post = (args: { userAchievement: string | { id: string } } | [userAchievement: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: revoke.url(args, options),
            method: 'post',
        })
    
    revoke.form = revokeForm
/**
* @see \App\Http\Controllers\UserAchievementController::restore
 * @see app/Http/Controllers/UserAchievementController.php:32
 * @route '/api/user-achievements/{userAchievement}/restore'
 */
export const restore = (args: { userAchievement: string | { id: string } } | [userAchievement: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

restore.definition = {
    methods: ["post"],
    url: '/api/user-achievements/{userAchievement}/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserAchievementController::restore
 * @see app/Http/Controllers/UserAchievementController.php:32
 * @route '/api/user-achievements/{userAchievement}/restore'
 */
restore.url = (args: { userAchievement: string | { id: string } } | [userAchievement: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userAchievement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { userAchievement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    userAchievement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        userAchievement: typeof args.userAchievement === 'object'
                ? args.userAchievement.id
                : args.userAchievement,
                }

    return restore.definition.url
            .replace('{userAchievement}', parsedArgs.userAchievement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserAchievementController::restore
 * @see app/Http/Controllers/UserAchievementController.php:32
 * @route '/api/user-achievements/{userAchievement}/restore'
 */
restore.post = (args: { userAchievement: string | { id: string } } | [userAchievement: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserAchievementController::restore
 * @see app/Http/Controllers/UserAchievementController.php:32
 * @route '/api/user-achievements/{userAchievement}/restore'
 */
    const restoreForm = (args: { userAchievement: string | { id: string } } | [userAchievement: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: restore.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserAchievementController::restore
 * @see app/Http/Controllers/UserAchievementController.php:32
 * @route '/api/user-achievements/{userAchievement}/restore'
 */
        restoreForm.post = (args: { userAchievement: string | { id: string } } | [userAchievement: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: restore.url(args, options),
            method: 'post',
        })
    
    restore.form = restoreForm
const userAchievements = {
    revoke: Object.assign(revoke, revoke),
restore: Object.assign(restore, restore),
}

export default userAchievements