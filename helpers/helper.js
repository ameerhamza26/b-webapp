exports.setMessageForToast = function(res,message, icon, heading) {
    res.cookie('message', message)
    res.cookie('icon', icon)
    res.cookie('heading', heading)
}