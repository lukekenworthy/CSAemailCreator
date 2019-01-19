## A project I made for building the weekly CSA email and bulletin using React!!

This vast majority of the code is in ./src/App/components/EmailForm.js, while there is minimal CSS in ./src/App/App.css.

To start the project locally, clone the repository, then run
```bash
npm i
npm start
```

(If you run into errors with "npm i", you may need to run "sudo npm i". At least, this was the case with myself. Also note that running "npm i" might take awhile.)

Then, once it's started, just fill out the form and your email and bulletin should be formatted for you. If you want to add sections to the bulletin, and not the email, you can add those in the bulletin section. To copy the formatting into an email properly, use your browser inspector to copy the div titled "theHTML", and then copy that into any app that converts HTML into emails. If you look on the Chrome extension marketplace, there are a few available for gmail.

Saving your progress isn't super robust at this point. To save, click "export JSON" and then copy the text displayed and save that somewhere. To load your progress, go to "import JSON" and then paste in that copied text.

This was my first real project with React, and it was designed for use with myself. Below are some notes about what I learned that I made after reading through my code.

- In the future, I will want to keep state as flat as possible. This would allow me to use only a handful of functions for handling state in the future. I mostly had to use different functions when items that didn't to be changed were at different levels within the state.

- This quickly got out of hand in terms of size of the project and I would probably want to divide into subcomponents if I did much more with this. Although, using only one component allows me to not deal with passing functions and state down to children through props or adding in Redux.

- Using curried functions to pass more parameters to event-handling functions was super helpful. The main downside to this is that it comes at the cost of performance in React, so I would want to find a better (albeit messier) solution if I wanted this to scale.

- I used the "dangerouslySetInnerHTML" property when displaying the formatted email so that I could use html formatting in my forms for things like line breaks and making text bold. I also used style tags to format all text within span tags that come from forms as bold. Then, I can copy this style tag when copying the HTML and my HTML formatter can apply those styles as appropriate. Because this is only used for myself, this is fine. However, if I were to expand this project to allow others to use it, I would want to find a way to let users format text themselves (without using html) so that users can't inject their own scripts in the program and whatnot.

- In the future, I could make the JSON saving more robust by allowing it to actually download and upload a JSON file. Also, right now, it doesn't make sure that the data is valid, so that is something I would want to change if I expanded the project for use beyond myself. Actually, if I expanded this project for use beyond myself, I would want to make it format a wider variety of emails since the only one who really needs to send out weekly Harvard Catholic Center emails is myself, at least in 2019...