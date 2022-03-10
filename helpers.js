function successfullMessage(msg) {
    return "✅ *AQUA*:  ```" + msg + "```"
}
function errorMessage(msg) {
    return "🛑 *AQUA*:  ```" + msg + "```"
}
function infoMessage(msg) {
    return "⏺️ *AQUA*:  ```" + msg + "```"
}


module.exports = {
    successfullMessage,
    errorMessage,
    infoMessage
}
