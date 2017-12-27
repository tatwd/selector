'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function () {
    console.log('hello gulp');

    // class Selector {

    //     constructor() {
    //     }

    // };

    /**
     * @desc DOM 元素属性设置
     * @param {object} dom 页面 DOM 元素
     * @param {object} json JSON 格式的键值对 
     */
    var attr = function attr(dom, json) {

        if ((typeof dom === 'undefined' ? 'undefined' : _typeof(dom)) != 'object' || (typeof json === 'undefined' ? 'undefined' : _typeof(json)) !== 'object') {
            return;
        }

        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                var value = json[key];

                dom.setAttribute(key, value);
            }
        }

        return dom;
    };

    var selector = document.getElementsByTagName('select');

    selector = Array.prototype.slice.call(selector, 0); // 将 DOM 元素转化成数组元素

    selector.forEach(function (item) {
        var frag = document.createDocumentFragment();
        var options = [];
        var selectedItemIndex = item.options.selectedIndex; // 获取选择项的索引

        options = Array.prototype.slice.call(item.options, 0); // 将 options 转化成数组

        // console.log(options)

        var div = document.createElement('div');
        var span = document.createElement('span');
        var ul = document.createElement('ul');

        attr(div, {
            'class': 'selector'
        });

        attr(span, {
            'class': 'selected-item'
        }).textContent = options[selectedItemIndex].textContent;

        attr(ul, {
            'class': 'options'
        });

        // console.log(div);

        // span.textContent = options[selectedItemIndex].textContent;

        frag.appendChild(span);

        options.forEach(function (option) {

            if (!option.disabled) {
                var li = document.createElement('li');

                // 设置选项的属性
                attr(li, {
                    'class': 'item',
                    'data-value': option.value
                }).textContent = option.textContent;

                ul.appendChild(li);
            }
        });

        frag.appendChild(ul);
        div.appendChild(frag);
        item.parentElement.appendChild(div);

        // item.addEventListener('click', event => {

        //     let target = event.target || event.srcElement;

        //     // let ele = event.currentTarget;

        //     console.log(item.options); // 被选元素索引

        // }, true);
    });

    // console.log(options);

}();