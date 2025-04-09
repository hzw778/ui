// iOS状态栏组件
function createStatusBar() {
    return `
    <div class="ios-status-bar bg-black text-white h-7 flex items-center justify-between px-5 text-xs">
        <div>9:41</div>
        <div class="flex space-x-1">
            <i class="fas fa-signal"></i>
            <i class="fas fa-wifi"></i>
            <i class="fas fa-battery-full"></i>
        </div>
    </div>
    `;
}

// App导航栏组件 
function createNavBar(activeTab) {
    return `
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-3">
        <a href="home.html" class="flex flex-col items-center justify-center ${activeTab === 'home' ? 'text-green-500' : 'text-gray-500'}">
            <i class="fas fa-home text-xl"></i>
            <span class="text-xs mt-1">主页</span>
        </a>
        <a href="food-record.html" class="flex flex-col items-center justify-center ${activeTab === 'food-record' ? 'text-green-500' : 'text-gray-500'}">
            <i class="fas fa-utensils text-xl"></i>
            <span class="text-xs mt-1">记录</span>
        </a>
        <div class="relative flex flex-col items-center">
            <a href="food-search.html" class="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center -mt-5 text-white">
                <i class="fas fa-plus text-xl"></i>
            </a>
        </div>
        <a href="reports.html" class="flex flex-col items-center justify-center ${activeTab === 'reports' ? 'text-green-500' : 'text-gray-500'}">
            <i class="fas fa-chart-pie text-xl"></i>
            <span class="text-xs mt-1">报告</span>
        </a>
        <a href="profile.html" class="flex flex-col items-center justify-center ${activeTab === 'profile' ? 'text-green-500' : 'text-gray-500'}">
            <i class="fas fa-user text-xl"></i>
            <span class="text-xs mt-1">我的</span>
        </a>
    </div>
    `;
}

// App顶部标题栏组件
function createAppHeader(title, showBackButton = false, rightIcon = null) {
    let backButton = showBackButton ? `<a href="javascript:history.back()" class="text-green-500"><i class="fas fa-chevron-left"></i></a>` : '';
    let rightBtn = rightIcon ? `<div class="text-green-500">${rightIcon}</div>` : '<div></div>';
    
    return `
    <div class="app-header bg-white h-12 flex items-center justify-between px-4 border-b border-gray-200">
        <div class="w-10">
            ${backButton}
        </div>
        <div class="font-semibold text-center">${title}</div>
        ${rightBtn}
    </div>
    `;
}

// 营养进度环组件
function createNutrientProgress(nutrient, percentage, color, icon) {
    return `
    <div class="flex flex-col items-center">
        <div class="relative w-16 h-16">
            <svg class="w-16 h-16" viewBox="0 0 36 36">
                <path class="stroke-current text-gray-200"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke-width="3"
                    stroke-linecap="round"
                />
                <path class="stroke-current ${color}"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-dasharray="${percentage}, 100"
                />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
                <i class="${icon} ${color} text-xl"></i>
            </div>
        </div>
        <div class="text-xs font-medium mt-1">${nutrient}</div>
        <div class="text-xs text-gray-500">${percentage}%</div>
    </div>
    `;
}

// AI元素渐变背景组件
function createAiGradient(title, description) {
    return `
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white shadow-lg">
        <div class="flex items-center mb-2">
            <i class="fas fa-robot mr-2"></i>
            <div class="font-bold">${title}</div>
        </div>
        <p class="text-sm">${description}</p>
    </div>
    `;
}

// 食物卡片组件
function createFoodCard(name, calories, image, nutrients) {
    return `
    <div class="bg-white rounded-xl overflow-hidden shadow-md">
        <div class="h-32 overflow-hidden">
            <img src="${image}" alt="${name}" class="w-full h-full object-cover">
        </div>
        <div class="p-3">
            <div class="font-medium">${name}</div>
            <div class="text-sm text-gray-500">${calories} 千卡</div>
            <div class="flex space-x-2 mt-2 text-xs">
                ${nutrients.map(n => `<span class="px-2 py-1 bg-gray-100 rounded-full">${n}</span>`).join('')}
            </div>
        </div>
    </div>
    `;
} 