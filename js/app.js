 var process_image = function () {
    this.lowEnd(60);
    this.greyscale();
    //this.render();

    // manipulate image here
    this.newLayer(function () {
        this.setBlendingMode("screen");
        this.overlayImage("img/hearttemplate.png");
    });


    // manipulate image here
    this.newLayer(function () {
        this.setBlendingMode("cutToWhite");
        this.overlayImage("img/heartmask.png");
    });

    this.render(function () {
        var canvas = $("#user-images > canvas")[0];

        // replace canvas with image
        var finalImage = new Image();
        finalImage.src = canvas.toDataURL("image/png");
        $(finalImage).addClass("finalImage");
        $('#user-images').empty();
        $('#user-images').append(finalImage);

        finalImage.onload = function() {
            showImage();
        };


    });
};

 function scaleSize(finalSize, currW, currH){
     var ratio = finalSize / Math.min(currW, currH);
 }

var options = {
    // CSS Class to add to the drop element when a drag is active
    dragClass: "drag",

    // A string to match MIME types, for instance
    accept: "image/*",

    // An object specifying how to read certain MIME types
    // For example: {
    //  'image/*': 'DataURL',
    //  'data/*': 'ArrayBuffer',
    //  'text/*' : 'Text'
    // }
    readAsMap: { },

    // How to read any files not specified by readAsMap
    readAsDefault: 'DataURL',
    on: {
        beforestart: hideImage,
        load: function(e, file) {
            var img = new Image();
            img.onload = function() {
                //document.body.appendChild(img);

                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width=700;
                canvas.height=700;

                var ratio = 700 / Math.min(img.width, img.height);
                var newW = img.width*ratio;
                var newH = img.height*ratio;

                ctx.drawImage(img, -(newW - 700)/2.0, -(newH - 700)/2.0, newW, newH)

                //$('#hiddenel').append(canvas);


                var croppedImage = new Image();
                croppedImage.src = canvas.toDataURL("image/png");
                $('#user-images').empty();
                $('#user-images').append(croppedImage);

                croppedImage.onload = function() {
                    Caman(croppedImage, process_image);
                };
            };
            img.src = e.target.result;
        }
    }
};

// Accept dropped files on the specified file
//FileReaderJS.setupDrop(document.getElementById('file-input'), options);
FileReaderJS.setupInput(document.getElementById('file-input'), options);

// Accept paste events if available
FileReaderJS.setupClipboard(document.body, options);

 function hideImage() {
     $("#user-images").hide();
     $("#loading").show();
 }
 function showImage() {
     $("#user-images").show();
     $("#loading").hide();
 }
 new Share(".share-button", {
     networks: {
         facebook: {
             app_id: "abc123"
         }
     }
 });

 new Share("#share-buttons", {
     title: "Games are for everyone.",
     description: "We think games are for everyone. Change your avatar if you think so too.",
     image: "http://weheart.github.io/site/images/logo.png",
     networks: {
         pinterest: {
             enabled: false
         },
         email: {
             enabled: false
         }
     }
 });