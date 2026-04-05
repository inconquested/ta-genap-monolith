import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
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
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
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
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/api/polls/{poll}/comments'
 */
store.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/api/polls/{poll}/comments'
 */
    const storeForm = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/api/polls/{poll}/comments'
 */
        storeForm.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:48
 * @route '/api/polls/{poll}/comments/{comment}'
 */
export const update = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/polls/{poll}/comments/{comment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:48
 * @route '/api/polls/{poll}/comments/{comment}'
 */
update.url = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    poll: args[0],
                    comment: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        poll: args.poll,
                                comment: typeof args.comment === 'object'
                ? args.comment.id
                : args.comment,
                }

    return update.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:48
 * @route '/api/polls/{poll}/comments/{comment}'
 */
update.put = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:48
 * @route '/api/polls/{poll}/comments/{comment}'
 */
update.patch = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:48
 * @route '/api/polls/{poll}/comments/{comment}'
 */
    const updateForm = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:48
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        updateForm.put = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:48
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        updateForm.patch = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const comments = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
}

export default comments