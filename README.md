# pharanology
In today’s age paper exams are redundant as they are often very problematic; They could be leaked, cheating is trivial and human error is always there.

Pharanology is an engaging platform for taking exams that eliminates these issues and more, in addition to making the exam-taking experience more interactive & modern.

## How to test or contribute
1. Fork the repository (by clicking on the top right button on GitHub)
2. Open Visual Studio Code and click on "Clone Git Repository..." in the start up page.
3. In the prompt, copy and paste your forked project link (go to your GitHub profile, you will see the cloned repository)
4. Open a terminal in vscode and run `pip install -r requirements.txt`
5. Now you can run the server and test by running `python manage.py runserver` and go to http://127.0.0.1:8000/
6. If you want to access the django admin panel, you can create a superuser by running `python manage.py createsuperuser` and entering your username, email and password.

7. Create a new branch (by clicking on the icon at the very bottom left of vscode)
8. Make your changes (adding features, fixing issues, etc..)
9. Commit to the branch (by clicking on commit changes in the third tab in the left panel of vscode)
10. Open a pull request in this original repository (third tab on GitHub "Pull requests")
11. Then anyone can review the changes made by you and merge them

## TODO (Backend)
- [x] User authentication
- [x] User roles (student, admin)
- [ ] Admin dashboard for managing students, making exams and pushing them to students
- [ ] Exam architecture (Exam data model, grading, etc..)
- [ ] Pushing exams
- [ ] Student dashboard

## TODO (Frontend)
