const { handler } = require('./index');
const mockEvent = require('./mock-event.json');

handler(mockEvent)
    .then(response => console.log(response))
    .catch(error => console.error(error));
