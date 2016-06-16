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
    self.dataSource = new oj.ArrayTableDataSource(ko.observableArray(), {idAttribute: "id"});
    self.name = ko.observable("");
    self.rotation_period = ko.observable("");
    self.orbital_period = ko.observable("");
    self.diameter = ko.observable("");
    self.climate = ko.observable("");
    self.gravity = ko.observable("");
    self.terrain = ko.observable("");
    self.surface_water = ko.observable("");
    self.population = ko.observable("");
    self.hit_count = ko.observable("");
    self.status = ko.observable("");

    //methods
    self.gotoList = function (event, ui)
    {
      $("#listview").ojListView("option", "currentItem", null);
      self.slide();
    };

    self.gotoContent = function (event, ui)
    {
      if (ui.option === "currentItem" && ui.value != null)
      {
        var row = self.dataSource.get(ui.value);
        row.then(function (v)
        {
          self.name(v.data.name);
          self.rotation_period(v.data.rotation_period);
          self.orbital_period(v.data.orbital_period);
          self.diameter(v.data.diameter);
          self.climate(v.data.climate);
          self.gravity(v.data.gravity);
          self.terrain(v.data.terrain);
          self.surface_water(v.data.surface_water);
          self.population(v.data.population);
          var id = v.data.url.substring(self.subCount, v.data.url.length - 1);
          self.hit_count("-");
          console.log($("#listview").offset());
          self.slide();
          firebase.database().ref("/planets/" + id).transaction(
            function (currentData)
            {
              if (currentData === null)
              {
                hit_count = 1;
                currentData =
                  {
                    name: v.data.name,
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
                self.hit_count(snapshot.child("hit_count").val());
              }
            });
        });
      }
    };

    self.slide = function ()
    {
      $("#page1").toggleClass("drill-page1-hide");
      $("#page2").toggleClass("drill-page2-hide");
    };

    self.loadData = function ()
    {
      if (self.url == null)
        return;
      self.url = self.url.replace("http://", "https://")
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
          if ($("#listview").height() + 410 <= $(window).height())
          {
            self.loadData();
          }
        })
        .fail(function (jqxhr, textStatus, error)
        {
          self.status("");
        })
    };

    $(window).scroll(function ()
    {
      if ($(window).scrollTop() === $(document).height() - $(window).height())
      {
        self.loadData();
      }
    });

    self.loadData();
  }
  return drillContentViewModel;
});