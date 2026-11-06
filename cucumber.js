module.exports = {
  default: {
    paths: ['features/*.feature'],
    require: ['features/support/**/*.js', 'features/step_definitions/**/*.js'],
    format: ['progress', 'html:relatorios/cucumber-report.html', 'json:relatorios/cucumber-report.json'],
    publish: false,
    strict: true
  }
};
