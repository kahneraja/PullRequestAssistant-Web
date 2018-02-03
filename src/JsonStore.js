
class JsonStore {
    set(key, value) {
        localStorage.setItem(key, value);
    }
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    }
}

export default JsonStore