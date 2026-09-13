import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AnalyticsController::show
 * @see app/Http/Controllers/AnalyticsController.php:16
 * @route '/api/analytics/polls/{poll}'
 */
export const show = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/analytics/polls/{poll}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::show
 * @see app/Http/Controllers/AnalyticsController.php:16
 * @route '/api/analytics/polls/{poll}'
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
* @see \App\Http\Controllers\AnalyticsController::show
 * @see app/Http/Controllers/AnalyticsController.php:16
 * @route '/api/analytics/polls/{poll}'
 */
show.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnalyticsController::show
 * @see app/Http/Controllers/AnalyticsController.php:16
 * @route '/api/analytics/polls/{poll}'
 */
show.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AnalyticsController::show
 * @see app/Http/Controllers/AnalyticsController.php:16
 * @route '/api/analytics/polls/{poll}'
 */
    const showForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AnalyticsController::show
 * @see app/Http/Controllers/AnalyticsController.php:16
 * @route '/api/analytics/polls/{poll}'
 */
        showForm.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AnalyticsController::show
 * @see app/Http/Controllers/AnalyticsController.php:16
 * @route '/api/analytics/polls/{poll}'
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
* @see \App\Http\Controllers\AnalyticsController::comments
 * @see app/Http/Controllers/AnalyticsController.php:24
 * @route '/api/analytics/polls/{poll}/comments'
 */
export const comments = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: comments.url(args, options),
    method: 'get',
})

comments.definition = {
    methods: ["get","head"],
    url: '/api/analytics/polls/{poll}/comments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnalyticsController::comments
 * @see app/Http/Controllers/AnalyticsController.php:24
 * @route '/api/analytics/polls/{poll}/comments'
 */
comments.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return comments.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnalyticsController::comments
 * @see app/Http/Controllers/AnalyticsController.php:24
 * @route '/api/analytics/polls/{poll}/comments'
 */
comments.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: comments.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnalyticsController::comments
 * @see app/Http/Controllers/AnalyticsController.php:24
 * @route '/api/analytics/polls/{poll}/comments'
 */
comments.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: comments.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AnalyticsController::comments
 * @see app/Http/Controllers/AnalyticsController.php:24
 * @route '/api/analytics/polls/{poll}/comments'
 */
    const commentsForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: comments.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AnalyticsController::comments
 * @see app/Http/Controllers/AnalyticsController.php:24
 * @route '/api/analytics/polls/{poll}/comments'
 */
        commentsForm.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: comments.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AnalyticsController::comments
 * @see app/Http/Controllers/AnalyticsController.php:24
 * @route '/api/analytics/polls/{poll}/comments'
 */
        commentsForm.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: comments.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    comments.form = commentsForm
const AnalyticsController = { show, comments }

export default AnalyticsController