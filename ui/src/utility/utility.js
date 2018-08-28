// Given a full _hex_ string: '#000000', _alpha_ number: [0-1], returns a rgba string;
// Invalid inputs will result in a -1 return
export function hexRGBA(hex, alpha) {
    if (hex.length < 7 || hex.length > 7 || alpha > 1) {
        console.error('Invalid hex string.');
        return -1;
    }
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = (alpha === 0 || alpha > 0) ? `${alpha}` : '';
    return `rgba(${r},${g},${b},${a})`;
}

export function sortByRating(gifA, gifB) {
    if (gifA.get('stars', 0) > gifB.get('stars', 0)) return -1;
    if (gifA.get('stars', 0) < gifB.get('stars', 0)) return 1;
    return 0;
}