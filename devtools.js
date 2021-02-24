chrome.devtools.network.onRequestFinished.addListener(
  function(request) {
    const {
      url,
      postData,
    } = request.request;
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
      // 商品列表
      url === 'https://mms.pinduoduo.com/vodka/v2/mms/query/display/mall/goodsList') {
      request.getContent(async function(content, encoding) {
        try {
          await axios.post('http://localhost:7000/saveNetworkData', {
            requestUrl: url,
            requestText: postData.text,
            responseContent: content,
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
