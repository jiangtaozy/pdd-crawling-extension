chrome.devtools.network.onRequestFinished.addListener(
  function(request) {
    const {
      url,
      postData,
    } = request.request;
    if(url === 'https://yingxiao.pinduoduo.com/mms-gateway/venus/api/unit/listPage' ||
      url === 'https://yingxiao.pinduoduo.com/venus/api/subway/keyword/listKeywordPage' ||
      url === 'https://yingxiao.pinduoduo.com/apollo/api/report/queryHourlyReport') {
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
        }
      });
    }
  }
);

chrome.devtools.panels.create("pdd", "", "panel.html", function(panel) {
});
