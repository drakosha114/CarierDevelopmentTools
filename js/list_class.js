function List(param) {
    this.listSize = 0;
    this.currentPosition = 0;
    this.storage = [];

    this.init(param);
}
List.prototype.init = function (param) {
    if (param && param instanceof Array) {
        this.storage = param;
        this.listSize = this.storage.length;
    }
}
List.prototype.addElement = function (el) {
    if (el === undefined) return;
    this.storage[this.listSize++] = el;
}
List.prototype.remove = function (paramElement) {
    if (!paramElement) {
        return;
    }
    var foundIndex = this.search(paramElement);
    if (foundIndex !== -1) {
        this.storage.splice(foundIndex, 1);
        this.listSize--;
        return true;
    }
    return false;
}
List.prototype.removeByIndex = function (paramPosition) {
    if (!paramPosition || typeof paramPosition !== 'number' || paramPosition >= this.listSize) {
        return false;
    }
    this.storage.splice(paramPosition, 1);
    this.listSize--;
}
List.prototype.search = function (paramElement) {
    if (!paramElement) {
        return;
    }
    for (var i = 0; i < this.listSize; i++) {
        if (this.storage[i] === paramElement) {
            return i;
        }
    }
    return -1;
}
List.prototype.length = function () {
    return this.listSize;
}
List.prototype.each = function (callback, param) {

    if (!callback && typeof callback !== "function") {
        return false;
    }
    if (param && typeof param === 'object') {
        for (var i = 0; i < this.listSize; i++) {            
            callback.call(param, this.storage[i]);
        }
    } else {
        for (var i = 0; i < this.listSize; i++) {
            callback(this.storage[i]);
        }
    }
    
}
List.prototype.toString = function () {
    return this.storage;
}
List.prototype.clear = function () {
    this.storage = [];
    this.listSIze = this.currentPosition = 0;
    return true;
}
List.prototype.insert = function (paramElement, paramItem) {
    if (!paramElement || !paramItem) {
        return false;
    }
    var foundIndex = this.search(paramItem);
    if (foundIndex !== -1) {
        this.storage.splice(foundIndex + 1, 0, paramElement);
        this.listSize++;
        return true;
    }
    return false;
}
List.prototype.insertAfterIndexElement = function (paramElement, paramIndex) {
    if (!paramElement || !paramIndex || typeof paramIndex !== 'number' || paramIndex < 0 || paramIndex > this.listSIze - 1) {
        return false;
    }
    this.storage.splice(paramIndex + 1, 0, paramElement);
    this.listSize++;
    return true;
}
List.prototype.contains = function () {
    if (!paramElement) {
        return;
    }
    for (var i = 0; i < this.listSize; i++) {
        if (this.storage[i] === paramElement) {
            return true;
        }
    }
    return false;
}

List.prototype.front = function () {
    if (this.listSIze === 0) {
        return false;
    }
    this.currentPosition = 0;
}
List.prototype.end = function () {
    if (this.listSIze === 0) {
        return false;
    }
    this.currentPosition = this.listSize - 1;
}
List.prototype.prev = function () {
    if (this.currentPosition === 0) {
        return false;
    }
    this.currentPosition--;
}
List.prototype.next = function () {
    if (this.currentPosition >= this.listSIze - 1) {
        return false;
    }
    this.currentPosition++;
}
List.prototype.currPos = function () {
    return this.currentPosition;
}
List.prototype.moveTo = function (paramPosition) {
    if (!paramPosition || typeof paramPosition !== 'number' || paramPosition >= this.listSize) {
        return false;
    }
    this.currentPosition = paramPosition;
}
List.prototype.getElement = function () {
    if (this.listSize === 0) {
        return false;
    }
    return this.storage[this.currentPosition];
}
List.prototype.getElementByPosition = function (paramPosition) {
    if (this.listSize === 0) {
        return false;
    }
    return this.storage[paramPosition];
}
List.prototype.changeElementByPosition = function (paramPosition, paramValue, paramName) {
    if (paramPosition === undefined  && paramValue === undefined) {
        return false;
    }
    if (paramName ) {
        this.storage[paramPosition][paramName] = paramValue;
    } else {
        this.storage[paramPosition] = paramValue;
    }
    return true;
}
List.prototype.getList = function () {
    return this.storage;
}