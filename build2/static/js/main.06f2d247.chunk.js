(this["webpackJsonpgame.chiao.io"]=this["webpackJsonpgame.chiao.io"]||[]).push([[0],{117:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return f}));var a=n(156),i=n(22),u=n(41),s=n.n(u),p=n(0),r=n(118),o=n.n(r),l=n(260),y=n.n(l),d=n(81),c=n(3),m=Object(p.createContext)({address:null,chainId:null,loading:!1,connect:function(){return null},disconnect:function(){return null},switchChain:function(){return null}}),b=new y.a({cacheProvider:!0,providerOptions:{}}),f=function(e){var t=e.children,n=Object(p.useState)(null),u=Object(i.a)(n,2),r=u[0],l=u[1],y=Object(p.useState)(!1),f=Object(i.a)(y,2),T=f[0],v=f[1],w=Object(p.useState)(null),M=Object(i.a)(w,2),j=M[0],x=M[1],h=Object(p.useState)(null),O=Object(i.a)(h,2),g=O[0],k=O[1],F=Object(d.b)().showSnackbar,S=function(e){e.on("disconnect",(function(e){F({severity:"info",message:"Account Disconnected"})})),e.on("accountsChanged",(function(e){l(e[0]),F({severity:"info",message:"Account Changed"})})),e.on("chainChanged",(function(e){x(e),F({severity:"info",message:"Network Changed"})}))},P=function(){var e=Object(a.a)(s.a.mark((function e(){var t,n,a,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=2;break}return e.abrupt("return");case 2:if(v(!0),e.prev=3,(t=new o.a(o.a.givenProvider)).currentProvider){e.next=8;break}return F({severity:"error",message:"Please install MetaMask!"}),e.abrupt("return");case 8:return e.next=10,b.connect();case 10:return n=e.sent,S(n),t=new o.a(n),k(t),e.next=16,t.eth.getAccounts();case 16:return a=e.sent,e.next=19,t.eth.getChainId();case 19:i=e.sent,l(a[0]),x(i),e.next=29;break;case 24:e.prev=24,e.t0=e.catch(3),b.clearCachedProvider(),console.error(e.t0),F({severity:"error",message:"Failed to connect"});case 29:v(!1);case 30:case"end":return e.stop()}}),e,null,[[3,24]])})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(a.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(g&&g.currentProvider&&g.currentProvider.close)){e.next=3;break}return e.next=3,g.currentProvider.close();case 3:b.clearCachedProvider(),x(null),l(null);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(p.useEffect)((function(){}),[]),Object(c.jsx)(m.Provider,{value:{web3:g,address:r,chainId:j,loading:T,connect:P,disconnect:A},children:t})}},164:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a=n(0),i=n(117);function u(){return Object(a.useContext)(i.a)}},251:function(e,t,n){"use strict";n.d(t,"a",(function(){return y})),n.d(t,"b",(function(){return d}));var a=n(22),i=n(0),u=n(257),s={ROPSTEN:"0xec3f54e70facb7b2fc84ecf73cf2aa61fa2fc141"},p=n(164),r=n(81),o=n(3),l=Object(i.createContext)({wrongNetwork:!1,contracts:{}}),y=function(e){var t=e.children,n=Object(p.a)(),y=n.web3,d=n.chainId,c=Object(r.b)().showSnackbar,m=Object(i.useState)(!1),b=Object(a.a)(m,2),f=b[0],T=b[1],v=Object(i.useState)({}),w=Object(a.a)(v,2),M=w[0],j=w[1];return Object(i.useEffect)((function(){if(d){if(3!==parseInt(d))return c({severity:"error",message:"Wrong network"}),void T(!0);T(!1);var e=s.ROPSTEN,t=new y.eth.Contract(u,e);j({tokenContract:t})}}),[d]),Object(o.jsx)(l.Provider,{value:{web3:y,contracts:M,wrongNetwork:f},children:t})},d=function(){return Object(i.useContext)(l)}},257:function(e){e.exports=JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[],"name":"AutoNukeLP","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sniper","type":"address"}],"name":"BoughtEarly","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"ExcludeFromFees","type":"event"},{"anonymous":false,"inputs":[],"name":"ManualNukeLP","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiquidity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateUniswapV2Router","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldWallet","type":"address"}],"name":"devWalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldWallet","type":"address"}],"name":"marketingWalletUpdated","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_isExcludedMaxTransactionAmount","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_penaltyFeeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"bots","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyDevFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyMarketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyReflectionFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyTotalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deadAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disableTransferDelay","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlySellLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"earlySellMarketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"updAds","type":"address"},{"internalType":"bool","name":"isEx","type":"bool"}],"name":"excludeFromMaxTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastLpBurnTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastManualLpBurnTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"limitsInEffect","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpBurnEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpBurnFrequency","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_addresses","type":"address[]"},{"internalType":"bool","name":"_isBot","type":"bool"}],"name":"manageBots","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"manualBurnFrequency","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"manualBurnLiquidityPairTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"marketingWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTransactionAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"originalPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"percentForLPBurn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"removeLimits","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellDevFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellMarketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellReflectionFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellTotalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_frequencyInSeconds","type":"uint256"},{"internalType":"uint256","name":"_percent","type":"uint256"},{"internalType":"bool","name":"_Enabled","type":"bool"}],"name":"setAutoLPBurnSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_earlySellMarketingFee","type":"uint256"},{"internalType":"uint256","name":"_earlySellLiquidityFee","type":"uint256"}],"name":"setPenaltyFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"setPenaltyFeeTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_buyReflectionFee","type":"uint256"},{"internalType":"uint256","name":"_sellReflectionFee","type":"uint256"}],"name":"setReflectionFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapTokensAtAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensForDev","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensForLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensForMarketing","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferDelayEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketingFee","type":"uint256"},{"internalType":"uint256","name":"_liquidityFee","type":"uint256"},{"internalType":"uint256","name":"_devFee","type":"uint256"}],"name":"updateBuyFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newWallet","type":"address"}],"name":"updateDevWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newMarketingWallet","type":"address"}],"name":"updateMarketingWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNum","type":"uint256"}],"name":"updateMaxTxnAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNum","type":"uint256"}],"name":"updateMaxWalletAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketingFee","type":"uint256"},{"internalType":"uint256","name":"_liquidityFee","type":"uint256"},{"internalType":"uint256","name":"_devFee","type":"uint256"}],"name":"updateSellFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"enabled","type":"bool"}],"name":"updateSwapEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newAmount","type":"uint256"}],"name":"updateSwapTokensAtAmount","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]')},275:function(e,t,n){},299:function(e,t){},301:function(e,t){},303:function(e,t){},307:function(e,t){},308:function(e,t){},335:function(e,t){},337:function(e,t){},352:function(e,t){},354:function(e,t){},370:function(e,t){},389:function(e,t){},391:function(e,t){},409:function(e,t){},410:function(e,t){},480:function(e,t){},486:function(e,t){},487:function(e,t){},577:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),u=n(82),s=n.n(u),p=n(616),r=n(158),o=(n(275),n(618)),l=n(21),y=n(617),d=n(18),c=n(3),m=Object(d.a)("div")({position:"fixed",background:"rgba(255, 255, 255, 0.5)",top:0,left:0,bottom:0,right:0,display:"flex",alignItems:"center",justifyContent:"center"}),b=Object(a.memo)((function(){return Object(c.jsx)("div",{style:{height:"100vh"},children:Object(c.jsx)(m,{children:Object(c.jsx)(y.a,{})})})})),f=Object(a.lazy)((function(){return Promise.all([n.e(3),n.e(4)]).then(n.bind(null,621))}));var T=function(){return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)(o.a,{children:Object(c.jsx)(l.c,{children:Object(c.jsx)(a.Suspense,{fallback:Object(c.jsx)(b,{}),children:Object(c.jsx)(l.a,{path:"/",exact:!0,children:Object(c.jsx)(f,{})})})})})})},v=function(e){e&&e instanceof Function&&n.e(5).then(n.bind(null,622)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,u=t.getLCP,s=t.getTTFB;n(e),a(e),i(e),u(e),s(e)}))},w=n(251),M=n(117),j=n(81),x=n(262),h=n(615),O=Object(x.a)({palette:{primary:{main:"#eaeaea"},secondary:{main:"#273a4c"}},typography:{fontFamily:"Rubik"},components:{MuiLink:{styleOverrides:{root:{color:"#337ab7"}}}}});function g(e){var t=e.children;return Object(c.jsx)(h.a,{theme:O,children:t})}s.a.render(Object(c.jsxs)(i.a.StrictMode,{children:[Object(c.jsx)(p.a,{}),Object(c.jsx)(g,{children:Object(c.jsx)(j.a,{children:Object(c.jsx)(r.a,{children:Object(c.jsx)(M.b,{children:Object(c.jsx)(w.a,{children:Object(c.jsx)(T,{})})})})})})]}),document.getElementById("root")),v()},81:function(e,t,n){"use strict";n.d(t,"a",(function(){return y})),n.d(t,"b",(function(){return d}));var a=n(22),i=n(261),u=n(0),s=n(581),p=n(580),r=n(3),o=Object(u.createContext)({showSnackbar:function(){}}),l=Object(u.forwardRef)((function(e,t){return Object(r.jsx)(p.a,Object(i.a)({elevation:6,ref:t,variant:"filled"},e))})),y=function(e){var t=e.children,n=Object(u.useState)(null),i=Object(a.a)(n,2),p=i[0],y=i[1],d=function(e,t){"clickaway"!==t&&y(null)};return Object(r.jsxs)(o.Provider,{value:{showSnackbar:y},children:[t,Object(r.jsx)(s.a,{open:!!p,autoHideDuration:4e3,onClose:d,children:Object(r.jsx)(l,{onClose:d,severity:null===p||void 0===p?void 0:p.severity,sx:{width:"100%"},children:null===p||void 0===p?void 0:p.message})})]})},d=function(){return Object(u.useContext)(o)}}},[[577,1,2]]]);
//# sourceMappingURL=main.06f2d247.chunk.js.map