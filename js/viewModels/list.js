define(["ojs/ojcore","knockout","jquery","ojs/ojknockout","promise","ojs/ojlistview","ojs/ojcollectiontabledatasource","ojs/ojarraytabledatasource","ojs/ojmenu","ojs/ojmodel"],function(a,b,c){function d(){var b=this,d=a.Model.extend({idAttribute:"url"});new a.Collection(null,{fetchSize:10,model:d});b.dataSource=new a.ArrayTableDataSource([],{idAttribute:"url"}),c.getJSON("http://swapi.co/api/planets/?format=json",function(a){b.dataSource.add(a.results,null)})}return d});