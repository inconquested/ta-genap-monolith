import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes'
 */
export const index = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/polls/{poll}/votes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes'
 */
index.url = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { poll: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: args.poll,
                }

    return index.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes'
 */
index.get = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes'
 */
index.head = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes'
 */
    const indexForm = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes'
 */
        indexForm.get = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes'
 */
        indexForm.head = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:22
 * @route '/api/polls/{poll}/votes'
 */
export const store = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/polls/{poll}/votes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:22
 * @route '/api/polls/{poll}/votes'
 */
store.url = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { poll: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: args.poll,
                }

    return store.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:22
 * @route '/api/polls/{poll}/votes'
 */
store.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:22
 * @route '/api/polls/{poll}/votes'
 */
    const storeForm = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:22
 * @route '/api/polls/{poll}/votes'
 */
        storeForm.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\VoteController::show
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
export const show = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/polls/{poll}/votes/{vote}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoteController::show
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
show.url = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                    vote: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: args.poll,
                                vote: args.vote,
                }

    return show.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{vote}', parsedArgs.vote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoteController::show
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
show.get = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoteController::show
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
show.head = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VoteController::show
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
    const showForm = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VoteController::show
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
        showForm.get = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VoteController::show
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
        showForm.head = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\VoteController::update
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
export const update = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/polls/{poll}/votes/{vote}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\VoteController::update
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
update.url = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                    vote: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: args.poll,
                                vote: args.vote,
                }

    return update.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{vote}', parsedArgs.vote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoteController::update
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
update.put = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\VoteController::update
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
update.patch = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\VoteController::update
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
    const updateForm = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VoteController::update
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
        updateForm.put = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\VoteController::update
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
        updateForm.patch = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\VoteController::destroy
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
export const destroy = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/polls/{poll}/votes/{vote}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VoteController::destroy
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
destroy.url = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                    vote: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: args.poll,
                                vote: args.vote,
                }

    return destroy.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{vote}', parsedArgs.vote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoteController::destroy
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
destroy.delete = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\VoteController::destroy
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
    const destroyForm = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VoteController::destroy
 * @see app/Http/Controllers/VoteController.php:0
 * @route '/api/polls/{poll}/votes/{vote}'
 */
        destroyForm.delete = (args: { poll: string | number, vote: string | number } | [poll: string | number, vote: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const VoteController = { index, store, show, update, destroy }

export default VoteController