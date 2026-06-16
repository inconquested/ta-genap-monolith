import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/comments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:0
 * @route '/comments'
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
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/comments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/comments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/comments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/comments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:32
 * @route '/comments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
export const show = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/comments/{comment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
show.url = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
show.get = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
show.head = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
    const showForm = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
        showForm.get = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CommentController::show
 * @see app/Http/Controllers/CommentController.php:57
 * @route '/comments/{comment}'
 */
        showForm.head = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
export const update = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/comments/{comment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
update.url = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
update.put = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
update.patch = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:65
 * @route '/comments/{comment}'
 */
    const updateForm = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
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
        updateForm.put = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
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
        updateForm.patch = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/comments/{comment}'
 */
export const destroy = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/comments/{comment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/comments/{comment}'
 */
destroy.url = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/comments/{comment}'
 */
destroy.delete = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:73
 * @route '/comments/{comment}'
 */
    const destroyForm = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
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
        destroyForm.delete = (args: { comment: string | { id: string } } | [comment: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const comments = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default comments