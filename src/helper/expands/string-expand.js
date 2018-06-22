String.prototype.trim = function(s = "\\s") {
    let reg = new RegExp("^(" + s + ")+|(" + s + ")+$", "gm");
    return this.replace(reg, "");
};
String.prototype.trimStart = function(s = "\\s") {
    let reg = new RegExp("^(" + s + ")+", "gm");
    return this.replace(reg, "");
};
String.prototype.trimEnd = function(s = "\\s") {
    let reg = new RegExp("(" + s + ")+$", "gm");
    return this.replace(reg, "");
};
