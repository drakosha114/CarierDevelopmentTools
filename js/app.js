(function ($) {
    var HeaderColors = {
        "Develpoment": '#96bae3',
        "Architect": '#f9d184',
        "UX Designer": '#8bd7af',
        "Technical Writer": '#7c9bb0',
        "Analyst": '#af9cc3',
        "Testing": '#e4dd73',
        "Management": '#81c7d7'
    }
    var RegularColors = {
        "Develpoment": '#bdd7f4',
        "Architect": '#ffebc4',
        "UX Designer": '#b7f3d3',
        "Technical Writer": '#bbcad4',
        "Analyst": '#cbc0d7',
        "Testing": '#fbf8ca',
        "Management": '#beebf5'
    }
    var DataControl = Data(),
        AddRemoveRoleControl = SelectController('#addRemovePosition'),
        StartRoleControl = PathControl('#currentPosition', 'startPosition', false),
        TargetRoleControl = PathControl('#targetPosition', 'targetPosition', true),
        GraphControl = new Graph(),
        CanvasController = CanvasControl();
    var temp;
    var start;
    var end;
    var AAA;
    var GGG = new Graph();
    var DDD = [];
    CanvasController.init('.canvas-wrapper', '#deathStar', 11, 4, HeaderColors, RegularColors);


    $.get('data.json', function (resp) {


        DataControl.init(resp.carier);


        //dfsdfdsf
        AAA = resp.carier.reduce(function(res, item){
            return res.concat(item.roles);
        }, []).reduce(function(res, item){
            return res.concat(item.levels);
        }, []).reduce(function(res, item){
            var name = item.name;

            if( !Array.isArray(item.target) || item.target.length === 0 ) {
                return res;
            }

            var targets = item.target.map(function(tar) {
                return {
                    start: name,
                    end: tar
                }
            });

            return res.concat(targets);
        }, []);
        GGG.init(AAA.length);
        DDD = AAA.reduce(function(res, item){
            if (res.indexOf(item.start) === -1) {
                res.push(item.start)
            }
            if (res.indexOf(item.end) === -1) {
                res.push(item.end);
            }
            return res;
        }, []);


        AAA.forEach(function (item) {
            this.addEdje(DDD.indexOf(item.start), DDD.indexOf(item.end));
        }, GGG);

        console.log(GGG);

        var d = GGG.getPathFrom(DDD.indexOf('Junor JAVA Developer'), DDD.indexOf('Senior Program Manager'));
        console.log(d);
        var c = d.map(function(item){
            return DDD[item];
        });
        console.log(c);
        //dfsdfdf
    });

    $(document).on('dataObjectCreated', function () {
        temp = DataControl.getData();
        //console.log(temp);
        AddRemoveRoleControl.init(temp.expertise);
        StartRoleControl.init(temp.roles);
        TargetRoleControl.init(temp.roles);
        GraphControl.init(temp.nodes.length());
       
        temp.numericEdjes.each(function (param, obj) {

            this.addEdje(param.node, param.target);
        }, GraphControl);

        CanvasController.addData(temp.nodes.getList(), temp.edjes.getList(), temp.titleNodes.getList(), temp.roles.length, 4);
    });

    $(document).on('dataObjectUpdated', function () {

       
        temp.nodes.each(function (item) {
            item.disabled = false;
            item.selected = false;
        });

        temp = DataControl.getData();

       // console.log(temp);

        StartRoleControl.redraw(temp.roles);
        TargetRoleControl.redraw(temp.roles);

        GraphControl.init(temp.nodesNames.length());

        temp.numericEdjes.each(function (param, obj) {
            this.addEdje(param.node, param.target);
        }, GraphControl);
               

        CanvasController.changeData(temp.nodes.getList(), temp.edjes.getList(), temp.titleNodes.getList(), temp.roles.length, 4);
    });

    $(document).on('changeSelectState', function (e, data) {
        data.state === true ? DataControl.addRole(data.role) : DataControl.removeRole(data.role);
    });


    $('#currentPosition').on('selectTargetElement', function (e, data) {
        start = temp.nodesNames.search(data.name);
       

        var disabled = GraphControl.noPathFromVertice(start);
        temp.nodes.each(function (item) {
            item.disabled = false;
            item.selected = false;
            item.nextSelected = "";
        });

        for (var i = 0, l = disabled.length; i < l; i += 1) {
            temp.nodes.changeElementByPosition(disabled[i], true, 'disabled');
            
        }

        temp.nodes.changeElementByPosition(start, true, 'selected');

        CanvasController.changeData(temp.nodes.getList(), temp.edjes.getList(), temp.titleNodes.getList(), temp.roles.length, 4);
       

    });
    $('#targetPosition').on('selectTargetElement', function (e, data) {


        var disabled = GraphControl.noPathFromVertice(start);
            end = temp.nodesNames.search(data.name);
        var path = GraphControl.getPathFrom(start, end);
        temp.nodes.each(function (item) {
            item.disabled = false;
            item.selected = false;
            item.nextSelected = "";
        });

        for (var i = 0, l = disabled.length; i < l; i += 1) {
            temp.nodes.changeElementByPosition(disabled[i], true, 'disabled');
        }
        for (var i = 0, l = path.length; i < l; i += 1) {
            temp.nodes.changeElementByPosition(path[i], true, 'selected');
            temp.nodes.changeElementByPosition(path[i], temp.nodesNames.getElementByPosition(path[i-1]), 'nextSelected');
        }
        CanvasController.changeData(temp.nodes.getList(), temp.edjes.getList(), temp.titleNodes.getList(), temp.roles.length, 4);
    });
}(jQuery));