
/**
 * Module dependencies.
 */

var express = require('express');

var routes = require('./routes');
var user = require('./routes/user');
var admin = require('./routes/admin');


var http = require('http');
var path = require('path');
var i18n = require('i18next');
var fs = require('fs');
var sys = require('sys');
var pg = require('pg');

var CategoriesController = require('./controllers/CategoriesController');
var SubcategoriesController = require('./controllers/SubcategoriesController');
var SliderController = require('./controllers/SliderController');

var app = express();

// multilamguage modal initialization
i18n.init({
    ns: { namespaces: ['ns.common', 'ns.special'], defaultNs: 'ns.special'},
    resSetPath: 'locales/__lng__/new.__ns__.json',
    saveMissing: true,
    debug: true,
    sendMissingTo: 'fallback',
    preload: ['en-US', 'ru-RU']
});

// all environments
app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.multipart({uploadDir:path.join(__dirname,'/files')})); //uploaded files path join
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(i18n.handle); //multilamguage modal, have to be after cookie, before router
app.use(app.router);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


i18n.registerAppHelper(app)
    .serveClientScript(app)
    .serveDynamicResources(app)
    .serveMissingKeyRoute(app);

i18n.serveWebTranslate(app, {
    i18nextWTOptions: {
      languages: ['en-US', 'ru-RU', 'dev'],
      namespaces: ['ns.common', 'ns.special'],
      resGetPath: "locales/resources.json?lng=__lng__&ns=__ns__",
      resChangePath: 'locales/change/__lng__/__ns__',
      resRemovePath: 'locales/remove/__lng__/__ns__',
      fallbackLng: "dev",
      dynamicLoad: true,

    }
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login', admin.login);
app.get('/admin', admin.admin);

var conString = process.env.HEROKU_POSTGRESQL_OLIVE_URL || 'postgres://postgres:cv251181ojv@localhost/store_db';
var categoriesController = new CategoriesController.CategoriesController(conString);
var subcategoriesController = new SubcategoriesController.SubcategoriesController(conString);
var sliderController = new SliderController.SliderController(conString);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get("/categories", function (req, res) {
  categoriesController.fetchCategories(function (data) {
    res.header();
    res.end(JSON.stringify(data));
  });
});


app.get("/subcategories/:attr/:id", function (req, res) {
  subcategoriesController.fetchSubcategories(req.params.id, req.params.attr, function (data) {
    res.header();
    res.end(JSON.stringify(data));
  });
});

app.delete("/subcategories/:id", function (req, res) {
  subcategoriesController.deleteSubcategory(req.params.id);
  res.header();
  res.end();
});

app.get("/slider", function (req, res) {
  sliderController.fetchSliders(function (data) {
    res.header();
    res.end(JSON.stringify(data));
  });
});

app.put("/slider/:id", function (req, res) {
  sliderController.putSlider(req.params.id, req.body, req.files);
  res.end();
});

app.post("/slider", function (req, res) {
  sliderController.saveSlider(req.body, req.files);
  res.end();
});

app.delete("/slider/:id", function (req, res) {
  sliderController.deleteSlider(req.params.id);
  res.header();
  res.end();
});