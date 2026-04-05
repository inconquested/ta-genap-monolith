import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PollCategoryController::index
 * @see app/Http/Controllers/PollCategoryController.php:20
 * @route '/api/poll-categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/poll-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollCategoryController::index
 * @see app/Http/Controllers/PollCategoryController.php:20
 * @route '/api/poll-categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollCategoryController::index
 * @see app/Http/Controllers/PollCategoryController.php:20
 * @route '/api/poll-categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollCategoryController::index
 * @see app/Http/Controllers/PollCategoryController.php:20
 * @route '/api/poll-categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollCategoryController::index
 * @see app/Http/Controllers/PollCategoryController.php:20
 * @route '/api/poll-categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollCategoryController::index
 * @see app/Http/Controllers/PollCategoryController.php:20
 * @route '/api/poll-categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollCategoryController::index
 * @see app/Http/Controllers/PollCategoryController.php:20
 * @route '/api/poll-categories'
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
* @see \App\Http\Controllers\PollCategoryController::store
 * @see app/Http/Controllers/PollCategoryController.php:28
 * @route '/api/poll-categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/poll-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PollCategoryController::store
 * @see app/Http/Controllers/PollCategoryController.php:28
 * @route '/api/poll-categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollCategoryController::store
 * @see app/Http/Controllers/PollCategoryController.php:28
 * @route '/api/poll-categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PollCategoryController::store
 * @see app/Http/Controllers/PollCategoryController.php:28
 * @route '/api/poll-categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollCategoryController::store
 * @see app/Http/Controllers/PollCategoryController.php:28
 * @route '/api/poll-categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PollCategoryController::show
 * @see app/Http/Controllers/PollCategoryController.php:37
 * @route '/api/poll-categories/{poll_category}'
 */
export const show = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/poll-categories/{poll_category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollCategoryController::show
 * @see app/Http/Controllers/PollCategoryController.php:37
 * @route '/api/poll-categories/{poll_category}'
 */
show.url = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { poll_category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    poll_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll_category: args.poll_category,
                }

    return show.definition.url
            .replace('{poll_category}', parsedArgs.poll_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollCategoryController::show
 * @see app/Http/Controllers/PollCategoryController.php:37
 * @route '/api/poll-categories/{poll_category}'
 */
show.get = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollCategoryController::show
 * @see app/Http/Controllers/PollCategoryController.php:37
 * @route '/api/poll-categories/{poll_category}'
 */
show.head = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollCategoryController::show
 * @see app/Http/Controllers/PollCategoryController.php:37
 * @route '/api/poll-categories/{poll_category}'
 */
    const showForm = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollCategoryController::show
 * @see app/Http/Controllers/PollCategoryController.php:37
 * @route '/api/poll-categories/{poll_category}'
 */
        showForm.get = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollCategoryController::show
 * @see app/Http/Controllers/PollCategoryController.php:37
 * @route '/api/poll-categories/{poll_category}'
 */
        showForm.head = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PollCategoryController::update
 * @see app/Http/Controllers/PollCategoryController.php:45
 * @route '/api/poll-categories/{poll_category}'
 */
export const update = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/poll-categories/{poll_category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PollCategoryController::update
 * @see app/Http/Controllers/PollCategoryController.php:45
 * @route '/api/poll-categories/{poll_category}'
 */
update.url = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { poll_category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    poll_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll_category: args.poll_category,
                }

    return update.definition.url
            .replace('{poll_category}', parsedArgs.poll_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollCategoryController::update
 * @see app/Http/Controllers/PollCategoryController.php:45
 * @route '/api/poll-categories/{poll_category}'
 */
update.put = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\PollCategoryController::update
 * @see app/Http/Controllers/PollCategoryController.php:45
 * @route '/api/poll-categories/{poll_category}'
 */
update.patch = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PollCategoryController::update
 * @see app/Http/Controllers/PollCategoryController.php:45
 * @route '/api/poll-categories/{poll_category}'
 */
    const updateForm = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollCategoryController::update
 * @see app/Http/Controllers/PollCategoryController.php:45
 * @route '/api/poll-categories/{poll_category}'
 */
        updateForm.put = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\PollCategoryController::update
 * @see app/Http/Controllers/PollCategoryController.php:45
 * @route '/api/poll-categories/{poll_category}'
 */
        updateForm.patch = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PollCategoryController::destroy
 * @see app/Http/Controllers/PollCategoryController.php:54
 * @route '/api/poll-categories/{poll_category}'
 */
export const destroy = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/poll-categories/{poll_category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PollCategoryController::destroy
 * @see app/Http/Controllers/PollCategoryController.php:54
 * @route '/api/poll-categories/{poll_category}'
 */
destroy.url = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { poll_category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    poll_category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll_category: args.poll_category,
                }

    return destroy.definition.url
            .replace('{poll_category}', parsedArgs.poll_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollCategoryController::destroy
 * @see app/Http/Controllers/PollCategoryController.php:54
 * @route '/api/poll-categories/{poll_category}'
 */
destroy.delete = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PollCategoryController::destroy
 * @see app/Http/Controllers/PollCategoryController.php:54
 * @route '/api/poll-categories/{poll_category}'
 */
    const destroyForm = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollCategoryController::destroy
 * @see app/Http/Controllers/PollCategoryController.php:54
 * @route '/api/poll-categories/{poll_category}'
 */
        destroyForm.delete = (args: { poll_category: string | number } | [poll_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const pollCategories = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default pollCategories