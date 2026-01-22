<?php

namespace App\Enums;

enum VoteActions: string
{
    case CREATED = 'created';
    case UPDATED = 'updated';
    case DELETED = 'deleted';
    case FLAGGED = 'flagged';
    case RESTORED = 'restored';
}
