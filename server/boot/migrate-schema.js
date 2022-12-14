module.exports = function(app) {
  var dataSource = app.dataSources.mysql;
  dataSource.autoupdate('DataCenterInformation', function(err) {
    if (err) throw err;
  });
  dataSource.autoupdate('DataCenterInventory', function(err) {
    if (err) throw err;
  });
  dataSource.autoupdate('Lookup', function(err) {
    if (err) throw err;
  });
};