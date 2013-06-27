var assert = require('assert')
var fs = require('fs')

var handleify = require('../index.js')

suite('Simple')

function getTransformedOutput(filename, callback) {
    var pipe = handleify(filename)
    var output = ''
    fs.createReadStream(filename).pipe(pipe)
    pipe.on('error', function (error) {
            callback(error)
        })
        .on('data', function (data) {
            output += data
        })
        .on('end', function () {
            callback(null, output)
        })
}
test('test.hbs', function(done) {
    getTransformedOutput(__dirname+"/test.hbs", function(error, output) {
        assert.ifError(error)
        assert.equal(output, 'module.exports=require("handleify").template(function (Handlebars,depth0,helpers,partials,data) {\n' +
            '  this.compilerInfo = [4,\'>= 1.0.0\'];\n' +
            'helpers = this.merge(helpers, Handlebars.helpers); data = data || {};\n' +
            '  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;\n\n\n' +
            '  buffer += "Hello ";\n' +
            '  if (stack1 = helpers.world) { stack1 = stack1.call(depth0, {hash:{},data:data}); }\n' +
            '  else { stack1 = depth0.world; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }\n' +
            '  buffer += escapeExpression(stack1)\n' +
            '    + "!";\n' +
            '  return buffer;\n' +
            '  })')
        done()
    })
})

test('bad.hbs', function(done) {
    getTransformedOutput(__dirname+"/bad.hbs", function(error, output) {
        assert.ok(error)
        assert.equal(error.toString(), 
            "Error: Parse error on line 1:\n" +
            "... {{#blk}} Unexpected\n" +
            "-----------------------^\n" +
            "Expecting 'OPEN_ENDBLOCK', got 'EOF'")
        done()
    })
})
