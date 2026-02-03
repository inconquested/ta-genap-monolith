import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/api/polls'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/polls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/api/polls'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/api/polls'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/api/polls'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/api/polls'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/api/polls'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/api/polls'
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
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:48
 * @route '/api/polls'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/polls',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:48
 * @route '/api/polls'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:48
 * @route '/api/polls'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:48
 * @route '/api/polls'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:48
 * @route '/api/polls'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/api/polls/{poll}'
 */
export const show = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/polls/{poll}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/api/polls/{poll}'
 */
show.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { poll: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { poll: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: typeof args.poll === 'object'
                ? args.poll.id
                : args.poll,
                }

    return show.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/api/polls/{poll}'
 */
show.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/api/polls/{poll}'
 */
show.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/api/polls/{poll}'
 */
    const showForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/api/polls/{poll}'
 */
        showForm.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/api/polls/{poll}'
 */
        showForm.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/api/polls/{poll}'
 */
export const update = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/polls/{poll}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/api/polls/{poll}'
 */
update.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { poll: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { poll: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: typeof args.poll === 'object'
                ? args.poll.id
                : args.poll,
                }

    return update.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/api/polls/{poll}'
 */
update.put = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/api/polls/{poll}'
 */
update.patch = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/api/polls/{poll}'
 */
    const updateForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/api/polls/{poll}'
 */
        updateForm.put = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/api/polls/{poll}'
 */
        updateForm.patch = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:86
 * @route '/api/polls/{poll}'
 */
export const destroy = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/polls/{poll}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:86
 * @route '/api/polls/{poll}'
 */
destroy.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { poll: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { poll: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: typeof args.poll === 'object'
                ? args.poll.id
                : args.poll,
                }

    return destroy.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:86
 * @route '/api/polls/{poll}'
 */
destroy.delete = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:86
 * @route '/api/polls/{poll}'
 */
    const destroyForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:86
 * @route '/api/polls/{poll}'
 */
        destroyForm.delete = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const polls = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default polls