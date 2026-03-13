import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserAchievementController::index
 * @see app/Http/Controllers/UserAchievementController.php:10
 * @route '/api/user/achievements'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/user/achievements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserAchievementController::index
 * @see app/Http/Controllers/UserAchievementController.php:10
 * @route '/api/user/achievements'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserAchievementController::index
 * @see app/Http/Controllers/UserAchievementController.php:10
 * @route '/api/user/achievements'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserAchievementController::index
 * @see app/Http/Controllers/UserAchievementController.php:10
 * @route '/api/user/achievements'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserAchievementController::index
 * @see app/Http/Controllers/UserAchievementController.php:10
 * @route '/api/user/achievements'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserAchievementController::index
 * @see app/Http/Controllers/UserAchievementController.php:10
 * @route '/api/user/achievements'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserAchievementController::index
 * @see app/Http/Controllers/UserAchievementController.php:10
 * @route '/api/user/achievements'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const UserAchievementController = { index }

export default UserAchievementController