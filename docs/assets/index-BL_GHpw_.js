(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();function qt(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var J={},ce,Fe;function Lt(){return Fe||(Fe=1,ce=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ce}var le={},U={},Ue;function V(){if(Ue)return U;Ue=1;let n;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return U.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},U.getSymbolTotalCodewords=function(r){return e[r]},U.getBCHDigit=function(i){let r=0;for(;i!==0;)r++,i>>>=1;return r},U.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');n=r},U.isKanjiModeEnabled=function(){return typeof n<"u"},U.toSJIS=function(r){return n(r)},U}var ue={},Oe;function Me(){return Oe||(Oe=1,(function(n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2};function e(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw new Error("Unknown EC Level: "+i)}}n.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},n.from=function(r,t){if(n.isValid(r))return r;try{return e(r)}catch{return t}}})(ue)),ue}var de,Ve;function xt(){if(Ve)return de;Ve=1;function n(){this.buffer=[],this.length=0}return n.prototype={get:function(e){const i=Math.floor(e/8);return(this.buffer[i]>>>7-e%8&1)===1},put:function(e,i){for(let r=0;r<i;r++)this.putBit((e>>>i-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),e&&(this.buffer[i]|=128>>>this.length%8),this.length++}},de=n,de}var fe,He;function Dt(){if(He)return fe;He=1;function n(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return n.prototype.set=function(e,i,r,t){const o=e*this.size+i;this.data[o]=r,t&&(this.reservedBit[o]=!0)},n.prototype.get=function(e,i){return this.data[e*this.size+i]},n.prototype.xor=function(e,i,r){this.data[e*this.size+i]^=r},n.prototype.isReserved=function(e,i){return this.reservedBit[e*this.size+i]},fe=n,fe}var ge={},je;function Gt(){return je||(je=1,(function(n){const e=V().getSymbolSize;n.getRowColCoords=function(r){if(r===1)return[];const t=Math.floor(r/7)+2,o=e(r),s=o===145?26:Math.ceil((o-13)/(2*t-2))*2,c=[o-7];for(let a=1;a<t-1;a++)c[a]=c[a-1]-s;return c.push(6),c.reverse()},n.getPositions=function(r){const t=[],o=n.getRowColCoords(r),s=o.length;for(let c=0;c<s;c++)for(let a=0;a<s;a++)c===0&&a===0||c===0&&a===s-1||c===s-1&&a===0||t.push([o[c],o[a]]);return t}})(ge)),ge}var he={},Je;function kt(){if(Je)return he;Je=1;const n=V().getSymbolSize,e=7;return he.getPositions=function(r){const t=n(r);return[[0,0],[t-e,0],[0,t-e]]},he}var me={},Ke;function zt(){return Ke||(Ke=1,(function(n){n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};n.isValid=function(t){return t!=null&&t!==""&&!isNaN(t)&&t>=0&&t<=7},n.from=function(t){return n.isValid(t)?parseInt(t,10):void 0},n.getPenaltyN1=function(t){const o=t.size;let s=0,c=0,a=0,l=null,u=null;for(let m=0;m<o;m++){c=a=0,l=u=null;for(let f=0;f<o;f++){let d=t.get(m,f);d===l?c++:(c>=5&&(s+=e.N1+(c-5)),l=d,c=1),d=t.get(f,m),d===u?a++:(a>=5&&(s+=e.N1+(a-5)),u=d,a=1)}c>=5&&(s+=e.N1+(c-5)),a>=5&&(s+=e.N1+(a-5))}return s},n.getPenaltyN2=function(t){const o=t.size;let s=0;for(let c=0;c<o-1;c++)for(let a=0;a<o-1;a++){const l=t.get(c,a)+t.get(c,a+1)+t.get(c+1,a)+t.get(c+1,a+1);(l===4||l===0)&&s++}return s*e.N2},n.getPenaltyN3=function(t){const o=t.size;let s=0,c=0,a=0;for(let l=0;l<o;l++){c=a=0;for(let u=0;u<o;u++)c=c<<1&2047|t.get(l,u),u>=10&&(c===1488||c===93)&&s++,a=a<<1&2047|t.get(u,l),u>=10&&(a===1488||a===93)&&s++}return s*e.N3},n.getPenaltyN4=function(t){let o=0;const s=t.data.length;for(let a=0;a<s;a++)o+=t.data[a];return Math.abs(Math.ceil(o*100/s/5)-10)*e.N4};function i(r,t,o){switch(r){case n.Patterns.PATTERN000:return(t+o)%2===0;case n.Patterns.PATTERN001:return t%2===0;case n.Patterns.PATTERN010:return o%3===0;case n.Patterns.PATTERN011:return(t+o)%3===0;case n.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(o/3))%2===0;case n.Patterns.PATTERN101:return t*o%2+t*o%3===0;case n.Patterns.PATTERN110:return(t*o%2+t*o%3)%2===0;case n.Patterns.PATTERN111:return(t*o%3+(t+o)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}n.applyMask=function(t,o){const s=o.size;for(let c=0;c<s;c++)for(let a=0;a<s;a++)o.isReserved(a,c)||o.xor(a,c,i(t,a,c))},n.getBestMask=function(t,o){const s=Object.keys(n.Patterns).length;let c=0,a=1/0;for(let l=0;l<s;l++){o(l),n.applyMask(l,t);const u=n.getPenaltyN1(t)+n.getPenaltyN2(t)+n.getPenaltyN3(t)+n.getPenaltyN4(t);n.applyMask(l,t),u<a&&(a=u,c=l)}return c}})(me)),me}var ee={},Ye;function vt(){if(Ye)return ee;Ye=1;const n=Me(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return ee.getBlocksCount=function(t,o){switch(o){case n.L:return e[(t-1)*4+0];case n.M:return e[(t-1)*4+1];case n.Q:return e[(t-1)*4+2];case n.H:return e[(t-1)*4+3];default:return}},ee.getTotalCodewordsCount=function(t,o){switch(o){case n.L:return i[(t-1)*4+0];case n.M:return i[(t-1)*4+1];case n.Q:return i[(t-1)*4+2];case n.H:return i[(t-1)*4+3];default:return}},ee}var pe={},Q={},Qe;function Ft(){if(Qe)return Q;Qe=1;const n=new Uint8Array(512),e=new Uint8Array(256);return(function(){let r=1;for(let t=0;t<255;t++)n[t]=r,e[r]=t,r<<=1,r&256&&(r^=285);for(let t=255;t<512;t++)n[t]=n[t-255]})(),Q.log=function(r){if(r<1)throw new Error("log("+r+")");return e[r]},Q.exp=function(r){return n[r]},Q.mul=function(r,t){return r===0||t===0?0:n[e[r]+e[t]]},Q}var Xe;function Ut(){return Xe||(Xe=1,(function(n){const e=Ft();n.mul=function(r,t){const o=new Uint8Array(r.length+t.length-1);for(let s=0;s<r.length;s++)for(let c=0;c<t.length;c++)o[s+c]^=e.mul(r[s],t[c]);return o},n.mod=function(r,t){let o=new Uint8Array(r);for(;o.length-t.length>=0;){const s=o[0];for(let a=0;a<t.length;a++)o[a]^=e.mul(t[a],s);let c=0;for(;c<o.length&&o[c]===0;)c++;o=o.slice(c)}return o},n.generateECPolynomial=function(r){let t=new Uint8Array([1]);for(let o=0;o<r;o++)t=n.mul(t,new Uint8Array([1,e.exp(o)]));return t}})(pe)),pe}var ve,We;function Ot(){if(We)return ve;We=1;const n=Ut();function e(i){this.genPoly=void 0,this.degree=i,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(r){this.degree=r,this.genPoly=n.generateECPolynomial(this.degree)},e.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const t=new Uint8Array(r.length+this.degree);t.set(r);const o=n.mod(t,this.genPoly),s=this.degree-o.length;if(s>0){const c=new Uint8Array(this.degree);return c.set(o,s),c}return o},ve=e,ve}var be={},ye={},we={},Ze;function bt(){return Ze||(Ze=1,we.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),we}var G={},et;function yt(){if(et)return G;et=1;const n="[0-9]+",e="[A-Z $%*+\\-./:]+";let i="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";i=i.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+i+`)(?:.|[\r
]))+`;G.KANJI=new RegExp(i,"g"),G.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),G.BYTE=new RegExp(r,"g"),G.NUMERIC=new RegExp(n,"g"),G.ALPHANUMERIC=new RegExp(e,"g");const t=new RegExp("^"+i+"$"),o=new RegExp("^"+n+"$"),s=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return G.testKanji=function(a){return t.test(a)},G.testNumeric=function(a){return o.test(a)},G.testAlphanumeric=function(a){return s.test(a)},G}var tt;function H(){return tt||(tt=1,(function(n){const e=bt(),i=yt();n.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},n.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},n.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},n.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},n.MIXED={bit:-1},n.getCharCountIndicator=function(o,s){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!e.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?o.ccBits[0]:s<27?o.ccBits[1]:o.ccBits[2]},n.getBestModeForData=function(o){return i.testNumeric(o)?n.NUMERIC:i.testAlphanumeric(o)?n.ALPHANUMERIC:i.testKanji(o)?n.KANJI:n.BYTE},n.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},n.isValid=function(o){return o&&o.bit&&o.ccBits};function r(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw new Error("Unknown mode: "+t)}}n.from=function(o,s){if(n.isValid(o))return o;try{return r(o)}catch{return s}}})(ye)),ye}var nt;function Vt(){return nt||(nt=1,(function(n){const e=V(),i=vt(),r=Me(),t=H(),o=bt(),s=7973,c=e.getBCHDigit(s);function a(f,d,S){for(let R=1;R<=40;R++)if(d<=n.getCapacity(R,S,f))return R}function l(f,d){return t.getCharCountIndicator(f,d)+4}function u(f,d){let S=0;return f.forEach(function(R){const M=l(R.mode,d);S+=M+R.getBitsLength()}),S}function m(f,d){for(let S=1;S<=40;S++)if(u(f,S)<=n.getCapacity(S,d,t.MIXED))return S}n.from=function(d,S){return o.isValid(d)?parseInt(d,10):S},n.getCapacity=function(d,S,R){if(!o.isValid(d))throw new Error("Invalid QR Code version");typeof R>"u"&&(R=t.BYTE);const M=e.getSymbolTotalCodewords(d),I=i.getTotalCodewordsCount(d,S),A=(M-I)*8;if(R===t.MIXED)return A;const T=A-l(R,d);switch(R){case t.NUMERIC:return Math.floor(T/10*3);case t.ALPHANUMERIC:return Math.floor(T/11*2);case t.KANJI:return Math.floor(T/13);case t.BYTE:default:return Math.floor(T/8)}},n.getBestVersionForData=function(d,S){let R;const M=r.from(S,r.M);if(Array.isArray(d)){if(d.length>1)return m(d,M);if(d.length===0)return 1;R=d[0]}else R=d;return a(R.mode,R.getLength(),M)},n.getEncodedBits=function(d){if(!o.isValid(d)||d<7)throw new Error("Invalid QR Code version");let S=d<<12;for(;e.getBCHDigit(S)-c>=0;)S^=s<<e.getBCHDigit(S)-c;return d<<12|S}})(be)),be}var Ee={},it;function Ht(){if(it)return Ee;it=1;const n=V(),e=1335,i=21522,r=n.getBCHDigit(e);return Ee.getEncodedBits=function(o,s){const c=o.bit<<3|s;let a=c<<10;for(;n.getBCHDigit(a)-r>=0;)a^=e<<n.getBCHDigit(a)-r;return(c<<10|a)^i},Ee}var Ce={},Ne,rt;function jt(){if(rt)return Ne;rt=1;const n=H();function e(i){this.mode=n.NUMERIC,this.data=i.toString()}return e.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(r){let t,o,s;for(t=0;t+3<=this.data.length;t+=3)o=this.data.substr(t,3),s=parseInt(o,10),r.put(s,10);const c=this.data.length-t;c>0&&(o=this.data.substr(t),s=parseInt(o,10),r.put(s,c*3+1))},Ne=e,Ne}var Se,ot;function Jt(){if(ot)return Se;ot=1;const n=H(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(r){this.mode=n.ALPHANUMERIC,this.data=r}return i.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){let o;for(o=0;o+2<=this.data.length;o+=2){let s=e.indexOf(this.data[o])*45;s+=e.indexOf(this.data[o+1]),t.put(s,11)}this.data.length%2&&t.put(e.indexOf(this.data[o]),6)},Se=i,Se}var Ie,st;function Kt(){if(st)return Ie;st=1;const n=H();function e(i){this.mode=n.BYTE,typeof i=="string"?this.data=new TextEncoder().encode(i):this.data=new Uint8Array(i)}return e.getBitsLength=function(r){return r*8},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){for(let r=0,t=this.data.length;r<t;r++)i.put(this.data[r],8)},Ie=e,Ie}var Te,at;function Yt(){if(at)return Te;at=1;const n=H(),e=V();function i(r){this.mode=n.KANJI,this.data=r}return i.getBitsLength=function(t){return t*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(r){let t;for(t=0;t<this.data.length;t++){let o=e.toSJIS(this.data[t]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);o=(o>>>8&255)*192+(o&255),r.put(o,13)}},Te=i,Te}var Re={exports:{}},ct;function Qt(){return ct||(ct=1,(function(n){var e={single_source_shortest_paths:function(i,r,t){var o={},s={};s[r]=0;var c=e.PriorityQueue.make();c.push(r,0);for(var a,l,u,m,f,d,S,R,M;!c.empty();){a=c.pop(),l=a.value,m=a.cost,f=i[l]||{};for(u in f)f.hasOwnProperty(u)&&(d=f[u],S=m+d,R=s[u],M=typeof s[u]>"u",(M||R>S)&&(s[u]=S,c.push(u,S),o[u]=l))}if(typeof t<"u"&&typeof s[t]>"u"){var I=["Could not find a path from ",r," to ",t,"."].join("");throw new Error(I)}return o},extract_shortest_path_from_predecessor_list:function(i,r){for(var t=[],o=r;o;)t.push(o),i[o],o=i[o];return t.reverse(),t},find_path:function(i,r,t){var o=e.single_source_shortest_paths(i,r,t);return e.extract_shortest_path_from_predecessor_list(o,t)},PriorityQueue:{make:function(i){var r=e.PriorityQueue,t={},o;i=i||{};for(o in r)r.hasOwnProperty(o)&&(t[o]=r[o]);return t.queue=[],t.sorter=i.sorter||r.default_sorter,t},default_sorter:function(i,r){return i.cost-r.cost},push:function(i,r){var t={value:i,cost:r};this.queue.push(t),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};n.exports=e})(Re)),Re.exports}var lt;function Xt(){return lt||(lt=1,(function(n){const e=H(),i=jt(),r=Jt(),t=Kt(),o=Yt(),s=yt(),c=V(),a=Qt();function l(I){return unescape(encodeURIComponent(I)).length}function u(I,A,T){const E=[];let q;for(;(q=I.exec(T))!==null;)E.push({data:q[0],index:q.index,mode:A,length:q[0].length});return E}function m(I){const A=u(s.NUMERIC,e.NUMERIC,I),T=u(s.ALPHANUMERIC,e.ALPHANUMERIC,I);let E,q;return c.isKanjiModeEnabled()?(E=u(s.BYTE,e.BYTE,I),q=u(s.KANJI,e.KANJI,I)):(E=u(s.BYTE_KANJI,e.BYTE,I),q=[]),A.concat(T,E,q).sort(function(y,b){return y.index-b.index}).map(function(y){return{data:y.data,mode:y.mode,length:y.length}})}function f(I,A){switch(A){case e.NUMERIC:return i.getBitsLength(I);case e.ALPHANUMERIC:return r.getBitsLength(I);case e.KANJI:return o.getBitsLength(I);case e.BYTE:return t.getBitsLength(I)}}function d(I){return I.reduce(function(A,T){const E=A.length-1>=0?A[A.length-1]:null;return E&&E.mode===T.mode?(A[A.length-1].data+=T.data,A):(A.push(T),A)},[])}function S(I){const A=[];for(let T=0;T<I.length;T++){const E=I[T];switch(E.mode){case e.NUMERIC:A.push([E,{data:E.data,mode:e.ALPHANUMERIC,length:E.length},{data:E.data,mode:e.BYTE,length:E.length}]);break;case e.ALPHANUMERIC:A.push([E,{data:E.data,mode:e.BYTE,length:E.length}]);break;case e.KANJI:A.push([E,{data:E.data,mode:e.BYTE,length:l(E.data)}]);break;case e.BYTE:A.push([{data:E.data,mode:e.BYTE,length:l(E.data)}])}}return A}function R(I,A){const T={},E={start:{}};let q=["start"];for(let h=0;h<I.length;h++){const y=I[h],b=[];for(let g=0;g<y.length;g++){const C=y[g],p=""+h+g;b.push(p),T[p]={node:C,lastCount:0},E[p]={};for(let w=0;w<q.length;w++){const v=q[w];T[v]&&T[v].node.mode===C.mode?(E[v][p]=f(T[v].lastCount+C.length,C.mode)-f(T[v].lastCount,C.mode),T[v].lastCount+=C.length):(T[v]&&(T[v].lastCount=C.length),E[v][p]=f(C.length,C.mode)+4+e.getCharCountIndicator(C.mode,A))}}q=b}for(let h=0;h<q.length;h++)E[q[h]].end=0;return{map:E,table:T}}function M(I,A){let T;const E=e.getBestModeForData(I);if(T=e.from(A,E),T!==e.BYTE&&T.bit<E.bit)throw new Error('"'+I+'" cannot be encoded with mode '+e.toString(T)+`.
 Suggested mode is: `+e.toString(E));switch(T===e.KANJI&&!c.isKanjiModeEnabled()&&(T=e.BYTE),T){case e.NUMERIC:return new i(I);case e.ALPHANUMERIC:return new r(I);case e.KANJI:return new o(I);case e.BYTE:return new t(I)}}n.fromArray=function(A){return A.reduce(function(T,E){return typeof E=="string"?T.push(M(E,null)):E.data&&T.push(M(E.data,E.mode)),T},[])},n.fromString=function(A,T){const E=m(A,c.isKanjiModeEnabled()),q=S(E),h=R(q,T),y=a.find_path(h.map,"start","end"),b=[];for(let g=1;g<y.length-1;g++)b.push(h.table[y[g]].node);return n.fromArray(d(b))},n.rawSplit=function(A){return n.fromArray(m(A,c.isKanjiModeEnabled()))}})(Ce)),Ce}var ut;function Wt(){if(ut)return le;ut=1;const n=V(),e=Me(),i=xt(),r=Dt(),t=Gt(),o=kt(),s=zt(),c=vt(),a=Ot(),l=Vt(),u=Ht(),m=H(),f=Xt();function d(h,y){const b=h.size,g=o.getPositions(y);for(let C=0;C<g.length;C++){const p=g[C][0],w=g[C][1];for(let v=-1;v<=7;v++)if(!(p+v<=-1||b<=p+v))for(let B=-1;B<=7;B++)w+B<=-1||b<=w+B||(v>=0&&v<=6&&(B===0||B===6)||B>=0&&B<=6&&(v===0||v===6)||v>=2&&v<=4&&B>=2&&B<=4?h.set(p+v,w+B,!0,!0):h.set(p+v,w+B,!1,!0))}}function S(h){const y=h.size;for(let b=8;b<y-8;b++){const g=b%2===0;h.set(b,6,g,!0),h.set(6,b,g,!0)}}function R(h,y){const b=t.getPositions(y);for(let g=0;g<b.length;g++){const C=b[g][0],p=b[g][1];for(let w=-2;w<=2;w++)for(let v=-2;v<=2;v++)w===-2||w===2||v===-2||v===2||w===0&&v===0?h.set(C+w,p+v,!0,!0):h.set(C+w,p+v,!1,!0)}}function M(h,y){const b=h.size,g=l.getEncodedBits(y);let C,p,w;for(let v=0;v<18;v++)C=Math.floor(v/3),p=v%3+b-8-3,w=(g>>v&1)===1,h.set(C,p,w,!0),h.set(p,C,w,!0)}function I(h,y,b){const g=h.size,C=u.getEncodedBits(y,b);let p,w;for(p=0;p<15;p++)w=(C>>p&1)===1,p<6?h.set(p,8,w,!0):p<8?h.set(p+1,8,w,!0):h.set(g-15+p,8,w,!0),p<8?h.set(8,g-p-1,w,!0):p<9?h.set(8,15-p-1+1,w,!0):h.set(8,15-p-1,w,!0);h.set(g-8,8,1,!0)}function A(h,y){const b=h.size;let g=-1,C=b-1,p=7,w=0;for(let v=b-1;v>0;v-=2)for(v===6&&v--;;){for(let B=0;B<2;B++)if(!h.isReserved(C,v-B)){let F=!1;w<y.length&&(F=(y[w]>>>p&1)===1),h.set(C,v-B,F),p--,p===-1&&(w++,p=7)}if(C+=g,C<0||b<=C){C-=g,g=-g;break}}}function T(h,y,b){const g=new i;b.forEach(function(B){g.put(B.mode.bit,4),g.put(B.getLength(),m.getCharCountIndicator(B.mode,h)),B.write(g)});const C=n.getSymbolTotalCodewords(h),p=c.getTotalCodewordsCount(h,y),w=(C-p)*8;for(g.getLengthInBits()+4<=w&&g.put(0,4);g.getLengthInBits()%8!==0;)g.putBit(0);const v=(w-g.getLengthInBits())/8;for(let B=0;B<v;B++)g.put(B%2?17:236,8);return E(g,h,y)}function E(h,y,b){const g=n.getSymbolTotalCodewords(y),C=c.getTotalCodewordsCount(y,b),p=g-C,w=c.getBlocksCount(y,b),v=g%w,B=w-v,F=Math.floor(g/w),Y=Math.floor(p/w),_t=Y+1,Ge=F-Y,$t=new a(Ge);let re=0;const Z=new Array(w),ke=new Array(w);let oe=0;const Mt=new Uint8Array(h.buffer);for(let j=0;j<w;j++){const ae=j<B?Y:_t;Z[j]=Mt.slice(re,re+ae),ke[j]=$t.encode(Z[j]),re+=ae,oe=Math.max(oe,ae)}const se=new Uint8Array(g);let ze=0,k,z;for(k=0;k<oe;k++)for(z=0;z<w;z++)k<Z[z].length&&(se[ze++]=Z[z][k]);for(k=0;k<Ge;k++)for(z=0;z<w;z++)se[ze++]=ke[z][k];return se}function q(h,y,b,g){let C;if(Array.isArray(h))C=f.fromArray(h);else if(typeof h=="string"){let F=y;if(!F){const Y=f.rawSplit(h);F=l.getBestVersionForData(Y,b)}C=f.fromString(h,F||40)}else throw new Error("Invalid data");const p=l.getBestVersionForData(C,b);if(!p)throw new Error("The amount of data is too big to be stored in a QR Code");if(!y)y=p;else if(y<p)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+p+`.
`);const w=T(y,b,C),v=n.getSymbolSize(y),B=new r(v);return d(B,y),S(B),R(B,y),I(B,b,0),y>=7&&M(B,y),A(B,w),isNaN(g)&&(g=s.getBestMask(B,I.bind(null,B,b))),s.applyMask(g,B),I(B,b,g),{modules:B,version:y,errorCorrectionLevel:b,maskPattern:g,segments:C}}return le.create=function(y,b){if(typeof y>"u"||y==="")throw new Error("No input text");let g=e.M,C,p;return typeof b<"u"&&(g=e.from(b.errorCorrectionLevel,e.M),C=l.from(b.version),p=s.from(b.maskPattern),b.toSJISFunc&&n.setToSJISFunction(b.toSJISFunc)),q(y,C,g,p)},le}var Be={},Ae={},dt;function wt(){return dt||(dt=1,(function(n){function e(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let r=i.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+i);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(o){return[o,o]}))),r.length===6&&r.push("F","F");const t=parseInt(r.join(""),16);return{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:t&255,hex:"#"+r.slice(0,6).join("")}}n.getOptions=function(r){r||(r={}),r.color||(r.color={});const t=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,o=r.width&&r.width>=21?r.width:void 0,s=r.scale||4;return{width:o,scale:o?4:s,margin:t,color:{dark:e(r.color.dark||"#000000ff"),light:e(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},n.getScale=function(r,t){return t.width&&t.width>=r+t.margin*2?t.width/(r+t.margin*2):t.scale},n.getImageWidth=function(r,t){const o=n.getScale(r,t);return Math.floor((r+t.margin*2)*o)},n.qrToImageData=function(r,t,o){const s=t.modules.size,c=t.modules.data,a=n.getScale(s,o),l=Math.floor((s+o.margin*2)*a),u=o.margin*a,m=[o.color.light,o.color.dark];for(let f=0;f<l;f++)for(let d=0;d<l;d++){let S=(f*l+d)*4,R=o.color.light;if(f>=u&&d>=u&&f<l-u&&d<l-u){const M=Math.floor((f-u)/a),I=Math.floor((d-u)/a);R=m[c[M*s+I]?1:0]}r[S++]=R.r,r[S++]=R.g,r[S++]=R.b,r[S]=R.a}}})(Ae)),Ae}var ft;function Zt(){return ft||(ft=1,(function(n){const e=wt();function i(t,o,s){t.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=s,o.width=s,o.style.height=s+"px",o.style.width=s+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}n.render=function(o,s,c){let a=c,l=s;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),s||(l=r()),a=e.getOptions(a);const u=e.getImageWidth(o.modules.size,a),m=l.getContext("2d"),f=m.createImageData(u,u);return e.qrToImageData(f.data,o,a),i(m,l,u),m.putImageData(f,0,0),l},n.renderToDataURL=function(o,s,c){let a=c;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),a||(a={});const l=n.render(o,s,a),u=a.type||"image/png",m=a.rendererOpts||{};return l.toDataURL(u,m.quality)}})(Be)),Be}var Pe={},gt;function en(){if(gt)return Pe;gt=1;const n=wt();function e(t,o){const s=t.a/255,c=o+'="'+t.hex+'"';return s<1?c+" "+o+'-opacity="'+s.toFixed(2).slice(1)+'"':c}function i(t,o,s){let c=t+o;return typeof s<"u"&&(c+=" "+s),c}function r(t,o,s){let c="",a=0,l=!1,u=0;for(let m=0;m<t.length;m++){const f=Math.floor(m%o),d=Math.floor(m/o);!f&&!l&&(l=!0),t[m]?(u++,m>0&&f>0&&t[m-1]||(c+=l?i("M",f+s,.5+d+s):i("m",a,0),a=0,l=!1),f+1<o&&t[m+1]||(c+=i("h",u),u=0)):a++}return c}return Pe.render=function(o,s,c){const a=n.getOptions(s),l=o.modules.size,u=o.modules.data,m=l+a.margin*2,f=a.color.light.a?"<path "+e(a.color.light,"fill")+' d="M0 0h'+m+"v"+m+'H0z"/>':"",d="<path "+e(a.color.dark,"stroke")+' d="'+r(u,l,a.margin)+'"/>',S='viewBox="0 0 '+m+" "+m+'"',M='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+S+' shape-rendering="crispEdges">'+f+d+`</svg>
`;return typeof c=="function"&&c(null,M),M},Pe}var ht;function tn(){if(ht)return J;ht=1;const n=Lt(),e=Wt(),i=Zt(),r=en();function t(o,s,c,a,l){const u=[].slice.call(arguments,1),m=u.length,f=typeof u[m-1]=="function";if(!f&&!n())throw new Error("Callback required as last argument");if(f){if(m<2)throw new Error("Too few arguments provided");m===2?(l=c,c=s,s=a=void 0):m===3&&(s.getContext&&typeof l>"u"?(l=a,a=void 0):(l=a,a=c,c=s,s=void 0))}else{if(m<1)throw new Error("Too few arguments provided");return m===1?(c=s,s=a=void 0):m===2&&!s.getContext&&(a=c,c=s,s=void 0),new Promise(function(d,S){try{const R=e.create(c,a);d(o(R,s,a))}catch(R){S(R)}})}try{const d=e.create(c,a);l(null,o(d,s,a))}catch(d){l(d)}}return J.create=e.create,J.toCanvas=t.bind(null,i.render),J.toDataURL=t.bind(null,i.renderToDataURL),J.toString=t.bind(null,function(o,s,c){return r.render(o,c)}),J}var nn=tn();const rn=qt(nn),Et=.09,Ct=1e3;function O(n){return+(Math.round(+(n+"e2"))+"e-2")}function on(n){const e=Math.round(+(n+"e2"));return+(Math.round(e/5)*5+"e-2")}function mt(n){return O(n*Et)}function $e(n){return O(n.quantity*n.unitPriceExGst)}function Nt(n,e={}){const i=e.method??"per_line",r=O(Math.max(e.discountExGst??0,0)),t=O(n.reduce((l,u)=>l+$e(u),0)),o=O(Math.max(t-r,0)),s=n.map(l=>mt($e(l)));let c;if(i==="per_line")if(t>0&&r>0){const l=o/t;c=O(s.reduce((u,m)=>u+m*l,0))}else c=O(s.reduce((l,u)=>l+u,0));else c=mt(o);let a=O(o+c);return e.roundCash&&(a=on(a)),{subtotalExGst:t,discountExGst:r,taxableExGst:o,gstAmount:c,totalInclGst:a,lineGst:s}}function St(n,e,i){return e.isCreditNote?"credit_note":n.gstRegistered?e.customer.gstRegistered?i.totalInclGst<=Ct?"simplified_tax_invoice":"tax_invoice":"receipt":"invoice"}function sn(n){return{invoice:"INVOICE",tax_invoice:"TAX INVOICE",simplified_tax_invoice:"TAX INVOICE",receipt:"RECEIPT",credit_note:"CREDIT NOTE"}[n]}function an(n){return n==="simplified_tax_invoice"||n==="receipt"}function cn(n,e,i,r){const t=[];return n.name.trim()||t.push({field:"profile.name",message:"Business name is required."}),n.address.trim()||t.push({field:"profile.address",message:"Business address is required."}),e.invoiceNumber.trim()||t.push({field:"invoice_number",message:"Invoice number is required."}),e.date.trim()||t.push({field:"date",message:"Invoice date is required."}),e.lineItems.length||t.push({field:"line_items",message:"At least one line item is required."}),i==="invoice"?t:i==="credit_note"?(e.originalInvoiceNumber.trim()||t.push({field:"original_invoice_number",message:"Original invoice number is required on a credit note."}),n.gstRegistered&&!n.gstRegistrationNumber.trim()&&t.push({field:"profile.gst_registration_number",message:"GST registration number is required for GST documents."}),t):n.gstRegistered?(n.gstRegistrationNumber.trim()||t.push({field:"profile.gst_registration_number",message:"GST registration number is required for GST documents."}),(i==="tax_invoice"||i==="simplified_tax_invoice")&&(e.customer.name.trim()||t.push({field:"customer.name",message:"Customer name is required on a tax invoice."}),i==="tax_invoice"&&!e.customer.address.trim()&&t.push({field:"customer.address",message:"Customer address is required on a full tax invoice."})),i==="receipt"&&r.totalInclGst<=0&&t.push({field:"total",message:"Receipt total must be greater than zero."}),t):(t.push({field:"profile.gst_registered",message:"GST-registered mode requires GST registration to be enabled."}),t)}function D(n,e="SGD"){return new Intl.NumberFormat("en-SG",{style:"currency",currency:e,minimumFractionDigits:2}).format(n)}function pt(n){return n?new Date(n+"T12:00:00").toLocaleDateString("en-SG",{day:"2-digit",month:"short",year:"numeric"}):""}function L(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function x(n,e){return`${n}${String(e.length).padStart(2,"0")}${e}`}function ln(n){let e=65535;for(let i=0;i<n.length;i++){e^=n.charCodeAt(i)<<8;for(let r=0;r<8;r++)e=e&32768?(e<<1^4129)&65535:e<<1&65535}return e.toString(16).toUpperCase().padStart(4,"0")}function un({uen:n,name:e,amount:i,reference:r}){const t=typeof i=="number"&&i>0,o=[x("00","SG.PAYNOW"),x("01","2"),x("02",n),x("03","0")].join(""),c=[x("00","01"),x("01",t?"12":"11"),x("26",o),x("52","0000"),x("53","702"),...t?[x("54",i.toFixed(2))]:[],x("58","SG"),x("59",e.slice(0,25)),x("60","Singapore"),...r?[x("62",x("01",r.slice(0,25)))]:[],"6304"].join("");return c+ln(c)}const It="sg-invoice-app-v1",qe=()=>({name:"",address:"",phone:"",email:"",uen:"",gstRegistrationNumber:"",gstRegistered:!1,bankName:"",bankAccount:"",paynow:"",invoicePrefix:"INV",calculationMethod:"per_line",roundCashToFiveCents:!1}),K=()=>({invoiceNumber:"",date:new Date().toISOString().slice(0,10),dueDate:"",paymentTerms:"Payment due within 14 days",notes:"",currency:"SGD",lineItems:[{id:crypto.randomUUID(),description:"",quantity:1,unitPriceExGst:0}],customer:{name:"",address:"",gstRegistered:!1},discountExGst:0,isCreditNote:!1,originalInvoiceNumber:""});function _e(){return{profile:qe(),invoice:K(),nextSequence:1}}function dn(){var n,e,i;try{const r=localStorage.getItem(It);if(!r)return _e();const t=JSON.parse(r);return{..._e(),...t,profile:{...qe(),...t.profile},invoice:{...K(),...t.invoice,customer:{...K().customer,...(n=t.invoice)==null?void 0:n.customer},lineItems:(i=(e=t.invoice)==null?void 0:e.lineItems)!=null&&i.length?t.invoice.lineItems:K().lineItems}}}catch{return _e()}}function Tt(n){localStorage.setItem(It,JSON.stringify(n))}function fn(n){return JSON.stringify({exportedAt:new Date().toISOString(),profile:n.profile,invoice:n.invoice,nextSequence:n.nextSequence},null,2)}function gn(n){var i;const e=JSON.parse(n);return{profile:{...qe(),...e.profile},invoice:{...K(),...e.invoice,customer:{...K().customer,...(i=e.invoice)==null?void 0:i.customer}},nextSequence:e.nextSequence??1}}function Rt(n,e,i){return`${n}-${e}-${String(i).padStart(4,"0")}`}function Bt(n){const{profile:e,invoice:i}=n,r=Nt(i.lineItems,{discountExGst:i.discountExGst,method:e.calculationMethod,roundCash:e.roundCashToFiveCents}),t=St(e,i,r),o=sn(t),s=e.gstRegistered,c=t==="simplified_tax_invoice",a=t==="receipt",l=t==="credit_note",u=i.lineItems.map(f=>{const d=$e(f),S=s?r.lineGst[i.lineItems.indexOf(f)]??0:0,R=s?d+S:d;return c||a?`
        <tr>
          <td>${L(f.description||"—")}</td>
          <td class="num">${f.quantity}</td>
          <td class="num">${D(R,i.currency)}</td>
        </tr>`:`
        <tr>
          <td>${L(f.description||"—")}</td>
          <td class="num">${f.quantity}</td>
          <td class="num">${D(f.unitPriceExGst,i.currency)}</td>
          ${s?`<td class="num">${D(S,i.currency)}</td>`:""}
          <td class="num">${D(s?R:d,i.currency)}</td>
        </tr>`}).join(""),m=e.gstRegistrationNumber||e.uen;return`
    <article class="invoice-doc" data-doc-type="${t}">
      <header class="invoice-doc__header">
        <div class="invoice-doc__brand">
          <h1 class="invoice-doc__title">${o}</h1>
          ${c?'<p class="invoice-doc__subtitle">Simplified tax invoice</p>':""}
        </div>
        <div class="invoice-doc__meta">
          <p><strong>No.</strong> ${L(i.invoiceNumber)}</p>
          <p><strong>Date</strong> ${pt(i.date)}</p>
          ${i.dueDate?`<p><strong>Due</strong> ${pt(i.dueDate)}</p>`:""}
          ${l&&i.originalInvoiceNumber?`<p><strong>Credits invoice</strong> ${L(i.originalInvoiceNumber)}</p>`:""}
        </div>
      </header>

      <section class="invoice-doc__parties">
        <div>
          <h2>From</h2>
          <p class="party-name">${L(e.name)}</p>
          <p class="party-address">${L(e.address).replace(/\n/g,"<br>")}</p>
          ${e.phone?`<p>${L(e.phone)}</p>`:""}
          ${e.email?`<p>${L(e.email)}</p>`:""}
          ${e.uen?`<p>UEN: ${L(e.uen)}</p>`:""}
          ${s&&m?`<p>GST Reg No.: ${L(m)}</p>`:""}
        </div>
        <div>
          <h2>Bill to</h2>
          <p class="party-name">${L(i.customer.name||"—")}</p>
          ${i.customer.address?`<p class="party-address">${L(i.customer.address).replace(/\n/g,"<br>")}</p>`:""}
          ${i.customer.gstRegistered&&s?"<p>GST-registered customer</p>":""}
        </div>
      </section>

      <table class="invoice-doc__table">
        <thead>
          <tr>
            <th>Description</th>
            <th class="num">Qty</th>
            ${c||a?'<th class="num">Amount</th>':`
            <th class="num">Unit (ex GST)</th>
            ${s?'<th class="num">GST</th>':""}
            <th class="num">${s?"Total (incl GST)":"Amount"}</th>`}
          </tr>
        </thead>
        <tbody>${u}</tbody>
      </table>

      <section class="invoice-doc__totals">
        ${!c&&!a?`
        <div class="totals-row"><span>Subtotal (ex GST)</span><span>${D(r.subtotalExGst,i.currency)}</span></div>
        ${i.discountExGst>0?`<div class="totals-row"><span>Discount (ex GST)</span><span>−${D(r.discountExGst,i.currency)}</span></div>`:""}
        ${s?`
        <div class="totals-row"><span>Taxable (ex GST)</span><span>${D(r.taxableExGst,i.currency)}</span></div>
        <div class="totals-row"><span>GST @ ${Et*100}%</span><span>${D(r.gstAmount,i.currency)}</span></div>`:""}
        `:""}
        <div class="totals-row totals-row--grand">
          <span>Total payable</span>
          <span>${D(s?r.totalInclGst:r.taxableExGst,i.currency)}</span>
        </div>
        ${an(t)?'<p class="gst-statement">Price payable includes GST</p>':""}
      </section>

      ${i.paymentTerms?`<p class="invoice-doc__terms">${L(i.paymentTerms)}</p>`:""}
      ${i.notes?`<p class="invoice-doc__notes"><strong>Notes:</strong> ${L(i.notes)}</p>`:""}

      ${e.bankAccount||e.paynow||e.uen?`
      <section class="invoice-doc__payment">
        <h2>Payment</h2>
        <div style="display:flex;gap:1.5rem;align-items:flex-start">
          <div>
            ${e.bankName?`<p>${L(e.bankName)}</p>`:""}
            ${e.bankAccount?`<p>Account: ${L(e.bankAccount)}</p>`:""}
            ${e.paynow?`<p>PayNow: ${L(e.paynow)}</p>`:""}
          </div>
          ${e.uen?`
          <div style="text-align:center;flex-shrink:0">
            <canvas id="paynow-qr-canvas" width="120" height="120"></canvas>
            <p style="margin:0.25rem 0 0;font-size:0.7rem;color:#555">PayNow · ${L(e.uen)}</p>
          </div>`:""}
        </div>
      </section>`:""}

      <footer class="invoice-doc__footer">
        <p>For record-keeping assistance only. Not tax or legal advice. Confirm requirements with IRAS or your accountant.</p>
      </footer>
    </article>
  `}function Le(n){return{invoice:"Standard invoice",tax_invoice:"Full tax invoice",simplified_tax_invoice:`Simplified tax invoice (≤ $${Ct.toLocaleString()})`,receipt:"Receipt (non-GST customer)",credit_note:"Credit note"}[n]}let N=dn(),te="profile";function W(){return Nt(N.invoice.lineItems,{discountExGst:N.invoice.discountExGst,method:N.profile.calculationMethod,roundCash:N.profile.roundCashToFiveCents})}function ne(){return St(N.profile,N.invoice,W())}function At(){return cn(N.profile,N.invoice,ne(),W())}function xe(){const n=document.getElementById("paynow-qr-canvas");if(!n||!N.profile.uen)return;const e=W(),i=N.profile.gstRegistered?e.totalInclGst:e.taxableExGst,r=un({uen:N.profile.uen,name:N.profile.name||N.profile.uen,amount:i>0?i:void 0,reference:N.invoice.invoiceNumber||void 0});rn.toCanvas(n,r,{width:120,margin:2}).catch(()=>{})}function hn(){const n=W(),e=ne(),i=At(),r=Le(e),t=document.getElementById("preview-root");t&&(t.innerHTML=Bt(N));const o=document.getElementById("preview-badge");o&&(o.textContent=r,o.className=`badge${i.length?" badge--warn":""}`);const s=document.getElementById("form-doc-type-badge");s&&(s.textContent=r);const c=document.getElementById("inv-summary");c&&(c.textContent=N.profile.gstRegistered?`GST: ${D(n.gstAmount)} · Total: ${D(n.totalInclGst)}`:`Total: ${D(n.taxableExGst)}`);const a=document.getElementById("validation-container");a&&(a.innerHTML=i.length?`<ul class="validation-list">${i.map(l=>`<li>${$(l.message)}</li>`).join("")}</ul>`:"")}function X(){Tt(N),hn(),xe()}function ie(){Tt(N),De(),xe()}function Pt(){const n=new Date().getFullYear();N.invoice.invoiceNumber||(N.invoice.invoiceNumber=Rt(N.profile.invoicePrefix,n,N.nextSequence),N.nextSequence+=1)}function _(n,e,i,r=!1){n.addEventListener("input",()=>{const t=n.type==="checkbox"?n.checked:n.value;n.type==="number"?i(parseFloat(n.value)||0):typeof e()=="boolean"?i(t):typeof e()=="number"?i(parseFloat(n.value)||0):i(t),r?ie():X()})}function mn(n){const e=N.profile;n.innerHTML=`
    <div class="form-grid form-grid--2">
      <div class="field field--full">
        <label for="biz-name">Business / trading name</label>
        <input id="biz-name" type="text" value="${$(e.name)}" />
      </div>
      <div class="field field--full">
        <label for="biz-address">Address</label>
        <textarea id="biz-address" rows="3">${$(e.address)}</textarea>
      </div>
      <div class="field">
        <label for="biz-phone">Phone</label>
        <input id="biz-phone" type="text" value="${$(e.phone)}" />
      </div>
      <div class="field">
        <label for="biz-email">Email</label>
        <input id="biz-email" type="email" value="${$(e.email)}" />
      </div>
      <div class="field">
        <label for="biz-uen">UEN</label>
        <input id="biz-uen" type="text" value="${$(e.uen)}" placeholder="e.g. 123456789A" />
      </div>
      <div class="field">
        <label for="biz-prefix">Invoice prefix</label>
        <input id="biz-prefix" type="text" value="${$(e.invoicePrefix)}" />
      </div>
      <div class="field field--full checkbox-row">
        <input id="biz-gst-reg" type="checkbox" ${e.gstRegistered?"checked":""} />
        <label for="biz-gst-reg">GST-registered business</label>
      </div>
      <div class="field ${e.gstRegistered?"":"hidden"}" id="gst-fields">
        <label for="biz-gst-no">GST registration number</label>
        <input id="biz-gst-no" type="text" value="${$(e.gstRegistrationNumber)}" />
      </div>
      <div class="field ${e.gstRegistered?"":"hidden"}" id="gst-method-field">
        <label for="biz-calc">GST calculation method</label>
        <select id="biz-calc">
          <option value="per_line" ${e.calculationMethod==="per_line"?"selected":""}>Per line item (9% each)</option>
          <option value="on_subtotal" ${e.calculationMethod==="on_subtotal"?"selected":""}>On subtotal (9% once)</option>
        </select>
      </div>
      <div class="field checkbox-row ${e.gstRegistered?"":"hidden"}" id="cash-round-field">
        <input id="biz-cash-round" type="checkbox" ${e.roundCashToFiveCents?"checked":""} />
        <label for="biz-cash-round">Round total to nearest 5¢ (cash)</label>
      </div>
      <div class="field">
        <label for="biz-bank">Bank name</label>
        <input id="biz-bank" type="text" value="${$(e.bankName)}" />
      </div>
      <div class="field">
        <label for="biz-account">Bank account</label>
        <input id="biz-account" type="text" value="${$(e.bankAccount)}" />
      </div>
      <div class="field field--full">
        <label for="biz-paynow">PayNow (UEN / mobile)</label>
        <input id="biz-paynow" type="text" value="${$(e.paynow)}" />
      </div>
    </div>
  `,_(P("#biz-name"),()=>e.name,i=>{e.name=i}),_(P("#biz-address"),()=>e.address,i=>{e.address=i}),_(P("#biz-phone"),()=>e.phone,i=>{e.phone=i}),_(P("#biz-email"),()=>e.email,i=>{e.email=i}),_(P("#biz-uen"),()=>e.uen,i=>{e.uen=i}),_(P("#biz-prefix"),()=>e.invoicePrefix,i=>{e.invoicePrefix=i}),_(P("#biz-gst-reg"),()=>e.gstRegistered,i=>{e.gstRegistered=i},!0),_(P("#biz-gst-no"),()=>e.gstRegistrationNumber,i=>{e.gstRegistrationNumber=i}),_(P("#biz-calc"),()=>e.calculationMethod,i=>{e.calculationMethod=i}),_(P("#biz-cash-round"),()=>e.roundCashToFiveCents,i=>{e.roundCashToFiveCents=i}),_(P("#biz-bank"),()=>e.bankName,i=>{e.bankName=i}),_(P("#biz-account"),()=>e.bankAccount,i=>{e.bankAccount=i}),_(P("#biz-paynow"),()=>e.paynow,i=>{e.paynow=i})}function pn(n){const e=N.invoice,i=W(),r=ne();n.innerHTML=`
    <p id="form-doc-type-badge" class="badge">${$(Le(r))}</p>
    <div class="form-grid form-grid--2" style="margin-top: 1rem">
      <div class="field">
        <label for="inv-no">Invoice number</label>
        <div style="display:flex;gap:0.5rem">
          <input id="inv-no" type="text" value="${$(e.invoiceNumber)}" style="flex:1" />
          <button type="button" class="btn btn--sm" id="btn-new-no">New no.</button>
        </div>
      </div>
      <div class="field">
        <label for="inv-date">Date</label>
        <input id="inv-date" type="date" value="${$(e.date)}" />
      </div>
      <div class="field">
        <label for="inv-due">Due date</label>
        <input id="inv-due" type="date" value="${$(e.dueDate)}" />
      </div>
      <div class="field field--full">
        <label for="inv-terms">Payment terms</label>
        <input id="inv-terms" type="text" value="${$(e.paymentTerms)}" />
      </div>
    </div>

    <div class="form-grid form-grid--2" style="margin-top:1rem">
      <div class="field field--full checkbox-row">
        <input id="inv-credit-note" type="checkbox" ${e.isCreditNote?"checked":""} />
        <label for="inv-credit-note">This is a credit note</label>
      </div>
      ${e.isCreditNote?`
      <div class="field field--full">
        <label for="inv-orig-no">Original invoice number</label>
        <input id="inv-orig-no" type="text" value="${$(e.originalInvoiceNumber)}" placeholder="e.g. INV-2026-0001" />
      </div>`:""}
    </div>

    <h3 style="margin:1.25rem 0 0.5rem;font-size:0.9rem">Customer</h3>
    <div class="form-grid form-grid--2">
      <div class="field">
        <label for="cust-name">Name</label>
        <input id="cust-name" type="text" value="${$(e.customer.name)}" />
      </div>
      <div class="field checkbox-row" style="align-self:end">
        <input id="cust-gst" type="checkbox" ${e.customer.gstRegistered?"checked":""} ${N.profile.gstRegistered?"":"disabled"} />
        <label for="cust-gst">Customer is GST-registered</label>
      </div>
      <div class="field field--full">
        <label for="cust-addr">Address</label>
        <textarea id="cust-addr" rows="2">${$(e.customer.address)}</textarea>
      </div>
    </div>

    <h3 style="margin:1.25rem 0 0.5rem;font-size:0.9rem">Line items</h3>
    <div class="line-items" id="line-items"></div>
    <button type="button" class="btn btn--sm" id="btn-add-line" style="margin-top:0.5rem">+ Add line</button>

    <div class="form-grid form-grid--2" style="margin-top:1rem">
      <div class="field">
        <label for="inv-discount">Discount (ex GST)</label>
        <input id="inv-discount" type="number" min="0" step="0.01" value="${e.discountExGst}" />
      </div>
      <div class="field">
        <label>Summary</label>
        <p id="inv-summary" style="margin:0.35rem 0 0;font-family:var(--mono);font-size:0.85rem">
          ${N.profile.gstRegistered?`GST: ${D(i.gstAmount)} · Total: ${D(i.totalInclGst)}`:`Total: ${D(i.taxableExGst)}`}
        </p>
      </div>
      <div class="field field--full">
        <label for="inv-notes">Notes</label>
        <textarea id="inv-notes" rows="2">${$(e.notes)}</textarea>
      </div>
    </div>
  `,_(P("#inv-no"),()=>e.invoiceNumber,s=>{e.invoiceNumber=s}),_(P("#inv-date"),()=>e.date,s=>{e.date=s}),_(P("#inv-due"),()=>e.dueDate,s=>{e.dueDate=s}),_(P("#inv-terms"),()=>e.paymentTerms,s=>{e.paymentTerms=s}),_(P("#cust-name"),()=>e.customer.name,s=>{e.customer.name=s}),_(P("#cust-gst"),()=>e.customer.gstRegistered,s=>{e.customer.gstRegistered=s}),_(P("#cust-addr"),()=>e.customer.address,s=>{e.customer.address=s}),_(P("#inv-discount"),()=>e.discountExGst,s=>{e.discountExGst=s}),_(P("#inv-notes"),()=>e.notes,s=>{e.notes=s}),_(P("#inv-credit-note"),()=>e.isCreditNote,s=>{e.isCreditNote=s},!0);const t=document.querySelector("#inv-orig-no");t&&_(t,()=>e.originalInvoiceNumber,s=>{e.originalInvoiceNumber=s}),P("#btn-new-no").addEventListener("click",()=>{const s=new Date().getFullYear();N.invoice.invoiceNumber=Rt(N.profile.invoicePrefix,s,N.nextSequence),N.nextSequence+=1,P("#inv-no").value=N.invoice.invoiceNumber,X()});const o=P("#line-items");vn(o),P("#btn-add-line").addEventListener("click",()=>{e.lineItems.push({id:crypto.randomUUID(),description:"",quantity:1,unitPriceExGst:0}),ie()})}function vn(n){n.innerHTML=N.invoice.lineItems.map((e,i)=>`
    <div class="line-item" data-id="${e.id}">
      <div class="field">
        <label>Description</label>
        <input type="text" data-field="desc" value="${$(e.description)}" />
      </div>
      <div class="field">
        <label>Qty</label>
        <input type="number" data-field="qty" min="0" step="1" value="${e.quantity}" />
      </div>
      <div class="field">
        <label>Unit price ${N.profile.gstRegistered?"(ex GST)":""}</label>
        <input type="number" data-field="price" min="0" step="0.01" value="${e.unitPriceExGst}" />
      </div>
      <button type="button" class="btn btn--sm btn--danger" data-remove="${i}" ${N.invoice.lineItems.length<=1?"disabled":""}>Remove</button>
    </div>`).join(""),n.querySelectorAll(".line-item").forEach(e=>{var t,o,s,c;const i=e.dataset.id,r=N.invoice.lineItems.find(a=>a.id===i);(t=e.querySelector('[data-field="desc"]'))==null||t.addEventListener("input",a=>{r.description=a.target.value,X()}),(o=e.querySelector('[data-field="qty"]'))==null||o.addEventListener("input",a=>{r.quantity=parseFloat(a.target.value)||0,X()}),(s=e.querySelector('[data-field="price"]'))==null||s.addEventListener("input",a=>{r.unitPriceExGst=parseFloat(a.target.value)||0,X()}),(c=e.querySelector("[data-remove]"))==null||c.addEventListener("click",()=>{N.invoice.lineItems.length>1&&(N.invoice.lineItems=N.invoice.lineItems.filter(a=>a.id!==i),ie())})})}function $(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function P(n){return document.querySelector(n)}function De(){const n=At(),e=P("#app");e.innerHTML=`
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
        <nav class="tabs no-print">
          <button type="button" class="tab ${te==="profile"?"tab--active":""}" data-tab="profile">Business</button>
          <button type="button" class="tab ${te==="invoice"?"tab--active":""}" data-tab="invoice">Invoice</button>
        </nav>
        <div class="panel__body" id="form-root"></div>
        <div id="validation-container" class="panel__body" style="padding-top:0">
          ${n.length?`<ul class="validation-list">${n.map(r=>`<li>${$(r.message)}</li>`).join("")}</ul>`:""}
        </div>
      </section>

      <section class="panel">
        <div class="panel__header no-print">
          <h2>Preview</h2>
          <span id="preview-badge" class="badge ${n.length?"badge--warn":""}">${$(Le(ne()))}</span>
        </div>
        <div class="preview-pane" id="preview-root">
          ${Bt(N)}
        </div>
      </section>
    </div>
  `,e.querySelectorAll("[data-tab]").forEach(r=>{r.addEventListener("click",()=>{te=r.dataset.tab,De()})});const i=P("#form-root");te==="profile"?mn(i):(N.invoice.invoiceNumber||Pt(),pn(i)),P("#btn-print").addEventListener("click",()=>window.print()),P("#btn-export").addEventListener("click",()=>{const r=new Blob([fn(N)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(r),t.download=`invoice-${N.invoice.invoiceNumber||"backup"}.json`,t.click(),URL.revokeObjectURL(t.href)}),P("#btn-import").addEventListener("change",async r=>{var s;const t=(s=r.target.files)==null?void 0:s[0];if(!t)return;const o=await t.text();N=gn(o),ie()})}Pt();De();xe();
