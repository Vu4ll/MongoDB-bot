const fs = require("fs");

module.exports = async client => {
  fs.readdir("./events", (err, files) => {
    console.log(`${files.length} event will be loaded.`);
    files.forEach(file => {
      let props = require(`../events/${file}`);
      if (!props.event) return;
      client.on(props.event, props.run);
      console.log(`Loaded event: ${props.event}.`);
    });
  });
};

// Vu4ll
