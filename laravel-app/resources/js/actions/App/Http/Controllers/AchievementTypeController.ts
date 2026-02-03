import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AchievementTypeController::index
 * @see app/Http/Controllers/AchievementTypeController.php:18
 * @route '/api/achievement-type'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/achievement-type',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AchievementTypeController::index
 * @see app/Http/Controllers/AchievementTypeController.php:18
 * @route '/api/achievement-type'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AchievementTypeController::index
 * @see app/Http/Controllers/AchievementTypeController.php:18
 * @route '/api/achievement-type'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AchievementTypeController::index
 * @see app/Http/Controllers/AchievementTypeController.php:18
 * @route '/api/achievement-type'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AchievementTypeController::index
 * @see app/Http/Controllers/AchievementTypeController.php:18
 * @route '/api/achievement-type'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AchievementTypeController::index
 * @see app/Http/Controllers/AchievementTypeController.php:18
 * @route '/api/achievement-type'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AchievementTypeController::index
 * @see app/Http/Controllers/AchievementTypeController.php:18
 * @route '/api/achievement-type'
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
/**
* @see \App\Http\Controllers\AchievementTypeController::store
 * @see app/Http/Controllers/AchievementTypeController.php:34
 * @route '/api/achievement-type'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/achievement-type',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AchievementTypeController::store
 * @see app/Http/Controllers/AchievementTypeController.php:34
 * @route '/api/achievement-type'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AchievementTypeController::store
 * @see app/Http/Controllers/AchievementTypeController.php:34
 * @route '/api/achievement-type'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AchievementTypeController::store
 * @see app/Http/Controllers/AchievementTypeController.php:34
 * @route '/api/achievement-type'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AchievementTypeController::store
 * @see app/Http/Controllers/AchievementTypeController.php:34
 * @route '/api/achievement-type'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AchievementTypeController::show
 * @see app/Http/Controllers/AchievementTypeController.php:45
 * @route '/api/achievement-type/{achievement_type}'
 */
export const show = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/achievement-type/{achievement_type}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AchievementTypeController::show
 * @see app/Http/Controllers/AchievementTypeController.php:45
 * @route '/api/achievement-type/{achievement_type}'
 */
show.url = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { achievement_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    achievement_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        achievement_type: args.achievement_type,
                }

    return show.definition.url
            .replace('{achievement_type}', parsedArgs.achievement_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AchievementTypeController::show
 * @see app/Http/Controllers/AchievementTypeController.php:45
 * @route '/api/achievement-type/{achievement_type}'
 */
show.get = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AchievementTypeController::show
 * @see app/Http/Controllers/AchievementTypeController.php:45
 * @route '/api/achievement-type/{achievement_type}'
 */
show.head = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AchievementTypeController::show
 * @see app/Http/Controllers/AchievementTypeController.php:45
 * @route '/api/achievement-type/{achievement_type}'
 */
    const showForm = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AchievementTypeController::show
 * @see app/Http/Controllers/AchievementTypeController.php:45
 * @route '/api/achievement-type/{achievement_type}'
 */
        showForm.get = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AchievementTypeController::show
 * @see app/Http/Controllers/AchievementTypeController.php:45
 * @route '/api/achievement-type/{achievement_type}'
 */
        showForm.head = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\AchievementTypeController::update
 * @see app/Http/Controllers/AchievementTypeController.php:61
 * @route '/api/achievement-type/{achievement_type}'
 */
export const update = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/achievement-type/{achievement_type}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\AchievementTypeController::update
 * @see app/Http/Controllers/AchievementTypeController.php:61
 * @route '/api/achievement-type/{achievement_type}'
 */
update.url = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { achievement_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    achievement_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        achievement_type: args.achievement_type,
                }

    return update.definition.url
            .replace('{achievement_type}', parsedArgs.achievement_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AchievementTypeController::update
 * @see app/Http/Controllers/AchievementTypeController.php:61
 * @route '/api/achievement-type/{achievement_type}'
 */
update.put = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\AchievementTypeController::update
 * @see app/Http/Controllers/AchievementTypeController.php:61
 * @route '/api/achievement-type/{achievement_type}'
 */
update.patch = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AchievementTypeController::update
 * @see app/Http/Controllers/AchievementTypeController.php:61
 * @route '/api/achievement-type/{achievement_type}'
 */
    const updateForm = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AchievementTypeController::update
 * @see app/Http/Controllers/AchievementTypeController.php:61
 * @route '/api/achievement-type/{achievement_type}'
 */
        updateForm.put = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\AchievementTypeController::update
 * @see app/Http/Controllers/AchievementTypeController.php:61
 * @route '/api/achievement-type/{achievement_type}'
 */
        updateForm.patch = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\AchievementTypeController::destroy
 * @see app/Http/Controllers/AchievementTypeController.php:72
 * @route '/api/achievement-type/{achievement_type}'
 */
export const destroy = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/achievement-type/{achievement_type}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AchievementTypeController::destroy
 * @see app/Http/Controllers/AchievementTypeController.php:72
 * @route '/api/achievement-type/{achievement_type}'
 */
destroy.url = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { achievement_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    achievement_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        achievement_type: args.achievement_type,
                }

    return destroy.definition.url
            .replace('{achievement_type}', parsedArgs.achievement_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AchievementTypeController::destroy
 * @see app/Http/Controllers/AchievementTypeController.php:72
 * @route '/api/achievement-type/{achievement_type}'
 */
destroy.delete = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AchievementTypeController::destroy
 * @see app/Http/Controllers/AchievementTypeController.php:72
 * @route '/api/achievement-type/{achievement_type}'
 */
    const destroyForm = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AchievementTypeController::destroy
 * @see app/Http/Controllers/AchievementTypeController.php:72
 * @route '/api/achievement-type/{achievement_type}'
 */
        destroyForm.delete = (args: { achievement_type: string | number } | [achievement_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AchievementTypeController = { index, store, show, update, destroy }

export default AchievementTypeController