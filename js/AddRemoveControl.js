function SelectController(paramWrapper) {
    var __$wrapper = $(paramWrapper),
        __data;

    function __init(data) {
        __data = data;
        __drawSelect(__data, __events);
    }
    function __drawSelect(paramData, callback) {
        __$wrapper.append(__drawController(paramData));
        if (callback && typeof callback === 'function') {
            callback();
        }
    }
    function __drawController(paramData) {
        var text = '';

        text += '<div class="select-button"><span>Add \/ remove position </span></div>';
        text += '<div class="select-list">';
        for (key in paramData) {
            text += '<h3>' + key + '</h3>';
            text += '<ul>';
            for (name in paramData[key]) {
                checked = paramData[key][name] === true ? "checked='checked'" : "";
                text += "<li>" +
                        "<span class='custom-checkbox-wrapper'>" +
                            "<input name='" + key + "' type='checkbox' " + checked + "' value='" + name + "'>" +
                            "<span>" + name + "</span>" +
                        "</span>" +
                    "</li>";
            }
            text += '</ul>';
        }
        text += '</div>';
        return text;
    }
    function __events() {
        __$wrapper.find('input[type="checkbox"]').change(function () {
            data = {
                "domian": $(this).attr('name'),
                "role": $(this).attr('value'),
                "state": $(this)[0].checked === true ? true : false
            }
           $(document).trigger('changeSelectState', data);
        });

        __$wrapper.find('.select-button').click(function () {
            __$wrapper.toggleClass('opened');
        });


    }
    function __open() {

    }

    function __close() {

    }

    return {
        init: function (params) {
            __init(params);
            
        },
        close: function () {
            __close();
        }
    }
}