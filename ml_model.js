const { PythonShell } = require('python-shell');

function trainModel() {
  let options = {
    scriptPath: './',
    args: ['housing.csv']
  };

  PythonShell.run('train_model.py', options).then(messages => {
    console.log('Model training completed');
  });
}

module.exports = { trainModel };