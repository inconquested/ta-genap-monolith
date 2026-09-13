import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ReportController::health
 * @see app/Http/Controllers/ReportController.php:27
 * @route '/api/reports/health'
 */
export const health = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: health.url(options),
    method: 'get',
})

health.definition = {
    methods: ["get","head"],
    url: '/api/reports/health',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::health
 * @see app/Http/Controllers/ReportController.php:27
 * @route '/api/reports/health'
 */
health.url = (options?: RouteQueryOptions) => {
    return health.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::health
 * @see app/Http/Controllers/ReportController.php:27
 * @route '/api/reports/health'
 */
health.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: health.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::health
 * @see app/Http/Controllers/ReportController.php:27
 * @route '/api/reports/health'
 */
health.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: health.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::health
 * @see app/Http/Controllers/ReportController.php:27
 * @route '/api/reports/health'
 */
    const healthForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: health.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::health
 * @see app/Http/Controllers/ReportController.php:27
 * @route '/api/reports/health'
 */
        healthForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: health.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::health
 * @see app/Http/Controllers/ReportController.php:27
 * @route '/api/reports/health'
 */
        healthForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: health.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    health.form = healthForm
/**
* @see \App\Http\Controllers\ReportController::growth
 * @see app/Http/Controllers/ReportController.php:36
 * @route '/api/reports/growth'
 */
export const growth = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: growth.url(options),
    method: 'get',
})

growth.definition = {
    methods: ["get","head"],
    url: '/api/reports/growth',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::growth
 * @see app/Http/Controllers/ReportController.php:36
 * @route '/api/reports/growth'
 */
growth.url = (options?: RouteQueryOptions) => {
    return growth.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::growth
 * @see app/Http/Controllers/ReportController.php:36
 * @route '/api/reports/growth'
 */
growth.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: growth.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::growth
 * @see app/Http/Controllers/ReportController.php:36
 * @route '/api/reports/growth'
 */
growth.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: growth.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::growth
 * @see app/Http/Controllers/ReportController.php:36
 * @route '/api/reports/growth'
 */
    const growthForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: growth.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::growth
 * @see app/Http/Controllers/ReportController.php:36
 * @route '/api/reports/growth'
 */
        growthForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: growth.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::growth
 * @see app/Http/Controllers/ReportController.php:36
 * @route '/api/reports/growth'
 */
        growthForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: growth.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    growth.form = growthForm
/**
* @see \App\Http\Controllers\ReportController::integrity
 * @see app/Http/Controllers/ReportController.php:45
 * @route '/api/reports/integrity'
 */
export const integrity = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: integrity.url(options),
    method: 'get',
})

integrity.definition = {
    methods: ["get","head"],
    url: '/api/reports/integrity',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::integrity
 * @see app/Http/Controllers/ReportController.php:45
 * @route '/api/reports/integrity'
 */
integrity.url = (options?: RouteQueryOptions) => {
    return integrity.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::integrity
 * @see app/Http/Controllers/ReportController.php:45
 * @route '/api/reports/integrity'
 */
integrity.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: integrity.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::integrity
 * @see app/Http/Controllers/ReportController.php:45
 * @route '/api/reports/integrity'
 */
integrity.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: integrity.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::integrity
 * @see app/Http/Controllers/ReportController.php:45
 * @route '/api/reports/integrity'
 */
    const integrityForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: integrity.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::integrity
 * @see app/Http/Controllers/ReportController.php:45
 * @route '/api/reports/integrity'
 */
        integrityForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: integrity.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::integrity
 * @see app/Http/Controllers/ReportController.php:45
 * @route '/api/reports/integrity'
 */
        integrityForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: integrity.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    integrity.form = integrityForm
/**
* @see \App\Http\Controllers\ReportController::poll
 * @see app/Http/Controllers/ReportController.php:19
 * @route '/api/reports/{poll}'
 */
export const poll = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poll.url(args, options),
    method: 'get',
})

poll.definition = {
    methods: ["get","head"],
    url: '/api/reports/{poll}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::poll
 * @see app/Http/Controllers/ReportController.php:19
 * @route '/api/reports/{poll}'
 */
poll.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return poll.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::poll
 * @see app/Http/Controllers/ReportController.php:19
 * @route '/api/reports/{poll}'
 */
poll.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poll.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::poll
 * @see app/Http/Controllers/ReportController.php:19
 * @route '/api/reports/{poll}'
 */
poll.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poll.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::poll
 * @see app/Http/Controllers/ReportController.php:19
 * @route '/api/reports/{poll}'
 */
    const pollForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: poll.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::poll
 * @see app/Http/Controllers/ReportController.php:19
 * @route '/api/reports/{poll}'
 */
        pollForm.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: poll.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::poll
 * @see app/Http/Controllers/ReportController.php:19
 * @route '/api/reports/{poll}'
 */
        pollForm.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: poll.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    poll.form = pollForm
const reports = {
    health: Object.assign(health, health),
growth: Object.assign(growth, growth),
integrity: Object.assign(integrity, integrity),
poll: Object.assign(poll, poll),
}

export default reports