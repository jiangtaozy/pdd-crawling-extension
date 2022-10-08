chrome.devtools.network.onRequestFinished.addListener(
  function(request) {
    const {
      url,
      postData,
    } = request.request;
    const hangWomenRegex = /https:\/\/www.hznzcn.com\/hz\/gallery-[\d-]+-grid.html/
    // 单元列表
    if(url === 'https://yingxiao.pinduoduo.com/mms-gateway/venus/api/unit/listPage' ||
      // 关键词
      url === 'https://yingxiao.pinduoduo.com/mms-gateway/venus/api/subway/keyword/listKeywordPage' ||
      // 小时数据
      url === 'https://yingxiao.pinduoduo.com/mms-gateway/apollo/api/report/queryHourlyReport' ||
      // 订单列表
      url === 'https://mms.pinduoduo.com/mangkhut/mms/recentOrderList' ||
      // 流量详情
      url === 'https://mms.pinduoduo.com/sydney/api/goodsDataShow/queryGoodsDetailVOList' ||
      // 流量数据
      url === 'https://mms.pinduoduo.com/sydney/api/goodsDataShow/queryGoodsPageOverView' ||
      // 售后列表
      url === 'https://mms.pinduoduo.com/mercury/mms/afterSales/queryList' ||
      // 商品列表
      url === 'https://mms.pinduoduo.com/vodka/v2/mms/query/display/mall/goodsList' ||
      // 女装网订单列表
      url.includes('https://www.hznzcn.com/order/query_my_order_list') ||
      // 女装网杭州女装新款列表
      hangWomenRegex.test(url) ||
      // 女装网云仓
      url === 'https://www.hznzcn.com/yuncang/' ||
      // 女装网闪电发货
      url.includes('https://www.hznzcn.com/sendfast.html') ||
      // 女装网童装闪电发货
      /https:\/\/www.hznzcn.com\/sendfast-\d+.html/.test(url) ||
      // 女装网下一页闪电发货
      /https:\/\/www.hznzcn.com\/null\/sendfast-[\d-]+.html/.test(url) ||
      // 女装网店铺商品列表
      /https:\/\/www.hznzcn.com\/brand-\d+.html/.test(url) ||
      // 阿里巴巴详情页
      /https:\/\/detail.1688.com\/offer\/\d+.html/.test(url) ||
      // 阿里巴巴订单列表
      url.includes('https://trade.1688.com/order/buyer_order_list.htm')
    ) {
      //chrome.devtools.inspectedWindow.eval('console.log("url#####: " + unescape("' + escape(request.request.url) + '"))');
      request.getContent(async function(content, encoding) {
        //chrome.devtools.inspectedWindow.eval('console.log("content#####: " + unescape("' + escape(content) + '"))');
        //chrome.devtools.inspectedWindow.eval('console.log("request: " + unescape("' + escape(JSON.stringify(request)) + '"))');
        //chrome.devtools.inspectedWindow.eval('console.log("request.response.content.mimeType: " + unescape("' + escape(request.response.content.mimeType) + '"))');
        //chrome.devtools.inspectedWindow.eval('console.log("*******post savenetworkdata")');
        try {
          await axios.post('http://121.42.24.117:7000/saveNetworkData', {
          //await axios.post('http://127.0.0.1:7000/saveNetworkData', {
            requestUrl: url,
            requestText: postData && postData.text,
            responseContent: content,
            responseContentMimeType: request.response.content.mimeType,
          });
        }
        catch(err) {
          console.error("err: ", err);
          alert(err);
        }
      });
    }
  }
);

chrome.devtools.panels.create("pdd", "", "panel.html", function(panel) {
});
