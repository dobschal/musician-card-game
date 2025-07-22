export default class EventHandler<DataType> {
    _listeners: Record<string, Function[]> = {};

    emit(name: string, data: DataType) {
        if (!this._listeners[name]) {
            return this;
        }
        this._listeners[name].forEach(callback => {
            callback(data);
        });
        return this;
    }

    on(name: string, callback: Function) {
        if (!this._listeners[name]) {
            this._listeners[name] = [];
        }
        this._listeners[name].push(callback);
        return this;
    }
}
