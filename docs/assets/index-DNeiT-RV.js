(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();function qt(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var J={},ce,Ge;function Lt(){return Ge||(Ge=1,ce=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ce}var le={},F={},ze;function V(){if(ze)return F;ze=1;let i;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return F.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},F.getSymbolTotalCodewords=function(n){return t[n]},F.getBCHDigit=function(r){let n=0;for(;r!==0;)n++,r>>>=1;return n},F.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');i=n},F.isKanjiModeEnabled=function(){return typeof i<"u"},F.toSJIS=function(n){return i(n)},F}var ue={},Ue;function Me(){return Ue||(Ue=1,(function(i){i.L={bit:1},i.M={bit:0},i.Q={bit:3},i.H={bit:2};function t(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"l":case"low":return i.L;case"m":case"medium":return i.M;case"q":case"quartile":return i.Q;case"h":case"high":return i.H;default:throw new Error("Unknown EC Level: "+r)}}i.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},i.from=function(n,e){if(i.isValid(n))return n;try{return t(n)}catch{return e}}})(ue)),ue}var de,Fe;function Dt(){if(Fe)return de;Fe=1;function i(){this.buffer=[],this.length=0}return i.prototype={get:function(t){const r=Math.floor(t/8);return(this.buffer[r]>>>7-t%8&1)===1},put:function(t,r){for(let n=0;n<r;n++)this.putBit((t>>>r-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),t&&(this.buffer[r]|=128>>>this.length%8),this.length++}},de=i,de}var fe,Oe;function kt(){if(Oe)return fe;Oe=1;function i(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return i.prototype.set=function(t,r,n,e){const o=t*this.size+r;this.data[o]=n,e&&(this.reservedBit[o]=!0)},i.prototype.get=function(t,r){return this.data[t*this.size+r]},i.prototype.xor=function(t,r,n){this.data[t*this.size+r]^=n},i.prototype.isReserved=function(t,r){return this.reservedBit[t*this.size+r]},fe=i,fe}var ge={},Ve;function Gt(){return Ve||(Ve=1,(function(i){const t=V().getSymbolSize;i.getRowColCoords=function(n){if(n===1)return[];const e=Math.floor(n/7)+2,o=t(n),s=o===145?26:Math.ceil((o-13)/(2*e-2))*2,c=[o-7];for(let a=1;a<e-1;a++)c[a]=c[a-1]-s;return c.push(6),c.reverse()},i.getPositions=function(n){const e=[],o=i.getRowColCoords(n),s=o.length;for(let c=0;c<s;c++)for(let a=0;a<s;a++)c===0&&a===0||c===0&&a===s-1||c===s-1&&a===0||e.push([o[c],o[a]]);return e}})(ge)),ge}var he={},He;function zt(){if(He)return he;He=1;const i=V().getSymbolSize,t=7;return he.getPositions=function(n){const e=i(n);return[[0,0],[e-t,0],[0,e-t]]},he}var me={},je;function Ut(){return je||(je=1,(function(i){i.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};i.isValid=function(e){return e!=null&&e!==""&&!isNaN(e)&&e>=0&&e<=7},i.from=function(e){return i.isValid(e)?parseInt(e,10):void 0},i.getPenaltyN1=function(e){const o=e.size;let s=0,c=0,a=0,u=null,l=null;for(let m=0;m<o;m++){c=a=0,u=l=null;for(let g=0;g<o;g++){let d=e.get(m,g);d===u?c++:(c>=5&&(s+=t.N1+(c-5)),u=d,c=1),d=e.get(g,m),d===l?a++:(a>=5&&(s+=t.N1+(a-5)),l=d,a=1)}c>=5&&(s+=t.N1+(c-5)),a>=5&&(s+=t.N1+(a-5))}return s},i.getPenaltyN2=function(e){const o=e.size;let s=0;for(let c=0;c<o-1;c++)for(let a=0;a<o-1;a++){const u=e.get(c,a)+e.get(c,a+1)+e.get(c+1,a)+e.get(c+1,a+1);(u===4||u===0)&&s++}return s*t.N2},i.getPenaltyN3=function(e){const o=e.size;let s=0,c=0,a=0;for(let u=0;u<o;u++){c=a=0;for(let l=0;l<o;l++)c=c<<1&2047|e.get(u,l),l>=10&&(c===1488||c===93)&&s++,a=a<<1&2047|e.get(l,u),l>=10&&(a===1488||a===93)&&s++}return s*t.N3},i.getPenaltyN4=function(e){let o=0;const s=e.data.length;for(let a=0;a<s;a++)o+=e.data[a];return Math.abs(Math.ceil(o*100/s/5)-10)*t.N4};function r(n,e,o){switch(n){case i.Patterns.PATTERN000:return(e+o)%2===0;case i.Patterns.PATTERN001:return e%2===0;case i.Patterns.PATTERN010:return o%3===0;case i.Patterns.PATTERN011:return(e+o)%3===0;case i.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(o/3))%2===0;case i.Patterns.PATTERN101:return e*o%2+e*o%3===0;case i.Patterns.PATTERN110:return(e*o%2+e*o%3)%2===0;case i.Patterns.PATTERN111:return(e*o%3+(e+o)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}i.applyMask=function(e,o){const s=o.size;for(let c=0;c<s;c++)for(let a=0;a<s;a++)o.isReserved(a,c)||o.xor(a,c,r(e,a,c))},i.getBestMask=function(e,o){const s=Object.keys(i.Patterns).length;let c=0,a=1/0;for(let u=0;u<s;u++){o(u),i.applyMask(u,e);const l=i.getPenaltyN1(e)+i.getPenaltyN2(e)+i.getPenaltyN3(e)+i.getPenaltyN4(e);i.applyMask(u,e),l<a&&(a=l,c=u)}return c}})(me)),me}var Z={},Je;function vt(){if(Je)return Z;Je=1;const i=Me(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Z.getBlocksCount=function(e,o){switch(o){case i.L:return t[(e-1)*4+0];case i.M:return t[(e-1)*4+1];case i.Q:return t[(e-1)*4+2];case i.H:return t[(e-1)*4+3];default:return}},Z.getTotalCodewordsCount=function(e,o){switch(o){case i.L:return r[(e-1)*4+0];case i.M:return r[(e-1)*4+1];case i.Q:return r[(e-1)*4+2];case i.H:return r[(e-1)*4+3];default:return}},Z}var pe={},Q={},Ke;function Ft(){if(Ke)return Q;Ke=1;const i=new Uint8Array(512),t=new Uint8Array(256);return(function(){let n=1;for(let e=0;e<255;e++)i[e]=n,t[n]=e,n<<=1,n&256&&(n^=285);for(let e=255;e<512;e++)i[e]=i[e-255]})(),Q.log=function(n){if(n<1)throw new Error("log("+n+")");return t[n]},Q.exp=function(n){return i[n]},Q.mul=function(n,e){return n===0||e===0?0:i[t[n]+t[e]]},Q}var Ye;function Ot(){return Ye||(Ye=1,(function(i){const t=Ft();i.mul=function(n,e){const o=new Uint8Array(n.length+e.length-1);for(let s=0;s<n.length;s++)for(let c=0;c<e.length;c++)o[s+c]^=t.mul(n[s],e[c]);return o},i.mod=function(n,e){let o=new Uint8Array(n);for(;o.length-e.length>=0;){const s=o[0];for(let a=0;a<e.length;a++)o[a]^=t.mul(e[a],s);let c=0;for(;c<o.length&&o[c]===0;)c++;o=o.slice(c)}return o},i.generateECPolynomial=function(n){let e=new Uint8Array([1]);for(let o=0;o<n;o++)e=i.mul(e,new Uint8Array([1,t.exp(o)]));return e}})(pe)),pe}var ve,Qe;function Vt(){if(Qe)return ve;Qe=1;const i=Ot();function t(r){this.genPoly=void 0,this.degree=r,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(n){this.degree=n,this.genPoly=i.generateECPolynomial(this.degree)},t.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const e=new Uint8Array(n.length+this.degree);e.set(n);const o=i.mod(e,this.genPoly),s=this.degree-o.length;if(s>0){const c=new Uint8Array(this.degree);return c.set(o,s),c}return o},ve=t,ve}var be={},ye={},we={},We;function bt(){return We||(We=1,we.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),we}var k={},Xe;function yt(){if(Xe)return k;Xe=1;const i="[0-9]+",t="[A-Z $%*+\\-./:]+";let r="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";r=r.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+r+`)(?:.|[\r
]))+`;k.KANJI=new RegExp(r,"g"),k.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),k.BYTE=new RegExp(n,"g"),k.NUMERIC=new RegExp(i,"g"),k.ALPHANUMERIC=new RegExp(t,"g");const e=new RegExp("^"+r+"$"),o=new RegExp("^"+i+"$"),s=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return k.testKanji=function(a){return e.test(a)},k.testNumeric=function(a){return o.test(a)},k.testAlphanumeric=function(a){return s.test(a)},k}var Ze;function H(){return Ze||(Ze=1,(function(i){const t=bt(),r=yt();i.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},i.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},i.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},i.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},i.MIXED={bit:-1},i.getCharCountIndicator=function(o,s){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!t.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?o.ccBits[0]:s<27?o.ccBits[1]:o.ccBits[2]},i.getBestModeForData=function(o){return r.testNumeric(o)?i.NUMERIC:r.testAlphanumeric(o)?i.ALPHANUMERIC:r.testKanji(o)?i.KANJI:i.BYTE},i.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},i.isValid=function(o){return o&&o.bit&&o.ccBits};function n(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"numeric":return i.NUMERIC;case"alphanumeric":return i.ALPHANUMERIC;case"kanji":return i.KANJI;case"byte":return i.BYTE;default:throw new Error("Unknown mode: "+e)}}i.from=function(o,s){if(i.isValid(o))return o;try{return n(o)}catch{return s}}})(ye)),ye}var et;function Ht(){return et||(et=1,(function(i){const t=V(),r=vt(),n=Me(),e=H(),o=bt(),s=7973,c=t.getBCHDigit(s);function a(g,d,E){for(let C=1;C<=40;C++)if(d<=i.getCapacity(C,E,g))return C}function u(g,d){return e.getCharCountIndicator(g,d)+4}function l(g,d){let E=0;return g.forEach(function(C){const M=u(C.mode,d);E+=M+C.getBitsLength()}),E}function m(g,d){for(let E=1;E<=40;E++)if(l(g,E)<=i.getCapacity(E,d,e.MIXED))return E}i.from=function(d,E){return o.isValid(d)?parseInt(d,10):E},i.getCapacity=function(d,E,C){if(!o.isValid(d))throw new Error("Invalid QR Code version");typeof C>"u"&&(C=e.BYTE);const M=t.getSymbolTotalCodewords(d),T=r.getTotalCodewordsCount(d,E),A=(M-T)*8;if(C===e.MIXED)return A;const R=A-u(C,d);switch(C){case e.NUMERIC:return Math.floor(R/10*3);case e.ALPHANUMERIC:return Math.floor(R/11*2);case e.KANJI:return Math.floor(R/13);case e.BYTE:default:return Math.floor(R/8)}},i.getBestVersionForData=function(d,E){let C;const M=n.from(E,n.M);if(Array.isArray(d)){if(d.length>1)return m(d,M);if(d.length===0)return 1;C=d[0]}else C=d;return a(C.mode,C.getLength(),M)},i.getEncodedBits=function(d){if(!o.isValid(d)||d<7)throw new Error("Invalid QR Code version");let E=d<<12;for(;t.getBCHDigit(E)-c>=0;)E^=s<<t.getBCHDigit(E)-c;return d<<12|E}})(be)),be}var Ee={},tt;function jt(){if(tt)return Ee;tt=1;const i=V(),t=1335,r=21522,n=i.getBCHDigit(t);return Ee.getEncodedBits=function(o,s){const c=o.bit<<3|s;let a=c<<10;for(;i.getBCHDigit(a)-n>=0;)a^=t<<i.getBCHDigit(a)-n;return(c<<10|a)^r},Ee}var Ce={},Ne,nt;function Jt(){if(nt)return Ne;nt=1;const i=H();function t(r){this.mode=i.NUMERIC,this.data=r.toString()}return t.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(n){let e,o,s;for(e=0;e+3<=this.data.length;e+=3)o=this.data.substr(e,3),s=parseInt(o,10),n.put(s,10);const c=this.data.length-e;c>0&&(o=this.data.substr(e),s=parseInt(o,10),n.put(s,c*3+1))},Ne=t,Ne}var Se,it;function Kt(){if(it)return Se;it=1;const i=H(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function r(n){this.mode=i.ALPHANUMERIC,this.data=n}return r.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let o;for(o=0;o+2<=this.data.length;o+=2){let s=t.indexOf(this.data[o])*45;s+=t.indexOf(this.data[o+1]),e.put(s,11)}this.data.length%2&&e.put(t.indexOf(this.data[o]),6)},Se=r,Se}var Ie,rt;function Yt(){if(rt)return Ie;rt=1;const i=H();function t(r){this.mode=i.BYTE,typeof r=="string"?this.data=new TextEncoder().encode(r):this.data=new Uint8Array(r)}return t.getBitsLength=function(n){return n*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(r){for(let n=0,e=this.data.length;n<e;n++)r.put(this.data[n],8)},Ie=t,Ie}var Te,ot;function Qt(){if(ot)return Te;ot=1;const i=H(),t=V();function r(n){this.mode=i.KANJI,this.data=n}return r.getBitsLength=function(e){return e*13},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(n){let e;for(e=0;e<this.data.length;e++){let o=t.toSJIS(this.data[e]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);o=(o>>>8&255)*192+(o&255),n.put(o,13)}},Te=r,Te}var Re={exports:{}},st;function Wt(){return st||(st=1,(function(i){var t={single_source_shortest_paths:function(r,n,e){var o={},s={};s[n]=0;var c=t.PriorityQueue.make();c.push(n,0);for(var a,u,l,m,g,d,E,C,M;!c.empty();){a=c.pop(),u=a.value,m=a.cost,g=r[u]||{};for(l in g)g.hasOwnProperty(l)&&(d=g[l],E=m+d,C=s[l],M=typeof s[l]>"u",(M||C>E)&&(s[l]=E,c.push(l,E),o[l]=u))}if(typeof e<"u"&&typeof s[e]>"u"){var T=["Could not find a path from ",n," to ",e,"."].join("");throw new Error(T)}return o},extract_shortest_path_from_predecessor_list:function(r,n){for(var e=[],o=n;o;)e.push(o),r[o],o=r[o];return e.reverse(),e},find_path:function(r,n,e){var o=t.single_source_shortest_paths(r,n,e);return t.extract_shortest_path_from_predecessor_list(o,e)},PriorityQueue:{make:function(r){var n=t.PriorityQueue,e={},o;r=r||{};for(o in n)n.hasOwnProperty(o)&&(e[o]=n[o]);return e.queue=[],e.sorter=r.sorter||n.default_sorter,e},default_sorter:function(r,n){return r.cost-n.cost},push:function(r,n){var e={value:r,cost:n};this.queue.push(e),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};i.exports=t})(Re)),Re.exports}var at;function Xt(){return at||(at=1,(function(i){const t=H(),r=Jt(),n=Kt(),e=Yt(),o=Qt(),s=yt(),c=V(),a=Wt();function u(T){return unescape(encodeURIComponent(T)).length}function l(T,A,R){const N=[];let x;for(;(x=T.exec(R))!==null;)N.push({data:x[0],index:x.index,mode:A,length:x[0].length});return N}function m(T){const A=l(s.NUMERIC,t.NUMERIC,T),R=l(s.ALPHANUMERIC,t.ALPHANUMERIC,T);let N,x;return c.isKanjiModeEnabled()?(N=l(s.BYTE,t.BYTE,T),x=l(s.KANJI,t.KANJI,T)):(N=l(s.BYTE_KANJI,t.BYTE,T),x=[]),A.concat(R,N,x).sort(function(y,b){return y.index-b.index}).map(function(y){return{data:y.data,mode:y.mode,length:y.length}})}function g(T,A){switch(A){case t.NUMERIC:return r.getBitsLength(T);case t.ALPHANUMERIC:return n.getBitsLength(T);case t.KANJI:return o.getBitsLength(T);case t.BYTE:return e.getBitsLength(T)}}function d(T){return T.reduce(function(A,R){const N=A.length-1>=0?A[A.length-1]:null;return N&&N.mode===R.mode?(A[A.length-1].data+=R.data,A):(A.push(R),A)},[])}function E(T){const A=[];for(let R=0;R<T.length;R++){const N=T[R];switch(N.mode){case t.NUMERIC:A.push([N,{data:N.data,mode:t.ALPHANUMERIC,length:N.length},{data:N.data,mode:t.BYTE,length:N.length}]);break;case t.ALPHANUMERIC:A.push([N,{data:N.data,mode:t.BYTE,length:N.length}]);break;case t.KANJI:A.push([N,{data:N.data,mode:t.BYTE,length:u(N.data)}]);break;case t.BYTE:A.push([{data:N.data,mode:t.BYTE,length:u(N.data)}])}}return A}function C(T,A){const R={},N={start:{}};let x=["start"];for(let h=0;h<T.length;h++){const y=T[h],b=[];for(let f=0;f<y.length;f++){const S=y[f],p=""+h+f;b.push(p),R[p]={node:S,lastCount:0},N[p]={};for(let w=0;w<x.length;w++){const v=x[w];R[v]&&R[v].node.mode===S.mode?(N[v][p]=g(R[v].lastCount+S.length,S.mode)-g(R[v].lastCount,S.mode),R[v].lastCount+=S.length):(R[v]&&(R[v].lastCount=S.length),N[v][p]=g(S.length,S.mode)+4+t.getCharCountIndicator(S.mode,A))}}x=b}for(let h=0;h<x.length;h++)N[x[h]].end=0;return{map:N,table:R}}function M(T,A){let R;const N=t.getBestModeForData(T);if(R=t.from(A,N),R!==t.BYTE&&R.bit<N.bit)throw new Error('"'+T+'" cannot be encoded with mode '+t.toString(R)+`.
 Suggested mode is: `+t.toString(N));switch(R===t.KANJI&&!c.isKanjiModeEnabled()&&(R=t.BYTE),R){case t.NUMERIC:return new r(T);case t.ALPHANUMERIC:return new n(T);case t.KANJI:return new o(T);case t.BYTE:return new e(T)}}i.fromArray=function(A){return A.reduce(function(R,N){return typeof N=="string"?R.push(M(N,null)):N.data&&R.push(M(N.data,N.mode)),R},[])},i.fromString=function(A,R){const N=m(A,c.isKanjiModeEnabled()),x=E(N),h=C(x,R),y=a.find_path(h.map,"start","end"),b=[];for(let f=1;f<y.length-1;f++)b.push(h.table[y[f]].node);return i.fromArray(d(b))},i.rawSplit=function(A){return i.fromArray(m(A,c.isKanjiModeEnabled()))}})(Ce)),Ce}var ct;function Zt(){if(ct)return le;ct=1;const i=V(),t=Me(),r=Dt(),n=kt(),e=Gt(),o=zt(),s=Ut(),c=vt(),a=Vt(),u=Ht(),l=jt(),m=H(),g=Xt();function d(h,y){const b=h.size,f=o.getPositions(y);for(let S=0;S<f.length;S++){const p=f[S][0],w=f[S][1];for(let v=-1;v<=7;v++)if(!(p+v<=-1||b<=p+v))for(let B=-1;B<=7;B++)w+B<=-1||b<=w+B||(v>=0&&v<=6&&(B===0||B===6)||B>=0&&B<=6&&(v===0||v===6)||v>=2&&v<=4&&B>=2&&B<=4?h.set(p+v,w+B,!0,!0):h.set(p+v,w+B,!1,!0))}}function E(h){const y=h.size;for(let b=8;b<y-8;b++){const f=b%2===0;h.set(b,6,f,!0),h.set(6,b,f,!0)}}function C(h,y){const b=e.getPositions(y);for(let f=0;f<b.length;f++){const S=b[f][0],p=b[f][1];for(let w=-2;w<=2;w++)for(let v=-2;v<=2;v++)w===-2||w===2||v===-2||v===2||w===0&&v===0?h.set(S+w,p+v,!0,!0):h.set(S+w,p+v,!1,!0)}}function M(h,y){const b=h.size,f=u.getEncodedBits(y);let S,p,w;for(let v=0;v<18;v++)S=Math.floor(v/3),p=v%3+b-8-3,w=(f>>v&1)===1,h.set(S,p,w,!0),h.set(p,S,w,!0)}function T(h,y,b){const f=h.size,S=l.getEncodedBits(y,b);let p,w;for(p=0;p<15;p++)w=(S>>p&1)===1,p<6?h.set(p,8,w,!0):p<8?h.set(p+1,8,w,!0):h.set(f-15+p,8,w,!0),p<8?h.set(8,f-p-1,w,!0):p<9?h.set(8,15-p-1+1,w,!0):h.set(8,15-p-1,w,!0);h.set(f-8,8,1,!0)}function A(h,y){const b=h.size;let f=-1,S=b-1,p=7,w=0;for(let v=b-1;v>0;v-=2)for(v===6&&v--;;){for(let B=0;B<2;B++)if(!h.isReserved(S,v-B)){let U=!1;w<y.length&&(U=(y[w]>>>p&1)===1),h.set(S,v-B,U),p--,p===-1&&(w++,p=7)}if(S+=f,S<0||b<=S){S-=f,f=-f;break}}}function R(h,y,b){const f=new r;b.forEach(function(B){f.put(B.mode.bit,4),f.put(B.getLength(),m.getCharCountIndicator(B.mode,h)),B.write(f)});const S=i.getSymbolTotalCodewords(h),p=c.getTotalCodewordsCount(h,y),w=(S-p)*8;for(f.getLengthInBits()+4<=w&&f.put(0,4);f.getLengthInBits()%8!==0;)f.putBit(0);const v=(w-f.getLengthInBits())/8;for(let B=0;B<v;B++)f.put(B%2?17:236,8);return N(f,h,y)}function N(h,y,b){const f=i.getSymbolTotalCodewords(y),S=c.getTotalCodewordsCount(y,b),p=f-S,w=c.getBlocksCount(y,b),v=f%w,B=w-v,U=Math.floor(f/w),Y=Math.floor(p/w),_t=Y+1,Le=U-Y,Mt=new a(Le);let re=0;const X=new Array(w),De=new Array(w);let oe=0;const xt=new Uint8Array(h.buffer);for(let j=0;j<w;j++){const ae=j<B?Y:_t;X[j]=xt.slice(re,re+ae),De[j]=Mt.encode(X[j]),re+=ae,oe=Math.max(oe,ae)}const se=new Uint8Array(f);let ke=0,G,z;for(G=0;G<oe;G++)for(z=0;z<w;z++)G<X[z].length&&(se[ke++]=X[z][G]);for(G=0;G<Le;G++)for(z=0;z<w;z++)se[ke++]=De[z][G];return se}function x(h,y,b,f){let S;if(Array.isArray(h))S=g.fromArray(h);else if(typeof h=="string"){let U=y;if(!U){const Y=g.rawSplit(h);U=u.getBestVersionForData(Y,b)}S=g.fromString(h,U||40)}else throw new Error("Invalid data");const p=u.getBestVersionForData(S,b);if(!p)throw new Error("The amount of data is too big to be stored in a QR Code");if(!y)y=p;else if(y<p)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+p+`.
`);const w=R(y,b,S),v=i.getSymbolSize(y),B=new n(v);return d(B,y),E(B),C(B,y),T(B,b,0),y>=7&&M(B,y),A(B,w),isNaN(f)&&(f=s.getBestMask(B,T.bind(null,B,b))),s.applyMask(f,B),T(B,b,f),{modules:B,version:y,errorCorrectionLevel:b,maskPattern:f,segments:S}}return le.create=function(y,b){if(typeof y>"u"||y==="")throw new Error("No input text");let f=t.M,S,p;return typeof b<"u"&&(f=t.from(b.errorCorrectionLevel,t.M),S=u.from(b.version),p=s.from(b.maskPattern),b.toSJISFunc&&i.setToSJISFunction(b.toSJISFunc)),x(y,S,f,p)},le}var Be={},Ae={},lt;function wt(){return lt||(lt=1,(function(i){function t(r){if(typeof r=="number"&&(r=r.toString()),typeof r!="string")throw new Error("Color should be defined as hex string");let n=r.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+r);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(o){return[o,o]}))),n.length===6&&n.push("F","F");const e=parseInt(n.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:e&255,hex:"#"+n.slice(0,6).join("")}}i.getOptions=function(n){n||(n={}),n.color||(n.color={});const e=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,o=n.width&&n.width>=21?n.width:void 0,s=n.scale||4;return{width:o,scale:o?4:s,margin:e,color:{dark:t(n.color.dark||"#000000ff"),light:t(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},i.getScale=function(n,e){return e.width&&e.width>=n+e.margin*2?e.width/(n+e.margin*2):e.scale},i.getImageWidth=function(n,e){const o=i.getScale(n,e);return Math.floor((n+e.margin*2)*o)},i.qrToImageData=function(n,e,o){const s=e.modules.size,c=e.modules.data,a=i.getScale(s,o),u=Math.floor((s+o.margin*2)*a),l=o.margin*a,m=[o.color.light,o.color.dark];for(let g=0;g<u;g++)for(let d=0;d<u;d++){let E=(g*u+d)*4,C=o.color.light;if(g>=l&&d>=l&&g<u-l&&d<u-l){const M=Math.floor((g-l)/a),T=Math.floor((d-l)/a);C=m[c[M*s+T]?1:0]}n[E++]=C.r,n[E++]=C.g,n[E++]=C.b,n[E]=C.a}}})(Ae)),Ae}var ut;function en(){return ut||(ut=1,(function(i){const t=wt();function r(e,o,s){e.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=s,o.width=s,o.style.height=s+"px",o.style.width=s+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}i.render=function(o,s,c){let a=c,u=s;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),s||(u=n()),a=t.getOptions(a);const l=t.getImageWidth(o.modules.size,a),m=u.getContext("2d"),g=m.createImageData(l,l);return t.qrToImageData(g.data,o,a),r(m,u,l),m.putImageData(g,0,0),u},i.renderToDataURL=function(o,s,c){let a=c;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),a||(a={});const u=i.render(o,s,a),l=a.type||"image/png",m=a.rendererOpts||{};return u.toDataURL(l,m.quality)}})(Be)),Be}var Pe={},dt;function tn(){if(dt)return Pe;dt=1;const i=wt();function t(e,o){const s=e.a/255,c=o+'="'+e.hex+'"';return s<1?c+" "+o+'-opacity="'+s.toFixed(2).slice(1)+'"':c}function r(e,o,s){let c=e+o;return typeof s<"u"&&(c+=" "+s),c}function n(e,o,s){let c="",a=0,u=!1,l=0;for(let m=0;m<e.length;m++){const g=Math.floor(m%o),d=Math.floor(m/o);!g&&!u&&(u=!0),e[m]?(l++,m>0&&g>0&&e[m-1]||(c+=u?r("M",g+s,.5+d+s):r("m",a,0),a=0,u=!1),g+1<o&&e[m+1]||(c+=r("h",l),l=0)):a++}return c}return Pe.render=function(o,s,c){const a=i.getOptions(s),u=o.modules.size,l=o.modules.data,m=u+a.margin*2,g=a.color.light.a?"<path "+t(a.color.light,"fill")+' d="M0 0h'+m+"v"+m+'H0z"/>':"",d="<path "+t(a.color.dark,"stroke")+' d="'+n(l,u,a.margin)+'"/>',E='viewBox="0 0 '+m+" "+m+'"',M='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+E+' shape-rendering="crispEdges">'+g+d+`</svg>
`;return typeof c=="function"&&c(null,M),M},Pe}var ft;function nn(){if(ft)return J;ft=1;const i=Lt(),t=Zt(),r=en(),n=tn();function e(o,s,c,a,u){const l=[].slice.call(arguments,1),m=l.length,g=typeof l[m-1]=="function";if(!g&&!i())throw new Error("Callback required as last argument");if(g){if(m<2)throw new Error("Too few arguments provided");m===2?(u=c,c=s,s=a=void 0):m===3&&(s.getContext&&typeof u>"u"?(u=a,a=void 0):(u=a,a=c,c=s,s=void 0))}else{if(m<1)throw new Error("Too few arguments provided");return m===1?(c=s,s=a=void 0):m===2&&!s.getContext&&(a=c,c=s,s=void 0),new Promise(function(d,E){try{const C=t.create(c,a);d(o(C,s,a))}catch(C){E(C)}})}try{const d=t.create(c,a);u(null,o(d,s,a))}catch(d){u(d)}}return J.create=t.create,J.toCanvas=e.bind(null,r.render),J.toDataURL=e.bind(null,r.renderToDataURL),J.toString=e.bind(null,function(o,s,c){return n.render(o,c)}),J}var rn=nn();const gt=qt(rn),Et=.09,Ct=1e3;function O(i){return+(Math.round(+(i+"e2"))+"e-2")}function on(i){const t=Math.round(+(i+"e2"));return+(Math.round(t/5)*5+"e-2")}function ht(i){return O(i*Et)}function _e(i){return O(i.quantity*i.unitPriceExGst)}function Nt(i,t={}){const r=t.method??"per_line",n=O(Math.max(t.discountExGst??0,0)),e=O(i.reduce((u,l)=>u+_e(l),0)),o=O(Math.max(e-n,0)),s=i.map(u=>ht(_e(u)));let c;if(r==="per_line")if(e>0&&n>0){const u=o/e;c=O(s.reduce((l,m)=>l+m*u,0))}else c=O(s.reduce((u,l)=>u+l,0));else c=ht(o);let a=O(o+c);return t.roundCash&&(a=on(a)),{subtotalExGst:e,discountExGst:n,taxableExGst:o,gstAmount:c,totalInclGst:a,lineGst:s}}function St(i,t,r){return t.isCreditNote?"credit_note":i.gstRegistered?t.customer.gstRegistered?r.totalInclGst<=Ct?"simplified_tax_invoice":"tax_invoice":"receipt":"invoice"}function sn(i){return{invoice:"INVOICE",tax_invoice:"TAX INVOICE",simplified_tax_invoice:"TAX INVOICE",receipt:"RECEIPT",credit_note:"CREDIT NOTE"}[i]}function an(i){return i==="simplified_tax_invoice"||i==="receipt"}function cn(i,t,r,n){const e=[];return i.name.trim()||e.push({field:"profile.name",message:"Business name is required."}),i.address.trim()||e.push({field:"profile.address",message:"Business address is required."}),t.invoiceNumber.trim()||e.push({field:"invoice_number",message:"Invoice number is required."}),t.date.trim()||e.push({field:"date",message:"Invoice date is required."}),t.lineItems.length||e.push({field:"line_items",message:"At least one line item is required."}),r==="invoice"?e:r==="credit_note"?(t.originalInvoiceNumber.trim()||e.push({field:"original_invoice_number",message:"Original invoice number is required on a credit note."}),i.gstRegistered&&!i.gstRegistrationNumber.trim()&&e.push({field:"profile.gst_registration_number",message:"GST registration number is required for GST documents."}),e):i.gstRegistered?(i.gstRegistrationNumber.trim()||e.push({field:"profile.gst_registration_number",message:"GST registration number is required for GST documents."}),(r==="tax_invoice"||r==="simplified_tax_invoice")&&(t.customer.name.trim()||e.push({field:"customer.name",message:"Customer name is required on a tax invoice."}),r==="tax_invoice"&&!t.customer.address.trim()&&e.push({field:"customer.address",message:"Customer address is required on a full tax invoice."})),r==="receipt"&&n.totalInclGst<=0&&e.push({field:"total",message:"Receipt total must be greater than zero."}),e):(e.push({field:"profile.gst_registered",message:"GST-registered mode requires GST registration to be enabled."}),e)}function D(i,t="SGD"){return new Intl.NumberFormat("en-SG",{style:"currency",currency:t,minimumFractionDigits:2}).format(i)}function mt(i){return i?new Date(i+"T12:00:00").toLocaleDateString("en-SG",{day:"2-digit",month:"short",year:"numeric"}):""}function q(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function L(i,t){return`${i}${String(t.length).padStart(2,"0")}${t}`}function ln(i){let t=65535;for(let r=0;r<i.length;r++){t^=i.charCodeAt(r)<<8;for(let n=0;n<8;n++)t=t&32768?(t<<1^4129)&65535:t<<1&65535}return t.toString(16).toUpperCase().padStart(4,"0")}function ee(i){return/^(\+65)?[89]\d{7}$/.test(i.replace(/[\s-]/g,""))}function un(i){const t=i.replace(/[\s-]/g,"");return t.startsWith("+65")?t:t.startsWith("65")&&t.length===10?"+"+t:t.length===8?"+65"+t:t}function pt({payTo:i,name:t,amount:r,reference:n}){const e=typeof r=="number"&&r>0,o=ee(i),s=o?un(i):i,c=o?"0":"2",a=[L("00","SG.PAYNOW"),L("01",c),L("02",s),L("03","1")].join(""),l=[L("00","01"),L("01",e?"12":"11"),L("26",a),L("52","0000"),L("53","702"),...e?[L("54",r.toFixed(2))]:[],L("58","SG"),L("59",t.slice(0,25)),L("60","Singapore"),...n?[L("62",L("01",n.slice(0,25)))]:[],"6304"].join("");return l+ln(l)}const It="sg-invoice-app-v1",xe=()=>({name:"",address:"",phone:"",email:"",uen:"",gstRegistrationNumber:"",gstRegistered:!1,bankName:"",bankAccount:"",paynow:"",invoicePrefix:"INV",calculationMethod:"per_line",roundCashToFiveCents:!1}),K=()=>({invoiceNumber:"",date:new Date().toISOString().slice(0,10),dueDate:"",paymentTerms:"Payment due within 14 days",notes:"",currency:"SGD",lineItems:[{id:crypto.randomUUID(),description:"",quantity:1,unitPriceExGst:0}],customer:{name:"",address:"",gstRegistered:!1},discountExGst:0,isCreditNote:!1,originalInvoiceNumber:""});function $e(){return{profile:xe(),invoice:K(),nextSequence:1}}function dn(){var i,t,r;try{const n=localStorage.getItem(It);if(!n)return $e();const e=JSON.parse(n);return{...$e(),...e,profile:{...xe(),...e.profile},invoice:{...K(),...e.invoice,customer:{...K().customer,...(i=e.invoice)==null?void 0:i.customer},lineItems:(r=(t=e.invoice)==null?void 0:t.lineItems)!=null&&r.length?e.invoice.lineItems:K().lineItems}}}catch{return $e()}}function Tt(i){localStorage.setItem(It,JSON.stringify(i))}function fn(i){return JSON.stringify({exportedAt:new Date().toISOString(),profile:i.profile,invoice:i.invoice,nextSequence:i.nextSequence},null,2)}function gn(i){var r;const t=JSON.parse(i);return{profile:{...xe(),...t.profile},invoice:{...K(),...t.invoice,customer:{...K().customer,...(r=t.invoice)==null?void 0:r.customer}},nextSequence:t.nextSequence??1}}function Rt(i,t,r){return`${i}-${t}-${String(r).padStart(4,"0")}`}function hn(i,t={}){const{profile:r,invoice:n}=i,e=Nt(n.lineItems,{discountExGst:n.discountExGst,method:r.calculationMethod,roundCash:r.roundCashToFiveCents}),o=St(r,n,e),s=sn(o),c=r.gstRegistered,a=o==="simplified_tax_invoice",u=o==="receipt",l=o==="credit_note",m=n.lineItems.map(d=>{const E=_e(d),C=c?e.lineGst[n.lineItems.indexOf(d)]??0:0,M=c?E+C:E;return a||u?`
        <tr>
          <td>${q(d.description||"—")}</td>
          <td class="num">${d.quantity}</td>
          <td class="num">${D(M,n.currency)}</td>
        </tr>`:`
        <tr>
          <td>${q(d.description||"—")}</td>
          <td class="num">${d.quantity}</td>
          <td class="num">${D(d.unitPriceExGst,n.currency)}</td>
          ${c?`<td class="num">${D(C,n.currency)}</td>`:""}
          <td class="num">${D(c?M:E,n.currency)}</td>
        </tr>`}).join(""),g=r.gstRegistrationNumber||r.uen;return`
    <article class="invoice-doc" data-doc-type="${o}">
      <header class="invoice-doc__header">
        <div class="invoice-doc__brand">
          <h1 class="invoice-doc__title">${s}</h1>
          ${a?'<p class="invoice-doc__subtitle">Simplified tax invoice</p>':""}
        </div>
        <div class="invoice-doc__meta">
          <p><strong>No.</strong> ${q(n.invoiceNumber)}</p>
          <p><strong>Date</strong> ${mt(n.date)}</p>
          ${n.dueDate?`<p><strong>Due</strong> ${mt(n.dueDate)}</p>`:""}
          ${l&&n.originalInvoiceNumber?`<p><strong>Credits invoice</strong> ${q(n.originalInvoiceNumber)}</p>`:""}
        </div>
      </header>

      <section class="invoice-doc__parties">
        <div>
          <h2>From</h2>
          <p class="party-name">${q(r.name)}</p>
          <p class="party-address">${q(r.address).replace(/\n/g,"<br>")}</p>
          ${r.phone?`<p>${q(r.phone)}</p>`:""}
          ${r.email?`<p>${q(r.email)}</p>`:""}
          ${r.uen?`<p>UEN: ${q(r.uen)}</p>`:""}
          ${c&&g?`<p>GST Reg No.: ${q(g)}</p>`:""}
        </div>
        <div>
          <h2>Bill to</h2>
          <p class="party-name">${q(n.customer.name||"—")}</p>
          ${n.customer.address?`<p class="party-address">${q(n.customer.address).replace(/\n/g,"<br>")}</p>`:""}
          ${n.customer.gstRegistered&&c?"<p>GST-registered customer</p>":""}
        </div>
      </section>

      <table class="invoice-doc__table">
        <thead>
          <tr>
            <th>Description</th>
            <th class="num">Qty</th>
            ${a||u?'<th class="num">Amount</th>':`
            <th class="num">Unit (ex GST)</th>
            ${c?'<th class="num">GST</th>':""}
            <th class="num">${c?"Total (incl GST)":"Amount"}</th>`}
          </tr>
        </thead>
        <tbody>${m}</tbody>
      </table>

      <section class="invoice-doc__totals">
        ${!a&&!u?`
        <div class="totals-row"><span>Subtotal (ex GST)</span><span>${D(e.subtotalExGst,n.currency)}</span></div>
        ${n.discountExGst>0?`<div class="totals-row"><span>Discount (ex GST)</span><span>−${D(e.discountExGst,n.currency)}</span></div>`:""}
        ${c?`
        <div class="totals-row"><span>Taxable (ex GST)</span><span>${D(e.taxableExGst,n.currency)}</span></div>
        <div class="totals-row"><span>GST @ ${Et*100}%</span><span>${D(e.gstAmount,n.currency)}</span></div>`:""}
        `:""}
        <div class="totals-row totals-row--grand">
          <span>Total payable</span>
          <span>${D(c?e.totalInclGst:e.taxableExGst,n.currency)}</span>
        </div>
        ${an(o)?'<p class="gst-statement">Price payable includes GST</p>':""}
      </section>

      ${n.paymentTerms?`<p class="invoice-doc__terms">${q(n.paymentTerms)}</p>`:""}
      ${n.notes?`<p class="invoice-doc__notes"><strong>Notes:</strong> ${q(n.notes)}</p>`:""}

      ${r.bankAccount||r.paynow||r.uen?`
      <section class="invoice-doc__payment">
        <h2>Payment</h2>
        <div style="display:flex;gap:1.5rem;align-items:flex-start;flex-wrap:wrap">
          <div>
            ${r.bankName?`<p>${q(r.bankName)}</p>`:""}
            ${r.bankAccount?`<p>Account: ${q(r.bankAccount)}</p>`:""}
          </div>
          ${r.uen?`
          <div style="text-align:center;flex-shrink:0">
            ${t.uen?`<img src="${t.uen}" width="110" height="110" alt="PayNow QR" />`:'<canvas id="paynow-qr-uen" width="110" height="110"></canvas>'}
            <p style="margin:0.2rem 0 0;font-size:0.68rem;color:#555">PayNow (UEN)<br>${q(r.uen)}</p>
          </div>`:""}
          ${r.paynow&&ee(r.paynow)?`
          <div style="text-align:center;flex-shrink:0">
            ${t.mobile?`<img src="${t.mobile}" width="110" height="110" alt="PayNow QR" />`:'<canvas id="paynow-qr-mobile" width="110" height="110"></canvas>'}
            <p style="margin:0.2rem 0 0;font-size:0.68rem;color:#555">PayNow (Mobile)<br>${q(r.paynow)}</p>
          </div>`:""}
        </div>
        ${r.uen||r.paynow&&ee(r.paynow)?'<p style="margin:0.5rem 0 0;font-size:0.7rem;color:#777">Scan QR with your banking app (DBS/POSB, OCBC, UOB…)</p>':""}
      </section>`:""}

      <footer class="invoice-doc__footer">
        <p>For record-keeping assistance only. Not tax or legal advice. Confirm requirements with IRAS or your accountant.</p>
      </footer>
    </article>
  `}function qe(i){return{invoice:"Standard invoice",tax_invoice:"Full tax invoice",simplified_tax_invoice:`Simplified tax invoice (≤ $${Ct.toLocaleString()})`,receipt:"Receipt (non-GST customer)",credit_note:"Credit note"}[i]}let I=dn();function te(){return Nt(I.invoice.lineItems,{discountExGst:I.invoice.discountExGst,method:I.profile.calculationMethod,roundCash:I.profile.roundCashToFiveCents})}function ne(){return St(I.profile,I.invoice,te())}function Bt(){return cn(I.profile,I.invoice,ne(),te())}async function At(){const i=te(),t=ne(),r=Bt(),n=qe(t),e={},o=I.profile.gstRegistered?i.totalInclGst:i.taxableExGst,s=o>0?o:void 0,c=I.invoice.invoiceNumber||void 0,a=I.profile.name||"Payee",u={width:110,margin:2};if(I.profile.uen)try{const C=pt({payTo:I.profile.uen,name:a,amount:s,reference:c});e.uen=await gt.toDataURL(C,u)}catch{}if(I.profile.paynow&&ee(I.profile.paynow))try{const C=pt({payTo:I.profile.paynow,name:a,amount:s,reference:c});e.mobile=await gt.toDataURL(C,u)}catch{}const l=document.getElementById("preview-root");l&&(l.innerHTML=hn(I,e));const m=document.getElementById("preview-badge");m&&(m.textContent=n,m.className=`badge${r.length?" badge--warn":""}`);const g=document.getElementById("form-doc-type-badge");g&&(g.textContent=n);const d=document.getElementById("inv-summary");d&&(d.textContent=I.profile.gstRegistered?`GST: ${D(i.gstAmount)} · Total: ${D(i.totalInclGst)}`:`Total: ${D(i.taxableExGst)}`);const E=document.getElementById("validation-container");E&&(E.innerHTML=r.length?`<ul class="validation-list">${r.map(C=>`<li>${_(C.message)}</li>`).join("")}</ul>`:"")}function W(){Tt(I),At()}function ie(){Tt(I),$t()}function Pt(){const i=new Date().getFullYear();I.invoice.invoiceNumber||(I.invoice.invoiceNumber=Rt(I.profile.invoicePrefix,i,I.nextSequence),I.nextSequence+=1)}function $(i,t,r,n=!1){i.addEventListener("input",()=>{const e=i.type==="checkbox"?i.checked:i.value;i.type==="number"?r(parseFloat(i.value)||0):typeof t()=="boolean"?r(e):typeof t()=="number"?r(parseFloat(i.value)||0):r(e),n?ie():W()})}function mn(i){const t=I.profile,r=I.invoice,n=te(),e=ne();i.innerHTML=`
    <h3 class="form-section-title">Your Business</h3>
    <div class="form-grid form-grid--2">
      <div class="field field--full">
        <label for="biz-name">Business / trading name</label>
        <input id="biz-name" type="text" value="${_(t.name)}" />
      </div>
      <div class="field field--full">
        <label for="biz-address">Address</label>
        <textarea id="biz-address" rows="3">${_(t.address)}</textarea>
      </div>
      <div class="field">
        <label for="biz-phone">Phone</label>
        <input id="biz-phone" type="text" value="${_(t.phone)}" />
      </div>
      <div class="field">
        <label for="biz-email">Email</label>
        <input id="biz-email" type="email" value="${_(t.email)}" />
      </div>
      <div class="field">
        <label for="biz-uen">UEN</label>
        <input id="biz-uen" type="text" value="${_(t.uen)}" placeholder="e.g. 123456789A" />
      </div>
      <div class="field">
        <label for="biz-prefix">Invoice prefix</label>
        <input id="biz-prefix" type="text" value="${_(t.invoicePrefix)}" />
      </div>
      <div class="field field--full checkbox-row">
        <input id="biz-gst-reg" type="checkbox" ${t.gstRegistered?"checked":""} />
        <label for="biz-gst-reg">GST-registered business</label>
      </div>
      ${t.gstRegistered?`
      <div class="field">
        <label for="biz-gst-no">GST registration number</label>
        <input id="biz-gst-no" type="text" value="${_(t.gstRegistrationNumber)}" />
      </div>
      <div class="field">
        <label for="biz-calc">GST calculation method</label>
        <select id="biz-calc">
          <option value="per_line" ${t.calculationMethod==="per_line"?"selected":""}>Per line item (9% each)</option>
          <option value="on_subtotal" ${t.calculationMethod==="on_subtotal"?"selected":""}>On subtotal (9% once)</option>
        </select>
      </div>
      <div class="field checkbox-row">
        <input id="biz-cash-round" type="checkbox" ${t.roundCashToFiveCents?"checked":""} />
        <label for="biz-cash-round">Round total to nearest 5¢ (cash)</label>
      </div>`:""}
      <div class="field">
        <label for="biz-bank">Bank name</label>
        <input id="biz-bank" type="text" value="${_(t.bankName)}" />
      </div>
      <div class="field">
        <label for="biz-account">Bank account</label>
        <input id="biz-account" type="text" value="${_(t.bankAccount)}" />
      </div>
      <div class="field field--full">
        <label for="biz-paynow">PayNow (UEN / mobile)</label>
        <input id="biz-paynow" type="text" value="${_(t.paynow)}" />
      </div>
    </div>

    <hr class="form-divider" />

    <h3 class="form-section-title">Invoice</h3>
    <p id="form-doc-type-badge" class="badge">${_(qe(e))}</p>
    <div class="form-grid form-grid--2" style="margin-top:0.75rem">
      <div class="field">
        <label for="inv-no">Invoice number</label>
        <div style="display:flex;gap:0.5rem">
          <input id="inv-no" type="text" value="${_(r.invoiceNumber)}" style="flex:1" />
          <button type="button" class="btn btn--sm" id="btn-new-no">New no.</button>
        </div>
      </div>
      <div class="field">
        <label for="inv-date">Date</label>
        <input id="inv-date" type="date" value="${_(r.date)}" />
      </div>
      <div class="field">
        <label for="inv-due">Due date</label>
        <input id="inv-due" type="date" value="${_(r.dueDate)}" />
      </div>
      <div class="field field--full">
        <label for="inv-terms">Payment terms</label>
        <input id="inv-terms" type="text" value="${_(r.paymentTerms)}" />
      </div>
      <div class="field field--full checkbox-row">
        <input id="inv-credit-note" type="checkbox" ${r.isCreditNote?"checked":""} />
        <label for="inv-credit-note">This is a credit note</label>
      </div>
      ${r.isCreditNote?`
      <div class="field field--full">
        <label for="inv-orig-no">Original invoice number</label>
        <input id="inv-orig-no" type="text" value="${_(r.originalInvoiceNumber)}" placeholder="e.g. INV-2026-0001" />
      </div>`:""}
    </div>

    <h3 class="form-section-title" style="margin-top:1.25rem">Customer</h3>
    <div class="form-grid form-grid--2">
      <div class="field">
        <label for="cust-name">Name</label>
        <input id="cust-name" type="text" value="${_(r.customer.name)}" />
      </div>
      <div class="field checkbox-row" style="align-self:end">
        <input id="cust-gst" type="checkbox" ${r.customer.gstRegistered?"checked":""} ${t.gstRegistered?"":"disabled"} />
        <label for="cust-gst">Customer is GST-registered</label>
      </div>
      <div class="field field--full">
        <label for="cust-addr">Address</label>
        <textarea id="cust-addr" rows="2">${_(r.customer.address)}</textarea>
      </div>
    </div>

    <h3 class="form-section-title" style="margin-top:1.25rem">Line items</h3>
    <div class="line-items" id="line-items"></div>
    <button type="button" class="btn btn--sm" id="btn-add-line" style="margin-top:0.5rem">+ Add line</button>

    <div class="form-grid form-grid--2" style="margin-top:1rem">
      <div class="field">
        <label for="inv-discount">Discount (ex GST)</label>
        <input id="inv-discount" type="number" min="0" step="0.01" value="${r.discountExGst}" />
      </div>
      <div class="field">
        <label>Summary</label>
        <p id="inv-summary" style="margin:0.35rem 0 0;font-family:var(--mono);font-size:0.85rem">
          ${I.profile.gstRegistered?`GST: ${D(n.gstAmount)} · Total: ${D(n.totalInclGst)}`:`Total: ${D(n.taxableExGst)}`}
        </p>
      </div>
      <div class="field field--full">
        <label for="inv-notes">Notes</label>
        <textarea id="inv-notes" rows="2">${_(r.notes)}</textarea>
      </div>
    </div>
  `,$(P("#biz-name"),()=>t.name,l=>{t.name=l}),$(P("#biz-address"),()=>t.address,l=>{t.address=l}),$(P("#biz-phone"),()=>t.phone,l=>{t.phone=l}),$(P("#biz-email"),()=>t.email,l=>{t.email=l}),$(P("#biz-uen"),()=>t.uen,l=>{t.uen=l}),$(P("#biz-prefix"),()=>t.invoicePrefix,l=>{t.invoicePrefix=l}),$(P("#biz-gst-reg"),()=>t.gstRegistered,l=>{t.gstRegistered=l},!0);const o=document.querySelector("#biz-gst-no");o&&$(o,()=>t.gstRegistrationNumber,l=>{t.gstRegistrationNumber=l});const s=document.querySelector("#biz-calc");s&&$(s,()=>t.calculationMethod,l=>{t.calculationMethod=l});const c=document.querySelector("#biz-cash-round");c&&$(c,()=>t.roundCashToFiveCents,l=>{t.roundCashToFiveCents=l}),$(P("#biz-bank"),()=>t.bankName,l=>{t.bankName=l}),$(P("#biz-account"),()=>t.bankAccount,l=>{t.bankAccount=l}),$(P("#biz-paynow"),()=>t.paynow,l=>{t.paynow=l}),$(P("#inv-no"),()=>r.invoiceNumber,l=>{r.invoiceNumber=l}),$(P("#inv-date"),()=>r.date,l=>{r.date=l}),$(P("#inv-due"),()=>r.dueDate,l=>{r.dueDate=l}),$(P("#inv-terms"),()=>r.paymentTerms,l=>{r.paymentTerms=l}),$(P("#inv-credit-note"),()=>r.isCreditNote,l=>{r.isCreditNote=l},!0);const a=document.querySelector("#inv-orig-no");a&&$(a,()=>r.originalInvoiceNumber,l=>{r.originalInvoiceNumber=l}),$(P("#cust-name"),()=>r.customer.name,l=>{r.customer.name=l}),$(P("#cust-gst"),()=>r.customer.gstRegistered,l=>{r.customer.gstRegistered=l}),$(P("#cust-addr"),()=>r.customer.address,l=>{r.customer.address=l}),$(P("#inv-discount"),()=>r.discountExGst,l=>{r.discountExGst=l}),$(P("#inv-notes"),()=>r.notes,l=>{r.notes=l}),P("#btn-new-no").addEventListener("click",()=>{const l=new Date().getFullYear();I.invoice.invoiceNumber=Rt(I.profile.invoicePrefix,l,I.nextSequence),I.nextSequence+=1,P("#inv-no").value=I.invoice.invoiceNumber,W()});const u=P("#line-items");pn(u),P("#btn-add-line").addEventListener("click",()=>{r.lineItems.push({id:crypto.randomUUID(),description:"",quantity:1,unitPriceExGst:0}),ie()})}function pn(i){i.innerHTML=I.invoice.lineItems.map((t,r)=>`
    <div class="line-item" data-id="${t.id}">
      <div class="field">
        <label>Description</label>
        <input type="text" data-field="desc" value="${_(t.description)}" />
      </div>
      <div class="field">
        <label>Qty</label>
        <input type="number" data-field="qty" min="0" step="1" value="${t.quantity}" />
      </div>
      <div class="field">
        <label>Unit price ${I.profile.gstRegistered?"(ex GST)":""}</label>
        <input type="number" data-field="price" min="0" step="0.01" value="${t.unitPriceExGst}" />
      </div>
      <button type="button" class="btn btn--sm btn--danger" data-remove="${r}" ${I.invoice.lineItems.length<=1?"disabled":""}>Remove</button>
    </div>`).join(""),i.querySelectorAll(".line-item").forEach(t=>{var e,o,s,c;const r=t.dataset.id,n=I.invoice.lineItems.find(a=>a.id===r);(e=t.querySelector('[data-field="desc"]'))==null||e.addEventListener("input",a=>{n.description=a.target.value,W()}),(o=t.querySelector('[data-field="qty"]'))==null||o.addEventListener("input",a=>{n.quantity=parseFloat(a.target.value)||0,W()}),(s=t.querySelector('[data-field="price"]'))==null||s.addEventListener("input",a=>{n.unitPriceExGst=parseFloat(a.target.value)||0,W()}),(c=t.querySelector("[data-remove]"))==null||c.addEventListener("click",()=>{I.invoice.lineItems.length>1&&(I.invoice.lineItems=I.invoice.lineItems.filter(a=>a.id!==r),ie())})})}function _(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function P(i){return document.querySelector(i)}function $t(){const i=Bt(),t=P("#app");t.innerHTML=`
    <header class="app-header no-print">
      <div>
        <h1>SG Invoice</h1>
        <p>Singapore small & home-based business invoicing</p>
      </div>
      <div class="header-actions">
        <button type="button" class="btn" id="btn-export">Export JSON</button>
        <label class="btn" style="cursor:pointer">
          Import JSON
          <input type="file" id="btn-import" accept=".json" class="hidden" />
        </label>
        <button type="button" class="btn btn--primary" id="btn-print">Print / PDF</button>
      </div>
    </header>

    <div class="layout layout--split">
      <section class="panel">
        <div class="panel__body" id="form-root"></div>
        <div id="validation-container" class="panel__body" style="padding-top:0">
          ${i.length?`<ul class="validation-list">${i.map(r=>`<li>${_(r.message)}</li>`).join("")}</ul>`:""}
        </div>
      </section>

      <section class="panel">
        <div class="panel__header no-print">
          <h2>Preview</h2>
          <span id="preview-badge" class="badge ${i.length?"badge--warn":""}">${_(qe(ne()))}</span>
        </div>
        <div class="preview-pane" id="preview-root"></div>
      </section>
    </div>
  `,I.invoice.invoiceNumber||Pt(),mn(P("#form-root")),P("#btn-print").addEventListener("click",()=>window.print()),P("#btn-export").addEventListener("click",()=>{const r=new Blob([fn(I)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(r),n.download=`invoice-${I.invoice.invoiceNumber||"backup"}.json`,n.click(),URL.revokeObjectURL(n.href)}),P("#btn-import").addEventListener("change",async r=>{var o;const n=(o=r.target.files)==null?void 0:o[0];if(!n)return;const e=await n.text();I=gn(e),ie()}),At()}Pt();$t();
