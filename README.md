# ear-trainer

a simple ear-trainer made with javascript

![beatles playing piano in the snow](snow-piano.gif)

### description: 
-----------
All 12 semitones are played in a random order. After each tone you have to select the note you think it is from note select buttons. After all 12 notes have been played, a score is displayed, a log of which note was correct/incorrect, and you are asked if you would like to play again.

### technologies used:
-----------
- HTML
- CSS
- JavaScript

### screenshots
-----------
- Here is a screenshot of the desktop version:

![Screen Shot 2021-08-04 at 11 44 05 AM](https://user-images.githubusercontent.com/63392756/128213121-7481d791-84cd-48e5-823e-e36141df61e4.png)

- Here is a screenshot of the mobile version:

![Screen Shot 2021-08-04 at 11 50 46 AM](https://user-images.githubusercontent.com/63392756/128213202-d215eb0c-f197-4ce4-82b7-4b2e4e4499e6.png)

- Here is a screenshot of the modal that is displayed when a round ends:

![Screen Shot 2021-08-04 at 11 46 30 AM](https://user-images.githubusercontent.com/63392756/128213311-2b72e425-2609-4a99-b0f5-01ca7a46a58f.png)

- Here is a screenshot of the modal that is displayed when you select the notes button:

![Screen Shot 2021-08-04 at 11 44 15 AM](https://user-images.githubusercontent.com/63392756/128213426-2922284f-7637-4212-aec8-a12f711f0c7d.png)

- Here is a screenshot of the instructions modal that is displayed when the page loads: 

![Screen Shot 2021-08-04 at 11 44 50 AM](https://user-images.githubusercontent.com/63392756/128213503-ed064003-5c44-4b1f-8074-059a982935dd.png)

- Here is a screenshot of the game in chord mode: 

![Screen Shot 2021-08-04 at 11 44 25 AM](https://user-images.githubusercontent.com/63392756/128214141-f51eeb6a-acfe-486b-83b1-4d145495e745.png)

- Here is a screenshot of the game in infinite mode:

![Screen Shot 2021-08-04 at 11 44 39 AM](https://user-images.githubusercontent.com/63392756/128213868-dd4415dc-ef31-448d-92cd-9e17a6c4fce6.png)

- Here is a screenshot of the game when the difficulty has been adjusted: 

![Screen Shot 2021-08-04 at 12 03 31 PM](https://user-images.githubusercontent.com/63392756/128214984-f6fef6e2-2a68-42a4-bdb3-144fd74e3581.png)

### MVP goals: 
-----------
- a sequence of 12 semitones is arranged in a random order and played one at a time, waiting for user input in between tones
- after each tone is played, the user selects which tone they believe was played from a choice of 12 semitone buttons
- a 'replay tone' button is active for the user to replay the current tone again as many times as they would like 
- after the last tone is played, a percentage score is displayed along with a log of which notes were correct and incorrect
- after the score is displayed the user is able to press a 'play again' button and the game restarts with a new order

### stretch goals:
-----------
- different difficulty levels: adding other octaves for harder difficulty
- ability to manually select which semitones to generate from so you can tailor your exercise to your weakness notes
- infinite mode: tones are randomly generated endlessly and there is a running percentage displayed on the screen, can reset percentage to 0 at any time with a reset button
- chord mode: identify by multiple tones at once
- style so they actually look like keys (might be corny)
- keyboard input option

### wireframes:
-----------
- Here is the wireframe for the MVP version of the ear trainer: 

![Screen Shot 2021-07-28 at 7 58 06 PM](https://user-images.githubusercontent.com/63392756/127509890-0305eb7e-b689-489a-8024-65e5495e76a3.png)

- Here is the wireframe for the score display screen: 

![Screen Shot 2021-07-28 at 8 29 52 PM](https://user-images.githubusercontent.com/63392756/127510045-c27d988b-91ed-44c7-96ef-78ae11a94e8a.png)

- Here is what the wireframe for the stretch version of the ear trainer:

![Screen Shot 2021-07-28 at 8 17 47 PM](https://user-images.githubusercontent.com/63392756/127510190-32a4b9c4-8ab4-40bf-b89b-4909bca878fd.png)

### schedule and timeframe:
-----------
- Here is a table showing my projected schedule and timeline for the ear trainer:
![Screen Shot 2021-07-28 at 11 07 40 PM](https://user-images.githubusercontent.com/63392756/127510783-1ad0d3c9-4860-4494-9f2d-566b3212fa48.png)

- Here is a table showing my actual timeline:

![Screen Shot 2021-08-04 at 11 00 37 AM](https://user-images.githubusercontent.com/63392756/128205126-f8147698-7346-421e-9ce6-3827c6803a18.png)

### notes
--------------
- I reached all of my goals except for keyboard input. Given the ability to manually select whch notes to display, I decided to not include keyboard input because the screen would have to display which note was triggered by a certain key. Since five of the keys that I thought I would use are actual note values, I thought it might get confusing. 

- I also decided to prioritize the mobile experience. Whenever I have used ear-trainers like this one in the past, I have only used them when I'm not at home. So I wanted to design the app around the mobile user. Initially, I planned to have menus displayed on the screen for chord mode, infinite mode, and the notes selection, but ended up using a modal for the notes and having the buttons for chord mode and infinite mode display information. Having menus always visibile on the mobile screen would have gotten very busy and would ruin the clean, simple look I was going for.

### major hurdles
-----------
- The largest hurdle I ran into was just the scope of my variables. More than once during the development process, I would try to reference a value and would then realize that it had a local scope for one function. I would then have to refactor my code to accomodate for global variables. While it was annoying, luckily I didn't have to do any complete overhauls with my code. 

- Another major hurdle was accomodating for the user experience. I have used ear-trainers before and I was the one who built this one, so of course it made sense to me. I showed my app to my partner who is also a musician about 50% way through development, and they made it very clear that there was nothing on the app that explained what it did and how to use it. To fix this, I created an instructions modal that is displayed on page load. The instructions modal describes, in detail, each function that the app has and how to use them. This was a good exercise in keeping the user in mind while developing. 

 


