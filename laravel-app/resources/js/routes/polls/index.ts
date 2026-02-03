import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/polls'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/polls',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/polls'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/polls'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/polls'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/polls'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/polls'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::index
 * @see app/Http/Controllers/PollController.php:22
 * @route '/polls'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:38
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
 * @see app/Http/Controllers/PollController.php:38
 * @route '/polls/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:38
 * @route '/polls/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:38
 * @route '/polls/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:38
 * @route '/polls/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:38
 * @route '/polls/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::create
 * @see app/Http/Controllers/PollController.php:38
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
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:48
 * @route '/polls'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/polls',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:48
 * @route '/polls'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:48
 * @route '/polls'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:48
 * @route '/polls'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::store
 * @see app/Http/Controllers/PollController.php:48
 * @route '/polls'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/polls/{poll}'
 */
export const show = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/polls/{poll}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/polls/{poll}'
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
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/polls/{poll}'
 */
show.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/polls/{poll}'
 */
show.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/polls/{poll}'
 */
    const showForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/polls/{poll}'
 */
        showForm.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::show
 * @see app/Http/Controllers/PollController.php:61
 * @route '/polls/{poll}'
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
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:69
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
 * @see app/Http/Controllers/PollController.php:69
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
 * @see app/Http/Controllers/PollController.php:69
 * @route '/polls/{poll}/edit'
 */
edit.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:69
 * @route '/polls/{poll}/edit'
 */
edit.head = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:69
 * @route '/polls/{poll}/edit'
 */
    const editForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:69
 * @route '/polls/{poll}/edit'
 */
        editForm.get = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PollController::edit
 * @see app/Http/Controllers/PollController.php:69
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
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/polls/{poll}'
 */
export const update = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/polls/{poll}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/polls/{poll}'
 */
update.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/polls/{poll}'
 */
update.put = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/polls/{poll}'
 */
update.patch = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/polls/{poll}'
 */
    const updateForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/polls/{poll}'
 */
        updateForm.put = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\PollController::update
 * @see app/Http/Controllers/PollController.php:77
 * @route '/polls/{poll}'
 */
        updateForm.patch = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:86
 * @route '/polls/{poll}'
 */
export const destroy = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/polls/{poll}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:86
 * @route '/polls/{poll}'
 */
destroy.url = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{poll}', parsedArgs.poll.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:86
 * @route '/polls/{poll}'
 */
destroy.delete = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:86
 * @route '/polls/{poll}'
 */
    const destroyForm = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PollController::destroy
 * @see app/Http/Controllers/PollController.php:86
 * @route '/polls/{poll}'
 */
        destroyForm.delete = (args: { poll: string | { id: string } } | [poll: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const polls = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default polls