# Task Brief: Database Seeding, Feature Verification, and Endpoint Optimization

*Context: The API needed to be finalized for the beta release. While the app is in progress, the API endpoints needed to return rich data for the client to consume.*

## 1. Implement commenting features in poll routing
**Objective:** Implement the existing commenting feature in poll routing using the ```CommentController```.
### Requirements:
*   **CRUD Operations:** Implement full CRUD operations for comments on poll routes, including creating, reading, updating, and deleting comments.
*   **Analytics:** The provider needs to know the behavior and functionality of the commenting feature. Add analytics tracking to the commenting feature at ```app/Http/Controllers/AnalyticsController.php```.
    * Generates a report that tracks the number of comments, commenters, and comment content over time.
    * Add a user-facing report in the poll feature that displays the comment analytics in their polls

## 2. Database Seeding via Laravel Tinker
**Objective:** Manually seed a robust set of poll data with diverse payloads, mock votes, and calculated winners without waiting for standard system countdown triggers.

### Requirements:
*   **Poll Seeding:** Generate numerous poll combinations (e.g., varying options, restrictions, and statuses). Use the local image asset located at `tmp/asset` for any required poll imagery.
*   **Vote & Winner Simulation:** Write a script/snippet to run inside Laravel Tinker that:
    *   Generates a realistic distribution of mock votes across the seeded polls, rich enough to simulate real-world voting behavior.
    *   Explicitly sets and records the winner options, bypassing the application's automated expiration/countdown logic.

---

## 3. Achievement Notification & Real-Time Event Verification
**Objective:** Verify that the system accurately triggers and broadcasts achievement unlocks to users.

### Requirements:
*   **Pusher Integration:** Ensure that when an achievement condition is met, the corresponding event is successfully published via Pusher.
*   **Notification Delivery:** Verify that both the real-time frontend notifications (via the Pusher broadcast channel) and the standard database/mail notifications trigger correctly.
*   **Validation:** Test edge cases, such as unlocking multiple achievements simultaneously or unlocking the same achievement under different user accounts.

---

## 4. Dashboard, Reports, and Analytics Endpoint Optimization
**Objective:** Audit and refine the analytics-related API endpoints to ensure they return comprehensive, clean, and front-end-ready payloads.

### Requirements:
*   **Data Richness:** Ensure endpoints for the **Dashboard**, **Reports**, and **Analytics** aggregate all necessary metrics (e.g., conversion rates, trends over time, user engagement statistics, demographic breakdowns) when queried and return a consistent JSON structure.
*   **Performance & Structure:** 
    *   Optimize database queries (e.g., eager loading, indexing check) to prevent bottlenecks. Avoid raw SQL queries; use Eloquent ORM whenever possible.
    *   Ensure the JSON structure response is consistent and optimized for charting logics and client-side rendering.

## 5. Rewrite results
**Objective:** Rewrite ```api_reference.md``` and ```kpi_matrix.md``` to reflect the latest API endpoints and KPI metrics.

### Requirements:
* **Brief:** The rewrite should show what changes were made and why.