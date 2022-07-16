module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"array-bracket-spacing": [ "error", "always" ],
		"comma-spacing": [ "error", { "before": false, "after": true } ],
		"computed-property-spacing": [ "error", "always" ],
		// "indent": [ "error", "tab" ],
		"semi": [ 2, "never" ],
		"space-before-function-paren": [ "error", "always" ],
		"space-in-parens": [ "error", "always" ],
		"space-infix-ops": [ "error", { "int32Hint": false } ]
	}
}