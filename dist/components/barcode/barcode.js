/*
 * Copyright (c) 2014 Johannes Mittendorfer (http://johannes-mittendorfer.com)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.1
 * Build 2014-10-07
 */

var EAN13, pluginName;

pluginName = null;

"use strict";

EAN13 = (function() {
	EAN13.prototype.settings = {};

	EAN13.prototype.init = function() {
		var checkDigit, code;
		if (this.number.length === 12) {
			checkDigit = this.generateCheckDigit(this.number);
			this.number += checkDigit;
		}
		if (this.number.length === 13) {
			if (this.validate()) {
				this.settings.onValid.call();
			} else {
				this.settings.onInvalid.call();
			}
			code = this.getCode();
			return this.draw(code);
		} else {
			return this.settings.onError.call();
		}
	};

	EAN13.prototype.getCode = function() {
		var c_encoding, code, countries, i, parts, raw_number, x, y, z;
		x = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
		y = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
		z = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
		countries = ["xxxxxx", "xxyxyy", "xxyyxy", "xxyyyx", "xyxxyy", "xyyxxy", "xyyyxx", "xyxyxy", "xyxyyx", "xyyxyx"];
		code = "";
		c_encoding = countries[parseInt(this.number.substr(0, 1), 10)].split("");
		raw_number = this.number.substr(1);
		parts = raw_number.split("");
		i = 0;
		while (i < 6) {
			if (c_encoding[i] === "x") {
				code += x[parts[i]];
			} else {
				code += y[parts[i]];
			}
			i++;
		}
		i = 6;
		while (i < 12) {
			code += z[parts[i]];
			i++;
		}
		return code;
	};

	EAN13.prototype.clear = function(context) {
		return context.clearRect(0, 0, this.settings.width, this.settings.height);
	};

	EAN13.prototype.draw = function(code) {
		var border_height, chars, context, height, i, item_width, layout, left, lines, offset, prefix, width, x, _i, _ref;
		layout = {
			prefix_offset: 0.06,
			font_stretch: 0.073,
			border_line_height_number: 0.9,
			border_line_height: 1,
			line_height: 0.9,
			font_size: 0.15,
			font_y: 1.03,
			text_offset: 4.5
		};
		width = (this.settings.prefix ? this.settings.width - (this.settings.width * layout.prefix_offset) : this.settings.width);
		if (this.settings.number) {
			border_height = layout.border_line_height_number * this.settings.height;
			height = layout.line_height * border_height;
		} else {
			border_height = layout.border_line_height * this.settings.height;
			height = border_height;
		}
		item_width = width / 95;
		if (this.id) {
			context = wx.createCanvasContext(this.id);
			this.clear(context);
			context.setFillStyle(this.settings.color);
			left = this.settings.number && this.settings.prefix ? this.settings.width * layout.prefix_offset : 0;
			lines = code.split("");
			context.fillRect(left, 0, item_width, border_height);
			left = left + item_width * 2;
			context.fillRect(left, 0, item_width, border_height);
			left = left + item_width;
			i = 0;
			while (i < 42) {
				if (lines[i] === "1") {
					context.fillRect(left, 0, Math.floor(item_width) + 1, height);
				}
				left = left + item_width;
				i++;
			}
			left = left + item_width;
			context.fillRect(left, 0, item_width, border_height);
			left = left + item_width * 2;
			context.fillRect(left, 0, item_width, border_height);
			left = left + item_width * 2;
			i = 42;
			while (i < 84) {
				if (lines[i] === "1") {
					context.fillRect(left, 0, Math.floor(item_width) + 1, height);
				}
				left = left + item_width;
				i++;
			}
			context.fillRect(left, 0, item_width, border_height);
			left = left + item_width * 2;
			context.fillRect(left, 0, item_width, border_height);
			if (this.settings.number) {
				context.setFontSize(layout.font_size * height + "px monospace");
				prefix = this.number.substr(0, 1);
				if (this.settings.prefix) {
					context.fillText(prefix, 0, border_height * layout.font_y);
				}
				offset = item_width * layout.text_offset + (this.settings.prefix ? layout.prefix_offset * this.settings.width : 0);
				chars = this.number.substr(1, 6).split("");
				chars.forEach(function(value, key) {
					context.fillText(value, offset, border_height * layout.font_y);
					return offset += layout.font_stretch * width;
				});
				offset = 49 * item_width + (this.settings.prefix ? layout.prefix_offset * this.settings.width : 0) + layout.text_offset;
				chars = this.number.substr(7).split("")
				chars.forEach(function(value, key) {
					context.fillText(value, offset, border_height * layout.font_y);
					return offset += layout.font_stretch * width;
				});
			}
			if (this.settings.debug) {
				for (x = _i = 0, _ref = item_width * 2; _ref > 0 ? _i <= width : _i >= width; x = _i += _ref) {
					context.beginPath();
					context.rect(x, height * 0.4, item_width, height * 0.1);
					context.setFillStyle('red');
					context.fill();
				}
			}
			context.draw()
			return this.settings.onSuccess.call();
		} else {
			return this.settings.onError.call();
		}
	};

	EAN13.prototype.generateCheckDigit = function(number) {
		var chars, counter;
		counter = 0;
		chars = number.split("");
		chars.forEach(function(value, key) {
			if (key % 2 === 0) {
				return counter += parseInt(value, 10);
			} else {
				return counter += 3 * parseInt(value, 10);
			}
		});
		return 10 - (counter % 10) % 10;
	};

	EAN13.prototype.validate = function() {
		return parseInt(this.number.slice(-1), 10) === this.generateCheckDigit(this.number.slice(0, -1));
	};

	function EAN13(id, number, options) {
		var option;
		this.id = id;
		this.number = number;
		this.settings = {
			width: 200,
			height: 100,
			number: true,
			prefix: true,
			color: "black",
			debug: false,
			onValid: function() {},
			onInvalid: function() {},
			onSuccess: function() {},
			onError: function() {}
		};
		if (options) {
			for (option in options) {
				this.settings[option] = options[option];
			}
		}
		this._name = pluginName;
		this.init();
	}

	return EAN13;

})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = EAN13;
}