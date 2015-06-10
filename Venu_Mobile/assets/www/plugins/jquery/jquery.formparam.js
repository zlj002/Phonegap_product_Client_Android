

String.prototype.toObjectAccessor = function (splitter, parentObject, value) {
    splitter = splitter || '.';

    var items = this.split(splitter),
        data = parentObject || {},
        accessor = data;

    for (var i = 0; i < items.length; i++) {
        if (i == items.length - 1) {
            if (accessor[items[i]]) {
                accessor[items[i]] = accessor[items[i]] + "," + value;
            } else {
                accessor[items[i]] = value;
            }
        }
        else {
            accessor[items[i]] = accessor[items[i]] || {};
            accessor = accessor[items[i]];
        }
    }

    return data;
};

(function ($) {
    var htmlElm = ":password[name],:text[name],:hidden[name],textarea[name],select[name],:checkbox[name],:radio[name]";

    $.fn.formparam = function (initData) {
        var self = $(this);

        if (arguments.length > 0 && typeof initData != "boolean") {

            // 其次初始化全部Html控件
            self.find(htmlElm)
                .each(function () {
                    var elem = $(this),
                        names = elem.attr('name'),
                        v = initData;

                    if ($.isPlainObject(v)) {
                        for (var i = 0; i < names.length; i++) {
                            v = v[names[i]];
                            if (v == undefined)
                                break;
                        }
                    }

                    if (elem.is(':radio')||elem.is(':checkbox')) {
                        if(v != undefined) {
                            if(elem.is(':checkbox')) {
                                elem.attr('checked',elem.val() == v.toString());
                            } else {
                                if(elem.val() == v.toString()) {
                                    elem.attr('checked',true);
                                }
                            }
                        } 
                        else {
                               elem.removeAttr('checked');
                        }
                        return true;
                    }

                    if (v != undefined) {
//                        var _v = typeof v === "string" && v.startsWith('/Date(') ? $.jsonDateParser(v) : v;
                        elem.val(v);
                    }
                    else {
                        elem.val('');
                    }
                });

            return self;
        }

        var returnObj = {}, keepEmptyValue = initData || true;

        // 获取HTML元素中包含Name属性的元素输入值
        self.find(htmlElm)
            .each(function () {
                var elm = $(this),
                    value = elm.val();

                if (!keepEmptyValue && !value) { //未输入值时应 为"" ,形如 {UserName:""}
                    return true;
                }
                
                if (elm.is(":radio")||elm.is(":checkbox")) {
                    if (elm.attr('checked')) {
                        var val = ($(this).val() == 'on') ? true : $(this).val();
                        $(this).attr('name').toObjectAccessor('', returnObj, val);
                    }
                }
                else {
                    if (elm.attr('datatype') == "datetime") {
                        if (!isNaN(Date.parse(value)))
                            value = '/Date(' + Date.parse(value) + '+0800)/';
                        else return true;
                    }

                    $(this)
                        .attr('name')
                        .toObjectAccessor('', returnObj, value);
                }
            });

        return returnObj;
    };
})(jQuery);