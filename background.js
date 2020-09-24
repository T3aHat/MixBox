/*
The MIT License (MIT)

Copyright (c) 2020 T3aHat.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
