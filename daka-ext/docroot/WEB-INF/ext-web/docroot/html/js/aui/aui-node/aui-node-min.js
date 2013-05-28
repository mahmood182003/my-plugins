AUI.add("aui-node-base",function(p){var X=p.Lang,w=X.isArray,q=X.isFunction,H=X.isObject,j=X.isString,s=X.isUndefined,h=X.isValue,t=p.Array,v=p.Node,z=p.NodeList,W=p.getClassName,D=p.DOM._getRegExp,G=X.String.prefix,m=p.config,B=m.doc,o=m.win,I=v.prototype,e=z.prototype,n="",N=[n,n],L="helper",r="offset",V=W(L,"force",r),a=W(L,"hidden"),S=W(L,"unselectable"),k="childNodes",M="createDocumentFragment",y="inner",R="innerHTML",b="nextSibling",C="none",i="outer",l="parentNode",x="region",F="script",K=false,Q="value",c={b:"borderBottomWidth",l:"borderLeftWidth",r:"borderRightWidth",t:"borderTopWidth"},U={b:"marginBottom",l:"marginLeft",r:"marginRight",t:"marginTop"},d={b:"paddingBottom",l:"paddingLeft",r:"paddingRight",t:"paddingTop"},g=function(A,Y){return"#"+G(A,Y);},E=function(Y,A){return A.replace(D("(#|\\[id=(\\\"|\\'))(?!"+Y+")","g"),"$1"+Y);};var T=B.createElement("div");T.style.display="none";T.innerHTML="   <table></table>&nbsp;";if(T.attachEvent&&T.fireEvent){T.attachEvent("onclick",function(){K=true;T.detachEvent("onclick",arguments.callee);});T.cloneNode(true).fireEvent("onclick");}var f=!T.getElementsByTagName("tbody").length;var u=/^\s+/,P=/=([^=\x27\x22>\s]+\/)>/g,O=/<([\w:]+)/;T=null;v.cssId=g;v.formatSelectorNS=E;p.mix(I,{allNS:function(Z,Y){var A=this;return A.all(E(Z,Y));},ancestors:function(Y){var A=this;var aa=[];var ab=A.getDOM();while(ab&&ab.nodeType!==9){if(ab.nodeType===1){aa.push(ab);}ab=ab.parentNode;}var Z=new p.all(aa);if(Y){Z=Z.filter(Y);}return Z;},ancestorsByClassName:function(aa){var A=this;var Z=[];var Y=new RegExp("\\b"+aa+"\\b");var ab=A.getDOM();while(ab&&ab.nodeType!==9){if(ab.nodeType===1&&Y.test(ab.className)){Z.push(ab);}ab=ab.parentNode;}return p.all(Z);},appendTo:function(Y){var A=this;p.one(Y).append(A);return A;},attr:function(Y,ac){var A=this;if(!s(ac)){var ab=A.getDOM();if(Y in ab){A.set(Y,ac);}else{A.setAttribute(Y,ac);}return A;}else{if(H(Y)){for(var Z in Y){A.attr(Z,Y[Z]);}return A;}var aa=A.get(Y);if(!X.isValue(aa)){aa=A.getAttribute(Y);}return aa;}},clone:(function(){var A;if(K){A=function(){var Y=this.getDOM();var aa;if(Y.nodeType!=3){var Z=this.outerHTML();Z=Z.replace(P,'="$1">').replace(u,n);aa=v.create(Z);}else{aa=p.one(Y.cloneNode());}return aa;};}else{A=function(){return this.cloneNode(true);};}return A;})(),center:function(ab){var Y=this,Z=Y.get(x),A,ac;if(w(ab)){A=ab[0];ac=ab[1];}else{var aa;if(H(ab)&&!p.instanceOf(ab,p.Node)){aa=ab;}else{aa=(p.one(ab)||p.getBody()).get(x);}A=aa.left+(aa.width/2);ac=aa.top+(aa.height/2);}Y.setXY([A-(Z.width/2),ac-(Z.height/2)]);},empty:function(){var A=this;A.all(">*").remove().purge();var Y=v.getDOMNode(A);while(Y.firstChild){Y.removeChild(Y.firstChild);}return A;},getDOM:function(){var A=this;return v.getDOMNode(A);},getBorderWidth:function(Y){var A=this;return A._getBoxStyleAsNumber(Y,c);},getCenterXY:function(){var A=this;var Y=A.get(x);return[(Y.left+Y.width/2),(Y.top+Y.height/2)];},getMargin:function(Y){var A=this;return A._getBoxStyleAsNumber(Y,U);},getPadding:function(Y){var A=this;return A._getBoxStyleAsNumber(Y,d);},guid:function(Z){var Y=this;var A=Y.get("id");if(!A){A=p.stamp(Y);Y.set("id",A);}return A;},hover:function(Z,Y){var A=this;var aa;var ab=A._defaultHoverOptions;if(H(Z,true)){aa=Z;aa=p.mix(aa,ab);Z=aa.over;Y=aa.out;}else{aa=p.mix({over:Z,out:Y},ab);}A._hoverOptions=aa;aa.overTask=p.debounce(A._hoverOverTaskFn,null,A);aa.outTask=p.debounce(A._hoverOutTaskFn,null,A);return new p.EventHandle([A.on(aa.overEventType,A._hoverOverHandler,A),A.on(aa.outEventType,A._hoverOutHandler,A)]);},html:function(){var A=arguments,Y=A.length;if(Y){this.set(R,A[0]);}else{return this.get(R);}return this;},oneNS:function(Z,Y){var A=this;return A.one(E(Z,Y));},outerHTML:function(){var A=this;var Z=A.getDOM();if("outerHTML" in Z){return Z.outerHTML;}var Y=v.create("<div></div>").append(this.clone());try{return Y.html();}catch(aa){}finally{Y=null;}},placeAfter:function(Y){var A=this;return A._place(Y,A.get(b));},placeBefore:function(Y){var A=this;return A._place(Y,A);},prependTo:function(Y){var A=this;p.one(Y).prepend(A);return A;},radioClass:function(Y){var A=this;var ad=A.siblings();if(j(Y)){ad.removeClass(Y);A.addClass(Y);}else{if(w(Y)){var ac=ad.getDOM();var ab=D("(?:^|\\s+)(?:"+Y.join("|")+")(?=\\s+|$)","g");var aa;for(var Z=ac.length-1;Z>=0;Z--){aa=ac[Z];aa.className=aa.className.replace(ab,"");}A.addClass(Y.join(" "));}}return A;},resetId:function(Y){var A=this;A.attr("id",p.guid(Y));return A;},selectText:function(ad,Z){var A=this;var Y=A.getDOM();var ab=A.val().length;Z=h(Z)?Z:ab;ad=h(ad)?ad:0;try{if(Y.setSelectionRange){Y.setSelectionRange(ad,Z);}else{if(Y.createTextRange){var aa=Y.createTextRange();aa.moveStart("character",ad);aa.moveEnd("character",Z-ab);aa.select();}else{Y.select();}}if(Y!=B.activeElement){Y.focus();}}catch(ac){}return A;},selectable:function(){var A=this;A.getDOM().unselectable="off";A.detach("selectstart");A.setStyles({"MozUserSelect":n,"KhtmlUserSelect":n});A.removeClass(S);return A;},swallowEvent:function(Y,Z){var A=this;var aa=function(ab){ab.stopPropagation();if(Z){ab.preventDefault();ab.halt();}return false;};if(w(Y)){t.each(Y,function(ab){A.on(ab,aa);});return this;}else{A.on(Y,aa);}return A;},text:function(Z){var A=this;var Y=A.getDOM();if(!s(Z)){Z=p.DOM._getDoc(Y).createTextNode(Z);return A.empty().append(Z);}return A._getText(Y.childNodes);},toggle:function(Y,Z){var A=this;A._toggleView.apply(A,arguments);return A;},unselectable:function(){var A=this;A.getDOM().unselectable="on";A.swallowEvent("selectstart",true);A.setStyles({"MozUserSelect":C,"KhtmlUserSelect":C});A.addClass(S);return A;},val:function(Y){var A=this;if(s(Y)){return A.get(Q);}else{return A.set(Q,Y);}},_getBoxStyleAsNumber:function(ab,ae){var A=this;var ad=ab.match(/\w/g);var ac=0;var aa;var Y;for(var Z=ad.length-1;Z>=0;Z--){Y=ad[Z];aa=0;if(Y){aa=parseFloat(A.getComputedStyle(ae[Y]));aa=Math.abs(aa);ac+=aa||0;}}return ac;},_getText:function(ac){var A=this;var aa=ac.length;var Z;var ab=[];for(var Y=0;Y<aa;
Y++){Z=ac[Y];if(Z&&Z.nodeType!=8){if(Z.nodeType!=1){ab.push(Z.nodeValue);}if(Z.childNodes){ab.push(A._getText(Z.childNodes));}}}return ab.join(n);},_hoverOutHandler:function(Z){var A=this;var Y=A._hoverOptions;Y.outTask.delay(Y.outDelay,Z);},_hoverOverHandler:function(Z){var A=this;var Y=A._hoverOptions;Y.overTask.delay(Y.overDelay,Z);},_hoverOutTaskFn:function(Z){var A=this;var Y=A._hoverOptions;Y.overTask.cancel();Y.out.apply(Y.context||Z.currentTarget,arguments);},_hoverOverTaskFn:function(Z){var A=this;var Y=A._hoverOptions;Y.outTask.cancel();Y.over.apply(Y.context||Z.currentTarget,arguments);},_place:function(Z,Y){var A=this;var aa=A.get(l);if(aa){if(j(Z)){Z=v.create(Z);}aa.insertBefore(Z,Y);}return A;},_defaultHoverOptions:{overEventType:"mouseenter",outEventType:"mouseleave",overDelay:0,outDelay:0,over:X.emptyFn,out:X.emptyFn}},true);I.__show=I._show;I.__hide=I._hide;I.__isHidden=I._isHidden;I._isHidden=function(){var A=this;return I.__isHidden.call(A)||A.hasClass(A._hideClass||a);};I._hide=function(){var A=this;A.addClass(A._hideClass||a);return A;};I._show=function(){var A=this;A.removeClass(A._hideClass||a);return A;};p.each(["Height","Width"],function(aa,A,ab){var Z=A?"lr":"tb";var Y=aa.toLowerCase();I[Y]=function(ad){var ac=this;var ae=ac;if(s(ad)){var ag=ac._node;var ai;if(ag){if((!ag.tagName&&ag.nodeType===9)||ag.alert){ai=ac.get(x)[Y];}else{ai=ac.get(r+aa);var af={};var ah=ag.style;if(!ai){ac.addClass(V);ai=ac.get(r+aa);ac.removeClass(V);}if(ai){ai-=(ac.getPadding(Z)+ac.getBorderWidth(Z));}}}ae=ai;}else{ac.setStyle(Y,ad);}return ae;};I[y+aa]=function(){var ac=this;return ac[Y]()+ac.getPadding(Z);};I[i+aa]=function(ag){var ac=this;var ad=ac[y+aa]();var af=ac.getBorderWidth(Z);var ae=ad+af;if(ag){ae+=ac.getMargin(Z);}return ae;};});if(!f){p.DOM._ADD_HTML=p.DOM.addHTML;p.DOM.addHTML=function(ab,aa,A){var ac=(ab.nodeName&&ab.nodeName.toLowerCase())||n;var Y=n;if(!s(aa)){if(j(aa)){Y=(O.exec(aa)||N)[1];}else{if(aa.nodeType&&aa.nodeType==11&&aa.childNodes.length){Y=aa.childNodes[0].nodeName;}else{if(aa.nodeName){Y=aa.nodeName;}}}Y=Y&&Y.toLowerCase();}if(ac=="table"&&Y=="tr"){ab=ab.getElementsByTagName("tbody")[0]||ab.appendChild(ab.ownerDocument.createElement("tbody"));var Z=((A&&A.nodeName)||n).toLowerCase();if(Z=="tbody"&&A.childNodes.length>0){A=A.firstChild;}}return p.DOM._ADD_HTML(ab,aa,A);};}z.importMethod(I,["after","appendTo","attr","before","empty","hover","html","innerHeight","innerWidth","outerHeight","outerHTML","outerWidth","prepend","prependTo","purge","selectText","selectable","text","toggle","unselectable","val"]);p.mix(e,{all:function(Z){var Y=this;var ad=[];var aa=Y._nodes;var ac=aa.length;var A;for(var ab=0;ab<ac;ab++){A=p.Selector.query(Z,aa[ab]);if(A&&A.length){ad.push.apply(ad,A);}}ad=t.unique(ad);return p.all(ad);},allNS:function(Z,Y){var A=this;return A.all(E(Z,Y));},first:function(){var A=this;return A.item(0);},getDOM:function(){var A=this;return z.getDOMNodes(this);},last:function(){var A=this;return A.item(A._nodes.length-1);},one:function(Y){var A=this;var ab=null;var Z=A._nodes;var ac=Z.length;for(var aa=0;aa<ac;aa++){ab=p.Selector.query(Y,Z[aa],true);if(ab){ab=p.one(ab);break;}}return ab;},oneNS:function(Z,Y){var A=this;return A.one(E(Z,Y));}});e.__filter=e.filter;e.filter=function(aa,Z){var A=this;var ab;if(q(aa)){var Y=[];A.each(function(ad,ac,ae){if(aa.call(Z||ad,ad,ac,ae)){Y.push(ad._node);}});ab=p.all(Y);}else{ab=e.__filter.call(A,aa);}return ab;};p.mix(z,{create:function(Y){var A=p.getDoc().invoke(M);return A.append(Y).get(k);}});p.mix(p,{getBody:function(){var A=this;if(!A._bodyNode){A._bodyNode=p.one(B.body);}return A._bodyNode;},getDoc:function(){var A=this;if(!A._documentNode){A._documentNode=p.one(B);}return A._documentNode;},getWin:function(){var A=this;if(!A._windowNode){A._windowNode=p.one(o);}return A._windowNode;}});p.queryNS=function(Z,A,Y){return p[Y||"one"](E(Z,A));};p.oneNS=p.queryNS;p.allNS=function(Y,A){return p.queryNS(Y,A,"all");};p.byIdNS=function(A,Y){return p.one(g(A,Y));};var J=z.addMethod;t.each(["hide","show"],function(Y,A,Z){J(Y,function(){return this[Y].apply(this,arguments);});});},"1.5.0",{requires:["array-extras","aui-base-lang","aui-classnamemanager","node"]});AUI.add("aui-node-html5",function(a){if(a.UA.ie){var c=a.namespace("HTML5"),b=a.DOM._create;if(!c._fragHTML5Shived){c._fragHTML5Shived=YUI.AUI.html5shiv(a.config.doc.createDocumentFragment());}a.mix(c,{IECreateFix:function(f,e){var d=c._fragHTML5Shived;d.appendChild(f);f.innerHTML=e;d.removeChild(f);return f;},_doBeforeCreate:function(f,h,e){var g=b.apply(this,arguments);var d=c.IECreateFix(g,f);return new a.Do.Halt(null,d);}});a.Do.before(c._doBeforeCreate,a.DOM,"_create",a.DOM);}},"1.5.0",{requires:["collection","aui-base"]});AUI.add("aui-node-html5-print",function(i){var f=i.config,y=f.doc,h=f.win,v=i.UA,o=v.ie,r=function(){return h.AUI_HTML5_IE===false;};if(!o||o>=9||r()){return;}var K=[],q="aui-printfix",n="aui-printfix-",k=h.location,I=k.protocol+"//"+k.host,c=YUI.AUI,J=y.documentElement,z=c.HTML5_ELEMENTS,l=z.length,s=z.join("|"),D=new RegExp("<(/?):("+s+")","gi"),p=new RegExp("("+s+")","gi"),a=new RegExp("\\b("+s+")\\b","i"),G=/print|all/,H=new RegExp("(^|[^\\n{}]*?\\s)("+s+").*?{([^}]*)}","gim"),j=new RegExp("<(/*)("+s+")","gi"),E="."+n+"$1",L="all",t=" ",g="",b="{",F="}",d="https",B="url(",C=B+I,m="<$1$2",e="<$1font";var u=c.html5shiv,x=function(A){return A&&(A+g!==undefined);};u(y);var w=function(){var N=function(){if(r()){M();}else{w.onAfterPrint();}};var A=function(){if(r()){M();}else{w.onBeforePrint();}};var M=function(){h.detachEvent("onafterprint",N);h.detachEvent("onbeforeprint",A);};var O=function(){h.attachEvent("onafterprint",N);h.attachEvent("onbeforeprint",A);};O();w.destroy=M;w.init=O;};i.mix(w,{onAfterPrint:function(){var A=this;A.restoreHTML();var M=A._getStyleSheet();M.styleSheet.cssText=g;},onBeforePrint:function(){var A=this;var N=A._getStyleSheet();var M=A._getAllCSSText();N.styleSheet.cssText=A.parseCSS(M);A.writeHTML();},parseCSS:function(N){var A=this;
var M=g;var O;var P=N.match(H);if(P){M=P.join("\n").replace(p,E);}return M;},restoreHTML:function(){var A=this;var N=A._getBodyClone();var M=A._getBodyEl();N.innerHTML=g;J.removeChild(N);J.appendChild(M);},writeHTML:function(){var Z=this;var Y=-1;var X;var T=Z._getBodyEl();var Q;var S;var aa;var P;var U;var V=[];while(++Y<l){Q=z[Y];aa=y.getElementsByTagName(Q);P=aa.length;X=-1;while(++X<P){U=aa[X];S=U.className;if(S.indexOf(n)==-1){V[0]=n+Q;V[1]=S;U.className=V.join(t);}}}var A=Z._getDocFrag();var N=Z._getBodyClone();A.appendChild(T);J.appendChild(N);N.className=T.className;N.id=T.id;if(v.secure){var R=T.getElementsByTagName("*");var O=T.style;var W;var M;O.display="none";for(var Y=0,ac=R.length;Y<ac;Y++){W=R[Y].style;M=W.backgroundImage;if(M&&M.indexOf(B)>-1&&M.indexOf(d)==-1){W.backgroundImage=M.replace(B,C);}}O.display=g;}var ab=T.cloneNode(true).innerHTML;ab=ab.replace(D,m).replace(j,e);N.innerHTML=ab;},_getAllCSSText:function(){var S=this;var O=[];var R=S._getAllStyleSheets(y.styleSheets,L);var Q;var M;for(var P=0;styleSheet=R[P];P++){var T=styleSheet.rules;if(T&&T.length){for(var N=0,A=T.length;N<A;N++){Q=T[N];if(!Q.href){M=S._getCSSTextFromRule(Q);O.push(M);}}}}return O.join(t);},_getCSSTextFromRule:function(R){var A=this;var N=g;var Q=R.style;var P;var O;var M;if(Q&&(O=Q.cssText)&&(M=R.selectorText)&&a.test(M)){K.length=0;K.push(M,b,O,F);N=K.join(t);}return N;},_getAllStyleSheets:function(R,U,M,O){var S=this;M=M||1;O=O||[];if(x(R)){var A=R.imports;U=R.mediaType||U;if(G.test(U)){var N;if(M<=3&&x(A)&&A.length){for(var P=0,N=A.length;P<N;P++){S._getAllStyleSheets(A[P],U,M+1,O);}}else{if(R.length){for(var P=0,N=R.length;P<N;P++){S._getAllStyleSheets(R[P],U,M,O);}}else{var T=R.rules;var Q;if(T&&T.length){for(var P=0,N=T.length;P<N;P++){Q=T[P].styleSheet;if(Q){S._getAllStyleSheets(Q,U,M,O);}}}}}if(!R.disabled&&R.rules){O.push(R);}}}U=L;return O;},_getBodyEl:function(){var A=this;var M=A._bodyEl;if(!M){M=y.body;A._bodyEl=M;}return M;},_getBodyClone:function(){var A=this;var M=A._bodyClone;if(!M){M=y.createElement("body");A._bodyClone=M;}return M;},_getDocFrag:function(){var A=this;var M=A._docFrag;if(!M){M=y.createDocumentFragment();u(M);A._docFrag=M;}return M;},_getStyleSheet:function(){var A=this;var N=A._styleSheet;if(!N){N=y.createElement("style");var M=y.documentElement.firstChild;M.insertBefore(N,M.firstChild);N.media="print";N.className=q;A._styleSheet=N;}return N;}});i.namespace("HTML5").PrintFix=w;w();},"1.5.0",{requires:["aui-node-html5"]});AUI.add("aui-node",function(a){},"1.5.0",{skinnable:false,use:["aui-node-base","aui-node-html5","aui-node-html5-print"]});