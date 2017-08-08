## App

I built this app using React. It is the only dependency in the app.
I used Jest and Enzyme for testing.

I have included the compiled Javascript along with code. To run the app just open ```index.html``` in the browser (since, I am included ```fakedata.json``` in the code itself and made some wrapper functions to simulate HTTP requests, the app will run without and http server).

You can also run the development server using:
```
$> npm install
$> npm run start-dev

# or compile the files using
$> npm run build

# the files are compiled in the build folder

$ to run tests
$> npm test

# with coverage
$> npm test -- --coverage
```

## Approach

The app consists of a ```LoginForm``` component and ```Messenger``` component. When the webpage is opened, the user is asked to enter username. After which the Messenger component is displayed.

```Messenger``` component consists of two main child component, ```MessageInput``` to display the input and send button and ```MessageList``` to display the messages.

I created two mock HTTP APIs to fetch previous messages and poll for new messasges. ```fetchMessages``` reads and returns data from ```fakedata.json``` and ```poll``` return a random message from ```fakedata.json``` with updated id and timestamps.

When the ```Messenger``` component is loaded, it makes a 'fake' ```fetch``` request to get messages and renders them into the ```MessageList``` as previous messages. Once the previous messages are fetched, the component then starts 'fake' polling for new messages using the above mentioned 'fake' APIs.

Since, the app seemed simple enough I did not use ```Redux``` to maintain app state (although admittedly, things would have become simpler had I used it.), I maintain the app state in the ```Messenger``` component itself. The state keeps track of all the messages, errors while making fetch and poll requests and if the ```Messenger``` is in edit mode.

To implement the edit message feature, I assumed the user can only edit their own messages. When the user hovers over their message, I display an 'Edit' link, which when clicked puts the messenger in edit mode. I display the previous message as a ```blockquote``` above the mesage input so the user can see, their previously sent message while editing it.

For link detection, instead of using a library, I built ```RichText``` component, a simple component that detects and add links to the text. it uses url matching regex to replace links with anchor elements (its not perfect like [```Linkify```](http://soapbox.github.io/linkifyjs/), but simple enough to work).
