(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{110:function(e,t,a){e.exports=a(262)},115:function(e,t,a){},262:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(21),o=a.n(c),l=(a(115),a(16)),i=a(17),s=a(19),u=a(18),d=a(20),m=a(105),h=a.n(m),p=a(46),g=a.n(p),b=a(34),v=a.n(b),E=a(15),f=a(104),k=a.n(f),C=a(100),F=a.n(C),y=a(102),O=a.n(y),j=a(35),w=a.n(j),S=a(28),x=a(22),N=a.n(x),I=a(23),T=a.n(I),_=a(27),W=a.n(_),A=a(26),B=a.n(A),R=a(31),L=a.n(R),M=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleToggle=function(e){return function(){var t=a.state.checked,n=t.indexOf(e),r=Object(S.a)(t);-1===n?r.push(e):r.splice(n,1),a.setState({checked:r})}},a.state={checked:[],items:["Blank Space - Taylor Swift","New Rules - Dua Lipa","There is nothing holding me back - Shawn Mendes"],deleted:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"addItem",value:function(e){var t=this.state.items,a=e.target.previousElementSibling;a.value&&(t.push(a.value),a.value="",this.setState({items:t}))}},{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(N.a,{id:"AcceptedList"},this.state.items.map(function(a){return r.a.createElement(T.a,{key:a,dense:!0,button:!0},r.a.createElement("img",{src:"image/done.png"}),r.a.createElement(B.a,{primary:"".concat(a)}),r.a.createElement(W.a,null,r.a.createElement("div",{align:"right"},r.a.createElement(L.a,{variant:"outlined",color:"secondary",className:t.challengebutton,onClick:e.addItem.bind(e)},"Challenge"),r.a.createElement(L.a,{variant:"outlined",color:"default",className:t.applybutton},"Withdraw"))))})))}}]),t}(r.a.Component),z=Object(E.withStyles)(function(e){return{root:{width:"100%",maxWidth:700,backgroundColor:e.palette.background.paper},challengebutton:{margin:e.spacing.unit,backgroundColor:"#FFF","&:hover":{variant:"cotained",color:"#FFF",backgroundColor:"#F00"}},applybutton:{margin:e.spacing.unit,backgroundColor:"#FFF","&:hover":{variant:"cotained",color:"#FFF",backgroundColor:"#CCC"}},input:{display:"none"}}})(M),P=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleToggle=function(e){return function(){var t=a.state.checked,n=t.indexOf(e),r=Object(S.a)(t);-1===n?r.push(e):r.splice(n,1),a.setState({checked:r})}},a.state={checked:[],items:[],deleted:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"addItem",value:function(e){var t=this.state.items,a=e.target.previousElementSibling;a.value&&(t.push(a.value),a.value="",this.setState({items:t}))}},{key:"removeItem",value:function(e){var t=e.target.textContent,a=this.state.items.filter(function(e){return t!==e});this.setState({items:a}),!this.state.deleted&&this.setState({deleted:!0})}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.root},r.a.createElement(N.a,null,this.state.items.map(function(e){return r.a.createElement(T.a,{key:e,dense:!0,button:!0},r.a.createElement("img",{src:"static/image/baseline_done_black_18dp.png"}),r.a.createElement(B.a,{primary:"".concat(e)}),r.a.createElement(W.a,null))})),r.a.createElement("nav",{className:"nav-add"},r.a.createElement("input",{type:"text",id:"urlinput",placeholder:"URL"}),r.a.createElement("input",{type:"text",id:"nameinput",placeholder:"Name"}),r.a.createElement("button",{id:"new-item",onClick:this.addItem.bind(this)},"Apply")))}}]),t}(r.a.Component),J=Object(E.withStyles)(function(e){return{root:{width:"100%",maxWidth:700,backgroundColor:e.palette.background.paper},challengebutton:{margin:e.spacing.unit,backgroundColor:"#FFF","&:hover":{variant:"cotained",color:"#FFF",backgroundColor:"#F00"}},applybutton:{margin:e.spacing.unit,backgroundColor:"#FFF","&:hover":{variant:"cotained",color:"#FFF",backgroundColor:"#CCC"}},input:{display:"none"}}})(P),D=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleToggle=function(e){return function(){var t=a.state.checked,n=t.indexOf(e),r=Object(S.a)(t);-1===n?r.push(e):r.splice(n,1),a.setState({checked:r})}},a.state={checked:[],items:[],deleted:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.root},r.a.createElement(N.a,null,this.state.items.map(function(e){return r.a.createElement(T.a,{key:e,dense:!0,button:!0},r.a.createElement("img",{src:"static/image/baseline_done_black_18dp.png"}),r.a.createElement(B.a,{primary:"".concat(e)}),r.a.createElement(W.a,null))})))}}]),t}(r.a.Component),G=Object(E.withStyles)(function(e){return{root:{width:"100%",maxWidth:700,backgroundColor:e.palette.background.paper},challengebutton:{margin:e.spacing.unit,backgroundColor:"#FFF","&:hover":{variant:"cotained",color:"#FFF",backgroundColor:"#F00"}},applybutton:{margin:e.spacing.unit,backgroundColor:"#FFF","&:hover":{variant:"cotained",color:"#FFF",backgroundColor:"#CCC"}},input:{display:"none"}}})(D),U=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleToggle=function(e){return function(){var t=a.state.checked,n=t.indexOf(e),r=Object(S.a)(t);-1===n?r.push(e):r.splice(n,1),a.setState({checked:r})}},a.state={checked:[],items:[],deleted:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.root},r.a.createElement(N.a,null,this.state.items.map(function(e){return r.a.createElement(T.a,{key:e,dense:!0,button:!0},r.a.createElement("img",{src:"static/image/baseline_done_black_18dp.png"}),r.a.createElement(B.a,{primary:"".concat(e)}),r.a.createElement(W.a,null))})))}}]),t}(r.a.Component),$=Object(E.withStyles)(function(e){return{root:{width:"100%",maxWidth:700,backgroundColor:e.palette.background.paper},challengebutton:{margin:e.spacing.unit,backgroundColor:"#FFF","&:hover":{variant:"cotained",color:"#FFF",backgroundColor:"#F00"}},applybutton:{margin:e.spacing.unit,backgroundColor:"#FFF","&:hover":{variant:"cotained",color:"#FFF",backgroundColor:"#CCC"}},input:{display:"none"}}})(U);function q(e){var t=e.children,a=e.dir;return r.a.createElement(v.a,{component:"div",dir:a,style:{padding:24}},t)}var H=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={value:0},a.handleChange=function(e,t){a.setState({value:t})},a.handleChangeIndex=function(e){a.setState({value:e})},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.theme;return r.a.createElement("div",{className:t.root},r.a.createElement(g.a,{position:"static",color:"default"},r.a.createElement(O.a,{value:this.state.value,onChange:this.handleChange,indicatorColor:"primary",textColor:"primary",fullWidth:!0},r.a.createElement(w.a,{label:"Accepted"}),r.a.createElement(w.a,{label:"Pending"}),r.a.createElement(w.a,{label:"In Challenge"}),r.a.createElement(w.a,{label:"Rejected"}))),r.a.createElement(F.a,{axis:"rtl"===a.direction?"x-reverse":"x",index:this.state.value,onChangeIndex:this.handleChangeIndex},r.a.createElement(q,{dir:a.direction},r.a.createElement(z,null)),r.a.createElement(q,{dir:a.direction},r.a.createElement(J,null)),r.a.createElement(q,{dir:a.direction},r.a.createElement($,null)),r.a.createElement(q,{dir:a.direction},r.a.createElement(G,null))))}}]),t}(r.a.Component),K=Object(E.withStyles)(function(e){return{root:{backgroundColor:e.palette.background.paper,width:700,marginTop:20}}},{withTheme:!0})(H),Q=a(103),V=a.n(Q),X=function(e){e.classes;var t=e.className;return r.a.createElement("div",{id:"settings",className:t},r.a.createElement(V.a,{container:!0,justify:"center"},r.a.createElement(K,null)))};X.defaultProps={className:null};var Y=Object(E.withStyles)({settings:{}})(X),Z=a(109),ee=a.n(Z),te=a(108),ae=a.n(te),ne=a(106),re=a.n(ne),ce=a(107),oe=a.n(ce),le=(Object(E.createMuiTheme)({palette:{primary:k.a,secondary:{main:"#444444"}}}),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={anchorEl:null},a.handleMenu=function(e){a.setState({anchorEl:e.currentTarget})},a.handleClose=function(){a.setState({anchorEl:null})},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state.anchorEl,a=Boolean(t);return r.a.createElement("div",{className:e.root},r.a.createElement(g.a,{position:"relative",color:"primary",elevation:2},r.a.createElement(h.a,null,r.a.createElement(v.a,{variant:"h5",color:"inherit",className:e.grow},"TCR Simulator"),r.a.createElement("div",null,r.a.createElement(re.a,{"aria-owns":a?"menu-appbar":null,"aria-haspopup":"true",onClick:this.handleMenu,color:"inherit"},r.a.createElement(oe.a,null)),r.a.createElement(ae.a,{id:"menu-appbar",anchorE1:t,anchorOrigin:{vertical:"top",horizontal:"right"},getContentAnchorEl:null,transformOrigin:{vertical:"top",horizontal:"right"},open:a,onClose:this.handleClose},r.a.createElement(ee.a,{onClick:this.handleClose},"Profile"))))),r.a.createElement(Y,{className:e.settingFrame}))}}]),t}(r.a.Component)),ie=Object(E.withStyles)({root:{height:"100%"},content:{height:"100%"},grow:{flexGrow:1},settingFrame:{height:"100%",overflow:"auto",zIndex:10},menuButton:{marginLeft:-12,marginRight:20}})(le);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(ie,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[110,2,1]]]);
//# sourceMappingURL=main.0348170f.chunk.js.map