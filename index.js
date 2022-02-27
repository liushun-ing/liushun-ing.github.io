import * as mainData from './data/main_data.js';
import * as rightData from './data/right_data.js';
// 主体部分展示的数据，默认展示第一个js的数据
let initData = 'JavaScript'
let mainDataShow = mainData[initData];
// 中间主体部分的页面参数
let currentPage = 0;
let pageSize = 4;
// 右侧激励部分的参数
let sentenceIndex = 0;

// 更新展示工具函数
// 产生模板字符串
const generateMainDiv = dataArray => `
    ${dataArray.map(data => `
    <div class="content-wrapper">
        <div class="title" value="${data.title}">${data.title}</div>
        <div class="brief">${data.brief}</div>
        <div class="bottom-wrapper">
            <div class="creation-time">
                <i class="iconfont icon-bianji"></i> ${data.creationTime}</div>
            <a class="read-more" href="${data.href}">
                More<i class="iconfont icon-youjiantou"></i>
            </a>
        </div>
    </div>
    `).join('')}
`;

const generateNewDiv = dataArray => `
    ${dataArray.map(data => `
    <a href="${data.href}" class="new-wrapper" target="_self">
        <div class="title">${data.title}</div>
        <div class="introduction">${data.introduction}</div>
        <div class="time">
            <i class="iconfont icon-shijian"></i> ${data.time}
        </div>
    </a>  
    `).join('')}
`;

// 更新函数
function updateShow() {
    // 获取主体内容div
    const contentDiv = Array.from(document.getElementsByClassName('content-div'))[0];
    // 获取当前页的数据
    const dataArray = mainDataShow.filter((item, index) => {
        return index >= currentPage * pageSize && index < (currentPage + 1) * pageSize;
    });
    // 生成html
    const contentHtml = generateMainDiv(dataArray);
    // 替换主题的innerHtml
    contentDiv.innerHTML = contentHtml;
    // 更新按钮显示
    updateButton();
}

// 上一页按钮
const prev_page = document.getElementById('prev-page'); 
// 下一页按钮
const next_page = document.getElementById('next-page'); 

// 上一页      
prev_page.onclick = function() {
    currentPage--;
    updateShow();
}
// 下一页  
next_page.onclick = function() {
    currentPage++;
    updateShow();
}        
// 更新上一页下一页按钮显示
function updateButton() {
    // 如果只有一页
    if(mainDataShow.length <= pageSize) {
        prev_page.style.visibility = 'hidden';
        next_page.style.visibility = 'hidden';
    } else {
        if(currentPage === 0) {
            // 第一页
            prev_page.style.visibility = 'hidden';
            next_page.style.visibility = 'visible';
        } else if(currentPage === Math.floor(mainDataShow.length / pageSize)) {
            // 最后一页
            prev_page.style.visibility = 'visible';
            next_page.style.visibility = 'hidden';
        } else {
            prev_page.style.visibility = 'visible';
            next_page.style.visibility = 'visible';
        }
    }
}

// 左侧导航栏
// 获取左侧导航栏
const leftAside = Array.from(document.getElementsByClassName('left-aside'))[0];
const leftMenu = Array.from(leftAside.getElementsByTagName('a'));
const contentTitle = Array.from(document.getElementsByClassName('content-title'))[0];
// 为左侧导航栏绑定点击事件
for (let i = 0; i < leftMenu.length; i++) {
    leftMenu[i].onclick = function() {
        // 修改展示的数据
        mainDataShow = mainData[this.name];
        // 更新数据
        currentPage = 0;
        contentTitle.innerHTML = this.name;
        updateShow();
    }
}

// 自我激励
let chineseSpan = document.getElementById('chinese-span');
let englishSpan = document.getElementById('english-span');
let changeButton = Array.from(document.getElementsByClassName('change-button'))[0];
// 为换一换绑定事件
changeButton.onclick = function() {
    sentenceIndex = ++sentenceIndex % rightData.MotivateDate.length;
    chineseSpan.innerText = rightData.MotivateDate[sentenceIndex].chinese;
    englishSpan.innerText = rightData.MotivateDate[sentenceIndex].english;
};

// 转换ActiveData时间
function transferTime(array) {
    let newActiveData = [...array];
    for (let item of newActiveData) {
        let hours = (new Date() - new Date(item.time)) / 3600000;
        let days = Math.floor(hours / 24);
        if(days > 0) {
            item.time = days + '天前';
        } else {
            item.time = hours + '小时前';
        }
    }
    return newActiveData;
}

// 立即执行函数前要加分号
// 立即执行函数初始化
(() => {
    // 初始化内容标题
    contentTitle.innerHTML = initData;
    // 初始化展示数据
    updateShow();
    // 右侧栏初始化
    // 最新动态
    let newContainer = document.getElementById('new-container');
    newContainer.innerHTML = generateNewDiv(transferTime(rightData.ActiveData));
    // 自我激励
    chineseSpan.innerText = rightData.MotivateDate[sentenceIndex].chinese;
    englishSpan.innerText = rightData.MotivateDate[sentenceIndex].english;
})();