import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
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
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
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
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/api/polls/{poll}/comments'
 */
index.get = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/api/polls/{poll}/comments'
 */
index.head = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/api/polls/{poll}/comments'
 */
    const indexForm = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/api/polls/{poll}/comments'
 */
        indexForm.get = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
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
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:40
 * @route '/api/polls/{poll}/comments/{comment}'
 */
export const show = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/polls/{poll}/comments/{comment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:40
 * @route '/api/polls/{poll}/comments/{comment}'
 */
show.url = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:40
 * @route '/api/polls/{poll}/comments/{comment}'
 */
show.get = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:40
 * @route '/api/polls/{poll}/comments/{comment}'
 */
show.head = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:40
 * @route '/api/polls/{poll}/comments/{comment}'
 */
    const showForm = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:40
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        showForm.get = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:40
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        showForm.head = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:56
 * @route '/api/polls/{poll}/comments/{comment}'
 */
export const destroy = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/polls/{poll}/comments/{comment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:56
 * @route '/api/polls/{poll}/comments/{comment}'
 */
destroy.url = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:56
 * @route '/api/polls/{poll}/comments/{comment}'
 */
destroy.delete = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:56
 * @route '/api/polls/{poll}/comments/{comment}'
 */
    const destroyForm = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:56
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        destroyForm.delete = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const comments = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
destroy: Object.assign(destroy, destroy),
}

export default comments