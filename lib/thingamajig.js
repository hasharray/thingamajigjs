var fs = require('fs');
var reassign = require('reassign');
var revaluate = require('revaluate');

require.extensions['.js'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  console.log(content);

  revaluate(content, filename, function(output) {
    console.log('output', output);
    module._compile(output.code, filename);
  });

  fs.watchFile(filename, {
    interval: 250,
    persistent: false,
  }, function() {
    var content = fs.readFileSync(filename, 'utf8');

    revaluate(content, filename, function(output) {
      module._compile(output.code, filename);
    });
  });
};

require.extensions['.json'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  module.exports = JSON.parse(content);

  fs.watchFile(filename, {
    interval: 250,
    persistent: false,
  }, function() {
    var content = fs.readFileSync(filename, 'utf8');
    module.exports = reassign(module.exports, JSON.parse(content));
  });
};