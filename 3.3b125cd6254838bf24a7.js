(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{45:function(t,e){t.exports='<ul class=tag-list> {{#foreach tags}} <a class="tag-default tag-pill tag-outline" data-bind="path: path"> {{text}} </a> {{/foreach}} {{#if numMore}} and {{numMore}} more... {{/if}} </ul>'},47:function(t,e,r){"use strict";var n=r(1);function i(t){return"boolean"==typeof t}function o(t){return!isNaN(parseFloat(t))}function u(t){return void 0===t}function a(t){return Object.keys(t).map(function(e){return[e,t[e]]})}function s(t,e){for(var r={},n=0,i=a(t);n<i.length;n++){var o=i[n],u=o[0],s=o[1];e(s)||(r[u]=s)}return r}var c=function(){function t(e,r){this._group=r,u(t._raw[this._group])?(t._raw[this._group]={},t._refs[this._group]=1):t._refs[this._group]++,this.set(e)}return t.prototype.set=function(e){var r=this,i=Object.assign({},t.getDefaults(e)),o=this._group,s=t.fromQS(o);a(e).forEach(function(e){var n=e[0],a=e[1],c=void 0===a?{}:a;if(r[n]=t._raw[o][n],u(r[n])){var f=i[n],p=c.coerce||function(t){return t},l=u(s[n])?c.initial:s[n];r[n]=t._raw[o][n]=t.createQueryParam(o,n,f,l,p)}else r[n].set(c)}),n.tasks.runEarly()},t.prototype.toJS=function(){return s(n.toJS(t._raw[this._group]),u)},t.prototype.toString=function(){return t.stringify(this.toJS())},t.prototype.asObservable=function(){var t=this;return n.pureComputed(function(){return t.toJS()})},t.prototype.clear=function(){var e=this;Object.keys(t._raw[this._group]).forEach(function(r){return t._raw[e._group][r].clear()})},t.prototype.dispose=function(){if(0==--t._refs[this._group]){var e=Object.assign({},t.fromQS(),t.getCleanQuery());delete e[this._group],t.writeQueryString(e),delete t._raw[this._group]}},t.parse=function(e){return t._parser.parse(e)},t.stringify=function(e){return t._parser.stringify(e)},t.create=function(e,r){return new t(e,r)},t.setParser=function(e){t._parser=e},t.getQueryString=function(){var t=/\?([^#]*)/.exec(location.search+location.hash);return t?t[1]:""},t.fromQS=function(t){var e=this.parse(this.getQueryString());return(u(t)?e:e[t])||{}},t.getCleanQuery=function(){for(var e={},r=0,c=a(t._raw);r<c.length;r++){var f=c[r],p=f[0],l=f[1];e[p]=n.toJS(s(l,function(t){return t.isDefault()||u(t())||0===t().length&&!o(t())&&!i(t())}))}return e[void 0]&&(Object.assign(e,e[void 0]),delete e[void 0]),e},t.writeQueryString=function(e){e||(e=this.getCleanQuery());var r,n=t.stringify(e),i=location.pathname+location.search+location.hash;if(i.indexOf("#!")>-1)r=i.replace(/(?:\?[^#]+|$)/,n?"?"+n:"");else{var o=/([^?#]*)/.exec(i)[1],u=/(#[^!]*)/.exec(i);r=o,n&&(r+="?"+n),u&&(r+=u[1])}history.replaceState(history.state,document.title,r)},t.queueQueryStringWrite=function(){var e=this;return this._queuedUpdate||(this._queuedUpdate=new Promise(function(r){n.tasks.schedule(function(){t.writeQueryString(),r(),e._queuedUpdate=!1})})),this._queuedUpdate},t.createQueryParam=function(e,r,i,o,a){var s=this,c=n.observable(n.toJS(i)),f=n.observable(u(o)?c():o),p=n.pureComputed(function(){return l()===c()}),l=n.pureComputed({read:function(){return f()},write:function(e){u(e)&&(e=c()),a&&(e=a(e)),f(e),t.queueQueryStringWrite().catch(function(t){return console.error("[@profiscience/knockout-contrib-querystring] error queueing write")})}});return Object.assign(l,{isDefault:p,set:function(t){s.isParamConfigObject(t)?((t=t).coerce&&(a=t.coerce),(p()||u(l())||!u(t.initial))&&l(u(t.initial)?t.default:t.initial),t.default&&c(t.default)):(t=t,(p()||u(l()))&&l(t),c(t))},clear:function(){return l(c())}}),l},t.isParamConfigObject=function(t){return t&&(t.default||t.initial||t.coerce)},t.getDefaults=function(t){var e=this,r={};return a(t).forEach(function(t){var n=t[0],i=t[1];return r[n]=e.isParamConfigObject(i)?i.default:i}),r},t._raw={},t._refs={},t._parser={parse:function(t){return JSON.parse(decodeURIComponent(t||"{}"))},stringify:function(t){return"{}"===JSON.stringify(t)?"":encodeURIComponent(JSON.stringify(t))}},t}();e.a=c},50:function(t,e,r){"use strict";r.r(e);var n=r(45),i=r.n(n),o=r(47);class u{constructor(t){this.numMore=0,this.tags=function(t,e){if(!e||t.length<e)return t;const r=[];for(let n=0;n<e;n++)r.push(t[n]);return r}(t.tags,t.limit).map(t=>({text:t,path:`//?${o.a.stringify({feed:"tag",tag:t})}`})),t.limit&&t.tags.length>t.limit&&(this.numMore=t.tags.length-t.limit)}}r.d(e,"template",function(){return i.a}),r.d(e,"viewModel",function(){return u})}}]);