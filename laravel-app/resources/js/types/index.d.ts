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
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
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

export interface Poll{
    id: UUID;
    creator_id: UUID;
    title: string;
    description?: string;
    start_date:string;
    end_date:string;
    is_finalized:boolean;
    is_active: boolean;
    allow_comments:boolean;
    is_finalized_vote_counts:boolean;
    finalized_vote_counts?:number;
}

export interface PollOption {
    id: UUID;
    poll_id:UUID;
    option_text:string;
    display_order?:number;
}
export interface Vote {
    id: UUID;
    poll_id: UUID;
    option_id: UUID;
    user_id: UUID;
    voted_at:string;
}

export interface PollResult {
    id: UUID;
    poll_id: UUID;
    is_draw?: boolean;
    total_votes:number;
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
    requirement_type: string
    requirement_value: number;
}
export interface UserAchievement {
    id: UUID;
    user_id: UUID;
    achievement_type_id: UUID;
    progress_data: JSON;
    earned_at: string;
}
export interface WinnerOption {
    id: UUID;
    poll_result_id: UUID;
    option_id: UUID;
}
