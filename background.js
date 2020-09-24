chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "get_list") {
    chrome.tabs.getSelected(null, function (tab) {
      mixboxid = tab.id;
    });
    chrome.tabs.create({ url: request.url, active: false }, function (tab) {
      noteid = tab.id;
    });
  } else if (request.message == "got_list") {
    chrome.tabs.remove(noteid);
    chrome.tabs.sendMessage(
      mixboxid,
      { message: "send_list", list: request.list },
      function (response) {}
    );
  } else if (request.message == "now") {
    chrome.tabs.sendMessage(
      mixboxid,
      { message: "change_now", now: request.now },
      function (response) {}
    );
  }
});
