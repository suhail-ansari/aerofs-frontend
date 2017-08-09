## App

I built this app using React. It is the only dependency in the app.
I used Jest and Enzyme for testing.

I have included the compiled Javascript along with code in the ```./build``` folder. To run the app just open ```index.html``` in the browser (since, I am included ```fakedata.json``` in the code itself and made some wrapper functions to simulate HTTP requests, the app will run without an http server).

You can also run the development server using:
```
$> npm install
$> npm run start-dev

# or serve the files using 
$> python -m SimpleHTTPServer

# or compile the files using
$> npm run build

# the files are compiled in the ./build folder

$ to run tests
$> npm test

# with coverage
$> npm test -- --coverage
```

## Solution

>NOTE: I modified the data by converting all ```message.id``` to UUID, so that instead of keeping track of the last ```message.id``` I just create a new UUID for new messages. 

> Instead of making HTTP requests, I instead exposed two functions in ```api.js```, ```fetchMessages``` to get previous messages and ```poll``` to poll for new messages. Both functions return a promise. The ```poll``` method just picks up a random message from the ```fixture/fakedata2.json```, updates the timestamp and resolves the promise in a ```setTimeout``` to simulate 'realtime' behaviour.

The App consists of following components:

### ```App```

Displays the ```LoginForm``` and ```Messenger``` component after user enters the username.

### ```LoginForm```
Displays a form with input to enter name and 'Login'.

### ```Messenger```
This is the main component which contains ```MessageList``` component to display messages, ```MessageInput``` to display text input and send button for new/edit messages. The messenger 'poll' for new message by calling the ```api.poll``` method. The messenger keeps track of the all the messages, the current text in input, the messages being edited in the component state and then renders components accordingly.

### ```MessageList```
Displays the messages as a list of ```MessageBubble``` component.

### ```MessageBubble```
Renders individual messages. Uses ```RichText``` component to replace links in text with anchor tags.

### ```MessageInput```
Render the input and send button.
