(window.webpackJsonp=window.webpackJsonp||[]).push([[7,8],{347:function(t,e,n){var content=n(356);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(48).default)("76107c1e",content,!0,{sourceMap:!1})},350:function(t,e,n){"use strict";n.r(e);var o={props:{items:{type:Array}}},r=n(13),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(t.items,(function(e,o){return n("div",{key:o},[n("table",{staticClass:"dialog-products__table  mb-3"},[n("tr",[n("td",{staticClass:"fs--font-basic"},[t._v("name common: ")]),t._v(" "),n("td",{staticClass:"fs--font-basic"},[t._v(t._s(e.name.common))])]),t._v(" "),n("tr",[n("td",{staticClass:"fs--font-basic"},[t._v("flags: ")]),t._v(" "),n("td",{staticClass:"fs--font-basic flags"},[n("img",{attrs:{src:e.flags.png,alt:"",width:"40px",height:"auto"}})])]),t._v(" "),n("tr",[n("td",{staticClass:"fs--font-basic"},[t._v("population:")]),t._v(" "),n("td",{staticClass:"fs--font-basic"},[t._v(t._s(e.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")))])]),t._v(" "),n("tr",[n("td",{staticClass:"fs--font-basic"},[t._v("capital:")]),t._v(" "),n("td",{staticClass:"fs--font-basic"},[t._v(t._s(e.capital&&e.capital[0]))])]),t._v(" "),n("tr",[n("td",{staticClass:"fs--font-basic"},[t._v("region:")]),t._v(" "),n("td",{staticClass:"fs--font-basic"},[t._v(t._s(e.region))])]),t._v(" "),n("tr",[n("td",{staticClass:"fs--font-basic"},[t._v("subregion:")]),t._v(" "),n("td",{staticClass:"fs--font-basic"},[t._v(t._s(e.subregion))])])])])})),0)}),[],!1,null,null,null);e.default=component.exports},355:function(t,e,n){"use strict";n(347)},356:function(t,e,n){var o=n(47)(!1);o.push([t.i,".dialog-products__table{width:100%;display:table;border:1px solid #ccc}.dialog-products__table tr:nth-child(2n){background-color:#f3f3f3}.dialog-products__table td{padding:6px}.dialog-products__table td:first-child{width:140px}.dialog-products__table .flags img{display:flex;align-items:center}@media screen and (max-width:750px){.dialog-products .modal__body{width:94vw!important;margin:0 auto}}",""]),t.exports=o},363:function(t,e,n){"use strict";n.r(e);n(50),n(33),n(64),n(37),n(65);var o=n(10),r=n(31),c=(n(35),n(24),n(67),n(11),n(90),n(91),n(49),n(27),n(66),n(89),n(51),n(63)),l=n.n(c),d=n(62),f=n(359),m=n.n(f),h=n(1),_=n(350);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}h.a.use(n(360));var C={components:{apexchart:m.a,TableCountry:_.default},props:{data:{type:Object,default:function(){}}},data:function(){return{items:null,isShowApexchart:!0,isShowTable:!0,chartOptions:{xaxis:{type:"datetime",labels:{formatter:function(t,e){return h.a.moment(e).format("YYYY/MM/DD")}},categories:[]},yaxis:{labels:{formatter:function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}}},tooltip:{x:{format:"yyyy/MM/dd",formatter:void 0}},colors:["#2983FF","#00e396","#D7263D"],noData:{text:"Please just a moment",align:"center",verticalAlign:"middle"}},series:[{name:"Confirmed",data:[]},{name:"Recovered",data:[]},{name:"Deaths",data:[]}]}},computed:y(y({},Object(d.c)({itemCountry:"country/itemCountry"})),{},{computedData:{get:function(){return this.data},set:function(t){this.$emit("update:data",t)}}}),watch:{itemCountry:function(t){setTimeout(this.handleDataChart(t),500),this.isLoadChart()},data:function(t){this.items=null,this.resetState(),this.init()},items:function(t){this.isLoadTable()}},methods:y(y({},Object(d.b)({fetchListCountry:"country/fetchListCountry",resetState:"country/resetState"})),{},{init:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get("https://restcountries.com/v3.1/name/".concat(t.data.CountryCode)).then((function(e){return e.data.filter((function(e){return e.name.common===t.data.Country||e.name.official.toLowerCase().includes(t.data.Country.toLowerCase())||e.name.common.toLowerCase().includes(t.data.Slug.toLowerCase())}))})).catch((function(e){console.error(e),t.$modal.loading(!1)}));case 2:t.items=e.sent,setTimeout((function(){t.$modal.loading(!1)}),1500),t.fetchListCountry(t.data.Slug);case 5:case"end":return e.stop()}}),e)})))()},handleDataChart:function(data){this.chartOptions.xaxis.categories=data.map((function(t){return t.Date})),this.series[0].data=data.map((function(t){return t.Confirmed})),this.series[1].data=data.map((function(t){return t.Recovered})),this.series[2].data=data.map((function(t){return t.Deaths}))},isLoadChart:function(){var t=this;this.isShowApexchart=!1,this.$nextTick((function(){t.isShowApexchart=!0}))},isLoadTable:function(){var t=this;this.isShowTable=!1,this.$nextTick((function(){t.isShowTable=!0}))},close:function(){this.computedData=null,this.items=null,this.$modal.close({name:"summary"})}})},w=(n(355),n(13)),component=Object(w.a)(C,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-modal",{staticClass:"dialog-products",attrs:{name:"summary"}},[t.items?n("div",[n("p",{staticClass:"fs--heading-3 mb-3"},[t._v("DETAILS Country "+t._s(t.data&&t.data.Country))]),t._v(" "),n("table-country",{attrs:{items:t.items}}),t._v(" "),t.isShowApexchart?n("apexchart",{attrs:{height:"200",type:"line",options:t.chartOptions,series:t.series}}):t._e()],1):t._e()])],1)}),[],!1,null,null,null);e.default=component.exports}}]);