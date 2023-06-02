export const setLocalStorage = (key, payload) => {
    localStorage.setItem(key, JSON.stringify(payload));
}

export const getLocalStorage = (key) => {
    const values = localStorage.getItem(key)
    return JSON.parse(values)
}