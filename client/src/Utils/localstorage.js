/**
 * Utils Function to manipulate the localstorage
 */

 const setLocalStorage = (key, value) => typeof value !== 'string' ? window.localStorage.setItem(key, JSON.stringify(value)) : window.localStorage.setItem(key, value);
 const getLocalStorage = (key) => window.localStorage.getItem(key);
 const removeLocalStorage = (key) => window.localStorage.removeItem(key);
 const clearLocalStorage = () => window.localStorage.clear();
 

 export { setLocalStorage, getLocalStorage, removeLocalStorage, clearLocalStorage }