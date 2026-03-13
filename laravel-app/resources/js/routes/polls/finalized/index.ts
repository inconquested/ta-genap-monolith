import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PollController::list
 * @see app/Http/Controllers/PollController.php:130
 * @route '/polls/finalized/list'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/polls/finalized/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::list
 * @see app/Http/Controllers/PollController.php:130
 * @route '/polls/finalized/list'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::list
 * @see app/Http/Controllers/PollController.php:130
 * @route '/polls/finalized/list'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::list
 * @see app/Http/Controllers/PollController.php:130
 * @route '/polls/finalized/list'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::list
 * @see app/Http/Controllers/PollController.php:130
 * @route '/polls/finalized/list'
 */
    const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::list
 * @see app/Http/Controllers/PollController.php:130
 * @route '/polls/finalized/list'
 */
        listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::list
 * @see app/Http/Controllers/PollController.php:130
 * @route '/polls/finalized/list'
 */
        listForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    list.form = listForm
const finalized = {
    list: Object.assign(list, list),
}

export default finalized