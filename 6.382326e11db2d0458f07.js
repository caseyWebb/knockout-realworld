(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{56:function(t,o){t.exports='{{#if currentUser.loggedIn}} <form class="card comment-form" data-bind="event.submit: post"> <div class=card-block> <textarea class=form-control placeholder="Write a comment..." rows=3 data-bind="value: body">\n      </textarea> </div> <div class=card-footer> <img src={{currentUser.image}} class=comment-author-img /> <button class="btn btn-sm btn-primary"> Post Comment </button> </div> </form> {{/if}} {{#ifnot currentUser.loggedIn}} <div class=alert> <a data-bind="path: \'//login\'">Sign in</a> or <a data-bind="path: \'//register\'">Sign up</a> to post a comment </div> {{/ifnot}}'},68:function(t,o,n){"use strict";n.r(o);var e=n(56),s=n.n(e),a=n(5),r=n(9);class i extends a.e{constructor(t){super(),this.currentUser=r.a,this.body=ko.observable(""),this.comments=t.comments}async post(){await this.comments.postComment({body:this.body()}),this.body("")}}n.d(o,"template",function(){return s.a}),n.d(o,"viewModel",function(){return i})}}]);