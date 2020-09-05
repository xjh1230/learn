const { clone } = require("../api/download");

const name = "test";
async function down() {
  await clone("github:su37josephxia/vue-template", name);
}
down();
