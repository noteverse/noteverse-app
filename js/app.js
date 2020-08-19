document.getElementById("heading").innerHTML =
  localStorage["noteVerse-document__title"] || "Document Title";
document.getElementById("content").innerHTML =
  localStorage["noteVerse-document__text"] || "Content goes here";

setInterval(function () {
  localStorage["title"] = document.getElementById("heading").innerHTML; // heading div
  localStorage["text"] = document.getElementById("content").innerHTML; // content div
}, 1000);

// Page title corresponding to document title
document.title = document.getElementById('heading').innerText + ' - noteVerse Document';
document.getElementById('heading').addEventListener('input', function () {
  document.title = document.getElementById('heading').innerText + ' - noteVerse Document';
}, false);

// Save formatted HTML Document (using Blob)
function saveDoc() {
  let heading = document.getElementById('heading').innerText;
  let content = document.getElementById('content').innerHTML;
  let documentStyled = '<body><style>@import url(https: //fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap);body{font-family:"Ubuntu",Arial;color:#333;font-size:18px;width:65%;margin:auto;margin-bottom:30px;padding-top:10px;text-align:justify;}header{border-bottom: 2px solid lightgray;font-size:34px;font-weight:700;padding-bottom: 5px;}main{padding-top:1%;}</style><header id="noteVerse-heading">' + heading + '</header><main id="noteVerse-content">' + content + '</main></body>';
  var blob = new Blob([documentStyled], {
    type: "html;charset=utf-8"
  });
  let filename = heading.replace(/ /g, "_") + ".html"
  saveAs(blob, filename);
}

// Open HTML Document
function openDoc() {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = '.html, .htm'
  input.onchange = e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = readerEvent => {
      let fileContent = readerEvent.target.result;
      let parser = new DOMParser();
      let htmlDoc = parser.parseFromString(fileContent, 'text/html');
      document.getElementById('heading').innerHTML = htmlDoc.getElementById('noteVerse-heading').innerHTML;
      document.getElementById('content').innerHTML = htmlDoc.getElementById('noteVerse-content').innerHTML;
    }
  }
  input.click();
}

// New Document
function newDoc() {
  document.getElementById('heading').innerHTML = ' ';
  document.getElementById('content').innerHTML = ' ';
}

// Editor Settings
document.execCommand('styleWithCSS', true);
document.execCommand('enableObjectResizing', true);
$("#font-increase").click(function () {
  var originalFontSize = $('#content').css('font-size');
  var originalFontNumber = parseFloat(originalFontSize, 10);
  var newFontSize = originalFontNumber + 2;
  $('#content').css('font-size', newFontSize);
});
$("#font-decrease").click(function () {
  var originalFontSize = $('#content').css('font-size');
  var originalFontNumber = parseFloat(originalFontSize, 10);
  var newFontSize = originalFontNumber - 2;
  $('#content').css('font-size', newFontSize);
});
$("#font-reset").click(function () {
  $('#content').css('font-size', '20px');
});
$("#btn-bold").click(function () {
  document.execCommand('bold');
});
$("#btn-italic").click(function () {
  document.execCommand('italic');
});
$("#btn-underline").click(function () {
  document.execCommand('underline');
});
$("#btn-strike").click(function () {
  document.execCommand('strikeThrough');
});
$("#btn-hilite").click(function () {
  document.execCommand('hiliteColor', false, '#fdfd96');
});
$("#btn-title").click(function () {
  document.execCommand('formatBlock', false, 'h3');
});
$("#btn-subtitle").click(function () {
  document.execCommand('formatBlock', false, 'h4');
});
$("#btn-img").click(function () {
  let imageURL = prompt('Image URL :', ' ');
  document.execCommand('insertImage', false, imageURL);
});
