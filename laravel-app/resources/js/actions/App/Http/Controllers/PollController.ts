import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/api/polls'
 */
const index98b4d462a2a6dd8e6386d618d3990022 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index98b4d462a2a6dd8e6386d618d3990022.url(options),
    method: 'get',
})

index98b4d462a2a6dd8e6386d618d3990022.definition = {
    methods: ["get","head"],
    url: '/api/polls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/api/polls'
 */
index98b4d462a2a6dd8e6386d618d3990022.url = (options?: RouteQueryOptions) => {
    return index98b4d462a2a6dd8e6386d618d3990022.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/api/polls'
 */
index98b4d462a2a6dd8e6386d618d3990022.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index98b4d462a2a6dd8e6386d618d3990022.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/api/polls'
 */
index98b4d462a2a6dd8e6386d618d3990022.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index98b4d462a2a6dd8e6386d618d3990022.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/api/polls'
 */
    const index98b4d462a2a6dd8e6386d618d3990022Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index98b4d462a2a6dd8e6386d618d3990022.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/api/polls'
 */
        index98b4d462a2a6dd8e6386d618d3990022Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index98b4d462a2a6dd8e6386d618d3990022.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/api/polls'
 */
        index98b4d462a2a6dd8e6386d618d3990022Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index98b4d462a2a6dd8e6386d618d3990022.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index98b4d462a2a6dd8e6386d618d3990022.form = index98b4d462a2a6dd8e6386d618d3990022Form
    /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/polls'
 */
const index1c89423b9718aa2d23ddc6c0ca2b5849 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index1c89423b9718aa2d23ddc6c0ca2b5849.url(options),
    method: 'get',
})

index1c89423b9718aa2d23ddc6c0ca2b5849.definition = {
    methods: ["get","head"],
    url: '/polls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/polls'
 */
index1c89423b9718aa2d23ddc6c0ca2b5849.url = (options?: RouteQueryOptions) => {
    return index1c89423b9718aa2d23ddc6c0ca2b5849.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/polls'
 */
index1c89423b9718aa2d23ddc6c0ca2b5849.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index1c89423b9718aa2d23ddc6c0ca2b5849.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/polls'
 */
index1c89423b9718aa2d23ddc6c0ca2b5849.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index1c89423b9718aa2d23ddc6c0ca2b5849.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/polls'
 */
    const index1c89423b9718aa2d23ddc6c0ca2b5849Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index1c89423b9718aa2d23ddc6c0ca2b5849.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/polls'
 */
        index1c89423b9718aa2d23ddc6c0ca2b5849Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index1c89423b9718aa2d23ddc6c0ca2b5849.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:24
 * @route '/polls'
 */
        index1c89423b9718aa2d23ddc6c0ca2b5849Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index1c89423b9718aa2d23ddc6c0ca2b5849.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index1c89423b9718aa2d23ddc6c0ca2b5849.form = index1c89423b9718aa2d23ddc6c0ca2b5849Form

export const index = {
    '/api/polls': index98b4d462a2a6dd8e6386d618d3990022,
    '/polls': index1c89423b9718aa2d23ddc6c0ca2b5849,
}

/**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:56
 * @route '/api/polls'
 */
const store98b4d462a2a6dd8e6386d618d3990022 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store98b4d462a2a6dd8e6386d618d3990022.url(options),
    method: 'post',
})

store98b4d462a2a6dd8e6386d618d3990022.definition = {
    methods: ["post"],
    url: '/api/polls',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:56
 * @route '/api/polls'
 */
store98b4d462a2a6dd8e6386d618d3990022.url = (options?: RouteQueryOptions) => {
    return store98b4d462a2a6dd8e6386d618d3990022.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:56
 * @route '/api/polls'
 */
store98b4d462a2a6dd8e6386d618d3990022.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store98b4d462a2a6dd8e6386d618d3990022.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:56
 * @route '/api/polls'
 */
    const store98b4d462a2a6dd8e6386d618d3990022Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store98b4d462a2a6dd8e6386d618d3990022.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:56
 * @route '/api/polls'
 */
        store98b4d462a2a6dd8e6386d618d3990022Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store98b4d462a2a6dd8e6386d618d3990022.url(options),
            method: 'post',
        })
    
    store98b4d462a2a6dd8e6386d618d3990022.form = store98b4d462a2a6dd8e6386d618d3990022Form
    /**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:56
 * @route '/polls'
 */
const store1c89423b9718aa2d23ddc6c0ca2b5849 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store1c89423b9718aa2d23ddc6c0ca2b5849.url(options),
    method: 'post',
})

store1c89423b9718aa2d23ddc6c0ca2b5849.definition = {
    methods: ["post"],
    url: '/polls',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:56
 * @route '/polls'
 */
store1c89423b9718aa2d23ddc6c0ca2b5849.url = (options?: RouteQueryOptions) => {
    return store1c89423b9718aa2d23ddc6c0ca2b5849.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:56
 * @route '/polls'
 */
store1c89423b9718aa2d23ddc6c0ca2b5849.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store1c89423b9718aa2d23ddc6c0ca2b5849.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:56
 * @route '/polls'
 */
    const store1c89423b9718aa2d23ddc6c0ca2b5849Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store1c89423b9718aa2d23ddc6c0ca2b5849.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:56
 * @route '/polls'
 */
        store1c89423b9718aa2d23ddc6c0ca2b5849Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store1c89423b9718aa2d23ddc6c0ca2b5849.url(options),
            method: 'post',
        })
    
    store1c89423b9718aa2d23ddc6c0ca2b5849.form = store1c89423b9718aa2d23ddc6c0ca2b5849Form

export const store = {
    '/api/polls': store98b4d462a2a6dd8e6386d618d3990022,
    '/polls': store1c89423b9718aa2d23ddc6c0ca2b5849,
}

/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/api/polls/{poll}'
 */
const show791ce5d1fe2ed66a4f6084b700bd6e67 = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show791ce5d1fe2ed66a4f6084b700bd6e67.url(args, options),
    method: 'get',
})

show791ce5d1fe2ed66a4f6084b700bd6e67.definition = {
    methods: ["get","head"],
    url: '/api/polls/{poll}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/api/polls/{poll}'
 */
show791ce5d1fe2ed66a4f6084b700bd6e67.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return show791ce5d1fe2ed66a4f6084b700bd6e67.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/api/polls/{poll}'
 */
show791ce5d1fe2ed66a4f6084b700bd6e67.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show791ce5d1fe2ed66a4f6084b700bd6e67.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/api/polls/{poll}'
 */
show791ce5d1fe2ed66a4f6084b700bd6e67.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show791ce5d1fe2ed66a4f6084b700bd6e67.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/api/polls/{poll}'
 */
    const show791ce5d1fe2ed66a4f6084b700bd6e67Form = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show791ce5d1fe2ed66a4f6084b700bd6e67.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/api/polls/{poll}'
 */
        show791ce5d1fe2ed66a4f6084b700bd6e67Form.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show791ce5d1fe2ed66a4f6084b700bd6e67.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/api/polls/{poll}'
 */
        show791ce5d1fe2ed66a4f6084b700bd6e67Form.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show791ce5d1fe2ed66a4f6084b700bd6e67.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show791ce5d1fe2ed66a4f6084b700bd6e67.form = show791ce5d1fe2ed66a4f6084b700bd6e67Form
    /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/polls/{poll}'
 */
const show9a81e09486dd6f872660ac7720c7c09f = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show9a81e09486dd6f872660ac7720c7c09f.url(args, options),
    method: 'get',
})

show9a81e09486dd6f872660ac7720c7c09f.definition = {
    methods: ["get","head"],
    url: '/polls/{poll}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/polls/{poll}'
 */
show9a81e09486dd6f872660ac7720c7c09f.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return show9a81e09486dd6f872660ac7720c7c09f.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/polls/{poll}'
 */
show9a81e09486dd6f872660ac7720c7c09f.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show9a81e09486dd6f872660ac7720c7c09f.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/polls/{poll}'
 */
show9a81e09486dd6f872660ac7720c7c09f.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show9a81e09486dd6f872660ac7720c7c09f.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/polls/{poll}'
 */
    const show9a81e09486dd6f872660ac7720c7c09fForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show9a81e09486dd6f872660ac7720c7c09f.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/polls/{poll}'
 */
        show9a81e09486dd6f872660ac7720c7c09fForm.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show9a81e09486dd6f872660ac7720c7c09f.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:73
 * @route '/polls/{poll}'
 */
        show9a81e09486dd6f872660ac7720c7c09fForm.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show9a81e09486dd6f872660ac7720c7c09f.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show9a81e09486dd6f872660ac7720c7c09f.form = show9a81e09486dd6f872660ac7720c7c09fForm

export const show = {
    '/api/polls/{poll}': show791ce5d1fe2ed66a4f6084b700bd6e67,
    '/polls/{poll}': show9a81e09486dd6f872660ac7720c7c09f,
}

/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/api/polls/{poll}'
 */
const update791ce5d1fe2ed66a4f6084b700bd6e67 = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update791ce5d1fe2ed66a4f6084b700bd6e67.url(args, options),
    method: 'put',
})

update791ce5d1fe2ed66a4f6084b700bd6e67.definition = {
    methods: ["put","patch"],
    url: '/api/polls/{poll}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/api/polls/{poll}'
 */
update791ce5d1fe2ed66a4f6084b700bd6e67.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return update791ce5d1fe2ed66a4f6084b700bd6e67.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/api/polls/{poll}'
 */
update791ce5d1fe2ed66a4f6084b700bd6e67.put = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update791ce5d1fe2ed66a4f6084b700bd6e67.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/api/polls/{poll}'
 */
update791ce5d1fe2ed66a4f6084b700bd6e67.patch = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update791ce5d1fe2ed66a4f6084b700bd6e67.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/api/polls/{poll}'
 */
    const update791ce5d1fe2ed66a4f6084b700bd6e67Form = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update791ce5d1fe2ed66a4f6084b700bd6e67.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/api/polls/{poll}'
 */
        update791ce5d1fe2ed66a4f6084b700bd6e67Form.put = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update791ce5d1fe2ed66a4f6084b700bd6e67.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/api/polls/{poll}'
 */
        update791ce5d1fe2ed66a4f6084b700bd6e67Form.patch = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update791ce5d1fe2ed66a4f6084b700bd6e67.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update791ce5d1fe2ed66a4f6084b700bd6e67.form = update791ce5d1fe2ed66a4f6084b700bd6e67Form
    /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/polls/{poll}'
 */
const update9a81e09486dd6f872660ac7720c7c09f = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update9a81e09486dd6f872660ac7720c7c09f.url(args, options),
    method: 'put',
})

update9a81e09486dd6f872660ac7720c7c09f.definition = {
    methods: ["put","patch"],
    url: '/polls/{poll}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/polls/{poll}'
 */
update9a81e09486dd6f872660ac7720c7c09f.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return update9a81e09486dd6f872660ac7720c7c09f.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/polls/{poll}'
 */
update9a81e09486dd6f872660ac7720c7c09f.put = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update9a81e09486dd6f872660ac7720c7c09f.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/polls/{poll}'
 */
update9a81e09486dd6f872660ac7720c7c09f.patch = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update9a81e09486dd6f872660ac7720c7c09f.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/polls/{poll}'
 */
    const update9a81e09486dd6f872660ac7720c7c09fForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update9a81e09486dd6f872660ac7720c7c09f.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/polls/{poll}'
 */
        update9a81e09486dd6f872660ac7720c7c09fForm.put = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update9a81e09486dd6f872660ac7720c7c09f.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:104
 * @route '/polls/{poll}'
 */
        update9a81e09486dd6f872660ac7720c7c09fForm.patch = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update9a81e09486dd6f872660ac7720c7c09f.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update9a81e09486dd6f872660ac7720c7c09f.form = update9a81e09486dd6f872660ac7720c7c09fForm

export const update = {
    '/api/polls/{poll}': update791ce5d1fe2ed66a4f6084b700bd6e67,
    '/polls/{poll}': update9a81e09486dd6f872660ac7720c7c09f,
}

/**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:113
 * @route '/api/polls/{poll}'
 */
const destroy791ce5d1fe2ed66a4f6084b700bd6e67 = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy791ce5d1fe2ed66a4f6084b700bd6e67.url(args, options),
    method: 'delete',
})

destroy791ce5d1fe2ed66a4f6084b700bd6e67.definition = {
    methods: ["delete"],
    url: '/api/polls/{poll}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:113
 * @route '/api/polls/{poll}'
 */
destroy791ce5d1fe2ed66a4f6084b700bd6e67.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return destroy791ce5d1fe2ed66a4f6084b700bd6e67.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:113
 * @route '/api/polls/{poll}'
 */
destroy791ce5d1fe2ed66a4f6084b700bd6e67.delete = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy791ce5d1fe2ed66a4f6084b700bd6e67.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:113
 * @route '/api/polls/{poll}'
 */
    const destroy791ce5d1fe2ed66a4f6084b700bd6e67Form = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy791ce5d1fe2ed66a4f6084b700bd6e67.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:113
 * @route '/api/polls/{poll}'
 */
        destroy791ce5d1fe2ed66a4f6084b700bd6e67Form.delete = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy791ce5d1fe2ed66a4f6084b700bd6e67.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy791ce5d1fe2ed66a4f6084b700bd6e67.form = destroy791ce5d1fe2ed66a4f6084b700bd6e67Form
    /**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:113
 * @route '/polls/{poll}'
 */
const destroy9a81e09486dd6f872660ac7720c7c09f = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy9a81e09486dd6f872660ac7720c7c09f.url(args, options),
    method: 'delete',
})

destroy9a81e09486dd6f872660ac7720c7c09f.definition = {
    methods: ["delete"],
    url: '/polls/{poll}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:113
 * @route '/polls/{poll}'
 */
destroy9a81e09486dd6f872660ac7720c7c09f.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return destroy9a81e09486dd6f872660ac7720c7c09f.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:113
 * @route '/polls/{poll}'
 */
destroy9a81e09486dd6f872660ac7720c7c09f.delete = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy9a81e09486dd6f872660ac7720c7c09f.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:113
 * @route '/polls/{poll}'
 */
    const destroy9a81e09486dd6f872660ac7720c7c09fForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy9a81e09486dd6f872660ac7720c7c09f.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:113
 * @route '/polls/{poll}'
 */
        destroy9a81e09486dd6f872660ac7720c7c09fForm.delete = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy9a81e09486dd6f872660ac7720c7c09f.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy9a81e09486dd6f872660ac7720c7c09f.form = destroy9a81e09486dd6f872660ac7720c7c09fForm

export const destroy = {
    '/api/polls/{poll}': destroy791ce5d1fe2ed66a4f6084b700bd6e67,
    '/polls/{poll}': destroy9a81e09486dd6f872660ac7720c7c09f,
}

/**
* @see \App\Http\Controllers\PollController::finalizedList
 * @see app/Http/Controllers/PollController.php:121
 * @route '/polls/finalized/list'
 */
export const finalizedList = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finalizedList.url(options),
    method: 'get',
})

finalizedList.definition = {
    methods: ["get","head"],
    url: '/polls/finalized/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::finalizedList
 * @see app/Http/Controllers/PollController.php:121
 * @route '/polls/finalized/list'
 */
finalizedList.url = (options?: RouteQueryOptions) => {
    return finalizedList.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::finalizedList
 * @see app/Http/Controllers/PollController.php:121
 * @route '/polls/finalized/list'
 */
finalizedList.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finalizedList.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::finalizedList
 * @see app/Http/Controllers/PollController.php:121
 * @route '/polls/finalized/list'
 */
finalizedList.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: finalizedList.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::finalizedList
 * @see app/Http/Controllers/PollController.php:121
 * @route '/polls/finalized/list'
 */
    const finalizedListForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: finalizedList.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::finalizedList
 * @see app/Http/Controllers/PollController.php:121
 * @route '/polls/finalized/list'
 */
        finalizedListForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: finalizedList.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::finalizedList
 * @see app/Http/Controllers/PollController.php:121
 * @route '/polls/finalized/list'
 */
        finalizedListForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: finalizedList.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    finalizedList.form = finalizedListForm
/**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:46
 * @route '/polls/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/polls/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:46
 * @route '/polls/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:46
 * @route '/polls/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:46
 * @route '/polls/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:46
 * @route '/polls/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:46
 * @route '/polls/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:46
 * @route '/polls/create'
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
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:96
 * @route '/polls/{poll}/edit'
 */
export const edit = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/polls/{poll}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:96
 * @route '/polls/{poll}/edit'
 */
edit.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:96
 * @route '/polls/{poll}/edit'
 */
edit.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:96
 * @route '/polls/{poll}/edit'
 */
edit.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:96
 * @route '/polls/{poll}/edit'
 */
    const editForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:96
 * @route '/polls/{poll}/edit'
 */
        editForm.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:96
 * @route '/polls/{poll}/edit'
 */
        editForm.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\PollController::userPolls
 * @see app/Http/Controllers/PollController.php:141
 * @route '/{user}/polls'
 */
export const userPolls = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userPolls.url(args, options),
    method: 'get',
})

userPolls.definition = {
    methods: ["get","head"],
    url: '/{user}/polls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::userPolls
 * @see app/Http/Controllers/PollController.php:141
 * @route '/{user}/polls'
 */
userPolls.url = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return userPolls.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::userPolls
 * @see app/Http/Controllers/PollController.php:141
 * @route '/{user}/polls'
 */
userPolls.get = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userPolls.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::userPolls
 * @see app/Http/Controllers/PollController.php:141
 * @route '/{user}/polls'
 */
userPolls.head = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userPolls.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::userPolls
 * @see app/Http/Controllers/PollController.php:141
 * @route '/{user}/polls'
 */
    const userPollsForm = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userPolls.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::userPolls
 * @see app/Http/Controllers/PollController.php:141
 * @route '/{user}/polls'
 */
        userPollsForm.get = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userPolls.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::userPolls
 * @see app/Http/Controllers/PollController.php:141
 * @route '/{user}/polls'
 */
        userPollsForm.head = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userPolls.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userPolls.form = userPollsForm
const PollController = { index, store, show, update, destroy, finalizedList, create, edit, userPolls }

export default PollController