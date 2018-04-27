module.exports = {
  description: 'Creates React Component jsx and scss files',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the new Screen?'
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'app/components/screens/{{pascalCase name}}/{{pascalCase name}}.js',
      templateFile: 'plops/screen/screen.js.txt'
    },
    {
      type: 'add',
      path: 'app/components/screens/{{pascalCase name}}/{{pascalCase name}}.styles.js',
      templateFile: 'plops/screen/screen.styles.js.txt'
    },
    {
      type: 'modify',
      path: 'app/config/Navigator.js',
      pattern: '// NOTE(fj): plop screenGen importing new Screen here',
      template: [
        'import {{pascalCase name}}Screen from "../components/screens/{{pascalCase name}}/{{pascalCase name}}";',
        '// NOTE(fj): plop screenGen importing new Screen here',
      ].join('\n'),
    },
    {
      type: 'modify',
      path: 'app/config/Navigator.js',
      pattern: '  // NOTE(fj): plop screenGen inserting new Screen here',
      template: [
        '  {{pascalCase name}}: {',
        '    screen: {{pascalCase name}}Screen,',
        '    title: \'{{pascalCase name}}\',',
        '  },',
        '  // NOTE(fj): plop screenGen inserting new Screen here',
      ].join('\n'),
    }
  ]
};
