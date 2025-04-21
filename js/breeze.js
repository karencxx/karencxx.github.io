// 监听Hexo的generateBefore事件,在生成站点之前执行
hexo.on('generateBefore', () => {
    // 获取Hexo的根配置对象
    const rootConfig = hexo.config;

    if(hexo.locals.get) {
        // 获取data对象,包含_data目录下的所有数据文件
        const data = hexo.locals.get('_data');
        
        if(data?.breeze) {
            // 如果存在,将breeze数据赋值给主题配置
            hexo.theme.config = data.breeze
        }
    }

    // 将根配置对象添加到主题配置中,方便在主题中访问
    hexo.theme.config.rootConfig = rootConfig;
});




