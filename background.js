//chrome.runtime.onInstalled.addListener(function() {
//  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//    chrome.declarativeContent.onPageChanged.addRules([{
//      conditions: [
//        new chrome.declarativeContent.PageStateMatcher({
//          pageUrl: {hostEquals: 'mms.pinduoduo.com'},
//        }),
//        new chrome.declarativeContent.PageStateMatcher({
//          pageUrl: {hostEquals: 'yingxiao.pinduoduo.com'},
//        }),
//        new chrome.declarativeContent.PageStateMatcher({
//          pageUrl: {hostEquals: 'www.hznzcn.com'},
//        }),
//      ],
//      actions: [new chrome.declarativeContent.ShowPageAction()]
//    }]);
//  });
//});
//
//chrome.extension.onMessage.addListener(function (message, sender) {
//  if(message === "goback") {
//    chrome.tabs.goBack();
//  }
//});
