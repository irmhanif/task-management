export const setLocalStorage = (key, payload) => {
    localStorage.setItem(key, JSON.stringify(payload));
}

export const getLocalStorage = (key) => {
    localStorage.getItem(key)
}