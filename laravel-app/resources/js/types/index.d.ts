import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

type UUID = string;

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href?: string; // Parent href (optional if it's a dropdown)
    icon?: LucideIcon | null;
    //Extension for recursive as own child
    subItems?: NavItem[]; // Recursive structure for clean sub-menus
}

export interface SharedData {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Media {
    id: number;
    uuid: string;
    original_url: string;
    preview_url?: string;
    file_name: string;
    mime_type: string;
    size: number;
    // ... add other fields if you need them
}

export interface User {
    id: UUID;
    username: string;
    full_name?: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Poll {
    id: UUID;
    creator_id: UUID;
    title: string;
    description?: string;
    start_date: string;
    category: PollCategory;
    end_date: string;
    options?: PollOption[];
    is_finalized: boolean;
    is_active: boolean;
    allow_comments: boolean;
    allow_quorum: boolean;
    quorum_count?: number;
    created_at: string;
    updated_at: string;

    banner?: File | null;
    comments?: Comment[];
    creator?: User;
    votes?: Vote[];
    media?: Media[];
}

interface PaginatedPolls {
    data: Poll[];
    links: any[];
    meta: any;
}

export interface PollCategory {
    id: UUID;
    label: string;
    created_at: string;
    updated_at: string;
}
export interface PollOption {
    id: UUID;
    poll_id: UUID;
    value: string;
    display_order?: number;
    created_at: string;
    updated_at: string;
}
export interface Vote {
    id: UUID;
    poll_id: UUID;
    option_id: UUID;
    user_id: UUID;
    voted_at: string;
    created_at: string;
    updated_at: string;

    user?: User;
}

export interface PollResult {
    id: UUID;
    poll_id: UUID;
    is_draw?: boolean;
    total_votes: number;
    created_at: string;
    updated_at: string;
}
export interface Comments {
    id: UUID;
    user_id: UUID;
    poll_id: UUID;
    content: string;
    created_at: string;
    updated_at: string;
}
export interface AchievementType {
    id: UUID;
    code: string;
    name: string;
    description: string;
    requirement_type: string;
    requirement_value: number;
    created_at: string;
    updated_at: string;
}
export interface UserAchievement {
    id: UUID;
    user_id: UUID;
    achievement_type_id: UUID;
    progress_data: JSON;
    earned_at: string;
    created_at: string;
    updated_at: string;
}
export interface WinnerOption {
    id: UUID;
    poll_result_id: UUID;
    option_id: UUID;
    created_at: string;
    updated_at: string;
}
