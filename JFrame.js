var strHave = function (tag, ori){
	return ori.indexOf(tag) > -1;
};

var strFormat = function (){
	if((arguments.length <= 0) || (typeof arguments[0] != "string"))
		return null;
	var value = arguments[0];
	for(var i = 1; i < arguments.length; i++){
		var reg = new RegExp('\\{'+ (i - 1) +'\\}','gm');
		value = value.replace(reg, arguments[i]);
	}
	return value;
};

var strFormatObj = function (){
	if((arguments.length <= 0) || (typeof arguments[0] != "string"))
		return null;
	var value = arguments[0];
	for(var key in arguments[1]){
		var reg = new RegExp('\\{'+ key +'\\}','gm');
		value = value.replace(reg, arguments[1][key]);
	}
	return value;
};

var startWith = function (){
	if(arguments.length <= 0)
		return false;
	if(arguments[1].length < arguments[0].length)
		return false;
	var temp = arguments[1].substr(0,arguments[0].length);
	return arguments[2] == false ? arguments[0] === temp : arguments[0].toLowerCase() === temp.toLowerCase();
};

var endWith = function (){
	if(arguments.length <= 0)
		return false;
	if(arguments[1].length < arguments[0].length)
		return false;		
	var temp = arguments[1].substr(arguments[1].length - arguments[0].length);
	return arguments[2] == false ? arguments[0] === temp : arguments[0].toLowerCase() === temp.toLowerCase();
};

var toArray = function (){
	if(arguments.length <= 0)
		return [];
	var array = new Array();
	for(var i = 0; i < arguments.length; i++)
		array = array.concat(arguments[i]);
	return array;
};

var repeat = function (template,n){
	if(typeof n != "number")
		return null;
	var temp = template,count = [];
	while(n > 0){
		if(n % 2 == 1)
			count[count.length] = temp;
		if(n == 1)
			break;
		temp += temp;
		n = n >> 1;
	}
	return count.join("");
};

var parse = function (url){
	if(typeof url !== "string")
		return {};
	var parseObj = parseObj || {};
		parseObj.protocol = url.split("://")[0];
		parseObj.fragment = url.split("#")[1] ? url.split("#")[1] : "";
		parseObj.query = url.split("#")[0].split("?")[1] ? url.split("#")[0].split("?")[1] :"";
		/:(\d+)/.test(url)
		parseObj.port = RegExp.$1 ? RegExp.$1 : 80;
		parseObj.hostname = url.split("/")[2];
		/\/(\w+(\/\w+)+)/.test(url);
		parseObj.path = RegExp.$1 ? RegExp.$1.substr(0, RegExp.$1.lastIndexOf("/")) : null;
	return parseObj;
};

var strCut = function (str, lon, template){
	if(typeof str !== "string")
		return null;
	if(typeof lon !== "number")
		return null;
	if(str.length < lon)
		return str;
	return str.substr(0,lon) + template;
};

var removeHTML = function (string){
	if(string.length <= 0)
		return null;
	return string.replace(/<\/?\w+(\s*\w*='\w*\/\w*')*>/ig,"");
};

var platform = function (){
	var platform = navigator.userAgent.toLowerCase();
	return /windows/.test(platform) ? "PC" : 
				/ipad/.test(platform) ? "ipad" :
					/android/.test(platform) ? "android" : 
						/iphone/.test(platform) ? "iphone" :
							/ipod/.test(platform) ? "ipod" :
								/windows phone/.test(platform) ? "wp" : 
									/blackberry/.test(platform) ? "blackberry" : 
										/symbian/.test(platform) ? "symbian" : 
											/macintosh/.test(platform) ? "mac" : "undefined" ;
};

var getSelect = function (){
	if(window.getSelection)
	 return window.getSelection().toString();
	if(document.getSelection)
	 return document.getSelection();
	if(document.selection)
		return document.selection.createRange().text;
};

var getLength = function (){
	var l = 0;
	if(arguments.length == 0)
		return null;
	for(var i = 0; i < arguments[0].length; i++){
		if(arguments[0].charCodeAt(i) > 255)//证明当前字符为英文字符
			l += 2;
		else//证明当前字符为汉字字符
			l++
	}
	return l;
}

Array.prototype.strip = function (){
	var temp = [];
	if(this.length <= 1)
		return this;
	//方法一
	// for(var i = 0; i < this.length; i++){
	// 	for(var j = i+1; j < this.length ; j++){
	// 		if(this[i] == this[j])
	// 			this.splice(j,1);
	// 	}
	// }
	// return this;
	//方法二
	for(var i = 0; i < this.length; i++){
		if(temp.indexOf(this[i]) == -1)
			temp.push(this[i]);
	}
	return temp;
}

var trim = function (string, flag){
	if(TF)
		string = string.replace(/^\s+/,"").replace(/\s+$/,"");
	else
		string = string.replace(/\s+/gm,"");
	return string;
}

var maxLength = function (string){
	var max = 0,node,temp=null,tempNode = null,leng = string.length,tempString;
	for(var i = 0; i < string.length; i++){
		node = string.substr(i, 1);
		if(node != tempNode){
			var partten = new RegExp(node,'igm');
			tempString = string.replace(partten,"");
			(leng - tempString.length) > max ? (max = (leng - tempString.length),temp = node) : max;
			tempNode = node;
		}
	}
	return {"node" : temp, "length" : max};
}

//////////////////////////////////////////////////////
//***************类jQuery封装********************** //
/////////////////////////////////////////////////////
$$ = jframe = window.$$ = window.jframe = function (selector){
		return new $$.prototype.init(selector);
};

$$.prototype.init = function (selector){
	selector = selector || document;
	if(typeof selector == "string"){
		if(/#/.test(selector)){
			this[0] = document.getElementById(selector.replace(/#/,""));
			this.length = 1;
		}else if(/\./.test(selector)){
			var e = document.getElementsByClassName(selector.replace(/./,""));
			for(var i = 0; i < e.length; i++)
				this[i] = e[i]
			this.length = e.length;
		}else if(/<\/\w+>/.test(selector)){
			var moduls = selector.substring(selector.indexOf("</")+2,selector.length-1),tempAttr;
			this[0] = document.createElement(moduls);
			if(/class/.test(selector)){
				/(class\s*=\s*['"]\s*\w+(\s*\w+\s*)*['"])/.test(selector);
				this[0].className = RegExp.$1.split("=")[1].replace(/['"]/gm,"");
			}
			if(/id/.test(selector)){
				/(id\s*=\s*['"]\s*\w+\s*['"])/.test(selector);
				this[0].id = RegExp.$1.split("=")[1].replace(/['"]/gm,"").replace(/\s*/,"");
			}
			this.length = 1;
		}else if(/\w+\[\w+\s*=\s*[0-9a-zA-Z\u0391-\uFFE5]+\]/.test(selector)){
			var tagName 	= selector.split("[")[0],
				attribute 	= selector.split("[")[1].split("=")[0],
				value 		= selector.split("[")[1].split("=")[1].split("]")[0];
			var e = document.getElementsByTagName(tagName),tagArray = [];
			for(var i = 0; i < e.length; i++){
				if(e[i][attribute] == value)
					tagArray.push(e[i]);
			}
			for(var i = 0; i < tagArray.length; i++){
				this[i] = tagArray[i];
			}
			this.length = tagArray.length;
		}else{
			var e = document.getElementsByTagName(selector);
			for(var i = 0; i < e.length; i++)
				this[i] = e[i];
			this.length = e.length;
		}
	}else{
		this[0] = selector;
		this.length = 1;
	}
	return this;
};



$$.prototype.css = function (obj){
	if(typeof obj != "object")
		return null;
	for(var i = 0; i < this.length; i++){
		var style = this[i].getAttribute("style") ? this[i].getAttribute("style") : "";
		for(var value in obj){
			var partten = new RegExp(value,'igm'),forget = new RegExp( value + '\s*:\s*.+?;','igm');//匹配得改进 现在匹配有问题
			partten.test(style) ? style = style.replace(forget, value+ ":" + obj[value] + ";") : style += (value + ":" + obj[value] + ";");
		}
		this[i].setAttribute("style",style);
	}

	return this;
};

$$.prototype.insert = function (obj){
	for(var i = 0; i < this.length; i++)
		this[i].appendChild(obj.length ? obj[0].cloneNode(true) : obj.cloneNode(true));
	return this;
};

$$.prototype.frist = function (){
	return this[0];
};

$$.prototype.last = function (){
	return this[this.length - 1];
};

$$.prototype.hover = function(func1,func2){
	for(var i = 0; i < this.length; i++){
		this[i].addEventListener('mouseover',func1,false);
		this[i].addEventListener('mouseout',func2,false);
	}
	return this;
};

$$.prototype.addClass = function (classname){
	for(var i = 0; i< this.length; i++)
		this[i].className += " "+classname;
	return this;
};

$$.prototype.removeClass = function (classname){
	var partten = new RegExp(' *'+classname,'gm');
	if(this.length){
		for(var i = 0; i < this.length; i++)
			this[i][0].className = this[i][0].className.replace(partten,"");
	}else{
		for(var i = 0; i < this.length; i++)
			this[i].className = this[i].className.replace(partten,"");
	}
	return this;
};

$$.prototype.click = function (func){
	for(var i = 0; i < this.length; i++)
		this[i].addEventListener('click',func,false);
	return this;
};

$$.prototype.value = function (){
	var array = [];
	for(var i = 0; i < this.length; i++){
		array.push(this[i]["value"]);
	}
	return array;
};

$$.prototype.html = function (data){
	for(var i = 0; i < this.length; i++){
		if(this[i].innerHTML){
			this[i].innerHTML = data;
		}else{
			this[i].value = data;
		}
	}
	return this;
};

$$.prototype.brother = function (){
	var nodeArray = [],temp = this[0];
	while(this[0].nextSibling){
		nodeArray.push($$(this[0].nextSibling));
		this[0] = this[0].nextSibling;
	}
	while(temp.previousSibling){
		nodeArray.push($$(temp.previousSibling));
		temp = temp.previousSibling;
	}
	for(var i = 0; i < nodeArray.length; i++){
		this[i] = nodeArray[i];
	}
	this.length = nodeArray.length;
	return this;
};

$$.prototype.init.prototype = $$.prototype;
