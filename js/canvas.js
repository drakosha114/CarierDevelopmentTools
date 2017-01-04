function Canvas(params) {
    var params = $.extend({
        'canvasWrapper': '.canvas-wrapper', // [css selector]
        'canvasElement': '#deathStar', // [css selector]
        'mode': 'vertical', // [string]  "vertical" or "horizontal"
        'scroll': true, // [boolean] on off gorizontal scroll
        'colls': 11, // [number] number of positions
        'rows': 4, // [number] number max levels in position
        'sort': 'abc' // [string] to top or to bottm
    }, params),
        __grid = [],
        __container,
        __canvasWidth,
        __canvasHeight,
        __canvas,
        __ctx,
        __cellHeight,
        __cellWidth,
        timeout,
        __colls = params.colls,
        __rows = params.rows;

    function __createGrid() {
        var temp = [],
            tempRow = [],
            startX = 0,
            startY = 0,
            offsetX = 0,
            offsetY = 0,
            cellWidth = __cellWidth * 0.8,
            cellHeight = __cellHeight * 0.6;

        for (var i = 0; i < __colls; i += 1) {
            for (var j = 0; j < __rows; j += 1) {
                tempRow.push({
                    'x': startX + offsetX,
                    'y': startY + offsetY,
                    'width': cellWidth,
                    'height': cellHeight
                });
                startX += __cellWidth;
            }

            temp.push(tempRow);
            tempRow = [];
            startY += __cellHeight;
            startX = 0;
        }
        return temp;
    }
    function __setCanvasParameters() {
        __canvasWidth = parseInt($(params.canvasElement).outerWidth());
        __cellWidth = __canvasWidth / __rows;
        __cellHeight = __cellWidth * 0.4;
        __canvasHeight = __cellHeight * __colls,
        //__canvas.width = __canvasWidth;
        __canvas.height = __canvasHeight;
    }

    function __init() {
        __container = $(params.canvasWrapper);
        __canvas = $(params.canvasElement)[0];
        __setCanvasParameters();
        __ctx = __canvas.getContext("2d");
        __grid = __createGrid();
      
    }

    function __updateGrid(colls, rows) {
        __colls = colls;
        __rows = rows;

        __setCanvasParameters();
        __grid = __createGrid();
       
    }

    __init();

   /* $(window).resize(function () {
        clearTimeout(timeout);

        timeout = setTimeout(function () {
            __updateGrid();
        }, 200);

    });
    */
    return {
        getGrid: function () {
            return __grid;
        },
        updateGrid: function (colls, rows) {
            __updateGrid(colls + 1, rows);
            return __grid;
        },
        getCellCoords (col, row) {
           return __grid[col][row];
        },
        getCtx: function () {
            return __ctx;
        },
        getHeight: function () {
            return __canvasHeight;
        },
        getWidth: function () {
            return __canvasWidth;
        }
    }
}