import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::metrics
 * @see app/Http/Controllers/DashboardController.php:56
 * @route '/api/dashboard'
 */
export const metrics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metrics.url(options),
    method: 'get',
})

metrics.definition = {
    methods: ["get","head"],
    url: '/api/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::metrics
 * @see app/Http/Controllers/DashboardController.php:56
 * @route '/api/dashboard'
 */
metrics.url = (options?: RouteQueryOptions) => {
    return metrics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::metrics
 * @see app/Http/Controllers/DashboardController.php:56
 * @route '/api/dashboard'
 */
metrics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metrics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::metrics
 * @see app/Http/Controllers/DashboardController.php:56
 * @route '/api/dashboard'
 */
metrics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: metrics.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::metrics
 * @see app/Http/Controllers/DashboardController.php:56
 * @route '/api/dashboard'
 */
    const metricsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: metrics.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::metrics
 * @see app/Http/Controllers/DashboardController.php:56
 * @route '/api/dashboard'
 */
        metricsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: metrics.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::metrics
 * @see app/Http/Controllers/DashboardController.php:56
 * @route '/api/dashboard'
 */
        metricsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: metrics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    metrics.form = metricsForm
/**
* @see \App\Http\Controllers\DashboardController::health
 * @see app/Http/Controllers/DashboardController.php:66
 * @route '/api/dashboard/health'
 */
export const health = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: health.url(options),
    method: 'get',
})

health.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/health',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::health
 * @see app/Http/Controllers/DashboardController.php:66
 * @route '/api/dashboard/health'
 */
health.url = (options?: RouteQueryOptions) => {
    return health.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::health
 * @see app/Http/Controllers/DashboardController.php:66
 * @route '/api/dashboard/health'
 */
health.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: health.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::health
 * @see app/Http/Controllers/DashboardController.php:66
 * @route '/api/dashboard/health'
 */
health.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: health.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::health
 * @see app/Http/Controllers/DashboardController.php:66
 * @route '/api/dashboard/health'
 */
    const healthForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: health.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::health
 * @see app/Http/Controllers/DashboardController.php:66
 * @route '/api/dashboard/health'
 */
        healthForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: health.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::health
 * @see app/Http/Controllers/DashboardController.php:66
 * @route '/api/dashboard/health'
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
const dashboard = {
    metrics: Object.assign(metrics, metrics),
health: Object.assign(health, health),
}

export default dashboard