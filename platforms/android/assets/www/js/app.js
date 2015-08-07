// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());
    var rankingListTpl = Handlebars.compile($("#ranking-list-tpl").html());
    var eService = new EmployeeService();
    eService.initialize();
    var service = new RankingService();
    service.initialize().done(function () {
        renderHomeView();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        //StatusBar.overlaysWebView( false );
        //StatusBar.backgroundColorByHexString('#ffffff');
        //StatusBar.styleDefault();
      FastClick.attach(document.body);
      if (navigator.notification) { // Override default HTML alert with native dialog
          window.alert = function (message) {
              navigator.notification.alert(
                  message,    // message
                  null,       // callback
                  "POA Poker", // title
                  'OK'        // buttonName
              );
          };
      }
    }, false);
    
    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        eService.findByName($('.search-key').val()).done(function (employees) {
            $('.content').html(employeeListTpl(employees));
        });
    }
    function findAll() {
        eService.findAll().done(function (employees) {
            $('.content').html(employeeListTpl(employees));
            $('.tab-ranking').removeClass('active');
            $('.tab-jogadores').addClass('active');
        });
    }
    function listaRanking() {
        service.findAll().done(function (rankings) {
            $('.content').html(rankingListTpl(rankings));
            $('.tab-jogadores').removeClass('active');
            $('.tab-ranking').addClass('active');
        });
    }
    function renderHomeView() {
        $('body').html(homeTpl());
        $('.tab-ranking').on('click', listaRanking);
        $('.tab-jogadores').on('click', findAll);
        listaRanking();
    }
}());