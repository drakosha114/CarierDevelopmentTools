function PathControl(paramWrapper, paramName, paramDisabledState) {
    var __$wrapper = $(paramWrapper),
        __data,
        __name = paramName;



    var __init = function (paramData) {
        __data = paramData;
        __$wrapper.append(__drawControl(__data));
        __events();
    }

    var __redraw = function (paramData) {
        __data = paramData;

        __redrawControl(__$wrapper, __data, __events);
    }

    var __redrawControl = function (paramWrapper, paramData, paramCallback) {
        paramWrapper.empty().append(__drawControl(paramData));
        if (paramCallback && typeof paramCallback === 'function') paramCallback();
    }

    var __drawControlWidthDisabledState = function (paramData) {
        var text = "";

        text += "<div class='select-button'><span>Select </span></div>";
        text += "<div class='select-list'>";

        for (var i = 0, l = paramData.length; i < l; i += 1) {

            text += "<h3>" + paramData[i].name + "</h3>";
            text += "<ul>";

            for (var j = 0, k = paramData[i].levels.length; j < k; j += 1) {
               
                text += "<li>";
                text += "<span class='custom-checkbox-wrapper'>";
                text += "<input name='" + __name + "' type='radio' value='" + paramData[i].levels[j].name + "'>";
                text += "<span>" + paramData[i].levels[j].name + "</span>";
                text += "</span>";
                text += "</li>";


            }
            text += "</ul>";

        }
        
        text += "</div>";
        return text;
    }

    var __drawControlWidthoutDisabledState = function (paramData) {
        var text = "";
        text += "<div class='select-button'><span>Select </span></div>";
        text += "<div class='select-list'>";

        for (var i = 0, l = paramData.length; i < l; i += 1) {
           
           

            text += "<h3>" + paramData[i].name + "</h3>";
            text += "<ul>";
            for (var j = 0, k = paramData[i].levels.length; j < k; j += 1) {

                text += "<li>";
                text += "<span class='custom-checkbox-wrapper'>";
                text += "<input name='" + __name + "' type='radio' value='" + paramData[i].levels[j].name + "'>";
                text += "<span>" + paramData[i].levels[j].name + "</span>";
                text += "</span>";
                text += "</li>";

               
            }
            text += "</ul>";
           
        }


        text += "</div>";

        return text;
    }

    var __events = function () {
        __$wrapper.find('input[type="radio"]').click(function () {
            var data = {
                'name': $(this).attr('value')
            }

            __$wrapper.trigger('selectTargetElement', data);
        });
        __$wrapper.find('.select-button').click(function () {
            __$wrapper.toggleClass('opened');
        });
        $('body').click(function (e) {

            e.stopPropagation();
            var __$list = __$wrapper.find('.select-list');
            var __$target = __$wrapper.find('.select-button')

            if (__$wrapper.hasClass('opened') && $(e.target).closest(__$list).length === 0 && !$(e.target).hasClass('select-button')) {
                __$wrapper.removeClass('opened');
                //console.log($(e.target).closest(__$list).length);
            }
           
        });

    }
    var __drawControl = (function (param) {
        return param === true ? __drawControl = __drawControlWidthDisabledState : __drawControl = __drawControlWidthoutDisabledState;
    }(paramDisabledState));

    return {
        init: function (paramData) {
            __init(paramData);
        },
        redraw: function (paramData) {
            __redraw(paramData);
        },
        close: function () {

        }
    }
}