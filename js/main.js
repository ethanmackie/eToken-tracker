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
    image.src = "img/icon/slp.png";
    return true;
}

tokens = function(currencies) {
  $.ajax({
    type: "GET",
    url: "https://slpdb.fountainhead.cash/q/ewogICJ2IjogMywKICAicSI6IHsKICAgICJkYiI6IFsidCJdLAogICAgImZpbmQiOiB7fSwKICAgICJzb3J0IjogewogICAgICAidG9rZW5TdGF0cy5hcHByb3hfdHhuc19zaW5jZV9nZW5lc2lzIjogLTEKICAgIH0sCiAgICAibGltaXQiOiAxMDAsCiAgICAic2tpcCI6IDAKICB9Cn0=",
    contentType: "application/json; charset=utf-8",
    timeout: 6000,
    error: function (x, t, m) {
      if ($('#tab-mostTx .podium').html() === '') {
        $("#tab-mostTx .podium").html("<div class='currency'><h4>Error retrieving token count</h4></div>");
      }
    },
    complete: function () { 
      $('#ajax-loader').hide();
    },
    success: function (slpTokens) {

      var output = [];
      var rankings = [];

      $.each(slpTokens, function () {
        $.each(this, function (index) {
            console.log(this);

            index = index+1;
          if (index > 100) {
              return false;
          }
          var symbol = this.tokenDetails.symbol;
          var tokenId = this.tokenDetails.tokenIdHex;
          var name = this.tokenDetails.name;
          var txCount = this.tokenStats.approx_txns_since_genesis;
          var url = this.tokenDetails.documentUri;

          if (name == '') {
            name = tokenId.trunc(8);
          }
          if (symbol == '') { 
            symbol = "n/a";
          }
          
          icon = "<img src='https://tokens.bch.sx/64/" + tokenId + ".png' class='icon' onerror='imgError(this);' style='opacity:1;'>";

          if (index < 4) { 
            output.push("<div class='podium-rank position-" + index + "'><div class='rank-" + index + "'><div class='medal'><h3 class='position'>" + index + "</h3></div><h4><a href='https://explorer.bitcoin.com/bch/tx/" + tokenId + "'>" + icon + name + "</a></h4><h5>" + txCount.toLocaleString('en') + " transactions</h5><h3 class='symbol'>" + symbol + "</h3></div></div>");
          } else {
            rankings.push("<div class='rank rank-" + index + "'><h3 class='position'><span>" + index + "</span></h3><h4><a href='https://explorer.bitcoin.com/bch/tx/" + tokenId + "'>" + icon + name + "</a></h4><h3><span class='symbol'>" + symbol + "</span></h3><h5>" + txCount.toLocaleString('en') + " transactions</h5></div>");
          }
          // console.log('Poked slpDB for the goods')
          
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

