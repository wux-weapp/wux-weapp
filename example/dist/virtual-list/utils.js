export const mapVirtualToProps = ({ items, itemHeight }, { startIndex, endIndex }) => {
    const visibleItems = endIndex > -1 ? items.slice(startIndex, endIndex + 1) : []

    // style
    const height = items.length * itemHeight
    const paddingTop = startIndex * itemHeight

    return {
        virtual: {
            items: visibleItems,
            style: `height: ${height}px; padding-top: ${paddingTop}px; box-sizing: border-box;`,
        }
    }
}

export const getVisibleItemBounds = (viewTop, viewHeight, itemCount, itemHeight, itemBuffer) => {
    // visible list inside view
    const listViewTop = Math.max(0, viewTop)

    // visible item indexes
    const startIndex = Math.max(0, Math.floor(listViewTop / itemHeight))
    const endIndex = Math.min(startIndex + Math.ceil(viewHeight / itemHeight) + itemBuffer - 1, itemCount)

    return {
        startIndex,
        endIndex,
    }
}