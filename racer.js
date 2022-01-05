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




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


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

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
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

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
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


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
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
	if (region.an.W === region.av.W)
	{
		return 'on line ' + region.an.W;
	}
	return 'on lines ' + region.an.W + ' through ' + region.av.W;
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

	/**_UNUSED/
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

	/**/
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

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
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

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


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



/**_UNUSED/
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

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

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
		impl.bp,
		impl.bF,
		impl.bD,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
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


function _Platform_export(exports)
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


function _Platform_export_UNUSED(exports)
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

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
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

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
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
		C: func(record.C),
		ao: record.ao,
		ak: record.ak
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
		var message = !tag ? value : tag < 3 ? value.a : value.C;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.ao;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.ak) && event.preventDefault(),
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
		impl.bp,
		impl.bF,
		impl.bD,
		function(sendToApp, initialModel) {
			var view = impl.bI;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
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
		impl.bp,
		impl.bF,
		impl.bD,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.am && impl.am(sendToApp)
			var view = impl.bI;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.be);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.q) && (_VirtualDom_doc.title = title = doc.q);
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
	var onUrlChange = impl.bu;
	var onUrlRequest = impl.bv;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		am: function(sendToApp)
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
							&& curr.aT === next.aT
							&& curr.aD === next.aD
							&& curr.aM.a === next.aM.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		bp: function(flags)
		{
			return A3(impl.bp, flags, _Browser_getUrl(), key);
		},
		bI: impl.bI,
		bF: impl.bF,
		bD: impl.bD
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
		? { bn: 'hidden', bf: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { bn: 'mozHidden', bf: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { bn: 'msHidden', bf: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { bn: 'webkitHidden', bf: 'webkitvisibilitychange' }
		: { bn: 'hidden', bf: 'visibilitychange' };
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
		a$: _Browser_getScene(),
		a7: {
			a9: _Browser_window.pageXOffset,
			ba: _Browser_window.pageYOffset,
			a8: _Browser_doc.documentElement.clientWidth,
			aB: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		a8: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		aB: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			a$: {
				a8: node.scrollWidth,
				aB: node.scrollHeight
			},
			a7: {
				a9: node.scrollLeft,
				ba: node.scrollTop,
				a8: node.clientWidth,
				aB: node.clientHeight
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
			a$: _Browser_getScene(),
			a7: {
				a9: x,
				ba: y,
				a8: _Browser_doc.documentElement.clientWidth,
				aB: _Browser_doc.documentElement.clientHeight
			},
			bk: {
				a9: x + rect.left,
				ba: y + rect.top,
				a8: rect.width,
				aB: rect.height
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



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.bl.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.bl.b, xhr)); });
		$elm$core$Maybe$isJust(request.a5) && _Http_track(router, xhr, request.a5.a);

		try {
			xhr.open(request.br, request.bG, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.bG));
		}

		_Http_configureRequest(xhr, request);

		request.be.a && xhr.setRequestHeader('Content-Type', request.be.a);
		xhr.send(request.be.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.aA; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.bE.a || 0;
	xhr.responseType = request.bl.d;
	xhr.withCredentials = request.bc;
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
		bG: xhr.responseURL,
		bB: xhr.status,
		bC: xhr.statusText,
		aA: _Http_parseHeaders(xhr.getAllResponseHeaders())
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
			bz: event.loaded,
			a1: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			bx: event.loaded,
			a1: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
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
			if (t.$ === -2) {
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
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = 2;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
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
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
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
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
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
		return {$: 0, a: a, b: b, c: c, d: d};
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
	return {$: 1, a: a};
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
	return {$: 0, a: a};
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
		if (!builder.j) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.l),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.l);
		} else {
			var treeLen = builder.j * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.m) : builder.m;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.j);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.l) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.l);
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
					{m: nodeList, j: (len / $elm$core$Array$branchFactor) | 0, l: tail});
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
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
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
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {az: fragment, aD: host, t: path, aM: port_, aT: protocol, aU: query};
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
					if (_v1.$ === 1) {
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
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
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
		var task = _v0;
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
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Model$GotUUID = function (a) {
	return {$: 12, a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$random$Random$Generate = $elm$core$Basics$identity;
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
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
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0;
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
		var generator = _v0;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a;
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
var $elm$random$Random$Generator = $elm$core$Basics$identity;
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0;
		return function (seed0) {
			var _v1 = genA(seed0);
			var a = _v1.a;
			var seed1 = _v1.b;
			return _Utils_Tuple2(
				func(a),
				seed1);
		};
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0;
		return A2($elm$random$Random$map, func, generator);
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			A2($elm$random$Random$map, tagger, generator));
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
		return function (seed0) {
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
		};
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
var $author$project$Model$PreGame = {$: 2};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $author$project$Main$initialModel = function () {
	var options = {f: false, aa: '', I: 4, aj: '', M: '', bH: '', g: 0};
	var gameState = {z: _List_Nil, t: _List_Nil, L: _List_Nil, E: 0};
	return {x: _List_Nil, Q: false, n: gameState, R: _List_Nil, ah: 4, a: options, i: $elm$core$Dict$empty, S: '', h: $author$project$Model$PreGame};
}();
var $author$project$Model$PeerMsg = function (a) {
	return {$: 11, a: a};
};
var $author$project$Model$Tick = function (a) {
	return {$: 10, a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {aS: processes, a4: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
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
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
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
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
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
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
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
		if (_v1.$ === 1) {
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
			if (dict.$ === -2) {
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
		var processes = _v0.aS;
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
				$elm$core$Task$succeed(0)));
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
		var _v0 = A2($elm$core$Dict$get, interval, state.a4);
		if (_v0.$ === 1) {
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
	return {$: 11, a: a};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$PeerPort$Error = function (a) {
	return {$: 9, a: a};
};
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$PeerPort$errorDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$PeerPort$Error,
	A2($elm$json$Json$Decode$field, 'error', $elm$json$Json$Decode$string));
var $author$project$PeerPort$GameFinish = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
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
		return {$: 10, a: a, b: b};
	});
var $author$project$PeerPort$Info = F4(
	function (seed, numDestinations, peers, started) {
		return {I: numDestinations, i: peers, al: seed, bA: started};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$map4 = _Json_map4;
var $author$project$PeerPort$Peer = F5(
	function (uuid, username, isHost, lastDest, finished) {
		return {P: finished, f: isHost, H: lastDest, bH: username, g: uuid};
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
	return {$: 1, a: a};
};
var $author$project$PeerPort$gameStartDecoder = A2(
	$elm$json$Json$Decode$field,
	'start',
	A2(
		$elm$json$Json$Decode$map,
		$author$project$PeerPort$GameStart,
		A2($elm$json$Json$Decode$field, 'msg', $elm$json$Json$Decode$string)));
var $author$project$PeerPort$HostLost = function (a) {
	return {$: 6, a: a};
};
var $author$project$PeerPort$hostLostDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$PeerPort$HostLost,
	A2($elm$json$Json$Decode$field, 'hostLost', $elm$json$Json$Decode$string));
var $author$project$PeerPort$HostWantsNewGame = function (a) {
	return {$: 7, a: a};
};
var $author$project$PeerPort$hostWantsNewGame = A2(
	$elm$json$Json$Decode$map,
	$author$project$PeerPort$HostWantsNewGame,
	A2($elm$json$Json$Decode$field, 'newGame', $elm$json$Json$Decode$string));
var $author$project$PeerPort$PeerConnect = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $author$project$PeerPort$peerConnectDecoder = A2(
	$elm$json$Json$Decode$field,
	'peerConnect',
	A3($elm$json$Json$Decode$map2, $author$project$PeerPort$PeerConnect, $author$project$PeerPort$usernameDecoder, $author$project$PeerPort$uuidDecoder));
var $author$project$PeerPort$PeerDisconnect = function (a) {
	return {$: 5, a: a};
};
var $author$project$PeerPort$peerDisconnectDecoder = A2(
	$elm$json$Json$Decode$field,
	'peerDisconnect',
	A2($elm$json$Json$Decode$map, $author$project$PeerPort$PeerDisconnect, $author$project$PeerPort$uuidDecoder));
var $author$project$PeerPort$IdGenerated = function (a) {
	return {$: 8, a: a};
};
var $author$project$PeerPort$peerIdGenDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$PeerPort$IdGenerated,
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string));
var $author$project$PeerPort$SeedInfo = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
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
		return {$: 2, a: a, b: b};
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
		if (!res.$) {
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
		var _v0 = model.h;
		if (!_v0.$) {
			return A2($elm$time$Time$every, 10, $author$project$Model$Tick);
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
	return {$: 5, a: a};
};
var $author$project$Model$Fetching = function (a) {
	return {$: 1, a: a};
};
var $author$project$Model$InPage = function (a) {
	return {$: 0, a: a};
};
var $author$project$Model$Review = function (a) {
	return {$: 4, a: a};
};
var $author$project$Model$Loading = function (a) {
	return {$: 0, a: a};
};
var $author$project$Model$Preview = {$: 3};
var $author$project$Main$activateClippySignal = _Platform_outgoingPort('activateClippySignal', $elm$json$Json$Encode$string);
var $author$project$Main$activateClippy = $author$project$Main$activateClippySignal('This is a dummy value');
var $author$project$Main$activateTooltipsSignal = _Platform_outgoingPort('activateTooltipsSignal', $elm$json$Json$Encode$string);
var $author$project$Main$activateTooltips = $author$project$Main$activateTooltipsSignal('This is a dummy value');
var $author$project$Model$GotDescription = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $hecrj$html_parser$Html$Parser$Text = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Helpers$firstMaybe = F2(
	function (left, right) {
		if (left.$ === 1) {
			return right;
		} else {
			var justLeft = left;
			return justLeft;
		}
	});
var $author$project$PageFetch$extractShortDesc = function (node) {
	switch (node.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			if ((((((node.a === 'div') && node.b.b) && (node.b.a.a === 'class')) && node.c.b) && (!node.c.a.$)) && (!node.c.b.b)) {
				var _v1 = node.b;
				var _v2 = _v1.a;
				var clazz = _v2.b;
				var _v3 = node.c;
				var desc = _v3.a.a;
				return A2($elm$core$String$contains, 'shortdescription', clazz) ? $elm$core$Maybe$Just(desc) : $elm$core$Maybe$Nothing;
			} else {
				var children = node.c;
				return A3(
					$elm$core$List$foldr,
					$author$project$Helpers$firstMaybe,
					$elm$core$Maybe$Nothing,
					A2($elm$core$List$map, $author$project$PageFetch$extractShortDesc, children));
			}
		default:
			return $elm$core$Maybe$Nothing;
	}
};
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
var $author$project$Helpers$getClass = function (attrs) {
	getClass:
	while (true) {
		if (attrs.b) {
			var _v1 = attrs.a;
			var attrName = _v1.a;
			var value = _v1.b;
			var rest = attrs.b;
			if (attrName === 'class') {
				return $elm$core$Maybe$Just(value);
			} else {
				var $temp$attrs = rest;
				attrs = $temp$attrs;
				continue getClass;
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}
};
var $author$project$Helpers$grabByClass = F2(
	function (clazz, node) {
		switch (node.$) {
			case 0:
				return _List_Nil;
			case 1:
				var element = node;
				var attrs = element.b;
				var children = element.c;
				var rest = A2(
					$elm$core$List$concatMap,
					$author$project$Helpers$grabByClass(clazz),
					children);
				var _v1 = $author$project$Helpers$getClass(attrs);
				if (!_v1.$) {
					var classStr = _v1.a;
					return A2($elm$core$String$contains, clazz, classStr) ? A2($elm$core$List$cons, element, rest) : rest;
				} else {
					return rest;
				}
			default:
				return _List_Nil;
		}
	});
var $author$project$Helpers$grabElements = F2(
	function (tag, node) {
		switch (node.$) {
			case 0:
				return _List_Nil;
			case 1:
				var element = node;
				var nTag = element.a;
				var children = element.c;
				var rest = A2(
					$elm$core$List$concatMap,
					$author$project$Helpers$grabElements(tag),
					children);
				return _Utils_eq(tag, nTag) ? A2($elm$core$List$cons, element, rest) : rest;
			default:
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
var $author$project$PageFetch$grabImg = function (wikipage) {
	var imgs = A3(
		$elm$core$Basics$composeR,
		$author$project$Helpers$grabByClass('infobox'),
		$elm$core$List$concatMap(
			$author$project$Helpers$grabElements('img')),
		wikipage);
	return $elm$core$List$head(imgs);
};
var $hecrj$html_parser$Html$Parser$Element = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
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
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0;
	return function (s0) {
		var _v1 = parse(s0);
		if (_v1.$ === 1) {
			var x = _v1.b;
			return A2($elm$parser$Parser$Advanced$Bad, false, x);
		} else {
			var a = _v1.b;
			var s1 = _v1.c;
			return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
		}
	};
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $elm$parser$Parser$UnexpectedChar = {$: 11};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {as: col, bh: contextStack, aQ: problem, a_: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.a_, s.as, x, s.d));
	});
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.c, s.b);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{as: 1, d: s.d, e: s.e, c: s.c + 1, a_: s.a_ + 1, b: s.b}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{as: s.as + 1, d: s.d, e: s.e, c: newOffset, a_: s.a_, b: s.b}));
		};
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.b);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.c, offset) < 0,
					0,
					{as: col, d: s0.d, e: s0.e, c: offset, a_: row, b: s0.b});
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
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.c, s.a_, s.as, s);
	};
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
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
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $hecrj$html_parser$Html$Parser$chompOneOrMore = function (fn) {
	return A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$chompIf(fn),
		$elm$parser$Parser$chompWhile(fn));
};
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
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
						A3($elm$core$String$slice, s0.c, s1.c, s0.b),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $hecrj$html_parser$Html$Parser$isSpaceCharacter = function (c) {
	return (c === ' ') || ((c === '\t') || ((c === '\n') || ((c === '\u000D') || ((c === '\u000C') || (c === '\u00A0')))));
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$core$String$toLower = _String_toLower;
var $hecrj$html_parser$Html$Parser$closingTag = function (name) {
	var chompName = A2(
		$elm$parser$Parser$andThen,
		function (closingName) {
			return _Utils_eq(
				$elm$core$String$toLower(closingName),
				name) ? $elm$parser$Parser$succeed(0) : $elm$parser$Parser$problem('closing tag does not match opening tag: ' + name);
		},
		$elm$parser$Parser$getChompedString(
			$hecrj$html_parser$Html$Parser$chompOneOrMore(
				function (c) {
					return (!$hecrj$html_parser$Html$Parser$isSpaceCharacter(c)) && (c !== '>');
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
						$elm$core$Basics$eq('<')),
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq('/'))),
				chompName),
			$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter)),
		$elm$parser$Parser$chompIf(
			$elm$core$Basics$eq('>')));
};
var $hecrj$html_parser$Html$Parser$Comment = function (a) {
	return {$: 2, a: a};
};
var $elm$parser$Parser$Advanced$findSubString = _Parser_findSubString;
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
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$findSubString, str, s.c, s.a_, s.as, s.b);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A4($elm$parser$Parser$Advanced$fromInfo, newRow, newCol, expecting, s.d)) : A3(
			$elm$parser$Parser$Advanced$Good,
			_Utils_cmp(s.c, newOffset) < 0,
			0,
			{as: newCol, d: s.d, e: s.e, c: newOffset, a_: newRow, b: s.b});
	};
};
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
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
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.c, s.a_, s.as, s.b);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{as: newCol, d: s.d, e: s.e, c: newOffset, a_: newRow, b: s.b});
	};
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
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
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
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $hecrj$html_parser$Html$Parser$comment = A2($elm$parser$Parser$map, $hecrj$html_parser$Html$Parser$Comment, $hecrj$html_parser$Html$Parser$commentString);
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
	return {$: 1, a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0;
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (!step.$) {
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
		return function (s) {
			return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
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
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
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
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
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
	return (!$hecrj$html_parser$Html$Parser$isSpaceCharacter(c)) && ((c !== '\"') && ((c !== '\'') && ((c !== '>') && ((c !== '/') && (c !== '=')))));
};
var $hecrj$html_parser$Html$Parser$tagAttributeName = A2(
	$elm$parser$Parser$map,
	$elm$core$String$toLower,
	$elm$parser$Parser$getChompedString(
		$hecrj$html_parser$Html$Parser$chompOneOrMore($hecrj$html_parser$Html$Parser$isTagAttributeCharacter)));
var $hecrj$html_parser$Html$Parser$chompSemicolon = $elm$parser$Parser$chompIf(
	$elm$core$Basics$eq(';'));
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
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
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
				switch (_char) {
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
		if (!ra.$) {
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
		if (!result.$) {
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
		if (!_v0.$) {
			var value = _v0.a;
			return $elm$parser$Parser$succeed(value);
		} else {
			var error = _v0.a;
			return $elm$parser$Parser$problem(error);
		}
	},
	$elm$parser$Parser$getChompedString(
		$hecrj$html_parser$Html$Parser$chompOneOrMore($elm$core$Char$isHexDigit)));
var $elm$parser$Parser$ExpectingInt = {$: 1};
var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var $elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {as: s.as + (newOffset - s.c), d: s.d, e: s.e, c: newOffset, a_: s.a_, b: s.b};
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
		if (handler.$ === 1) {
			var x = handler.a;
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.c, startOffset) < 0,
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
		var floatOffset = A2($elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.b);
		if (floatOffset < 0) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A4($elm$parser$Parser$Advanced$fromInfo, s.a_, s.as - (floatOffset + s.c), invalid, s.d));
		} else {
			if (_Utils_eq(s.c, floatOffset)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5($elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.c, intPair, s);
				} else {
					if (floatSettings.$ === 1) {
						var x = floatSettings.a;
						return A2(
							$elm$parser$Parser$Advanced$Bad,
							true,
							A2($elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s.c, floatOffset, s.b));
						if (_v1.$ === 1) {
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
	return function (s) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 48, s.c, s.b)) {
			var zeroOffset = s.c + 1;
			var baseOffset = zeroOffset + 1;
			return A3($elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.b) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.bq,
				c.aC,
				baseOffset,
				A2($elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.b),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.b) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.bq,
				c.aK,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.b),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.b) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.bq,
				c.aq,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.b),
				s) : A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.bq,
				c.ax,
				c.aG,
				c.ay,
				_Utils_Tuple2(zeroOffset, 0),
				s)));
		} else {
			return A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.bq,
				c.ax,
				c.aG,
				c.ay,
				A3($elm$parser$Parser$Advanced$consumeBase, 10, s.c, s.b),
				s);
		}
	};
};
var $elm$parser$Parser$Advanced$int = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				aq: $elm$core$Result$Err(invalid),
				ax: expecting,
				ay: $elm$core$Result$Err(invalid),
				aC: $elm$core$Result$Err(invalid),
				aG: $elm$core$Result$Ok($elm$core$Basics$identity),
				bq: invalid,
				aK: $elm$core$Result$Err(invalid)
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
							return (c === 'x') || (c === 'X');
						})),
				$hecrj$html_parser$Html$Parser$hexadecimal),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$elm$parser$Parser$chompWhile(
						$elm$core$Basics$eq('0'))),
				$elm$parser$Parser$int)
			]));
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$chompIf(
				$elm$core$Basics$eq('#'))),
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
			$elm$core$Basics$eq('&'))),
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
		return (!_Utils_eq(c, quote)) && (c !== '&');
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
		return (!$hecrj$html_parser$Html$Parser$isSpaceCharacter(c)) && ((c !== '\"') && ((c !== '\'') && ((c !== '=') && ((c !== '<') && ((c !== '>') && ((c !== '`') && (c !== '&')))))));
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
						$elm$core$Basics$eq('='))),
				$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter)),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$hecrj$html_parser$Html$Parser$tagAttributeUnquotedValue,
						$hecrj$html_parser$Html$Parser$tagAttributeQuotedValue('\"'),
						$hecrj$html_parser$Html$Parser$tagAttributeQuotedValue('\'')
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
					return $elm$core$Char$isAlphaNum(c) || (c === '-');
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
							return (c !== '<') && (c !== '&');
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
								$elm$core$Basics$eq('/')),
								$elm$parser$Parser$succeed(0)
							]))),
				$elm$parser$Parser$chompIf(
					$elm$core$Basics$eq('>'))) : A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A2($hecrj$html_parser$Html$Parser$Element, name, attributes)),
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq('>'))),
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
						$elm$core$Basics$eq('<'))),
				A2(
					$elm$parser$Parser$ignorer,
					$hecrj$html_parser$Html$Parser$tagName,
					$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter))),
			$hecrj$html_parser$Html$Parser$tagAttributes));
}
var $hecrj$html_parser$Html$Parser$node = $hecrj$html_parser$Html$Parser$cyclic$node();
$hecrj$html_parser$Html$Parser$cyclic$node = function () {
	return $hecrj$html_parser$Html$Parser$node;
};
var $hecrj$html_parser$Html$Parser$element = $hecrj$html_parser$Html$Parser$cyclic$element();
$hecrj$html_parser$Html$Parser$cyclic$element = function () {
	return $hecrj$html_parser$Html$Parser$element;
};
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {as: col, aQ: problem, a_: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.a_, p.as, p.aQ);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
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
		var parse = _v0;
		var _v1 = parse(
			{as: 1, d: _List_Nil, e: 1, c: 0, a_: 1, b: src});
		if (!_v1.$) {
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
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $hecrj$html_parser$Html$Parser$run = function (str) {
	return $elm$core$String$isEmpty(str) ? $elm$core$Result$Ok(_List_Nil) : A2(
		$elm$parser$Parser$run,
		A2($hecrj$html_parser$Html$Parser$oneOrMore, 'node', $hecrj$html_parser$Html$Parser$node),
		str);
};
var $author$project$PageFetch$content = function (_v0) {
	var res = _v0;
	if (!res.$) {
		var page = res.a;
		return $elm$core$Result$Ok(
			function () {
				var _v2 = $hecrj$html_parser$Html$Parser$run(page.aE);
				if (!_v2.$) {
					var nodes = _v2.a;
					return {
						ac: A2(
							$elm$core$Maybe$withDefault,
							$hecrj$html_parser$Html$Parser$Text('Content couldn\'t be parsed. GO BACK'),
							$elm$core$List$head(nodes)),
						ad: A3(
							$elm$core$Basics$composeR,
							$elm$core$Maybe$andThen($author$project$PageFetch$extractShortDesc),
							$elm$core$Maybe$withDefault('No description found'),
							$elm$core$List$head(nodes)),
						af: A2(
							$elm$core$Maybe$andThen,
							$author$project$PageFetch$grabImg,
							$elm$core$List$head(nodes)),
						q: page.q
					};
				} else {
					return {
						ac: $hecrj$html_parser$Html$Parser$Text('This page isn\'t well formed. GO BACK'),
						ad: 'No description found',
						af: $elm$core$Maybe$Nothing,
						q: page.q
					};
				}
			}());
	} else {
		var error = res.a;
		return $elm$core$Result$Err(error);
	}
};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $author$project$PageFetch$FetchResult = $elm$core$Basics$identity;
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 2};
var $elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$Timeout_ = {$: 1};
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
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
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
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
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
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
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
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
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
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
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
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
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
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
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
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
				if (_v4.$ === -1) {
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
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
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
						if (_v7.$ === -1) {
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
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
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
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
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
	return {$: 4, a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$NetworkError = {$: 2};
var $elm$http$Http$Timeout = {$: 1};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 0:
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 1:
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 2:
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 3:
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.bB));
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
	return {$: 1, a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {aW: reqs, a3: subs};
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
				if (!cmd.$) {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 1) {
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
							var _v4 = req.a5;
							if (_v4.$ === 1) {
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
			A3($elm$http$Http$updateReqs, router, cmds, state.aW));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
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
					state.a3)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (!cmd.$) {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					bc: r.bc,
					be: r.be,
					bl: A2(_Http_mapExpect, func, r.bl),
					aA: r.aA,
					br: r.br,
					bE: r.bE,
					a5: r.a5,
					bG: r.bG
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
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
			{bc: false, be: r.be, bl: r.bl, aA: r.aA, br: r.br, bE: r.bE, a5: r.a5, bG: r.bG}));
};
var $elm$http$Http$get = function (r) {
	return $elm$http$Http$request(
		{be: $elm$http$Http$emptyBody, bl: r.bl, aA: _List_Nil, br: 'GET', bE: $elm$core$Maybe$Nothing, a5: $elm$core$Maybe$Nothing, bG: r.bG});
};
var $author$project$PageFetch$PageHtml = F2(
	function (title, html) {
		return {aE: html, q: title};
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
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$PageFetch$requestPage = function (title) {
	var fixedTitle = A3($elm$core$String$replace, '&', '%26', title);
	return $elm$http$Http$get(
		{
			bl: A2($elm$http$Http$expectJson, $elm$core$Basics$identity, $author$project$PageFetch$pageDecoder),
			bG: 'https://still-woodland-82497.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&prop=text&redirects=true&format=json&page=' + fixedTitle
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
			if (!_v0.$) {
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
					{m: nodeList, j: nodeListSize, l: jsArray});
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
		['BBC', 'Iron_Man', 'MS_Dhoni', 'American_Revolutionary_War', 'Joni_Mitchell', 'Sharmila_Tagore', 'Tom_Hanks', 'Colosseum', 'The_Sound_of_Music_(film)', 'Ali_al-Sistani', 'Aishwarya_Rai_Bachchan', 'Pizzagate_conspiracy_theory', 'Mila_Kunis', 'Pinterest', 'Kendrick_Lamar', 'Michael_Fassbender', 'Yao_Ming', 'San_Francisco', 'Lin-Manuel_Miranda', 'Tyler_Hoechlin', 'Eternal_Sunshine_of_the_Spotless_Mind', 'Seychelles', 'List_of_legendary_creatures_by_type', 'Stonehenge', 'Heath_Ledger', 'Taliban', 'Ben_Affleck', 'COVID-19_pandemic', 'Robin_Williams', 'Rani_of_Jhansi', 'A', 'Sundar_Pichai', 'Nymphomaniac_(film)', 'Inferno_(Dante)', 'Zinedine_Zidane', 'Westworld_(TV_series)', 'Greek_alphabet', 'Seinfeld', 'Benjamin_Franklin', 'Grateful_Dead', 'MacGuffin', 'Bill_Nighy', 'Aaron_Burr', 'Taarak_Mehta_Ka_Ooltah_Chashmah', 'Platypus', 'Marlon_Brando', 'Truman_Capote', 'Zodiac_(film)', 'Napoleon', 'NCAA_Division_I_Men\'s_Basketball_Tournament', 'Lists_of_deaths_by_year', 'List_of_the_verified_oldest_people', 'The_Chronicles_of_Narnia', 'Saddam_Hussein', 'Isabella_Rossellini', 'Paramount_Pictures', 'Pomodoro_Technique', 'Nicole_Scherzinger', 'Queen\'s_Gambit', 'Amphibia_(TV_series)', 'Jay-Jay_Okocha', 'Keira_Knightley', 'Beauty_and_the_Beast_(2017_film)', 'Armenia', 'Wonder_Woman_1984', 'Rosa_Parks', 'Prime_Minister_of_India', 'Euphoria_(American_TV_series)', 'Sridevi', 'Robert_E._Lee', 'Michael_Richards', 'Frida_Kahlo', 'The_Devil_Wears_Prada_(film)', 'Doctor_Strange', 'Kalman_filter', 'Uma_Thurman', 'Dune_(novel)', 'The_Strokes', 'Japanese_language', 'Pirates_of_the_Caribbean_(film_series)', 'Turkish_Radio_and_Television_Corporation', 'Toyota', 'Dax_Shepard', 'Mahatma_Gandhi', 'Toto_(band)', 'Jimmy_Page', 'Salman_of_Saudi_Arabia', 'Fluvoxamine', 'Afghanistan', 'Gavin_Newsom', 'Independence_Day_(1996_film)', 'Wikipedia', 'Catherine_the_Great', 'Brooklyn', 'Lovecraft_Country_(TV_series)', 'Kevin_Bacon', 'Aristotle', 'Paul_Thomas_Anderson', 'Vincent_Cassel', 'Wonders_of_the_World', 'Kepler\'s_Supernova', 'Gene_Hackman', 'Jon_Bon_Jovi', 'British_Raj', 'Sol_Invictus', 'Communist_Party_of_India_(Marxist)', 'Adam_Curtis', 'George_Orwell', 'Tom_Hiddleston', 'Asia_Cup', 'Melatonin', 'The_Wachowskis', 'Chiang_Kai-shek', 'English_Wikipedia', 'Six-Day_War', 'Zooey_Deschanel', 'Jenny_McCarthy', 'Arvydas_Sabonis', 'Zach_Braff', 'Mongolia', 'Morocco', 'Vatican_City', 'Jane_Lynch', 'David_Thewlis', 'Microsoft', 'James_Woods', 'Marvel_Studios', 'Diana_Rigg', 'Brian_Dennehy', 'Montana', 'England_national_football_team', 'Kiss_(band)', 'Hema_Malini', 'Kentucky', 'Erwin_Rommel', 'Mary_of_Teck', 'Ghana', 'Anne_Boleyn', 'The_Blair_Witch_Project', 'The_39_Steps_(1935_film)', 'Knights_Templar', 'Maldives', 'Adolf_Hitler', 'Rod_Stewart', 'Prince_Edward,_Earl_of_Wessex', 'Brooklyn_Nine-Nine', 'The_Rumble_in_the_Jungle', 'Senate_of_Pakistan', 'Delphi_method', 'Rudolf_Hess', 'Wallis_Simpson', 'Joker_(2019_film)', 'List_of_programs_broadcast_by_Cartoon_Network', 'Superbad_(film)', 'Seventh-day_Adventist_Church', 'Martin_Luther_King_Jr.', 'Shingles', 'Ted_Kaczynski', 'Tallulah_Bankhead', 'Srinivasa_Ramanujan', 'Serial_killer', 'Ewan_McGregor', 'Colin_Firth', 'BMW', 'List_of_most-followed_Instagram_accounts', 'Batman_in_film', 'Jordana_Brewster', 'Steve_Buscemi', 'Andy_Serkis', 'R.E.M.', 'Mickey_Rooney', 'Tim_Wu', 'Better_Call_Saul', 'Indian_Rebellion_of_1857', 'Madonna', 'Mario_Draghi', 'Christopher_Walken', 'List_of_animal_sounds', 'Norah_Jones', 'The_Matrix', 'Plantar_fasciitis', 'King_Arthur', 'Lesley-Anne_Down', 'Education', 'Adrien_Brody', 'Guns_N\'_Roses', 'Krakatoa', 'Strade_Bianche', 'Chaldean_Catholic_Church', 'Samurai', 'Adam_Lambert', 'Adrenochrome', 'Ambergris', '2020–21_Premier_League', 'Pawn_Stars', 'EBay', 'Charlemagne', 'East_Germany', 'Daft_Punk', 'West_Bengal', 'Sia_(musician)', 'Cancel_culture', 'Mein_Kampf', 'Chaka_Khan', 'Hirohito', 'The_Great_British_Bake_Off', 'State_of_the_Union', 'List_of_current_United_States_governors', 'Lee_Harvey_Oswald', 'Elle_Fanning', 'Jimi_Hendrix', 'Jeffrey_Epstein', 'Floyd_Mayweather_Jr.', 'Gaslighting', 'Celine_Dion', 'Steak_and_Blowjob_Day', 'Great_Famine_(Ireland)', 'Priyanka_Chopra', 'Indian_Army', 'Cerebral_palsy', 'Salman_Khan', 'Nintendo_Switch', 'Neon_Genesis_Evangelion', 'Julia_Roberts', 'Ten_Commandments', 'Bong_Joon-ho', 'The_Orville', 'Parasite_(2019_film)', 'Roman_Polanski', 'George_VI', 'The_Americans', 'Patrice_O\'Neal', 'Gautama_Buddha', 'XY_sex-determination_system', 'Burt_Lancaster', 'Entertainment', 'Michael_Caine', 'Stoat', 'Sandra_Bullock', 'Illuminati', 'Darren_Aronofsky', '2021_storming_of_the_United_States_Capitol', 'Sarah_Michelle_Gellar', 'Martin_Luther', 'Bharatiya_Janata_Party', 'Ethanol', 'Tom_Jones_(singer)', 'Transgender', 'QAnon', 'Bobby_Fischer', 'Robert_Lewandowski', 'List_of_hobbies', 'Diana,_Princess_of_Wales', 'Oliver_Hardy', 'Toruń', 'Bucky_Barnes', 'Christopher_Reeve', 'Historical_rankings_of_presidents_of_the_United_States', 'Reservoir_Dogs', 'George_V', 'BTS', 'Art', 'Dustin_Hoffman', 'Armenian_genocide', 'Robert_F._Kennedy_Jr.', 'Die_Another_Day', 'KFC', 'Yoko_Ono', 'Sweden', 'Mesopotamia', 'FC_Barcelona', 'Subhas_Chandra_Bose', 'Big_Five_personality_traits', 'The_Lion_King', 'Vladimir_Putin', 'Fleetwood_Mac', 'HMS_Terror_(1813)', 'Aunt_Jemima', 'Anal_sex', 'Julie_Christie', 'George_IV', 'Gazprom', 'Seven_deadly_sins', 'Rheal_Cormier', 'Led_Zeppelin', 'Anders_Behring_Breivik', 'Renaissance', 'Ellen_DeGeneres', 'Shutter_Island_(film)', 'COINTELPRO', 'The_Truman_Show', 'Great_Depression', 'Kate_Bush', 'Charles_Barkley', 'Green_Day', 'Dr._Seuss', 'Walt_Disney', 'Pope_Benedict_XVI', '1958_Lituya_Bay_earthquake_and_megatsunami', 'Joss_Whedon', 'List_of_cities_in_the_United_Kingdom', 'George_S._Patton', 'The_Last_of_Us', 'Sinaloa_Cartel', 'Absinthe', 'Britney_Spears', 'SpaceX_Starship', 'Godzilla', 'Kardashian_family', '117th_United_States_Congress', 'Army_ranks_and_insignia_of_India', 'PewDiePie', 'Union_Council_of_Ministers', 'Python_(programming_language)', 'Birthstone', 'Yoga', 'Jim_Croce', 'WhatsApp', 'A.C._Milan', 'Astrological_sign', 'Gujarat', 'Skid_Row,_Los_Angeles', 'Ellie_Kemper', 'COVID-19_pandemic_in_the_United_States', 'Ted_Bundy', 'Arrow_(TV_series)', 'Walter_Cronkite', 'James,_Viscount_Severn', 'Woody_Allen', 'Hank_Williams', 'Hassanal_Bolkiah', 'Oxford–AstraZeneca_COVID-19_vaccine', 'Aquarius_(astrology)', 'Gene_Kelly', 'Steven_Gerrard', 'Henry_Cavill', 'Bhutan', 'World_War_II', 'Sean_Penn', 'Burt_Reynolds', 'Denial-of-service_attack', 'Raiders_of_the_Lost_Ark', 'Library_Genesis', 'Dexter_(TV_series)', 'Abdication_of_Edward_VIII', 'The_Expanse_(TV_series)', 'Dolly_Parton', 'Baby_boomers', 'Sharon_Stone', 'Saladin', 'Utah', 'The_Shape_of_Water', 'Greece', 'Cali_Cartel', 'Joan_of_Arc', 'Deaths_in_2021', 'Shia_Islam', 'Computer', 'Aleister_Crowley', 'Con_Air', 'Jesse_James_(entrepreneur)', 'Boxer_Rebellion', 'Endeavour_(TV_series)', 'Air_pollution', 'MacOS', 'Aamir_Khan', 'Mark_Wahlberg', 'List_of_poker_hands', 'Edinson_Cavani', 'Volkswagen', 'Marvel_Comics', 'Kane_Tanaka', 'National_Assembly_of_Pakistan', 'Luis_Suárez', 'Aries_(astrology)', 'Thurgood_Marshall', 'Alan_Tudyk', 'Dave_Allen_(comedian)', 'Maharashtra', 'Bing_Crosby', 'J._K._Rowling', 'Sean_Combs', 'Croatia', 'HIV/AIDS', 'Jojo_Rabbit', 'Carl_Jung', 'The_Oprah_Winfrey_Show', 'John_Mulaney', 'David_Duchovny', 'Colin_Farrell', 'Richard_I_of_England', 'List_of_political_parties_in_India', 'Irish_Republican_Army', 'Tamil_Nadu_Legislative_Assembly', 'Ketamine', 'Slender_Man', 'Operating_system', 'Adderall', 'German_Shepherd', 'Les_Misérables', 'Red_Hot_Chili_Peppers', 'John_Brown_(abolitionist)', 'Will_Poulter', 'Mindy_Kaling', 'Prince_Harry,_Duke_of_Sussex', 'Circulatory_system', 'European_Union', 'Resident_Evil', 'Solomon', 'Streisand_effect', 'AstraZeneca', '1968_United_States_presidential_election', 'David_Lloyd_George', 'Rodney_King', 'Shang-Chi', 'Daniel_Craig', 'Sean_Bean', 'Queer', 'Stephen_Curry', 'Wes_Anderson', 'Ottoman_Empire', 'Katherine_Waterston', 'Kazuo_Ishiguro', 'Grant_Imahara', 'Five_Families', 'Peter_Sellers', 'Ben_Kingsley', 'Albania', 'U.S._state', 'Yom_Kippur_War', 'Twin_Peaks', 'Happy_Birthday_to_You', 'Ed_Harris', 'New_Girl', 'Grammy_Award', 'Doris_Day', 'Rabindranath_Tagore', 'List_of_islands_of_Greece', '69_(sex_position)', 'CBS', 'Qatar', 'BoJack_Horseman', 'Silver_Linings_Playbook', 'Coup_d\'état', 'Serbia', 'The_Monkees', 'Cholangiocarcinoma', 'Leprechaun', 'Glee_(TV_series)', 'Polyethylene_glycol', 'Blackbeard', 'William_Randolph_Hearst', 'Richard_Attenborough', 'Albert,_Prince_Consort', 'Weather', 'Manny_Pacquiao', 'Barbados', 'George_Chakiris', 'Malcolm_X', 'Wiki', 'Tim_Burton', 'Aspire_(TV_network)', 'The_Chronicles_of_Narnia_(film_series)', 'Black_Eyed_Peas', 'Jason_Sudeikis', 'Władysław_Szpilman', 'Superman', 'Naomi_Scott', 'Lincoln_(film)', 'Blade_(film)', 'Hong_Kong', 'Aretha_Franklin', 'Scarface_(1983_film)', 'Cynthia_Gibb', 'Jenna_Dewan', 'Ludwig_van_Beethoven', 'Lion', '2021_Myanmar_protests', 'Mohammed_bin_Rashid_Al_Maktoum', 'March_6', 'March_7', 'Todd_Rundgren', 'Angels_&_Demons_(film)', 'Alibaba_Group', 'March_8', 'March_9', 'Alex_Ferguson', 'Sonic_the_Hedgehog_(film)', 'Francis_Ford_Coppola', 'Dr._Stone', 'Scooby-Doo_(film)', 'Sex_position', 'BlacKkKlansman', 'Maryland', 'Frozen_II', 'Rajya_Sabha', 'Les_Dawson', 'CARES_Act', 'Sex', 'Bible', 'No_Country_for_Old_Men_(film)', 'Romani_people', 'Mumbai', 'Tiger', 'Zayn_Malik', 'The_Beach_Boys', 'Deadpool_2', 'Wentworth_Miller', 'The_Undertaker', 'Monosodium_glutamate', 'Lilith', 'Rick_Astley', 'Dawn_Wells', 'Elizabeth_II', 'Patton_Oswalt', 'List_of_ongoing_armed_conflicts', 'Trent_Reznor', 'Amelia_Earhart', 'Heart_(band)', 'Jackie_Chan', 'Sci-Hub', 'Burger_King', 'Richard_Simmons', 'Star_Wars_(film)', 'Battle_of_the_Alamo', 'Serena_Williams', 'Debbie_Reynolds', 'Ruth_Bader_Ginsburg', 'André_Previn', 'Charli_D\'Amelio', 'Battle_of_Waterloo', 'Keith_Richards', 'Jennifer_Connelly', 'Penicillin', 'Rob_Zombie', 'Anni-Frid_Lyngstad', 'Interstellar_(film)', 'New_York_(state)', 'Shah_Rukh_Khan', 'Survivor_(American_TV_series)', 'Peter_the_Great', 'Berlin_Wall', 'Nestlé', 'Kevin_Spacey', 'Judd_Apatow', 'Dakota_Fanning', 'Seal_(musician)', 'Kunal_Nayyar', 'Linux', 'Jeff_Goldblum', 'Normal_distribution', 'Mos_Def', 'Black_Mirror', 'Cristiano_Ronaldo', 'Lady_Jane_Grey', 'Kobe_Bryant', 'Atlético_Madrid', 'Christina_Aguilera', 'Bill_Burr', 'Benito_Mussolini', 'DreamWorks_Animation', 'Real_Madrid_CF', 'Ned_Kelly', 'Rottweiler', 'Democratic_Party_(United_States)', 'Jessica_Alba', 'Sunderland_A.F.C.', 'And_Then_There_Were_None', 'Steve_Harvey', 'Ted_Cruz', 'Aliens_(film)', 'Psycho_(1960_film)', 'Tencent', 'Stanley_Kubrick', 'Eton_College', 'Catherine_de\'_Medici', 'Harrison_Ford', 'Orson_Welles', 'Battle_of_Los_Angeles', 'Conservative_Party_(UK)', 'The_Challenge_(TV_series)', 'Daniel_Bryan', 'Jonestown', 'Bruce_Lee', 'List_of_most-played_video_games_by_player_count', 'J._R._R._Tolkien', 'United_Airlines_Flight_93', 'Hakeem_Olajuwon', 'Governor_of_New_York', 'Ted_Kennedy', 'Allen_Iverson', 'David_(Michelangelo)', 'Angela_Davis', 'Florida', 'List_of_most-subscribed_YouTube_channels', 'Rajasthan', 'Canada', 'Michelle_Trachtenberg', 'State_Bank_of_India', 'Rosetta_Stone', 'Ariana_Grande', 'The_Carpenters', 'Genesis_(band)', 'Sanremo_Music_Festival', 'Laverne_Cox', 'Edith_Pretty', 'Cindy_Crawford', 'The_Masked_Singer_(American_TV_series)', 'Pitaya', 'Forrest_Gump', 'Justin_Hartley', 'Josef_Mengele', 'Karnataka', 'Abdullah_of_Pahang', 'Bebe_Rexha', 'Spike_Lee', 'Pixar', 'Logan_Lerman', 'List_of_elected_and_appointed_female_heads_of_state_and_government', '2019_Indian_general_election', 'Baywatch', 'Spain', 'Korean_drama', 'James_Taylor', 'Marilyn_Monroe', 'Erin_Brockovich', 'Big_Little_Lies_(TV_series)', 'Ray_Kroc', 'Sherlock_Holmes', 'Maha_Shivaratri', 'Wernher_von_Braun', 'Princess_Beatrice', 'Bashar_al-Assad', 'Eva_Braun', 'Jordan_Peterson', 'International_Monetary_Fund', 'Cary_Elwes', 'Maslow\'s_hierarchy_of_needs', 'J._Robert_Oppenheimer', 'Chris_Brown', 'Salamander_letter', 'Gianni_Versace', 'List_of_NBA_All-Stars', 'Inter_Milan', 'Southeast_Asia', 'Dassault_Rafale', 'Borderline_personality_disorder', 'Depeche_Mode', 'Samsung', 'Letterkenny_(TV_series)', 'Taj_Mahal', 'Will_Arnett', 'Don_Quixote', 'Buffy_the_Vampire_Slayer', 'Jallianwala_Bagh_massacre', 'Andrew_Johnson', 'All_India_Trinamool_Congress', 'Mad_Max', 'Godzilla_(franchise)', 'Al-Qaeda', 'Vince_McMahon', 'The_Holocaust', 'Border_Collie', 'Edward_Snowden', 'Richard_Feynman', 'Alyson_Hannigan', 'Whoopi_Goldberg', 'Lithuania', 'Chernobyl', 'Rule_34', 'List_of_films_considered_the_worst', 'Fritzl_case', 'List_of_most-followed_TikTok_accounts', 'Damian_Lewis', 'Shahid_Khan', 'Greta_Thunberg', 'Tom_Brady', 'Predator_(film)', 'Huey_P._Newton', 'Animal_Farm', 'Star_Wars:_Episode_I_–_The_Phantom_Menace', 'Pete_Davidson', 'Morse_code', 'Norway', 'Sigourney_Weaver', 'Chris_Hemsworth', 'Eternals_(comics)', 'Dogecoin', 'Ronnie_James_Dio', 'Israeli–Palestinian_conflict', 'Fred_Armisen', 'Jim_Jones', 'Henry_V_of_England', 'Sean_Connery', 'History', 'George_I_of_Greece', 'Anthony_Fauci', 'Madam_C._J._Walker', '14th_Dalai_Lama', 'Malala_Yousafzai', 'Peter_Tosh', 'Germany_national_football_team', 'Tata_Group', 'Iliad', 'Frank_Abagnale', 'ER_(TV_series)', 'Argentina', 'Belize', 'Kalpana_Chawla', 'Sun', 'Olivia_de_Havilland', 'Argo_(2012_film)', 'Alphabet_Inc.', 'The_Rolling_Stones', 'Walt_Disney_Animation_Studios', 'AC/DC', 'Abraham', 'Brian_Wilson', 'Christopher_Hitchens', 'Kylian_Mbappé', 'Suicide', 'In_Cold_Blood', 'Titanic', 'Call_of_Duty', 'Vikings', 'Mad_Men', 'Osman_I', 'Warwick_Davis', 'James_Spader', 'Taylor_Swift', 'Jurassic_Park_(film)', 'Harold_Wilson', 'Hawaii', 'Anastasia_(1997_film)', 'Date_Masamune', 'Metallica', 'Stoicism', 'Azerbaijan', 'PepsiCo', 'Tony_Hendra', 'Dolph_Lundgren', 'Snooker', 'Drake_(musician)', 'Abraham_Lincoln', '4K_resolution', 'Australia', 'Die_Hard', 'Michael_Crichton', 'Prime_Video', 'Queen_Latifah', 'Iceland', 'Selma_to_Montgomery_marches', 'Winston_Churchill', 'UEFA_Champions_League', 'States_and_union_territories_of_India', 'List_of_countries_and_dependencies_by_population_density', 'Lavrentiy_Beria', 'Camila_Cabello', 'Henry_Stuart,_Lord_Darnley', 'Wedding_anniversary', '5G', 'Special_Air_Service', 'Gary_Oldman', 'Seven_Wonders_of_the_Ancient_World', 'Fallingwater', 'Hiragana', 'Yin_and_yang', 'Bo_Burnham', 'China', 'Georgy_Malenkov', 'Sara_Ali_Khan', 'Calvin_Coolidge', 'Pride_and_Prejudice', 'Democratic_Republic_of_the_Congo', 'Miracle_on_Ice', 'Monty_Python', 'The_Mummy_(1999_film)', 'Mark_Cuban', 'Philippines', 'The_Expanse_(novel_series)', 'Alexander_the_Great', 'Richard_Nixon', 'Gwen_Stefani', 'Gangs_of_New_York', 'Bill_Paxton', 'Aircraft_carrier', 'How_to_Get_Away_with_Murder', 'Pelé', 'Battle_of_Thermopylae', 'The_Temptations', 'The_Dark_Knight_(film)', 'Hugh_Grant', 'Bob_Barker', 'Thierry_Henry', 'Rita_Ora', 'Salem_witch_trials', 'Iran', 'Erykah_Badu', 'Iraq', 'Jane_Goodall', 'Margaret_Guido', 'Rajiv_Gandhi', 'Nepal', 'Binomial_distribution', 'There\'s_Something_About_Mary', 'Peter_III_of_Russia', 'Adam_Levine', '2026_FIFA_World_Cup', 'Karl_Marx', 'Neil_Gaiman', 'Romeo_and_Juliet', 'Robert_Redford', 'The_Pianist_(2002_film)', 'Eeny,_meeny,_miny,_moe', 'Moses', 'Jerry_Seinfeld', 'Twilight_(2008_film)', 'Fibonacci_number', 'Belgium', 'Prince_Andrew,_Duke_of_York', 'Robert_F._Kennedy', 'Hotstar', 'Mohamed_Al-Fayed', 'Shakira', 'Carrie-Anne_Moss', 'Nineteen_Eighty-Four', 'Socialism', 'Katey_Sagal', 'Kim\'s_Convenience', 'Operation_Paperclip', 'Æthelstan', 'Justin_Bieber', 'Desi_Arnaz', '2021_in_video_games', 'Czech_Republic', 'List_of_ethnic_slurs', 'Sigmund_Freud', 'Anurag_Kashyap', 'Trailer_Park_Boys', 'QR_code', 'Michael_Gambon', 'Elsa_Pataky', 'Cock_and_ball_torture', 'WandaVision', 'Memphis_Pyramid', 'P._T._Barnum', 'Asperger_syndrome', 'Emperor_of_Japan', 'Natalie_Portman', 'Ronald_Reagan', 'Mike_Pence', 'Ballon_d\'Or', 'Elon_Musk', 'Linkin_Park', 'Louis_III_of_France', 'Spider-Man_(2002_film)', 'Roger_Federer', 'List_of_epidemics', 'Stephen_Hawking', 'Eagles_(band)', 'Golden_State_Warriors', 'Cisgender', 'Davy_Crockett', 'Cystic_fibrosis', 'Community_(TV_series)', 'The_Silence_of_the_Lambs_(film)', 'IPad', 'Anne,_Queen_of_Great_Britain', 'Endometriosis', 'Smallville', 'Margaret_Tudor', 'Senegal', 'Greta_Scacchi', 'Cat', 'The_Go-Go\'s', 'Peter_O\'Toole', 'Bryce_Dallas_Howard', 'Daniel_Radcliffe', 'J._D._Salinger', 'Gini_coefficient', 'Oxycodone', 'The_Favourite', 'Science', '1883_eruption_of_Krakatoa', 'The_Scream', 'Charlie_Sheen', 'Joe_Biden_sexual_assault_allegation', 'Song_of_the_South', 'James_Madison', 'Cher', 'Luc_Besson', 'Audrey_Hepburn', 'The_Little_Mermaid_(1989_film)', 'Aileen_Wuornos', 'Fata_Morgana_(mirage)', 'Corruption_Perceptions_Index', 'Robert_Wadlow', 'Stanford_prison_experiment', 'The_Miz', 'Guillermo_del_Toro', 'Dick_Cheney', 'Anunnaki', 'Petra', 'Christian_Slater', 'Jehovah\'s_Witnesses', 'Paris_Hilton', 'Bruno_Mars', 'Djimon_Hounsou', 'Power_Rangers', 'Man_of_Steel_(film)', 'Hurrem_Sultan', 'Michael_Keaton', 'The_Who', 'Muhammad_Ali', 'J._J._Abrams', 'Kate_Moss', 'List_of_dates_for_Easter', 'Nuremberg_trials', 'HTTP_cookie', 'Mary_Magdalene', 'J-Hope', 'Great_Pyramid_of_Giza', 'Prince_(musician)', 'Me_Too_movement', 'Women\'s_poll_tax_repeal_movement', 'Wladimir_Klitschko', 'Roman_Empire', 'Peter_Fonda', 'Finland', 'Roger_Ebert', 'Ingrid_Bergman', 'Crystal_Palace_F.C.', 'Foo_Fighters', 'Raspberry_Pi', '2020_Nagorno-Karabakh_war', 'Michael_Sheen', 'Steve_Martin', '2020_Formula_One_World_Championship', 'The_Walking_Dead_(TV_series)', 'John_Wick', 'World_Trade_Organization', 'British_prince', 'Ice_Age_(franchise)', 'Sister_Wives', 'Robert_Downey_Jr.', 'Hans_Zimmer', 'Michigan', 'Anupam_Kher', 'List_of_pornographic_performers_by_decade', 'Bobby_Seale', 'The_Blue_Lagoon_(1980_film)', 'Christopher_Nolan', 'Nirvana_(band)', 'Pfizer–BioNTech_COVID-19_vaccine', 'Gemini_(astrology)', 'Cyprus', 'Alan_Alda', 'Sri_Lanka', 'The_World_to_Come', 'Dark_web', 'Nation_of_Islam', 'Naruhito', 'Pollution', 'Tokyo', 'Cory_Booker', 'Brazil', 'Elizabeth_Schuyler_Hamilton', 'The_Fifth_Element', 'The_Prestige_(film)', 'Geri_Halliwell', 'Battle_of_Midway', 'Shirley_MacLaine', 'Angela_Merkel', 'Schutzstaffel', 'Sinéad_O\'Connor', 'Sam_Rockwell', 'Microsoft_Word', 'True_Detective', 'How_to_Train_Your_Dragon_(film)', 'Holi', 'Normandy_landings', 'Spirograph', 'Julius_Hoffman', 'George_C._Scott', 'List_of_UFC_champions', 'Non-binary_gender', 'Patrick_Stewart', 'George_II_of_Great_Britain', 'Soul_(2020_film)', 'Hamilton_(musical)', 'Michelle_Yeoh', 'National_Basketball_Association', 'Rain_Man', 'Riverdale_(2017_TV_series)', 'Pisces_(astrology)', 'Asia', 'Helen_Keller', 'DNA', 'Republic_of_Ireland', 'Mars_2020', 'Jimmy_Carter', 'Mads_Mikkelsen', 'RM_(rapper)', 'Apocalypse_Now', 'Pink_Floyd', 'David_Attenborough', 'Eddie_Van_Halen', 'Magic_Johnson', 'Debbie_Harry', 'Orlando_Bloom', 'Guardians_of_the_Galaxy_(film)', 'Lennox_Lewis', 'Spotlight_(film)', 'Wedding_of_Prince_Harry_and_Meghan_Markle', 'The_Hunger_Games', 'Bob_Marley', 'The_Beatles', 'Dune_(2021_film)', 'Brigham_Young', 'Miguel_Ángel_Félix_Gallardo', 'List_of_countries_by_suicide_rate', 'List_of_United_States_cities_by_population', 'Adam_and_Eve', 'Jet_Li', 'List_of_Greek_mythological_figures', 'David_Lynch', 'Warren_Beatty', 'Lana_Condor', 'John_Krasinski', 'Oda_Nobunaga', 'Toronto', 'Heinrich_Himmler', 'Billy_Joel', 'List_of_states_and_territories_of_the_United_States_by_population', 'Farrah_Fawcett', 'Popular_culture', 'Zootopia', 'Jim_Henson', 'MDMA', 'Seth_Green', 'The_Office_(American_TV_series)', 'Epic_Games', 'Apollo_11', 'Apollo_13', 'Parks_and_Recreation', 'Nigeria', 'Kevin_Kline', 'Roger_Lloyd-Pack', 'Meiji_Restoration', '2022_FIFA_World_Cup_qualification', 'Tucker_Carlson', 'USB', '300_(film)', 'Kevin_O\'Leary', 'Red_Dragon_(2002_film)', 'Jack_Dorsey', 'Voice_of_America', 'King_Crimson', 'Christoph_Waltz', 'Johnson_&_Johnson', 'Aston_Villa_F.C.', 'O._J._Simpson_murder_case', 'Concorde', 'Cleopatra', 'Microsoft_Office', 'Gerard_Butler', 'Larry_David', 'The_Last_Kingdom_(TV_series)', 'Tiger_Woods', 'House_of_Hanover', 'Guillain–Barré_syndrome', 'Alan_Turing', 'DC_Extended_Universe', 'Multi-level_marketing', 'Manchester_City_F.C.', 'List_of_countries_and_dependencies_by_population', 'Sienna_Miller', 'Yellowstone_National_Park', 'Ashkenazi_Jews', 'Shivaji', 'Conan_O\'Brien', 'LL_Cool_J', 'Ted_Turner', 'The_Lord_of_the_Rings_(film_series)', 'Sodom_and_Gomorrah', 'List_of_common_misconceptions', 'Wolverhampton_Wanderers_F.C.', 'Once_Upon_a_Time_in_America', 'American_Idol', 'World_War_II_casualties', 'Nawazuddin_Siddiqui', 'Rihanna', 'Charlie_and_the_Chocolate_Factory_(film)', 'Isle_of_Man', 'The_Runaways', 'Leonid_Brezhnev', 'Garcelle_Beauvais', 'Tilda_Swinton', 'Malta', 'Anthony_Hopkins', 'Ireland', 'Libertarianism', 'Raccoon', 'American_Civil_War', 'France', 'Maria_Sharapova', 'Metro-Goldwyn-Mayer', 'Historically_black_colleges_and_universities', 'Latter_Day_Saint_movement', 'Black_Panther_(film)', 'Bitcoin', 'Google_Meet', 'Rachel_Weisz', 'Reinhard_Heydrich', 'Lucky_Luciano', 'Body_mass_index', 'Brave_New_World', 'Hillary_Clinton', 'Ian_Hart', 'List_of_languages_by_number_of_native_speakers', 'Pineal_gland', 'BDSM', 'Volkswagen_Group', 'Duran_Duran', 'Northern_voalavo', 'Miyamoto_Musashi', 'Aurora', 'Ninja', 'Viv_Richards', 'Pi', 'Emma_Watson', 'Shazam!_(film)', 'Dark_(TV_series)', 'Jason_Segel', 'Harpo_Productions', 'Eternals_(film)', 'Star_Trek', 'Firefox', 'Kill_Bill:_Volume_1', 'Temple_garment', 'Tuberculosis', 'Wiccan_(character)', 'Taylor_series', 'Chicken', 'Mardi_Gras', 'Coyote', 'Black_Lives_Matter', 'The_Shining_(film)', 'Novak_Djokovic', 'American_Rescue_Plan_Act_of_2021', 'Mark_Hamill', 'Dubai', 'List_of_current_United_States_senators', 'PlayStation_4', 'Joan_Jett', 'PlayStation_5', 'Wright_brothers', 'PlayStation_2', 'Kareena_Kapoor', '2012_(film)', 'MacKenzie_Scott', 'Mamma_Mia!_(film)', 'Baphomet', 'Dachshund', 'Fringe_(TV_series)', 'Ratchet_&_Clank', 'Marilyn_Manson', 'Mulholland_Drive_(film)', 'U2', 'Harry_Potter_and_the_Cursed_Child', 'Werner_Herzog', 'Ronaldo_(Brazilian_footballer)', 'Kamal_Haasan', 'Venus_Williams', 'Robert_Wagner', 'Maroon_5', 'Mitch_McConnell', 'Bob_Denver', 'Bob\'s_Burgers', 'James_Baldwin', 'Auschwitz_concentration_camp', 'Margaux_Hemingway', 'Cobie_Smulders', 'Algeria', 'Gigi_Hadid', 'PlayerUnknown\'s_Battlegrounds', 'Dave_Grohl', 'Harry_S._Truman', 'Gerald_Ford', 'The_Matrix_(franchise)', 'Euronews', 'Women\'s_suffrage', 'Naomi_Osaka', 'Jenni_Rivera', 'Kylie_Minogue', 'Kate_Hudson', 'Jodie_Foster', 'James_Cameron', 'Daniel_Day-Lewis', 'North_Korea', 'Internet_of_things', 'Texas', 'Virgo_(astrology)', 'Severe_acute_respiratory_syndrome_coronavirus_2', 'Ur', 'Henrietta_Lacks', 'Easter', 'Katie_Price', 'Ali_Khamenei', 'United_States_Navy', 'Attack_on_Pearl_Harbor', 'Basketball', 'Suez_Canal', 'Back_to_the_Future_Part_II', 'Futurama', 'Netherlands', 'Olga_Kurylenko', 'American_Horror_Story', '1984_United_States_presidential_election', 'JavaScript', 'William_Henry_Harrison', 'Alaska', 'Tom_&_Jerry_(2021_film)', 'American_Pie_(film)', 'Semen', 'John_Cleese', 'Christian_Bale', 'Edgar_Allan_Poe', 'Ray_Charles', 'Rangers_F.C.', 'Multiple_sclerosis', 'MP3', 'The_Greatest_Showman', 'Naruto', 'Superman_&_Lois', 'Wolfgang_Amadeus_Mozart', 'The_Wolf_of_Wall_Street_(2013_film)', 'Scrubs_(TV_series)', 'Ragnar_Lodbrok', 'Orange_Is_the_New_Black', 'Jay-Z', 'Nicholas_II_of_Russia', 'Tony_Curtis', 'Nicola_Sturgeon', 'Nostradamus', 'George_W._Bush', 'Sammy_Davis_Jr.', 'David_Fincher', 'Katherine_Johnson', 'Kim_Il-sung', 'Andrew_Cuomo', 'Rose_Byrne', 'John_Lennon', 'Billie_Holiday', 'List_of_Star_Wars_films', 'Helen_Mirren', 'Constantine_the_Great', 'North_by_Northwest', 'Bill_Murray', 'Liberace', 'Star_Wars', 'Rain_(entertainer)', 'Ringo_Starr', 'Deepfake', 'Lloyd_Austin', 'Nefertiti', 'Clint_Eastwood', 'Paul_Anka', 'Alanis_Morissette', 'List_of_countries_and_dependencies_by_area', 'Thailand', 'The_Flash_(2014_TV_series)', 'Quentin_Tarantino', 'ICC_World_Test_Championship', 'Neil_Patrick_Harris', 'George_Harrison', 'Chrissy_Teigen', 'Ford_Motor_Company', 'Jane_Fonda', 'Iman_(model)', 'Bill_Maher', 'Henry_VII_of_England', 'Four_temperaments', 'Al_Pacino', 'Brian_May', 'Harold_Macmillan', 'Three-cushion_billiards', 'Howl\'s_Moving_Castle_(film)', 'Harriet_Tubman', 'Slavery_in_the_United_States', 'UEFA_Euro_2020', 'Family_Guy', 'Bill_Gates', 'Michael_Phelps', 'Christopher_Plummer', 'Drink', 'Björk', 'Agatha_Christie', 'Val_Kilmer', 'Rush_Limbaugh', 'Joseph_James_DeAngelo', 'Bethenny_Frankel', 'Dagestan', 'Dobermann', 'Culture', 'Mark_Kelly', 'Niccolò_Machiavelli', 'Hell\'s_Kitchen_(American_TV_series)', 'Typhoid_fever', 'Akon', 'John_F._Kennedy', 'Mao_Zedong', 'Human_penis_size', 'Alison_Brie', 'Rekha', 'Robert_the_Bruce', 'Schizophrenia', 'RuPaul', 'Buddy_Holly', 'Death_of_Diana,_Princess_of_Wales,_conspiracy_theories', 'Fantastic_Beasts_and_Where_to_Find_Them_(film)', 'Augustus', 'Meg_Ryan', 'Earth', 'Bloody_Sunday_(1972)', 'Newcastle_United_F.C.', 'Eliot_Spitzer', 'War_in_Donbass', 'The_King\'s_Speech', 'Zanzibar', 'Father\'s_Day', 'Kumail_Nanjiani', 'Lady_Gaga', 'Phil_Spector', 'Apple_Inc.', 'James_VI_and_I', 'Pythagorean_theorem', 'Garry_Kasparov', 'Lea_Michele', 'The_Golden_Girls', 'Felicity_Huffman', 'James_Hetfield', 'Darth_Vader', 'American_Psycho_(film)', 'Kevin_Hart', 'Denmark', 'Pose_(TV_series)', 'Occam\'s_razor', 'Harry_Houdini', 'Bhagat_Singh', 'Alicia_Keys', 'Paris_Saint-Germain_F.C.', 'Mikhail_Gorbachev', 'Diazepam', 'The_Cranberries', 'Poll_taxes_in_the_United_States', 'Stanford_University', 'Ngozi_Okonjo-Iweala', 'Full_Metal_Jacket', 'Tower_of_Babel', 'Generation', 'Filibuster', 'Genghis_Khan', 'Brokeback_Mountain', 'Pansexuality', 'ABBA', 'Microsoft_Windows', 'Don_Cheadle', 'Tina_Fey', 'En_passant', 'Harley_Quinn', 'Paracetamol', 'Syrian_civil_war', 'Fortnite', 'Suicide_Squad_(film)', 'Prince_George_of_Cambridge', 'RT_(TV_network)', 'Cryptocurrency', 'Russell_Brand', 'John_Lewis', 'Nikola_Tesla', 'Angela_Lansbury', 'Fluoxetine', 'Charlize_Theron', 'Lil_Nas_X', 'Provisional_Irish_Republican_Army', 'Pope', 'Cicely_Tyson', 'List_of_Tor_onion_services', 'Aziz_Ansari', 'Curling', 'Anne_Hathaway', 'Cthulhu', 'The_Exorcist_(film)', 'Empire_State_Building', 'The_Birds_(film)', 'J._Edgar_Hoover', 'Fred_Hampton', 'Natalie_Wood', 'Highlander_(film)', 'Nayib_Bukele', 'The_Hobbit', 'Hermann_Göring', 'Def_Leppard', 'Bipolar_disorder', 'Google_logo', 'Sons_of_Anarchy', 'Iron_Man_(2008_film)', 'Kareem_Abdul-Jabbar', 'List_of_tallest_people', 'Oprah_Winfrey', 'Lord_Voldemort', 'Julianne_Moore', 'Cirrhosis', 'Nile', 'Battlestar_Galactica_(2004_TV_series)', 'Google_Drive', 'Rowan_Atkinson', 'Italy', 'Ivermectin', 'Princess_Alice_of_the_United_Kingdom', 'Bill_Cosby', 'Fentanyl', 'List_of_religious_populations', 'Andhra_Pradesh', 'Multiple_myeloma', 'John_Wayne', 'Hulk_Hogan', 'Louis_Mountbatten,_1st_Earl_Mountbatten_of_Burma', 'Atherosclerosis', 'Academy_Award_for_Best_Actress', 'Spirited_Away', 'Kyrgyzstan', 'Halsey_(singer)', 'Ava_Gardner', 'East_India_Company', 'Exo_(group)', 'Charles_Edward_Stuart', 'Nicole_Richie', 'The_Star-Spangled_Banner', 'Muhammad', 'Frozen_(2013_film)', 'Prison_Break', 'Icarus', 'Nathuram_Godse', 'Soylent_Green', 'Gypsy_(1962_film)', 'Stock_market', 'Riz_Ahmed', 'The_Simpsons', 'Rush_Hour_(1998_film)', 'Eugene_Levy', 'The_Stormlight_Archive', 'Christianity_in_Iraq', 'IQ_classification', 'John_Travolta', 'Reserve_Bank_of_India', 'Nontheism', 'Dog', 'Christina_Hendricks', 'Crimean_War', 'Bodhidharma', 'Christopher_Columbus', 'Addison_Rae', 'Soviet–Afghan_War', 'Lauryn_Hill', 'Gay_sexual_practices', 'Babirusa', 'Henry_VIII', 'United_Arab_Emirates', 'Michelangelo', 'Two_and_a_Half_Men', 'Chevelle_(band)', 'Monster_Energy', 'Charlotte_of_Mecklenburg-Strelitz', 'Solange_Knowles', 'List_of_most_expensive_films', 'John_Cena', 'Bangalore', 'Jews', 'Chris_McCandless', 'Catch_Me_If_You_Can', 'Surströmming', '99942_Apophis', 'The_Coca-Cola_Company', 'Once_Upon_a_Time_(TV_series)', 'Will_Smith', 'Jude_Law', 'Machine_learning', 'Wi-Fi', 'Attack_on_Titan', 'Bermuda_Triangle', 'Andrew_Jackson', 'Sophia_Loren', 'Watchmen_(film)', 'Walmart', 'Operation_Flavius', 'Brooke_Shields', '2016_United_States_presidential_election', 'Charles,_Prince_of_Wales', 'Paramount+', 'Robert_Hanssen', 'World_War_I', 'Portuguese_man_o\'_war', 'Minstrel_show', 'Virender_Sehwag', 'Lockheed_Martin_F-22_Raptor', 'Laika', 'Sagittarius_(astrology)', 'Aaliyah', 'Kerala', 'Richard_Burton', 'Mark_Rothko', 'Brad_Pitt', 'Vladimir_Lenin', 'Mauritius', 'Banana', 'Princess_Hours', 'Coco_Chanel', 'Hemorrhoid', 'Billy_Idol', 'Lisa_Lopes', 'Tennessee', 'Ark_of_the_Covenant', 'List_of_presidents_of_the_United_States', 'The_Terminal', 'Industrial_Revolution', 'Billy_Connolly', 'Brian_Cox_(actor)', 'Evangeline_Lilly', 'Ming-Na_Wen', '2020–21_Liverpool_F.C._season', 'Unit_731', 'Paul_I_of_Russia', 'Sutton_Hoo', 'List_of_conspiracy_theories', 'James_McAvoy', 'Larry_Page', 'Human_Development_Index', 'Gremlins', 'Steve_McQueen', 'Dan_Levy_(Canadian_actor)', 'Paris', 'Mohammad_Reza_Pahlavi', 'Odin', 'JoJo\'s_Bizarre_Adventure', 'Windsor_Castle', 'Wesley_Snipes', 'International_Women\'s_Day', 'Costa_Rica', 'Ethan_Hawke', 'Marvin_Gaye', 'Calvin_Lockhart', 'Kazakhstan', 'Nancy_Pelosi', 'Crypto_art', 'List_of_largest_cities', 'Arrowverse', 'Napoleon_Dynamite', 'Laura_Dern', 'The_Seven_Deadly_Sins_(manga)', 'Schitt\'s_Creek', 'Lockheed_Martin_F-35_Lightning_II', 'Mickey_Mouse', 'Us_(2019_film)', 'Elizabeth_Taylor', 'Marfan_syndrome', 'Eurocopter_AS350_Écureuil', 'Robin_Hood', 'London', 'Dissolution_of_Czechoslovakia', 'American_Gods_(TV_series)', 'Indiana_Jones_and_the_Last_Crusade', 'List_of_footballers_with_500_or_more_goals', 'Marion_Cotillard', 'The_Handmaid\'s_Tale', 'Spectre_(2015_film)', 'Pharrell_Williams', 'Bluetooth', 'Dave_Bautista', 'Gwyneth_Paltrow', 'Tom_Cruise', 'H._P._Lovecraft', 'Battle_of_Stalingrad', 'Muhammad_Ali_Jinnah', 'Supernatural_(American_TV_series)', 'Stephen_Hillenburg', 'Iggy_Pop', 'U.S._Route_66', 'H._H._Holmes', 'Scottish_Premier_League', 'Shia_LaBeouf', 'Pol_Pot', 'Mr._Bean', 'His_Dark_Materials_(TV_series)', 'Toyotomi_Hideyoshi', 'Gmail', 'John_F._Kennedy_Jr.', 'Bruce_Springsteen', 'Kylie_Jenner', 'Portia_de_Rossi', 'Anglo-Saxons', 'Inside_Out_(2015_film)', 'Jill_Biden', 'Lost_(TV_series)', 'Babe_Ruth', 'Jason_Alexander', 'Diane_Kruger', 'Taurus_(astrology)', 'Joseph_P._Kennedy_Sr.', 'Boeing_777', 'Complaint_tablet_to_Ea-nasir', 'Pompeii', '2012_United_States_presidential_election', 'Penélope_Cruz', 'Scarlet_Witch', 'Tenet_(film)', 'Sertraline', 'Fast_Times_at_Ridgemont_High', 'Holy_Roman_Empire', 'Academy_Award_for_Best_Picture', 'Boeing_787_Dreamliner', 'Mithun_Chakraborty', 'Giga_Nevada', 'Internet', 'Black_Widow_(2021_film)', 'Oral_sex', 'Leeds_United_F.C.', 'Eddie_Izzard', 'Twitter', 'Pat_Sajak', 'Women\'s_empowerment', 'Winona_Ryder', 'List_of_British_monarchs', 'Nicolas_Cage_filmography', 'Vernon_Jordan', 'Russian_alphabet', 'Elvis_Presley', 'Ranveer_Singh', 'Tim_Allen', 'John_Belushi', 'The_X-Files', 'Arrested_Development', 'Psoriasis', 'Pfizer', 'Rosamund_Pike', 'Beyoncé', 'Richard_Harris', 'Daryl_Hannah', 'Libra_(astrology)', 'Bono', 'Steve_Nash', 'Malaysia_Airlines_Flight_370', 'Nigger', 'Cocaine', 'One_Piece', 'Lemmy', 'The_Great_Gatsby', 'Prohibition_in_the_United_States', 'Angola', 'Moon', 'The_Church_of_Jesus_Christ_of_Latter-day_Saints', 'West_Ham_United_F.C.', 'Kishore_Kumar', 'Tame_Impala', 'Borussia_Dortmund', 'Joel_Osteen', 'George_Wallace', 'Mary_Shelley', 'Kensington_Palace', 'Laurel_and_Hardy', 'Foie_gras', 'The_Trial_of_the_Chicago_7', 'Bill_Hader', 'Matthew_Macfadyen', 'John_Landis', 'Grigori_Rasputin', 'The_Hunt_(2020_film)', 'Buzz_Aldrin', 'Isra_and_Mi\'raj', 'Gary_Cooper', 'Saif_Ali_Khan', 'Kyrsten_Sinema', 'Vagina', 'British_royal_family', 'Lizzy_Caplan', 'Jake_Gyllenhaal', 'Justin_Timberlake', 'Cars_(film)', 'The_Avengers_(2012_film)', 'David_Dellinger', 'Friedrich_Nietzsche', 'Diverticulitis', 'Animal', 'Megalodon', 'Warren_G._Harding', 'Beauty_Revealed', 'Indo-European_languages', 'Demi_Moore', 'The_Walt_Disney_Company', 'Jurassic_Park', 'NBA_G_League', 'Amyotrophic_lateral_sclerosis', 'Jawaharlal_Nehru', 'List_of_countries_by_Human_Development_Index', 'Sundown_town', 'Microsoft_Excel', 'Mohammed_bin_Salman', 'Isla_Fisher', 'Fellatio', 'Amy_Schumer', 'Venezuela', 'Dragon_Ball', 'Grey\'s_Anatomy', 'Louisiana', 'Mughal_Empire', 'Bryan_Cranston', 'Women\'s_History_Month', 'Salvador_Dalí', 'Chechnya', 'Klaus_Barbie', 'Sidney_Poitier', 'Michael_Palin', 'World', 'Black_Swan_(film)', 'Kelsey_Grammer', 'Edge_of_Tomorrow', 'Hilary_Swank', 'Stephen_King', 'Plato', 'Jim_Brown', 'Equality_Act_(United_States)', 'Birds_of_Prey_(2020_film)', 'Married_at_First_Sight_(Australian_TV_series)', 'Wu-Tang_Clan', 'Impact_of_the_COVID-19_pandemic_on_education', 'Smallpox', 'Non-penetrative_sex', 'Jackson_Pollock', 'Muammar_Gaddafi', 'Belarus', 'Elizabeth_Montgomery', 'Sex_Pistols', 'A_Knight\'s_Tale', 'A._P._J._Abdul_Kalam', 'Unforgiven', 'Vietnam_War', 'Axolotl', 'Louis_Armstrong', '2017_Las_Vegas_shooting', 'Janet_Leigh', 'Nick_Cave', 'Steam_(service)', 'Saturday_Night_Live', 'SpaceX', 'SWOT_analysis', 'Order_of_the_British_Empire', 'Black_Death', 'Mary,_Queen_of_Scots', 'Red_pill_and_blue_pill', 'The_Big_Short_(film)', 'Encyclopedia', 'C_(programming_language)', 'Harvey_Weinstein', 'Chicago', 'French_Bulldog', 'Bob_Dylan', 'List_of_deadliest_animals_to_humans', 'Larry_Bird', 'Cuban_Missile_Crisis', 'Bella_ciao', 'Breaking_Bad', 'Osama_bin_Laden', 'Henry_Kissinger', 'Billboard_Hot_100', 'Polyamory', 'Nick_Nolte', 'Steve_Jobs', 'Robert_Duvall', 'Roald_Dahl', 'DC_Universe_Animated_Original_Movies', 'Twitch_(service)', 'Jerry_Lewis', 'Pepsi', 'England', 'Jonah_Hill', 'Ironheart_(character)', 'Kenneth_Branagh', 'William_IV', 'Keeping_Up_with_the_Kardashians', 'Edward_VIII', 'Hagia_Sophia', 'Matthew_Perry', 'Eurovision_Song_Contest', 'Amitabh_Bachchan', 'Gamergate_controversy', 'Sachin_Tendulkar', 'Elijah_Muhammad', 'Mars_rover', 'HMS_Erebus_(1826)', 'Frédéric_Chopin', 'Usain_Bolt', 'Catherine,_Duchess_of_Cambridge', 'Islamic_State_of_Iraq_and_the_Levant', 'FC_Bayern_Munich', 'Richard_Branson', 'Greg_Abbott', 'Dragon', 'Timothée_Chalamet', 'Frankenstein', 'Sting_(musician)', 'Ridley_Scott', 'Top_Gun', 'Warren_Buffett', 'Thomas_Wolfe', 'John_Williams', 'List_of_countries_by_GDP_(PPP)_per_capita', 'Eddie_Redmayne', 'Eugenics', 'Neil_Armstrong', 'Down_syndrome', 'Nina_Simone', 'Janis_Joplin', '10_Things_I_Hate_About_You', 'Assassination_of_John_F._Kennedy', 'Great_Wall_of_China', 'Java_(programming_language)', 'Michelle_Obama', 'Emily_Blunt', 'Julian_Assange', 'Stevie_Wonder', 'Alice_Cooper', 'Baháʼí_Faith', 'Rob_Lowe', 'Alan_Rickman', 'Lisa_Kudrow', 'Jayne_Mansfield', 'Angela_Bassett', 'Tasuku_Honjo', 'List_of_current_monarchs_of_sovereign_states', 'Gypsy_Rose_Lee', 'Soviet_Union', 'B._R._Ambedkar', 'KickassTorrents', 'The_Band', 'Demi_Lovato', 'Marvel_Cinematic_Universe', 'Keanu_Reeves', '2024_United_States_presidential_election', 'M16_rifle', 'Communism', 'Association_football', 'Richard_Pryor', 'Yazidis', 'Coca-Cola', 'Alprazolam', 'Gorillaz', 'Al_Gore', 'F._Scott_Fitzgerald', 'Human_Sexuality', 'Pink_(singer)', 'A_Song_of_Ice_and_Fire', 'Ivar_the_Boneless', 'United_Kingdom', 'Liam_Neeson', 'The_Dark_Side_of_the_Moon', 'GitHub', 'Jason_Bateman', 'Abbie_Hoffman', 'Leprosy', 'Lil_Uzi_Vert', 'Alabama', 'Björn_Ironside', 'Good_Times', 'Milky_Way', 'Sex_Education_(TV_series)', 'Julia_Louis-Dreyfus', 'Incel', 'Ryan_Reynolds', 'Umami', 'Labrador_Retriever', 'Chuck_Schumer', 'Babylon', 'List_of_James_Bond_films', 'Frasier', 'Johnson_&_Johnson_COVID-19_vaccine', 'Star_Trek:_The_Next_Generation', 'Jefferson_Davis', 'Anne_of_Green_Gables', 'Firefly_(TV_series)', 'Narendra_Modi', 'Harpocrates', 'Ulysses_S._Grant', 'Chris_Rock', 'Cyndi_Lauper', 'Schrödinger\'s_cat', 'IKEA', 'Google_Classroom', 'Elo_rating_system', 'September_11_attacks', 'Steve_Wozniak', 'OnlyFans', 'All-Russia_State_Television_and_Radio_Broadcasting_Company', 'Kim_Basinger', 'Emily_Dickinson', 'Kamala_Harris', 'Helen_Hunt', 'Kim_Kardashian', 'Now_You_See_Me_(film)', 'Sojourner_(rover)', 'Inter_Miami_CF', 'Selena', 'The_Blacklist_(TV_series)', 'Diane_Keaton', 'Eva_Longoria', 'Ice-T', 'Ant-Man_and_the_Wasp', 'Franklin_D._Roosevelt', 'List_of_best-selling_albums', 'Harry_Styles', 'Jacqueline_Kennedy_Onassis', 'Berkshire_Hathaway', 'Rodney_Dangerfield', 'Kali', 'France_24', 'Virat_Kohli', 'Presidency_of_Joe_Biden', 'Washington,_D.C.', 'Tottenham_Hotspur_F.C.', 'Beagle', 'Grace_and_Frankie', 'Lockheed_SR-71_Blackbird', 'Boardwalk_Empire', 'WWE', 'Yahoo!', 'DC_Comics', 'Ur_of_the_Chaldees', 'Tesla,_Inc.', 'Katie_Couric', 'Lily_Tomlin', 'Quicksilver_(Marvel_Comics)', 'Michael_Schumacher', 'RoboCop', 'Maurice_Gibb', 'Cate_Blanchett', 'Little_Richard', 'The_World\'s_Billionaires', 'Nazi_Germany', 'Frogmore_Cottage', 'Space_Jam', 'ISO_3103', 'Florence_Nightingale', 'Catherine_Zeta-Jones', 'Pope_John_Paul_II', 'Steven_Spielberg', 'Dick_Van_Dyke', 'The_Notebook', 'Charles_de_Gaulle', 'Radiohead', 'Basque_language', 'Mel_Blanc', 'Angelina_Jolie', 'Rage_Against_the_Machine', 'Mohamed_Salah', 'Roblox', 'TikTok', 'West_Bengal_Legislative_Assembly', 'List_of_governors_of_New_York', 'Mumford_&_Sons', 'List_of_Disney_theatrical_animated_feature_films', 'Virtual_private_network', 'Future_(rapper)', 'Andrew_Yang', 'Costco', 'Katy_Perry', 'COVID-19_pandemic_in_the_United_Kingdom', 'Elton_John', 'Thomas_Edison', 'List_of_countries_by_GDP_(PPP)', 'Lucy_Liu', 'It_(2017_film)', 'Holodomor', 'Ayn_Rand', 'Helen_McCrory', 'Lok_Sabha', 'Ram_Nath_Kovind', 'Juventus_F.C.', 'Donald_Sutherland', 'Generation_Alpha', 'Harry_Potter', 'Bachelor_of_Arts', 'Camilla,_Duchess_of_Cornwall', 'Young_Avengers', 'Judy_Garland', 'Tiffany_Haddish', 'How_I_Met_Your_Mother', 'ICC_Test_Championship', 'Howard_Hughes', 'Coldplay', 'Ramadan', 'Henry_VI_of_England', '50_Cent', 'Helicobacter_pylori', 'Rheumatoid_arthritis', 'Keystone_Pipeline', 'Wales', 'Andy_Samberg', 'Freemasonry', 'Sid_Vicious', 'Jamie_Chung', 'Phoenix_Lights', 'The_Notorious_B.I.G.', 'Denzel_Washington', 'Akihito', 'Google_Play', 'Bernie_Mac', 'My_Hero_Academia', 'The_Doors', 'Constantinople', 'Africa', 'Pablo_Picasso', 'Joanna_Lumley', 'Virginia_Woolf', 'Scientology', 'Nazi_Party', 'New_Deal', 'Lionel_Richie', 'Pitch_Perfect', 'Freyja', 'Albus_Dumbledore', 'Queen_Elizabeth_The_Queen_Mother', 'Hannibal_(2001_film)', 'Indian_Idol', 'Pope_Francis', 'Goldie_Hawn', 'Mary-Louise_Parker', 'Ozzy_Osbourne', 'M1_Abrams', 'Andorra', 'Jeremy_Irons', 'Ed_Sheeran', 'Armie_Hammer', 'Treasure_Planet', 'Kim_Jong-un', 'Provinces_and_territories_of_Canada', 'Janet_Jackson', 'Sikkim', 'Economy_of_India', 'Saudi_Arabia', 'Joaquín_\"El_Chapo\"_Guzmán', 'Second_Boer_War', 'Pet_Shop_Boys', 'James_Brown', 'Artificial_intelligence', 'Hero_Fiennes_Tiffin', 'Phil_McGraw', 'Cameron_Diaz', 'Steven_Seagal', 'Google_Earth', 'Scarlett_Johansson', 'Mel_Gibson', 'Ludacris', 'Golden_Globe_Awards', 'Mark_Twain', 'Roger_Ailes', 'New7Wonders_of_the_World', 'Spotify', 'Isaac_Newton', 'Jessica_Biel', 'Marcus_Rashford', 'List_of_best-selling_manga', 'Ernest_Hemingway', 'Yuri_Gagarin', 'Colombia', 'Uttar_Pradesh', 'Lynyrd_Skynyrd', 'Barbiturate', 'IP_address', 'Prince_Louis_of_Cambridge', 'New_Jersey', 'Ike_Turner', 'Northrop_Grumman_B-2_Spirit', 'Avril_Lavigne', 'James_Cromwell', '2021_ICC_Men\'s_T20_World_Cup', 'Ramones', 'Snoop_Dogg', 'Little_Women', 'Eminem', 'Law_Abiding_Citizen', 'Fascism', 'Franz_Kafka', 'Johan_Cruyff', 'War', 'Mötley_Crüe', 'Satan', 'Joy_Division', 'Saint_Patrick\'s_Day', 'Mean_Girls', 'Earthquake', 'Min_Aung_Hlaing', 'Frank_Langella', 'Crips', 'Kate_Beckinsale', 'Dire_Straits', 'Sciatica', 'Tropic_Thunder', 'Teetotalism', 'Mormonism', 'Slipknot_(band)', 'Coach_Carter', 'Continent', 'Eleanor_Roosevelt', 'Roger_Moore', 'Rick_Ross', 'Perseverance_(rover)', 'Indiana_Jones_and_the_Temple_of_Doom', 'Nicole_Kidman', 'Ezra_Miller', 'Diego_Maradona', 'Ant-Man_(film)', 'Julie_Bowen', 'Jane_Austen', 'Zeus', 'Titanic_(1997_film)', 'David_Paterson', 'Creedence_Clearwater_Revival', 'Aurangzeb', 'David_Spade', 'Philip_Seymour_Hoffman', 'Guyana', 'Equatorial_Guinea', 'Bloods', 'Ben_Shapiro', 'ICC_Men\'s_T20_World_Cup', 'Execution_of_the_Romanov_family', 'Lauren_Bacall', 'Sword_Art_Online', 'Rooney_Mara', 'Ukraine', 'Good_Will_Hunting', 'Curb_Your_Enthusiasm', 'List_of_country_calling_codes', 'Nickelodeon', 'Breakfast_at_Tiffany\'s_(film)', 'Liza_Minnelli', 'System_of_a_Down', 'Fairchild_Republic_A-10_Thunderbolt_II', 'The_Hobbit_(film_series)', 'Jamaica', 'Starlink', 'Rajesh_Khanna', 'Prodigal_Son_(TV_series)', 'Cloverfield', 'The_Alchemist_(novel)', 'NATO', 'Ku_Klux_Klan', 'David_Tennant', 'Jeremy_Renner', 'Pamela_Anderson', 'Bette_Davis', 'Alien_(film)', 'Imran_Khan', 'NASA', 'Desperate_Housewives', 'Treaty_of_Roskilde', 'Miley_Cyrus', 'Generation_Z', 'Sherlock_(TV_series)', 'Generation_X', 'John_Malkovich', 'Taika_Waititi', 'Sarah_Silverman', 'Pablo_Escobar', 'Jesse_Eisenberg', 'Stephen_Fry', 'Jair_Bolsonaro', 'Shirley_Temple', 'Yemeni_Civil_War_(2014–present)', 'Mayim_Bialik', 'List_of_programs_broadcast_by_Nickelodeon', 'List_of_stadiums_by_capacity', 'IPhone', 'Tammy_Baldwin', 'Tom_Clancy', 'Phil_Chisnall', 'Dionysus', 'Austria', 'Anime', 'Hentai', 'Dwight_D._Eisenhower', 'Russell_Wilson', 'Citizen_Kane', 'Odisha', 'Neil_Young', 'Fukushima_nuclear_disaster', 'Cara_Delevingne', 'Louis_Farrakhan', 'Rick_James', 'Avatar_(2009_film)', 'Monarchy_of_the_United_Kingdom', 'Spider-Man', 'Bridget_Fonda', 'List_of_popes', 'Ethiopia', 'California_grizzly_bear', 'Ron_Johnson_(Wisconsin_politician)', 'Hanging_Gardens_of_Babylon', 'Brooklyn_Nets', 'Operation_Barbarossa', 'HTTP_404', 'Gulf_War', 'Doctor_of_Philosophy', 'Pakistan', 'Reddit', 'Michael_Douglas', 'Emoji', 'Rush_(band)', 'Vic_Morrow', 'List_of_prime_ministers_of_the_United_Kingdom', 'Gladiator_(2000_film)', 'Domantas_Sabonis', 'Anne_Frank', 'Ayaan_Hirsi_Ali', 'Dravida_Munnetra_Kazhagam', 'Frank_Lampard', 'Jennifer_Lopez', 'Bangladesh', 'The_Starry_Night', 'Quran', 'Alfred_Molina', 'Jennifer_Jason_Leigh', 'Mel_Brooks', 'Black_hole', 'Ingenuity_(helicopter)', 'Daylight_saving_time', 'Mount_Vesuvius', 'Ivanka_Trump', 'Grease_(film)', 'Ben_Stiller', 'Mike_Myers', 'Idi_Amin', 'California', 'Book_of_Enoch', 'Coming_to_America', 'Mississippi', 'List_of_largest_companies_by_revenue', 'List_of_longest-reigning_monarchs', 'Zsa_Zsa_Gabor', 'Loretta_Lynn', 'Rodrigo_Duterte', 'Jerry_Rubin', 'The_Lighthouse_(2019_film)', 'Rothschild_family', 'Website', 'Hannibal_Lecter', 'Akbar', 'Emma_(2020_film)', 'The_West_Wing', 'Woodrow_Wilson', 'Buddhism', 'Eric_Harris_and_Dylan_Klebold', 'Indian_Super_League', 'Nat_King_Cole', 'The_dress', 'Alexis_Bledel', 'List_of_most-liked_TikTok_videos', 'The_Godfather_Part_III', 'Blink-182', 'Killing_of_George_Floyd', 'Ava_Max', 'Laurence_Fishburne', 'Four_Horsemen_of_the_Apocalypse', 'Boys_Over_Flowers_(TV_series)', 'Oliver_Cromwell', 'The_Fresh_Prince_of_Bel-Air', 'John_Forbes_Nash_Jr.', 'Willem_Dafoe', 'Chris_Evans_(actor)', 'Uyghurs', 'Inglourious_Basterds', 'Labour_Party_(UK)', 'Jamie_Lee_Curtis', 'Wyoming', 'Nick_Offerman', 'Shaquille_O\'Neal', 'Polio', 'Zoroastrianism', 'ASCII', 'Aerosmith', 'Elizabeth_Báthory', 'One_Flew_Over_the_Cuckoo\'s_Nest_(film)', 'India_national_cricket_team', 'Rome', 'Hells_Angels', 'Tomb_Raider', 'Windows_10', 'Event_Horizon_(film)', 'The_Wizard_of_Oz_(1939_film)', 'PBS', 'TLA+', 'William_Shatner', 'Hunter_S._Thompson', 'Book_of_Mormon', 'Suga_(rapper)', 'Mortal_Kombat', 'Shreya_Ghoshal', 'Sputnik_V_COVID-19_vaccine', 'Doordarshan', 'Family_of_Barack_Obama', 'Queen_Victoria', 'Sepsis', 'Albert_II,_Prince_of_Monaco', 'Jacinda_Barrett', 'George_Foreman', 'Don_Rickles', 'Lucifer', 'BBC_World_Service', 'Silk_Road_(marketplace)', 'Ella_Fitzgerald', 'The_Conjuring', 'George_Washington', 'West_Virginia', 'Life_of_Pi_(film)', 'Walter_Gretzky', 'Neil_deGrasse_Tyson', 'Bupropion', 'Millennials', 'Carol_Danvers', 'Racketeering', 'Midsomer_Murders', 'United_States_presidential_line_of_succession', 'Clark_Gable', '2021', 'Human_penis', 'George_III', 'Lymphoma', 'Football', 'Mike_Krzyzewski', 'One_Direction', 'Will_Ferrell', 'Rachel_Dolezal', 'Laura_Linney', 'Classification_of_demons', 'Chess', 'National_Hockey_League', 'John_McAfee', 'Jean-Claude_Van_Damme', 'Davido', 'Formula_One', 'Fulham_F.C.', 'Caitlyn_Jenner', 'Valentina_Tereshkova', 'Prime_number', 'Money_Heist', 'Frank_Ocean', 'List_of_most-disliked_YouTube_videos', 'House_of_Saxe-Coburg_and_Gotha', 'Boris_Johnson', 'Human', 'Google', 'Sylvia_Plath', 'Bhopal_disaster', 'Tanzania', 'Suez_Crisis', 'Liev_Schreiber', 'COVID-19_pandemic_in_India', 'Fairuza_Balk', 'Suzi_Quatro', 'Richard_Jewell', 'Anna_Nicole_Smith', 'Sustainable_Development_Goals', 'Taiwan', 'Brie_Larson', 'Leonard_Cohen', 'Sex_and_the_City', 'Dawson\'s_Creek', 'Mr._Potato_Head', 'Lent', 'Dyatlov_Pass_incident', 'Aaron_Sorkin', 'Pocahontas', '2020–21_United_States_network_television_schedule', 'Leukemia', 'Albert_Einstein', 'Aberfan_disaster', 'Ken_Jennings', 'Los_Angeles', 'Apocalypto', 'Vietnam', 'Matthew_Broderick', 'Jim_Crow_laws', 'Bad_Bunny', 'Chicago_Seven', 'Columbine_High_School_massacre', 'Nigersaurus', 'Princess_Margaret,_Countess_of_Snowdon', 'Dan_Aykroyd', 'Emmett_Till', 'Liverpool_F.C.', 'Bernie_Sanders', 'Project_MKUltra', 'American_Mafia', 'Ravi_Zacharias', 'National_Football_League', 'Jonathan_(tortoise)', 'Seven_(1995_film)', 'Alex_Jones', 'HBO_Max', 'José_Mourinho', 'Jeff_Bridges', 'Jack_Nicholson', 'Gout', 'The_Godfather', 'Jeremy_Lin', 'Vlad_the_Impaler', 'UEFA_Europa_League', 'Brian_Sicknick', 'J._J._Watt', 'White_House', 'The_Wheel_of_Time', 'Robert_Kardashian', 'Amy_Winehouse', 'Chuck_Norris', 'Catholic_Church', 'Julie_Andrews', 'Sexual_intercourse', 'Betty_White', 'Theresa_May', 'Climate_change', 'Pornhub', 'Rhodesia', 'Eric_Clapton', 'Hannibal_(TV_series)', 'Deep_Purple', 'Rob_Reiner', 'A_Clockwork_Orange_(film)', 'John_Adams', 'Bob_Hope', 'Sperm_whale', 'Raynaud_syndrome', 'Android_(operating_system)', 'Big_Bang', 'Nike,_Inc.', 'Pokémon_(TV_series)', 'John_Kerry', 'Fidel_Castro', 'Indiana_Jones', 'Magna_Carta', 'Alec_Baldwin', 'Gerd_Müller', 'Wil_Wheaton', 'Brazil_national_football_team', 'Leaning_Tower_of_Pisa', 'The_Voice_(American_TV_series)', 'N,N-Dimethyltryptamine', 'Edward_VI_of_England', 'Ja\'far_al-Sadiq', 'Kaley_Cuoco', 'Joe_Rogan', 'Black_Panther_Party', 'Stellan_Skarsgård', 'Confederate_States_of_America', '2022_FIFA_World_Cup', 'SpongeBob_SquarePants', 'Pride_&_Prejudice_(2005_film)', 'Akshay_Kumar', 'Mount_Rushmore', 'Chaos_magic', 'Suriname', 'Renée_Zellweger', 'Greenland', 'King_Kong_(2005_film)', 'Prince_Philip,_Duke_of_Edinburgh', 'Natasha_Lyonne', 'A*_search_algorithm', 'Meryl_Streep', 'Death_of_Adolf_Hitler', 'Peyton_Manning', 'Unsimulated_sex', 'Mother_Teresa', 'Kevin_Durant', 'Flipkart', 'Jamie_Foxx', 'Maine_Coon', 'Helen_Reddy', 'Freddie_Mercury', 'Waco_siege', 'John_Glenn', 'Romelu_Lukaku', 'J._Jayalalithaa', '2020_Summer_Olympics', 'Batman_Begins', 'Justice_League_(film)', 'Oscar_Isaac', 'Cabinet_of_Joe_Biden', 'Katharine_Hepburn', 'Hugh_Hefner', 'Caste_system_in_India', '1996_United_States_presidential_election', 'Harry_Potter_and_the_Philosopher\'s_Stone_(film)', 'Dawn_French', 'Toy_Story', 'Thanos', 'Kristen_Bell', 'Van_Halen', 'List_of_Marvel_Cinematic_Universe_films', 'Kings_of_Leon', 'Eva_Perón', 'Lisa_(rapper)', 'Lynda_Carter', 'Nephilim', 'Poisson_distribution', 'Lebanon', 'Manhattan_(1979_film)', 'Krishna', 'Mauritania', 'Stevie_Ray_Vaughan', 'Camera_obscura', 'Oasis_(band)', 'French_language', 'Elizabeth_of_York', 'Kathy_Bates', 'Thomas_Jefferson', 'Ashton_Kutcher', 'William_the_Conqueror', 'Harvey_Keitel', 'South_Africa', 'MAPPA_(studio)', 'Luxembourg', 'Emu_War', 'Ashoka', 'Manute_Bol', 'Kanye_West', 'Fingering_(sexual_act)', 'Cricket_World_Cup', 'Caligula', 'War_of_1812', 'The_Impossible_(2012_film)', 'Coronavirus', 'Charles_Bronson', 'Joan_Crawford', 'Dunblane_massacre', 'Adele', 'Clubhouse_(app)', '27_Club', 'Mona_Lisa', 'Dances_with_Wolves', 'Native_Americans_in_the_United_States', 'M4_carbine', 'Frederick_Douglass', 'Léa_Seydoux', 'Jordan_Peele', 'Channing_Tatum', 'Rock_Hudson', 'Russia', 'Jamal_Khashoggi', 'Capricorn_(astrology)', 'Edward_VII', 'Marie_Curie', 'Michael_Peña', 'Tom_Hardy', 'James_Corden', 'Statue_of_Liberty', 'Thomas_Müller', 'Prime_Minister_of_the_United_Kingdom', 'Disney+', 'Bernard_Arnault', 'Zac_Efron', 'RuPaul\'s_Drag_Race', 'Synesthesia', 'Larry_King', 'The_Good_Place', 'List_of_video_games_considered_the_best', 'Ricky_Gervais', 'Margaret_Thatcher', 'Northern_Ireland', 'Indonesia', 'Indian_National_Congress', 'Video_game', 'Wuthering_Heights', 'Melanie_C', 'Benedict_Cumberbatch', 'Independence_Day_(Ghana)', 'Capital_punishment', 'The_Revenant_(2015_film)', 'Istanbul', 'Samuel_L._Jackson', 'Bob_Newhart', 'Astrology_and_the_classical_elements', 'Milla_Jovovich', 'World_Wide_Web', 'Jonas_Brothers', 'Jeff_Bezos', '2019–21_ICC_World_Test_Championship', 'Hasselblad', 'Lolita', 'Turkey', 'Susan_Sarandon', 'Live_Aid', 'North_America', 'Isabel_Allende', 'Dylann_Roof', 'Schindler\'s_List', 'Leonard_Nimoy', 'Tim_Roth', 'Kerry_Washington', 'Mariel_Hemingway', 'Wikimedia_Foundation', 'Jesus', 'Taxi_Driver', 'President_of_India', 'Tutankhamun', 'Jared_Leto', 'Marcia_Gay_Harden', 'Catalytic_converter', 'Reese_Witherspoon', 'Microsoft_Teams', 'Frank_Bruno', 'Kaaba', 'The_Godfather_Part_II', 'Batman', 'Rickrolling', 'Dave_Chappelle', 'Neoliberalism', 'Astral_projection', 'Charles_II_of_Spain', 'RuPaul\'s_Drag_Race_UK', 'Bee_Gees', 'Facebook_Messenger', 'HIV', 'Sam_Worthington', 'Jennifer_Doudna', 'Ronda_Rousey', 'Kevin_Costner', 'Emma_Thompson', 'Rennie_Davis', 'Noah_Schnapp', 'David_Dobrik', 'Jim_Carrey', 'Ma_Rainey', 'Japan', 'Standard_deviation', 'Commodus', 'Gin', 'Rammstein', 'Google_Maps', 'Guantanamo_Bay_detention_camp', 'Joe_Biden', 'Israel_Adesanya', 'General_Dynamics_F-16_Fighting_Falcon', 'Django_Unchained', 'Bruce_Willis', 'Blade_Runner', 'Dassault_Aviation', 'Spice_Girls', 'Charles_I_of_England', 'Salò,_or_the_120_Days_of_Sodom', 'List_of_countries_by_foreign-exchange_reserves', 'Rajkummar_Rao', 'Grand_Theft_Auto', 'Candace_Owens', 'Skyfall', 'Banksy', 'List_of_theological_demons', 'Lana_Del_Rey', '2018_FIFA_World_Cup', 'List_of_Harry_Potter_cast_members', 'Monica_Bellucci', 'Bill_de_Blasio', 'Captain_America', 'Sylvester_Stallone', 'Mansa_Musa', 'Casablanca_(film)', 'Celts', 'Coeliac_disease', '24_(TV_series)', 'Manga', 'List_of_TCP_and_UDP_port_numbers', 'North_Sentinel_Island', 'Intermittent_fasting', 'James_Franco', 'The_Bachelor_(American_TV_series)', 'Tupac_Shakur', 'Los_Angeles_Lakers', 'Lisa_Murkowski', 'Van_Morrison', 'James_Earl_Jones', 'Michael_Jordan', 'Harry_Potter_(film_series)', 'Rupert_Everett', 'Sanfilippo_syndrome', 'Suleiman_the_Magnificent', 'Nicolas_Sarkozy', 'Heaven\'s_Gate_(religious_group)', 'Crohn\'s_disease', 'Blood_type', 'Yul_Brynner', 'Pete_Buttigieg', 'Arsenal_F.C.', 'Nasdaq', 'Islam', 'Anjelica_Huston', 'Nikolaj_Coster-Waldau', 'Blue_whale', 'Minimum_wage_in_the_United_States', 'Scooby-Doo', 'State_of_Palestine', '92nd_Academy_Awards', 'Ken_Jeong', 'Al_Jazeera', 'Helena_Bonham_Carter', 'Tsar_Bomba', 'Oklahoma_City_bombing', 'Ides_of_March', 'World\'s_Strongest_Man', 'Ice_Cube', 'Tokugawa_Ieyasu', 'Brandon_Lee', '7_March_Speech_of_Bangabandhu', 'Goodfellas', 'Back_to_the_Future', 'The_Big_Lebowski', 'Constitutional_monarchy', 'Cougar', 'Millie_Bobby_Brown', 'Rafael_Caro_Quintero', 'Skathi_(moon)', 'Lyndon_B._Johnson', 'Bernese_Mountain_Dog', 'Howard_Stern', 'Cuba', 'Leonardo_da_Vinci', 'Che_Guevara', 'Eddie_Murphy', 'Non-fungible_token', 'Email', 'Malcolm_McDowell', 'The_Legend_of_Zelda', 'LVMH', 'Andrea_Bocelli', 'CoronaVac', 'Grimes_(musician)', 'Discord_(software)', 'Javier_Bardem', 'Kama_Sutra', 'La_Liga', 'Lupus', 'MF_Doom', 'John_Legend', 'Equal_Rights_Amendment', 'Lou_Reed', 'List_of_tallest_buildings', 'New_York_City', 'Mr._&_Mrs._Smith_(2005_film)', 'Manchester_United_F.C.', 'Evan_Rachel_Wood', 'Rotten_Tomatoes', 'Marco_Pierre_White', 'The_Last_of_Us_Part_II', 'Magnum,_P.I.', 'Linda_Ronstadt', 'Jack_Lemmon', 'James_Dean', 'Lionel_Messi', 'Paradise_Lost', 'Rockwell_B-1_Lancer', 'Rogue_One', 'Russell_Crowe', 'Chris_Martin', 'Eli_Cohen', 'Treaty_of_Versailles', 'Chris_Pratt', 'Journey_(band)', 'Assertiveness', 'List_of_Money_Heist_episodes', 'Marie_Antoinette', 'IMDb', 'Mary_I_of_England', 'Ralph_Fiennes', 'Humphrey_Bogart', 'David_Schwimmer', 'The_Terminator', 'Feminism', 'Paul_Simon', 'List_of_best-selling_music_artists', 'Alexandra_Hedison', 'George_Michael', 'Dominican_Republic', 'Falklands_War', 'Johnny_Carson', 'Mount_Everest', 'Barack_Obama', 'Joker_(character)', 'Diana_Ross', 'List_of_Disney+_original_programming', 'Paul_McCartney', 'Eurovision_Song_Contest_2021', 'Brian_Jones', 'Tokugawa_shogunate', 'Korean_War', 'Cowboy_Bebop', 'Rocky', 'The_Matrix_Resurrections', 'Alexandria_Ocasio-Cortez', 'For_All_Mankind_(TV_series)', 'Moon_Knight', 'Tom_Felton', 'Michael_Somare', 'Jessica_Chastain', 'Saint_Peter', 'Rupert_Grint', 'Labyrinth_(1986_film)', 'Chris_Tucker', 'Battle_of_Culloden', 'Harvard_University', 'Evan_Peters', 'Jessica_Lange', 'Turing_test', 'Charles_Bronson_(prisoner)', 'Dwayne_Johnson', 'Iron_Maiden', 'Sidney_Crosby', 'Tim_Berners-Lee', 'Blade_Runner_2049', 'Antonio_Banderas', 'Gone_Girl_(film)', 'The_Martian_(film)', 'X-Men_(film_series)', 'Minecraft', 'Zachary_Levi', 'Pig', 'List_of_European_Cup_and_UEFA_Champions_League_finals', 'Pierre-Emerick_Aubameyang', 'John_D._Rockefeller', 'Don_Ameche', 'Inception', 'Mansoor_Ali_Khan_Pataudi', 'Olivia_Newton-John', 'Killer_whale', 'Democracy_Index', 'Alexander_Hamilton', 'Academy_Award_for_Best_Actor', 'Deutsche_Welle', 'Assam', 'Trainspotting_(film)', 'McDonald\'s', 'Jared_Harris', 'Benicio_del_Toro', 'List_of_highest_mountains_on_Earth', 'Haile_Selassie', 'Thor_(film)', 'Facebook,_Inc.', 'Melissa_McCarthy', 'Parkinson\'s_disease', 'Casino_Royale_(2006_film)', 'Volleyball', 'Supergirl_(TV_series)', 'English_language', 'Royal_Navy', 'Jerry_Lee_Lewis', 'Maggie_Smith', 'Billie_Jean_King', 'Commonwealth_of_Nations', 'TLC_(group)', 'Karl_Malone', 'Riven_Rock,_Montecito', 'Guy_Pearce', 'George_Soros', 'Selena_Gomez', 'Ada_Lovelace', 'Christopher_Lee', 'LeBron_James', 'Aung_San_Suu_Kyi', 'Constitution_of_India', 'Indian_Premier_League', 'Chris_Cornell', 'Married..._with_Children', 'Adidas', '2008_United_States_presidential_election', '2014_FIFA_World_Cup', 'William_Shakespeare', 'Ajith_Kumar', 'International_Phonetic_Alphabet', 'Coronavirus_disease_2019', 'O._J._Simpson', 'Burgess_Meredith', 'Grace_Jones', 'Mercury_(planet)', 'Dharmendra', 'Mexico', 'Queen_(band)', 'Tim_Daly', 'Oscar_Pistorius', 'United_Nations', 'British_nobility', 'Lance_Armstrong', 'Charlie_Chaplin', 'Badminton', '2010_FIFA_World_Cup', 'Bradley_Cooper', 'Mahabharata', 'Lindsay_Lohan', 'Kirk_Douglas', 'Alex_Trebek', 'Anthony_Eden', 'Jimmy_Fallon', 'White_people', 'Ronaldinho', 'Prince_Henry,_Duke_of_Gloucester', 'Kate_Spade', 'Jennifer_Lawrence', 'Craig_Ferguson', 'Henry_II_of_England', 'Studio_Ghibli', 'Kevin_Smith', 'The_Three_Stooges', 'Moneyball_(film)', 'Grand_Slam_(tennis)', 'Henry_Fonda', 'Jyotirlinga', 'Fantastic_Four_(2015_film)', 'Seppuku', 'Gone_with_the_Wind_(film)', '2011_Tōhoku_earthquake_and_tsunami', 'Manhattan', 'Prometheus_(2012_film)', 'Fundamental_rights_in_India', 'Fahrenheit_451', 'Prince_George,_Duke_of_Kent', 'Josh_Hawley', 'The_Intouchables', 'Bon_Jovi', 'Al_Capone', 'Justin_Trudeau', 'Hedy_Lamarr', 'Madagascar', 'Coen_brothers', 'Brandy_Norwood', 'Pulp_Fiction', 'Poland', 'Layne_Staley', 'Joan_Cusack', 'Jim_Morrison', 'Hip_hop_music', 'Netflix', 'Mediacorp', 'Loki', 'Fred_Rogers', 'Enrique_Iglesias', 'Monica_Rambeau', 'The_Real_World_(TV_series)', 'Jane_Seymour', 'List_of_Bollywood_films_of_2020', 'Paul_Newman', 'Suicide_methods', 'Invictus_(film)', 'Caucasian_race', 'List_of_Bollywood_films_of_2021', 'Peter_Jackson', 'Dennis_Hopper', '12_Years_a_Slave_(film)', 'Joseph_Stalin', 'Cellulitis', '4chan', 'George_Lucas', 'Gloria_Steinem', 'Will.i.am', 'The_Lord_of_the_Rings', 'Rita_Hayworth', 'George_Clooney', 'Jennifer_Aniston', 'Mother\'s_Day', 'Alice_in_Chains', '2000_United_States_presidential_election', 'Bundesliga', 'Aladdin_(2019_film)', 'List_of_Star_Trek_films_and_television_series', 'Carl_Sagan', 'R._Kelly', 'Joseph_Goebbels', '1992_United_States_presidential_election', 'Vikings_(2013_TV_series)', '2004_Indian_Ocean_earthquake_and_tsunami', 'Al_Franken', '123Movies', 'Stan_Laurel', 'Shrek', 'Martin_Freeman', 'Wilhelm_II,_German_Emperor', 'List_of_states_and_territories_of_the_United_States', 'Tyrannosaurus', 'Dikembe_Mutombo', 'Emmanuel_Macron', 'Fast_&_Furious', 'Arnold_Schwarzenegger', 'Mars', 'Chelsea_F.C.', 'Rudy_Giuliani', 'List_of_countries_by_GDP_(nominal)', 'Cunnilingus', 'Allison_Stokke', 'Benzodiazepine', 'Leonardo_DiCaprio', 'Rudyard_Kipling', 'Academy_Awards', 'Logan_Paul', 'Grover_Cleveland', 'Johnny_Cash', 'Madhuri_Dixit', 'The_Wire', 'List_of_films_considered_the_best', 'Shiva', 'Intelligence_quotient', 'The_Departed', 'Steve_Irwin', 'Henry_Ford', 'Bear_Grylls', 'The_French_Dispatch', 'House_of_Windsor', 'Golden_ratio', 'Nancy_Sinatra', 'Cricket', 'Julius_Caesar', 'House_(TV_series)', 'Capybara', 'Paul_Williams_(songwriter)', 'Puerto_Rico', 'Cast_Away', 'Jeanne_Calment', 'The_Princess_Bride_(film)', 'Fran_Lebowitz', 'George_R._R._Martin', 'Ziggurat_of_Ur', 'Tracy_Chapman', 'Forest_Whitaker', 'Rohit_Sharma', 'Uyghur_genocide', 'Prince_Edward,_Duke_of_Kent', 'Avengers_(comics)', 'Starbucks', 'List_of_cities_in_India_by_population', 'José_Rizal', 'The_Little_Mermaid_(upcoming_film)', 'Kristin_Chenoweth', 'List_of_musical_symbols', 'Laura_Prepon', 'Ethereum', 'Morgan_Freeman', 'Critics\'_Choice_Movie_Awards', 'Ron_DeSantis', 'Dunkirk_(2017_film)', 'Harry_Belafonte', 'Fifty_Shades_of_Grey_(film)', 'List_of_amendments_to_the_United_States_Constitution', 'Janet_Yellen', 'Chronostasis', 'Fyre_Festival', 'James_Bond', 'Mariana_Trench', 'Member_states_of_the_Commonwealth_of_Nations', 'Mandy_Patinkin', 'Lamborghini', 'Oswald_Mosley', 'Commonwealth_Day', 'Burqa', 'Tommy_Lee', 'NCIS_(TV_series)', 'Steely_Dan', 'M*A*S*H_(TV_series)', 'Paul_Hogan', 'Armand_Duplantis', 'Michael_B._Jordan', 'Milgram_experiment', 'Lucille_Ball', 'Golden_Retriever', 'Pornography', 'Google_Scholar', 'Hulkling', 'Glenn_Close', 'Monaco', 'Boy_George', 'Dr._Dre', 'Ugly_Betty', 'Legion_(TV_series)', 'President_of_the_United_States', 'Dean_Martin', 'Hacksaw_Ridge', 'The_Troubles', 'Judi_Dench', 'Saint_Patrick', 'Starship_Troopers_(film)', 'The_Suicide_Squad_(film)', 'Emilio_Estevez', 'List_of_programmes_broadcast_by_StarPlus', 'William_Wallace', 'Rollo', 'Lewis_Hamilton', 'Variance', 'Statue_of_Unity', 'British_Empire', 'Viggo_Mortensen', 'Northwest_Passage', 'Kosovo', 'Tommy_Wiseau', 'Kristen_Wiig', 'Atlanta', 'Chico_Marx', 'Game_of_Thrones', 'Alfred_Hitchcock', 'Google_Docs', 'Cole_Sprouse', 'Zodiac', 'Scorpio_(astrology)', 'Vaccine', 'Adam_Brody', 'Eric_Stonestreet', 'Jimmy_Kimmel', 'The_Cat_in_the_Hat', 'Ratatouille_(film)', 'Intersex', 'McDonnell_Douglas_F-15_Eagle', 'Nicki_Minaj', 'Anne,_Princess_Royal', 'Gisele_Bündchen', 'Cambodia', 'Nintendo', 'Gilmore_Girls', 'Fibromyalgia', 'The_Incredible_Hulk_(film)', 'Syria', 'Looney_Tunes', 'Famke_Janssen', 'Sunny_Deol', 'Impostor_syndrome', 'French_Revolution', 'RNA_vaccine', 'Eric_Rudolph', 'Vivien_Leigh', 'James_Harden', 'Hinduism', 'Vulva', 'Bahrain', 'Triangle_Shirtwaist_Factory_fire', 'Darkseid', 'Paul_Giamatti', 'Eyes_Wide_Shut', 'Flo_Rida', 'Cain_and_Abel', 'Vincent_van_Gogh', 'Louis_C.K.', 'Myers–Briggs_Type_Indicator', 'Google_Chrome', '2021_in_film', 'South_Korea', 'Requiem_for_a_Dream', 'List_of_most-viewed_YouTube_videos', 'Mithali_Raj', 'The_Ipcress_File_(film)', 'Saw_(franchise)', 'Solar_System', 'Peppa_Pig', 'Jean-Michel_Basquiat', 'Dylan_O\'Brien', 'Anderson_Cooper', 'List_of_Netflix_original_programming', 'Wonder_Woman_(2017_film)', 'OSI_model', 'Swastika', 'Bulgaria', 'Backstreet_Boys', 'Lupita_Nyong\'o', 'Georgia_Guidestones', 'Selma_Blair', 'Republican_Party_(United_States)', 'Nelson_Mandela', 'Scottish_Premiership', 'Michael_Jackson', 'Xi_Jinping', 'Neanderthal', 'Jupiter', 'Mike_Tyson', 'Noam_Chomsky', '2019_United_Kingdom_general_election', 'Descendants_of_the_Sun', 'New_Zealand', 'Israel', 'Barbra_Streisand', 'The_Many_Saints_of_Newark', 'Cardi_B', 'Carole_King', 'Andy_Warhol', 'John_McCain', 'Sino-Indian_War', 'Malaysia', 'Martin_Scorsese', 'Ultimate_Fighting_Championship', 'Omar_Sy', 'The_Last_Supper_(Leonardo)', 'Gandhi_(film)', 'James_II_of_England', 'The_Good,_the_Bad_and_the_Ugly', 'Matthew_Shepard', 'Kate_Winslet', 'Warner_Bros.', 'Carol_Burnett', 'Mount_Etna', 'George_H._W._Bush', 'Operation_Northwoods', 'The_Grand_Budapest_Hotel', 'Sam_Taylor-Johnson', 'Georgia_(country)', 'Gordon_B._Hinckley', 'Apartheid', 'AK-47', 'Cat_Stevens', 'Charlton_Heston', 'Ketogenic_diet', 'Isaac_Asimov', 'Mercedes-Benz', 'Grace_Kelly', 'Inuit', 'Periodic_table', 'Scotland', 'The_Witcher', 'Magneto_(Marvel_Comics)', 'Eiffel_Tower', 'Frank_Sinatra', 'Google_Translate', 'Miles_Davis', 'Simon_Pegg', 'Peter_Gabriel', 'Watergate_scandal', 'Richard_Gere', 'Dyslexia', 'To_Kill_a_Mockingbird', 'List_of_metropolitan_statistical_areas', 'PayPal', 'Wayne_Brady', 'Gal_Gadot', 'Ron_Howard', 'RuPaul\'s_Drag_Race_Down_Under', 'Battle_of_the_Bulge', 'Final_Fantasy', 'Matt_Damon', 'Herbert_Hoover', 'Naomi_Watts', 'Mormons', 'Monica_Lewinsky', 'Empire_of_the_Sun_(film)', 'Phoebe_Waller-Bridge', '1989_Tiananmen_Square_protests', 'Ohio', 'Opossum', 'Caroline_Kennedy', 'Quantum_computing', 'ZZ_Top', 'XXX_(2002_film)', 'Vice_President_of_the_United_States', 'Vasa_(ship)', 'Ian_McKellen', 'Spanish_flu', 'Portugal', 'Brown_bear', 'Edward_I_of_England', 'Benjamin_Netanyahu', 'Apep', 'Mark_Ruffalo', 'America_Ferrera', 'Fyodor_Dostoevsky', 'Bigfoot', 'India', '93rd_Academy_Awards', 'Sandra_Day_O\'Connor', 'Zhang_Ziyi', 'Rajneesh', 'Charles_II_of_England', 'Joseph_Smith', 'Germany', 'Moldavite', 'P._V._Sindhu', 'Casey_Affleck', 'George_I_of_Great_Britain', 'Burj_Khalifa', 'Byzantine_Empire', 'Amanda_Gorman', 'Beowulf', 'Stockholm_syndrome', 'A_Beautiful_Mind_(film)', 'The_Mamas_&_the_Papas', 'Average_human_height_by_country', 'Māori_people', 'Richard_III_of_England', 'John_Lithgow', 'Saint_Petersburg', 'Martin_Sheen', 'Valerie_Bertinelli', 'Mick_Jagger', 'Iraq_War', 'Dalai_Lama', 'Roy_Orbison', 'Tom_and_Jerry', 'Switzerland', 'Tina_Turner', 'Amazon_(company)', 'Louis_XIV', 'The_Dark_Knight_Rises', 'Kelly_Clarkson', 'The_Sopranos', 'Eastern_Time_Zone', 'Courtney_Love', 'Patrick_J._Kennedy', 'Polymerase_chain_reaction', 'Proud_Boys', 'The_Invisible_Man_(2020_film)', 'Mark_Zuckerberg', 'Phil_Collins', 'Strawberry', '2021_Myanmar_coup_d\'état', 'Dennis_Rodman', 'The_Marvelous_Mrs._Maisel', 'Nikita_Khrushchev', 'Europe', 'Legality_of_cannabis_by_U.S._jurisdiction', 'Chernobyl_disaster', 'Adolf_Eichmann', 'Wonder_Woman', 'Call_Me_by_Your_Name_(film)', 'David', 'Meghan,_Duchess_of_Sussex', 'Arnab_Goswami', 'Alicia_Vikander', 'Comfort_women', 'Billie_Eilish', 'David_Bowie', 'Rebecca_Romijn', 'Blockchain', 'The_Pirate_Bay', 'South_Park', 'Sudden_arrhythmic_death_syndrome', 'Jaggi_Vasudev', 'Zack_Snyder\'s_Justice_League', 'Area_51', 'Thomas_Sowell', 'Bunny_Wailer', 'Fargo_(TV_series)', 'FIFA_World_Cup', 'Alfred_the_Great', 'Modern_Family', 'Hrithik_Roshan', 'God_of_War_(franchise)', 'Gilligan\'s_Island', 'Terence_Stamp', 'Christianity', 'Indian_Air_Force', 'Doctor_Who', 'Wilt_Chamberlain', 'Matt_Dillon', 'Mitt_Romney', 'Chappelle\'s_Show', 'Leviathan', 'Paula_Abdul', 'Cary_Grant', 'Braveheart', 'Jada_Pinkett_Smith', 'Pokémon_(video_game_series)', 'Planet_of_the_Apes', 'Mark_Thatcher', 'Type_A_and_Type_B_personality_theory', 'Pokémon', 'John_Bonham', 'The_Big_Bang_Theory', 'Friends', 'Gemma_Chan', 'Errol_Flynn', 'Martha_Stewart', 'Pulmonary_embolism', 'Saving_Private_Ryan', 'Olivia_Wilde', 'New_Kids_on_the_Block', 'OPEC', 'Moonlight_(2016_film)', 'Martin_Lawrence', 'S&P_500', 'Donald_Trump', 'Edward_Norton', 'Royal_Households_of_the_United_Kingdom', 'Eurofighter_Typhoon', 'Carom_billiards', 'Prince_Michael_of_Kent', 'Sarah_Jessica_Parker', 'The_Matrix_Reloaded', 'Francisco_Franco', 'Telegram_(software)', 'Rwandan_genocide', 'David_Niven', '2004_United_States_presidential_election', 'Evil_eye', 'Khmer_Rouge', 'Yemen', 'Danny_DeVito', 'James_Stewart', 'Syd_Barrett', 'Gabapentin', 'Doctor_Strange_(2016_film)', 'List_of_countries_by_GDP_(nominal)_per_capita', 'Crispin_Glover', 'List_of_national_parks_of_the_United_States', 'Vin_Diesel', 'Gross_domestic_product', 'Longest_word_in_English', 'Missouri', 'Elizabeth_I', 'Celtic_F.C.', 'Coco_(2017_film)', 'Elizabeth_Banks', 'Kamala_Khan', 'The_Social_Network', 'Magnus_Carlsen', 'Google_Forms', 'Mirage', 'Nero', 'Tuskegee_Syphilis_Study', 'Brunei', 'William_H._Macy', 'Operation_Market_Garden', 'Rashtriya_Swayamsevak_Sangh', 'Dunning–Kruger_effect', 'Jon_Voight', 'Myanmar', 'Atomic_bombings_of_Hiroshima_and_Nagasaki', 'Franklin\'s_lost_expedition', 'Carrara_marble', 'The_Lion_King_(2019_film)', 'Mariah_Carey', 'Masturbation', 'Sleep_paralysis', 'Canadian_Broadcasting_Corporation', 'Susan_B._Anthony', 'Yugoslavia', 'Homeland_(TV_series)', 'List_of_highest-grossing_films', 'Polycystic_ovary_syndrome', 'Brexit', 'Ship_of_Theseus', 'United_States_Senate', 'Andrew_Garfield', 'Ruby_Ridge', 'Band_of_Brothers_(miniseries)', 'Jimmy_Floyd_Hasselbaink', 'Fran_Drescher', 'Josephine_Baker', 'Katrina_Kaif', 'Lobotomy', 'Dua_Lipa', 'Zoom_Video_Communications', 'Zamfara_kidnapping', 'Mohanlal', 'Prince_Richard,_Duke_of_Gloucester', 'Gene_Simmons', 'Cold_War', 'Venus', 'Democracy', 'Eduardo_Saverin', 'Talking_Heads', 'Instagram', 'Death_of_Diana,_Princess_of_Wales', 'Singapore', '2020_in_film', 'Narcissism', 'Melania_Trump', 'Zendaya', 'Ian_Holm', 'Jack_the_Ripper', 'Green_Book_(film)', 'Romania', 'Boeing_B-52_Stratofortress', 'Benedict_Arnold', 'Qigong', 'Hayao_Miyazaki', 'List_of_best-selling_books', 'David_Beckham', 'Space_Shuttle_Challenger_disaster', 'Sacha_Baron_Cohen', 'Black_Sabbath', 'Archangel', 'Rose_McGowan', 'EFL_Championship', '2020_United_States_presidential_election', 'Adobe_Photoshop', 'Adam_Sandler', 'Francis_Crozier', 'List_of_female_billionaires', 'Robert_Plant', 'Felicity_Jones', 'Onward_(film)', 'Waylon_Jennings', 'United_States', 'Nora_Fatehi', 'Charles_Manson', 'United_States_House_of_Representatives', 'Tsunami', 'Vanessa_Redgrave', 'Mario_Cuomo', 'LGBT', 'YouTube', 'Sengoku_period', 'Alan_Arkin', 'Final_Fantasy_VII', 'List_of_highest-grossing_Indian_films', 'One-Punch_Man', 'Machu_Picchu', 'Starship_development_history', 'Everton_F.C.', 'Prince_of_Wales', 'Bhagavad_Gita', 'Red_Dead_Redemption_2', 'Lucifer_(TV_series)', 'Cultural_Revolution', 'Nigel_Farage', 'Blackpink', 'Idris_Elba', 'International_Men\'s_Day', 'Hank_Azaria', 'China_Global_Television_Network', 'The_Catcher_in_the_Rye', 'List_of_most_expensive_paintings', 'Theodore_Roosevelt', 'Emma_Stone', 'NATO_phonetic_alphabet', 'Borat', 'Fight_Club', 'Sade_(singer)', 'Scandal_(TV_series)', 'Hulu', 'Israel_Kamakawiwoʻole', 'Julia_Child', 'Robert_Pattinson', 'Daniel_Dae_Kim', 'List_of_ATP_number_1_ranked_singles_tennis_players', 'Alcubierre_drive', 'List_of_best-selling_video_games', 'CRISPR', 'Francis_II_of_France', 'Serie_A', 'Komodo_dragon', 'M._Night_Shyamalan', 'American_Dad!', 'Ready_Player_One_(film)', 'Gregory_Peck', 'Amish', 'Lord\'s_Prayer', 'Shania_Twain', 'Rabies', 'David_Cameron', 'Bill_Clinton', 'HTML', 'Amal_Clooney', 'Sharon_Osbourne', 'Indian_Space_Research_Organisation', 'Johnny_Depp', 'Zlatan_Ibrahimović', 'Demographics_of_the_United_States', 'Jackie_Robinson', 'Tramadol', 'Facebook', 'Hugo_Weaving', 'Hungary', 'Robert_De_Niro', 'Prince_William,_Duke_of_Cambridge', 'Tom_Petty', 'Diarrhea', 'Beastie_Boys', 'Octopus', 'Trevor_Noah', 'Spud_Webb', 'Nicolas_Cage', 'International_Space_Station', 'Tom_Hayden', 'Outlook.com', 'Ruhollah_Khomeini', 'Premier_League', 'Carrie_Fisher', 'List_of_Indian_states_and_union_territories_by_GDP', 'Egypt', 'Kombucha', 'Frank_Zappa', 'Gorr_the_God_Butcher', 'Catherine_of_Aragon', 'Octavia_E._Butler', 'John_Franklin', 'Swami_Vivekananda', 'A_Fish_Called_Wanda', 'Graham_Norton', 'Saina_Nehwal', 'Zero_Dark_Thirty', 'Indira_Gandhi', 'Ivy_League', 'John_Quincy_Adams', 'List_of_English_monarchs', 'Ciara', 'This_Is_Spinal_Tap', 'Moby-Dick', 'James_Gunn', 'Cloud_computing', 'Marcus_Aurelius', 'Bosnia_and_Herzegovina', 'Valhalla', 'Oscar_Wilde', 'Sam_Cooke', 'Shinee', 'Rupert_Murdoch', 'Toy_Story_4']));
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
var $author$project$Model$NoOp = {$: 15};
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
			_Json_emptyObject(0),
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
	var seedStrChosen = model.a.M;
	var toast = $author$project$Main$makeToast('game seed is: ' + seedStrChosen);
	var numDestsChosen = model.a.I;
	var signalPeers = model.a.f ? $author$project$PeerPort$sendData(
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
			{x: _List_Nil, R: loadingDests, ah: numDestsChosen, S: seedStrChosen, h: $author$project$Model$Preview}),
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
	if (dest.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Model$doneLoading = $elm$core$List$all($author$project$Model$destIsLoaded);
var $author$project$Model$emptyPeer = {bi: '', P: false, f: false, H: '', t: _List_Nil, E: 0, bH: '', g: 0};
var $author$project$Model$extractLoadedDestinations = function (loads) {
	extractLoadedDestinations:
	while (true) {
		if (loads.b) {
			if (loads.a.$ === 1) {
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
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
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
						$elm$json$Json$Encode$int(peer.g)),
						_Utils_Tuple2(
						'username',
						$elm$json$Json$Encode$string(peer.bH)),
						_Utils_Tuple2(
						'isHost',
						$elm$json$Json$Encode$bool(peer.f)),
						_Utils_Tuple2(
						'finished',
						$elm$json$Json$Encode$bool(peer.P)),
						_Utils_Tuple2(
						'lastDest',
						$elm$json$Json$Encode$string(peer.H))
					]));
		};
		var encodeInfo = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'seed',
					$elm$json$Json$Encode$string(info.al)),
					_Utils_Tuple2(
					'numDestinations',
					$elm$json$Json$Encode$int(info.I)),
					_Utils_Tuple2(
					'peers',
					A2($elm$json$Json$Encode$list, encodePeer, info.i)),
					_Utils_Tuple2(
					'started',
					$elm$json$Json$Encode$bool(info.bA))
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
		return {$: 0, a: a, b: b};
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
					$elm$json$Json$Encode$string($.bg)),
					_Utils_Tuple2(
					'isHost',
					$elm$json$Json$Encode$bool($.f)),
					_Utils_Tuple2(
					'username',
					$elm$json$Json$Encode$string($.bH)),
					_Utils_Tuple2(
					'uuid',
					$elm$json$Json$Encode$int($.g))
				]));
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
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
	return {$: 1, a: a};
};
var $author$project$Model$replaceWithLoaded = F2(
	function (dest, loadingDests) {
		if (loadingDests.b) {
			if (!loadingDests.a.$) {
				var title = loadingDests.a.a;
				var rest = loadingDests.b;
				return _Utils_eq(dest.q, title) ? A2(
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
		if (dict.$ === -2) {
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
	var signalPeers = model.a.f ? $author$project$PeerPort$sendData(
		$author$project$PeerPort$newGame(model.a.bH + ' wants a new game')) : $elm$core$Platform$Cmd$none;
	var newPeerDict = function () {
		var resetPeer = function (peer) {
			return _Utils_update(
				$author$project$Model$emptyPeer,
				{f: peer.f, bH: peer.bH, g: peer.g});
		};
		return A2(
			$elm$core$Dict$map,
			F2(
				function (_v1, p) {
					return resetPeer(p);
				}),
			model.i);
	}();
	var newGameState = {z: _List_Nil, t: _List_Nil, L: _List_Nil, E: 0};
	var resetModel = _Utils_update(
		model,
		{x: _List_Nil, Q: false, n: newGameState, R: _List_Nil, i: newPeerDict, S: '', h: $author$project$Model$Preview});
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
	var _v0 = model.x;
	if (_v0.b) {
		var start = _v0.a;
		var destinations = _v0.b;
		var startReachSignal = $author$project$PeerPort$sendData(
			A2($author$project$PeerPort$titleReach, model.a.g, start.q));
		var startGameSignal = model.a.f ? $author$project$PeerPort$sendData(
			$author$project$PeerPort$gameStarted(model.a.bH + ' started the game')) : $elm$core$Platform$Cmd$none;
		var gameState = {
			z: _List_fromArray(
				[start]),
			t: _List_fromArray(
				[start]),
			L: destinations,
			E: 0
		};
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					Q: true,
					n: gameState,
					h: $author$project$Model$InPage(start)
				}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[$author$project$Main$transition, startGameSignal, startReachSignal])));
	} else {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					h: $author$project$Model$Bad('Can\'t start game with 0 destinations')
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
			case 7:
				var options = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a: options}),
					$elm$core$Platform$Cmd$none);
			case 8:
				var opts = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ah: opts.bt, S: opts.al}),
					$elm$core$Platform$Cmd$none);
			case 5:
				return $author$project$Main$startGame(model);
			case 1:
				if (!msg.b.$) {
					var page = msg.b.a;
					var newLoadingDests = A2($author$project$Model$replaceWithLoaded, page, model.R);
					var allDestsLoaded = $author$project$Model$doneLoading(newLoadingDests);
					var newDests = allDestsLoaded ? $author$project$Model$extractLoadedDestinations(newLoadingDests) : model.x;
					var newModel = _Utils_update(
						model,
						{x: newDests, R: newLoadingDests});
					return (model.Q && allDestsLoaded) ? $author$project$Main$startGame(newModel) : _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
				} else {
					var title = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								h: $author$project$Model$Bad('Ran into issue getting description for ' + title)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 0:
				if (!msg.b.$) {
					var page = msg.b.a;
					var state = model.n;
					var signalTitleReached = $author$project$PeerPort$sendData(
						A2($author$project$PeerPort$titleReach, model.a.g, page.q));
					var newPath = A2($elm$core$List$cons, page, model.n.t);
					var signalGameFinished = $author$project$PeerPort$sendData(
						A3(
							$author$project$PeerPort$gameFinish,
							model.a.g,
							A2(
								$elm$core$List$map,
								function ($) {
									return $.q;
								},
								newPath),
							state.E));
					var _v1 = state.L;
					if (_v1.b) {
						var dest = _v1.a;
						var restOfDests = _v1.b;
						var newGameState = _Utils_eq(page.q, dest.q) ? _Utils_update(
							state,
							{
								z: A2($elm$core$List$cons, dest, state.z),
								t: newPath,
								L: restOfDests
							}) : _Utils_update(
							state,
							{t: newPath});
						var isPathCompleted = _Utils_eq(page.q, dest.q) && $elm$core$List$isEmpty(restOfDests);
						return isPathCompleted ? _Utils_Tuple2(
							_Utils_update(
								model,
								{
									n: newGameState,
									h: $author$project$Model$Review(model.a.g)
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[signalGameFinished, signalTitleReached, $author$project$Main$transition]))) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									n: newGameState,
									h: $author$project$Model$InPage(page)
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[signalTitleReached, $author$project$Main$transition])));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $author$project$Model$Bad('Why are we out of destinations?')
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					var title = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								h: $author$project$Model$Bad('Http error while fetching ' + title)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 2:
				var title = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							h: $author$project$Model$Fetching(title)
						}),
					$author$project$Main$getPage(title));
			case 9:
				var state = model.n;
				var _v2 = state.t;
				if (_v2.b && _v2.b.b) {
					var currentPage = _v2.a;
					var _v3 = _v2.b;
					var prevPage = _v3.a;
					var rest = _v3.b;
					if (_Utils_eq(
						$elm$core$List$head(state.t),
						$elm$core$List$head(state.z))) {
						var newState = _Utils_update(
							state,
							{
								z: A3(
									$author$project$Helpers$popBy,
									function ($) {
										return $.q;
									},
									currentPage,
									state.z),
								t: A2($elm$core$List$cons, prevPage, rest),
								L: A2($elm$core$List$cons, currentPage, state.L)
							});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									n: newState,
									h: $author$project$Model$InPage(prevPage)
								}),
							$author$project$Main$transition);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									n: _Utils_update(
										state,
										{
											t: A2($elm$core$List$cons, prevPage, rest)
										}),
									h: $author$project$Model$InPage(prevPage)
								}),
							$author$project$Main$transition);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 10:
				var state = model.n;
				var newState = _Utils_update(
					state,
					{E: state.E + 1});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{n: newState}),
					$elm$core$Platform$Cmd$none);
			case 15:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 4:
				if (_Utils_eq(model.S, model.a.M)) {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var options = model.a;
					var newModel = _Utils_update(
						model,
						{
							a: _Utils_update(
								options,
								{M: model.S})
						});
					return $author$project$Main$createGame(newModel);
				}
			case 3:
				var flag = msg.a;
				if ($elm$core$String$isEmpty(model.a.bH)) {
					return _Utils_Tuple2(
						model,
						$author$project$Main$makeToast('You must give a username!'));
				} else {
					if ((!flag.f) && $elm$core$String$isEmpty(model.a.aa)) {
						return _Utils_Tuple2(
							model,
							$author$project$Main$makeToast('You have to provide the host\'s game ID to join their game'));
					} else {
						if ($elm$core$String$isEmpty(model.a.aj)) {
							return _Utils_Tuple2(
								model,
								$author$project$Main$makeToast('Your socket connection hasn\'t been initialized. Refresh the page if this issue persists.'));
						} else {
							var newOptions = function () {
								var options = model.a;
								return _Utils_update(
									options,
									{f: flag.f});
							}();
							var initPeerCmd = $author$project$PeerPort$initPeer(
								{bg: model.a.aa, f: flag.f, bH: model.a.bH, g: model.a.g});
							var _v4 = $author$project$Main$createGame(model);
							var previewModel = _v4.a;
							var cmd = _v4.b;
							return flag.f ? _Utils_Tuple2(
								_Utils_update(
									previewModel,
									{
										a: _Utils_update(
											newOptions,
											{aa: ''})
									}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[cmd, initPeerCmd]))) : _Utils_Tuple2(
								_Utils_update(
									model,
									{a: newOptions}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											initPeerCmd,
											$author$project$Main$makeToast('attempting to join game...')
										])));
						}
					}
				}
			case 12:
				var uuid = msg.a;
				var options = model.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							a: _Utils_update(
								options,
								{g: uuid})
						}),
					$elm$core$Platform$Cmd$none);
			case 14:
				var uuid = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							h: $author$project$Model$Review(uuid)
						}),
					$elm$core$Platform$Cmd$none);
			case 6:
				var peerMsg = $author$project$PeerPort$sendData(
					A3(
						$author$project$PeerPort$gameFinish,
						model.a.g,
						A2(
							$elm$core$List$map,
							function ($) {
								return $.q;
							},
							model.n.t),
						model.n.E));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							h: $author$project$Model$Review(model.a.g)
						}),
					peerMsg);
			case 13:
				return model.a.f ? $author$project$Main$reset(model) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							h: $author$project$Model$Bad('Only hosts can start new games')
						}),
					$elm$core$Platform$Cmd$none);
			default:
				switch (msg.a.$) {
					case 8:
						var id = msg.a.a;
						var options = model.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: _Utils_update(
										options,
										{aj: id})
								}),
							$elm$core$Platform$Cmd$none);
					case 0:
						var _v5 = msg.a;
						var num = _v5.a;
						var seed = _v5.b;
						if (model.a.f) {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										h: $author$project$Model$Bad('Host shouldnt be receiving seedinfo')
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var options = model.a;
							return $author$project$Main$createGame(
								_Utils_update(
									model,
									{
										a: _Utils_update(
											options,
											{I: num, M: seed})
									}));
						}
					case 1:
						var startMsg = msg.a.a;
						if (model.a.f) {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										h: $author$project$Model$Bad('Host shouldnt be receiving game start message')
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
							var allDestsLoaded = $author$project$Model$doneLoading(model.R);
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
									{Q: true}),
								toast);
						}
					case 2:
						var _v8 = msg.a;
						var uuid = _v8.a;
						var title = _v8.b;
						var _v9 = A2($elm$core$Dict$get, uuid, model.i);
						if (!_v9.$) {
							var peer = _v9.a;
							var updatedPeer = function () {
								var newLastDest = A2(
									$elm$core$List$member,
									title,
									A2(
										$elm$core$List$map,
										function ($) {
											return $.q;
										},
										model.x)) ? title : peer.H;
								return _Utils_update(
									peer,
									{bi: title, H: newLastDest});
							}();
							var toast = A2(
								$elm$core$List$member,
								title,
								A2(
									$elm$core$List$map,
									function ($) {
										return $.q;
									},
									model.x)) ? $author$project$Main$makeToast(peer.bH + (' found ' + title)) : $elm$core$Platform$Cmd$none;
							var hostEcho = model.a.f ? $author$project$PeerPort$sendData(
								A2($author$project$PeerPort$titleReach, uuid, title)) : $elm$core$Platform$Cmd$none;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										i: A3($elm$core$Dict$insert, uuid, updatedPeer, model.i)
									}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[hostEcho, toast])));
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					case 4:
						var _v10 = msg.a;
						var peerUsername = _v10.a;
						var peerUUID = _v10.b;
						if (_Utils_eq(peerUUID, model.a.g)) {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						} else {
							var toast = $author$project$Main$makeToast(peerUsername + ' joined the game');
							var peerList = A2(
								$elm$core$List$map,
								function (peer) {
									return {P: peer.P, f: false, H: peer.H, bH: peer.bH, g: peer.g};
								},
								$elm$core$Dict$values(model.i));
							var peerListWithHost = function () {
								var lastDest = A2(
									$elm$core$Maybe$withDefault,
									'',
									A2(
										$elm$core$Maybe$map,
										function ($) {
											return $.q;
										},
										$elm$core$List$head(model.n.z)));
								var finished = function () {
									var _v11 = model.h;
									if (_v11.$ === 4) {
										return true;
									} else {
										return false;
									}
								}();
								return A2(
									$elm$core$List$cons,
									{P: finished, f: true, H: lastDest, bH: model.a.bH, g: model.a.g},
									peerList);
							}();
							var newPeer = _Utils_update(
								$author$project$Model$emptyPeer,
								{bH: peerUsername, g: peerUUID});
							var newPeerDict = A3($elm$core$Dict$insert, peerUUID, newPeer, model.i);
							var hostSendGameInfo = $author$project$PeerPort$sendData(
								A2(
									$author$project$PeerPort$gameInfo,
									peerUUID,
									{I: model.a.I, i: peerListWithHost, al: model.a.M, bA: model.Q}));
							var hostEcho = $author$project$PeerPort$sendData(
								A2($author$project$PeerPort$peerConnect, peerUsername, peerUUID));
							return model.a.f ? _Utils_Tuple2(
								_Utils_update(
									model,
									{i: newPeerDict}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[hostSendGameInfo, hostEcho, toast]))) : _Utils_Tuple2(
								_Utils_update(
									model,
									{i: newPeerDict}),
								toast);
						}
					case 5:
						var uuid = msg.a.a;
						var toast = function () {
							var _v12 = A2(
								$elm$core$Maybe$map,
								function ($) {
									return $.bH;
								},
								A2($elm$core$Dict$get, uuid, model.i));
							if (!_v12.$) {
								var name = _v12.a;
								return $author$project$Main$makeToast(name + ' has left the game');
							} else {
								return $elm$core$Platform$Cmd$none;
							}
						}();
						var newPeerDict = A2($elm$core$Dict$remove, uuid, model.i);
						var hostEcho = model.a.f ? $author$project$PeerPort$sendData(
							$author$project$PeerPort$peerDisconnect(uuid)) : $elm$core$Platform$Cmd$none;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{i: newPeerDict}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[hostEcho, toast])));
					case 6:
						var message = msg.a.a;
						return model.a.f ? _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $author$project$Model$Bad('Host connection was lost... but you\'re the host')
								}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							$author$project$Main$initialModel,
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										$author$project$Main$makeToast(message),
										$author$project$Main$initCmd
									])));
					case 3:
						var _v13 = msg.a;
						var peeruuid = _v13.a;
						var path = _v13.b;
						var time = _v13.c;
						var _v14 = A2($elm$core$Dict$get, peeruuid, model.i);
						if (!_v14.$) {
							var peer = _v14.a;
							var updatedPeer = _Utils_update(
								peer,
								{P: true, t: path, E: time});
							var peerGotToEnd = _Utils_eq(
								A2(
									$elm$core$Basics$composeR,
									$elm$core$List$reverse,
									A2(
										$elm$core$Basics$composeR,
										$elm$core$List$head,
										$elm$core$Maybe$map(
											function ($) {
												return $.q;
											})))(model.x),
								$elm$core$List$head(path));
							var toast = peerGotToEnd ? (peer.bH + ' has finished!') : (peer.bH + ' gave up');
							var hostEcho = model.a.f ? $author$project$PeerPort$sendData(
								A3($author$project$PeerPort$gameFinish, peeruuid, path, time)) : $elm$core$Platform$Cmd$none;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										i: A3($elm$core$Dict$insert, peeruuid, updatedPeer, model.i)
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
					case 10:
						var _v15 = msg.a;
						var uuid = _v15.a;
						var info = _v15.b;
						if (_Utils_eq(uuid, model.a.g)) {
							var options = model.a;
							var hostName = A2(
								$elm$core$Basics$composeR,
								$elm$core$List$filter(
									function ($) {
										return $.f;
									}),
								A2(
									$elm$core$Basics$composeR,
									$elm$core$List$head,
									A2(
										$elm$core$Basics$composeR,
										$elm$core$Maybe$map(
											function ($) {
												return $.bH;
											}),
										$elm$core$Maybe$withDefault('???'))))(info.i);
							var addPeerToDict = F2(
								function (peer, dict) {
									return A3(
										$elm$core$Dict$insert,
										peer.g,
										_Utils_update(
											$author$project$Model$emptyPeer,
											{P: peer.P, f: peer.f, H: peer.H, bH: peer.bH, g: peer.g}),
										dict);
								});
							var newPeerDict = A3($elm$core$List$foldl, addPeerToDict, model.i, info.i);
							var _v16 = $author$project$Main$createGame(
								_Utils_update(
									model,
									{
										a: _Utils_update(
											options,
											{I: info.I, M: info.al}),
										i: newPeerDict
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
					case 11:
						var errorString = msg.a.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									h: $author$project$Model$Bad(errorString)
								}),
							$elm$core$Platform$Cmd$none);
					case 9:
						var err = msg.a.a;
						return _Utils_Tuple2(
							model,
							$author$project$Main$makeToast(err));
					default:
						var str = msg.a.a;
						var toast = $author$project$Main$makeToast(str);
						var _v17 = $author$project$Main$reset(model);
						var newModel = _v17.a;
						var cmd = _v17.b;
						return _Utils_Tuple2(
							newModel,
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[cmd, toast])));
				}
		}
	});
var $author$project$Model$ChangeOptsWhileInPreview = function (a) {
	return {$: 8, a: a};
};
var $author$project$Model$ClickedNewGame = {$: 13};
var $author$project$Model$GiveUp = {$: 6};
var $author$project$Model$GoBack = {$: 9};
var $author$project$Model$Refresh = {$: 4};
var $author$project$Model$ReviewPlayer = function (a) {
	return {$: 14, a: a};
};
var $author$project$Model$StartGame = {$: 5};
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
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
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
var $elm$html$Html$label = _VirtualDom_node('label');
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
	return {$: 0, a: a};
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
	return {$: 1, a: a};
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
var $author$project$Helpers$Right = 2;
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
		case 1:
			var name = node.a;
			var attrs = node.b;
			var children = node.c;
			return A3(
				$elm$html$Html$node,
				name,
				A2($elm$core$List$map, $hecrj$html_parser$Html$Parser$Util$toAttribute, attrs),
				$hecrj$html_parser$Html$Parser$Util$toVirtualDom(children));
		case 0:
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
			switch (dir) {
				case 0:
					return '&uarr;';
				case 1:
					return '&darr;';
				default:
					return '&rarr;';
			}
		}();
		var _v0 = $hecrj$html_parser$Html$Parser$run('<span style=\"font-size: ' + (em + (';\">' + (code + '</span>'))));
		if (!_v0.$) {
			var nodes = _v0.a;
			var _v1 = $elm$core$List$head(
				$hecrj$html_parser$Html$Parser$Util$toVirtualDom(nodes));
			if (!_v1.$) {
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
	return A2($author$project$Helpers$arrow, 2, size);
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
			if (dict.$ === -2) {
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
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Helpers$maxBy = F2(
	function (f, data) {
		var g = F2(
			function (item, mitem) {
				if (!mitem.$) {
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
var $author$project$Helpers$maxesBy = F2(
	function (f, data) {
		var _v0 = A2($author$project$Helpers$maxBy, f, data);
		if (!_v0.$) {
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
						return $.ab;
					},
					A2($elm$core$Basics$composeR, $elm$core$List$length, $elm$core$Basics$negate)),
				A2(
					$elm$core$List$filter,
					function (s) {
						return _Utils_eq(
							$elm$core$List$head(s.ab),
							$elm$core$Maybe$Just(from)) && _Utils_eq(
							$author$project$Helpers$last(s.ab),
							$elm$core$Maybe$Just(to));
					},
					segs));
		};
		return A2(
			$elm$core$List$concatMap,
			best,
			$author$project$Helpers$sliding2(dests));
	});
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
											$elm$html$Html$text(seg.bH + ' : ')
										])),
									A2(
									$elm$html$Html$span,
									_List_Nil,
									A2(
										$elm$core$List$intersperse,
										$author$project$Helpers$rightarrow(1),
										A2(
											$elm$core$List$map,
											$author$project$Views$viewLink(dests),
											seg.ab)))
								])))
					]));
		};
		var getSegments = function (player) {
			return A2(
				$elm$core$List$map,
				function (path) {
					return {
						ab: $elm$core$List$reverse(path),
						bH: player.bH
					};
				},
				A2(
					$author$project$Helpers$segments,
					function (x) {
						return A2($elm$core$List$member, x, dests);
					},
					player.t));
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
	return {$: 2, a: a};
};
var $author$project$Helpers$attr2htmlattr = function (_v0) {
	var prop = _v0.a;
	var val = _v0.b;
	return A2($elm$html$Html$Attributes$attribute, prop, val);
};
var $author$project$Views$viewNode = function (n) {
	_v0$9:
	while (true) {
		switch (n.$) {
			case 1:
				switch (n.a) {
					case 'a':
						if (n.b.b && (n.b.a.a === 'href')) {
							var _v1 = n.b;
							var _v2 = _v1.a;
							var link = _v2.b;
							var attrs = _v1.b;
							var children = n.c;
							return (A2($elm$core$String$startsWith, '/wiki/File:', link) || A2($elm$core$String$startsWith, '/wiki/Special:', link)) ? A2(
								$elm$html$Html$a,
								A2($elm$core$List$map, $author$project$Helpers$attr2htmlattr, attrs),
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
									A2($elm$core$List$map, $author$project$Helpers$attr2htmlattr, attrs)),
								A2($elm$core$List$map, $author$project$Views$viewNode, children)) : A2(
								$elm$html$Html$a,
								A2($elm$core$List$map, $author$project$Helpers$attr2htmlattr, attrs),
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
													A2($elm$core$List$map, $author$project$Helpers$attr2htmlattr, attrs)),
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
															A2($elm$core$List$map, $author$project$Helpers$attr2htmlattr, attrs))),
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
									A2($elm$core$List$map, $author$project$Helpers$attr2htmlattr, attrs)),
								A2($elm$core$List$map, $author$project$Views$viewNode, children));
						} else {
							break _v0$9;
						}
					case 'sup':
						return $elm$html$Html$text('');
					default:
						break _v0$9;
				}
			case 0:
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
		A2($elm$core$List$map, $author$project$Helpers$attr2htmlattr, attrlist),
		A2($elm$core$List$map, $author$project$Views$viewNode, children));
};
var $author$project$Helpers$Down = 1;
var $author$project$Helpers$downarrow = function (size) {
	return A2($author$project$Helpers$arrow, 1, size);
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
						if (!page.$) {
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
											$elm$html$Html$text(loadedPage.q)
										])),
									resizedImg(
									A2(
										$elm$core$Maybe$withDefault,
										$elm$html$Html$text(''),
										A2($elm$core$Maybe$map, $author$project$Views$viewNode, loadedPage.af))),
									A2(
									$elm$html$Html$i,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(loadedPage.ad)
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
var $author$project$Helpers$Up = 0;
var $author$project$Helpers$uparrow = function (size) {
	return A2($author$project$Helpers$arrow, 0, size);
};
var $author$project$Views$viewPath = F2(
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
								$elm$html$Html$text(peer.bH)
							])),
						A2($elm$html$Html$br, _List_Nil, _List_Nil),
						$elm$html$Html$text(peer.H)
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
	return {$: 3, a: a};
};
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
	return {$: 7, a: a};
};
var $author$project$Model$changeJoinId = F2(
	function (options, id) {
		return $author$project$Model$ChangeOptions(
			_Utils_update(
				options,
				{aa: id}));
	});
var $author$project$Model$changeNumDestinations = F2(
	function (options, num) {
		return $author$project$Model$ChangeOptions(
			_Utils_update(
				options,
				{
					I: A2(
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
				{M: seedStr}));
	});
var $author$project$Model$changeUsername = F2(
	function (options, string) {
		return $author$project$Model$ChangeOptions(
			_Utils_update(
				options,
				{bH: string}));
	});
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
								$elm$html$Html$Attributes$value(options.aa),
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
							{f: false}))
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
								$elm$html$Html$Attributes$value(options.M),
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
								$elm$core$String$fromInt(options.I)),
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
							{f: true}))
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
												$elm$html$Html$Attributes$value(options.bH),
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
							$elm$html$Html$Attributes$width(300)
						]),
					_List_Nil),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('\r\n                              The aim of the game is to race through wikipedia while hitting all the important pages in order.\r\n                              Enter your username and either host your own game or join a friend\'s.\r\n                              '),
							$author$project$Views$break(2),
							$elm$html$Html$text('\r\n                            To host your own game, pick a game seed (eg \'deadbeef\' or \'pq9 83&#$hfl\' or whatever you want) and specify the number of destinations you want in your game.\r\n                            '),
							$author$project$Views$break(2),
							$elm$html$Html$text('To join a game, paste in the Join ID given by the game\'s host'),
							$author$project$Views$break(2),
							$elm$html$Html$text('Once in the game, you must hit every destination in order to complete the game. Race your friends and see who is the fastest wikiracer'),
							$author$project$Views$break(2),
							$elm$html$Html$text('You can play alone just by hosting your own game and forgetting to invite your friends'),
							$author$project$Views$break(2),
							$elm$html$Html$text('It is also possible that you will run into issues connecting with your friends for a variety of reasons.\r\n                                If that\'s the case then you might just agree on a seed together and everyone host their own game')
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
									$elm$html$Html$text('Let\'s Race')
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
	var _v0 = model.h;
	switch (_v0.$) {
		case 2:
			return $author$project$Views$viewWelcome(model.a);
		case 3:
			var refreshDisabled = _Utils_eq(model.S, model.a.M) && _Utils_eq(model.ah, model.a.I);
			var peersView = function () {
				var peerEl = function (peer) {
					return $author$project$Helpers$singleRow(
						A2(
							$elm$html$Html$b,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									peer.f ? ('Host: ' + peer.bH) : ('' + peer.bH))
								])));
				};
				var peerList = A2(
					$elm$core$List$map,
					peerEl,
					$elm$core$Dict$values(model.i));
				return A2(
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
							peerList)));
			}();
			var copyIdBox = model.a.f ? A2(
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
										$elm$html$Html$Attributes$value(model.a.aj),
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
			var allDestsLoaded = $author$project$Model$doneLoading(model.R);
			var _v1 = function () {
				var refreshBtn_ = function () {
					var seedLabel = A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$for('seed'),
								$elm$html$Html$Attributes$class('form-label')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('game seed')
							]));
					var numDestsLabel = A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$for('num-dests'),
								$elm$html$Html$Attributes$class('form-label')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('number of destinations')
							]));
					var changeSeed = function (str) {
						return $author$project$Model$ChangeOptsWhileInPreview(
							{bt: model.ah, al: str});
					};
					var changeNum = function (str) {
						return function (num) {
							return $author$project$Model$ChangeOptsWhileInPreview(
								{bt: num, al: model.S});
						}(
							A2(
								$elm$core$Maybe$withDefault,
								model.ah,
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
												$elm$core$String$fromInt(model.ah)),
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
												$elm$html$Html$Attributes$value(model.S),
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
				return (allDestsLoaded && model.a.f) ? _Utils_Tuple2(
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
					refreshBtn_) : (model.a.f ? _Utils_Tuple2(
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
										$elm$html$Html$Attributes$class('col-4')
									]),
								_List_fromArray(
									[
										$author$project$Views$viewPagePreviews(model.R)
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('col-5 mt-5')
									]),
								_List_fromArray(
									[copyIdBox, refreshOptions, startBtn])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('col-3 mt-5')
									]),
								_List_fromArray(
									[peersView]))
							]))
					]));
		case 0:
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
							$author$project$Views$toolTipStyles(dest.ad))),
					_List_fromArray(
						[
							$elm$html$Html$text(dest.q)
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
							$elm$html$Html$text(page.q)
						])),
				A2($elm$core$List$map, toHeader, model.n.L));
			var withPastDests = _Utils_ap(
				A2(
					$elm$core$List$map,
					toHeader,
					$elm$core$List$reverse(
						A3(
							$author$project$Helpers$popBy,
							function ($) {
								return $.q;
							},
							page,
							model.n.z))),
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
				var timeInSec = (model.n.E / 100) | 0;
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
				if (!$elm$core$Dict$size(model.i)) {
					var pathTitles = A2(
						$elm$core$List$map,
						function ($) {
							return $.q;
						},
						model.n.t);
					var destTitles = A2(
						$elm$core$List$map,
						function ($) {
							return $.q;
						},
						model.x);
					return A2($author$project$Views$viewPath, pathTitles, destTitles);
				} else {
					return $author$project$Views$viewPeerLocs(
						$elm$core$Dict$values(model.i));
				}
			}();
			var goBackBtn = ($elm$core$List$length(model.n.t) > 1) ? A2(
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
										$author$project$Views$viewNode(page.ac)
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
		case 1:
			var title = _v0.a;
			return A2(
				$elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Fetching ' + (title + ' ...'))
					]));
		case 4:
			var playeruuid = _v0.a;
			var you = {
				bi: A2(
					$elm$core$Maybe$withDefault,
					'',
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.q;
						},
						$elm$core$List$head(model.n.t))),
				P: true,
				f: model.a.f,
				H: A2(
					$elm$core$Maybe$withDefault,
					'',
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.q;
						},
						$elm$core$List$head(model.n.z))),
				t: A2(
					$elm$core$List$map,
					function ($) {
						return $.q;
					},
					model.n.t),
				E: model.n.E,
				bH: model.a.bH,
				g: model.a.g
			};
			var timeInSec = function (time) {
				return (time / 100) | 0;
			};
			var playerList = A2(
				$elm$core$List$cons,
				you,
				$elm$core$Dict$values(model.i));
			var unfinishedPlayers = A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.P;
					},
					$elm$core$Basics$not),
				playerList);
			var destTitles = A2(
				$elm$core$List$map,
				function ($) {
					return $.q;
				},
				model.x);
			var gotToEnd = function (player) {
				return _Utils_eq(
					$elm$core$Maybe$Just(player.H),
					$author$project$Helpers$last(destTitles));
			};
			var playersThatGaveUp = A2(
				$elm$core$List$filter,
				function (p) {
					return (!gotToEnd(p)) && p.P;
				},
				playerList);
			var playersThatGotToEnd = A2($elm$core$List$filter, gotToEnd, playerList);
			var leaderboard = F3(
				function (header, f, toString) {
					var playerView = function (player) {
						var stat = gotToEnd(player) ? toString(
							f(player)) : 'DNE';
						var name = _Utils_eq(model.a.bH, player.bH) ? A2(
							$elm$html$Html$b,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(player.bH)
								])) : $elm$html$Html$text(player.bH);
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
											$author$project$Model$ReviewPlayer(player.g))
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
						return $.t;
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
					return $.E;
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
			var pathView = function () {
				var _v2 = A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeR,
						function ($) {
							return $.g;
						},
						$elm$core$Basics$eq(playeruuid)),
					playerList);
				if (_v2.b) {
					var player = _v2.a;
					var listView = A2(
						$elm$html$Html$div,
						_List_Nil,
						A2(
							$elm$core$List$intersperse,
							$author$project$Helpers$rightarrow(1),
							A2(
								$elm$core$List$map,
								$author$project$Views$viewLink(destTitles),
								$elm$core$List$reverse(player.t))));
					return player.P ? A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('container')
							]),
						_List_fromArray(
							[
								$author$project$Helpers$singleRow(
								A2(
									$elm$html$Html$h3,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(player.bH + '\'s path')
										]))),
								$author$project$Helpers$singleRow(listView)
							])) : A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('container')
							]),
						_List_fromArray(
							[
								$author$project$Helpers$singleRow(
								A2(
									$elm$html$Html$h3,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(player.bH + ' hasn\'t finished yet')
										])))
							]));
				} else {
					return $elm$html$Html$text('Problem displaying player path');
				}
			}();
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
										$elm$html$Html$text(player.bH)
									])),
								A2($elm$html$Html$br, _List_Nil, _List_Nil),
								A2($author$project$Views$viewLink, destTitles, player.bi)
							]));
				};
				return ($elm$core$List$length(unfinishedPlayers) > 0) ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('container.fluid')
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
						$elm$html$Html$text('Click on a player\'s name to see their path')),
						$author$project$Views$break(2),
						$author$project$Helpers$singleRow(pathView),
						$author$project$Views$break(2),
						unfinishedPlayersView,
						$author$project$Views$break(2),
						A2($author$project$Views$viewBestSegments, playerList, destTitles),
						$author$project$Views$break(2),
						$author$project$Helpers$singleRow(
						model.a.f ? A2(
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
		bp: function (_v0) {
			return _Utils_Tuple2($author$project$Main$initialModel, $author$project$Main$initCmd);
		},
		bD: $author$project$Main$subscriptions,
		bF: $author$project$Main$update,
		bI: $author$project$Views$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));