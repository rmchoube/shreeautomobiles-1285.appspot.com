$(document).ready(function(){

  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Prevent default anchor click behavior
   /* event.preventDefault();*/

    // Store hash
    var hash = this.hash;

   /* var prodPos = $("#homeproductBorder").position();
    var prodHeight = $("#homeproductBorder").height();*/
     
    // Using jQuery's animate() method to add smooth page scroll
    // The optional number  it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 780, function(){
   
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;

     /*  if (($this).hasClass("four")) return;*/
    });

 /* $(".one").removeClass('active'); 
    $(".two").addClass('active');
*/


  });
});

//this toggle the active class from home to product
/*$(document).ready(function () {
    $('.nav li a').click(function(e) {

        $('.nav li').removeClass('active');

        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        e.preventDefault();
    });
});
*/




/*====================autocollapse the nav on click of menu items in mobile==========================*/

     /* $(document).ready(function () {
    $(".navbar-nav li a").click(function(event) {
        $(".collapse .navbar-collapse").collapse('hide');
    });
});*/
    $(document).ready(function() {
        $("nav").find("li").on("click","a",function(){
            $('.navbar-collapse.in').collapse('hide');

        });
    });







/*==============slidesin on page scroll effect below=====================*/

$(document).ready(function(){
          $('.slide-left-1000').scrollSlide({
            direction   : 'left',
            scrollstart : 1000
        });

        $('.slide-right-1000').scrollSlide({
            direction   : 'right',
            scrollstart : 1000
        });

        $('.slide-left-1650').scrollSlide({
            direction   : 'left',
            scrollstart : 1650
        });

        $('.slide-right-1650').scrollSlide({
            direction   : 'right',
            scrollstart : 1650
        });
         $('.slide-left-2300').scrollSlide({
            direction   : 'left',
            scrollstart : 2300
        });

        $('.slide-right-2300').scrollSlide({
            direction   : 'right',
            scrollstart : 2300
        });
        $('.slide-left-2920').scrollSlide({
            direction   : 'left',
            scrollstart : 2920
        });

        $('.slide-right-2920').scrollSlide({
            direction   : 'right',
            scrollstart : 2920
        });
         $('.slide-left-3600').scrollSlide({
            direction   : 'left',
            scrollstart : 3600
        });

        $('.slide-right-3600').scrollSlide({
            direction   : 'right',
            scrollstart : 3600
        });

        $('.slide-left-4160').scrollSlide({
            direction   : 'left',
            scrollstart : 4160
        });

        $('.slide-right-4160').scrollSlide({
            direction   : 'right',
            scrollstart : 4160
        });
       

        $('.slide-left-4780').scrollSlide({
            direction   : 'left',
            scrollstart : 4780
        });

        $('.slide-right-4780').scrollSlide({
            direction   : 'right',
            scrollstart : 4780
        });
        

         $('.slide-left-5360').scrollSlide({
            direction   : 'left',
            scrollstart : 5360
        });

        $('.slide-right-5360').scrollSlide({
            direction   : 'right',
            scrollstart : 5360
        });


        });

    var $modelid = -1;
    var $branchid = -1;
    var items = [     /*Escoot*/       /*Estar*/
      /*Akola row*/ ["FWF927YYTM7A8", "5F65KBDWUB8ZL", "D9Y6B7FPE3N6S", "37CAFD299WBUS", "B2P57FEL8UM4N", "Y8TAC6QAADWYC", "29D7XZW5AWL66", "9LRGB3AZNZ3TC"],
                    ["MCAUJL75XCQ82", "Y77W346FRE7K8", "6SQFA974R9FLE", "2ASME26HEHFDE", "J2YRKS6N7NWP2", "XM44PGH6T343L", "UFNX4AM34STUY", "7WKRTNYQZPHZA"],
                    ["BBGHDXNG556E8", "PJ8RZMXDR9X7W", "XH6K3YUYGWB6Q", "P8TV9WVNKUBR4", "UU4QVGGAK9MYJ", "GVKRPJDZ3QP2G", "SJ75G7LFTSLFL", "FMZWZ8HH2CC2S"],
                    ["KPQFPYEUP8UD8", "MQTYFQG7KHXHA", "84YNXR7HYX7S4", "HU4HKWXDSBDGJ", "936GHT3RFUDVW", "G53ZQVF5DM2ES", "WFPXSH6REW6AE", "5QVNV7SQNN84G"],
                    ["ENGD5WGVEUS8Q", "Y8FA4SF39KDD8", "TLK4LG2FAPJQG", "XZ4ZP6ANKGDPE", "4SY33H8QNAYGE", "7JKYASMPQ4QKY", "AU7DNFXLW6Q5Q", "WTDRGB8UA8Z8L"]
                ];

    function submitToPaypal(frm) {
        var $branchEle = document.getElementById('branchselection');
        var $i = 0;

        for ($i = 0; $i < $branchEle.length; $i++) {
            if ($branchEle[$i].selected) {
                $branchid = $i;
                break;
            }
        }

        if ($branchid == -1) {
            BootstrapDialog.show({
                title: 'Error',
                message: 'Please select branch.',
                cssClass:'smallmodule',
                buttons: [{
                    label: 'OK',
                    action: function(dialogRef) {
                        dialogRef.close();
                    }
                }]
            });
            return false;
        } else {
            // set the appropriate button id for paypal
            frm.hosted_button_id.value = items[$branchid][$modelid];
            frm.submit(); // submit form to paypal
        }

        return true;
    }

     function showme(ele) {
        var $divvar = document.getElementById("buyit");
        var $id = ele.id;
        var $textAndPic = $('<div class="container" id="buyit"><div class="row" style="margin-top:30px;">');

        switch($id) {
            case "E-Scoot":
                $modelid = 0;
                $textAndPic.append('<div class="col-md-6"><img src="img/e-scoot.png" width="500" height="auto" class="img-responsive"/><h3>E-scoot Rs.39,388/- only.</h3></div>');
                break;
            case "E-Star":
                $modelid = 1;
                $textAndPic.append('<div class="col-md-6"><img src="img/Estar.png" width="500" height="auto" class="img-responsive"/><h3>Estar Rs.59,619/- only.</h3></div>');
                break;
            case "E-Lite":
                $modelid = 2;
                $textAndPic.append('<div class="col-md-6"><img src="img/E-LITE-BIKE.png" width="500" height="auto" class="img-responsive"/><h3>E-Lite bike Rs.25,770/- only.</h3></div>');
                break;
            case "E-BikeVX":
                $modelid = 3;
                $textAndPic.append('<div class="col-md-6"><img src="img/ebikeVX.png" width="500" height="auto" class="img-responsive"/><h3>E-Bike VX Rs.14,970/- only.</h3></div>');
                break;
            case "E-Mate":
                $modelid = 4;
                $textAndPic.append('<div class="col-md-6"><img src="img/E-mate.png" width="500" height="auto" class="img-responsive"/><h3>E-Mate Rs.39,388/- only.</h3></div>');
                break;
            case "E-Plus":
                $modelid = 5;
                $textAndPic.append('<div class="col-md-6"><img src="img/E-Plus.png" width="500" height="auto" class="img-responsive"/><h3>E-Plus Rs.---------/- only.</h3></div>');
                break;
            case "E-Rickshaw":
                $modelid = 6;
                $textAndPic.append('<div class="col-md-6"><img src="img/rickshaw.png" width="500" height="auto" class="img-responsive" style="margin-top:30px"/><h3>E-Rickshaw Rs.--------/- only.</h3></div>');
                break;
            case "Battries":
                $modelid = 7;
                $textAndPic.append('<div class="col-md-6"><img src="img/battrie.png" width="260" height="239" class="img-responsive" style="margin-top:50px;margin-left:80px"/><h3>Battries Rs.-------/- only.</h3></div>');
                break;
        }

        $textAndPic.append('<div class="col-md-6"><h4>Book it now just on deposit of Rs.5000 only.</h4><h4>Delivery estimate 15 days from the day of booking.</h4><label for="selectcity">Please select branch</label><select  class="form-control" id="branchselection"><option>Akola</option><option>Amravati</option><option>Nagpur</option><option>Hydrabad</option><option>Khandawa</option></select></div><form id="paypalform" name="paypal" action="https://www.sandbox.paypal.com/cgi-bin/webscr" onsubmit="return submitToPaypal(this);" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id"><input type="hidden" name="rm" value="2"><input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"></form></div></div></div>');

        BootstrapDialog.show({
            title: ("Get your"+ " " + $id +" "+ "Now"),
            message: $textAndPic
        });
    }
