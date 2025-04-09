// 此脚本用于修复所有HTML页面中的重复样式定义，解决双滚动条问题
const fs = require('fs');
const path = require('path');

// 获取pages目录下所有HTML文件
const pagesDir = path.join(__dirname, 'pages');
const htmlFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));

// 需要删除的样式块的正则表达式
const bodyStyleRegex = /body\s*{[^}]*max-width:\s*375px;[^}]*}/s;
const contentStyleRegex = /\.content\s*{[^}]*padding-bottom:[^}]*}/s;

// 确保引入公共CSS的链接存在
const commonCssLinkRegex = /<link rel="stylesheet" href="\.\.\/css\/common\.css">/;
const commonCssLink = '<link rel="stylesheet" href="../css/common.css">';

// 存储修复结果
const results = {
  fixed: [],
  alreadyOk: [],
  error: []
};

// 处理每个文件
htmlFiles.forEach(filename => {
  try {
    const filePath = path.join(pagesDir, filename);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // 检查是否已经引入了公共CSS
    if (!commonCssLinkRegex.test(content)) {
      const cssLinkPosition = content.indexOf('</head>');
      if (cssLinkPosition !== -1) {
        const beforeHead = content.substring(0, cssLinkPosition);
        const lastLinkEnd = beforeHead.lastIndexOf('">') + 2;
        if (lastLinkEnd !== -1) {
          content = content.slice(0, lastLinkEnd) + '\n    ' + commonCssLink + content.slice(lastLinkEnd);
          modified = true;
        }
      }
    }
    
    // 删除重复的body样式定义
    if (bodyStyleRegex.test(content)) {
      content = content.replace(bodyStyleRegex, '');
      modified = true;
    }
    
    // 删除重复的content样式定义
    if (contentStyleRegex.test(content)) {
      content = content.replace(contentStyleRegex, '');
      modified = true;
    }
    
    // 如果做了修改，写回文件
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      results.fixed.push(filename);
    } else {
      results.alreadyOk.push(filename);
    }
  } catch (err) {
    console.error(`Error processing ${filename}:`, err);
    results.error.push({ filename, error: err.message });
  }
});

// 输出处理结果
console.log('Fixed files:', results.fixed);
console.log('Already OK files:', results.alreadyOk);
console.log('Error files:', results.error); 