import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/api/polls/{poll}/comments'
 */
const index823b979d61a9096bd30f5df321c56fb5 = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index823b979d61a9096bd30f5df321c56fb5.url(args, options),
    method: 'get',
})

index823b979d61a9096bd30f5df321c56fb5.definition = {
    methods: ["get","head"],
    url: '/api/polls/{poll}/comments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/api/polls/{poll}/comments'
 */
index823b979d61a9096bd30f5df321c56fb5.url = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index823b979d61a9096bd30f5df321c56fb5.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/api/polls/{poll}/comments'
 */
index823b979d61a9096bd30f5df321c56fb5.get = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index823b979d61a9096bd30f5df321c56fb5.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/api/polls/{poll}/comments'
 */
index823b979d61a9096bd30f5df321c56fb5.head = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index823b979d61a9096bd30f5df321c56fb5.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/api/polls/{poll}/comments'
 */
    const index823b979d61a9096bd30f5df321c56fb5Form = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index823b979d61a9096bd30f5df321c56fb5.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/api/polls/{poll}/comments'
 */
        index823b979d61a9096bd30f5df321c56fb5Form.get = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index823b979d61a9096bd30f5df321c56fb5.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/api/polls/{poll}/comments'
 */
        index823b979d61a9096bd30f5df321c56fb5Form.head = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index823b979d61a9096bd30f5df321c56fb5.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index823b979d61a9096bd30f5df321c56fb5.form = index823b979d61a9096bd30f5df321c56fb5Form
    /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
const index89f03a1c1a5da1963f637bc35077e7a1 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index89f03a1c1a5da1963f637bc35077e7a1.url(options),
    method: 'get',
})

index89f03a1c1a5da1963f637bc35077e7a1.definition = {
    methods: ["get","head"],
    url: '/comments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
index89f03a1c1a5da1963f637bc35077e7a1.url = (options?: RouteQueryOptions) => {
    return index89f03a1c1a5da1963f637bc35077e7a1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
index89f03a1c1a5da1963f637bc35077e7a1.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index89f03a1c1a5da1963f637bc35077e7a1.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
index89f03a1c1a5da1963f637bc35077e7a1.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index89f03a1c1a5da1963f637bc35077e7a1.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
    const index89f03a1c1a5da1963f637bc35077e7a1Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index89f03a1c1a5da1963f637bc35077e7a1.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
        index89f03a1c1a5da1963f637bc35077e7a1Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index89f03a1c1a5da1963f637bc35077e7a1.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
        index89f03a1c1a5da1963f637bc35077e7a1Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index89f03a1c1a5da1963f637bc35077e7a1.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index89f03a1c1a5da1963f637bc35077e7a1.form = index89f03a1c1a5da1963f637bc35077e7a1Form

export const index = {
    '/api/polls/{poll}/comments': index823b979d61a9096bd30f5df321c56fb5,
    '/comments': index89f03a1c1a5da1963f637bc35077e7a1,
}

/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/api/polls/{poll}/comments'
 */
const store823b979d61a9096bd30f5df321c56fb5 = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store823b979d61a9096bd30f5df321c56fb5.url(args, options),
    method: 'post',
})

store823b979d61a9096bd30f5df321c56fb5.definition = {
    methods: ["post"],
    url: '/api/polls/{poll}/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/api/polls/{poll}/comments'
 */
store823b979d61a9096bd30f5df321c56fb5.url = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store823b979d61a9096bd30f5df321c56fb5.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/api/polls/{poll}/comments'
 */
store823b979d61a9096bd30f5df321c56fb5.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store823b979d61a9096bd30f5df321c56fb5.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/api/polls/{poll}/comments'
 */
    const store823b979d61a9096bd30f5df321c56fb5Form = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store823b979d61a9096bd30f5df321c56fb5.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/api/polls/{poll}/comments'
 */
        store823b979d61a9096bd30f5df321c56fb5Form.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store823b979d61a9096bd30f5df321c56fb5.url(args, options),
            method: 'post',
        })
    
    store823b979d61a9096bd30f5df321c56fb5.form = store823b979d61a9096bd30f5df321c56fb5Form
    /**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/comments'
 */
const store89f03a1c1a5da1963f637bc35077e7a1 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store89f03a1c1a5da1963f637bc35077e7a1.url(options),
    method: 'post',
})

store89f03a1c1a5da1963f637bc35077e7a1.definition = {
    methods: ["post"],
    url: '/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/comments'
 */
store89f03a1c1a5da1963f637bc35077e7a1.url = (options?: RouteQueryOptions) => {
    return store89f03a1c1a5da1963f637bc35077e7a1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/comments'
 */
store89f03a1c1a5da1963f637bc35077e7a1.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store89f03a1c1a5da1963f637bc35077e7a1.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/comments'
 */
    const store89f03a1c1a5da1963f637bc35077e7a1Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store89f03a1c1a5da1963f637bc35077e7a1.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/comments'
 */
        store89f03a1c1a5da1963f637bc35077e7a1Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store89f03a1c1a5da1963f637bc35077e7a1.url(options),
            method: 'post',
        })
    
    store89f03a1c1a5da1963f637bc35077e7a1.form = store89f03a1c1a5da1963f637bc35077e7a1Form

export const store = {
    '/api/polls/{poll}/comments': store823b979d61a9096bd30f5df321c56fb5,
    '/comments': store89f03a1c1a5da1963f637bc35077e7a1,
}

/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/api/polls/{poll}/comments/{comment}'
 */
const show56191c27cd184d644ef8a92bf0964cff = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show56191c27cd184d644ef8a92bf0964cff.url(args, options),
    method: 'get',
})

show56191c27cd184d644ef8a92bf0964cff.definition = {
    methods: ["get","head"],
    url: '/api/polls/{poll}/comments/{comment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/api/polls/{poll}/comments/{comment}'
 */
show56191c27cd184d644ef8a92bf0964cff.url = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return show56191c27cd184d644ef8a92bf0964cff.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/api/polls/{poll}/comments/{comment}'
 */
show56191c27cd184d644ef8a92bf0964cff.get = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show56191c27cd184d644ef8a92bf0964cff.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/api/polls/{poll}/comments/{comment}'
 */
show56191c27cd184d644ef8a92bf0964cff.head = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show56191c27cd184d644ef8a92bf0964cff.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/api/polls/{poll}/comments/{comment}'
 */
    const show56191c27cd184d644ef8a92bf0964cffForm = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show56191c27cd184d644ef8a92bf0964cff.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        show56191c27cd184d644ef8a92bf0964cffForm.get = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show56191c27cd184d644ef8a92bf0964cff.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        show56191c27cd184d644ef8a92bf0964cffForm.head = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show56191c27cd184d644ef8a92bf0964cff.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show56191c27cd184d644ef8a92bf0964cff.form = show56191c27cd184d644ef8a92bf0964cffForm
    /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
const show5d64e47052aad5d85efb249d157cd762 = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show5d64e47052aad5d85efb249d157cd762.url(args, options),
    method: 'get',
})

show5d64e47052aad5d85efb249d157cd762.definition = {
    methods: ["get","head"],
    url: '/comments/{comment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
show5d64e47052aad5d85efb249d157cd762.url = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { comment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { comment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    comment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        comment: typeof args.comment === 'object'
                ? args.comment.id
                : args.comment,
                }

    return show5d64e47052aad5d85efb249d157cd762.definition.url
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
show5d64e47052aad5d85efb249d157cd762.get = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show5d64e47052aad5d85efb249d157cd762.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
show5d64e47052aad5d85efb249d157cd762.head = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show5d64e47052aad5d85efb249d157cd762.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
    const show5d64e47052aad5d85efb249d157cd762Form = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show5d64e47052aad5d85efb249d157cd762.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
        show5d64e47052aad5d85efb249d157cd762Form.get = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show5d64e47052aad5d85efb249d157cd762.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
        show5d64e47052aad5d85efb249d157cd762Form.head = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show5d64e47052aad5d85efb249d157cd762.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show5d64e47052aad5d85efb249d157cd762.form = show5d64e47052aad5d85efb249d157cd762Form

export const show = {
    '/api/polls/{poll}/comments/{comment}': show56191c27cd184d644ef8a92bf0964cff,
    '/comments/{comment}': show5d64e47052aad5d85efb249d157cd762,
}

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/api/polls/{poll}/comments/{comment}'
 */
const update56191c27cd184d644ef8a92bf0964cff = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update56191c27cd184d644ef8a92bf0964cff.url(args, options),
    method: 'put',
})

update56191c27cd184d644ef8a92bf0964cff.definition = {
    methods: ["put","patch"],
    url: '/api/polls/{poll}/comments/{comment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/api/polls/{poll}/comments/{comment}'
 */
update56191c27cd184d644ef8a92bf0964cff.url = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return update56191c27cd184d644ef8a92bf0964cff.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/api/polls/{poll}/comments/{comment}'
 */
update56191c27cd184d644ef8a92bf0964cff.put = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update56191c27cd184d644ef8a92bf0964cff.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/api/polls/{poll}/comments/{comment}'
 */
update56191c27cd184d644ef8a92bf0964cff.patch = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update56191c27cd184d644ef8a92bf0964cff.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/api/polls/{poll}/comments/{comment}'
 */
    const update56191c27cd184d644ef8a92bf0964cffForm = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update56191c27cd184d644ef8a92bf0964cff.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        update56191c27cd184d644ef8a92bf0964cffForm.put = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update56191c27cd184d644ef8a92bf0964cff.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        update56191c27cd184d644ef8a92bf0964cffForm.patch = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update56191c27cd184d644ef8a92bf0964cff.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update56191c27cd184d644ef8a92bf0964cff.form = update56191c27cd184d644ef8a92bf0964cffForm
    /**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
const update5d64e47052aad5d85efb249d157cd762 = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update5d64e47052aad5d85efb249d157cd762.url(args, options),
    method: 'put',
})

update5d64e47052aad5d85efb249d157cd762.definition = {
    methods: ["put","patch"],
    url: '/comments/{comment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
update5d64e47052aad5d85efb249d157cd762.url = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { comment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { comment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    comment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        comment: typeof args.comment === 'object'
                ? args.comment.id
                : args.comment,
                }

    return update5d64e47052aad5d85efb249d157cd762.definition.url
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
update5d64e47052aad5d85efb249d157cd762.put = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update5d64e47052aad5d85efb249d157cd762.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
update5d64e47052aad5d85efb249d157cd762.patch = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update5d64e47052aad5d85efb249d157cd762.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
    const update5d64e47052aad5d85efb249d157cd762Form = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update5d64e47052aad5d85efb249d157cd762.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
        update5d64e47052aad5d85efb249d157cd762Form.put = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update5d64e47052aad5d85efb249d157cd762.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
        update5d64e47052aad5d85efb249d157cd762Form.patch = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update5d64e47052aad5d85efb249d157cd762.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update5d64e47052aad5d85efb249d157cd762.form = update5d64e47052aad5d85efb249d157cd762Form

export const update = {
    '/api/polls/{poll}/comments/{comment}': update56191c27cd184d644ef8a92bf0964cff,
    '/comments/{comment}': update5d64e47052aad5d85efb249d157cd762,
}

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/api/polls/{poll}/comments/{comment}'
 */
const destroy56191c27cd184d644ef8a92bf0964cff = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy56191c27cd184d644ef8a92bf0964cff.url(args, options),
    method: 'delete',
})

destroy56191c27cd184d644ef8a92bf0964cff.definition = {
    methods: ["delete"],
    url: '/api/polls/{poll}/comments/{comment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/api/polls/{poll}/comments/{comment}'
 */
destroy56191c27cd184d644ef8a92bf0964cff.url = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions) => {
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

    return destroy56191c27cd184d644ef8a92bf0964cff.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/api/polls/{poll}/comments/{comment}'
 */
destroy56191c27cd184d644ef8a92bf0964cff.delete = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy56191c27cd184d644ef8a92bf0964cff.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/api/polls/{poll}/comments/{comment}'
 */
    const destroy56191c27cd184d644ef8a92bf0964cffForm = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy56191c27cd184d644ef8a92bf0964cff.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/api/polls/{poll}/comments/{comment}'
 */
        destroy56191c27cd184d644ef8a92bf0964cffForm.delete = (args: { poll: string | number, comment: string | { id: string } } | [poll: string | number, comment: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy56191c27cd184d644ef8a92bf0964cff.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy56191c27cd184d644ef8a92bf0964cff.form = destroy56191c27cd184d644ef8a92bf0964cffForm
    /**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/comments/{comment}'
 */
const destroy5d64e47052aad5d85efb249d157cd762 = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy5d64e47052aad5d85efb249d157cd762.url(args, options),
    method: 'delete',
})

destroy5d64e47052aad5d85efb249d157cd762.definition = {
    methods: ["delete"],
    url: '/comments/{comment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/comments/{comment}'
 */
destroy5d64e47052aad5d85efb249d157cd762.url = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { comment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { comment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    comment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        comment: typeof args.comment === 'object'
                ? args.comment.id
                : args.comment,
                }

    return destroy5d64e47052aad5d85efb249d157cd762.definition.url
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/comments/{comment}'
 */
destroy5d64e47052aad5d85efb249d157cd762.delete = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy5d64e47052aad5d85efb249d157cd762.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/comments/{comment}'
 */
    const destroy5d64e47052aad5d85efb249d157cd762Form = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy5d64e47052aad5d85efb249d157cd762.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/comments/{comment}'
 */
        destroy5d64e47052aad5d85efb249d157cd762Form.delete = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy5d64e47052aad5d85efb249d157cd762.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy5d64e47052aad5d85efb249d157cd762.form = destroy5d64e47052aad5d85efb249d157cd762Form

export const destroy = {
    '/api/polls/{poll}/comments/{comment}': destroy56191c27cd184d644ef8a92bf0964cff,
    '/comments/{comment}': destroy5d64e47052aad5d85efb249d157cd762,
}

/**
* @see \App\Http\Controllers\CommentController::create
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/comments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentController::create
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::create
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::create
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommentController::create
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommentController::create
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommentController::create
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\CommentController::edit
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/{comment}/edit'
 */
export const edit = (args: { comment: string | number } | [comment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/comments/{comment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentController::edit
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/{comment}/edit'
 */
edit.url = (args: { comment: string | number } | [comment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { comment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    comment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        comment: args.comment,
                }

    return edit.definition.url
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::edit
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/{comment}/edit'
 */
edit.get = (args: { comment: string | number } | [comment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::edit
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/{comment}/edit'
 */
edit.head = (args: { comment: string | number } | [comment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommentController::edit
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/{comment}/edit'
 */
    const editForm = (args: { comment: string | number } | [comment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommentController::edit
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/{comment}/edit'
 */
        editForm.get = (args: { comment: string | number } | [comment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommentController::edit
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments/{comment}/edit'
 */
        editForm.head = (args: { comment: string | number } | [comment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
const CommentController = { index, store, show, update, destroy, create, edit }

export default CommentController