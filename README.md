## A project I made for building the weekly CSA email and bulletin using React!!

This was my first real project with React, and it was designed for use with myself. Below are some notes I made after reading through my code on what I learned.

- In the future, I will want to keep state as flat as possible. This would allow me to use only a handful of functions for handling state in the future. I mostly had to use different functions when items that didn't to be changed were at different levels within the state.

- This quickly got out of hand in terms of size of the project and I would probably want to divide into subcomponents if I did much more with this. Although, using only one component allows me to not deal with passing functions and state down to children through props or adding in Redux.

- Using curried functions to pass more parameters to event-handling functions was super helpful. The main downside to this is that it comes at the cost of performance in React, so I would want to find a better (albeit messier) solution if I wanted this to scale.

- I used the "dangerouslySetInnerHTML" property when displaying the formatted email so that I could use html formatting in my forms for things like line breaks and making text bold. I also used style tags to format all text within span tags that come from forms as bold. Then, I can copy this style tag when copying the HTML and my HTML formatter can apply those styles as appropriate. Because this is only used for myself, this is fine. However, if I were to expand this project to allow others to use it, I would want to find a way to let users format text themselves (without using html) so that users can't inject their own scripts in the program and whatnot.