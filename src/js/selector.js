!function(){
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

        // console.log(options)

        let div  = document.createElement('div');
        let span = document.createElement('span');
        let ul   = document.createElement('ul');

        attr(div, {
            'class': 'selector'
        });

        attr(span, {
            'class': 'selected-item',
        }).textContent = options[selectedItemIndex].textContent;

        attr(ul, {
            'class': 'options'
        });

        // console.log(div);

        // span.textContent = options[selectedItemIndex].textContent;

        frag.appendChild(span);

        options.forEach(option => {
            
            if(!option.disabled){
                let li = document.createElement('li');

                // 设置选项的属性
                attr(li, {
                    'class'     : 'item',
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
