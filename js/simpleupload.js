
(function( $ ){
$.fn.simpleUpload = function(url, cssClass) {
  
  var dndClass = cssClass;
  
  /**
   * The drop / upload files code 
   **/
  var $this = $(this);
  
  //Drag enter event
  $this.bind("dragenter", function(event) {
    event.stopPropagation(); 
    event.preventDefault();
  });
  
  /**
   * the drag over event. This is called when the we hover a file over the dropzone.
   * The scope of this function is to add the stylesheet class to the div 
   */ 
  $this.bind("dragover", function(event) {
    $this.addClass(dndClass)
    event.originalEvent.dataTransfer.dropEffect = "copy"
    event.stopPropagation();
    event.preventDefault();
  });
  
  $this.bind("dragleave", function(event) {
    $this.removeClass(dndClass)
    event.stopPropagation();
    event.preventDefault();
  });
  
  $this.bind("drop", function(event){ 
    
    $this.removeClass(dndClass)
    // Cancel redirection 
    event.stopPropagation(); 
    event.preventDefault();
    
    event = event.originalEvent;
    // Access dragged files
    var files = event.dataTransfer.files;
    for (var i=0; i < files.length; i++) {
      uploadFile(files[i]);
    }
  });
  
  //cancel the default drop event 
  $('body').bind("dragover", function(event) {
    event.stopPropagation(); 
    event.preventDefault();
    return false;
  });
  
  /**
   * Fallback method in case the drag and drop is not working. 
   * This will be again a ajax call though
   */
  var input = $this.find("input[type=file]");
  input.change(function(){ //add an event to listen to
    var files = input[0].files;
    for (var i=0; i < files.length; i++) {
      console.log( files[i].type + " name is " + files[i].name);
      uploadFile(files[i]);
    }
  });
  
  var previewFile = function(file) {
    var preview = $("img#preview")
    
    if (file.type.match(/image.*/) && file.size < 50000000) {
      var reader = new FileReader(); 
      reader.onload = function(e) {
        var data = e.target.result;
        preview.attr("src", data); 
        uploadFile(file);
      };
      reader.readAsDataURL(file); 
    };
  };
  
  var uploadFile = function(file) {
   
    $.get('/file/blank.html');
    upload(url, file);
  }
  
  /**
   * Generic method to upload files
   **/
  var upload = function(upUrl, data) {
    //process the setings first
    if (typeof(FormData) != 'undefined') {
      var form = new FormData();

      //for (var i = 0; i < files.length; i++) {
      form.append('image', data);
      //}
    
      $.ajax({
        data: form, 
        processData: false,
        url: upUrl, 
        type: "POST",
        contentType: false
      });
    }
  };
}
})( jQuery );