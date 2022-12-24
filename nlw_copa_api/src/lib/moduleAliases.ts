import { join } from "node:path";
import moduleAliases from "module-alias";

moduleAliases.addAliases({
	"~": join(__dirname, ".."),
});
