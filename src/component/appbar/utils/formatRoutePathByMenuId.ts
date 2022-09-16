/**
 * Formats a menu entry ID into the URL to the associated menu view
 * @param menuId The menu entry ID
 */
export function formatRoutePathByMenuId(menuId: string) {
    return `/hmenu/${encodeURIComponent(menuId)}`
}