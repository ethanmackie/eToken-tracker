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

tokens = function(currencies) {
  $.ajax({
    type: "GET",
    url: "https://slpdb.bitcoin.com/q/ewogICJ2IjogMywKICAicSI6IHsKICAgICJkYiI6IFsidCJdLAogICAgImZpbmQiOiB7fSwKICAgICJzb3J0IjogewogICAgICAidG9rZW5TdGF0cy5xdHlfdmFsaWRfdHhuc19zaW5jZV9nZW5lc2lzIjogLTEKICAgIH0sCiAgICAicHJvamVjdCI6IHsKICAgICAgInRva2VuRGV0YWlscy50b2tlbklkSGV4IjogMSwKICAgICAgInRva2VuU3RhdHMucXR5X3ZhbGlkX3R4bnNfc2luY2VfZ2VuZXNpcyI6IDEsCiAgICAgICJ0b2tlbkRldGFpbHMubmFtZSI6IDEsCiAgICAgICJ0b2tlbkRldGFpbHMuc3ltYm9sIjogMSwKICAgICAgInRva2VuRGV0YWlscy5kb2N1bWVudFVyaSI6IDEKICAgIH0sCiAgICAibGltaXQiOiAxMDAwCiAgfSwKICAiciI6IHsKICAgICJmIjogIlsuW10gfCB7dG9rZW5JZDogLnRva2VuRGV0YWlscy50b2tlbklkSGV4LCB0cmFuc2FjdGlvbkNvdW50OiAudG9rZW5TdGF0cy5xdHlfdmFsaWRfdHhuc19zaW5jZV9nZW5lc2lzLCAgbmFtZTogLnRva2VuRGV0YWlscy5uYW1lLCAgc3ltYm9sOiAudG9rZW5EZXRhaWxzLnN5bWJvbCwgdXJsOiAudG9rZW5EZXRhaWxzLmRvY3VtZW50VXJpfV0iCiAgfQp9",
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
            index = index+1;
          if (index > 100) {
              return false;
          }
          var symbol = this.symbol;
          var tokenId = this.tokenId;
          var name = this.name;
          var txCount = this.transactionCount;
          var url = this.url;

          if (name == '') {
            name = tokenId.trunc(8);
          }
          if (symbol == '') { 
            symbol = "n/a";
          }

          if (index < 4) { 
            output.push("<div class='podium-rank position-" + index + "'><div class='rank-" + index + "'><div class='medal'><h3 class='position'>" + index + "</h3></div><h4><a href='https://explorer.bitcoin.com/bch/tx/" + tokenId + "'>" + name + "</a></h4><h5>" + txCount + " transactions</h5><h3 class='symbol'>" + symbol + "</h3></div></div>");
          } else {
            rankings.push("<div class='rank rank-" + index + "'><h3 class='position'><span>" + index + "</span></h3><h4><a href='https://explorer.bitcoin.com/bch/tx/" + tokenId + "'>" + name + "</a></h4><h3><span class='symbol'>" + symbol + "</span></h3><h5>" + txCount + " transactions</h5></div>");
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


tokensAddr = function(currencies) {
  $.ajax({
    type: "GET",
    url: "https://slpdb.bitcoin.com/q/ewogICJ2IjogMywKICAicSI6IHsKICAgICJkYiI6IFsidCJdLAogICAgImZpbmQiOiB7fSwKICAgICJzb3J0IjogewogICAgICAidG9rZW5TdGF0cy5xdHlfdmFsaWRfdG9rZW5fYWRkcmVzc2VzIjogLTEKICAgIH0sCiAgICAicHJvamVjdCI6IHsKICAgICAgInRva2VuRGV0YWlscy50b2tlbklkSGV4IjogMSwKICAgICAgInRva2VuU3RhdHMucXR5X3ZhbGlkX3Rva2VuX2FkZHJlc3NlcyI6IDEsCiAgICAgICJ0b2tlbkRldGFpbHMubmFtZSI6IDEsCiAgICAgICJ0b2tlbkRldGFpbHMuc3ltYm9sIjogMSwKICAgICAgInRva2VuRGV0YWlscy5kb2N1bWVudFVyaSI6IDEKICAgIH0sCiAgICAibGltaXQiOiAxMDAwCiAgfSwKICAiciI6IHsKICAgICJmIjogIlsuW10gfCB7dG9rZW5JZDogLnRva2VuRGV0YWlscy50b2tlbklkSGV4LCBhZGRyZXNzQ291bnQ6IC50b2tlblN0YXRzLnF0eV92YWxpZF90b2tlbl9hZGRyZXNzZXMsICBuYW1lOiAudG9rZW5EZXRhaWxzLm5hbWUsICBzeW1ib2w6IC50b2tlbkRldGFpbHMuc3ltYm9sLCB1cmw6IC50b2tlbkRldGFpbHMuZG9jdW1lbnRVcml9XSIKICB9Cn0=",
    contentType: "application/json; charset=utf-8",
    timeout: 6000,
    error: function (x, t, m) {
      if ($('#tab-mostAddr .podium').html() === '') {
        $("#tab-mostAddr .podium").html("<div class='currency'><h4>Error retrieving token count</h4></div>");
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
            index = index+1;
          if (index > 100) {
              return false;
          }
          var symbol = this.symbol;
          var tokenId = this.tokenId;
          var name = this.name;
          var txCount = this.addressCount;
          var url = this.url;

          if (name == '') {
            name = tokenId.trunc(8);
          }
          if (symbol == '') { 
            symbol = "n/a";
          }

          if (index < 4) { 
            output.push("<div class='podium-rank position-" + index + "'><div class='rank-" + index + "'><div class='medal'><h3 class='position'>" + index + "</h3></div><h4><a href='https://explorer.bitcoin.com/bch/tx/" + tokenId + "'>" + name + "</a></h4><h5>" + txCount + " addresses</h5><h3 class='symbol'>" + symbol + "</h3></div></div>");
          } else {
            rankings.push("<div class='rank rank-" + index + "'><h3 class='position'><span>" + index + "</span></h3><h4><a href='https://explorer.bitcoin.com/bch/tx/" + tokenId + "'>" + name + "</a></h4><h3><span class='symbol'>" + symbol + "</span></h3><h5>" + txCount + " addresses</h5></div>");
          }
          // console.log('Poked slpDB for the most addr goods')
          
        });
      });

      $('#tab-mostAddr .podium').html(output);
      $('#tab-mostAddr .rankings').html(rankings)

    }
  }).done(function () {
    setTimeout(function(){ tokensAddr(); }, 65000);
  }).fail(function() {
    setTimeout(function(){ tokensAddr(); }, 65000);
  });
}

tokens();
tokensAddr();

