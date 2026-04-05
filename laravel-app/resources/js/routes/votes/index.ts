import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:22
 * @route '/api/polls/{poll}/votes'
 */
export const store = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/polls/{poll}/votes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:22
 * @route '/api/polls/{poll}/votes'
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
 * @see app/Http/Controllers/VoteController.php:22
 * @route '/api/polls/{poll}/votes'
 */
store.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:22
 * @route '/api/polls/{poll}/votes'
 */
    const storeForm = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VoteController::store
 * @see app/Http/Controllers/VoteController.php:22
 * @route '/api/polls/{poll}/votes'
 */
        storeForm.post = (args: { poll: string | number } | [poll: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const votes = {
    store: Object.assign(store, store),
}

export default votes