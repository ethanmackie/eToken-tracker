

String.prototype.trunc = String.prototype.trunc ||
function(n){
    return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
};

$(document).ready(function(){
  
  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })

});

function imgError(image) {
    image.onerror = "";
    image.src = "img/icon/ecash-icon.png";
    return true;
}

tokens = function(currencies) {
  $.ajax({
    type: "GET",
    url: "https://tokendb.kingbch.com/q/ew0KICAidiI6IDMsDQogICJxIjogew0KICAgICJkYiI6IFsidCJdLA0KICAgICJmaW5kIjogeyJ0b2tlblN0YXRzLmJsb2NrX2NyZWF0ZWQiOiB7IiRndCI6IDY4NTMyMn0sICJ0b2tlbkRldGFpbHMudmVyc2lvblR5cGUiOiAxfSwNCiAgICAicHJvamVjdCI6IHsidG9rZW5EZXRhaWxzIjogMSwgInRva2VuU3RhdHMiOiAxLCAiX2lkIjogMH0sDQogICAgInNvcnQiOiB7InRva2VuU3RhdHMuYXBwcm94X3R4bnNfc2luY2VfZ2VuZXNpcyI6IC0xfSwNCiAgICAibGltaXQiOiAyMA0KICB9DQp9",
    contentType: "application/json; charset=utf-8",
    timeout: 6000,
    error: function (x, t, m) {
      if ($('#tab-mostTx .podium').html() === '') {
        $("#tab-mostTx .podium").html("<div class='currency'><h4>Error retrieving eToken count</h4></div>");
      }
    },
    complete: function () { 
      $('#ajax-loader').hide();
    },
    success: function (eTokens) {
      var output = [];
      var rankings = [];

      $.each(eTokens, function () {
        $.each(this, function (index) {

          index = index+1;
          if (index > 100) {
              return false;
          }
          
          var tokenIconsUrl = 'https://etoken-icons.s3.us-west-2.amazonaws.com';
          var symbol = '';
          var tokenId = '';
          var name = '';
          var txCount = '';
          var url = '';
          
          if (this.tokenDetails && this.tokenStats) {
            symbol = this.tokenDetails.symbol;
            tokenId = this.tokenDetails.tokenIdHex;
            name = this.tokenDetails.name;
            txCount = this.tokenStats.approx_txns_since_genesis;
            url = this.tokenDetails.documentUri;
            
            var tokenTimestamp;
            if (this.tokenStats.block_created && this.tokenDetails.versionType===1) {
                if (name == '') {
                  name = tokenId.trunc(8);
                }
                if (symbol == '') { 
                  symbol = "n/a";
                }
                
                icon = `<img src=${tokenIconsUrl}/32/${tokenId}.png` + " class='icon' onerror='imgError(this);' style='opacity:1;'>";
                if (index < 4) { 
                  output.push("<div class='podium-rank position-" + index + "'><div class='rank-" + index + "'><div class='medal'><h3 class='position'>" + index + "</h3></div><h4><a href='https://explorer.be.cash/tx/" + tokenId + "' target='_blank'>" + icon + name + "</a></h4><h5>" + txCount.toLocaleString('en') + " transactions</h5><h3 class='symbol'>" + symbol + "</h3></div></div>");
                } else {
                  rankings.push("<div class='rank rank-" + index + "'><h3 class='position'><span>" + index + "</span></h3><h4><a href='https://explorer.be.cash/tx/" + tokenId + "' target='_blank'>" + icon + name + "</a></h4><h3><span class='symbol'>" + symbol + "</span></h3><h5>" + txCount.toLocaleString('en') + " transactions</h5></div>");
                }
            }
          }
        });
      });
      $('#tab-mostTx .podium').html(output);
      $('#tab-mostTx .rankings').html(rankings)

    }
  }).done(function () {
    setTimeout(function(){ tokens(); }, 60000);
  }).fail(function() {
    setTimeout(function(){ tokens(); }, 60000);
  });
}



tokens();

