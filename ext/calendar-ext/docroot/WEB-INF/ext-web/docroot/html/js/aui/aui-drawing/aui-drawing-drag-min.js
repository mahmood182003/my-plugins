AUI.add("aui-drawing-drag",function(b){var f=b.Lang,c=b.config.doc,d=b.Drawing,a=d.Element,h=a.prototype,e={standAlone:true},j={mousedown:"gesturemovestart",mousemove:"gesturemove",mouseup:"gesturemoveend"},g="createTouch" in c;var i=d.Drag={drags:[]};a._getEventType=function(k){return j[k]||k;};a._getEventConfig=function(k,l){return j[l]?e:null;};i.dragMove=function(p){var k=p.clientX;var r=p.clientY;var m;var o=i.drags;var l=o.length;while(l--){m=o[l];if(g){var n=p.touches.length;var q;while(n--){q=p.touches[n];if(q.identifier==m.el._drag.id){k=q.clientX;r=q.clientY;(p.originalEvent?p.originalEvent:p).preventDefault();break;}}}else{p.preventDefault();}if(m.move){m.move.call(m.el,k-m.el._drag.x,r-m.el._drag.y,k,r);}}};i.dragUp=function(){i._dragMoveHandle.detach();i._dragUpHandle.detach();var m=i.drags;var l=m.length;var k;while(l--){k=m[l];k.el._drag={};if(k.end){k.end.call(k.el);}}i.drags=[];};h.drag=function(l,n,m){var k=this;k._drag={};k.on("mousedown",function(r){var q=this;(r.originalEvent||r).preventDefault();q._drag.x=r.clientX;q._drag.y=r.clientY;q._drag.id=r.identifier;if(n){n.call(q,r.clientX,r.clientY);}if(!i.drags.length){var o=a._getEventType("mousemove");var p=a._getEventType("mouseup");i._dragMoveHandle=b.on(o,i.dragMove,c,a._getEventConfig(o,"mousemove"));i._dragUpHandle=b.on(p,i.dragUp,c,a._getEventConfig(p,"mouseup"));}i.drags.push({el:this,move:l,end:m});});return k;};h.undrag=function(l,p,o){var k=this;var n=i.drags;var m=n.length;while(m--){n[m].el==k&&(n[m].move==l&&n[m].end==o)&&n.splice(m,1);if(!n.length){i._dragMoveHandle.detach();i._dragUpHandle.detach();}}};d.Set.addMethod(["drag","undrag"]);},"1.5.0",{requires:["aui-drawing-base","event-gestures"]});