/**
 * drill module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource', 'ojs/ojbutton'], function (oj, ko, $)
{

  function drillContentViewModel()
  {
    //initialize variable
    var self = this;
    self.url = "http://swapi.co/api/planets/";
    self.subCount = self.url.length;
    self.url += "?format=json";
    self.screenRange = oj.ResponsiveKnockoutUtils.createScreenRangeObservable();
    self.dataSource = new oj.ArrayTableDataSource(ko.observableArray(), {idAttribute: "id"});
    self.hit_count = ko.observable("");
    self.status = ko.observable("");
    self.detail = ko.observable()

    //methods
    self.gotoList = function (event, ui)
    {
      $("#listview").ojListView("option", "currentItem", null);
      self.slide();
      //TO DO somehow this scroll top does not work, something with overflow issue
      $("#body").scrollTop(self.scrollPosition);
    };

    self.gotoContent = function (event, ui)
    {
      if (ui.option === "currentItem" && ui.value != null)
      {
        self.scrollPosition = $("body").scrollTop();
        var row = self.dataSource.get(ui.value);
        row.then(function (v)
        {
          self.detail(v.data);

          var id = v.data.url.substring(self.subCount, v.data.url.length - 1);
          self.hit_count("-");
          $("#info-page").scrollTop(0);
          self.slide();

          //update hit count in Firebase Realtime Database
          firebase.database().ref("/planets/" + id).transaction(
            function (currentData)
            {
              //check if is already created
              if (currentData === null)
              {
                hit_count = 1;
                currentData =
                  {
                    name: v.data.name,
                    url: v.data.url,
                    hit_count: hit_count
                  };
              }
              else
              {
                hit_count = currentData.hit_count + 1;
                currentData.hit_count = hit_count;
              }
              return currentData;
            },
            function (error, committed, snapshot)
            {
              if (error)
              {
                console.log('Transaction failed abnormally!', error);
              }
              else if (committed)
              {
                if (snapshot.child("url").val() === v.data.url)
                {
                  self.hit_count(snapshot.child("hit_count").val());
                }
              }
            });
        });
      }
    };

    //slide for small screen only
    self.slide = function ()
    {
      if (self.screenRange() == oj.ResponsiveUtils.SCREEN_RANGE.SM)
      {
        $("#page1").toggleClass("drill-page1-hide");
        $("#page2").toggleClass("drill-page2-hide");
      }
    };

    self.loadData = function ()
    {
      if (self.url == null)
        return;

      //Fix for Firebase Hosting, only https
      self.url = self.url.replace("http://", "https://");

      //Check if it is already load data
      if (self.status() === "Loading...")
        return;
      self.status("Loading...");
      $.getJSON(self.url)
        .done(function (data)
        {
          self.url = data.next;
          self.status("");
          for (var i = 0, j = self.dataSource.totalSize(); i < data.results.length; i++)
          {
            var d = data.results[i];
            d.id = i + j;
            self.dataSource.add(d, null);
          }
          self.checkScreenAndLoadIfNeeded();
        })
        .fail(function (jqxhr, textStatus, error)
        {
          self.status("");
        });
    };

    //screen check and fill it with list
    self.checkScreenAndLoadIfNeeded = function ()
    {
      if ($("#listview").height() + 410 <= $(window).height())
      {
        self.loadData();
      }
    };

    //check for automatic load
    $(window).scroll(function ()
    {
      if ($(window).scrollTop() === $(document).height() - $(window).height())
      {
        self.loadData();
      }
    });

    //sometimes user change the size, check if the we can fullfill the screen with list
    $(window).resize(function ()
    {
      self.checkScreenAndLoadIfNeeded();
    });

    self.loadData();
  }
  return drillContentViewModel;
});
