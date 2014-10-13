//>>built
define("dijit/form/_SearchMixin",["dojo/_base/declare","dojo/keys","dojo/_base/lang","dojo/query","dojo/string","dojo/when","../registry"],function(_1,_2,_3,_4,_5,_6,_7){
return _1("dijit.form._SearchMixin",null,{pageSize:Infinity,store:null,fetchProperties:{},query:{},list:"",_setListAttr:function(_8){
this._set("list",_8);
},searchDelay:200,searchAttr:"name",queryExpr:"${0}*",ignoreCase:true,_patternToRegExp:function(_9){
return new RegExp("^"+_9.replace(/(\\.)|(\*)|(\?)|\W/g,function(_a,_b,_c,_d){
return _c?".*":_d?".":_b?_b:"\\"+_a;
})+"$",this.ignoreCase?"mi":"m");
},_abortQuery:function(){
if(this.searchTimer){
this.searchTimer=this.searchTimer.remove();
}
if(this._queryDeferHandle){
this._queryDeferHandle=this._queryDeferHandle.remove();
}
if(this._fetchHandle){
if(this._fetchHandle.abort){
this._cancelingQuery=true;
this._fetchHandle.abort();
this._cancelingQuery=false;
}
if(this._fetchHandle.cancel){
this._cancelingQuery=true;
this._fetchHandle.cancel();
this._cancelingQuery=false;
}
this._fetchHandle=null;
}
},_processInput:function(_e){
if(this.disabled||this.readOnly){
return;
}
var _f=_e.charOrCode;
if("type" in _e&&_e.type.substring(0,3)=="key"&&(_e.altKey||((_e.ctrlKey||_e.metaKey)&&(_f!="x"&&_f!="v"))||_f==_2.SHIFT)){
return;
}
var _10=false;
this._prev_key_backspace=false;
switch(_f){
case _2.DELETE:
case _2.BACKSPACE:
this._prev_key_backspace=true;
this._maskValidSubsetError=true;
_10=true;
break;
default:
_10=typeof _f=="string"||_f==229;
}
if(_10){
if(!this.store){
this.onSearch();
}else{
this.searchTimer=this.defer("_startSearchFromInput",1);
}
}
},onSearch:function(){
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value);
},_startSearch:function(_11){
this._abortQuery();
var _12=this,_4=_3.clone(this.query),_13={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,deep:true}},qs=_5.substitute(this.queryExpr,[_11.replace(/([\\\*\?])/g,"\\$1")]),q,_14=function(){
var _15=_12._fetchHandle=_12.store.query(_4,_13);
if(_12.disabled||_12.readOnly||(q!==_12._lastQuery)){
return;
}
_6(_15,function(res){
_12._fetchHandle=null;
if(!_12.disabled&&!_12.readOnly&&(q===_12._lastQuery)){
_6(_15.total,function(_16){
res.total=_16;
var _17=_12.pageSize;
if(isNaN(_17)||_17>res.total){
_17=res.total;
}
res.nextPage=function(_18){
_13.direction=_18=_18!==false;
_13.count=_17;
if(_18){
_13.start+=res.length;
if(_13.start>=res.total){
_13.count=0;
}
}else{
_13.start-=_17;
if(_13.start<0){
_13.count=Math.max(_17+_13.start,0);
_13.start=0;
}
}
if(_13.count<=0){
res.length=0;
_12.onSearch(res,_4,_13);
}else{
_14();
}
};
_12.onSearch(res,_4,_13);
});
}
},function(err){
_12._fetchHandle=null;
if(!_12._cancelingQuery){
console.error(_12.declaredClass+" "+err.toString());
}
});
};
_3.mixin(_13,this.fetchProperties);
if(this.store._oldAPI){
q=qs;
}else{
q=this._patternToRegExp(qs);
q.toString=function(){
return qs;
};
}
this._lastQuery=_4[this.searchAttr]=q;
this._queryDeferHandle=this.defer(_14,this.searchDelay);
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var _19=this.list;
if(_19){
this.store=_7.byId(_19);
}
}
this.inherited(arguments);
}});
});
