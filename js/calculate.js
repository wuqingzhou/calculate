/**
 * js四则运算工具，解决精度问题。（不考虑使用科学技术法表示的数据）
 * 注：主要是为了解决类似下面的四类问题：
 * 	[1]	0.1 + 0.2 = 0.30000000000000004
 *  [2] 0.3 - 0.2 = 0.09999999999999998
 * 	[3] 0.1 * 0.2 = 0.020000000000000004
 * 	[4]	0.3/0.2 = 1.4999999999999998
 * 	
 */

if(typeof window.wqzNumber != "undefined"){
	console.error("命名冲突！wqzNumber变量已经被申明了");
}else{
	window.wqzNumber = {
		// 加法
		add:function(m1,m2){
			var obj = {};
			this.changeNum(m1,m2,obj);
			var rst = (obj.m1_int*obj.m2_mul + obj.m2_int*obj.m1_mul)/(obj.m1_mul*obj.m2_mul);
			return rst;
		},
		
		// 减法。a-b
		sub:function(m1,m2){
			var obj = {};
			this.changeNum(m1,m2,obj);
			var rst = (obj.m1_int*obj.m2_mul - obj.m2_int*obj.m1_mul)/(obj.m1_mul*obj.m2_mul);
			return rst;
		},
		
		// 乘法
		mul:function(m1,m2){
			var obj = {};
			this.changeNum(m1,m2,obj);
			var rst = obj.m1_int*obj.m2_int/(obj.m1_mul*obj.m2_mul);
			return rst;
		},
		
		// 除法。a/b
		div:function(m1,m2){
			var obj = {};
			this.changeNum(m1,m2,obj);
			var rst = (obj.m1_int/obj.m2_int)/(obj.m1_mul/obj.m2_mul);
			return rst;
		},
		
		/**
		 * m1,m2表示两个操作数
		 * obj是一个对象，其中包含m1_int,m2_int,m1_mul,m2_mul四个属性
		 * m1_int,m2_int;		// 操作数转为int后的值。例如：如果m1=1.33;m2=3.2;则m1_int=133;m2_int=32
		 * var m1_mul,m2_mul;	// 操作数转为int过程中放大的倍数。例如：如果m1=1.33;m2=3.2;
		 *						// 则m1_int=133;m2_int=32;m1_mul=100;m2_mul=10。因为转化过程中m1放大了100倍，m2放大了10倍
		 *
		 */
		changeNum:function(m1,m2,obj){
			var strm1 = m1.toString().replace(".","");
			var strm2 = m2.toString().replace(".","");
			obj.m1_int = parseInt(strm1);
			obj.m2_int = parseInt(strm2);
			
			var cd1 = m1.toString().split(".")[1];
			var cd2 = m2.toString().split(".")[1];
			var len1 = cd1==undefined?0:cd1.length;
			var len2 = cd2==undefined?0:cd2.length;
			obj.m1_mul = Math.pow(10,len1);
			obj.m2_mul = Math.pow(10,len2);
		},
		
		/*
		 * m1,m2表示两个操作数
		 * opStr表示运算符
		 */
		cusCalculate: function(m1,m2,opStr){
			if(opStr=="+"){
				return this.add(m1,m2);
			}else if(opStr=="-"){
				return this.sub(m1,m2);
			}else if(opStr=="*"){
				return this.mul(m1,m2);
			}else if(opStr=="/"){
				return this.div(m1,m2);
			}
		}
	};
}