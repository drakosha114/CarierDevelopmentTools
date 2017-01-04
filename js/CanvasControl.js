function CanvasControl () {
    var sys,
        headerColors = {},
        regColors = {};

    return {
        init: function (paramCanvasWrapper, canvasElement, colls, rows, paramHeaderColors, paramRegularColor, data) {
            sys = arbor.ParticleSystem(1000);
            sys.parameters({ gravity: true });
            sys.renderer = Renderer({
                'canvasWrapper': paramCanvasWrapper,
                'canvasElement': canvasElement,
                'colls': colls,
                'rows': rows
            }, Canvas);

            headerColors = paramHeaderColors;
            regColors = paramRegularColor;
            if (data) {
                this.addData(data);
            }
        },
        changeData: function (nodes, edges, titles, colls, rows) {
            this.deleteData();
            //sys.renderer.updateCanvas(paramNewGraphData.colls, paramNewGraphData.rows);
            this.addData(nodes, edges, titles, colls, rows);
        },
        deleteData: function () {
            sys.eachNode(function (node) {
                sys.pruneNode(node.name)
            })
        },
        addData: function (nodes, edges, titles, colls, rows) {
            sys.renderer.updateCanvas(colls, rows);

            $.each(nodes, function (i, element) {
                

                sys.addNode(element.name, {
                    'coll': element.coll,
                    'selected': element.selected,
                    'disabled':element.disabled,
                    'domian':element.domian,
                    'end':element.end,
                    'role':element.role,
                    'row':element.row,
                    'start': element.start,
                    'level': element.level,
                    'nextSelected': element.nextSelected,
                    'color': (function () {
                        if (element.selected === true) {
                            return '#ff0000';
                        } else {
                            return element.disabled === false && regColors[element.domian] ? regColors[element.domian] : '#a8a8a8';
                        }                        
                    }(element))
                });
            });
             $.each(titles, function (i, element) {
                sys.addNode(element.name, {
                    'coll': parseInt(element.coll),
                    'row': parseInt(element.row),
                    'color': headerColors[element.domian] ? headerColors[element.domian] : '#a8a8a8'
                });
            });
            $.each(edges, function (i, element) {
                sys.addEdge(sys.getNode(element.node), sys.getNode(element.target));
            });
        }
    }

}

