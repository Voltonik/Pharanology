# Pharanology

In today’s age paper exams are redundant as they are often very problematic; They could be leaked, cheating is trivial and human error is always there.

Pharanology is an engaging platform for taking exams that eliminates these issues and more, in addition to making the exam-taking experience more interactive & modern.

## How to test or contribute

1. Open Visual Studio Code and click on "Clone Git Repository..." in the start up page.
2. In the prompt, copy and paste the repository's link.
3. Open a terminal in vscode and run `pip install -r requirements.txt`
4. Split the terminal to 3 terminals.
5. On the first terminal, run `cd .\frontend\`
6. Run `npm i`. It will install the required frontend files (ONLY ONCE.)
7. Run `npm run dev`, It will open the frontend live server at the port `5173`
8. On the second terminal run the following commands: `python manage.py makemigrations` - `python manage.py migrate` - `python manage.py migrate --run-syncdb` - `python manage.py runserver` and go to http://127.0.0.1:8000/
9. On the third terminal run `python -m celery -A Pharanology worker -l info -P eventlet`
10. If you want to access the django admin panel, you can create a superuser by running `python manage.py createsuperuser` and entering your username, email and password.
11. Make your changes (adding features, fixing issues, etc..)
12. Commit & Push to the branch (by clicking on commit changes in the third tab in the left panel of vscode)

* Note: if you pull the repository and a weird "column does not exist" error appears, delete your db.sqlite then redo step 8.

## TODO (Backend)

- [x] User authentication
- [x] User roles (student, admin)
- [x] Exam architecture: Data model & Questions creation panel
- [x] Pushing exams
- [ ] Exam architecture: Solving
- [ ] Exam architecture: Grading
- [ ] Admin dashboard form for managing students, making exams and pushing them to students
- [ ] Student dashboard (maybe?)

## TODO (Frontend)

### Components

- [ ] Navbar

### Pages

- [ ] Error
- [ ] Examiner Dashboard
- [ ] Login
- [ ] Password reset Done
- [ ] Password reset form
- [ ] Password reset sent
- [ ] Password reset
- [ ] Register
- [ ] Student Dashboard
