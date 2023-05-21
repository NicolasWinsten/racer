(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}


// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}

// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Model$GotUUID = function (a) {
	return {$: 'GotUUID', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0.a;
		return $elm$random$Random$Generate(
			A2($elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			$elm$random$Random$Generate(
				A2($elm$random$Random$map, tagger, generator)));
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$PeerPort$makePeer = _Platform_outgoingPort('makePeer', $elm$json$Json$Encode$string);
var $elm$random$Random$maxInt = 2147483647;
var $author$project$Main$initCmd = $elm$core$Platform$Cmd$batch(
	_List_fromArray(
		[
			A2(
			$elm$random$Random$generate,
			$author$project$Model$GotUUID,
			A2($elm$random$Random$int, 0, $elm$random$Random$maxInt)),
			$author$project$PeerPort$makePeer('')
		]));
var $author$project$Model$PreGame = {$: 'PreGame'};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $author$project$Main$initialModel = function () {
	var options = {isHost: false, joinId: '', numDestinations: 4, peerId: '', seedStr: '', username: '', uuid: 0};
	var gameState = {pastDests: _List_Nil, path: _List_Nil, remainingDests: _List_Nil, time: 0};
	return {dests: _List_Nil, gameStarted: false, gameState: gameState, loadingDests: _List_Nil, numDestsChange: 4, options: options, peers: $elm$core$Dict$empty, seedChange: '', window: $author$project$Model$PreGame};
}();
var $author$project$Model$PeerMsg = function (a) {
	return {$: 'PeerMsg', a: a};
};
var $author$project$Model$Tick = function (a) {
	return {$: 'Tick', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$core$Platform$Sub$map = _Platform_map;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$PeerPort$Malformed = function (a) {
	return {$: 'Malformed', a: a};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$PeerPort$Error = function (a) {
	return {$: 'Error', a: a};
};
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$PeerPort$errorDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$PeerPort$Error,
	A2($elm$json$Json$Decode$field, 'error', $elm$json$Json$Decode$string));
var $author$project$PeerPort$GameFinish = F3(
	function (a, b, c) {
		return {$: 'GameFinish', a: a, b: b, c: c};
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$PeerPort$uuidDecoder = A2($elm$json$Json$Decode$field, 'uuid', $elm$json$Json$Decode$int);
var $author$project$PeerPort$gameFinishDecoder = A2(
	$elm$json$Json$Decode$field,
	'finish',
	A4(
		$elm$json$Json$Decode$map3,
		$author$project$PeerPort$GameFinish,
		$author$project$PeerPort$uuidDecoder,
		A2(
			$elm$json$Json$Decode$field,
			'path',
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
		A2($elm$json$Json$Decode$field, 'time', $elm$json$Json$Decode$int)));
var $author$project$PeerPort$GameInfo = F2(
	function (a, b) {
		return {$: 'GameInfo', a: a, b: b};
	});
var $author$project$PeerPort$Info = F4(
	function (seed, numDestinations, peers, started) {
		return {numDestinations: numDestinations, peers: peers, seed: seed, started: started};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$map4 = _Json_map4;
var $author$project$PeerPort$Peer = F5(
	function (uuid, username, isHost, lastDest, finished) {
		return {finished: finished, isHost: isHost, lastDest: lastDest, username: username, uuid: uuid};
	});
var $elm$json$Json$Decode$map5 = _Json_map5;
var $author$project$PeerPort$usernameDecoder = A2($elm$json$Json$Decode$field, 'username', $elm$json$Json$Decode$string);
var $author$project$PeerPort$peerDecoder = A6(
	$elm$json$Json$Decode$map5,
	$author$project$PeerPort$Peer,
	$author$project$PeerPort$uuidDecoder,
	$author$project$PeerPort$usernameDecoder,
	A2($elm$json$Json$Decode$field, 'isHost', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'lastDest', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'finished', $elm$json$Json$Decode$bool));
var $author$project$PeerPort$gameInfoDecoder = A2(
	$elm$json$Json$Decode$field,
	'gameInfo',
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$PeerPort$GameInfo,
		$author$project$PeerPort$uuidDecoder,
		A2(
			$elm$json$Json$Decode$field,
			'info',
			A5(
				$elm$json$Json$Decode$map4,
				$author$project$PeerPort$Info,
				A2($elm$json$Json$Decode$field, 'seed', $elm$json$Json$Decode$string),
				A2($elm$json$Json$Decode$field, 'numDestinations', $elm$json$Json$Decode$int),
				A2(
					$elm$json$Json$Decode$field,
					'peers',
					$elm$json$Json$Decode$list($author$project$PeerPort$peerDecoder)),
				A2($elm$json$Json$Decode$field, 'started', $elm$json$Json$Decode$bool)))));
var $author$project$PeerPort$GameStart = function (a) {
	return {$: 'GameStart', a: a};
};
var $author$project$PeerPort$gameStartDecoder = A2(
	$elm$json$Json$Decode$field,
	'start',
	A2(
		$elm$json$Json$Decode$map,
		$author$project$PeerPort$GameStart,
		A2($elm$json$Json$Decode$field, 'msg', $elm$json$Json$Decode$string)));
var $author$project$PeerPort$HostLost = function (a) {
	return {$: 'HostLost', a: a};
};
var $author$project$PeerPort$hostLostDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$PeerPort$HostLost,
	A2($elm$json$Json$Decode$field, 'hostLost', $elm$json$Json$Decode$string));
var $author$project$PeerPort$HostWantsNewGame = function (a) {
	return {$: 'HostWantsNewGame', a: a};
};
var $author$project$PeerPort$hostWantsNewGame = A2(
	$elm$json$Json$Decode$map,
	$author$project$PeerPort$HostWantsNewGame,
	A2($elm$json$Json$Decode$field, 'newGame', $elm$json$Json$Decode$string));
var $author$project$PeerPort$PeerConnect = F2(
	function (a, b) {
		return {$: 'PeerConnect', a: a, b: b};
	});
var $author$project$PeerPort$peerConnectDecoder = A2(
	$elm$json$Json$Decode$field,
	'peerConnect',
	A3($elm$json$Json$Decode$map2, $author$project$PeerPort$PeerConnect, $author$project$PeerPort$usernameDecoder, $author$project$PeerPort$uuidDecoder));
var $author$project$PeerPort$PeerDisconnect = function (a) {
	return {$: 'PeerDisconnect', a: a};
};
var $author$project$PeerPort$peerDisconnectDecoder = A2(
	$elm$json$Json$Decode$field,
	'peerDisconnect',
	A2($elm$json$Json$Decode$map, $author$project$PeerPort$PeerDisconnect, $author$project$PeerPort$uuidDecoder));
var $author$project$PeerPort$IdGenerated = function (a) {
	return {$: 'IdGenerated', a: a};
};
var $author$project$PeerPort$peerIdGenDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$PeerPort$IdGenerated,
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string));
var $author$project$PeerPort$SeedInfo = F2(
	function (a, b) {
		return {$: 'SeedInfo', a: a, b: b};
	});
var $author$project$PeerPort$seedInfoDecoder = A2(
	$elm$json$Json$Decode$field,
	'seedInfo',
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$PeerPort$SeedInfo,
		A2($elm$json$Json$Decode$field, 'numTitles', $elm$json$Json$Decode$int),
		A2($elm$json$Json$Decode$field, 'seed', $elm$json$Json$Decode$string)));
var $author$project$PeerPort$TitleReach = F2(
	function (a, b) {
		return {$: 'TitleReach', a: a, b: b};
	});
var $author$project$PeerPort$titleReachDecoder = A2(
	$elm$json$Json$Decode$field,
	'titleReach',
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$PeerPort$TitleReach,
		$author$project$PeerPort$uuidDecoder,
		A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string)));
var $author$project$PeerPort$decoders = _List_fromArray(
	[$author$project$PeerPort$seedInfoDecoder, $author$project$PeerPort$gameStartDecoder, $author$project$PeerPort$titleReachDecoder, $author$project$PeerPort$gameFinishDecoder, $author$project$PeerPort$peerConnectDecoder, $author$project$PeerPort$peerDisconnectDecoder, $author$project$PeerPort$peerIdGenDecoder, $author$project$PeerPort$gameInfoDecoder, $author$project$PeerPort$errorDecoder, $author$project$PeerPort$hostLostDecoder, $author$project$PeerPort$hostWantsNewGame]);
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $author$project$PeerPort$dataDecoder = $elm$json$Json$Decode$oneOf($author$project$PeerPort$decoders);
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$PeerPort$receiveData = _Platform_incomingPort('receiveData', $elm$json$Json$Decode$value);
var $author$project$PeerPort$receiveDataFromJS = function () {
	var makeDataValue = function (res) {
		if (res.$ === 'Ok') {
			var data = res.a;
			return data;
		} else {
			var err = res.a;
			return $author$project$PeerPort$Malformed(
				$elm$json$Json$Decode$errorToString(err));
		}
	};
	var jsValueTranslator = A2(
		$elm$core$Basics$composeR,
		$elm$json$Json$Decode$decodeValue($author$project$PeerPort$dataDecoder),
		makeDataValue);
	return $author$project$PeerPort$receiveData(jsValueTranslator);
}();
var $author$project$Main$subscriptions = function (model) {
	var tickSub = function () {
		var _v0 = model.window;
		if (_v0.$ === 'InPage') {
			return A2($elm$time$Time$every, 100, $author$project$Model$Tick);
		} else {
			return $elm$core$Platform$Sub$none;
		}
	}();
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				tickSub,
				A2($elm$core$Platform$Sub$map, $author$project$Model$PeerMsg, $author$project$PeerPort$receiveDataFromJS)
			]));
};
var $author$project$Model$Bad = function (a) {
	return {$: 'Bad', a: a};
};
var $author$project$Model$Fetching = function (a) {
	return {$: 'Fetching', a: a};
};
var $author$project$Model$InPage = function (a) {
	return {$: 'InPage', a: a};
};
var $author$project$Model$Review = function (a) {
	return {$: 'Review', a: a};
};
var $author$project$Model$Loading = function (a) {
	return {$: 'Loading', a: a};
};
var $author$project$Model$Preview = {$: 'Preview'};
var $author$project$Main$activateClippySignal = _Platform_outgoingPort('activateClippySignal', $elm$json$Json$Encode$string);
var $author$project$Main$activateClippy = $author$project$Main$activateClippySignal('This is a dummy value');
var $author$project$Main$activateTooltipsSignal = _Platform_outgoingPort('activateTooltipsSignal', $elm$json$Json$Encode$string);
var $author$project$Main$activateTooltips = $author$project$Main$activateTooltipsSignal('This is a dummy value');
var $author$project$Model$GotDescription = F2(
	function (a, b) {
		return {$: 'GotDescription', a: a, b: b};
	});
var $hecrj$html_parser$Html$Parser$Element = F3(
	function (a, b, c) {
		return {$: 'Element', a: a, b: b, c: c};
	});
var $hecrj$html_parser$Html$Parser$Text = function (a) {
	return {$: 'Text', a: a};
};
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Helpers$flatten = function (data) {
	flatten:
	while (true) {
		if (data.b) {
			if (data.a.$ === 'Nothing') {
				var _v1 = data.a;
				var rest = data.b;
				var $temp$data = rest;
				data = $temp$data;
				continue flatten;
			} else {
				var x = data.a.a;
				var rest = data.b;
				return A2(
					$elm$core$List$cons,
					x,
					$author$project$Helpers$flatten(rest));
			}
		} else {
			return _List_Nil;
		}
	}
};
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $author$project$PageFetch$findMatches = F3(
	function (startMarker, parser, source) {
		var parseAt = function (idx) {
			var _v0 = A2(
				$elm$parser$Parser$run,
				parser,
				A2($elm$core$String$dropLeft, idx, source));
			if (_v0.$ === 'Ok') {
				var parsed = _v0.a;
				return $elm$core$Maybe$Just(parsed);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
		var indices = A2($elm$core$String$indexes, startMarker, source);
		return $author$project$Helpers$flatten(
			A2($elm$core$List$map, parseAt, indices));
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$Helpers$unwantedNamespaces = _List_fromArray(
	['File', 'Special', 'Wikipedia', 'Category', 'Talk', 'Help', 'Template', 'Template_talk', 'Portal']);
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$findSubString = _Parser_findSubString;
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$parser$Parser$Advanced$chompUntil = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$findSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A4($elm$parser$Parser$Advanced$fromInfo, newRow, newCol, expecting, s.context)) : A3(
				$elm$parser$Parser$Advanced$Good,
				_Utils_cmp(s.offset, newOffset) < 0,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$chompUntil = function (str) {
	return $elm$parser$Parser$Advanced$chompUntil(
		$elm$parser$Parser$toToken(str));
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $author$project$PageFetch$wikilink = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$symbol('<a href=\"/wiki/')),
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(_Utils_Tuple0),
			$elm$parser$Parser$chompUntil('\"'))));
var $author$project$PageFetch$linksOn = function (html) {
	var isUnwanted = function (title) {
		return A2(
			$elm$core$List$any,
			function (ns) {
				return A2($elm$core$String$startsWith, ns + ':', title);
			},
			$author$project$Helpers$unwantedNamespaces);
	};
	return A2(
		$elm$core$List$filter,
		A2($elm$core$Basics$composeR, isUnwanted, $elm$core$Basics$not),
		A3($author$project$PageFetch$findMatches, '<a href=', $author$project$PageFetch$wikilink, html));
};
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$PageFetch$createBackUpLinkList = function (html) {
	var toText = function (link) {
		return A3(
			$elm$core$String$replace,
			'_',
			' ',
			A2(
				$elm$core$Maybe$withDefault,
				'?',
				$elm$url$Url$percentDecode(link)));
	};
	var anchorTexts = A2(
		$elm$core$List$map,
		function (wl) {
			return A3(
				$hecrj$html_parser$Html$Parser$Element,
				'a',
				_List_fromArray(
					[
						_Utils_Tuple2('href', '/wiki/' + wl)
					]),
				_List_fromArray(
					[
						$hecrj$html_parser$Html$Parser$Text(
						toText(wl))
					]));
		},
		$elm$core$Set$toList(
			$elm$core$Set$fromList(
				$author$project$PageFetch$linksOn(html))));
	return A3(
		$hecrj$html_parser$Html$Parser$Element,
		'div',
		_List_Nil,
		A2(
			$elm$core$List$intersperse,
			A3($hecrj$html_parser$Html$Parser$Element, 'br', _List_Nil, _List_Nil),
			anchorTexts));
};
var $author$project$Helpers$maxBy = F2(
	function (f, data) {
		var g = F2(
			function (item, mitem) {
				if (mitem.$ === 'Just') {
					var x = mitem.a;
					return (_Utils_cmp(
						f(item),
						f(x)) > 0) ? $elm$core$Maybe$Just(item) : $elm$core$Maybe$Just(x);
				} else {
					return $elm$core$Maybe$Just(item);
				}
			});
		return A3($elm$core$List$foldl, g, $elm$core$Maybe$Nothing, data);
	});
var $author$project$PageFetch$shortDescription = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$elm$parser$Parser$symbol('<div class=\"shortdescription')),
			$elm$parser$Parser$chompUntil('>')),
		$elm$parser$Parser$symbol('>')),
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(_Utils_Tuple0),
			$elm$parser$Parser$chompUntil('<'))));
var $author$project$PageFetch$extractShortDesc = function (html) {
	return A2(
		$elm$core$Maybe$withDefault,
		'No description found',
		A2(
			$author$project$Helpers$maxBy,
			$elm$core$String$length,
			A3($author$project$PageFetch$findMatches, '<div class=\"shortdescription', $author$project$PageFetch$shortDescription, html)));
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$Helpers$getAttr = F2(
	function (attr, node) {
		var get = F2(
			function (name, attributes) {
				get:
				while (true) {
					if (attributes.b) {
						var _v1 = attributes.a;
						var attrName = _v1.a;
						var value = _v1.b;
						var rest = attributes.b;
						if (_Utils_eq(attrName, name)) {
							return $elm$core$Maybe$Just(value);
						} else {
							var $temp$name = name,
								$temp$attributes = rest;
							name = $temp$name;
							attributes = $temp$attributes;
							continue get;
						}
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}
			});
		if (node.$ === 'Element') {
			var attributes = node.b;
			return A2(get, attr, attributes);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Helpers$grabByClass = F2(
	function (clazz, node) {
		if (node.$ === 'Element') {
			var element = node;
			var children = element.c;
			var rest = A2(
				$elm$core$List$concatMap,
				$author$project$Helpers$grabByClass(clazz),
				children);
			var _v1 = A2($author$project$Helpers$getAttr, 'class', element);
			if (_v1.$ === 'Just') {
				var classStr = _v1.a;
				return A2($elm$core$String$contains, clazz, classStr) ? A2($elm$core$List$cons, element, rest) : rest;
			} else {
				return rest;
			}
		} else {
			return _List_Nil;
		}
	});
var $author$project$Helpers$grabElements = F2(
	function (tag, node) {
		if (node.$ === 'Element') {
			var element = node;
			var nTag = element.a;
			var children = element.c;
			var rest = A2(
				$elm$core$List$concatMap,
				$author$project$Helpers$grabElements(tag),
				children);
			return _Utils_eq(tag, nTag) ? A2($elm$core$List$cons, element, rest) : rest;
		} else {
			return _List_Nil;
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$PageFetch$grabImg = function (wikipage) {
	var imgs = A3(
		$elm$core$Basics$composeR,
		$author$project$Helpers$grabByClass('infobox'),
		$elm$core$List$concatMap(
			$author$project$Helpers$grabElements('img')),
		wikipage);
	var withBackups = _Utils_ap(
		imgs,
		A2($author$project$Helpers$grabElements, 'img', wikipage));
	return A2(
		$elm$core$Maybe$map,
		function (url) {
			return 'https:' + url;
		},
		A2(
			$elm$core$Maybe$andThen,
			$author$project$Helpers$getAttr('src'),
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeR,
						$author$project$Helpers$getAttr('width'),
						A2(
							$elm$core$Basics$composeR,
							$elm$core$Maybe$andThen($elm$core$String$toInt),
							A2(
								$elm$core$Basics$composeR,
								$elm$core$Maybe$map(
									$elm$core$Basics$lt(50)),
								$elm$core$Maybe$withDefault(false)))),
					withBackups))));
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0.a;
	return $elm$parser$Parser$Advanced$Parser(
		function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 'Bad') {
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, false, x);
			} else {
				var a = _v1.b;
				var s1 = _v1.c;
				return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
			}
		});
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $hecrj$html_parser$Html$Parser$chompOneOrMore = function (fn) {
	return A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$chompIf(fn),
		$elm$parser$Parser$chompWhile(fn));
};
var $hecrj$html_parser$Html$Parser$isSpaceCharacter = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr(' ')) || (_Utils_eq(
		c,
		_Utils_chr('\t')) || (_Utils_eq(
		c,
		_Utils_chr('\n')) || (_Utils_eq(
		c,
		_Utils_chr('\u000D')) || (_Utils_eq(
		c,
		_Utils_chr('\u000C')) || _Utils_eq(
		c,
		_Utils_chr('\u00A0'))))));
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$core$String$toLower = _String_toLower;
var $hecrj$html_parser$Html$Parser$closingTag = function (name) {
	var chompName = A2(
		$elm$parser$Parser$andThen,
		function (closingName) {
			return _Utils_eq(
				$elm$core$String$toLower(closingName),
				name) ? $elm$parser$Parser$succeed(_Utils_Tuple0) : $elm$parser$Parser$problem('closing tag does not match opening tag: ' + name);
		},
		$elm$parser$Parser$getChompedString(
			$hecrj$html_parser$Html$Parser$chompOneOrMore(
				function (c) {
					return (!$hecrj$html_parser$Html$Parser$isSpaceCharacter(c)) && (!_Utils_eq(
						c,
						_Utils_chr('>')));
				})));
	return A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq(
							_Utils_chr('<'))),
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq(
							_Utils_chr('/')))),
				chompName),
			$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter)),
		$elm$parser$Parser$chompIf(
			$elm$core$Basics$eq(
				_Utils_chr('>'))));
};
var $hecrj$html_parser$Html$Parser$Comment = function (a) {
	return {$: 'Comment', a: a};
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $hecrj$html_parser$Html$Parser$commentString = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$token('<!')),
		$elm$parser$Parser$token('--')),
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$getChompedString(
			$elm$parser$Parser$chompUntil('-->')),
		$elm$parser$Parser$token('-->')));
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $hecrj$html_parser$Html$Parser$comment = A2($elm$parser$Parser$map, $hecrj$html_parser$Html$Parser$Comment, $hecrj$html_parser$Html$Parser$commentString);
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $hecrj$html_parser$Html$Parser$voidElements = _List_fromArray(
	['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
var $hecrj$html_parser$Html$Parser$isVoidElement = function (name) {
	return A2($elm$core$List$member, name, $hecrj$html_parser$Html$Parser$voidElements);
};
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $hecrj$html_parser$Html$Parser$many = function (parser_) {
	return A2(
		$elm$parser$Parser$loop,
		_List_Nil,
		function (list) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$map,
						function (_new) {
							return $elm$parser$Parser$Loop(
								A2($elm$core$List$cons, _new, list));
						},
						parser_),
						$elm$parser$Parser$succeed(
						$elm$parser$Parser$Done(
							$elm$core$List$reverse(list)))
					]));
		});
};
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $hecrj$html_parser$Html$Parser$isTagAttributeCharacter = function (c) {
	return (!$hecrj$html_parser$Html$Parser$isSpaceCharacter(c)) && ((!_Utils_eq(
		c,
		_Utils_chr('\"'))) && ((!_Utils_eq(
		c,
		_Utils_chr('\''))) && ((!_Utils_eq(
		c,
		_Utils_chr('>'))) && ((!_Utils_eq(
		c,
		_Utils_chr('/'))) && (!_Utils_eq(
		c,
		_Utils_chr('=')))))));
};
var $hecrj$html_parser$Html$Parser$tagAttributeName = A2(
	$elm$parser$Parser$map,
	$elm$core$String$toLower,
	$elm$parser$Parser$getChompedString(
		$hecrj$html_parser$Html$Parser$chompOneOrMore($hecrj$html_parser$Html$Parser$isTagAttributeCharacter)));
var $hecrj$html_parser$Html$Parser$chompSemicolon = $elm$parser$Parser$chompIf(
	$elm$core$Basics$eq(
		_Utils_chr(';')));
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $hecrj$html_parser$Html$Parser$NamedCharacterReferences$dict = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('Aacute', 'Á'),
			_Utils_Tuple2('aacute', 'á'),
			_Utils_Tuple2('Abreve', 'Ă'),
			_Utils_Tuple2('abreve', 'ă'),
			_Utils_Tuple2('ac', '∾'),
			_Utils_Tuple2('acd', '∿'),
			_Utils_Tuple2('acE', '∾̳'),
			_Utils_Tuple2('Acirc', 'Â'),
			_Utils_Tuple2('acirc', 'â'),
			_Utils_Tuple2('acute', '´'),
			_Utils_Tuple2('Acy', 'А'),
			_Utils_Tuple2('acy', 'а'),
			_Utils_Tuple2('AElig', 'Æ'),
			_Utils_Tuple2('aelig', 'æ'),
			_Utils_Tuple2('af', '\u2061'),
			_Utils_Tuple2('Afr', '\uD835\uDD04'),
			_Utils_Tuple2('afr', '\uD835\uDD1E'),
			_Utils_Tuple2('Agrave', 'À'),
			_Utils_Tuple2('agrave', 'à'),
			_Utils_Tuple2('alefsym', 'ℵ'),
			_Utils_Tuple2('aleph', 'ℵ'),
			_Utils_Tuple2('Alpha', 'Α'),
			_Utils_Tuple2('alpha', 'α'),
			_Utils_Tuple2('Amacr', 'Ā'),
			_Utils_Tuple2('amacr', 'ā'),
			_Utils_Tuple2('amalg', '⨿'),
			_Utils_Tuple2('amp', '&'),
			_Utils_Tuple2('AMP', '&'),
			_Utils_Tuple2('andand', '⩕'),
			_Utils_Tuple2('And', '⩓'),
			_Utils_Tuple2('and', '∧'),
			_Utils_Tuple2('andd', '⩜'),
			_Utils_Tuple2('andslope', '⩘'),
			_Utils_Tuple2('andv', '⩚'),
			_Utils_Tuple2('ang', '∠'),
			_Utils_Tuple2('ange', '⦤'),
			_Utils_Tuple2('angle', '∠'),
			_Utils_Tuple2('angmsdaa', '⦨'),
			_Utils_Tuple2('angmsdab', '⦩'),
			_Utils_Tuple2('angmsdac', '⦪'),
			_Utils_Tuple2('angmsdad', '⦫'),
			_Utils_Tuple2('angmsdae', '⦬'),
			_Utils_Tuple2('angmsdaf', '⦭'),
			_Utils_Tuple2('angmsdag', '⦮'),
			_Utils_Tuple2('angmsdah', '⦯'),
			_Utils_Tuple2('angmsd', '∡'),
			_Utils_Tuple2('angrt', '∟'),
			_Utils_Tuple2('angrtvb', '⊾'),
			_Utils_Tuple2('angrtvbd', '⦝'),
			_Utils_Tuple2('angsph', '∢'),
			_Utils_Tuple2('angst', 'Å'),
			_Utils_Tuple2('angzarr', '⍼'),
			_Utils_Tuple2('Aogon', 'Ą'),
			_Utils_Tuple2('aogon', 'ą'),
			_Utils_Tuple2('Aopf', '\uD835\uDD38'),
			_Utils_Tuple2('aopf', '\uD835\uDD52'),
			_Utils_Tuple2('apacir', '⩯'),
			_Utils_Tuple2('ap', '≈'),
			_Utils_Tuple2('apE', '⩰'),
			_Utils_Tuple2('ape', '≊'),
			_Utils_Tuple2('apid', '≋'),
			_Utils_Tuple2('apos', '\''),
			_Utils_Tuple2('ApplyFunction', '\u2061'),
			_Utils_Tuple2('approx', '≈'),
			_Utils_Tuple2('approxeq', '≊'),
			_Utils_Tuple2('Aring', 'Å'),
			_Utils_Tuple2('aring', 'å'),
			_Utils_Tuple2('Ascr', '\uD835\uDC9C'),
			_Utils_Tuple2('ascr', '\uD835\uDCB6'),
			_Utils_Tuple2('Assign', '≔'),
			_Utils_Tuple2('ast', '*'),
			_Utils_Tuple2('asymp', '≈'),
			_Utils_Tuple2('asympeq', '≍'),
			_Utils_Tuple2('Atilde', 'Ã'),
			_Utils_Tuple2('atilde', 'ã'),
			_Utils_Tuple2('Auml', 'Ä'),
			_Utils_Tuple2('auml', 'ä'),
			_Utils_Tuple2('awconint', '∳'),
			_Utils_Tuple2('awint', '⨑'),
			_Utils_Tuple2('backcong', '≌'),
			_Utils_Tuple2('backepsilon', '϶'),
			_Utils_Tuple2('backprime', '‵'),
			_Utils_Tuple2('backsim', '∽'),
			_Utils_Tuple2('backsimeq', '⋍'),
			_Utils_Tuple2('Backslash', '∖'),
			_Utils_Tuple2('Barv', '⫧'),
			_Utils_Tuple2('barvee', '⊽'),
			_Utils_Tuple2('barwed', '⌅'),
			_Utils_Tuple2('Barwed', '⌆'),
			_Utils_Tuple2('barwedge', '⌅'),
			_Utils_Tuple2('bbrk', '⎵'),
			_Utils_Tuple2('bbrktbrk', '⎶'),
			_Utils_Tuple2('bcong', '≌'),
			_Utils_Tuple2('Bcy', 'Б'),
			_Utils_Tuple2('bcy', 'б'),
			_Utils_Tuple2('bdquo', '„'),
			_Utils_Tuple2('becaus', '∵'),
			_Utils_Tuple2('because', '∵'),
			_Utils_Tuple2('Because', '∵'),
			_Utils_Tuple2('bemptyv', '⦰'),
			_Utils_Tuple2('bepsi', '϶'),
			_Utils_Tuple2('bernou', 'ℬ'),
			_Utils_Tuple2('Bernoullis', 'ℬ'),
			_Utils_Tuple2('Beta', 'Β'),
			_Utils_Tuple2('beta', 'β'),
			_Utils_Tuple2('beth', 'ℶ'),
			_Utils_Tuple2('between', '≬'),
			_Utils_Tuple2('Bfr', '\uD835\uDD05'),
			_Utils_Tuple2('bfr', '\uD835\uDD1F'),
			_Utils_Tuple2('bigcap', '⋂'),
			_Utils_Tuple2('bigcirc', '◯'),
			_Utils_Tuple2('bigcup', '⋃'),
			_Utils_Tuple2('bigodot', '⨀'),
			_Utils_Tuple2('bigoplus', '⨁'),
			_Utils_Tuple2('bigotimes', '⨂'),
			_Utils_Tuple2('bigsqcup', '⨆'),
			_Utils_Tuple2('bigstar', '★'),
			_Utils_Tuple2('bigtriangledown', '▽'),
			_Utils_Tuple2('bigtriangleup', '△'),
			_Utils_Tuple2('biguplus', '⨄'),
			_Utils_Tuple2('bigvee', '⋁'),
			_Utils_Tuple2('bigwedge', '⋀'),
			_Utils_Tuple2('bkarow', '⤍'),
			_Utils_Tuple2('blacklozenge', '⧫'),
			_Utils_Tuple2('blacksquare', '▪'),
			_Utils_Tuple2('blacktriangle', '▴'),
			_Utils_Tuple2('blacktriangledown', '▾'),
			_Utils_Tuple2('blacktriangleleft', '◂'),
			_Utils_Tuple2('blacktriangleright', '▸'),
			_Utils_Tuple2('blank', '␣'),
			_Utils_Tuple2('blk12', '▒'),
			_Utils_Tuple2('blk14', '░'),
			_Utils_Tuple2('blk34', '▓'),
			_Utils_Tuple2('block', '█'),
			_Utils_Tuple2('bne', '=⃥'),
			_Utils_Tuple2('bnequiv', '≡⃥'),
			_Utils_Tuple2('bNot', '⫭'),
			_Utils_Tuple2('bnot', '⌐'),
			_Utils_Tuple2('Bopf', '\uD835\uDD39'),
			_Utils_Tuple2('bopf', '\uD835\uDD53'),
			_Utils_Tuple2('bot', '⊥'),
			_Utils_Tuple2('bottom', '⊥'),
			_Utils_Tuple2('bowtie', '⋈'),
			_Utils_Tuple2('boxbox', '⧉'),
			_Utils_Tuple2('boxdl', '┐'),
			_Utils_Tuple2('boxdL', '╕'),
			_Utils_Tuple2('boxDl', '╖'),
			_Utils_Tuple2('boxDL', '╗'),
			_Utils_Tuple2('boxdr', '┌'),
			_Utils_Tuple2('boxdR', '╒'),
			_Utils_Tuple2('boxDr', '╓'),
			_Utils_Tuple2('boxDR', '╔'),
			_Utils_Tuple2('boxh', '─'),
			_Utils_Tuple2('boxH', '═'),
			_Utils_Tuple2('boxhd', '┬'),
			_Utils_Tuple2('boxHd', '╤'),
			_Utils_Tuple2('boxhD', '╥'),
			_Utils_Tuple2('boxHD', '╦'),
			_Utils_Tuple2('boxhu', '┴'),
			_Utils_Tuple2('boxHu', '╧'),
			_Utils_Tuple2('boxhU', '╨'),
			_Utils_Tuple2('boxHU', '╩'),
			_Utils_Tuple2('boxminus', '⊟'),
			_Utils_Tuple2('boxplus', '⊞'),
			_Utils_Tuple2('boxtimes', '⊠'),
			_Utils_Tuple2('boxul', '┘'),
			_Utils_Tuple2('boxuL', '╛'),
			_Utils_Tuple2('boxUl', '╜'),
			_Utils_Tuple2('boxUL', '╝'),
			_Utils_Tuple2('boxur', '└'),
			_Utils_Tuple2('boxuR', '╘'),
			_Utils_Tuple2('boxUr', '╙'),
			_Utils_Tuple2('boxUR', '╚'),
			_Utils_Tuple2('boxv', '│'),
			_Utils_Tuple2('boxV', '║'),
			_Utils_Tuple2('boxvh', '┼'),
			_Utils_Tuple2('boxvH', '╪'),
			_Utils_Tuple2('boxVh', '╫'),
			_Utils_Tuple2('boxVH', '╬'),
			_Utils_Tuple2('boxvl', '┤'),
			_Utils_Tuple2('boxvL', '╡'),
			_Utils_Tuple2('boxVl', '╢'),
			_Utils_Tuple2('boxVL', '╣'),
			_Utils_Tuple2('boxvr', '├'),
			_Utils_Tuple2('boxvR', '╞'),
			_Utils_Tuple2('boxVr', '╟'),
			_Utils_Tuple2('boxVR', '╠'),
			_Utils_Tuple2('bprime', '‵'),
			_Utils_Tuple2('breve', '˘'),
			_Utils_Tuple2('Breve', '˘'),
			_Utils_Tuple2('brvbar', '¦'),
			_Utils_Tuple2('bscr', '\uD835\uDCB7'),
			_Utils_Tuple2('Bscr', 'ℬ'),
			_Utils_Tuple2('bsemi', '⁏'),
			_Utils_Tuple2('bsim', '∽'),
			_Utils_Tuple2('bsime', '⋍'),
			_Utils_Tuple2('bsolb', '⧅'),
			_Utils_Tuple2('bsol', '\\'),
			_Utils_Tuple2('bsolhsub', '⟈'),
			_Utils_Tuple2('bull', '•'),
			_Utils_Tuple2('bullet', '•'),
			_Utils_Tuple2('bump', '≎'),
			_Utils_Tuple2('bumpE', '⪮'),
			_Utils_Tuple2('bumpe', '≏'),
			_Utils_Tuple2('Bumpeq', '≎'),
			_Utils_Tuple2('bumpeq', '≏'),
			_Utils_Tuple2('Cacute', 'Ć'),
			_Utils_Tuple2('cacute', 'ć'),
			_Utils_Tuple2('capand', '⩄'),
			_Utils_Tuple2('capbrcup', '⩉'),
			_Utils_Tuple2('capcap', '⩋'),
			_Utils_Tuple2('cap', '∩'),
			_Utils_Tuple2('Cap', '⋒'),
			_Utils_Tuple2('capcup', '⩇'),
			_Utils_Tuple2('capdot', '⩀'),
			_Utils_Tuple2('CapitalDifferentialD', 'ⅅ'),
			_Utils_Tuple2('caps', '∩︀'),
			_Utils_Tuple2('caret', '⁁'),
			_Utils_Tuple2('caron', 'ˇ'),
			_Utils_Tuple2('Cayleys', 'ℭ'),
			_Utils_Tuple2('ccaps', '⩍'),
			_Utils_Tuple2('Ccaron', 'Č'),
			_Utils_Tuple2('ccaron', 'č'),
			_Utils_Tuple2('Ccedil', 'Ç'),
			_Utils_Tuple2('ccedil', 'ç'),
			_Utils_Tuple2('Ccirc', 'Ĉ'),
			_Utils_Tuple2('ccirc', 'ĉ'),
			_Utils_Tuple2('Cconint', '∰'),
			_Utils_Tuple2('ccups', '⩌'),
			_Utils_Tuple2('ccupssm', '⩐'),
			_Utils_Tuple2('Cdot', 'Ċ'),
			_Utils_Tuple2('cdot', 'ċ'),
			_Utils_Tuple2('cedil', '¸'),
			_Utils_Tuple2('Cedilla', '¸'),
			_Utils_Tuple2('cemptyv', '⦲'),
			_Utils_Tuple2('cent', '¢'),
			_Utils_Tuple2('centerdot', '·'),
			_Utils_Tuple2('CenterDot', '·'),
			_Utils_Tuple2('cfr', '\uD835\uDD20'),
			_Utils_Tuple2('Cfr', 'ℭ'),
			_Utils_Tuple2('CHcy', 'Ч'),
			_Utils_Tuple2('chcy', 'ч'),
			_Utils_Tuple2('check', '✓'),
			_Utils_Tuple2('checkmark', '✓'),
			_Utils_Tuple2('Chi', 'Χ'),
			_Utils_Tuple2('chi', 'χ'),
			_Utils_Tuple2('circ', 'ˆ'),
			_Utils_Tuple2('circeq', '≗'),
			_Utils_Tuple2('circlearrowleft', '↺'),
			_Utils_Tuple2('circlearrowright', '↻'),
			_Utils_Tuple2('circledast', '⊛'),
			_Utils_Tuple2('circledcirc', '⊚'),
			_Utils_Tuple2('circleddash', '⊝'),
			_Utils_Tuple2('CircleDot', '⊙'),
			_Utils_Tuple2('circledR', '®'),
			_Utils_Tuple2('circledS', 'Ⓢ'),
			_Utils_Tuple2('CircleMinus', '⊖'),
			_Utils_Tuple2('CirclePlus', '⊕'),
			_Utils_Tuple2('CircleTimes', '⊗'),
			_Utils_Tuple2('cir', '○'),
			_Utils_Tuple2('cirE', '⧃'),
			_Utils_Tuple2('cire', '≗'),
			_Utils_Tuple2('cirfnint', '⨐'),
			_Utils_Tuple2('cirmid', '⫯'),
			_Utils_Tuple2('cirscir', '⧂'),
			_Utils_Tuple2('ClockwiseContourIntegral', '∲'),
			_Utils_Tuple2('CloseCurlyDoubleQuote', '”'),
			_Utils_Tuple2('CloseCurlyQuote', '’'),
			_Utils_Tuple2('clubs', '♣'),
			_Utils_Tuple2('clubsuit', '♣'),
			_Utils_Tuple2('colon', ':'),
			_Utils_Tuple2('Colon', '∷'),
			_Utils_Tuple2('Colone', '⩴'),
			_Utils_Tuple2('colone', '≔'),
			_Utils_Tuple2('coloneq', '≔'),
			_Utils_Tuple2('comma', ','),
			_Utils_Tuple2('commat', '@'),
			_Utils_Tuple2('comp', '∁'),
			_Utils_Tuple2('compfn', '∘'),
			_Utils_Tuple2('complement', '∁'),
			_Utils_Tuple2('complexes', 'ℂ'),
			_Utils_Tuple2('cong', '≅'),
			_Utils_Tuple2('congdot', '⩭'),
			_Utils_Tuple2('Congruent', '≡'),
			_Utils_Tuple2('conint', '∮'),
			_Utils_Tuple2('Conint', '∯'),
			_Utils_Tuple2('ContourIntegral', '∮'),
			_Utils_Tuple2('copf', '\uD835\uDD54'),
			_Utils_Tuple2('Copf', 'ℂ'),
			_Utils_Tuple2('coprod', '∐'),
			_Utils_Tuple2('Coproduct', '∐'),
			_Utils_Tuple2('copy', '©'),
			_Utils_Tuple2('COPY', '©'),
			_Utils_Tuple2('copysr', '℗'),
			_Utils_Tuple2('CounterClockwiseContourIntegral', '∳'),
			_Utils_Tuple2('crarr', '↵'),
			_Utils_Tuple2('cross', '✗'),
			_Utils_Tuple2('Cross', '⨯'),
			_Utils_Tuple2('Cscr', '\uD835\uDC9E'),
			_Utils_Tuple2('cscr', '\uD835\uDCB8'),
			_Utils_Tuple2('csub', '⫏'),
			_Utils_Tuple2('csube', '⫑'),
			_Utils_Tuple2('csup', '⫐'),
			_Utils_Tuple2('csupe', '⫒'),
			_Utils_Tuple2('ctdot', '⋯'),
			_Utils_Tuple2('cudarrl', '⤸'),
			_Utils_Tuple2('cudarrr', '⤵'),
			_Utils_Tuple2('cuepr', '⋞'),
			_Utils_Tuple2('cuesc', '⋟'),
			_Utils_Tuple2('cularr', '↶'),
			_Utils_Tuple2('cularrp', '⤽'),
			_Utils_Tuple2('cupbrcap', '⩈'),
			_Utils_Tuple2('cupcap', '⩆'),
			_Utils_Tuple2('CupCap', '≍'),
			_Utils_Tuple2('cup', '∪'),
			_Utils_Tuple2('Cup', '⋓'),
			_Utils_Tuple2('cupcup', '⩊'),
			_Utils_Tuple2('cupdot', '⊍'),
			_Utils_Tuple2('cupor', '⩅'),
			_Utils_Tuple2('cups', '∪︀'),
			_Utils_Tuple2('curarr', '↷'),
			_Utils_Tuple2('curarrm', '⤼'),
			_Utils_Tuple2('curlyeqprec', '⋞'),
			_Utils_Tuple2('curlyeqsucc', '⋟'),
			_Utils_Tuple2('curlyvee', '⋎'),
			_Utils_Tuple2('curlywedge', '⋏'),
			_Utils_Tuple2('curren', '¤'),
			_Utils_Tuple2('curvearrowleft', '↶'),
			_Utils_Tuple2('curvearrowright', '↷'),
			_Utils_Tuple2('cuvee', '⋎'),
			_Utils_Tuple2('cuwed', '⋏'),
			_Utils_Tuple2('cwconint', '∲'),
			_Utils_Tuple2('cwint', '∱'),
			_Utils_Tuple2('cylcty', '⌭'),
			_Utils_Tuple2('dagger', '†'),
			_Utils_Tuple2('Dagger', '‡'),
			_Utils_Tuple2('daleth', 'ℸ'),
			_Utils_Tuple2('darr', '↓'),
			_Utils_Tuple2('Darr', '↡'),
			_Utils_Tuple2('dArr', '⇓'),
			_Utils_Tuple2('dash', '‐'),
			_Utils_Tuple2('Dashv', '⫤'),
			_Utils_Tuple2('dashv', '⊣'),
			_Utils_Tuple2('dbkarow', '⤏'),
			_Utils_Tuple2('dblac', '˝'),
			_Utils_Tuple2('Dcaron', 'Ď'),
			_Utils_Tuple2('dcaron', 'ď'),
			_Utils_Tuple2('Dcy', 'Д'),
			_Utils_Tuple2('dcy', 'д'),
			_Utils_Tuple2('ddagger', '‡'),
			_Utils_Tuple2('ddarr', '⇊'),
			_Utils_Tuple2('DD', 'ⅅ'),
			_Utils_Tuple2('dd', 'ⅆ'),
			_Utils_Tuple2('DDotrahd', '⤑'),
			_Utils_Tuple2('ddotseq', '⩷'),
			_Utils_Tuple2('deg', '°'),
			_Utils_Tuple2('Del', '∇'),
			_Utils_Tuple2('Delta', 'Δ'),
			_Utils_Tuple2('delta', 'δ'),
			_Utils_Tuple2('demptyv', '⦱'),
			_Utils_Tuple2('dfisht', '⥿'),
			_Utils_Tuple2('Dfr', '\uD835\uDD07'),
			_Utils_Tuple2('dfr', '\uD835\uDD21'),
			_Utils_Tuple2('dHar', '⥥'),
			_Utils_Tuple2('dharl', '⇃'),
			_Utils_Tuple2('dharr', '⇂'),
			_Utils_Tuple2('DiacriticalAcute', '´'),
			_Utils_Tuple2('DiacriticalDot', '˙'),
			_Utils_Tuple2('DiacriticalDoubleAcute', '˝'),
			_Utils_Tuple2('DiacriticalGrave', '`'),
			_Utils_Tuple2('DiacriticalTilde', '˜'),
			_Utils_Tuple2('diam', '⋄'),
			_Utils_Tuple2('diamond', '⋄'),
			_Utils_Tuple2('Diamond', '⋄'),
			_Utils_Tuple2('diamondsuit', '♦'),
			_Utils_Tuple2('diams', '♦'),
			_Utils_Tuple2('die', '¨'),
			_Utils_Tuple2('DifferentialD', 'ⅆ'),
			_Utils_Tuple2('digamma', 'ϝ'),
			_Utils_Tuple2('disin', '⋲'),
			_Utils_Tuple2('div', '÷'),
			_Utils_Tuple2('divide', '÷'),
			_Utils_Tuple2('divideontimes', '⋇'),
			_Utils_Tuple2('divonx', '⋇'),
			_Utils_Tuple2('DJcy', 'Ђ'),
			_Utils_Tuple2('djcy', 'ђ'),
			_Utils_Tuple2('dlcorn', '⌞'),
			_Utils_Tuple2('dlcrop', '⌍'),
			_Utils_Tuple2('dollar', '$'),
			_Utils_Tuple2('Dopf', '\uD835\uDD3B'),
			_Utils_Tuple2('dopf', '\uD835\uDD55'),
			_Utils_Tuple2('Dot', '¨'),
			_Utils_Tuple2('dot', '˙'),
			_Utils_Tuple2('DotDot', '⃜'),
			_Utils_Tuple2('doteq', '≐'),
			_Utils_Tuple2('doteqdot', '≑'),
			_Utils_Tuple2('DotEqual', '≐'),
			_Utils_Tuple2('dotminus', '∸'),
			_Utils_Tuple2('dotplus', '∔'),
			_Utils_Tuple2('dotsquare', '⊡'),
			_Utils_Tuple2('doublebarwedge', '⌆'),
			_Utils_Tuple2('DoubleContourIntegral', '∯'),
			_Utils_Tuple2('DoubleDot', '¨'),
			_Utils_Tuple2('DoubleDownArrow', '⇓'),
			_Utils_Tuple2('DoubleLeftArrow', '⇐'),
			_Utils_Tuple2('DoubleLeftRightArrow', '⇔'),
			_Utils_Tuple2('DoubleLeftTee', '⫤'),
			_Utils_Tuple2('DoubleLongLeftArrow', '⟸'),
			_Utils_Tuple2('DoubleLongLeftRightArrow', '⟺'),
			_Utils_Tuple2('DoubleLongRightArrow', '⟹'),
			_Utils_Tuple2('DoubleRightArrow', '⇒'),
			_Utils_Tuple2('DoubleRightTee', '⊨'),
			_Utils_Tuple2('DoubleUpArrow', '⇑'),
			_Utils_Tuple2('DoubleUpDownArrow', '⇕'),
			_Utils_Tuple2('DoubleVerticalBar', '∥'),
			_Utils_Tuple2('DownArrowBar', '⤓'),
			_Utils_Tuple2('downarrow', '↓'),
			_Utils_Tuple2('DownArrow', '↓'),
			_Utils_Tuple2('Downarrow', '⇓'),
			_Utils_Tuple2('DownArrowUpArrow', '⇵'),
			_Utils_Tuple2('DownBreve', '̑'),
			_Utils_Tuple2('downdownarrows', '⇊'),
			_Utils_Tuple2('downharpoonleft', '⇃'),
			_Utils_Tuple2('downharpoonright', '⇂'),
			_Utils_Tuple2('DownLeftRightVector', '⥐'),
			_Utils_Tuple2('DownLeftTeeVector', '⥞'),
			_Utils_Tuple2('DownLeftVectorBar', '⥖'),
			_Utils_Tuple2('DownLeftVector', '↽'),
			_Utils_Tuple2('DownRightTeeVector', '⥟'),
			_Utils_Tuple2('DownRightVectorBar', '⥗'),
			_Utils_Tuple2('DownRightVector', '⇁'),
			_Utils_Tuple2('DownTeeArrow', '↧'),
			_Utils_Tuple2('DownTee', '⊤'),
			_Utils_Tuple2('drbkarow', '⤐'),
			_Utils_Tuple2('drcorn', '⌟'),
			_Utils_Tuple2('drcrop', '⌌'),
			_Utils_Tuple2('Dscr', '\uD835\uDC9F'),
			_Utils_Tuple2('dscr', '\uD835\uDCB9'),
			_Utils_Tuple2('DScy', 'Ѕ'),
			_Utils_Tuple2('dscy', 'ѕ'),
			_Utils_Tuple2('dsol', '⧶'),
			_Utils_Tuple2('Dstrok', 'Đ'),
			_Utils_Tuple2('dstrok', 'đ'),
			_Utils_Tuple2('dtdot', '⋱'),
			_Utils_Tuple2('dtri', '▿'),
			_Utils_Tuple2('dtrif', '▾'),
			_Utils_Tuple2('duarr', '⇵'),
			_Utils_Tuple2('duhar', '⥯'),
			_Utils_Tuple2('dwangle', '⦦'),
			_Utils_Tuple2('DZcy', 'Џ'),
			_Utils_Tuple2('dzcy', 'џ'),
			_Utils_Tuple2('dzigrarr', '⟿'),
			_Utils_Tuple2('Eacute', 'É'),
			_Utils_Tuple2('eacute', 'é'),
			_Utils_Tuple2('easter', '⩮'),
			_Utils_Tuple2('Ecaron', 'Ě'),
			_Utils_Tuple2('ecaron', 'ě'),
			_Utils_Tuple2('Ecirc', 'Ê'),
			_Utils_Tuple2('ecirc', 'ê'),
			_Utils_Tuple2('ecir', '≖'),
			_Utils_Tuple2('ecolon', '≕'),
			_Utils_Tuple2('Ecy', 'Э'),
			_Utils_Tuple2('ecy', 'э'),
			_Utils_Tuple2('eDDot', '⩷'),
			_Utils_Tuple2('Edot', 'Ė'),
			_Utils_Tuple2('edot', 'ė'),
			_Utils_Tuple2('eDot', '≑'),
			_Utils_Tuple2('ee', 'ⅇ'),
			_Utils_Tuple2('efDot', '≒'),
			_Utils_Tuple2('Efr', '\uD835\uDD08'),
			_Utils_Tuple2('efr', '\uD835\uDD22'),
			_Utils_Tuple2('eg', '⪚'),
			_Utils_Tuple2('Egrave', 'È'),
			_Utils_Tuple2('egrave', 'è'),
			_Utils_Tuple2('egs', '⪖'),
			_Utils_Tuple2('egsdot', '⪘'),
			_Utils_Tuple2('el', '⪙'),
			_Utils_Tuple2('Element', '∈'),
			_Utils_Tuple2('elinters', '⏧'),
			_Utils_Tuple2('ell', 'ℓ'),
			_Utils_Tuple2('els', '⪕'),
			_Utils_Tuple2('elsdot', '⪗'),
			_Utils_Tuple2('Emacr', 'Ē'),
			_Utils_Tuple2('emacr', 'ē'),
			_Utils_Tuple2('empty', '∅'),
			_Utils_Tuple2('emptyset', '∅'),
			_Utils_Tuple2('EmptySmallSquare', '◻'),
			_Utils_Tuple2('emptyv', '∅'),
			_Utils_Tuple2('EmptyVerySmallSquare', '▫'),
			_Utils_Tuple2('emsp13', '\u2004'),
			_Utils_Tuple2('emsp14', '\u2005'),
			_Utils_Tuple2('emsp', '\u2003'),
			_Utils_Tuple2('ENG', 'Ŋ'),
			_Utils_Tuple2('eng', 'ŋ'),
			_Utils_Tuple2('ensp', '\u2002'),
			_Utils_Tuple2('Eogon', 'Ę'),
			_Utils_Tuple2('eogon', 'ę'),
			_Utils_Tuple2('Eopf', '\uD835\uDD3C'),
			_Utils_Tuple2('eopf', '\uD835\uDD56'),
			_Utils_Tuple2('epar', '⋕'),
			_Utils_Tuple2('eparsl', '⧣'),
			_Utils_Tuple2('eplus', '⩱'),
			_Utils_Tuple2('epsi', 'ε'),
			_Utils_Tuple2('Epsilon', 'Ε'),
			_Utils_Tuple2('epsilon', 'ε'),
			_Utils_Tuple2('epsiv', 'ϵ'),
			_Utils_Tuple2('eqcirc', '≖'),
			_Utils_Tuple2('eqcolon', '≕'),
			_Utils_Tuple2('eqsim', '≂'),
			_Utils_Tuple2('eqslantgtr', '⪖'),
			_Utils_Tuple2('eqslantless', '⪕'),
			_Utils_Tuple2('Equal', '⩵'),
			_Utils_Tuple2('equals', '='),
			_Utils_Tuple2('EqualTilde', '≂'),
			_Utils_Tuple2('equest', '≟'),
			_Utils_Tuple2('Equilibrium', '⇌'),
			_Utils_Tuple2('equiv', '≡'),
			_Utils_Tuple2('equivDD', '⩸'),
			_Utils_Tuple2('eqvparsl', '⧥'),
			_Utils_Tuple2('erarr', '⥱'),
			_Utils_Tuple2('erDot', '≓'),
			_Utils_Tuple2('escr', 'ℯ'),
			_Utils_Tuple2('Escr', 'ℰ'),
			_Utils_Tuple2('esdot', '≐'),
			_Utils_Tuple2('Esim', '⩳'),
			_Utils_Tuple2('esim', '≂'),
			_Utils_Tuple2('Eta', 'Η'),
			_Utils_Tuple2('eta', 'η'),
			_Utils_Tuple2('ETH', 'Ð'),
			_Utils_Tuple2('eth', 'ð'),
			_Utils_Tuple2('Euml', 'Ë'),
			_Utils_Tuple2('euml', 'ë'),
			_Utils_Tuple2('euro', '€'),
			_Utils_Tuple2('excl', '!'),
			_Utils_Tuple2('exist', '∃'),
			_Utils_Tuple2('Exists', '∃'),
			_Utils_Tuple2('expectation', 'ℰ'),
			_Utils_Tuple2('exponentiale', 'ⅇ'),
			_Utils_Tuple2('ExponentialE', 'ⅇ'),
			_Utils_Tuple2('fallingdotseq', '≒'),
			_Utils_Tuple2('Fcy', 'Ф'),
			_Utils_Tuple2('fcy', 'ф'),
			_Utils_Tuple2('female', '♀'),
			_Utils_Tuple2('ffilig', 'ﬃ'),
			_Utils_Tuple2('fflig', 'ﬀ'),
			_Utils_Tuple2('ffllig', 'ﬄ'),
			_Utils_Tuple2('Ffr', '\uD835\uDD09'),
			_Utils_Tuple2('ffr', '\uD835\uDD23'),
			_Utils_Tuple2('filig', 'ﬁ'),
			_Utils_Tuple2('FilledSmallSquare', '◼'),
			_Utils_Tuple2('FilledVerySmallSquare', '▪'),
			_Utils_Tuple2('fjlig', 'fj'),
			_Utils_Tuple2('flat', '♭'),
			_Utils_Tuple2('fllig', 'ﬂ'),
			_Utils_Tuple2('fltns', '▱'),
			_Utils_Tuple2('fnof', 'ƒ'),
			_Utils_Tuple2('Fopf', '\uD835\uDD3D'),
			_Utils_Tuple2('fopf', '\uD835\uDD57'),
			_Utils_Tuple2('forall', '∀'),
			_Utils_Tuple2('ForAll', '∀'),
			_Utils_Tuple2('fork', '⋔'),
			_Utils_Tuple2('forkv', '⫙'),
			_Utils_Tuple2('Fouriertrf', 'ℱ'),
			_Utils_Tuple2('fpartint', '⨍'),
			_Utils_Tuple2('frac12', '½'),
			_Utils_Tuple2('frac13', '⅓'),
			_Utils_Tuple2('frac14', '¼'),
			_Utils_Tuple2('frac15', '⅕'),
			_Utils_Tuple2('frac16', '⅙'),
			_Utils_Tuple2('frac18', '⅛'),
			_Utils_Tuple2('frac23', '⅔'),
			_Utils_Tuple2('frac25', '⅖'),
			_Utils_Tuple2('frac34', '¾'),
			_Utils_Tuple2('frac35', '⅗'),
			_Utils_Tuple2('frac38', '⅜'),
			_Utils_Tuple2('frac45', '⅘'),
			_Utils_Tuple2('frac56', '⅚'),
			_Utils_Tuple2('frac58', '⅝'),
			_Utils_Tuple2('frac78', '⅞'),
			_Utils_Tuple2('frasl', '⁄'),
			_Utils_Tuple2('frown', '⌢'),
			_Utils_Tuple2('fscr', '\uD835\uDCBB'),
			_Utils_Tuple2('Fscr', 'ℱ'),
			_Utils_Tuple2('gacute', 'ǵ'),
			_Utils_Tuple2('Gamma', 'Γ'),
			_Utils_Tuple2('gamma', 'γ'),
			_Utils_Tuple2('Gammad', 'Ϝ'),
			_Utils_Tuple2('gammad', 'ϝ'),
			_Utils_Tuple2('gap', '⪆'),
			_Utils_Tuple2('Gbreve', 'Ğ'),
			_Utils_Tuple2('gbreve', 'ğ'),
			_Utils_Tuple2('Gcedil', 'Ģ'),
			_Utils_Tuple2('Gcirc', 'Ĝ'),
			_Utils_Tuple2('gcirc', 'ĝ'),
			_Utils_Tuple2('Gcy', 'Г'),
			_Utils_Tuple2('gcy', 'г'),
			_Utils_Tuple2('Gdot', 'Ġ'),
			_Utils_Tuple2('gdot', 'ġ'),
			_Utils_Tuple2('ge', '≥'),
			_Utils_Tuple2('gE', '≧'),
			_Utils_Tuple2('gEl', '⪌'),
			_Utils_Tuple2('gel', '⋛'),
			_Utils_Tuple2('geq', '≥'),
			_Utils_Tuple2('geqq', '≧'),
			_Utils_Tuple2('geqslant', '⩾'),
			_Utils_Tuple2('gescc', '⪩'),
			_Utils_Tuple2('ges', '⩾'),
			_Utils_Tuple2('gesdot', '⪀'),
			_Utils_Tuple2('gesdoto', '⪂'),
			_Utils_Tuple2('gesdotol', '⪄'),
			_Utils_Tuple2('gesl', '⋛︀'),
			_Utils_Tuple2('gesles', '⪔'),
			_Utils_Tuple2('Gfr', '\uD835\uDD0A'),
			_Utils_Tuple2('gfr', '\uD835\uDD24'),
			_Utils_Tuple2('gg', '≫'),
			_Utils_Tuple2('Gg', '⋙'),
			_Utils_Tuple2('ggg', '⋙'),
			_Utils_Tuple2('gimel', 'ℷ'),
			_Utils_Tuple2('GJcy', 'Ѓ'),
			_Utils_Tuple2('gjcy', 'ѓ'),
			_Utils_Tuple2('gla', '⪥'),
			_Utils_Tuple2('gl', '≷'),
			_Utils_Tuple2('glE', '⪒'),
			_Utils_Tuple2('glj', '⪤'),
			_Utils_Tuple2('gnap', '⪊'),
			_Utils_Tuple2('gnapprox', '⪊'),
			_Utils_Tuple2('gne', '⪈'),
			_Utils_Tuple2('gnE', '≩'),
			_Utils_Tuple2('gneq', '⪈'),
			_Utils_Tuple2('gneqq', '≩'),
			_Utils_Tuple2('gnsim', '⋧'),
			_Utils_Tuple2('Gopf', '\uD835\uDD3E'),
			_Utils_Tuple2('gopf', '\uD835\uDD58'),
			_Utils_Tuple2('grave', '`'),
			_Utils_Tuple2('GreaterEqual', '≥'),
			_Utils_Tuple2('GreaterEqualLess', '⋛'),
			_Utils_Tuple2('GreaterFullEqual', '≧'),
			_Utils_Tuple2('GreaterGreater', '⪢'),
			_Utils_Tuple2('GreaterLess', '≷'),
			_Utils_Tuple2('GreaterSlantEqual', '⩾'),
			_Utils_Tuple2('GreaterTilde', '≳'),
			_Utils_Tuple2('Gscr', '\uD835\uDCA2'),
			_Utils_Tuple2('gscr', 'ℊ'),
			_Utils_Tuple2('gsim', '≳'),
			_Utils_Tuple2('gsime', '⪎'),
			_Utils_Tuple2('gsiml', '⪐'),
			_Utils_Tuple2('gtcc', '⪧'),
			_Utils_Tuple2('gtcir', '⩺'),
			_Utils_Tuple2('gt', '>'),
			_Utils_Tuple2('GT', '>'),
			_Utils_Tuple2('Gt', '≫'),
			_Utils_Tuple2('gtdot', '⋗'),
			_Utils_Tuple2('gtlPar', '⦕'),
			_Utils_Tuple2('gtquest', '⩼'),
			_Utils_Tuple2('gtrapprox', '⪆'),
			_Utils_Tuple2('gtrarr', '⥸'),
			_Utils_Tuple2('gtrdot', '⋗'),
			_Utils_Tuple2('gtreqless', '⋛'),
			_Utils_Tuple2('gtreqqless', '⪌'),
			_Utils_Tuple2('gtrless', '≷'),
			_Utils_Tuple2('gtrsim', '≳'),
			_Utils_Tuple2('gvertneqq', '≩︀'),
			_Utils_Tuple2('gvnE', '≩︀'),
			_Utils_Tuple2('Hacek', 'ˇ'),
			_Utils_Tuple2('hairsp', '\u200A'),
			_Utils_Tuple2('half', '½'),
			_Utils_Tuple2('hamilt', 'ℋ'),
			_Utils_Tuple2('HARDcy', 'Ъ'),
			_Utils_Tuple2('hardcy', 'ъ'),
			_Utils_Tuple2('harrcir', '⥈'),
			_Utils_Tuple2('harr', '↔'),
			_Utils_Tuple2('hArr', '⇔'),
			_Utils_Tuple2('harrw', '↭'),
			_Utils_Tuple2('Hat', '^'),
			_Utils_Tuple2('hbar', 'ℏ'),
			_Utils_Tuple2('Hcirc', 'Ĥ'),
			_Utils_Tuple2('hcirc', 'ĥ'),
			_Utils_Tuple2('hearts', '♥'),
			_Utils_Tuple2('heartsuit', '♥'),
			_Utils_Tuple2('hellip', '…'),
			_Utils_Tuple2('hercon', '⊹'),
			_Utils_Tuple2('hfr', '\uD835\uDD25'),
			_Utils_Tuple2('Hfr', 'ℌ'),
			_Utils_Tuple2('HilbertSpace', 'ℋ'),
			_Utils_Tuple2('hksearow', '⤥'),
			_Utils_Tuple2('hkswarow', '⤦'),
			_Utils_Tuple2('hoarr', '⇿'),
			_Utils_Tuple2('homtht', '∻'),
			_Utils_Tuple2('hookleftarrow', '↩'),
			_Utils_Tuple2('hookrightarrow', '↪'),
			_Utils_Tuple2('hopf', '\uD835\uDD59'),
			_Utils_Tuple2('Hopf', 'ℍ'),
			_Utils_Tuple2('horbar', '―'),
			_Utils_Tuple2('HorizontalLine', '─'),
			_Utils_Tuple2('hscr', '\uD835\uDCBD'),
			_Utils_Tuple2('Hscr', 'ℋ'),
			_Utils_Tuple2('hslash', 'ℏ'),
			_Utils_Tuple2('Hstrok', 'Ħ'),
			_Utils_Tuple2('hstrok', 'ħ'),
			_Utils_Tuple2('HumpDownHump', '≎'),
			_Utils_Tuple2('HumpEqual', '≏'),
			_Utils_Tuple2('hybull', '⁃'),
			_Utils_Tuple2('hyphen', '‐'),
			_Utils_Tuple2('Iacute', 'Í'),
			_Utils_Tuple2('iacute', 'í'),
			_Utils_Tuple2('ic', '\u2063'),
			_Utils_Tuple2('Icirc', 'Î'),
			_Utils_Tuple2('icirc', 'î'),
			_Utils_Tuple2('Icy', 'И'),
			_Utils_Tuple2('icy', 'и'),
			_Utils_Tuple2('Idot', 'İ'),
			_Utils_Tuple2('IEcy', 'Е'),
			_Utils_Tuple2('iecy', 'е'),
			_Utils_Tuple2('iexcl', '¡'),
			_Utils_Tuple2('iff', '⇔'),
			_Utils_Tuple2('ifr', '\uD835\uDD26'),
			_Utils_Tuple2('Ifr', 'ℑ'),
			_Utils_Tuple2('Igrave', 'Ì'),
			_Utils_Tuple2('igrave', 'ì'),
			_Utils_Tuple2('ii', 'ⅈ'),
			_Utils_Tuple2('iiiint', '⨌'),
			_Utils_Tuple2('iiint', '∭'),
			_Utils_Tuple2('iinfin', '⧜'),
			_Utils_Tuple2('iiota', '℩'),
			_Utils_Tuple2('IJlig', 'Ĳ'),
			_Utils_Tuple2('ijlig', 'ĳ'),
			_Utils_Tuple2('Imacr', 'Ī'),
			_Utils_Tuple2('imacr', 'ī'),
			_Utils_Tuple2('image', 'ℑ'),
			_Utils_Tuple2('ImaginaryI', 'ⅈ'),
			_Utils_Tuple2('imagline', 'ℐ'),
			_Utils_Tuple2('imagpart', 'ℑ'),
			_Utils_Tuple2('imath', 'ı'),
			_Utils_Tuple2('Im', 'ℑ'),
			_Utils_Tuple2('imof', '⊷'),
			_Utils_Tuple2('imped', 'Ƶ'),
			_Utils_Tuple2('Implies', '⇒'),
			_Utils_Tuple2('incare', '℅'),
			_Utils_Tuple2('in', '∈'),
			_Utils_Tuple2('infin', '∞'),
			_Utils_Tuple2('infintie', '⧝'),
			_Utils_Tuple2('inodot', 'ı'),
			_Utils_Tuple2('intcal', '⊺'),
			_Utils_Tuple2('int', '∫'),
			_Utils_Tuple2('Int', '∬'),
			_Utils_Tuple2('integers', 'ℤ'),
			_Utils_Tuple2('Integral', '∫'),
			_Utils_Tuple2('intercal', '⊺'),
			_Utils_Tuple2('Intersection', '⋂'),
			_Utils_Tuple2('intlarhk', '⨗'),
			_Utils_Tuple2('intprod', '⨼'),
			_Utils_Tuple2('InvisibleComma', '\u2063'),
			_Utils_Tuple2('InvisibleTimes', '\u2062'),
			_Utils_Tuple2('IOcy', 'Ё'),
			_Utils_Tuple2('iocy', 'ё'),
			_Utils_Tuple2('Iogon', 'Į'),
			_Utils_Tuple2('iogon', 'į'),
			_Utils_Tuple2('Iopf', '\uD835\uDD40'),
			_Utils_Tuple2('iopf', '\uD835\uDD5A'),
			_Utils_Tuple2('Iota', 'Ι'),
			_Utils_Tuple2('iota', 'ι'),
			_Utils_Tuple2('iprod', '⨼'),
			_Utils_Tuple2('iquest', '¿'),
			_Utils_Tuple2('iscr', '\uD835\uDCBE'),
			_Utils_Tuple2('Iscr', 'ℐ'),
			_Utils_Tuple2('isin', '∈'),
			_Utils_Tuple2('isindot', '⋵'),
			_Utils_Tuple2('isinE', '⋹'),
			_Utils_Tuple2('isins', '⋴'),
			_Utils_Tuple2('isinsv', '⋳'),
			_Utils_Tuple2('isinv', '∈'),
			_Utils_Tuple2('it', '\u2062'),
			_Utils_Tuple2('Itilde', 'Ĩ'),
			_Utils_Tuple2('itilde', 'ĩ'),
			_Utils_Tuple2('Iukcy', 'І'),
			_Utils_Tuple2('iukcy', 'і'),
			_Utils_Tuple2('Iuml', 'Ï'),
			_Utils_Tuple2('iuml', 'ï'),
			_Utils_Tuple2('Jcirc', 'Ĵ'),
			_Utils_Tuple2('jcirc', 'ĵ'),
			_Utils_Tuple2('Jcy', 'Й'),
			_Utils_Tuple2('jcy', 'й'),
			_Utils_Tuple2('Jfr', '\uD835\uDD0D'),
			_Utils_Tuple2('jfr', '\uD835\uDD27'),
			_Utils_Tuple2('jmath', 'ȷ'),
			_Utils_Tuple2('Jopf', '\uD835\uDD41'),
			_Utils_Tuple2('jopf', '\uD835\uDD5B'),
			_Utils_Tuple2('Jscr', '\uD835\uDCA5'),
			_Utils_Tuple2('jscr', '\uD835\uDCBF'),
			_Utils_Tuple2('Jsercy', 'Ј'),
			_Utils_Tuple2('jsercy', 'ј'),
			_Utils_Tuple2('Jukcy', 'Є'),
			_Utils_Tuple2('jukcy', 'є'),
			_Utils_Tuple2('Kappa', 'Κ'),
			_Utils_Tuple2('kappa', 'κ'),
			_Utils_Tuple2('kappav', 'ϰ'),
			_Utils_Tuple2('Kcedil', 'Ķ'),
			_Utils_Tuple2('kcedil', 'ķ'),
			_Utils_Tuple2('Kcy', 'К'),
			_Utils_Tuple2('kcy', 'к'),
			_Utils_Tuple2('Kfr', '\uD835\uDD0E'),
			_Utils_Tuple2('kfr', '\uD835\uDD28'),
			_Utils_Tuple2('kgreen', 'ĸ'),
			_Utils_Tuple2('KHcy', 'Х'),
			_Utils_Tuple2('khcy', 'х'),
			_Utils_Tuple2('KJcy', 'Ќ'),
			_Utils_Tuple2('kjcy', 'ќ'),
			_Utils_Tuple2('Kopf', '\uD835\uDD42'),
			_Utils_Tuple2('kopf', '\uD835\uDD5C'),
			_Utils_Tuple2('Kscr', '\uD835\uDCA6'),
			_Utils_Tuple2('kscr', '\uD835\uDCC0'),
			_Utils_Tuple2('lAarr', '⇚'),
			_Utils_Tuple2('Lacute', 'Ĺ'),
			_Utils_Tuple2('lacute', 'ĺ'),
			_Utils_Tuple2('laemptyv', '⦴'),
			_Utils_Tuple2('lagran', 'ℒ'),
			_Utils_Tuple2('Lambda', 'Λ'),
			_Utils_Tuple2('lambda', 'λ'),
			_Utils_Tuple2('lang', '⟨'),
			_Utils_Tuple2('Lang', '⟪'),
			_Utils_Tuple2('langd', '⦑'),
			_Utils_Tuple2('langle', '⟨'),
			_Utils_Tuple2('lap', '⪅'),
			_Utils_Tuple2('Laplacetrf', 'ℒ'),
			_Utils_Tuple2('laquo', '«'),
			_Utils_Tuple2('larrb', '⇤'),
			_Utils_Tuple2('larrbfs', '⤟'),
			_Utils_Tuple2('larr', '←'),
			_Utils_Tuple2('Larr', '↞'),
			_Utils_Tuple2('lArr', '⇐'),
			_Utils_Tuple2('larrfs', '⤝'),
			_Utils_Tuple2('larrhk', '↩'),
			_Utils_Tuple2('larrlp', '↫'),
			_Utils_Tuple2('larrpl', '⤹'),
			_Utils_Tuple2('larrsim', '⥳'),
			_Utils_Tuple2('larrtl', '↢'),
			_Utils_Tuple2('latail', '⤙'),
			_Utils_Tuple2('lAtail', '⤛'),
			_Utils_Tuple2('lat', '⪫'),
			_Utils_Tuple2('late', '⪭'),
			_Utils_Tuple2('lates', '⪭︀'),
			_Utils_Tuple2('lbarr', '⤌'),
			_Utils_Tuple2('lBarr', '⤎'),
			_Utils_Tuple2('lbbrk', '❲'),
			_Utils_Tuple2('lbrace', '{'),
			_Utils_Tuple2('lbrack', '['),
			_Utils_Tuple2('lbrke', '⦋'),
			_Utils_Tuple2('lbrksld', '⦏'),
			_Utils_Tuple2('lbrkslu', '⦍'),
			_Utils_Tuple2('Lcaron', 'Ľ'),
			_Utils_Tuple2('lcaron', 'ľ'),
			_Utils_Tuple2('Lcedil', 'Ļ'),
			_Utils_Tuple2('lcedil', 'ļ'),
			_Utils_Tuple2('lceil', '⌈'),
			_Utils_Tuple2('lcub', '{'),
			_Utils_Tuple2('Lcy', 'Л'),
			_Utils_Tuple2('lcy', 'л'),
			_Utils_Tuple2('ldca', '⤶'),
			_Utils_Tuple2('ldquo', '“'),
			_Utils_Tuple2('ldquor', '„'),
			_Utils_Tuple2('ldrdhar', '⥧'),
			_Utils_Tuple2('ldrushar', '⥋'),
			_Utils_Tuple2('ldsh', '↲'),
			_Utils_Tuple2('le', '≤'),
			_Utils_Tuple2('lE', '≦'),
			_Utils_Tuple2('LeftAngleBracket', '⟨'),
			_Utils_Tuple2('LeftArrowBar', '⇤'),
			_Utils_Tuple2('leftarrow', '←'),
			_Utils_Tuple2('LeftArrow', '←'),
			_Utils_Tuple2('Leftarrow', '⇐'),
			_Utils_Tuple2('LeftArrowRightArrow', '⇆'),
			_Utils_Tuple2('leftarrowtail', '↢'),
			_Utils_Tuple2('LeftCeiling', '⌈'),
			_Utils_Tuple2('LeftDoubleBracket', '⟦'),
			_Utils_Tuple2('LeftDownTeeVector', '⥡'),
			_Utils_Tuple2('LeftDownVectorBar', '⥙'),
			_Utils_Tuple2('LeftDownVector', '⇃'),
			_Utils_Tuple2('LeftFloor', '⌊'),
			_Utils_Tuple2('leftharpoondown', '↽'),
			_Utils_Tuple2('leftharpoonup', '↼'),
			_Utils_Tuple2('leftleftarrows', '⇇'),
			_Utils_Tuple2('leftrightarrow', '↔'),
			_Utils_Tuple2('LeftRightArrow', '↔'),
			_Utils_Tuple2('Leftrightarrow', '⇔'),
			_Utils_Tuple2('leftrightarrows', '⇆'),
			_Utils_Tuple2('leftrightharpoons', '⇋'),
			_Utils_Tuple2('leftrightsquigarrow', '↭'),
			_Utils_Tuple2('LeftRightVector', '⥎'),
			_Utils_Tuple2('LeftTeeArrow', '↤'),
			_Utils_Tuple2('LeftTee', '⊣'),
			_Utils_Tuple2('LeftTeeVector', '⥚'),
			_Utils_Tuple2('leftthreetimes', '⋋'),
			_Utils_Tuple2('LeftTriangleBar', '⧏'),
			_Utils_Tuple2('LeftTriangle', '⊲'),
			_Utils_Tuple2('LeftTriangleEqual', '⊴'),
			_Utils_Tuple2('LeftUpDownVector', '⥑'),
			_Utils_Tuple2('LeftUpTeeVector', '⥠'),
			_Utils_Tuple2('LeftUpVectorBar', '⥘'),
			_Utils_Tuple2('LeftUpVector', '↿'),
			_Utils_Tuple2('LeftVectorBar', '⥒'),
			_Utils_Tuple2('LeftVector', '↼'),
			_Utils_Tuple2('lEg', '⪋'),
			_Utils_Tuple2('leg', '⋚'),
			_Utils_Tuple2('leq', '≤'),
			_Utils_Tuple2('leqq', '≦'),
			_Utils_Tuple2('leqslant', '⩽'),
			_Utils_Tuple2('lescc', '⪨'),
			_Utils_Tuple2('les', '⩽'),
			_Utils_Tuple2('lesdot', '⩿'),
			_Utils_Tuple2('lesdoto', '⪁'),
			_Utils_Tuple2('lesdotor', '⪃'),
			_Utils_Tuple2('lesg', '⋚︀'),
			_Utils_Tuple2('lesges', '⪓'),
			_Utils_Tuple2('lessapprox', '⪅'),
			_Utils_Tuple2('lessdot', '⋖'),
			_Utils_Tuple2('lesseqgtr', '⋚'),
			_Utils_Tuple2('lesseqqgtr', '⪋'),
			_Utils_Tuple2('LessEqualGreater', '⋚'),
			_Utils_Tuple2('LessFullEqual', '≦'),
			_Utils_Tuple2('LessGreater', '≶'),
			_Utils_Tuple2('lessgtr', '≶'),
			_Utils_Tuple2('LessLess', '⪡'),
			_Utils_Tuple2('lesssim', '≲'),
			_Utils_Tuple2('LessSlantEqual', '⩽'),
			_Utils_Tuple2('LessTilde', '≲'),
			_Utils_Tuple2('lfisht', '⥼'),
			_Utils_Tuple2('lfloor', '⌊'),
			_Utils_Tuple2('Lfr', '\uD835\uDD0F'),
			_Utils_Tuple2('lfr', '\uD835\uDD29'),
			_Utils_Tuple2('lg', '≶'),
			_Utils_Tuple2('lgE', '⪑'),
			_Utils_Tuple2('lHar', '⥢'),
			_Utils_Tuple2('lhard', '↽'),
			_Utils_Tuple2('lharu', '↼'),
			_Utils_Tuple2('lharul', '⥪'),
			_Utils_Tuple2('lhblk', '▄'),
			_Utils_Tuple2('LJcy', 'Љ'),
			_Utils_Tuple2('ljcy', 'љ'),
			_Utils_Tuple2('llarr', '⇇'),
			_Utils_Tuple2('ll', '≪'),
			_Utils_Tuple2('Ll', '⋘'),
			_Utils_Tuple2('llcorner', '⌞'),
			_Utils_Tuple2('Lleftarrow', '⇚'),
			_Utils_Tuple2('llhard', '⥫'),
			_Utils_Tuple2('lltri', '◺'),
			_Utils_Tuple2('Lmidot', 'Ŀ'),
			_Utils_Tuple2('lmidot', 'ŀ'),
			_Utils_Tuple2('lmoustache', '⎰'),
			_Utils_Tuple2('lmoust', '⎰'),
			_Utils_Tuple2('lnap', '⪉'),
			_Utils_Tuple2('lnapprox', '⪉'),
			_Utils_Tuple2('lne', '⪇'),
			_Utils_Tuple2('lnE', '≨'),
			_Utils_Tuple2('lneq', '⪇'),
			_Utils_Tuple2('lneqq', '≨'),
			_Utils_Tuple2('lnsim', '⋦'),
			_Utils_Tuple2('loang', '⟬'),
			_Utils_Tuple2('loarr', '⇽'),
			_Utils_Tuple2('lobrk', '⟦'),
			_Utils_Tuple2('longleftarrow', '⟵'),
			_Utils_Tuple2('LongLeftArrow', '⟵'),
			_Utils_Tuple2('Longleftarrow', '⟸'),
			_Utils_Tuple2('longleftrightarrow', '⟷'),
			_Utils_Tuple2('LongLeftRightArrow', '⟷'),
			_Utils_Tuple2('Longleftrightarrow', '⟺'),
			_Utils_Tuple2('longmapsto', '⟼'),
			_Utils_Tuple2('longrightarrow', '⟶'),
			_Utils_Tuple2('LongRightArrow', '⟶'),
			_Utils_Tuple2('Longrightarrow', '⟹'),
			_Utils_Tuple2('looparrowleft', '↫'),
			_Utils_Tuple2('looparrowright', '↬'),
			_Utils_Tuple2('lopar', '⦅'),
			_Utils_Tuple2('Lopf', '\uD835\uDD43'),
			_Utils_Tuple2('lopf', '\uD835\uDD5D'),
			_Utils_Tuple2('loplus', '⨭'),
			_Utils_Tuple2('lotimes', '⨴'),
			_Utils_Tuple2('lowast', '∗'),
			_Utils_Tuple2('lowbar', '_'),
			_Utils_Tuple2('LowerLeftArrow', '↙'),
			_Utils_Tuple2('LowerRightArrow', '↘'),
			_Utils_Tuple2('loz', '◊'),
			_Utils_Tuple2('lozenge', '◊'),
			_Utils_Tuple2('lozf', '⧫'),
			_Utils_Tuple2('lpar', '('),
			_Utils_Tuple2('lparlt', '⦓'),
			_Utils_Tuple2('lrarr', '⇆'),
			_Utils_Tuple2('lrcorner', '⌟'),
			_Utils_Tuple2('lrhar', '⇋'),
			_Utils_Tuple2('lrhard', '⥭'),
			_Utils_Tuple2('lrm', '\u200E'),
			_Utils_Tuple2('lrtri', '⊿'),
			_Utils_Tuple2('lsaquo', '‹'),
			_Utils_Tuple2('lscr', '\uD835\uDCC1'),
			_Utils_Tuple2('Lscr', 'ℒ'),
			_Utils_Tuple2('lsh', '↰'),
			_Utils_Tuple2('Lsh', '↰'),
			_Utils_Tuple2('lsim', '≲'),
			_Utils_Tuple2('lsime', '⪍'),
			_Utils_Tuple2('lsimg', '⪏'),
			_Utils_Tuple2('lsqb', '['),
			_Utils_Tuple2('lsquo', '‘'),
			_Utils_Tuple2('lsquor', '‚'),
			_Utils_Tuple2('Lstrok', 'Ł'),
			_Utils_Tuple2('lstrok', 'ł'),
			_Utils_Tuple2('ltcc', '⪦'),
			_Utils_Tuple2('ltcir', '⩹'),
			_Utils_Tuple2('lt', '<'),
			_Utils_Tuple2('LT', '<'),
			_Utils_Tuple2('Lt', '≪'),
			_Utils_Tuple2('ltdot', '⋖'),
			_Utils_Tuple2('lthree', '⋋'),
			_Utils_Tuple2('ltimes', '⋉'),
			_Utils_Tuple2('ltlarr', '⥶'),
			_Utils_Tuple2('ltquest', '⩻'),
			_Utils_Tuple2('ltri', '◃'),
			_Utils_Tuple2('ltrie', '⊴'),
			_Utils_Tuple2('ltrif', '◂'),
			_Utils_Tuple2('ltrPar', '⦖'),
			_Utils_Tuple2('lurdshar', '⥊'),
			_Utils_Tuple2('luruhar', '⥦'),
			_Utils_Tuple2('lvertneqq', '≨︀'),
			_Utils_Tuple2('lvnE', '≨︀'),
			_Utils_Tuple2('macr', '¯'),
			_Utils_Tuple2('male', '♂'),
			_Utils_Tuple2('malt', '✠'),
			_Utils_Tuple2('maltese', '✠'),
			_Utils_Tuple2('Map', '⤅'),
			_Utils_Tuple2('map', '↦'),
			_Utils_Tuple2('mapsto', '↦'),
			_Utils_Tuple2('mapstodown', '↧'),
			_Utils_Tuple2('mapstoleft', '↤'),
			_Utils_Tuple2('mapstoup', '↥'),
			_Utils_Tuple2('marker', '▮'),
			_Utils_Tuple2('mcomma', '⨩'),
			_Utils_Tuple2('Mcy', 'М'),
			_Utils_Tuple2('mcy', 'м'),
			_Utils_Tuple2('mdash', '—'),
			_Utils_Tuple2('mDDot', '∺'),
			_Utils_Tuple2('measuredangle', '∡'),
			_Utils_Tuple2('MediumSpace', '\u205F'),
			_Utils_Tuple2('Mellintrf', 'ℳ'),
			_Utils_Tuple2('Mfr', '\uD835\uDD10'),
			_Utils_Tuple2('mfr', '\uD835\uDD2A'),
			_Utils_Tuple2('mho', '℧'),
			_Utils_Tuple2('micro', 'µ'),
			_Utils_Tuple2('midast', '*'),
			_Utils_Tuple2('midcir', '⫰'),
			_Utils_Tuple2('mid', '∣'),
			_Utils_Tuple2('middot', '·'),
			_Utils_Tuple2('minusb', '⊟'),
			_Utils_Tuple2('minus', '−'),
			_Utils_Tuple2('minusd', '∸'),
			_Utils_Tuple2('minusdu', '⨪'),
			_Utils_Tuple2('MinusPlus', '∓'),
			_Utils_Tuple2('mlcp', '⫛'),
			_Utils_Tuple2('mldr', '…'),
			_Utils_Tuple2('mnplus', '∓'),
			_Utils_Tuple2('models', '⊧'),
			_Utils_Tuple2('Mopf', '\uD835\uDD44'),
			_Utils_Tuple2('mopf', '\uD835\uDD5E'),
			_Utils_Tuple2('mp', '∓'),
			_Utils_Tuple2('mscr', '\uD835\uDCC2'),
			_Utils_Tuple2('Mscr', 'ℳ'),
			_Utils_Tuple2('mstpos', '∾'),
			_Utils_Tuple2('Mu', 'Μ'),
			_Utils_Tuple2('mu', 'μ'),
			_Utils_Tuple2('multimap', '⊸'),
			_Utils_Tuple2('mumap', '⊸'),
			_Utils_Tuple2('nabla', '∇'),
			_Utils_Tuple2('Nacute', 'Ń'),
			_Utils_Tuple2('nacute', 'ń'),
			_Utils_Tuple2('nang', '∠⃒'),
			_Utils_Tuple2('nap', '≉'),
			_Utils_Tuple2('napE', '⩰̸'),
			_Utils_Tuple2('napid', '≋̸'),
			_Utils_Tuple2('napos', 'ŉ'),
			_Utils_Tuple2('napprox', '≉'),
			_Utils_Tuple2('natural', '♮'),
			_Utils_Tuple2('naturals', 'ℕ'),
			_Utils_Tuple2('natur', '♮'),
			_Utils_Tuple2('nbsp', '\u00A0'),
			_Utils_Tuple2('nbump', '≎̸'),
			_Utils_Tuple2('nbumpe', '≏̸'),
			_Utils_Tuple2('ncap', '⩃'),
			_Utils_Tuple2('Ncaron', 'Ň'),
			_Utils_Tuple2('ncaron', 'ň'),
			_Utils_Tuple2('Ncedil', 'Ņ'),
			_Utils_Tuple2('ncedil', 'ņ'),
			_Utils_Tuple2('ncong', '≇'),
			_Utils_Tuple2('ncongdot', '⩭̸'),
			_Utils_Tuple2('ncup', '⩂'),
			_Utils_Tuple2('Ncy', 'Н'),
			_Utils_Tuple2('ncy', 'н'),
			_Utils_Tuple2('ndash', '–'),
			_Utils_Tuple2('nearhk', '⤤'),
			_Utils_Tuple2('nearr', '↗'),
			_Utils_Tuple2('neArr', '⇗'),
			_Utils_Tuple2('nearrow', '↗'),
			_Utils_Tuple2('ne', '≠'),
			_Utils_Tuple2('nedot', '≐̸'),
			_Utils_Tuple2('NegativeMediumSpace', '\u200B'),
			_Utils_Tuple2('NegativeThickSpace', '\u200B'),
			_Utils_Tuple2('NegativeThinSpace', '\u200B'),
			_Utils_Tuple2('NegativeVeryThinSpace', '\u200B'),
			_Utils_Tuple2('nequiv', '≢'),
			_Utils_Tuple2('nesear', '⤨'),
			_Utils_Tuple2('nesim', '≂̸'),
			_Utils_Tuple2('NestedGreaterGreater', '≫'),
			_Utils_Tuple2('NestedLessLess', '≪'),
			_Utils_Tuple2('NewLine', '\n'),
			_Utils_Tuple2('nexist', '∄'),
			_Utils_Tuple2('nexists', '∄'),
			_Utils_Tuple2('Nfr', '\uD835\uDD11'),
			_Utils_Tuple2('nfr', '\uD835\uDD2B'),
			_Utils_Tuple2('ngE', '≧̸'),
			_Utils_Tuple2('nge', '≱'),
			_Utils_Tuple2('ngeq', '≱'),
			_Utils_Tuple2('ngeqq', '≧̸'),
			_Utils_Tuple2('ngeqslant', '⩾̸'),
			_Utils_Tuple2('nges', '⩾̸'),
			_Utils_Tuple2('nGg', '⋙̸'),
			_Utils_Tuple2('ngsim', '≵'),
			_Utils_Tuple2('nGt', '≫⃒'),
			_Utils_Tuple2('ngt', '≯'),
			_Utils_Tuple2('ngtr', '≯'),
			_Utils_Tuple2('nGtv', '≫̸'),
			_Utils_Tuple2('nharr', '↮'),
			_Utils_Tuple2('nhArr', '⇎'),
			_Utils_Tuple2('nhpar', '⫲'),
			_Utils_Tuple2('ni', '∋'),
			_Utils_Tuple2('nis', '⋼'),
			_Utils_Tuple2('nisd', '⋺'),
			_Utils_Tuple2('niv', '∋'),
			_Utils_Tuple2('NJcy', 'Њ'),
			_Utils_Tuple2('njcy', 'њ'),
			_Utils_Tuple2('nlarr', '↚'),
			_Utils_Tuple2('nlArr', '⇍'),
			_Utils_Tuple2('nldr', '‥'),
			_Utils_Tuple2('nlE', '≦̸'),
			_Utils_Tuple2('nle', '≰'),
			_Utils_Tuple2('nleftarrow', '↚'),
			_Utils_Tuple2('nLeftarrow', '⇍'),
			_Utils_Tuple2('nleftrightarrow', '↮'),
			_Utils_Tuple2('nLeftrightarrow', '⇎'),
			_Utils_Tuple2('nleq', '≰'),
			_Utils_Tuple2('nleqq', '≦̸'),
			_Utils_Tuple2('nleqslant', '⩽̸'),
			_Utils_Tuple2('nles', '⩽̸'),
			_Utils_Tuple2('nless', '≮'),
			_Utils_Tuple2('nLl', '⋘̸'),
			_Utils_Tuple2('nlsim', '≴'),
			_Utils_Tuple2('nLt', '≪⃒'),
			_Utils_Tuple2('nlt', '≮'),
			_Utils_Tuple2('nltri', '⋪'),
			_Utils_Tuple2('nltrie', '⋬'),
			_Utils_Tuple2('nLtv', '≪̸'),
			_Utils_Tuple2('nmid', '∤'),
			_Utils_Tuple2('NoBreak', '\u2060'),
			_Utils_Tuple2('NonBreakingSpace', '\u00A0'),
			_Utils_Tuple2('nopf', '\uD835\uDD5F'),
			_Utils_Tuple2('Nopf', 'ℕ'),
			_Utils_Tuple2('Not', '⫬'),
			_Utils_Tuple2('not', '¬'),
			_Utils_Tuple2('NotCongruent', '≢'),
			_Utils_Tuple2('NotCupCap', '≭'),
			_Utils_Tuple2('NotDoubleVerticalBar', '∦'),
			_Utils_Tuple2('NotElement', '∉'),
			_Utils_Tuple2('NotEqual', '≠'),
			_Utils_Tuple2('NotEqualTilde', '≂̸'),
			_Utils_Tuple2('NotExists', '∄'),
			_Utils_Tuple2('NotGreater', '≯'),
			_Utils_Tuple2('NotGreaterEqual', '≱'),
			_Utils_Tuple2('NotGreaterFullEqual', '≧̸'),
			_Utils_Tuple2('NotGreaterGreater', '≫̸'),
			_Utils_Tuple2('NotGreaterLess', '≹'),
			_Utils_Tuple2('NotGreaterSlantEqual', '⩾̸'),
			_Utils_Tuple2('NotGreaterTilde', '≵'),
			_Utils_Tuple2('NotHumpDownHump', '≎̸'),
			_Utils_Tuple2('NotHumpEqual', '≏̸'),
			_Utils_Tuple2('notin', '∉'),
			_Utils_Tuple2('notindot', '⋵̸'),
			_Utils_Tuple2('notinE', '⋹̸'),
			_Utils_Tuple2('notinva', '∉'),
			_Utils_Tuple2('notinvb', '⋷'),
			_Utils_Tuple2('notinvc', '⋶'),
			_Utils_Tuple2('NotLeftTriangleBar', '⧏̸'),
			_Utils_Tuple2('NotLeftTriangle', '⋪'),
			_Utils_Tuple2('NotLeftTriangleEqual', '⋬'),
			_Utils_Tuple2('NotLess', '≮'),
			_Utils_Tuple2('NotLessEqual', '≰'),
			_Utils_Tuple2('NotLessGreater', '≸'),
			_Utils_Tuple2('NotLessLess', '≪̸'),
			_Utils_Tuple2('NotLessSlantEqual', '⩽̸'),
			_Utils_Tuple2('NotLessTilde', '≴'),
			_Utils_Tuple2('NotNestedGreaterGreater', '⪢̸'),
			_Utils_Tuple2('NotNestedLessLess', '⪡̸'),
			_Utils_Tuple2('notni', '∌'),
			_Utils_Tuple2('notniva', '∌'),
			_Utils_Tuple2('notnivb', '⋾'),
			_Utils_Tuple2('notnivc', '⋽'),
			_Utils_Tuple2('NotPrecedes', '⊀'),
			_Utils_Tuple2('NotPrecedesEqual', '⪯̸'),
			_Utils_Tuple2('NotPrecedesSlantEqual', '⋠'),
			_Utils_Tuple2('NotReverseElement', '∌'),
			_Utils_Tuple2('NotRightTriangleBar', '⧐̸'),
			_Utils_Tuple2('NotRightTriangle', '⋫'),
			_Utils_Tuple2('NotRightTriangleEqual', '⋭'),
			_Utils_Tuple2('NotSquareSubset', '⊏̸'),
			_Utils_Tuple2('NotSquareSubsetEqual', '⋢'),
			_Utils_Tuple2('NotSquareSuperset', '⊐̸'),
			_Utils_Tuple2('NotSquareSupersetEqual', '⋣'),
			_Utils_Tuple2('NotSubset', '⊂⃒'),
			_Utils_Tuple2('NotSubsetEqual', '⊈'),
			_Utils_Tuple2('NotSucceeds', '⊁'),
			_Utils_Tuple2('NotSucceedsEqual', '⪰̸'),
			_Utils_Tuple2('NotSucceedsSlantEqual', '⋡'),
			_Utils_Tuple2('NotSucceedsTilde', '≿̸'),
			_Utils_Tuple2('NotSuperset', '⊃⃒'),
			_Utils_Tuple2('NotSupersetEqual', '⊉'),
			_Utils_Tuple2('NotTilde', '≁'),
			_Utils_Tuple2('NotTildeEqual', '≄'),
			_Utils_Tuple2('NotTildeFullEqual', '≇'),
			_Utils_Tuple2('NotTildeTilde', '≉'),
			_Utils_Tuple2('NotVerticalBar', '∤'),
			_Utils_Tuple2('nparallel', '∦'),
			_Utils_Tuple2('npar', '∦'),
			_Utils_Tuple2('nparsl', '⫽⃥'),
			_Utils_Tuple2('npart', '∂̸'),
			_Utils_Tuple2('npolint', '⨔'),
			_Utils_Tuple2('npr', '⊀'),
			_Utils_Tuple2('nprcue', '⋠'),
			_Utils_Tuple2('nprec', '⊀'),
			_Utils_Tuple2('npreceq', '⪯̸'),
			_Utils_Tuple2('npre', '⪯̸'),
			_Utils_Tuple2('nrarrc', '⤳̸'),
			_Utils_Tuple2('nrarr', '↛'),
			_Utils_Tuple2('nrArr', '⇏'),
			_Utils_Tuple2('nrarrw', '↝̸'),
			_Utils_Tuple2('nrightarrow', '↛'),
			_Utils_Tuple2('nRightarrow', '⇏'),
			_Utils_Tuple2('nrtri', '⋫'),
			_Utils_Tuple2('nrtrie', '⋭'),
			_Utils_Tuple2('nsc', '⊁'),
			_Utils_Tuple2('nsccue', '⋡'),
			_Utils_Tuple2('nsce', '⪰̸'),
			_Utils_Tuple2('Nscr', '\uD835\uDCA9'),
			_Utils_Tuple2('nscr', '\uD835\uDCC3'),
			_Utils_Tuple2('nshortmid', '∤'),
			_Utils_Tuple2('nshortparallel', '∦'),
			_Utils_Tuple2('nsim', '≁'),
			_Utils_Tuple2('nsime', '≄'),
			_Utils_Tuple2('nsimeq', '≄'),
			_Utils_Tuple2('nsmid', '∤'),
			_Utils_Tuple2('nspar', '∦'),
			_Utils_Tuple2('nsqsube', '⋢'),
			_Utils_Tuple2('nsqsupe', '⋣'),
			_Utils_Tuple2('nsub', '⊄'),
			_Utils_Tuple2('nsubE', '⫅̸'),
			_Utils_Tuple2('nsube', '⊈'),
			_Utils_Tuple2('nsubset', '⊂⃒'),
			_Utils_Tuple2('nsubseteq', '⊈'),
			_Utils_Tuple2('nsubseteqq', '⫅̸'),
			_Utils_Tuple2('nsucc', '⊁'),
			_Utils_Tuple2('nsucceq', '⪰̸'),
			_Utils_Tuple2('nsup', '⊅'),
			_Utils_Tuple2('nsupE', '⫆̸'),
			_Utils_Tuple2('nsupe', '⊉'),
			_Utils_Tuple2('nsupset', '⊃⃒'),
			_Utils_Tuple2('nsupseteq', '⊉'),
			_Utils_Tuple2('nsupseteqq', '⫆̸'),
			_Utils_Tuple2('ntgl', '≹'),
			_Utils_Tuple2('Ntilde', 'Ñ'),
			_Utils_Tuple2('ntilde', 'ñ'),
			_Utils_Tuple2('ntlg', '≸'),
			_Utils_Tuple2('ntriangleleft', '⋪'),
			_Utils_Tuple2('ntrianglelefteq', '⋬'),
			_Utils_Tuple2('ntriangleright', '⋫'),
			_Utils_Tuple2('ntrianglerighteq', '⋭'),
			_Utils_Tuple2('Nu', 'Ν'),
			_Utils_Tuple2('nu', 'ν'),
			_Utils_Tuple2('num', '#'),
			_Utils_Tuple2('numero', '№'),
			_Utils_Tuple2('numsp', '\u2007'),
			_Utils_Tuple2('nvap', '≍⃒'),
			_Utils_Tuple2('nvdash', '⊬'),
			_Utils_Tuple2('nvDash', '⊭'),
			_Utils_Tuple2('nVdash', '⊮'),
			_Utils_Tuple2('nVDash', '⊯'),
			_Utils_Tuple2('nvge', '≥⃒'),
			_Utils_Tuple2('nvgt', '>⃒'),
			_Utils_Tuple2('nvHarr', '⤄'),
			_Utils_Tuple2('nvinfin', '⧞'),
			_Utils_Tuple2('nvlArr', '⤂'),
			_Utils_Tuple2('nvle', '≤⃒'),
			_Utils_Tuple2('nvlt', '<⃒'),
			_Utils_Tuple2('nvltrie', '⊴⃒'),
			_Utils_Tuple2('nvrArr', '⤃'),
			_Utils_Tuple2('nvrtrie', '⊵⃒'),
			_Utils_Tuple2('nvsim', '∼⃒'),
			_Utils_Tuple2('nwarhk', '⤣'),
			_Utils_Tuple2('nwarr', '↖'),
			_Utils_Tuple2('nwArr', '⇖'),
			_Utils_Tuple2('nwarrow', '↖'),
			_Utils_Tuple2('nwnear', '⤧'),
			_Utils_Tuple2('Oacute', 'Ó'),
			_Utils_Tuple2('oacute', 'ó'),
			_Utils_Tuple2('oast', '⊛'),
			_Utils_Tuple2('Ocirc', 'Ô'),
			_Utils_Tuple2('ocirc', 'ô'),
			_Utils_Tuple2('ocir', '⊚'),
			_Utils_Tuple2('Ocy', 'О'),
			_Utils_Tuple2('ocy', 'о'),
			_Utils_Tuple2('odash', '⊝'),
			_Utils_Tuple2('Odblac', 'Ő'),
			_Utils_Tuple2('odblac', 'ő'),
			_Utils_Tuple2('odiv', '⨸'),
			_Utils_Tuple2('odot', '⊙'),
			_Utils_Tuple2('odsold', '⦼'),
			_Utils_Tuple2('OElig', 'Œ'),
			_Utils_Tuple2('oelig', 'œ'),
			_Utils_Tuple2('ofcir', '⦿'),
			_Utils_Tuple2('Ofr', '\uD835\uDD12'),
			_Utils_Tuple2('ofr', '\uD835\uDD2C'),
			_Utils_Tuple2('ogon', '˛'),
			_Utils_Tuple2('Ograve', 'Ò'),
			_Utils_Tuple2('ograve', 'ò'),
			_Utils_Tuple2('ogt', '⧁'),
			_Utils_Tuple2('ohbar', '⦵'),
			_Utils_Tuple2('ohm', 'Ω'),
			_Utils_Tuple2('oint', '∮'),
			_Utils_Tuple2('olarr', '↺'),
			_Utils_Tuple2('olcir', '⦾'),
			_Utils_Tuple2('olcross', '⦻'),
			_Utils_Tuple2('oline', '‾'),
			_Utils_Tuple2('olt', '⧀'),
			_Utils_Tuple2('Omacr', 'Ō'),
			_Utils_Tuple2('omacr', 'ō'),
			_Utils_Tuple2('Omega', 'Ω'),
			_Utils_Tuple2('omega', 'ω'),
			_Utils_Tuple2('Omicron', 'Ο'),
			_Utils_Tuple2('omicron', 'ο'),
			_Utils_Tuple2('omid', '⦶'),
			_Utils_Tuple2('ominus', '⊖'),
			_Utils_Tuple2('Oopf', '\uD835\uDD46'),
			_Utils_Tuple2('oopf', '\uD835\uDD60'),
			_Utils_Tuple2('opar', '⦷'),
			_Utils_Tuple2('OpenCurlyDoubleQuote', '“'),
			_Utils_Tuple2('OpenCurlyQuote', '‘'),
			_Utils_Tuple2('operp', '⦹'),
			_Utils_Tuple2('oplus', '⊕'),
			_Utils_Tuple2('orarr', '↻'),
			_Utils_Tuple2('Or', '⩔'),
			_Utils_Tuple2('or', '∨'),
			_Utils_Tuple2('ord', '⩝'),
			_Utils_Tuple2('order', 'ℴ'),
			_Utils_Tuple2('orderof', 'ℴ'),
			_Utils_Tuple2('ordf', 'ª'),
			_Utils_Tuple2('ordm', 'º'),
			_Utils_Tuple2('origof', '⊶'),
			_Utils_Tuple2('oror', '⩖'),
			_Utils_Tuple2('orslope', '⩗'),
			_Utils_Tuple2('orv', '⩛'),
			_Utils_Tuple2('oS', 'Ⓢ'),
			_Utils_Tuple2('Oscr', '\uD835\uDCAA'),
			_Utils_Tuple2('oscr', 'ℴ'),
			_Utils_Tuple2('Oslash', 'Ø'),
			_Utils_Tuple2('oslash', 'ø'),
			_Utils_Tuple2('osol', '⊘'),
			_Utils_Tuple2('Otilde', 'Õ'),
			_Utils_Tuple2('otilde', 'õ'),
			_Utils_Tuple2('otimesas', '⨶'),
			_Utils_Tuple2('Otimes', '⨷'),
			_Utils_Tuple2('otimes', '⊗'),
			_Utils_Tuple2('Ouml', 'Ö'),
			_Utils_Tuple2('ouml', 'ö'),
			_Utils_Tuple2('ovbar', '⌽'),
			_Utils_Tuple2('OverBar', '‾'),
			_Utils_Tuple2('OverBrace', '⏞'),
			_Utils_Tuple2('OverBracket', '⎴'),
			_Utils_Tuple2('OverParenthesis', '⏜'),
			_Utils_Tuple2('para', '¶'),
			_Utils_Tuple2('parallel', '∥'),
			_Utils_Tuple2('par', '∥'),
			_Utils_Tuple2('parsim', '⫳'),
			_Utils_Tuple2('parsl', '⫽'),
			_Utils_Tuple2('part', '∂'),
			_Utils_Tuple2('PartialD', '∂'),
			_Utils_Tuple2('Pcy', 'П'),
			_Utils_Tuple2('pcy', 'п'),
			_Utils_Tuple2('percnt', '%'),
			_Utils_Tuple2('period', '.'),
			_Utils_Tuple2('permil', '‰'),
			_Utils_Tuple2('perp', '⊥'),
			_Utils_Tuple2('pertenk', '‱'),
			_Utils_Tuple2('Pfr', '\uD835\uDD13'),
			_Utils_Tuple2('pfr', '\uD835\uDD2D'),
			_Utils_Tuple2('Phi', 'Φ'),
			_Utils_Tuple2('phi', 'φ'),
			_Utils_Tuple2('phiv', 'ϕ'),
			_Utils_Tuple2('phmmat', 'ℳ'),
			_Utils_Tuple2('phone', '☎'),
			_Utils_Tuple2('Pi', 'Π'),
			_Utils_Tuple2('pi', 'π'),
			_Utils_Tuple2('pitchfork', '⋔'),
			_Utils_Tuple2('piv', 'ϖ'),
			_Utils_Tuple2('planck', 'ℏ'),
			_Utils_Tuple2('planckh', 'ℎ'),
			_Utils_Tuple2('plankv', 'ℏ'),
			_Utils_Tuple2('plusacir', '⨣'),
			_Utils_Tuple2('plusb', '⊞'),
			_Utils_Tuple2('pluscir', '⨢'),
			_Utils_Tuple2('plus', '+'),
			_Utils_Tuple2('plusdo', '∔'),
			_Utils_Tuple2('plusdu', '⨥'),
			_Utils_Tuple2('pluse', '⩲'),
			_Utils_Tuple2('PlusMinus', '±'),
			_Utils_Tuple2('plusmn', '±'),
			_Utils_Tuple2('plussim', '⨦'),
			_Utils_Tuple2('plustwo', '⨧'),
			_Utils_Tuple2('pm', '±'),
			_Utils_Tuple2('Poincareplane', 'ℌ'),
			_Utils_Tuple2('pointint', '⨕'),
			_Utils_Tuple2('popf', '\uD835\uDD61'),
			_Utils_Tuple2('Popf', 'ℙ'),
			_Utils_Tuple2('pound', '£'),
			_Utils_Tuple2('prap', '⪷'),
			_Utils_Tuple2('Pr', '⪻'),
			_Utils_Tuple2('pr', '≺'),
			_Utils_Tuple2('prcue', '≼'),
			_Utils_Tuple2('precapprox', '⪷'),
			_Utils_Tuple2('prec', '≺'),
			_Utils_Tuple2('preccurlyeq', '≼'),
			_Utils_Tuple2('Precedes', '≺'),
			_Utils_Tuple2('PrecedesEqual', '⪯'),
			_Utils_Tuple2('PrecedesSlantEqual', '≼'),
			_Utils_Tuple2('PrecedesTilde', '≾'),
			_Utils_Tuple2('preceq', '⪯'),
			_Utils_Tuple2('precnapprox', '⪹'),
			_Utils_Tuple2('precneqq', '⪵'),
			_Utils_Tuple2('precnsim', '⋨'),
			_Utils_Tuple2('pre', '⪯'),
			_Utils_Tuple2('prE', '⪳'),
			_Utils_Tuple2('precsim', '≾'),
			_Utils_Tuple2('prime', '′'),
			_Utils_Tuple2('Prime', '″'),
			_Utils_Tuple2('primes', 'ℙ'),
			_Utils_Tuple2('prnap', '⪹'),
			_Utils_Tuple2('prnE', '⪵'),
			_Utils_Tuple2('prnsim', '⋨'),
			_Utils_Tuple2('prod', '∏'),
			_Utils_Tuple2('Product', '∏'),
			_Utils_Tuple2('profalar', '⌮'),
			_Utils_Tuple2('profline', '⌒'),
			_Utils_Tuple2('profsurf', '⌓'),
			_Utils_Tuple2('prop', '∝'),
			_Utils_Tuple2('Proportional', '∝'),
			_Utils_Tuple2('Proportion', '∷'),
			_Utils_Tuple2('propto', '∝'),
			_Utils_Tuple2('prsim', '≾'),
			_Utils_Tuple2('prurel', '⊰'),
			_Utils_Tuple2('Pscr', '\uD835\uDCAB'),
			_Utils_Tuple2('pscr', '\uD835\uDCC5'),
			_Utils_Tuple2('Psi', 'Ψ'),
			_Utils_Tuple2('psi', 'ψ'),
			_Utils_Tuple2('puncsp', '\u2008'),
			_Utils_Tuple2('Qfr', '\uD835\uDD14'),
			_Utils_Tuple2('qfr', '\uD835\uDD2E'),
			_Utils_Tuple2('qint', '⨌'),
			_Utils_Tuple2('qopf', '\uD835\uDD62'),
			_Utils_Tuple2('Qopf', 'ℚ'),
			_Utils_Tuple2('qprime', '⁗'),
			_Utils_Tuple2('Qscr', '\uD835\uDCAC'),
			_Utils_Tuple2('qscr', '\uD835\uDCC6'),
			_Utils_Tuple2('quaternions', 'ℍ'),
			_Utils_Tuple2('quatint', '⨖'),
			_Utils_Tuple2('quest', '?'),
			_Utils_Tuple2('questeq', '≟'),
			_Utils_Tuple2('quot', '\"'),
			_Utils_Tuple2('QUOT', '\"'),
			_Utils_Tuple2('rAarr', '⇛'),
			_Utils_Tuple2('race', '∽̱'),
			_Utils_Tuple2('Racute', 'Ŕ'),
			_Utils_Tuple2('racute', 'ŕ'),
			_Utils_Tuple2('radic', '√'),
			_Utils_Tuple2('raemptyv', '⦳'),
			_Utils_Tuple2('rang', '⟩'),
			_Utils_Tuple2('Rang', '⟫'),
			_Utils_Tuple2('rangd', '⦒'),
			_Utils_Tuple2('range', '⦥'),
			_Utils_Tuple2('rangle', '⟩'),
			_Utils_Tuple2('raquo', '»'),
			_Utils_Tuple2('rarrap', '⥵'),
			_Utils_Tuple2('rarrb', '⇥'),
			_Utils_Tuple2('rarrbfs', '⤠'),
			_Utils_Tuple2('rarrc', '⤳'),
			_Utils_Tuple2('rarr', '→'),
			_Utils_Tuple2('Rarr', '↠'),
			_Utils_Tuple2('rArr', '⇒'),
			_Utils_Tuple2('rarrfs', '⤞'),
			_Utils_Tuple2('rarrhk', '↪'),
			_Utils_Tuple2('rarrlp', '↬'),
			_Utils_Tuple2('rarrpl', '⥅'),
			_Utils_Tuple2('rarrsim', '⥴'),
			_Utils_Tuple2('Rarrtl', '⤖'),
			_Utils_Tuple2('rarrtl', '↣'),
			_Utils_Tuple2('rarrw', '↝'),
			_Utils_Tuple2('ratail', '⤚'),
			_Utils_Tuple2('rAtail', '⤜'),
			_Utils_Tuple2('ratio', '∶'),
			_Utils_Tuple2('rationals', 'ℚ'),
			_Utils_Tuple2('rbarr', '⤍'),
			_Utils_Tuple2('rBarr', '⤏'),
			_Utils_Tuple2('RBarr', '⤐'),
			_Utils_Tuple2('rbbrk', '❳'),
			_Utils_Tuple2('rbrace', '}'),
			_Utils_Tuple2('rbrack', ']'),
			_Utils_Tuple2('rbrke', '⦌'),
			_Utils_Tuple2('rbrksld', '⦎'),
			_Utils_Tuple2('rbrkslu', '⦐'),
			_Utils_Tuple2('Rcaron', 'Ř'),
			_Utils_Tuple2('rcaron', 'ř'),
			_Utils_Tuple2('Rcedil', 'Ŗ'),
			_Utils_Tuple2('rcedil', 'ŗ'),
			_Utils_Tuple2('rceil', '⌉'),
			_Utils_Tuple2('rcub', '}'),
			_Utils_Tuple2('Rcy', 'Р'),
			_Utils_Tuple2('rcy', 'р'),
			_Utils_Tuple2('rdca', '⤷'),
			_Utils_Tuple2('rdldhar', '⥩'),
			_Utils_Tuple2('rdquo', '”'),
			_Utils_Tuple2('rdquor', '”'),
			_Utils_Tuple2('rdsh', '↳'),
			_Utils_Tuple2('real', 'ℜ'),
			_Utils_Tuple2('realine', 'ℛ'),
			_Utils_Tuple2('realpart', 'ℜ'),
			_Utils_Tuple2('reals', 'ℝ'),
			_Utils_Tuple2('Re', 'ℜ'),
			_Utils_Tuple2('rect', '▭'),
			_Utils_Tuple2('reg', '®'),
			_Utils_Tuple2('REG', '®'),
			_Utils_Tuple2('ReverseElement', '∋'),
			_Utils_Tuple2('ReverseEquilibrium', '⇋'),
			_Utils_Tuple2('ReverseUpEquilibrium', '⥯'),
			_Utils_Tuple2('rfisht', '⥽'),
			_Utils_Tuple2('rfloor', '⌋'),
			_Utils_Tuple2('rfr', '\uD835\uDD2F'),
			_Utils_Tuple2('Rfr', 'ℜ'),
			_Utils_Tuple2('rHar', '⥤'),
			_Utils_Tuple2('rhard', '⇁'),
			_Utils_Tuple2('rharu', '⇀'),
			_Utils_Tuple2('rharul', '⥬'),
			_Utils_Tuple2('Rho', 'Ρ'),
			_Utils_Tuple2('rho', 'ρ'),
			_Utils_Tuple2('rhov', 'ϱ'),
			_Utils_Tuple2('RightAngleBracket', '⟩'),
			_Utils_Tuple2('RightArrowBar', '⇥'),
			_Utils_Tuple2('rightarrow', '→'),
			_Utils_Tuple2('RightArrow', '→'),
			_Utils_Tuple2('Rightarrow', '⇒'),
			_Utils_Tuple2('RightArrowLeftArrow', '⇄'),
			_Utils_Tuple2('rightarrowtail', '↣'),
			_Utils_Tuple2('RightCeiling', '⌉'),
			_Utils_Tuple2('RightDoubleBracket', '⟧'),
			_Utils_Tuple2('RightDownTeeVector', '⥝'),
			_Utils_Tuple2('RightDownVectorBar', '⥕'),
			_Utils_Tuple2('RightDownVector', '⇂'),
			_Utils_Tuple2('RightFloor', '⌋'),
			_Utils_Tuple2('rightharpoondown', '⇁'),
			_Utils_Tuple2('rightharpoonup', '⇀'),
			_Utils_Tuple2('rightleftarrows', '⇄'),
			_Utils_Tuple2('rightleftharpoons', '⇌'),
			_Utils_Tuple2('rightrightarrows', '⇉'),
			_Utils_Tuple2('rightsquigarrow', '↝'),
			_Utils_Tuple2('RightTeeArrow', '↦'),
			_Utils_Tuple2('RightTee', '⊢'),
			_Utils_Tuple2('RightTeeVector', '⥛'),
			_Utils_Tuple2('rightthreetimes', '⋌'),
			_Utils_Tuple2('RightTriangleBar', '⧐'),
			_Utils_Tuple2('RightTriangle', '⊳'),
			_Utils_Tuple2('RightTriangleEqual', '⊵'),
			_Utils_Tuple2('RightUpDownVector', '⥏'),
			_Utils_Tuple2('RightUpTeeVector', '⥜'),
			_Utils_Tuple2('RightUpVectorBar', '⥔'),
			_Utils_Tuple2('RightUpVector', '↾'),
			_Utils_Tuple2('RightVectorBar', '⥓'),
			_Utils_Tuple2('RightVector', '⇀'),
			_Utils_Tuple2('ring', '˚'),
			_Utils_Tuple2('risingdotseq', '≓'),
			_Utils_Tuple2('rlarr', '⇄'),
			_Utils_Tuple2('rlhar', '⇌'),
			_Utils_Tuple2('rlm', '\u200F'),
			_Utils_Tuple2('rmoustache', '⎱'),
			_Utils_Tuple2('rmoust', '⎱'),
			_Utils_Tuple2('rnmid', '⫮'),
			_Utils_Tuple2('roang', '⟭'),
			_Utils_Tuple2('roarr', '⇾'),
			_Utils_Tuple2('robrk', '⟧'),
			_Utils_Tuple2('ropar', '⦆'),
			_Utils_Tuple2('ropf', '\uD835\uDD63'),
			_Utils_Tuple2('Ropf', 'ℝ'),
			_Utils_Tuple2('roplus', '⨮'),
			_Utils_Tuple2('rotimes', '⨵'),
			_Utils_Tuple2('RoundImplies', '⥰'),
			_Utils_Tuple2('rpar', ')'),
			_Utils_Tuple2('rpargt', '⦔'),
			_Utils_Tuple2('rppolint', '⨒'),
			_Utils_Tuple2('rrarr', '⇉'),
			_Utils_Tuple2('Rrightarrow', '⇛'),
			_Utils_Tuple2('rsaquo', '›'),
			_Utils_Tuple2('rscr', '\uD835\uDCC7'),
			_Utils_Tuple2('Rscr', 'ℛ'),
			_Utils_Tuple2('rsh', '↱'),
			_Utils_Tuple2('Rsh', '↱'),
			_Utils_Tuple2('rsqb', ']'),
			_Utils_Tuple2('rsquo', '’'),
			_Utils_Tuple2('rsquor', '’'),
			_Utils_Tuple2('rthree', '⋌'),
			_Utils_Tuple2('rtimes', '⋊'),
			_Utils_Tuple2('rtri', '▹'),
			_Utils_Tuple2('rtrie', '⊵'),
			_Utils_Tuple2('rtrif', '▸'),
			_Utils_Tuple2('rtriltri', '⧎'),
			_Utils_Tuple2('RuleDelayed', '⧴'),
			_Utils_Tuple2('ruluhar', '⥨'),
			_Utils_Tuple2('rx', '℞'),
			_Utils_Tuple2('Sacute', 'Ś'),
			_Utils_Tuple2('sacute', 'ś'),
			_Utils_Tuple2('sbquo', '‚'),
			_Utils_Tuple2('scap', '⪸'),
			_Utils_Tuple2('Scaron', 'Š'),
			_Utils_Tuple2('scaron', 'š'),
			_Utils_Tuple2('Sc', '⪼'),
			_Utils_Tuple2('sc', '≻'),
			_Utils_Tuple2('sccue', '≽'),
			_Utils_Tuple2('sce', '⪰'),
			_Utils_Tuple2('scE', '⪴'),
			_Utils_Tuple2('Scedil', 'Ş'),
			_Utils_Tuple2('scedil', 'ş'),
			_Utils_Tuple2('Scirc', 'Ŝ'),
			_Utils_Tuple2('scirc', 'ŝ'),
			_Utils_Tuple2('scnap', '⪺'),
			_Utils_Tuple2('scnE', '⪶'),
			_Utils_Tuple2('scnsim', '⋩'),
			_Utils_Tuple2('scpolint', '⨓'),
			_Utils_Tuple2('scsim', '≿'),
			_Utils_Tuple2('Scy', 'С'),
			_Utils_Tuple2('scy', 'с'),
			_Utils_Tuple2('sdotb', '⊡'),
			_Utils_Tuple2('sdot', '⋅'),
			_Utils_Tuple2('sdote', '⩦'),
			_Utils_Tuple2('searhk', '⤥'),
			_Utils_Tuple2('searr', '↘'),
			_Utils_Tuple2('seArr', '⇘'),
			_Utils_Tuple2('searrow', '↘'),
			_Utils_Tuple2('sect', '§'),
			_Utils_Tuple2('semi', ';'),
			_Utils_Tuple2('seswar', '⤩'),
			_Utils_Tuple2('setminus', '∖'),
			_Utils_Tuple2('setmn', '∖'),
			_Utils_Tuple2('sext', '✶'),
			_Utils_Tuple2('Sfr', '\uD835\uDD16'),
			_Utils_Tuple2('sfr', '\uD835\uDD30'),
			_Utils_Tuple2('sfrown', '⌢'),
			_Utils_Tuple2('sharp', '♯'),
			_Utils_Tuple2('SHCHcy', 'Щ'),
			_Utils_Tuple2('shchcy', 'щ'),
			_Utils_Tuple2('SHcy', 'Ш'),
			_Utils_Tuple2('shcy', 'ш'),
			_Utils_Tuple2('ShortDownArrow', '↓'),
			_Utils_Tuple2('ShortLeftArrow', '←'),
			_Utils_Tuple2('shortmid', '∣'),
			_Utils_Tuple2('shortparallel', '∥'),
			_Utils_Tuple2('ShortRightArrow', '→'),
			_Utils_Tuple2('ShortUpArrow', '↑'),
			_Utils_Tuple2('shy', '\u00AD'),
			_Utils_Tuple2('Sigma', 'Σ'),
			_Utils_Tuple2('sigma', 'σ'),
			_Utils_Tuple2('sigmaf', 'ς'),
			_Utils_Tuple2('sigmav', 'ς'),
			_Utils_Tuple2('sim', '∼'),
			_Utils_Tuple2('simdot', '⩪'),
			_Utils_Tuple2('sime', '≃'),
			_Utils_Tuple2('simeq', '≃'),
			_Utils_Tuple2('simg', '⪞'),
			_Utils_Tuple2('simgE', '⪠'),
			_Utils_Tuple2('siml', '⪝'),
			_Utils_Tuple2('simlE', '⪟'),
			_Utils_Tuple2('simne', '≆'),
			_Utils_Tuple2('simplus', '⨤'),
			_Utils_Tuple2('simrarr', '⥲'),
			_Utils_Tuple2('slarr', '←'),
			_Utils_Tuple2('SmallCircle', '∘'),
			_Utils_Tuple2('smallsetminus', '∖'),
			_Utils_Tuple2('smashp', '⨳'),
			_Utils_Tuple2('smeparsl', '⧤'),
			_Utils_Tuple2('smid', '∣'),
			_Utils_Tuple2('smile', '⌣'),
			_Utils_Tuple2('smt', '⪪'),
			_Utils_Tuple2('smte', '⪬'),
			_Utils_Tuple2('smtes', '⪬︀'),
			_Utils_Tuple2('SOFTcy', 'Ь'),
			_Utils_Tuple2('softcy', 'ь'),
			_Utils_Tuple2('solbar', '⌿'),
			_Utils_Tuple2('solb', '⧄'),
			_Utils_Tuple2('sol', '/'),
			_Utils_Tuple2('Sopf', '\uD835\uDD4A'),
			_Utils_Tuple2('sopf', '\uD835\uDD64'),
			_Utils_Tuple2('spades', '♠'),
			_Utils_Tuple2('spadesuit', '♠'),
			_Utils_Tuple2('spar', '∥'),
			_Utils_Tuple2('sqcap', '⊓'),
			_Utils_Tuple2('sqcaps', '⊓︀'),
			_Utils_Tuple2('sqcup', '⊔'),
			_Utils_Tuple2('sqcups', '⊔︀'),
			_Utils_Tuple2('Sqrt', '√'),
			_Utils_Tuple2('sqsub', '⊏'),
			_Utils_Tuple2('sqsube', '⊑'),
			_Utils_Tuple2('sqsubset', '⊏'),
			_Utils_Tuple2('sqsubseteq', '⊑'),
			_Utils_Tuple2('sqsup', '⊐'),
			_Utils_Tuple2('sqsupe', '⊒'),
			_Utils_Tuple2('sqsupset', '⊐'),
			_Utils_Tuple2('sqsupseteq', '⊒'),
			_Utils_Tuple2('square', '□'),
			_Utils_Tuple2('Square', '□'),
			_Utils_Tuple2('SquareIntersection', '⊓'),
			_Utils_Tuple2('SquareSubset', '⊏'),
			_Utils_Tuple2('SquareSubsetEqual', '⊑'),
			_Utils_Tuple2('SquareSuperset', '⊐'),
			_Utils_Tuple2('SquareSupersetEqual', '⊒'),
			_Utils_Tuple2('SquareUnion', '⊔'),
			_Utils_Tuple2('squarf', '▪'),
			_Utils_Tuple2('squ', '□'),
			_Utils_Tuple2('squf', '▪'),
			_Utils_Tuple2('srarr', '→'),
			_Utils_Tuple2('Sscr', '\uD835\uDCAE'),
			_Utils_Tuple2('sscr', '\uD835\uDCC8'),
			_Utils_Tuple2('ssetmn', '∖'),
			_Utils_Tuple2('ssmile', '⌣'),
			_Utils_Tuple2('sstarf', '⋆'),
			_Utils_Tuple2('Star', '⋆'),
			_Utils_Tuple2('star', '☆'),
			_Utils_Tuple2('starf', '★'),
			_Utils_Tuple2('straightepsilon', 'ϵ'),
			_Utils_Tuple2('straightphi', 'ϕ'),
			_Utils_Tuple2('strns', '¯'),
			_Utils_Tuple2('sub', '⊂'),
			_Utils_Tuple2('Sub', '⋐'),
			_Utils_Tuple2('subdot', '⪽'),
			_Utils_Tuple2('subE', '⫅'),
			_Utils_Tuple2('sube', '⊆'),
			_Utils_Tuple2('subedot', '⫃'),
			_Utils_Tuple2('submult', '⫁'),
			_Utils_Tuple2('subnE', '⫋'),
			_Utils_Tuple2('subne', '⊊'),
			_Utils_Tuple2('subplus', '⪿'),
			_Utils_Tuple2('subrarr', '⥹'),
			_Utils_Tuple2('subset', '⊂'),
			_Utils_Tuple2('Subset', '⋐'),
			_Utils_Tuple2('subseteq', '⊆'),
			_Utils_Tuple2('subseteqq', '⫅'),
			_Utils_Tuple2('SubsetEqual', '⊆'),
			_Utils_Tuple2('subsetneq', '⊊'),
			_Utils_Tuple2('subsetneqq', '⫋'),
			_Utils_Tuple2('subsim', '⫇'),
			_Utils_Tuple2('subsub', '⫕'),
			_Utils_Tuple2('subsup', '⫓'),
			_Utils_Tuple2('succapprox', '⪸'),
			_Utils_Tuple2('succ', '≻'),
			_Utils_Tuple2('succcurlyeq', '≽'),
			_Utils_Tuple2('Succeeds', '≻'),
			_Utils_Tuple2('SucceedsEqual', '⪰'),
			_Utils_Tuple2('SucceedsSlantEqual', '≽'),
			_Utils_Tuple2('SucceedsTilde', '≿'),
			_Utils_Tuple2('succeq', '⪰'),
			_Utils_Tuple2('succnapprox', '⪺'),
			_Utils_Tuple2('succneqq', '⪶'),
			_Utils_Tuple2('succnsim', '⋩'),
			_Utils_Tuple2('succsim', '≿'),
			_Utils_Tuple2('SuchThat', '∋'),
			_Utils_Tuple2('sum', '∑'),
			_Utils_Tuple2('Sum', '∑'),
			_Utils_Tuple2('sung', '♪'),
			_Utils_Tuple2('sup1', '¹'),
			_Utils_Tuple2('sup2', '²'),
			_Utils_Tuple2('sup3', '³'),
			_Utils_Tuple2('sup', '⊃'),
			_Utils_Tuple2('Sup', '⋑'),
			_Utils_Tuple2('supdot', '⪾'),
			_Utils_Tuple2('supdsub', '⫘'),
			_Utils_Tuple2('supE', '⫆'),
			_Utils_Tuple2('supe', '⊇'),
			_Utils_Tuple2('supedot', '⫄'),
			_Utils_Tuple2('Superset', '⊃'),
			_Utils_Tuple2('SupersetEqual', '⊇'),
			_Utils_Tuple2('suphsol', '⟉'),
			_Utils_Tuple2('suphsub', '⫗'),
			_Utils_Tuple2('suplarr', '⥻'),
			_Utils_Tuple2('supmult', '⫂'),
			_Utils_Tuple2('supnE', '⫌'),
			_Utils_Tuple2('supne', '⊋'),
			_Utils_Tuple2('supplus', '⫀'),
			_Utils_Tuple2('supset', '⊃'),
			_Utils_Tuple2('Supset', '⋑'),
			_Utils_Tuple2('supseteq', '⊇'),
			_Utils_Tuple2('supseteqq', '⫆'),
			_Utils_Tuple2('supsetneq', '⊋'),
			_Utils_Tuple2('supsetneqq', '⫌'),
			_Utils_Tuple2('supsim', '⫈'),
			_Utils_Tuple2('supsub', '⫔'),
			_Utils_Tuple2('supsup', '⫖'),
			_Utils_Tuple2('swarhk', '⤦'),
			_Utils_Tuple2('swarr', '↙'),
			_Utils_Tuple2('swArr', '⇙'),
			_Utils_Tuple2('swarrow', '↙'),
			_Utils_Tuple2('swnwar', '⤪'),
			_Utils_Tuple2('szlig', 'ß'),
			_Utils_Tuple2('Tab', '\t'),
			_Utils_Tuple2('target', '⌖'),
			_Utils_Tuple2('Tau', 'Τ'),
			_Utils_Tuple2('tau', 'τ'),
			_Utils_Tuple2('tbrk', '⎴'),
			_Utils_Tuple2('Tcaron', 'Ť'),
			_Utils_Tuple2('tcaron', 'ť'),
			_Utils_Tuple2('Tcedil', 'Ţ'),
			_Utils_Tuple2('tcedil', 'ţ'),
			_Utils_Tuple2('Tcy', 'Т'),
			_Utils_Tuple2('tcy', 'т'),
			_Utils_Tuple2('tdot', '⃛'),
			_Utils_Tuple2('telrec', '⌕'),
			_Utils_Tuple2('Tfr', '\uD835\uDD17'),
			_Utils_Tuple2('tfr', '\uD835\uDD31'),
			_Utils_Tuple2('there4', '∴'),
			_Utils_Tuple2('therefore', '∴'),
			_Utils_Tuple2('Therefore', '∴'),
			_Utils_Tuple2('Theta', 'Θ'),
			_Utils_Tuple2('theta', 'θ'),
			_Utils_Tuple2('thetasym', 'ϑ'),
			_Utils_Tuple2('thetav', 'ϑ'),
			_Utils_Tuple2('thickapprox', '≈'),
			_Utils_Tuple2('thicksim', '∼'),
			_Utils_Tuple2('ThickSpace', '\u205F\u200A'),
			_Utils_Tuple2('ThinSpace', '\u2009'),
			_Utils_Tuple2('thinsp', '\u2009'),
			_Utils_Tuple2('thkap', '≈'),
			_Utils_Tuple2('thksim', '∼'),
			_Utils_Tuple2('THORN', 'Þ'),
			_Utils_Tuple2('thorn', 'þ'),
			_Utils_Tuple2('tilde', '˜'),
			_Utils_Tuple2('Tilde', '∼'),
			_Utils_Tuple2('TildeEqual', '≃'),
			_Utils_Tuple2('TildeFullEqual', '≅'),
			_Utils_Tuple2('TildeTilde', '≈'),
			_Utils_Tuple2('timesbar', '⨱'),
			_Utils_Tuple2('timesb', '⊠'),
			_Utils_Tuple2('times', '×'),
			_Utils_Tuple2('timesd', '⨰'),
			_Utils_Tuple2('tint', '∭'),
			_Utils_Tuple2('toea', '⤨'),
			_Utils_Tuple2('topbot', '⌶'),
			_Utils_Tuple2('topcir', '⫱'),
			_Utils_Tuple2('top', '⊤'),
			_Utils_Tuple2('Topf', '\uD835\uDD4B'),
			_Utils_Tuple2('topf', '\uD835\uDD65'),
			_Utils_Tuple2('topfork', '⫚'),
			_Utils_Tuple2('tosa', '⤩'),
			_Utils_Tuple2('tprime', '‴'),
			_Utils_Tuple2('trade', '™'),
			_Utils_Tuple2('TRADE', '™'),
			_Utils_Tuple2('triangle', '▵'),
			_Utils_Tuple2('triangledown', '▿'),
			_Utils_Tuple2('triangleleft', '◃'),
			_Utils_Tuple2('trianglelefteq', '⊴'),
			_Utils_Tuple2('triangleq', '≜'),
			_Utils_Tuple2('triangleright', '▹'),
			_Utils_Tuple2('trianglerighteq', '⊵'),
			_Utils_Tuple2('tridot', '◬'),
			_Utils_Tuple2('trie', '≜'),
			_Utils_Tuple2('triminus', '⨺'),
			_Utils_Tuple2('TripleDot', '⃛'),
			_Utils_Tuple2('triplus', '⨹'),
			_Utils_Tuple2('trisb', '⧍'),
			_Utils_Tuple2('tritime', '⨻'),
			_Utils_Tuple2('trpezium', '⏢'),
			_Utils_Tuple2('Tscr', '\uD835\uDCAF'),
			_Utils_Tuple2('tscr', '\uD835\uDCC9'),
			_Utils_Tuple2('TScy', 'Ц'),
			_Utils_Tuple2('tscy', 'ц'),
			_Utils_Tuple2('TSHcy', 'Ћ'),
			_Utils_Tuple2('tshcy', 'ћ'),
			_Utils_Tuple2('Tstrok', 'Ŧ'),
			_Utils_Tuple2('tstrok', 'ŧ'),
			_Utils_Tuple2('twixt', '≬'),
			_Utils_Tuple2('twoheadleftarrow', '↞'),
			_Utils_Tuple2('twoheadrightarrow', '↠'),
			_Utils_Tuple2('Uacute', 'Ú'),
			_Utils_Tuple2('uacute', 'ú'),
			_Utils_Tuple2('uarr', '↑'),
			_Utils_Tuple2('Uarr', '↟'),
			_Utils_Tuple2('uArr', '⇑'),
			_Utils_Tuple2('Uarrocir', '⥉'),
			_Utils_Tuple2('Ubrcy', 'Ў'),
			_Utils_Tuple2('ubrcy', 'ў'),
			_Utils_Tuple2('Ubreve', 'Ŭ'),
			_Utils_Tuple2('ubreve', 'ŭ'),
			_Utils_Tuple2('Ucirc', 'Û'),
			_Utils_Tuple2('ucirc', 'û'),
			_Utils_Tuple2('Ucy', 'У'),
			_Utils_Tuple2('ucy', 'у'),
			_Utils_Tuple2('udarr', '⇅'),
			_Utils_Tuple2('Udblac', 'Ű'),
			_Utils_Tuple2('udblac', 'ű'),
			_Utils_Tuple2('udhar', '⥮'),
			_Utils_Tuple2('ufisht', '⥾'),
			_Utils_Tuple2('Ufr', '\uD835\uDD18'),
			_Utils_Tuple2('ufr', '\uD835\uDD32'),
			_Utils_Tuple2('Ugrave', 'Ù'),
			_Utils_Tuple2('ugrave', 'ù'),
			_Utils_Tuple2('uHar', '⥣'),
			_Utils_Tuple2('uharl', '↿'),
			_Utils_Tuple2('uharr', '↾'),
			_Utils_Tuple2('uhblk', '▀'),
			_Utils_Tuple2('ulcorn', '⌜'),
			_Utils_Tuple2('ulcorner', '⌜'),
			_Utils_Tuple2('ulcrop', '⌏'),
			_Utils_Tuple2('ultri', '◸'),
			_Utils_Tuple2('Umacr', 'Ū'),
			_Utils_Tuple2('umacr', 'ū'),
			_Utils_Tuple2('uml', '¨'),
			_Utils_Tuple2('UnderBar', '_'),
			_Utils_Tuple2('UnderBrace', '⏟'),
			_Utils_Tuple2('UnderBracket', '⎵'),
			_Utils_Tuple2('UnderParenthesis', '⏝'),
			_Utils_Tuple2('Union', '⋃'),
			_Utils_Tuple2('UnionPlus', '⊎'),
			_Utils_Tuple2('Uogon', 'Ų'),
			_Utils_Tuple2('uogon', 'ų'),
			_Utils_Tuple2('Uopf', '\uD835\uDD4C'),
			_Utils_Tuple2('uopf', '\uD835\uDD66'),
			_Utils_Tuple2('UpArrowBar', '⤒'),
			_Utils_Tuple2('uparrow', '↑'),
			_Utils_Tuple2('UpArrow', '↑'),
			_Utils_Tuple2('Uparrow', '⇑'),
			_Utils_Tuple2('UpArrowDownArrow', '⇅'),
			_Utils_Tuple2('updownarrow', '↕'),
			_Utils_Tuple2('UpDownArrow', '↕'),
			_Utils_Tuple2('Updownarrow', '⇕'),
			_Utils_Tuple2('UpEquilibrium', '⥮'),
			_Utils_Tuple2('upharpoonleft', '↿'),
			_Utils_Tuple2('upharpoonright', '↾'),
			_Utils_Tuple2('uplus', '⊎'),
			_Utils_Tuple2('UpperLeftArrow', '↖'),
			_Utils_Tuple2('UpperRightArrow', '↗'),
			_Utils_Tuple2('upsi', 'υ'),
			_Utils_Tuple2('Upsi', 'ϒ'),
			_Utils_Tuple2('upsih', 'ϒ'),
			_Utils_Tuple2('Upsilon', 'Υ'),
			_Utils_Tuple2('upsilon', 'υ'),
			_Utils_Tuple2('UpTeeArrow', '↥'),
			_Utils_Tuple2('UpTee', '⊥'),
			_Utils_Tuple2('upuparrows', '⇈'),
			_Utils_Tuple2('urcorn', '⌝'),
			_Utils_Tuple2('urcorner', '⌝'),
			_Utils_Tuple2('urcrop', '⌎'),
			_Utils_Tuple2('Uring', 'Ů'),
			_Utils_Tuple2('uring', 'ů'),
			_Utils_Tuple2('urtri', '◹'),
			_Utils_Tuple2('Uscr', '\uD835\uDCB0'),
			_Utils_Tuple2('uscr', '\uD835\uDCCA'),
			_Utils_Tuple2('utdot', '⋰'),
			_Utils_Tuple2('Utilde', 'Ũ'),
			_Utils_Tuple2('utilde', 'ũ'),
			_Utils_Tuple2('utri', '▵'),
			_Utils_Tuple2('utrif', '▴'),
			_Utils_Tuple2('uuarr', '⇈'),
			_Utils_Tuple2('Uuml', 'Ü'),
			_Utils_Tuple2('uuml', 'ü'),
			_Utils_Tuple2('uwangle', '⦧'),
			_Utils_Tuple2('vangrt', '⦜'),
			_Utils_Tuple2('varepsilon', 'ϵ'),
			_Utils_Tuple2('varkappa', 'ϰ'),
			_Utils_Tuple2('varnothing', '∅'),
			_Utils_Tuple2('varphi', 'ϕ'),
			_Utils_Tuple2('varpi', 'ϖ'),
			_Utils_Tuple2('varpropto', '∝'),
			_Utils_Tuple2('varr', '↕'),
			_Utils_Tuple2('vArr', '⇕'),
			_Utils_Tuple2('varrho', 'ϱ'),
			_Utils_Tuple2('varsigma', 'ς'),
			_Utils_Tuple2('varsubsetneq', '⊊︀'),
			_Utils_Tuple2('varsubsetneqq', '⫋︀'),
			_Utils_Tuple2('varsupsetneq', '⊋︀'),
			_Utils_Tuple2('varsupsetneqq', '⫌︀'),
			_Utils_Tuple2('vartheta', 'ϑ'),
			_Utils_Tuple2('vartriangleleft', '⊲'),
			_Utils_Tuple2('vartriangleright', '⊳'),
			_Utils_Tuple2('vBar', '⫨'),
			_Utils_Tuple2('Vbar', '⫫'),
			_Utils_Tuple2('vBarv', '⫩'),
			_Utils_Tuple2('Vcy', 'В'),
			_Utils_Tuple2('vcy', 'в'),
			_Utils_Tuple2('vdash', '⊢'),
			_Utils_Tuple2('vDash', '⊨'),
			_Utils_Tuple2('Vdash', '⊩'),
			_Utils_Tuple2('VDash', '⊫'),
			_Utils_Tuple2('Vdashl', '⫦'),
			_Utils_Tuple2('veebar', '⊻'),
			_Utils_Tuple2('vee', '∨'),
			_Utils_Tuple2('Vee', '⋁'),
			_Utils_Tuple2('veeeq', '≚'),
			_Utils_Tuple2('vellip', '⋮'),
			_Utils_Tuple2('verbar', '|'),
			_Utils_Tuple2('Verbar', '‖'),
			_Utils_Tuple2('vert', '|'),
			_Utils_Tuple2('Vert', '‖'),
			_Utils_Tuple2('VerticalBar', '∣'),
			_Utils_Tuple2('VerticalLine', '|'),
			_Utils_Tuple2('VerticalSeparator', '❘'),
			_Utils_Tuple2('VerticalTilde', '≀'),
			_Utils_Tuple2('VeryThinSpace', '\u200A'),
			_Utils_Tuple2('Vfr', '\uD835\uDD19'),
			_Utils_Tuple2('vfr', '\uD835\uDD33'),
			_Utils_Tuple2('vltri', '⊲'),
			_Utils_Tuple2('vnsub', '⊂⃒'),
			_Utils_Tuple2('vnsup', '⊃⃒'),
			_Utils_Tuple2('Vopf', '\uD835\uDD4D'),
			_Utils_Tuple2('vopf', '\uD835\uDD67'),
			_Utils_Tuple2('vprop', '∝'),
			_Utils_Tuple2('vrtri', '⊳'),
			_Utils_Tuple2('Vscr', '\uD835\uDCB1'),
			_Utils_Tuple2('vscr', '\uD835\uDCCB'),
			_Utils_Tuple2('vsubnE', '⫋︀'),
			_Utils_Tuple2('vsubne', '⊊︀'),
			_Utils_Tuple2('vsupnE', '⫌︀'),
			_Utils_Tuple2('vsupne', '⊋︀'),
			_Utils_Tuple2('Vvdash', '⊪'),
			_Utils_Tuple2('vzigzag', '⦚'),
			_Utils_Tuple2('Wcirc', 'Ŵ'),
			_Utils_Tuple2('wcirc', 'ŵ'),
			_Utils_Tuple2('wedbar', '⩟'),
			_Utils_Tuple2('wedge', '∧'),
			_Utils_Tuple2('Wedge', '⋀'),
			_Utils_Tuple2('wedgeq', '≙'),
			_Utils_Tuple2('weierp', '℘'),
			_Utils_Tuple2('Wfr', '\uD835\uDD1A'),
			_Utils_Tuple2('wfr', '\uD835\uDD34'),
			_Utils_Tuple2('Wopf', '\uD835\uDD4E'),
			_Utils_Tuple2('wopf', '\uD835\uDD68'),
			_Utils_Tuple2('wp', '℘'),
			_Utils_Tuple2('wr', '≀'),
			_Utils_Tuple2('wreath', '≀'),
			_Utils_Tuple2('Wscr', '\uD835\uDCB2'),
			_Utils_Tuple2('wscr', '\uD835\uDCCC'),
			_Utils_Tuple2('xcap', '⋂'),
			_Utils_Tuple2('xcirc', '◯'),
			_Utils_Tuple2('xcup', '⋃'),
			_Utils_Tuple2('xdtri', '▽'),
			_Utils_Tuple2('Xfr', '\uD835\uDD1B'),
			_Utils_Tuple2('xfr', '\uD835\uDD35'),
			_Utils_Tuple2('xharr', '⟷'),
			_Utils_Tuple2('xhArr', '⟺'),
			_Utils_Tuple2('Xi', 'Ξ'),
			_Utils_Tuple2('xi', 'ξ'),
			_Utils_Tuple2('xlarr', '⟵'),
			_Utils_Tuple2('xlArr', '⟸'),
			_Utils_Tuple2('xmap', '⟼'),
			_Utils_Tuple2('xnis', '⋻'),
			_Utils_Tuple2('xodot', '⨀'),
			_Utils_Tuple2('Xopf', '\uD835\uDD4F'),
			_Utils_Tuple2('xopf', '\uD835\uDD69'),
			_Utils_Tuple2('xoplus', '⨁'),
			_Utils_Tuple2('xotime', '⨂'),
			_Utils_Tuple2('xrarr', '⟶'),
			_Utils_Tuple2('xrArr', '⟹'),
			_Utils_Tuple2('Xscr', '\uD835\uDCB3'),
			_Utils_Tuple2('xscr', '\uD835\uDCCD'),
			_Utils_Tuple2('xsqcup', '⨆'),
			_Utils_Tuple2('xuplus', '⨄'),
			_Utils_Tuple2('xutri', '△'),
			_Utils_Tuple2('xvee', '⋁'),
			_Utils_Tuple2('xwedge', '⋀'),
			_Utils_Tuple2('Yacute', 'Ý'),
			_Utils_Tuple2('yacute', 'ý'),
			_Utils_Tuple2('YAcy', 'Я'),
			_Utils_Tuple2('yacy', 'я'),
			_Utils_Tuple2('Ycirc', 'Ŷ'),
			_Utils_Tuple2('ycirc', 'ŷ'),
			_Utils_Tuple2('Ycy', 'Ы'),
			_Utils_Tuple2('ycy', 'ы'),
			_Utils_Tuple2('yen', '¥'),
			_Utils_Tuple2('Yfr', '\uD835\uDD1C'),
			_Utils_Tuple2('yfr', '\uD835\uDD36'),
			_Utils_Tuple2('YIcy', 'Ї'),
			_Utils_Tuple2('yicy', 'ї'),
			_Utils_Tuple2('Yopf', '\uD835\uDD50'),
			_Utils_Tuple2('yopf', '\uD835\uDD6A'),
			_Utils_Tuple2('Yscr', '\uD835\uDCB4'),
			_Utils_Tuple2('yscr', '\uD835\uDCCE'),
			_Utils_Tuple2('YUcy', 'Ю'),
			_Utils_Tuple2('yucy', 'ю'),
			_Utils_Tuple2('yuml', 'ÿ'),
			_Utils_Tuple2('Yuml', 'Ÿ'),
			_Utils_Tuple2('Zacute', 'Ź'),
			_Utils_Tuple2('zacute', 'ź'),
			_Utils_Tuple2('Zcaron', 'Ž'),
			_Utils_Tuple2('zcaron', 'ž'),
			_Utils_Tuple2('Zcy', 'З'),
			_Utils_Tuple2('zcy', 'з'),
			_Utils_Tuple2('Zdot', 'Ż'),
			_Utils_Tuple2('zdot', 'ż'),
			_Utils_Tuple2('zeetrf', 'ℨ'),
			_Utils_Tuple2('ZeroWidthSpace', '\u200B'),
			_Utils_Tuple2('Zeta', 'Ζ'),
			_Utils_Tuple2('zeta', 'ζ'),
			_Utils_Tuple2('zfr', '\uD835\uDD37'),
			_Utils_Tuple2('Zfr', 'ℨ'),
			_Utils_Tuple2('ZHcy', 'Ж'),
			_Utils_Tuple2('zhcy', 'ж'),
			_Utils_Tuple2('zigrarr', '⇝'),
			_Utils_Tuple2('zopf', '\uD835\uDD6B'),
			_Utils_Tuple2('Zopf', 'ℤ'),
			_Utils_Tuple2('Zscr', '\uD835\uDCB5'),
			_Utils_Tuple2('zscr', '\uD835\uDCCF'),
			_Utils_Tuple2('zwj', '\u200D'),
			_Utils_Tuple2('zwnj', '\u200C')
		]));
var $hecrj$html_parser$Html$Parser$namedCharacterReference = A2(
	$elm$parser$Parser$map,
	function (reference) {
		return A2(
			$elm$core$Maybe$withDefault,
			'&' + (reference + ';'),
			A2($elm$core$Dict$get, reference, $hecrj$html_parser$Html$Parser$NamedCharacterReferences$dict));
	},
	$elm$parser$Parser$getChompedString(
		$hecrj$html_parser$Html$Parser$chompOneOrMore($elm$core$Char$isAlpha)));
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Char$fromCode = _Char_fromCode;
var $elm$core$Basics$pow = _Basics_pow;
var $rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return $elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char.valueOf()) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2($elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return $elm$core$Result$Err(
							$elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $rtfeldman$elm_hex$Hex$fromString = function (str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2($elm$core$String$startsWith, '-', str)) {
				var list = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$tail(
						$elm$core$String$toList(str)));
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$negate,
					A3(
						$rtfeldman$elm_hex$Hex$fromStringHelp,
						$elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					$rtfeldman$elm_hex$Hex$fromStringHelp,
					$elm$core$String$length(str) - 1,
					$elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2($elm$core$Result$mapError, formatError, result);
	}
};
var $elm$core$Char$isHexDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return ((48 <= code) && (code <= 57)) || (((65 <= code) && (code <= 70)) || ((97 <= code) && (code <= 102)));
};
var $hecrj$html_parser$Html$Parser$hexadecimal = A2(
	$elm$parser$Parser$andThen,
	function (hex) {
		var _v0 = $rtfeldman$elm_hex$Hex$fromString(
			$elm$core$String$toLower(hex));
		if (_v0.$ === 'Ok') {
			var value = _v0.a;
			return $elm$parser$Parser$succeed(value);
		} else {
			var error = _v0.a;
			return $elm$parser$Parser$problem(error);
		}
	},
	$elm$parser$Parser$getChompedString(
		$hecrj$html_parser$Html$Parser$chompOneOrMore($elm$core$Char$isHexDigit)));
var $elm$parser$Parser$ExpectingInt = {$: 'ExpectingInt'};
var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var $elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {col: s.col + (newOffset - s.offset), context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src};
	});
var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var $elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3($elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2($elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var $elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3($elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			$elm$parser$Parser$Advanced$consumeExp,
			A2($elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2($elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var $elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _v0, s) {
		var endOffset = _v0.a;
		var n = _v0.b;
		if (handler.$ === 'Err') {
			var x = handler.a;
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.offset, startOffset) < 0,
				A2($elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2($elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var $elm$core$String$toFloat = _String_toFloat;
var $elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2($elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.src);
		if (floatOffset < 0) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A4($elm$parser$Parser$Advanced$fromInfo, s.row, s.col - (floatOffset + s.offset), invalid, s.context));
		} else {
			if (_Utils_eq(s.offset, floatOffset)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5($elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.offset, intPair, s);
				} else {
					if (floatSettings.$ === 'Err') {
						var x = floatSettings.a;
						return A2(
							$elm$parser$Parser$Advanced$Bad,
							true,
							A2($elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s.offset, floatOffset, s.src));
						if (_v1.$ === 'Nothing') {
							return A2(
								$elm$parser$Parser$Advanced$Bad,
								true,
								A2($elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _v1.a;
							return A3(
								$elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2($elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$number = function (c) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			if (A3($elm$parser$Parser$Advanced$isAsciiCode, 48, s.offset, s.src)) {
				var zeroOffset = s.offset + 1;
				var baseOffset = zeroOffset + 1;
				return A3($elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.hex,
					baseOffset,
					A2($elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.src),
					s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.octal,
					baseOffset,
					A3($elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.src),
					s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.binary,
					baseOffset,
					A3($elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.src),
					s) : A6(
					$elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					_Utils_Tuple2(zeroOffset, 0),
					s)));
			} else {
				return A6(
					$elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					A3($elm$parser$Parser$Advanced$consumeBase, 10, s.offset, s.src),
					s);
			}
		});
};
var $elm$parser$Parser$Advanced$int = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				binary: $elm$core$Result$Err(invalid),
				expecting: expecting,
				_float: $elm$core$Result$Err(invalid),
				hex: $elm$core$Result$Err(invalid),
				_int: $elm$core$Result$Ok($elm$core$Basics$identity),
				invalid: invalid,
				octal: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$int = A2($elm$parser$Parser$Advanced$int, $elm$parser$Parser$ExpectingInt, $elm$parser$Parser$ExpectingInt);
var $hecrj$html_parser$Html$Parser$numericCharacterReference = function () {
	var codepoint = $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$elm$parser$Parser$chompIf(
						function (c) {
							return _Utils_eq(
								c,
								_Utils_chr('x')) || _Utils_eq(
								c,
								_Utils_chr('X'));
						})),
				$hecrj$html_parser$Html$Parser$hexadecimal),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$elm$parser$Parser$chompWhile(
						$elm$core$Basics$eq(
							_Utils_chr('0')))),
				$elm$parser$Parser$int)
			]));
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$chompIf(
				$elm$core$Basics$eq(
					_Utils_chr('#')))),
		A2(
			$elm$parser$Parser$map,
			A2($elm$core$Basics$composeR, $elm$core$Char$fromCode, $elm$core$String$fromChar),
			codepoint));
}();
var $hecrj$html_parser$Html$Parser$characterReference = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$chompIf(
			$elm$core$Basics$eq(
				_Utils_chr('&')))),
	$elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$backtrackable($hecrj$html_parser$Html$Parser$namedCharacterReference),
				$hecrj$html_parser$Html$Parser$chompSemicolon),
				A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$backtrackable($hecrj$html_parser$Html$Parser$numericCharacterReference),
				$hecrj$html_parser$Html$Parser$chompSemicolon),
				$elm$parser$Parser$succeed('&')
			])));
var $hecrj$html_parser$Html$Parser$tagAttributeQuotedValue = function (quote) {
	var isQuotedValueChar = function (c) {
		return (!_Utils_eq(c, quote)) && (!_Utils_eq(
			c,
			_Utils_chr('&')));
	};
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$chompIf(
				$elm$core$Basics$eq(quote))),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$map,
				$elm$core$String$join(''),
				$hecrj$html_parser$Html$Parser$many(
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								$elm$parser$Parser$getChompedString(
								$hecrj$html_parser$Html$Parser$chompOneOrMore(isQuotedValueChar)),
								$hecrj$html_parser$Html$Parser$characterReference
							])))),
			$elm$parser$Parser$chompIf(
				$elm$core$Basics$eq(quote))));
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $hecrj$html_parser$Html$Parser$oneOrMore = F2(
	function (type_, parser_) {
		return A2(
			$elm$parser$Parser$loop,
			_List_Nil,
			function (list) {
				return $elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							$elm$parser$Parser$map,
							function (_new) {
								return $elm$parser$Parser$Loop(
									A2($elm$core$List$cons, _new, list));
							},
							parser_),
							$elm$core$List$isEmpty(list) ? $elm$parser$Parser$problem('expecting at least one ' + type_) : $elm$parser$Parser$succeed(
							$elm$parser$Parser$Done(
								$elm$core$List$reverse(list)))
						]));
			});
	});
var $hecrj$html_parser$Html$Parser$tagAttributeUnquotedValue = function () {
	var isUnquotedValueChar = function (c) {
		return (!$hecrj$html_parser$Html$Parser$isSpaceCharacter(c)) && ((!_Utils_eq(
			c,
			_Utils_chr('\"'))) && ((!_Utils_eq(
			c,
			_Utils_chr('\''))) && ((!_Utils_eq(
			c,
			_Utils_chr('='))) && ((!_Utils_eq(
			c,
			_Utils_chr('<'))) && ((!_Utils_eq(
			c,
			_Utils_chr('>'))) && ((!_Utils_eq(
			c,
			_Utils_chr('`'))) && (!_Utils_eq(
			c,
			_Utils_chr('&')))))))));
	};
	return A2(
		$elm$parser$Parser$map,
		$elm$core$String$join(''),
		A2(
			$hecrj$html_parser$Html$Parser$oneOrMore,
			'attribute value',
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$elm$parser$Parser$getChompedString(
						$hecrj$html_parser$Html$Parser$chompOneOrMore(isUnquotedValueChar)),
						$hecrj$html_parser$Html$Parser$characterReference
					]))));
}();
var $hecrj$html_parser$Html$Parser$tagAttributeValue = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq(
							_Utils_chr('=')))),
				$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter)),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$hecrj$html_parser$Html$Parser$tagAttributeUnquotedValue,
						$hecrj$html_parser$Html$Parser$tagAttributeQuotedValue(
						_Utils_chr('\"')),
						$hecrj$html_parser$Html$Parser$tagAttributeQuotedValue(
						_Utils_chr('\''))
					]))),
			$elm$parser$Parser$succeed('')
		]));
var $hecrj$html_parser$Html$Parser$tagAttribute = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($elm$core$Tuple$pair),
		A2(
			$elm$parser$Parser$ignorer,
			$hecrj$html_parser$Html$Parser$tagAttributeName,
			$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter))),
	A2(
		$elm$parser$Parser$ignorer,
		$hecrj$html_parser$Html$Parser$tagAttributeValue,
		$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter)));
var $hecrj$html_parser$Html$Parser$tagAttributes = $hecrj$html_parser$Html$Parser$many($hecrj$html_parser$Html$Parser$tagAttribute);
var $hecrj$html_parser$Html$Parser$tagName = A2(
	$elm$parser$Parser$map,
	$elm$core$String$toLower,
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$chompIf($elm$core$Char$isAlphaNum),
			$elm$parser$Parser$chompWhile(
				function (c) {
					return $elm$core$Char$isAlphaNum(c) || _Utils_eq(
						c,
						_Utils_chr('-'));
				}))));
var $hecrj$html_parser$Html$Parser$text = A2(
	$elm$parser$Parser$map,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$String$join(''),
		$hecrj$html_parser$Html$Parser$Text),
	A2(
		$hecrj$html_parser$Html$Parser$oneOrMore,
		'text element',
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$elm$parser$Parser$getChompedString(
					$hecrj$html_parser$Html$Parser$chompOneOrMore(
						function (c) {
							return (!_Utils_eq(
								c,
								_Utils_chr('<'))) && (!_Utils_eq(
								c,
								_Utils_chr('&')));
						})),
					$hecrj$html_parser$Html$Parser$characterReference
				]))));
function $hecrj$html_parser$Html$Parser$cyclic$node() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$hecrj$html_parser$Html$Parser$text,
				$hecrj$html_parser$Html$Parser$comment,
				$hecrj$html_parser$Html$Parser$cyclic$element()
			]));
}
function $hecrj$html_parser$Html$Parser$cyclic$element() {
	return A2(
		$elm$parser$Parser$andThen,
		function (_v0) {
			var name = _v0.a;
			var attributes = _v0.b;
			return $hecrj$html_parser$Html$Parser$isVoidElement(name) ? A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A3($hecrj$html_parser$Html$Parser$Element, name, attributes, _List_Nil)),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								$elm$parser$Parser$chompIf(
								$elm$core$Basics$eq(
									_Utils_chr('/'))),
								$elm$parser$Parser$succeed(_Utils_Tuple0)
							]))),
				$elm$parser$Parser$chompIf(
					$elm$core$Basics$eq(
						_Utils_chr('>')))) : A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A2($hecrj$html_parser$Html$Parser$Element, name, attributes)),
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq(
							_Utils_chr('>')))),
				A2(
					$elm$parser$Parser$ignorer,
					$hecrj$html_parser$Html$Parser$many(
						$elm$parser$Parser$backtrackable(
							$hecrj$html_parser$Html$Parser$cyclic$node())),
					$hecrj$html_parser$Html$Parser$closingTag(name)));
		},
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Tuple$pair),
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq(
							_Utils_chr('<')))),
				A2(
					$elm$parser$Parser$ignorer,
					$hecrj$html_parser$Html$Parser$tagName,
					$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter))),
			$hecrj$html_parser$Html$Parser$tagAttributes));
}
try {
	var $hecrj$html_parser$Html$Parser$node = $hecrj$html_parser$Html$Parser$cyclic$node();
	$hecrj$html_parser$Html$Parser$cyclic$node = function () {
		return $hecrj$html_parser$Html$Parser$node;
	};
	var $hecrj$html_parser$Html$Parser$element = $hecrj$html_parser$Html$Parser$cyclic$element();
	$hecrj$html_parser$Html$Parser$cyclic$element = function () {
		return $hecrj$html_parser$Html$Parser$element;
	};
} catch ($) {
	throw 'Some top-level definitions from `Html.Parser` are causing infinite recursion:\n\n  ┌─────┐\n  │    node\n  │     ↓\n  │    element\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $hecrj$html_parser$Html$Parser$run = function (str) {
	return $elm$core$String$isEmpty(str) ? $elm$core$Result$Ok(_List_Nil) : A2(
		$elm$parser$Parser$run,
		A2($hecrj$html_parser$Html$Parser$oneOrMore, 'node', $hecrj$html_parser$Html$Parser$node),
		str);
};
var $author$project$PageFetch$content = function (_v0) {
	var res = _v0.a;
	if (res.$ === 'Ok') {
		var page = res.a;
		var desc = $author$project$PageFetch$extractShortDesc(page.html);
		return $elm$core$Result$Ok(
			function () {
				var _v2 = $hecrj$html_parser$Html$Parser$run(page.html);
				if ((_v2.$ === 'Ok') && _v2.a.b) {
					var _v3 = _v2.a;
					var node = _v3.a;
					return {
						content: node,
						desc: desc,
						image: $author$project$PageFetch$grabImg(node),
						title: page.title
					};
				} else {
					return {
						content: A3(
							$hecrj$html_parser$Html$Parser$Element,
							'div',
							_List_Nil,
							_List_fromArray(
								[
									$hecrj$html_parser$Html$Parser$Text('This page is malformed and can\'t be displayed, but here are the links from it (use Ctrl+f)'),
									$author$project$PageFetch$createBackUpLinkList(page.html)
								])),
						desc: desc,
						image: $elm$core$Maybe$Nothing,
						title: page.title
					};
				}
			}());
	} else {
		var error = res.a;
		return $elm$core$Result$Err(error);
	}
};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $author$project$PageFetch$FetchResult = function (a) {
	return {$: 'FetchResult', a: a};
};
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $elm$http$Http$get = function (r) {
	return $elm$http$Http$request(
		{body: $elm$http$Http$emptyBody, expect: r.expect, headers: _List_Nil, method: 'GET', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $author$project$PageFetch$PageHtml = F2(
	function (title, html) {
		return {html: html, title: title};
	});
var $author$project$PageFetch$pageDecoder = A2(
	$elm$json$Json$Decode$field,
	'parse',
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$PageFetch$PageHtml,
		A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$field,
			'text',
			A2($elm$json$Json$Decode$field, '*', $elm$json$Json$Decode$string))));
var $author$project$PageFetch$requestPage = function (title) {
	var fixedTitle = A3(
		$elm$core$String$replace,
		'+',
		'%2B',
		A3($elm$core$String$replace, '&', '%26', title));
	return $elm$http$Http$get(
		{
			expect: A2($elm$http$Http$expectJson, $author$project$PageFetch$FetchResult, $author$project$PageFetch$pageDecoder),
			url: 'https://en.wikipedia.org/w/api.php?action=parse&prop=text&redirects=true&format=json&origin=*&page=' + fixedTitle
		});
};
var $author$project$PageFetch$getPage = function (title) {
	return A2(
		$elm$core$Platform$Cmd$map,
		$author$project$PageFetch$content,
		$author$project$PageFetch$requestPage(title));
};
var $author$project$Main$getDescription = function (title) {
	return A2(
		$elm$core$Platform$Cmd$map,
		$author$project$Model$GotDescription(title),
		$author$project$PageFetch$getPage(title));
};
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $author$project$Articles$titles = $elm$core$Array$fromList(
	_List_fromArray(
		['Yao_Ming', 'Anything_Goes', 'Kurt_Gödel', 'Battlestar_Galactica_(2004_TV_series)', 'Mason–Dixon_line', 'Republican_Party_(United_States)', 'Macedonia_(ancient_kingdom)', 'Hermann_Fegelein', 'Salome', 'List_of_best-selling_video_games', 'South_African_rand', 'Palliative_care', 'Book_of_Genesis', 'Lea_Michele', 'Unforgiven', 'Blackbeard', 'Wall_Street_Crash_of_1929', 'American_imperialism', 'Subramania_Bharati', 'Grammy_Award', 'Odin', 'Amsterdam', 'Age_of_Discovery', 'List_of_best-selling_books', 'House_of_Tudor', 'National_Assembly_of_Pakistan', 'Seneca_the_Younger', 'Great_Fire_of_London', 'Honky-tonk', 'Blind_men_and_an_elephant', 'Oceanus', 'Electronics', 'Vasily_Stalin', 'Yazidism', 'Daniel_(biblical_figure)', 'Birthstone', 'Nirvana_(band)', 'Sita', 'Vrindavan', 'Vegetarianism_by_country', 'Coma', 'Campania', 'Simone_de_Beauvoir', 'Quito', 'Catfish', 'Abraham', 'Electric_battery', 'Benedict_of_Nursia', 'Isle_of_Man', '2014_FIFA_World_Cup', 'Mesoamerica', 'Skyfall', 'Middle_East', 'John_Ruskin', 'Eva_Braun', 'Motion_of_no_confidence', 'Two-nation_theory', 'Tudor_period', 'Afrikaans', 'Judas_Iscariot', 'Cyrillic_script', 'World_Heritage_Site', 'Grace_Kelly', 'MacGuffin', 'Sean_Bean', 'Foo_Fighters', 'Rajkummar_Rao', 'OPEC', 'Diwali', 'Philip_Glass', 'Gregorian_calendar', 'M3_Stuart', 'Architecture', 'Ghusl', 'Grand_Trunk_Road', 'Anarcho-capitalism', 'Partition_of_Bengal_(1905)', '1868_United_States_presidential_election', 'Civilization_(series)', 'Eratosthenes', 'Greek_numerals', 'Sienna_Miller', 'Bollywood', 'Irritable_bowel_syndrome', 'Back_to_the_Future', 'Chartres_Cathedral', 'Alexander_the_Great', 'Brian_Sicknick', 'Football', 'People_Power_Revolution', 'Ellie_Kemper', 'Death_of_Benito_Mussolini', 'Green_Book_(film)', 'Intelligence_quotient', 'Michel_Ney', 'Christian_apologetics', 'Inferno_(Brown_novel)', 'Engineering', 'Frank_Ocean', 'Hotstar', 'Juan_Ponce_de_León', 'Jesus_(name)', 'Monster_Energy', 'Republic_of_Florence', 'Third_Battle_of_Panipat', 'Averroes', 'Robert_Burns', 'The_Strokes', 'Gonorrhea', 'Virus', 'Gujarati_people', 'Suffrage', 'Hokkien', 'Electricity', 'Blitzkrieg', 'Thirty_Years\'_War', 'Roman_province', 'Abdullah_of_Pahang', 'Rudolf_Höss', 'Fullmetal_Alchemist_(TV_series)', 'Surat', 'Francisco_Goya', 'Akshay_Kumar', 'Lapulapu', 'Mehmed_V', 'Sea_turtle', 'Unsimulated_sex', 'Caganer', 'Pied-Noir', 'Rottweiler', 'Bedouin', 'Nebula', '1973_oil_crisis', 'Severus_Alexander', 'Elizabeth_Taylor', 'Exchange_rate', 'Ainu_people', 'Charleston,_South_Carolina', 'Peter_Gabriel', 'Alexander_Hamilton', 'Liberation_theology', 'Pranab_Mukherjee', 'Darwinism', 'Statistics', 'S&P_500', 'Toyota', 'Monica_Lewinsky', 'P._V._Sindhu', 'Impact_of_the_COVID-19_pandemic_on_education', 'Mad_Max', 'Potsdam', 'University', 'Haiti', 'Peter_O\'Toole', 'Anthony_Eden', 'Nina_Simone', 'List_of_longest-reigning_monarchs', 'Zachary_Levi', 'Myth', 'Portuguese_Empire', 'Ramayana', 'Anastas_Mikoyan', 'Ancient_Celtic_religion', 'Theosophy', 'Sonic_the_Hedgehog_(film)', 'East_Africa', 'Das_Kapital', 'Stefan_Zweig', 'Cloud', 'Edward_VIII', 'Quebec_City', 'Seinfeld', 'Kingdom_of_Israel_(united_monarchy)', 'Apotheosis', 'Francis_I,_Holy_Roman_Emperor', 'Meningioma', 'First_Punic_War', 'Henry_Kissinger', 'Christopher_Nolan', 'Meryl_Streep', 'Willem_Dafoe', 'George_Orwell', 'Jean-Claude_Van_Damme', 'Ken_Jeong', 'Canary_Islands', 'Jeff_Goldblum', 'Michael_Richards', 'Wikipedia', 'Vagina', 'Trajan', 'Varna_(Hinduism)', 'Foot_binding', 'Mangal_Pandey', 'Lizzy_Caplan', 'Nikolai_Bulganin', 'Crimean_War', 'Ibn_Taymiyyah', 'Gender_pay_gap', '2021_Myanmar_protests', 'Yanis_Varoufakis', 'Narmer', 'Saw_(franchise)', 'Jyotirao_Phule', 'Clement_Attlee', 'Krakatoa', 'Saint_Lucy', 'Bo_Burnham', 'JPEG', 'Anglo-Mysore_Wars', 'The_Stormlight_Archive', 'East_India_Company', 'Charles_Barkley', 'Stroke', 'Florence_Nightingale', 'Teresa_of_Ávila', 'Poetry', 'Philip_IV_of_France', 'Golden_Globe_Awards', 'Walmart', 'Royal_Society', 'Realism_(arts)', 'Kingdom_of_Great_Britain', 'Bryce_Dallas_Howard', 'Neuroscience', 'Maximilian_Schell', 'Samson', 'Amphibia_(TV_series)', 'Methodism', 'Joanna_Elisabeth_of_Holstein-Gottorp', 'Money', 'Mahmud_II', 'Terence_Stamp', 'Kaliningrad', 'Babylonian_captivity', 'Water_buffalo', 'Portuguese_Colonial_War', 'Northern_Mariana_Islands', 'Rowlatt_Act', 'Kalash_people', 'Westminster_Abbey', 'Feudalism', 'Supernatural_(American_TV_series)', 'Megalodon', 'Athens', 'Western_Front_(World_War_I)', 'Padua', 'Arthur_Seyss-Inquart', 'American_Psycho_(film)', 'Scotch-Irish_Americans', 'Snell\'s_law', 'Beyond_Good_and_Evil', 'Oxford', 'William_Stuart-Houston', 'Battle_of_Crete', 'List_of_presidents_of_the_United_States', 'Jeremy_Lin', 'Meditation', 'Mohammed_bin_Rashid_Al_Maktoum', 'Naruhito', 'Pahlavi_dynasty', 'Archangel', 'History_of_France', 'Jorge_Luis_Borges', 'Catherine,_Duchess_of_Cambridge', 'Hermitage_Museum', 'Hunting', 'Migraine', 'Empire_of_Japan', 'Greek_alphabet', 'Ted_Bundy', 'The_Last_Kingdom_(TV_series)', 'Harry_Reid', 'Chera_dynasty', 'Western_philosophy', 'Tax', 'Rahul_Gandhi', 'Sigmund_Freud', 'Chinese_Communist_Revolution', 'Dynasties_in_Chinese_history', 'Ruby_Ridge', 'The_Blair_Witch_Project', 'Boeing_787_Dreamliner', 'Sweating_sickness', '123Movies', 'Rome_(TV_series)', 'Pisa', 'South_African_Border_War', 'South_Park', 'Thomas_Carlyle', 'French_Revolution', 'Wright_brothers', 'Freedom_of_speech', 'Aurelian', 'Bermuda_Triangle', 'Fellow_of_the_Royal_Society', 'Modern_display_of_the_Confederate_battle_flag', 'A_priori_and_a_posteriori', 'Gemma_Chan', 'Chemistry', 'Tbilisi', 'Carlisle', 'Caste_system_in_India', 'Drake_(musician)', 'Grenada', 'The_Prince', 'The_Golden_Girls', 'Ottoman_Empire', 'Weihnachten', 'Logan_Lerman', 'Mechanical_engineering', 'List_of_ATP_number_1_ranked_singles_tennis_players', 'Solipsism', 'Miami_University', 'Edward_III_of_England', 'House_of_Bourbon', 'Lord\'s_Prayer', 'Vanuatu', 'Eucharist', 'Gustav_III', 'Osman_II', 'Frantz_Fanon', 'Norah_Jones', 'State_of_the_Union', 'Sugar', 'Solange_Knowles', 'Patagonia', 'Psychiatric_hospital', 'Telecommunications', 'Sofia', 'Anunnaki', 'Strong_interaction', 'Ming-Na_Wen', 'New_Hampshire', 'Physician', 'Steve_Buscemi', 'Spirit_possession', 'Avalokiteśvara', 'Women_in_Islam', 'Greek_Civil_War', '1996_United_States_presidential_election', 'Haredi_Judaism', 'Crucifixion_of_Jesus', 'Tridentine_Mass', 'Desmond_Tutu', 'Elagabalus', 'Cardi_B', 'The_Hague', 'Alcubierre_drive', 'Atom', 'Gospel_of_Thomas', 'University_of_St_Andrews', 'Banknote', 'Christianity_and_Judaism', 'Fyre_Festival', 'Leonard_Nimoy', 'Library_Genesis', 'Strawberry', 'Bridget_Fonda', 'Ustaše', 'Farrukhsiyar', 'Gangs_of_New_York', 'Women\'s_empowerment', 'Rudyard_Kipling', 'Folklore', 'United_Nations_Framework_Convention_on_Climate_Change', 'Arquebus', 'Colonial_history_of_the_United_States', 'Battle_of_Alesia', 'Gore_Vidal', 'Guy_de_Maupassant', 'Bihar', 'Riz_Ahmed', 'Salah', 'Joseph_Smith', 'Danish_language', '2004_United_States_presidential_election', 'Jennifer_Lopez', 'Phoenix_(mythology)', 'British_royal_family', 'Chemical_reaction', 'Last_rites', 'MacOS', 'French_horn', 'Second_lieutenant', 'Nutrition', 'Kurt_von_Schleicher', 'Murad_II', 'Lionel_Richie', 'Natural_science', 'Mumford_&_Sons', 'History_of_Iran', 'Goa', 'Animation', 'Lady-in-waiting', 'Peter_Fonda', 'Patronymic', 'Pythagoras', 'Vladimir_Lenin', 'Basque_language', 'Chandra_Shekhar_Azad', 'Cognition', 'Judd_Apatow', 'Ronaldinho', 'Eurasia', 'Miguel_Ángel_Félix_Gallardo', 'Robert_Harris_(novelist)', 'David_Lynch', 'Albus_Dumbledore', 'Linear_B', 'Whigs_(British_political_party)', 'Lord_Voldemort', 'Notre-Dame_de_Paris', 'Cybele', 'Vita_Sackville-West', 'Organism', 'Liza_Minnelli', 'Nobility', 'Autonomy', 'Battle_of_Fort_Sumter', 'RNA_vaccine', 'Great_power', 'The_Lord_of_the_Rings', 'Afterlife', 'Catholic_Bible', 'Friction', 'Henry_Stuart,_Lord_Darnley', 'Mel_Blanc', 'Christmas_dinner', 'Hittites', 'Political_party', 'Neuron', 'Quit_India_Movement', 'United_States_Marine_Corps', 'Great_Lakes', 'Nathan_Bedford_Forrest', 'Billy_Joel', 'Sword', 'Battle_of_the_Trench', 'Botany', 'Eddie_Izzard', 'Worm', 'Saif_Ali_Khan', 'Thracians', 'Subhas_Chandra_Bose', 'Warsaw_Ghetto_Uprising', 'Courier', 'Knight', 'Fief', 'Parks_and_Recreation', 'Idris_(prophet)', 'Metabolism', 'Ludwig_von_Mises', 'Operation_Weserübung', 'All-Russia_State_Television_and_Radio_Broadcasting_Company', 'Social_constructionism', 'Richard_E._Byrd', 'Idealism', 'Pink_Floyd', 'Harthacnut', 'Émile_Durkheim', 'The_dress', 'Reason', 'Federated_States_of_Micronesia', 'Secularism', 'My_Hero_Academia', 'Lady_Margaret_Beaufort', 'Neurasthenia', 'College_of_William_&_Mary', 'Persian_language', 'Sarvepalli_Radhakrishnan', 'Jakarta', 'Bahadur_Shah_I', 'Brooklyn_Nine-Nine', 'The_Spectator', 'Jet_engine', 'Piri_Reis_map', 'Borscht', 'Cf.', 'Ferdinand_II_of_Aragon', 'Hyksos', 'Satanism', 'Irreligion', 'Aristophanes', 'Sharon_Osbourne', 'Heart_(band)', 'Gutenberg_Bible', 'Corinth', 'Algerian_War', 'Stockholm', 'Aleppo', 'Mötley_Crüe', 'Hadrian', 'Apocalypse', 'Epic_Games', 'Smallpox', 'Old_Kingdom_of_Egypt', 'Rob_Zombie', 'Yule', 'Billie_Holiday', 'Frank_Langella', 'Maccabees', 'Dodecahedron', 'Iraq', 'Asperger_syndrome', 'Grease_(film)', 'Matthew_Broderick', 'New_Deal', 'Pragmatics', 'Ancient_Egypt', 'Hamilton_(2020_film)', 'Chris_McCandless', 'John_Dryden', 'William_Marshal,_1st_Earl_of_Pembroke', 'Valhalla', 'Louvre', 'Scientific_racism', 'Meghan,_Duchess_of_Sussex', 'AstraZeneca', 'Holy_Spirit_in_Christianity', 'Antioch', 'Ontology', 'Shaivism', 'Emily_Blunt', 'Sword_Art_Online', 'Generation', 'Clothing', 'Haitian_Vodou', 'Arithmetic', 'Die_Hard', 'Sekhmet', 'Emperor_of_Japan', 'Mysticism', 'Atlanta', 'Formaldehyde', 'Doris_Day', 'Archaea', 'Warner_Bros.', 'Sparta', 'Man', 'Famke_Janssen', 'Great_Wall_of_China', 'Armenian_genocide', 'Nickelodeon', 'Anatomy', 'Kanye_West', 'Operation_Paperclip', 'Member_states_of_the_Commonwealth_of_Nations', 'Zohar', 'Scimitar', 'Cairo', 'Bill_Clinton', 'Apostles_in_the_New_Testament', 'Federation', 'Stone_Age', 'Prince_George_of_Cambridge', 'Boys_Don\'t_Cry_(1999_film)', 'Woman', 'The_Silence_of_the_Lambs_(film)', 'Rosalind_Franklin', 'Connecticut', 'Battle_of_Trenton', 'William_Joyce', 'Little_Women', 'Central_Asia', 'Call_Me_by_Your_Name_(film)', 'Kali', 'Sphinx', 'Gingerbread', 'Christmas_in_Sweden', 'Logarithm', 'Star_Wars:_Episode_I_–_The_Phantom_Menace', 'Chaldea', 'Jews', 'Fraction', 'Khalsa', 'Bill_Cosby', 'People\'s_Liberation_Army_Navy', 'Lance_Armstrong', 'Last_Judgment', 'Camille_Paglia', 'Neville_Chamberlain', 'Avicenna', 'Nag_Hammadi_library', 'Alfred_Hitchcock', 'M16_rifle', 'Yoko_Ono', 'Hillbilly', 'Graham_Chapman', 'Krasnoyarsk', 'Mel_Gibson', 'Balochistan', 'Jude_Law', 'Moses_in_Islam', 'The_Wachowskis', '1792_United_States_presidential_election', '1876_United_States_presidential_election', 'Mars_2020', 'Y_chromosome', 'Banana', 'Fear', 'Potsdam_Conference', 'Booker_T._Washington', 'Windsor_Castle', 'Republic_of_China_Armed_Forces', 'Giuseppe_Garibaldi', 'Swaminarayan', 'Deutschlandlied', 'Theseus', 'Muhammad_Shah', 'Elizabeth_Báthory', 'Chris_Hemsworth', 'Cars_(film)', 'Andes', 'Poland', 'Roman_Empire', 'Jordan_Peterson', 'Project_MKUltra', 'Apartheid', 'Bigfoot', 'Vancouver_Island', 'South_Africa_national_rugby_union_team', 'Iron_Man_(2008_film)', 'PepsiCo', 'Saina_Nehwal', 'Compromise_of_1850', 'Statue_of_Unity', '1905_Russian_Revolution', 'Alec_Guinness', 'Madonna', 'Monica_Rambeau', 'Realism_(international_relations)', 'Circe_(novel)', 'Bill_&_Ted\'s_Excellent_Adventure', 'French_Navy', 'Ernest_Shackleton', 'Suez_Crisis', 'Sunni_Islam', 'Nature', 'Assassin\'s_Creed:_Brotherhood', 'Charles_Baudelaire', 'Médecins_Sans_Frontières', 'Lisa_Kudrow', 'Howl\'s_Moving_Castle_(film)', 'Birbal', 'Ella_Fitzgerald', 'Enabling_Act_of_1933', 'List_of_WWE_personnel', 'Evangelicalism', 'War_in_Donbas', 'Bangkok', 'Rudolf_Hess', 'Ecology', 'Antidepressant', 'National_anthem', 'Nāga', 'John_Hancock', 'Shakespeare\'s_plays', 'John_Tyler', 'Antoine_Lavoisier', 'Mycenae', 'Gabby_Douglas', 'Sicily', 'Douglas_Adams', 'University_of_London', 'James_Clerk_Maxwell', 'Steven_Gerrard', 'Agra', 'Maximilian_Kolbe', 'Marie_Curie', 'Evan_Peters', 'Gorr_the_God_Butcher', 'Inquisition', 'Regent', 'OnlyFans', 'Marcel_Proust', 'Ivory', 'Delhi_Sultanate', 'Laotian_Civil_War', 'Al_Gore', 'Wind_power', 'Allan_Pinkerton', 'Greensleeves', 'Social_Democratic_Party_of_Finland', 'Borderline_personality_disorder', 'Mohammed_bin_Salman', 'Raynaud_syndrome', 'Granite', 'Sadistic_personality_disorder', 'Abiy_Ahmed', 'MP3', 'Zulu_people', 'Hui_people', 'Gog_and_Magog', 'Materialism', 'Purple_Heart', 'Liev_Schreiber', 'Operating_system', 'Voyages_of_Christopher_Columbus', 'Reaganomics', 'Communist_Party_of_the_Russian_Federation', 'Long_March', 'Leo_Tolstoy', 'Trotskyism', 'Third_circle_of_hell', 'Kehlsteinhaus', 'Hassanal_Bolkiah', 'Library_of_Congress', 'Chronology_of_Jesus', 'Jean-Michel_Basquiat', 'Thuringia', 'India_national_cricket_team', 'Gospel_of_Judas', 'Deontology', 'Rick_Astley', 'Georgism', 'Sioux', 'Kerala', 'Wole_Soyinka', 'Steam_(service)', 'Society_of_Jesus', 'Topology', 'John_von_Neumann', 'Siege_of_Jerusalem_(70_CE)', 'Kim_Basinger', 'Comedy_film', 'Sochi', 'Alexandria_Ocasio-Cortez', 'Joji_(film)', 'The_Grand_Budapest_Hotel', 'Davido', 'Greater_Khorasan', 'Coal', 'Race_and_appearance_of_Jesus', 'Bernie_Sanders', 'Ngozi_Okonjo-Iweala', 'Aaron_Sorkin', 'Tutankhamun', 'Plate_tectonics', 'La_Marseillaise', 'List_of_states_and_territories_of_the_United_States', 'Narendra_Modi', 'Erikson\'s_stages_of_psychosocial_development', 'Patriotism', 'Hagia_Sophia', 'Achilles_and_Patroclus', 'Montserrat', 'Post-structuralism', 'Martinique', 'David_(Michelangelo)', 'List_of_leaders_of_the_Soviet_Union', 'Nazi_concentration_camps', 'Battle_of_the_Wilderness', 'Kim_Il-sung', 'Gluttony', 'Amish', 'Type_A_and_Type_B_personality_theory', 'Plato', 'You_(Time_Person_of_the_Year)', 'First_Congo_War', 'Chancellor_of_Germany', 'A_Song_of_Ice_and_Fire', 'Moldavite', 'Soho', 'Cossacks', 'Jim_Crow_laws', 'Charles_Manson', 'Affirmative_action', 'Bob_Denver', 'Kingdom_of_Portugal', 'Coach_Carter', 'Calvin_Lockhart', 'Henry_Cavill', 'Bamboo', 'Alan_Rickman', 'James_Stewart', 'Louis_Philippe_I', 'Lists_of_deaths_by_year', 'Lucius_Quinctius_Cincinnatus', 'State_capitalism', 'Ante_Pavelić', 'List_of_most_expensive_films', 'Zen', 'Merovingian_dynasty', 'Printing', 'Omar_Khayyam', 'Kamala_Harris', 'Tracheotomy', 'Robinson_Crusoe', 'Greta_Scacchi', 'The_Matrix_Reloaded', 'Illyrians', 'History_of_China', 'Fingering_(sexual_act)', 'Thomas_E._Dewey', 'Yahoo!', '30_for_30', 'Elton_John', 'Catherine_of_Aragon', 'Dobermann', 'Walden', 'Alexander_Graham_Bell', 'Philip_II_of_France', 'Bordeaux', 'Somaliland', 'N._T._Rama_Rao', 'Leninism', 'Mutilation', 'Jordan', 'Nikola_Vučević', 'Gabon', 'Sweet_Dew_incident', 'Malcolm_McDowell', 'Pavlova_(cake)', 'Space_Shuttle_Challenger_disaster', 'God_is_dead', 'Hundred_Years\'_War', 'Bruce_Lee', 'Abul_Kalam_Azad', 'International_Monetary_Fund', 'Manute_Bol', 'Jean_Baudrillard', 'Sinéad_O\'Connor', 'Seine', 'Cardiovascular_disease', 'Anton_Drexler', 'Parthian_Empire', 'Harun_al-Rashid', 'Clovis_I', 'David_Starkey', 'Lake_Victoria', 'Marvel_Cinematic_Universe', 'Grace_and_Frankie', 'Graham_Norton', 'National_Party_(South_Africa)', 'Melania_Trump', 'March_9', 'Justin_Trudeau', 'Gordon_B._Hinckley', 'Sri_Lanka', 'Kamala_Khan', 'Russian_Provisional_Government', 'Non-cooperation_movement', 'Holy_Spirit', 'Tetrahedron', 'Chengdu', 'Scientific_Revolution', 'Norwegian_language', 'Katyn_massacre', 'Suicide_methods', 'Great_Leap_Forward', 'Michael_Parenti', 'Horatio_Nelson,_1st_Viscount_Nelson', 'Sher_Shah_Suri', 'California', 'Polity', 'Agra_Fort', 'Spherical_Earth', 'Hammurabi', 'Dragon_Ball', 'Lentil', 'Stromboli', 'Band_of_Brothers_(miniseries)', 'Working_class', 'Don_Cheadle', 'Lincoln_Highway', 'Egyptian_language', 'Scottish_Premier_League', 'Jewellery', 'Spider-Man', 'Edward_Baker_Lincoln', 'Jay-Jay_Okocha', 'Occupation_of_Japan', 'Sabbath', 'Ashoka', 'Zulfikar_Ali_Bhutto', 'Third_Temple', 'Richard_Feynman', 'South_Yemen', 'Andrew_Garfield', 'Bond_(finance)', 'Anubis', 'Real_number', 'Hasan_ibn_Ali', 'Western_Christianity', 'Steve_Biko', 'The_Big_Short_(film)', 'Ben_Affleck', 'Andrew_Johnson', 'Nicki_Minaj', 'Chaldean_Catholic_Church', 'Pablo_Escobar', 'Spanish_Netherlands', 'Stupa', 'Matt_Dillon', 'United_States_Department_of_Defense', 'Ovid', 'Nicholas_II_of_Russia', 'North_Vietnam', 'Chronostasis', 'Warren_G._Harding', 'List_of_most-played_video_games_by_player_count', 'Abraham_Lincoln', 'Discord_(software)', 'Paul_Anka', 'The_Hindu', 'Nehru–Gandhi_family', 'Good_Friday', 'Millard_Fillmore', 'Grand_Slam_(tennis)', 'The_Greatest_Showman', 'Samuel_L._Jackson', 'Yamaha_Corporation', 'Janet_Jackson', 'Christmas_cake', 'List_of_religions_and_spiritual_traditions', 'Eighteenth_Dynasty_of_Egypt', 'List_of_countries_by_Human_Development_Index', 'Ken_Jennings', 'Neptune', 'National_Football_League', 'Christina_Hendricks', 'James_Taylor', 'Alan_Alda', 'Coca-Cola', 'Battle_of_Agincourt', 'Mediterranean_Sea', 'Love', 'Cognitive_psychology', 'Tim_Roth', 'Paul_von_Hindenburg', 'Peritonsillar_abscess', 'Pierre-Simon_Laplace', 'Microsoft_Word', 'Aleksandr_Solzhenitsyn', 'Catalytic_converter', 'Diphthong', 'En_passant', 'Separation_of_powers', 'Robotics', 'Creedence_Clearwater_Revival', 'Rhine', 'The_Matrix_(franchise)', 'Shakespeare\'s_sonnets', 'Philosopher\'s_stone', 'Neo-Nazism', 'Anjelica_Huston', 'Sheikh_Mujibur_Rahman', 'Václav_Havel', 'Cobie_Smulders', 'Cook_Islands', 'Rembrandt', 'Strade_Bianche', 'Bertrand_Russell', 'Ruhollah_Khomeini', 'Rashtriya_Swayamsevak_Sangh', 'Gas_chamber', 'Tartary', 'Et_tu,_Brute?', 'Hannah_Arendt', 'Juno_(mythology)', 'Mortality_rate', 'Lieutenant_general_(United_States)', 'Auguste_Comte', 'Philippines', 'Carol_Burnett', 'Siddhartha_(novel)', 'Adult', '2020–21_Premier_League', 'Suicide_Squad_(film)', 'Heinrich_Müller_(Gestapo)', 'Las_Posadas', '2012_United_States_presidential_election', 'Modern_Greek', 'Bachelor\'s_degree', 'Carl_XVI_Gustaf', 'Kylian_Mbappé', 'Whiskey_Rebellion', 'Takbir', 'Jack_of_all_trades,_master_of_none', 'Wikimedia_Foundation', 'Somalia', 'Fall_of_the_Berlin_Wall', 'Slavery', 'Roger_Lloyd-Pack', 'Akira_Kurosawa', 'Steppe', 'Series_(mathematics)', 'McDonnell_Douglas_F-15_Eagle', 'Dennis_Hastert', 'Edward_II_of_England', 'Galway', 'Patroclus', 'The_Last_King_of_Scotland_(film)', 'Spaniards', 'Protein', 'Battle_of_Culloden', 'Non-resident_Indian_and_person_of_Indian_origin', 'The_Alchemist_(novel)', 'Airship', 'Dustin_Hoffman', 'Ancien_Régime', 'Alluri_Sitarama_Raju', 'Erich_Fromm', 'Susan_Sarandon', 'Gwen_Stefani', 'Sanremo_Music_Festival', 'List_of_theological_demons', 'Stratford-upon-Avon', 'Madagascar', 'Feminist_theory', 'Heat', 'Cenotaph', 'Saving_Private_Ryan', 'Golem', 'Los_Angeles_Times', 'Circle', 'Constantine_II_of_Greece', 'Metal', 'Mother\'s_Day', 'Progressive_Era', 'Ferdinand_I_of_Austria', 'Andorra', 'Kippah', 'Abolitionism_in_the_United_States', 'Paul_Simon', 'Harold_Wilson', 'State_Bank_of_India', 'Feast_of_the_Seven_Fishes', 'Bob_Marley', 'Kosovo_War', 'North_Korea', 'Frasier', 'Beelzebub', 'Neil_Young', 'Venus_Williams', 'French_Revolution_of_1848', 'Anglo-Saxons', 'Harpsichord', 'Gigabyte', 'Christopher_Isherwood', '1852_United_States_presidential_election', 'Joseph_Bonaparte', 'Schlieffen_Plan', 'USS_Nautilus_(SSN-571)', 'List_of_political_parties_in_India', 'Eudaimonia', '93rd_Academy_Awards', 'Fatwa', 'Puranas', 'Grand_Theft_Auto', 'Indo-Greek_Kingdom', 'Fata_Morgana_(mirage)', 'Latin_Church', 'Gregory_Peck', 'List_of_Antarctic_and_subantarctic_islands', 'List_of_TCP_and_UDP_port_numbers', 'Histrionic_personality_disorder', '1960_U-2_incident', 'Third_Way', 'Cartesian_coordinate_system', 'Whitehall', 'HIV', 'Tsar', 'Vivien_Leigh', 'Rani_Lakshmibai', 'Literacy', 'Cockatoo', 'Planet_of_the_Apes', 'Colonel', 'Herbert_Spencer', 'Millennials', 'German_language', 'Mixed_economy', 'Pelé', 'Taipei', 'Formula_One', 'West_Bengal_Legislative_Assembly', 'Algeria', 'Twelve_Days_of_Christmas', 'Klemens_von_Metternich', 'Google_Scholar', 'Sigourney_Weaver', 'Squid', 'Jessica_Lange', 'Gujarat', 'Thucydides', 'Richard_I_of_England', 'Dil_Chahta_Hai', 'Mausoleum_at_Halicarnassus', 'Mind–body_dualism', 'Dawn_French', 'Spider-Man_(2002_film)', 'Cambodian_genocide', 'Battle_of_the_Hydaspes', 'Zebra', 'Mining', 'Down_syndrome', 'Coffee', 'Mercenary', 'Spider', 'The_New_Yorker', 'Playing_card', 'Pride', 'Hammond_organ', 'Brit_milah', 'Constitution_of_the_United_States', 'Thomas-Alexandre_Dumas', 'New_Zealand', 'Martha_Washington', 'Gestalt_therapy', 'True_Cross', 'Scooby-Doo_(film)', 'Liberté,_égalité,_fraternité', 'Truman_Doctrine', 'Mainland_China', 'Marshall_Islands', 'Robert_Lewandowski', 'Coat_of_arms', 'Myers–Briggs_Type_Indicator', 'Dark_web', 'One_Flew_Over_the_Cuckoo\'s_Nest_(film)', 'Hudson_River', 'Provisional_Irish_Republican_Army', 'Lydia', 'Chagatai_Khanate', 'Arius', '1958_Lituya_Bay,_Alaska_earthquake_and_megatsunami', 'Joan_of_Arc', 'Human_history', 'Hinduism', 'King_James_Version', 'England_national_football_team', 'Syed_Ahmad_Khan', 'Spanish_Civil_War', 'London', 'The_Federalist_Papers', 'LL_Cool_J', 'Exercise', 'United_Airlines_Flight_93', 'United_States_Postal_Service', 'Osman_I', 'Völkisch_movement', 'Kamchatka_Peninsula', 'Artillery', 'John_the_Baptist', 'Caligula', 'Norfolk_Island', 'Sergei_Saltykov', 'Judith_Butler', 'Kanishka', 'Ay', 'Boudica', 'Gulf_War', 'George_III', 'Bohemianism', 'Bloomsbury_Publishing', 'Funeral', 'Russell_Brand', 'Blade_Runner_2049', 'J._J._Abrams', 'Oceania', 'Battle_of_the_Atlantic', 'Saint_Nicholas', 'Holiest_sites_in_Islam', 'Steven_Seagal', 'Racial_segregation', 'Renaissance_humanism', 'Great_Chinese_Famine', 'Marriage_in_Islam', 'Madame_du_Barry', 'Jeffrey_Epstein', 'Prince_Harry,_Duke_of_Sussex', 'Tom_Felton', 'Clark_Gable', 'Multi-level_marketing', 'Arabian_Sea', 'Nevada', 'Sulfur', 'Battle_of_the_Alamo', 'Camilla,_Duchess_of_Cornwall', 'John_Wick', 'Chlamydia', 'Hippocrates', 'Bigamy', 'Billy_Connolly', 'Holy_Land', 'Lucy_Liu', 'Anachronism', 'Osamu_Tezuka', 'Sarah_Jessica_Parker', 'Suga_(rapper)', 'Aleister_Crowley', 'Wind', 'Lot_in_Islam', 'Rammstein', 'Google_Drive', 'Learning', 'Hulk_Hogan', 'Pulse', 'Tomb_Raider', 'Isha_Foundation', 'Reconquista', 'Mahmoud_Ahmadinejad', 'Hatshepsut', 'Jürgen_Habermas', 'RuPaul\'s_Drag_Race_UK', 'Louis_Armstrong', 'Hannibal', 'Christmas_in_Australia', 'Jimmy_Carter', 'The_arts', 'Sathya_Sai_Baba', 'Spectre_(2015_film)', 'Pierre-Emerick_Aubameyang', 'Java_(programming_language)', 'Dudley_Moore', 'Bantu_peoples', 'The_Great_Gatsby', 'John_Huston', 'Historical_Vedic_religion', 'Safavid_dynasty', 'Eugene_O\'Neill', 'Uncharted_2:_Among_Thieves', 'Howard_Carter', 'Natalie_Wood', 'Alevism', 'Phyllanthus_emblica', 'Othello', 'Jane_Goodall', 'Deobandi', 'Valley_of_the_Kings', 'Utrecht', 'Hamilton_(musical)', 'Ethnography', 'The_Monkees', 'Hasselblad', 'Satire', 'Company', 'Miyamoto_Musashi', 'Acronym', 'Us_(2019_film)', 'Fred_Armisen', 'Exclusive_economic_zone', 'Battle_of_Trafalgar', 'Kaffir_(racial_term)', 'Zee_TV', 'Islamic_State', 'Joulupukki', 'List_of_countries_and_dependencies_by_area', 'Yugoslavia', 'JavaScript', 'Reddit', 'Basque_Country_(autonomous_community)', 'Arvydas_Sabonis', 'Five_Pillars_of_Islam', 'Hephaestion', 'Three-age_system', 'Stalinism', 'Memory', 'Crucifixion', 'The_Martian_(film)', 'List_of_amendments_to_the_United_States_Constitution', 'Harvard_University', 'Heart', 'Wayback_Machine', 'Despotism', 'Jane_Seymour', 'Speed_of_light', 'Scylla', 'Morality', 'War', 'Decolonization', 'Stoat', 'Sharon_Stone', 'Christmas_ornament', 'Ice_Cube', 'French_First_Republic', 'Interstellar_(film)', 'Hawaii', 'Bill_Burr', 'Les_Dawson', 'University_of_California,_Davis', 'Miracles_of_Jesus', 'Carpetbagger', 'Rajiv_Gandhi', 'Mongolian_language', 'Napoleon_II', 'Josip_Broz_Tito', 'Buddy_Holly', 'King', 'Miscegenation', 'Orson_Scott_Card', 'Vampire', 'Sony_Entertainment_Television', 'COVID-19_pandemic_in_India', 'Eddie_Redmayne', 'Philip_IV_of_Spain', 'Silver_Linings_Playbook', 'Jessica_Biel', 'Denial-of-service_attack', 'Book_of_Daniel', 'Reuters', 'Rhode_Island', 'Hans_Frank', 'Eastern_Europe', 'Epiglottitis', 'Ronda_Rousey', 'The_Chronicles_of_Narnia_(film_series)', 'WhatsApp', 'Ukrainian_Insurgent_Army', 'Pete_Buttigieg', 'Princely_state', 'Slave_states_and_free_states', 'Eastern_Bloc', 'Elsevier', 'Salman_of_Saudi_Arabia', 'Karma', 'Zoology', 'Engine', 'Zionism', 'Ivermectin', 'CR_Vasco_da_Gama', 'Hell', 'Ethan_Hawke', 'Naomi_Wolf', 'Marshall_McLuhan', 'Batman_Begins', 'Swimming_pool', 'Jan_Hus', 'Topkapı_Palace', 'Sam_Taylor-Johnson', 'Florida', 'Angola', 'Dances_with_Wolves', 'Early_modern_period', 'List_of_states_and_territories_of_the_United_States_by_population', 'Moors', 'Camp_(style)', 'Area', 'Chord_(music)', 'CoronaVac', 'DreamWorks_Pictures', '1946_Cabinet_Mission_to_India', 'Shashi_Kapoor', 'Breakfast_at_Tiffany\'s_(film)', 'Marcus_Aurelius', 'Cavalry', 'Didgeridoo', 'The_Shining_(film)', 'Seven_Heavens', 'French_Wars_of_Religion', 'Libido', 'Aeschylus', 'Radical_feminism', 'Chicken', 'Suleiman_the_Magnificent', 'Nuremberg_Laws', 'Hootenanny', 'Asian_elephant', 'Warring_States_period', 'String_instrument', 'Jerome', 'Carom_billiards', 'Lionel_Messi', 'Confucius', 'Harry_Belafonte', 'Index_of_psychology_articles', 'Franz_von_Papen', 'Penny_(United_States_coin)', 'Croatia', 'Pierogi', 'Gazprom', 'Debra_Paget', 'Shabbat', 'Edith_Pretty', 'Gong_Hyo-jin', 'Antalya', 'Prophet', 'Prometheus_(2012_film)', 'Cat_Stevens', 'House_of_Habsburg', 'Renée_Zellweger', 'Luxembourg', 'Indira_Gandhi', 'Barrister', 'Barbary_pirates', 'List_of_Nazi_Party_leaders_and_officials', 'Photon', 'Roy_Orbison', 'Vietnamese_language', 'Caesar\'s_Civil_War', 'Wars_of_the_Roses', 'James_Cameron', 'Tang_dynasty', 'Mononymous_person', 'Syriac_language', 'Ubuntu_philosophy', 'Kevin_McCarthy_(California_politician)', 'Crimea', 'Warwickshire', 'Prime_number', 'Sepsis', 'George_Wallace', 'Thomas_Sankara', 'Laurence_Fishburne', 'North_Sentinel_Island', 'Oboe', 'Logos', 'Spirited_Away', 'Naples', 'List_of_national_parks_of_the_United_States', 'TLC_(group)', 'Radio', 'Central_Europe', 'Indian_National_Army', 'Empire', 'Chris_Evans_(actor)', 'Ramadan', 'Greek_mythology', 'Lebanon', 'Maitreya', 'Ghalib', 'Ted_Kaczynski', 'Hypatia', 'Old_Style_and_New_Style_dates', 'Ron_Howard', 'Latitude', 'Jonathan_Spence', 'Mandarin_Chinese', 'Second_French_Empire', 'Minneapolis', 'Amy_Schumer', 'Jason_Alexander', 'Academy_Award_for_Best_Picture', 'Beijing', 'Van_Halen', 'Greece', 'Kantian_ethics', 'Cappadocia', 'Rabbi', 'Odisha', 'Dire_Straits', 'List_of_video_games_considered_the_best', 'Godzilla', 'Cowboy_Bebop', 'Nymphomaniac_(film)', 'Jeanne_Moreau', 'Theory_of_forms', 'Kingdom_of_Naples', 'Saint_Peter', 'Xerxes_I', 'Rod_Stewart', 'Unification_Church', 'Chinese_Communist_Party', 'Red_Hot_Chili_Peppers', 'Gambling', 'Monarchy_of_the_United_Kingdom', 'Baal', 'Rama', 'Roger_Federer', 'François_Mitterrand', 'Phoenician_alphabet', 'Alan_Arkin', 'Amenhotep_I', 'Raúl_Castro', 'Dartmouth_College', 'Felix_Mendelssohn', 'Smithsonian_Institution', 'American_English', 'Nomad', 'Brave_New_World', 'Pope_John_Paul_II', 'Ibn_Arabi', 'Isaac_Asimov', 'Brain', 'Gab_(social_network)', 'Quebec', 'Indus_River', 'Sex_organ', 'P._T._Barnum', '1989_Tiananmen_Square_protests_and_massacre', 'Pulp_Fiction', 'History_of_the_Philippines', 'Miley_Cyrus', 'Sichuan', 'Glee_(TV_series)', 'Invasion_of_Poland', 'Nazi_symbolism', 'Facial_expression', 'Emmett_Till', 'Heir_apparent', 'List_of_hobbies', 'The_Shape_of_Water', 'Electric_guitar', 'German_colonial_empire', 'Richard_Wagner', 'Genocide', 'Amazons', 'Caroline_Kennedy', 'Atropine', 'E_pluribus_unum', 'Christian_Bale', 'Chernobyl', 'Bourgeoisie', 'Bharatiya_Janata_Party', 'Azad_Hind', 'Alexis_Bledel', 'Religious_male_circumcision', 'August', 'Geneva_Conventions', 'Henry_Miller', 'Reconstruction_era', 'Romelu_Lukaku', 'Christopher_Lee', 'Shylock', 'Noam_Chomsky', 'Johannesburg', 'Rhodesia', 'Novak_Djokovic', 'The_Matrix', 'Molecule', 'James_Hetfield', 'Michael_Sheen', 'Coloureds', 'Cast_iron', 'Cold_War', 'Jazz_fusion', 'Slobodan_Milošević', 'MSNBC', 'Dmitry_Muratov', 'Zipporah', 'Kareena_Kapoor', 'Lady_Jane_Grey', 'Abbasid_Caliphate', 'Party_leaders_of_the_United_States_Senate', 'Hongwu_Emperor', 'Francis_Xavier', 'Józef_Piłsudski', 'Methuselah', 'Gansu', 'Endogamy', 'Parkinson\'s_disease', 'Germaine_Greer', 'Rajput', 'Banjo', 'Daryl_Hannah', 'Bhutan', 'Atlantis', 'Cyclopes', 'Division_of_Korea', 'Jonah', '1992_United_States_presidential_election', 'Mario_Draghi', 'Jenny_McCarthy', 'House_of_Valois', 'Gospel_of_Mark', 'Alma_mater', 'Parliamentary_system', 'Bilal_ibn_Rabah', 'Demi_Lovato', 'Journey_to_the_West', 'Walter_Cronkite', 'Biblical_Magi', 'System_of_a_Down', 'Final_Fantasy_VII', 'Mikhail_Tukhachevsky', 'Chinese_culture', 'Gabriel_García_Márquez', 'French_invasion_of_Russia', 'Separation_of_church_and_state', 'Mahavira', 'Usain_Bolt', 'William_Shatner', 'Racketeering', 'Marilyn_Monroe', 'Mohamed_Al-Fayed', 'Black_Eyed_Peas', 'Waylon_Jennings', 'Dalai_Lama', 'God_of_War_(franchise)', 'Syncretism', 'The_Incredible_Hulk_(film)', 'Assyrian_people', 'Geometry', 'Cooperative', 'Jennifer_Doudna', 'Phylogenetic_tree', 'Helmut_Schmidt', 'The_Masked_Singer_(American_TV_series)', 'Nova_Scotia', 'Our_Lady_of_Lourdes', 'State_Anthem_of_the_Soviet_Union', 'Epictetus', 'Zina', 'Philips', 'Kingdom_of_Sicily', 'Petrarch', 'Lockheed_SR-71_Blackbird', 'Kingdom_of_Mysore', 'J._D._Salinger', 'Thorn_(letter)', 'List_of_highest-grossing_Indian_films', 'Mahajanapadas', 'Battle_of_Austerlitz', 'Volume', 'Daniel_Webster', 'American_Gods_(TV_series)', 'Ambergris', 'Hebron', 'Jutland', 'Riven_Rock,_Montecito', 'Mirza_Ghulam_Ahmad', 'Star_Trek:_The_Next_Generation', 'King_Lear', 'Canon_(fiction)', 'Voltaire', 'Christmastide', 'Viking_expansion', 'Battle_of_Blair_Mountain', 'Maslow\'s_hierarchy_of_needs', 'Tad_Lincoln', 'Classical_liberalism', 'Jesus_bloodline', 'Yale_University', 'Pottery', 'Cherub', 'Jim_Croce', 'Mogadishu', 'Cellulitis', 'Pacific_Islander', 'Nanjing_Massacre', 'Starlink', 'Fargo_(TV_series)', 'Sixth_Dynasty_of_Egypt', 'List_of_current_United_States_senators', 'Jewish_history', 'Svalbard', 'United_States_House_of_Representatives', 'Cubic_equation', 'Rolling_Stone\'s_500_Greatest_Songs_of_All_Time', 'NASA', 'The_Walt_Disney_Company', 'Hegemony', 'HMS_Terror_(1813)', 'Warsaw_Uprising', 'Congress_of_Vienna', 'Rohit_Sharma', 'Woody_Allen', 'Casino_Royale_(2006_film)', 'Georgia_Guidestones', 'Paris_Commune', 'Virat_Kohli', 'Freedom_of_the_City', 'Ray_Kroc', 'Indian_Idol', 'Harvey_Weinstein', 'Language_isolate', 'John,_King_of_England', 'Macbeth_(character)', 'Jawaharlal_Nehru', 'Elijah_Muhammad', 'Sexually_transmitted_infection', 'Mississippi_River', 'Christmas_market', 'Alessandro_Volta', 'Mos_Def', 'Epilepsy', 'Kraków', 'Nizamuddin_Auliya', 'Pisces_(astrology)', 'Dentistry', 'Human_overpopulation', 'Handgun', 'Charlie_Sheen', 'Child_abandonment', 'Electromagnetism', 'Book_of_Enoch', 'Adderall', 'William_Ewart_Gladstone', 'Lana_Del_Rey', 'Lot_(biblical_person)', 'ASEAN', 'War_of_the_First_Coalition', 'Do_it_yourself', 'Iranian_Revolution', 'Geopolitics', 'Empirical_evidence', 'Evil_eye', 'Tower_of_Babel', 'Jimmy_Floyd_Hasselbaink', 'Gilbert_du_Motier,_Marquis_de_Lafayette', 'Kali_Yuga', 'Edinburgh', 'Venezuela', 'Statelessness', 'Drag_(physics)', 'Census_of_Quirinius', 'Jonestown', 'Radio_Free_Asia', 'A_Knight\'s_Tale', 'Euronews', 'PlayStation_5', 'Thomas_Merton', 'Robert_F._Kennedy_Jr.', 'Utilitarianism', 'Manchukuo', 'Titus', 'Milla_Jovovich', 'Sean_Connery', 'Pali', 'Justin_Bieber', 'Rheumatoid_arthritis', 'Hindustan_Socialist_Republican_Association', 'Battles_of_Lexington_and_Concord', 'Amartya_Sen', 'Hydrogen', 'Ulysses_S._Grant', 'Century_of_humiliation', 'Arnold_Schwarzenegger', 'William_Rehnquist', 'Eggnog', 'MI5', 'Probability', 'Late_capitalism', 'AC/DC', 'William_the_Silent', 'Jair_Bolsonaro', 'Number_theory', 'Panama_Canal', 'Rush_Limbaugh', 'Spacetime', 'Opera', 'Sino-Indian_border_dispute', 'A.C._Milan', 'Mein_Kampf', 'Queen\'s_Gambit', 'Earl_Warren', 'Ninja', 'Big_Bang', 'Republic_of_Venice', 'Trent_Reznor', 'Mycenaean_Greece', 'Ancient_Greek_religion', 'Hells_Angels', 'Battle_of_Lepanto', 'Heian_period', 'Al-Aqsa_Mosque', 'James_A._Garfield', 'Cirrhosis', 'Plessy_v._Ferguson', 'Brian_Dennehy', 'San_Sebastián', 'Oedipus_complex', 'The_Three_Stooges', 'Religious_views_of_Adolf_Hitler', 'Klara_Hitler', 'Emma_Thompson', 'Viv_Richards', 'Emma_Watson', 'Yoga_Sutras_of_Patanjali', 'Uzbekistan', 'Attack_on_Pearl_Harbor', 'Abu_Bakr', 'Montgomery_Clift', 'The_Godfather', 'Chuck_Norris', 'Roman_Forum', 'Iron_Cross', 'Mansfield_Park', 'Elo_rating_system', 'Neil_Patrick_Harris', 'West_Indies', 'Angelina_Jolie', 'Abdul_Qadir_Gilani', 'Doctor_of_Medicine', 'Tokugawa_shogunate', 'List_of_Wikipedia_mobile_applications', 'Franz_Joseph_I_of_Austria', 'Daniel_Kahneman', 'Python_(programming_language)', 'List_of_American_Civil_War_battles', 'List_of_country_calling_codes', 'Ohio_River', 'Nobel_Prize_in_Physiology_or_Medicine', 'Vikings_(2013_TV_series)', 'Ayurveda', 'Ian_McKellen', 'Yoruba_religion', 'Guillain–Barré_syndrome', 'Ben_Kingsley', 'Sarah_Palin', 'Record_of_Ragnarok', 'Mehmed_VI', 'Paula_Abdul', 'Prophets_and_messengers_in_Islam', 'Befana', 'Kitsch', '1848_United_States_presidential_election', 'Steve_Irwin', 'Edward_Wood,_1st_Earl_of_Halifax', 'Chemical_element', 'John_of_Gaunt', 'H._G._Wells', 'Rajneesh', 'United_States_Department_of_State', 'Classification_of_demons', 'The_Times_of_India', 'Montana', 'Death_of_Cleopatra', 'Mediumship', 'Marduk', 'Pune', 'Ottawa', 'Macedonian_language', 'The_Borgias_(2011_TV_series)', 'Kochi', 'Gallic_Wars', 'Walt_Disney_Animation_Studios', 'Ibn_Battuta', 'Suez_Canal', 'Curling', 'Serfdom', 'Black_Panther_(film)', 'Transcendental_Meditation', 'Anurag_Kashyap', 'Chauri_Chaura_incident', 'Saul', 'King_Arthur', 'Los_Angeles', 'Narayana_Guru', 'Death_by_burning', 'Pinterest', 'Ganges', 'Walter_Raleigh', 'Electroconvulsive_therapy', 'Stevie_Ray_Vaughan', 'Swabia', 'Islamic_calendar', 'Ajax_the_Great', 'Nineteen_Eighty-Four', 'Concrete', 'Conversion_to_Judaism', 'Abdulmejid_II', 'Ketogenic_diet', 'Graphic_novel', 'Belle_Starr', 'The_Lighthouse_(2019_film)', 'Three_Kingdoms', 'Soviet_Union', 'Serena_Williams', 'Abrahamic_religions', 'Bill_Paterson_(actor)', 'Andhra_Pradesh', 'Judi_Dench', 'Charles_the_Bald', 'Silicon', 'Syria', 'NCIS_(TV_series)', 'Communication', 'The_Dark_Side_of_the_Moon', 'Schutzstaffel', 'John_Henry_Newman', 'Louis_Pasteur', 'Wilhelm_Mohnke', 'Charles_II_of_Spain', 'Mount_Etna', 'Hu_Jintao', 'Teleology', 'Caribbean_Sea', 'NDTV', 'Mortal_Kombat', 'Kirk_Douglas', 'Abdulmejid_I', 'Qi', 'Joan_Cusack', 'Satan', 'Operation_Highjump', 'Kedarnath', 'King_Kong_(2005_film)', 'Monsoon', 'Event_Horizon_(film)', 'Severe_acute_respiratory_syndrome_coronavirus_2', 'Chow_Yun-fat', 'Frank_Lampard', 'Demon', 'Coming_of_age', 'Munich_Agreement', 'List_of_ongoing_armed_conflicts', 'List_of_common_misconceptions', 'Sargon_of_Akkad', 'Spanish_Armada', 'Muhammad_Ali', 'Joni_Mitchell', 'Hasidic_Judaism', 'Theodosius_I', 'Barley', 'Cuneiform', 'Henri_Poincaré', 'Mariana_Trench', 'Last_Action_Hero', 'Nestlé', 'Generalplan_Ost', 'Cleopatra_(1963_film)', 'Billie_Jean_King', 'Nordic_model', '5G', 'Minstrel_show', 'Adolf_Hitler', 'Nontrinitarianism', 'Shays\'_Rebellion', 'Algebra', 'Virgin_birth_of_Jesus', 'Cyndi_Lauper', 'Hard_problem_of_consciousness', 'Egyptian_hieroglyphs', 'Jude_the_Apostle', 'Geri_Halliwell', 'Nashville,_Tennessee', 'European_Parliament', 'Cebu', 'Hjalmar_Schacht', 'Champaran_Satyagraha', 'Jahannam', 'New_Spain', 'Julius_Nyerere', 'Maria_Feodorovna_(Dagmar_of_Denmark)', 'Hans_Holbein_the_Younger', 'Songwriter', 'Pavlos,_Crown_Prince_of_Greece', 'Anesthesia', 'Nigel_Farage', 'Salman_Khan', 'George_S._Patton', 'Willow', 'Al-Ghazali', 'Pashtuns', 'Compass', 'Qajar_Iran', 'Sinaloa_Cartel', 'Zheng_He', 'Wonder_Woman_1984', 'Heterosexuality', 'Red_pill_and_blue_pill', 'Tucker_Carlson', 'Los_Angeles_Lakers', 'Richard_Dawkins', 'Bhagavata_Purana', 'Reservoir_Dogs', 'Country', 'Islamic_banking_and_finance', 'Hokusai', 'List_of_English_monarchs', 'Icelandic_Christmas_folklore', 'Delaware', 'Christianity_by_country', 'Bangalore', 'Financial_crisis_of_2007–2008', 'Diane_Keaton', 'Streisand_effect', 'Franz_Kafka', 'Eastern_Orthodox_Church', 'English_language', 'Second_Boer_War', 'Constitution', 'Locked-in_syndrome', 'List_of_socialist_states', 'Cue_sports', 'Varg_Vikernes', 'Kate_Moss', 'Hubei', 'The_Hobbit', 'Hausa_people', 'Syrian_civil_war', 'Luke_the_Evangelist', 'Jupiter_(mythology)', 'Hail_Mary', 'King_of_Italy', 'Sojourner_(rover)', 'George_Clinton_(vice_president)', 'Emperor_of_China', 'Elizabeth_Woodville', 'John_Calvin', 'Standard_Model', 'Ted_Cruz', 'Gypsy_(1962_film)', 'Transcendentalism', 'Thebes,_Greece', 'Young_Avengers', 'Qing_dynasty', 'Christmas_traditions', 'A_Fish_Called_Wanda', 'The_Lord_of_the_Rings_(film_series)', 'White_supremacy', 'Human_migration', 'Magadha', 'Nayib_Bukele', 'San_José,_Costa_Rica', 'A_Bronx_Tale', 'Aquarius_(astrology)', 'Japan', 'Paleontology', 'Seven_Laws_of_Noah', 'Appalachian_Mountains', 'Breakup_of_Yugoslavia', 'International_System_of_Units', 'Names_of_God_in_Judaism', 'Open_access', 'Latin', 'Maharana_Pratap', 'Bundesliga', 'Exodus:_Gods_and_Kings', 'Cell_(biology)', 'Sanitation', 'Ebenezer_Scrooge', 'Basil_II', 'Black_Sea', 'Andrew_Yang', 'YouTube', 'The_Sopranos', 'Fish', 'Miso', 'Thus_Spoke_Zarathustra', 'Admiral', 'CRISPR', 'Premier_League', 'Rosa_Parks', 'Czech_Republic', 'Icarus', 'Galaxy', 'Capri', 'Longitude', 'Druid', 'Ratchet_&_Clank', 'God_in_Christianity', 'Baroque', 'Juliana_of_the_Netherlands', 'Mike_Tyson', 'Soviet_famine_of_1932–1933', 'Will_Arnett', 'The_Wolf_of_Wall_Street_(2013_film)', '2019_United_Kingdom_general_election', 'Nora_Fatehi', 'Mean_Girls', 'Maximinus_Thrax', 'Second_Battle_of_Panipat', 'Congressional_Gold_Medal', 'European_colonization_of_the_Americas', 'Malacca', 'Edward_Bernays', 'Saint_Joseph', 'Saint_Martin_(island)', 'Stevie_Wonder', 'Frederick_William_III_of_Prussia', 'Hyderabad_State', 'Eurovision_Song_Contest_2021', 'Alan_Watts', 'Timeline_of_abolition_of_slavery_and_serfdom', 'Dachau_concentration_camp', 'Rhodesian_Bush_War', 'The_Orville', 'José_Rizal', 'Oedipus_Rex', 'List_of_most-disliked_YouTube_videos', 'History_of_Earth', 'Birth_control', 'List_of_current_United_States_governors', 'Afghanistan', 'Dave_Chappelle', 'Free_City_of_Danzig', 'Gang_of_Four', 'Baháʼu\'lláh', 'Second_Cold_War', 'Tissue_(biology)', 'Eastern_Front_(World_War_II)', 'Wayne_Brady', 'Particle_physics', 'World\'s_Columbian_Exposition', 'Qianlong_Emperor', 'Platonic_solid', 'William_Henry_Harrison', 'Charles_Martel', 'Coco_(2017_film)', 'Carrara_marble', 'Bashar_al-Assad', 'Treaty_of_Brest-Litovsk', 'Adam_Smith', 'Colin_Firth', 'Extinction', 'Origen', 'Historical_materialism', 'Siraj_ud-Daulah', 'Boston', 'Google_Search', 'Filipino_language', 'Aragon', 'Gay_sexual_practices', 'Ancient_Egyptian_religion', 'Set_(mathematics)', 'Feeding_the_multitude', 'Sic', 'Ezra', 'George_Harrison', 'Aileen_Wuornos', 'Territorial_claims_in_Antarctica', 'Capybara', 'The_Guardian', 'Abraham\'s_family_tree', 'Malthusianism', 'Pokémon_(TV_series)', 'Brad_Pitt', 'The_Catcher_in_the_Rye', 'Vestal_Virgin', 'Benedict_Cumberbatch', 'Superman', 'Orange_Is_the_New_Black', 'Loan', 'Popular_music', 'Orthodoxy', 'Panchatantra', 'Observance_of_Christmas_by_country', 'Dissolution_of_Czechoslovakia', 'The_Daily_Beast', 'Crohn\'s_disease', 'Paradox', 'Tim_Burton', 'Child', 'Rupert_Grint', 'Publishing', 'Trade', 'Anima_and_animus', 'Northern_Ireland', 'Ocean', 'The_Coca-Cola_Company', 'Zaire', 'Pier_Paolo_Pasolini', 'Venus_(mythology)', 'Herbert_Hoover', 'Missouri_Compromise', 'Prince', 'List_of_UFC_champions', 'Ronald_Reagan', 'Marvin_Minsky', 'Richmond,_Virginia', 'Yellow_River', 'Asiatic_lion', 'Gross_domestic_product', 'Church_of_the_Holy_Sepulchre', 'Combinatorics', 'Claus_von_Stauffenberg', 'Constantine_XI_Palaiologos', 'University_of_Oxford', 'USS_Abraham_Lincoln_(CVN-72)', 'Operation_Overlord', 'List_of_Indian_states_and_union_territories_by_GDP', 'Red_Army', 'Rheumatology', 'Marlon_Brando', 'Goodfellas', 'Thurgood_Marshall', 'ResearchGate', 'Czech_language', 'Fleetwood_Mac', 'Cancer', 'Hyde_Park,_London', 'Frozen_(2013_film)', 'Indian_subcontinent', 'Permaculture', 'Peppa_Pig', 'Operation_Gladio', 'The_Star-Spangled_Banner', 'Leto', 'Batik', 'Charles_X', 'Kalpana_Chawla', 'DC_Comics', 'Abbie_Hoffman', 'Black_Friday_(shopping)', 'Statue_of_Zeus_at_Olympia', 'Mensheviks', 'Lens', 'Michael_of_Russia', 'Communist_state', 'Jennifer_Lawrence', 'Provinces_and_territories_of_Canada', 'Philippe_Pétain', 'Themistocles', 'Peloponnese', 'First_transcontinental_railroad', 'Chloral_hydrate', 'Monarchy_of_Spain', 'Fyodor_Dostoevsky', 'James_Earl_Jones', 'Ishmael', 'Indentured_servitude', 'Futurama', 'Mail', 'Dashavatara', 'Candy_cane', 'Black_Swan_(film)', 'William_the_Conqueror', 'Communist_International', 'Azores', 'Habeas_corpus', 'DreamWorks_Animation', 'Leonid_Brezhnev', 'John_Boehner', 'Sandra_Day_O\'Connor', 'Season', 'James_Dean', 'Hangzhou', 'EFL_Championship', 'Antonie_van_Leeuwenhoek', 'Jeff_Bridges', 'Indian_religions', 'Ivan_the_Terrible', 'Elam', 'Cali_Cartel', 'List_of_NBA_All-Stars', 'Nochebuena', 'Robert_Browning', 'Classical_antiquity', 'Dance', 'Pulmonary_embolism', 'Girnar', 'Spain', 'Laudanum', 'Mongolian_script', 'Alcoholism', 'Reform_Judaism', 'Short_story', 'Seville', 'Alexander_III_of_Russia', 'Phoenicia', 'Guru', 'Quentin_Tarantino', 'Michael_Crichton', 'John_Dewey', 'Bow_and_arrow', 'Karelia', 'Ear', 'Sustainable_Development_Goals', 'Henry_VI_of_England', 'Hypocrisy', 'Hephaestus', 'Amanda_Gorman', 'Romulus_Augustulus', 'Chiang_Kai-shek', 'Windows_10', 'Puritans', 'Korean_War', 'Fashion', 'The_39_Steps_(1935_film)', 'Thermodynamics', 'International_Society_for_Krishna_Consciousness', 'P._W._Botha', 'Christmas_lights', 'Legitimacy_(family_law)', 'Death_mask', 'Song_of_Songs', 'The_Marvelous_Mrs._Maisel', '2021_in_film', 'Fig', 'Market_(economics)', 'St._Elmo\'s_fire', 'Wiki', 'John_Falstaff', 'The_Decameron', 'Pandita_Ramabai', 'Vlad_the_Impaler', 'Mercury_(element)', 'Island', 'Gethsemane', 'Space_opera', 'Deccan_Plateau', 'Nursing', 'Cereal', 'Spice', 'Michael_Hordern', 'Mark_Zuckerberg', 'Marco_Polo', 'Aries_(astrology)', 'Jodha_Akbar', 'Officer_(armed_forces)', 'Falklands_War', 'Number', 'Automaton', 'Science_fiction', 'Sharmila_Tagore', 'Dua_Lipa', 'The_Fifth_Element', 'Acropolis_of_Athens', 'Sengoku_period', 'Google_Translate', 'George_Soros', 'Irish_language', 'Paul_Klee', 'Ravi_Shankar_(spiritual_leader)', 'Charlton_Heston', 'Exponentiation', 'Shirley_MacLaine', 'Mongol_conquest_of_the_Khwarazmian_Empire', 'Wheel', 'Recorder_(musical_instrument)', 'Kelsey_Grammer', 'Positivism', 'Louisiana_Purchase', 'Sedition', 'Reginald_Dyer', 'Idolatry', 'Animal_husbandry', 'Fruitcake', 'Rabat', 'Eve', 'Christmas_in_the_Philippines', 'John_Dee', 'D._W._Griffith', 'Marco_Polo_(TV_series)', 'Verona', 'Stephen_Hillenburg', 'Georgia_(country)', 'Plácido_Domingo', 'Tea', 'Allahabad', 'George_C._Scott', 'Boston_Tea_Party', 'British_Museum', 'Frederick_III,_German_Emperor', 'RT_(TV_network)', 'Standard_deviation', 'List_of_pharaohs', 'Munich_massacre', 'Ficus_religiosa', 'Margaret_Thatcher', 'Agriculture', 'United_States_invasion_of_Grenada', 'Unitary_state', 'Bad_Bunny', 'Sumer', 'Liam_Neeson', 'Ra', 'Gavin_Newsom', 'Isaac_Newton', 'Natural_selection', 'Diana_(mythology)', 'Robert_Kardashian', 'Rick_James', 'Free_will', 'Sicherheitsdienst', 'Google_logo', 'George_R._R._Martin', 'Leprosy', 'Hiragana', 'Filibuster', 'Aquiline_nose', 'Bette_Davis', 'Film_score', 'Foie_gras', 'State_of_matter', 'Myrrh', 'Indian_Independence_Act_1947', 'Dutch_Republic', 'Meteoroid', 'Historiography', 'Tromsø', 'Honey', 'Google_Classroom', 'Monaco', 'List_of_people_who_disappeared_mysteriously_at_sea', 'Mount_Olympus', 'Radiohead', 'Nintendo', 'Industrial_Revolution', 'Russian_language', 'Tertullian', 'American_frontier', 'Paul_Thomas_Anderson', 'Pedro_Castillo', 'Christmas_in_Poland', 'Katherine_Johnson', 'Sovereignty', 'Kievan_Rus\'', 'Swedish_language', 'Cubism', 'Rodrigo_Duterte', 'List_of_Disney_theatrical_animated_feature_films', 'David_Duchovny', 'Viola', 'Harry_Potter_and_the_Cursed_Child', 'Trebuchet', '20_July_plot', 'Qilin', 'Beauty_Revealed', 'Marcus_Vipsanius_Agrippa', 'Mark_Ruffalo', 'Domestication', 'Thetis', 'Psychologist', 'West_Bank', 'Inertia', 'Molecular_biology', 'Oman', 'Flipkart', 'Google_Chrome', 'Shaitan', 'Kareem_Abdul-Jabbar', 'Konstantin_Rokossovsky', 'Pregnancy', 'Burgundy', 'Irrigation', 'Defence_mechanism', 'Julia_Roberts', 'Jeremy_Bentham', 'Greek_language', 'Kolkata', 'Cuban_Revolution', 'Occam\'s_razor', 'Pyrrhus_of_Epirus', 'Claudius', 'Consumer_behaviour', 'Minos', 'Fortune_favours_the_bold', 'Happiness', 'Livia', 'Soylent_Green', 'Anti-fascism', 'Thailand', 'Military_junta', 'United_States_Military_Academy', 'Gypsy_Rose_Lee', 'Kazuo_Ishiguro', 'Hospital', 'Physics', 'Nine_Lessons_and_Carols', 'Crimes_against_humanity', 'Gal_Gadot', 'Shimon_Peres', 'Shia_LaBeouf', 'Alaska', 'Winfield_Scott', 'George_McGovern', 'Sci-Hub', 'Eleanor_Roosevelt', 'Coldplay', 'Anatolia', 'Cato_the_Younger', 'Arrested_Development', 'Kim_Kardashian', 'Chevelle_(band)', 'List_of_dates_for_Easter', 'Herod_the_Great', 'Socialist_Revolutionary_Party', 'Robert_Mugabe', 'Law', 'Major_general_(United_States)', 'Gregor_Mendel', 'Edmund_Ironside', 'Dwight_D._Eisenhower', 'Tropical_cyclone', 'Martyr', 'Tasuku_Honjo', 'Google_Santa_Tracker', 'Mass_(liturgy)', 'Intermittent_fasting', 'Family_tree_of_Muhammad', 'Nathuram_Godse', 'Deepfake', 'The_Daily_Stormer', 'Austria-Hungary', 'Hampton_Court_Palace', 'Galen', 'South_Asian_Association_for_Regional_Cooperation', 'First_Council_of_Nicaea', 'Carp', 'The_Exodus', 'Outlook.com', 'Moldavia', 'Mehmed_III', 'Yin_and_yang', 'Vyasa', 'Brahma', 'Hero_Fiennes_Tiffin', 'Willy_Brandt', 'Mukden_Incident', 'Guinness_World_Records', 'Symbolism_(arts)', 'Jerry_Lee_Lewis', 'Shivaji', 'Untermensch', 'Crypto_art', 'Howard_Cosell', 'Polish–Lithuanian_Commonwealth', 'Saint_Patrick\'s_Day', 'Stephen_King', 'The_100:_A_Ranking_of_the_Most_Influential_Persons_in_History', 'Philosopher', 'Caliphate', 'Roman_conquest_of_Britain', 'Dnieper', 'Last_Supper', 'Vijayanagara_Empire', 'Mahidevran', 'The_Wealth_of_Nations', 'Knecht_Ruprecht', 'Cardinal_virtues', 'LeBron_James', 'Bergen-Belsen_concentration_camp', 'Aga_Khan', 'Book_of_the_Dead', 'Valerie_Bertinelli', 'Hanukkah', 'Manchuria', 'Blondi', 'Bastille_Day', 'Catharism', 'God_in_Judaism', 'Cholangiocarcinoma', 'Turin', 'Traumatic_brain_injury', 'Numidia', 'A_Midsummer_Night\'s_Dream', 'Moravia', 'Polaris', 'Havana', 'Islamism', 'Alloy', 'Sophocles', 'The_Ipcress_File_(film)', 'Valedictorian', 'Aly_Raisman', 'Betty_White', 'First_Bulgarian_Empire', 'Assyria', 'Inanna', 'Vishnu', 'History_of_Rome', 'The_Wall_Street_Journal', 'M._Night_Shyamalan', 'Girolamo_Savonarola', 'Xia_dynasty', 'Charlie_and_the_Chocolate_Factory_(film)', 'Moby-Dick', 'Islamophobia', 'Walt_Disney', 'Mediacorp', 'Southern_Hemisphere', 'Nazi_salute', 'Killing_of_George_Floyd', 'Mahatma_Gandhi', 'Baptism_of_Jesus', 'Absinthe', 'Western_esotericism', 'Friedrich_Engels', 'Corsica', 'Dixie_(song)', 'Shaolin_Monastery', 'Melancholia', 'United_Nations_High_Commissioner_for_Refugees', 'Sanhedrin', 'Nana_Saheb_Peshwa_II', 'Andy_Warhol', 'List_of_programs_broadcast_by_Nickelodeon', 'Jayne_Mansfield', 'Killed_in_action', 'Rainbow', 'George_Foreman', 'British_prince', 'Louisiana_Voodoo', 'Brandenburg', 'TikTok', 'Cosmology', 'Nancy_Pelosi', 'Child_abuse', 'Benicio_del_Toro', 'Ephesus', 'Robert_Todd_Lincoln', 'Fibonacci_number', 'Larry_Sanger', 'Tibetan_Buddhism', 'Cary_Elwes', 'Violence_against_women', 'William_Wordsworth', 'Black_Stone', 'Kingdom_of_Prussia', 'Plasma_(physics)', 'Aliens_(film)', 'Xmas', 'Job_(biblical_figure)', 'Gin', 'East_End_of_London', 'List_of_highest_mountains_on_Earth', 'Augsburg', 'I_Ching', 'Twelfth_Night', 'Ant-Man_and_the_Wasp', 'Hurrem_Sultan', 'Israeli–Palestinian_conflict', 'Charismatic_movement', 'Michael_Schumacher', 'Purim', 'The_Conjuring', 'Writer', 'South_Africa', 'Zooey_Deschanel', 'Lupus', 'Ottoman_family_tree', 'Polymath', 'Felix_Dzerzhinsky', 'Ruminant', 'Bucky_Barnes', 'List_of_United_States_cities_by_population', 'Jason_Bateman', 'Elijah', 'Jacob_and_Esau', 'List_of_Wikipedias', 'Prince_George,_Duke_of_Kent', 'Spanish_language', 'Medieval_India', 'Economy_of_Nazi_Germany', 'Bagpipes', 'Military_organization', 'Steam_engine', 'Paris_Agreement', 'Texas', 'Surströmming', 'Star_Trek:_Deep_Space_Nine', 'Nefertiti', 'Rock_Hudson', 'Unknown_years_of_Jesus', 'Pyrenees', 'John_Stuart_Mill', 'Murad_III', 'Garcelle_Beauvais', 'Jet_Li', 'Social_class', 'James_K._Polk', 'United_States', 'Bread_sauce', 'Kathy_Bates', 'Jim_Henson', 'Joe_Rogan', 'Disability', 'Book_of_Isaiah', 'Israelites', 'Togo', 'Armand_Duplantis', 'Greco-Persian_Wars', 'Maximilien_Robespierre', 'Microscope', 'Robert_Downey_Jr.', 'Chris_Tucker', 'Pope_Paul_VI', 'Thomas_Cromwell', 'Ideology', 'Zero_Dark_Thirty', 'Pete_Davidson', 'Thai_language', 'Polytheism', 'Anne_of_Green_Gables', 'Martial_arts', 'Keyboard_instrument', 'Guerrilla_warfare', 'Battle_of_Plassey', 'Genoa', 'Piano', 'List_of_largest_empires', 'Christianity', 'Charles_Dickens', 'List_of_Money_Heist_episodes', 'Liberal_democracy', 'Erwin_Schrödinger', 'Karl_Dönitz', 'Sentience', 'Julius_Caesar', 'The_Beverly_Hillbillies', 'Slavs', 'Esau', 'Michael_Faraday', 'Marcus_Licinius_Crassus', 'Pala_Empire', 'Filipinos', 'Apollo_8', 'Cinema_of_the_United_States', 'Lazarus_of_Bethany', 'Klaus_Barbie', 'Brazil_national_football_team', 'Coming_to_America', 'Russia', 'Tennessee', 'Richard_Gere', 'Mass', 'Ada_Lovelace', 'Qatar', 'William_James', 'Fullmetal_Alchemist', 'Battle_of_Los_Angeles', 'The_Atlantic', 'Aurangzeb', 'Beyoncé', 'British_nobility', 'Milan', 'Argo_(2012_film)', 'George_Gershwin', 'Central_Intelligence_Agency', 'Islam', 'Harry_Potter_(film_series)', 'Roland_Barthes', 'Maoism', 'Charles_Babbage', 'Hispaniola', 'Jeremiah', 'Ironheart_(character)', 'Franco-Prussian_War', 'Yule_Log_(TV_program)', 'Azerbaijan', 'Dikembe_Mutombo', 'Che_Guevara', 'Con_Air', 'Pope_Benedict_XVI', 'Kevin_Costner', 'Hayao_Miyazaki', 'Ivar_the_Boneless', 'Bill_Evans', 'Søren_Kierkegaard', 'Chief_Justice_of_the_United_States', 'Community', 'Doordarshan', 'Force', 'John_Cage', 'Universe', 'Adam_Sandler', 'Utah', 'Dacia', 'Edward_Norton', 'Ramones', 'Ernest_Hemingway', 'Harriet_Tubman', 'Assumption_of_Mary', 'Ajanta_Caves', 'Julianne_Moore', 'Schrödinger\'s_cat', 'Albert_Camus', 'Anthony_Hopkins', 'Paul_Hogan', 'Helena_Bonham_Carter', 'Vic_Morrow', 'Vitiligo', 'Portsmouth,_New_Hampshire', 'William_II_of_England', 'Balliol_College,_Oxford', 'Michael_Caine', 'Twilight_(2008_film)', 'Association_football', 'Jean-Christophe,_Prince_Napoléon', 'Ben_Bernanke', 'The_Hobbit_(film_series)', 'Newt_Gingrich', 'Cicely_Tyson', 'Ritual', 'Simone_Biles', 'RuPaul', 'Manufacturing', 'Tehran', 'Power_(social_and_political)', 'Simple_machine', 'Jagannath_Temple,_Puri', 'Syracuse,_Sicily', 'Burning_of_Washington', 'Alexandria', 'Battle_of_Shiloh', 'Toyotomi_Hideyoshi', 'The_Picture_of_Dorian_Gray', 'McGill_University', 'Pope_Pius_XII', 'Saxophone', 'Seven_Years\'_War', 'Celts', 'Democracy', 'Zac_Efron', 'Democratic_Party_(United_States)', 'Ciara', 'Sanfilippo_syndrome', 'Depiction_of_Jesus', 'Dennis_Hopper', 'United_States_invasion_of_Panama', 'Seed', 'David_Beckham', 'Islamic_dietary_laws', 'Uncle_Tom\'s_Cabin', 'Chappelle\'s_Show', 'New_York_(state)', 'Red_Square', 'Rhetoric', 'Death_and_state_funeral_of_Joseph_Stalin', 'Wavelength', 'WandaVision', 'List_of_Indian_monarchs', 'Bhopal_disaster', 'Edward_VII', 'Filial_piety', 'Robert_Dudley,_1st_Earl_of_Leicester', 'Yiddish', 'Manmohan_Singh', 'Momentum', 'Unrequited_love', 'Cassandra', 'Death', 'St._Peter\'s_Basilica', 'Pretoria', 'Amitabh_Bachchan', 'Shadrach,_Meshach,_and_Abednego', 'Frank_Bruno', 'Tom_&_Jerry_(2021_film)', 'Biography', 'Christmas_and_holiday_season', 'Michelle_Yeoh', 'Pre-Islamic_Arabia', 'Kabul', 'I_Have_a_Dream', 'Ahmed_Raza_Khan_Barelvi', 'Bodhi_Tree', 'Tenor', 'Politician', 'Jinn', 'McCarthyism', 'Analytical_psychology', 'Seventh-day_Adventist_Church', 'Saudi_Arabia', 'Austronesian_languages', 'Social_psychology', 'M4_carbine', 'Empress_Joséphine', 'Vilnius', 'Shrek', 'Shaktism', 'Stephen_Fry', 'Bayezid_I', 'Yom_Kippur', 'Don_Ameche', 'Bruce_Willis', 'Church_of_England', 'World-systems_theory', 'Louis_IX_of_France', 'Time_Person_of_the_Year', 'Turrón', 'Noah\'s_Ark', 'Allergy', 'Wu-Tang_Clan', 'Heptarchy', '2024_United_States_presidential_election', 'Atharvaveda', 'Charles_IV,_Holy_Roman_Emperor', 'Canterbury_Cathedral', 'Occitan_language', 'Milky_Way', 'Prime_Minister_of_India', 'Conspiracy_theories_about_Adolf_Hitler\'s_death', 'Orient_Express', 'Nestorianism', 'Avengers_(comics)', 'Gorgon', 'U.S._state', 'Racism', 'Paul_McCartney', 'Tyrannosaurus', 'Nat_King_Cole', 'The_Rolling_Stones', 'Black_Death', 'Lombardy', 'Houston', 'Patriarchy', 'Geneva', 'Heron', 'Value_(ethics)', 'Horst-Wessel-Lied', 'Sahara', 'KFC', 'Epistemology', 'Caesarean_section', 'Charles_Taze_Russell', 'Louis_III_of_France', 'Road', 'Epidemic', 'Aristocracy', 'Vitamin_C', 'Sui_dynasty', 'Battle_of_Gaugamela', 'The_Little_Mermaid_(2023_film)', 'Otho', 'Francisco_Franco', 'Hera', 'Coalition_government', 'Haile_Selassie', 'Moscow', 'Mary_Wollstonecraft', 'Holy_Roman_Empire', 'Matt_Damon', 'Ernst_Kaltenbrunner', 'Fourteenth_Amendment_to_the_United_States_Constitution', 'Drum_kit', 'John_Rawls', 'Jerry_Seinfeld', 'Die_Another_Day', 'Mandate_of_Heaven', 'Mohammad_Mosaddegh', 'Kulak', 'Bethenny_Frankel', 'Alan_Turing', 'Saracen', 'Crispin_Glover', 'Trevor_Noah', 'Nicolaus_Copernicus', 'Cambodia', 'Visigoths', 'Peter_Paul_Rubens', 'Macbeth_(2015_film)', 'Gaslighting', 'Bronchitis', 'Brahmin', 'Polygon', 'Metropolitan_Museum_of_Art', 'List_of_dialects_of_English', 'Samaritans', 'Alexander_Pope', 'Ezra_Pound', 'Yakov_Dzhugashvili', 'Turner_Broadcasting_System', 'COVID-19_pandemic', 'Heredity', 'St._Bartholomew\'s_Day_massacre', 'Comedy', 'George_B._McClellan', 'Patrick_J._Kennedy', 'NCAA_Division_I_Men\'s_Basketball_Tournament', 'Liberal_Party_(Philippines)', 'Minoan_civilization', 'Sloth_(deadly_sin)', 'Race_(human_categorization)', 'Copts', 'Virtue_ethics', 'Periyar', 'Trailer_Park_Boys', 'Cetacea', 'Sino-Vietnamese_War', 'Velocity', 'Chinese_folk_religion', 'Volcano', 'Asceticism', 'Telugu_language', 'Chongqing', 'Michelle_Trachtenberg', 'Western_Europe', 'Futurism', 'Truman_Capote', 'Om_mani_padme_hum', 'Caliban', 'The_Gambia', 'North_Africa', 'Daniel_Defoe', 'Johan_Cruyff', 'Moravian_Church', 'Nation', 'Graz', 'Battle_of_Uhud', 'Hatfield–McCoy_feud', 'Kabir', 'Pederasty_in_ancient_Greece', 'The_Departed', 'Poisson_distribution', 'Jean-Paul_Marat', 'Rush_Hour_(1998_film)', 'Card_game', 'SpaceX', 'Virgil', 'Acre,_Israel', 'Alabaster', 'Lebensraum', 'Zack_Snyder\'s_Justice_League', 'Falangism', 'Order_of_the_Garter', 'Iron_Curtain', 'European_theatre_of_World_War_II', 'On_the_Origin_of_Species', 'Mike_Pence', 'Dream', 'Tom_and_Jerry', 'Monarchy', 'Magic_Johnson', 'Ascension_Island', 'Isis', 'Zaragoza', 'United_States_presidential_line_of_succession', 'Nick_Offerman', 'Kevin_Hart', 'Cloverfield', 'Johnson_&_Johnson_COVID-19_vaccine', 'Tiger', 'China', 'Steve_Martin', 'Parasite_(2019_film)', 'Mayotte', 'DuPont', 'Muhammad\'s_wives', 'FIFA_World_Cup', 'Sustainability', 'Saladin', 'Maple', 'List_of_wars_by_death_toll', 'History_of_music', 'Hermeticism', 'Ifrit', 'Konstantin_Chernenko', 'Warsaw_Pact', 'Will.i.am', 'Adi_Shankara', 'Cardinal_direction', 'Fullmetal_Alchemist:_Brotherhood', 'Sinhala_language', 'Kriegsmarine', 'RoboCop', 'Kakori_conspiracy', 'Ryan_Reynolds', 'The_Starry_Night', 'Kenneth_Branagh', 'Date_Masamune', 'Hejaz', 'Nestor_Makhno', 'James_Gunn', 'Sea', 'Operation_Valkyrie', 'Seven_deadly_sins', 'Delphi_method', 'Ferdinand_de_Saussure', 'Ayyubid_dynasty', 'Romania', 'New_Thought', 'John_Wilkes_Booth', 'Religion', 'Milgram_experiment', 'J-Hope', 'The_Daily_Telegraph', '2020_Summer_Olympics', 'Henry_II_of_England', 'Dubai', 'Life_imprisonment', 'Yule_log_(cake)', 'John_Cleese', 'Linear_A', 'Mr._Potato_Head', 'Clemson_University', 'Hanging', 'Ludwig_van_Beethoven', 'Komodo_dragon', 'Altaic_languages', 'Rio_de_Janeiro', 'Mecklenburg-Vorpommern', 'School', 'Utopia', 'Anna_of_Russia', 'Marc_Chagall', 'Field_marshal', 'Seven_(1995_film)', 'Morse_code', 'Deng_Xiaoping', 'Egyptian_pyramids', 'Climate_change', 'Hymen', 'South_Georgia_and_the_South_Sandwich_Islands', 'Ulster', 'Hades', 'Nigeria', 'Khmer_Empire', 'Crisis_of_the_Third_Century', 'John_Brown_(abolitionist)', 'Lutheranism', 'Holodomor', 'Economic_growth', 'Google_Docs', 'The_Big_Bang_Theory', 'Diana,_Princess_of_Wales', 'List_of_Roman_emperors', 'Amir_Khusrau', 'First_Mass_in_the_Philippines', 'Richard_III_of_England', 'Indus_Valley_Civilisation', 'February_Revolution', 'Tragedy_of_the_commons', 'Watchmen', 'Nutritional_yeast', 'Stanford_University', 'CD-ROM', 'Denmark', 'Alps', 'Layne_Staley', 'NATO', 'Dialectical_materialism', 'Cole_Sprouse', 'Dagestan', 'Applied_behavior_analysis', 'Ethiopian_Empire', 'Victor_Hugo', 'Melinda_French_Gates', 'Rita_Hayworth', 'ICC_Men\'s_T20_World_Cup', 'French_campaign_in_Egypt_and_Syria', 'Sikh_Empire', 'La_Liga', 'Abdication_of_Edward_VIII', 'Sponge', 'Gilles_de_Rais', 'Helios', 'Hanging_Gardens_of_Babylon', 'R.E.M.', 'Wembley_Stadium_(1923)', 'Oscar_Isaac', 'Chinese_surname', 'Parole', 'Marvel_Comics', 'Austrian_School', 'Empire_State_Building', 'Forbidden_Planet', 'Mesopotamia', 'Nathan_Drake_(Uncharted)', 'St._Moritz', 'Edirne', 'West_Virginia', 'The_Tudors', 'Julius_Caesar_(play)', 'Belgium', 'Tetrahydrocannabinol', 'Nazi_Party', 'A', 'James_Longstreet', 'Persian_Gulf', 'List_of_Netflix_original_programming', 'Vulgate', 'Religion_in_Japan', 'Tyre,_Lebanon', 'North_by_Northwest', 'Crab', 'Bing_Crosby', 'Neil_Armstrong', 'Hair', 'Champurrado', 'Roger_Ailes', 'Gospel_music', 'Companions_of_Saint_Nicholas', 'Joseph_Haydn', 'Hu_Yaobang', 'Disney+', 'Laura_Prepon', 'Divine_Comedy', 'Psychosis', 'Uthman', 'Argentina', 'List_of_SS_personnel', 'Lyndon_B._Johnson', 'Nuremberg', 'Inglourious_Basterds', 'John_C._Frémont', 'Soul', 'Circe', 'Manny_Pacquiao', 'The_Mummy_(1999_film)', 'Nicole_Richie', 'Saxons', 'Hebrew_Bible', 'Ranulph_Fiennes', 'Earth', 'Jim_Carrey', 'British_Union_of_Fascists', 'Arianism', 'Information_Age', 'March_8', 'Belief', 'Turkish_War_of_Independence', 'George_I_of_Greece', 'How_to_Get_Away_with_Murder', 'Joss_Whedon', 'Temple_Mount', 'Myanmar', 'International_Labour_Organization', 'Bhikaiji_Cama', 'Chamorro_people', 'Emancipation_Proclamation', 'Calvinism', 'Cameron_Diaz', 'Absolute_monarchy', 'Singing', 'Zakat', 'New_York_City', 'Communist_Party_of_India_(Marxist)', 'Kandahar', 'Ancient_Carthage', 'Mars', 'Mahayana', 'Aryan', 'Wilhelm_Reich', 'Eugenics', 'Dmitri_Shostakovich', 'Liver', 'The_Taming_of_the_Shrew', 'Calypso_(mythology)', 'George_VI', 'Inception', 'Hans_Zimmer', 'Margaret_of_Anjou', 'Prithviraj_Kapoor', 'Persepolis', 'Linguistic_relativity', 'Benin_City', 'Selma_Blair', 'Rashidun_Caliphate', 'Bogeyman', 'Race_and_intelligence', 'Intimate_relationship', 'House_of_Romanov', 'Jonah_Hill', 'List_of_James_Bond_films', 'Channel_One_Russia', 'Scrotum', 'List_of_Roman_deities', 'Habsburg_Spain', 'Brandon_Lee', 'Universalism', 'William_Penn', 'Alice_Cooper', 'Mexico', 'October_Revolution', 'Tree', 'Oxygen', 'Führerbunker', 'Once_Upon_a_Time_in_America', 'Levant', 'Honoré_de_Balzac', 'Pound_sterling', 'Monosodium_glutamate', 'Alexander_von_Humboldt', 'Plutarch', 'Bloemfontein', 'Water', 'Errol_Flynn', 'Martin_Freeman', 'Journey_(band)', 'Sun_Yat-sen', 'Jesse_Eisenberg', 'Accelerationism', 'Slovenia', 'International_Standard_Book_Number', 'Leviathan', 'League_of_Nations', 'Janet_Leigh', 'Sappho', 'Burning_bush', 'Zhejiang', 'Rutherford_B._Hayes', 'Max_Stirner', 'Once_Upon_a_Time_(TV_series)', 'Kublai_Khan', 'Francis_of_Assisi', 'Hermeneutics', 'List_of_Catholic_saints', 'Plantar_fasciitis', 'Joseph_Stalin', 'Eugene_V._Debs', 'Lou_Reed', 'Diarrhea', 'Hannibal_Lecter', 'Evolution', 'Sayyid', 'Peter_Davison', 'Insect', 'Peter_Jackson', 'Mineral', 'Mithraism', 'Classical_Greece', 'Karl_Marx', 'Tiffany_Haddish', 'Shakespeare\'s_Globe', 'Bodhisattva', 'Psychopathy', 'Eastern_Time_Zone', 'Saint_Stephen\'s_Day', 'The_Undertaker', 'Jean-Paul_Sartre', 'Meat', 'Kim_Jong-un', 'Thomas_Wolsey', 'List_of_best-selling_music_artists', 'Mohammad_Reza_Pahlavi', 'John_Everett_Millais', 'Inferno_(Dante)', 'Bristol', 'Analytic_philosophy', 'Paradise_Lost', 'Cornel_West', 'Lancashire', 'Erik_Erikson', 'Paper', 'Malta', 'Muhammad', 'Omar_Sy', 'Pope_Leo_XIII', 'Missouri', 'Unit_731', 'Batman_in_film', 'Power_Rangers', 'Kyiv', 'Taiwan', 'Syd_Barrett', 'B._R._Ambedkar', 'Barabbas', 'Prince_Henry,_Duke_of_Gloucester', 'International_Red_Cross_and_Red_Crescent_Movement', 'List_of_governors_of_New_York', 'Lucrezia_Borgia', 'James_the_Great', 'Ambrose', 'Cognitive_science', 'Republic_of_Ireland', 'Bella_ciao', 'State_of_emergency', 'Nostradamus', 'Rationalism', 'Problem_of_evil', 'Abraham_in_Islam', 'John_Adams', 'Maldives', 'Surveying', 'Elsa_Pataky', 'Motivation', 'Hentai', 'Mithali_Raj', 'Motion', 'Technocracy', 'Intelligence', 'James_Francis_Edward_Stuart', 'Discovery_Channel', 'Peter_Tosh', 'Spiro_Agnew', 'Fall_of_Constantinople', 'David_Spade', 'Curb_Your_Enthusiasm', 'Sevastopol', 'Indian_independence_movement', 'Atmospheric_pressure', 'Traudl_Junge', 'Death_of_Brian_Sicknick', 'Anders_Behring_Breivik', 'Georgy_Zhukov', 'Continental_philosophy', 'Seth_Green', 'Agar', 'Mosque', 'Iran', 'Buchenwald_concentration_camp', 'Jimmy_Kimmel', 'Albanians', 'Cartography', 'J._R._R._Tolkien', 'Babylonia', 'Islam_in_China', 'Liège', 'Marx\'s_theory_of_alienation', 'Max_Planck', 'New_Age', 'United_Kingdom_of_the_Netherlands', 'Lisa_Murkowski', 'Lost_(TV_series)', 'Sade_(singer)', 'Kishore_Kumar', 'Ilham_Aliyev', 'Badshahi_Mosque', 'Xylophone', 'Nicaragua', 'Mermaid', 'Musical_note', 'Hiroshima', 'Boris_Johnson', 'Malaysia_Airlines_Flight_370', 'Money_Heist', 'Chinese_mythology', 'Sasanian_Empire', 'Stepan_Bandera', 'Annexation_of_Tibet_by_the_People\'s_Republic_of_China', 'Ten_Lost_Tribes', 'Ray_Charles', 'Semen', 'Alexis_de_Tocqueville', 'Ares', 'Johnny_Carson', 'Brooke_Shields', 'Scott_Joplin', 'Google_Forms', 'Howard_Stern', 'Diana_Rigg', 'Anno_Domini', 'Madan_Mohan_Malaviya', 'Traditional_African_religions', 'Adolf_Hitler\'s_rise_to_power', 'Paris_Hilton', 'Wuxing_(Chinese_philosophy)', 'Berlin_Blockade', 'Final_Fantasy', 'Temptation_of_Christ', 'Fringe_(TV_series)', 'Pearl_Harbor', 'Warwick_Davis', 'Brie_Larson', 'Romeo_and_Juliet_(1968_film)', 'Margaux_Hemingway', '24_(TV_series)', 'State_College,_Pennsylvania', 'Civilization', 'Gene', 'Georg_Wilhelm_Friedrich_Hegel', 'Peru', 'Haakon_VII_of_Norway', 'Sudetenland', 'Michelangelo', 'Jean_Piaget', 'Democratic-Republican_Party', 'Peloponnesian_War', 'MF_Doom', 'General_Secretary_of_the_Communist_Party_of_the_Soviet_Union', 'Shreya_Ghoshal', 'Lute', 'House_of_Medici', 'Pornography', 'Temple_in_Jerusalem', 'Rain_Man', 'Wu_Zetian', 'Easter_Island', 'Kyoto', 'Sun_Tzu', 'Reptile', 'Keeping_Up_with_the_Kardashians', 'Yosemite_National_Park', 'Cheka', 'Eli_Cohen', 'Kohl_(cosmetics)', 'Dr._Seuss', 'Christina_Aguilera', 'Dennis_Rodman', 'Zeus', 'Jordan_River', 'Christian_eschatology', 'Philistines', 'Indigenous_languages_of_the_Americas', 'Scorpio_(astrology)', 'List_of_cognitive_biases', 'Mnemonic', 'Hindus', 'Philip_V_of_Spain', 'Uranus', 'English_Channel', 'Nick_Land', 'Corporatism', 'Canadian_Broadcasting_Corporation', 'John_Foster_Dulles', 'Harold_Macmillan', 'The_Carpenters', 'Indiana_Jones', 'Creativity', 'Satellite', 'Composer', 'Pepi_I_Meryre', 'Melchizedek', 'Kingdom_of_Hungary', 'Historically_black_colleges_and_universities', 'Veni,_vidi,_vici', 'List_of_most-followed_TikTok_accounts', 'Vertebrate', 'Kozhikode', 'Guinea_(coin)', 'Vin_Diesel', 'United_States_Capitol', 'Social_group', 'Maharashtra', 'Bon_Jovi', 'GitHub', 'Sara_Ali_Khan', 'Nativity_scene', 'Finnish_language', 'Eric_Clapton', 'Edom', 'Tori_Amos', 'Andrew_Cuomo', 'Partition_of_India', 'New_Testament', 'Kate_Winslet', 'Helen_Hunt', 'Sinai_Peninsula', 'Phoney_War', 'Sutton_Hoo', 'Mickey_Mouse', 'Kevin_O\'Leary', 'Velvet_Revolution', 'Wales', 'Toy_Story_4', 'Cory_Booker', 'Vivisection', 'To_Kill_a_Mockingbird', 'Percy_Bysshe_Shelley', 'Rights', 'U2', 'Population_decline', 'Jennifer_Connelly', 'Civilization_VI', 'Christopher_Hitchens', 'Semantics', 'River_delta', 'Phil_Chisnall', 'Mark_Rothko', 'Robert_F._Kennedy', 'Boil', 'Munich', 'Flag', 'Ludwig_Wittgenstein', 'Cattle', 'David_Hume', 'National_Basketball_Association_Christmas_games', 'Cnut', 'Continental_Army', 'Parsis', 'Thomas_Edison', 'General_of_the_Armies', 'HuffPost', 'Resurrection_of_Jesus', 'Benin', 'Hippie', 'Congo_Crisis', 'Maharishi_Mahesh_Yogi', 'Angela_Lansbury', 'Supreme_Court_of_India', 'Public_domain', 'Mausoleum', 'Dave_Allen_(comedian)', 'Marilyn_Manson', 'Bacteria', 'James,_Viscount_Severn', 'Kensington_Palace', 'Belarus', 'Paris', 'Coretta_Scott_King', 'Tom_Hardy', 'Chemical_bond', 'Rajesh_Khanna', 'Michael_Gambon', 'Sistine_Chapel', 'M1_Abrams', 'Stuttering', 'Mauritius', 'Assassination_of_John_F._Kennedy', 'Jodie_Foster', 'Bhagat_Singh', 'Ancient_Greek_philosophy', 'Fantastic_Beasts_and_Where_to_Find_Them_(film)', 'Władysław_Szpilman', 'King_Crimson', 'Mollusca', 'Xi\'an', 'Christmas_controversies', 'Elvis_Presley', 'Function_(mathematics)', 'Pub', 'Emoji', 'Gladiator_(2000_film)', 'Sumatra', 'Yahwism', 'Wojciech_Jaruzelski', 'Kidney_stone_disease', 'Michael_Palin', 'Poles', 'Virtual_private_network', 'RuPaul\'s_Drag_Race', 'Cardinal_Richelieu', 'Anupam_Kher', 'Jodhaa_Akbar', 'Bayonetta', 'Crusades', 'Photography', 'Russian_Soviet_Federative_Socialist_Republic', 'Biochemistry', 'Halifax,_Nova_Scotia', 'Doctor_of_Philosophy', 'First_Nations', 'Loki', 'Michael_Sam', 'Knowledge', 'Ashoka_Chakra', 'Spotlight_(film)', 'Wuthering_Heights', 'Laika', 'Oxford_English_Dictionary', 'Socialism', 'Nicholas_Nickleby', 'William_IV', 'Panettone', 'The_Scream', 'Iceland', 'Indigenous_peoples_of_the_Americas', 'Managerial_economics', 'Pescetarianism', 'Isaac', 'Berbers', 'OSI_model', 'Chinese_language', 'Parliament_of_England', 'Vernon_Jordan', 'Mindanao', 'Specials_(Unicode_block)', 'Beatification', 'Jehovah\'s_Witnesses', 'Jammu_and_Kashmir_(princely_state)', 'Kombucha', 'Final_Solution', '100_Greatest_Britons', 'Pilgrims_(Plymouth_Colony)', 'Badrinath', 'Narmada_River', 'Date_of_birth_of_Jesus', 'Early_Middle_Ages', 'Lockheed_Martin_F-22_Raptor', 'Sharad_Pawar', 'Kiss_Me,_Kate', 'Esoteric_Nazism', 'Benelux', '1860_United_States_presidential_election', 'United_States_Electoral_College', 'Kashrut', 'Computer', 'Anarcho-syndicalism', 'Pogrom', 'Mono_no_aware', 'Pillars_of_Ashoka', 'Sigismund,_Holy_Roman_Emperor', 'William_Wallace_Lincoln', 'As-salamu_alaykum', 'Anne_Frank', 'Constantinople', 'War_elephant', 'American_Revolution', 'Dax_Shepard', 'Ignatius_of_Loyola', 'Sociology', 'Museum', 'Indo-Pakistani_War_of_1947–1948', 'West_Africa', 'Cologne', 'Turing_test', 'Trail_of_Tears', 'Requiem_for_a_Dream', 'Dowry', 'Dakota_War_of_1862', 'Albert,_Prince_Consort', 'Albert_II,_Prince_of_Monaco', 'Islam_in_Russia', 'Horse', 'Machu_Picchu', 'The_Sound_of_Music_(film)', 'The_Song_of_Achilles', 'Mila_Kunis', '1948_Arab–Israeli_War', 'Mickey_Rooney', 'Ankh', 'Secret_Intelligence_Service', 'Meerut', 'Spanish_colonization_of_the_Americas', 'Jacques-Louis_David', 'Grimes_(musician)', 'Beatitudes', 'Louis_XVII', 'Anxiety', 'Syllogism', 'The_Story_of_My_Experiments_with_Truth', 'Armenian_Apostolic_Church', '1872_United_States_presidential_election', 'Lincoln_(film)', 'Exploding_head_syndrome', 'Children\'s_literature', 'Nanjing', 'Bachelor_of_Laws', 'Manga', 'Bass_guitar', 'Human_penis_size', 'Serfdom_in_Russia', 'Treaty_on_the_Non-Proliferation_of_Nuclear_Weapons', 'Pomodoro_Technique', 'Brown_bear', 'Book_of_Mormon', 'Obelisk', 'List_of_chancellors_of_Germany', 'Hafez', 'Medina', 'Sampling_(signal_processing)', 'Ravensbrück_concentration_camp', 'Allen_Iverson', 'Health', 'Daniel_Inouye', 'Ben_Stiller', 'O._J._Simpson', 'History_of_slavery', 'Seven_Archangels', 'Ratatouille_(film)', 'Chinese_name', 'Order_of_Merit', 'Joe_Biden_sexual_assault_allegation', 'William_Westmoreland', 'Desi_Arnaz', 'Domitian', 'Twitter', 'List_of_Christmas_dishes', 'Mary_Tudor,_Queen_of_France', 'Winter_War', 'Ashton_Kutcher', 'The_Legend_of_Zelda', 'Gabriel', 'Marvin_Gaye', 'Aaron', 'Email', 'Jahandar_Shah', 'Catherine_Parr', 'Pargalı_Ibrahim_Pasha', 'Hispania', 'Christopher_Reeve', 'Salt_March', 'Gary_Cooper', 'Liberty', 'Jurassic_Park_(film)', 'Chemical_compound', 'Bishop', 'Governor_of_New_York', 'Siege_of_Yorktown', 'Diverticulitis', 'History_of_Christianity', 'Shinto', '69_(sex_position)', 'Eunice_Kennedy_Shriver', 'Greek_Orthodox_Church', 'Bipin_Chandra_Pal', 'Fallacy', 'Thomas_Hobbes', 'Denmark–Norway', 'Endometriosis', 'Marion_Cotillard', 'Axolotl', 'George_H._W._Bush', 'Stephen_Curry', 'Queen_Elizabeth_The_Queen_Mother', 'The_Favourite', 'Edge_of_Tomorrow', 'Rhodes_piano', 'Obesity', 'Vein', 'Anastasia_(1997_film)', 'Masturbation', 'Fasting', 'Eos', 'Venus', 'Louis_Alphonse_de_Bourbon', 'Apathy', 'Sudden_arrhythmic_death_syndrome', 'Kevin_Kline', 'Captain_America', 'Red_Guards', 'Plant', 'Kingdom_(manga)', 'In_Cold_Blood', 'Dacha', 'Electric_motor', 'Caste', 'Lot\'s_wife', 'Gastroenteritis', 'Serie_A', 'Barbiturate', 'James_II_of_England', 'Roman_salute', 'Napoleonic_Wars', 'Affluenza', 'Film', 'Pope_Alexander_VI', 'Nazi_Germany', 'Christian_angelology', 'Isfahan', 'Mecca', 'Game_of_Thrones', 'The_Americans', 'Frankfurt', 'Toussaint_Louverture', 'Constantine_the_Great_and_Christianity', 'List_of_female_billionaires', 'Gupta_Empire', 'Falsifiability', 'Robert_Wagner', 'Oriental_Orthodox_Churches', 'Apocalypse_Now', 'The_Beast_(Revelation)', 'Inferiority_complex', 'Guitar', 'Milk', 'Generation_X', 'Android_(operating_system)', 'Metaphysics', 'Eurovision_Song_Contest', 'University_of_Exeter', 'Video_game', 'Old_age', 'Theodoric_the_Great', 'Biblical_canon', 'The_Death_of_Marat', 'Eleusinian_Mysteries', 'Anthroposophy', 'Rooney_Mara', 'Board_game', 'Allies_of_World_War_II', 'Hellenistic_period', 'Demonology', 'Medication', 'Virgin_Islands', 'Alexander_II_of_Russia', 'United_States_Attorney_General', 'Thrace', 'Thabo_Mbeki', 'Emanuel_Swedenborg', 'Frank_Abagnale', 'Washington_Monument', 'Carl_Linnaeus', 'Dynamics_(music)', 'Hasmonean_dynasty', 'Medea', 'Pennsylvania', 'Veganism', 'Blockchain', 'Europe', 'Platypus', 'Persuasion_(novel)', 'Hannibal_(2001_film)', 'Judy_Garland', 'Dirty_War', 'Germans', 'Enver_Hoxha', 'All-India_Muslim_League', 'Ancient_Greek', 'Social_liberalism', 'Justice', 'Justin_Hartley', 'Unification_of_Italy', 'Cryptography', 'Wonder_Woman_(2017_film)', 'History_of_Japan', 'Near_East', 'Charles_V_of_France', 'Lil_Nas_X', 'Tansen', 'House_of_Bonaparte', 'Quince', 'Delhi', 'Yang_Guifei', 'Holy_Lance', 'Macbeth,_King_of_Scotland', 'Billy_Idol', 'Poverty', 'The_Princess_Bride_(film)', 'Julia_the_Elder', 'Rocky', 'Borobudur', 'Starbucks', 'Epic_poetry', 'And_Then_There_Were_None', 'Survivor_(American_TV_series)', 'Romeo_and_Juliet', 'Communist_Party_of_Germany', 'English_Wikipedia', 'Edward_VI', 'Sinterklaas', 'Meaning_of_life', 'Gisele_Bündchen', 'Ant-Man_(film)', 'Eye', 'Folk_music', 'Spanish_Empire', 'Dassault_Rafale', 'Hallucination', 'Army_ranks_and_insignia_of_India', 'Unconscious_mind', 'French_Third_Republic', 'Angela_Merkel', 'Karnak', 'Wladimir_Klitschko', 'Fra_Angelico', 'McKayla_Maroney', 'Trinity_College_Dublin', 'Aisha', 'Katie_Couric', 'Black_Mirror', 'Pope_Leo_X', 'Henry_III_of_England', 'Cello', 'Agnosticism', 'Adolescence', 'Meningitis', 'Yul_Brynner', 'Henry_IV_of_France', 'Bursa', 'Olympic_Games', 'Christkind', 'Pig', 'Henrietta_Lacks', 'Romani_people', 'Woodrow_Wilson', 'Dardanelles', 'Carthage', 'Arctic', 'Shah_Jahan', '4X', 'Globalization', 'Cicero', 'Bertolt_Brecht', 'Division_(military)', 'Prussia', 'Bay_of_Pigs_Invasion', 'River_Thames', 'Kingdom_of_France', 'Names_of_God', 'German_Shepherd', 'Wax', 'Alanis_Morissette', 'UNICEF', 'Edward_the_Elder', 'Mongol_Empire', 'Caribbean', 'Solitary_confinement', 'Harmonica', 'Taxila', 'The_Hollywood_Reporter', 'The_Church_of_Jesus_Christ_of_Latter-day_Saints', 'Muhammad_in_Islam', 'Surrey', 'Primate', 'Child_marriage', 'Marco_Pierre_White', 'Roanoke_Colony', 'Roman_Britain', 'Glasnost', 'Ghaznavids', 'Earl_of_Leicester', 'Queens', 'Bloody_Sunday_(1905)', 'Sandra_Bullock', 'Führer', 'History_of_art', 'Don_Rickles', '300_(film)', 'Reality', 'Aztecs', 'Jiang_Qing', 'Coptic_Orthodox_Church', 'LGBT_in_Islam', '2000_United_States_presidential_election', 'Egypt', 'Jannah', 'Andrew_Carnegie', 'List_of_Star_Wars_films', 'Vedanta', 'The_Devil_Wears_Prada_(film)', 'Morgan_Freeman', 'Democratic_Republic_of_the_Congo', 'Advent', 'Confucianism', 'First_French_Empire', 'South_China_Sea', 'Complex_number', 'Two_and_a_Half_Men', 'Irish_people', 'David_Dobrik', 'Bart_D._Ehrman', 'Circumcision', 'Golden_Retriever', 'Bosniaks', 'Betty_Ford', 'Contract_killing', 'Mark_Wahlberg', 'Walther_von_Brauchitsch', 'Dyatlov_Pass_incident', 'List_of_epidemics', 'Rheal_Cormier', 'Proposition', 'Causes_of_World_War_II', 'Rule_34', 'Limestone', 'Osama_bin_Laden', 'Polytetrafluoroethylene', 'Toulouse', 'Colony_of_Virginia', 'Salman_Rushdie', 'Greg_Abbott', 'Translation', 'Importance_of_religion_by_country', 'Rain_(entertainer)', 'Church_Fathers', 'Structuralism', 'Robert_Pattinson', 'Incel', 'Pus', 'Library_of_Alexandria', 'Paracetamol', 'Iambic_pentameter', '8chan', 'Harpocrates', 'Will_Ferrell', 'Caesar_cipher', 'Maria_Montessori', 'Battle_of_Plataea', 'Human_trafficking', 'Proton', 'Energy', 'The_Ten_Commandments_(1956_film)', 'HTTP_cookie', 'IQ_classification', 'Pliny_the_Elder', 'Kobe_Bryant', 'Brooklyn', 'The_Voice_(American_TV_series)', 'Lexington,_Kentucky', 'The_Many_Saints_of_Newark', 'PlayStation_4', 'Boston_Massacre', 'Psoriasis', 'Vasa_(ship)', 'Umayyad_Caliphate', 'Shakespeare_in_Love', 'Logan_Paul', 'Liu_Shaoqi', 'Abraham_Maslow', 'Aether_(classical_element)', 'George_Lincoln_Rockwell', 'Memphis_Pyramid', 'Good_Times', 'Black_hole', 'Invictus_(film)', 'Christmas_gift', 'Nirvana', 'Iroquois', 'Unicode', 'Schleswig-Holstein', 'Yes,_Virginia,_there_is_a_Santa_Claus', 'Maize', 'Serbia', 'Child_labour', 'Don_Quixote', 'Wedding_anniversary', 'Microsoft_Excel', 'Drinking_water', 'Desert', 'Tokugawa_Ieyasu', 'Calligraphy', 'Broadcasting', 'The_Rape_of_the_Lock', 'Chuck_Schumer', 'Song_of_the_South', 'Mayim_Bialik', 'Tenerife', 'Latter_Day_Saint_movement', 'Aesop\'s_Fables', 'Statutory_rape', 'Mount_Everest', 'Hypnosis', 'Heinrich_Himmler', 'Lawyer', 'The_Pilgrim\'s_Progress', 'Red_Sea', 'Vyacheslav_Molotov', 'John_Marshall', 'Stan_Laurel', 'Sarah', 'Sean_Combs', 'Usury', 'Genghis_Khan', 'Gunpowder', 'Clock', 'Edgar_the_Peaceful', 'White_Christmas_(weather)', 'Cancel_culture', 'World_Bank', 'Kill_Bill:_Volume_1', 'Romanian_Revolution', 'Planet', 'Western_(genre)', 'Mary_in_Islam', 'Harold_Godwinson', 'Yuan_dynasty', 'Lily_Tomlin', 'Rajasthan', 'World_Wide_Web', 'Louis_Farrakhan', 'Vegetable', 'Aconitum', 'Cinnamon', 'Epiphany_(holiday)', 'Iliad', 'Critical_theory', 'South_Korea', 'Manna', 'Kalinga_War', 'Federalism', 'Second_Temple', 'British_America', 'Case_study', 'Tramadol', 'State_(polity)', 'Dwarka', 'Rubicon', 'United_States_Senate', 'Great_Purge', 'Jamaica', 'Louis_XV', 'Ecumenism', 'Islam_by_country', 'Pharisees', 'Arthritis', 'Bodh_Gaya', 'Pantheon,_Rome', 'Boolean_algebra', 'Newfoundland_and_Labrador', 'Srinivasa_Ramanujan', 'Georgians', 'Joseph_James_DeAngelo', 'Alprazolam', 'French_Guiana', 'National_Basketball_Association', 'Vasco_da_Gama', 'East_Germany', 'Eagles_(band)', 'Ashfaqulla_Khan', 'Harrison_Ford', 'Religion_in_Egypt', 'Bernardo_Bertolucci', 'Ozzy_Osbourne', 'Bilbao', 'Cuban_Missile_Crisis', 'Meta', 'Edinson_Cavani', 'List_of_presidents_of_the_Indian_National_Congress', 'History_of_smallpox', 'Southern_Ocean', 'Kristin_Chenoweth', 'Grover_Cleveland', 'Hugh_Grant', 'South_America', 'Maxim_Gorky', 'Robert_Schumann', 'Yaksha', 'Chandragupta_Maurya', 'Jurisprudence', 'Galba', 'Joy_Division', 'Parliamentary_republic', 'Polish_language', 'Eric_Stonestreet', 'Family', 'Kana', 'Fentanyl', 'Rush_(band)', 'Deep_Purple', 'John_Wycliffe', 'Xinjiang', 'Diego_Velázquez', 'Roman_Senate', 'O._J._Simpson_murder_case', 'Great_man_theory', 'Father\'s_Day', 'Suzerainty', 'Mongolia', 'Shrimp', 'Yalta_Conference', 'James_IV_of_Scotland', 'John_Bonham', 'Elle_Fanning', 'Dutch_East_Indies', 'Goryeo', 'Sex_Pistols', 'Magda_Goebbels', 'Limit_(mathematics)', 'Suriname', 'Second_Vatican_Council', 'Chakravartin_Ashoka_Samrat', 'Humphrey_Bogart', 'Kharkiv', 'Jenni_Rivera', 'Old_Norse', 'Ursula_K._Le_Guin', 'Kings_of_Leon', 'Gospel_of_John', 'Ishwar_Chandra_Vidyasagar', 'Auschwitz_concentration_camp', 'Jesus_in_Christianity', 'Low_Countries', 'Kingdom_of_Kush', 'Chechnya', 'Tidal_locking', 'Pat_Summitt', 'Dynasty', 'Olivia_Wilde', 'Chris_Rock', 'Hendrik_Verwoerd', 'Hawaii_(island)', 'Theatre', 'Jon_Voight', 'Gentile', 'Selena_Gomez', 'Canada', 'Homicide', 'Kurds', 'Comfort_women', 'Sack_of_Rome_(1527)', 'Outer_space', 'Disembowelment', 'Eighty_Years\'_War', 'Angel', 'Shia_Islam', 'Noun', 'Laissez-faire', 'Arthashastra', 'Baptists', 'CBS', 'Sacred_Band_of_Thebes', 'Nero', 'Human_behavior', 'Nikola_Jokić', 'Apostles\'_Creed', 'Vajrayana', 'Personality', 'UEFA_Europa_League', 'Tenet_(film)', 'Astral_projection', 'John_Chrysostom', 'Divination', 'Osiris', 'John_Krasinski', 'David_Ben-Gurion', 'Pat_Sajak', 'George_Meade', 'Albany,_New_York', 'Irving_Berlin', 'Banksy', 'Second_Great_Awakening', 'Caesar_(title)', 'Salem_witch_trials', 'Menelaus', 'Empire_of_Brazil', 'Subatomic_particle', 'Sea_otter', 'Censorship', 'Justin_Timberlake', 'Charlotte_of_Mecklenburg-Strelitz', 'Philip_K._Dick', 'Daniel_Craig', 'Crimean_Tatars', 'Russian_alphabet', 'Sidney_Poitier', 'Ukraine', 'Superbad', 'Guardian_angel', 'Battle_of_Tours', 'Buddhahood', 'Chaos_magic', 'Stonewall_Jackson', 'Indian_cuisine', 'Kemalism', 'The_King\'s_Speech', 'Arrow_(TV_series)', 'Nicola_Sturgeon', 'Gone_with_the_Wind_(film)', 'Fleur-de-lis', 'Manchester', 'Internal_combustion_engine', 'Sino-Soviet_border_conflict', 'Norman_Mailer', 'Nazareth', 'World\'s_Strongest_Man', '1911_Revolution', 'Swedish_Empire', 'The_Second_Sex', 'Arthur_Schopenhauer', 'Exo', 'Isabella_I_of_Castile', 'Alexei_Rykov', 'George_Clooney', 'Volkswagen_Group', 'Karachi', 'George_Weah', 'Thomas_Wolfe', 'Snooker', 'Linkin_Park', 'James_Buchanan', 'Battle_of_Salamis', 'Larry_King', 'William_H._Macy', 'Émilie_du_Châtelet', 'Curiosity_killed_the_cat', 'Konya', 'Carrion', 'William_Lyon_Mackenzie_King', 'Mary-Louise_Parker', 'Israel_Adesanya', 'Marquess', 'Humanism', 'Sharia', 'Victorian_era', 'Frankenstein', 'Aurora', 'Angels_in_Islam', 'Arrowverse', 'Calabria', 'Rage_Against_the_Machine', 'Theosophical_Society', 'Kliment_Voroshilov', 'Burj_Khalifa', 'Graça_Machel', 'Lemmy', 'Neurosis', 'Microeconomics', 'Tourism', 'The_Good,_the_Bad_and_the_Ugly', 'List_of_elected_and_appointed_female_heads_of_state_and_government', 'Libya', 'Dick_Cheney', 'Civil_disobedience', 'Behaviorism', 'Venice', 'Supernova', 'Ultimate_Fighting_Championship', 'The_School_of_Athens', 'Reims', 'Educational_psychology', 'Human_nature', 'Algae', 'Diocletian', 'IPad', 'Apollonian_and_Dionysian', 'Ur', 'Charles_III_of_Spain', 'Dauphin_of_France', 'Stephen_Hawking', 'Tamil_language', 'Michael_Jordan', 'State_Emblem_of_India', '2021_in_video_games', 'Israel_Kamakawiwoʻole', 'Verb', 'English_Reformation', 'Presbyterianism', 'Brothers_of_Jesus', 'P._Chidambaram', 'Noah_in_Islam', 'George_Sand', 'Protestantism', 'Shang_dynasty', 'Kate_Hudson', 'Dominion_of_India', 'Second_Coming', 'Amphetamine', 'Mihrimah_Sultan_(daughter_of_Suleiman_I)', 'New_York_Post', 'Caucasus', 'Khadija_bint_Khuwaylid', 'Richard_Pryor', 'Demography', 'Goliath', 'Welfare_state', 'Mitanni', 'Harpo_Productions', 'Anglicanism', 'Year', 'A._C._Bhaktivedanta_Swami_Prabhupada', 'Discrimination', 'Hero_(2002_film)', 'Nutcracker_doll', 'Monk', 'List_of_missing_aircraft', 'Guatemalan_Civil_War', 'Warsaw_Ghetto', 'Ladakh', 'Marshal_of_the_Soviet_Union', 'Snake', 'Thule_Society', 'Eternal_return', 'China_Global_Television_Network', 'Florence_Cathedral', 'Muhammad_Yunus', 'Bob_Newhart', 'Chauvinism', 'Absurdism', 'Córdoba,_Spain', 'UNESCO', 'Petra', 'Ded_Moroz', 'Rock_(geology)', 'Friedrich_Hayek', 'Potemkin_village', 'John_II_of_France', 'Kashmir_conflict', 'Jizya', 'Sun', 'Plymouth_Brethren', 'Pranayama', 'Ingenuity_(helicopter)', 'Great_Britain', 'Polemic', 'Qaboos_bin_Said', 'Jojo_Rabbit', 'Carbon_dioxide', 'Nicolas_Cage', 'Revenue', 'Money_supply', 'Jama_Masjid,_Delhi', 'Byzantine_Empire', 'Leon_Trotsky', 'John_McAfee', 'Frederick,_Prince_of_Wales', 'Pleurisy', 'Sport', 'Tao', 'Bassoon', 'BBC_News', 'Henry_II_of_France', 'Christmas_tree', 'Pfizer–BioNTech_COVID-19_vaccine', 'Sausage', 'John_of_Patmos', 'Muhammad_Iqbal', 'Millie_Bobby_Brown', 'Angela_Bassett', 'Ujjain', 'Ahmedabad', 'Siege_of_Vicksburg', 'European_Union', 'Scotland', 'Mary_of_Teck', 'Robert_Hanssen', 'Integer', 'Penelope', 'Slavic_languages', 'Philip_the_Arab', 'HTTP_404', 'Détente', 'Dark_(TV_series)', 'Dead_Poets_Society', 'Mathematician', 'Steel', 'Bodhidharma', 'Tunisia', 'Reinhold_Messner', 'Grigory_Potemkin', 'The_Handmaid\'s_Tale', 'List_of_countries_by_suicide_rate', 'Waco_siege', 'J._Robert_Oppenheimer', 'Cornish_language', 'Fellow_of_the_Royal_Society_of_Arts', 'Oxycodone', 'Lagos', 'Northwest_Passage', 'Multiple_myeloma', 'Jacques_Derrida', 'Washington,_D.C.', 'Loretta_Lynn', 'White_House', 'Robert_Wadlow', 'Nephilim', 'The_Band', 'Library', 'Sciatica', 'Rosetta_Stone', 'Nikita_Khrushchev', 'Commedia_dell\'arte', 'Cicada', 'Imperial_College_London', 'Buenos_Aires', 'Srivijaya', 'Pizzagate_conspiracy_theory', 'History_of_Islam', 'Peace', 'Immune_system', 'Ran_(film)', 'Accordion', 'Kiss_(band)', 'Septimius_Severus', 'The_Merchant_of_Venice', 'Chicago', 'Prohibition_in_the_United_States', 'Justinian_I', 'Radcliffe_Line', 'Aden', 'Presidencies_and_provinces_of_British_India', 'Catalonia', 'Jericho', 'Bonn', 'Galilee', 'Ready_Player_One_(film)', 'Objectivism', 'Advaita_Vedanta', 'Macroeconomics', 'Catherine_of_Alexandria', 'The_X-Files', 'Carlos_Castaneda', 'Pythagorean_theorem', 'Rosary', 'Larry_David', 'W._Somerset_Maugham', 'The_Big_Lebowski', 'Santería', 'Led_Zeppelin', 'Ming_dynasty', 'Austroasiatic_languages', 'Left-wing_politics', 'History_of_film', 'American_Nazi_Party', 'Political_philosophy', 'Pragmatism', 'FC_Barcelona', 'The_Beatles', 'Optics', 'Binomial_distribution', 'Mathematical_analysis', 'List_of_caliphs', 'Ralph_Fiennes', 'Mel_Brooks', 'Zachary_Taylor', 'Cape_Horn', 'Ghetto', 'Robin_Hood', 'Balearic_Islands', 'Gorakhpur', 'Leukemia', 'Yule_log', 'Infection', 'Anne_Hathaway', 'Beat_Generation', 'Qualia', 'John_Legend', 'Sardinia', 'Rodney_Dangerfield', 'The_Expanse_(TV_series)', 'Robert_E._Lee', 'Bukhara', 'Cephalopod', 'Paul_Williams_(songwriter)', 'Vercingetorix', 'Hagar', 'Christoph_Waltz', 'Yuan_Shikai', 'LGBT', 'Gefilte_fish', 'Alfonso_XIII', 'Pentecostalism', 'BTS', 'Sahih_al-Bukhari', 'Berkshire_Hathaway', 'Mount_Rushmore', 'Saarland', 'Arya_Samaj', 'Aesop', 'Aphasia', 'Texas_A&M_University', 'Construction', 'Malapropism', 'Safavid_Iran', 'Ruth_Bader_Ginsburg', 'North_America', 'Right-wing_politics', 'Romanticism', 'Fahrenheit_451', 'Gran_Colombia', 'Digital_object_identifier', 'Venezuelan_bolívar', 'Beer_Hall_Putsch', 'John_Harvey_Kellogg', 'Ivy_League', 'Chełmno_extermination_camp', 'Plymouth_Colony', 'Republicanism_in_the_United_Kingdom', '2021_ICC_Men\'s_T20_World_Cup', 'Phil_Collins', 'Antisemitic_canard', 'Tufts_University', 'Priyanka_Chopra', 'Kilometre', 'Samurai', 'Pitch_Perfect', 'Honey_bee', 'ICC_World_Test_Championship', 'George_Washington', 'Virginia_Woolf', 'Kylie_Minogue', 'Nigerian_Civil_War', 'Google', 'Oscar_Wilde', 'Jiang_Zemin', 'Oxford_University_Press', 'Backstaff', 'Christopher_Walken', 'Eidetic_memory', 'Soviet–Japanese_War', 'Smoking', 'Neoliberalism', 'Sammy_Davis_Jr.', 'Secession_in_the_United_States', 'Davidic_line', 'Rice', 'Map', 'Michael_Jackson', 'Hip_hop_music', 'Kasturba_Gandhi', '14th_Dalai_Lama', 'Eurofighter_Typhoon', 'Mohanlal', 'Francia', 'Saturn', 'Yom_Kippur_War', 'Bulgarians', 'Holocaust_denial', 'Siberia', 'Maurice_Ravel', 'List_of_prime_ministers_of_India', 'Modern_Family', 'Borat', 'Kardashian_family', 'Trabzon', 'Karl_Popper', 'Herbert_Marcuse', 'Hanja', 'Mansoor_Ali_Khan_Pataudi', 'Tobacco_smoking', 'James_Corden', 'Redneck', 'Louis_XVI', 'Todd_Rundgren', 'Michel_de_Montaigne', 'Triangle_Shirtwaist_Factory_fire', 'Erik_the_Red', 'Punic_Wars', 'Prince_William,_Duke_of_Cambridge', 'Prince_of_Wales', 'Jenna_Dewan', 'Korean_language', 'Gmail', 'Radiocarbon_dating', 'Tim_Allen', 'Virginia', 'Giuseppe_Verdi', 'William_Morris', 'Lion', 'George_II_of_Great_Britain', 'Patrick_Henry', 'Yellow_fever', 'Maria_Ressa', 'Seychelles', 'Aliyah', 'SpaceX_Starship', 'Tim_Berners-Lee', 'Gianni_Schicchi', 'Yeshua', 'Malayan_Emergency', 'Min_(god)', 'Mandaeism', 'Jason_Sudeikis', 'Gold', 'The_Prince_of_Egypt', 'Scarlett_Johansson', 'Inter_Miami_CF', 'Julian_calendar', 'Blue_whale', 'BDSM', 'Jerry_Lewis', 'New_Kingdom_of_Egypt', 'Ram_Dass', 'Mahdi', 'The_Flash_(2014_TV_series)', 'Burt_Reynolds', 'Fossil_fuel', 'Parody', 'Ménière\'s_disease', 'Euthanasia', 'Helmut_Kohl', '1984_United_States_presidential_election', 'Babi_Yar', 'Netflix', 'National_Bolshevism', 'Zoophilia', 'Germ_theory_of_disease', 'Mariel_Hemingway', 'St_George\'s_Chapel,_Windsor_Castle', 'Carrie-Anne_Moss', 'List_of_largest_cities', 'Neologism', 'Henry_Clay', 'Tsunami', 'Umayyad_conquest_of_Hispania', 'Christ_myth_theory', 'Tim_Daly', 'Tiananmen_Square', 'Humayun', 'Gout', 'Abaddon', 'Villain', 'The_Pirate_Bay', 'History_of_India', 'Mongols', 'Szczecin', 'Zamorin', 'Charles_Curtis', 'The_Challenge_(TV_series)', 'Rice_pudding', 'Batman', 'Zhao_Ziyang', 'Napoleon\'s_penis', 'Ellen_Johnson_Sirleaf', 'Jordan_Peele', 'List_of_most_expensive_paintings', 'Debbie_Reynolds', 'Kshatriya', 'World_Economic_Forum', 'Home', 'Magnificat', 'Joachim_von_Ribbentrop', 'Age_of_Enlightenment', 'Gauls', 'Pi', 'Government_of_India_Act_1935', '2020_United_States_presidential_election', 'Bill_Frist', 'Mark_Milley', 'Nostalgia', 'Christian_denomination', 'Shandong', 'Adipose_tissue', 'Princess_Alice_of_the_United_Kingdom', 'Spanish_transition_to_democracy', 'James_Baldwin', 'Hua_Guofeng', 'Pentecost', 'Harold_Harefoot', 'Shema_Yisrael', 'Hermes', 'Lord_Byron', 'Göktürks', 'Prince_(musician)', 'Pornhub', 'Henry_Every', 'Francis_Bacon', 'Nontheism', 'Second_Sino-Japanese_War', 'CNN', 'Bard', 'Fast_&_Furious', 'Tengrism', 'Emu_War', 'Agamemnon', 'Colosseum', 'Ancient_Olympic_Games', 'Cape_Verde', 'Tinnitus', 'Nerva', 'Olaf_Scholz', 'Moon', 'Oasis_(band)', 'Basque_Country_(greater_region)', 'Mars_(mythology)', 'Autocracy', 'Names_and_titles_of_Jesus_in_the_New_Testament', 'Dictatorship', 'Modern_Paganism', 'Platonic_love', 'United_States_Bill_of_Rights', 'Cat', 'Selma_to_Montgomery_marches', 'Constitution_of_the_United_Kingdom', 'Superpower', 'Pose_(TV_series)', 'Alexander_Lukashenko', 'Culture', 'Nazi_human_experimentation', 'Chola_dynasty', 'Jihad', 'Associated_Press', '2019_Indian_general_election', 'Manilal_Gandhi', 'Glorious_Revolution', 'Milton_Friedman', 'Seitan', 'G._K._Chesterton', 'John_Maynard_Keynes', 'Katrina_Kaif', 'Massachusetts', 'Grant_Imahara', 'Peter_the_Great', 'Fran_Drescher', 'Roman_emperor', 'A_Christmas_Carol', 'Giga_Nevada', 'History', '1856_United_States_presidential_election', 'Neoplatonism', 'Concubinage', 'Macbeth', 'Masterpiece', 'Geoffrey_Chaucer', 'Huguenots', 'Economic_inequality', 'MDMA', 'Al_Franken', 'Cirkus_(film)', 'Adrien_Brody', 'Guangxi_Massacre', 'Battle_of_Borodino', 'R._Kelly', 'Catherine_Howard', 'Lent', 'Terracotta', 'Crayfish', 'Stab-in-the-back_myth', 'Coca', 'Darkseid', 'Alan_Greenspan', 'Food', 'Grand_Mosque_seizure', 'Temple_garment', 'Gemini_(astrology)', 'Steven_Spielberg', 'Rosicrucianism', 'Better_Call_Saul', 'Alabama', 'Prisoner_of_war', 'Fact', 'Feminism', 'National_Football_League_Christmas_games', 'Paul_I_of_Russia', 'Cocaine', 'India', 'Eternals_(comics)', 'Ostracism', 'Jesus_in_Islam', 'Pasta', 'British_English', 'Emma_Goldman', 'Birobidzhan', 'Winona_Ryder', 'Climate', 'Belize', 'Facebook', 'Panthéon', 'Ernst_Lubitsch', 'Special_Air_Service', 'Dietrich_Bonhoeffer', 'Şehzade_Mustafa', 'Lovecraft_Country_(TV_series)', 'The_Little_Mermaid_(1989_film)', 'Jack_the_Ripper', 'Firefly_(TV_series)', 'Veliky_Novgorod', 'Quraysh', 'Prince_Michael_of_Kent', 'Benito_Mussolini', 'Rigveda', 'Taika_Waititi', 'Promised_Land', 'Morphine', 'Svetlana_Alliluyeva', 'Erich_Honecker', 'Economy', 'Bobby_Fischer', 'Arabic', 'Robin_Roberts_(newscaster)', 'Oprah_Winfrey', 'Rosa_Luxemburg', 'Crocodile', 'Mary,_Queen_of_Scots', 'The_Godfather_Part_III', 'RM_(rapper)', 'Fairchild_Republic_A-10_Thunderbolt_II', 'Genesis_creation_narrative', 'Mary_II_of_England', 'Raja_Ravi_Varma', 'Carbon', 'Heaven', '2026_FIFA_World_Cup', 'Guy_Pearce', 'Nun', 'Ottoman_dynasty', 'Transubstantiation', 'Phlebotomy', 'Rennie_Davis', 'M*A*S*H_(TV_series)', 'Aaron_Burr', 'Shah_Alam_II', 'John_Jay', 'Ophelia_(2018_film)', 'Old_World', 'Belo_Horizonte', 'Hitler_family', 'Life_expectancy', 'Battle_of_Fredericksburg', 'Murad_IV', 'Capitalism', 'Lucky_Luciano', 'Albania', 'Pirates_of_the_Caribbean_(film_series)', 'Metallurgy', 'Battle_of_Midway', 'British_Raj', 'Finland', 'Emerson,_Lake_&_Palmer', 'Lorenzo_de\'_Medici', 'Romeo_+_Juliet', 'Ravi_Zacharias', 'Elizabeth_Loftus', 'Bucharest', 'Avatar_(2009_film)', 'Christianity_in_Iraq', 'Hedy_Lamarr', 'Père_Noël', 'Mardi_Gras', 'Mindy_Kaling', 'Deepak_Chopra', 'Definition', 'Orson_Welles', 'German_reunification', 'For_All_Mankind_(TV_series)', 'Cindy_Crawford', 'Firearm', 'Romance_languages', 'Mahathir_Mohamad', 'Mona_Lisa', 'Aachen', 'Benjamin_Harrison', 'Bear_Grylls', 'Tom_Hanks', 'John_Milton', 'Scurvy', 'Drawing', 'Synonym', 'Martin_Lawrence', 'American_Horror_Story', 'The_Rumble_in_the_Jungle', 'Pallava_dynasty', 'Gravity', 'Islamic_terrorism', 'One-Punch_Man', 'Mississippi', 'Neem_Karoli_Baba', 'Tibetan_people', 'Robert_Todd_Lincoln_Beckwith', 'Dick_Van_Dyke', 'Major_religious_groups', 'Noble_Eightfold_Path', 'Battle_of_Chickamauga', 'Casablanca_(film)', 'Fethullah_Gülen', 'Cartesian_product', 'Isla_Fisher', 'Tamil_Nadu', 'History_of_mathematics', 'Gottfried_Wilhelm_Leibniz', 'Indigenous_Australians', 'Mahr', 'Protectorate_of_Bohemia_and_Moravia', 'Capital_punishment', 'Richard_B._Spencer', 'IMDb', 'Elizabeth_Montgomery', 'Zodiac_(film)', 'Economy_of_the_United_States', 'Operation_Market_Garden', 'Knights_Templar', 'Bunny_Wailer', 'White_people', 'Jessie_Harlan_Lincoln', 'Cricket_World_Cup', 'Metropolitan_France', 'York_University', 'Manumission', 'James_Cook', '1864_United_States_presidential_election', 'Hoplite', 'Bethlehem', 'Torso', 'Trumpet', 'Treaty_of_Tordesillas', 'Lutz_Graf_Schwerin_von_Krosigk', 'Oasis', 'CARES_Act', 'Blade_(film)', 'Saint_Anne', 'Tiberius', 'Helena_Blavatsky', 'Hindu_Kush', 'Lima', 'Sorbs', 'Prince_Edward,_Earl_of_Wessex', 'Herod_Antipas', 'Bering_Strait', 'Colonialism', 'Princeton,_New_Jersey', 'Libertarianism', 'Charles_II_of_England', 'There\'s_Something_About_Mary', 'Zoroastrianism', 'Russell_Wilson', 'Grateful_Dead', 'Bartholomew_the_Apostle', 'Discordianism', 'Tim_Wu', 'Volleyball', 'Scholarship', 'Pitaya', 'Jacob_Zuma', 'Death_of_James_Cook', 'Moksha', 'Sculpture', 'Sol_Invictus', 'Benedict_Arnold', 'Epic_Rap_Battles_of_History', 'Antarctic_Treaty_System', 'Eddie_Murphy', 'Ho_Chi_Minh', 'J._E._B._Stuart', 'Santosh_Sivan', 'Emperor', 'Virgo_(astrology)', 'Ignatius_of_Antioch', 'Jeremy_Irons', 'Jordana_Brewster', 'Redox', 'Mumbai', 'Timur', 'Mummy', 'Battle_of_Waterloo', 'North_German_Confederation', 'Walter_Gretzky', 'Berlin_Wall', 'Magnus_Carlsen', 'Thierry_Henry', 'Truth_and_Reconciliation_Commission_(South_Africa)', 'Hidradenitis_suppurativa', 'Alexandra_Hedison', 'Cole_Porter', 'Rupert_Everett', 'Chris_Brown', 'Church_of_Scotland', 'SantaCon', 'Headphones', 'Satyr', 'Mitt_Romney', 'René_Descartes', 'Kedarnath_Temple', 'Anthony_of_Padua', 'Manhattan_(1979_film)', 'Death_of_Diana,_Princess_of_Wales', 'Leipzig', 'Pansexuality', 'White_movement', 'Dante_Alighieri', 'Peerage_of_England', 'Republic', 'Twin_Peaks', 'Victor_Emmanuel_III_of_Italy', 'Animism', 'Germanic_paganism', 'Queen_regnant', 'Trojan_Horse', 'DC_Universe_Animated_Original_Movies', 'Evan_Rachel_Wood', 'Republican_People\'s_Party', 'Organic_chemistry', 'United_States_one-dollar_bill', 'Israel', 'False_memory', 'Slavoj_Žižek', 'Louis_C.K.', 'Orisha', 'Find_a_Grave', 'Grand_Duchy_of_Moscow', 'Laverne_Cox', 'Arabian_Peninsula', 'Diphtheria', 'George_Frideric_Handel', 'Microbiology', 'Politics', 'Jamie_Foxx', 'Renminbi', 'Raëlism', 'Forbidden_fruit', 'Mulled_wine', 'Brexit', 'Day_of_Reconciliation', 'Britney_Spears', 'Andrew_Jackson', 'Idris_Elba', 'XY_sex-determination_system', 'Frogmore_Cottage', 'Mayflower', 'Lyre', 'Tesla,_Inc.', 'Eternals_(film)', 'Divine_right_of_kings', 'The_Witcher', 'Paula_Hitler', 'Korea', 'Joseph_II,_Holy_Roman_Emperor', 'Schitt\'s_Creek', 'Bronze', 'David_Attenborough', 'Legend', 'Pawn_Stars', 'Nichiren_Buddhism', 'Madhya_Pradesh', 'Balaam', 'Fallingwater', 'Eckhart_Tolle', 'Moon_Knight', 'Economy_of_India', 'Spanish_conquest_of_the_Aztec_Empire', 'William_Shakespeare', 'HBO_Max', 'F._Scott_Fitzgerald', 'Christmas_in_Russia', 'Glacier', 'Direct_democracy', 'September_11_attacks', 'History_of_the_Jews_in_Russia', 'South_Carolina', 'House_of_Saxe-Coburg_and_Gotha', 'Anarkali', 'The_Tempest', 'Legislative_Council_of_Hong_Kong', 'National_Film_Awards', 'Breadfruit', 'Rocket', 'Boys_Over_Flowers_(TV_series)', 'World\'s_fair', 'Apollo_11', 'Gilded_Age', 'Google_Maps', 'Lucifer', 'Tacitus', 'Rafael_Caro_Quintero', 'Islamic_State_of_Iraq_and_the_Levant', 'Paul_Newman', 'Bill_Paxton', 'Greek_junta', 'Big_Trouble_in_Little_China', 'Astrology_and_the_classical_elements', 'Boredom', 'Albert_Einstein', 'John_Cena', 'Pompey', 'Mamluk_Sultanate', 'Deductive_reasoning', 'Sadhguru', '2020_Formula_One_World_Championship', 'Social_democracy', 'Michel_Foucault', 'Leprechaun', 'Reign_of_Terror', 'Magneto_(Marvel_Comics)', 'President_of_South_Africa', 'One-child_policy', 'Changsha', 'Bird', 'Wentworth_Miller', 'Al-Biruni', 'Navel', 'Duke', 'Henry_VII_of_England', 'Simone_Weil', 'Kingdom_of_Bavaria', 'Charanjit_Singh_Channi', 'James_Spader', 'Yule_goat', 'Ewan_McGregor', 'Spirituality', 'Autobiography', 'Madam_C._J._Walker', 'Ferdinand_I,_Holy_Roman_Emperor', 'Shaquille_O\'Neal', 'Iman_(model)', 'UEFA_Euro_2020', 'Philology', 'Carnelian', 'Varanasi', 'Modena', 'Veneto', 'Nicodemus', 'Guild', 'Düsseldorf', 'Hannibal_Hamlin', 'Moneyball_(film)', 'Fort_Sumter', 'Chief_of_Staff_of_the_United_States_Army', 'Book_of_Revelation', 'Linda_Ronstadt', 'Prince_Louis_of_Cambridge', 'Kosovo', '12_Years_a_Slave_(film)', 'Tuskegee_Syphilis_Study', 'John_Belushi', 'Gaius_Marius', 'Chrissy_Teigen', 'Space', 'Flagellation', 'José_Mourinho', 'Emma_Stone', 'Top_Gun', 'B._F._Skinner', 'Naxalite–Maoist_insurgency', 'Hrithik_Roshan', 'Réunion', 'Mansa_Musa', 'Hispanic', 'Saxony', 'Exorcism', 'Pelican', 'Amnesty_International', 'John_D._Rockefeller', 'Robert_Clive', 'Ankara', 'Shinee', 'The_Go-Go\'s', 'German_Empire', 'Burt_Lancaster', 'Napoleon', 'Francis_Ford_Coppola', 'Caucasian_race', 'Hamnet_Shakespeare', 'Michelle_Obama', 'Furniture', 'Michael_I_of_Romania', 'Western_Australia', 'Pauline_epistles', 'Vaccine', 'Green_Revolution', 'Pen_name', 'Charlie_Chaplin', 'Computer_science', 'Islamic_holidays', 'Prosecutor', 'Cholera', 'Much_Ado_About_Nothing', 'Amun', 'Ukulele', 'Government_of_India', 'Fruit', 'Easter', 'United_States_dollar', 'Davy_Crockett', 'John_Lewis', 'Cara_Delevingne', 'Midwestern_United_States', '1953_Iranian_coup_d\'état', '2016_United_States_presidential_election', 'Calvary', 'Princess_Hours', 'Hybrid_(biology)', 'Falun_Gong', 'Euphrates', 'Communism', 'Self-awareness', 'Television', 'Pat_Morita', 'Bourbon_Restoration_in_France', 'Microsoft_Windows', 'Vince_McMahon', 'Dyslexia', 'KwaZulu-Natal', 'Philip_II_of_Macedon', 'Apulia', 'Mrs._Claus', 'Google_Play', 'Police', 'Khmer_Rouge', 'Seljuk_dynasty', 'Battle_of_Marathon', 'Amerigo_Vespucci', 'Atheism', 'Resonance', 'Donald_Trump', 'Superposition_principle', 'Luis_Suárez', 'Henry_Hudson', 'Anschluss', 'Camelot', 'Labrador_Retriever', 'African_diaspora', 'Eleanor_of_Aquitaine', 'Uttarakhand', 'The_Impossible_(2012_film)', 'Operation_Flavius', 'Sleep_paralysis', 'Arthur_Ashe', 'Yemelyan_Pugachev', 'Niccolò_Machiavelli', 'Rob_Lowe', 'Heresy', 'Individualism', 'Sarah_Silverman', 'United_States_Secretary_of_State', 'Coriolis_force', 'Ragtime', 'University_College_London', 'Lady_Gaga', 'Steve_Nash', 'Conan_O\'Brien', 'Human_evolution', 'Al_Jazeera', 'Anne_Boleyn', 'Guadeloupe', 'Van_Morrison', 'Cougar', 'Saint', 'Avant-garde', 'Ashok_Gehlot', 'Natasha_Lyonne', 'Vallabhbhai_Patel', 'European_Commission', 'Robert_II_of_Scotland', 'Supergirl_(TV_series)', 'Know_thyself', 'Bologna', 'Christmas_decoration', 'Lal_Bahadur_Shastri', 'Hugh_Capet', 'Eastern_Christianity', 'Transfiguration_of_Jesus', 'Simon_Callow', 'Frank_Sinatra', 'Shilling', 'Anarchism', 'Franz_Schubert', 'Consciousness', 'President_of_the_People\'s_Republic_of_China', 'Achaemenid_Empire', 'Rebecca_Romijn', 'Natural_disaster', 'Ron_DeSantis', 'P._V._Narasimha_Rao', 'Solar_System', 'Flood', 'Jupiter', 'History_of_the_Jews_in_Germany', 'Nuremberg_trials', 'Comics', 'Assertiveness', 'The_Runaways', 'List_of_best-selling_manga', 'Sachin_Tendulkar', 'Matthew_the_Apostle', 'Age_of_consent', 'Marketing', 'Ithaca,_New_York', 'University_of_Chicago', 'Percentile', 'Thomas_Aquinas', 'List_of_most-subscribed_YouTube_channels', 'James_Franco', 'The_Intouchables', 'Equal_Rights_Amendment', 'Eunuch', 'Maria_Sharapova', 'Shadow_(psychology)', 'Philosophiæ_Naturalis_Principia_Mathematica', 'Naomi_Watts', 'Peter_Sellers', 'Şehzade_Bayezid', 'Hilary_Swank', 'Kiss_Me_Kate_(film)', 'Sufism', 'Sydney', 'Fate/Grand_Order', 'Yemen', 'Battle_of_France', 'Liberia', 'Operations_research', 'Iblis', 'Gerhard_Schröder', 'Carcinogen', 'University_of_Bologna', 'Treaty_of_Versailles', 'Abolitionism', 'Cerebral_palsy', 'Guanches', 'Ethanol', 'Lot\'s_daughters', 'Herbie_Hancock', 'Cisgender', 'United_States_Secretary_of_the_Treasury', 'Mile', 'Guantanamo_Bay_detention_camp', 'Nigersaurus', 'Welsh_language', 'Amundsen–Scott_South_Pole_Station', 'Legion_(TV_series)', 'Cherokee', 'Cabinet_of_Joe_Biden', 'English_literature', 'The_Wheel_of_Time', 'Shah_Rukh_Khan', 'Righteous_Among_the_Nations', 'Chickpea', 'Jamie_Lee_Curtis', 'Stanford_prison_experiment', 'Reincarnation', 'John_McCain', 'Indiana', 'Nelson_Mandela', 'Malala_Yousafzai', 'Chinese_martial_arts', 'Anime', 'Adaptive_immune_system', 'Old_Believers', 'Book', 'John_Forbes_Nash_Jr.', 'Lithuania', 'Salt', 'The_Beach_Boys', 'Harvard_Law_School', 'Married..._with_Children', 'Vipassanā', 'Berke', 'Catholic_Church', 'Bill_Murray', 'House_of_Stuart', 'Retail', 'Split,_Croatia', 'Queen_Latifah', 'German_Reich', 'Sweden', 'Nick_Fuentes', 'Opium_Wars', 'Rodney_King', 'Language', 'Fidel_Castro', 'Charles_Brandon,_1st_Duke_of_Suffolk', 'Martha_Stewart', 'Head_of_government', 'Grigory_Orlov', '2021', 'Winter_Palace', 'J._Jayalalithaa', 'Barbarian', 'Mental_health', 'National_Park_Service', 'The_Mamas_&_the_Papas', '2010_FIFA_World_Cup', 'Star_Trek:_Picard', 'Management', 'The_Tale_of_Genji', 'Cabinet_of_the_United_States', 'Genetic_engineering', 'Memento_mori', 'Chester_A._Arthur', 'Southeast_Asia', 'Italian_Renaissance', 'Game', 'Florence', 'Crimean_Khanate', 'Brazil', 'Ed_Harris', 'Sam_Worthington', 'Indian_Air_Force', 'Mithun_Chakraborty', 'Chico_Marx', 'Xi_Jinping', 'Bahrain', 'Harry_Styles', 'Otto_Skorzeny', 'Legislature', 'Stock_market', 'Wilt_Chamberlain', 'Gustave_Doré', 'Deus_ex_machina', 'Oswald_Mosley', 'Brahma_Kumaris', 'Lazio', 'Aesthetics', 'Nikola_Tesla', 'Michael_Phelps', 'Louis_Mountbatten,_1st_Earl_Mountbatten_of_Burma', 'Salzburg', 'Nathaniel_Hawthorne', 'Upanishads', 'The_Walking_Dead_(TV_series)', 'David_Thewlis', 'Octavia_E._Butler', 'Count', 'Little_Richard', 'Australia', 'Beirut', 'Irish_Republican_Army', 'Normandy', 'Ahmadiyya', 'Ron_Johnson_(Wisconsin_politician)', 'Entertainment', 'Gerard_Butler', 'Louis_XVIII', 'Oklahoma_City_bombing', 'Iron', 'Sayings_of_Jesus_on_the_cross', 'Amphibian', 'Meteorology', 'Copper', 'Barbados', 'Battle_of_the_Teutoburg_Forest', 'Marcus_Rashford', 'Cain_and_Abel', 'Robert_Plant', 'Jazz', 'Gerd_Müller', 'French_language', 'Xuanzang', 'Allied_invasion_of_Sicily', 'Experience', 'Rail_transport', 'Sheep', 'Groypers', 'Jim_Brown', 'Chinese_room', 'Nazism', 'Parable_of_the_Prodigal_Son', 'Daft_Punk', 'Yazidis', 'Roald_Dahl', 'Aleutian_Islands', 'Anne,_Queen_of_Great_Britain', 'Rabindranath_Tagore', 'Chameleon', 'Historicity_of_Jesus', 'Medulla_oblongata', 'Old_Norse_religion', 'Charles_Cornwallis,_1st_Marquess_Cornwallis', 'Mandy_Patinkin', 'Ozymandias_(Watchmen)', 'First_Turkic_Khaganate', 'Roald_Amundsen', 'Ferdinand_Magellan', 'Barbra_Streisand', 'Sacha_Baron_Cohen', 'Euclid', 'Muhammad_ibn_Musa_al-Khwarizmi', 'Treaty_of_Roskilde', 'Chinese_calendar', 'History_of_the_Philippines_(1565–1898)', 'Bee_Gees', 'Meiji_Restoration', 'Thor_(film)', 'Universal_basic_income', 'Paganism', 'Citizen_Kane', 'Soul_(2020_film)', 'Inter_Milan', 'Hermann_Göring', 'Binding_of_Isaac', 'PewDiePie', 'Senegal', 'Apollo_13', 'Mongol_invasion_of_Europe', 'Sidney_Crosby', 'Joan_Crawford', 'Pain', 'History_of_agriculture', 'Han_dynasty', 'Jeanne_Calment', 'Kenya', 'Linux', 'Badminton', 'John_Keats', 'Survival_of_the_fittest', 'James_Brown', 'Saint_Nicholas_Day', 'Carl_Schmitt', 'Habsburg_Monarchy', 'Appendicitis', 'Frédéric_Chopin', 'Cleopatra', 'Hugh_Hefner', 'Treaty_of_Paris_(1783)', 'Blacksmith', 'Women\'s_History_Month', 'Tottenham_Hotspur_F.C.', 'Victor_Davis_Hanson', 'Robert_Duvall', 'London_School_of_Economics', 'Andrew_the_Apostle', 'Now_You_See_Me_(film)', 'Isaiah', 'Kaliningrad_Oblast', 'Akbar', 'Ellen_G._White', 'The_New_Republic', 'Spirograph', 'Born_again', 'Ice-T', 'Mortal_sin', 'Portuguese_man_o\'_war', 'Violence', 'Keanu_Reeves', 'Sikhism', 'Kanyakumari', 'Time_(magazine)', 'Trainspotting_(film)', 'Fukushima_nuclear_disaster', 'Man_Singh_I', 'Canonization', 'Dawn_Wells', 'Execution_of_Louis_XVI', 'Typewriter', 'Church_of_the_East', 'Classical_mechanics', 'Herculaneum', 'Union_Army', 'George_I_of_Great_Britain', 'Joachim_Murat', 'Kanji', 'Gilgamesh', 'Ancient_history', 'Warren_Beatty', 'Jackson_Pollock', 'Drug', 'Acts_of_the_Apostles', 'Highlander_II:_The_Quickening', 'Sia_(musician)', 'Mulholland_Drive_(film)', 'Vulgar_Latin', 'Eliot_Spitzer', 'Baloch_people', 'Anderson_Cooper', 'Solomon\'s_Temple', 'John_Locke', 'Bactria', 'Gordian_Knot', 'Space_Race', 'Art', 'John_Mulaney', 'Ohio_State_University', 'Christian_Slater', 'Dysentery', 'Jamie_Chung', 'Gigi_Hadid', 'Neil_deGrasse_Tyson', 'East_Asia', 'Aspire_(TV_network)', 'Mikhail_Gorbachev', 'Arabic_numerals', 'Carl_Sagan', 'BMW', 'Portuguese_people', 'Jerry_Rubin', 'Jessica_Alba', 'Serial_killer', 'Helicobacter_pylori', 'Celesta', 'Lauryn_Hill', 'List_of_French_monarchs', 'Naomi_Osaka', 'Benito_Juárez', 'Arecaceae', 'Dunkirk_evacuation', 'Arc_de_Triomphe', 'USA_Gymnastics_sex_abuse_scandal', 'Buzz_Aldrin', 'Bal_Gangadhar_Tilak', 'Mary_Todd_Lincoln', 'Natural_satellite', 'Philadelphia', 'Katherine_Waterston', 'Eric_Rudolph', 'Czechoslovakia', 'Tommy_Wiseau', 'The_Pianist_(2002_film)', 'Freyja', 'Second_Battle_of_El_Alamein', 'Hanukkah_menorah', 'Costco', 'United_States_Congress', 'Hessian_(soldier)', 'Marquis_de_Sade', 'Space_Jam', 'JoJo\'s_Bizarre_Adventure', 'Catherine_Zeta-Jones', 'Economic_liberalism', 'Syndicalism', 'Star_Trek', 'Umberto_Eco', 'Louis_XIII', 'Matter_of_Britain', 'Aretha_Franklin', 'Nair', 'Ayaan_Hirsi_Ali', 'Guillermo_del_Toro', 'Ice_Age_(franchise)', 'Dharma', 'Hutterites', 'Kevin_Love', 'Columbia_River', 'Pierre_Laval', 'Hecate', 'Wonder_Woman', 'Oswald_Spengler', 'Iván_Duque_Márquez', 'Toni_Morrison', 'Mount_Vernon', 'United_Kingdom', 'Star_Wars_(film)', 'Forrest_Gump', 'New7Wonders_of_the_World', 'Civil_society', 'Al-Masjid_an-Nabawi', 'Erinyes', 'Michael_Keaton', 'Daniel_Day-Lewis', 'Fatehpur_Sikri', 'Cleansing_of_the_Temple', 'Nalanda', 'Sleep', 'Gas', 'Peter_Kropotkin', '1991_Soviet_coup_d\'état_attempt', 'Maria_Theresa', 'Fabian_Society', 'Currency', 'Indian_Ocean', 'United_Kingdom_of_Great_Britain_and_Ireland', 'George_Michael', '2021_Nobel_Peace_Prize', 'Hank_Azaria', 'Dachshund', 'Eminent_domain', 'Yuri_Andropov', 'Alien_(film)', 'David_Tennant', 'Crown_of_Castile', 'Budai', 'Franklin\'s_lost_expedition', 'Ali_Khamenei', 'Simon_Pegg', 'Salicylic_acid', 'Chinese_New_Year', 'Hakeem_Olajuwon', 'Jainism', 'Mikhail_Bulgakov', 'Ajith_Kumar', 'Happy_Birthday_to_You', 'Hannibal_(TV_series)', 'Prison_Break', 'Nobel_Prize', 'A_Visit_from_St._Nicholas', 'Blasphemy', 'Quran', 'French_Republican_calendar', 'James_Cromwell', 'Fatimid_Caliphate', 'Zendaya', 'L', 'Biotechnology', 'Evangeline_Lilly', 'Sundar_Pichai', 'John_3:16', 'Aladdin_(2019_film)', 'Western_world', 'Existentialism', 'Roblox', 'Italian_Wars', 'Diego_Rivera', 'Allison_Stokke', 'Zulu_language', 'Bavaria', 'Ancient_Rome', 'Antichrist', 'Oxford–AstraZeneca_COVID-19_vaccine', 'Battle_of_Kadesh', 'Ukiyo-e', 'Ant', 'Naomi_Scott', 'Katey_Sagal', 'Floyd_Mayweather_Jr.', 'NAACP', 'Battle_of_Britain', 'Great_Famine_(Ireland)', 'Funk', 'Internal_resistance_to_apartheid', 'Kafir', 'Albrecht_Dürer', 'Arctic_Ocean', 'Prince_Edward,_Duke_of_Kent', 'Annexation_of_Goa', 'Economic_system', 'Bipolar_disorder', '1883_eruption_of_Krakatoa', 'Atropa_belladonna', 'Curaçao', 'John_Williams', 'Carnatic_Wars', 'A*_search_algorithm', 'Food_preservation', 'Nike,_Inc.', 'Lower_Saxony', 'Austria', 'Gregorian_chant', 'Clinical_psychology', 'Andy_Serkis', 'Lincoln–Kennedy_coincidences_urban_legend', 'Prayer', 'Social_justice', 'Twelfth_Night_(holiday)', 'Christianity_in_the_1st_century', 'List_of_Scottish_monarchs', 'Ibn_Khaldun', 'Languages_of_Europe', 'Def_Leppard', 'Orpheus', 'Rhodes', 'Anglo-Saxon_paganism', 'Trinity', 'Al-Masih_ad-Dajjal', 'Dog', 'Samuel_Johnson', 'Suzi_Quatro', 'Commodus', 'Japanese_language', 'Wave', 'Eroticism', 'Alawites', 'Isra_and_Mi\'raj', 'Turkish_language', 'Dekulakization', 'Eva_Perón', 'Theodore_Roosevelt', 'C._S._Lewis', 'Jonathan_Swift', 'Carl_Jung', 'Facebook_Messenger', 'Family_of_Barack_Obama', 'Alhamdulillah', 'President_of_the_United_States', 'Valéry_Giscard_d\'Estaing', 'Infrastructure', 'Hoopoe', 'Life', 'Mary_of_Guise', 'General_Secretary_of_the_Chinese_Communist_Party', 'Coen_brothers', 'Tropic_Thunder', 'Janet_Yellen', 'First_Indochina_War', 'Italian_Social_Republic', 'James_Joyce', 'O_Captain!_My_Captain!', 'Rekha', 'Rain', 'Golden_Triangle_(Southeast_Asia)', 'Prime_Minister_of_the_United_Kingdom', 'Western_Front_(World_War_II)', 'Wallachia', 'Dylann_Roof', 'Daniel_Boone', 'Eastern_Catholic_Churches', 'Korean_People\'s_Army', 'RuPaul\'s_Drag_Race_Down_Under', 'Eternal_Sunshine_of_the_Spotless_Mind', 'Icelandic_language', 'Hong_Kong', 'Adam_and_Eve', 'Islamic_eschatology', 'Scooby-Doo', 'Durban', 'The_Doors', 'Mercantilism', 'Human_sexuality', 'European_Space_Agency', 'Antonio_Banderas', 'Ava_Gardner', 'Sino-Indian_War', 'Reichsführer-SS', 'Guangdong', 'Seal_(musician)', 'Kaley_Cuoco', 'Seven_Wonders_of_the_Ancient_World', 'Empire_of_Trebizond', 'Ghana', 'List_of_highest-grossing_films', 'Potato', 'Constitutional_monarchy', 'Music', 'Peter_II_of_Russia', 'Ayn_Rand', 'Caduceus', 'Henry_the_Young_King', 'Matter', 'Uma_Thurman', 'Yukio_Mishima', 'Madeira', 'Heraclius', 'Moonlight_(2016_film)', 'Brahmo_Samaj', 'Whore_of_Babylon', 'The_Protocols_of_the_Elders_of_Zion', 'Burger_King', 'March_7', 'Place_de_la_Concorde', 'Alexander_(2004_film)', 'Synthesizer', 'Frederick_I,_Holy_Roman_Emperor', 'Fatimah', 'Harrods', 'Palace_of_Whitehall', 'Leaning_Tower_of_Pisa', 'Conspiracy_theories_about_the_death_of_Diana,_Princess_of_Wales', 'Abul_A\'la_Maududi', 'IKEA', 'Bupropion', 'Wonders_of_the_World', 'Charles_IX_of_France', 'Virginity', 'Independence_Day_(1996_film)', 'Critical_thinking', 'Alicia_Keys', 'Snow', 'Ageing', 'Ronaldo_(Brazilian_footballer)', 'Boxing_Day', 'Gene_Simmons', 'Washington_(state)', 'Mamluk', 'First_language', 'Ecuador', 'Greenland', 'Emotion', 'Adam_Curtis', 'Soviet_invasion_of_Manchuria', 'Charli_D\'Amelio', 'Drink', 'Centurion', 'Diazepam', 'Law_Abiding_Citizen', 'Ram_Nath_Kovind', 'Massachusetts_Institute_of_Technology', 'Antonin_Scalia', 'Bachelor_of_Medicine,_Bachelor_of_Surgery', 'Shark', 'Archaeology', 'Sea_of_Galilee', 'Octopus', 'Glass_harmonica', 'Golda_Meir', 'Capital_market', 'Western_Asia', 'Mirage', 'Eurasian_Steppe', 'Kentucky', 'Björn_Ironside', 'Liberace', 'Kevin_Bacon', 'Doctor_Strange', 'Henry_Ford', 'The_Good_Life_(1975_TV_series)', 'Visual_arts', 'The_Lion_King', 'Jefferson_Davis', 'Religion_in_ancient_Rome', 'Minimum_wage_in_the_United_States', 'Fairy_tale', 'Qigong', 'Scipio_Africanus', 'Defenestration', 'Tao_Te_Ching', 'Hysteria', 'Anti-communism', 'Inuit', 'Artificial_intelligence', '1788–89_United_States_presidential_election', 'Back_to_the_Future_Part_II', 'Blaise_Pascal', 'Mary_Boleyn', 'Ali', 'Bohemia', 'Lesley-Anne_Down', 'Head_of_state', 'Joan_Jett', 'Luftwaffe', 'Will_Smith', 'Kingdom_of_Scotland', 'Sound', 'Hoodoo_(spirituality)', 'Tories_(British_political_party)', '92nd_Academy_Awards', 'Henry_Fonda', 'Grace_Jones', 'Ur_of_the_Chaldees', 'Costa_Rica', 'Donetsk', 'Swastika', 'People\'s_Liberation_Army', 'Fasces', 'Giordano_Bruno', 'Thomas_Paine', 'Richard_Burton', 'Golden_Rule', 'Ivan_VI_of_Russia', 'Cast_Away', 'List_of_Disney+_original_programming', 'Reserve_Bank_of_India', 'Aphrodite', 'Kumail_Nanjiani', 'David_Schwimmer', 'Skin', 'Anna_Nicole_Smith', 'Monastery', 'Sperm_whale', 'Siege_of_Leningrad', 'Udham_Singh', 'Heracles', 'Letterkenny_(TV_series)', 'Paradigm', 'David_Niven', 'Life_of_Pi_(film)', 'Red_hair', 'Corazon_Aquino', 'Lockheed_Martin_F-35_Lightning_II', 'Progressivism', 'William_Tecumseh_Sherman', 'Coptic_language', 'Enrique_Iglesias', 'Lust', 'The_World_to_Come', 'Turkish_people', 'Untitled_fourth_Matrix_film', 'Call_of_Duty', 'Indo-European_languages', 'Cosimo_de\'_Medici', 'Natural_number', 'Mikhail_Kalinin', 'List_of_Harry_Potter_cast_members', 'Mount_Sinai', 'Animal_Farm', 'Alfred,_Lord_Tennyson', 'SPQR', 'David_Bowie', 'Peter_III_of_Russia', 'Channel_4', 'Styria', 'Temple_of_Artemis', 'Kerry_Washington', 'The_French_Dispatch', 'Kurdistan', 'John_Knox', 'Lithography', 'Holy_See', 'Historical_fiction', 'Blues', 'Clarinet', 'Dune_(novel)', 'BBC_World_Service', 'Our_Lady_of_Guadalupe', 'Aunt_Jemima', 'McMurdo_Station', 'Alice_in_Chains', 'John_Paul_Jones', 'Kingdom_of_Navarre', 'Assassin\'s_Creed_II', 'Anus', 'Kylie_Jenner', 'Swadeshi_movement', 'No_Country_for_Old_Men_(film)', 'Begum_Hazrat_Mahal', 'Microsoft', '50_Cent', 'Babur', 'Romantic_music', 'Cynthia_Gibb', 'Triskelion', 'Mau_Mau_Uprising', 'Dead_Sea', 'Rudolf_Steiner', 'Anwar_Sadat', 'Alexander_I_of_Russia', 'John_Glenn', 'Greeks', 'Sagittarius_(astrology)', 'Sam_Rockwell', 'Grain', 'Hezekiah', 'Austrian_Empire', 'Chess', 'Maya_civilization', 'Morocco', 'Shamanism', 'Rainer_Maria_Rilke', 'Islamic_Golden_Age', 'Mule', 'Oliver_Cromwell', 'Presidency_of_Joe_Biden', 'Papyrus', 'Cuba', 'Muses', 'York', 'Flag_of_India', 'Herodian_Kingdom_of_Judea', 'Dave_Bautista', 'Lamborghini', 'Ballon_d\'Or', 'List_of_Bollywood_films_of_2021', 'Guru_Gobind_Singh', 'Artery', 'Football_War', 'Samuel_Adams', 'Manichaeism', 'Orchestra', 'Indian_art', 'Christmas_elf', 'U.S._News_&_World_Report', 'Raspberry_Pi', 'Katy_Perry', 'Third_Servile_War', 'Kaaba', 'Archipelago', 'German_Confederation', 'Les_Misérables', 'Gnosticism', 'Ivanka_Trump', 'USB_flash_drive', 'Genesis_(band)', 'Simeon_Saxe-Coburg-Gotha', 'French_Bulldog', 'Metro_2033', 'Norse_colonization_of_North_America', 'University_of_Toronto', 'Napoleon_complex', 'Shaanxi', 'Trojan_War', 'Westboro_Baptist_Church', 'SS-Totenkopfverbände', 'Live_Aid', 'Toy_Story', 'Alberto_Fujimori', 'Waffen-SS', 'Titanic', 'Political_economy', 'Modernism', 'Latin_alphabet', 'Gulzarilal_Nanda', 'Assassination_of_William_McKinley', 'Gilmore_Girls', 'Dred_Scott', 'Roger_Penrose', 'Whale', 'Bhakti_movement', 'John_the_Apostle', 'International_Military_Tribunal_for_the_Far_East', 'Intelligent_design', 'Fritzl_case', 'Nice', 'Amitābha', 'Stollen', 'Untouchability', 'Mezuzah', 'Kremlin_Wall_Necropolis', 'Amal_Clooney', 'List_of_animal_sounds', 'Aramaic', 'Christmas_truce', 'Palace_of_Versailles', 'Christians', 'Sherlock_(TV_series)', 'Romeo_&_Juliet_(2013_film)', 'Synagogue', 'Turkish_Radio_and_Television_Corporation', 'Marble', 'Defamation', 'An_Lushan_Rebellion', 'Operation_Barbarossa', 'Six-Day_War', 'Mali', 'Polyamory', 'World_Health_Organization', 'The_Bahamas', 'Scopolamine', 'Meister_Eckhart', 'Alfred_Jodl', 'Superman_&_Lois', 'New_Haven,_Connecticut', 'Malay_language', 'E_(mathematical_constant)', 'Hacksaw_Ridge', 'Chernobyl_disaster', 'Digestion', 'Königsberg', 'Zhou_dynasty', 'Serbs', 'Re:Zero_−_Starting_Life_in_Another_World', 'Uyghurs', 'Dakota_Fanning', 'Meritocracy', 'Washington_Irving', 'May_Day', 'Arthropod', 'Camera', 'Tawhid', 'Mindfulness', 'Josephus_on_Jesus', 'Antony_and_Cleopatra', 'Society', 'Apostasy_in_Islam', 'Sanchi', 'Killer_whale', 'Theodor_W._Adorno', 'History_of_science', 'ISO_3103', 'Acute_pancreatitis', 'Cape_Town', 'Paul_Krugman', 'John_Brown\'s_raid_on_Harpers_Ferry', 'Bubonic_plague', 'World_War_II_casualties', 'Highlander_(franchise)', 'Nome,_Alaska', 'Hebrew_calendar', 'Ship', 'It_(2017_film)', 'Phrygian_cap', 'Arnab_Goswami', 'Columbian_exchange', 'Vacuum', 'Battle_of_the_Somme', 'Metamorphoses', 'Qajar_dynasty', 'Real_estate', 'Queen_Victoria', 'Duck', 'Annulment', 'Republicanism', 'Eating_disorder', 'Human_Genome_Project', 'Strait_of_Magellan', 'Hemorrhoid', 'Peptic_ulcer_disease', 'Beowulf', 'Boris_Yeltsin', 'Excess_mortality_in_the_Soviet_Union_under_Joseph_Stalin', 'Common_cold', 'Limbo', 'Joker_(2019_film)', 'Book_of_Exodus', 'One_Direction', 'The_Good_Place', 'Polydactyly', 'Stanley_Kubrick', 'Red_Dead_Redemption_2', 'Internet', 'Walt_Whitman', 'Jimmy_Fallon', 'Humour', 'University_of_Edinburgh', 'Serbian_Christmas_traditions', 'Attack_on_Titan', 'Legume', 'Linguistics', 'Archetype', 'Parliament_of_India', 'Church_of_the_Nativity', 'Generations_of_Noah', 'Ohio', 'Mustang', 'Blackpink', 'Dayananda_Saraswati', 'Henry_Percy_(Hotspur)', 'Major_depressive_disorder', 'Common_Era', 'Tipu_Sultan', 'James_McAvoy', 'Eminem', 'CT_scan', 'Primogeniture', 'One_Piece', 'Acts_of_Union_1707', 'Perception', 'Charles_Darwin', 'Gong_Yoo', 'Treblinka_extermination_camp', '1973_Chilean_coup_d\'état', 'Samsung', 'Jada_Pinkett_Smith', 'Augustine_of_Hippo', 'Charles_VI_of_France', 'Antigua', 'Order_of_the_British_Empire', 'List_of_Christian_denominations', 'Realpolitik', 'Nuclear_weapon', 'Duke_of_York', 'Earthquake', 'Winston_Churchill', 'Roman_Kingdom', 'Charlie_Hebdo', 'Archimedes\'_principle', 'Pericles', 'Frostbite', 'Pamplona', 'Synoptic_Gospels', 'Timeline_of_religion', 'Bolsheviks', 'Hulu', 'Tornado', 'Asia', 'Elizabeth_II', 'Academy_Award_for_Best_Actress', 'Min_Aung_Hlaing', 'Russell\'s_teapot', 'Carl_Friedrich_Gauss', 'Apostasy', 'Josiah', 'Grand_Rapids,_Michigan', 'Kazakhstan', 'Ophelia', 'Socratic_method', 'Sonnet', 'Crete', 'Penicillin', 'War_in_the_Vendée', 'U.S._Route_66', 'Ian_Somerhalder', 'New_Delhi', 'Liberalism', 'Deadpool_2', 'Otto_I,_Holy_Roman_Emperor', 'Shahid_Khan', 'Mark_Cuban', 'Scientology', 'Textile', 'Typhus', 'Sea_Peoples', 'Yoga', 'List_of_largest_companies_by_revenue', 'Richard_II_of_England', 'UEFA_Champions_League', 'Lesbos', 'Human', 'Björk', 'Brahmi_script', 'Danube', 'Dolly_Parton', 'Representative_democracy', 'Ozymandias', 'Generation_Alpha', 'Shambhala', 'Tracy_Chapman', 'Opium', 'Hedonism', 'Julio-Claudian_dynasty', 'John_Franklin', 'Bruce_Springsteen', 'Anabaptism', 'Zeno\'s_paradoxes', 'Hungarian_language', 'Geography', 'Nihilism', 'Morarji_Desai', 'Prose', 'Chris_Cornell', 'Linear_algebra', 'Commonwealth_of_Nations', 'Corfu', 'Olivia_Newton-John', 'Opossum', 'Rosh_Hashanah', 'Zlatan_Ibrahimović', 'Saint_Stephen', 'Lombards', 'W._E._B._Du_Bois', 'Ian_Hart', 'Sermon_on_the_Mount', 'Miracle_on_Ice', 'Adam_Lambert', 'The_Terminator', 'Bebe_Rexha', 'Community_(TV_series)', 'Percussion_instrument', 'Paradigm_shift', 'Commodity', 'United_States_Declaration_of_Independence', 'King\'s_College_London', 'Muhammad_al-Bukhari', 'Beard', 'Lost_Cause_of_the_Confederacy', 'Tabernacle', 'Decapitation', 'Harp', 'Serbian_Cyrillic_alphabet', 'Bronze_Age', 'Ramesses_II', 'Star', 'Orthodox_Judaism', 'First_Dynasty_of_Egypt', 'Mario_Cuomo', 'Bahadur_Shah_Zafar', 'Barack_Obama', 'Libra_(astrology)', 'Iglesia_ni_Cristo', 'Laura_Dern', 'Mitochondrial_DNA', 'Jimi_Hendrix', 'Rock_music', 'Fife', 'Howard_Hughes', 'Misogyny', 'Punjab', 'Persians', 'Ion_Antonescu', 'Westminster_School', 'Andy_Samberg', 'Presidency_of_Barack_Obama', '2004_Indian_Ocean_earthquake_and_tsunami', 'Nicene_Creed', 'Ford_Motor_Company', 'Alec_Baldwin', 'Laurel_and_Hardy', 'Shakira', 'Radioactive_decay', 'Coronavirus', 'Historical_Jesus', 'Cameroon', 'Canaan', 'Bosnia_and_Herzegovina', 'Eduardo_Saverin', 'Iron_Man', 'List_of_most-followed_Instagram_accounts', 'Vinayak_Damodar_Savarkar', 'Roman_Egypt', 'Hunan', 'America_Ferrera', 'Jeongjo_of_Joseon', 'Instagram', 'Basil_of_Caesarea', 'History_of_India_(1947–present)', 'Scandal_(TV_series)', 'Early_human_migrations', 'NBA_G_League', 'Washington_University_in_St._Louis', 'Mongol_invasions_of_Japan', 'Niels_Bohr', '1968_United_States_presidential_election', 'Jat_people', 'Dharmendra', 'Imran_Khan', 'Brigham_Young', 'International_Phonetic_Alphabet', 'Democritus', 'Maroon_5', 'Ten_Commandments', 'Josephus', 'Sherman\'s_March_to_the_Sea', 'Devdas_Gandhi', 'Four_Noble_Truths', 'Menachem_Begin', 'Leni_Riefenstahl', 'Hubert_Humphrey', 'Mombasa', 'Thought', 'Carol_Danvers', 'The_Cranberries', 'Cypress', 'Third_World', 'Pinyin', 'Talking_Heads', 'Kushan_Empire', 'Birmingham', 'Heathenry_(new_religious_movement)', 'Transport', 'Battle_of_Chancellorsville', 'Charles_Edward_Stuart', 'Socialist_state', 'Camera_obscura', 'Operation_Condor', 'Montevideo', 'Golden_ratio', 'Andalusia', 'Helen_Keller', 'Baby_boomers', 'Melungeon', 'Lynyrd_Skynyrd', 'BlacKkKlansman', 'Evangelism', 'The_Holocaust', 'Johnny_Cash', 'Astronomy', 'Haitian_Revolution', 'Watchmen_(film)', 'Sophia_Loren', 'George_C._Marshall', 'Poseidon', 'Hamlet', 'Bangladesh_Liberation_War', 'Battle_of_Bunker_Hill', 'Assassination_of_Mahatma_Gandhi', 'Ram_Prasad_Bismil', 'Skeleton', 'Dwayne_Johnson', 'Mike_Myers', 'Lincoln,_Nebraska', 'Edgar_Allan_Poe', 'Greek_genocide', 'L\'Anse_aux_Meadows', 'Natural_gas', 'Kim\'s_Convenience', 'Dylan_O\'Brien', 'The_Turner_Diaries', 'Rotten_Tomatoes', 'Pale_of_Settlement', 'Kingdom_of_Italy', 'Hugo_Chávez', 'Thelonious_Monk', '2020–21_United_States_network_television_schedule', 'James_VI_and_I', 'Santo_Domingo', 'Gothic_language', 'Pierre_Bourdieu', 'Wiccan_(character)', 'Mughal_Empire', 'Nubia', 'Diabetes', 'Santa_Claus\'s_reindeer', 'Battle_of_Moscow', 'City', 'Jallianwala_Bagh_massacre', 'Territories_of_the_United_States', 'Aberfan_disaster', 'Knights_Hospitaller', 'Felipe_VI', 'Piracy', 'Baptism', 'Charles_Lee_(general)', 'Gandhara', 'Influenza', 'Palau', 'Hunter_S._Thompson', 'Alfred_Rosenberg', 'Latin_Empire', 'Ben_Shapiro', 'Jennifer_Jason_Leigh', 'Dravida_Munnetra_Kazhagam', 'Edvard_Munch', 'Brunei', 'Raccoon', 'Explosive', 'Neon_Genesis_Evangelion', 'White_South_Africans', 'Old_Testament_messianic_prophecies_quoted_in_the_New_Testament', 'Grand_Duchy_of_Finland', 'Collective_unconscious', 'Fred_Rogers', 'Mitch_McConnell', 'Charles_VII_of_France', 'Centrism', 'Mr._Bean', 'Ramakrishna', 'Equestrianism', 'Azrael', 'Christopher_Plummer', 'Hygiene', 'Yukon', 'Italians', 'Mind', 'Nicole_Scherzinger', 'States_and_union_territories_of_India', 'HMS_Victory', 'List_of_chapters_in_the_Quran', 'Desperate_Housewives', 'Keira_Knightley', 'Telegram_(software)', 'Civil_rights_movement', 'History_of_the_Catholic_Church', 'Google_Meet', 'Weather', 'Princess_Margaret,_Countess_of_Snowdon', 'Atlantic_slave_trade', 'Herman_Melville', 'Howard_Zinn', 'Binary_code', 'Prodigal_Son_(TV_series)', 'Ptolemy', 'Zamfara_kidnapping', 'Symbol', 'Luoyang', 'Rotterdam', 'James_Madison', 'Operation_Northwoods', 'Descendants_of_the_Sun', 'Maurya_Empire', 'Steve_Harvey', '2012_(film)', 'IS_tank_family', 'Lennox_Lewis', 'Cambodian–Vietnamese_War', 'Delphi', 'Salafi_movement', 'Portuguese_language', 'Benjamin_Franklin', 'Revolution_(Beatles_song)', 'One-party_state', 'Mass_murder', 'Mount_Vesuvius', 'Dean_Martin', 'Allegory', 'Bloodletting', 'Average_human_height_by_country', 'Mass_media', 'Secondary_school', 'New_Economic_Policy', 'Frank-Walter_Steinmeier', 'Nobel_Memorial_Prize_in_Economic_Sciences', 'Selim_I', 'British_Israelism', 'The_Hunt_(2020_film)', 'Causality', 'Erykah_Badu', 'British_colonization_of_the_Americas', 'Diego_Maradona', 'Peninsular_War', 'Elie_Wiesel', 'Plaster', 'Bob_Hawke', 'Jurchen_people', 'Louis_the_Pious', 'Arthur_Wellesley,_1st_Duke_of_Wellington', 'Marianne', 'American_Revolutionary_War', 'Dominican_Order', 'Brittany', 'Castor_and_Pollux', 'Jean-Jacques_Dessalines', 'Ricky_Gervais', 'Alois_Hitler', 'Real_Madrid_CF', 'Tofu', 'Amnesia', 'Saint_Barbara', 'Felicity_Jones', 'Sexism', 'Purgatorio', 'Index_Librorum_Prohibitorum', 'Elizabeth_of_Russia', 'Blood', 'Uruk', 'Albert_Speer', 'Glottal_stop', 'Monopoly', 'Magnetism', 'Felicity_Huffman', 'Akon', 'Plastic', 'Cary_Grant', 'Highgate_Cemetery', 'Mughal-e-Azam', 'Cube', 'Anarchy', 'Rana_Sanga', 'Paramount+', 'Harry_Houdini', 'Devil_May_Cry', 'Sikhs', 'Double_bass', 'British_Empire', 'Patton_Oswalt', 'Robert_Koch', 'Neo-Assyrian_Empire', 'Tony_Kushner', 'Apollo', 'Indian_National_Congress', 'Napoleon_Dynamite', 'Boardwalk_Empire', 'Sacco_and_Vanzetti', 'Tefillin', 'Emerald_Tablet', 'List_of_programs_broadcast_by_Cartoon_Network', 'Atlas_(mythology)', 'New_England', 'Johann_Wolfgang_von_Goethe', 'Hormone', 'Raphael', 'Sam_Cooke', 'Harsha', 'Lolita', 'The_Chronicles_of_Narnia', 'Quantum_mechanics', 'Rihanna', 'Dutch_language', 'Dassault_Aviation', 'Champs-Élysées', 'Caravaggio', 'Scythians', 'The_Troubles', 'Ukrainian_language', 'IPhone', 'Möngke_Khan', '1936_Summer_Olympics', 'God_the_Father', 'Information', 'Lavrentiy_Beria', 'Mirabai', 'Three-cushion_billiards', 'Torture', 'Grenoble', 'New_Jersey', 'Julian_(emperor)', 'The_Adventures_of_Tom_Sawyer', 'Tupac_Shakur', 'Painting', 'Athenian_democracy', 'Vietnam', 'Postpartum_depression', 'Gamergate_controversy', 'Colombian_conflict', 'Eeny,_meeny,_miny,_moe', 'Pepsi', 'H._L._Mencken', 'Carl_Rogers', 'Scarface_(1983_film)', 'Oda_Nobunaga', 'Colonial_India', 'Moab', 'Spotify', 'Nicky_Hopkins', 'Demographics_of_the_United_States', 'Portuguese_India', 'Studio_Ghibli', 'Beech', 'Beauty', 'Theocracy', 'Lynda_Carter', 'Bitcoin', 'Simplified_Chinese_characters', 'Crossing_the_Red_Sea', 'Mangrove', 'Roman_numerals', 'Wives_of_Henry_VIII', 'Lviv', 'Aktion_T4', 'Pope_John_Paul_I', 'Book_of_Signs', 'The_Dark_Knight_Rises', 'Irish_mythology', 'List_of_current_monarchs_of_sovereign_states', 'Umar', 'Midsomer_Murders', 'Erin_Brockovich', 'Mutiny_on_the_Bounty', 'The_King_(2019_film)', 'Julia_Louis-Dreyfus', '2020_in_film', 'Autobahn', 'Mohamed_Morsi', 'Right_to_Information_Act,_2005', 'International_Date_Line', 'House_of_Lancaster', 'Pre-Columbian_era', 'Independent_politician', 'W._H._Auden', 'Jahangir', 'New_Year\'s_Day', 'Santa_Barbara,_California', 'Cambridge,_Massachusetts', 'Non-Aligned_Movement', 'Emmy_Awards', 'List_of_footballers_with_500_or_more_goals', 'Viscount', 'Keith_Emerson', 'Pride_&_Prejudice_(2005_film)', 'St_James\'s_Palace', 'Alibaba_Group', 'Rastafari', 'Doctorate', 'Spice_Girls', 'Donald_Sutherland', 'Slavic_paganism', 'Beagle', 'Tina_Turner', 'Political_science', 'Operation_Bagration', 'Glockenspiel', 'Farrah_Fawcett', 'Frida_Kahlo', 'Machine', 'Monte_Cassino', 'Kunal_Nayyar', 'Edward_IV_of_England', 'Iconoclasm', 'Tajiks', 'List_of_countries_by_irreligion', 'Qin_Shi_Huang', 'Edward_the_Martyr', 'Nebuchadnezzar_II', 'Legend_of_the_Christmas_Spider', 'Leonardo_DiCaprio', 'Ethereum', 'Behavioral_economics', 'Maha_Shivaratri', 'McLintock!', 'List_of_Byzantine_emperors', '0', 'Emily_Dickinson', 'Bruno_Mars', 'Appian_Way', 'Robert_Redford', 'Istanbul', 'Far-left_politics', 'Yasser_Arafat', 'Disease', 'Skid_Row,_Los_Angeles', 'Schindler\'s_List', 'Seoul', 'List_of_deadliest_animals_to_humans', 'Yemeni_Civil_War_(2014–present)', 'Latin_script', 'Rita_Ora', 'Whig_Party_(United_States)', 'Assassination_of_Abraham_Lincoln', 'Code_of_Hammurabi', 'Revised_Romanization_of_Korean', 'Asghar_Farhadi', 'Adolf_Eichmann', 'Spike_Lee', 'Leopold_II,_Holy_Roman_Emperor', 'Sam_Houston', 'Author', 'John_Lennon', 'Katie_Price', 'Proletariat', 'Toy', 'William_III_of_England', 'Rule_of_law', 'Korean_Air_Lines_Flight_007', 'Pixar', 'Green_Day', 'New_Girl', 'Dutch_Empire', 'Seppuku', 'Cathay_Pacific', 'Belle_Époque', 'Manu_(Hinduism)', 'Psychotherapy', 'Jade_Emperor', 'Lysenkoism', 'Jack_Dorsey', 'Fifty_Shades_of_Grey_(film)', 'Edward_the_Confessor', 'Sylvester_Stallone', 'Aeneid', 'Bay_of_Bengal', 'Channing_Tatum', 'Stasi', 'Harappa', 'Elizabeth:_The_Golden_Age', 'Know_Nothing', 'Philosophy_of_science', 'Mass_killings_under_communist_regimes', 'Hypothesis', 'Henry_IV_of_England', 'Druze', 'Christ_(title)', 'Deutsche_Welle', 'James_V_of_Scotland', 'Francis_Crozier', 'Frontotemporal_dementia', 'Magic_(supernatural)', 'Adam', 'Kamal_Haasan', 'Newton\'s_laws_of_motion', 'Steve_McQueen', 'Gene_Kelly', 'List_of_conspiracy_theories', 'Johannes_Gutenberg', 'Illinois', 'Blade_Runner', 'George_Washington_University', 'Andrei_Sakharov', 'Tigris', 'Encyclopædia_Britannica', 'Underground_Railroad', 'Conservatism', 'Dred_Scott_v._Sandford', 'Marshall_Plan', 'Declaration_of_the_Rights_of_Man_and_of_the_Citizen', 'George_V', 'Ava_Max', 'Kelly_Clarkson', 'Rollo', 'List_of_European_Cup_and_UEFA_Champions_League_finals', 'Taxonomy_(biology)', 'QAnon', 'Narcissism', 'Gwyneth_Paltrow', 'Black_Madonna', '2018_FIFA_World_Cup', 'Singapore', '2020_Nagorno-Karabakh_war', 'Christianity_and_Islam', 'Sid_Vicious', 'Ain\'t_I_a_Woman?_(book)', 'Arabs', 'Piñata', '4chan', 'Hesiod', 'Universal_suffrage', 'Dan_Aykroyd', 'HIV/AIDS', 'Mahabharata', 'Tatars', 'Guanyin', 'Brian_Cox_(actor)', 'Revolutions_of_1989', 'Royal_Navy', 'Mariah_Carey', 'Elizabeth_(film)', 'Phoebe_Waller-Bridge', 'Archbishop_of_Canterbury', 'Vespasian', 'Denazification', 'Mali_Empire', 'Proto-Indo-European_language', 'Mad_Men', 'Friendship', 'Kiku_Sharda', 'Bengali_language', 'Panama', 'Nader_Shah', 'Billy_Graham', 'State_of_Palestine', 'Princess_Beatrice', 'Miles_Davis', 'Friends', 'George_Washington_Bridge', 'ABBA', 'Catherine_the_Great', 'Ptolemaic_dynasty', 'John_C._Breckinridge', 'Thomas_Müller', 'East–West_Schism', 'Sylvia_Plath', 'Minerva', 'Steak_and_Blowjob_Day', 'Tencent', 'Bill_&_Melinda_Gates_Foundation', 'Salò,_or_the_120_Days_of_Sodom', 'Zoroaster', 'Diogenes', 'Kingdom_of_England', 'Muhammad_Ali_Jinnah', 'Abkhazia', 'Renaissance', 'Multan', 'The_Great_British_Bake_Off', 'Frederick_Douglass', 'Kate_Bush', 'John_the_Evangelist', 'Knife', 'Logic', 'Supernatural', 'Charlize_Theron', 'Commonwealth_Day', 'Malcolm_X', 'African_Americans', 'Chanakya', 'Angevin_Empire', 'List_of_sultans_of_the_Ottoman_Empire', 'Irony', 'Vidkun_Quisling', 'Paramahansa_Yogananda', 'Milan_Cathedral', 'Skeletal_muscle', 'Rajneesh_movement', '1844_United_States_presidential_election', 'Atlantic_Ocean', 'Indian_philosophy', 'National_Geographic', 'Balthazar_(magus)', 'Rachel', 'Necromancy', 'Kofi_Annan', 'Nobel_Prize_in_Physics', 'Census', 'Alison_Brie', 'Neanderthal', 'Calvin_Coolidge', 'Odoacer', 'Omar_Bradley', 'Predestination', 'Thaddeus_Stevens', 'Tony_Benn', 'Malawi', 'Devanagari', 'Design', 'Sons_of_Liberty', 'Piedmont', 'Sex_Education_(TV_series)', 'David_Dellinger', 'James_Hepburn,_4th_Earl_of_Bothwell', 'Italy', 'Princess_Elisabeth_of_Hesse_and_by_Rhine_(1864–1918)', 'Braveheart', 'Fight_Club', 'Judy_Chicago', 'Twelve_Tribes_of_Israel', 'Ketamine', 'May_68', 'West_African_Vodun', 'Tunis', 'Indonesian_mass_killings_of_1965–66', 'Jackie_Chan', 'Oral_sex', 'Seti_I', 'Impeachment_of_Bill_Clinton', 'Thutmose_III', 'Emilio_Estevez', 'Minsk', 'Fred_Hampton', 'Thessaloniki', 'Toledo,_Spain', 'The_Blue_Lagoon_(1980_film)', 'Susan_B._Anthony', 'Incarnation_(Christianity)', 'Dionysus', 'Mughal–Maratha_Wars', 'Douglas_Fairbanks_Jr.', 'Ingrid_Bergman', 'Bono', 'Chittorgarh_Fort', 'Evo_Morales', 'Bosporus', 'Thirteenth_Amendment_to_the_United_States_Constitution', 'Gilligan\'s_Island', 'Leif_Erikson', 'Almohad_Caliphate', 'Republic_of_China_(1912–1949)', 'National_People\'s_Congress', 'Id,_ego_and_super-ego', 'Galileo_Galilei', 'Vitellius', 'Cher', 'Candace_Owens', 'Populism', 'Nation_state', 'Cultural_Revolution', 'Taj_Mahal', 'Our_Lady_of_Fátima', 'Daniel_Dae_Kim', 'Al_Capone', 'Jim_Jones', 'Bar_and_bat_mitzvah', 'Darius_III', 'British_Columbia', 'Moscow_Kremlin', 'Sense', 'Scottish_Premiership', 'List_of_countries_and_dependencies_by_population', 'Bryan_Cranston', 'Einsatzgruppen', 'Psycho_(1960_film)', 'Biodiversity', 'Sobibor_extermination_camp', 'Jewish_Autonomous_Oblast', 'Akihito', 'Valentina_Tereshkova', 'Orhan', 'Propaganda', 'Hydropower', 'Joseph_Goebbels', 'Bloods', 'Plant-based_diet', 'List_of_ethnic_slurs', 'Normandy_landings', 'Novel', 'Kane_Tanaka', 'The_Revenant_(2015_film)', 'Stuttgart', 'Islamic_holy_books', 'Saddam_Hussein', 'Physiology', 'Phosphorus', 'Jack_London', 'Hare', 'Susan_Hayward', 'Tutsi', 'Edward_Snowden', 'William_Faulkner', 'St_Paul\'s_Cathedral', 'Federalist_Party', 'Amjad_Khan_(actor)', 'Mary_Magdalene', 'Cartagena,_Colombia', 'Wolfgang_Amadeus_Mozart', 'Married_at_First_Sight_(Australian_TV_series)', 'Gamal_Abdel_Nasser', 'The_Wire', 'HMS_Erebus_(1826)', 'Songhai_Empire', 'Henry_David_Thoreau', 'Anthropology', 'John_F._Kennedy_Jr.', 'Middle_class', 'Uttar_Pradesh', 'Book_of_Leviticus', 'Maratha_Empire', 'George_Lucas', 'Dalit', '99942_Apophis', 'Caracas', 'Firefox', 'Carolingian_Empire', 'Book_of_Deuteronomy', 'Multiple_sclerosis', 'Saxony-Anhalt', 'Cataract', 'Turner_Classic_Movies', 'Left-libertarianism', 'Tokyo', 'Durrani_Empire', 'Addis_Ababa', 'Unification_of_Germany', 'Vertigo', 'French_and_Indian_War', 'Gallstone', 'David', 'Sarojini_Naidu', 'Thirteen_Colonies', 'Annunciation', 'Arminius', 'Poll_taxes_in_the_United_States', 'Knights_of_the_Round_Table', 'Tsardom_of_Russia', 'Jackie_Robinson', 'Geology', 'Edward_V_of_England', 'Telegraphy', 'Surgery', 'Pacific_Ocean', 'Ronna_McDaniel', 'Giraffe', 'Adam_in_Islam', 'Phoenix_Lights', 'Eukaryote', 'Romance_of_the_Three_Kingdoms', 'Pontius_Pilate', 'Professor', 'Social_contract', 'The_Expanse_(novel_series)', 'Indian_nationalism', 'Jack_Kemp', 'Taylor_Swift', 'List_of_metropolitan_statistical_areas', 'Doctor_Strange_(2016_film)', 'Joseon', '2022_FIFA_World_Cup_qualification', 'Battle_of_Buxar', 'Akkadian_language', 'William_Wallace', 'Gene_Hackman', 'Nobel_Prize_in_Literature', 'Fire', 'NATO_phonetic_alphabet', 'Pokémon', 'Timurid_dynasty', 'Nuclear_power', 'Mamma_Mia!_(film)', 'Sulla', 'Capetian_dynasty', 'Apple_Inc.', 'David_Paterson', 'Perestroika', 'Nemesis', 'Dune_(2021_film)', 'Miguel_de_Cervantes', 'Battle_of_Appomattox_Court_House', 'Gustav_Mahler', 'Conservatism_in_the_United_States', 'Fairy', 'List_of_biblical_names', 'Mary_Rose', 'Bob_Dole', 'Kate_Spade', 'Epithet', 'Armenians', 'French_colonial_empire', 'Tom_Clancy', 'Bluegrass_music', 'John_Cabot', 'Troy_(film)', 'Dan_Levy_(Canadian_actor)', 'Confederation', 'The_Great_(TV_series)', 'Master\'s_degree', 'Gerald_Ford', 'Business', 'Genrikh_Yagoda', 'Almoravid_dynasty', 'The_Independent', 'Anne_Rice', 'Mark_Kelly', 'The_Crown', 'Gopal_Krishna_Gokhale', 'History_of_the_Indian_National_Congress', 'Pea', 'All_India_Radio', 'Advent_calendar', 'Bremen', 'Arabian_horse', 'Cogito,_ergo_sum', 'Christingle', 'Bible', 'Maghreb', 'Atomic_bombings_of_Hiroshima_and_Nagasaki', 'Ferdinand_VII_of_Spain', 'Latvian_language', 'Hyperthymesia', 'Death_of_Alexander_the_Great', 'Yellowstone_National_Park', 'Psychology', 'Zenobia', 'Ken_Starr', 'Treason', 'Circumcision_of_Jesus', 'Gautama_Buddha', 'Gayatri_Mantra', 'Existence_of_God', 'Harley_Quinn', 'Solomon', 'Mother_Teresa', 'Tamil_Nadu_Legislative_Assembly', 'Samadhi', 'Zhou_Enlai', 'Pope_John_XXIII', 'List_of_most-liked_TikTok_videos', 'Sridevi', 'First_Mexican_Empire', 'Ides_of_March', 'Elizabeth_of_York', 'Saint_Valentine', 'Tsar_Bomba', 'Hugo_Weaving', 'Burlington,_Vermont', 'Trigonometry', 'Sir', 'Consanguinity', 'Amor_fati', 'Indian_Super_League', 'Hulkling', 'Ramana_Maharshi', 'John_Travolta', 'Ridley_Scott', 'Admiral_of_the_fleet', 'Saint_Patrick', 'Ragnar_Lodbrok', 'Order_of_Canada', 'Simon_Commission', 'Shang-Chi', 'Russian_America', 'American_Rescue_Plan_Act_of_2021', 'Cardinal_(Catholic_Church)', 'Chennai', 'Cthulhu', 'Messiah', 'Lee_Harvey_Oswald', 'Rani_of_Jhansi', 'Aristotle', 'Mercury_poisoning', 'COVID-19_pandemic_in_the_United_States', 'Normal_distribution', 'Ireland', 'Heavy_metal_music', 'Plywood', 'Lebensborn', 'Esther', 'Wikisource', 'List_of_countries_by_GDP_(nominal)_per_capita', 'James_Monroe', 'Angle', 'List_of_Christmas_hit_singles_in_the_United_Kingdom', 'Battle_of_Antietam', 'Abdul_Hamid_II', 'Ptolemaic_Kingdom', 'Pink_(singer)', 'Conic_section', 'Francoist_Spain', 'Jason_Segel', 'Polish–Soviet_War', 'Keystone_Pipeline', 'New_Year', 'Pantheism', 'Pompeii', 'Heraclitus', 'Greenwich', 'Glass', 'Philip_Seymour_Hoffman', 'Moscow_Metro', 'Kauai', 'Apple_cider', 'Bloody_Sunday_(1972)', 'List_of_Russian_monarchs', 'Rajendra_Prasad', 'Intersex', 'Independence_Day_(Ghana)', 'Rupert_Murdoch', 'Dragon', 'Alsace', 'John_Landis', 'Pamela_Anderson', 'Twelve_Olympians', 'Endeavour_(TV_series)', 'Death_of_Adolf_Hitler', 'James_Watson', 'Pseudoscience', 'Food_and_Drug_Administration', 'Molotov–Ribbentrop_Pact', 'Lesser_Antilles', 'Wheat', 'Lala_Lajpat_Rai', 'Montesquieu', 'Huns', 'Franks', 'Cantonese', 'Jay-Z', 'Song_dynasty', 'Ultranationalism', 'True_Detective', 'Lucius_Verus', 'Ecclesiastes', 'Cannabis_(drug)', 'Troy', 'Dark_Ages_(historiography)', 'Lumbini', 'LVMH', 'Brian_Wilson', 'Tony_Hendra', 'Prince_Philip,_Duke_of_Edinburgh', 'Reinhard_Heydrich', 'Assassination_of_Julius_Caesar', 'Colors_TV', 'Sperm', 'Abu_Simbel', 'Inna_Lillahi_wa_inna_ilayhi_raji\'un', 'Mexican–American_War', 'Adidas', 'Anni-Frid_Lyngstad', 'Gaza_City', 'List_of_multinational_festivals_and_holidays', 'Dominion_of_Pakistan', 'Greta_Thunberg', 'Adele', 'Wyoming', 'Lingua_franca', 'History_of_Europe', 'Riga', 'Joker_(character)', 'Elizabeth_Banks', 'Great_Barrier_Reef', 'Erbil', 'Faisal_of_Saudi_Arabia', 'Resident_Evil', 'Cumans', 'Order_of_the_Bath', 'Roger_Scruton', 'Charles_Bronson_(prisoner)', 'Spanish_Inquisition', 'Elizabeth_I', 'Michael_Fassbender', 'Stillbirth', 'Taylor_series', 'Frankfurt_School', 'Jeremy_Renner', 'Basques', 'Sultanate_of_Rum', 'Middle_Ages', 'Reproduction', 'Sumerian_King_List', 'Ethnic_group', 'Battle_of_Berlin', 'Confederate_States_Army', 'Chastity', 'First_Triumvirate', 'Wilhelm_Keitel', 'Krampus', 'Paul_Giamatti', 'Jim_Lovell', 'Diane_Kruger', 'Joshua', 'Jacques_Lacan', 'List_of_popes', 'Majapahit', 'Gujarati_language', 'Pokémon_(video_game_series)', 'The_Communist_Manifesto', 'Puerto_Rico', 'Integrated_circuit', 'Invertebrate', 'El_Greco', 'Labyrinth_(1986_film)', 'Lasagne', 'Raiders_of_the_Lost_Ark', 'Cesare_Borgia', 'Circulatory_system', 'Social_Darwinism', 'David_Fincher', 'Pope', 'Ezra_Miller', 'São_Paulo', 'Vernacular', 'Oakland,_California', 'Great_Plague_of_London', 'Inner_Mongolia', 'Johannes_Brahms', 'Standard_Chinese', '1989_Tiananmen_Square_protests', 'Hindi', 'Child_development', 'Helena,_Montana', 'Pope_Gregory_I', 'Buland_Darwaza', 'Ahmed_I', 'Patrician_(ancient_Rome)', 'Tom_Cruise', 'Ku_Klux_Klan', 'Wicca', 'Bleeding_Kansas', 'List_of_monarchs_of_Persia', 'Rocky_Mountains', '4K_resolution', 'The_Suicide_Squad_(film)', 'West_Bengal', 'Libertarian_socialism', 'Predator_(film)', 'Bill_de_Blasio', 'The_Real_World_(TV_series)', 'Catherine_of_Valois', 'Seattle', 'Moses', 'Genesis_flood_narrative', 'Typhoid_fever', 'Renewable_energy', 'Queen_of_Sheba', 'Om', 'Norman_Borlaug', 'Lucknow', 'Fertilizer', 'H._H._Holmes', 'Devil', 'Rickrolling', 'Union_of_South_Africa', 'Zayn_Malik', 'PlayStation_2', 'Scrubs_(TV_series)', 'Supreme_Court_of_the_United_States', 'Ellen_DeGeneres', 'The_Prestige_(film)', 'Northern_voalavo', 'New_Orleans', 'Carole_King', 'North_Pole', 'Maluku_Islands', 'Baku', 'Periodic_table', 'John_Wayne', 'Alexander_Fleming', 'Lloyd_Austin', 'Near-Earth_object', 'Light', 'Authoritarianism', 'Xhosa_language', 'City-state', 'Celtic_Britons', 'List_of_musical_symbols', 'Marie_Antoinette', 'Names_of_God_in_Islam', 'Kimono', 'Mads_Mikkelsen', 'Gladiator', 'Alea_iacta_est', 'Five_Families', 'Northamptonshire', 'The_Oprah_Winfrey_Show', 'Tammy_Baldwin', 'Thales_of_Miletus', 'Antoninus_Pius', 'Robin_Williams', 'Neutron', 'Royal_Air_Force', 'Sati_(practice)', 'Crossbow', 'Indiana_Jones_and_the_Last_Crusade', 'Jack_Lemmon', 'Ben_Jonson', 'Emma_(2020_film)', 'Savitribai_Phule', 'Mary_Shelley', 'Avril_Lavigne', 'Karl_Malone', 'Massacre_of_the_Innocents', 'Star_Wars', 'Walter_Benjamin', 'Traditional_Chinese_characters', 'Gideon', 'List_of_Marvel_Cinematic_Universe_films', 'Analgesic', 'Pneumonia', 'Empiricism', 'Children_of_Henry_VIII', 'Mobile_phone', 'Da_Vinci\'s_Demons', 'Positive_psychology', 'Muhammad_ibn_Abd_al-Wahhab', 'Creative_Commons_license', 'Reese_Witherspoon', 'Billie_Eilish', 'Paul_Ryan', 'Air_pollution', 'Slender_Man', 'Jack_Frost', 'Zsa_Zsa_Gabor', 'Prince_Andrew,_Duke_of_York', 'Bolivia', 'Julius_Evola', 'Gemstone', 'Dr._Stone', 'A._P._J._Abdul_Kalam', 'Jiangsu', 'Nondenominational_Christianity', 'Rudolph_the_Red-Nosed_Reindeer', 'Citizenship', 'Lin_Biao', 'Timbuktu', 'Lung', 'The_Notorious_B.I.G.', 'Melbourne', 'Metro-Goldwyn-Mayer', 'Alex_Trebek', 'Four_temperaments', 'North_African_campaign', '2011_Tōhoku_earthquake_and_tsunami', 'Bicycle', 'Lazar_Kaganovich', 'Djimon_Hounsou', 'Cricket', 'Commander-in-chief', 'Holi', 'Dinosaur', 'Joseph_of_Arimathea', 'Brookings_Institution', 'Khufu', 'European_Economic_Community', 'John_F._Kennedy', 'Pet_Shop_Boys', 'Madurai', 'Tom_Petty', 'Sirius', 'East_Berlin', 'East_Prussia', 'FC_Bayern_Munich', 'Far-right_politics', 'Hebrew_language', 'Maurice_Gibb', 'Shazam!_(film)', 'Thomas_Cochrane,_10th_Earl_of_Dundonald', 'Augustus', 'Siwa_Oasis', 'Cloud_computing', 'Soybean', 'Gini_coefficient', 'Chechens', 'Suspended_sentence', 'Impostor_syndrome', 'Red_Terror', 'Germania', 'Depression_(mood)', 'Richard_Strauss', 'Salvador_Allende', 'House_(TV_series)', 'Bob_Hope', 'Party_leaders_of_the_United_States_House_of_Representatives', 'Cock_and_ball_torture', 'Bachelor_of_Arts', 'Gasoline', 'Tibet', 'Max_Weber', 'Julie_Bowen', 'Storming_of_the_Bastille', 'Anthony_Fauci', 'The_Scarlet_Pimpernel', 'George_Washington\'s_crossing_of_the_Delaware_River', 'The_Miz', 'Organization_of_American_States', 'How_to_Train_Your_Dragon_(film)', 'Kingdom_of_Ireland', 'Queen_(band)', 'Saturn_(mythology)', 'List_of_people_known_as_the_Great', 'Grammar_school', 'Abortion', 'Mu\'in_al-Din_Chishti', 'Kazi_Nazrul_Islam', 'Trieste', 'Eccentricity_(behavior)', 'Mohamed_Salah', 'Protagonist', 'Great_Depression', 'Soviet–Afghan_War', 'Solomonic_dynasty', 'Sundown_town', 'Douglas_MacArthur', 'Guan_Yu', 'Freemasonry', 'Euripides', 'Modern_liberalism_in_the_United_States', 'Baywatch', 'Suharto', 'Piaget\'s_theory_of_cognitive_development', 'Prague_Spring', 'Odessa', 'Cystic_fibrosis', 'Russian_Civil_War', 'Mauthausen_concentration_camp', 'United_Nations', 'Pashto', 'Benjamin_Netanyahu', 'Edward_Said', 'Tashkent', 'Cornwall', 'Flower', 'Red_Fort', 'Social_Democratic_Party_of_Germany', 'Flanders', 'Public_speaking', 'Haridwar', 'House_of_Hanover', 'Methodology', 'Marriage', 'Uyghur_genocide', 'Tony_Blair', 'Porus', 'Aung_San_Suu_Kyi', 'Much_Ado_About_Nothing_(1993_film)', 'Julius_Streicher', 'Postmodernism', 'End_time', 'Q_source', 'Huey_P._Newton', 'George_Washington_Carver', 'Vatican_City', 'Apep', 'Wesley_Snipes', 'Newton\'s_law_of_universal_gravitation', 'Malaria', 'QI', 'Melissa_McCarthy', 'Beauty_and_the_Beast_(2017_film)', 'Darth_Vader', 'The_New_York_Times', 'William_Blake', 'Sting_(musician)', 'Ship_of_Theseus', 'Christmas', 'Napoleon_III', 'Hero', 'God_in_Islam', 'Joaquín_\"El_Chapo\"_Guzmán', 'Dismemberment', 'Richard_Nixon', 'Meg_Ryan', 'Slavery_in_the_United_States', 'Transgender', 'Totalitarianism', 'Marxism', 'Igbo_people', 'Honduras', 'Odyssey', 'Grey\'s_Anatomy', 'Dolph_Lundgren', 'Passover', 'Vladimir_Putin', 'God', 'Emil_Cioran', 'Chaka_Khan', 'Queen_consort', 'The_Avengers_(2012_film)', 'Battle_of_Leipzig', 'Theodicy', 'Aphorism', 'Bridge', 'Intracerebral_hemorrhage', 'Mountain', 'Freedom', 'Terrorism', 'Plymouth', 'Nicolas_Cage_filmography', 'Cambodian_Civil_War', 'Dresden', 'Wahhabism', 'Chad', 'Corruption_Perceptions_Index', 'Jill_Biden', 'Pop_music', 'Bathsheba', 'Kama_Sutra', 'Given_name', 'Comet', 'Marfan_syndrome', 'Area_51', 'Jim_Morrison', 'J._K._Rowling', 'Olga_Kurylenko', 'Brandy_Norwood', 'Francis_II_of_France', 'Bulgaria', 'Bob\'s_Burgers', 'Sic_semper_tyrannis', 'Year_of_the_Four_Emperors', 'Tuberculosis', 'PUBG:_Battlegrounds', 'James,_brother_of_Jesus', 'O_Brother,_Where_Art_Thou?', 'Hernán_Cortés', 'Interval_(music)', 'Johnson_&_Johnson', 'Gorillaz', 'Norway', 'Western_canon', 'Aamir_Khan', 'Martin_Luther_King_Jr.', 'Thomas_More', 'Dalmatia', 'Billboard_Hot_100', 'Cooking', 'Morganatic_marriage', 'Patrick_Stewart', 'The_World\'s_Billionaires', 'Bong_Joon-ho', 'Sanskrit', 'Tom_Brady', 'Shutter_Island_(film)', 'Leonard_Cohen', 'List_of_best-selling_albums', 'Jimmy_Page', 'Muslims', 'Hector', 'Eris_(mythology)', 'Scythia', 'Horn_of_Africa', 'Angolan_Civil_War', 'Guns_N\'_Roses', 'Pole_of_inaccessibility', 'Machine_learning', 'Western_Roman_Empire', 'Modernity', 'Baji_Rao_I', 'Angela_Hitler', 'Harilal_Gandhi', 'Mexico_City', 'God_in_Abrahamic_religions', 'Metallica', 'The_Who', 'Mathematics', 'Liberal_arts_education', 'Armie_Hammer', 'Fantastic_Four_(2015_film)', 'Pakistan', 'Jerusalem', 'USA_Today', 'March_6', 'Spinozism', 'Titian', 'Spanish–American_War', 'Blood_type', 'Simple_living', 'List_of_Nobel_laureates', 'Clubhouse_(app)', 'Raphael_(archangel)', 'Mutation', 'Humanities', 'Hitler_Youth', 'Allen_Ginsberg', 'Viggo_Mortensen', 'Scientist', 'Visayas', 'Yahweh', 'N,N-Dimethyltryptamine', 'How_I_Met_Your_Mother', 'Aegean_Sea', 'Sons_of_Anarchy', 'Keynesian_economics', 'A_Clockwork_Orange_(film)', 'New_Kids_on_the_Block', 'Master_of_Arts', 'University_of_Virginia', 'Hamlet_(1996_film)', 'Dogon_people', 'Mongolian_People\'s_Republic', 'Akkadian_Empire', 'Saint_George', 'Palermo', 'Elizabethan_era', 'Christmas_cracker', 'Parable_of_the_Good_Samaritan', 'Pablo_Picasso', 'Porcelain', 'Eddie_Van_Halen', 'Jacinda_Barrett', 'Magi', 'Sense_and_Sensibility', 'Ethiopian_Civil_War', 'List_of_countries_by_GDP_(PPP)', 'Nick_Cave', 'New_religious_movement', 'Biology', 'William_H._Seward', 'Javier_Bardem', 'Battle_of_the_Bulge', 'Labour_Party_(UK)', 'Website', 'Lorem_ipsum', 'Baghdad', 'Christmas_in_Ukraine', 'Virender_Sehwag', 'Martin_Sheen', 'Business_ethics', 'Polyethylene_glycol', 'Amelia_Earhart', 'Mandatory_Palestine', 'Seven_virtues', 'Jon_Bon_Jovi', 'Burmese_language', 'Statue_of_Liberty', 'Axis_powers', 'Melatonin', 'PayPal', 'Hell\'s_Kitchen_(American_TV_series)', 'Brian_May', 'Grand_Duchess_Xenia_Alexandrovna_of_Russia', 'Adriatic_Sea', 'ZZ_Top', 'North_Sea', 'United_States_Navy', 'DC_Extended_Universe', 'List_of_films_considered_the_best', 'France', 'Ma_Rainey', 'Borussia_Dortmund', 'Princess_Victoria_Louise_of_Prussia', 'Manifest_destiny', 'Marmot', 'Samuel_Barnett_(actor)', 'List_of_empires', 'Lenin\'s_Mausoleum', 'Athena', 'Lewis_Hamilton', 'Allah', 'Chicago_Seven', 'Bill_Nighy', 'Courtney_Love', 'Lucille_Ball', 'Civil_law_(legal_system)', 'McDonald\'s', 'Ned_Kelly', 'Pillory', 'Sunny_Deol', 'Goldie_Hawn', 'Consumerism', 'Amazon_River', 'Rogue_One', 'Animal', 'List_of_Nobel_Peace_Prize_laureates', 'South_Pole', 'War_on_terror', 'Kristen_Bell', 'House_of_Lords', 'Himalayas', 'Enoch', 'Amenhotep_III', 'Tilda_Swinton', 'To_be,_or_not_to_be', 'Red_Scare', 'Katharine_Hepburn', 'Indonesia', 'First_Battle_of_Bull_Run', 'List_of_films_considered_the_worst', 'BoJack_Horseman', 'Immanuel_Kant', 'Gianni_Versace', '2008_United_States_presidential_election', 'Battle_of_Crécy', 'Reformation', 'Philosophy', 'Ho_Chi_Minh_City', 'Sal_Khan', 'First_Battle_of_Panipat', 'Continent', 'Dhaka', 'Midnight_Mass', 'Financial_market', 'Polygamy', 'Rwandan_genocide', 'Old_Testament', 'Titanic_(1997_film)', 'Harriet_Beecher_Stowe', 'Iranian_peoples', 'Halsey_(singer)', 'The_Hollow_Crown_(TV_series)', 'Black_Sabbath', 'Artemis', 'Johnny_Depp', 'Kansas–Nebraska_Act', 'Riverdale_(2017_TV_series)', 'Thomas_Hardy', 'BBC', 'House_of_Hohenzollern', 'Muammar_Gaddafi', 'Pope_Francis', 'Masjid_al-Haram', 'List_of_British_monarchs', 'Samuel', 'Jeremy_Corbyn', 'Trier', 'American_Mafia', 'Telephone', 'Queen_Letizia_of_Spain', 'List_of_pornographic_performers_by_decade', 'Downfall_(2004_film)', 'Tajikistan', 'Wannsee_Conference', 'Higher_education', 'John_Malkovich', 'Seljuk_Empire', 'Cyril_Ramaphosa', 'Tahiti', 'Wil_Wheaton', 'Bath,_Somerset', 'Mehmed_the_Conqueror', 'Mughal_emperors', 'Conversion_of_Paul_the_Apostle', 'Adrenochrome', 'List_of_Christmas_carols', 'Shroud_of_Turin', 'Novella', 'Richard_Jewell', 'Four_Horsemen_of_the_Apocalypse', 'Human_rights', 'Doctor_Who', 'Tame_Impala', 'Natural_rubber', 'Gary_Oldman', 'Colin_Farrell', 'List_of_poker_hands', 'Springfield,_Illinois', 'Nazino_tragedy', 'Morgenthau_Plan', 'Hildegard_of_Bingen', 'Concept', 'Fujian', 'Musical_instrument', 'Germany_national_football_team', 'Confederation_of_the_Rhine', 'Bernard_Arnault', 'List_of_religious_populations', 'André_Previn', 'Backstreet_Boys', 'USB', 'Seleucid_Empire', 'Anti-Zionism', 'Roxana', 'Squatting', 'Conquistador', 'Nicolae_Ceaușescu', 'Illuminati', 'Thomas_Sowell', 'Omar_Sharif', 'Charles_the_Fat', 'Russian_Revolution', 'Longest_word_in_English', 'Uzbeks', 'Anne_of_Cleves', 'Social_media', 'Bankim_Chandra_Chatterjee', 'Paul_the_Apostle', 'Lord_Chancellor', 'Doris_Kearns_Goodwin', 'Persecution_of_Christians_in_the_Roman_Empire', 'Edicts_of_Ashoka', 'Measurement', 'Khudiram_Bose', 'Siddharth_Nigam', 'Spud_Webb', 'K-On!', 'Deconstruction', 'Francis_Crick', 'Early_Muslim_conquests', 'Wehrmacht', 'Magna_Carta', 'Dag_Hammarskjöld', 'Spanish_flu', 'Monism', 'Denis_Diderot', 'Hosni_Mubarak', 'Omkareshwar_Temple', 'Toronto', 'Unitarianism', 'Vedas', 'Kabbalah', 'Nimrod', 'QR_code', 'Gabapentin', 'Wisteria', 'Sri_Aurobindo', 'A_Beautiful_Mind_(film)', 'George_Floyd_protests', 'Julie_Christie', 'Egyptians', 'Catherine_de\'_Medici', 'Ranveer_Singh', 'Performing_arts', 'Heraldry', 'Judaism', 'Yunnan', 'Koine_Greek', 'Sodomy', 'Dan_Quayle', 'Christmas_stocking', 'Otorhinolaryngology', 'Theory_of_relativity', 'Catalysis', 'Palace_of_Westminster', 'Arabic_alphabet', 'Michael_Douglas', 'Wernher_von_Braun', 'The_Notebook', 'Sexual_orientation', 'Laozi', 'Telangana', 'Baphomet', 'Miniseries', 'Liquid', 'Dorian_Gray_(2009_film)', 'Monotheism', 'Pharrell_Williams', 'Franklin_D._Roosevelt', 'The_Tragedy_of_Macbeth_(2021_film)', 'Baháʼí_Faith', 'Antonio_Gramsci', 'Famine', 'A_Dangerous_Method', 'Conservative_Party_(UK)', 'Gwangjong_of_Goryeo', 'Bimbisara', 'Mohenjo-daro', 'Appalachia', 'Friedrich_Nietzsche', 'Black_Widow_(2021_film)', 'Treasure_Planet', 'Women\'s_rights', 'Rose_Byrne', 'Catherine_I_of_Russia', 'Surname', 'Dexter_(TV_series)', 'Shiva', 'Yamuna', 'Ghana_Empire', 'Dialectic', 'Humayun\'s_Tomb', 'Wallis_Simpson', 'Adam_Brody', 'Maximilian_I,_Holy_Roman_Emperor', 'List_of_programmes_broadcast_by_StarPlus', 'Secular_humanism', 'Deism', 'Classical_music', 'Mormons', 'Determinism', 'Pax_Romana', 'Kristen_Wiig', 'Teotihuacan', 'Seleucus_I_Nicator', 'Carolingian_dynasty', 'Londinium', 'Umami', 'Charlotte_Corday', 'Mammal', 'Naruto', 'Les_Invalides', 'Pineal_gland', 'Pride_and_Prejudice', 'Cripps_Mission', 'Battle_of_Cannae', 'Beastie_Boys', 'Phenomenology_(philosophy)', 'James_Harden', 'Richard_of_York,_3rd_Duke_of_York', 'Brass_instrument', 'H._P._Lovecraft', 'Richard_Neville,_16th_Earl_of_Warwick', 'New_World', 'Ram_Mohan_Roy', 'Medicine', 'Hindutva', 'Maat', 'The_Blacklist_(TV_series)', 'Gestapo', 'Celine_Dion', 'Syphilis', 'Electron', 'Great_Pyramid_of_Giza', 'William_Randolph_Hearst', 'Eadwig', 'Catalan_language', 'Julian_Assange', 'Egalitarianism', 'Alcoholic_drink', 'List_of_Bollywood_films_of_2020', 'List_of_the_verified_oldest_people', 'Istria', 'House_of_Windsor', 'Ernst_Röhm', 'Roman_Republic', 'ASCII', 'Women\'s_poll_tax_repeal_movement', 'Independence_Day_(India)', 'MAPPA_(studio)', 'Toruń', 'Imperialism', 'Pomerania', 'Al-Qaeda', 'Spanish_Christmas_Lottery', 'Gloria_Steinem', 'Highlander_(film)', 'Mount_Zion', 'Nationalism', 'Prehistory', 'Karnataka', 'Aziz_Ansari', 'Pharaoh', 'Hulagu_Khan', 'Kent', 'Ebony', 'Fascism', 'Columbia_(personification)', 'Revolutions_of_1848', 'Baltimore', 'Advent_wreath', 'Spectroscopy', 'Space_Shuttle_Discovery', 'Gone_Girl_(film)', 'Santa_Claus', 'Saturday_Night_Live', 'Microsoft_Office', 'Kashmir', 'International_Women\'s_Day', 'COINTELPRO', 'Flute', 'Debbie_Harry', 'Envy', 'Christmas_card', 'Marcus_Junius_Brutus', 'Kalman_filter', 'Sexuality_of_Adolf_Hitler', 'Robert_Falcon_Scott', 'Columbia_University', 'Council_of_Trent', 'Breast_cancer', 'Annie_Besant', 'PBS', 'Jane_Fonda', 'List_of_countries_by_GDP_(PPP)_per_capita', 'Lithuanian_language', 'Future_(rapper)', 'Franklin_Pierce', 'Franz_Liszt', 'Michael_Peña', 'Psychosexual_development', 'Korean_Empire', 'Vulva', 'Inductive_reasoning', 'Internet_meme', 'Urdu', 'Madhuri_Dixit', 'Alauddin_Khalji', 'Space_exploration', 'Henry_I_of_England', 'Luc_Besson', 'Kary_Mullis', 'Public_holidays_in_India', 'Union_Council_of_Ministers', 'HTML', 'Vanessa_Redgrave', 'Boxer_Rebellion', 'Dromedary', 'William_I,_German_Emperor', 'Menudo_(soup)', 'Martin_Heidegger', 'Company_rule_in_India', 'Erich_Ludendorff', 'Google_Earth', 'Battle_of_Passchendaele', 'Kingdom_of_Sardinia', 'Fungus', 'Flo_Rida', 'Nicholas_I_of_Russia', 'English_Civil_War', 'Cádiz', 'Incense', 'Categorical_imperative', 'Russian_Orthodox_Church', 'James_Bond', 'Melanie_C', 'Maya_Moore', 'Aircraft', 'The_Truman_Show', 'Quarter_(United_States_coin)', 'The_Terminal', 'Black_pepper', 'Lucifer_(TV_series)', 'Demiurge', 'Alphabet', 'Husayn_ibn_Ali', 'Tetragrammaton', 'Ethiopia', 'Ulaanbaatar', 'Free_market', 'Birds_of_Prey_(2020_film)', 'George_Bernard_Shaw', 'Hobart', 'Frankincense', 'Bank_of_England', 'Camila_Cabello', 'Rothschild_family', 'Basketball', 'WWE', 'Thomas_Jefferson', 'Literature', 'United_States_Army', 'American_Dad!', 'Jake_Gyllenhaal', 'Rodent', 'Hungarians', 'Ethnic_cleansing', 'Civil_engineering', 'Archery', 'Christina,_Queen_of_Sweden', 'Kevin_Smith', 'Geli_Raubal', 'Hypoglycemia', 'Infant', 'Laser', 'Dictator', 'DNA', 'Julius_Hoffman', 'Adonis', '6th_Army_(Wehrmacht)', 'Paranoia', 'Juche', '1997_Asian_financial_crisis', 'Order_of_chivalry', 'Shingles', 'Convergent_evolution', 'Peter_Singer', 'Henry_Wadsworth_Longfellow', 'Ezekiel', 'Anal_sex', 'Al-Andalus', 'Newport,_Rhode_Island', 'Paintings_by_Adolf_Hitler', 'Erich_Raeder', 'Balkans', 'Reichstag_fire', 'Cultural_Marxism_conspiracy_theory', 'Iberian_Peninsula', 'Galicia_(Spain)', 'Laura_Linney', 'ICC_Test_Championship', 'Orders,_decorations,_and_medals_of_the_United_Kingdom', 'List_of_prime_ministers_of_the_United_Kingdom', 'Gulag', 'Entrepreneurship', 'Scientific_method', 'Gettysburg_Address', 'Land_of_Punt', 'Sindh', 'Mae_West', 'Jewish_Christian', 'Fairuza_Balk', 'Toto_(band)', 'Dolphin', 'Kuru_Kingdom', 'Cupid', 'Wedding_of_Prince_Harry_and_Meghan_Markle', 'Georgia_(U.S._state)', 'Sean_Penn', 'Parthenon', 'Weimar_Republic', 'Helen_of_Troy', 'Grigori_Rasputin', 'The_Blitz', 'Sonnet_18', 'Lisbon', 'Bill_Gates', 'Empress_Matilda', 'Georgy_Malenkov', 'Sangolli_Rayanna', 'Steven_Pinker', 'Noah_Schnapp', 'Edward_Teller', 'Asturias', 'Francis_Drake', 'Secret_Santa', 'Overseas_Chinese', 'Battle_of_Actium', 'Donatello', 'Warsaw_Pact_invasion_of_Czechoslovakia', 'Historical_rankings_of_presidents_of_the_United_States', 'Silk_Road_(marketplace)', 'Sudan', 'Jack_Nicholson', 'Jared_Harris', 'Ugly_Betty', 'Harry_S._Truman', 'Ike_Turner', 'M._R._James', 'Breaking_Bad', '1755_Lisbon_earthquake', 'Romulus', 'Alan_Tudyk', 'Classical_element', 'Harry_Potter_and_the_Philosopher\'s_Stone_(film)', 'Fibromyalgia', 'Crown_of_Aragon', 'Bhima', '10_Things_I_Hate_About_You', 'Lobotomy', 'Eton_College', 'Sodom_and_Gomorrah', 'Justice_League_(film)', 'Insurance', 'River', 'Felix_Steiner', 'Mandala', 'Messiah_in_Judaism', 'Dido', 'Nicosia', 'Luxor', 'Selena', 'List_of_tallest_people', 'United_Nations_General_Assembly', 'She\'s_the_Man', 'Onyx', 'Johannes_Kepler', 'Ibrahim_of_the_Ottoman_Empire', 'David_Lloyd_George', 'Jacqueline_Kennedy_Onassis', 'Rowan_Atkinson', 'Big_Five_personality_traits', 'Flag_of_France', 'The_Wizard_of_Oz_(1939_film)', 'Alyson_Hannigan', 'Sex_position', 'Puyi', 'Idi_Amin', 'Algorithm', 'Inside_Out_(2015_film)', 'Hirohito', 'Wassailing', 'USS_Constitution', 'List_of_Star_Trek_films_and_television_series', 'English_longbow', 'Indulgence', 'Prostate_cancer', 'Silk_Road', 'Trinidad', 'Theism', 'Babe_Ruth', 'Neo-Babylonian_Empire', 'Mughal_architecture', 'Rumi', 'March_1933_German_federal_election', 'List_of_stadiums_by_capacity', 'Aide-de-camp', 'Zodiac', 'Amy_Winehouse', 'Taliban', 'El_Shaddai', 'Roman_calendar', 'Tempeh', 'Date_palm', 'Jacobean_era', 'Rosamund_Pike', 'Scramble_for_Africa', 'Samuel_Taylor_Coleridge', 'Education', 'Edwina_Mountbatten,_Countess_Mountbatten_of_Burma', 'Bradley_Cooper', 'Shirley_Temple', 'LaVeyan_Satanism', 'Khilafat_Movement', 'Subversion', 'As_You_Like_It', 'David_Cameron', 'Gilles_Deleuze', 'Edo_period', 'Indian_Rebellion_of_1857', 'Larry_Bird', 'Samuel_Morse', 'Ptolemy_I_Soter', 'Minecraft', 'Aluminium', 'The_Lion_King_(2019_film)', 'The_Times', 'Yangtze', 'Fate/stay_night', 'Silent_film', 'Matthew_Perry', 'Martin_Van_Buren', 'Three-dimensional_space', 'Polymerase_chain_reaction', 'Craig_Ferguson', 'The_Dark_Knight_(film)', 'Big_Little_Lies_(TV_series)', 'Staten_Island', 'Rachel_Dolezal', 'Styx', 'Copenhagen', 'Tonga', 'Rachel_Weisz', 'Ali_al-Sistani', 'Golden_Horde', 'Temperature', 'Medes', 'Constipation', 'Messianic_Judaism', 'Cyanide', 'Asia_Cup', 'Maryland', 'Adobe_Photoshop', 'Sakhalin', 'Americas', 'Salamander_letter', 'Office_of_Strategic_Services', 'Aeneas', 'Wet_nurse', 'Robert_De_Niro', 'Alex_Ferguson', 'Terracotta_Army', 'Sikkim', 'German_Revolution_of_1918–1919', 'Bebop', 'Income_tax_in_the_United_States', 'Netherlands', 'Mark_Hamill', 'Lawrence_Kohlberg\'s_stages_of_moral_development', 'Margrethe_II_of_Denmark', 'United_States_Department_of_Justice', 'Central_Powers', 'Gospel_of_Matthew', 'Kim_Dae-jung', 'Donkey', 'Northrop_Grumman_B-2_Spirit', 'Eurocopter_AS350_Écureuil', 'Edmund_Spenser', 'Southeast_Europe', 'Thanos', 'Full_Metal_Jacket', 'Plague_(disease)', 'Eiffel_Tower', 'Mark_Twain', 'Atlético_Madrid', 'Palestine_(region)', 'Henry_V_of_England', 'Battle_of_Thermopylae', 'Euphoria_(American_TV_series)', 'Dream_of_the_Red_Chamber', 'Telescope', 'Neolithic_Revolution', 'Ashkenazi_Jews', 'Seth', 'Siren_(mythology)', 'Cheese', 'Attachment_theory', 'Mikhail_Bakunin', 'Kendrick_Lamar', 'Ted_Kennedy', 'Princess_Marina_of_Greece_and_Denmark', 'René_Girard', 'Pederasty', 'Mormonism', 'West_Nile_virus', 'Gothic_fiction', 'Mauritania', 'Neutering', 'Pat_Tillman', 'César_Gaviria', 'Richard_Branson', 'Me_Too_movement', 'Ja\'far_al-Sadiq', 'Wudu', 'Rudy_Giuliani', 'Christmas_carol', 'Ethnic_groups_in_Europe', 'Godzilla_(franchise)', 'Constitution_of_India', 'Buddhism', 'Ed_Sheeran', 'Employment', 'World_War_I', 'Norse_mythology', 'List_of_languages_by_number_of_native_speakers', 'Military', 'Burgess_Meredith', 'Smyrna', 'Asthma', 'Thebes,_Egypt', 'Articles_of_Confederation', 'Achilles', 'Bogotá', 'Jaisalmer', 'Stephen,_King_of_England', 'Tom_Jones_(singer)', 'France_24', 'Carrie_Fisher', 'Georgian_language', 'Hertfordshire', 'Jessica_Chastain', 'J._J._Watt', 'Multiculturalism', 'Battle_of_Haldighati', 'Perth', 'Kyrgyzstan', 'Ziggurat_of_Ur', 'Black_Panther_Party', 'Twelve_Tribes_communities', 'Miscarriage', 'Nasdaq', 'Yankee_Doodle', 'Peter_II_of_Yugoslavia', 'West_Side_Story', 'Rome', 'Al_Pacino', 'University_of_Glasgow', 'Rurik_dynasty', 'Joel_Osteen', 'Bob_Dylan', 'Indian_mathematics', 'Chaitanya_Mahaprabhu', 'Battle_of_Stalingrad', 'Pope_Clement_VII', 'Nagpur', 'Benzodiazepine', 'List_of_Christian_denominations_by_number_of_members', 'Dante\'s_Inferno_(video_game)', 'Gospel_of_Luke', 'Natural_law', 'James_Woods', 'Otto_von_Bismarck', 'Lion_Capital_of_Ashoka', 'Bengal', 'Research_stations_in_Antarctica', 'Theology', 'Albigensian_Crusade', 'Yitzhak_Rabin', 'Kristallnacht', 'Nick_Nolte', 'Prosperity_theology', 'Darius_the_Great', 'Pepin_the_Short', 'The_Social_Network', 'Unit_of_measurement', 'Kumbh_Mela', 'Human_penis', 'Eschatology', 'Edmund_I', 'Duran_Duran', 'Marxism–Leninism', 'Battles_of_Saratoga', 'Volga_Germans', 'Ögedei_Khan', 'Amyotrophic_lateral_sclerosis', 'Harvey_Keitel', 'Pollution', 'Matriarchy', 'Shanghai', 'Homosexuality_in_ancient_Greece', 'Far_Cry_3', 'Dogma', 'Gender', 'Harem', 'Boy_George', 'Psychoanalytic_theory', 'Chopsticks', 'Gender_equality', 'Mental_health_of_Jesus', 'Sitar', 'Adam_Levine', 'Fluvoxamine', 'Wilhelm_II,_German_Emperor', 'Val_Kilmer', 'Joseph_Campbell', 'Urban_planning', 'Lamprey', 'Homer', 'Coyote', 'Ilkhanate', 'Dr._Dre', 'Saṃsāra', 'Mantra', 'Daylight_saving_time', 'Political_status_of_Taiwan', 'Sertraline', 'Noah', 'Musical_notation', 'Shahada', 'Hermann_Hesse', 'Michael_Somare', 'Denzel_Washington', 'Turkic_peoples', 'Hamburg', 'MIDI', 'Baltic_Sea', 'American_Idol', 'RNA', 'Accounting', 'The_Birth_of_a_Nation', 'Assassination_of_James_A._Garfield', 'Cate_Blanchett', 'Nineveh', 'Growth_of_religion', 'Mick_Jagger', 'Eric_Harris_and_Dylan_Klebold', 'African_National_Congress', 'Zootopia', 'Infinity', 'Middle_age', 'Execution_of_the_Romanov_family', 'French_Revolutionary_Wars', 'Korean_drama', 'Dunning–Kruger_effect', 'Talmud', 'Cambridge', 'Placenta', 'Brokeback_Mountain', 'Human_Development_Index', '2021_storming_of_the_United_States_Capitol', 'Virtue', 'Tragedy', 'Hadith', 'German_battleship_Tirpitz', 'Anglican_Communion', 'Encyclopedia', 'Andrea_Bocelli', 'Music_theory', 'Perseverance_(rover)', '27_Club', 'World_War_II', 'Chalukya_dynasty', 'Genealogy_of_Jesus', 'Torah', 'Nancy_Sinatra', 'Nervous_system', 'Alphabet_Inc.', 'French_Second_Republic', 'Victor_Emmanuel_II_of_Italy', 'Josephine_Baker', 'Qin_dynasty', 'Federal_government_of_the_United_States', 'Hawaiian_Islands', 'Malaysia', 'Rose_McGowan', 'Manusmriti', 'Jewish_holidays', 'Casey_Affleck', 'Rashtrakuta_dynasty', 'All_India_Trinamool_Congress', 'Selim_II', 'The_Specials', 'Holy_Roman_Emperor', 'Good_Will_Hunting', 'New_York_City_draft_riots', 'French_Algeria', 'The_Bachelor_(American_TV_series)', 'Mozambique', 'Metric_system', 'Joe_Biden', 'Manhattan', 'Nikolaj_Coster-Waldau', 'Complaint_tablet_to_Ea-nasir', 'Sexuality_in_ancient_Rome', 'Muhammad\'s_children', 'Sultan', 'Stoicism', 'Stonehenge', 'Cyrus_the_Great', 'Epicureanism', 'Color', 'American_Indian_Wars', 'Theravada', 'Central_bank', 'Vinland', 'Turkey', 'Steve_Jobs', 'Quakers', 'Hillary_Clinton', 'Edmund_Hillary', 'Æthelred_the_Unready', 'Polio', 'Angina', 'Sumerian_religion', 'German_Peasants\'_War', 'Sport_of_athletics', 'Motilal_Nehru', 'Gandhi_(film)', 'Isabeau_of_Bavaria', 'Werner_Heisenberg', 'Thoth', 'T._S._Eliot', 'Patron_saint', 'Burqa', 'The_Last_of_Us', 'Mercury_(planet)', 'Timothée_Chalamet', 'Werwolf', 'International_Men\'s_Day', 'Suicide', 'Pre-Raphaelite_Brotherhood', 'Guam', 'Audre_Lorde', 'John_of_the_Cross', 'Senate_of_Pakistan', 'Sister_Wives', 'Whoopi_Goldberg', 'Eyes_Wide_Shut', 'Tanzania', 'Corporation', 'Wisdom', 'COVID-19_pandemic_in_the_United_Kingdom', 'Papal_States', 'Eva_Longoria', 'Rabies', 'Founding_Fathers_of_the_United_States', 'Fulbright_Program', 'Miller–Urey_experiment', 'Antibiotic', 'Switzerland', 'Henry_III_of_France', 'The_Exorcist_(film)', 'Socrates', 'Cape_of_Good_Hope', 'Game_theory', 'Michael_(archangel)', 'Second_Punic_War', 'War_of_the_League_of_Cambrai', 'MS_Dhoni', 'Phil_Spector', 'Consummation', 'Nitrogen', 'Babylon', 'Jane_Lynch', 'Fall_of_the_Western_Roman_Empire', 'Nirvana_(Buddhism)', 'Legends_of_Catherine_the_Great', 'The_Cat_in_the_Hat', 'Inca_Empire', 'Bill_Russell', 'Sid_Meier', 'Mennonites', 'Henrik_Ibsen', 'Cult_of_personality', 'American_Civil_War', 'Indian_Premier_League', 'Internet_Archive', 'Newfoundland_(island)', 'Phil_McGraw', 'The_Birds_(film)', 'Freedom_Caucus', 'Nikolai_Bukharin', 'Russian_Empire', 'Stellan_Skarsgård', 'Castoreum', 'Louis_Antoine,_Duke_of_Angoulême', 'The_Hu', 'Richard_Simmons', 'The_Trial_of_the_Chicago_7', 'Erwin_Rommel', 'Simón_Bolívar', 'Lincoln_Memorial', 'Odysseus', 'Julie_Andrews', 'Kingdom_of_Judah', 'Proud_Boys', 'Aleksandr_Dugin', 'Radar', 'Jiddu_Krishnamurti', 'David_Duke', 'Vietnam_War', 'Horace', 'House_of_Cards_(American_TV_series)', 'Sobriquet', 'Aerosmith', 'Hank_Williams', 'Jonathan_(tortoise)', 'Navajo', 'Blue_Ridge_Mountains', 'List_of_Tor_onion_services', 'Helsinki', 'Charles_VI,_Holy_Roman_Emperor', 'William_Howard_Taft', 'Battle_of_Kursk', 'Indian_people', 'Quicksilver_(Marvel_Comics)', 'Fundamental_rights_in_India', 'Frank_Zappa', 'Lead', 'Liberal_conservatism', 'Flat_Earth', 'Hundred_Days', 'List_of_cities_in_India_by_population', 'Diana_Ross', 'Janis_Joplin', 'Krishna', 'Crossword', '2022_FIFA_World_Cup', 'Sex_and_the_City', '2021_Myanmar_coup_d\'état', 'Religion_in_pre-Islamic_Arabia', 'Vaishnavism', 'Carl_von_Clausewitz', 'Elon_Musk', 'Victoria,_British_Columbia', 'Africa', 'Orlando_Bloom', 'Tió_de_Nadal', 'July_Monarchy', 'Praetorian_Guard', 'Ravenna', 'Flag_carrier', 'Tom_Hayden', 'The_Invisible_Man_(2020_film)', 'C._Rajagopalachari', 'Somalis', 'Scots_language', 'The_Faerie_Queene', 'Proteus', 'Body_mass_index', 'Satyagraha', 'Inflation', 'Jesus', 'Bulgarian_language', 'Lin-Manuel_Miranda', 'Saint_Petersburg', 'Babirusa', 'Embryo', 'MENA', 'Mustafa_I', 'United_Nations_peacekeeping', 'Mark_Antony', 'William_McKinley', 'Thomas_the_Apostle', 'Archaeological_Survey_of_India', 'William_Luther_Pierce', 'History_of_Africa', 'Freudian_slip', 'The_Temptations', 'Forest_Whitaker', 'Damascus', 'Apocalypto', 'Juneteenth', 'Bob_Barker', 'Southern_United_States', 'Alexander_Pushkin', 'Zach_Braff', 'Pfizer', 'Cannon', 'Antisemitism', 'Decembrist_revolt', 'Brian_Jones', 'The_Godfather_Part_II', 'Savannah,_Georgia', 'Gospel', 'List_of_major_perpetrators_of_the_Holocaust', 'Anne_Hathaway_(wife_of_Shakespeare)', 'Finance', 'Roman_consul', 'Equatorial_Guinea', 'Guardians_of_the_Galaxy_(film)', 'Joel_Edgerton', 'Catch_Me_If_You_Can', 'Alhambra', 'Soft_power', 'History_of_ancient_Israel_and_Judah', 'Pomegranate', 'Devil_in_Christianity', 'Lymphoma', 'Maine_Coon', 'Sea_of_Azov', 'Southern_Poverty_Law_Center', 'Radio_Free_Europe/Radio_Liberty', 'Ostrich', 'Ian_Holm', 'Jacobin', 'J._Edgar_Hoover', 'Thérèse_of_Lisieux', 'Presidency_of_Donald_Trump', 'Kuomintang', 'Hema_Malini', 'Dreyfus_affair', 'Muhteşem_Yüzyıl', 'Briseis', 'Germanicus', 'Aniplex', 'Muslim_conquest_of_Persia', 'Erasmus', 'University_of_Paris', 'Aztec_Empire', 'Autodidacticism', 'Assam', 'Dadabhai_Naoroji', 'Elizabeth_Schuyler_Hamilton', 'Xiongnu', 'Cristiano_Ronaldo', 'Gremlins', 'Sex', 'Clitoris', 'Watergate_scandal', 'Nature_(journal)', 'Prince_Richard,_Duke_of_Gloucester', 'Critics\'_Choice_Movie_Awards', 'Nadezhda_Alliluyeva', 'Zinedine_Zidane', 'Margaret_Tudor', 'Ralph_Waldo_Emerson', 'AK-47', 'Lauren_Bacall', 'United_States_Department_of_the_Treasury', 'Epicurus', 'War_of_1812', 'Tractatus_Logico-Philosophicus', 'Cold_Mountain_(film)', 'Judiciary', 'University_of_California,_Los_Angeles', 'Joanna_Lumley', 'Maronite_Church', 'Thomas_Mann', 'Shania_Twain', 'Islam_in_India', 'Tom_Hiddleston', 'Species', 'Tallulah_Bankhead', 'Kate_Beckinsale', 'Anthony_the_Great', 'Iran–Iraq_War', 'Bank', 'Carnation_Revolution', 'Corps', 'Kevin_Durant', 'Provence', 'Jurassic_Park', 'Louisiana', 'Java', 'Fresco', 'Māori_people', '1954_Guatemalan_coup_d\'état', 'Crime', 'Mars_rover', 'Princess_Alexandra,_The_Honourable_Lady_Ogilvy', 'Novosibirsk', 'Mental_state', 'Edward_the_Black_Prince', 'Ben_Folds', 'Dam', 'History_of_Greece', 'Marcia_Gay_Harden', 'Sexual_intercourse', 'Calculus', 'Wolf\'s_Lair', 'Soil', 'Kepler\'s_Supernova', 'Guru_Nanak', 'Volkswagen', 'Pertinax', 'Jennifer_Aniston', 'Caracalla', 'England', 'Letter_(message)', 'Filioque', 'Nimitz-class_aircraft_carrier', 'Contras', 'Cusco', 'Michael_B._Jordan', 'Celibacy', 'Zhang_Ziyi', 'Ankylosing_spondylitis', 'Angela_Davis', 'ER_(TV_series)', 'Croats', 'Grey_Wolves_(organization)', 'List_of_sovereign_states_and_dependent_territories_in_Africa', 'Ted_Turner', 'State_atheism', 'The_Hunger_Games', 'Islamic_sexual_jurisprudence', 'Iron_Age', 'Infanticide', 'Paramilitary', 'Red_Dragon_(2002_film)', 'International_Space_Station', 'Penélope_Cruz', 'Confederate_States_of_America', 'Alfred_Molina', 'Economics', 'Zanzibar', 'From_each_according_to_his_ability,_to_each_according_to_his_needs', 'Penis_envy', 'Memphis,_Egypt', 'Academy_Awards', 'Union_(American_Civil_War)', 'Kuril_Islands', 'Elizabeth_(biblical_figure)', 'Jacob', 'Silver', 'Trinity_College,_Cambridge', 'Lady_Macbeth', 'Swahili_language', 'Jane_Austen', 'Steely_Dan', 'The_West_Wing', 'Vikings', 'Belgrade', 'California_grizzly_bear', 'USS_Pueblo_(AGER-2)', 'Tomb_of_the_Unknown_Soldier_(Arlington)', 'List_of_most-viewed_YouTube_videos', 'Non-binary_gender', 'Western_culture', 'Paramount_Pictures', 'Ibn_al-Haytham', 'Taarak_Mehta_Ka_Ooltah_Chashmah', 'Germanic_peoples', 'Alt-right', 'Dragoon', 'Larry_Page', 'K._Kamaraj', 'Charlemagne', 'Battle_of_the_Little_Bighorn', 'Byelorussian_Soviet_Socialist_Republic', 'Avatar', 'Portia_de_Rossi', 'Iggy_Pop', 'Freddie_Mercury', 'National_Hockey_League', 'Ninety-five_Theses', 'Matthew_Macfadyen', 'Léa_Seydoux', 'Pan_Am_Flight_103', 'Modern_Monetary_Theory', 'Tamale', 'Smallville', 'Mince_pie', 'Warren_Buffett', 'Alpha_and_Omega', 'Mochi', 'Battle_of_Gettysburg', 'John_Lithgow', 'Round_Table_Conferences_(India)', 'Patrice_O\'Neal', 'Nuclear_warfare', 'Trade_union', 'San_Francisco', 'Tampere', 'Globe_Theatre', 'List_of_legendary_creatures_by_type', 'Hallaca', 'Glasgow', 'Coeliac_disease', 'Tool', 'Bastet', 'Haider_(film)', 'Nefertari', 'Heaven\'s_Gate_(religious_group)', 'List_of_islands_of_Greece', 'Hindustani_language', 'Thomas_Robert_Malthus', 'North_India', 'Immaculate_Conception', 'The_Emergency_(India)', 'Republic_of_Genoa', 'MacKenzie_Scott', 'This_Is_Spinal_Tap', 'Fulton_J._Sheen', 'Monty_Python', 'Asteroid', 'Late_Middle_Ages', '7_March_Speech_of_Bangabandhu', 'Kingdom_of_Aksum', 'Vice_President_of_the_United_States', 'List_of_Greek_mythological_figures', 'German_occupation_of_Czechoslovakia', 'Lilith', 'Belsnickel', 'Pocahontas', 'Indian_Army', 'Taurus_(astrology)', 'Caitlyn_Jenner', 'Gaels', 'Lil_Uzi_Vert', 'Giorgio_Agamben', 'Alex_Jones', 'Turkic_languages', 'Bibi_Ka_Maqbara', 'C_(programming_language)', 'Parenting', 'Mercury_(mythology)', 'Pannonian_Avars', 'Manchu_people', 'Lesotho', 'Legion_of_Honour', 'Weapon', 'Murray_Rothbard', 'Neptune_(mythology)', 'Atmosphere_of_Earth', 'Christopher_Columbus', 'Steve_Wozniak', 'Personal_computer', 'Edward_I_of_England', 'Django_Unchained', 'Tata_Group', 'Malleus_Maleficarum', 'Teetotalism', 'Old_English', 'Linus_Pauling', 'Guyana', 'Cayman_Islands', 'Operation_Downfall', 'SWOT_analysis', 'Arthur,_Prince_of_Wales', 'Mumps', 'Lisa_Lopes', 'Boeing_777', 'Louis_L\'Amour', 'Ancient_Greece', 'George_Chakiris', 'Roman_legion', 'Amaravati', 'Charles_I_of_England', 'Didius_Julianus', 'Septuagint', 'Thesis', 'University_of_Cambridge', 'Lake', 'Iraq_War', 'Sino-Soviet_split', 'Aaliyah', 'Yuri_Gagarin', 'Rolling_Stone', 'The_Fresh_Prince_of_Bel-Air', 'Cryptocurrency', 'Abdul_Ghaffar_Khan', 'Philip_II_of_Spain', 'Tom_Holland_(author)', 'Quantum_computing', 'Night_of_the_Long_Knives', 'Hurdy-gurdy', 'Kashmiri_language', 'Shining_Path', 'History_of_Germany', 'Adhan', 'Grassland', 'Muslim_world', 'Communist_Party_of_the_Soviet_Union', 'Lebanese_Civil_War', 'SpongeBob_SquarePants', 'Luiz_Inácio_Lula_da_Silva', 'Code_of_conduct', 'Tommy_Lee', 'Vishwanath_Pratap_Singh', 'Scarlet_Witch', 'Mark_Thatcher', 'Constantine_the_Great', 'Mary_Anning', 'Pope_Pius_IX', 'Midian', 'Genetics', 'Anti-Defamation_League', 'Lana_Condor', 'Alchemy', 'Bernese_Mountain_Dog', 'Barcelona', 'Charles_IV_of_Spain', 'Unitarian_Universalism', 'Qibla', 'Family_of_Mahatma_Gandhi', 'Rhineland', 'Hemu', 'Glenn_Close', 'George_IV', 'Jean_Giraud', 'Geocentric_model', 'Holocaust_victims', 'Cesar_Chavez', 'Ankhesenamun', 'World', 'Sonia_Gandhi', 'Oscar_Pistorius', 'Tina_Fey', 'Dead_Sea_Scrolls', 'Fellatio', 'Purgatory', 'Dave_Grohl', 'C_major', 'Romulus_and_Remus', 'Queer', 'Jeddah', 'Captain_Marvel_(DC_Comics)', 'Herodotus', 'Narcissistic_personality_disorder', 'Royal_Households_of_the_United_Kingdom', 'Total_war', 'Dunkirk_(2017_film)', 'Crips', 'Nativity_of_Jesus', 'Partitions_of_Poland', 'Social_science', 'Fran_Lebowitz', 'Dawoodi_Bohra', 'British_Army', 'Warren_Hastings', 'Solar_energy', 'Westworld_(TV_series)', 'Taxi_Driver', 'Book_of_Common_Prayer', 'Ark_of_the_Covenant', 'Dome_of_the_Rock', 'The_Internationale', 'Star_of_Bethlehem', 'Allegory_of_the_cave', 'Murad_I', 'Concorde', 'Lord', 'Kevin_Spacey', 'Human_body', 'Richard_III_(play)', 'Cyprus', 'Gymnastics', 'The_Thinker', 'Berlin', 'Measles', 'Eadred', 'Apsis', 'Duke_Ellington', 'John_J._Pershing', 'Oval_Office', 'Eugene_Levy', 'Rockwell_B-1_Lancer', 'Second-wave_feminism', 'Tower_of_London', 'Chinese_Civil_War', 'Charles_V,_Holy_Roman_Emperor', 'Snegurochka', 'Original_sin', 'Buffy_the_Vampire_Slayer', 'Patna', 'Mandolin', 'Bluetooth', 'Martin_Bormann', 'Albert_Schweitzer', 'Skathi_(moon)', 'Cave_of_the_Patriarchs', 'Pascal\'s_wager', 'Spruce', 'Ecosystem', 'South_India', 'Jesse_James_(entrepreneur)', 'Starship_Troopers_(film)', 'Twitch_(service)', 'Nobel_Peace_Prize', 'NORAD_Tracks_Santa', 'Nepal', 'Bharat_Ratna', 'Time', 'Lisa_(rapper)', 'Stephen_Jay_Gould', 'Apocrypha', 'Legality_of_cannabis_by_U.S._jurisdiction', 'Pythia', 'Internet_of_things', 'Alcibiades', 'Quinoa', 'Darren_Aronofsky', 'Nadezhda_Krupskaya', 'Ethics', 'Christopher_Marlowe', 'Conscription', 'Josef_Mengele', 'Æthelstan', 'Haifa', 'Francis_I_of_France', 'Sweyn_Forkbeard', 'Addison_Rae', 'Alfred_Adler', 'Madrid', 'Red_velvet_cake', 'Germany', 'Domantas_Sabonis', 'William_Tyndale', 'Leonhard_Euler', 'Francis_II,_Holy_Roman_Emperor', 'Democracy_Index', 'Native_Americans_in_the_United_States', 'Zwarte_Piet', 'Islamic_schools_and_branches', 'Pandya_dynasty', 'Astrology', 'Zakir_Husain_(politician)', 'Blink-182', 'Garry_Kasparov', 'Simeon_(Gospel_of_Luke)', 'Siege_of_Baghdad_(1258)', 'Mahmud_of_Ghazni', 'Space_telescope', 'Halakha', 'Carpentry', 'Sandro_Botticelli', 'Antarctica', 'Daniel_Radcliffe', 'Monica_Bellucci', 'Peyton_Manning', 'Frozen_II', 'Revolution', 'Julia_Child', 'Mariam-uz-Zamani', 'Maggie_Smith', 'Tribe', 'Technology', 'Structure_of_Earth', 'Abstract_art', 'Natalie_Portman', 'Jonas_Brothers', 'John_Quincy_Adams', 'Joseph_P._Kennedy_Sr.', 'Word', 'Crossing_the_Rubicon', 'Walrus', 'Onward_(film)', 'Puri', 'Zoom_Video_Communications', 'Bernie_Mac', 'Nisse_(folklore)', 'Mustard_gas', 'Arrhythmia', 'Capricorn_(astrology)', 'Daniel_Bryan', 'Timurid_Empire', 'Tiger_Woods', 'W._B._Yeats', 'Kingdom_of_Israel_(Samaria)', 'Thomas_Becket', 'The_Office_(American_TV_series)', 'Ivan_Pavlov', 'Hagiography', 'Iberian_Union', 'Phonograph_record', 'Alfred_the_Great', 'Armenia', 'Isabel_Allende', 'Abiogenesis', 'Rouen', 'Black_Lives_Matter', 'Pasteurization', 'Democratic_socialism', 'American_Pie_(film)', 'Time_100:_The_Most_Important_People_of_the_Century', 'Ludacris', 'Cecil_B._DeMille', 'Roger_Moore', 'Paladin', 'Axiom', 'Leonidas_I', 'Dictatorship_of_the_proletariat', 'Forest', 'Deity', 'Photosynthesis', 'Brooklyn_Nets', 'Car', 'Charles_VIII_of_France', 'Blood_libel', 'Barry_Goldwater', 'Harry_Potter', 'Plum', 'David_Hilbert', 'Women\'s_suffrage', 'Bill_Maher', 'Aldous_Huxley', 'Anne,_Princess_Royal', 'Robert_the_Bruce', 'Synesthesia', 'Edmund_Burke', 'Assassin\'s_Creed_Syndicate', 'Charles,_Prince_of_Wales', 'Hajj', 'War_of_the_Spanish_Succession', 'Swami_Vivekananda', 'Rajya_Sabha', 'Frederick_the_Great', 'Conium_maculatum', 'Audrey_Hepburn', 'Satavahana_dynasty', 'Catherine_of_Siena', 'Caspian_Sea', 'Agatha_Christie', 'Nanda_Empire', 'Richard_Attenborough', 'Dominican_Republic', 'Fifth_column', 'Dawson\'s_Creek', 'Wigilia', 'Roman_mythology', 'XXX_(2002_film)', 'Daniel_Dennett', 'Depeche_Mode', 'Basel', 'National_Rally', 'United_Nations_Security_Council', 'Richard_Harris', 'Frederick_II,_Holy_Roman_Emperor', 'George_Armstrong_Custer', 'Circus_Maximus', 'Science', 'Clint_Eastwood', 'Wi-Fi', 'Stomach_cancer', 'Christmas_Eve', 'Truth', 'Hungarian_Revolution_of_1956', 'The_Economist', 'Helen_Mirren', 'Michigan', 'Magnum,_P.I.', 'United_Arab_Emirates', 'Dissolution_of_the_Soviet_Union', 'Government', 'Viking_Age', 'Charles_Lindbergh', 'Bobby_Seale', 'Hayreddin_Barbarossa', 'Octave', 'Sarnath', 'Supply_and_demand', 'Nikolay_Yezhov', 'Turkmenistan', 'Betsy_Ross_flag', 'State_religion', 'Fiction', 'Margaret_Guido', 'Mercedes-Benz', 'Isabella_of_Valois', 'Konrad_Adenauer', 'Camel', 'List_of_cities_in_the_United_Kingdom', 'List_of_tallest_buildings', 'Emmanuel_Macron', 'Father_Christmas', 'Heath_Ledger', 'Vincent_Cassel', 'Johann_Sebastian_Bach', 'Henry_VIII', 'Amleth', 'Popular_culture', 'Nile', 'Tablighi_Jamaat', 'Calendar', 'Jean-Jacques_Rousseau', 'Slavery_in_ancient_Rome', 'Alicia_Vikander', 'High_Middle_Ages', 'Judah_(son_of_Jacob)', 'Isma\'ilism', 'Brahman', 'Robert_Hooke', 'Mental_disorder', 'Werner_Herzog', 'Salvador_Dalí', 'Empathy', 'Kyrsten_Sinema', 'Budapest', 'Judea', 'Family_Guy', 'Equator', 'Alfred_Dreyfus', 'Bangladesh', 'Paris_(mythology)', 'Francisco_Pizarro', 'Illyria', 'Dmitri_Mendeleev', 'Mustafa_Kemal_Atatürk', 'Ariana_Grande', 'Sputnik_V_COVID-19_vaccine', 'Colombia', 'Luis_Carrero_Blanco', 'Order_of_Assassins', 'Neurology', 'Charles_de_Gaulle', 'Russell_Crowe', 'Tuscany', 'Olivia_de_Havilland', 'Khan_Academy', 'Equality_Act_(United_States)', 'Astolfo', 'KGB', 'Caesarion', 'Non-penetrative_sex', 'Mr._&_Mrs._Smith_(2005_film)', 'Martin_Luther', 'Aircraft_carrier', 'Nicolas_Sarkozy', 'Kwame_Nkrumah', 'Cynicism_(philosophy)', 'Republic_(Plato)', 'EBay', 'Existential_crisis', 'Jimmy_Wales', 'Bindusara', 'Nawazuddin_Siddiqui', 'Pol_Pot', 'Martial_law', 'Nation_of_Islam', 'Oliver_Hardy', 'Polycystic_ovary_syndrome', 'Entheogen', 'Salvadoran_Civil_War', 'French_Army', 'Coventry', 'The_Simpsons', 'Printing_press', 'Lahore', 'Underworld', 'Departments_of_France', '2019–21_ICC_World_Test_Championship', 'Bisexuality', 'KickassTorrents', 'Castration', 'Snoop_Dogg', 'Dogecoin', 'Keith_Richards', 'George_W._Bush', 'Berghof_(residence)', 'Bread', 'Master_race', 'Tabula_rasa', 'Phalanx', 'Battle_Hymn_of_the_Republic', 'Goebbels_children', 'Battle_of_Stones_River', 'Robert_Greene_(American_author)', 'Abu_Hanifa', 'Celtic_languages', 'Battle_of_Badr', 'Lok_Sabha', 'Henry_V_(play)', 'Shahnameh', 'Deliverance', 'Akbar_II', 'Triangle', 'Julia_Ormond', 'Tatya_Tope', 'Lindsay_Lohan', 'Greek_underworld', 'The_Last_of_Us_Part_II', 'Jamal_Khashoggi', 'Chris_Martin', 'Central_Park', 'Roger_Ebert', 'Operation_Sea_Lion', 'Frequency', 'Hindu_Mahasabha', 'Isabella_Rossellini', 'The_Seven_Deadly_Sins_(manga)', 'Kingdom_of_Württemberg', 'Bantu_languages', 'Ethiopian_Orthodox_Tewahedo_Church', 'Ulysses_(novel)', 'Indiana_Jones_and_the_Temple_of_Doom', 'Henan', 'Vincent_van_Gogh', 'Akhenaten', 'Charles_Bronson', 'Generation_Z', 'Oracle', 'Academy_Award_for_Best_Actor', 'A_Portrait_of_the_Artist_as_a_Young_Man', 'Helen_McCrory', 'Bernadette_Soubirous', 'World_Trade_Organization', 'President_of_India', 'New_Caledonia', 'Prague', 'His_Dark_Materials_(TV_series)', 'Damian_Lewis', 'Psychiatrist', 'Algiers', 'Video', 'HarperCollins', 'Yellow_Emperor', 'Byzantium', 'Looney_Tunes', 'Empire_of_the_Sun_(film)', 'Lupita_Nyong\'o', 'Writing', 'De_facto', 'Vienna', 'Galicia_(Eastern_Europe)', 'The_Canterbury_Tales', 'Volgograd', 'Gaul', 'Fast_Times_at_Ridgemont_High', 'Guangzhou', 'The_Last_Supper_(Leonardo)', 'Iron_Maiden', 'Lucian_Freud', 'Lech_Wałęsa', 'Medici_(TV_series)', '117th_United_States_Congress', 'Adjective', 'Indian_Space_Research_Organisation', 'Granada', 'Astrological_sign', 'Slipknot_(band)', 'Bill_Hader', 'Tantra', 'Willem-Alexander_of_the_Netherlands', 'Catharsis', 'Nintendo_Switch', 'Leonardo_da_Vinci', 'Ramakrishna_Mission', 'Amazon_rainforest', 'Psalms', 'Jesus,_King_of_the_Jews', 'Jared_Leto', 'Dominion', 'X-Men_(film_series)', 'Man_of_Steel_(film)', 'Neil_Gaiman', 'Theresa_May', 'Bede', 'Tibia', 'John_Kerry', 'Plagues_of_Egypt', 'Fluoxetine', 'Clara_Barton', 'Sturmabteilung', 'Alexandria,_Virginia', 'Taíno', 'Anger', 'Trenton,_New_Jersey', 'Rob_Reiner', 'Ronnie_James_Dio', 'Marlene_Dietrich', 'Winnie_Madikizela-Mandela', 'Judaism\'s_view_of_Jesus', 'Ramanuja', 'Panama_City', 'List_of_popular_Christmas_singles_in_the_United_States', 'Gestalt_psychology', 'Taoism', 'Developmental_psychology', 'Coup_d\'état', 'Psychological_projection', 'Sierra_Leone', 'Superstition', 'Bayezid_II', 'Prime_Video', 'Demi_Moore', 'Psychoanalysis', 'Festival', 'Thanksgiving_(United_States)', 'Presidential_Medal_of_Freedom', 'Portugal', 'Sovereign_state', 'Bhagavad_Gita', 'Hanafi', 'Surrender_of_Japan', 'Louis_XIV', 'Mary,_mother_of_Jesus', 'F._W._de_Klerk', 'Hearst_Castle', 'Semiotics', 'Christian_cross', 'Non-fungible_token', 'Cunnilingus', 'Petroleum', 'Will_Poulter', 'Saint_Helena', 'Sarah_Michelle_Gellar', 'Essay', 'National_Fascist_Party', 'Speaker_(audio_equipment)', 'Voice_of_America', 'National_Democratic_Party_of_Germany', 'Übermensch', 'Wes_Anderson', 'Tyler_Hoechlin', 'Alcohol_intoxication', 'PubMed', 'Italian_Fascism', 'List_of_countries_by_GDP_(nominal)', 'Oliver_Stone', 'Bell_hooks', 'Shem', 'Tundra', 'Wood', 'Essenes', 'Nicole_Kidman', 'Border_Collie', 'Anarcho-communism', 'Vegetarianism', 'Chivalry', 'History_of_the_Quran', 'Édgar_Ramírez', 'Oligarchy', 'Arctic_Circle', 'House_of_York', 'Kailash_Satyarthi', 'Jyotirlinga', 'Violin', 'North_Carolina', 'Helen_Reddy', 'Ringo_Starr', 'Turkish_invasion_of_Cyprus', 'D._H._Lawrence', 'Input/output', 'Henry_FitzRoy,_Duke_of_Richmond_and_Somerset', 'Maimonides', 'Josh_Hawley', 'Boeing_B-52_Stratofortress', 'Baruch_Spinoza', 'Indigenous_peoples', 'Atherosclerosis', 'The_Tale_of_the_Bamboo_Cutter', 'Guinea', 'Schizophrenia', 'Microsoft_Teams', 'Thelema', 'Yurt', 'Christmas_music', 'Adoration_of_the_Magi', 'General_Dynamics_F-16_Fighting_Falcon', 'Grinch', 'Sherlock_Holmes', 'Angels_&_Demons_(film)', 'Horrible_Histories_(2009_TV_series)', 'Nicolás_Maduro', 'Henry,_Duke_of_Cornwall', 'News', 'George_Eliot', 'Martin_Scorsese', 'Middlesbrough', 'List_of_Christmas_films', 'Hungary', 'Mao_Zedong', 'Free_content', 'Paul_Revere', 'Caspar_(magus)', 'Phrygia', 'Marvel_Studios', 'Roman_Polanski', 'Mike_Krzyzewski', 'Gothic_Revival_architecture', 'Tanning_(leather)', 'Italian_language', 'Mary_I_of_England', 'David_Suchet', 'Samarkand', 'Scorched_earth', 'Fortnite', 'Idea', 'Psychiatry', 'Bhupesh_Baghel', 'IP_address', 'Grammar', 'Greek_Dark_Ages', 'List_of_countries_by_foreign-exchange_reserves', 'Neelam_Sanjiva_Reddy', 'Stockholm_syndrome', 'Danny_DeVito', 'Variance', 'Set_(deity)', 'Chris_Pratt', 'China_Central_Television', 'Homeland_(TV_series)', 'Joseph_(Genesis)', 'Coco_Chanel', 'Tonne', 'Archimedes', 'Leopold_I,_Holy_Roman_Emperor', 'Rick_Ross', 'Hangul', 'Weak_interaction', 'Xenophon', 'Intellectual_property', 'Electromagnetic_radiation', 'Mehmed_IV', 'The_Washington_Post', 'Kalki', 'List_of_countries_and_dependencies_by_population_density', 'Chinese_characters', 'Addiction', 'Jeff_Bezos', 'Jim_Valvano', 'Crustacean', 'Amazon_(company)', 'Secular_state', 'Royal_Mint_(Spain)', 'Zhuge_Liang', 'Golden_State_Warriors', 'Io_(mythology)', 'Aishwarya_Rai_Bachchan', 'Star-Crossed_(album)', 'Extermination_camp', 'Random_House', 'Tony_Curtis', 'Angelsberg', 'Malware', 'Bajrangi_Bhaijaan', 'Terminator_Genisys', 'Deaths_in_2015', 'Suicide_Squad', 'Jurassic_World', 'Flags_of_the_Confederate_States_of_America', 'Pluto', 'Joaquín_Guzmán_Loera', 'Baahubali_(film)', '2015_CONCACAF_Gold_Cup', 'Minions_(film)', 'True_Detective_(TV_series)', 'List_of_Bollywood_films_of_2015', 'Independence_Day_(United_States)', 'Satoru_Iwata', 'Ruby_Rose', 'Yakub_Memon', 'Bobbi_Kristina_Brown', 'New_Horizons', 'Ddd', '2015_in_film', 'Abby_Wambach', 'Bahubali', 'Battleground_(2015)', 'Mr._Robot_(TV_series)', 'Wayward_Pines', 'Margot_Robbie', 'Prabhas', 'FIFA_Women\'s_World_Cup', 'Meek_Mill', 'List_of_Steven_Universe_episodes', '2014–15_English_Premiership_(rugby_union)', 'Death_of_Sandra_Bland', 'Conor_McGregor', 'List_of_highest-grossing_Bollywood_films', 'United_States_women\'s_national_soccer_team', 'Carli_Lloyd', 'List_of_True_Detective_episodes', 'UFC_189', 'Emilia_Clarke', 'Pixels_(2015_film)', 'Hope_Solo', 'Fetty_Wap', 'Sense8', 'Chris_Kyle', '2015_FIFA_Women\'s_World_Cup', 'Dragon_Ball_Super', 'Eiji_Tsuburaya', '2015_Copa_América', 'Trainwreck_(film)', 'Dustin_Brown_(tennis)', 'Magic_Mike_XXL', 'Royal_Canadian_Mounted_Police', 'Southpaw_(film)', 'Humans_(TV_series)', 'Alex_Morgan', 'List_of_Suits_episodes', 'Manchester_United_F.C.', 'List_of_Ayatollahs', 'Harper_Lee', 'List_of_Orange_Is_the_New_Black_episodes', 'Amanda_Peterson', 'Martina_Hingis', 'Jade_Helm_15_conspiracy_theories', 'Harshaali_Malhotra', 'Ted_2', 'Bastian_Schweinsteiger', 'List_of_Running_Man_episodes', 'Rachel_McAdams', 'Plantronics_Headset', 'Uniform_resource_locator', 'Deadpool', 'Jules_Bianchi', 'Pretty_Little_Liars_(season_6)', '2014–15_Top_14_season', 'Andy_Murray', 'Rafael_Nadal', 'The_Championships,_Wimbledon', 'Enchantress_(DC_Comics)', 'Furious_7', 'Big_Brother_17_(U.S.)', 'S._S._Rajamouli', '2015_Wimbledon_Championships', 'Ant-Man', 'Cropsey_(film)', 'Pan_American_Games', 'Pretty_Little_Liars_(TV_series)', 'Naturism', 'Nuclear_magnetic_resonance_spectroscopy', 'Methaqualone', 'Sunny_Leone', 'The_Gallows', 'Terminator_(franchise)', 'Vyapam_Scam', 'Paul_Rudd', '2014–15_National_League_2_South', 'Paper_Towns', '2014–15_National_League_1', '2014–15_National_League_2_North', 'Chanel_West_Coast', 'Ida_B._Wells', 'Moshe_Dayan', 'Paul_Walker', 'Ex_Machina_(film)', 'Mia_Khalifa', 'Organisation_Internationale_des_Constructeurs_d\'Automobiles', 'Shahid_Kapoor', 'Drake_(rapper)', 'Teen_Wolf_(season_5)', 'Eid_al-Fitr', '2015_International_Champions_Cup', 'Baahubali', 'Suits_(TV_series)', '2014–15_Pro12', 'Special_Night_Squads', 'List_of_Presidents_of_the_United_States', 'Go_Set_a_Watchman', 'Deadshot', 'Lil_Wayne', 'Greek_government-debt_crisis', 'SummerSlam_(2015)', 'Lyme_disease', 'Dan_Bilzerian', 'Whitney_Houston', 'Garbiñe_Muguruza', 'Ellen_Pao', '2015_Tour_de_France', 'XXX', 'Kepler-452b', 'N.W.A', 'Jai_Courtney', 'CONCACAF_Gold_Cup', 'The_Weeknd', 'Blue_moon', 'List_of_Game_of_Thrones_episodes', '.xxx', 'Tour_de_France', 'Internet_Movie_Database', 'Ashley_Madison', 'Tiger_Memon', 'Heather_Watson', 'Kendall_Jenner', 'Magic_Mike', 'List_of_file_formats', '2015–16_UEFA_Champions_League', 'Brock_Lesnar', 'Paper_Towns_(film)', 'Jason_Lee_(actor)', 'Eazy-E', 'The_Maze_Runner', 'Penny_Dreadful_(TV_series)', 'Scream_(TV_series)', 'Audio_bit_depth', 'Rana_Daggubati', 'Game_of_Thrones_(season_5)', 'Jennifer_Garner', 'United_States_presidential_election,_2016', 'Jazz_Jennings', 'The_Strain_(TV_series)', 'Joker_(comics)', 'Deadpool_(film)', 'Kourtney_Kardashian', 'Amber_Heard', 'Megan_Rapinoe', 'List_of_Pretty_Little_Liars_episodes', 'Chelsea_F.C.', 'Vacation_(2015_film)', '2015_Pan_American_Games', 'Teen_Wolf_(2011_TV_series)', 'Zoo_(TV_series)', 'Power_(TV_series)', 'Anushka_Shetty', 'Papanasam_(film)', 'Nicholas_Winton', 'Zach_Johnson', 'Joan_Sebastian', 'Chris_Froome', 'Real_Madrid_C.F.', 'List_of_Hannibal_episodes', 'The_Fast_and_the_Furious', 'Divergent_(film)', 'Seth_MacFarlane', 'Matteo_Darmian', 'Liverpool_F.C.', 'MasterChef_Australia_(series_7)', 'Jason_Statham', 'Mary-Kate_Olsen', 'Kris_Jenner', 'Scott_Eastwood', 'Spy_(2015_film)', 'Uber_(company)', 'Fifty_Shades_of_Grey', 'Jason_Todd', '2015–16_UEFA_Europa_League', 'ABCD_2', 'Daredevil_(TV_series)', 'List_of_Wimbledon_gentlemen\'s_singles_champions', 'Straight_Outta_Compton_(2015_film)', 'List_of_UFC_events', 'Jack_Black', 'House_of_Cards_(U.S._TV_series)', '2015_Wimbledon_Championships_–_Men\'s_Singles', 'Matt_Bomer', '7_July_2005_London_bombings', 'Steven_Universe', 'The_Open_Championship', 'Under_the_Dome_(TV_series)', 'Chad_Mendes', 'Rooting_(Android_OS)', 'Fifth_Harmony', 'Magnet_link', 'PK_(film)', 'Calvin_Harris', 'Jared_Fogle', 'The_Bella_Twins', 'Crime_&_Investigation_Network_(Europe)', 'UFC_190', 'Vyapam_scam', 'Craig_Cobb', 'Amy_Poehler', 'Sarah_Huffman', 'Dawood_Ibrahim', 'Tamannaah', 'Eid_Mubarak', 'Blake_Lively', 'Jordan_Spieth', 'Iker_Casillas', 'April_2015_Nepal_earthquake', 'Jupiter_Ascending', 'Madonna_(entertainer)', 'Oliver_Sipple', 'XXXX', 'Copa_América', 'Captain_Boomerang', 'Raheem_Sterling', 'Tyga', 'It_Follows', 'Joe_Manganiello', 'Empire_(2015_TV_series)', 'Jason_Clarke_(actor)', 'Terminator_Salvation', 'Jidenna', 'List_of_Grand_Slam_men\'s_singles_champions', 'Fury_(2014_film)', 'The_100_(TV_series)', 'Ken_Stabler', 'Arsenal_F.C.', 'The_Longest_Ride_(film)', 'Amanda_Seyfried', 'Taylor_Kitsch', 'The_Last_Ship_(TV_series)', 'Dreams_Worth_More_Than_Money', 'Ballers', 'List_of_most_viewed_YouTube_videos', 'Premam', 'Wet_Hot_American_Summer', 'Jordan_Belfort', 'Descendants_(2015_film)', 'List_of_Suicide_Squad_members', '2015_Super_Rugby_season', 'Robin_van_Persie', 'Rick_Flag', 'Hugh_Glass', 'The_Shawshank_Redemption', 'Boris_Becker', 'Hotmail', 'Bad_Blood_(Taylor_Swift_song)', 'Gus_Grissom', 'Srebrenica_massacre', 'Bella_Thorne', 'Henry_VIII_of_England', 'Jeb_Bush', 'Drishyam_(2015_film)', 'PartyNextDoor', 'List_of_Arrow_episodes', 'Assassin\'s_Creed', 'Sasha_Grey', 'Alan_Shepard', 'Ray_Donovan', 'Shailene_Woodley', 'Bobby_Brown', 'San_Andreas_(film)', 'Steffi_Graf', 'List_of_Pixar_films', 'Candis_Cayne', 'Creed_(film)', 'Arda_Turan', 'Andy_Roddick', 'Olivia_Munn', 'The_Maze_Runner_(film)', 'Lisa_Ann', 'Matthew_McConaughey', 'Anna_Faris', 'Girl_Meets_World', 'Kurt_Cobain', '2015_ICC_World_Twenty20_Qualifier', 'Brittany_Murphy', 'Ivana_Trump', 'MasterChef_(U.S._season_6)', 'Billie_Piper', 'Supernatural_(U.S._TV_series)', 'Elizabeth_Olsen', 'Focus_(2015_film)', 'Dolph_Ziggler', 'True_Detective_(season_2)', 'Anna_Kendrick', 'Christian_Benteke', 'List_of_Teen_Wolf_episodes', 'RMS_Titanic', 'Hugh_Jackman', 'Fear_the_Walking_Dead', 'Old_Course_at_St_Andrews', 'Leah_Remini', 'Floyd_Mayweather,_Jr.', 'Youtube', 'Dilwale_(2015_film)', 'Doug_Hegdahl', 'Miles_Teller', 'Iran–Contra_affair', 'Rashida_Jones', 'Agents_of_S.H.I.E.L.D.', 'Morgan_Schneiderlin', 'Hyundai_Atos', 'Pitch_Perfect_2', 'Despicable_Me', 'Allegiant_(novel)', 'Gotham_(TV_series)', 'American_Sniper_(film)', 'Rick_and_Morty', 'Gucci_Mane', 'Maari_(film)', '2014–15_RFU_Championship', 'Woman_in_Gold', 'Macaulay_Culkin', 'List_of_WWE_NXT_special_episodes', 'Brothers_(2015_film)', 'Slipknot_(comics)', 'United_States_men\'s_national_soccer_team', 'Sania_Mirza', 'Apocalypse_(comics)', 'Charlie_Hunnam', 'Rami_Malek', 'Drishyam', 'Dark_Matter_(TV_series)', 'Kit_Harington', 'Peter_Dinklage', 'List_of_Gravity_Falls_episodes', 'The_Astronaut_Wives_Club', 'Kate_Mara', 'John_Wick_(film)', 'Outlander_(TV_series)', 'Manchester_City_F.C.', 'St._Vincent_(musician)', 'Eris_(dwarf_planet)', 'Jamie_Clayton', 'True_Story_(film)', 'Whiplash_(2014_film)', 'Android_version_history', 'The_Vampire_Diaries', 'Amazon.com', 'Taylor_Schilling', 'LaMarcus_Aldridge', 'Sophie_Turner_(actress)', 'Pete_Sampras', 'The_Winds_of_Winter', 'Home_(2015_film)', 'Christie_Rampone', 'Sia_Furler', 'Naseem_Hamed', 'List_of_Walt_Disney_Pictures_films', 'Robert_Downey,_Jr.', 'Special_Olympics_World_Games', 'Big_Hero_6_(film)', 'Paige_(wrestler)', 'Hank_Pym', 'El_Diablo_(comics)', 'Patrick_Swayze', '2016_Summer_Olympics', 'List_of_Doctor_Who_serials', 'Blake_Shelton', 'The_Warriors_(film)', 'Alexis_Tsipras', 'Sofía_Vergara', 'History_of_Bălţi', 'Scott_Carpenter', 'Self/less', 'Ryan_Gosling', 'John_Eleuthère_du_Pont', 'Joaquín_Guzmán', 'Britt_Robertson', 'Chedorlaomer', 'Dashrath_Manjhi', 'Bed_size', 'Amanda_Waller', 'Abdullah_Ensour', 'Divergent_trilogy', 'Lena_Headey', 'Great_white_shark', 'Sharknado', 'Underworld_(film_series)', 'Years_&_Years', 'Raees_(film)', 'Akira_(film)', 'Rae_Sremmurd', 'China_Netcom', 'Donnie_Wahlberg', 'Kristen_Stewart', 'Syrian_Civil_War', 'Criminal_Minds', 'List_of_Girl_Meets_World_episodes', 'Bowhead_whale', 'Bajirao_Mastani_(film)', 'Martin_Luther_King,_Jr.', 'Lycos', 'Terry_Kath', 'Phir_Bhi_Na_Maane...Badtameez_Dil', '2015_NBA_draft', 'Donald_Glover', '2018_FIFA_World_Cup_qualification', 'Memphis_Depay', 'Two-state_solution', 'Roger_Rees', 'Ant-Man_(Scott_Lang)', 'Major_Lazer', 'Linda_Hamilton', 'Iggy_Azalea', 'Piper_Kerman', 'Deepika_Padukone', 'Arthur_Ashe_Courage_Award', 'Chappie_(film)', 'Katie_Holmes', 'I_(film)', 'Trevi_Fountain', 'DC_Comics\'_shared_universe_films', 'Juventus_F.C.', 'Khloé_Kardashian', 'CM_Punk', 'Roddy_Piper', 'Kurt_Russell', 'Life_Is_Strange', 'Ramya_Krishnan', 'Masters_of_Sex', '2015_FIVB_Volleyball_World_Grand_Prix', 'Scoville_scale', 'Ali_Krieger', 'T.I.', '1993_Bombay_bombings', 'Oskar_Schindler', 'List_of_One_Piece_episodes', 'Mosquito', 'Courteney_Cox', 'Murder_of_Martha_Moxley', 'Servando_Carrasco', 'CBS_Sports_Network', 'Teenage_Mutant_Ninja_Turtles', 'Pia_Mia', 'John_McEnroe', 'Vikings_(TV_series)', 'Nick_Kyrgios', 'Anonymous_(group)', 'Andy_Griffith', 'Andre_Agassi', 'Jason_Momoa', 'DeAndre_Jordan', 'Emma_Roberts', 'Tommy_Cooper', 'Avan_Jogia', '2015_Wimbledon_Championships_–_Women\'s_Singles', 'Jeffrey_Dahmer', 'WGN_America', 'Hell_on_Wheels_(TV_series)', 'Jack_and_Jill_(2011_film)', 'Jessie_J', 'Velociraptor', 'Miranda_Lambert', 'Charlie_Puth', 'List_of_Fairy_Tail_episodes', 'Lee_Norris', 'Killing_of_Cecil_the_lion', 'Shraddha_Kapoor', 'Megan_Fox', 'Cards_Against_Humanity', 'Elizabeth_I_of_England', 'The_Gift_(2015_film)', 'List_of_films_based_on_Marvel_Comics', 'List_of_Game_of_Thrones_characters', 'Sergio_Romero', 'Kuiper_belt', 'Galapagos_shark', 'What.CD', 'Frank_Gifford', 'Suge_Knight', 'Duke_Kahanamoku', 'Kathie_Lee_Gifford', 'Tiananmen_Square_protests_of_1989', 'Until_Dawn', 'Cilla_Black', 'Jerry_Heller', 'Compton_(album)', 'Megyn_Kelly', 'The_Man_from_U.N.C.L.E._(film)', 'Ben_Carson', 'MC_Ren', 'Chikki_Panday', 'Carly_Fiorina', 'DJ_Yella', 'Rebecca_Ferguson_(actress)', 'Radhe_Maa', 'Straight_Outta_Compton', 'Jon_Stewart', 'The_Man_from_U.N.C.L.E.', 'Jason_Day_(golfer)', '2015_World_Championships_in_Athletics', 'Zero-day_(computing)', 'Cecil_(lion)', 'Phantom_(2015_film)', 'Wes_Craven', 'Premier_of_the_People\'s_Republic_of_China', 'Tyler_Lockett', 'Baigong_Pipes', 'The_Visit_(2015_film)', 'O\'Shea_Jackson,_Jr.', 'Arabian_Prince', 'Sinister_2', 'Whitey_Bulger', 'O\'Shea_Jackson_Jr.', 'Morton_Downey,_Jr.', 'Cristiane_Justino', '2015_MTV_Video_Music_Awards', 'Laura_Spelman_Rockefeller', 'Justin_Theroux', 'Pedro_(footballer,_born_July_1987)', 'Chris_Farley', 'Legionnaires\'_disease', 'David_Foster_Wallace', 'We_Are_Your_Friends_(film)', 'Hurricane_Katrina', 'The_D.O.C.', 'Helga_Estby', 'Srimanthudu', 'Café_Coffee_Day', 'No_Escape_(2015_film)', 'Raksha_Bandhan', 'La_Tomatina', 'Sinister_(film)', 'Manjhi_-_The_Mountain_Man', '21_Jump_Street', 'Hero_(2015_film)', 'List_of_Rick_and_Morty_episodes', 'Colonel_Sanders', 'Reliance_Industries', 'Tillingdale', 'Narcos', 'Beauty_Behind_the_Madness', 'King_of_Na_gold_seal', 'Dark_Web', 'Fantastic_Four', 'Eva_Carneiro', '2015_Tianjin_explosions', 'Black_Mass_(film)', 'Compton,_California', 'Kroy_Biermann', 'Birdman_(film)', 'The_Hateful_Eight', 'Show_Me_a_Hero', 'Stephen_Amell', 'Junior_Seau', 'Elephant', 'Josh_Duggar', 'Corey_Hawkins_(actor)', 'Jane_Wilde_Hawking', 'Leptin', 'Jenna_Jameson', '2015_Teen_Choice_Awards', 'Joycelyn_Elders', 'UFC_191', 'Sean_Price', 'Judith_Sheindlin', 'Unfriended', 'Dental_floss', '2014–15_Premier_League', 'Hailee_Steinfeld', 'Rosie_O\'Donnell', '2015_World_Aquatics_Championships', 'Emily_Ratajkowski', 'Mundaneum', 'Hawker_Hunter', 'George_Hamilton_(actor)', 'Night_of_Champions_(2015)', 'Blackfish_(film)', 'Cultural_depictions_of_Napoleon', 'Salma_Hayek', 'Death_Row_Records', 'John_Stamos', 'America\'s_Next_Top_Model_(cycle_22)', 'Weegee', 'Bob_Saget', 'John_Kasich', 'Turia_Pitt', 'American_Ultra', '2015–16_Premier_League', 'Fred_Trump', 'Bethe_Correia', 'Kevin_De_Bruyne', 'Attack_on_Titan_(film)', 'Darryl_Dawkins', 'Radhika_Apte', 'Chris_Hyndman', 'Ariel_Winter', 'Chloë_Grace_Moretz', 'Andre_Berto', 'Julian_Bond', 'Republican_Party_presidential_candidates,_2016', 'Amelia_Dyer', 'Water_pollution', 'Marla_Maples', 'All_Is_Well_(film)', 'Dove_Cameron', 'Seth_Rollins', 'Justin_Gatlin', 'Shri_Radhe_Maa', 'Hayden_Panettiere', 'Marco_Rubio', 'Michael_Oher', 'Anthony_Martial', 'Mahesh_Babu', 'Windows_10_editions', 'Full_House', 'Susan_Wojcicki', 'The_Daily_Show', 'Michel\'le', 'Burning_Man', 'List_of_The_Walking_Dead_episodes', 'Ruthless_Records', 'The_Walking_Dead_(season_5)', 'Puli_(2015_film)', 'Tila_Tequila', 'Athiya_Shetty', 'Bloodline_(TV_series)', 'Triple_X_syndrome', 'Gimli_Glider', 'Stuart_Broad', 'Alex_(parrot)', 'FIFA_16', 'Mamie_Gummer', 'Ikemefuna_Enemkpali', 'Heidi_Klum', 'Aloha_(film)', 'Meow_(cat)', 'Wayne_Rooney', 'Sub-Zero_(Mortal_Kombat)', 'Owen_Wilson', 'Foxcatcher', 'Nina_Hartley', 'Downton_Abbey', 'Gina_Carano', 'Triple_H', 'Thomas_Silverstein', 'Farrah_Abraham', 'Indrani_Mukerjea', 'Pierce_Brosnan', 'Oliver_Sacks', 'John_Oliver_(comedian)', 'Republican_Party_presidential_debates,_2016', 'River_Phoenix', 'Robert_Emmet_Odlum', 'Michelle_Rodriguez', 'Welcome_Back_(film)', 'Edge_of_Tomorrow_(film)', 'Xenu', '19_Kids_and_Counting', 'Yvonne_Craig', 'Troian_Bellisario', 'Candace_Cameron_Bure', 'Kim_Zolciak', 'Onam', 'Justin_Wilson_(racing_driver)', 'List_of_Super_Bowl_champions', 'Mark_Schultz_(wrestler)', 'Tig_Notaro', 'Stan_Lee', 'Rare_Replay', 'Michael_Vick', 'List_of_countries_by_life_expectancy', 'Twenty_One_Pilots', 'Mario_Balotelli', 'Little_League_World_Series', 'Aftermath_Entertainment', 'The_Whispers_(TV_series)', 'Little_Mix', 'State_Council_of_the_People\'s_Republic_of_China', 'Stephen_Colbert', 'Shawn_Hornbeck', 'Everybody\'s_Gone_to_the_Rapture', 'Fanta', 'Alia_Bhatt', 'Shruti_Haasan', 'Roman_Reigns', 'Heroes_Reborn_(miniseries)', 'Matt_LeBlanc', 'List_of_schools_of_veterinary_medicine', 'List_of_Hindi_film_clans', 'Kray_twins', 'California_Job_Case', 'New_York', 'Lil_Eazy_E', 'El_Niño', 'Warrior_(2011_film)', 'The_Theory_of_Everything_(2014_film)', 'J._Cole', 'Lake_Bell', 'Michael_Showalter', 'Heroes_(TV_series)', 'Wiz_Khalifa', 'Charlotte_(anime)', 'Neymar', 'A.F.C._Bournemouth', 'Theo_James', 'The_Game_(rapper)', 'List_of_WWE_pay-per-view_events', 'Old_Faithful', 'Margaret_Sanger', 'Amber_Rose', 'Christian_Longo', 'Shooting_of_Michael_Brown', 'Mary-Kate_and_Ashley_Olsen', 'Doctor_Doom', 'Okto', 'Proyecto_40', 'XHamster', 'Stranger_Things_(TV_series)', 'AMGTV', 'Gene_Wilder', 'Deaths_in_2016', 'Killing_of_Harambe', 'Lali_Espósito', 'List_of_Olympic_Games_host_cities', 'Ryan_Lochte', '2024_Summer_Olympics', 'SummerSlam_(2016)', '2012_Summer_Olympics_medal_table', 'Katie_Ledecky', 'Rayleigh_length', 'All-time_Olympic_Games_medal_table', 'Rustom_(film)', 'No_Man\'s_Sky', 'India_at_the_2016_Summer_Olympics', '2018_Winter_Olympics', 'Sausage_Party', 'List_of_Bollywood_films_of_2016', 'Comma-separated_values', 'UFC_202', '2016_Summer_Olympics_medal_table', 'Mohenjo_Daro_(film)', 'Nicole_Johnson_(Miss_California_USA)', 'The_Night_Of', 'Football_at_the_2016_Summer_Olympics', 'The_Get_Down', 'K._M._Nanavati_v._State_of_Maharashtra', 'Caster_Semenya', 'Kerri_Walsh_Jennings', 'Colin_Kaepernick', 'Decathlon', '2012_Summer_Olympics', 'Don\'t_Breathe_(2016_film)', 'Pokémon_Go', '2016_in_film', '404.php', 'Mo_Farah', 'Jason_Bourne_(film)', 'Channel_S', 'Joseph_Schooling', 'India_at_the_Olympics', 'Summer_Olympic_Games', 'Paul_Pogba', 'Ashton_Eaton', 'War_Dogs_(2016_film)', 'Anahí', 'Athletics_at_the_2016_Summer_Olympics', 'Ben-Hur_(2016_film)', 'Kabali_(film)', 'Heptathlon', 'La7', 'Big_Brother_18_(U.S.)', 'IPTV', '2016–17_UEFA_Champions_League', 'Pooja_Hegde', 'List_of_multiple_Olympic_medalists', 'Swimming_at_the_2016_Summer_Olympics', 'Star_Trek_Beyond', 'Juan_Gabriel', 'Laurie_Hernandez', 'Florence_Foster_Jenkins', 'Bourne_(film_series)', 'Nathan_Adrian', 'United_States_at_the_2016_Summer_Olympics', 'Ilona_Staller', 'Blonde_(Frank_Ocean_album)', 'Nadia_Comăneci', 'Goods_and_Services_Tax_Bill', 'Nate_Diaz', 'Drew_Barrymore', 'Jaden_Smith', 'Ghostbusters_(2016_film)', 'Sultan_(2016_film)', 'Basketball_at_the_2016_Summer_Olympics', 'Tennis_at_the_2016_Summer_Olympics', 'Zika_virus', '2008_Summer_Olympics_medal_table', 'Volleyball_at_the_2016_Summer_Olympics', 'Christ_the_Redeemer_(statue)', 'List_of_multiple_Olympic_gold_medalists', 'Whale_fall', 'Gymnastics_at_the_2016_Summer_Olympics', 'Tic_Tac', 'Huma_Abedin', 'Chronological_summary_of_the_2016_Summer_Olympics', '2016_Summer_Olympics_Parade_of_Nations', 'Misty_May-Treanor', 'Tom_Daley', 'List_of_Mr._Robot_episodes', 'Pullela_Gopichand', 'Gord_Downie', 'The_Tragically_Hip', 'Modern_pentathlon', 'Béla_Károlyi', 'Carolina_Marín', 'Lights_Out_(2016_film)', 'Now_You_See_Me_2', 'Ben-Hur_(1959_film)', 'A_Flying_Jatt', 'Janam_TV', 'Chesley_Sullenberger', '2016_Summer_Olympics_opening_ceremony', 'Nastia_Liukin', 'Margaret_Abbott', 'Gilda_Radner', 'HTTPS', 'List_of_Pokémon', 'WWE_Universal_Championship', 'April_Ross', 'Kubo_and_the_Two_Strings', 'Murder_of_JonBenét_Ramsey', 'Ian_Thorpe', '2008_Summer_Olympics', '2012_Benghazi_attack', 'Antonio_Di_Natale', 'India_at_the_2012_Summer_Olympics', 'Backlash_(2016)', '2016–17_UEFA_Europa_League', 'Dipa_Karmakar', 'United_States_men\'s_national_basketball_team', 'Maya_DiRado', 'Carl_Lewis', 'Eddie_\"The_Eagle\"_Edwards', 'Andre_De_Grasse', 'The_Chainsmokers', 'Are_You_the_One?', 'W_(TV_series)', 'Great_Britain_at_the_2016_Summer_Olympics', 'Winter_Olympic_Games', 'Joel_Kinnaman', 'Battle_of_Dunkirk', 'Joanna_Rowsell', 'Sully_(film)', 'Doctors_(2016_TV_series)', 'Efraim_Diveroli', 'Fallschirmjäger', '2022_Winter_Olympics', 'Alex_Rodriguez', 'Finn_Bálor', 'Mark_Spitz', 'Florence_Griffith_Joyner', 'Badminton_at_the_2016_Summer_Olympics', 'Olympic_symbols', 'Gary_Johnson', 'Sakshi_Malik', 'Simone_Manuel', '2016_MTV_Video_Music_Awards', 'US_Airways_Flight_1549', '2016_United_States_men\'s_Olympic_basketball_team', 'Dishoom', 'The_Legend_of_Tarzan_(film)', 'John_Saunders_(journalist)', 'Omnium', 'Juan_Rivera_(wrongful_conviction)', 'Pretty_Little_Liars_(season_7)', 'The_Jungle_Book_(2016_film)', 'Spy_Hard_(song)', 'Redbad,_King_of_the_Frisians', 'Missy_Franklin', 'List_of_IOC_country_codes', 'Lee_Chong_Wei', 'List_of_Pokémon_episodes_(seasons_1–13)', 'Lucas_Pérez', 'Jay_Hernandez', 'Teyana_Taylor', 'Shawn_Johnson', 'The_Secret_Life_of_Pets', '100_metres', 'Laura_Trott', 'Loyalty_(monument)', 'Galaxy_Quest', 'Joseph_Christopher', 'Allyson_Felix', 'Refugee_Olympic_Team_at_the_2016_Summer_Olympics', 'Michael_Johnson_(sprinter)', 'Dave_Franco', 'List_of_world_records_in_swimming', 'Fierce_Five', 'Dab_(dance)', 'Tim_Curry', 'Shameless_(U.S._TV_series)', 'UFC_203', 'Jordan_Rodgers', 'Mónica_Puig', 'Glory_(Britney_Spears_album)', 'David_Packouz', 'Greenland_shark', 'Wayde_van_Niekerk', 'Jill_Stein', 'Nick_Diaz', 'Madison_Kocian', 'Node.js', 'Dak_Prescott', 'Wrestling_at_the_2016_Summer_Olympics', '2004_Summer_Olympics', 'Duffer_Brothers', 'Golf_at_the_2016_Summer_Olympics', 'Irresistible_force_paradox', 'Peregrine_falcon', 'Basketball_at_the_2016_Summer_Olympics_–_Men\'s_tournament', 'Jesse_Owens', 'Justice_Smith', 'Nerve_(2016_film)', '1996_Summer_Olympics', 'United_States_at_the_Olympics', '1992_United_States_men\'s_Olympic_basketball_team', 'Nineteenth_Amendment_to_the_United_States_Constitution', 'Anton_Yelchin', 'Volleyball_at_the_2016_Summer_Olympics_–_Men\'s_tournament', 'Jason_Kenny', 'Urjit_Patel', 'Great_Britain_at_the_Olympics', 'Finding_Dory', '2000_Summer_Olympics', 'Anthony_Weiner', 'Márta_Károlyi', '2016_Summer_Olympics_closing_ceremony', 'The_Shallows_(film)', 'Cinderella_and_Four_Knights', 'Bad_Moms', 'Katana_(comics)', 'Pete\'s_Dragon_(2016_film)', 'Roberto_Durán', 'Olympic_flame', 'Love_You_Forever', 'Men\'s_100_metres_world_record_progression', 'Ewok', 'Oksana_Chusovitina', 'Fast_8', 'Triathlon', 'Football_at_the_Summer_Olympics', 'Late_Bronze_Age_collapse', 'Julia_Stiles', 'Boxing_at_the_2016_Summer_Olympics', 'Pokémon_(anime)', 'Cupping_therapy', 'Uncontrollably_Fond', 'Aliya_Mustafina', 'Preacher_(TV_series)', 'Football_at_the_2016_Summer_Olympics_–_Men\'s_tournament', 'Cycling_at_the_2016_Summer_Olympics', '2004_Summer_Olympics_medal_table', 'Rugby_sevens_at_the_2016_Summer_Olympics', 'Robert_Liston', 'The_Conjuring_2', 'Independent_Olympians_at_the_Olympic_Games', 'Chad_le_Clos', 'Game_of_Thrones_(season_6)', 'Juan_Martín_del_Potro', 'Happy_Bhag_Jayegi', 'Thomas_Day', 'Lin_Dan', 'The_Girl_on_the_Train_(novel)', 'Shkodran_Mustafi', 'Adewale_Akinnuoye-Agbaje', 'Kellyanne_Conway', 'Harambe', 'Warcraft_(film)', 'Hans-Gunnar_Liljenwall', 'Volleyball_at_the_2016_Summer_Olympics_–_Women\'s_tournament', 'David_Harbour', 'Hybrid_Air_Vehicles_HAV_304_Airlander_10', 'Albert_I_of_Belgium', 'Great_Britain_at_the_2012_Summer_Olympics', 'Fiji', 'List_of_2016_Summer_Olympics_broadcasters', 'Seth_Rogen', 'Gerald_Grosvenor,_6th_Duke_of_Westminster', 'Pretty_Little_Liars', 'Jacqueline_Fernandez', 'Penny_Oleksiak', 'Keirin', '2016–17_Premier_League', 'G-Eazy', 'Balochistan,_Pakistan', 'Arrival_(film)', 'Na._Muthukumar', 'Gray_wolf', 'Chris_Pine', '2028_Summer_Olympics', 'Kenny_Baker_(English_actor)', 'Mocha_(JavaScript_framework)', 'Suits_(season_6)', 'Super_Bowl_XXX', 'Trypophobia', 'Field_hockey_at_the_2016_Summer_Olympics', 'Kerri_Strug', 'Gianluca_Vacchi', 'Blac_Chyna', 'Anthony_Ervin', 'United_States_presidential_election,_2012', 'Charlie_Heaton', 'Deathstroke', '2000_Summer_Olympics_medal_table', 'LP_(singer)', 'Dating', 'Dorothy_Dandridge', 'Karen_Fukuhara', 'Quantico_(TV_series)', '10_Cloverfield_Lane', 'Black_Pink', 'Neeti_Mohan', 'Me_Before_You_(film)', '1984_Summer_Olympics', 'Handball_at_the_2016_Summer_Olympics', 'Crystal_Pepsi', 'Peaky_Blinders_(TV_series)', 'Baar_Baar_Dekho', 'Jason_Bourne', '2004_United_States_men\'s_Olympic_basketball_team', 'Sofia_Richie', 'Bradley_Wiggins', '2016–17_EFL_Cup', 'Olympic_sports', 'Vedius_Pollio', 'Jessica_Ennis-Hill', 'District_and_Circle', 'Endless_(Frank_Ocean_album)', 'Russia_at_the_2016_Summer_Olympics', 'Ae_Dil_Hai_Mushkil', 'DJ_Khaled', 'Pete\'s_Dragon', 'Nissan_CA_engine', 'Handball', 'Steeplechase_(athletics)', 'List_of_Fear_the_Walking_Dead_episodes', 'Tiffany_Trump', 'Texas_Instruments_signing_key_controversy', 'Second_Amendment_to_the_United_States_Constitution', 'Katrina_Pierson', 'Adam_Peaty', 'List_of_Dragon_Ball_Super_episodes', 'Dafne_Schippers', 'Sasha_Banks', 'Killer_Croc', 'Armenian_Genocide', 'Basketball_at_the_Summer_Olympics', '1896_Summer_Olympics', 'Cecil_Chubb', 'Tyson_Gay', 'Katinka_Hosszú', 'Olympic_medal', '2014_Winter_Olympics', 'Dalian_Atkinson', 'Steven_Avery', 'China_at_the_2016_Summer_Olympics', 'Willy_Wonka_&_the_Chocolate_Factory', 'Alexander_Skarsgård', 'America\'s_Got_Talent_(season_11)', 'Conscription_in_South_Korea', 'Ed_Gein', 'Tennis_at_the_2016_Summer_Olympics_–_Men\'s_Singles', 'India_at_the_2008_Summer_Olympics', 'Aubrey_O\'Day', 'Minor_(law)', 'Mahendra_Singh_Dhoni', 'Tom_Selleck', 'MasterChef_(U.S._season_7)', 'Tiger_Shroff', 'Mohammad_Azharuddin', 'Viola_Davis', 'Weightlifting_at_the_2016_Summer_Olympics', 'BA-64', 'Proxima_Centauri_b', '1992_Summer_Olympics', 'Max_Whitlock', 'Bob_Ross', 'Nationwide_opinion_polling_for_the_United_States_presidential_election,_2016', 'Mark_Foster_(swimmer)', 'List_of_The_Flash_episodes', 'Elizabeth_Smart', 'West_Ham_United_F.C.', 'Ghostbusters', 'Shivaay', 'Kyla_Ross', 'Jordyn_Wieber', 'List_of_The_Last_Ship_episodes', 'David_Boudia', 'Shannen_Doherty', 'Krishna_Janmashtami', 'Maddie_Ziegler', 'Grandmaster_Flash', 'Snapchat', 'American_Horror_Story_(season_6)', 'MasterChef_Australia_(series_8)', 'Ileana_D\'Cruz', 'The_Nice_Guys', 'Randy_Orton', 'Brett_Favre', 'Carmelo_Anthony', 'Montenegro', 'Suicide_Squad_(soundtrack)', 'Celebrity_Big_Brother_18', 'Leslie_Jones_(comedian)', 'Luz_Long', 'Gadsden_flag', 'Louis_XIV_of_France', 'Lisa_Bonet', 'Hands_of_Stone', 'Kyrie_Irving', 'The_BFG_(2016_film)', 'List_of_the_most_subscribed_users_on_YouTube', 'The_Light_Between_Oceans_(film)', 'Patty_Hearst', 'Lee_Jong-suk', 'Judo_at_the_2016_Summer_Olympics', 'Doctor_Strange_(film)', 'Mary_Lou_Retton', 'Shannon_Miller', 'Dominique_Moceanu', 'Jay_Z', 'Desmond_Doss', 'Archery_at_the_2016_Summer_Olympics', 'Louis_Tomlinson', 'Atal_Bihari_Vajpayee', 'Deaths_in_2018', '2018_Asian_Games', 'Crazy_Rich_Asians_(film)', 'Nick_Jonas', 'BTS_(band)', 'List_of_stand-up_comedians', 'List_of_United_States_stand-up_comedians', 'List_of_Australian_stand-up_comedians', 'List_of_Canadian_stand-up_comedians', 'List_of_British_stand-up_comedians', 'SummerSlam_(2018)', '2018_Asian_Games_medal_table', 'India_at_the_2018_Asian_Games', 'To_All_the_Boys_I\'ve_Loved_Before_(film)', 'M._Karunanidhi', 'The_Meg', 'Noah_Centineo', 'List_of_Bollywood_films_of_2018', 'To_All_the_Boys_I\'ve_Loved_Before', '2018–19_UEFA_Champions_League', 'Henry_Golding_(actor)', '6ix9ine', 'Eye_movement_desensitization_and_reprocessing', 'Big_Brother_20_(U.S.)', 'Post_Malone', 'Asia_Argento', 'Exo_(band)', 'Meteor_Garden_(2018_TV_series)', 'Cindy_McCain', 'Stefán_Karl_Stefánsson', 'Constance_Wu', 'Brooks_Koepka', '2018_in_film', 'Travis_Scott', 'Carol_McCain', 'Satyameva_Jayate_(2018_film)', 'Insatiable_(TV_series)', 'Gold_(2018_film)', 'Eid_al-Adha', 'Sharp_Objects_(miniseries)', 'Mamma_Mia!_Here_We_Go_Again', 'Infinite_product', 'United_States_of_America', 'Lily_James', 'Awkwafina', 'Disenchantment_(TV_series)', '2018–19_UEFA_Europa_League', 'Untitled_Avengers_film', 'Meghan_McCain', 'Omarosa_Manigault', 'Ebenezer_Cobb_Morley', 'Rick_Genest', 'Crazy_Rich_Asians', 'The_Handmaid\'s_Tale_(TV_series)', 'Football_at_the_2018_Asian_Games', 'Castle_Rock_(TV_series)', 'Football_at_the_2018_Asian_Games_–_Men\'s_tournament', 'Fonts_on_Macintosh', 'Chuckle_Brothers', '.us', 'Christopher_Robin_(film)', 'XXXTentacion', 'The_Nun_(2018_film)', 'Sacred_Games_(TV_series)', 'Jeffree_Star', 'Beto_O\'Rourke', 'The_Sinner_(TV_series)', 'Debby_Ryan', 'Scott_Morrison', 'America\'s_Got_Talent_(season_13)', 'Captain_Marvel_(film)', 'UFC_227', 'Josh_Brolin', 'Venom_(2018_film)', 'Geetha_Govindam', 'Gerda_Taro', 'List_of_Prime_Ministers_of_India', 'Astroworld_(album)', 'Roberta_McCain', 'A_Quiet_Place_(film)', 'Karunanidhi_family', 'Sweetener_(album)', '2018_Kerala_floods', 'Jimmy_Bennett', 'Sharp_Objects', 'Queen_(Nicki_Minaj_album)', 'Nandamuri_Harikrishna', 'Vijay_Deverakonda', 'Don_Bradman', 'Rebecca_Ferguson', 'Amy_Adams', 'Khabib_Nurmagomedov', 'Slender_Man_(film)', 'Hereditary_(film)', 'Asian_Games', 'John_David_Washington', 'RSS', 'Kepa_Arrizabalaga', 'Jim_Neidhart', 'P.S._I_Still_Love_You', 'Paul_Manafort', 'Ocean\'s_8', 'Anthony_Bourdain', 'Meena_Kumari', 'Hell_in_a_Cell_(2018)', 'F5_Networks', 'Always_and_Forever,_Lara_Jean', 'Mary_G._Ross', 'Shawn_Mendes', 'Rashmika_Mandanna', 'Mile_22', 'KSI_vs_Logan_Paul', 'Three_Billboards_Outside_Ebbing,_Missouri', 'Gangnam_Beauty', 'The_Happytime_Murders', 'Glynn_Turman', 'UC_Browser', 'Stranger_Things', 'Game_of_Thrones_(season_8)', 'Neil_Simon', 'Thibaut_Courtois', 'Man_with_No_Name', 'C._L._Franklin', 'Lizzie_Borden', 'Tyson_Fury', 'Arturo_Vidal', 'List_of_most_viewed_online_videos_in_the_first_24_hours', 'Ron_Stallworth', 'Idukki_Dam', 'UFC_229', 'Ray_Liotta', 'The_Office_(U.S._TV_series)', 'Janel_Parrish', 'UFC_228', 'Incredibles_2', 'Dhadak', 'Sanju', 'Lil_Xan', 'Dylan_Wang', 'Meg_Johnson_(poet)', 'Bigg_Boss_Tamil_2', 'Hailey_Baldwin', 'A_Simple_Favor_(film)', 'Antifa_(United_States)', 'Ponte_Morandi', 'Who_Is_America?', 'List_of_Knowing_Bros_episodes', 'We_Happy_Few', 'Israel_Broussard', 'Extinction_(2018_film)', 'Skyscraper_(2018_film)', 'Produce_48', 'Danielle_Bregoli', 'Michael_Clarke_Duncan', 'Joey_King', 'Peter_Scully', 'Billionaire_Boys_Club_(2018_film)', 'Suits_(U.S._TV_series)', 'John_O._Brennan', 'Bill_Skarsgård', '2018_US_Open_(tennis)', 'Potato_paradox', 'Mattéo_Guendouzi', 'XVideos', 'Tag_(2018_film)', 'John_S._McCain_Jr.', 'The_Equalizer_2', '2018–19_Premier_League', 'Pokhran-II', 'List_of_My_Hero_Academia_episodes', 'JoJo_Siwa', 'Joe_Jonas', 'Mel_B', 'Vishwaroopam_II', 'Andrew_Gillum', 'Cable_(comics)', 'Juggernaut_(comics)', 'LazyTown', 'Red_tide', 'MasterChef_(U.S._season_9)', '13_Reasons_Why', 'Tom_Holland_(actor)', 'Tonya_Harding', 'Kirstie_Alley', 'Ghoul_(miniseries)', 'Kate_McKinnon', 'Alpha_(film)', '2014_Asian_Games_medal_table', 'Orange_Is_the_New_Black_(season_6)', 'Mullaperiyar_Dam', 'Randy_Moss', 'China_Rich_Girlfriend', 'Searching_(film)', 'Aubrey_Plaza', 'Murder_on_the_Orient_Express_(2017_film)', 'Noah_Cyrus', 'White_Boy_Rick', 'India_at_the_Asian_Games', 'David_Goggins', 'Yellowstone_(U.S._TV_series)', 'Lil_Pump', 'Wolverhampton_Wanderers_F.C.', 'KSI_(entertainer)', 'Silent_Sam', 'Simon_Cowell', 'Michael_Peterson_(criminal)', 'Iliza_Shlesinger', 'George_Stinney', 'The_Spy_Who_Dumped_Me', 'Basketball_at_the_2018_Asian_Games', 'Richard_Madden', 'Jena_Sims', 'Robert_Mueller', 'Nina_Dobrev', 'The_Sacred_Riana', 'Vanessa_Kirby', 'Once_Upon_a_Time_in_Hollywood', 'Omarosa_Manigault_Newman', 'Jacob_Elordi', 'Sonali_Bendre', 'Badminton_at_the_2018_Asian_Games', 'Ismat_Chughtai', 'M._K._Stalin', 'Urban_Meyer', 'India_at_the_2014_Asian_Games', 'Dilip_Sardesai', 'Succession_(TV_series)', 'The_Affair_(TV_series)', 'Kane_(wrestler)', 'Refrigerator_death', 'Chris_Cuomo', 'Sharon_Tate', 'Gordon_Ramsay', 'Dallas_Roberts', 'Royal_Dutch_Shell', 'Winnie-the-Pooh', 'Article_35A_of_the_Constitution_of_India', 'Ray_Lewis', 'Sophie_Turner', 'Global_warming', 'Cloak_&_Dagger_(TV_series)', 'Christopher_Robin_Milne', 'Morena_Baccarin', 'V._S._Naipaul', 'Unforgotten', 'Navigation_paradox', 'Malcolm_Turnbull', '2017–18_Premier_League', 'Jermaine_Pennant', '2014_Asian_Games', 'Emmy_Rossum', 'List_of_Power_episodes', '2018_European_Athletics_Championships', 'Autonomous_sensory_meridian_response', 'America\'s_Got_Talent', 'The_Originals_(TV_series)', 'Peter_principle', 'The_Guernsey_Literary_and_Potato_Peel_Pie_Society', 'Parker_Solar_Probe', 'M._K._Muthu', 'Avicii', 'Everton_F.C.', 'Michael_J._Fox', '2018_MTV_Video_Music_Awards', 'Leonard_Bernstein', 'Tasmanian_Wilderness_World_Heritage_Area', 'Charlotte_Rae', 'Lisa_Brennan-Jobs', 'Kristin_Cavallari', 'Marshmello', 'Savitri_(actress)', 'Upgrade_(film)', 'The_Crown_(TV_series)', 'Katherine_Schwarzenegger', 'Null', 'Guernsey', '1967_USS_Forrestal_fire', 'Venom_(Marvel_Comics_character)', '2018_International_Champions_Cup', 'The_Predator_(film)', 'PlayerUnknown\'s_Battlegrounds', '2018_NFL_Draft', 'Rampage_(2018_film)', 'How_It_Ends_(film)', 'Paris_Saint-Germain_F.C.', 'Dhyan_Chand', 'Lisa_Marie_Presley', 'Steven_Tyler', 'Kevin_Kwan', 'Adam_Driver', 'Michelle_Williams_(actress)', 'Hand,_foot,_and_mouth_disease', 'Clerks', 'Story_of_Yanxi_Palace', 'Susan_George_(actress)', 'Jenna_Fischer', 'Shaun_Weiss', 'List_of_HTTP_status_codes', 'Room_(2015_film)', 'Mother!', 'Stoneman_Douglas_High_School_shooting', 'Eighth_Grade_(film)', 'List_of_Presidents_of_India', 'Dolores_O\'Riordan', 'Mr._Sunshine_(2018_TV_series)', 'L._K._Advani', 'Alexandra_Daddario', 'The_Guernsey_Literary_and_Potato_Peel_Pie_Society_(film)', 'Cantinflas', 'The_Innocents_(TV_series)', 'Golden_State_Killer', 'List_of_The_100_episodes', 'Vanessa_Hudgens', 'Alyssa_Milano', 'Tommy_Robinson_(activist)', '\"Weird_Al\"_Yankovic', 'Joaquin_Phoenix', 'Steve_Carell', 'Operation_Finale', 'N._T._Rama_Rao_Jr.', 'Zoe_Saldana', 'The_Darkest_Minds_(film)', 'Evan_Ross', 'Genius_(2018_film)', '2018_European_Championships', 'Ozark_(TV_series)', 'Deontay_Wilder', 'Blue_Whale_(game)', 'Unai_Emery', 'Aishwarya_Rai', 'List_of_current_Indian_chief_ministers', 'Li_Bingbing', 'Anthony_Joshua', 'T.J._Dillashaw', 'The_Kissing_Booth', 'Barry_Seal', 'Friendship_Day', 'Sonoya_Mizuno', 'Cyberpunk_2077', 'Cells_at_Work!', 'Michelle_Monaghan', 'List_of_Running_Man_episodes_(2018)', 'Offset_(rapper)', 'Vinesh_Phogat', 'Peter_Dutton', 'John_Abraham_(actor)', 'Sarah_Jeong', 'Nick_Cummins', 'Selina_Scott', 'What\'s_Wrong_with_Secretary_Kim', 'List_of_Black_Mirror_episodes', 'Denisovan', 'Maurizio_Sarri', 'Stevie_Nicks', 'The_Equalizer_(film)', 'All-time_Asian_Games_medal_table', 'Teen_Titans_Go!_To_the_Movies', 'Karen_Gillan', 'In_My_Feelings_(song)', 'List_of_Attack_on_Titan_episodes', 'Roxanne_Pallett', 'Robin_Leach', 'Ninja_(streamer)', 'Article_370_of_the_Constitution_of_India', 'Line_shaft', 'William_Murdoch', 'Deaths_in_2019', 'Sushma_Swaraj', 'The_Boys_(2019_TV_series)', 'Mindhunter_(TV_series)', 'Hobbs_&_Shaw', 'Wayne_Williams', 'Atlanta_murders_of_1979–81', 'Dennis_Rader', 'List_of_mass_shootings_in_the_United_States_in_2019', 'Arun_Jaitley', 'Tate_murders', 'Saaho', 'Manson_Family', 'SummerSlam_(2019)', 'Edmund_Kemper', '2019_Hong_Kong_anti-extradition_bill_protests', '2019_El_Paso_shooting', 'Tulsi_Gabbard', 'Jammu_and_Kashmir', 'List_of_Bollywood_films_of_2019', 'Andrew_Luck', 'Mission_Mangal', 'Tex_Watson', 'Ghislaine_Maxwell', '2019_in_film', '2019–20_UEFA_Champions_League', 'Ready_or_Not_(2019_film)', 'Group_of_Seven', 'The_Boys_(comics)', 'David_Berkowitz', 'Batla_House_encounter_case', 'Jessi_Combs', 'Angel_Has_Fallen', 'UFC_241', 'Descendants_3', 'Do_Androids_Dream_of_Electric_Sheep?', 'Cameron_Boyce', 'Chandrayaan-2', 'Liam_Hemsworth', 'The_Red_Sea_Diving_Resort', 'Scary_Stories_to_Tell_in_the_Dark_(film)', '2019–20_UEFA_Europa_League', 'David_Koch', 'Good_Boys_(film)', 'Lizzo', 'Luke_Perry', 'Union_territory', 'Bombshell_(2019_film)', 'Mars_Orbiter_Mission', 'Douglas_Coe', 'Corn_flakes', 'Lover_(album)', 'Mass_shootings_in_the_United_States', 'Tool_(band)', 'Susan_Atkins', 'Hunter_Schafer', 'Brian_Banks_(American_football)', 'Batla_House', 'List_of_The_Boys_characters', 'Woodstock', 'Big_Brother_21_(American_season)', 'Erin_Moriarty_(actress)', 'Brian_Austin_Green', 'Jade_Goody', 'It_Chapter_Two', 'Scary_Stories_to_Tell_in_the_Dark', 'Wu_Assassins', 'John_E._Douglas', '2019_Dayton_shooting', 'Jennie_Garth', 'The_Irishman_(2019_film)', 'Rajya_Sabha_TV', 'The_Mandalorian', 'Martina_Stoessel', 'Jonathan_Groff', 'Dora_and_the_Lost_City_of_Gold', 'Cedric_Benson', 'Karl_Urban', 'Dark_Phoenix_(film)', 'Fear_Inoculum', 'Harry_Maguire', 'Vikram_Sarabhai', '2020_Democratic_Party_presidential_primaries', 'Linda_Kasabian', 'Margaret_Qualley', 'Phobetron_pithecium', 'Teemu_Pukki', 'Nerkonda_Paarvai', 'Cillian_Murphy', 'Swaraj_Kaushal', 'Stranger_Things_(season_3)', 'Midsommar_(film)', 'Jack_Quaid', '2020_Democratic_Party_presidential_debates_and_forums', 'Patricia_Krenwinkel', 'Rangers_F.C.', 'The_Ashes', 'Kabir_Singh', 'Aquaman_(film)', 'Gabrielle_Carteris', 'List_of_mass_shootings_in_the_United_States', 'Maya_Hawke', 'Hotel_Del_Luna', 'The_Fellowship_(Christian_organization)', 'XXX_(soundtrack)', 'Khalid_bin_Mohsen_Shaari', 'Amit_Shah', 'Stipe_Miocic', 'Alyson_Stoner', 'Gretchen_Carlson', 'MasterChef_(American_season_10)', 'A_Star_Is_Born_(2018_film)', 'List_of_Riverdale_episodes', 'NRK', 'Jason_Priestley', 'Daniel_James_(footballer)', 'Daniel_Cormier', 'Brightburn', 'Ben_Stokes', '1996_California_Proposition_218', 'Missy_Elliott', 'Isabela_Moner', 'Tori_Spelling', 'Old_Town_Road', 'Fast_&_Furious_9', 'Clash_of_Champions_(2019)', 'Kirsten_Dunst', 'Bigg_Boss_Tamil_3', 'Main_page', 'The_Eternals_(film)', 'David_Luiz', '2019_US_Open_(tennis)', 'Ajit_Doval', 'BH90210', 'Robert_Maxwell', 'Central_Park_jogger_case', 'Elisabeth_Shue', 'Anna_Torv', 'Valerie_Harper', 'GLOW_(TV_series)', 'Marianne_Williamson', 'Tammy_Abraham', 'Another_Life_(2019_TV_series)', 'Bury_F.C.', '2019_MTV_Video_Music_Awards', 'America\'s_Got_Talent_(season_14)', 'Lynette_Fromme', 'Courtney_Kennedy_Hill', 'Quentin_Tarantino_filmography', 'Carnival_Row', 'Richard_Speck', 'Elizabeth_Warren', 'Adrián_(footballer)', 'Luke_Hemsworth', 'Julianne_Hough', 'Antony_Starr', 'Antonio_Brown', 'Murder_of_Dee_Dee_Blanchard', 'Azad_Kashmir', 'Dennis_Quaid', 'Chernobyl_(miniseries)', 'Colby_Covington', 'Beverly_Hills,_90210', 'Tardigrade', 'Jay_Sebring', 'Zoë_Kravitz', 'Elisabeth_Moss', 'Joe_Alwyn', 'Nicolas_Pépé', 'Whitney_Cummings', 'Super_30_(film)', 'V._G._Siddhartha', 'Peaky_Blinders', 'Halston', 'Opinion_polling_for_the_next_United_Kingdom_general_election', 'The_Angry_Birds_Movie_2', '2019_FIBA_Basketball_World_Cup', 'The_Fate_of_the_Furious', '2019_Ashes_series', 'Terry_Crews', 'Mass_shooting', 'Mason_Mount', 'List_of_serial_killers_by_number_of_victims', 'Annabelle_Comes_Home', 'Gaten_Matarazzo', 'Brody_Jenner', 'List_of_richest_people_in_the_world', 'The_Hunt_(2019_film)', 'Dean_Corll', 'El_Paso,_Texas', 'Derry_Girls', 'Sam_Elliott', 'Franco_Columbu', '2019_NFL_Draft', 'Finn_Wolfhard', 'Katee_Sackhoff', 'Normani', 'Crawl_(2019_film)', 'Ad_Astra_(film)', 'John_Wayne_Gacy', 'Philippe_Coutinho', 'Dakota_Johnson', 'Bonnie_and_Clyde', 'Black_Knight_(Dane_Whitman)', 'Mena_Massoud', 'Natalia_Dyer', '2019–20_Premier_League', 'Amrita_Pritam', 'Index_of_law_articles', 'Bharat_(film)', 'Windows_Task_Scheduler', 'Rocketman_(film)', 'Dwight_Howard', 'Megan_Thee_Stallion', 'Yellowstone_(American_TV_series)', 'Valentina_Sampaio', 'Zodiac_Killer', 'Jane_the_Virgin', 'Steve_Smith_(cricketer)', 'Stone_Cold_Steve_Austin', 'Holt_McCallany', 'Maynard_James_Keenan', 'Korean_Broadcasting_System', 'Blinded_by_the_Light_(2019_film)', 'David_Berman_(musician)', 'Jon_Favreau', 'Cori_Gauff', 'UFC_242', 'Vasyl_Lomachenko', 'The_Terror_(TV_series)', 'Ian_Ziering', '2019_US_Open_–_Men\'s_Singles', 'Bohemian_Rhapsody_(film)', 'Love_Alarm', 'Milo_Ventimiglia', 'Samara_Weaving', 'The_Family_(miniseries)', 'Taron_Egerton', 'Sujeeth', 'Black_Widow_(2020_film)', 'Gina_Lopez', 'Buddhas_of_Bamyan', 'Toru_Muranishi', 'Ethel_Kennedy', 'Spahn_Ranch', 'Article_15_(film)', '2017_Las_Vegas_shooting', 'Brigitte_Macron', 'Betty_Gilpin', 'Sanjivani_(TV_series)', '2019_BWF_World_Championships', '45th_G7_summit', 'Designated_Survivor_(TV_series)', 'War_(2019_film)', 'London_Has_Fallen', 'Andie_MacDowell', 'Leslie_Van_Houten', 'Saoirse_Ronan', 'Bob_Fosse', 'Christian_Pulisic', 'Christina_Milian', '2019_Formula_One_World_Championship', 'Veronica_Mars', 'When_They_See_Us', 'Dacre_Montgomery', 'Bianca_Andreescu', 'Hurricane_Irma', 'The_Naked_Director', 'Brenda_Song', 'Helter_Skelter_(scenario)', 'Suits_(American_TV_series)', 'Sye_Raa_Narasimha_Reddy', 'Little_Women_(2019_film)', 'Alexis_Sánchez', 'We_Are_Not_Your_Kind', 'Sandy_Hook_Elementary_School_shooting', 'Death_of_Eric_Garner', 'Detective_Pikachu_(film)', 'Finneas_O\'Connell', 'Ilhan_Omar', 'Jimmy_Hoffa', 'Immurement', 'Hellboy_(2019_film)', 'List_of_The_Handmaid\'s_Tale_episodes', '2019_Atlantic_hurricane_season', 'Gabrielle_Union', 'Olympus_Has_Fallen', 'Nipsey_Hussle', 'Patricia_Arquette', 'Outline_of_academic_disciplines', 'Sean_Astin', 'The_Kitchen_(2019_film)', 'Giles_Corey', '9M730_Burevestnik', 'Ed_and_Lorraine_Warren', 'Liv_Tyler', 'Adam_Weitsman', 'Ashley_Benson', 'Professional_certification', 'Virgil_van_Dijk', 'Storm_Area_51,_They_Can\'t_Stop_All_of_Us', 'Jofra_Archer', 'After_(2019_film)', 'ASAP_Rocky', 'Anthony_Pettis', 'Chace_Crawford', 'Tessa_Thompson', 'List_of_countries_by_intentional_homicide_rate', '47_Meters_Down', 'The_Peanut_Butter_Falcon', 'Lake_Nyos_disaster', 'Labor_Day', 'Manifest_(TV_series)', 'Spider-Man_in_film', 'The_Mule_(2018_film)', 'Elmer_Wayne_Henley', 'XNXX', 'Cory_Monteith', 'Richard_Ramirez', 'Maani', 'Aston_Villa_F.C.', 'Jack_Whitehall', 'List_of_computer_security_certifications', 'Maitland_Ward', 'List_of_securities_examinations', 'Cyntoia_Brown', 'Hilary_Duff', 'Jussie_Smollett', 'Mehbooba_Mufti', 'List_of_most-liked_YouTube_videos', 'Dear_Comrade', 'Mrunal_Thakur', 'Gina_Rodriguez', 'Haley_Bennett', 'The_Dark_Crystal', 'Control_(video_game)', 'XFL_(2020)', 'Judgementall_Hai_Kya', 'Professional_certification_(computer_technology)', 'Lewis_Capaldi', 'Lady_Colin_Campbell', 'Jon_Jones', 'Hello,_Love,_Goodbye', 'Mac_Miller', 'Danny_Trejo', 'Marlon_Wayans', '2019_Pan_American_Games', 'Allied_advance_from_Paris_to_the_Rhine', 'Cannabidiol', 'Ramon_Magsaysay_Award', '2019_UEFA_Super_Cup', 'Chadwick_Boseman', 'The_Umbrella_Academy_(TV_series)', 'Deaths_in_2020', 'Shakuntala_Devi', 'Shyamala_Gopalan', 'Maya_Harris', 'Douglas_Emhoff', 'Rhea_Chakraborty', 'Donald_J._Harris', '2020_Beirut_explosions', 'Sushant_Singh_Rajput', 'Gunjan_Saxena', 'Kimberly_Guilfoyle', 'Betty_Broderick', 'COVID-19_pandemic_by_country_and_territory', 'SummerSlam_(2020)', 'Shooting_of_Jacob_Blake', 'Beau_Biden', 'The_Umbrella_Academy', 'Ammonium_nitrate', 'The_Batman_(film)', '2020_World_Snooker_Championship', 'Aidan_Gallagher', 'Susan_Rice', 'Meena_Harris', 'Family_of_Donald_Trump', '2020–21_UEFA_Champions_League', 'WAP_(song)', 'Chrishell_Stause', 'Index_of_Greenland-related_articles', 'The_New_Mutants_(film)', 'It\'s_Okay_to_Not_Be_Okay', 'Shooting_of_Breonna_Taylor', 'Ronnie_O\'Sullivan', 'Wilford_Brimley', 'Nikki_Haley', 'Project_Power', 'Robert_Sheehan', 'Ronald_Koeman', 'Ellen_Page', 'Cobra_Kai', 'UFC_252', 'Alphonso_Davies', 'Payback_(2020)', 'Luka_Dončić', '2020_Stanley_Cup_playoffs', 'Milana_Vayntrub', 'Donald_Trump_Jr.', '2020–21_UEFA_Europa_League', 'Sadak_2', 'Big_Brother_22_(American_season)', 'Neilia_Hunter', 'The_Old_Guard_(2020_film)', 'Alexandre_Dumas', 'Louis_DeJoy', 'Juice_Wrld', 'Cuties', 'Gillian_Anderson', 'Nationwide_opinion_polling_for_the_2020_United_States_presidential_election', 'Annabelle_(doll)', 'S._P._Balasubrahmanyam', 'List_of_The_Umbrella_Academy_characters', 'Hunter_Biden', 'Khuda_Haafiz', 'Coronavirus_disease_2019', 'List_of_most-viewed_online_videos_in_the_first_24_hours', '2020_Atlantic_hurricane_season', 'Serge_Gnabry', 'Robert_Trump', 'Emmy_Raver-Lampman', 'Bill_&_Ted_Face_the_Music', '2020_NBA_playoffs', 'Tony_West_(attorney)', 'Mulan_(2020_film)', 'Donald_Harris_(professor)', 'Unhinged_(2020_film)', 'Shakuntala_Devi_(film)', 'Collin_Morikawa', 'Mahesh_Bhatt', 'Selling_Sunset', 'List_of_Lucifer_episodes', 'Machine_Gun_Kelly_(musician)', 'Texas_City_disaster', 'Tom_Ellis_(actor)', 'Thiago_Silva', 'Ken_Miles', '365_Days_(2020_film)', 'Canada\'s_Drag_Race', 'The_Legend_of_Korra', 'Kingsley_Coman', 'Knives_Out', 'Hans-Dieter_Flick', 'RB_Leipzig', 'Kayleigh_McEnany', 'Dirty_John_(TV_series)', 'Chi_Chi_DeVayne', 'Political_positions_of_Kamala_Harris', 'The_Fall_(TV_series)', 'Thiago_Alcântara', 'Microsoft_Flight_Simulator_(2020_video_game)', 'Kenosha,_Wisconsin', 'Jordan_Fisher', 'Sanjay_Dutt', 'Derecho', '2020_UEFA_Champions_League_Final', 'Dil_Bechara', 'Pop_Smoke', 'Largest_artificial_non-nuclear_explosions', '2020_Republican_National_Convention', 'Joseph_Gordon-Levitt', 'Tom_Hopper', 'Colorectal_cancer', 'Rahat_Indori', 'Naya_Rivera', 'Jerry_Falwell_Jr.', 'Karen_Bass', 'Clifford_Robinson_(basketball,_born_1966)', 'Da_5_Bloods', 'Donna_Hylton', 'Ralph_Macchio', 'Samantha_Lewthwaite', 'Nicolas_Anelka', 'Michelle_McNamara', 'Samir_Sharma', 'The_Devil_All_the_Time_(film)', 'Black_Is_King', 'Greyhound_(film)', 'Ana_de_Armas', 'Folklore_(Taylor_Swift_album)', 'Rob_Schneider', 'Raat_Akeli_Hai', 'Atmanirbhar_Bharat', 'Kelly_Preston', 'Elizabeth_Debicki', 'Damian_Lillard', 'Halifax_Explosion', 'Jonathan_Swan', 'David_Castañeda', 'Robert_F._Kennedy_Jr', 'Ghost_of_Tsushima', 'Seo_Ye-ji', 'Jamie_Dornan', 'Jake_Paul', 'Perry_Mason_(2020_TV_series)', 'Avengers_(2020_video_game)', 'Kamala_(wrestler)', 'Nishikant_Kamat', 'Kate_Walsh_(actress)', 'Red_states_and_blue_states', 'Herschel_Walker', 'Gerard_Way', 'Doja_Cat', 'Alice_Marie_Johnson', 'Alone_(TV_series)', 'George_Floyd', 'Justin_Townes_Earle', 'Eric_Trump', 'Tammy_Duckworth', 'Sabrina_Carpenter', 'Kim_Soo-hyun', 'List_of_UEFA_Cup_and_Europa_League_finals', 'Naagin_(2015_TV_series)', 'Herman_Cain', 'Shinzo_Abe', 'Masaba_Gupta', '2020_Belarusian_protests', 'Erin_O\'Toole', 'Jurnee_Smollett', 'Josh_Duhamel', 'Apple_Network_Server', '2020_Democratic_National_Convention', 'Jared_Kushner', 'Kristi_Noem', 'Fall_Guys', 'Andrea_Pirlo', 'Giannis_Antetokounmpo', 'Alexei_Navalny', 'Lara_Trump', 'Ammonium_nitrate_disasters', 'William_Zabka', 'List_of_Running_Man_episodes_(2020)', 'Sevilla_FC', 'List_of_NBA_champions', '2018_NBA_draft', 'Pep_Guardiola', 'Geraldine_Ferraro', 'Benford\'s_law', 'Niʻihau', 'Jiah_Khan', 'Black_Adam', 'Idina_Menzel', 'Steve_Bannon', 'Find_My_iPhone', 'C-Murder', 'Bobby_Shmurda', 'Family_of_Joe_Biden', '2020_MTV_Video_Music_Awards', 'Death_of_Caylee_Anthony', 'Murder_of_Junko_Furuta', 'Pooja_Bhatt', 'The_Kissing_Booth_2', 'Kerstin_Emhoff', 'NXIVM', 'The_Tax_Collector', '2020_NBA_Bubble', 'Scottie_Pippen', 'Ma_Rainey\'s_Black_Bottom_(film)', 'Doom_Patrol_(TV_series)', 'Laura_Loomer', 'Audrie_&_Daisy', 'Willian_(footballer,_born_1988)', 'Enola_Holmes_(film)', 'List_of_American_films_of_2020', 'Sofia_Boutella', 'The_Owl_House_(TV_series)', 'MasterChef_Australia_(series_12)', 'Jo_Jorgensen', 'David_Choe', 'UFC_253', 'Cut_Throat_City', 'Ismael_\"El_Mayo\"_Zambada', 'Shameless_(American_TV_series)', 'Vicki_Draves', 'Emma_Portner', 'Cursed_(2020_TV_series)', 'Paul_Dano', 'Sean_O\'Malley_(fighter)', 'Lovecraft_Country_(novel)', 'Maryanne_Trump_Barry', 'Bill_&_Ted', 'Ankita_Lokhande', '2020_Belarusian_presidential_election', 'Ram_Mandir,_Ayodhya', 'Elle_King', 'Rape_and_murder_of_Nirmala_Panta', 'Sadak', 'Lauren_German', 'Cole_Hauser', 'List_of_mobile_phone_brands_by_country', 'Teenage_Bounty_Hunters', 'Alpheidae', 'Daisy_Coleman', 'Windows_10_version_history', 'Leila_George', 'Class_of_\'83', 'The_Lincoln_Project', 'Sonu_Sood', 'Justin_H._Min', 'Sarah_Paulson', 'Juan_Carlos_I_of_Spain', 'Peninsula_(film)', 'The_Karate_Kid', 'Line_of_Duty', 'Murder_of_Travis_Alexander', 'P.V._Gopalan', 'Race_and_ethnicity_in_the_United_States', 'Good_Girls_(TV_series)', 'Babri_Masjid', 'Ritu_Arya', 'Hatch_Act_of_1939', 'Index_of_articles_related_to_African_Americans', 'Raphael_Rowe', 'Boban_Marjanović', 'Devin_Booker', 'The_Lost_Husband', 'Scott_Peterson', 'Seabiscuit', 'The_Twilight_Saga_(film_series)', 'List_of_world_snooker_champions', '2020', 'Bo_Derek', 'Work_It_(film)', 'Death_of_Sushant_Singh_Rajput', 'Denise_Richards', 'Vidyut_Jammwal', 'James_Anderson_(cricketer)', 'Mary_L._Trump', 'Porno_Graffitti', 'Liza_Koshy', 'Master_P', 'Christina_El_Moussa', 'Olympique_Lyonnais', 'Ertuğrul', 'Hezbollah', 'Jason_Oppenheim', 'Daveed_Diggs', 'Jack_Ruby', 'Midnight_Sun_(Meyer_novel)', 'Sviatlana_Tsikhanouskaya', 'Marvin_Heemeyer', 'Stargirl_(TV_series)', 'Ford_v_Ferrari', 'An_American_Pickle', 'Jerry_Falwell_Sr.', 'Dany_Garcia', 'Kawhi_Leonard', 'Rent-A-Girlfriend', 'Watchmen_(TV_series)', 'Michele_Morrone', 'A_True_Story', 'Corey_Haim', 'Suresh_Raina', 'Jadon_Sancho', 'Miranda_Kerr', 'Kelly_Reilly', 'Bad_Boys_for_Life', 'Linda_Cardellini', 'Barbara_Hepworth', 'Amar_Singh_(politician)', 'Chester_Bennington', 'Hydroxychloroquine', 'MrBeast', 'Candy_Ken', 'Marlon_Vera_(fighter)', 'Barron_Trump', 'The_Alienist_(TV_series)', 'DC_Animated_Movie_Universe', 'Shivaleeka_Oberoi', '2019–20_UEFA_Champions_League_knockout_phase', 'Karen_(pejorative)', 'Quique_Setién', 'I-Land', 'Tory_Lanez', 'Dustin_Johnson', 'Matt_Reeves', 'Deaths_in_2021', 'Neeraj_Chopra', 'Vikram_Batra', 'Donda_(album)', 'The_White_Lotus', 'Islamic_Emirate_of_Afghanistan', 'Free_Guy', 'What_If...?_(TV_series)', 'SummerSlam_(2021)', 'Charlie_Watts', '2021_Taliban_offensive', 'Sean_Lock', 'Ashraf_Ghani', 'Shershaah', 'Index.html', '2020_Summer_Olympics_medal_table', 'India_at_the_2020_Summer_Olympics', 'Shang-Chi_and_the_Legend_of_the_Ten_Rings', 'Fall_of_Kabul_(2021)', 'Jungle_Cruise_(film)', 'Athletics_at_the_2020_Summer_Olympics', 'Hibatullah_Akhundzada', 'Marcell_Jacobs', 'Ted_Lasso', 'The_Green_Knight_(film)', 'Candyman_(2021_film)', 'Nine_Perfect_Strangers_(miniseries)', 'Bell_Bottom_(2021_film)', '2021–22_UEFA_Champions_League', 'Mohammed_Omar', 'Trevor_Moore_(comedian)', 'Beckett_(film)', 'Kathy_Hochul', 'XXX_(film_series)', 'F9_(film)', 'Navarasa_(web_series)', 'Rick_and_Morty_(season_5)', 'Outer_Banks_(TV_series)', 'Abdul_Ghani_Baradar', 'War_in_Afghanistan_(2001–present)', 'Ed_Asner', 'CEO', 'Hamid_Karzai', 'Brendan_Fraser', 'YouTube_Music', 'Sky_Brown', 'Islamic_Republic_of_Afghanistan', 'YouTube_Premium', '2021–22_UEFA_Europa_Conference_League', 'Sydney_McLaughlin', 'Ahmad_Shah_Massoud', 'Tyron_Woodley', '2020_Summer_Paralympics', 'RuPaul\'s_Drag_Race_All_Stars_(season_6)', 'Facebook,_Inc.', 'Madelyn_Cline', 'Christopher_Duntsch', 'Markie_Post', 'Caeleb_Dressel', 'Olivia_Rodrigo', 'IOS', 'Video_hosting_service', 'UFC_265', 'BF', 'Havana_syndrome', 'Old_(film)', 'Sweet_Girl_(film)', 'Fall_of_Saigon', 'Reminiscence_(2021_film)', 'Paralympic_Games', 'Wrestling_at_the_2020_Summer_Olympics', '2021–22_UEFA_Europa_League', 'Bigg_Boss_OTT', '2021_Formula_One_World_Championship', 'The_Fear_Index', 'Polka-Dot_Man', 'The_Good_Doctor_(TV_series)', 'Jack_Grealish', 'Kargil_War', 'He\'s_All_That', 'Peacemaker_(comics)', 'The_Kissing_Booth_3', 'Critical_race_theory', 'The_Walking_Dead_(season_11)', 'Elizabeth_Holmes', 'Una_Stubbs', 'Field_of_Dreams', 'Vivo_(film)', 'Snake_Eyes_(2021_film)', 'Starro', 'Big_Brother_23_(American_season)', 'Bloodsport_(character)', 'Sirhan_Sirhan', 'Loki_(TV_series)', 'Javelin_throw', 'Titans_(2018_TV_series)', 'List_of_American_films_of_2021', 'King_Shark', 'Don\'t_Breathe', 'Jodie_Comer', 'Kiara_Advani', 'Chase_Stokes', 'Flag_of_Afghanistan', 'India_at_the_2020_Summer_Paralympics', 'Cruella_(film)', 'Amrullah_Saleh', 'Mimi_(2021_Hindi_film)', 'Candyman_(1992_film)', 'Don\'t_Breathe_2', 'C++', 'Stillwater_(film)', 'Volleyball_at_the_2020_Summer_Olympics', 'Dennis_Nilsen', 'Dustin_Lance_Black', 'A_Quiet_Place_Part_II', 'Larry_Elder', 'Jermaine_O\'Neal', 'Northern_Alliance', 'Freddie_Highmore', 'War_in_Afghanistan_(2001–2021)', 'United_States_at_the_2020_Summer_Olympics', 'Trevoh_Chalobah', 'Jennifer_Coolidge', 'Titans_(season_3)', 'Turkana_Boy', 'Panjshir_resistance', 'American_Horror_Stories', 'Sir_Gawain_and_the_Green_Knight', 'Peacemaker_(TV_series)', 'COVID-19', 'Sifan_Hassan', 'Enema_of_the_State', 'Islamic_State_of_Iraq_and_the_Levant_–_Khorasan_Province', 'Quinn_(soccer)', 'Florence_Pugh', 'Withdrawal_of_United_States_troops_from_Afghanistan_(2020–2021)', 'NXT_TakeOver_36', 'Sunisa_Lee', 'Basketball_at_the_2020_Summer_Olympics', 'India_men\'s_national_field_hockey_team', 'Sidharth_Malhotra', 'The_Everly_Brothers', 'Boeing_C-17_Globemaster_III', 'Nasser_Al-Khelaifi', 'Nanci_Griffith', 'UEFA_Europa_Conference_League', 'Sue_Bird', 'Nevertheless_(TV_series)', '2021_California_gubernatorial_recall_election', '2021_Atlantic_hurricane_season', 'Yordenis_Ugás', 'Tom_Holland', 'Daniela_Melchior', 'Chief_executive_officer', 'Raphaël_Varane', 'Hit_&_Run_(TV_series)', 'Eliud_Kipchoge', 'Single-player_video_game', 'John_Ritter', 'Abhinav_Bindra', 'Football_at_the_2020_Summer_Olympics', 'Brentford_F.C.', 'Patty_Mills', 'Tobey_Maguire', 'Mohammad_Najibullah', 'Bajrang_Punia', 'Gabrielle_Thomas', 'Omegle', 'Tokyo_Revengers', 'Jesse_Plemons', 'Lorde', 'No_Time_to_Die', 'All_Elite_Wrestling', 'E-commerce', 'Sarah_Shahi', 'Nelly_Korda', 'Murray_Bartlett', 'Gossip_Girl_(2021_TV_series)', 'Bill_Wyman', 'Jimmy_Hayes_(ice_hockey)', 'Single-player', 'Tanner_Buchanan', 'Amanda_Knox', 'Barbie', 'Joanne_Whalley', 'List_of_A_Certain_Magical_Index_light_novels', 'Hannah_Waddingham', 'Amazon_Prime_Video', '2032_Summer_Olympics', 'Gymnastics_at_the_2020_Summer_Olympics', 'Metta_Sandiford-Artest', 'Ratcatcher_(comics)', 'Never_Have_I_Ever_(TV_series)', 'Param_Vir_Chakra', 'David_Dastmalchian', 'Brittney_Griner', 'History_of_Afghanistan', 'Girls_Planet_999', 'Boxing_at_the_2020_Summer_Olympics', 'The_Empire_(TV_series)', '2021–22_Premier_League', 'Larry_Nassar', 'Clickbait_(miniseries)', 'Paul_Buchheit', 'Abdul_Rashid_Dostum', 'XXXX_(album)', 'Panjshir_Valley', 'Sandra_Oh', 'Krystsina_Tsimanouskaya', 'Christina_Applegate', 'Pacers–Pistons_brawl', 'Elliot_Page', 'Nine_Perfect_Strangers', 'Emma_McKeon', 'Ciryl_Gane', 'Sydney_Sweeney', 'Erling_Haaland', 'Jen_Psaki', 'United_States_invasion_of_Afghanistan', 'Simu_Liu', 'Athing_Mu', 'She\'s_All_That', 'Patrizia_Reggiani', 'Multiplayer', 'Christine_Grady', 'Midsommar', 'The_Tomorrow_War', 'You_shall_not_steal', 'Netrikann', 'Pakistan_at_the_Olympics', 'Travis_Barker', 'Mare_of_Easttown', 'Panjshir_Province', 'Laurel_Hubbard', 'Godzilla_vs._Kong', 'Mike_Richards_(television_personality)', 'Ahmad_Massoud', 'House_of_Gucci', 'Harry_Kane', '2021_Canadian_federal_election', 'Dusty_Hill', 'Multiplayer_video_game', 'Sexy', 'Jeremy_Clarkson', 'Ligue_1', 'Video_on_demand', 'Aditi_Ashok', 'Field_hockey_at_the_2020_Summer_Olympics', 'Opinion_polling_for_the_2021_Canadian_federal_election', 'Akhtar_Mansour', 'Ismail_Sabri_Yaakob', 'COVID-19_vaccine', 'President_of_Afghanistan', 'Kerry_Kennedy', 'Kris_Wu', 'Maurizio_Gucci', 'Sarpatta_Parambarai', 'Laura_Kenny', 'Tommy_Fury', 'DaBaby', 'Brand_New_Cherry_Flavor', 'Kalyan_Singh', 'Mutaz_Essa_Barshim', 'Hamid_Karzai_International_Airport', 'Subhadra_Kumari_Chauhan', 'Julia_Haart', 'Weasel_(DC_Comics)', 'Ravi_Kumar_Dahiya', 'The_Kid_Laroi', 'Hurricane_Ida', 'All_American_(TV_series)', 'Killing_of_Rachel_Nickell', 'Limp_Bizkit', 'Connie_Britton', 'Stanley_Tucci', 'History_of_bitcoin', 'Juno_Temple', 'Noor_Inayat_Khan', 'Rachael_Leigh_Cook', 'Buddhas_of_Bamiyan', 'SmartBear', 'Joe_Root', 'Google_News', 'Athletics_at_the_2020_Summer_Olympics_–_Men\'s_javelin_throw', 'Luca_(2021_film)', 'Joey_Jordison', 'Cycling_at_the_2020_Summer_Olympics', 'Park_Yeon-mi', 'Kuruthi', 'Rockbitch', 'Molly_Seidel', 'Mike_White_(filmmaker)', 'Twelve_Minutes', 'Michail_Antonio', 'Bacha_bazi', 'SARS-CoV-2_Lambda_variant', 'Uwe_Hohn', 'Volleyball_at_the_2020_Summer_Olympics_–_Women\'s_tournament', 'Blood_Red_Sky', 'Reservation_Dogs', 'Willy_Falcon', 'Jana_Gana_Mana', '2008_South_Carolina_Learjet_60_crash', 'Field_hockey_at_the_Summer_Olympics', 'Virgin_River_(TV_series)', 'See_(TV_series)', 'Solar_Power_(album)', 'Swimming_at_the_2020_Summer_Olympics', 'Marisa_Tomei', 'Savant_(DC_Comics)', 'Luke_Evans', 'John_Bingham,_7th_Earl_of_Lucan', 'Love_Island_(2015_TV_series,_series_7)', 'Blue_Film_(album)', 'Afghan_National_Army', 'Jake_Lacy', 'Ashura', 'Proprietary_software', 'Cruel_Summer_(TV_series)', 'IP_address_blocking', 'United_States_military_casualties_in_the_War_in_Afghanistan', 'The_Night_House', 'Ronnie_Wood', 'P._T._Usha', 'Schmigadoon!', 'Sinister_Six', '2021_NBA_draft', 'Doctor_Strange_in_the_Multiverse_of_Madness', 'MasterChef_Australia_(series_13)', 'Shelly-Ann_Fraser-Pryce', 'MyKayla_Skinner', 'All_Out_(2021)', 'List_of_most-liked_Instagram_posts', 'China_at_the_2020_Summer_Olympics', 'Windows', 'Hmong_people', 'Anya_Taylor-Joy', '2021_Women\'s_European_Volleyball_Championship', 'Dev_Patel', 'Pig_(2021_film)', 'Katelyn_Ohashi', 'Jennifer_Hudson', 'ICarly_(2021_TV_series)', 'Colin_Jost', 'Clarissa_Ward', 'Brooklyn_Nine-Nine_(season_8)', 'Bella_Poarch', 'Robert_W._Malone', 'Haseeb_Hameed', 'Bobby_Cannavale', 'Great_Britain_at_the_2020_Summer_Olympics', 'Dani_Alves', 'Vishnuvardhan_(director)', 'Rurouni_Kenshin', 'Meat_Loaf', 'Deaths_in_2022', 'Encanto_(film)', 'Royal_Rumble_(2022)', 'Julia_Fox_(actress)', 'Scream_(2022_film)', 'Don\'t_Look_Up_(2021_film)', 'Joe_Burrow', 'The_Book_of_Boba_Fett', 'The_Witcher_(TV_series)', '2021_Africa_Cup_of_Nations', 'The_Matrix_Resurrections', 'Igor_and_Grichka_Bogdanoff', 'Ben_Roethlisberger', 'The_Lost_Daughter_(film)', 'Stay_Close', 'Ashleigh_Barty', 'Patrick_Mahomes', 'Yellowjackets_(TV_series)', 'Archive_81', 'Jonathan_Larson', 'Alexa_Demie', 'Allu_Arjun', 'Jimmy_Garoppolo', 'Bigg_Boss_(Hindi_season_15)', 'Daniil_Medvedev', 'Meta_Platforms', 'The_Power_of_the_Dog_(film)', 'Louie_Anderson', 'Africa_Cup_of_Nations', 'Snowdrop_(South_Korean_TV_series)', 'Ansel_Adams', 'RRR_(film)', 'Aaron_Rodgers', 'Bea_Arthur', 'Republic_Day_(India)', 'Matthew_Stafford', 'Ronnie_Spector', 'Gaspard_Ulliel', 'UFC_270', 'Allen_Ludden', 'Shyam_Singha_Roy', 'Moon_Knight_(TV_series)', '2022_Australian_Open_–_Men\'s_Singles', '2022_Australian_Open', 'Josh_Allen_(quarterback)', 'Lily_Collins', 'All_of_Us_Are_Dead', 'Rue_McClanahan', 'Super_Bowl_LVI', 'Sing_2', 'The_King\'s_Man', 'Estelle_Getty', 'The_Last_Duel_(2021_film)', '2022_Uttar_Pradesh_Legislative_Assembly_election', 'Attack_on_Titan_(season_4)', 'Licorice_Pizza', 'Cincinnati_Bengals', 'Dhanush', 'Sean_Payton', '2022_Hunga_Tonga_eruption_and_tsunami', 'Atrangi_Re', 'Brownie_(folklore)', 'Tick,_Tick..._Boom!_(film)', 'The_Woman_in_the_House_Across_the_Street_from_the_Girl_in_the_Window', 'Station_Eleven_(miniseries)', 'After_Life_(TV_series)', 'Ram_Charan', 'Don\'t_Look_Up', '83_(film)', 'John_Madden', 'Emily_in_Paris', 'Australian_Open', 'And_Just_Like_That...', 'Scream_(franchise)', 'Danielle_Collins', 'WWE_Day_1', 'Los_Angeles_Rams', 'Stephen_Port', 'Super_Bowl', 'Stephen_Breyer', 'Tammy_Faye_Messner', 'Metaverse', 'Margaret_Campbell,_Duchess_of_Argyll', 'Dawn_FM', 'Samantha_Ruth_Prabhu', 'Stephanie_Beatriz', 'Robert_Durst', 'Bigg_Boss_(Tamil_season_5)', 'Cooper_Kupp', 'Julia_Garner', 'Francis_Ngannou', 'Sean_McVay', 'Hawkeye_(2021_TV_series)', 'The_Tourist_(TV_series)', 'James_Webb_Space_Telescope', 'Regina_King', 'Mason_Greenwood', 'Shark_Tank_India', 'Amy_Schneider', 'Cheslie_Kryst', '2022_Australian_Open_–_Women\'s_Singles', 'Cush_Jumbo', 'My_Dress-Up_Darling', 'The_Wheel_of_Time_(TV_series)', 'How_I_Met_Your_Father', 'Joanna_Shimkus', 'Peter_Bogdanovich', 'Thomas_Ian_Griffith', 'Melanie_Lynskey', 'Starfox_(comics)', 'Squid_Game', 'Harold_Ramis', 'Jim_Bakker', 'The_Righteous_Gemstones', 'Anya_Chalotra', 'Aafia_Siddiqui', 'SoFi_Stadium', 'Chandigarh_Kare_Aashiqui', 'J._R._Moehringer', 'A_Discovery_of_Witches_(TV_series)', 'Station_Eleven', 'Raindrop_cake', 'Lata_Mangeshkar', 'Russo-Ukrainian_War', 'Barry_Keoghan', 'Richard_Armitage_(actor)', 'Five_Nights_at_Freddy\'s', 'Theranos', 'Zac_Taylor', 'Super_Bowl_LV', 'Kim_Mi-soo', 'Cobra_Kai_(season_4)', '2022_European_Men\'s_Handball_Championship', 'Characters_of_the_Marvel_Cinematic_Universe', 'Olivia_Colman', 'Ashley_Park_(actress)', 'Temuera_Morrison', 'The_Gilded_Age_(TV_series)', 'Web_server_directory_index', 'Activision_Blizzard', 'André_Leon_Talley', 'The_355', 'Ariana_DeBose', 'Sara_Ramirez', 'Maude_Apatow', 'Eric_Adams', 'Fahadh_Faasil', 'Thierry_Mugler', 'Tick,_Tick..._Boom!', 'Deebo_Samuel', '79th_Golden_Globe_Awards', 'Robbie_Coltrane', 'Taylor_Sheridan', 'Streaming_media', 'Steven_Bartlett_(businessman)', 'Let\'s_Go_Brandon', '2021_NFL_season', 'Chiranjeevi', 'Arcane_(TV_series)', 'Måneskin', 'Munich_–_The_Edge_of_War', 'The_Tender_Bar_(film)', 'List_of_American_films_of_2022', 'Bat_Out_of_Hell', 'Dominic_Fike', 'Adam_McKay', 'Sydney_Tamiia_Poitier', 'West_Side_Story_(2021_film)', 'Peyton_List_(actress,_born_1998)', 'The_Silent_Sea_(TV_series)', 'Nick_Saban', '2021–22_NFL_playoffs', 'Jerry_Harris_(television_personality)', 'Stetson_Bennett', 'Sindhutai_Sapkal', 'The_Fallout_(film)', 'Our_Beloved_Summer', 'Odell_Beckham_Jr.', 'Nightmare_Alley_(2021_film)', 'Rob_Gronkowski', 'Luis_Díaz_(Colombian_footballer)', 'Murder_of_Ahmaud_Arbery', 'Anne_Williams_(activist)', 'The_Amazing_Spider-Man_2', 'SARS-CoV-2_Omicron_variant', '2022_ICC_Under-19_Cricket_World_Cup', 'Richard_Cottingham', 'San_Francisco_49ers', 'Boba_Fett', '2021_United_States_Capitol_attack', 'Scream_(1996_film)', 'Harlan_Coben', 'Lia_McHugh', 'Member_states_of_NATO', 'Virginia_Giuffre', 'Belfast_(film)', 'Dušan_Vlahović', 'Jenna_Ortega', 'Jim_Harbaugh', 'Betty_White_filmography', 'Evan_McPherson', 'Hridayam', 'Hillsborough_disaster', 'Travis_Kelce', 'Marc-André_Leclerc', 'Erin_Darke', '2021_NFL_Draft', '2022', 'Spider-Man_3', '2022_Kazakh_protests', 'Charlie_McDowell', 'Kurt_Warner', 'Mother/Android', 'Krithi_Shetty', 'Jennifer_Holland', 'Dan_Reeves', 'Chalino_Sánchez', 'RuPaul\'s_Drag_Race_(season_14)', 'The_Amazing_Spider-Man_(film)', 'Martin_Luther_King_Jr._Day', 'Smiling_Friends', 'John_Leguizamo', 'Adama_Traoré_(footballer,_born_1996)', 'The_Legend_of_Vox_Machina', 'Death_on_the_Nile_(2022_film)', 'Makar_Sankranti', 'Mckenna_Grace', 'Super_Bowl_LIV', 'Jean_de_Carrouges', 'Maus', 'Aishwarya_R._Dhanush', 'Ma_Dong-seok', 'Arnel_Pineda', 'Hunga_Tonga', 'Freya_Allan', 'Mark_Rylance', 'Neve_Campbell', 'Peter_Wright_(darts_player)', 'Ratan_Tata', 'Isabel_May', 'Thanasi_Kokkinakis', 'Allu–Konidela_family', 'The_Sex_Lives_of_College_Girls', 'Ketanji_Brown_Jackson', '2020_NFL_Draft', 'Eurovision_Song_Contest_2022', 'Burkina_Faso', 'Rent_(musical)', 'Naga_Chaitanya', 'YIFY', 'James_Earl_Ray', 'Peter_Sarsgaard', 'Sidney_Poitier_filmography', 'Nobody_(2021_film)', 'List_of_Marvel_Cinematic_Universe_television_series', 'The_Unforgivable', '2020–21_NFL_playoffs', 'Tejasswi_Prakash', 'Jessie_Buckley', 'Fatima_Sheikh', 'Thích_Nhất_Hạnh', 'Jodie_Sweetin', 'Tyreek_Hill', 'Diahann_Carroll', 'Morbius_(film)', 'Desi_Arnaz_Jr.', '2022_PDC_World_Darts_Championship', 'Open_Era_tennis_records_–_men\'s_singles', 'Home_Team_(2022_film)', 'Ebony_Blade', '2022_elections_in_India', 'Around_the_World_in_80_Days_(2021_TV_series)', 'List_of_Bollywood_films_of_2022', 'The_Gentlemen_(2019_film)', 'Félix_Auger-Aliassime', 'Johnny_Knoxville', 'Luke_Grimes', 'Uncharted_(film)', 'David_Arquette', 'Sophia_Bush', 'Steve_Perry', 'Ja\'Marr_Chase', 'Choi_Tae-joon', 'Emma_Raducanu', 'Akhanda', 'Scleroderma', 'Moonfall_(film)', 'Julie_Walters', 'Michael_C._Hall', 'Barbie_Ferreira', 'Eric_Dane', '2022_Punjab_Legislative_Assembly_election', 'Attack_on_Titan_(TV_series)', 'Rachel_Zegler', 'Jonathan_Van_Ness', 'Elden_Ring', 'Christine_Baranski', 'Jennifer_Beals', 'Minnal_Murali', 'Belle_(2021_film)', 'Around_the_World_in_Eighty_Days', 'Choi_Woo-shik', 'Philippine_Leroy-Beaulieu', 'Bro_Daddy', 'Maggie_Gyllenhaal', 'Kieran_Trippier', 'Diane_Guerrero', 'Martin_Shkreli', 'Scream_4', 'Shaun_White', 'Martin_Kove', 'Danielle_Macdonald', 'Mary_Tyler_Moore', 'The_Matrix_Revolutions', 'Algee_Smith', 'Sukumar', 'Juliette_Lewis', 'The_House_(2022_film)', 'Deaths_in_January_2022', 'Ramesh_Balwani', '2022_in_film', 'Howard_Hesseman', 'Louise_Woodward_case', 'Mamie_Till', '1337x', 'Vincent_Aboubakar', 'Jamie_Lynn_Spears', 'Rishi_Sunak', 'Surrogacy', 'Halle_Berry', 'Comoros', 'Stefanos_Tsitsipas', 'The_Stranger_(British_TV_series)', 'James_Nesbitt', 'The_Karate_Kid_Part_III', 'Roe_v._Wade', 'Stranger_Things_(season_4)', 'Vikram_(2022_film)', 'Jurassic_World_Dominion', 'The_Boys_(TV_series)', 'Obi-Wan_Kenobi_(TV_series)', '2022_Russian_invasion_of_Ukraine', 'KK_(singer)', 'Nandamuri_Balakrishna', 'Juancho_Hernangómez', 'Warren_Jeffs', 'Mika_Singh', 'Hustle_(2022_film)', 'Ms._Marvel_(TV_series)', 'XXXX_(beer)', 'Lightyear_(film)', 'Sidhu_Moose_Wala', 'Index_of_Windows_games_(S)', 'Austin_Butler', 'Kelly_McGillis', 'Samrat_Prithviraj', 'Bhool_Bhulaiyaa_2', 'Draupadi_Murmu', 'Candidates_Tournament_2022', 'Jamie_Campbell_Bower', 'Elvis_(2022_film)', 'The_Quarry_(video_game)', 'Lokesh_Kanagaraj', 'The_Black_Phone', 'Spiderhead', 'Priscilla_Presley', 'Clarence_Thomas', 'Dobbs_v._Jackson_Women\'s_Health_Organization', 'Everything_Everywhere_All_at_Once', 'Joe_Keery', 'UEFA_Nations_League', 'Michael_Peterson_trial', 'Fundamentalist_Church_of_Jesus_Christ_of_Latter-Day_Saints', 'Nayanthara', 'Sadie_Sink', 'Running_Up_That_Hill', 'Iman_Vellani', 'Hayden_Christensen', 'Eknath_Shinde', '777_Charlie', 'Prithviraj_Chauhan', 'The_Summer_I_Turned_Pretty_(trilogy)', 'Kiyoshi_Kuromiya', 'Joseph_Quinn_(actor)', 'Major_(film)', 'Kaithi_(2019_film)', 'Darwin_Núñez', '2022_NBA_draft', 'Money_in_the_Bank_(2022)', 'Better_Call_Saul_(season_6)', 'Liz_Cheney', '2022_monkeypox_outbreak', 'Depp_v._Heard', 'Nupur_Sharma_(politician)', 'Hell_in_a_Cell_(2022)', 'Vignesh_Shivan', 'Steve_Kerr', 'Lily-Rose_Depp', 'LIV_Golf', 'Andrew_Wiggins', 'Andrew_Tate', 'Vanessa_Paradis', 'Stranger_Things_(season_1)', 'Brahmāstra_(film)', 'List_of_A_Certain_Magical_Index_characters', '2022–23_UEFA_Nations_League', 'Robb_Elementary_School_shooting', 'Stranger_Things_(season_2)', 'Maharashtra_Legislative_Assembly', 'Colonel_Tom_Parker', 'Iga_Świątek', 'List_of_Hindi_films_of_2022', 'Michael_Owen', 'UFC_275', 'Agnipath_Scheme', 'Jugjugg_Jeeyo', 'Tasya_van_Ree', 'Cassidy_Hutchinson', 'Amanda_Aldridge', 'Sandeep_Unnikrishnan', '2022_French_legislative_election', 'Under_the_Banner_of_Heaven', 'List_of_Stanley_Cup_champions', 'Gerard_Piqué', '2022_Formula_One_World_Championship', 'Martha_Mitchell', 'Matt_Fitzpatrick', 'Sadio_Mané', 'Klay_Thompson', 'Camille_Vasquez', 'Rebel_Wilson', 'Glen_Powell', 'The_Northman', '2023_AFC_Asian_Cup_qualification', 'Norm_Macdonald', 'Love,_Death_&_Robots', 'Norma_McCorvey', 'Interceptor_(film)', 'Riley_Keough', '2022_Wimbledon_Championships_–_Men\'s_singles', 'The_Staircase_(miniseries)', 'Jana_Gana_Mana_(2022_film)', 'Gareth_Bale', 'Tony_Siragusa', 'Barry_(TV_series)', 'Marion_Barber_III', 'Caleb_Swanigan', 'Anthony_Edwards_(actor)', '2022_Indian_presidential_election', 'RuPaul\'s_Drag_Race_All_Stars_(season_7)', 'Ștefania_Mărăcineanu', 'Colorado_Avalanche', 'Billy_Kametz', 'Tom_Cruise_filmography', 'Obi-Wan_Kenobi', 'Steve_Jones_(musician)', 'Paolo_Banchero', 'Angelo_Moriondo', 'Vecna', 'The_Summer_I_Turned_Pretty_(TV_series)', 'List_of_Stranger_Things_characters', 'Jayson_Tatum', 'The_Old_Man_(TV_series)', 'John_Dean', 'Draymond_Green', 'Aamir_Liaquat_Hussain', 'Monkeypox', 'AR-15_style_rifle', '2022_Finalissima', 'Moses_Ingram', 'Barbie_(film)', 'Bitmap_index', 'Al_Horford', 'Crimes_of_the_Future_(2022_film)', 'MasterChef_Australia_(series_14)', 'Rulon_Jeffs', 'Johnny_Depp_filmography', 'Spy_×_Family', 'First_Kill_(TV_series)', 'Matthew_Modine', 'Platinum_Jubilee_of_Elizabeth_II', 'Vikram_(1986_Tamil_film)', 'Don_(2022_film)', 'John_Lydon', '2022_FIVB_Volleyball_Women\'s_Nations_League', 'Mary_Mara', 'M142_HIMARS', 'The_Marvels', 'Andre_Iguodala', 'Anand_Dighe', 'Mimi_Rogers', 'Baz_Luhrmann', 'America_Chavez', 'List_of_NBA_players_with_most_championships', 'Under_the_Banner_of_Heaven_(TV_series)', 'Casper_Ruud', 'Boston_Celtics', 'Sarkaru_Vaari_Paata', 'Monica_Barbaro', 'List_of_Peaky_Blinders_episodes', 'Albert_S._Ruddy', 'Hailey_Bieber', 'Caleb_McLaughlin', '2019_Maharashtra_Legislative_Assembly_election', 'Anna_Sorokin', 'Chrissie_Hynde', 'Lauren_Boebert', 'Amy_Coney_Barrett', 'Runway_34', 'Ime_Udoka', '2022–23_UEFA_Champions_League', 'Lily_Allen', 'List_of_songs_recorded_by_KK', 'Bigg_Boss_(Malayalam_season_4)', '2023_AFC_Asian_Cup', 'French_Open', 'Jiří_Procházka', 'Jon_Hamm', 'Herogasm', 'Eduardo_Franco_(actor)', 'Where_the_Crawdads_Sing', 'Dostarlimab', 'The_Lincoln_Lawyer_(TV_series)', 'Grumman_F-14_Tomcat', 'Anthony_Edwards_(basketball)', 'Sonic_the_Hedgehog_2_(film)', 'Corinthian_Colleges', 'Duffer_brothers', 'Tom_Wlaschiha', 'Only_Murders_in_the_Building', 'Tokata_Iron_Eyes', 'Severance_(TV_series)', 'Jack_Harlow', 'Tony_Scott', 'Homelander', 'Ranbir_Kapoor', 'Gary_Payton', 'Harmony_Tan', 'Paul_Reiser', 'Jensen_Ackles', 'Nick_Cannon', 'Sukhoi_Su-57', 'Dell_Curry', 'Timeline_of_the_2022_Russian_invasion_of_Ukraine', 'Steve_Harrington', 'Sheryl_Sandberg', 'Cara_Buono', 'Ms._Marvel', 'Xochitl_Gomez', 'Bhool_Bhulaiyaa', 'Black_Adam_(film)', 'Chesa_Boudin', 'Men_(2022_film)', 'Limonene', 'Ramsay_Hunt_syndrome', 'Brett_Gelman', 'UFC_276', 'Honestly,_Nevermind', 'Uddhav_Thackeray', 'Meg_Johnson', 'The_Staircase', 'John_Hinckley_Jr.', 'Akiko_Matsuura', 'Online_gambling', 'Paul_Bettany', 'Vijay_(actor)', 'Max_Verstappen', 'Devin_Haney', '2022_NBA_Finals', 'Coco_Gauff', 'George_Carlin', 'Malcolm_McLaren', 'Satyendra_Nath_Bose', 'Meena_(actress)', 'Casualties_of_the_Russo-Ukrainian_War', 'CONMEBOL–UEFA_Cup_of_Champions', 'G._Gordon_Liddy', 'Rachel_Bilson', 'Cale_Makar', 'John_Isner', 'Lebanese_Brazilians', 'Jordan_Poole', 'The_Offer', 'Gabriel_Jesus', 'Talulah_Riley', 'Cleidocranial_dysplasia', 'Gary_Payton_II', 'Sam_Neill', 'Nope_(film)', 'Robert_Evans', 'Columbine_High_School_massacre', 'Man_vs._Bee', 'Philip_Baker_Hall', 'Gustavo_Petro', 'We_Own_This_City', 'Padma_Bridge', 'Adivi_Sesh', 'Deborah_James_(journalist)', 'LinkedIn', 'Boeing_F/A-18E/F_Super_Hornet', 'Pistol_(miniseries)', 'Mary_Elizabeth_Winstead', 'Vivien_Lyra_Blair', 'Ante_Sundaraniki', 'Ben_Foster_(actor)', 'The_Lady_of_Heaven', 'Rory_McIlroy', 'Prey_(2022_film)', 'Wordle', 'Battle_of_Sievierodonetsk_(2022)', 'Yashwant_Sinha', 'Abortion_in_the_United_States_by_state', 'Rainbow_flag_(LGBT)', '2022_Wimbledon_Championships_–_Women\'s_singles', 'Coral_Castle', 'X_(2022_film)', 'Jaylon_Ferguson', 'The_Lincoln_Lawyer_(film)', 'Eve_(South_Korean_TV_series)', 'John_Eastman', 'Fire_Island_(film)', 'Shiv_Sena', 'Indira_Varma', 'List_of_top_international_men\'s_football_goal_scorers_by_country', 'Arch_Manning', 'Kartik_Aaryan', '2022–23_Premier_League', 'List_of_highest-grossing_Tamil_films', 'Grimes', 'List_of_EGOT_winners', 'Kamal_Haasan_filmography', 'John_N._Mitchell', 'The_Backrooms', 'Samuel_Alito', 'Della_Duck', 'Volodymyr_Zelenskyy', 'Why_Her', 'Maanagaram', 'The_Man_from_Toronto_(2022_film)', 'NBA_Finals', 'Stonewall_riots', 'List_of_Better_Call_Saul_episodes', 'Alexander_Zverev', 'The_Marble_Index', '2022_World_Aquatics_Championships', 'Kaathuvaakula_Rendu_Kaadhal', 'Priah_Ferguson', 'Argentina_national_football_team', 'Nambi_Narayanan', 'Glastonbury_Festival', 'Planned_Parenthood_v._Casey', 'CU', 'List_of_presidents_of_India', 'Index_of_Windows_games_(A)', 'Willy_Hernangómez', 'Aquaman_and_the_Lost_Kingdom', 'List_of_Jurassic_Park_characters', 'Shamshera', 'Fábio_Vieira_(footballer,_born_2000)', 'Ghost_ship', 'Chet_Holmgren', 'Lewis_Pullman', '2022_Colombian_presidential_election', 'Manuel_Garcia-Rulfo', 'Good_Luck_to_You,_Leo_Grande', 'Diablo_Immortal', '2022_FIVB_Volleyball_Men\'s_Nations_League', 'MKUltra', 'Joji_(musician)', 'Rupert_Friend', 'The_Midwich_Cuckoos', 'Suriya', 'The_Bad_Guys_(film)', 'The_Unbearable_Weight_of_Massive_Talent', 'Wayne_Gretzky', 'Seth_Curry', 'Ginni_Thomas', 'List_of_Tamil_films_of_2022', 'Eleven_(Stranger_Things)', 'Daryl_McCormack', 'Bridgerton', 'Bal_Thackeray', 'Voice_of_Vietnam', 'The_Orville_(season_3)', 'Matt_Walsh_(political_commentator)', 'Index_(statistics)', 'Pathaan_(film)', 'The_Last_of_Us_(TV_series)', 'ChatGPT', 'Deaths_in_2023', 'The_Menu_(2022_film)', 'Damar_Hamlin', 'Index,_Washington', 'Royal_Rumble_(2023)', 'Index_(economics)', 'Varisu', 'M3GAN', 'Jeff_Beck', 'Ken_Block', 'Kai_the_Hatchet-Wielding_Hitchhiker', 'Brock_Purdy', 'George_Santos', 'Wednesday_(TV_series)', 'The_Banshees_of_Inisherin', 'Kevin_McCarthy', '2023_Speaker_of_the_United_States_House_of_Representatives_election', 'Bernie_Madoff', 'Bella_Ramsey', 'The_Pale_Blue_Eye', 'Thunivu', 'Navarone_Garibaldi', 'Al_Nassr_FC', 'Ginny_&_Georgia', 'David_Crosby', 'Annie_Wersching', 'Pedro_Pascal', 'Index', 'Justin_Roiland', 'That_\'90s_Show', 'Kaleidoscope_(American_TV_series)', 'OpenAI', 'Death_of_Tyre_Nichols', 'Ke_Huy_Quan', 'The_Whale_(2022_film)', 'Leopard_2', 'Babylon_(2022_film)', 'Velma_(TV_series)', '2023_Men\'s_FIH_Hockey_World_Cup', 'John_Stonehouse', 'Tár', 'Miss_Universe_2022', '80th_Golden_Globe_Awards', 'Waltair_Veerayya', 'Barbara_Walters', 'Lunar_New_Year', '95th_Academy_Awards', 'Jalen_Hurts', 'Wout_Weghorst', 'Brianne_Howey', 'Alice_in_Borderland_(TV_series)', 'Super_Bowl_LVII', 'Michael_Lockwood_(guitarist)', 'The_Fabelmans', 'Commotio_cordis', '2023_Australian_Open_–_Men\'s_singles', 'Aaron_Taylor-Johnson', '1923_(TV_series)', 'Charles_III', 'The_Glory_(TV_series)', 'Julian_Sands', 'Veera_Simha_Reddy', 'R\'Bonney_Gabriel', 'Bigg_Boss_(Tamil_season_6)', 'Gianluca_Vialli', 'Happy_Valley_(TV_series)', '2023_World_Men\'s_Handball_Championship', 'Speaker_of_the_United_States_House_of_Representatives', 'Trevor_Lawrence', 'Mykhailo_Mudryk', 'Hakeem_Jeffries', 'Marianne_Bachmeier', '2023_Australian_Open', 'List_of_American_films_of_2023', 'Bigg_Boss_(Hindi_season_16)', 'Ruth_Madoff', 'Aryna_Sabalenka', 'Mission_Majnu', 'Elena_Rybakina', 'White_Noise_(2022_film)', 'Adam_Rich', 'Ved_(film)', 'A_Man_Called_Otto', 'Jacinda_Ardern', 'Tammy_Wynette', '2023_Cricket_World_Cup', 'Zoe_Saldaña', 'Cindy_Williams', 'Josh_Johnson_(quarterback)', 'Danny_Masterson', 'Lauren_London', 'YouTube_Kids', 'Knock_at_the_Cabin', 'That_\'70s_Show', 'Harry_Anderson', 'Gina_Lollobrigida', 'Wagner_Group', 'UFC_283', 'Lisa_Loring', 'Jay_Briscoe', 'All_Quiet_on_the_Western_Front_(2022_film)', 'Jason_Kelce', 'Uphaar_Cinema_fire', 'You_People', 'Matt_Gaetz', 'Plane_(film)', 'Chuck_Hughes', 'Allison_Williams_(actress)', 'Drishyam_2_(2022_film)', 'James_Norton_(actor)', 'Wrexham_A.F.C.', 'Antonia_Gentry', 'Harry_Melling_(actor)', 'Puss_in_Boots_(2011_film)', 'Tulsa_King', 'Triangle_of_Sadness', 'Diamond_and_Silk', 'KL_Rahul', 'Yeti_Airlines_Flight_691', 'Janelle_Monáe', 'Cordyceps', 'Avatar_3', 'Gangsta_Boo', 'Nick_Sirianni', 'Challenger_2', 'The_Addams_Family', 'Microsoft_365', '2023', 'Sam_Smith', 'Mark_Madoff', '2022_University_of_Idaho_killings', 'Shubman_Gill', 'Byron_Donalds', 'RuPaul\'s_Drag_Race_(season_15)', 'Giancarlo_Esposito', '2023_Australian_Open_–_Women\'s_singles', 'Leandro_Trossard', 'FA_Cup', '1883_(TV_series)', 'Night_Court', 'Christian_McCaffrey', 'Somen_Banerjee', 'Nico_Parker', 'Ryan_Clark_(American_football)', 'Hunters_(2020_TV_series)', 'Jack_Ryan_(TV_series)', 'Aftersun', '2022–23_NFL_playoffs', 'Bullet_Train_(film)', 'Emory_Tate', 'Mia_Goth', 'Christina_Ricci', 'Infinity_Pool_(film)', 'William,_Prince_of_Wales', 'Jesse_L._Brown', 'All_Quiet_on_the_Western_Front', 'Siddharth_Anand', 'Women_Talking_(film)', 'Skinamarink', 'Tatjana_Patitz', 'Hogwarts_Legacy', 'The_Rig_(TV_series)', 'Bangladesh_Premier_League', 'Night_Court_(2023_TV_series)', 'House_of_the_Dragon', 'Sarah_Lancashire', 'Windows_Server_2016', 'Windows_Server_2019', 'Andrew_Madoff', 'Andy_Reid', 'List_of_Hindi_films_of_2023', 'Willow_(TV_series)', 'Mukesh_Ambani', 'Microsoft_Exchange_Server', 'Matteo_Messina_Denaro', 'Robbie_Knievel', 'Internet_Explorer_11', 'Dhamaka_(2022_film)', 'Email_client', 'List_of_Yellowstone_(American_TV_series)_episodes', 'Paul_Mescal', 'Melissa_Rauch', 'Client_access_license', 'Microsoft_Office_Mix', 'Victoria_Lee', 'Nicholas_Hoult', 'Sally_Field', 'Gautam_Adani', 'Alchemy_of_Souls', 'List_of_Microsoft_365_Applications', 'Felix_Mallard', 'Kantara_(film)', '2022_NFL_season', 'Deion_Sanders', 'Achelousaurus', '1899_(TV_series)', 'Andor_(TV_series)', 'Kaia_Gerber', 'Mike_McDaniel', 'Hong_Chau', 'YRF_Spy_Universe', 'Devotion_(2022_film)', 'Wednesday_Addams', 'Gervonta_Davis', 'Brendan_Gleeson', 'Mikel_Arteta', '2023_ICC_Under-19_Women\'s_T20_World_Cup', 'Sebastian_Korda', 'Gwendoline_Christie', 'Poker_Face_(TV_series)', 'Qala_(film)', '2023_PDC_World_Darts_Championship', 'Index_(publishing)', 'Andrea_Riseborough', 'Bubble_tea', 'Shannon_Sharpe', 'Martin_McDonagh', 'Bradley_Fighting_Vehicle', 'Liam_Smith_(boxer)', 'The_Yardbirds', 'Amsterdam_(2022_film)', 'Utsuro-bune', 'Ovidio_Guzmán_López', 'Wilmer_Valderrama', 'Olivia_Hussey', 'Victoria_Azarenka', 'Claire_Danes', 'Mehmed_II', 'John_Larroquette', 'João_Félix', 'Dodi_Fayed', '2022_NFL_Draft', 'Raymond_Ablack', 'Thandiwe_Newton', 'Shah_Rukh_Khan_filmography', 'Newcastle_United_F.C.', 'Miss_Universe', 'Chippendales', 'George_Jones', 'K._D._Jadhav', 'Ashley_Johnson_(actress)', 'Oppenheimer_(film)', 'Jawan_(film)', 'SA20_(cricket)', 'Imogen_Poots', 'Chainsaw_Man', 'EFL_Cup', 'Abbott_Elementary', '2023_in_film', '118th_United_States_Congress', 'Song_Hye-kyo', 'Barbarian_(2022_film)', 'Slow_Horses', 'Penny_Marshall', 'Men\'s_FIH_Hockey_World_Cup', 'Hilaria_Baldwin', 'Alice_in_Borderland', 'Vamshi_Paidipally', 'Panic!_at_the_Disco', 'Don\'t_Worry_Darling', 'Forspoken', 'Scarlett_O\'Hara', 'The_Last_of_Us_(franchise)', 'Maya_Rudolph', 'AMX-10_RC', 'Cocaine_Bear', 'Evil_Dead_Rise', 'Philadelphia_Eagles', 'Kaoru_Mitoma', 'WWE_Raw_is_XXX', 'Vande_Bharat_Express', 'Nick_Bosa', 'Topher_Grace', 'Maia_arson_crimew', 'Bill_Hudson_(singer)', 'Rita_Moreno', 'GPT-3', 'Mayor_of_Kingstown', 'Tunisha_Sharma', 'Chad_Henne', 'Emma_Myers', 'Sara_Waisglass', 'Deaths_in_January_2023', 'Jeffry_Picower', 'Tati_Gabrielle', 'Evel_Knievel', 'Connor_Bedard', 'Doug_Pederson', 'Kerry_Condon', 'Graceland', 'Mayfair_Witches', 'Petr_Pavel', 'Suniel_Shetty', 'Empress_Elisabeth_of_Austria', 'Chris_Hipkins', 'Sam_Altman', 'Smile_(2022_film)', 'Shemar_Moore', 'Beau_Is_Afraid', 'The_Bear_(TV_series)', 'Stephanie_Hsu', 'Song_Joong-ki', 'Shotgun_Wedding_(2022_film)', 'List_of_international_cricket_centuries_by_Virat_Kohli', 'Daniel_Jones_(American_football)', 'Little_Jack_Horner', '2022–23_FA_Cup', 'Crosby,_Stills,_Nash_&_Young', 'Charles_Cullen', 'Jamahal_Hill', 'Miss_Universe_2023', 'Nadhim_Zahawi', 'SZA', 'Andrew_Callaghan', 'Rick_Rubin', 'Neatsville,_Kentucky', 'Maya_Jama', 'New_Amsterdam_(2018_TV_series)', 'Rob_McElhenney', 'Kang_Soo-yeon', 'Lucien_Laviscount', 'DeMeco_Ryans', 'Eddie_Nketiah', 'Island_(South_Korean_TV_series)', 'Gatta_Kusthi', 'Eurovision_Song_Contest_2023', 'House_Party_(2023_film)', 'Taraka_Ratna', 'Leslie_Jordan', 'Kurtwood_Smith', 'Black_Mafia_Family', 'Peter_Zeihan', 'Big_Bash_League', 'Lockwood_&_Co._(TV_series)', 'Rui_Hachimura', 'Frank_DiPascali', 'Noni_Madueke', 'Ron_Jeremy', 'Missing_(2023_film)', 'Debra_Jo_Rupp', 'Chris_Eubank_Jr', 'Kansas_City_Chiefs', 'You_(TV_series)', 'Camilla,_Queen_Consort', 'Sosie_Bacon', 'The_Invitation_(2022_film)', 'F._Murray_Abraham', 'Alan_Cumming', 'Valentine\'s_Day', 'Marjorie_Taylor_Greene', 'Z-Library', 'List_of_highest-grossing_films_in_India', 'Jerrod_Carmichael', 'Mariska_Hargitay', 'Pearl_(2022_film)', 'Rakhi_Sawant', 'Tommy_Paul_(tennis)', 'Raquel_Welch', '2023_Turkey–Syria_earthquake', 'Christian_Atsu', 'Murdaugh_family', 'Burt_Bacharach', 'Kim_Petras', 'Mac_McClung', 'Elimination_Chamber_(2023)', 'Pakistan_Super_League', 'Richard_Belzer', 'List_of_Super_Bowl_halftime_shows', '2023_Ohio_train_derailment', 'You_(season_4)', 'Jessica_Watson', 'P._K._Rosy', 'Shehzada_(2023_film)', 'Brink\'s-Mat_robbery', '65th_Annual_Grammy_Awards', 'Cocaine_Bear_(bear)', 'Disappearance_of_Madeleine_McCann', 'Jake_Paul_vs_Tommy_Fury', 'Atomic_Heart_(video_game)', 'Lux_Pascal', 'Jonathan_Majors', 'Mama_Cax', '2023_China_balloon_incident', 'UFC_284', 'Fast_X', 'Penn_Badgley', 'Kang_the_Conqueror', 'AKA_(rapper)', 'Tom_Sizemore', 'Farzi', 'List_of_highest-grossing_Hindi_films', 'Tahnee_Welch', 'Diane_Morgan', 'Aditya_Chopra', 'ICC_Women\'s_T20_World_Cup', 'Alexander_Volkanovski', 'The_Flash_(film)', 'Kenneth_Noye', 'List_of_earthquakes_in_Turkey', '2023_Nigerian_presidential_election', 'Lists_of_earthquakes', 'Pat_Mahomes', 'Selfiee', 'Andy_(goose)', 'Groundhog_Day', 'Russell_Westbrook', 'Brittany_Furlan', 'East_Palestine,_Ohio', 'Kellie_Pickler', 'Islam_Makhachev', 'WrestleMania_39', 'Regional_Snowfall_Index', 'Yoshihiro_Akiyama', 'Trial_of_Alex_Murdaugh', 'FIFA_Club_World_Cup', 'Kathryn_Newton', '2022_FIFA_Club_World_Cup', 'Ash_Wednesday', 'Your_Place_or_Mine_(film)', 'Hassan_Jameel', 'Neal_Mohan', 'Vinyl_chloride', 'Ice_Spice', 'Vani_Jairam', 'Creed_III', 'Vivek_Ramaswamy', '2023_Pakistan_Super_League', 'Lidia_Poët', 'Chris_Stapleton', 'MODOK', 'Angie_Dickinson', 'Isiah_Pacheco', 'Rosalynn_Carter', 'Enzo_Fernández', 'Bonnie_Raitt', 'Third_man_factor', 'Pervez_Musharraf', 'Woody_Harrelson', 'Clark_Hunt', 'Seymour_Hersh', 'Charlotte_Ritchie', 'FBI_Index', 'Noele_Gordon', '2023_ICC_Women\'s_T20_World_Cup', 'The_Night_Manager_(Indian_TV_series)', 'Brandi_Carlile', 'Domino_Kirke', 'K._Viswanath', 'Vaathi', 'Saeed_Jaffrey', 'List_of_National_Basketball_Association_career_scoring_leaders', '1962_Mexico_City_radiation_accident', 'Letitia_Wright', 'Adani_Group', 'AIM-9_Sidewinder', 'Lockheed_U-2', 'Smokey_Robinson', 'Namor', 'Yash_Chopra', 'Marcel_Sabitzer', 'Moldova', 'Magic_Mike\'s_Last_Dance', '2023_NBA_All-Star_Game', 'Disappearance_of_Nicola_Bulley', 'Shrinking_(TV_series)', 'Marc_Anthony', 'The_Woman_King', 'Super_Bowl_LII', 'Demetress_Bell', 'Avalanche_Software', 'Mumtaz_(actress)', 'The_Gold_(TV_series)', 'Emma_Heming_Willis', 'Stella_Stevens', 'Molly-Mae_Hague', 'Shrove_Tuesday', 'Hindenburg_Research', 'D\'Angelo_Russell', 'High-frequency_Active_Auroral_Research_Program', 'List_of_South_Park_episodes', 'Jansen_Panettiere', 'Erik_ten_Hag', 'Jon_Peters', 'Mount_Takahe', 'Bridget_Moynahan', 'Calista_Flockhart', 'Billy_Crudup', '80_for_Brady', 'Ja_Morant', 'Rick_Salomon', 'The_Strays_(film)', '2019_Pulwama_attack', 'UFC_285', 'Super_Bowl_LVIII', 'Guardians_of_the_Galaxy_Vol._3', 'Michael_(2023_film)', 'Casemiro', 'Michelle_Pfeiffer', 'Air_(2023_film)', 'Glaucus_atlanticus', 'Megan_Mullally', '2023_Turkey–Syria_earthquakes', 'Cam_Thomas_(basketball)', 'John_Palmer_(criminal)', '1960_Valdivia_earthquake', 'Loris_Karius', 'List_of_songs_written_by_Burt_Bacharach', 'Fedor_Emelianenko', 'Victor_Osimhen', 'Cassi_Davis', 'Scott_Adams', 'The_Jungle', 'Willie_Nelson', 'Sheryl_Lee_Ralph', 'Gwen_Shamblin_Lara', 'Malikappuram', 'Crash_Course_in_Romance', '2022–23_UEFA_Europa_League', 'Woke', 'François-Henri_Pinault', 'Space_Shuttle_Columbia_disaster', 'The_Super_Mario_Bros._Movie', 'Grammy_Awards', 'The_Eminence_in_Shadow', 'The_Cabin_at_the_End_of_the_World', 'Melinda_Dillon', 'Irma_Grese', 'Uday_Chopra', 'G20', 'Kyle_Jacobs_(songwriter)', 'Natasha_Richardson', 'Raashii_Khanna', 'Heather_Locklear', 'Roseanne_Barr', 'Holland_Taylor', 'David_Jude_Jolicoeur', 'Red_Rose_(TV_series)', 'Eric_Bieniemy', 'List_of_natural_disasters_by_death_toll', 'The_Night_Manager_(TV_series)', 'Jesse_Williams_(actor)', 'Shrek_(franchise)', 'John_Motson', 'Shamima_Begum', '2023_Formula_One_World_Championship', 'Duhan_van_der_Merwe', 'Border–Gavaskar_Trophy', 'Lukas_Gage', 'S.S.C._Napoli', 'Presidents\'_Day', 'Kelsea_Ballerini', 'Killing_of_Tyre_Nichols', 'Amy_Carter', 'Ed_Speleers', 'Global_poker_index', 'List_of_Happy_Valley_episodes', 'Cody_Rhodes', 'Mayilsamy', 'Stefan_Bajcetic', 'Lonnie_Frisbee', 'Sami_Zayn', 'Killing_of_XXXTentacion', 'Storm_Reid', 'List_of_unusual_deaths', 'Somebody_I_Used_to_Know', 'The_Consultant_(TV_series)', 'Lance_Reddick', 'Shazam!_Fury_of_the_Gods', 'Daisy_Jones_&_The_Six', 'Scream_VI', 'Tu_Jhoothi_Main_Makkaar', 'Kitty_O\'Neil', 'World_Baseball_Classic', 'Silicon_Valley_Bank', '2023_World_Baseball_Classic', 'Satish_Kaushik', 'Women\'s_Premier_League_(cricket)', 'Nowruz', 'Paul_O\'Grady', 'Boston_Strangler', 'The_Mandalorian_(season_3)', 'Mario_Molina', 'Swarm_(TV_series)', '2023_Covenant_School_shooting', '2023_Indian_Premier_League', 'Shadow_and_Bone_(TV_series)', 'The_Night_Agent', '65_(film)', 'Robert_Blake_(actor)', 'UFC_286', 'Daniels_(directors)', 'Jean_Todt', 'Niall_Horan', 'Humza_Yousaf', 'Fall_(2022_film)', 'Suits_index', 'Amanda_Bynes', 'Sam_Claflin', 'Shou_Zi_Chew', '2023_Women\'s_Premier_League_(cricket)', 'NCAA_Division_I_men\'s_basketball_tournament', 'UEFA_Euro_2024_qualifying', 'Kabzaa_(2023_film)', '2023_NCAA_Division_I_men\'s_basketball_tournament', 'Luther_(TV_series)', 'David_Koresh', 'Gary_Lineker', 'Credit_Suisse', 'The_Eras_Tour', 'Fairleigh_Dickinson_University', 'Adam_Demos', 'Sex/Life', 'Rana_Naidu', 'Shohei_Ohtani', 'Alexandra_Grant', 'Amritpal_Singh_(activist)', 'The_Elephant_Whisperers', 'Christopher_Guest', 'Stormy_Daniels', 'Camila_Morrone', 'Suki_Waterhouse', 'Paula_Yates', 'Marcel_Marceau', 'Steve_Howey_(actor)', 'Leon_Edwards', 'Fernando_Alonso', 'Ballerina_(upcoming_film)', 'Albert_DeSalvo', 'Carlo_Masi', 'List_of_largest_banks_in_the_United_States', 'Gabriel_Basso', 'Charlbi_Dean', 'Rick_Pitino', 'Common_raccoon_dog', 'Resident_Evil_4_(2023_video_game)', 'Philip_Berk', 'Lars_Nootbaar', 'Dada_(2023_film)', 'Google_AdSense', 'Gary_Rossington', 'Murder_of_Abby_Choi', 'Dasara_(film)', 'Justine_Siegemund', 'Bholaa', 'Jeff_Cohen_(actor)', 'Bobby_Caldwell', 'Luciane_Buchanan', 'Kamaru_Usman', 'Morgan_Wallen', 'General_Atomics_MQ-9_Reaper', 'Dan_Hurley', 'International_Criminal_Court', 'Randy_Arozarena', 'Creed_II', 'Donnie_Yen', 'Stephen_Baldwin', 'Jennifer_Syme', 'Road_House_(upcoming_film)', 'Mrs_Chatterjee_Vs_Norway', 'James_Hong', 'Theo_Von', 'Sofia_Coppola', 'Sarah_Polley', 'Khvicha_Kvaratskhelia', 'Khalistan_movement', 'I_See_You_(2019_film)', 'Russian_invasion_of_Ukraine_(2022–present)', 'Zach_Edey', '2023_Karnataka_Legislative_Assembly_election', 'Daniel_Ricciardo', 'Paul_Vallas', 'List_of_Brendan_Fraser_performances', 'Air_Pollution_Index', 'Rina_Sawayama', 'Chance_the_Rapper', 'Katy_O\'Brian', 'Jason_Ritter', 'Innocent_(actor)', 'Malaysia_Airlines_Flight_17', 'Bola_Tinubu', 'Ryan_Garcia', '2023_AFC_U-20_Asian_Cup', 'Jim_Larrañaga', 'Pau_Gasol', 'Julian_Nagelsmann', 'Homi_J._Bhabha', 'Andrew_Lloyd_Webber', 'Zwigato', 'A24', 'Battle_of_Bakhmut', 'Revolution_(2023)', 'Shaka_Smart', 'UEFA_Euro_2024', 'El_Clásico', 'Valentina_Shevchenko', 'Mesut_Özil', 'Scottie_Scheffler', 'Shavkat_Rakhmonov', 'Rama_Navami', 'Sage_Stallone', 'Shadow_and_Bone', 'Troy_Baker', 'Dickson_Poon', 'The_Masked_Singer_(American_season_9)', 'Lori_Lightfoot', 'Boston_Strangler_(film)', 'UBS', '2_Girls_1_Cup', 'Resident_Evil_4', 'M._M._Keeravani', 'List_of_largest_U.S._bank_failures', 'Signature_Bank', 'MasterChef_India_(Hindi_season_7)', 'Bella_Hadid', 'Survivor_44', 'Venkatesh_(actor)', 'Grace_Caroline_Currey', 'Naatu_Naatu', 'GPT-4', 'Jessie_Mei_Li', 'Portugal_national_football_team', 'Justin_Gaethje', 'Suzume_(film)', 'Men\'s_underwear_index', 'Brett_Goldstein', 'Kim_Mulkey', 'Kieran_Culkin', 'Ian_McShane', 'Collapse_of_Silicon_Valley_Bank', 'Scott_Adkins', 'List_of_Michelle_Yeoh_performances', 'Meghan_Trainor', 'Carl_Weathers', 'Georgina_Rodríguez', 'Ben_Foster_(footballer)', 'Brad_Falchuk', 'List_of_awards_and_nominations_received_by_Jamie_Lee_Curtis', 'Branch_Davidians', 'List_of_Scream_(film_series)_characters', 'Dylan_Sprouse', 'Caitlin_Clark', '2021–2023_ICC_World_Test_Championship', 'The_Hunger_Games_(film_series)', 'Laura_Haddock', '94th_Academy_Awards', 'Edward_Witten', 'Simeon_Stylites', 'The_Ballad_of_Songbirds_and_Snakes', 'Timothy_Olyphant', 'Did_You_Know_That_There\'s_a_Tunnel_Under_Ocean_Blvd', 'No_Hard_Feelings_(2023_film)', 'Diablo_IV', 'The_Legend_(2022_film)', 'Kellie-Jay_Keen-Minshull', 'Encino_Man', 'BRICS', 'Thomas_Tuchel', 'Isabel_Oakeshott', 'Government_of_Pakistan', 'Gotham_Knights_(TV_series)', 'Melissa_Barrera', 'Bo_Nickal', 'List_of_mass_shootings_in_the_United_States_in_2023', 'Liverpool_F.C.–Manchester_United_F.C._rivalry', 'The_Help_(film)', 'Keri_Russell', 'McArthur_Forest_Fire_Danger_Index', 'Great_Expectations', 'HDFC_Bank', 'V_(singer)', 'Endless_Summer_Vacation', 'Rafael_Fiziev', 'Kiefer_Sutherland', 'Jerry_Springer', 'Beef_(TV_series)', 'Kisi_Ka_Bhai_Kisi_Ki_Jaan', '2023_NFL_Draft', 'Jon_Rahm', 'Boston_Marathon_bombing', 'Ali_Wong', 'Atique_Ahmed', 'Dzhokhar_Tsarnaev', 'Moon_Bin', 'World_Chess_Championship_2023', 'Dylan_Mulvaney', '2010_Northumbria_Police_manhunt', '2023_World_Snooker_Championship', 'Barry_Humphries', 'Oshi_no_Ko', 'Steven_Yeun', 'The_Pope\'s_Exorcist', 'Ghosted_(2023_film)', 'Anheuser-Busch_brands', 'The_Diplomat_(American_TV_series)', 'Banzhaf_power_index', 'Paul_Cattermole', 'Viduthalai_Part_1', 'Len_Goodman', 'Russian_invasion_of_Ukraine', 'Backlash_(2023)', 'Moonbin', 'UFC_287', 'Citadel_(TV_series)', 'Ryuichi_Sakamoto', 'Achraf_Hakimi', 'Tamerlan_Tsarnaev', 'Renfield_(film)', 'JioCinema', 'Angel_Reese', 'Indictment_of_Donald_Trump', 'Rufus_Sewell', 'List_of_Masters_Tournament_champions', 'English_football_league_system', 'Murder_Mystery_2', 'April_Fools\'_Day', 'Super_Mario_Bros._(film)', 'Jimmy_Butler', 'Matthew_Rhys', 'National_League_(division)', 'Tetris_(film)', 'Charles_Stanley', 'Tetris', 'Drake_Bell', 'Austin_Reaves', 'Evil_Dead', 'Rey_Mysterio', '2023_Sudan_conflict', 'Jury_Duty_(2023_TV_series)', 'John_Owen_Lowe', 'Google_LLC', 'Henk_Rogers', 'Janice_Dickinson', 'Rinku_Singh_(cricketer)', 'Elliot_Grainge', 'Hiba_Abouk', '2023_NBA_playoffs', 'Alex_Pereira', 'Jelly_Roll_(singer)', 'Ahsoka_(TV_series)', 'Arjun_Tendulkar', 'Duty_After_School', 'Mae_Martin', 'Don_Lemon', 'Coachella_(festival)', 'Phil_Mickelson', 'Jorge_Masvidal', 'Gervonta_Davis_vs._Ryan_Garcia', 'Rhea_Ripley', 'Alexey_Pajitnov', 'Murder_Mystery_(film)', 'Evil_Dead_(2013_film)', 'Chennai_Super_Kings', 'Astro_(South_Korean_band)', 'Sarah_Snook', 'Charlie_Murphy_(actress)', 'Chevalier_de_Saint-Georges', 'EFL_League_Two', 'Obsession_(2023_TV_series)', 'Fool\'s_Gold_Loaf', 'Justin_Jones_(Tennessee_politician)', 'Dead_Island_2', 'Masters_Tournament', 'Pinkerton_(detective_agency)', 'Harlan_Crow', 'Mumbai_Indians', 'Pathu_Thala', 'James_Marsden', 'Cheryl_Hines', 'Young_Sheldon', 'Anheuser-Busch', 'Candy_Montgomery', 'Jake_Bongiovi', '72_Seasons', 'Uhtred_of_Bamburgh', 'Satya_Pal_Malik', '2023_Finnish_parliamentary_election', 'Paul_Mullin_(footballer,_born_1994)', 'Love_&_Death_(miniseries)', 'Tom_Pelphrey', 'Dillon_Brooks', 'Indiana_Jones_and_the_Dial_of_Destiny', 'Steven_Crowder', 'Greta_Gerwig', 'Peter_Pan_&_Wendy', 'Kid_Rock', '2023_Stanley_Cup_playoffs', 'Eva_Mendes', 'Carlo_Ancelotti', 'Dominik_Mysterio', 'Bob_Lee_(businessman)', 'Karim_Benzema', 'Rabbit_Hole_(TV_series)', 'Jeremy_Strong_(actor)', '420_(cannabis_culture)', 'Solar_eclipse_of_April_20,_2023', 'Rapid_Support_Forces', 'Pamela_Chopra', 'Vanessa_Lachey', 'List_of_Horrible_Histories_(2009_TV_series)_episodes', 'The_Passion_of_the_Christ', 'Gabriele_Amorth', 'A_Good_Person', 'Will_Levis', 'From_(TV_series)', 'Ravanasura_(film)', 'Battle_of_Brunanburh', 'Judy_Blume', 'Seven_Kings_Must_Die', '2023_Sudan_clashes', 'Love_Is_Blind_(TV_series)', 'Gaslight_(2023_film)', 'International_Workers\'_Day', 'Eve_Harlow', 'De\'Aaron_Fox', 'Eddie_Guerrero', 'Blue_Beetle_(film)', 'Craig_Breen', 'Bobby_Hurley', 'Bryce_Young', 'Are_You_There_God?_It\'s_Me,_Margaret.', 'Thuy_Trang', 'Transatlantic_(TV_series)', 'Molly_Shannon', 'Alexander_Dreymon', 'Veeram_(2014_film)', 'ADX_Florence', 'Max_Holloway', 'Shaakuntalam', 'The_Rookie_(TV_series)', 'Kaitlin_Olson', 'Justin_J._Pearson', 'Lainey_Wilson', 'Blood_Meridian', 'Artemis_2', 'Vetrimaaran', 'Jisoo', 'Balagam_(film)', 'Guy_Ritchie', 'The_Evil_Dead', 'Shari_Belafonte', 'Charlie_Day', 'Coronation_of_Charles_III_and_Camilla', 'Cha_Eun-woo', 'South_Sudan', 'Palm_Sunday', 'Global_Country_of_World_Peace', 'Cissy_Houston', 'Canelo_Álvarez', 'Transformers_(film_series)', 'Enumclaw_horse_sex_case', 'Billy_Beane', 'UConn_Huskies_men\'s_basketball', 'World_Chess_Championship', 'Sisu_(film)', 'BlackRock', '2023_ATP_Tour', 'Nita_Ambani', 'S_Club_7', 'Seve_Ballesteros', 'Reba_McEntire', 'Christopher_Lloyd', 'Mario', 'Sanna_Marin', 'I_Got_a_Cheat_Skill_in_Another_World_and_Became_Unrivaled_in_the_Real_World,_Too', 'Romancham', 'Bob_Odenkirk', 'Heavenly_Delusion', 'Maundy_Thursday', 'Chevalier_(2022_film)', 'Justine_Bateman', 'UFC_288', 'Rachel_Brosnahan', 'Charles_Harrelson', 'Alvin_Bragg', 'Kill_Boksoon', 'Augusta_National_Golf_Club', 'Jennie_(singer)', 'Boys_Planet', 'Chengiz', 'NXT_Stand_&_Deliver_(2023)', '2023_Badminton_Asia_Championships', 'Chris_Henchy', 'Hannah_Spearritt', 'Nick_Lachey', '2022–23_NBA_season', 'Book_Review_Index', '2008_Indian_Premier_League', 'Mary_Quant', 'Mike_Brown_(basketball,_born_1970)', 'Ballerina_(2024_film)', 'Zhilei_Zhang']));
var $author$project$Helpers$pickTitle = function (seed) {
	return A2(
		$elm$core$Maybe$withDefault,
		'Kevin_Bacon',
		A2(
			$elm$core$Array$get,
			A2(
				$elm$core$Basics$modBy,
				$elm$core$Array$length($author$project$Articles$titles),
				seed),
			$author$project$Articles$titles));
};
var $author$project$Helpers$randomTitle = A2(
	$elm$random$Random$map,
	$author$project$Helpers$pickTitle,
	A2(
		$elm$random$Random$int,
		0,
		$elm$core$Array$length($author$project$Articles$titles)));
var $author$project$Helpers$getRandomTitle = function (seed) {
	var _v0 = A2($elm$random$Random$step, $author$project$Helpers$randomTitle, seed);
	var title = _v0.a;
	var newSeed = _v0.b;
	return _Utils_Tuple2(
		A3($elm$core$String$replace, '_', ' ', title),
		newSeed);
};
var $author$project$Helpers$getDestinations = F2(
	function (num, seed) {
		if (!num) {
			return _Utils_Tuple2(_List_Nil, seed);
		} else {
			var n = num;
			var _v1 = $author$project$Helpers$getRandomTitle(seed);
			var title = _v1.a;
			var newSeed = _v1.b;
			var _v2 = A2($author$project$Helpers$getDestinations, n - 1, newSeed);
			var dests = _v2.a;
			var lastSeed = _v2.b;
			return _Utils_Tuple2(
				A2($elm$core$List$cons, title, dests),
				lastSeed);
		}
	});
var $author$project$Model$NoOp = {$: 'NoOp'};
var $elm$browser$Browser$Dom$setViewport = _Browser_setViewport;
var $author$project$Main$goBackToTop = A2(
	$elm$core$Task$perform,
	function (_v0) {
		return $author$project$Model$NoOp;
	},
	A2($elm$browser$Browser$Dom$setViewport, 0, 0));
var $author$project$Main$makeToast = _Platform_outgoingPort('makeToast', $elm$json$Json$Encode$string);
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$PeerPort$createMsg = function (header) {
	return function (value) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(header, value)
				]));
	};
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$PeerPort$seedInfo = F2(
	function (num, seed) {
		return A2(
			$author$project$PeerPort$createMsg,
			'seedInfo',
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'numTitles',
						$elm$json$Json$Encode$int(num)),
						_Utils_Tuple2(
						'seed',
						$elm$json$Json$Encode$string(seed))
					])));
	});
var $author$project$PeerPort$sendData = _Platform_outgoingPort('sendData', $elm$core$Basics$identity);
var $elm$core$String$foldl = _String_foldl;
var $author$project$Helpers$strToSeed = function (s) {
	var hash = A3(
		$elm$core$String$foldl,
		F2(
			function (c, h) {
				return ((h << 5) + h) + $elm$core$Char$toCode(c);
			}),
		5381,
		s);
	return $elm$random$Random$initialSeed(hash);
};
var $author$project$Main$createGame = function (model) {
	var seedStrChosen = model.options.seedStr;
	var toast = $author$project$Main$makeToast('game seed is: ' + seedStrChosen);
	var numDestsChosen = model.options.numDestinations;
	var signalPeers = model.options.isHost ? $author$project$PeerPort$sendData(
		A2($author$project$PeerPort$seedInfo, numDestsChosen, seedStrChosen)) : $elm$core$Platform$Cmd$none;
	var _v0 = A2(
		$author$project$Helpers$getDestinations,
		numDestsChosen,
		$author$project$Helpers$strToSeed(seedStrChosen));
	var titles = _v0.a;
	var loadingDests = A2($elm$core$List$map, $author$project$Model$Loading, titles);
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{dests: _List_Nil, loadingDests: loadingDests, numDestsChange: numDestsChosen, seedChange: seedStrChosen, window: $author$project$Model$Preview}),
		$elm$core$Platform$Cmd$batch(
			A2(
				$elm$core$List$cons,
				$author$project$Main$activateTooltips,
				A2(
					$elm$core$List$cons,
					$author$project$Main$activateClippy,
					A2(
						$elm$core$List$cons,
						$author$project$Main$goBackToTop,
						A2(
							$elm$core$List$cons,
							signalPeers,
							A2(
								$elm$core$List$cons,
								toast,
								A2($elm$core$List$map, $author$project$Main$getDescription, titles))))))));
};
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $author$project$Model$destIsLoaded = function (dest) {
	if (dest.$ === 'Loaded') {
		return true;
	} else {
		return false;
	}
};
var $author$project$Model$doneLoading = $elm$core$List$all($author$project$Model$destIsLoaded);
var $author$project$Model$emptyPeer = {currentTitle: '', finished: false, isHost: false, lastDest: '', path: _List_Nil, time: 0, username: '', uuid: 0};
var $author$project$Model$extractLoadedDestinations = function (loads) {
	extractLoadedDestinations:
	while (true) {
		if (loads.b) {
			if (loads.a.$ === 'Loaded') {
				var page = loads.a.a;
				var rest = loads.b;
				return A2(
					$elm$core$List$cons,
					page,
					$author$project$Model$extractLoadedDestinations(rest));
			} else {
				var rest = loads.b;
				var $temp$loads = rest;
				loads = $temp$loads;
				continue extractLoadedDestinations;
			}
		} else {
			return _List_Nil;
		}
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $author$project$PeerPort$gameFinish = F3(
	function (uuid, path, time) {
		return A2(
			$author$project$PeerPort$createMsg,
			'finish',
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'uuid',
						$elm$json$Json$Encode$int(uuid)),
						_Utils_Tuple2(
						'path',
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, path)),
						_Utils_Tuple2(
						'time',
						$elm$json$Json$Encode$int(time))
					])));
	});
var $elm$json$Json$Encode$bool = _Json_wrap;
var $author$project$PeerPort$gameInfo = F2(
	function (uuid, info) {
		var encodePeer = function (peer) {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'uuid',
						$elm$json$Json$Encode$int(peer.uuid)),
						_Utils_Tuple2(
						'username',
						$elm$json$Json$Encode$string(peer.username)),
						_Utils_Tuple2(
						'isHost',
						$elm$json$Json$Encode$bool(peer.isHost)),
						_Utils_Tuple2(
						'finished',
						$elm$json$Json$Encode$bool(peer.finished)),
						_Utils_Tuple2(
						'lastDest',
						$elm$json$Json$Encode$string(peer.lastDest))
					]));
		};
		var encodeInfo = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'seed',
					$elm$json$Json$Encode$string(info.seed)),
					_Utils_Tuple2(
					'numDestinations',
					$elm$json$Json$Encode$int(info.numDestinations)),
					_Utils_Tuple2(
					'peers',
					A2($elm$json$Json$Encode$list, encodePeer, info.peers)),
					_Utils_Tuple2(
					'started',
					$elm$json$Json$Encode$bool(info.started))
				]));
		return A2(
			$author$project$PeerPort$createMsg,
			'gameInfo',
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'uuid',
						$elm$json$Json$Encode$int(uuid)),
						_Utils_Tuple2('info', encodeInfo)
					])));
	});
var $author$project$Model$GotPage = F2(
	function (a, b) {
		return {$: 'GotPage', a: a, b: b};
	});
var $author$project$Main$getPage = function (title) {
	return A2(
		$elm$core$Platform$Cmd$map,
		$author$project$Model$GotPage(title),
		$author$project$PageFetch$getPage(title));
};
var $author$project$PeerPort$initPeer = _Platform_outgoingPort(
	'initPeer',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'connectId',
					$elm$json$Json$Encode$string($.connectId)),
					_Utils_Tuple2(
					'isHost',
					$elm$json$Json$Encode$bool($.isHost)),
					_Utils_Tuple2(
					'username',
					$elm$json$Json$Encode$string($.username)),
					_Utils_Tuple2(
					'uuid',
					$elm$json$Json$Encode$int($.uuid))
				]));
	});
var $author$project$PeerPort$peerConnect = F2(
	function (username, uuid) {
		return A2(
			$author$project$PeerPort$createMsg,
			'peerConnect',
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'uuid',
						$elm$json$Json$Encode$int(uuid)),
						_Utils_Tuple2(
						'username',
						$elm$json$Json$Encode$string(username))
					])));
	});
var $author$project$PeerPort$peerDisconnect = function (uuid) {
	return A2(
		$author$project$PeerPort$createMsg,
		'peerDisconnect',
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'uuid',
					$elm$json$Json$Encode$int(uuid))
				])));
};
var $author$project$Helpers$popBy = F3(
	function (f, _this, items) {
		if (items.b) {
			var thebunch = items;
			var x = thebunch.a;
			var xs = thebunch.b;
			return _Utils_eq(
				f(x),
				f(_this)) ? xs : thebunch;
		} else {
			return _List_Nil;
		}
	});
var $author$project$Model$Loaded = function (a) {
	return {$: 'Loaded', a: a};
};
var $author$project$Model$replaceWithLoaded = F2(
	function (dest, loadingDests) {
		if (loadingDests.b) {
			if (loadingDests.a.$ === 'Loading') {
				var title = loadingDests.a.a;
				var rest = loadingDests.b;
				return _Utils_eq(dest.title, title) ? A2(
					$elm$core$List$cons,
					$author$project$Model$Loaded(dest),
					rest) : A2(
					$elm$core$List$cons,
					$author$project$Model$Loading(title),
					A2($author$project$Model$replaceWithLoaded, dest, rest));
			} else {
				var first = loadingDests.a;
				var rest = loadingDests.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($author$project$Model$replaceWithLoaded, dest, rest));
			}
		} else {
			return _List_Nil;
		}
	});
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $author$project$PeerPort$newGame = function (msg) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'newGame',
				$elm$json$Json$Encode$string(msg))
			]));
};
var $author$project$Main$reset = function (model) {
	var signalPeers = model.options.isHost ? $author$project$PeerPort$sendData(
		$author$project$PeerPort$newGame(model.options.username + ' wants a new game')) : $elm$core$Platform$Cmd$none;
	var newPeerDict = function () {
		var resetPeer = function (peer) {
			return _Utils_update(
				$author$project$Model$emptyPeer,
				{isHost: peer.isHost, username: peer.username, uuid: peer.uuid});
		};
		return A2(
			$elm$core$Dict$map,
			F2(
				function (_v1, p) {
					return resetPeer(p);
				}),
			model.peers);
	}();
	var newGameState = {pastDests: _List_Nil, path: _List_Nil, remainingDests: _List_Nil, time: 0};
	var resetModel = _Utils_update(
		model,
		{dests: _List_Nil, gameStarted: false, gameState: newGameState, loadingDests: _List_Nil, peers: newPeerDict, seedChange: '', window: $author$project$Model$Preview});
	var _v0 = $author$project$Main$createGame(resetModel);
	var newModel = _v0.a;
	var cmd = _v0.b;
	return _Utils_Tuple2(
		newModel,
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[cmd, signalPeers])));
};
var $author$project$PeerPort$gameStarted = function (msg) {
	return A2(
		$author$project$PeerPort$createMsg,
		'start',
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'msg',
					$elm$json$Json$Encode$string(msg))
				])));
};
var $author$project$PeerPort$titleReach = F2(
	function (uuid, title) {
		return A2(
			$author$project$PeerPort$createMsg,
			'titleReach',
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'uuid',
						$elm$json$Json$Encode$int(uuid)),
						_Utils_Tuple2(
						'title',
						$elm$json$Json$Encode$string(title))
					])));
	});
var $author$project$Main$transition = $elm$core$Platform$Cmd$batch(
	_List_fromArray(
		[$author$project$Main$activateTooltips, $author$project$Main$goBackToTop]));
var $author$project$Main$startGame = function (model) {
	var _v0 = model.dests;
	if (_v0.b) {
		var start = _v0.a;
		var destinations = _v0.b;
		var startReachSignal = $author$project$PeerPort$sendData(
			A2($author$project$PeerPort$titleReach, model.options.uuid, start.title));
		var startGameSignal = model.options.isHost ? $author$project$PeerPort$sendData(
			$author$project$PeerPort$gameStarted(model.options.username + ' started the game')) : $elm$core$Platform$Cmd$none;
		var gameState = {
			pastDests: _List_fromArray(
				[start]),
			path: _List_fromArray(
				[start]),
			remainingDests: destinations,
			time: 0
		};
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					gameStarted: true,
					gameState: gameState,
					window: $author$project$Model$InPage(start)
				}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[$author$project$Main$transition, startGameSignal, startReachSignal])));
	} else {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					window: $author$project$Model$Bad('Can\'t start game with 0 destinations')
				}),
			$elm$core$Platform$Cmd$none);
	}
};
var $elm$core$String$trim = _String_trim;
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'ChangeOptions':
				var options = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{options: options}),
					$elm$core$Platform$Cmd$none);
			case 'ChangeOptsWhileInPreview':
				var opts = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{numDestsChange: opts.numDests, seedChange: opts.seed}),
					$elm$core$Platform$Cmd$none);
			case 'StartGame':
				return $author$project$Main$startGame(model);
			case 'GotDescription':
				if (msg.b.$ === 'Ok') {
					var page = msg.b.a;
					var newLoadingDests = A2($author$project$Model$replaceWithLoaded, page, model.loadingDests);
					var allDestsLoaded = $author$project$Model$doneLoading(newLoadingDests);
					var newDests = allDestsLoaded ? $author$project$Model$extractLoadedDestinations(newLoadingDests) : model.dests;
					var newModel = _Utils_update(
						model,
						{dests: newDests, loadingDests: newLoadingDests});
					return (model.gameStarted && allDestsLoaded) ? $author$project$Main$startGame(newModel) : _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
				} else {
					var title = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								window: $author$project$Model$Bad('Ran into issue getting description for ' + title)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GotPage':
				if (msg.b.$ === 'Ok') {
					var page = msg.b.a;
					var state = model.gameState;
					var signalTitleReached = $author$project$PeerPort$sendData(
						A2($author$project$PeerPort$titleReach, model.options.uuid, page.title));
					var newPath = A2($elm$core$List$cons, page, model.gameState.path);
					var signalGameFinished = $author$project$PeerPort$sendData(
						A3(
							$author$project$PeerPort$gameFinish,
							model.options.uuid,
							A2(
								$elm$core$List$map,
								function ($) {
									return $.title;
								},
								newPath),
							state.time));
					var _v1 = state.remainingDests;
					if (_v1.b) {
						var dest = _v1.a;
						var restOfDests = _v1.b;
						var newGameState = _Utils_eq(page.title, dest.title) ? _Utils_update(
							state,
							{
								pastDests: A2($elm$core$List$cons, dest, state.pastDests),
								path: newPath,
								remainingDests: restOfDests
							}) : _Utils_update(
							state,
							{path: newPath});
						var isPathCompleted = _Utils_eq(page.title, dest.title) && $elm$core$List$isEmpty(restOfDests);
						return isPathCompleted ? _Utils_Tuple2(
							_Utils_update(
								model,
								{
									gameState: newGameState,
									window: $author$project$Model$Review(
										_List_fromArray(
											[model.options.uuid]))
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[signalGameFinished, signalTitleReached, $author$project$Main$transition]))) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									gameState: newGameState,
									window: $author$project$Model$InPage(page)
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[signalTitleReached, $author$project$Main$transition])));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									window: $author$project$Model$Bad('Why are we out of destinations?')
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					var title = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								window: $author$project$Model$Bad('Http error while fetching ' + title)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'ClickedLink':
				var title = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							window: $author$project$Model$Fetching(title)
						}),
					$author$project$Main$getPage(title));
			case 'GoBack':
				var state = model.gameState;
				var _v2 = state.path;
				if (_v2.b && _v2.b.b) {
					var currentPage = _v2.a;
					var _v3 = _v2.b;
					var prevPage = _v3.a;
					var rest = _v3.b;
					if (_Utils_eq(
						$elm$core$List$head(state.path),
						$elm$core$List$head(state.pastDests))) {
						var newState = _Utils_update(
							state,
							{
								pastDests: A3(
									$author$project$Helpers$popBy,
									function ($) {
										return $.title;
									},
									currentPage,
									state.pastDests),
								path: A2($elm$core$List$cons, prevPage, rest),
								remainingDests: A2($elm$core$List$cons, currentPage, state.remainingDests)
							});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									gameState: newState,
									window: $author$project$Model$InPage(prevPage)
								}),
							$author$project$Main$transition);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									gameState: _Utils_update(
										state,
										{
											path: A2($elm$core$List$cons, prevPage, rest)
										}),
									window: $author$project$Model$InPage(prevPage)
								}),
							$author$project$Main$transition);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'Tick':
				var state = model.gameState;
				var newState = _Utils_update(
					state,
					{time: state.time + 10});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{gameState: newState}),
					$elm$core$Platform$Cmd$none);
			case 'NoOp':
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'Refresh':
				var options = model.options;
				var newModel = _Utils_update(
					model,
					{
						options: _Utils_update(
							options,
							{numDestinations: model.numDestsChange, seedStr: model.seedChange})
					});
				return $author$project$Main$createGame(newModel);
			case 'ClickedJoinOrHost':
				var flag = msg.a;
				if ($elm$core$String$isEmpty(model.options.username)) {
					return _Utils_Tuple2(
						model,
						$author$project$Main$makeToast('You must give a username!'));
				} else {
					if ((!flag.isHost) && $elm$core$String$isEmpty(model.options.joinId)) {
						return _Utils_Tuple2(
							model,
							$author$project$Main$makeToast('You have to provide the host\'s game ID to join their game'));
					} else {
						var peerUninitialized = $elm$core$String$isEmpty(model.options.peerId);
						var noFriendsToast = $author$project$Main$makeToast('Your socket connection hasn\'t been initialized. Try refreshing if you\'d like to play with friends.');
						var newOptions = function () {
							var options = model.options;
							return _Utils_update(
								options,
								{isHost: flag.isHost});
						}();
						var initPeerCmd = $author$project$PeerPort$initPeer(
							{connectId: model.options.joinId, isHost: flag.isHost, username: model.options.username, uuid: model.options.uuid});
						var _v4 = $author$project$Main$createGame(model);
						var previewModel = _v4.a;
						var makeGameCmd = _v4.b;
						var cmd = (flag.isHost && peerUninitialized) ? $elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[makeGameCmd, noFriendsToast, initPeerCmd])) : (flag.isHost ? $elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[makeGameCmd, initPeerCmd])) : $elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									initPeerCmd,
									$author$project$Main$makeToast('attempting to join game...')
								])));
						return flag.isHost ? _Utils_Tuple2(
							_Utils_update(
								previewModel,
								{
									options: _Utils_update(
										newOptions,
										{joinId: ''})
								}),
							cmd) : _Utils_Tuple2(
							_Utils_update(
								model,
								{options: newOptions}),
							cmd);
					}
				}
			case 'GotUUID':
				var uuid = msg.a;
				var options = model.options;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							options: _Utils_update(
								options,
								{uuid: uuid})
						}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleReviewPlayer':
				var uuid = msg.a;
				var _v17 = model.window;
				if (_v17.$ === 'Review') {
					var highlightedPlayers = _v17.a;
					var newHighlightedPlayers = A2($elm$core$List$member, uuid, highlightedPlayers) ? A2(
						$elm$core$List$filter,
						$elm$core$Basics$neq(uuid),
						highlightedPlayers) : A2($elm$core$List$cons, uuid, highlightedPlayers);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								window: $author$project$Model$Review(newHighlightedPlayers)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'GiveUp':
				var peerMsg = $author$project$PeerPort$sendData(
					A3(
						$author$project$PeerPort$gameFinish,
						model.options.uuid,
						A2(
							$elm$core$List$map,
							function ($) {
								return $.title;
							},
							model.gameState.path),
						model.gameState.time));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							window: $author$project$Model$Review(
								_List_fromArray(
									[model.options.uuid]))
						}),
					peerMsg);
			case 'ClickedNewGame':
				return model.options.isHost ? $author$project$Main$reset(model) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							window: $author$project$Model$Bad('Only hosts can start new games')
						}),
					$elm$core$Platform$Cmd$none);
			default:
				switch (msg.a.$) {
					case 'IdGenerated':
						var id = msg.a.a;
						var options = model.options;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									options: _Utils_update(
										options,
										{peerId: id})
								}),
							$elm$core$Platform$Cmd$none);
					case 'SeedInfo':
						var _v5 = msg.a;
						var num = _v5.a;
						var seed = _v5.b;
						if (model.options.isHost) {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										window: $author$project$Model$Bad('Host shouldnt be receiving seedinfo')
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var options = model.options;
							return $author$project$Main$createGame(
								_Utils_update(
									model,
									{
										options: _Utils_update(
											options,
											{numDestinations: num, seedStr: seed})
									}));
						}
					case 'GameStart':
						var startMsg = msg.a.a;
						if (model.options.isHost) {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										window: $author$project$Model$Bad('Host shouldnt be receiving game start message')
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var toast = function () {
								var _v7 = $elm$core$String$trim(startMsg);
								if (_v7 === '') {
									return $elm$core$Platform$Cmd$none;
								} else {
									var s = _v7;
									return $author$project$Main$makeToast(s);
								}
							}();
							var allDestsLoaded = $author$project$Model$doneLoading(model.loadingDests);
							var _v6 = $author$project$Main$startGame(model);
							var newModel = _v6.a;
							var cmd = _v6.b;
							return allDestsLoaded ? _Utils_Tuple2(
								newModel,
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[cmd, toast]))) : _Utils_Tuple2(
								_Utils_update(
									model,
									{gameStarted: true}),
								toast);
						}
					case 'TitleReach':
						var _v8 = msg.a;
						var uuid = _v8.a;
						var title = _v8.b;
						var _v9 = A2($elm$core$Dict$get, uuid, model.peers);
						if (_v9.$ === 'Just') {
							var peer = _v9.a;
							var updatedPeer = function () {
								var newLastDest = A2(
									$elm$core$List$member,
									title,
									A2(
										$elm$core$List$map,
										function ($) {
											return $.title;
										},
										model.dests)) ? title : peer.lastDest;
								return _Utils_update(
									peer,
									{currentTitle: title, lastDest: newLastDest});
							}();
							var toast = A2(
								$elm$core$List$member,
								title,
								A2(
									$elm$core$List$map,
									function ($) {
										return $.title;
									},
									model.dests)) ? $author$project$Main$makeToast(peer.username + (' found ' + title)) : $elm$core$Platform$Cmd$none;
							var hostEcho = model.options.isHost ? $author$project$PeerPort$sendData(
								A2($author$project$PeerPort$titleReach, uuid, title)) : $elm$core$Platform$Cmd$none;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										peers: A3($elm$core$Dict$insert, uuid, updatedPeer, model.peers)
									}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[hostEcho, toast])));
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					case 'PeerConnect':
						var _v10 = msg.a;
						var peerUsername = _v10.a;
						var peerUUID = _v10.b;
						if (_Utils_eq(peerUUID, model.options.uuid)) {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							var toast = $author$project$Main$makeToast(peerUsername + ' joined the game');
							var peerList = A2(
								$elm$core$List$map,
								function (peer) {
									return {finished: peer.finished, isHost: false, lastDest: peer.lastDest, username: peer.username, uuid: peer.uuid};
								},
								$elm$core$Dict$values(model.peers));
							var peerListWithHost = function () {
								var lastDest = A2(
									$elm$core$Maybe$withDefault,
									'',
									A2(
										$elm$core$Maybe$map,
										function ($) {
											return $.title;
										},
										$elm$core$List$head(model.gameState.pastDests)));
								var finished = function () {
									var _v11 = model.window;
									if (_v11.$ === 'Review') {
										return true;
									} else {
										return false;
									}
								}();
								return A2(
									$elm$core$List$cons,
									{finished: finished, isHost: true, lastDest: lastDest, username: model.options.username, uuid: model.options.uuid},
									peerList);
							}();
							var newPeer = _Utils_update(
								$author$project$Model$emptyPeer,
								{username: peerUsername, uuid: peerUUID});
							var newPeerDict = A3($elm$core$Dict$insert, peerUUID, newPeer, model.peers);
							var hostSendGameInfo = $author$project$PeerPort$sendData(
								A2(
									$author$project$PeerPort$gameInfo,
									peerUUID,
									{numDestinations: model.options.numDestinations, peers: peerListWithHost, seed: model.options.seedStr, started: model.gameStarted}));
							var hostEcho = $author$project$PeerPort$sendData(
								A2($author$project$PeerPort$peerConnect, peerUsername, peerUUID));
							return model.options.isHost ? _Utils_Tuple2(
								_Utils_update(
									model,
									{peers: newPeerDict}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[hostSendGameInfo, hostEcho, toast]))) : _Utils_Tuple2(
								_Utils_update(
									model,
									{peers: newPeerDict}),
								toast);
						}
					case 'PeerDisconnect':
						var uuid = msg.a.a;
						var toast = function () {
							var _v12 = A2(
								$elm$core$Maybe$map,
								function ($) {
									return $.username;
								},
								A2($elm$core$Dict$get, uuid, model.peers));
							if (_v12.$ === 'Just') {
								var name = _v12.a;
								return $author$project$Main$makeToast(name + ' has left the game');
							} else {
								return $elm$core$Platform$Cmd$none;
							}
						}();
						var newPeerDict = A2($elm$core$Dict$remove, uuid, model.peers);
						var hostEcho = model.options.isHost ? $author$project$PeerPort$sendData(
							$author$project$PeerPort$peerDisconnect(uuid)) : $elm$core$Platform$Cmd$none;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{peers: newPeerDict}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[hostEcho, toast])));
					case 'HostLost':
						var message = msg.a.a;
						return model.options.isHost ? _Utils_Tuple2(
							_Utils_update(
								model,
								{
									window: $author$project$Model$Bad('Host connection was lost... but you\'re the host')
								}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							$author$project$Main$initialModel,
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										$author$project$Main$makeToast(message),
										$author$project$Main$initCmd
									])));
					case 'GameFinish':
						var _v13 = msg.a;
						var peeruuid = _v13.a;
						var path = _v13.b;
						var time = _v13.c;
						var _v14 = A2($elm$core$Dict$get, peeruuid, model.peers);
						if (_v14.$ === 'Just') {
							var peer = _v14.a;
							var updatedPeer = _Utils_update(
								peer,
								{finished: true, path: path, time: time});
							var peerGotToEnd = _Utils_eq(
								A2(
									$elm$core$Basics$composeR,
									$elm$core$List$reverse,
									A2(
										$elm$core$Basics$composeR,
										$elm$core$List$head,
										$elm$core$Maybe$map(
											function ($) {
												return $.title;
											})))(model.dests),
								$elm$core$List$head(path));
							var toast = peerGotToEnd ? (peer.username + ' has finished!') : (peer.username + ' gave up');
							var hostEcho = model.options.isHost ? $author$project$PeerPort$sendData(
								A3($author$project$PeerPort$gameFinish, peeruuid, path, time)) : $elm$core$Platform$Cmd$none;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										peers: A3($elm$core$Dict$insert, peeruuid, updatedPeer, model.peers)
									}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											hostEcho,
											$author$project$Main$makeToast(toast)
										])));
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					case 'GameInfo':
						var _v15 = msg.a;
						var uuid = _v15.a;
						var info = _v15.b;
						if (_Utils_eq(uuid, model.options.uuid)) {
							var options = model.options;
							var hostName = A2(
								$elm$core$Basics$composeR,
								$elm$core$List$filter(
									function ($) {
										return $.isHost;
									}),
								A2(
									$elm$core$Basics$composeR,
									$elm$core$List$head,
									A2(
										$elm$core$Basics$composeR,
										$elm$core$Maybe$map(
											function ($) {
												return $.username;
											}),
										$elm$core$Maybe$withDefault('???'))))(info.peers);
							var addPeerToDict = F2(
								function (peer, dict) {
									return A3(
										$elm$core$Dict$insert,
										peer.uuid,
										_Utils_update(
											$author$project$Model$emptyPeer,
											{finished: peer.finished, isHost: peer.isHost, lastDest: peer.lastDest, username: peer.username, uuid: peer.uuid}),
										dict);
								});
							var newPeerDict = A3($elm$core$List$foldl, addPeerToDict, model.peers, info.peers);
							var _v16 = $author$project$Main$createGame(
								_Utils_update(
									model,
									{
										gameStarted: info.started,
										options: _Utils_update(
											options,
											{numDestinations: info.numDestinations, seedStr: info.seed}),
										peers: newPeerDict
									}));
							var newModel = _v16.a;
							var cmd = _v16.b;
							return _Utils_Tuple2(
								newModel,
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											cmd,
											$author$project$Main$makeToast('You joined ' + (hostName + '\'s game'))
										])));
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					case 'Malformed':
						var errorString = msg.a.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									window: $author$project$Model$Bad(errorString)
								}),
							$elm$core$Platform$Cmd$none);
					case 'Error':
						var err = msg.a.a;
						return _Utils_Tuple2(
							model,
							$author$project$Main$makeToast(err));
					default:
						var str = msg.a.a;
						var toast = $author$project$Main$makeToast(str);
						var _v18 = $author$project$Main$reset(model);
						var newModel = _v18.a;
						var cmd = _v18.b;
						return _Utils_Tuple2(
							newModel,
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[cmd, toast])));
				}
		}
	});
var $author$project$Model$ChangeOptsWhileInPreview = function (a) {
	return {$: 'ChangeOptsWhileInPreview', a: a};
};
var $author$project$Model$ClickedNewGame = {$: 'ClickedNewGame'};
var $author$project$Model$GiveUp = {$: 'GiveUp'};
var $author$project$Model$GoBack = {$: 'GoBack'};
var $author$project$Model$Refresh = {$: 'Refresh'};
var $author$project$Model$StartGame = {$: 'StartGame'};
var $author$project$Model$ToggleReviewPlayer = function (a) {
	return {$: 'ToggleReviewPlayer', a: a};
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$html$Html$b = _VirtualDom_node('b');
var $elm$html$Html$br = _VirtualDom_node('br');
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$Views$break = function (num) {
	return A2(
		$elm$html$Html$span,
		_List_Nil,
		A2(
			$elm$core$List$repeat,
			num,
			A2($elm$html$Html$br, _List_Nil, _List_Nil)));
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$h5 = _VirtualDom_node('h5');
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$input = _VirtualDom_node('input');
var $author$project$Helpers$last = function (data) {
	last:
	while (true) {
		if (data.b) {
			if (!data.b.b) {
				var x = data.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = data.b;
				var $temp$data = rest;
				data = $temp$data;
				continue last;
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}
};
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$Attributes$readonly = $elm$html$Html$Attributes$boolProperty('readOnly');
var $author$project$Helpers$Right = {$: 'Right'};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $hecrj$html_parser$Html$Parser$Util$toAttribute = function (_v0) {
	var name = _v0.a;
	var value = _v0.b;
	return A2($elm$html$Html$Attributes$attribute, name, value);
};
var $hecrj$html_parser$Html$Parser$Util$toVirtualDom = function (nodes) {
	return A2($elm$core$List$map, $hecrj$html_parser$Html$Parser$Util$toVirtualDomEach, nodes);
};
var $hecrj$html_parser$Html$Parser$Util$toVirtualDomEach = function (node) {
	switch (node.$) {
		case 'Element':
			var name = node.a;
			var attrs = node.b;
			var children = node.c;
			return A3(
				$elm$html$Html$node,
				name,
				A2($elm$core$List$map, $hecrj$html_parser$Html$Parser$Util$toAttribute, attrs),
				$hecrj$html_parser$Html$Parser$Util$toVirtualDom(children));
		case 'Text':
			var s = node.a;
			return $elm$html$Html$text(s);
		default:
			return $elm$html$Html$text('');
	}
};
var $author$project$Helpers$arrow = F2(
	function (dir, size) {
		var em = $elm$core$String$fromFloat(size) + 'em';
		var code = function () {
			switch (dir.$) {
				case 'Up':
					return '&uarr;';
				case 'Down':
					return '&darr;';
				default:
					return '&rarr;';
			}
		}();
		var _v0 = $hecrj$html_parser$Html$Parser$run('<span style=\"font-size: ' + (em + (';\">' + (code + '</span>'))));
		if (_v0.$ === 'Ok') {
			var nodes = _v0.a;
			var _v1 = $elm$core$List$head(
				$hecrj$html_parser$Html$Parser$Util$toVirtualDom(nodes));
			if (_v1.$ === 'Just') {
				var node = _v1.a;
				return node;
			} else {
				return $elm$html$Html$text('');
			}
		} else {
			return $elm$html$Html$text('');
		}
	});
var $author$project$Helpers$rightarrow = function (size) {
	return A2($author$project$Helpers$arrow, $author$project$Helpers$Right, size);
};
var $author$project$Helpers$singleRow = function (element) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('row')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('col')
					]),
				_List_fromArray(
					[element]))
			]));
};
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $elm$core$List$sortBy = _List_sortBy;
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Helpers$dropWhile = F2(
	function (f, data) {
		dropWhile:
		while (true) {
			if (data.b) {
				var all = data;
				var x = all.a;
				var xs = all.b;
				if (f(x)) {
					var $temp$f = f,
						$temp$data = xs;
					f = $temp$f;
					data = $temp$data;
					continue dropWhile;
				} else {
					return all;
				}
			} else {
				return _List_Nil;
			}
		}
	});
var $author$project$Helpers$pull = F2(
	function (f, data) {
		if (data.b) {
			var all = data;
			var x = all.a;
			var xs = all.b;
			if (f(x)) {
				var _v1 = A2($author$project$Helpers$pull, f, xs);
				var left = _v1.a;
				var right = _v1.b;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, x, left),
					right);
			} else {
				return _Utils_Tuple2(_List_Nil, all);
			}
		} else {
			return _Utils_Tuple2(_List_Nil, _List_Nil);
		}
	});
var $author$project$Helpers$threads = F2(
	function (f, data) {
		var _v0 = A2(
			$author$project$Helpers$dropWhile,
			A2($elm$core$Basics$composeR, f, $elm$core$Basics$not),
			data);
		if (_v0.b) {
			var x = _v0.a;
			var xs = _v0.b;
			var _v1 = A2(
				$author$project$Helpers$pull,
				A2($elm$core$Basics$composeR, f, $elm$core$Basics$not),
				xs);
			if (_v1.b.b) {
				if (!_v1.b.b.b) {
					var ys = _v1.a;
					var _v2 = _v1.b;
					var z = _v2.a;
					return _List_fromArray(
						[
							A2(
							$elm$core$List$cons,
							x,
							_Utils_ap(
								ys,
								_List_fromArray(
									[z])))
						]);
				} else {
					var ys = _v1.a;
					var _v3 = _v1.b;
					var z = _v3.a;
					var zs = _v3.b;
					return A2(
						$elm$core$List$cons,
						A2(
							$elm$core$List$cons,
							x,
							_Utils_ap(
								ys,
								_List_fromArray(
									[z]))),
						A2(
							$author$project$Helpers$threads,
							f,
							A2($elm$core$List$cons, z, zs)));
				}
			} else {
				var ys = _v1.a;
				return _List_fromArray(
					[
						A2($elm$core$List$cons, x, ys)
					]);
			}
		} else {
			return _List_Nil;
		}
	});
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Views$toolTipStyles = function (bodyText) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$attribute, 'data-bs-toggle', 'tooltip'),
			A2($elm$html$Html$Attributes$attribute, 'data-bs-placement', 'bottom'),
			A2($elm$html$Html$Attributes$attribute, 'data-bs-container', 'body'),
			$elm$html$Html$Attributes$title(bodyText)
		]);
};
var $author$project$Helpers$transpose = function (data) {
	transpose:
	while (true) {
		if (data.b) {
			if (!data.a.b) {
				var rest = data.b;
				var $temp$data = rest;
				data = $temp$data;
				continue transpose;
			} else {
				var x = data;
				var tails = $author$project$Helpers$flatten(
					A2($elm$core$List$map, $elm$core$List$tail, x));
				var heads = $author$project$Helpers$flatten(
					A2($elm$core$List$map, $elm$core$List$head, x));
				return A2(
					$elm$core$List$cons,
					heads,
					$author$project$Helpers$transpose(tails));
			}
		} else {
			return _List_Nil;
		}
	}
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Helpers$maxesBy = F2(
	function (f, data) {
		var _v0 = A2($author$project$Helpers$maxBy, f, data);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			var fx = f(x);
			return A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeR,
					f,
					$elm$core$Basics$eq(fx)),
				data);
		} else {
			return _List_Nil;
		}
	});
var $author$project$Helpers$sliding2 = function (data) {
	if (data.b && data.b.b) {
		var x = data.a;
		var _v1 = data.b;
		var y = _v1.a;
		var rest = _v1.b;
		return A2(
			$elm$core$List$cons,
			_Utils_Tuple2(x, y),
			$author$project$Helpers$sliding2(
				A2($elm$core$List$cons, y, rest)));
	} else {
		return _List_Nil;
	}
};
var $author$project$Helpers$bestSegs = F2(
	function (dests, segs) {
		var best = function (_v0) {
			var from = _v0.a;
			var to = _v0.b;
			return A2(
				$author$project$Helpers$maxesBy,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.seq;
					},
					A2($elm$core$Basics$composeR, $elm$core$List$length, $elm$core$Basics$negate)),
				A2(
					$elm$core$List$filter,
					function (s) {
						return _Utils_eq(
							$elm$core$List$head(s.seq),
							$elm$core$Maybe$Just(from)) && _Utils_eq(
							$author$project$Helpers$last(s.seq),
							$elm$core$Maybe$Just(to));
					},
					segs));
		};
		return A2(
			$elm$core$List$concatMap,
			best,
			$author$project$Helpers$sliding2(dests));
	});
var $author$project$Helpers$segments = F2(
	function (f, data) {
		var _v0 = A2(
			$author$project$Helpers$dropWhile,
			A2($elm$core$Basics$composeR, f, $elm$core$Basics$not),
			data);
		if (_v0.b) {
			var x = _v0.a;
			var xs = _v0.b;
			var _v1 = A2(
				$author$project$Helpers$pull,
				A2($elm$core$Basics$composeR, f, $elm$core$Basics$not),
				xs);
			if (_v1.b.b) {
				var ys = _v1.a;
				var _v2 = _v1.b;
				var z = _v2.a;
				var zs = _v2.b;
				return A2(
					$elm$core$List$cons,
					A2(
						$elm$core$List$cons,
						x,
						_Utils_ap(
							ys,
							_List_fromArray(
								[z]))),
					A2(
						$author$project$Helpers$segments,
						f,
						A2($elm$core$List$cons, z, zs)));
			} else {
				return _List_Nil;
			}
		} else {
			return _List_Nil;
		}
	});
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $author$project$Views$viewLink = F2(
	function (dests, title) {
		var element = A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('hoverUnderline'),
					$elm$html$Html$Attributes$href('https://en.wikipedia.org/wiki/' + title),
					$elm$html$Html$Attributes$target('_blank')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(title)
				]));
		return A2($elm$core$List$member, title, dests) ? A2(
			$elm$html$Html$b,
			_List_Nil,
			_List_fromArray(
				[element])) : element;
	});
var $author$project$Views$viewPath = function (_v0) {
	var username = _v0.username;
	var path = _v0.path;
	var dests = _v0.dests;
	var showLength = _v0.showLength;
	var first = A2(
		$elm$core$Maybe$withDefault,
		'',
		$elm$core$List$head(path));
	var _final = A2(
		$elm$core$Maybe$withDefault,
		'',
		$author$project$Helpers$last(path));
	var isComplete = A2($elm$core$List$member, first, dests) && (A2($elm$core$List$member, _final, dests) && ($elm$core$List$length(path) > 1));
	var lengthText = isComplete ? (' : (' + ($elm$core$String$fromInt(
		$elm$core$List$length(path) - 1) + ')')) : ' : (DNF)';
	return A2(
		$elm$html$Html$span,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$core$Maybe$withDefault,
				$elm$html$Html$text(''),
				A2(
					$elm$core$Maybe$map,
					function (u) {
						return A2(
							$elm$html$Html$b,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(u + ' : ')
								]));
					},
					username)),
				A2(
				$elm$html$Html$span,
				_List_Nil,
				A2(
					$elm$core$List$intersperse,
					$author$project$Helpers$rightarrow(1),
					A2(
						$elm$core$List$map,
						$author$project$Views$viewLink(dests),
						path))),
				showLength ? A2(
				$elm$html$Html$b,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(lengthText)
					])) : $elm$html$Html$text('')
			]));
};
var $author$project$Views$viewBestSegments = F2(
	function (players, dests) {
		var viewSeg = function (seg) {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('row mb-3')
					]),
				_List_fromArray(
					[
						$author$project$Helpers$singleRow(
						$author$project$Views$viewPath(
							{
								dests: dests,
								path: seg.seq,
								showLength: true,
								username: $elm$core$Maybe$Just(seg.username)
							}))
					]));
		};
		var getSegments = function (player) {
			return A2(
				$elm$core$List$map,
				function (path) {
					return {
						seq: $elm$core$List$reverse(path),
						username: player.username
					};
				},
				A2(
					$author$project$Helpers$segments,
					function (x) {
						return A2($elm$core$List$member, x, dests);
					},
					player.path));
		};
		var bests = A2(
			$author$project$Helpers$bestSegs,
			dests,
			A2($elm$core$List$concatMap, getSegments, players));
		var segViews = A2($elm$core$List$map, viewSeg, bests);
		return $elm$core$List$isEmpty(bests) ? $elm$html$Html$text('') : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('container-fluid')
				]),
			A2(
				$elm$core$List$cons,
				$author$project$Helpers$singleRow(
					A2(
						$elm$html$Html$h3,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('best wikiladders')
							]))),
				segViews));
	});
var $author$project$Model$ClickedLink = function (a) {
	return {$: 'ClickedLink', a: a};
};
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $author$project$Views$viewNode = function (n) {
	var imgurlstart = A2(
		$elm$core$Maybe$withDefault,
		$elm$regex$Regex$never,
		$elm$regex$Regex$fromString('//upload.wikimedia.org'));
	var fixurls = A2(
		$elm$regex$Regex$replace,
		imgurlstart,
		function (_v18) {
			return 'https://upload.wikimedia.org';
		});
	var attr2htmlattr = function (_v17) {
		var prop = _v17.a;
		var val = _v17.b;
		switch (prop) {
			case 'src':
				return A2(
					$elm$html$Html$Attributes$attribute,
					'src',
					fixurls(val));
			case 'srcset':
				return A2(
					$elm$html$Html$Attributes$attribute,
					'srcset',
					fixurls(val));
			default:
				return A2($elm$html$Html$Attributes$attribute, prop, val);
		}
	};
	var convert = function (parsedNode) {
		switch (parsedNode.$) {
			case 'Element':
				var tag = parsedNode.a;
				var attrs = parsedNode.b;
				var children = parsedNode.c;
				return A3(
					$elm$html$Html$node,
					tag,
					A2($elm$core$List$map, attr2htmlattr, attrs),
					A2($elm$core$List$map, $author$project$Views$viewNode, children));
			case 'Text':
				var s = parsedNode.a;
				return $elm$html$Html$text(s);
			default:
				return $elm$html$Html$text('');
		}
	};
	_v0$9:
	while (true) {
		switch (n.$) {
			case 'Element':
				switch (n.a) {
					case 'a':
						if (n.b.b && (n.b.a.a === 'href')) {
							var _v1 = n.b;
							var _v2 = _v1.a;
							var link = _v2.b;
							var attrs = _v1.b;
							var children = n.c;
							var isUnwantedNamespace = A2(
								$elm$core$List$any,
								function (ns) {
									return A2($elm$core$String$startsWith, '/wiki/' + (ns + ':'), link);
								},
								$author$project$Helpers$unwantedNamespaces);
							return isUnwantedNamespace ? A2(
								$elm$html$Html$a,
								A2($elm$core$List$map, attr2htmlattr, attrs),
								A2($elm$core$List$map, $author$project$Views$viewNode, children)) : (A2($elm$core$String$startsWith, '/wiki/', link) ? A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('wikilink'),
										$elm$html$Html$Attributes$href('#'),
										$elm$html$Html$Events$onClick(
										$author$project$Model$ClickedLink(
											A2($elm$core$String$dropLeft, 6, link)))
									]),
								A2($elm$core$List$map, $author$project$Views$viewNode, children)) : (A2($elm$core$String$startsWith, '#', link) ? A2(
								$elm$html$Html$a,
								A2(
									$elm$core$List$cons,
									$elm$html$Html$Attributes$href(link),
									A2($elm$core$List$map, attr2htmlattr, attrs)),
								A2($elm$core$List$map, $author$project$Views$viewNode, children)) : A2(
								$elm$html$Html$a,
								A2($elm$core$List$map, attr2htmlattr, attrs),
								A2($elm$core$List$map, $author$project$Views$viewNode, children))));
						} else {
							var children = n.c;
							return A2(
								$elm$html$Html$span,
								_List_Nil,
								A2($elm$core$List$map, $author$project$Views$viewNode, children));
						}
					case 'form':
						return $elm$html$Html$text('');
					case 'span':
						if (n.b.b) {
							switch (n.b.a.a) {
								case 'id':
									if (n.b.a.b === 'coordinates') {
										var _v7 = n.b;
										var _v8 = _v7.a;
										return $elm$html$Html$text('');
									} else {
										break _v0$9;
									}
								case 'class':
									switch (n.b.a.b) {
										case 'mw-editsection':
											var _v3 = n.b;
											var _v4 = _v3.a;
											return $elm$html$Html$text('');
										case 'toctext':
											var _v5 = n.b;
											var _v6 = _v5.a;
											var attrs = _v5.b;
											var children = n.c;
											return A2(
												$elm$html$Html$span,
												A2(
													$elm$core$List$cons,
													A2($elm$html$Html$Attributes$style, 'text-decoration', 'underline'),
													A2($elm$core$List$map, attr2htmlattr, attrs)),
												A2($elm$core$List$map, $author$project$Views$viewNode, children));
										default:
											if (n.b.b.b && (n.b.b.a.a === 'id')) {
												var _v9 = n.b;
												var _v10 = _v9.a;
												var clazz = _v10.b;
												var _v11 = _v9.b;
												var _v12 = _v11.a;
												var headline = _v12.b;
												var attrs = _v11.b;
												var children = n.c;
												return (A2($elm$core$String$contains, 'mw-headline', clazz) && A2(
													$elm$core$List$member,
													headline,
													_List_fromArray(
														['Citations', 'Notes', 'References']))) ? $elm$html$Html$text('') : A2(
													$elm$html$Html$span,
													A2(
														$elm$core$List$cons,
														$elm$html$Html$Attributes$class(clazz),
														A2(
															$elm$core$List$cons,
															$elm$html$Html$Attributes$id(headline),
															A2($elm$core$List$map, attr2htmlattr, attrs))),
													A2($elm$core$List$map, $author$project$Views$viewNode, children));
											} else {
												break _v0$9;
											}
									}
								default:
									break _v0$9;
							}
						} else {
							break _v0$9;
						}
					case 'div':
						if (n.b.b && (n.b.a.a === 'class')) {
							var _v13 = n.b;
							var _v14 = _v13.a;
							var clazz = _v14.b;
							var attrs = _v13.b;
							var children = n.c;
							return A2($elm$core$String$startsWith, 'reflist', clazz) ? $elm$html$Html$text('') : A2(
								$elm$html$Html$div,
								A2(
									$elm$core$List$cons,
									$elm$html$Html$Attributes$class(clazz),
									A2($elm$core$List$map, attr2htmlattr, attrs)),
								A2($elm$core$List$map, $author$project$Views$viewNode, children));
						} else {
							break _v0$9;
						}
					case 'sup':
						return $elm$html$Html$text('');
					default:
						break _v0$9;
				}
			case 'Text':
				var string = n.a;
				return $elm$html$Html$text(string);
			default:
				return $elm$html$Html$text('');
		}
	}
	var tag = n.a;
	var attrlist = n.b;
	var children = n.c;
	return A3(
		$elm$html$Html$node,
		tag,
		A2($elm$core$List$map, attr2htmlattr, attrlist),
		A2($elm$core$List$map, $author$project$Views$viewNode, children));
};
var $author$project$Helpers$Down = {$: 'Down'};
var $author$project$Helpers$downarrow = function (size) {
	return A2($author$project$Helpers$arrow, $author$project$Helpers$Down, size);
};
var $elm$html$Html$i = _VirtualDom_node('i');
var $author$project$Views$viewPagePreviews = function (dests) {
	var resizedImg = function (img) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('previewImage')
				]),
			_List_fromArray(
				[img]));
	};
	var viewPagePreview = function (page) {
		return $author$project$Helpers$singleRow(
			A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				A2(
					$elm$core$List$map,
					$author$project$Helpers$singleRow,
					function () {
						if (page.$ === 'Loading') {
							var title = page.a;
							return _List_fromArray(
								[
									A2(
									$elm$html$Html$h5,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(title)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('spinner-border')
										]),
									_List_Nil)
								]);
						} else {
							var loadedPage = page.a;
							return _List_fromArray(
								[
									A2(
									$elm$html$Html$h5,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(loadedPage.title)
										])),
									resizedImg(
									A2(
										$elm$core$Maybe$withDefault,
										$elm$html$Html$text(''),
										A2(
											$elm$core$Maybe$map,
											function (url) {
												return A2(
													$elm$html$Html$img,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$src(url)
														]),
													_List_Nil);
											},
											loadedPage.image))),
									A2(
									$elm$html$Html$i,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(loadedPage.desc)
										]))
								]);
						}
					}())));
	};
	var header = A2(
		$elm$html$Html$h1,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text('The Destinations')
			]));
	var downArrowElement = $author$project$Helpers$singleRow(
		$author$project$Helpers$downarrow(5));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('container'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center')
			]),
		A2(
			$elm$core$List$cons,
			header,
			A2(
				$elm$core$List$intersperse,
				downArrowElement,
				A2($elm$core$List$map, viewPagePreview, dests))));
};
var $author$project$Helpers$Up = {$: 'Up'};
var $author$project$Helpers$uparrow = function (size) {
	return A2($author$project$Helpers$arrow, $author$project$Helpers$Up, size);
};
var $author$project$Views$viewPathVertical = F2(
	function (titles, dests) {
		var toText = function (title) {
			return A2($elm$core$List$member, title, dests) ? A2(
				$elm$html$Html$b,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(title)
					])) : $elm$html$Html$text(title);
		};
		var titleTexts = A2($elm$core$List$map, toText, titles);
		var withArrows = A2(
			$elm$core$List$intersperse,
			$author$project$Helpers$uparrow(2),
			titleTexts);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('container')
				]),
			A2($elm$core$List$map, $author$project$Helpers$singleRow, withArrows));
	});
var $author$project$Views$viewPeerLocs = function (peers) {
	var peerView = function (peer) {
		return $author$project$Helpers$singleRow(
			A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$b,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(peer.username)
							])),
						A2($elm$html$Html$br, _List_Nil, _List_Nil),
						$elm$html$Html$text(peer.lastDest)
					])));
	};
	var theView = A2(
		$elm$core$List$intersperse,
		A2($elm$html$Html$hr, _List_Nil, _List_Nil),
		A2($elm$core$List$map, peerView, peers));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('container')
			]),
		theView);
};
var $author$project$Model$ClickedJoinOrHost = function (a) {
	return {$: 'ClickedJoinOrHost', a: a};
};
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$small = _VirtualDom_node('small');
var $author$project$Views$backToMyPageLink = A2(
	$elm$html$Html$small,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('d-inline m-2'),
			A2($elm$html$Html$Attributes$style, 'float', 'right')
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('go back to '),
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('wikilink'),
					$elm$html$Html$Attributes$href('https://nicolaswinsten.github.io')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('my page')
				]))
		]));
var $author$project$Model$ChangeOptions = function (a) {
	return {$: 'ChangeOptions', a: a};
};
var $author$project$Model$changeJoinId = F2(
	function (options, id) {
		return $author$project$Model$ChangeOptions(
			_Utils_update(
				options,
				{joinId: id}));
	});
var $author$project$Model$changeNumDestinations = F2(
	function (options, num) {
		return $author$project$Model$ChangeOptions(
			_Utils_update(
				options,
				{
					numDestinations: A2(
						$elm$core$Maybe$withDefault,
						3,
						$elm$core$String$toInt(num))
				}));
	});
var $author$project$Model$changeSeed = F2(
	function (options, seedStr) {
		return $author$project$Model$ChangeOptions(
			_Utils_update(
				options,
				{seedStr: seedStr}));
	});
var $author$project$Model$changeUsername = F2(
	function (options, string) {
		return $author$project$Model$ChangeOptions(
			_Utils_update(
				options,
				{username: string}));
	});
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $author$project$Views$viewWelcome = function (options) {
	var notesSection = $author$project$Helpers$singleRow(
		A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('m-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h3,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Notes')
						])),
					A2(
					$elm$html$Html$ul,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('This game was built with Elm and PeerJS. '),
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('wikilink'),
											$elm$html$Html$Attributes$href('https://github.com/NicolasWinsten/racer')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('source code')
										]))
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('All feedback and complaints go to nicolasd DOT winsten AT gmail DOT com')
								]))
						]))
				])));
	var joinGameSection = A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Join')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('form-floating')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('joinid'),
								$elm$html$Html$Attributes$class('form-control'),
								$elm$html$Html$Attributes$placeholder('Join ID'),
								$elm$html$Html$Attributes$value(options.joinId),
								$elm$html$Html$Events$onInput(
								$author$project$Model$changeJoinId(options))
							]),
						_List_Nil),
						A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$for('joinid')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Join ID')
							]))
					])),
				A2($elm$html$Html$br, _List_Nil, _List_Nil),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						$author$project$Model$ClickedJoinOrHost(
							{isHost: false}))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Join Game')
					]))
			]));
	var formFloating = $elm$html$Html$div(
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('form-floating')
			]));
	var hostGameSection = A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Host')
					])),
				formFloating(
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('form-control'),
								$elm$html$Html$Attributes$id('seed'),
								$elm$html$Html$Attributes$placeholder('Game Seed'),
								$elm$html$Html$Attributes$value(options.seedStr),
								$elm$html$Html$Events$onInput(
								$author$project$Model$changeSeed(options))
							]),
						_List_Nil),
						A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$for('seed')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Game Seed')
							]))
					])),
				A2($elm$html$Html$br, _List_Nil, _List_Nil),
				formFloating(
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('form-select'),
								$elm$html$Html$Attributes$id('numDests'),
								$elm$html$Html$Attributes$type_('number'),
								$elm$html$Html$Attributes$value(
								$elm$core$String$fromInt(options.numDestinations)),
								$elm$html$Html$Attributes$min('2'),
								$elm$html$Html$Events$onInput(
								$author$project$Model$changeNumDestinations(options))
							]),
						_List_Nil),
						A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$for('numDests')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Number of destinations')
							]))
					])),
				A2($elm$html$Html$br, _List_Nil, _List_Nil),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						$author$project$Model$ClickedJoinOrHost(
							{isHost: true}))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Host Game')
					]))
			]));
	var usernameInput = A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('container')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('row')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h3,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Enter your username: ')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col-6')
							]),
						_List_fromArray(
							[
								formFloating(
								_List_fromArray(
									[
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$id('username'),
												$elm$html$Html$Attributes$class('form-control'),
												$elm$html$Html$Attributes$placeholder('username'),
												$elm$html$Html$Attributes$value(options.username),
												$elm$html$Html$Events$onInput(
												$author$project$Model$changeUsername(options))
											]),
										_List_Nil),
										A2(
										$elm$html$Html$label,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$for('username')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Your username')
											]))
									]))
							]))
					]))
			]));
	var descSection = $author$project$Helpers$singleRow(
		A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-2'),
							A2($elm$html$Html$Attributes$style, 'float', 'right'),
							$elm$html$Html$Attributes$src('assets/wikilogo.png'),
							$elm$html$Html$Attributes$width(300),
							$elm$html$Html$Attributes$alt('Wikipedia Game')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('\n                              The aim of the game is to race through wikipedia while hitting all the important pages in order.\n                              Enter your username and either host your own game or join a friend\'s.\n                              '),
							$author$project$Views$break(2),
							$elm$html$Html$text('\n                            To host your own game, pick a game seed (eg \'deadbeef\' or \'pq9 83&#$hfl\' or whatever you want) and specify the number of destinations you want in your game.\n                            '),
							$author$project$Views$break(2),
							$elm$html$Html$text('To join a game, paste in the Join ID given by the game\'s host'),
							$author$project$Views$break(2),
							$elm$html$Html$text('Once in the game, you must hit every destination in order to complete the game. Race your friends and see who is the fastest wikiracer'),
							$author$project$Views$break(2),
							$elm$html$Html$text('You can play alone just by hosting your own game and forgetting to invite your friends'),
							$author$project$Views$break(2),
							$elm$html$Html$text('It is also possible that you will run into issues connecting with your friends for a variety of reasons.\n                                If that\'s the case then you might just agree on a seed together and everyone host their own game.')
						]))
				])));
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$author$project$Views$backToMyPageLink,
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						$author$project$Helpers$singleRow(
						A2(
							$elm$html$Html$h1,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('peer-to-peer Wikipedia game')
								]))),
						descSection,
						A2($elm$html$Html$hr, _List_Nil, _List_Nil),
						$author$project$Helpers$singleRow(usernameInput),
						A2($elm$html$Html$hr, _List_Nil, _List_Nil),
						$author$project$Helpers$singleRow(
						A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('container')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('row')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('col')
												]),
											_List_fromArray(
												[hostGameSection])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('col')
												]),
											_List_fromArray(
												[joinGameSection]))
										]))
								]))),
						A2($elm$html$Html$hr, _List_Nil, _List_Nil),
						notesSection
					]))
			]));
};
var $author$project$Views$view = function (model) {
	var _v0 = model.window;
	switch (_v0.$) {
		case 'PreGame':
			return $author$project$Views$viewWelcome(model.options);
		case 'Preview':
			var refreshDisabled = _Utils_eq(model.seedChange, model.options.seedStr) && _Utils_eq(model.numDestsChange, model.options.numDestinations);
			var peersView = function () {
				var peerEl = function (peer) {
					return $author$project$Helpers$singleRow(
						A2(
							$elm$html$Html$b,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									peer.isHost ? ('Host: ' + peer.username) : ('' + peer.username))
								])));
				};
				var peerList = A2(
					$elm$core$List$map,
					peerEl,
					$elm$core$Dict$values(model.peers));
				return (!$elm$core$List$isEmpty(peerList)) ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('container border border-2 border-dark p-2')
						]),
					A2(
						$elm$core$List$cons,
						$author$project$Helpers$singleRow(
							A2(
								$elm$html$Html$h5,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Other players')
									]))),
						A2(
							$elm$core$List$cons,
							A2($elm$html$Html$hr, _List_Nil, _List_Nil),
							peerList))) : $elm$html$Html$text('');
			}();
			var copyIdBox = model.options.isHost ? A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('m-2')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Copy this game ID and send it to your friends:'),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('d-inline-block')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$id('hostid'),
										$elm$html$Html$Attributes$value(model.options.peerId),
										$elm$html$Html$Attributes$readonly(true)
									]),
								_List_Nil),
								A2(
								$elm$html$Html$button,
								A2(
									$elm$core$List$cons,
									$elm$html$Html$Attributes$class('clippybtn'),
									A2(
										$elm$core$List$cons,
										A2($elm$html$Html$Attributes$attribute, 'data-clipboard-target', '#hostid'),
										$author$project$Views$toolTipStyles('Copy to clipboard'))),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$img,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$src('assets/clippy.svg'),
												$elm$html$Html$Attributes$width(13)
											]),
										_List_Nil)
									]))
							]))
					])) : $elm$html$Html$text('');
			var allDestsLoaded = $author$project$Model$doneLoading(model.loadingDests);
			var _v1 = function () {
				var refreshBtn_ = function () {
					var changeSeed = function (str) {
						return $author$project$Model$ChangeOptsWhileInPreview(
							{numDests: model.numDestsChange, seed: str});
					};
					var changeNum = function (str) {
						return function (num) {
							return $author$project$Model$ChangeOptsWhileInPreview(
								{numDests: num, seed: model.seedChange});
						}(
							A2(
								$elm$core$Maybe$withDefault,
								model.numDestsChange,
								$elm$core$String$toInt(str)));
					};
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('container-fluid')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('input-group')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$id('num-dests'),
												$elm$html$Html$Attributes$class('form-control'),
												$elm$html$Html$Attributes$placeholder('num destinations'),
												$elm$html$Html$Attributes$type_('number'),
												$elm$html$Html$Attributes$value(
												$elm$core$String$fromInt(model.numDestsChange)),
												$elm$html$Html$Attributes$min('2'),
												$elm$html$Html$Events$onInput(changeNum)
											]),
										_List_Nil),
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$id('seed'),
												$elm$html$Html$Attributes$class('form-control'),
												$elm$html$Html$Attributes$placeholder('new game seed'),
												$elm$html$Html$Attributes$value(model.seedChange),
												$elm$html$Html$Events$onInput(changeSeed)
											]),
										_List_Nil),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$disabled(refreshDisabled),
												$elm$html$Html$Events$onClick($author$project$Model$Refresh)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Refresh')
											]))
									]))
							]));
				}();
				return (allDestsLoaded && model.options.isHost) ? _Utils_Tuple2(
					A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$Model$StartGame),
								$elm$html$Html$Attributes$class('m-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Start game')
							])),
					refreshBtn_) : (model.options.isHost ? _Utils_Tuple2(
					$elm$html$Html$text('Waiting for destinations to finish loading...'),
					refreshBtn_) : _Utils_Tuple2(
					$elm$html$Html$text('Waiting for host to start game...'),
					$elm$html$Html$text('')));
			}();
			var startBtn = _v1.a;
			var refreshOptions = _v1.b;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'center')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('row')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('col')
									]),
								_List_fromArray(
									[
										$author$project$Views$viewPagePreviews(model.loadingDests)
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('col mt-5')
									]),
								_List_fromArray(
									[copyIdBox, refreshOptions, startBtn, peersView]))
							]))
					]));
		case 'InPage':
			var page = _v0.a;
			var toHeader = function (dest) {
				return A2(
					$elm$html$Html$span,
					A2(
						$elm$core$List$cons,
						A2($elm$html$Html$Attributes$style, 'padding', '5px'),
						A2(
							$elm$core$List$cons,
							A2($elm$html$Html$Attributes$style, 'font-size', '1.1em'),
							$author$project$Views$toolTipStyles(dest.desc))),
					_List_fromArray(
						[
							$elm$html$Html$text(dest.title)
						]));
			};
			var titleAndDests = A2(
				$elm$core$List$cons,
				A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'inline')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(page.title)
						])),
				A2($elm$core$List$map, toHeader, model.gameState.remainingDests));
			var withPastDests = _Utils_ap(
				A2(
					$elm$core$List$map,
					toHeader,
					$elm$core$List$reverse(
						A3(
							$author$project$Helpers$popBy,
							function ($) {
								return $.title;
							},
							page,
							model.gameState.pastDests))),
				titleAndDests);
			var withArrows = A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('nav-item')
					]),
				A2(
					$elm$core$List$intersperse,
					$author$project$Helpers$rightarrow(2),
					withPastDests));
			var timeDisplay = function () {
				var timeInSec = (model.gameState.time / 100) | 0;
				return A2(
					$elm$html$Html$h3,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(timeInSec) + 's')
						]));
			}();
			var rightSideView = function () {
				if (!$elm$core$Dict$size(model.peers)) {
					var pathTitles = A2(
						$elm$core$List$map,
						function ($) {
							return $.title;
						},
						model.gameState.path);
					var destTitles = A2(
						$elm$core$List$map,
						function ($) {
							return $.title;
						},
						model.dests);
					return A2($author$project$Views$viewPathVertical, pathTitles, destTitles);
				} else {
					return $author$project$Views$viewPeerLocs(
						$elm$core$Dict$values(model.peers));
				}
			}();
			var goBackBtn = ($elm$core$List$length(model.gameState.path) > 1) ? A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('btn btn-outline-dark'),
						$elm$html$Html$Events$onClick($author$project$Model$GoBack)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Go Back')
					])) : $elm$html$Html$text('');
			var navbar = A3(
				$elm$html$Html$node,
				'nav',
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('navbar navbar-light border-bottom border-secondary border-3 fixed-top')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('container-fluid')
							]),
						_List_fromArray(
							[withArrows, timeDisplay, goBackBtn]))
					]));
			var giveUpBtn = A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('btn btn-outline-dark m-3'),
						$elm$html$Html$Events$onClick($author$project$Model$GiveUp)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Give Up')
					]));
			var dummyNavbar = A3(
				$elm$html$Html$node,
				'nav',
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('navbar invisible')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('container-fluid')
							]),
						_List_fromArray(
							[withArrows, timeDisplay, goBackBtn]))
					]));
			var bodyContainer = A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container-fluid pt-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('row')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('col-10')
									]),
								_List_fromArray(
									[
										$author$project$Views$viewNode(page.content)
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('col-2')
									]),
								_List_fromArray(
									[giveUpBtn, rightSideView]))
							]))
					]));
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[dummyNavbar, navbar, bodyContainer]));
		case 'Fetching':
			var title = _v0.a;
			return A2(
				$elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Fetching ' + (title + ' ...'))
					]));
		case 'Review':
			var playersToCompare = _v0.a;
			var you = {
				currentTitle: A2(
					$elm$core$Maybe$withDefault,
					'',
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.title;
						},
						$elm$core$List$head(model.gameState.path))),
				finished: true,
				isHost: model.options.isHost,
				lastDest: A2(
					$elm$core$Maybe$withDefault,
					'',
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.title;
						},
						$elm$core$List$head(model.gameState.pastDests))),
				path: A2(
					$elm$core$List$map,
					function ($) {
						return $.title;
					},
					model.gameState.path),
				time: model.gameState.time,
				username: model.options.username,
				uuid: model.options.uuid
			};
			var timeInSec = function (time) {
				return (time / 100) | 0;
			};
			var playerList = A2(
				$elm$core$List$cons,
				you,
				$elm$core$Dict$values(model.peers));
			var unfinishedPlayers = A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.finished;
					},
					$elm$core$Basics$not),
				playerList);
			var destTitles = A2(
				$elm$core$List$map,
				function ($) {
					return $.title;
				},
				model.dests);
			var gotToEnd = function (player) {
				return _Utils_eq(
					$elm$core$Maybe$Just(player.lastDest),
					$author$project$Helpers$last(destTitles));
			};
			var playersThatGaveUp = A2(
				$elm$core$List$filter,
				function (p) {
					return (!gotToEnd(p)) && p.finished;
				},
				playerList);
			var playersThatGotToEnd = A2($elm$core$List$filter, gotToEnd, playerList);
			var leaderboard = F3(
				function (header, f, toString) {
					var playerView = function (player) {
						var stat = gotToEnd(player) ? toString(
							f(player)) : 'DNF';
						var name = _Utils_eq(model.options.username, player.username) ? A2(
							$elm$html$Html$b,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(player.username)
								])) : $elm$html$Html$text(player.username);
						return A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('hoverUnderline'),
											$elm$html$Html$Attributes$href('#'),
											$elm$html$Html$Events$onClick(
											$author$project$Model$ToggleReviewPlayer(player.uuid))
										]),
									_List_fromArray(
										[name])),
									$elm$html$Html$text(' ' + stat)
								]));
					};
					var sortedPlayersView = A2(
						$elm$core$List$map,
						playerView,
						_Utils_ap(
							A2($elm$core$List$sortBy, f, playersThatGotToEnd),
							playersThatGaveUp));
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('container border border-dark border-2 bg-light m-3 p-2'),
								A2($elm$html$Html$Attributes$style, 'text-align', 'center')
							]),
						A2(
							$elm$core$List$map,
							$author$project$Helpers$singleRow,
							A2(
								$elm$core$List$cons,
								A2(
									$elm$html$Html$h3,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(header)
										])),
								A2(
									$elm$core$List$cons,
									A2($elm$html$Html$hr, _List_Nil, _List_Nil),
									sortedPlayersView))));
				});
			var lengthBoard = A3(
				leaderboard,
				'Path Length',
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.path;
					},
					$elm$core$List$length),
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Basics$add(-1),
					A2(
						$elm$core$Basics$composeR,
						$elm$core$String$fromInt,
						function (l) {
							return l + ' steps';
						})));
			var timeBoard = A3(
				leaderboard,
				'Time',
				function ($) {
					return $.time;
				},
				A2(
					$elm$core$Basics$composeR,
					timeInSec,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$String$fromInt,
						function (t) {
							return t + 's';
						})));
			var unfinishedPlayersView = function () {
				var viewPlayer = function (player) {
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col-3')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$b,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(player.username)
									])),
								A2($elm$html$Html$br, _List_Nil, _List_Nil),
								A2($author$project$Views$viewLink, destTitles, player.currentTitle)
							]));
				};
				return ($elm$core$List$length(unfinishedPlayers) > 0) ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('container-fluid mb-5')
						]),
					_List_fromArray(
						[
							$author$project$Helpers$singleRow(
							A2(
								$elm$html$Html$h3,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('unfinished players')
									]))),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('row')
								]),
							A2($elm$core$List$map, viewPlayer, unfinishedPlayers))
						])) : $elm$html$Html$text('');
			}();
			var comparePlayersView = function () {
				var viewPlayerSegment = function (_v2) {
					var username = _v2.a;
					var seg = _v2.b;
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('row mb-2')
							]),
						_List_fromArray(
							[
								$author$project$Helpers$singleRow(
								$author$project$Views$viewPath(
									{
										dests: destTitles,
										path: seg,
										showLength: true,
										username: $elm$core$Maybe$Just(username)
									}))
							]));
				};
				var players = A2(
					$elm$core$List$filter,
					function (p) {
						return A2($elm$core$List$member, p.uuid, playersToCompare);
					},
					playerList);
				var getPathSegments = function (player) {
					return A2(
						$elm$core$List$map,
						$elm$core$Tuple$pair(player.username),
						A2(
							$author$project$Helpers$threads,
							function (dest) {
								return A2($elm$core$List$member, dest, destTitles);
							},
							$elm$core$List$reverse(player.path)));
				};
				var playersSegments = $author$project$Helpers$transpose(
					A2($elm$core$List$map, getPathSegments, players));
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('container-fluid mb-5')
						]),
					A2(
						$elm$core$List$map,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$List$map(viewPlayerSegment),
							$elm$html$Html$div(
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('row mb-5')
									]))),
						playersSegments));
			}();
			var boardsView = A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('row')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('col')
									]),
								_List_fromArray(
									[timeBoard])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('col')
									]),
								_List_fromArray(
									[lengthBoard]))
							]))
					]));
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container-fluid')
					]),
				_List_fromArray(
					[
						boardsView,
						A2($elm$html$Html$hr, _List_Nil, _List_Nil),
						$author$project$Helpers$singleRow(
						$elm$html$Html$text('Click on a player\'s name to see their paths')),
						$author$project$Views$break(2),
						comparePlayersView,
						unfinishedPlayersView,
						A2($author$project$Views$viewBestSegments, playerList, destTitles),
						$author$project$Views$break(2),
						$author$project$Helpers$singleRow(
						model.options.isHost ? A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick($author$project$Model$ClickedNewGame)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('New Game')
								])) : $elm$html$Html$text('Waiting on host to make a new game...'))
					]));
		default:
			var msg = _v0.a;
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('There was a problem: '),
						$elm$html$Html$text(msg)
					]));
	}
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		init: function (_v0) {
			return _Utils_Tuple2($author$project$Main$initialModel, $author$project$Main$initCmd);
		},
		subscriptions: $author$project$Main$subscriptions,
		update: $author$project$Main$update,
		view: $author$project$Views$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));