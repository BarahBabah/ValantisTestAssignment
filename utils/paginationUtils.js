export const returnPaginationRange = (totalPage, page, limit, siblings) => {
    const totalPageNoInArray = 7 + siblings;
    if (totalPageNoInArray >= totalPage) {
        return Array.from({ length: totalPage }, (_, i) => i + 1);
    }
    const leftSiblingsIndex = Math.max(page - siblings, 1);
    const rightSiblingsIndex = Math.min(page + siblings, totalPage);
    const showLeftDots = leftSiblingsIndex > 2
    const showRightDots = rightSiblingsIndex < totalPage - 2;

    if (!showLeftDots && showRightDots) {
        const leftItemsCount = 3 + 2 * siblings;
        const leftRange = Array.from({ length: leftItemsCount }, (_, i) => i + 1);
        return [...leftRange, " ...", totalPage]
    } if (showLeftDots && !showRightDots) {
        const rightItemsCount = 3 + 2 * siblings;
        const rightRange = Array.from({ length: rightItemsCount }, (_, i) => totalPage - rightItemsCount + i + 1);
        return [1, "... ", ...rightRange];
    }
    const middleRange = Array.from({ length: rightSiblingsIndex - leftSiblingsIndex + 1 }, (_, i) => leftSiblingsIndex + i);
    return [1, '... ', ...middleRange, ' ...', totalPage]

}