<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Requests\CommentStoreRequest;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function userIndex(Request $req)
    {
        $comments = Comment::where('user_id', $req->user_id)->get();
        return Inertia::render('Comments/Index', [
            'comments' => $comments,
        ]);
    }
    public function pollIndex(Request $req)
    {
        $comments = Comment::where('poll_id', $req->poll_id)->get();
        return Inertia::render('Comments/Index', [
            'comments' => $comments,
        ]);
    }

    /**
     * 
     * Store a newly created resource in storage.
     */
    public function store(CommentStoreRequest $req)
    {
        $comment = \App\Models\Poll::find($req->poll_id)->comments()->create($req->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        $comment->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
    }
}
