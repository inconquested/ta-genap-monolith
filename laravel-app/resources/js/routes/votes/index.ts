import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:19
 * @route '/polls/{poll}/votes'
 */
export const index = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/polls/{poll}/votes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:19
 * @route '/polls/{poll}/votes'
 */
index.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:19
 * @route '/polls/{poll}/votes'
 */
index.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:19
 * @route '/polls/{poll}/votes'
 */
index.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:19
 * @route '/polls/{poll}/votes'
 */
    const indexForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:19
 * @route '/polls/{poll}/votes'
 */
        indexForm.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:19
 * @route '/polls/{poll}/votes'
 */
        indexForm.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
 * @see app/Http/Controllers/VoteController.php:27
 * @route '/polls/{poll}/votes'
 */
export const store = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/polls/{poll}/votes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:27
 * @route '/polls/{poll}/votes'
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
 * @see app/Http/Controllers/VoteController.php:27
 * @route '/polls/{poll}/votes'
 */
store.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:27
 * @route '/polls/{poll}/votes'
 */
    const storeForm = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:27
 * @route '/polls/{poll}/votes'
 */
        storeForm.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\VoteController::user
 * @see app/Http/Controllers/VoteController.php:37
 * @route '/user/votes'
 */
export const user = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/user/votes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoteController::user
 * @see app/Http/Controllers/VoteController.php:37
 * @route '/user/votes'
 */
user.url = (options?: RouteQueryOptions) => {
    return user.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoteController::user
 * @see app/Http/Controllers/VoteController.php:37
 * @route '/user/votes'
 */
user.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoteController::user
 * @see app/Http/Controllers/VoteController.php:37
 * @route '/user/votes'
 */
user.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VoteController::user
 * @see app/Http/Controllers/VoteController.php:37
 * @route '/user/votes'
 */
    const userForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: user.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VoteController::user
 * @see app/Http/Controllers/VoteController.php:37
 * @route '/user/votes'
 */
        userForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: user.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VoteController::user
 * @see app/Http/Controllers/VoteController.php:37
 * @route '/user/votes'
 */
        userForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: user.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    user.form = userForm
/**
* @see \App\Http\Controllers\VoteController::results
 * @see app/Http/Controllers/VoteController.php:42
 * @route '/polls/{poll}/results'
 */
export const results = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: results.url(args, options),
    method: 'get',
})

results.definition = {
    methods: ["get","head"],
    url: '/polls/{poll}/results',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoteController::results
 * @see app/Http/Controllers/VoteController.php:42
 * @route '/polls/{poll}/results'
 */
results.url = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return results.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoteController::results
 * @see app/Http/Controllers/VoteController.php:42
 * @route '/polls/{poll}/results'
 */
results.get = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: results.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoteController::results
 * @see app/Http/Controllers/VoteController.php:42
 * @route '/polls/{poll}/results'
 */
results.head = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: results.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VoteController::results
 * @see app/Http/Controllers/VoteController.php:42
 * @route '/polls/{poll}/results'
 */
    const resultsForm = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: results.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VoteController::results
 * @see app/Http/Controllers/VoteController.php:42
 * @route '/polls/{poll}/results'
 */
        resultsForm.get = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: results.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VoteController::results
 * @see app/Http/Controllers/VoteController.php:42
 * @route '/polls/{poll}/results'
 */
        resultsForm.head = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: results.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    results.form = resultsForm
const votes = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
user: Object.assign(user, user),
results: Object.assign(results, results),
}

export default votes