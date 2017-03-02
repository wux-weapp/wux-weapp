// Events
// -----------------
// Thanks to:
//  - https://github.com/documentcloud/backbone/blob/master/backbone.js
//  - https://github.com/joyent/node/blob/master/lib/events.js

// Regular expression used to split event strings

var eventSplitter = /\s+/;

// A module that can be mixed in to *any object* in order to provide it
// with custom events. You may bind with `on` or remove with `off` callback
// functions to an event; `trigger`-ing an event fires all callbacks in
// succession.
//
// var object = new Events();
// object.on('expand', function(){ alert('expanded'); });
// object.trigger('expand');
//

function Events() {}

// Bind one or more space separated events, `events`, to a `callback`
// function. Passing `"all"` will bind the callback to all events fired.
Events.prototype.on = function(events, callback, context) {
	var cache, event, list;
	if (!callback) return this;

	cache = this.__events || (this.__events = {});
	events = events.split(eventSplitter);
	while (event = events.shift()) {
		// eslint-disable-line
		list = cache[event] || (cache[event] = []);
		list.push(callback, context);
	}

	return this;
};

Events.prototype.once = function(events, callback, context) {
	var that = this;
	var cb = function cb() {
			that.off(events, cb);
			callback.apply(context || that, arguments);
		};
	return this.on(events, cb, context);
};

// Remove one or many callbacks. If `context` is null, removes all callbacks
// with that function. If `callback` is null, removes all callbacks for the
// event. If `events` is null, removes all bound callbacks for all events.
Events.prototype.off = function(events, callback, context) {
	var cache, event, list, i;

	// No events, or removing *all* events.
	if (!(cache = this.__events)) return this;
	if (!(events || callback || context)) {
		delete this.__events;
		return this;
	}

	events = events ? events.split(eventSplitter) : keys(cache);

	// Loop through the callback list, splicing where appropriate.
	while (event = events.shift()) {
		// eslint-disable-line
		list = cache[event];
		if (!list) continue;

		if (!(callback || context)) {
			delete cache[event];
			continue;
		}

		for (i = list.length - 2; i >= 0; i -= 2) {
			if (!(callback && list[i] !== callback || context && list[i + 1] !== context)) {
				list.splice(i, 2);
			}
		}
	}

	return this;
};

// Trigger one or many events, firing all bound callbacks. Callbacks are
// passed the same arguments as `trigger` is, apart from the event name
// (unless you're listening on `"all"`, which will cause your callback to
// receive the true name of the event as the first argument).
Events.prototype.trigger = function(events) {
	var cache, event, all, list, i, len;
	var rest = [];
	var returned = true;
	if (!(cache = this.__events)) return this;

	events = events.split(eventSplitter);

	// Fill up `rest` with the callback arguments.  Since we're only copying
	// the tail of `arguments`, a loop is much faster than Array#slice.
	for (i = 1, len = arguments.length; i < len; i++) {
		rest[i - 1] = arguments[i];
	}

	// For each event, walk through the list of callbacks twice, first to
	// trigger the event, then to trigger any `"all"` callbacks.
	while (event = events.shift()) {
		// eslint-disable-line
		// Copy callback lists to prevent modification.
		if (all = cache.all) all = all.slice(); // eslint-disable-line
		if (list = cache[event]) list = list.slice(); // eslint-disable-line

		// Execute event callbacks except one named "all"
		if (event !== 'all') {
			returned = triggerEvents(list, rest, this) && returned;
		}

		// Execute "all" callbacks.
		returned = triggerEvents(all, [event].concat(rest), this) && returned;
	}

	return returned;
};

Events.prototype.emit = Events.prototype.trigger;

// Helpers
// -------

var keys = Object.keys;

if (!keys) {
	keys = function(o) {
		var result = [];

		for (var name in o) {
			if (o.hasOwnProperty(name)) {
				result.push(name);
			}
		}
		return result;
	};
}

// Mix `Events` to object instance or Class function.
Events.mixTo = function(receiver) {
	var proto = Events.prototype;

	if (isFunction(receiver)) {
		for (var key in proto) {
			if (proto.hasOwnProperty(key)) {
				receiver.prototype[key] = proto[key];
			}
		}
	} else {
		var event = new Events();
		for (var key in proto) {
			if (proto.hasOwnProperty(key)) {
				copyProto(key);
			}
		}
	}

	function copyProto(key) {
		receiver[key] = function() {
			proto[key].apply(event, Array.prototype.slice.call(arguments));
			return this;
		};
	}
};

// Execute callbacks

function triggerEvents(list, args, context) {
	var pass = true;

	if (list) {
		var i = 0;
		var l = list.length;
		var a1 = args[0];
		var a2 = args[1];
		var a3 = args[2];
		// call is faster than apply, optimize less than 3 argu
		// http://blog.csdn.net/zhengyinhui100/article/details/7837127
		switch (args.length) {
		case 0:
			for (; i < l; i += 2) {
				pass = list[i].call(list[i + 1] || context) !== false && pass;
			}
			break;
		case 1:
			for (; i < l; i += 2) {
				pass = list[i].call(list[i + 1] || context, a1) !== false && pass;
			}
			break;
		case 2:
			for (; i < l; i += 2) {
				pass = list[i].call(list[i + 1] || context, a1, a2) !== false && pass;
			}
			break;
		case 3:
			for (; i < l; i += 2) {
				pass = list[i].call(list[i + 1] || context, a1, a2, a3) !== false && pass;
			}
			break;
		default:
			for (; i < l; i += 2) {
				pass = list[i].apply(list[i + 1] || context, args) !== false && pass;
			}
			break;
		}
	}
	// trigger will return false if one of the callbacks return false
	return pass;
}

function isFunction(func) {
	return Object.prototype.toString.call(func) === '[object Function]';
}

class Refresher {
	constructor(options = {}, scope = getCurrentPages()[getCurrentPages().length - 1]) {
		Object.assign(this, {
			options, 
			scope, 
		})
		this.__init()
	}

	/**
	 * 初始化
	 */
	__init() {
		this.lastTime = 0
		this.activated = !1
		this.events = new Events
		this.mergeOptions(this.options)
		this.scope.setData({
			[`$wux.refresher`]: this.options, 
		})
	}

	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			pullingIcon: `icon-arrow-down`, 
			pullingText: `下拉刷新`, 
			refreshingIcon: `icon-refresher`, 
			refreshingText: `正在刷新`, 
			disablePullingRotation: !1, 
			distance: 30, 
			onPulling(){}, 
			onRefresh(){}, 
	    }
	}

	/**
	 * 合并参数
	 */
	mergeOptions(options) {
		const defaultOptions = this.setDefaults()
	    for (let key in defaultOptions) {
	        if (defaultOptions.hasOwnProperty(key)) {
	            this.options[key] = typeof options[key] !== `undefined` ? options[key] : defaultOptions[key]
	            if (typeof this.options[key] === `function`) {
					this.options[key] = this.options[key].bind(this)
				}
	        }
	    }
	}

    /**
     * 创建定时器
     */
	requestAnimationFrame(callback) {
        let currTime = new Date().getTime()
        let timeToCall = Math.max(0, 16 - (currTime - this.lastTime))
        let timeout = setTimeout(() => { 
        	callback.bind(this)(currTime + timeToCall) 
        }, timeToCall)
        this.lastTime = currTime + timeToCall
        return timeout
    }

    /**
     * 清空定时器
     */
    cancelAnimationFrame(timeout) {
        clearTimeout(timeout)
    }

	/**
	 * 返回下拉刷新的方法
	 */
	getRefresherMethods() {

		// 默认样式
		const defaultStyle = `transition: transform .4s; transform: translate3d(0px, 0px, 0px) scale(1);`

		// 设置属性
		const setData = (key, value) => {
			this.scope.setData({
				[`$wux.refresher.${key}`]: value, 
			})
		}

		// 显示
		const activate = () => {
			setData(`style`, defaultStyle)
			setData(`className`, `visible`)
		}

		// 隐藏
		const deactivate = () => {
			if (this.activated) this.activated = !1
			setData(`style`, defaultStyle)
			setData(`className`, `hidden`)
		}

		// 正在刷新
		const refreshing = () => {
			setData(`style`, `transition: transform .4s; transform: translate3d(0, 50px, 0) scale(1);`)
			setData(`className`, `active refreshing`)
		}

		// 刷新后隐藏动画
		const tail = () => {
			setData(`className`, `active refreshing refreshing-tail`)
		}

		// 正在下拉
		const move = (diffY) => {
			setData(`style`, `transition-duration: 0s; transform: translate3d(0, ${diffY}px, 0) scale(1);`)
			setData(`className`, diffY < this.options.distance ? `visible` : `active`)
		}

		return {
			setData, 
			activate, 
			deactivate, 
			refreshing, 
			tail, 
			move, 
		}
	}

	/**
	 * 判断是否正在刷新
	 */
	refreshing() {
		const refresher = this.scope.data.$wux.refresher
		const className = refresher.className || ``
		return className.indexOf(`refreshing`) !== -1
	}

	/**
	 * 获取触摸点坐标
	 */
	getTouchPosition(e) {
		return {
			x: e.changedTouches[0].pageX, 
			y: e.changedTouches[0].pageY, 
		}
	}

	/**
	 * 下拉刷新完成后的函数
	 */
	finishPullToRefresh() {
		const methods = this.getRefresherMethods()
		setTimeout(() => {
			this.requestAnimationFrame(methods.tail)
			setTimeout(methods.deactivate, 200)
		}, 200)
	}

	/**
	 * 手指触摸动作开始
	 */
	touchstart(e) {
		if (this.refreshing()) return !1

		const methods = this.getRefresherMethods()	
		const p = this.getTouchPosition(e)

		this.start = p
		this.diffX = this.diffY = 0

		methods.activate()
	}

	/**
	 * 手指触摸后移动
	 */
	touchmove(e) {
		if(!this.start || this.refreshing()) return !1

		const methods = this.getRefresherMethods()	
		const p = this.getTouchPosition(e)

		this.diffX = p.x - this.start.x
		this.diffY = p.y - this.start.y

		if(this.diffY < 0) return !1

		this.diffY = Math.pow(this.diffY, 0.8)
		
		if (!this.activated && this.diffY > this.options.distance) {
			this.activated = !0
			typeof this.options.onPulling === `function` && this.options.onPulling()
		} else if (this.activated && this.diffY < this.options.distance) {
			this.activated = !1
		}

		methods.move(this.diffY)
	}

	/**
	 * 	手指触摸动作结束
	 */
	touchend(e) {
		const methods = this.getRefresherMethods()

		this.start = !1

		if(this.diffY <= 0 || this.refreshing()) return !1

		methods.deactivate()

		if(Math.abs(this.diffY) >= this.options.distance) {
			this.events.once(`scroll.refreshComplete`, this.finishPullToRefresh.bind(this))
			methods.refreshing()
			typeof this.options.onRefresh === `function` && this.options.onRefresh()
		}
	}
}

export default Refresher