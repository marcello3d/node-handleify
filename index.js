var handlebars = require('handlebars')
var through = require('through')

module.exports = function(file) {
    if (!/\.hbs$/.test(file)) return through()

    var source = ''
    var stream = through(
        function write(buf) { 
            source += buf 
        },
        function end() {
            try {
                this.queue('module.exports=require("handleify").template('+handlebars.precompile(source)+')')
                this.queue(null)
            } catch (ex) {
                stream.emit('error', ex)
            }
        }
    )
    return stream
};