define(["ojs/ojcore","knockout","jquery","ojs/ojknockout","promise","ojs/ojlistview","ojs/ojarraytabledatasource","ojs/ojbutton"],function(a,b,c){function d(){var d=this;d.url="http://swapi.co/api/planets/",d.subCount=d.url.length,d.url+="?format=json",d.dataSource=new a.ArrayTableDataSource(b.observableArray(),{idAttribute:"id"}),d.name=b.observable(""),d.rotation_period=b.observable(""),d.orbital_period=b.observable(""),d.diameter=b.observable(""),d.climate=b.observable(""),d.gravity=b.observable(""),d.terrain=b.observable(""),d.surface_water=b.observable(""),d.population=b.observable(""),d.hit_count=b.observable(""),d.status=b.observable(""),d.gotoList=function(a,b){c("#listview").ojListView("option","currentItem",null),d.slide()},d.gotoContent=function(a,b){if("currentItem"===b.option&&null!=b.value){var e=d.dataSource.get(b.value);e.then(function(a){d.name(a.data.name),d.rotation_period(a.data.rotation_period),d.orbital_period(a.data.orbital_period),d.diameter(a.data.diameter),d.climate(a.data.climate),d.gravity(a.data.gravity),d.terrain(a.data.terrain),d.surface_water(a.data.surface_water),d.population(a.data.population);var b=a.data.url.substring(d.subCount,a.data.url.length-1);d.hit_count("-"),console.log(c("#listview").offset()),d.slide(),firebase.database().ref("/planets/"+b).transaction(function(b){return null===b?(hit_count=1,b={name:a.data.name,hit_count:hit_count}):(hit_count=b.hit_count+1,b.hit_count=hit_count),b},function(a,b,c){a?console.log("Transaction failed abnormally!",a):b&&d.hit_count(c.child("hit_count").val())})})}},d.slide=function(){c("#page1").toggleClass("drill-page1-hide"),c("#page2").toggleClass("drill-page2-hide")},d.loadData=function(){null!=d.url&&"Loading..."!==d.status()&&(d.status("Loading..."),c.getJSON(d.url).done(function(a){d.url=a.next,d.status("");for(var b=0,e=d.dataSource.totalSize();b<a.results.length;b++){var f=a.results[b];f.id=b+e,d.dataSource.add(f,null)}c("#listview").height()+410<=c(window).height()&&d.loadData()}).fail(function(a,b,c){d.status("")}))},c(window).scroll(function(){c(window).scrollTop()===c(document).height()-c(window).height()&&d.loadData()}),d.loadData()}return d});