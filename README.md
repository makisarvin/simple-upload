# jQuery Simple File Upload 

## Introduction

A very simple jQuery plugin that allows for file upload. 


## Setup instructions

The usage is very simple. Check the index.html for the mimimum (and only) way to use it

```sh
$("your div").simpleUpload(url, cssEffect)
```

The url is the url for thr uplaod server and the cssEffect is the name of the class that you want to apply when you drag files over the drop zone. 

Example:


```sh
	$(function() {
		$("#dropzone").simpleUpload("http://example.com/upload", "dragover");
	});
```

The ajax request will create a form (multipart/form-data) with name image="file data" from which you can extract the file data and store them. For multiple files there will be one request per file. 

## Features
* **Multiple file upload:**  
  Allows to select multiple files at once and upload them simultaneously.
* **Drag & Drop support:**  
  Allows to upload files by dragging them from your desktop or filemanager and dropping them on your browser window.
* ** Progress bar: **
  Not Supported yet. you can edit the code and implement your own. 

## Requirements
* [jQuery](http://jquery.com/) v. 1.6+ (1.7.2 is included)