# Fixes Summary

Name: Naganandhini N
Registration number: 731623102041
Time spent: 5 hours

## Bugs fixed

1. **Issue**: Missing start development script in `package.json`.
   - **Files changed**: [package.json]
   - **Explanation**: Added `"dev": "vite"` script to `scripts` so the project development server can be started with `npm run dev`. Also added `react-dom` dependency which was missing but required for mounting the app, and downgraded ESLint / ESLint plugins to version 8 to match the `.eslintrc.cjs` config layout.
   - **Verification**: Ran `npm install`, then ran `npm run dev` and `npm run build` successfully.

2. **Issue**: Broken Tab Navigation.
   - **Files changed**: [App.jsx] and [Sidebar.jsx]
   - **Explanation**: 
     - In `App.jsx`, `{activeTab = 'dashboard' && (` was using assignment (`=`) instead of strict comparison (`===`), causing the activeTab state to revert to `'dashboard'` on every render.
     - In `Sidebar.jsx`, the nav button `onClick` event was hardcoded to call `onChangeTab('dashboard')` instead of passing the clicked item's id `item.id`.
   - **Verification**: Verified clicking Dashboard, Assignments, and Announcements tabs correctly switch views.

3. **Issue**: Ineffective/Case-sensitive Student Search and Department Filtering.
   - **Files changed**: [App.jsx]
   - **Explanation**: 
     - Search checking used direct `.includes(query)` which made queries case-sensitive and vulnerable to trailing/leading spaces. We trimmed and lowercased both strings.
     - The department match filter checked `student.department === 'All'`, which was incorrect. It was modified to check `student.department === department` (the selected dropdown value).
   - **Verification**: Searched names like " aarav " and filtered departments, confirming it works perfectly.

4. **Issue**: Inverted "Open Assignments" list.
   - **Files changed**: [App.jsx]
   - **Explanation**: The `openItems` filter was checking `item.completed === true`, showing completed tasks on the dashboard instead of incomplete ones. It was fixed to check `!item.completed`.
   - **Verification**: Verified the list on the Dashboard only displays incomplete tasks.

5. **Issue**: Incorrect Average Project Progress Formula.
   - **Files changed**: [App.jsx]
   - **Explanation**: Divided the total student progress sum by `assignmentItems.length` rather than the total count of students (`students.length`), which skewed the average metric.
   - **Verification**: Verified the average project progress display calculates correctly based on the mock data.

6. **Issue**: Direct State Mutation in State Toggles.
   - **Files changed**: [App.jsx]
   - **Explanation**: In `handleToggleAssignment`, task properties were updated by mutating the found item directly and passing the same array reference to `setAssignmentItems`. This is bad practice and prevented immediate UI updates. Replaced it with an immutable map update.
   - **Verification**: Clicking task checkboxes updates the UI check status and counters instantly.

7. **Issue**: Theme settings do not persist on page refresh.
   - **Files changed**: [App.jsx] and [useLocalStorage.js]
   - **Explanation**: 
     - In `useLocalStorage.js`, the `useEffect` wrote `initialValue` instead of the current state `value` to localStorage and omitted `value` from its dependency array.
     - In `App.jsx`, `handleThemeToggle` set `document.body.className = theme` which used a stale theme state value. We introduced a `useEffect` in `App.jsx` to synchronize the body className reactively.
   - **Verification**: Swapped theme to Dark and back, refreshed the page, and verified settings persist.

8. **Issue**: Student Progress Bars displaying Attendance.
   - **Files changed**: [StudentTable.jsx]
   - **Explanation**: The inner width style of the progress bar was styled with `student.attendance` rather than `student.progress`.
   - **Verification**: Confirmed progress bar bars match the numerical progress values.

9. **Issue**: Broken Assignment Form Fields and Validation.
   - **Files changed**: [NewAssignmentForm.jsx]
   - **Explanation**: 
     - Typing in one input erased all other values because `setForm({ field: value })` replaced the state object instead of merging. Fixed by using functional updates `setForm(prev => ({ ...prev, [field]: value }))`.
     - Form validation checked `!form.title && !form.course && !form.dueDate`, allowing submission unless all 3 were blank. Changed to logical OR (`||`).
     - Added form state reset back to `initialForm` upon successful creation.
   - **Verification**: Tested typing and error messages, and confirmed resetting works.

10. **Issue**: Unpredictable Assignment Sorting & Unstable Keys.
    - **Files changed**: [AssignmentList.jsx]
    - **Explanation**: 
      - The sort callback used `a.dueDate > b.dueDate` which did not return correct integer values required for standard sort arrays. Fixed to sort by date (ascending) and priority weight (descending).
      - Replaced index-based key (`key={index}`) in the table and title-based key (`key={assignment.title}`) in the assignment list with stable student and assignment `id`s.
    - **Verification**: Verified items sort accurately and warning-free.

11. **Issue**: Mobile Sidebar does not show when open.
    - **Files changed**: [styles.css]
    - **Explanation**: The media query styled `.sidebar.open` with `transform: translateX(-100%)` which kept the sidebar drawer hidden offscreen. Corrected to `translateX(0)` and added a `transition` for smooth drawer opening.
    - **Verification**: Tested at mobile width (< 720px), checked that hamburger button slides the sidebar menu into view and close button slides it out.

12. **Issue**: Pinned announcement UI was unprofessional and not responsive.
    - **Files changed**: [AnnouncementPanel.jsx] and [styles.css]
    - **Explanation**: 
      - Replaced the plain text “Pinned” badge with a compact inline-flex badge containing a `Pin` icon (`<Pin size={16} className="pin-icon" />`).
      - Positioned the badge in the top-right corner of each announcement card using absolute positioning (`position: absolute; right: 12px; top: 12px;`) and setting `position: relative` on the `.announcement-card` container.
      - Removed the background color from the badge, giving it a transparent look that blends nicely with the card design.
    - **Verification**: Verified the pinned badge appears as a clean icon-text pair in the corner of pinned cards and scales nicely.

13. **Issue**: Header and layout container were not fully responsive on tablet/mobile screens.
    - **Files changed**: [styles.css]
    - **Explanation**:
      - Prevented overall horizontal page overflow by adding `overflow-x: hidden` to the `body`.
      - Styled `.app-header` responsively on smaller viewports: adjusted padding to `12px 16px` on mobile, scaled down header font sizes, and hid the subtitle to prevent it from squishing and pushing header height.
      - Prevented horizontal width expansion on tablet/medium viewports by setting `flex-wrap: wrap` on main flex elements: `.stage-list` inside the hero card, `.hero-card` (to allow `.hero-score` to wrap below content), and dashboard `.panel-header` / `.filters`.
    - **Verification**: Verified using browser subagent that there are no horizontal scrollbars at 1024px, 768px, or 390px viewports, and header buttons remain fully visible inside the screen.

## UI improvements made

- **Status Health Distribution Chart**: Created a custom [StatusChart.jsx] showing project health status metrics dynamically using colored horizontal status bars, updating reactively based on filters.
- **Escape Key Accessibility**: Added keyboard support to `StudentModal.jsx` to immediately close details dialog when pressing the `Escape` key.
- **Click Outside to Close Modal**: Added a handler to close `StudentModal` if the user clicks outside the modal content area on the overlay background.
- **Empty States**: Configured empty state checks for both Assignments and Announcements tabs when no matching entries exist.

## Out-of-scope changes

- Aligned ESLint and ESLint plugins in `package.json` to v8 syntax to ensure configuration compatibility and clean test runs with the legacy setup.

## Testing performed

- **Desktop**: Resized, tested theme, navigation tabs, inputs.
- **Tablet**: Verified layouts responsive styling, wrapping, and flexboxes adapt.
- **Mobile**: Checked touch buttons, drawer menu toggles, overlay click to close, and responsive app header layout.
- **Browser console checked**: Yes, 0 warnings or errors present.
- **Refresh/persistence checked**: Yes, theme persists properly.

## Known limitations

- None.

## Additional recent fixes (UI / CSS)

14. **Issue**: Dark-mode left white surfaces and low contrast on some UI surfaces (hero, panels, buttons).
   - **Files changed**: [styles.css](src/styles.css)
   - **Explanation**: Added targeted dark-mode overrides to ensure panels, hero card, metric cards, and interactive controls use darker backgrounds and readable text colors. This includes removing pale gradients that could appear white on some mobile viewports.
   - **Verification**: Tested toggling theme and confirmed hero, panels, and controls display consistently dark with good contrast.

15. **Issue**: Mobile layout showed `main-content` as a half-width area when sidebar was hidden.
   - **Files changed**: [styles.css](src/styles.css)
   - **Explanation**: Updated the `@media (max-width: 1040px)` rules to set `.main-content { margin-left: 0; }` and hide the `.sidebar` by default (`.sidebar { transform: translateX(-100%); }`) while keeping `.sidebar.open` available to slide in. This makes the main area occupy the full width on tablet/mobile.
   - **Verification**: Confirmed at 1024px and 390px viewports that the main content spans full width and no horizontal white sliver appears.

16. **Issue**: Visual emphasis for the average project progress (hero score) was missing.
   - **Files changed**: [styles.css](src/styles.css)
   - **Explanation**: Added an 8px circular border (ring) around `.hero-score` and an adjusted dark-mode border color so the large numeric score has a consistent ring in both light and dark themes.
   - **Verification**: Checked desktop and mobile sizes — the hero score shows the ring and remains centered.

17. **Issue**: Announcement pin behavior and placement needed improvement.
   - **Files changed**: [AnnouncementPanel.jsx](src/components/AnnouncementPanel.jsx), [styles.css](src/styles.css)
   - **Explanation**: Changed rendering so the first visible announcement always shows a pin badge (in addition to items with `pinned: true`). Improved layout so the pin badge is vertically centered and justified to the far right of the announcement card. The badge uses an inline `Pin` icon for a compact, modern look.
   - **Verification**: Opened the announcements panel and verified the first card displays the pin and the badge sits at the right edge of the card on all screen sizes.

## Final notes

- These additions were intentionally scoped to CSS and small component adjustments only (no logic rewrites), per the assignment boundaries. If you want, I can prepare the final screenshots and a short zipped submission bundle next.
