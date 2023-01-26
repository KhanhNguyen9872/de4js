/* global math */
/* eslint-disable no-unused-vars */
var utils = {
  strWrap: (str) => {
    if (str.includes('\n') || (str.includes('"') && str.includes("'"))) return '`';
    return !str.includes("'") ? "'" : '"';
  },

  escapeRegExp: (str, q) => str.replace(new RegExp(`[\\\\${q}\\n]`, 'g'), '\\$&').replace(/-/g, '\\x2d'),

  _unescape: (str) => {
    for (let i = 32; i < 128; i++) {
      str = str.replace(new RegExp('\\\\x' + i.toString(16), 'ig'), String.fromCharCode(i));
    }
    str = str.replace(/\\x09/g, '\t');
    return str;
  },

  strMerge: (str) => str.replace(/(?<![[(=<>,!?:|&+\-*/])('|")\s*\+\s*\1(?!([\])=<>,?:|&!+\-*/]|$))/g, ''),

  methodChain: (str) => {
    str = str.replace(
      /(?<=(\b(return|throw|in|of|new|delete|default|function|async|await|get|set)|\{|\*))\s*\[('|")((?![^_a-zA-Z$])[\w$]*)\3\]\s*\(/g,
      ' $4( ',
    );
    str = str.replace(/(?<=((?![^_a-zA-Z$])[\w$]*)|\]|\))\[('|")((?![^_a-zA-Z$])[\w$]*)\2\]/gi, ' .$3 ');
    return str;
  },

  replacevarname: (str) => {
    const __var = [
      "(",
      ")",
      "[",
      "]",
      ".",
      ",",
      ";",
      "=",
      "{",
      "}",
      "+",
      "-",
      ":",
      "\n",
      "\r",
      "\t",
      ">",
      "<",
      "|",
      "\\",
      "/",
      "'",
      '"',
      "*",
      "&",
      "%",
      "$",
      "var",
      "if",
      "const",
      "let",
      "true",
      "false",
      "for",
      "return",
      "function"
    ];
    const ___var = [];
    const b = [];
    const z = str;

    for (let i = 0; i < __var.length; i++) {
      z = z.replace("/" + __var[i] + "/g", " ");
    };

    const myarray = z.split(" ");
    for (let i = 0; i < z.length; i++) {
      b.push(z[i]);
    };

    for (let i = 0; i < b.length; i++) {
      try {
        if (b[i][0] + b[i][1] == "_0") {
          ___var.push(b[i]);
        };
      }
      catch(err) {
        continue;
      };
    };

    let _var_ = ___var.filter((element, index) => {
      return ___var.indexOf(element) === index;
    });

    for (let i = 0; i < _var_.length; i++) {
      str = str.replace("/" + _var_[i] + "/g", "decode_var_" + i);
    };
    return str;
  },

  calcHex: (str) => {
    str = str.replace(
      /(?<!['"])(?<!\w)[+-]?\s*0x[a-f\d]+((?<!\w)0x[a-f\d]+|[+\-*/\s])*(?<!\w)0x[a-f\d]+(?!['"])/gi,
      (m) => math.format(eval(m), 14),
    );
    str = str.replace(/(?<=[[(=<>,!?:|&+\-*/])\s*0x[a-f\d]+\s*(?=([\])=<>,?:|&+\-*/]|$))/gi, (m) => parseInt(m));
    return str;
  },

  calcNumber: (str) => {
    str = str.replace(/(?<!['"\w])[+-]?\s*\d[+\-*/\d.\s]*\d(?!['"\w])/g, (m) => {
      if (!/[+\-*/]/.test(m)) return m;
      return math.format(math.evaluate(m), 14);
    });
    return str;
  },

  removeGrouping: (str) => {
    str = str.replace(/(?<!\w[\s\n]*)(\()(\d+(\.\d+)?)(\))/g, '$2');
    str = str.replace(/(?<!\w[\s\n]*)(\()((['"])\w+(\3))(\))/g, '$2');
    return str;
  },

  toBool: (str) =>
    str.replace(
      /((?<=([=:(,|&[]|return|=>))|^)[\s\n]*!{1,2}(\[\]|0|1)[\s\n]*((?=[;,)}|&\]])|$)/g,
      (m) => ' ' + Boolean(eval(m)),
    ),

  propArr: (str) => str.replace(/\[\((['"])((?![^_a-zA-Z$])[\w$]*)['"]\)\]/gi, '[$1$2$1]'),
};
