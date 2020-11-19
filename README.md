# passport-boilerplate


This is your passport boilerplate.

## Setup 

1. Clone the repo
2. Delete the `.git` file, when you are in the root of the file you can press `ls` and you should see a `.git` file, then go ahead and run `rm -rf .git`

#### Setup your git repo
1. in the project root `git init`
2. `git add .` to add all the starter code
3. `git commit -m "setup boilerplate"` 
4.   go to github and create your github and create a repo (Without a readme or liscense you can add that later!)
5. copy the remote address
6. In your terminal add the remote `git remote add origin yourGithubRepo'sAddressGoesHere`
7. `git pull origin master` If a screen pulls up asking you to do something just press `:q` and then `enter` (thats vim btw :) )
8. `git push origin master`

#### Setup your login

0. Setup your database connection string
1. Then Setup Your User Model, 
3. Follow the steps from the lesson plan to get your Google login credentials for your `.env` file
4. Setup the Code in your config passport 
5. Setup your call back routes in your `routes/index`
6. Setup a view and test your login!

#### Make a commit 

```git commit -m "setup up oauth and User Model"```
