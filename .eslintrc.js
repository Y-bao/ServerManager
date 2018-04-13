// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint"
    },
    env: {
        browser: true,
        // 添加
        jquery: true
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        // "plugin:vue/essential",
        "eslint:recommended",
        "plugin:vue/recommended"
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        // "standard"
    ],
    // required to lint *.vue files
    plugins: ["vue"],
    // add your custom rules here
    rules: {
        // allow async-await
        "generator-star-spacing": "off",
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        indent: ["warn", 4],
        "linebreak-style": ["warn", "unix"],
        quotes: ["warn", "double"],
        semi: ["warn", "always"],
        "no-console": "off",
        "no-eval": "error",
        "no-invalid-regexp": "error",
        "no-invalid-this": "off",
        "no-multiple-empty-lines": [
            "warn",
            {
                max: 2
            }
        ],
        "no-unused-vars": "warn",
        "no-extra-bind": "warn",
        "no-extra-boolean-cast": "warn",
        "no-extra-parens": "off",
        "no-extra-semi": "warn",
        "no-func-assign": "warn",
        "no-floating-decimal": "warn",
        "no-irregular-whitespace": "warn",
        "no-lone-blocks": "warn",
        "no-undef": "off",
        "space-before-function-paren": "off",
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
        eqeqeq: "off",
        "no-new-object": "off",
        "no-array-constructor": "off",
        "vue/html-self-closing": "off",
        "vue/max-attributes-per-line": "off",
        "vue/html-indent": "off",
        "vue/attributes-order": "off"
    }
};
