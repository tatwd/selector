/*! 
 * selector 1.0.0-alpha.1
 * by _king
 */

!function(){
    
    /**
     * @desc DOM 元素属性设置
     * @param {object} dom 页面 DOM 元素
     * @param {object} json JSON 格式的键值对 
     */
    let attr = (dom, json) => {

        if(typeof dom != 'object' || typeof json !== 'object') {
            return;
        }

        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                const value = json[key];

                dom.setAttribute(key, value);
            }
        }

        return dom;
    };


    let selector = document.getElementsByTagName('select');

    selector = Array.prototype.slice.call(selector, 0); // 将 DOM 元素转化成数组元素

    selector.forEach(item => {

        let frag              = document.createDocumentFragment();
        let options           = [];
        let selectedItemIndex = item.options.selectedIndex; // 获取选择项的索引

        options = Array.prototype.slice.call(item.options, 0); // 将 options 转化成数组

        let divSelector    = document.createElement('div');
        let divSlectedItem = document.createElement('div');
        let spanText       = document.createElement('span');
        let ulOptions             = document.createElement('ul');
        let icon           = document.createElement('i');

        // 设置 div.selector 的属性
        attr(divSelector, {
            'class': 'selector'
        });

        // 设置 div.selected-item 的属性
        attr(divSlectedItem, {
            'class': 'selected-item',
        });

        // 设置 span.item-text 的属性
        attr(spanText, {
            'class': 'item-text'
        }).textContent = options[selectedItemIndex].textContent

        divSlectedItem.appendChild(spanText);

        // 设置 i.icon-triangle 的属性
        attr(icon, {
            'class': 'icon-triangle'
        });

        divSlectedItem.appendChild(icon);

        attr(ulOptions, {
            'class': 'options'
        });

        frag.appendChild(divSlectedItem);

        // 遍历选项
        options.forEach(option => {

            if(!option.disabled){
                let li = document.createElement('li');

                // 设置选项的属性
                attr(li, {
                    'class'     : 'item',
                    'data-value': option.value,
                    'data-index': option.index
                }).textContent = option.textContent;

                ulOptions.appendChild(li);
            }
        });

        // 添加点击选中事件
        let clicked = false;
        divSelector.addEventListener('click', event => {
            let target = event.target || event.srcElement;
            
            // 选中项
            if(target.classList.contains('item')) {
                let index = target.getAttribute('data-index'); // 获取选中项的索引

                item.options.selectedIndex = index; // 为真实的下拉框设置选中项索引

                spanText.textContent = item.options[index].textContent;
            }

            // 选中效果，可以自定义
            if(!clicked) {
                divSlectedItem.style.backgroundColor = '#f2f2f2';
                ulOptions.style.display = 'block';
            } else {
                divSlectedItem.style.backgroundColor = '#ffffff';
                ulOptions.style.display = 'none'; 
            }  

            clicked = !clicked;
        }, false);

        frag.appendChild(ulOptions);
        divSelector.appendChild(frag);
        item.parentElement.appendChild(divSelector);
    });

}();
