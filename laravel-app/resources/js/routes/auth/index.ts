import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
 * @see routes/web.php:24
 * @route '/auth/{provider}/redirect'
 */
export const redirect = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(args, options),
    method: 'get',
})

redirect.definition = {
    methods: ["get","head"],
    url: '/auth/{provider}/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:24
 * @route '/auth/{provider}/redirect'
 */
redirect.url = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { provider: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    provider: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        provider: args.provider,
                }

    return redirect.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:24
 * @route '/auth/{provider}/redirect'
 */
redirect.get = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:24
 * @route '/auth/{provider}/redirect'
 */
redirect.head = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirect.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:24
 * @route '/auth/{provider}/redirect'
 */
    const redirectForm = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirect.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:24
 * @route '/auth/{provider}/redirect'
 */
        redirectForm.get = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:24
 * @route '/auth/{provider}/redirect'
 */
        redirectForm.head = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirect.form = redirectForm
const auth = {
    redirect: Object.assign(redirect, redirect),
}

export default auth