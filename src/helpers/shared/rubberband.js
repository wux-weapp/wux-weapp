export function clamp(v, min, max) {
    return Math.max(min, Math.min(v, max))
}

export function rubberband(distance, dimension, constant) {
    if (dimension === 0 || Math.abs(dimension) === Infinity) return Math.pow(distance, constant * 5)
    return (distance * dimension * constant) / (dimension + constant * distance)
}

/**
 * Calculates the rubberbanding effect from a given `position` value, two bounds `min`, `max` and an elasticity `constant`.
 */
export function rubberbandIfOutOfBounds(position, min, max, constant = 0.15) {
    if (constant === 0) return clamp(position, min, max)
    if (position < min) return -rubberband(min - position, max - min, constant) + min
    if (position > max) return +rubberband(position - max, max - min, constant) + max
    return position
}
