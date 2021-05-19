## Available Scripts

In the project directory, you can run:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Link to live project: https://vigorous-khorana-04019c.netlify.app/

### `How long did you spend on the coding assignment?`
 `What would you add to your solution if you had more time?`
 ` If you didn't spend much time on the coding test, then use this as an opportunity toexplain what you would add.`

* I spent like 3 hours on building the logic. Spent between 2 to 3 hours for CSS.
* If I had more time I would have added an option for read later as in a library like this there is always a chance that you like multiple books and then you forget what was the name of the others that button would have made it very useful.

### `What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.`
* `Optional chaining is the coolest feature i've seen in javascript. i didn't use it in this app but i've been using it in the other projects.`

I used it like this : 

```Patient.?userProfile?.email```

If patient is null or userProfile is null it will return null. This was when i was debugging becuase the authentication system was failing

### `How would you track down a performance issue in production? Have you ever had to do this?`
i have indeed tracked it down. So i built a booking system and it had to generate some calendar blocks to show the doctor's availability. what was happening is that everytime the user clicks on a time slot to book it. It would cause the blocks to generate again, and the client machine's fan boosted quite a bit. i tracked it using chrome's performace tab and also some of the props were being moved around unnecessarily, so i used 

```React.memo``` to fix that. 

### `How would you improve the API that you just used?`
I used open library books api in this project. The data is very inconsistent in this. The date is not in the same format always, some images are not there and it shows a blank image that can't be detected that whether there is no image or whether it's not showing up, i would've added a "No image" sign if no image was available for the image. Documentation should be extremely easy as well.

### `Please describe yourself using correctly formatted JSON.`
```
{
  "id": 1,
  "first_name": "Sourav",
  "last_name": "Dewett",
  "date_of_birth": "January 20, 1998",
  "attributes": [
    "Calm",
    "Curioius",
    "Observant",
    "Gamer",
    "Foody"
  ],
  "interests": [
    "iOS Development",
    "Pose Estimation Apps",
    "PS5 games"
  ],
  "dreams": [
    "live on the moon",
    "buy a lambo"
  ],
  "belief": "Better one hour early than one minute late"
}

```
