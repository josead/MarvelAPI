var resturl = 'https://gateway.marvel.com',
    publicApiKey = '9ea47c833597c96fb78db63c9cd1b398',
    $module = $('.module'),
    $info = $('.more-information');

function parseDataHero(data) {
  for(hero in data.data.results) {
    var card = '<div class="card hero"><div class="title">'+data.data.results[hero].name+'</div><img src="'+data.data.results[hero].thumbnail.path+'/portrait_uncanny.'+data.data.results[hero].thumbnail.extension+'"></img></div>';
    $module.append(card);
  };


};
function parseDataComic(data) {
  console.log(data);
};

function showError(msg) {
  $info.html(msg).show();
};

$(document).ready( function () {

  $('.header-bar .title').addClass('animate-ready');
  $info.html('Choose one to display the magic.').show();

  $('.get-heroes').on('click', function () {
    var tsNow = new Date().getTime();
    $module.html('').show();
    $info.hide();

    $.get(resturl+'/v1/public/characters?apikey='+publicApiKey+'&ts='+tsNow+'&hash='+$.md5(tsNow+'bcbfcbd6dd943cc121715ddc01a4468bba140d09'+publicApiKey))
    .done(function (data) {
      parseDataHero(data);
    })
    .fail(function() {
      $module.hide();
      showError('Something with Marvel API went wrong.');
    });
  });
  $('.get-comics').on('click', function () {
    var tsNow = new Date().getTime();
    $module.show();
    $info.hide();

    $.get(resturl+'/v1/public/comics?apikey='+publicApiKey+'&ts='+tsNow+'&hash='+$.md5(tsNow+'bcbfcbd6dd943cc121715ddc01a4468bba140d09'+publicApiKey))
    .done(function (data) {
      parseDataComic(data);
    })
    .fail(function() {
      $module.hide();
      showError('Something with Marvel API went wrong.');
    });
  });
});
