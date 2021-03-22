export const getPresetsAction = () => {
    try {
        return JSON.parse(localStorage.getItem("presets")) || {};
    } catch (e) {
        return e;
    }
};

export const setPresetsAction = (data) => {
    try {
        localStorage.setItem('presets', JSON.stringify(data))
    } catch (e) {
        return e;
    }
}