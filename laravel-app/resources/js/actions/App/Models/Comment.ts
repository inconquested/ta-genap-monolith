import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Models\Comment::index
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
 */
export const index = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/polls/{poll}/comments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Models\Comment::index
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
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
* @see \App\Models\Comment::index
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
 */
index.get = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Models\Comment::index
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
 */
index.head = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Models\Comment::index
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
 */
    const indexForm = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Models\Comment::index
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
 */
        indexForm.get = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Models\Comment::index
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
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
* @see \App\Models\Comment::store
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
 */
export const store = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/polls/{poll}/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Models\Comment::store
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
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
* @see \App\Models\Comment::store
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
 */
store.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Models\Comment::store
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
 */
    const storeForm = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Models\Comment::store
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments'
 */
        storeForm.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Models\Comment::show
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments/{comment}'
 */
export const show = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/polls/{poll}/comments/{comment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Models\Comment::show
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments/{comment}'
 */
show.url = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                    comment: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: args.poll,
                                comment: args.comment,
                }

    return show.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Models\Comment::show
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments/{comment}'
 */
show.get = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Models\Comment::show
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments/{comment}'
 */
show.head = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Models\Comment::show
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments/{comment}'
 */
    const showForm = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Models\Comment::show
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        showForm.get = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Models\Comment::show
 * @see app/Models/Comment.php:0
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        showForm.head = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Models\Comment::update
 * @see app/Models/Comment.php:1084
 * @route '/api/polls/{poll}/comments/{comment}'
 */
export const update = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/polls/{poll}/comments/{comment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Models\Comment::update
 * @see app/Models/Comment.php:1084
 * @route '/api/polls/{poll}/comments/{comment}'
 */
update.url = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                    comment: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: args.poll,
                                comment: args.comment,
                }

    return update.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Models\Comment::update
 * @see app/Models/Comment.php:1084
 * @route '/api/polls/{poll}/comments/{comment}'
 */
update.put = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Models\Comment::update
 * @see app/Models/Comment.php:1084
 * @route '/api/polls/{poll}/comments/{comment}'
 */
update.patch = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Models\Comment::update
 * @see app/Models/Comment.php:1084
 * @route '/api/polls/{poll}/comments/{comment}'
 */
    const updateForm = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Models\Comment::update
 * @see app/Models/Comment.php:1084
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        updateForm.put = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Models\Comment::update
 * @see app/Models/Comment.php:1084
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        updateForm.patch = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Models\Comment::destroy
 * @see app/Models/Comment.php:1447
 * @route '/api/polls/{poll}/comments/{comment}'
 */
export const destroy = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/polls/{poll}/comments/{comment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Models\Comment::destroy
 * @see app/Models/Comment.php:1447
 * @route '/api/polls/{poll}/comments/{comment}'
 */
destroy.url = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                    comment: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: args.poll,
                                comment: args.comment,
                }

    return destroy.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Models\Comment::destroy
 * @see app/Models/Comment.php:1447
 * @route '/api/polls/{poll}/comments/{comment}'
 */
destroy.delete = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Models\Comment::destroy
 * @see app/Models/Comment.php:1447
 * @route '/api/polls/{poll}/comments/{comment}'
 */
    const destroyForm = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Models\Comment::destroy
 * @see app/Models/Comment.php:1447
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        destroyForm.delete = (args: { poll: string | number, comment: string | number } | [poll: string | number, comment: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const Comment = { index, store, show, update, destroy }

export default Comment