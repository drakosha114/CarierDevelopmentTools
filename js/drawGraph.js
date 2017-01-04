function Renderer(paramsCanvas, paramCanvasConstructor, particleSystem) {

    var canvas = paramCanvasConstructor(paramsCanvas)
    ctx = canvas.getCtx(),
    particleSystem;


    function __getPath(paramSource, paramTarget, coordsSource, coordsTarget) {

        var param = paramSource.coll,
            param2 = paramSource.row

        var start = {
            'x': coordsSource.x + coordsSource.width,
            'y': coordsSource.y + coordsSource.height / 2 
        }
        var points = [{
            'x': start.x + 20,
            'y': start.y
        }, {
            'x': start.x + 20,
            'y': coordsSource.y + coordsSource.height + 20
        }, {
            'x': coordsTarget.x - 20,
            'y': coordsSource.y + coordsSource.height  + 20
        }, {
            'x': coordsTarget.x - 20,
            'y': coordsTarget.y + coordsTarget.height / 2
        }, {
            'x': coordsTarget.x,
            'y': coordsTarget.y + coordsTarget.height / 2
        }]

        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);



        for (var i = 0, l = points.length; i < l; i += 1) {

            ctx.lineTo(points[i].x, points[i].y);

        }

        ctx.stroke();

        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.moveTo(coordsTarget.x, coordsTarget.y + coordsTarget.height / 2);
        ctx.lineTo(coordsTarget.x - 8, coordsTarget.y + coordsTarget.height / 2 - 4);
        ctx.lineTo(coordsTarget.x - 8, coordsTarget.y + coordsTarget.height / 2 + 4);
        ctx.fill();
        ctx.stroke();
    }


    var that = {
        init: function (system) {
            particleSystem = system;
            particleSystem.screenSize(canvas.getWidth(), canvas.getHeight());
            particleSystem.screenPadding(80);
            that.initMouseHandling();
        },
        redraw: function () {
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particleSystem.eachNode(
                function (node) {
                    
                    var coords = canvas.getCellCoords(node.data.coll, node.data.row);
                    var text = node.data.level ? node.data.level : node.name;
                     

                    ctx.fillStyle = node.data.color;
                    ctx.fillRect(coords.x, coords.y, coords.width, coords.height);
                    ctx.fillStyle = '#000';
                    ctx.font = '14px sans-serif';
                    ctx.fillText(text, coords.x + 55, coords.y + 28);
                });

            particleSystem.eachEdge(
                 function (edge) {
                     
                     var coordsSource = canvas.getCellCoords(edge.source.data.coll, edge.source.data.row);
                     var coordsTarget = canvas.getCellCoords(edge.target.data.coll, edge.target.data.row);

                     if (edge.source.data.coll === edge.target.data.coll) {

                         if (edge.source.data.selected === true && edge.target.data.selected === true) {
                             ctx.strokeStyle = '#ff0000';
                             ctx.fillStyle = '#ff0000';
                         } else {
                             ctx.strokeStyle = "rgba(168,168,168, .333)";
                             ctx.fillStyle = "rgba(168,168,168, .333)";
                         }

                         ctx.lineWidth = 1;
                         ctx.beginPath();
                         ctx.moveTo(coordsSource.x + coordsSource.width, coordsSource.y + coordsSource.height / 2);
                         ctx.lineTo(coordsTarget.x, coordsTarget.y + coordsTarget.height / 2);
                         ctx.stroke();

                        
                         ctx.beginPath();
                         ctx.moveTo(coordsTarget.x, coordsTarget.y + coordsTarget.height / 2);
                         ctx.lineTo(coordsTarget.x - 8, coordsTarget.y + coordsTarget.height / 2 - 4);
                         ctx.lineTo(coordsTarget.x - 8, coordsTarget.y + coordsTarget.height / 2 + 4);
                         ctx.fill();
                         ctx.stroke();



                     } else if (edge.source.data.selected === true && edge.target.data.selected === true && edge.target.name === edge.source.data.nextSelected) {
                         __getPath(edge.source.data, edge.target.data, coordsSource, coordsTarget);
                     }
                 });

        },
        initMouseHandling: function () {
            console.log('asdas');
        },
        updateCanvas: function (paramColls, paramRows) {
            disabledElements = [];
            canvas.updateGrid(paramColls, paramRows)
        }
    }

    return that;
}