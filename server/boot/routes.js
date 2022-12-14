var jsonToQueryString = function(json) {
  return '?' +
    Object.keys(json).map(function(key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
};


module.exports = function(app) {
  app.get('/reports', function(req, res) {
    var p = req.query;
    console.log('request params: ' + JSON.stringify(p));

    var rptName = p.rptName; //e.g. new_report
    var format = p.format; //e.g. xlsx
    p.__report = rptName + '.rptdesign';
    p.__format = p.format;

    delete p.rptName;
    delete p.format;

    var reportBaseUrl = app.get('birt_repors_url');
    console.log('reportBaseUrl is :' + reportBaseUrl);
    var qString = jsonToQueryString(p);
    var birtUrl = reportBaseUrl + qString;
    console.log('Redirecting to Reports URL : ' + birtUrl);
    res.redirect(birtUrl);
  });
};
