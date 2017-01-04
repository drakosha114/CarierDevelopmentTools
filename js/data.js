function Data() {
    var __expertiseObject = {},
        __rolesList = new List(),
        __rolesDataList = new List(),
        __selectedRolesList = new List (),
        __nodesDataList = new List(),
        __nodesNamesList = new List(),
        __data = {};

    var __getRow = function (param) {
        switch (param) {
            case 'Junior':
                return 1;
                break;
            case 'Regular':
                return 2;
                break;
            case 'Senior':
                return 3;
                break;
        }
    }
    var __createDataTrigger = function () {
        $(document).trigger('dataObjectCreated');
    }
    var __changeDataTrigger = function () {
        $(document).trigger('dataObjectUpdated');
    }

    var __parseNodes = function (elem) {

        var name = elem.name,
            targets = elem.targets,
            tempSymbol = {},
            tempNumeric = {};

        for (var i = 0, l = targets.length, index; i < l; i += 1) {

            index = this.nodesNames.search(targets[i])

            if (index === -1) continue;

            tempSymbol = {
                'node': name,
                'target': targets[i]
            },
            tempNumeric = {
                'node': this.nodesNames.search(name),
                'target': index
            };

          
            this.edjes.addElement(tempSymbol);
            this.numericEdjes.addElement(tempNumeric);
        }
    }

    var __createDataObject = function (callback) {
        __data = {};

        var __dataObject = {
            'expertise': __expertiseObject,
            'roles': [],
            'nodes': new List(),
            'nodesNames': new List(),
            'edjes': new List(),
            'numericEdjes': new List(),
            'titleNodes': new List ()
        }, 
        count = 0;
        

        for (var i = 0, l = __selectedRolesList.length(), temp = {}; i < l; i += 1) {

            if (__selectedRolesList.getElementByPosition(i) === false) {
                continue;
            }
           
            temp = __rolesDataList.getElementByPosition(i);

        
            __dataObject.roles.push(temp)
            __dataObject.titleNodes.addElement({
                'name': temp.name,
                'coll': count,
                'row': 0,
                'domian': temp.levels[0].domian
            })
            for (var j = 0, k = temp.levels.length, elem, edjes; j < k; j += 1) {
                elem = __nodesDataList.getElementByPosition(temp.levels[j].link);
                elem.coll = count;
                __dataObject.nodes.addElement(elem);
                __dataObject.nodesNames.addElement(__nodesNamesList.getElementByPosition(temp.levels[j].link));
            }

            count += 1;
        }
        
        __dataObject.nodes.each(__parseNodes, __dataObject);

        if (callback && typeof callback === 'function') {
            callback();
        }

        return __dataObject;
    }

    var __init = function (data) {
        var temp = {};

        for (var i = 0, l = data.length; i < l; i += 1) {
            __expertiseObject[data[i].expertise] = {};
            
            for (var j = 0, k = data[i].roles.length; j < k; j +=1) {
               __expertiseObject[data[i].expertise][data[i].roles[j].name] = data[i].roles[j]['selected'];
               __selectedRolesList.addElement(data[i].roles[j]['selected']);
               __rolesList.addElement(data[i].roles[j]['name']);

               temp = {
                   'name': data[i].roles[j]['name'],
                   'levels': []
               }
               for (n = 0, m = data[i].roles[j].levels.length; n < m; n += 1) {
                  
                   if (data[i].roles[j].levels[n].name === undefined) {
                       continue;
                   }

                   __nodesDataList.addElement({
                       'level': data[i].roles[j].levels[n].level,
                       'name': data[i].roles[j].levels[n].name,
                       'disabled': false,
                       'selected': false,
                       'coll': '',
                       'row': __getRow(data[i].roles[j].levels[n].level),
                       'targets': data[i].roles[j].levels[n].target,
                       'domian': data[i].expertise,
                       'nextSelected': ''
                   });
                  
                   
                   __nodesNamesList.addElement(data[i].roles[j].levels[n].name)
                  
                   temp.levels.push({
                       'name': data[i].roles[j].levels[n].name,
                       'link': __nodesNamesList.length() - 1,
                       'domian': data[i].expertise
                   })
               }

               __rolesDataList.addElement(temp);
               temp = {};
            }
        }
        __data = __createDataObject();
        __createDataTrigger();
    }

    var __addRole = function (param) {
        __selectedRolesList.changeElementByPosition(__rolesList.search(param), true);        
        __data = __createDataObject();
        __changeDataTrigger();
    }

    var __removeRole = function (param) {
        __selectedRolesList.changeElementByPosition(__rolesList.search(param), false);
        __data = __createDataObject();
        __changeDataTrigger();
    }

    return {
        init: function (paramData) {
            __init(paramData);
        },

        addRole: function (paramNameRole) {
            __addRole(paramNameRole);
        },

        removeRole: function (paramNameRole) {
            __removeRole(paramNameRole);
        },

        getData: function () {
            return __data;
        }

    }
}