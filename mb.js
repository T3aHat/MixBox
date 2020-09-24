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

function get_link() {
  let target = document.getElementsByClassName("character__comment__link")[0];
  if (!target) {
    setTimeout(get_link, 100);
  } else {
    chrome.runtime.sendMessage(
      { message: "get_list", url: target.textContent },
      function (response) {}
    );
    return target.textContent;
  }
}

var chat = document.getElementsByClassName("chat")[0];

while (chat.firstChild) chat.removeChild(chat.firstChild);

get_link();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "send_list") {
    chat.insertAdjacentHTML(
      "afterbegin",
      "<p>" + request.list.replace(/<br>/g, "</p><p>") + "</p>"
    );
    chat.style.height = "720px";
    chat.style.width = "640px";
    chat.style.overflow = "auto";
    get_now();
  }
});
var song = "";
function get_now() {
  let target = document.getElementsByClassName("video__track-name")[0];
  if (!target || target.innerText == "") {
    setTimeout(get_now, 1000);
  } else if (song != target.innerText) {
    html = "";
    chatlist = chat.innerHTML.replace(
      /<p style="color:white;background-color:#50BFD3;font-size:1.6rem;">/g,
      "<p>"
    );

    chatlist = chatlist.split("<p>");
    for (let i = 0; i < chatlist.length; i++) {
      if (chatlist[i].includes(target.innerText)) {
        html +=
          "<p style='color:white;background-color:#50BFD3;font-size:1.6rem;'>" +
          chatlist[i];
      } else if (chatlist[i] != "</p>") {
        html += "<p>" + chatlist[i];
      }
    }
    chat.innerHTML = html;
    song = target.innerText;
  }
  setTimeout(get_now, 5000);
}
