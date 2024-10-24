const eventBus = {
    emit(event, data) {
        localStorage.setItem(event, JSON.stringify(data));
    },
    on(event, listener) {
        window.addEventListener('storage', (e) => {
            if (e.key === event) {
                listener(JSON.parse(e.newValue));
            }
        });
    }
};

export default eventBus;
