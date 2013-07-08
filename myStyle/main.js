// JavaScript Document
$.mobile.buttonMarkup.hoverDelay = "false";

$( document ).on( "pageinit", "#myWardrobe", function() {
    $( document ).on( "swipeleft swiperight", "#myWardrobe", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft"  ) {
                $( "#outfit" ).panel( "open" );
            } else if ( e.type === "swiperight" ) {
                $( "#menu" ).panel( "open" );
            }
        }
    });
});

$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady(){
	console.log("deviceReady");
	$(".captureBtn").bind("click", function(event, ui){
		getPictureFromCamera();
	});
	$(".browserBtn").bind("click", function(event, ui){
		getPictureFromPhotoLibrary();
	});
}

function getPictureFromCamera(){
	navigator.camera.getPicture(onSuccess, onFail, {quality:90,
		destinationType: Camera.DestinationType.DATA_URL,
		sourceType:navigator.camera.PictureSourceType.CAMERA,
		targetHeight:80, targetWidth:80});
}

function onSuccess(imageData){
	var image = document.getElementById('myClothImg');
	image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message){
	alert('Failed because: ' + message);
}

function getPictureFromPhotoLibrary(){
	navigator.camera.getPicture(onSuccessFromLib, onFail, 
		{allowEdit:true, quality:90,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY,
			targetHeight:80, targetWidth:80});
}

function onSuccessFromLib(imageURI){
	alert("imageURI" + imageURI);
	var image = document.getElementById('myClothImg');
	image.src = imageURI;
}