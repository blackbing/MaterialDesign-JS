const util = require('@mdi/util');

const meta = util.getMeta(true);

const find = /(\-\w)/g;
const convert =  function(matches){
  return matches[1].toUpperCase();
};

const lines = meta.map(icon => {
  let name = icon.name.replace(find, convert);
  name = `mdi${name[0].toUpperCase()}${name.slice(1)}`;
  util.write(`./es/${name}.js`, `export default "${icon.path}"`);

  // return `export const mdi${name}: string = "${icon.path}";`;
  return `export { default as ${name} } from "./es/${name}.js";`;
});

const output = `// Material Design Icons v${util.getVersion()}\n${lines.join('\n')}`;

util.write("mdi.js", output)
