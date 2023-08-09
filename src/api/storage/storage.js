// save item in sessionStorage
const setItem = (key, value) => {
    sessionStorage.setItem(key, value);
};

// get an item from sessionStorage with its key
const getItem = (key) => {
    if (sessionStorage.getItem(key)) return sessionStorage.getItem(key);
    return false;
};

// remove specific item with its key from sessionStorage
const removeItem = (key) => {
    if (getItem(key) === false) return false;
    sessionStorage.removeItem(key);
};

// cleare all sessionStorage of this site
const clearStorage = () => {
    sessionStorage.clear();
};

export { setItem, getItem, removeItem, clearStorage };