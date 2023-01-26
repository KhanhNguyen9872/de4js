/* global utils */
// eslint-disable-next-line no-unused-vars
function ArrayDecode(source, options) {
  const detectPattern = /^(var|const|let)\s+((?![^_a-zA-Z$])[\w$]*)\s*=\s*\[.*?\];/;
  let _var = source.match(detectPattern);

  if (!_var || _var.length !== 3) throw 'Not matched';

  const _name = _var[2],
    keyPattern = new RegExp(_name.replace(/\$/g, '\\$') + '\\[(\\d+)\\]', 'g');
  let _code = source.replace(detectPattern, '');

  _var = _var[0].replace(/[\s\S]*?\[/, '[');
  _var = eval(_var);

  _code = _code.split(';');
  _code = _code.map((piece) =>
    piece.replace(keyPattern, (key, index) => {
      const item = _var[index],
        q = utils.strWrap(item);

      return q + utils.escapeRegExp(item, q) + q;
    }),
  );
  _code = _code.join(';');

  if (options.methodChain) _code = utils.methodChain(_code);
  console.log(_code);
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
  const z = _code;

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
    _code = _code.replace("/" + _var_[i] + "/g", "decode_var_" + i);
  };
  console.log(_code);
  return _code;
};