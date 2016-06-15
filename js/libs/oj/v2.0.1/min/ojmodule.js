/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","knockout","promise"],function(b,f){b.Xr={};b.Xr.Gb={viewPath:"text!views/",viewSuffix:".html",modelPath:"viewModels/",initializeMethod:"initialize",disposeMethod:"dispose",activatedHandler:"handleActivated",attachedHandler:"handleAttached",detachedHandler:"handleDetached",bindingsAppliedHandler:"handleBindingsApplied",deactivatedHandler:"handleDeactivated",transitionCompletedHandler:"handleTransitionCompleted"};o_("ModuleBinding.defaults",b.Xr.Gb,b);(function(){function a(a,
d,e,g,h,k,l){var n=d.canAnimate;if(null==n||n.call(d,a)){var p,s;if(n=d.prepareAnimation.call(d,a))p=n.newViewParent,s=n.oldViewParent;var D=p||e;s&&s!==e?c(g,s):D===e&&k(null);D!==e&&f.virtualElements.setDomNodeChildren(D,[]);h(D);var r=Array.prototype.slice.call(D.childNodes),A=!1,z=function(){A||(A=!0,e!==D&&m(e,r))},F=k.bind(null,s);a.newViewParent=p;a.oldViewParent=s;a.oldViewNodes=g;a.removeOldView=F;a.insertNewView=z;var H=function(){F();z();l()};return d.animate.call(d,a).then(H,function(){H();
b.r.error("ojModule animation promise was rejected")})}}function d(a,b,c){b=b||a;var d=[];c&&a===b&&(c.parentNode.removeChild(c),d.push(c));f.virtualElements.setDomNodeChildren(b,d)}function c(a,b){a.forEach(function(a){b.appendChild(a)})}function e(a,b,c){if(a&&a[b]){var d={element:c[0],valueAccessor:c[1]};2<c.length&&(d.viewModel=c[2],3<c.length&&(d["boolean"===typeof c[3]?"fromCache":"cachedNodes"]=c[3]));return f.ignoreDependencies(a[b],a,[d])}}function g(a,c,d){if(null!=a&&(c=b.Xr.Gb[c],null!=
c&&a&&(c=a[c],"function"===typeof c))){var e=void 0;d&&(e={element:d[0],valueAccessor:d[1]},2<d.length&&(e["boolean"===typeof d[2]?"fromCache":"cachedNodes"]=d[2]));return f.ignoreDependencies(c,a,[e])}}function h(a,b,c){var d=[];for(a=f.virtualElements.firstChild(a);null!=a&&a!=c;a=a.nextSibling)a!=b&&d.push(a);return d}function k(a,b){var c=[],d=f.virtualElements.firstChild(a);l(d,b,function(a){c.push(a)});return c}function l(a,b,c){for(;null!=a;){var d=f.virtualElements.nextSibling(a),e=a.nodeType;
a===b||1!==e&&8!==e||c(a);a=d}}function m(a,b){for(var c=b.length-1;0<=c;c--)f.virtualElements.prepend(a,b[c])}function n(a,c){if(null!=b.Components)for(var d=0;d<a.length;d++)c?b.Components.Pm(a[d]):b.Components.fp(a[d])}function p(a){if("string"===typeof a)a=f.utils.parseHtmlFragment(a);else if(window.DocumentFragment?a instanceof DocumentFragment:a&&11===a.nodeType)a=f.utils.arrayPushAll([],a.childNodes);else if(Array.isArray(a))a=f.utils.arrayPushAll([],a);else throw"The View ("+a+") has an unsupported type";
return a}function r(a){return new Promise(function(b){require([a],function(a){b(a)},function(){throw Error("ojModule failed to load "+a);})})}function s(a){return a?new Promise(function(b){a.then(b,b)}):a}f.bindingHandlers.ojModule={init:function(q,t,x,w,v){function u(a){if(a!=E)throw Error("Promise cancelled because ojModule is fetching new View and ViewModel");}function y(a){g(a,"disposeMethod",[q,t])}var B,M,G={},D,E=-1,A,z;f.utils.domNodeDisposal.addDisposeCallback(q,function(){y(B);for(var a=
Object.keys(G),b=0;b<a.length;b++)y(G[a[b]].Wo)});8===q.nodeType&&(f.virtualElements.setDomNodeChildren(q,[]),z=q.nextSibling);f.computed(function(){E++;var x=0===E,w=f.utils.unwrapObservable,C=w(t()),P,Q,J,K,I,N,O,T;"string"===typeof C?P=C:(P=w(C.name),Q=w(C.viewName),J=w(C.params),K=w(C.viewModelFactory),I=w(C.createViewFunction),N=w(C.cacheKey),O=w(C.lifecycleListener),T=w(C.animation));var w=e(O,"activated",[q,t]),L,V,Z=null==N?null:G[N];if(null!=Z)delete G[N],L=Promise.resolve(Z.view),V=Promise.resolve(Z.Wo);
else if(null!=K&&(V=f.ignoreDependencies(K.createViewModel,K,[J,t])),null==V&&null!=P&&(V=r(b.Xr.Gb.modelPath+P)),null!=V&&(V=V.then(function(a,b){u(a);return b="function"===typeof b?new b(J):g(b,"initializeMethod",[q,t])||b}.bind(null,E)),null!=I&&(L=V.then(function(a,b){u(a);if(null==b)throw"createViewFunction option cannot be used when the ViewModel is null";var c=b[I];if(null==c)throw"function specified by the createViewFunction option was not found on the ViewModel";return c.call(b)}.bind(null,
E)))),null==L)if(Q=null==Q?P:Q,null!=Q)L=r(b.Xr.Gb.viewPath+Q+b.Xr.Gb.viewSuffix);else throw Error("View name must be specified");if(null==L)throw Error("ojModule is missing a View");var X;null!=V&&(X=V.then(function(a,b){u(a);return g(b,"activatedHandler",[q,t])}.bind(null,E)));Promise.all([L,V,w,X,M]).then(function(b,w){if(b==E){var u=w[0];if(null==u)throw"The module's View was resolved to null";var r=p(u),C=w[1],H=!1,K,L=h(q,A,z),I=k(q,A);null!=D&&(H=!0,K=L,A||(A=document.createElement("div"),
A.className="oj-helper-module-cache",f.virtualElements.prepend(q,A)));var P=!1,u=function(a){P||(P=!0,H?c(L,A):I.forEach(function(a){f.cleanNode(a)}),d(q,a||q,A),x||(e(O,"detached",[q,t,B,K]),g(B,"detachedHandler",[q,t,K]),e(O,"deactivated",[q,t,B]),g(B,"deactivatedHandler",[q,t])),H?(n(K,!1),G[D]={Wo:B,view:K}):y(B),B=C,D=N)},V=function(a){a=a||q;m(a,r);var b=null!=Z;b&&n(r,!0);e(O,"attached",[a,t,C,b]);g(C,"attachedHandler",[a,t,b]);if(!b){var c=v.createChildContext(C,void 0,function(a){a.$module=
C;a.$params=J});l(r[0],A,function(a){f.applyBindings(c,a)});e(O,"bindingsApplied",[a,t,C]);g(C,"bindingsAppliedHandler",[a,t])}},ga=function(){e(O,"transitionCompleted",[q,t,C]);g(C,"transitionCompletedHandler",[q,t])};if(null!=T){var ja=a({node:q,valueAccessor:t,isInitial:x,oldViewModel:B,newViewModel:C},T,q,L,V,u,ga);M=s(ja)}else M=void 0;M||(u(null),V(null),ga())}}.bind(null,E),function(a,c){a==E&&null!=c&&b.r.error(c)}.bind(null,E))},null,{disposeWhenNodeIsRemoved:q});return{controlsDescendantBindings:!0}}};
f.virtualElements.allowedBindings.ojModule=!0})()});