function Vertex(label) {
    this.label = label;
}
function Graph() {
    this.vertices = [];
    this.edjes = 0;
    this.adj = [];
    this.marked = [];
}
Graph.prototype.init = function (v) {
    this.createGraphArray(v);
    this.resetMarked();
};

Graph.prototype.showGraph = function (callback) {
    for (var i = 0; i < this.vertices; i += 1) {
        if (callback && typeof callback === "function") callback(i);
        if (callback && typeof callback === "function") callback('->');
        for (var j = 0 ; j < this.vertices; j += 1) {
            if (typeof this.adj[i][j] !== 'undefined' && callback && typeof callback === "function") callback(this.adj[i][j]);
        }
        if (callback && typeof callback === "function") callback('end' + i + 'vertice');
    }
};
Graph.prototype.addEdje = function (v, w) {

    this.adj[v][w] = w;
    //this.adj[w][v] = v;
    this.edjes += 1;
};
Graph.prototype.resetMarked = function () {
    for (var i = 0; i < this.vertices; i += 1) {
        this.marked[i] = false;
    }
};
Graph.prototype.createGraphArray = function (param) {
    this.vertices = param;
    for (var i = 0; i < this.vertices; i += 1) {
        this.adj[i] = [];
        for (var j = 0; j < this.vertices; j += 1) {
            this.adj[i].push("");
        }

    }
};
/*
Graph.prototype.dfs = function (v) {
	this.marked[v] = true;
	
}*/
Graph.prototype.getPathFrom = function (v, w) {
    var path = [];
    if (this.isTargetVertice(v, w, path) === true) {
        path.push(v);
    }
    this.resetMarked();
    return path;
};
Graph.prototype.isTargetVertice = function (v, w, path) {
    this.marked[v] = true;
    for (var i = 0; i < this.vertices; i += 1) {
        if (this.adj[v][i] === undefined || this.adj[v][i] === "") continue;
        if (this.marked[i] === true) continue;
        if (i === w) {
            path.push(i);
            return true;
        }
        if (this.isTargetVertice(i, w, path) === true) {
            path.push(i);
            return true;
        }
    }
    return false;
};
Graph.prototype.noPathFromVertice = function (v) {
    var temp = [];
    for (var i = 0; i < this.vertices; i += 1) {
        if (i === v) continue;
        if (this.getPathFrom(v, i).length === 0) {
            temp.push(i);
        }
    }
    return temp;
};
Graph.prototype.hasPathFromVertice = function (v) {
    var temp = [];
    for (var i = 0; i < this.vertices; i += 1) {
        if (i === v) continue;
        if (this.getPathFrom(v, i).length > 0) {
            temp.push(i);
        }
    }
    return temp;
};
